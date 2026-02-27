import type { Metadata } from "next";
import { Lora, Marcellus } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Maya Spacetime Oracle",
  description: "Discover your Mayan astrology signature",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${marcellus.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
