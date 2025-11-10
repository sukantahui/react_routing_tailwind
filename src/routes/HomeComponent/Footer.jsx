// ===============================================
// Footer.jsx
// -----------------------------------------------
// Global site footer for Coder & AccoTax.
// Contains copyright, navigation,
// and organization microdata for SEO.
//
// Features:
// - Semantic <footer> with schema.org markup
// - Accessible navigation and "Back to Top" link
// - Subtle hover effects using Tailwind
// -----------------------------------------------

import React from "react";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  return (
    <footer
      className="bg-gray-900 text-gray-300 text-center py-6 border-t border-gray-700"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-3">
        {/* 🔹 Organization Info (SEO Microdata) */}
        <meta itemProp="name" content="Coder & AccoTax" />
        <meta itemProp="url" content="https://codernaccotax.co.in" />

        {/* 🔹 Optional Footer Navigation */}
        <nav
          aria-label="Footer Navigation"
          className="flex flex-wrap justify-center gap-4 text-sm mb-2"
        >
          <HashLink
            smooth
            to="/#about"
            className="hover:text-sky-400 transition-colors duration-300"
          >
            About
          </HashLink>
          <HashLink
            smooth
            to="/#courses"
            className="hover:text-sky-400 transition-colors duration-300"
          >
            Courses
          </HashLink>
          <HashLink
            smooth
            to="/#services"
            className="hover:text-sky-400 transition-colors duration-300"
          >
            Services
          </HashLink>
          <HashLink
            smooth
            to="/#contact"
            className="hover:text-sky-400 transition-colors duration-300"
          >
            Contact
          </HashLink>
        </nav>

        {/* 🔹 Copyright */}
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span itemProp="name" className="font-semibold text-sky-300">
            Coder & AccoTax
          </span>
          . All rights reserved.
        </p>

        {/* 🔹 Back to Top */}
        <HashLink
          smooth
          to="/#top"
          className="text-xs text-gray-400 hover:text-sky-400 mt-1 transition-colors duration-300"
          aria-label="Back to top"
        >
          ↑ Back to Top
        </HashLink>
      </div>
    </footer>
  );
};

export default Footer;
