// src/Header.jsx
import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import background from "../../assets/background2.jpg";

const Header = () => {
  return (
    <>
      <Helmet>
        <title>Coder & AccoTax | Learn Coding Online</title>
        <meta
          name="description"
          content="Join Coder & AccoTax to learn Full Stack Web Development, Python, React, and more. Get career-ready with practical training."
        />
        <meta
          name="keywords"
          content="coding courses, web development, react, nodejs, full stack, learn coding"
        />
        <meta name="author" content="Coder & AccoTax" />

        {/* ✅ Canonical URL */}
        <link rel="canonical" href="https://codernaccotax.co.in/" />

        {/* Open Graph */}
        <meta property="og:title" content="Coder & AccoTax | Learn Coding Online" />
        <meta
          property="og:description"
          content="Learn to Code. Build the Future. Get Job-Ready with our expert-led courses."
        />
        <meta
          property="og:image"
          content="https://codernaccotax.co.in/og-home.png"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codernaccotax.co.in/" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://codernaccotax.co.in/og-home.png"
        />
      </Helmet>



      {/* 🔹 Header Section */}
      <header
        className="relative text-white text-center min-h-[90vh] flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(10,10,20,0.7), rgba(10,10,20,0.7)), url(${background})`,
        }}
      >
        {/* 🔹 Animated Gradient Overlay */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,0.15),transparent_70%),radial-gradient(circle_at_70%_70%,rgba(147,51,234,0.15),transparent_70%)]"
        ></motion.div>

        {/* 🔹 Hero Content */}
        <div className="relative z-10 px-6 max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-purple-300 to-pink-300 drop-shadow-[0_0_20px_rgba(147,51,234,0.3)]"
          >
            Coder & AccoTax
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-2xl font-medium text-gray-300 mt-4 mb-8"
          >
            Shaping Futures with <span className="text-sky-400">Code</span> &
            <span className="text-purple-400"> Compliance</span>.
          </motion.p>

          <motion.a
            href="#courses"
            role="button"
            aria-label="Explore available coding and taxation courses"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block bg-gradient-to-r from-sky-600 to-purple-600 text-white text-base md:text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-sky-400/40 transition-all duration-500"
          >
            🚀 Explore Courses
          </motion.a>
        </div>

        {/* 🔹 Decorative Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 text-sky-400/40 text-6xl select-none"
        >
          💻
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-16 text-purple-400/40 text-5xl select-none"
        >
          ⚙️
        </motion.div>
      </header>
    </>
  );
};

export default Header;
