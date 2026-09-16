import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { ToastProvider } from "@/components/providers/ToastProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/images/logo.jpeg",
  },
  title: "Ani Avetisyan | Experienced Full Stack Developer",
  description:
    "Experienced Full Stack Developer with 9+ years building modern web and mobile applications using React, React Native, TypeScript, and more. Based in Yerevan, Armenia.",
  keywords: [
    "Full Stack Developer",
    "React",
    "React Native",
    "JavaScript",
    "TypeScript",
    "Portfolio",
    "Ani Avetisyan",
  ],
  openGraph: {
    title: "Ani Avetisyan | Full Stack Developer",
    description:
      "Experienced Full Stack Developer with 9+ years building modern web and mobile applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <ThemeRegistry>
          <ToastProvider>{children}</ToastProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
