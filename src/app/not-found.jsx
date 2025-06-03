'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md"
      >
        <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Go Home
        </Link>
      </motion.div>
    </section>
  );
}
