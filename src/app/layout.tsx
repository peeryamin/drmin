import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["300","400","600","700"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Dr. Rafiq Simnani — Senior Consultant",
  description: "Certified robotic surgeon specializing in minimally invasive, robotic and advanced laparoscopic surgery.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={display.variable}>
      <body className="bg-[#f5faf9] text-[#183236] antialiased selection:bg-[#d8a847] selection:text-[#062f36] font-[var(--font-display)]">
        {children}
      </body>
    </html>
  );
}
