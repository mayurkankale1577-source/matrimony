import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Matrimony",
  description: "Find Your Perfect Life Partner",
};

export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-100">
      <Script
    src="https://checkout.razorpay.com/v1/checkout.js"
    strategy="beforeInteractive"
  />
        
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <footer className="bg-white border-t py-4">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap gap-4 justify-center">
            
            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Terms & Conditions
            </Link>

            <Link href="/refund-policy">
              Refund Policy
            </Link>

            <Link href="/contact-us">
              Contact Us
            </Link>

          </div>
          <div className="text-center text-sm text-gray-500 mt-4">
  © 2026 RadhaKrishna Vadhuvar Suchak Mandal.
  All Rights Reserved.
</div>
        </footer>

      </body>
    </html>
  );
}