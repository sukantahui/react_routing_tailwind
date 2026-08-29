"use client";

import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import ExcelFileLoader from "../../../../../common/ExcelFileLoader";
import sampleWorkbookUrl from "./excel_files/basic_formulas_and_functions_master.xlsx?url";
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
    link.download = "basic_formulas_and_functions_master.xlsx";
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
        {/* SECTION 1: HERO HEADER */}
        <header
          ref={(el) => (sectionsRef.current[0] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-800 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <span>⚙️</span> Excel Engineering Masterclass · Topic 9
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent tracking-tight">
            Engineering Conversions & Bitwise Operations
          </h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg leading-relaxed max-w-4xl">
            Harness Excel's industrial engineering and low-level computing engines: seamlessly convert across metric, imperial, thermodynamic, and pressure units with <code className="text-sky-300 bg-slate-800 px-1.5 py-0.5 rounded">CONVERT()</code>, and execute 48-bit silicon bitwise masking and number base translations with <code className="text-teal-300 bg-slate-800 px-1.5 py-0.5 rounded">BITAND</code>, <code className="text-teal-300 bg-slate-800 px-1.5 py-0.5 rounded">BITOR</code>, <code className="text-teal-300 bg-slate-800 px-1.5 py-0.5 rounded">BITXOR</code>, and <code className="text-indigo-300 bg-slate-800 px-1.5 py-0.5 rounded">BIN2DEC</code>.
          </p>
        </header>

        {/* SECTION 2: FORMULA ANATOMY */}
        <section
          ref={(el) => (sectionsRef.current[1] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-sky-950 border border-sky-800 text-sky-400">⚡</span>
            Formula Syntax & Signature Matrix
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold uppercase text-sky-400">Physical Unit Conversion</div>
              <code className="text-sm font-mono text-emerald-300 block bg-slate-900 p-2 rounded-lg">
                =CONVERT(number, from_unit, to_unit)
              </code>
              <p className="text-xs text-slate-400">
                Converts numbers across thermodynamics (&quot;C&quot;,&quot;F&quot;), distance (&quot;m&quot;,&quot;km&quot;,&quot;mi&quot;,&quot;ft&quot;), mass (&quot;kg&quot;,&quot;lbm&quot;), and pressure (&quot;atm&quot;,&quot;Pa&quot;,&quot;psi&quot;).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="text-xs font-semibold uppercase text-teal-400">Bitwise Logic Operations</div>
              <code className="text-sm font-mono text-teal-300 block bg-slate-900 p-2 rounded-lg">
                =BITAND(n1, n2) / =BITOR(n1, n2) / =BITXOR(n1, n2)
              </code>
              <p className="text-xs text-slate-400">
                Performs bit-by-bit binary logic on integers up to 2^48 - 1 for permission flag masking and register decoding.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: DEEP MECHANICS */}
        <section
          ref={(el) => (sectionsRef.current[2] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400">🔬</span>
            Computational Mechanics & Bitmask Architecture
          </h2>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              In corporate data systems and SCADA telemetry, engineering values and system permissions are often packed into compact binary flags. Excel provides high-precision bitwise operators that operate directly on IEEE 754 48-bit unsigned integer values:
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-sky-200 overflow-x-auto">
              <div className="text-slate-400 font-sans font-semibold mb-2">Example: 8-Bit Permission Flag Decoding</div>
              <div>User Status Flag: 13 (Decimal) = 00001101 (Binary)</div>
              <div>Bit 0 (Weight 1) = Read Access   : (13 AND 1) = 1  ✓ Active</div>
              <div>Bit 1 (Weight 2) = Write Access  : (13 AND 2) = 0  ✗ Inactive</div>
              <div>Bit 2 (Weight 4) = Execute Access: (13 AND 4) = 4  ✓ Active</div>
              <div>Bit 3 (Weight 8) = Admin Access  : (13 AND 8) = 8  ✓ Active</div>
            </div>
          </div>
        </section>

        {/* SECTION 4: INTERACTIVE SVG DIAGRAM */}
        <section
          ref={(el) => (sectionsRef.current[3] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400">📐</span>
            Visual Bitwise Logic & Unit Transformation Engine
          </h2>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-center">
            <svg className="w-full max-w-2xl h-auto" viewBox="0 0 700 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Unit Conversion Flow */}
              <rect x="20" y="30" width="160" height="70" rx="12" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
              <text x="100" y="60" fill="#38BDF8" fontSize="13" fontWeight="bold" textAnchor="middle">Input Value: 100°C</text>
              <text x="100" y="80" fill="#94A3B8" fontSize="11" textAnchor="middle">=CONVERT(100, &quot;C&quot;, &quot;F&quot;)</text>

              <path d="M190 65 H 250" stroke="#38BDF8" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrow)" />

              <rect x="260" y="30" width="160" height="70" rx="12" fill="#0F172A" stroke="#059669" strokeWidth="2" />
              <text x="340" y="60" fill="#34D399" fontSize="13" fontWeight="bold" textAnchor="middle">Output Value: 212°F</text>
              <text x="340" y="80" fill="#94A3B8" fontSize="11" textAnchor="middle">Zero Distortion Scaling</text>

              {/* Bitwise Mask Flow */}
              <rect x="20" y="130" width="160" height="70" rx="12" fill="#0F172A" stroke="#7C3AED" strokeWidth="2" />
              <text x="100" y="160" fill="#A78BFA" fontSize="13" fontWeight="bold" textAnchor="middle">Register: 0110 (6)</text>
              <text x="100" y="180" fill="#94A3B8" fontSize="11" textAnchor="middle">Mask: 0011 (3)</text>

              <path d="M190 165 H 250" stroke="#A78BFA" strokeWidth="2" strokeDasharray="4 4" />

              <rect x="260" y="130" width="160" height="70" rx="12" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
              <text x="340" y="160" fill="#FBBF24" fontSize="13" fontWeight="bold" textAnchor="middle">BITAND: 0010 (2)</text>
              <text x="340" y="180" fill="#94A3B8" fontSize="11" textAnchor="middle">BITOR: 0111 (7)</text>

              <rect x="450" y="70" width="220" height="90" rx="12" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
              <text x="560" y="105" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">Enterprise Features</text>
              <text x="560" y="125" fill="#38BDF8" fontSize="11" textAnchor="middle">• 48-bit Logic Precision</text>
              <text x="560" y="145" fill="#34D399" fontSize="11" textAnchor="middle">• 50+ Engineering Units</text>
            </svg>
          </div>
        </section>

        {/* SECTION 5: LIVE EXCEL PRACTICE GRID & DOWNLOAD */}
        <section
          ref={(el) => (sectionsRef.current[4] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                <span className="p-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400">📥</span>
                Interactive Spreadsheet & Chapter Practice Workbook
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Inspect the engineering unit datasets and bitwise calculation models live or download the complete chapter workbook (.xlsx).
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
              <span>Download Workbook (.xlsx)</span>
            </button>
          </div>

          <ExcelFileLoader
            fileModule={sampleWorkbookUrl}
            sheetName="Topic0_Basic_Formulas"
            title="Interactive Engineering & Formula Practice Grid"
            rowsPerPage={25}
            showSheetSelector={true}
          />
        </section>

        {/* SECTION 6: REAL-WORLD SCENARIOS */}
        <section
          ref={(el) => (sectionsRef.current[5] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-6"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-950 border border-amber-800 text-amber-400">🏢</span>
            Real-World Industrial Case Studies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-300">Case 1: Barrackpore Engineering HVAC Heat Exchanger</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Swadeep converts temperature telemetry from sensor feeds in Celsius to thermodynamic Kelvin for entropy calculations:
              </p>
              <code className="text-xs font-mono text-sky-300 block bg-slate-900 p-2 rounded">
                =CONVERT(B3, &quot;C&quot;, &quot;K&quot;)
              </code>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-300">Case 2: Shyamnagar IoT Security Bitmasking</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tuhina inspects packed hardware status bytes in column D to verify if the emergency thermal alarm (Bit 5, value 32) is triggered:
              </p>
              <code className="text-xs font-mono text-emerald-300 block bg-slate-900 p-2 rounded">
                =IF(BITAND(D3, 32) = 32, &quot;ALERT&quot;, &quot;NORMAL&quot;)
              </code>
            </div>
          </div>
        </section>

        {/* SECTION 7: TROUBLESHOOTING MATRIX */}
        <section
          ref={(el) => (sectionsRef.current[6] = el)}
          className="reveal-section rounded-3xl p-6 sm:p-8 bg-slate-900/60 border border-slate-800 space-y-4"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
            <span className="p-2 rounded-xl bg-rose-950 border border-rose-800 text-rose-400">⚠️</span>
            Troubleshooting & Diagnostic Matrix
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-300 border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-slate-200 uppercase font-semibold">
                <tr>
                  <th className="p-3 border-b border-slate-800">Error / Symptom</th>
                  <th className="p-3 border-b border-slate-800">Root Cause</th>
                  <th className="p-3 border-b border-slate-800">Resolution Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="bg-slate-950/40">
                  <td className="p-3 font-mono text-rose-400">#N/A in CONVERT</td>
                  <td className="p-3">Incompatible unit categories (e.g. converting mass &quot;kg&quot; to distance &quot;m&quot;) or misspelled unit text.</td>
                  <td className="p-3">Verify exact case-sensitive unit strings in official Excel documentation.</td>
                </tr>
                <tr className="bg-slate-950/80">
                  <td className="p-3 font-mono text-rose-400">#NUM! in BITAND/BITOR</td>
                  <td className="p-3">Passing negative integer inputs or numbers &gt;= 2^48.</td>
                  <td className="p-3">Ensure all bitwise arguments are non-negative integers.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 8: FAQ ACCORDION */}
        <div ref={(el) => (sectionsRef.current[7] = el)} className="reveal-section">
          <FAQTemplate
            title="Engineering Conversions & Bitwise Operations FAQ"
            questions={questions}
          />
        </div>

        {/* SECTION 9: TEACHER NOTE */}
        <div ref={(el) => (sectionsRef.current[8] = el)} className="reveal-section">
          <Teacher
            topicName="Engineering Unit Conversions & Bitwise Operations"
            noteTitle="Sukanta Hui's Pedagogical Guide"
            mentorAdvice={"Remember: Bitwise operations are the foundation of high-performance data packing in enterprise ERPs and telemetry. When working with HEX2DEC or BIN2DEC, always wrap hexadecimal strings in double quotes so Excel does not misidentify column headers like 'AD' or 'CA' as cell coordinates."}
          />
        </div>
      </div>
    </div>
  );
}
