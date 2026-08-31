"use client";

import React, { useState, useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/001_005_custom_number_formatting_and_styling_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic9_files/topic9_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic9() {
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

  const maskingExamples = [
    {
      id: "1",
      code: "MSK-101",
      category: "Indian Mobile Phone (+91)",
      raw: "9830123456",
      mask: "+91 00000-00000",
      formatted: "+91 98301-23456",
      formulaBar: "9830123456",
      logic: "Preserves 10-digit number for SMS Gateway API integration while formatting visually for customer care reps."
    },
    {
      id: "2",
      code: "MSK-102",
      category: "US Social Security Number (SSN)",
      raw: "123456789",
      mask: "000-00-0000",
      formatted: "123-45-6789",
      formulaBar: "123456789",
      logic: "Zero-pads 9-digit SSN integer and embeds hyphens for US compliance filing."
    },
    {
      id: "3",
      code: "MSK-103",
      category: "16-Digit Credit Card Display",
      raw: "4532019485711029",
      mask: "0000-0000-0000-0000",
      formatted: "4532-0194-8571-1029",
      formulaBar: "4532019485711029",
      logic: "Groups 16-digit card number into 4 blocks of 4 digits for POS receipt validation."
    },
    {
      id: "4",
      code: "MSK-104",
      category: "Indian Postal PIN Code Padding",
      raw: "700122",
      mask: "000000",
      formatted: "700122",
      formulaBar: "700122",
      logic: "Forces 6-digit zero padding to prevent leading-zero loss on postal zone codes."
    },
    {
      id: "5",
      code: "MSK-105",
      category: "Indian Tax Account Mask",
      raw: "98471029",
      mask: "0000000000",
      formatted: "0098471029",
      formulaBar: "98471029",
      logic: "Forces 10-digit numeric ID zero-padding for Income Tax Department filing."
    },
    {
      id: "6",
      code: "MSK-106",
      category: "US ZIP+4 Postal Code",
      raw: "902104521",
      mask: "00000-0000",
      formatted: "90210-4521",
      formulaBar: "902104521",
      logic: "Formats 9-digit postal code into standard US Postal Service ZIP+4 display."
    },
    {
      id: "7",
      code: "MSK-107",
      category: "International Landline Phone",
      raw: "3325927000",
      mask: "+91 (033) 0000-0000",
      formatted: "+91 (033) 2592-7000",
      formulaBar: "3325927000",
      logic: "Formats Kolkata landline area code (033) with country prefix +91."
    },
    {
      id: "8",
      code: "MSK-108",
      category: "Employee Badge ID Padding",
      raw: "452",
      mask: '"EMP-"00000',
      formatted: "EMP-00452",
      formulaBar: "452",
      logic: "Zero-pads numeric employee ID to 5 digits and attaches 'EMP-' prefix."
    },
    {
      id: "9",
      code: "MSK-109",
      category: "Corporate Tax EIN Number",
      raw: "123456789",
      mask: "00-0000000",
      formatted: "12-3456789",
      formulaBar: "123456789",
      logic: "Formats 9-digit IRS Business EIN with federal hyphen separator."
    },
    {
      id: "10",
      code: "MSK-110",
      category: "Bank IFSC Branch Code Suffix",
      raw: "4092",
      mask: '"SBIN000"000',
      formatted: "SBIN00004092",
      formulaBar: "4092",
      logic: "Zero-pads branch number suffix to form valid State Bank of India IFSC code."
    },
    {
      id: "11",
      code: "MSK-111",
      category: "Toll-Free Customer Hotline",
      raw: "1800112233",
      mask: "0000-000-000",
      formatted: "1800-112-233",
      formulaBar: "1800112233",
      logic: "Formats 10-digit toll-free hotline number for marketing flyers."
    },
    {
      id: "12",
      code: "MSK-112",
      category: "National Health Insurance ID",
      raw: "984710293",
      mask: "000-000-000",
      formatted: "984-710-293",
      formulaBar: "984710293",
      logic: "Formats 9-digit medical claim policy ID into 3-digit blocks."
    },
    {
      id: "13",
      code: "MSK-113",
      category: "Vehicle Registration Number",
      raw: "87",
      mask: '"WB-24-AZ-"0000',
      formatted: "WB-24-AZ-0087",
      formulaBar: "87",
      logic: "Zero-pads 4-digit motor vehicle registration number under RTO format."
    },
    {
      id: "14",
      code: "MSK-114",
      category: "International ISBN-10 Identifier",
      raw: "0198526636",
      mask: "0-00-000000-0",
      formatted: "0-19-852663-6",
      formulaBar: "198526636",
      logic: "Formats 10-digit publishing ISBN identifier with leading-zero preservation."
    },
    {
      id: "15",
      code: "MSK-115",
      category: "Corporate Purchase Order ID",
      raw: "1048",
      mask: '"PO-2026-"00000',
      formatted: "PO-2026-01048",
      formulaBar: "1048",
      logic: "Zero-pads procurement PO sequence number for ERP inventory tracking."
    },
    {
      id: "16",
      code: "MSK-116",
      category: "Bank Account Number Spacing",
      raw: "30948571029",
      mask: "0000 0000 0000",
      formatted: "30 9485 71029",
      formulaBar: "30948571029",
      logic: "Spaces bank account number digits for easy verification during wire transfers."
    },
    {
      id: "17",
      code: "MSK-117",
      category: "Employer State Tax ID",
      raw: "98765432",
      mask: "000-0000-00",
      formatted: "098-7654-32",
      formulaBar: "98765432",
      logic: "Formats state payroll tax identification string with leading zero padding."
    },
    {
      id: "18",
      code: "MSK-118",
      category: "Factory Batch Lot Number",
      raw: "749",
      mask: '"LOT-BATCH-"0000',
      formatted: "LOT-BATCH-0749",
      formulaBar: "749",
      logic: "Formats manufacturing quality control lot tracking numbers."
    },
    {
      id: "19",
      code: "MSK-119",
      category: "SWIFT Banking Routing Sub-Code",
      raw: "1928",
      mask: '"SWIFT-"000000',
      formatted: "SWIFT-001928",
      formulaBar: "1928",
      logic: "Zero-pads SWIFT banking sub-code for international wire transfers."
    },
    {
      id: "20",
      code: "MSK-120",
      category: "Customer Loyalty Card Barcode",
      raw: "884710928374",
      mask: "0000-0000-0000",
      formatted: "8847-1092-8374",
      formulaBar: "884710928374",
      logic: "Formats retail membership loyalty card barcode payload."
    }
  ];

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
              🎨 ID &amp; Phone Masking · Topic 9
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[10px] font-semibold">
              Format Engineering
            </span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-[10px] font-semibold">
              Beginner · Bloom Level 2: Understand
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent leading-snug">
            Phone Numbers, Tax IDs (PAN/GSTIN/SSN), and Credit Card Masking Patterns
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed max-w-5xl">
            Formatting raw numeric payloads into standard national phone codes (<code className="text-cyan-300">+91 00000-00000</code>), tax IDs (<code className="text-cyan-300">000-00-0000</code>), credit card blocks (<code className="text-cyan-300">0000-0000-0000-0000</code>), and zero-padded postal PIN codes without converting numeric data into text strings.
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
            SECTION 2: INTERACTIVE EXCEL FILE VIEWER & PRACTICE WORKBOOK
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 text-sm font-mono font-bold">💳</span>
                Interactive Master Workbook Practice &amp; Grid Inspection
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect raw numeric ID payloads vs masked visual displays on worksheet tab Topic9.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md transition-all shrink-0 self-start sm:self-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download .XLSX Master Workbook
            </button>
          </div>

          <ExcelFileLoader
            fileUrl={sampleWorkbookUrl}
            sheetName="Topic9"
          />
        </section>

        {/* =========================================================================
            SECTION 3: 20 REAL-WORLD ID & PHONE MASKING EXAMPLES
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 text-sm font-mono font-bold">📊</span>
                20 Real-World ID, Phone &amp; Card Masking Scenarios
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Comparing raw stored numeric integers, applied digit masks, formatted visual cell displays, formula bar reality, and business rationale.
              </p>
            </div>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800 shrink-0 font-bold">
              20 Masking Scenarios
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/70">
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Code &amp; Category</th>
                  <th className="py-2.5 px-3">Raw Stored Payload</th>
                  <th className="py-2.5 px-3">Applied Format Mask</th>
                  <th className="py-2.5 px-3">Visual Formatted Cell</th>
                  <th className="py-2.5 px-3">Formula Bar Reality</th>
                  <th className="py-2.5 px-3 min-w-[280px]">Business Logic &amp; Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {maskingExamples.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-slate-500">{ex.id}</td>
                    <td className="py-2.5 px-3 font-semibold text-sky-300">
                      <div className="font-mono text-[11px] text-slate-400">{ex.code}</div>
                      <div>{ex.category}</div>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-amber-300">{ex.raw}</td>
                    <td className="py-2.5 px-3 font-mono text-cyan-300 font-bold bg-slate-950/40 rounded px-2">{ex.mask}</td>
                    <td className="py-2.5 px-3 font-mono text-emerald-400 font-extrabold bg-emerald-950/30 rounded px-2">{ex.formatted}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{ex.formulaBar}</td>
                    <td className="py-2.5 px-3 text-slate-300 leading-relaxed text-[11px]">{ex.logic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: TECHNICAL ARCHITECTURE & DIGIT MASKING ENGINE
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-xl p-4 sm:p-5 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-mono font-bold">⚙️</span>
              Technical Architecture: The Mandatory Zero (0) Masking Engine
            </h2>
            <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/60 px-2.5 py-0.5 rounded-lg border border-indigo-800">
              Format Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm flex items-center gap-2">
                <span>0️⃣</span> Leading Zero Preservation (00000)
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Entering numbers like PIN codes (<code className="text-amber-300">011001</code>) causes Excel to strip the leading zero automatically. Using custom format mask <code className="text-amber-300">000000</code> forces mandatory zero padding without converting the cell to text.
              </p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-cyan-300 border border-slate-800">
                11001 + 000000 → "011001" (Numeric Serial Preserved)
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
                <span>📞</span> Literal Text &amp; Hyphen Embedding
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Symbols like hyphens (<code className="text-amber-300">-</code>), plus signs (<code className="text-amber-300">+</code>), and parentheses (<code className="text-amber-300">()</code>) pass through format masks directly alongside mandatory digit placeholders.
              </p>
              <div className="p-2.5 rounded bg-slate-900 font-mono text-[11px] text-emerald-300 border border-slate-800">
                9830123456 + +91 00000-00000 → "+91 98301-23456"
              </div>
            </div>
          </div>
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
              Common Masking Pitfalls &amp; Diagnostic Fixes
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
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Leading zero disappears from postal PIN</td>
                  <td className="py-2.5 px-3">Excel stores numbers without leading zeros by default (011001 becomes 11001).</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Apply custom format mask 000000.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">Phone number converted to scientific notation (9.83E+09)</td>
                  <td className="py-2.5 px-3">Entering 12+ digit account or phone numbers causes default General format to apply scientific notation.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Apply explicit digit mask: 0000-0000-0000.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-rose-300">VLOOKUP fails on phone number column</td>
                  <td className="py-2.5 px-3">User entered text apostrophe ('9830123456) in lookup column while master table stores numeric integer.</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">Use pure numeric integers in memory and format visually with custom masks.</td>
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
            title="Phone Numbers, Tax IDs &amp; Card Masking - Mastery Q&amp;A"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 7: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[6] = el)} className="reveal-section">
          <Teacher
            note="Always store phone numbers, PIN codes, and tax IDs as clean numeric integers in cell memory and apply custom format masks visually. This guarantees seamless database exports and fast VLOOKUP queries!"
          />
        </div>
      </div>
    </div>
  );
}
