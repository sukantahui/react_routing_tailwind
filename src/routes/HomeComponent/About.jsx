// ===============================================
// About.jsx - Minimal Text & Visual Highlights
// ===============================================

import React from "react";

const About = () => {
  const certificateLink = "/docs/iso-certificate.pdf";
  const githubLink = "https://github.com/codernaccotax";
  const yearsOfExcellence = new Date().getFullYear() - 1998;

  return (
    <section id="about" className="py-12 bg-slate-950 text-slate-100 border-b border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {/* Box 1: Core Summary */}
          <div className="md:col-span-2 bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">About Us</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">
                Pioneering IT & Accounting Education Since 1998
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {yearsOfExcellence}+ years of practical training in Full Stack Development, Python, Accounting, and ICSE/ISC Computer Science.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">5,000+ Students Trained</span>
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 font-medium inline-flex items-center gap-1"
              >
                <i className="bi bi-github"></i>
                <span>GitHub Projects</span>
              </a>
            </div>
          </div>

          {/* Box 2: ISO Badge */}
          <div className="bg-slate-900/70 border border-sky-500/30 rounded-2xl p-5 text-center flex flex-col justify-between">
            <div>
              <div className="text-2xl mb-1">🏅</div>
              <h3 className="text-sm font-bold text-white">ISO 9001:2015</h3>
              <p className="text-[11px] text-slate-400 mt-1">Certified Training Quality</p>
            </div>
            <a
              href={certificateLink}
              download="CoderAccoTax_ISO_Certificate.pdf"
              className="mt-3 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition"
            >
              <i className="bi bi-download"></i>
              <span>ISO Certificate</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;