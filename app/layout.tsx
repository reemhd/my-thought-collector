import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";
import Navbar from "./components/nav"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reem's",
  description: "Reem's website",
};

const cx = (...classes: any[]) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cx(geistSans.variable, geistMono.variable)}>
      <body className=" max-w-2xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0  min-h-screen flex flex-col px-2 md:px-0 text-gray-300">
          <div className="flex-none h-1/4">
            <Navbar />
          </div>
          <div className="flex-grow h-1/2">{children}</div>
          <div className="flex-none h-1/4 text-center"><Footer /></div>
        </main>
      </body>
    </html>
  );
}
