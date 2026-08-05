import { getDb } from "../../../db";
import { enquiries } from "../../../db/schema";

type EnquiryPayload = {
  fullName?: unknown;
  email?: unknown;
  phone?: unknown;
  enquiryType?: unknown;
  preferredDate?: unknown;
  guests?: unknown;
  message?: unknown;
};

function optionalString(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnquiryPayload;
    const fullName = optionalString(body.fullName);
    const email = optionalString(body.email);
    const enquiryType = optionalString(body.enquiryType);

    if (!fullName || !email || !enquiryType) {
      return Response.json(
        { success: false, message: "Missing required enquiry fields" },
        { status: 400 },
      );
    }

    const guestsValue = optionalString(body.guests);
    const guests = guestsValue === null ? null : Number.parseInt(guestsValue, 10);

    if (guests !== null && (!Number.isSafeInteger(guests) || guests < 1)) {
      return Response.json(
        { success: false, message: "Invalid number of guests" },
        { status: 400 },
      );
    }

    const db = await getDb();
    const [enquiry] = await db
      .insert(enquiries)
      .values({
        fullName,
        email,
        phone: optionalString(body.phone),
        enquiryType,
        preferredDate: optionalString(body.preferredDate),
        guests,
        message: optionalString(body.message),
      })
      .returning();

    return Response.json({
      success: true,
      message: "Received",
      data: enquiry,
    });
  } catch (error) {
    console.error("Failed to save enquiry", error);
    return Response.json(
      { success: false, message: "Unable to save enquiry" },
      { status: 500 },
    );
  }
}
