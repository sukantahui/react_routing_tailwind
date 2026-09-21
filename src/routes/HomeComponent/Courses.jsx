// ===============================================
// Courses.jsx - Modern Glassmorphism Course Catalog & Explorer
// -----------------------------------------------
// Features:
// - Dynamic category filtering & high-precision search
// - Rich course cards with duration, level, mode, skills, fees & ratings
// - Interactive Course Details Modal with Curriculum, Projects, Outcomes & Scholarship
// - Direct WhatsApp integration with prefilled inquiry messages
// ===============================================

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import coursesData from "../../data/courses.json";
import StudentCourseQRModal from "../../components/StudentCourseQRModal";

// Course & Group Images
import javaImg from "../../assets/course-images/java-logo.svg";
import reactImg from "../../assets/course-images/react-logo.svg";
import pythonImg from "../../assets/course-images/python-logo.svg";
import clanguage from "../../assets/course-images/clanguage.svg";
import dsa from "../../assets/course-images/dsa.svg";
import sql from "../../assets/course-images/sql.svg";
import mysql from "../../assets/course-images/mysql.svg";
import databaselabs from "../../assets/course-images/database-labs.svg";
import databaseServer from "../../assets/course-images/databaseServer.svg";
import defaultImg from "../../assets/course-images/default-logo.svg";
import jsImg from "../../assets/course-images/js-logo.svg";
import nodeImg from "../../assets/course-images/node-logo.svg";
import gitImg from "../../assets/course-images/git-logo.svg";
import excelCourseImg from "../../assets/course-images/excel-logo.svg";

import webDevImg from "../../assets/group-images/webdev.logo.svg";
import codeImg from "../../assets/group-images/code.logo.svg";
import excelImg from "../../assets/group-images/excel.logo.svg";
import taxImg from "../../assets/group-images/tax.logo.svg";
import hardwareImg from "../../assets/group-images/hardware.logo.svg";
import programmingImg from "../../assets/group-images/programming.logo.svg";
import accountsImg from "../../assets/group-images/accounts.logo.svg";
import dataanalysisImg from "../../assets/group-images/dataanalysis.logo.svg";
import studentImg from "../../assets/group-images/student.logo.svg";

const imageMap = {
  javaImg,
  reactImg,
  pythonImg,
  clanguage,
  dsa,
  sql,
  mysql,
  databaselabs,
  databaseServer,
  defaultImg,
  jsImg,
  nodeImg,
  gitImg,
  excelCourseImg,
  webDevImg,
  codeImg,
  excelImg,
  taxImg,
  hardwareImg,
  programmingImg,
  accountsImg,
  dataanalysisImg,
  studentImg,
};

const WHATSAPP_NUMBER = "919432456083";

