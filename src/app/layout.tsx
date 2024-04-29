import type { Metadata } from "next";
import { Hanken_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const hanken = Hanken_Grotesk({ subsets: ["latin"] });
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BN",
  description: "Created by Asta Media",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full" lang="en">
      <body className={`h-full ${hanken.className}`}>{children}</body>
    </html>
  );
}
