import { DM_Sans, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/footer";
import Navbar from "./components/nav";

const dm = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jet = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reem's",
  description: "Reem's website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dm.variable} ${jet.variable}`}>
      <body className=" max-w-2xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto sm:min-w-screen md:min-w-0 min-h-screen flex flex-col px-2 md:px-0 text-gray-300">
          <div className="flex-none h-1/4">
            <Navbar />
          </div>
          <div className="flex-grow h-1/2">{children}</div>
          <div className="flex-none h-1/4 text-center">
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
