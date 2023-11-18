import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: "normal",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "GharBikri: Buy, Sell, Rent properties in Nepal",
  description:
    "GharBikri is a platform to buy, sell, rent properties in Nepal. We help you find the right property in Nepal.",
  creator: "Suyash Shrestha",
  keywords: [
    "GharBikri",
    "Ghar",
    "Bikri",
    "Nepal",
    "Property",
    "Real Estate",
    "Buy",
    "Sell",
    "Rent",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
