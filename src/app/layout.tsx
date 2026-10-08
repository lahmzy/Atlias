import type { Metadata } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "@/components/Header";
import "./globals.css";

// Body / UI / labels — geometric sans (see globals.css @theme).
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

// Display / headings — elegant high-contrast serif.
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Atlias — Clean beauty & cosmetics",
  description:
    "Cruelty-free, vegan skincare and cosmetics. Thoughtful formulas for your everyday beauty routine.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jost.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
