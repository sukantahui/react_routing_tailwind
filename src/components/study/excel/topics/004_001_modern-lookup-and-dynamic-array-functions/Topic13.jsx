"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/dynamic_arrays_master.xlsx?url";
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

  // Direct workbook download handler
  const handleDownload = () => {
    if (!sampleWorkbookUrl) return;
    const link = document.createElement("a");
    link.href = sampleWorkbookUrl;
    link.download = "dynamic_arrays_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-purple-500/30 selection:text-purple-200">
      {/* Scoped CSS Keyframes for Smooth Reveal Animation */}
      <style>{`
        @keyframes fadeInSlide {
          from {
            transform: translateY(18px);
          }
          to {
            transform: translateY(0);
          }
        }
        .reveal-section {
          animation: fadeInSlide 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-10">
        {/* =========================================================================
            SECTION 1: HERO HEADER & EXECUTIVE OVERVIEW
        ========================================================================= */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-purple-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              🏆 Capstone Practice Lab · Topic 13
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              Customer Segmentation Engine
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/60 text-amber-300 text-xs font-semibold">
              HSTACK + IFS + FILTER
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
            Practice Lab: Multi-Criteria Customer Segmentation Engine with Dynamic Array Spilling
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Welcome to the module capstone. Build an enterprise commercial customer segmentation engine that evaluates multi-variable account thresholds 
            (Quarterly Spend & Satisfaction Rating) to classify clients into 
            <strong className="text-purple-300"> Platinum VIP</strong>, 
            <strong className="text-amber-300"> Gold Tier</strong>, 
            <strong className="text-sky-300"> Silver Tier</strong>, and 
            <strong className="text-emerald-300"> Bronze Tier</strong>. 
            Master virtual matrix augmentation with <code className="text-purple-300 font-mono">HSTACK()</code>, 
            cohort drill-down spilling with <code className="text-emerald-300 font-mono">FILTER()</code>, and statistical share-of-wallet analysis without physical helper columns.
          </p>

          <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-purple-400 text-base">✓</span>
              <span><strong>Virtual Matrix Augmentation:</strong> Clean <code className="font-mono text-purple-300">HSTACK()</code> tier binding</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Multi-Variable Tiering:</strong> Compound Spend + Rating rules</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-amber-400 text-base">✓</span>
              <span><strong>Cohort Drill-Down:</strong> Dynamic filtered spilled rosters</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: SEGMENTATION FORMULA ANATOMY & RULES
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">⚡</span> Capstone Segmentation Engine Formula
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Engine: LET + CHOOSECOLS + IFS + HSTACK
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-purple-300 space-y-2">
            <span className="text-slate-500">// In-Memory Matrix Segmentation Engine:</span>
            <pre className="text-slate-200 overflow-x-auto">
{`=LET(
  raw, Table1[#Data],
  spend, CHOOSECOLS(raw, 4),
  rating, CHOOSECOLS(raw, 5),
  tier, IFS(
    (spend >= 1200000) * (rating >= 4.8), "Platinum VIP",
    (spend >= 1000000) * (rating >= 4.6), "Gold Tier",
    spend >= 800000, "Silver Tier",
    TRUE, "Bronze Tier"
  ),
  HSTACK(raw, tier)
)`}
            </pre>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Segment Tier</th>
                  <th className="pb-3 px-4">Threshold Criteria</th>
                  <th className="pb-3 pl-4">Account Privilege & Corporate Service Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr>
                  <td className="py-3 pr-4 text-purple-400 font-bold">Platinum VIP</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Spend ≥ ₹12,00,000 AND Rating ≥ 4.8</td>
                  <td className="py-3 pl-4 font-sans text-emerald-400">Dedicated Account Director + 24/7 Priority Support.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-amber-300 font-bold">Gold Tier</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Spend ≥ ₹10,00,000 AND Rating ≥ 4.6</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Senior Consultant Manager + Quarterly Strategy Audits.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-sky-300 font-bold">Silver Tier</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Spend ≥ ₹8,00,000</td>
                  <td className="py-3 pl-4 font-sans text-slate-300">Regional Branch Support + Monthly Review Webinars.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 text-emerald-300 font-bold">Bronze Tier</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">All Remaining Accounts</td>
                  <td className="py-3 pl-4 font-sans text-slate-400">Standard Online Portal Access & Helpdesk Ticketing.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">🔬</span> Conceptual Mechanics: In-Memory Matrix Augmentation
          </h2>

          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In traditional Excel setups, classifying accounts required adding formula columns directly into primary transactional tables. 
              This caused database bloating, broken column indices, and sluggish performance.
            </p>
            <p>
              Our Capstone Engine leverages <strong>In-Memory Dynamic Array Architecture</strong>:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-200">
              <li><strong>Virtual Extraction:</strong> <code className="text-sky-300 font-mono">CHOOSECOLS()</code> extracts spend and rating vectors directly from the table without touching physical worksheet cells.</li>
              <li><strong>Vectorized Boolean IFS:</strong> The multi-tier conditional rules evaluate simultaneously across all rows in compiled memory.</li>
              <li><strong>Virtual Matrix Joining:</strong> <code className="text-purple-300 font-mono">HSTACK(raw, tier)</code> binds the classification array to the raw data matrix.</li>
              <li><strong>Dynamic Cohort Drill-Down:</strong> Downstream dashboard cards filter on the augmented tier column, allowing users to drill down into any customer cohort instantly.</li>
            </ol>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-pink-400">📐</span> Multi-Variable Customer Segmentation Hierarchy
            </h2>
            <span className="text-xs text-pink-300 bg-pink-950/80 px-3 py-1 rounded-full border border-pink-800">
              Spend × Rating Thresholds
            </span>
          </div>

          <p className="text-sm text-slate-300">
            Visualizing account classification across the 4 corporate tier levels.
          </p>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center items-center overflow-x-auto">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 760 270" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="gridPattern14" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="760" height="270" fill="url(#gridPattern14)" rx="16" />

              {/* Tier 1: Platinum VIP */}
              <g transform="translate(30, 20)">
                <rect x="0" y="0" width="160" height="230" rx="10" fill="#2e1065" stroke="#c084fc" strokeWidth="2" />
                <rect x="8" y="8" width="144" height="26" rx="6" fill="#581c87" />
                <text x="80" y="25" fill="#f3e8ff" fontSize="10" fontWeight="bold" textAnchor="middle">Platinum VIP ★</text>

                <text x="80" y="55" fill="#e9d5ff" fontSize="9" textAnchor="middle">Spend ≥ 12L &amp; 4.8★</text>

                <rect x="12" y="70" width="136" height="45" rx="4" fill="#3b0764" />
                <text x="80" y="88" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Swadeep Roy</text>
                <text x="80" y="103" fill="#c084fc" fontSize="8" textAnchor="middle">₹14.2L · 4.90★</text>

                <rect x="12" y="125" width="136" height="45" rx="4" fill="#3b0764" />
                <text x="80" y="143" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Abhronila Das</text>
                <text x="80" y="158" fill="#c084fc" fontSize="8" textAnchor="middle">₹13.5L · 4.95★</text>

                <rect x="12" y="180" width="136" height="30" rx="4" fill="#581c87" />
                <text x="80" y="200" fill="#a855f7" fontSize="9" fontWeight="bold" textAnchor="middle">2 Accounts (38% Rev)</text>
              </g>

              {/* Tier 2: Gold Tier */}
              <g transform="translate(210, 20)">
                <rect x="0" y="0" width="160" height="230" rx="10" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                <rect x="8" y="8" width="144" height="26" rx="6" fill="#78350f" />
                <text x="80" y="25" fill="#fef3c7" fontSize="10" fontWeight="bold" textAnchor="middle">Gold Tier</text>

                <text x="80" y="55" fill="#fde68a" fontSize="9" textAnchor="middle">Spend ≥ 10L &amp; 4.6★</text>

                <rect x="12" y="70" width="136" height="45" rx="4" fill="#292524" />
                <text x="80" y="88" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Priya Ghosh</text>
                <text x="80" y="103" fill="#fbbf24" fontSize="8" textAnchor="middle">₹13.1L · 4.85★</text>

                <rect x="12" y="125" width="136" height="45" rx="4" fill="#292524" />
                <text x="80" y="143" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Tuhina Mukherjee</text>
                <text x="80" y="158" fill="#fbbf24" fontSize="8" textAnchor="middle">₹12.8L · 4.80★</text>

                <rect x="12" y="180" width="136" height="30" rx="4" fill="#78350f" />
                <text x="80" y="200" fill="#fde047" fontSize="9" fontWeight="bold" textAnchor="middle">4 Accounts (35% Rev)</text>
              </g>

              {/* Tier 3: Silver Tier */}
              <g transform="translate(390, 20)">
                <rect x="0" y="0" width="160" height="230" rx="10" fill="#0c4a6e" stroke="#38bdf8" strokeWidth="1.5" />
                <rect x="8" y="8" width="144" height="26" rx="6" fill="#0369a1" />
                <text x="80" y="25" fill="#e0f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Silver Tier</text>

                <text x="80" y="55" fill="#bae6fd" fontSize="9" textAnchor="middle">Spend ≥ 8L</text>

                <rect x="12" y="70" width="136" height="45" rx="4" fill="#082f49" />
                <text x="80" y="88" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Aniket Pal</text>
                <text x="80" y="103" fill="#7dd3fc" fontSize="8" textAnchor="middle">₹9.8L · 4.50★</text>

                <rect x="12" y="125" width="136" height="45" rx="4" fill="#082f49" />
                <text x="80" y="143" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Rahul Sen</text>
                <text x="80" y="158" fill="#7dd3fc" fontSize="8" textAnchor="middle">₹8.9L · 4.40★</text>

                <rect x="12" y="180" width="136" height="30" rx="4" fill="#0369a1" />
                <text x="80" y="200" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">3 Accounts (20% Rev)</text>
              </g>

              {/* Tier 4: Bronze Tier */}
              <g transform="translate(570, 20)">
                <rect x="0" y="0" width="160" height="230" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                <rect x="8" y="8" width="144" height="26" rx="6" fill="#047857" />
                <text x="80" y="25" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Bronze Tier</text>

                <text x="80" y="55" fill="#6ee7b7" fontSize="9" textAnchor="middle">All Remaining</text>

                <rect x="12" y="70" width="136" height="100" rx="4" fill="#022c22" />
                <text x="80" y="110" fill="#94a3b8" fontSize="9" textAnchor="middle">Standard Accounts</text>
                <text x="80" y="130" fill="#a7f3d0" fontSize="9" textAnchor="middle">Self-Service Portal</text>

                <rect x="12" y="180" width="136" height="30" rx="4" fill="#047857" />
                <text x="80" y="200" fill="#6ee7b7" fontSize="9" fontWeight="bold" textAnchor="middle">1 Account (7% Rev)</text>
              </g>
            </svg>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: LIVE EXCEL FILE LOADER & DIRECT DOWNLOAD BAR
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet: Capstone Segmentation Lab
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the consultant performance dataset below or download the practice workbook to test the complete customer segmentation engine in Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0 cursor-pointer"
              title="Download dynamic_arrays_master.xlsx practice file"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
            <ExcelFileLoader
              fileModule={sampleWorkbookUrl}
              sheetName="Topic4_Sort_Dynamics"
              title="Master Performance & Account Segmentation Register"
              rowsPerPage={10}
              showSheetSelector={true}
            />
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-amber-400">🏢</span> Real-World Capstone Segmentation Applications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scenario 1 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-purple-300 text-base">Case 1: Automated Platinum VIP Cohort</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Barrackpore Corporate VIP</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Swadeep Roy</strong> isolates the Platinum VIP accounts for bespoke loyalty gift packages:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-purple-300 border border-slate-800">
                =SORT(FILTER(HSTACK(A2:F11, Tiers), Tiers="Platinum VIP"), 4, -1)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Spills top accounts (Swadeep Roy & Abhronila Das) with revenue &gt; ₹13.5L and rating &gt; 4.9.
              </p>
            </div>

            {/* Scenario 2 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-300 text-base">Case 2: Share of Wallet Analytics</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">Shyamnagar Executive MIS</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Tuhina Mukherjee</strong> calculates what percentage of total revenue originates from Gold and Platinum tiers:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-amber-300 border border-slate-800">
                =SUM(FILTER(D2:D11, (Tiers="Platinum VIP") + (Tiers="Gold Tier"))) / SUM(D2:D11)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Dynamically calculates that top tiers generate 73% of total company turnover!
              </p>
            </div>

            {/* Scenario 3 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sky-300 text-base">Case 3: Interactive Tier Drill-Down Portal</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">Ichapur CRM System</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Susmita Saha</strong> places a dropdown in cell <code className="text-amber-300 font-mono">J1</code> to view any selected tier:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-sky-300 border border-slate-800">
                =CHOOSECOLS(FILTER(HSTACK(A2:F11, Tiers), Tiers=J1), 1, 2, 3, 4, 7)
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> User selects 'Silver Tier' to view all mid-market corporate accounts instantly.
              </p>
            </div>

            {/* Scenario 4 */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-emerald-300 text-base">Case 4: Proactive Churn Risk Alert</h3>
                <span className="text-xs px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Naihati Quality Desk</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <strong>Abhronila Das</strong> filters for high-spend clients whose rating has dropped below 4.6:
              </p>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-800">
                =FILTER(A2:F11, (D2:D11 &gt;= 900000) * (E2:E11 &lt; 4.6), "No Accounts at Risk")
              </div>
              <p className="text-xs text-slate-400">
                <strong>Outcome:</strong> Identifies Aniket Pal & Rahul Sen for immediate customer success intervention!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-sky-400">📋</span> 3-Step Capstone Implementation Guide
          </h2>

          <div className="space-y-4">
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-purple-950 text-purple-400 font-bold flex items-center justify-center border border-purple-800 shrink-0">1</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Extract Spend & Rating Vectors via CHOOSECOLS</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Inside <code className="text-amber-300 font-mono">LET()</code>, isolate spend (<code className="text-sky-300 font-mono">col 4</code>) and rating (<code className="text-sky-300 font-mono">col 5</code>) in local variables.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-400 font-bold flex items-center justify-center border border-emerald-800 shrink-0">2</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Evaluate Tier Thresholds with Vectorized IFS</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Apply boolean multiplication: <code className="text-emerald-400 font-mono">(spend &gt;= 1200000) * (rating &gt;= 4.8)</code> for Platinum, down to <code className="text-amber-300 font-mono">TRUE, "Bronze Tier"</code>.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <span className="w-8 h-8 rounded-full bg-sky-950 text-sky-400 font-bold flex items-center justify-center border border-sky-800 shrink-0">3</span>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">Bind and Spill with HSTACK & FILTER</h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Output <code className="text-purple-300 font-mono">HSTACK(raw, tier)</code> or drill down into designated cohorts via <code className="text-sky-300 font-mono">FILTER()</code>!
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
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common Capstone Engine Pitfalls & Fixes
            </h2>
            <span className="text-xs text-rose-300 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800">
              Diagnostic Guide
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Frequent Mistake</th>
                  <th className="pb-3 px-4">Error / Symptom</th>
                  <th className="pb-3 pl-4">Corrective Best Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Omitted Final TRUE in IFS</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#N/A Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Always end IFS with <code className="text-sky-300 font-mono">TRUE, "Bronze Tier"</code> as catch-all.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">Using AND() Inside IFS</td>
                  <td className="py-3.5 px-4 text-slate-300">All accounts receive Bronze Tier.</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Replace <code className="text-slate-400 font-mono">AND</code> with boolean multiplication <code className="text-emerald-400 font-mono">*</code>.</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-rose-300 font-bold">#SPILL! Collision on HSTACK</td>
                  <td className="py-3.5 px-4 text-rose-400 font-mono">#SPILL! Error</td>
                  <td className="py-3.5 pl-4 text-emerald-400">Ensure all cells to the right of the table are clear of text or formatting.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & KEYBOARD SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-purple-400">💡</span> Pro Tips & Advanced Recipes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-purple-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-xs">TAKE</span>
                <span>Top 3 Spenders in Cohort</span>
              </div>
              <p className="text-slate-300">
                Extract top 3 spenders in any tier: <code className="text-emerald-400 font-mono">=TAKE(SORT(FILTER(AugmentedTable, TierCol=J1), 4, -1), 3)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <span className="px-2 py-0.5 rounded bg-sky-950 border border-sky-800 text-xs">TEXTJOIN</span>
                <span>Generate Client Email Blast</span>
              </div>
              <p className="text-slate-300">
                Create instant Outlook email list for Platinum clients: <code className="text-emerald-400 font-mono">=TEXTJOIN("; ", TRUE, FILTER(Emails, TierCol="Platinum VIP"))</code>.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="text-teal-400">🤔</span> Socratic Analytical Hints
          </h2>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-teal-500">
              <h3 className="font-bold text-teal-300 text-sm">Think About Why HSTACK Keeps Data Normalized</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                In relational database theory, storing calculated tiers directly in transactional logs violates 3rd Normal Form (3NF). Why does <code className="text-purple-300 font-mono">HSTACK()</code> in memory preserve clean database normalization?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 border-l-4 border-l-sky-500">
              <h3 className="font-bold text-sky-300 text-sm">Observe How Cohorts Adapt Autonomously</h3>
              <p className="text-slate-300 mt-1 leading-relaxed">
                Notice that as clients close new contracts in Barrackpore or Shyamnagar, their spend increases and their tier migrates automatically without any manual intervention!
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ (30 QUESTIONS VIA FAQTemplate)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Customer Segmentation Capstone Lab FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Congratulations on completing Module 004_001! You have mastered the entire modern dynamic array stack: from the # spill operator and UNIQUE deduplication, to compound boolean FILTERing, multi-level SORTBY hierarchies, SEQUENCE timelines, stochastic RANDARRAY models, and complete Zero-VBA search and segmentation portals. Apply these elite skills to build high-impact enterprise spreadsheets across Barrackpore, Kolkata, and global corporate hubs!"
            }
          />
        </div>
      </div>
    </div>
  );
}
