"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_002_data_entry_editing_and_formatting_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic8_files/topic8_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic8() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    sectionsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "data_entry_formatting_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(18px); }
          to { transform: translateY(0); }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              📝 Data Hygiene & Formatting · Topic 8
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Beginner
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 1 & 2: Remember & Understand
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Practice Multiple Choice Questions (MCQ): Data Entry, Editing &amp; Custom Number Formatting Mastery
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Test your theoretical and practical mastery of Module 1.2: Data types, floating-point precision, Flash Fill pattern mechanics, Custom Number Formatting masks (Positive; Negative; Zero; Text), Date serial conversions, and Center Across Selection.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Data Hygiene:</strong> Zero Text-Number Errors</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Custom Formatting:</strong> 4-Section Mask Engine</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>Pattern Speed:</strong> AI Flash Fill (Ctrl + E)</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 text-base font-mono">⚡</span>
            Formatting Mask & Syntax Anatomy
          </h2>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/90 font-mono text-sm sm:text-base text-sky-300 overflow-x-auto shadow-inner">
            =MCQ_EVALUATION(Module_1_2)
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Component</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Requirement</th>
                  <th className="py-3 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 font-mono">
                
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">30 Questions</td>
                  <td className="py-3 px-4 text-teal-400">Structured MCQ</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Assessment</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Comprehensive questions covering data types, formatting masks, and shortcuts.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Explanations</td>
                  <td className="py-3 px-4 text-teal-400">Deep Rationale</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Pedagogical</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Detailed breakdown of underlying Excel engine mechanics.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-sky-300 font-semibold font-sans">Exam Wisdom</td>
                  <td className="py-3 px-4 text-teal-400">Exam Hook</td>
                  <td className="py-3 px-4 text-amber-400 font-sans">Exam Tip</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Classroom tips and memory anchors from instructor Sukanta Hui.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/60 flex items-start gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white">Presentation Evaluation: </strong>
              Returns an optimized <span className="text-sky-300 font-semibold">Self-Assessment Knowledge Score</span> while keeping underlying memory values 100% intact.
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">🔬</span>
            Conceptual & Computational Mechanics
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>Testing your knowledge of formatting tokens (#, 0, ?, @, [h], [Red]) prepares you for corporate financial modeling standards.</p>
            <p>Review the question explanations below to master edge cases in date arithmetic, time fractions, and text coercion.</p>
            <p>Achieve 90%+ on this assessment before moving forward to Basic Formulas &amp; Functions in Module 1.3.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">Memory vs Display Layer Separation</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Excel completely decouples raw data values stored in floating-point memory from the cosmetic formatting mask applied to the screen.
              </p>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">Inductive Pattern Matching</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Flash Fill inspects token sequences, word boundaries, and punctuation delimiters to synthesize reproducible string transformation rules.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 text-base font-mono">📐</span>
            Visual Data Flow: Module 1.2 Assessment &amp; Core Competency Evaluation
          </h2>

          <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-x-auto">
            <svg viewBox="0 0 800 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="t8_qbank" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0369a1" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="t8_eval" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="t8_score" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <rect x="30" y="50" width="200" height="150" rx="12" fill="url(#t8_qbank)" stroke="#38bdf8" strokeWidth="2" />
              <text x="130" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">1. MCQ Question Bank</text>
              <text x="130" y="115" textAnchor="middle" fill="#e0f2fe" fontSize="11">Data Types &amp; Flash Fill</text>
              <text x="130" y="135" textAnchor="middle" fill="#e0f2fe" fontSize="11">Custom Number Formatting</text>
              <text x="130" y="165" textAnchor="middle" fill="#bae6fd" fontSize="11" fontWeight="bold">30 Practice Questions</text>

              <path d="M 235 125 L 295 125" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="295,120 305,125 295,130" fill="#38bdf8" />

              <rect x="310" y="50" width="200" height="150" rx="12" fill="url(#t8_eval)" stroke="#34d399" strokeWidth="2" />
              <text x="410" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">2. Interactive Evaluator</text>
              <text x="410" y="115" textAnchor="middle" fill="#d1fae5" fontSize="11">Instant Real-Time Scoring</text>
              <text x="410" y="135" textAnchor="middle" fill="#d1fae5" fontSize="11">Explanation &amp; Hints</text>
              <text x="410" y="165" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">Validation Engine</text>

              <path d="M 515 125 L 575 125" stroke="#34d399" strokeWidth="3" strokeDasharray="6,4" />
              <polygon points="575,120 585,125 575,130" fill="#34d399" />

              <rect x="590" y="50" width="180" height="150" rx="12" fill="url(#t8_score)" stroke="#a78bfa" strokeWidth="2" />
              <text x="680" y="85" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">3. Skill Mastery Score</text>
              <text x="680" y="115" textAnchor="middle" fill="#ede9fe" fontSize="11">Competency Badge</text>
              <text x="680" y="135" textAnchor="middle" fill="#ede9fe" fontSize="11">Module 1.2 Verification</text>
              <text x="680" y="165" textAnchor="middle" fill="#ddd6fe" fontSize="11" fontWeight="bold">Certified Skill Badge</text>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL PRACTICE GRID & DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 text-base font-mono">📥</span>
                Interactive Spreadsheet & Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Interact with the dataset live below or download the master chapter workbook to practice locally in desktop Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download full .xlsx master workbook for Module 1.2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileUrl={sampleWorkbookUrl}
            sheetName="Topic8"
            title="Module 1.2 - Practice Multiple Choice Questions (MCQ): Data Entry, Editing &amp; Custom Number Formatting Mastery"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS (4+ CASES)
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 text-base font-mono">🏢</span>
            Real-World Business Scenarios (Bengal & Corporate Applications)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">01</span>
                <h3 className="text-base font-bold text-white">MOS Specialist &amp; Corporate Interview Preparation Scenario</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">A candidate prepares for advanced data formatting questions in corporate technical screenings.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Question_Topic</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Amateur_Response</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Certified_Mastery_Response</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">How to center headers without merging?</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">'Use Merge and Center'</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Use 'Center Across Selection' in Ctrl+1 to keep column sorting intact</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">How are dates stored in Excel?</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">'As date text'</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">As sequential integer serials starting from Day 1 on January 1, 1900</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Complete 30 Structured FAQ Questions below</div>
                <div className="text-emerald-400 font-semibold">Result: 100% readiness for corporate data analytics technical rounds.</div>
                <div className="text-slate-400 text-[11px]">Deep conceptual grounding separates elite spreadsheet engineers from basic users.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">02</span>
                <h3 className="text-base font-bold text-white">Auditing Firm Trainee Onboarding Validation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Validating that trainee accountants understand visual formatting vs mathematical values.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Validation_Task</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Common_Mistake</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Correct_Auditing_Principle</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Visual Rounding vs Math Rounding</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Assuming cell display 46 means underlying value is 46</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Underlying value remains 45.89 unless =ROUND() is used</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Conceptual Precision Verification</div>
                <div className="text-emerald-400 font-semibold">Result: Zero rounding discrepancies in audited financial reports.</div>
                <div className="text-slate-400 text-[11px]">Understanding format masks prevents costly audit reconciliation errors.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">03</span>
                <h3 className="text-base font-bold text-white">GST Reconciliation Data Type Alignment</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Ensuring invoice numbers with leading zeroes are not corrupted by numeric conversion.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Invoice_Number</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Raw_Entry</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Format_Applied</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Outcome</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">004521</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Entered as text ('004521)</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Preserved as 6 digits</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Zero GSTR-1 portal rejection</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Text Data Type Enforcement</div>
                <div className="text-emerald-400 font-semibold">Result: 100% tax filing compliance.</div>
                <div className="text-slate-400 text-[11px]">Preserving leading zeros in tax IDs is mandatory for regulatory compliance.</div>
              </div>
            </div>
            <div className="rounded-xl p-5 bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold flex items-center justify-center">04</span>
                <h3 className="text-base font-bold text-white">Financial Timesheet Cumulative Hours Validation</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Verifying that overtime pay formulas calculate elapsed hours exceeding 24h correctly.</p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300 border border-slate-800">
                  <tbody className="divide-y divide-slate-800">
                    
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Overtime_Hours</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Format_Used</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">Calculated_Pay</td></tr>
                    <tr><td className="p-2 border-r border-slate-800 font-mono text-[11px]">45:30</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">[h]:mm</td><td className="p-2 border-r border-slate-800 font-mono text-[11px]">45.5 * Hourly Rate = Correct Payout</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs space-y-1">
                <div className="text-sky-300 font-mono font-semibold">Applied: Square Bracket [h] Formatting</div>
                <div className="text-emerald-400 font-semibold">Result: Zero payroll calculation errors.</div>
                <div className="text-slate-400 text-[11px]">Cumulative time formatting guarantees accurate overtime calculations.</div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🪜</span>
            Step-by-Step Practical Implementation Guide
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-bold flex items-center justify-center shrink-0">1</span>
              <div>
                <h3 className="text-sm font-bold text-white">Select Target Range</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Highlight raw data cells. Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Ctrl + 1</kbd> to open the Format Cells dialog window.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 text-xs font-bold flex items-center justify-center shrink-0">2</span>
              <div>
                <h3 className="text-sm font-bold text-white">Select Category & Enter Mask</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Navigate to <strong>Custom</strong> and input the 4-section format mask (e.g. <code className="text-amber-300 font-mono">₹ #,##,##0.00;[Red]-₹ #,##0.00;"-";@</code>).
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">3</span>
              <div>
                <h3 className="text-sm font-bold text-white">Apply & AutoFit Columns</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click OK, then press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-xs">Alt + H + O + I</kbd> to eliminate any <code className="text-rose-300 font-mono">###</code> width overflow.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
              <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">4</span>
              <div>
                <h3 className="text-sm font-bold text-white">Verify Underlying Value in Formula Bar</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click formatted cells to confirm that the raw unrounded float value remains preserved in the Formula Bar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: COMMON PITFALLS & TROUBLESHOOTING MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[7] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 text-base font-mono">⚠️</span>
            Common Pitfalls & Diagnostic Troubleshooting
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-3 px-4">Error / Symptom</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Check</th>
                  <th className="py-3 px-4">Foolproof Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Confusing '#' and '0' in Custom Formats</td>
                  <td className="py-3 px-4 text-slate-300">'#' ignores extra zeros while '0' forces leading zeros.</td>
                  <td className="py-3 px-4 text-amber-300">Entering 5 with format '0000' yields '0005'; with '####' yields '5'.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Use '0' when fixed-width numbers (e.g. PIN codes, invoice IDs) are required.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Forgetting to Enclose Text Labels in Quotes</td>
                  <td className="py-3 px-4 text-slate-300">Writing custom format ₹ #,##0 Cr without quotes around Cr.</td>
                  <td className="py-3 px-4 text-amber-300">Excel misinterprets 'C' and 'r' as formatting command tokens.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Always wrap literal text in quotes: ₹ #,##0 " Cr".</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 text-rose-300 font-mono font-bold">Expecting Flash Fill to Auto-Update</td>
                  <td className="py-3 px-4 text-slate-300">Flash Fill outputs static text literals, not formulas.</td>
                  <td className="py-3 px-4 text-amber-300">Changing input text does not update Flash Fill results.</td>
                  <td className="py-3 px-4 text-emerald-400 font-medium">Re-trigger Ctrl+E or use dynamic text functions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & PRODUCTIVITY SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 text-base font-mono">💡</span>
            Classroom Pro Tips & High-Speed Shortcuts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + 1
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Format Cells dialog box.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + E
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Flash Fill.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Ctrl + `
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Formula Auditing mode.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-200 flex items-start gap-3">
              <kbd className="px-2.5 py-1 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-300 font-mono text-xs font-bold shrink-0">
                Alt + H + O + I
              </kbd>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">AutoFit Column Width.</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-2xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 text-base font-mono">🤔</span>
            Socratic Analytical Hints ("Think About...")
          </h2>

          <div className="space-y-3">
            
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">Why does the format code ';;;' make all cell contents completely invisible on screen while preserving values in the formula bar?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">How does Excel resolve the date serial 60 vs 61 in relation to the 1900 leap year bug?</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
              <span className="text-teal-400 text-base">❓</span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">What is the specific role of the '@' symbol in the fourth section of custom format masks?</p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Practice Multiple Choice Questions (MCQ): Data Entry, Editing &amp; Custom Number Formatting Mastery - Frequently Asked Questions"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & EXAM WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note="Test yourself with the 30 FAQ questions below! Make sure you understand the 4-section format mask and the difference between visual formatting and underlying numbers."
          />
        </div>
      </div>
    </div>
  );
}
