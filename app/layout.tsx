import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dear Villa Estate",
  description:
    "Discover Dear Villa Estate, its events, accommodation, international programs, and private experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
