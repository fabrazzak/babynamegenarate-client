"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Script from "next/script";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      {/* <Head>
        <meta name="google-adsense-account" content="ca-pub-7987554086610229" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7987554086610229"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <head>
        <meta name="google-adsense-account" content="ca-pub-7987554086610229" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7987554086610229"
          crossOrigin="anonymous"></script>
      </head> */}
       <meta name="google-adsense-account" content="ca-pub-7987554086610229" />
       <meta name="verification" content="61259d63f598a99a2e7564119028dca3" />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7987554086610229"
        crossOrigin="anonymous"
      ></script>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${loading ? "overflow-hidden" : ""
          }`}
      >
        {loading ? (
          <motion.div
            className="min-h-screen flex flex-col items-center justify-center bg-white text-black"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-xl font-medium">Loading...</div>
          </motion.div>
        ) : (
          <>

            <AuthProvider>
              <Navbar />
              <div>
                {children}
              </div>
              <Footer />
            </AuthProvider>

          </>
        )}
      </body>
    </html>
  );
}