// Helper to safely format text containing markdown **bold** markers
const renderFormattedText = (text) => {
  if (!text) return null;
  const parts = String(text).split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="text-white font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

// Level color styling helper
const getLevelBadgeClass = (level = "") => {
  const l = level.toLowerCase();
  if (l.includes("beginner")) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
  if (l.includes("intermediate")) return "bg-sky-500/10 text-sky-400 border-sky-500/30";
  if (l.includes("advanced")) return "bg-purple-500/10 text-purple-300 border-purple-500/30";
  return "bg-amber-500/10 text-amber-300 border-amber-500/30";
};

// Badge styling helper
const getBadgeClass = (badge = "") => {
  const b = badge.toLowerCase();
  if (b === "popular") return "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-amber-500/20";
  if (b === "new") return "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-emerald-500/20";
  if (b === "advanced") return "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-purple-500/20";
  return "bg-gradient-to-r from-sky-500 to-blue-500 text-slate-950 font-bold shadow-sky-500/20";
};

// Course Details Modal Component
const CourseDetailsModal = ({ course, category, onClose, onOpenQR }) => {
  const [activeTab, setActiveTab] = useState("syllabus");
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!course) return null;

  const details = course.details || {};
  const syllabus = details.syllabus || [];
  const projects = details.projects || [];
  const outcomes = details.learningOutcomes || [];
  const skills = course.skills || [];

  const handleCopyLink = () => {
    const textToCopy = `${course.title} - Coder & AccoTax\nDuration: ${course.duration || 'Comprehensive'}\nFee: ${course.fee || 'Contact for details'}\nhttps://codernaccotax.co.in/#courses`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const encodeWhatsAppMessage = () => {
    const msg = `Hi Coder & AccoTax! I would like to get complete admission details and syllabus for the course "${course.title}" (${course.duration || 'Comprehensive'}, ${course.level || 'All Levels'}). Could you please share the upcoming batch schedule and enrollment process?`;
    return encodeURIComponent(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-label="Close modal backdrop"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-black/80 flex flex-col max-h-[92vh] z-10 overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with generous padding & proper spacing */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 shadow-md transition"
            aria-label="Close modal"
          >
            <i className="bi bi-x-lg text-lg"></i>
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pr-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-800 border border-slate-700 p-3 flex items-center justify-center flex-shrink-0 shadow-xl shadow-sky-500/10">
              <img
                src={imageMap[course.image] || imageMap.defaultImg}
                alt={course.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                {category && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sky-400">
                    {category}
                  </span>
                )}
                {course.badge && (
                  <span className={`text-[11px] px-3 py-1 rounded-full shadow-sm uppercase tracking-wider ${getBadgeClass(course.badge)}`}>
                    {course.badge}
                  </span>
                )}
                {course.level && (
                  <span className={`text-xs px-3 py-1 rounded-full border ${getLevelBadgeClass(course.level)}`}>
                    {course.level}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {course.title}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed line-clamp-2">
                {course.desc}
              </p>
            </div>
          </div>

          {/* Quick Highlight Stats with spacious layout */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-800/90 text-xs">
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 text-base">
                <i className="bi bi-clock"></i>
              </div>
              <div className="min-w-0">
                <span className="text-slate-400 text-[11px] font-medium block">Duration</span>
                <span className="font-bold text-white text-xs sm:text-sm truncate block">{course.duration || "Self-Paced"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 text-base">
                <i className="bi bi-laptop"></i>
              </div>
              <div className="min-w-0">
                <span className="text-slate-400 text-[11px] font-medium block">Mode</span>
                <span className="font-bold text-white text-xs sm:text-sm truncate block">{course.mode || "Online / Offline"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 text-base">
                <i className="bi bi-person-check"></i>
              </div>
              <div className="min-w-0">
                <span className="text-slate-400 text-[11px] font-medium block">Mentor</span>
                <span className="font-bold text-white text-xs sm:text-sm truncate block">{course.instructor || "Sukanta Hui"}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/90 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 text-base">
                <i className="bi bi-star-fill"></i>
              </div>
              <div className="min-w-0">
                <span className="text-slate-400 text-[11px] font-medium block">Rating</span>
                <span className="font-bold text-white text-xs sm:text-sm truncate block">
                  {course.rating || "4.9"} ({course.studentsEnrolled || "250"}+)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation with spacious pills & zero clipping */}
        <div className="px-6 sm:px-8 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center gap-2.5 overflow-x-auto">
          {[
            { id: "syllabus", icon: "bi-journal-code", label: "Syllabus & Modules", count: syllabus.length },
            { id: "projects", icon: "bi-code-slash", label: "Projects & Outcomes", count: projects.length },
            { id: "overview", icon: "bi-info-circle", label: "Overview & Prerequisites" },
            { id: "scholarship", icon: "bi-mortarboard", label: "Fee & Scholarship" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 flex-shrink-0 ${
                activeTab === tab.id
                  ? "bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
              }`}
            >
              <i className={`bi ${tab.icon} text-sm`}></i>
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  activeTab === tab.id
                    ? "bg-sky-500/30 text-sky-200"
                    : "bg-slate-800 text-slate-400"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Body with generous padding */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-sm">
          {/* TAB 1: SYLLABUS */}
          {activeTab === "syllabus" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <i className="bi bi-journal-code text-sky-400"></i>
                  <span>Detailed Curriculum & Modules</span>
                </h4>
                <span className="text-xs text-slate-400 font-medium">
                  {syllabus.length} Structured Modules
                </span>
              </div>

              {syllabus.length > 0 ? (
                <div className="space-y-3">
                  {syllabus.map((moduleText, idx) => {
                    // Check if module text follows "Module X: [Title] – [Desc]"
                    const match = moduleText.match(/^(Module\s+\d+:?)\s*(.*?)(?:\s*–\s*|\s*-\s*)(.*)$/i);
                    return (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-sky-500/30 transition-all duration-200"
                      >
                        {match ? (
                          <div>
                            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-sky-500/15 text-sky-400 border border-sky-500/30">
                                {match[1]}
                              </span>
                              <h5 className="font-bold text-white text-sm">
                                {match[2]}
                              </h5>
                            </div>
                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-1">
                              {renderFormattedText(match[3])}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                              {renderFormattedText(moduleText)}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-300 text-sm leading-relaxed">
                  <p className="text-slate-200 font-semibold mb-2">Key Topics & Modules Covered:</p>
                  <p>{course.more || course.desc}</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROJECTS & OUTCOMES */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              {/* Projects Section */}
              {projects.length > 0 && (
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2 mb-3">
                    <i className="bi bi-code-slash text-purple-400"></i>
                    <span>Real-World Hands-on Projects</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {projects.map((project, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-purple-500/30 transition flex items-start gap-3"
                      >
                        <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5">
                          #{idx + 1}
                        </div>
                        <div>
                          <h5 className="font-semibold text-white text-xs sm:text-sm">
                            {renderFormattedText(project)}
                          </h5>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            Industry Grade Project
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Learning Outcomes */}
              {outcomes.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-base font-bold text-white flex items-center gap-2 mb-3">
                    <i className="bi bi-check2-circle text-emerald-400"></i>
                    <span>What You Will Achieve</span>
                  </h4>
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                    {outcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                        <i className="bi bi-patch-check-fill text-emerald-400 text-sm flex-shrink-0 mt-0.5"></i>
                        <span>{renderFormattedText(outcome)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: OVERVIEW & PREREQUISITES */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Detailed Overview */}
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2 mb-3">
                  <i className="bi bi-info-circle text-sky-400"></i>
                  <span>Course Overview</span>
                </h4>
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {details.overview ? (
                    <p>{renderFormattedText(details.overview)}</p>
                  ) : (
                    <p>{course.more || course.desc}</p>
                  )}
                </div>
              </div>

              {/* Skills Covered */}
              {skills.length > 0 && (
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2 mb-3">
                    <i className="bi bi-tags text-pink-400"></i>
                    <span>Skills & Technologies Covered</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-medium hover:border-sky-500/40 transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Prerequisites & Certification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <h5 className="font-bold text-white text-xs sm:text-sm flex items-center gap-2 mb-2 text-amber-300">
                    <i className="bi bi-exclamation-triangle"></i>
                    <span>Prerequisites</span>
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {details.prerequisites
                      ? renderFormattedText(details.prerequisites)
                      : "Open to passionate learners of all academic and professional backgrounds."}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <h5 className="font-bold text-white text-xs sm:text-sm flex items-center gap-2 mb-2 text-emerald-300">
                    <i className="bi bi-award"></i>
                    <span>Certification</span>
                  </h5>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {details.certification
                      ? renderFormattedText(details.certification)
                      : "ISO 9001:2015 recognized course completion certificate awarded on successful project completion."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FEE & SCHOLARSHIP */}
          {activeTab === "scholarship" && (
            <div className="space-y-5">
              {/* Pricing Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-slate-400 text-xs font-semibold block uppercase tracking-wider">
                    Standard Course Fee
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-baseline gap-2">
                    <span>{course.fee || "Affordable Fee"}</span>
                    <span className="text-xs text-slate-400 font-normal">
                      (Includes Lab + Study Material + Certification)
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-lg shadow-emerald-600/30 transition"
                >
                  <i className="bi bi-whatsapp"></i>
                  <span>Inquire for Admission</span>
                </a>
              </div>

              {/* Merit Scholarship Card */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm sm:text-base mb-2">
                  <i className="bi bi-mortarboard-fill text-amber-400 text-lg"></i>
                  <span>Merit-Based Scholarship & Financial Concession</span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                  {course.meritDiscount?.criteria ||
                    "Special scholarship available for meritorious students scoring 85%+ in academics or qualifying our entrance evaluation."}
                </p>
                <div className="flex items-center gap-2 text-xs text-amber-200/90 font-medium">
                  <i className="bi bi-check-circle-fill text-amber-400"></i>
                  <span>
                    {course.meritDiscount?.note ||
                      "Scholarship concession up to 25% applicable upon merit assessment."}
                  </span>
                </div>
              </div>

              {/* Mentorship Guarantee */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0 text-base">
                  <i className="bi bi-shield-check"></i>
                </div>
                <div>
                  <h6 className="font-bold text-white text-xs">100% Practical & Personalized Mentorship</h6>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Small batches with 1-on-1 doubt clearing sessions and lifetime post-course guidance.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with generous padding */}
        <div className="p-5 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenQR?.(course);
              }}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-purple-600/25 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 transition cursor-pointer"
              title="Generate Student Course QR & WhatsApp Message"
            >
              <i className="bi bi-qr-code-scan"></i>
              <span>Student QR &amp; WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Copy course details summary"
            >
              <i className={`bi ${copied ? "bi-check2 text-emerald-400" : "bi-share text-slate-400"}`}></i>
              <span>{copied ? "Details Copied!" : "Share / Copy"}</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 sm:flex-none text-xs font-semibold px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
            >
              Close
            </button>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition"
          >
            <i className="bi bi-whatsapp text-base"></i>
            <span>Inquire & Enroll on WhatsApp</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

const Courses = () => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [selectedCourseModal, setSelectedCourseModal] = useState(null);
  const [qrModalCourse, setQrModalCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const courseRefs = useRef({});

  // Collect all unique categories from data
  const filterCategories = useMemo(() => {
    if (!Array.isArray(coursesData)) return ["All"];
    const cats = ["All", ...new Set(coursesData.map((g) => g.category).filter(Boolean))];
    return cats;
  }, []);

  // Total courses count
  const totalCoursesCount = useMemo(() => {
    if (!Array.isArray(coursesData)) return 0;
    return coursesData.reduce((acc, curr) => acc + (curr.courses?.length || 0), 0);
  }, []);

  const toggleGroup = (category) => {
    setExpandedGroups((prev) => (prev[category] ? {} : { [category]: true }));
  };

  // Expand category automatically if search matches
  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      const matched = {};
      coursesData.forEach((group) => {
        const hasMatch = group.courses.some(
          (c) =>
            c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.desc?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.skills?.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        if (hasMatch) matched[group.category] = true;
      });
      setExpandedGroups(matched);
    }
  }, [searchTerm]);

  const filteredCourses = useCallback(
    (group) => {
      if (!searchTerm.trim()) return group.courses || [];
      const term = searchTerm.toLowerCase();
      return (group.courses || []).filter(
        (c) =>
          c.title.toLowerCase().includes(term) ||
          c.desc?.toLowerCase().includes(term) ||
          c.more?.toLowerCase().includes(term) ||
          c.skills?.some((s) => s.toLowerCase().includes(term)) ||
          c.instructor?.toLowerCase().includes(term) ||
          c.level?.toLowerCase().includes(term)
      );
    },
    [searchTerm]
  );

  const isGroupMatchingFilter = useCallback(
    (categoryName) => {
      if (selectedFilter === "All") return true;
      return categoryName.toLowerCase() === selectedFilter.toLowerCase();
    },
    [selectedFilter]
  );

  return (
    <section
      id="courses"
      className="relative py-16 sm:py-20 bg-slate-950 text-slate-100 border-b border-slate-800/80"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-400 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 inline-block">
            Course Catalog & Curriculum
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Explore Comprehensive Courses
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Hands-on practical training designed for beginners, high-school students, and job seekers. Click any course to view full syllabus & projects.
          </p>
        </div>

        {/* 🌟 Search Bar & Category Filter Pills */}
        <div className="max-w-4xl mx-auto mb-12 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <i className="bi bi-search absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-lg"></i>
            <input
              type="text"
              placeholder="Search by course name, topic, or technology (e.g. React, Python, Tally, Java, SQL, ICSE)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/20 text-slate-100 placeholder-slate-500 text-sm sm:text-base outline-none transition-all shadow-inner backdrop-blur-xl"
              aria-label="Search courses"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  selectedFilter === cat
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/25 scale-105"
                    : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Counter */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <span>
              Showing {selectedFilter === "All" ? "All Programs" : selectedFilter}
            </span>
            <span>
              Total {totalCoursesCount} professional courses available
            </span>
          </div>
        </div>

        {/* 🌟 Course Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {coursesData
            .filter((group) => isGroupMatchingFilter(group.category))
            .map((group) => {
              const isExpanded = expandedGroups[group.category];
              const visibleCourses = filteredCourses(group);
              if (visibleCourses.length === 0 && searchTerm) return null;

              return (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={`${isExpanded ? "md:col-span-2" : "md:col-span-1"}`}
                >
                  <div
                    onClick={() => toggleGroup(group.category)}
                    className="relative bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800/90 hover:border-sky-500/40 p-6 sm:p-7 cursor-pointer transition-all duration-300 shadow-xl shadow-black/20 group hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]"
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-slate-800/90 border border-slate-700/60 p-2.5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-sky-500/40 transition-all duration-300">
                          <img
                            loading="lazy"
                            src={imageMap[group.groupImage] || imageMap.defaultImg}
                            alt={`${group.category} icon`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors flex items-center gap-2 flex-wrap">
                            <span>{group.category}</span>
                            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-sky-400">
                              {group.courses.length} courses
                            </span>
                          </h3>
                          <p className="text-slate-400 text-xs sm:text-sm mt-1 line-clamp-1">
                            {group.groupDesc}
                          </p>
                        </div>
                      </div>

                      {/* Expand Chevron */}
                      <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:text-sky-400 group-hover:border-sky-500/40 transition-all flex-shrink-0">
                        <i className={`bi bi-chevron-${isExpanded ? "up" : "down"} text-sm transition-transform duration-300`}></i>
                      </div>
                    </div>

                    {/* Expandable Course Cards */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 pt-6 border-t border-slate-800"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {visibleCourses.map((course, index) => {
                            const details = course.details || {};
                            const syllabusCount = details.syllabus?.length || 0;
                            const projectCount = details.projects?.length || 0;
                            const skills = course.skills || [];

                            return (
                              <motion.div
                                key={course.courseID || index}
                                ref={(el) => (courseRefs.current[`${group.category}_${index}`] = el)}
                                className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-5 hover:border-slate-700 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group/card"
                              >
                                <div>
                                  {/* Top Row: Icon, Title, Badges */}
                                  <div className="flex items-start gap-3.5 mb-3">
                                    <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 p-2 flex items-center justify-center flex-shrink-0 group-hover/card:border-sky-500/40 transition">
                                      <img
                                        loading="lazy"
                                        src={imageMap[course.image] || imageMap.defaultImg}
                                        alt={`Course: ${course.title}`}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <h4 className="font-bold text-white text-base group-hover/card:text-sky-300 transition">
                                          {course.title}
                                        </h4>
                                        {course.badge && (
                                          <span
                                            className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${getBadgeClass(
                                              course.badge
                                            )}`}
                                          >
                                            {course.badge}
                                          </span>
                                        )}
                                      </div>

                                      {/* Quick Meta Row */}
                                      <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-400 flex-wrap">
                                        {course.duration && (
                                          <span className="flex items-center gap-1">
                                            <i className="bi bi-clock text-sky-400"></i>
                                            <span>{course.duration}</span>
                                          </span>
                                        )}
                                        {course.level && (
                                          <span className={`px-2 py-0.2 rounded-full border text-[10px] font-medium ${getLevelBadgeClass(course.level)}`}>
                                            {course.level}
                                          </span>
                                        )}
                                        {course.mode && (
                                          <span className="text-slate-400">
                                            • {course.mode}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Description */}
                                  <p className="text-slate-300 text-xs leading-relaxed mb-3 line-clamp-2">
                                    {course.desc}
                                  </p>

                                  {/* Skills Chips Preview */}
                                  {skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                      {skills.slice(0, 4).map((s, idx) => (
                                        <span
                                          key={idx}
                                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300"
                                        >
                                          {s}
                                        </span>
                                      ))}
                                      {skills.length > 4 && (
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-900 text-slate-400">
                                          +{skills.length - 4} more
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {/* Key Feature Highlights Pill */}
                                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-300 mb-3 flex-wrap">
                                    {syllabusCount > 0 && (
                                      <span className="flex items-center gap-1 text-sky-300">
                                        <i className="bi bi-journal-check"></i>
                                        <span>{syllabusCount} Modules</span>
                                      </span>
                                    )}
                                    {projectCount > 0 && (
                                      <span className="flex items-center gap-1 text-purple-300">
                                        <i className="bi bi-code-slash"></i>
                                        <span>{projectCount} Projects</span>
                                      </span>
                                    )}
                                    {course.fee && (
                                      <span className="ml-auto font-bold text-white text-xs">
                                        {course.fee}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
                                  <button
                                    onClick={() =>
                                      setSelectedCourseModal({
                                        course,
                                        category: group.category,
                                      })
                                    }
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 transition"
                                  >
                                    <i className="bi bi-eye"></i>
                                    <span>Details</span>
                                  </button>

                                  <button
                                    onClick={() => setQrModalCourse(course)}
                                    className="inline-flex items-center justify-center gap-1 text-xs font-semibold py-2 px-2.5 rounded-xl bg-purple-600/25 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/40 transition cursor-pointer"
                                    title="Generate Student Course QR & WhatsApp Message"
                                  >
                                    <i className="bi bi-qr-code-scan"></i>
                                    <span className="hidden sm:inline">Student QR</span>
                                  </button>

                                  <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                      `Hi Coder & AccoTax! I would like to inquire about the "${course.title}" course.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-1 text-xs font-semibold py-2 px-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 transition"
                                    title="Quick WhatsApp Inquiry"
                                  >
                                    <i className="bi bi-whatsapp"></i>
                                    <span className="hidden sm:inline">WhatsApp</span>
                                  </a>
                                </div>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isExpanded && (
                      <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
                        <span className="text-slate-400">
                          {group.courses.slice(0, 3).map((c) => c.title).join(", ")}...
                        </span>
                        <span className="text-sky-400 font-semibold flex items-center gap-1 flex-shrink-0 group-hover:translate-x-1 transition-transform">
                          <span>View Courses</span>
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>

      {/* 🌟 Interactive Course Details Modal */}
      <AnimatePresence>
        {selectedCourseModal && (
          <CourseDetailsModal
            course={selectedCourseModal.course}
            category={selectedCourseModal.category}
            onClose={() => setSelectedCourseModal(null)}
            onOpenQR={(c) => setQrModalCourse(c)}
          />
        )}
      </AnimatePresence>

      {/* 🎓 Student Course QR & WhatsApp Modal */}
      {qrModalCourse && (
        <StudentCourseQRModal
          isOpen={Boolean(qrModalCourse)}
          initialCourse={qrModalCourse}
          onClose={() => setQrModalCourse(null)}
        />
      )}
    </section>
  );
};

export default Courses;
