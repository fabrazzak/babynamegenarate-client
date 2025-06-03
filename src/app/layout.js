"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
