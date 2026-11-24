import { Fraunces, Geist } from "next/font/google";

/** Polices du site, partagées par les layouts français et anglais (auto-hébergées par Next.js). */
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const fontClasses = `${geistSans.variable} ${fraunces.variable} antialiased`;
