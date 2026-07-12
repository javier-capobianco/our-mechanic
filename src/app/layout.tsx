import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/src/components/NavBar";
import Footer from "@/src/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Our Mechanic | Auto Repair Shop in Calgary, AB",
    template: "%s | Our Mechanic",
  },
  description:
    "Family-owned automotive repair facility in Calgary, AB. Serving all makes and models since 2004. Engine repairs, diagnostics, inspections and more. Call 403-277-7174.",
  openGraph: {
    title: "Our Mechanic | Auto Repair Shop in Calgary, AB",
    description:
      "Family-owned automotive repair facility in Calgary, AB. Serving all makes and models since 2004.",
    url: "https://ourmechanic.ca",
    siteName: "Our Mechanic",
    locale: "en_CA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://kit.fontawesome.com/a430def3ab.js"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>

    </html>
  );
}
