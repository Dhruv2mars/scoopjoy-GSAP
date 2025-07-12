import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScoopJoy - Premium Ice Cream Experience",
  description: "Indulge in the finest ice cream flavors crafted with love and premium ingredients. Experience the joy of every scoop!",
  keywords: "ice cream, premium, flavors, dessert, sweet treats",
  authors: [{ name: "ScoopJoy Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}