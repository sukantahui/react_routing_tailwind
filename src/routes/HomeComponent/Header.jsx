// src/Header.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import background from '../../assets/background.jpg';

const Header = () => {
  return (
    <>
      <Helmet>
        <title>Coder & AccoTax | Learn Coding Online</title>
        <meta
          name="description"
          content="Join Coder & AccoTax to learn full stack web development, Python, React, and more. Get career-ready with practical training."
        />
        <meta
          name="keywords"
          content="coding courses, web development, react, nodejs, full stack, learn coding"
        />
        <meta name="author" content="Coder & AccoTax" />
        <meta property="og:title" content="Coder & AccoTax" />
        <meta
          property="og:description"
          content="Learn to Code. Build the Future. Get Job-Ready with our expert-led courses."
        />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        <meta property="og:url" content="https://yourdomain.com/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <header
        className="text-white text-center min-h-[80vh] flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${background})`,
        }}
      >
        <div className="px-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Coder & AccoTax
          </h1>
          <p className="text-lg md:text-2xl font-medium mb-6">
            Shaping Futures with Code and Compliance.
          </p>
          <a
            href="#courses"
            role="button"
            aria-label="Explore available coding and taxation courses"
            className="inline-block bg-white text-black text-base md:text-lg font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition-all duration-300"
          >
            🚀 Explore Courses
          </a>
        </div>
      </header>
    </>
  );
};

export default Header;
