import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr. Rafiq Simnani — Senior Consultant, Minimally Invasive & Robotic Surgery",
  description:
    "Certified robotic surgeon specializing in minimally invasive, robotic and advanced laparoscopic surgery. 16+ years, 7,500+ procedures.",
  openGraph: {
    title: "Dr. Rafiq Simnani — Minimally Invasive & Robotic Surgery",
    description:
      "16+ years, 7,500+ laparoscopic procedures. Pioneer of single-port and day-care surgery in Kashmir.",
    type: "profile",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#f5faf9] text-[#183236] antialiased selection:bg-[#d8a847] selection:text-[#062f36]">
        {children}
      </body>
    </html>
  );
}
