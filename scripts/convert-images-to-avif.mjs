import { spawn } from "node:child_process";
import {
  readdir,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const imageRoot = path.join(projectRoot, "assets", "images");
const reportPath = path.join(projectRoot, "docs", "avif-conversion-report.csv");
const supportedExtensions = new Set([
  ".heic",
  ".heif",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
]);
const concurrency = 2;
const rows = [];

async function scan(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await scan(absolutePath)));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout: stdout.trim(), stderr: stderr.trim() });
      } else {
        reject(
          new Error(
            `${command} exited with ${code}: ${stderr.trim() || stdout.trim()}`,
          ),
        );
      }
    });
  });
}

function relative(filePath) {
  return path.relative(projectRoot, filePath);
}

function csv(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

async function identifyDimensions(filePath, autoOrient = false) {
  const input = `${filePath}[0]`;
  const args = autoOrient
    ? [input, "-auto-orient", "-format", "%w,%h", "info:"]
    : ["identify", "-format", "%w,%h", input];
  const { stdout } = await run("magick", args);
  return stdout;
}

async function validateAvif(filePath, expectedDimensions) {
  const { stdout } = await run("magick", [
    "identify",
    "-format",
    "%m,%w,%h",
    `${filePath}[0]`,
  ]);
  const [format, width, height] = stdout.split(",");
  const actualDimensions = `${width},${height}`;

  if (format !== "AVIF") {
    throw new Error(`Expected AVIF, identified ${format || "unknown format"}`);
  }
  if (
    expectedDimensions &&
    actualDimensions !== expectedDimensions
  ) {
    throw new Error(
      `Dimension mismatch: expected ${expectedDimensions}, got ${actualDimensions}`,
    );
  }

  return actualDimensions;
}

async function convert(sourcePath, index, total) {
  const extension = path.extname(sourcePath).toLowerCase();
  const sourceStats = await stat(sourcePath);
  const outputPath = sourcePath.slice(0, -extension.length) + ".avif";
  const temporaryPath = `${outputPath}.tmp-${process.pid}.avif`;
  const baseRow = {
    source: relative(sourcePath),
    output: relative(outputPath),
    originalBytes: sourceStats.size,
    avifBytes: "",
    status: "",
    notes: "",
  };

  try {
    try {
      const existingStats = await stat(outputPath);
      await validateAvif(outputPath);
      rows.push({
        ...baseRow,
        avifBytes: existingStats.size,
        status: "skipped_target_exists",
        notes: "Existing AVIF target validated and was not overwritten.",
      });
      console.log(`[${index}/${total}] skipped ${relative(sourcePath)}`);
      return;
    } catch (error) {
      if (error?.code !== "ENOENT") {
        throw error;
      }
    }

    const expectedDimensions = await identifyDimensions(sourcePath, true);
    await run("magick", [
      `${sourcePath}[0]`,
      "-auto-orient",
      "-quality",
      "75",
      "-define",
      "heic:speed=6",
      "-define",
      "heic:chroma=444",
      temporaryPath,
    ]);
    await validateAvif(temporaryPath, expectedDimensions);
    await rename(temporaryPath, outputPath);
    const outputStats = await stat(outputPath);

    rows.push({
      ...baseRow,
      avifBytes: outputStats.size,
      status: "converted_validated",
      notes: `Dimensions preserved at ${expectedDimensions.replace(",", "×")}.`,
    });
    console.log(`[${index}/${total}] converted ${relative(sourcePath)}`);
  } catch (error) {
    await rm(temporaryPath, { force: true });
    rows.push({
      ...baseRow,
      status: "failed",
      notes: error instanceof Error ? error.message : String(error),
    });
    console.error(`[${index}/${total}] failed ${relative(sourcePath)}`);
  }
}

async function worker(queue, total) {
  while (queue.length > 0) {
    const item = queue.shift();
    if (!item) {
      return;
    }
    await convert(item.path, item.index, total);
  }
}

const allFiles = (await scan(imageRoot)).sort((a, b) => a.localeCompare(b));
const sourceFiles = allFiles.filter((filePath) =>
  supportedExtensions.has(path.extname(filePath).toLowerCase()),
);
const queue = sourceFiles.map((filePath, index) => ({
  path: filePath,
  index: index + 1,
}));

await Promise.all(
  Array.from(
    { length: Math.min(concurrency, queue.length) },
    () => worker(queue, sourceFiles.length),
  ),
);

for (const filePath of allFiles) {
  const extension = path.extname(filePath).toLowerCase();
  if (supportedExtensions.has(extension)) {
    continue;
  }

  const fileStats = await stat(filePath);
  if (extension === ".avif") {
    try {
      const dimensions = await validateAvif(filePath);
      rows.push({
        source: relative(filePath),
        output: relative(filePath),
        originalBytes: fileStats.size,
        avifBytes: fileStats.size,
        status: "skipped_existing_avif_valid",
        notes: `Existing AVIF validated at ${dimensions.replace(",", "×")}.`,
      });
    } catch (error) {
      rows.push({
        source: relative(filePath),
        output: relative(filePath),
        originalBytes: fileStats.size,
        avifBytes: fileStats.size,
        status: "failed_existing_avif_validation",
        notes: error instanceof Error ? error.message : String(error),
      });
    }
  } else {
    rows.push({
      source: relative(filePath),
      output: "",
      originalBytes: fileStats.size,
      avifBytes: "",
      status: "skipped_unsupported",
      notes: `Unsupported extension: ${extension || "(none)"}`,
    });
  }
}

rows.sort((a, b) => a.source.localeCompare(b.source));
const header = [
  "source_file",
  "output_avif_file",
  "original_file_size_bytes",
  "avif_file_size_bytes",
  "status",
  "notes",
];
const lines = [
  header.map(csv).join(","),
  ...rows.map((row) =>
    [
      row.source,
      row.output,
      row.originalBytes,
      row.avifBytes,
      row.status,
      row.notes,
    ]
      .map(csv)
      .join(","),
  ),
];
await writeFile(reportPath, `${lines.join("\n")}\n`, "utf8");

const converted = rows.filter(
  (row) => row.status === "converted_validated",
).length;
const failed = rows.filter((row) => row.status.startsWith("failed")).length;
const skipped = rows.length - converted - failed;
console.log(
  `Complete: ${converted} converted, ${skipped} skipped, ${failed} failed.`,
);
console.log(`Report: ${relative(reportPath)}`);

if (failed > 0) {
  process.exitCode = 1;
}
