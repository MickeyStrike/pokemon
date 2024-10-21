import localFont from "next/font/local";
import { Poppins } from 'next/font/google'
export const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});