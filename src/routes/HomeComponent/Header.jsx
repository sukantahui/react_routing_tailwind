// ===============================================
// Header.jsx - Near Text-Free Immersive Hero
// ===============================================

import React from "react";
import background from "../../assets/background2.jpg";

const Header = () => {
  return (
    <header
      id="top"
      className="relative text-white text-center w-full flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden border-b border-slate-800/80"
      style={{
        minHeight: "calc(100vh - 56px)",
        height: "calc(100vh - 56px)",
        backgroundImage: `linear-gradient(rgba(8, 12, 22, 0.72), rgba(8, 12, 22, 0.72)), url(${background})`,
      }}
    >
      {/* Invisible SEO Primary H1 */}
      <h1 className="sr-only">
        Coder & AccoTax - Best Coding & Accounting Training Institute in Barrackpore
      </h1>

      {/* Main Content */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-purple-300 to-pink-300 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] tracking-tight">
          Coder & AccoTax
        </h2>

        <p className="text-lg sm:text-2xl md:text-3xl font-medium text-slate-200 mt-4 mb-8 leading-relaxed">
          Shaping Futures with <span className="text-sky-400 font-semibold">Code</span> &{" "}
          <span className="text-purple-400 font-semibold">Compliance</span>.
        </p>

        <a
          href="#courses"
          className="inline-block bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 text-white text-base sm:text-lg font-semibold px-8 py-3 rounded-full shadow-xl shadow-sky-500/30 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
        >
          Explore Courses
        </a>
      </div>
    </header>
  );
};

export default Header;
