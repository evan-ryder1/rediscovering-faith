import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rediscovering Faith",
  description:
    "A Christian podcast community platform built as a capstone project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
