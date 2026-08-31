import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import patternDemoCode from "./topic15_files/VisualStarPatternsDemo.java?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowPattern {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-pt {
            animation: glowPattern 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 15
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Printing 2D Visual Patterns: Triangles, Centered Pyramids &amp; Diamonds
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master 2D visual pattern algorithms in Java: mathematical space alignment (<code className="text-sky-300 font-mono">N - r</code>), odd star series generation (<code className="text-emerald-300 font-mono">2r - 1</code>), symmetrical diamond assembly, and stage lighting grid matrices at Coder &amp; AccoTax Barrackpore.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Mathematics of 2D Visual Coordinate Spaces
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Generating 2D visual patterns requires a systematic 4-tier loop execution pipeline:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-2">
            <li>
              <strong className="text-sky-300 font-mono">Outer Row Loop:</strong> Iterates row height from <code className="text-sky-300 font-mono">r = 1 to N</code>.
            </li>
            <li>
              <strong className="text-amber-300 font-mono">Leading Spaces Loop:</strong> Prints alignment spaces: <code className="text-amber-300 font-mono">spaces = (N - r)</code>.
            </li>
            <li>
              <strong className="text-emerald-300 font-mono">Star Character Loop:</strong> Prints odd sequence stars: <code className="text-emerald-300 font-mono">stars = (2 * r - 1)</code>.
            </li>
            <li>
              <strong className="text-purple-300 font-mono">Row Line Break:</strong> Calls <code className="text-purple-300 font-mono">System.out.println()</code> to terminate the row.
            </li>
          </ol>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Stage Lighting Grid Matrix):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> generated diamond and pyramid lighting grid matrices for the annual cultural hall event. By tabulating row formulas with <strong>Abhronila</strong> and <strong>Debangshu</strong> (<code className="text-amber-300 font-mono">s = N - r</code>, <code className="text-emerald-300 font-mono">st = 2r - 1</code>), they rendered 100% symmetrical star structures across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 4-Tier 2D Pattern Generation Engine
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How outer rows, spaces, and stars assemble into symmetrical geometric shapes:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Visual Star Patterns Pipeline Diagram"
          >
            <defs>
              <linearGradient id="gradPatternRows" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradPatternSpaces" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradPatternStars" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Box 1: Outer Rows */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradPatternRows)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Outer Row Counter</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">for (int r=1; r&lt;=N; r++)</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">Controls row advance</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Height dimension N</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Row Coordinate
            </text>

            {/* Box 2: Leading Spaces */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradPatternSpaces)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Space Alignment</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="335" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">spaces = (N - r)</text>
            <text x="335" y="122" fill="#fef3c7" fontSize="10">Row 1 → 3 spaces</text>
            <text x="335" y="142" fill="#fef3c7" fontSize="10">Row 4 → 0 spaces</text>
            <text x="440" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Horizontal Shift
            </text>

            {/* Box 3: Odd Stars */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradPatternStars)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Odd Star Generator</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="615" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">stars = (2 * r - 1)</text>
            <text x="615" y="122" fill="#a7f3d0" fontSize="10">Odd series: 1, 3, 5, 7</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Symmetrical Apex</text>
            <text x="720" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Visual Glyph Render
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Pattern Formula: Spaces (N - r) + Stars (2r - 1) + Row Break println() = Centered Pyramid.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Mathematical Formulas for Common 2D Visual Patterns
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Pattern Name</th>
                <th className="p-3 font-semibold text-amber-400">Leading Spaces Formula</th>
                <th className="p-3 font-semibold text-emerald-400">Star Characters Formula</th>
                <th className="p-3 font-semibold text-purple-400">Total Stars ($N=4$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Right-Angled Triangle</td>
                <td className="p-3 text-slate-400">0 (None)</td>
                <td className="p-3 text-emerald-300">stars = r</td>
                <td className="p-3 text-purple-300">$N(N+1)/2 = 10$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Inverted Triangle</td>
                <td className="p-3 text-slate-400">0 (None)</td>
                <td className="p-3 text-emerald-300">stars = r (r: N down to 1)</td>
                <td className="p-3 text-purple-300">$N(N+1)/2 = 10$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Centered Pyramid</td>
                <td className="p-3 text-amber-300">spaces = N - r</td>
                <td className="p-3 text-emerald-300">stars = 2 * r - 1</td>
                <td className="p-3 text-purple-300">$N^2 = 16$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Full Diamond</td>
                <td className="p-3 text-amber-300">Top: N - r | Bottom: N - r</td>
                <td className="p-3 text-emerald-300">Top: 2r - 1 | Bottom: 2r - 1</td>
                <td className="p-3 text-purple-300">$2N^2 - 2N + 1 = 25$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Hands-on Code Example */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>💻</span> Compilable Java Source Code
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            VisualStarPatternsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program generates right-angled triangles, inverted triangles, centered full pyramids, and symmetrical full diamonds in Java.
        </p>

        <JavaFileLoader
          fileModule={patternDemoCode}
          title="VisualStarPatternsDemo.java"
          highlightLines={[22, 23, 31, 40, 44, 53, 59]}
        />
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Industry Best Practices
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 1: Omitting `System.out.println()` After Inner Loops
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Forgetting to call <code className="text-rose-300 font-mono">System.out.println();</code> after the star loop causes all rows to concatenate into a single horizontal mess!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Match Character Widths for Monospace Alignment
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If your star glyph is <code className="text-emerald-300 font-mono">&quot;* &quot;</code> (2 characters), use 2 spaces <code className="text-amber-300 font-mono">&quot;  &quot;</code> in your leading space loop to ensure pixel-perfect terminal symmetry.
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Thinking & Hints Section */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>&ldquo;Why does the bottom half of a diamond loop start from `r = N - 1` instead of `r = N`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Apex Row De-duplication! The upper pyramid already printed the maximum middle apex row of width <code className="text-emerald-300 font-mono">2N - 1</code> stars at <code className="text-sky-300 font-mono">r = N</code>. Starting the lower inverted pyramid at <code className="text-purple-300 font-mono">r = N - 1</code> prevents duplicating the widest row twice!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="2D Visual Star Patterns FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 15: 2D Visual Star Patterns"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic15_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: 2D patterns train your brain to see geometry in nested loops. Master the formula: Spaces (N - r) + Stars (2r - 1) = Symmetrical Pyramid. In Topic 16, we level up to Numerical Patterns, Floyd's Triangle, and Pascal's Foundations! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
