'use client';

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import AdBanner from '@/components/AdBanner/AdBanner';


const LoadingSpinner = () => (
  <svg
    className="animate-spin h-8 w-8 text-purple-500 mb-3"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

const cardMotion = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.3 } },
};

const HomePage = () => {


  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomName = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get('https://babynamegenarate.vercel.app/names');
      if (!data || !data.length) throw new Error('No names found');
      const randomName = data[Math.floor(Math.random() * data.length)];
      setName(randomName);
    } catch (err) {
      setError('Failed to fetch name. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomName();
  }, [fetchRandomName]);






  return (
    <div className="bg-gradient-to-br from-gray-50 to-purple-50 px-4 flex items-center justify-center md:min-h-screen relative overflow-hidden">
      <div className="max-w-2xl w-full text-center py-8 md:py-16 relative z-10">
        <motion.h1
          className="md:text-4xl text-2xl font-extrabold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600"
          {...fadeIn}
        >
          Beautiful Baby Names
        </motion.h1>

        <motion.p
          className="text-gray-600 md:text-xl text-md max-w-md mx-auto mb-10"
          {...fadeIn}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Find perfect names with meaning and theme
        </motion.p>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div key="error" {...fadeIn} className="text-red-600 font-semibold mb-4">
              {error}
            </motion.div>
          )}

          {name && !loading && !error && (
            <motion.div
              key={name._id}
              {...cardMotion}
              className="bg-white rounded-2xl shadow-xl p-8 max-w-xl mx-auto border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-400 to-indigo-500"></div>
              <div className="pl-6">
                <div className="flex justify-between items-start mb-2">
                  <motion.h2
                    className="md:text-3xl text-xl font-bold text-gray-900"
                    {...fadeIn}
                    transition={{ delay: 0.1 }}
                  >
                    Name: {name.name}
                  </motion.h2>
                </div>

                <motion.p className="text-gray-600 text-lg text-left mb-4" {...fadeIn} transition={{ delay: 0.2 }}>
                  Meaning: {name.meaning}
                </motion.p>

                {name.scripture && (
                  <motion.div
                    {...fadeIn}
                    transition={{ delay: 0.3 }}
                    className="bg-purple-50 rounded-lg p-4 mb-4 border-l-4 border-purple-400"
                  >
                    <p className="text-gray-700 italic text-left">Scripture: "{name.scripture}"</p>
                  </motion.div>
                )}

                {name.theme && (
                  <motion.div
                    {...fadeIn}
                    transition={{ delay: 0.4 }}
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Theme: {name.theme}
                    </span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div key="loading" {...fadeIn} className="flex flex-col items-center justify-center py-16">
              <LoadingSpinner />
              <p className="text-purple-600 font-semibold mt-4">Loading name...</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div {...fadeIn} transition={{ delay: 0.5 }} className="mt-10">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={fetchRandomName}
            disabled={loading}
            className="relative bg-gradient-to-r cursor-pointer from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold md:py-4 md:px-8  py-2 px-4 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-70"
          >
            <span className="relative z-10 flex items-center justify-center">
              <>
                Generate New Name

              </>
            </span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-4 bg-gray-100 rounded-lg"
        >
          <p className="text-gray-500 text-sm mb-2">Advertisement</p>
          <AdBanner></AdBanner>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 p-6 bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-xl border border-purple-200"
        >
          <h3 className="text-xl font-bold text-purple-800 mb-4 relative">
            {/* Affiliate Pick */}
            <span className="absolute -top-2  -right-4 text-xs  bg-purple-600 text-white px-2 py-0.5 rounded-full shadow">
              ✨ Featured
            </span>
          </h3>

          <a
            href="https://amzn.to/4mNQj6n"
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="flex flex-col md:flex-row items-stretch gap-6 group transition-all duration-300"
          >
            {/* Left Side Image - 50% width on md and above */}
            <div className="w-full md:w-1/2 relative overflow-hidden rounded-xl shadow-lg">
              <img
                src="https://m.media-amazon.com/images/I/714bmc4GPCL._AC_SX679_.jpg"
                alt="Child of God Muslin Swaddle Blanket"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-2 left-2 bg-white/80 text-purple-700 text-xs px-2 py-0.5 rounded shadow">
                Best Seller
              </span>
            </div>

            {/* Right Side Content - 50% width on md and above */}
            <div className="w-full md:w-1/2 flex flex-col justify-between pt-4">
              <div>
                <p className="text-gray-800 text-base font-medium mb-2 leading-snug">
                  Wrap your baby in comfort and prayer with the
                  <span className="font-semibold text-purple-700"> Child of God Muslin Swaddle Blanket</span>.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Each time you swaddle your baby, may it be a quiet moment of blessing—a prayer for peace,
                  protection, and grace over their life. Let this soft blanket be a reminder they are
                  cherished and held in God’s hands.
                </p>
              </div>
              <button className="mt-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm font-semibold py-2 px-5 rounded-full shadow-md hover:shadow-lg transition duration-300 self-start">
                View on Amazon
              </button>
            </div>
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default HomePage;
