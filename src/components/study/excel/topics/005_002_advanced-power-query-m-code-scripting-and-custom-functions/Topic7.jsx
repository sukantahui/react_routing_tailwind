"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/m_code_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic7() {
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
    link.download = "m_code_master_practice.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="dark bg-slate-950 text-slate-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans selection:bg-teal-500/30 selection:text-teal-200">
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
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-bold uppercase tracking-wider shadow-inner">
              ⚡ Advanced ETL · Topic 7
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              API Pagination &amp; OAuth2
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize &amp; Automate
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Handling API Pagination, Authentication Tokens &amp; Rate Limits in M
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Enterprise cloud data extraction demands robust handling of REST API boundaries. 
            Because the Power Query M language is purely functional and immutable without mutable <code className="text-teal-300 font-mono">while</code> or <code className="text-teal-300 font-mono">for</code> loops, 
            paginated endpoint ingestion must be orchestrated using <strong>List.Generate</strong> state transition machines, 
            automated OAuth2 client-credential token acquisition, and rate-limit backoff defenses that ensure 100% scheduled refresh compliance in Power BI Service!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>List.Generate State Machine:</strong> Iterates across page offsets &amp; cursor tokens functionally</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Dynamic OAuth2 Handshake:</strong> Generates bearer tokens via HTTP POST requests dynamically</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-indigo-400 text-base">✓</span>
              <span><strong>RelativePath Compliance:</strong> Satisfies strict cloud scheduled refresh security architecture</span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">⚡</span> Formula Anatomy: List.Generate &amp; Web.Contents Auth
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Functional Iterator Engine
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 font-mono text-xs sm:text-sm text-teal-300 overflow-x-auto shadow-inner leading-relaxed">
            <span className="text-purple-400">List.Generate</span>(
            <br />
            &nbsp;&nbsp;<span className="text-amber-300">initial</span>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// () =&gt; [Page = 1, Data = fxFetch(1), HasMore = true]</span>,
            <br />
            &nbsp;&nbsp;<span className="text-sky-300">condition</span>&nbsp;&nbsp;<span className="text-slate-500">// (state) =&gt; state[HasMore] = true and not List.IsEmpty(state[Data])</span>,
            <br />
            &nbsp;&nbsp;<span className="text-emerald-300">next</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// (state) =&gt; [Page = state[Page] + 1, Data = fxFetch(state[Page] + 1), HasMore = ...]</span>,
            <br />
            &nbsp;&nbsp;<span className="text-rose-300">selector</span>&nbsp;&nbsp;&nbsp;<span className="text-slate-500">// optional: (state) =&gt; state[Data]</span>
            <br />
            )
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Expected Type</th>
                  <th className="py-3 px-4">Required</th>
                  <th className="py-3 px-4">Architectural Purpose &amp; Execution Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">initial</td>
                  <td className="py-3 px-4 font-mono text-purple-300">function () =&gt; record</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Required</td>
                  <td className="py-3 px-4">Initializes the state transition record with starting page parameters, first API call payload, and status flags.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">condition</td>
                  <td className="py-3 px-4 font-mono text-purple-300">function (state) =&gt; logical</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Required</td>
                  <td className="py-3 px-4">Continuation predicate evaluated before each iteration; returning <code className="text-rose-300">false</code> terminates the loop gracefully.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-300">next</td>
                  <td className="py-3 px-4 font-mono text-purple-300">function (state) =&gt; record</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Required</td>
                  <td className="py-3 px-4">Generates the successor state record by incrementing page index or extracting next-cursor tokens from the previous payload.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">selector</td>
                  <td className="py-3 px-4 font-mono text-purple-300">function (state) =&gt; any</td>
                  <td className="py-3 px-4 text-amber-400 font-semibold">Optional</td>
                  <td className="py-3 px-4">Projection transformation that isolates only the desired data payload (e.g. table or list) from the composite state record.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & THEORETICAL MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> Conceptual &amp; Calculation Mechanics
            </h2>
            <span className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              State Machine Loop Theory
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-teal-300 text-base flex items-center gap-2">
                <span>1.</span> Functional State Machine vs Mutable Loops
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                In traditional procedural languages, pagination relies on mutable while-loops modifying variables in memory. 
                Power Query M adheres strictly to <strong>referential transparency</strong> and functional immutability. 
                <code className="text-teal-300 font-mono">List.Generate</code> treats pagination as an infinite mathematical sequence generation where each state <code className="text-teal-300 font-mono">S(n+1) = f(S(n))</code>. 
                The evaluation stops only when the predicate function evaluates to <code className="text-rose-300 font-mono">false</code>.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-emerald-300 text-base flex items-center gap-2">
                <span>2.</span> OAuth2 Dynamic Token Handshake Lifecycle
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                Protected enterprise APIs require a two-stage handshake: first, exchanging Client ID and Secret via an HTTP POST request to the authentication server, 
                then extracting the short-lived <code className="text-emerald-300 font-mono">access_token</code>, and dynamically appending it to the Authorization header (<code className="text-emerald-300 font-mono">"Bearer " &amp; Token</code>) 
                for all subsequent paginated data retrieval queries.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-sky-300 text-base flex items-center gap-2">
                <span>3.</span> Pagination Modalities: Offset vs Cursor
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                REST APIs utilize two core pagination patterns: <strong>Page-Number / Offset</strong> (incrementing integer indices <code className="text-sky-300 font-mono">page=1, 2, 3...</code>) 
                and <strong>Cursor-Based / Next-Link</strong> (extracting an opaque string token like <code className="text-sky-300 font-mono">csr_9941a</code> or full URL from the response envelope). 
                <code className="text-teal-300 font-mono">List.Generate</code> seamlessly accommodates both models by storing cursor tokens directly inside the iteration state tuple.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
              <h3 className="font-bold text-indigo-300 text-base flex items-center gap-2">
                <span>4.</span> Stream Consolidation with Table.Combine
              </h3>
              <p className="leading-relaxed text-xs sm:text-sm text-slate-300">
                When <code className="text-teal-300 font-mono">List.Generate</code> terminates, it produces a List of discrete Table records <code className="text-indigo-300 font-mono">&#123;Table1, Table2, Table3...&#125;</code>. 
                Applying <strong>Table.Combine</strong> evaluates and appends all individual page tables vertically in memory, 
                retaining unified schema consistency and yielding a singular, queryable fact table.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-indigo-400">📐</span> Visual Calculation Flow: REST API Pagination Loop Architecture
            </h2>
            <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-800">
              State Transition Diagram
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 flex flex-col items-center justify-center overflow-x-auto shadow-inner">
            <svg
              viewBox="0 0 880 340"
              className="w-full max-w-4xl h-auto text-slate-200 select-none font-sans"
            >
              <defs>
                <linearGradient id="gradToken" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0d9488" />
                  <stop offset="100%" stopColor="#14b8a6" />
                </linearGradient>
                <linearGradient id="gradLoop" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0369a1" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="gradTerm" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4338ca" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <marker
                  id="arrow-cyan"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#2dd4bf" />
                </marker>
                <marker
                  id="arrow-sky"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 z" fill="#38bdf8" />
                </marker>
              </defs>

              {/* Stage 1: Auth Token */}
              <g transform="translate(30, 40)">
                <rect width="210" height="110" rx="14" fill="url(#gradToken)" opacity="0.9" />
                <text x="105" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                  1. OAuth2 Token Handshake
                </text>
                <text x="105" y="55" textAnchor="middle" fill="#ccfbf1" fontSize="11">
                  POST /oauth/token
                </text>
                <text x="105" y="75" textAnchor="middle" fill="#f0fdfa" fontSize="10" fontFamily="monospace">
                  ClientID + Secret &rarr; Bearer
                </text>
                <rect x="25" y="85" width="160" height="18" rx="6" fill="#042f2e" opacity="0.6" />
                <text x="105" y="98" textAnchor="middle" fill="#5eead4" fontSize="10" fontWeight="bold">
                  Token: eyJhbGciOi...
                </text>
              </g>

              {/* Arrow 1 to 2 */}
              <path
                d="M 240 95 L 300 95"
                stroke="#2dd4bf"
                strokeWidth="3"
                markerEnd="url(#arrow-cyan)"
                fill="none"
              />

              {/* Stage 2: List.Generate Initial */}
              <g transform="translate(310, 40)">
                <rect width="240" height="110" rx="14" fill="url(#gradLoop)" opacity="0.9" />
                <text x="120" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                  2. List.Generate Loop
                </text>
                <text x="120" y="55" textAnchor="middle" fill="#bae6fd" fontSize="11">
                  Initial State: [Page=1, Cursor=null]
                </text>
                <text x="120" y="75" textAnchor="middle" fill="#f0f9ff" fontSize="10" fontFamily="monospace">
                  GET /api/v1/orders?page=1
                </text>
                <rect x="25" y="85" width="190" height="18" rx="6" fill="#082f49" opacity="0.6" />
                <text x="120" y="98" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="bold">
                  Attach Header: Bearer Token
                </text>
              </g>

              {/* Arrow 2 to 3 */}
              <path
                d="M 550 95 L 610 95"
                stroke="#38bdf8"
                strokeWidth="3"
                markerEnd="url(#arrow-sky)"
                fill="none"
              />

              {/* Stage 3: Next State Evaluation & Termination */}
              <g transform="translate(620, 40)">
                <rect width="230" height="110" rx="14" fill="url(#gradTerm)" opacity="0.9" />
                <text x="115" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">
                  3. Predicate &amp; Next State
                </text>
                <text x="115" y="55" textAnchor="middle" fill="#e0e7ff" fontSize="11">
                  Condition: not IsEmpty([Data])
                </text>
                <text x="115" y="75" textAnchor="middle" fill="#f5f3ff" fontSize="10" fontFamily="monospace">
                  Next: [Page = Page + 1]
                </text>
                <rect x="25" y="85" width="180" height="18" rx="6" fill="#1e1b4b" opacity="0.6" />
                <text x="115" y="98" textAnchor="middle" fill="#a5b4fc" fontSize="10" fontWeight="bold">
                  Cursor &rarr; Next API URL
                </text>
              </g>

              {/* Feedback Loop Arrow (3 back to 2) */}
              <path
                d="M 735 150 C 735 220, 430 220, 430 160"
                stroke="#818cf8"
                strokeWidth="2.5"
                strokeDasharray="6,4"
                markerEnd="url(#arrow-sky)"
                fill="none"
              />
              <rect x="520" y="195" width="140" height="24" rx="6" fill="#0f172a" stroke="#6366f1" strokeWidth="1" />
              <text x="590" y="211" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">
                Loop: Page++ Until EOF
              </text>

              {/* Stage 4: Bottom Table.Combine Output */}
              <g transform="translate(260, 245)">
                <rect width="360" height="70" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                <text x="180" y="28" textAnchor="middle" fill="#34d399" fontWeight="bold" fontSize="13">
                  4. Consolidated Fact Table (Table.Combine)
                </text>
                <text x="180" y="50" textAnchor="middle" fill="#94a3b8" fontSize="11">
                  &#123; Page 1 Table, Page 2 Table, ... Page N Table &#125; &rarr; 50,000 Unified Rows
                </text>
              </g>

              {/* Arrow from Loop to Table.Combine */}
              <path
                d="M 360 150 L 360 240"
                stroke="#10b981"
                strokeWidth="3"
                markerEnd="url(#arrow-cyan)"
                fill="none"
              />
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center italic">
            Figure 7.1: Architectural sequence showing OAuth2 bearer token acquisition, dynamic List.Generate pagination evaluation, and Table.Combine in-memory consolidation.
          </p>
        </section>

        {/* =========================================================================
            SECTION 5: INTERACTIVE SPREADSHEET & DIRECT DOWNLOAD PORTAL
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet &amp; Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Inspect the paginated API batch tracking dataset live in your browser or download the full master workbook to practice in Microsoft Excel.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-950/40 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              title="Download the full .xlsx practice workbook for this module"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Practice Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic7_API_Pagination_Tokens"
            title="REST API Paginated Ingestion &amp; Batch Token Tracker (Request ID, Page Number, Cursor Token, Bearer Status, Records Retrieved, Rate Limit, Status)"
            rowsPerPage={10}
            showSheetSelector={true}
          />
        </section>

        {/* =========================================================================
            SECTION 6: REAL-WORLD BUSINESS SCENARIOS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-amber-400">🏢</span> Real-World Corporate Business Scenarios
            </h2>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-800">
              Industrial Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · 50,000+ Branch Transactions</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Offset Pagination with List.Generate
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> pulls 50,000 enterprise invoices across 500 REST API pages (100 records per page). 
                By utilizing <code className="text-teal-300 font-mono">List.Generate</code> with condition <code className="text-teal-300 font-mono">not List.IsEmpty([Data])</code>, 
                the pipeline loops seamlessly and aggregates the full year's sales without manual CSV exports.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                List.Generate &rarr; 500 Pages &rarr; Table.Combine (50k Rows)
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Government GST Portal Integration</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Dynamic OAuth2 Bearer Token Handshake
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Lead Tax Consultant <strong>Tuhina Mukherjee</strong> connects Power Query directly to the government GST E-Way Bill cloud gateway. 
                Her M script sends an encrypted Client Secret via HTTP POST, receives an ephemeral 60-minute Bearer token, 
                and injects it into data requests, completely automating daily invoice validation.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                POST /oauth/token &rarr; Extract Bearer &rarr; Authenticate GST
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · Cursor-Based E-Commerce Sync</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Shopify / Stripe Next-Link Cursor Ingestion
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Specialist <strong>Abhronila Das</strong> synchronizes high-volume online spare parts orders. 
                Because modern cloud APIs use cursor hashes (<code className="text-indigo-300 font-mono">next_page_token</code>) rather than numeric page numbers, 
                she builds an M loop that passes the response cursor to each consecutive request until <code className="text-indigo-300 font-mono">cursor = null</code>.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                State[Cursor] &rarr; Fetch Next Batch &rarr; Stop on Null Cursor
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-purple-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Case 4 · API Rate Limit Throttle Defense</span>
                <span className="text-xs font-mono text-slate-400">Naihati Logistics</span>
              </div>
              <h3 className="font-bold text-white text-base">
                HTTP 429 Interception with ManualStatusHandling
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Supply Chain Analyst <strong>Debangshu Roy</strong> encounters 429 "Too Many Requests" errors when querying vendor GPS tracking servers. 
                By enabling <code className="text-purple-300 font-mono">ManualStatusHandling = &#123;429&#125;</code> and inspecting response headers, 
                his script gracefully handles throttling and prevents ETL batch termination.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-purple-300">
                ManualStatusHandling = &#123;429&#125; &rarr; Graceful Throttle Recovery
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: STEP-BY-STEP PRACTICAL CALCULATION WALKTHROUGH
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-sky-400">🛠️</span> Step-by-Step Practical M Implementation Guide
            </h2>
            <span className="text-xs font-mono text-sky-300 bg-sky-950/60 px-3 py-1 rounded-lg border border-sky-800">
              Production M Script
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-teal-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-teal-950 border border-teal-700 text-teal-300 flex items-center justify-center text-xs">1</span>
                Step 1: Obtain Dynamic OAuth2 Access Token
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Construct an isolated M query that issues a secure POST request to the authentication server and deserializes the JSON response:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300 overflow-x-auto">
                {`let
    TokenBody = "grant_type=client_credentials&client_id=" & ClientID & "&client_secret=" & ClientSecret,
    TokenResponse = Web.Contents("https://auth.company.com", [
        RelativePath = "oauth/v2/token",
        Headers = [#"Content-Type" = "application/x-www-form-urlencoded"],
        Content = Text.ToBinary(TokenBody)
    ]),
    TokenJson = Json.Document(TokenResponse),
    AccessToken = TokenJson[access_token]
in
    AccessToken`}
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center justify-center text-xs">2</span>
                Step 2: Define Single Page Fetcher Function (fxGetPage)
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Create a reusable helper function taking <code className="text-emerald-300 font-mono">pageNum</code> and the <code className="text-emerald-300 font-mono">token</code>, returning a standardized Table:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
                {`fxGetPage = (pageNum as number, token as text) as table =>
let
    RawResponse = Web.Contents("https://api.company.com", [
        RelativePath = "v1/sales/orders",
        Headers = [#"Authorization" = "Bearer " & token, #"Accept" = "application/json"],
        Query = [page = Text.From(pageNum), limit = "100"]
    ]),
    JsonData = Json.Document(RawResponse),
    ItemsList = JsonData[data],
    PageTable = Table.FromRecords(ItemsList)
in
    PageTable`}
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-sky-300 text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-sky-950 border border-sky-700 text-sky-300 flex items-center justify-center text-xs">3</span>
                Step 3: Orchestrate Pagination with List.Generate
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Execute the state transition loop to fetch all pages until an empty record set is encountered:
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-sky-300 overflow-x-auto">
                {`let
    Token = GetOAuthToken,
    AllPages = List.Generate(
        () => [Page = 1, TableData = fxGetPage(1, Token)],
        each not Table.IsEmpty([TableData]),
        each [Page = [Page] + 1, TableData = fxGetPage([Page] + 1, Token)],
        each [TableData]
    ),
    ConsolidatedFact = Table.Combine(AllPages)
in
    ConsolidatedFact`}
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common Errors &amp; Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Error Diagnosis
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-3 px-4">Error Code / Symptom</th>
                  <th className="py-3 px-4">Root Cause Analysis</th>
                  <th className="py-3 px-4">Diagnostic Method</th>
                  <th className="py-3 px-4">Foolproof Fix &amp; Prevention</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-300">Dynamic Data Source Error</td>
                  <td className="py-3 px-4">Direct URL string concatenation in <code className="text-rose-300">Web.Contents</code> causes cloud gateway security rejection in Power BI Service.</td>
                  <td className="py-3 px-4">Check scheduled refresh logs in Power BI Service portal.</td>
                  <td className="py-3 px-4 font-mono text-teal-300">Split into static base URL + <code className="text-teal-300 font-mono">RelativePath</code> &amp; <code className="text-teal-300 font-mono">Query</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-300">Infinite Runaway Loop</td>
                  <td className="py-3 px-4">Predicate checks for <code className="text-amber-300 font-mono">_ &lt;&gt; null</code>, but the API returns an empty array <code className="text-amber-300 font-mono">[]</code> on EOF instead of null.</td>
                  <td className="py-3 px-4">Query hangs forever or runs out of RAM during data refresh.</td>
                  <td className="py-3 px-4 font-mono text-teal-300">Use <code className="text-teal-300 font-mono">not Table.IsEmpty([TableData])</code> or <code className="text-teal-300 font-mono">List.NonNullCount([Data]) &gt; 0</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-purple-300">HTTP 401 Unauthorized</td>
                  <td className="py-3 px-4">Bearer token expired mid-pagination during long-running bulk extractions.</td>
                  <td className="py-3 px-4">Check API response status code in Advanced Editor.</td>
                  <td className="py-3 px-4">Wrap request in a retry handler that refreshes the token on 401 response.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-sky-300">HTTP 429 Too Many Requests</td>
                  <td className="py-3 px-4">Loop sends requests faster than API rate limit threshold (e.g. &gt;10 req/sec).</td>
                  <td className="py-3 px-4">Inspect response headers for <code className="text-sky-300 font-mono">Retry-After</code> value.</td>
                  <td className="py-3 px-4">Enable <code className="text-teal-300 font-mono">ManualStatusHandling = &#123;429&#125;</code> and introduce batch pacing.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: PRO TIPS & HIGH-SPEED SHORTCUTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[8] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-purple-400">💡</span> Pro Tips &amp; High-Speed Shortcuts
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-3 py-1 rounded-lg border border-purple-800">
              Expert Practices
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-teal-300 flex items-center gap-2">
                <span>⚡</span> Tip 1: Always Use the 4th Argument Selector
              </div>
              <p className="text-slate-300 leading-relaxed">
                In <code className="text-teal-300 font-mono">List.Generate</code>, always supply the 4th selector parameter (<code className="text-teal-300 font-mono">each [TableData]</code>) to immediately discard transient state variables (like page numbers and token strings) from RAM.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-emerald-300 flex items-center gap-2">
                <span>⚡</span> Tip 2: Buffer the Token with Table.Buffer
              </div>
              <p className="text-slate-300 leading-relaxed">
                Power Query's lazy evaluation engine might evaluate the token request on every iteration. Storing the token in a buffered variable or single-row table prevents repeated authentication calls.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-indigo-300 flex items-center gap-2">
                <span>⚡</span> Tip 3: Inspect Response Metadata
              </div>
              <p className="text-slate-300 leading-relaxed">
                Use <code className="text-indigo-300 font-mono">Value.Metadata(Web.Contents(...))</code> to inspect HTTP response status codes and Link headers for cursor URLs before parsing JSON payloads.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="font-bold text-purple-300 flex items-center gap-2">
                <span>⚡</span> Tip 4: Test Pagination with Safe Upper Bounds
              </div>
              <p className="text-slate-300 leading-relaxed">
                During development, include a safety cap in your condition: <code className="text-purple-300 font-mono">each [Page] &lt;= 3 and not Table.IsEmpty([TableData])</code> to verify logic on 3 pages before pulling 500+ pages.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS ("THINK ABOUT...")
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Hints ("Think About...")
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking
            </span>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-teal-400">💭</span> Question 1: What happens if an API returns an empty array vs null on EOF?
              </h3>
              <p className="leading-relaxed">
                If the condition is written as <code className="text-teal-300 font-mono">each _ &lt;&gt; null</code>, an empty JSON array <code className="text-teal-300 font-mono">[]</code> evaluates to a valid non-null List, causing an infinite loop. How does <code className="text-teal-300 font-mono">List.IsEmpty</code> protect against this failure?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">💭</span> Question 2: Why does hardcoding tokens in M create an enterprise security risk?
              </h3>
              <p className="leading-relaxed">
                When workbooks or Power BI reports are shared across team members, M code is visible in the Advanced Editor. How can Azure Key Vault, Power BI Parameters, or Windows Credentials protect enterprise secrets?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">💭</span> Question 3: How does Power BI Service Cloud Refresh parse Web.Contents?
              </h3>
              <p className="leading-relaxed">
                Why does static analysis fail when the host name is dynamically evaluated at runtime, and why is <code className="text-indigo-300 font-mono">RelativePath</code> mandatory for scheduled automated cloud refreshes?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: FREQUENTLY ASKED QUESTIONS (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Topic 7: API Pagination, Authentication Tokens & Rate Limits FAQ"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE & WISDOM
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Mastering List.Generate and dynamic token authentication elevates you from a basic spreadsheet user to an enterprise Data Integration Engineer. In modern corporate ecosystems, data lives across cloud SaaS endpoints. By automating pagination and OAuth2 handshakes directly within Power Query M, you eliminate fragile manual CSV downloads and provide leadership with 100% automated, live daily reports."
            }
          />
        </div>
      </div>
    </div>
  );
}
