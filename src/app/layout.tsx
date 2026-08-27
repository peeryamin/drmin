import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Dr. Rafiq Simnani — Senior Consultant",
  description:
    "Certified robotic surgeon specializing in minimally invasive, robotic and advanced laparoscopic surgery.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#f5faf9] text-[#183236] antialiased selection:bg-[#d8a847] selection:text-[#062f36]">
        {children}
      </body>
    </html>
  );
}
