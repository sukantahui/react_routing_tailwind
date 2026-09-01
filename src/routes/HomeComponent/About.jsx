// ============================================================================
// About.jsx - Comprehensive, Professional About Us Section
// ============================================================================

import React from "react";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";

const About = () => {
  const certificateLink = "/docs/iso-certificate.pdf";
  const githubLink = "https://github.com/codernaccotax";
  const yearsOfExcellence = new Date().getFullYear() - 1998;

  const stats = [
    { value: `${yearsOfExcellence}+`, label: "Years Legacy", sub: "Since 1998 in Barrackpore" },
    { value: "5,000+", label: "Students Trained", sub: "Alumni across IT & Finance" },
    { value: "18+", label: "Specialized Courses", sub: "Coding, Accounts & Academics" },
    { value: "4.9 ★", label: "Google Rating", sub: "170+ Verified Reviews" },
  ];

  const pillars = [
    {
      icon: "bi-laptop",
      color: "from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400",
      title: "Real-World Practical Learning",
      desc: "Zero rote learning. Every student builds live web applications, designs relational databases, or files authentic GST & TDS returns with real company ledgers.",
    },
    {
      icon: "bi-person-check",
      color: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400",
      title: "Dedicated 1-on-1 Mentorship",
      desc: "Small focused batches with individualized attention, step-by-step lab guidance, code reviews, and lifetime post-course support from experienced mentors.",
    },
    {
      icon: "bi-award",
      color: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400",
      title: "ISO 9001:2015 Certified Quality",
      desc: "Internationally certified training standard and curriculum aligned with modern industry hiring trends and CBSE/ICSE/ISC board exam excellence.",
    },
    {
      icon: "bi-briefcase",
      color: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400",
      title: "Career & Placement Assistance",
      desc: "Portfolio development on GitHub, mock technical interviews, resume building, and direct guidance to help freshers and professionals transition smoothly.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-950 text-slate-100 border-b border-slate-800/80 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-950/60 border border-sky-800/60 px-3.5 py-1 rounded-full">
            About Coder & AccoTax
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Pioneering IT & Accounting Education Since 1998
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            For over {yearsOfExcellence} years, Coder & AccoTax has been the premier training institute in Barrackpore, 
            bridging the gap between traditional academics and real-world industry demands with rigorous hands-on practice.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="bg-slate-900/70 border border-slate-800/90 rounded-2xl p-5 text-center shadow-lg shadow-black/20 hover:border-slate-700 transition"
            >
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-300 mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mb-0.5">{stat.label}</div>
              <div className="text-[11px] text-slate-400">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Narrative & ISO Card (2-Col Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 items-stretch">
          
          {/* Detailed Narrative Card */}
          <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl shadow-black/30">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Our Mission & Legacy</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-snug">
                Empowering Students to Visualise Code & Master Financial Compliance
              </h3>
              <div className="text-slate-300 text-xs sm:text-sm leading-relaxed space-y-3">
                <p>
                  Founded by <strong className="text-white">Mr. Sukanta Hui</strong> and <strong className="text-white">Ms. Tanusree Hui</strong>, 
                  Coder & AccoTax started with a singular vision: to make high-end programming logic and financial compliance 
                  accessible, intuitive, and deeply practical for every learner.
                </p>
                <p>
                  Whether you are a school student preparing for <strong className="text-sky-300">ICSE/ISC Board Exams (Java/Python)</strong>, 
                  a college graduate aspiring to become a <strong className="text-sky-300">Full Stack Developer</strong>, 
                  or a commerce professional mastering <strong className="text-emerald-300">TallyPrime, GST & TDS Return Filing</strong>, 
                  we provide complete personalized mentorship tailored to your learning pace.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4 text-slate-400">
                <span className="flex items-center gap-1.5">
                  <i className="bi bi-geo-alt text-sky-400"></i>
                  <span>Barrackpore, Kolkata</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="bi bi-people text-purple-400"></i>
                  <span>Offline & Online Batches</span>
                </span>
              </div>

              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold transition"
              >
                <i className="bi bi-github text-sm"></i>
                <span>Explore Student GitHub Repos</span>
                <i className="bi bi-arrow-up-right text-[10px]"></i>
              </a>
            </div>
          </div>

          {/* ISO Quality & Accreditation Card */}
          <div className="bg-gradient-to-b from-slate-900/90 to-slate-950 border border-sky-500/30 rounded-2xl p-6 sm:p-7 flex flex-col justify-between text-center shadow-xl shadow-sky-500/5">
            <div>
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shadow-inner">
                🏅
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2.5 py-0.5 rounded-full">
                Accreditation
              </span>
              <h3 className="text-lg font-bold text-white mt-3 mb-1">ISO 9001:2015 Certified</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Our curriculum and training methodologies adhere to international quality standards for technical education.
              </p>
              
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3 text-left space-y-1.5 text-[11px] text-slate-400 mb-6">
                <div className="flex items-center gap-2 text-slate-300">
                  <i className="bi bi-check-circle-fill text-emerald-400 text-xs"></i>
                  <span>Standardized Syllabus Modules</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <i className="bi bi-check-circle-fill text-emerald-400 text-xs"></i>
                  <span>Structured Lab Evaluations</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <i className="bi bi-check-circle-fill text-emerald-400 text-xs"></i>
                  <span>Verified Completion Certificates</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={certificateLink}
                download="CoderAccoTax_ISO_Certificate.pdf"
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/25 transition active:scale-95 cursor-pointer"
              >
                <i className="bi bi-download"></i>
                <span>Download ISO Certificate</span>
              </a>

              <HashLink
                smooth
                to="/#contact"
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-medium py-2 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
              >
                <span>Visit Our Campus</span>
                <i className="bi bi-arrow-right text-[10px]"></i>
              </HashLink>
            </div>
          </div>
        </div>

        {/* 4 Core Training Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.4 }}
              className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition group hover:scale-[1.01]"
            >
              <div>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${pillar.color} border flex items-center justify-center mb-3.5 text-lg group-hover:scale-110 transition-transform`}>
                  <i className={`bi ${pillar.icon}`}></i>
                </div>
                <h4 className="text-sm font-bold text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;