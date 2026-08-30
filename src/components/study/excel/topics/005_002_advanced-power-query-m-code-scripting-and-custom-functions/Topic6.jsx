"use client";

import React, { useEffect, useRef } from "react";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/005_002_advanced_power_query_m_code_scripting_and_custom_functions_master.xlsx?url";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

export default function Topic6() {
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
              ⚡ Web &amp; API Ingestion · Topic 6
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
              REST APIs &amp; JSON.Document
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-700/60 text-indigo-300 text-xs font-semibold">
              Bloom's Level 5: Synthesize &amp; Ingest
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent leading-tight">
            Web Scraping &amp; REST API Data Ingestion with Power Query: Web.Contents &amp; Json.Document
          </h1>

          <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed max-w-4xl">
            Modern corporate analytics require integrating external cloud data streams—from live foreign exchange rates 
            and GST portal tax validation to CRM endpoints. 
            By mastering <strong>Web.Contents</strong> with structured options (<code className="text-teal-300 font-mono">RelativePath</code> &amp; <code className="text-teal-300 font-mono">Query</code>), 
            <strong>Json.Document</strong> hierarchical deserialization, and HTTP error interception (<code className="text-emerald-300 font-mono">ManualStatusHandling</code>), 
            you build enterprise-grade live API pipelines that satisfy strict Power BI Service scheduled refresh security requirements!
          </p>

          <div className="mt-8 pt-8 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-teal-400 text-base">✓</span>
              <span><strong>Web.Contents:</strong> Static Base URL with dynamic <code className="text-teal-300">RelativePath</code> and <code className="text-teal-300">Query</code> options</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-emerald-400 text-base">✓</span>
              <span><strong>Json.Document:</strong> Deserializes complex JSON object trees into M Records and Lists</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <span className="text-sky-400 text-base">✓</span>
              <span><strong>Error Handling:</strong> Intercept HTTP 404/500 codes with <code className="text-sky-300">ManualStatusHandling</code></span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            SECTION 2: FORMULA & SYNTAX ANATOMY CARD
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6 hover:border-slate-700 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">⚡</span> REST API Request Anatomy in Power Query M
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Web.Contents Architecture
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-sm sm:text-base text-teal-300 space-y-3">
            <span className="text-slate-500">// 1. Standard Production REST API Request with RelativePath &amp; Query Record</span>
            <div className="text-white font-bold text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
{`Response = Web.Contents(
    "https://api.exchangerate.host",
    [
        RelativePath = "v1/latest",
        Query = [base = "USD", symbols = "INR,EUR,GBP"],
        Headers = [#"Accept" = "application/json"],
        ManualStatusHandling = {400, 404, 500}
    ]
),
JsonPayload = Json.Document(Response)`}
            </div>
            <span className="text-slate-500">// 2. Converting JSON Key-Value Rates Object to a 2-Column Table</span>
            <div className="text-white font-bold text-xs sm:text-sm">
              {'RatesTable = Record.ToTable(JsonPayload[rates]) // Produces [Name, Value] Columns'}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Option Key</th>
                  <th className="py-3 px-4">M Syntax Example</th>
                  <th className="py-3 px-4">Data Type</th>
                  <th className="py-3 px-4">Power BI Service Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-teal-400 font-sans">Base URL</td>
                  <td className="py-3 px-4 text-teal-300">"https://api.domain.com"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Static Text</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Enables cloud service to authenticate and validate root domain credentials.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">RelativePath</td>
                  <td className="py-3 px-4 text-emerald-300">RelativePath = "v1/rates"</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Dynamic Text</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Appends dynamic sub-endpoints without breaking static URL security validation.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-sky-400 font-sans">Query</td>
                  <td className="py-3 px-4 text-sky-300">Query = [base="USD"]</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Record</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Automatically URL-encodes parameters (e.g. <code className="text-sky-300 font-mono">?base=USD</code>) safely.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">Headers</td>
                  <td className="py-3 px-4 text-amber-300">Headers = [#"Auth"="Bearer..."]</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Record</td>
                  <td className="py-3 px-4 font-sans text-slate-300">Passes API keys, Bearer tokens, and Accept headers to the web server.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: DEEP CONCEPTUAL & CALCULATION MECHANICS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-emerald-400">🔬</span> Dynamic URLs vs RelativePath &amp; Status Code Interception
            </h2>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-800">
              API Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-teal-400">1.</span> The "Dynamic Data Source" Refresh Blocker
              </h3>
              <p className="leading-relaxed">
                Writing <code className="text-rose-400 font-mono">Web.Contents("https://api.com/v1?k=" &amp; p_Key)</code> works in Power Query Desktop but 
                <strong>fails completely</strong> in Power BI Service / Excel Online scheduled refresh. 
                Power BI requires a constant string literal base URL with dynamic segments passed inside 
                <code className="text-teal-300 font-mono">RelativePath</code> and <code className="text-teal-300 font-mono">Query</code>!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-teal-300">
                Rule: Base URL must be a constant literal string!
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <span className="text-emerald-400">2.</span> ManualStatusHandling &amp; Value.Metadata
              </h3>
              <p className="leading-relaxed">
                By default, any HTTP 404 or 500 status crashes the query immediately. 
                With <code className="text-emerald-300 font-mono">ManualStatusHandling = {400, 404, 500}</code>, Power Query delivers the response binary, 
                allowing you to inspect <code className="text-emerald-300 font-mono">Value.Metadata(Response)[Response.Status]</code> and handle errors smoothly!
              </p>
              <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-emerald-300">
                Inspect: Value.Metadata(Response)[Response.Status]
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <span className="text-amber-400">💡</span> Binary.Buffer: Caching Web Responses
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              If multiple Applied Steps parse different sections of the same API JSON response, 
              Power Query may fire duplicate HTTP requests. Wrap the call in <code className="text-teal-300 font-mono">Binary.Buffer(Web.Contents(...))</code> to cache the payload in RAM!
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: INTERACTIVE SEMANTIC SVG DIAGRAM
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">📐</span> Visual REST API Ingestion &amp; JSON Deserialization Pipeline
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              API Pipeline Flow
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            Trace how live cloud REST API responses are requested, deserialized from JSON, and flattened into an exchange rate dimension:
          </p>

          <div className="bg-slate-950 p-4 sm:p-6 rounded-2xl border border-slate-800 overflow-x-auto flex justify-center">
            <svg
              className="w-full max-w-3xl h-auto"
              viewBox="0 0 850 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* API Cloud Endpoint (Left) */}
              <rect x="25" y="25" width="220" height="270" rx="12" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
              <rect x="25" y="25" width="220" height="34" rx="12" fill="#0284C7" fillOpacity="0.3" />
              <text x="135" y="47" fill="#BAE6FD" fontSize="10.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. CLOUD REST API</text>

              <g transform="translate(35, 75)" fontSize="8" fontFamily="monospace" fill="#CBD5E1">
                <rect width="200" height="30" fill="#1E293B" />
                <text x="6" y="14" fill="#38BDF8">GET /v1/latest</text>
                <text x="6" y="24" fill="#94A3B8">?base=USD&amp;symbols=INR,EUR</text>

                <rect y="36" width="200" height="24" fill="#1E293B" />
                <text x="6" y="52" fill="#34D399">HTTP 200 OK</text>

                <rect y="66" width="200" height="50" fill="#1E293B" />
                <text x="6" y="80" fill="#94A3B8">{'{ "base": "USD",'}</text>
                <text x="6" y="93" fill="#5EEAD4">{'  "rates": {'}</text>
                <text x="6" y="106" fill="#5EEAD4">{'    "INR": 83.50, ... }'}</text>
              </g>

              <rect x="35" y="235" width="200" height="45" rx="6" fill="#1E293B" stroke="#0284C7" />
              <text x="135" y="252" fill="#38BDF8" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Web.Contents Base URL</text>
              <text x="135" y="268" fill="#94A3B8" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">With RelativePath &amp; Query</text>

              {/* Arrow */}
              <path d="M 260 160 L 315 160" stroke="#14B8A6" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="320,160 310,155 310,165" fill="#14B8A6" />

              {/* M JSON Deserializer (Center) */}
              <rect x="325" y="25" width="255" height="270" rx="14" fill="#0F172A" stroke="#0D9488" strokeWidth="2" />
              <rect x="325" y="25" width="255" height="34" rx="14" fill="#115E59" fillOpacity="0.4" />
              <text x="452" y="47" fill="#F0FDFA" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. Json.Document ENGINE</text>

              <g transform="translate(340, 70)" fontSize="8.5" fontFamily="sans-serif">
                <rect width="225" height="32" rx="4" fill="#134E4A" stroke="#14B8A6" />
                <text x="10" y="20" fill="#5EEAD4" fontWeight="bold">1. Json.Document(Response)</text>

                <rect y="38" width="225" height="32" rx="4" fill="#0369A1" fillOpacity="0.3" stroke="#38BDF8" />
                <text x="10" y="58" fill="#BAE6FD" fontWeight="bold">2. Navigate to [rates] Record</text>

                <rect y="76" width="225" height="32" rx="4" fill="#065F46" fillOpacity="0.3" stroke="#10B981" />
                <text x="10" y="96" fill="#A7F3D0" fontWeight="bold">3. Record.ToTable(RatesRecord)</text>

                <rect y="114" width="225" height="32" rx="4" fill="#854D0E" fillOpacity="0.3" stroke="#EAB308" />
                <text x="10" y="134" fill="#FEF08A" fontWeight="bold">4. Cast [Value] as type number</text>
              </g>

              <text x="452" y="270" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">✓ Sub-Second RAM Deserialization</text>

              {/* Arrow */}
              <path d="M 595 160 L 625 160" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="16" to="0" dur="1.5s" repeatCount="indefinite" />
              </path>
              <polygon points="630,160 620,155 620,165" fill="#10B981" />

              {/* Output Dimension (Right) */}
              <rect x="635" y="25" width="190" height="270" rx="10" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <rect x="635" y="25" width="190" height="30" rx="10" fill="#065F46" fillOpacity="0.4" />
              <text x="730" y="45" fill="#34D399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. DIM_CURRENCY_RATES</text>

              <g transform="translate(645, 75)" fontSize="7.5" fontFamily="monospace" fill="#E2E8F0">
                <rect width="170" height="22" fill="#064E3B" stroke="#10B981" />
                <text x="6" y="15" fill="#34D399" fontWeight="bold">Currency | USD Rate</text>

                <rect y="25" width="170" height="20" fill="#0F172A" />
                <text x="6" y="39">INR      | 83.5000</text>

                <rect y="48" width="170" height="20" fill="#0F172A" />
                <text x="6" y="62">EUR      | 0.9250</text>

                <rect y="71" width="170" height="20" fill="#0F172A" />
                <text x="6" y="85">GBP      | 0.7910</text>

                <rect y="94" width="170" height="20" fill="#0F172A" />
                <text x="6" y="108">AED      | 3.6725</text>
              </g>

              <rect x="645" y="225" width="170" height="55" rx="6" fill="#10B981" fillOpacity="0.15" stroke="#10B981" />
              <text x="730" y="245" fill="#34D399" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Live Daily Rates</text>
              <text x="730" y="262" fill="#A7F3D0" fontSize="8" textAnchor="middle" fontFamily="sans-serif">Related in Power Pivot</text>
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
                <span className="text-emerald-400">📥</span> Interactive Spreadsheet &amp; Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Explore the REST API foreign exchange rates dataset below or download the practice workbook to test Web.Contents and JSON ingestion in Microsoft Excel.
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
            sheetName="Topic6_Web_API_Ingestion"
            title="REST API Foreign Exchange Rate Feed (Target Currency Code, Currency Name, Base Currency USD Rate, Inverse Rate INR, Last Updated Timestamp, Ingestion Pipeline)"
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
              Corporate Case Studies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Case 1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-teal-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Case 1 · Live FX Multi-Currency Modeling</span>
                <span className="text-xs font-mono text-slate-400">Barrackpore HQ</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Daily USD / INR / EUR Currency Feed
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Financial Analyst <strong>Swadeep Banerjee</strong> integrates live exchange rates via <code className="text-teal-300 font-mono">Web.Contents</code> and <code className="text-teal-300 font-mono">Json.Document</code>, automatically converting multi-currency sales into standardized INR ledgers.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-teal-300">
                Web.Contents + Json.Document &rarr; Live Daily FX Ingestion
              </div>
            </div>

            {/* Case 2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Case 2 · Power BI Service Scheduled Refresh</span>
                <span className="text-xs font-mono text-slate-400">Shyamnagar Operations</span>
              </div>
              <h3 className="font-bold text-white text-base">
                RelativePath Architecture Compliance
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Senior Accountant <strong>Tuhina Mukherjee</strong> refactors API queries to use <code className="text-emerald-300 font-mono">RelativePath</code> and <code className="text-emerald-300 font-mono">Query</code>, resolving the 'Dynamic Data Source' error and enabling automated 6:00 AM daily cloud refreshes.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300">
                RelativePath Compliance &rarr; 100% Scheduled Refresh Success
              </div>
            </div>

            {/* Case 3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Case 3 · HTML Table Web Scraping</span>
                <span className="text-xs font-mono text-slate-400">Ichapur Heavy Engg</span>
              </div>
              <h3 className="font-bold text-white text-base">
                Scraping Steel Commodity Index with Web.Page
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                ERP Lead <strong>Abhronila Sengupta</strong> extracts raw material steel pricing index tables published on trade association websites using <code className="text-indigo-300 font-mono">Web.Page(Web.Contents(...))</code>, updating procurement cost benchmarks dynamically.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-indigo-300">
                Web.Page &rarr; Automated Commodity Market HTML Table Scraping
              </div>
            </div>

            {/* Case 4 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-fuchsia-500/40 transition-all duration-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Case 4 · API Error Interception</span>
                <span className="text-xs font-mono text-slate-400">Naihati Hub</span>
              </div>
              <h3 className="font-bold text-white text-base">
                ManualStatusHandling for 404 Interception
              </h3>
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                Operations Lead <strong>Debangshu Ghosh</strong> applies <code className="text-fuchsia-300 font-mono">ManualStatusHandling = {400, 404, 500}</code> on GST portal API checks, logging invalid GSTIN tax identification numbers without aborting the batch pipeline.
              </p>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs text-fuchsia-300">
                ManualStatusHandling &rarr; Non-Blocking HTTP Error Logging
              </div>
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🪜</span> Step-by-Step REST API Ingestion Protocol
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
              Methodical Execution
            </span>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-teal-950 border border-teal-700 text-teal-300 font-bold flex items-center justify-center shrink-0 text-sm">
                1
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 1: Declare Constant Base URL with Options</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Call <code className="text-teal-300 font-mono">Web.Contents("https://api.domain.com", [RelativePath="v1/data", Query=[key=val]])</code>.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-sm">
                2
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 2: Buffer Response and Deserialize JSON</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Wrap binary in <code className="text-indigo-300 font-mono">Json.Document(Binary.Buffer(Response))</code> to prevent duplicate network calls.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold flex items-center justify-center shrink-0 text-sm">
                3
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 3: Convert Object Trees to 2D Tables</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Use <code className="text-cyan-300 font-mono">Record.ToTable</code> for key-value dictionaries or <code className="text-cyan-300 font-mono">Table.FromList</code> for JSON arrays.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4 items-start">
              <span className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold flex items-center justify-center shrink-0 text-sm">
                4
              </span>
              <div className="space-y-1">
                <h3 className="font-bold text-white text-sm sm:text-base">Step 4: Transform Column Types and Load to Model</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Apply <code className="text-emerald-300 font-mono">Table.TransformColumnTypes</code> on numeric currency rates and relate to fact tables in Power Pivot!
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
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-rose-400">⚠️</span> Common Errors & Troubleshooting Matrix
            </h2>
            <span className="text-xs font-mono text-rose-300 bg-rose-950/60 px-3 py-1 rounded-lg border border-rose-800">
              Web API Error Protocol
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider bg-slate-950/50">
                  <th className="py-3 px-4">Error / Pitfall</th>
                  <th className="py-3 px-4">Root Cause</th>
                  <th className="py-3 px-4">Diagnostic Verification</th>
                  <th className="py-3 px-4">Guaranteed Fix</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">Dynamic Data Source Refresh Halt</td>
                  <td className="py-3 px-4 text-slate-300">Concatenated query parameters directly into the main URL string in <code className="text-rose-400 font-mono">Web.Contents</code>.</td>
                  <td className="py-3 px-4 text-slate-400">Power BI Service displays: <em>"This dataset includes a dynamic data source"</em>.</td>
                  <td className="py-3 px-4 text-emerald-400">Pass dynamic values inside <code className="text-emerald-400 font-mono">RelativePath</code> and <code className="text-emerald-400 font-mono">Query</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">HTTP 429 Too Many Requests</td>
                  <td className="py-3 px-4 text-slate-300">Triggered multiple redundant API requests across Applied Steps without buffering.</td>
                  <td className="py-3 px-4 text-slate-400">API rate limits exceeded; requests rejected with status 429.</td>
                  <td className="py-3 px-4 text-emerald-400">Wrap in <code className="text-emerald-400 font-mono">Binary.Buffer(Web.Contents(...))</code>.</td>
                </tr>
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">HTTP 401 Unauthorized Error</td>
                  <td className="py-3 px-4 text-slate-300">Missing or expired API Key / Bearer token in request headers.</td>
                  <td className="py-3 px-4 text-slate-400">Error: <em>"Access to the resource is forbidden"</em>.</td>
                  <td className="py-3 px-4 text-emerald-400">Attach valid token in <code className="text-emerald-400 font-mono">Headers = [#"Authorization"="Bearer ..."]</code>.</td>
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
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">💡</span> High-Speed Keyboard Shortcuts & Pro Tips
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              API Master Hacks
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-emerald-400 font-mono font-bold">RelativePath + Query</span>
                <span>Cloud Compliance</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Always use <code className="text-emerald-300 font-mono">RelativePath</code> and <code className="text-emerald-300 font-mono">Query</code> to satisfy Power BI Service refresh rules.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-sky-400 font-mono font-bold">Binary.Buffer</span>
                <span>RAM Caching</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cache the downloaded HTTP response in RAM to eliminate duplicate network calls across steps.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-teal-400 font-mono font-bold">Record.ToTable</span>
                <span>JSON Dict Flattening</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instantly convert JSON key-value objects (like currency rates) into 2-column tabular grids.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold">
                <span className="text-amber-400 font-mono font-bold">ManualStatusHandling</span>
                <span>Error Resilience</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Intercept 404 and 500 error status codes to handle API hiccups gracefully without failing refreshes.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: SOCRATIC ANALYTICAL HINTS
        ========================================================================= */}
        <section
          ref={(el) => (sectionsRef.current[9] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/70 border border-slate-800 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5">
              <span className="text-teal-400">🤔</span> Socratic Analytical Reflection
            </h2>
            <span className="text-xs font-mono text-teal-300 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-800">
              Critical Thinking Prompts
            </span>
          </div>

          <div className="space-y-3 text-sm text-slate-300">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Reflect on cloud security architectures:</strong> Why does the Power BI Service require a static string literal base URL in <code className="text-teal-300 font-mono">Web.Contents</code> to validate data source credentials?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Examine HTTP error interception:</strong> How does <code className="text-emerald-400 font-mono">ManualStatusHandling</code> prevent transient web server downtime from corrupting scheduled corporate reporting?
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <span className="text-teal-400 font-bold text-lg leading-none">?</span>
              <p>
                <strong>Consider RAM response buffering:</strong> Why does wrapping <code className="text-sky-300 font-mono">Web.Contents</code> in <code className="text-sky-300 font-mono">Binary.Buffer</code> protect your enterprise pipeline from hitting third-party API rate limits?
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: COMPREHENSIVE FAQ SECTION (30 QUESTIONS)
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[10] = el)} className="reveal-section">
          <FAQTemplate
            title="Web Scraping & REST API Ingestion — 30 Comprehensive FAQs"
            questions={questions}
          />
        </div>

        {/* =========================================================================
            SECTION 12: TEACHER'S NOTE
        ========================================================================= */}
        <div ref={(el) => (sectionsRef.current[11] = el)} className="reveal-section">
          <Teacher
            note={
              "Always isolate base URLs with RelativePath and Query! Never concatenate dynamic URLs directly, always cache responses with Binary.Buffer or Table.Buffer to avoid hammering APIs, use ManualStatusHandling for defensive error interception, and inspect DevTools Network tabs to query backend REST APIs rather than fighting messy frontend HTML DOMs!"
            }
          />
        </div>
      </div>
    </div>
  );
}
