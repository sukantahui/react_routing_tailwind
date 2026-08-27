"use client";

import React, { useState, useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/custom_number_formatting_and_styling_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic13() {
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
    link.download = "custom_number_formatting_and_styling_master.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      <style>{`
        @keyframes fadeInSlide {
          from { transform: translateY(14px); }
          to { transform: translateY(0); }
        }
        .reveal-section {
          animation: fadeInSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="w-full space-y-4 sm:space-y-5">
        {/* =========================================================================
            SECTION 1: HERO HEADER & OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <span className="px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-[10px] font-bold uppercase tracking-wider">
              🎨 Mastery Lab · Topic 13
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-semibold">
              Format Engineering
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-[10px] font-semibold">
              Mastery · Bloom Level 6: Evaluate
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-snug">
            Practice Lab: 15 MCQs and 10 Custom Formatting Practical Workbook Challenges
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-5xl">
            Hands-on mastery assessment with 10 interactive challenge scenarios, formula blueprints, and workbook sheets. Master the underlying Excel format syntax, avoid common financial presentation traps, and build executive-ready spreadsheets.
          </p>

          <div className="mt-3 pt-2.5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-sky-400 font-bold">✓</span>
              <span><strong>Code:</strong> EXCEL-PRO-901</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-emerald-400 font-bold">✓</span>
              <span><strong>Module:</strong> Custom Formatting &amp; Presentation</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-indigo-400 font-bold">✓</span>
              <span><strong>Center:</strong> Coder &amp; AccoTax</span>
            </div>
          </div>
        </header>

        

        

        
        {/* =========================================================================
            SECTION: 20 COMPREHENSIVE REAL-WORLD EXAMPLES & EXPLANATIONS
        ========================================================================= */}
        <section
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 text-sm font-mono font-bold">📊</span>
                20 Comprehensive Real-World Examples with Explanations
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparing raw stored float data vs custom format masks, visual cell displays, formula bar reality, and underlying business logic.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 shrink-0 font-bold">
              20 Scenarios
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/70">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Code &amp; Category</th>
                  <th className="py-2.5 px-3">Raw Stored Value</th>
                  <th className="py-2.5 px-3">Applied Format Mask</th>
                  <th className="py-2.5 px-3">Visual Formatted Cell</th>
                  <th className="py-2.5 px-3">Formula Bar Reality</th>
                  <th className="py-2.5 px-3 min-w-[280px]">Business Logic &amp; Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                
                <tr key="0" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">1</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-101</div>
                    <div>Forex Trade Settlement</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">125438.8765</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">₹#,##0.00</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">₹125,438.88</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">125438.8765</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Rounds visually to 2 decimal paise; downstream arbitrage ledger formulas use exact 4-decimal precision.</td>
                </tr>
                

                <tr key="1" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">2</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-102</div>
                    <div>Mortgage Lending APR</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">0.08375</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">0.00%</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">8.38%</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">0.08375</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Displays percentage visually; prevents user from multiplying by 100 which would break PMT() calculations.</td>
                </tr>
                

                <tr key="2" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">3</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-103</div>
                    <div>Fixed Deposit Yield</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">0.07125</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">0.000%</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">7.125%</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">0.07125</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Forces 3 decimal places to display banking basis points while calculations use exact floating-point interest rate.</td>
                </tr>
                

                <tr key="3" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">4</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-104</div>
                    <div>US Treasury Bond Quote</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">98.4375</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2"># ??/??</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">98 7/16</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">98.4375</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Displays traditional Wall Street fractional bond pricing (7/16) without losing decimal accuracy in yield formulas.</td>
                </tr>
                

                <tr key="4" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">5</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-105</div>
                    <div>Contract Effective Date</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">45678</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">dddd, mmmm dd, yyyy</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">Tuesday, January 21, 2025</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">45678</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Stored as integer day count elapsed since Jan 1, 1900; enables direct date arithmetic (=B2-B1).</td>
                </tr>
                

                <tr key="5" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">6</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-106</div>
                    <div>Shift Punch In Time</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">45678.375</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">hh:mm AM/PM</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">09:00 AM</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">45678.375</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">0.375 represents fraction of day (9/24 hrs); direct timestamp subtraction yields exact worked shift hours.</td>
                </tr>
                

                <tr key="6" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">7</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-107</div>
                    <div>Corporate Cash Reserve</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">14500000</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">₹#,##0.0,,&quot; Cr&quot;</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">₹14.5 Cr</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">14500000</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">2 trailing commas divide visually by 1,000,000 for C-suite dashboards without altering raw ₹1.45 Crore balance.</td>
                </tr>
                

                <tr key="7" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">8</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-108</div>
                    <div>Warehouse Steel Inventory</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">8450.625</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">0.00&quot; KG&quot;</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">8,450.63 KG</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">8450.625</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Attaches engineering unit label without converting cell to text, allowing =SUM() to calculate total tonnage.</td>
                </tr>
                

                <tr key="8" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">9</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-109</div>
                    <div>Zero Balance Clearing</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">0</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">₹#,##0.00;(₹#,##0.00);&quot;-&quot;</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">-</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">0</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Section 3 replaces zero with clean accounting hyphen (-), reducing visual clutter in financial statements.</td>
                </tr>
                

                <tr key="9" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">10</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-110</div>
                    <div>Operating Segment Loss</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">-450000</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">₹#,##0.00;(₹#,##0.00)</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">(₹450,000.00)</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">-450000</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Section 2 applies Wall Street accounting parenthesis mask to indicate negative deficit without minus sign.</td>
                </tr>
                

                <tr key="10" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">11</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-111</div>
                    <div>Employee ID Code</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">45</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">&quot;EMP-&quot;00000</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">EMP-00045</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">45</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">0 token forces 5-digit zero padding with &#39;EMP-&#39; prefix while cell remains pure numeric integer 45.</td>
                </tr>
                

                <tr key="11" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">12</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-112</div>
                    <div>Tax Registration Number</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">1987654321</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">00-00000-000</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">19-87654-321</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">1987654321</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Formats numeric tax ID into standard 2-5-3 hyphenated pattern for statutory compliance.</td>
                </tr>
                

                <tr key="12" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">13</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-113</div>
                    <div>Commercial Floor Area</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">12500</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">#,##0&quot; Sq.Ft.&quot;</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">12,500 Sq.Ft.</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">12500</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Preserves numeric area value so multiplying by Rent/Sq.Ft. computes total rental revenue seamlessly.</td>
                </tr>
                

                <tr key="13" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">14</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-114</div>
                    <div>Customer Support Helpline</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">9876543210</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">+91 00000 00000</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">+91 98765 43210</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">9876543210</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Formats 10-digit mobile number into international telecom standard with country code.</td>
                </tr>
                

                <tr key="14" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">15</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-115</div>
                    <div>Machine Run-Time Log</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">1.75</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">[h]:mm:ss</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">42:00:00</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">1.75</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Square brackets [h] prevent 24-hour clock rollover, displaying cumulative 42 elapsed hours.</td>
                </tr>
                

                <tr key="15" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">16</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-116</div>
                    <div>Confidential Salary Base</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">2500000</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">;;;</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">(Blank / Hidden)</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">2500000</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Triple semicolon hides value on sheet grid while formulas and executive charts still read ₹25 Lakhs.</td>
                </tr>
                

                <tr key="16" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">17</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-117</div>
                    <div>Quarterly Profit Growth</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">0.142</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">[Green]+0.0% ▲;[Red]-0.0% ▼;&quot;-&quot;</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">+14.2% ▲</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">0.142</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Embeds color tag and Unicode delta arrow directly into number format layer without slow conditional formatting.</td>
                </tr>
                

                <tr key="17" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">18</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-118</div>
                    <div>Audit Status Annotation</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">&quot;Awaiting Signoff&quot;</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">#,##0;-#,##0;0;&quot;NOTE: &quot;@</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">NOTE: Awaiting Signoff</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">Awaiting Signoff</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">@ token prefixes custom label to user-typed text string while preserving raw text data.</td>
                </tr>
                

                <tr key="18" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">19</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-119</div>
                    <div>Executive Balance Fill</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">1250000</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">₹* #,##0.00</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">₹   1,250,000.00</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">1250000</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Asterisk (*) fills cell width with spaces, pushing ₹ to far left and number to far right edge.</td>
                </tr>
                

                <tr key="19" className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-slate-500">20</td>
                  <td className="py-2.5 px-3 font-semibold text-sky-300">
                    <div className="font-mono text-[11px] text-slate-400">ACC-120</div>
                    <div>Precision Manufacturing</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">0.00045</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">0.00000&quot; mm&quot;</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">0.00045 mm</td>
                  <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">0.00045</td>
                  <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">Forces 5 decimal places to display critical precision tolerances for aerospace engineering parts.</td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </section>
  

        {/* =========================================================================
            SECTION 2: ARCHITECTURAL DEEP-DIVE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200 space-y-3.5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 text-sm font-mono">⚡</span>
                Comprehensive Format Engineering Assessment
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Core mechanics and internal parser rules governing this formatting dimension.
              </p>
            </div>
            <span className="text-[11px] font-mono text-sky-300 bg-sky-950/60 px-2.5 py-0.5 rounded-lg border border-sky-800 shrink-0">
              Architecture
            </span>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Test your end-to-end format engineering knowledge across 10 structured corporate modeling challenges and 15 interactive MCQs covering 4-section syntax, trailing commas, bracket conditions, date serial numbers, and stealth masking.
          </p>

          <div className="p-3 rounded-lg bg-slate-950/90 border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto shadow-inner">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1 font-sans">Token Syntax Blueprint:</div>
            <div>10 Practical Challenges + 15 Domain Assessment MCQs + Full Workbook Solutions</div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: STEP-BY-STEP EXCEL PROTOCOL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-mono">🛠️</span>
              Step-by-Step Construction Protocol in Microsoft Excel
            </h2>
            <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-800">
              Protocol
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-sky-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-[10px]">1</span>
                Step 1: Select Target Range
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Highlight the numbers or financial ledger cells you wish to format.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-[10px]">2</span>
                Step 2: Launch Format Dialog
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Press keyboard accelerator <kbd className="px-1.5 py-0.5 bg-slate-900 border border-slate-700 rounded text-cyan-300 font-mono text-[10px]">Ctrl + 1</kbd> (or Cmd + 1).
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-teal-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-[10px]">3</span>
                Step 3: Select Custom Category
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Click <strong>Custom</strong> at the bottom of the Category list on the left.
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
              <div className="font-bold text-purple-300 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-purple-950 border border-purple-700 text-purple-300 flex items-center justify-center text-[10px]">4</span>
                Step 4: Enter String &amp; OK
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Type the format code in the <strong>Type:</strong> input box and press Enter.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: DEDICATED MASTER WORKBOOK VIEWER & DOWNLOAD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm font-mono">📥</span>
                Live Demonstration Sheet: Topic13_Formatting_Lab
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect the live spreadsheet below or download the master workbook to practice in desktop Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all duration-200 shadow-md shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download the master practice workbook (.xlsx)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Master Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic13_Formatting_Lab"
            title="Custom Number Formatting & Presentation Suite"
            rowsPerPage={12}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 5: COMMON MISTAKES & DIAGNOSTIC MATRIX
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 text-sm font-mono">⚠️</span>
              Common Formatting Pitfalls &amp; Diagnostic Fixes
            </h2>
            <span className="text-[11px] font-mono text-rose-300 bg-rose-950/60 px-2.5 py-0.5 rounded-lg border border-rose-800">
              Troubleshooting
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Symptom / Error Encountered</th>
                  <th className="py-2.5 px-3">Root Cause</th>
                  <th className="py-2.5 px-3">The Exact 5-Second Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">SUM() returns wrong total</td>
                  <td className="py-2.5 px-3">Cell format rounds numbers visually, but SUM uses exact unrounded floats.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Use ROUND() formula if mathematical truncation is required.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">#VALUE! calculation error</td>
                  <td className="py-2.5 px-3">User typed text units (e.g. &quot;50 KG&quot;) into the cell instead of using format masks.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Type raw number 50 and apply format mask 0&quot; KG&quot;.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Invalid Number Format error</td>
                  <td className="py-2.5 px-3">Mismatched brackets or unquoted literal text in the custom format string.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Enclose all literal words in quotes: #,##0&quot; Units&quot;.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[5] = el)} className="reveal-section">
          <FAQTemplate
            title="Practice Lab: 15 MCQs and 10 Custom Formatting Practical Workbook Challenges - Mastery Q&amp;A"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 7: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section">
          <Teacher
            note="Complete all 10 practice lab challenges in your practice workbook. Formatting mastery is the single fastest way to make your spreadsheet models stand out in corporate finance!"
          />
        </div>
      </div>
    </div>
  );
}
