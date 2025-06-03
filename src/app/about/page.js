'use client';
import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <section id="about" className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            The Power of a Name
          </h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Names are more than identity — they’re a calling, a blessing, and a declaration of purpose.
          </p>
        </motion.div>

        {/* Grid Content */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Biblical Significance
            </h3>
            <p className="text-gray-700 leading-relaxed">
              In the Bible, names hold great importance. God Himself spoke the world into existence with powerful words.
              When God named Adam, Eve, and many others, He was revealing their purpose and calling. Names reflect identity, prophecy, and divine intention.
            </p>
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-700 leading-relaxed">
              BabyNameBlessing.com is dedicated to helping you find a meaningful name rooted in faith and scripture.
              We believe every child is a unique gift from God, and their name should reflect His love, hope, and purpose for their life.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
