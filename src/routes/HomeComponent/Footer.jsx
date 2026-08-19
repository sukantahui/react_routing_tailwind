// ===============================================
// Footer.jsx - Modern Multi-Column Dark Tech Footer
// -----------------------------------------------
// Features:
// - Multi-column layout with quick links & featured courses
// - ISO 9001:2015 certification trust badge
// - Smooth hash navigation and back to top action
// - Semantic microdata for SEO
// ===============================================

import React from "react";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";
import cnat from "../../assets/cnat.png";

const Footer = () => {
  return (
    <footer
      className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800/80 relative overflow-hidden"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-32 bg-sky-500/5 blur-3xl pointer-events-none" />

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={cnat}
                alt="Coder & AccoTax"
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-300 to-pink-400">
                  Coder & AccoTax
                </span>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">
                  ISO 9001:2015 Certified
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Barrackpore's trusted center of excellence for full stack development, Python, practical accounting, taxation, and board curriculum since 1998.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-sky-400">
              <i className="bi bi-shield-check text-emerald-400"></i>
              <span>28+ Years of Academic Trust</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <i className="bi bi-compass text-sky-400"></i>
              <span>Explore Links</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <HashLink smooth to="/#top" className="hover:text-sky-300 transition-colors">
                  Home
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#about" className="hover:text-sky-300 transition-colors">
                  About Us
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#courses" className="hover:text-sky-300 transition-colors">
                  All Courses & Programs
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#teachers" className="hover:text-sky-300 transition-colors">
                  Instructors & Faculty
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#services" className="hover:text-sky-300 transition-colors">
                  Corporate Services
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#contact" className="hover:text-sky-300 transition-colors">
                  Admissions & Contact
                </HashLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <i className="bi bi-stars text-purple-400"></i>
              <span>Popular Tracks</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <HashLink smooth to="/#courses" className="hover:text-purple-300 transition-colors">
                  Full Stack Web (React + Node)
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#courses" className="hover:text-purple-300 transition-colors">
                  Python & Data Analytics
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#courses" className="hover:text-purple-300 transition-colors">
                  Tally Prime & GST Taxation
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#courses" className="hover:text-purple-300 transition-colors">
                  ICSE / ISC Class 9-12 Java
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#courses" className="hover:text-purple-300 transition-colors">
                  C / C++ & Data Structures (DSA)
                </HashLink>
              </li>
              <li>
                <NavLink to="/tools/type-test" className="hover:text-purple-300 transition-colors">
                  Free Speed Typing Test Tool
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Coordinates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 flex items-center gap-2">
              <i className="bi bi-pin-map text-emerald-400"></i>
              <span>Institute Hub</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <p className="leading-relaxed">
                Ground Floor, 25(10/A) Shibtala Road, Nona Chandan Pukur, Barrackpore, Kolkata - 700122
              </p>
              <p>
                <strong className="text-slate-300 block">Phone Support:</strong>
                <a href="tel:9432456083" className="text-sky-400 hover:text-sky-300 transition">
                  +91 94324 56083
                </a>
              </p>
              <p>
                <strong className="text-slate-300 block">Email Inquiries:</strong>
                <a href="mailto:info.codenaccotax@co.in" className="text-sky-400 hover:text-sky-300 transition">
                  info.codenaccotax@co.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()}{" "}
            <span itemProp="name" className="font-semibold text-slate-200">
              Coder & AccoTax
            </span>
            . All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <HashLink
              smooth
              to="/#top"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-800 transition"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <i className="bi bi-arrow-up"></i>
            </HashLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
