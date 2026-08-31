import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import multiLabelDemoCode from "./topic13_files/MultipleCaseLabelsDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowMulti {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-multi {
            animation: glowMulti 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Multiple Case Labels Per Branch (<code className="text-sky-400 font-mono">case 1, 2, 3 -&gt;</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master clean multi-constant grouping in Java 14+: comma-separated case labeling (<code className="text-emerald-400 font-mono">case A, B, C -&gt;</code>), replacing legacy vertical case stacking, days-in-month calculations, user input normalization, and quarterly academic fee routing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Clean Multi-Constant Grouping in Java 14+
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Prior to Java 14, executing common logic for multiple case constants required vertically stacking cases with intentional fall-through.
          </p>
          <p>
            In modern Java, <strong>Multiple Case Labels</strong> can be specified as a clean, comma-separated list on a single line:
          </p>
          <p className="font-mono text-sky-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            int days = switch ( month ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case 1, 3, 5, 7, 8, 10, 12 -&gt; 31;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case 4, 6, 9, 11 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; 30;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case 2 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; isLeapYear ? 29 : 28;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;default &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; 0;
            <br />
            &#125;;
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Academic Scheduling):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> refactored course schedule routers. By grouping weekdays (<code className="text-emerald-400 font-mono">case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY -&gt; ...</code>) and tuition quarters in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>), <strong>Abhronila</strong> and <strong>Debangshu</strong> condensed 80 lines of stacked boilerplate into 15 lines of crystal-clear code across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Legacy Case Stacking vs Modern Comma-Separated Labels
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How comma-separated labels replace multi-line case stacking with atomic single-line rules:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Multiple Case Labels Comparison Diagram"
          >
            <defs>
              <linearGradient id="gradStacked" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradComma" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradUseCases" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Legacy Case Stacking */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradStacked)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Legacy Stacking (Java 1-13)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="55" y="98" fill="#fca5a5" fontSize="10" fontFamily="monospace">case 1: case 3: case 5:</text>
            <text x="55" y="114" fill="#fca5a5" fontSize="10" fontFamily="monospace">case 7: case 8: case 10:</text>
            <text x="55" y="130" fill="#fca5a5" fontSize="10" fontFamily="monospace">case 12: days = 31; break;</text>
            <text x="160" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ⚠️ 8 Vertical Lines &amp; Fall-Through
            </text>

            {/* Box 2: Modern Comma List */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradComma)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Modern Comma List (Java 14+)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="10" fontFamily="monospace">case 1, 3, 5, 7, 8, 10, 12 -&gt; 31;</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="10" fontFamily="monospace">case 4, 6, 9, 11 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; 30;</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Clean single-line rule</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Concise &amp; Safe
            </text>

            {/* Box 3: Common Applications */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradUseCases)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Popular Patterns</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="10" fontFamily="monospace">&bull; case MON, TUE.. -&gt; &quot;Work&quot;</text>
            <text x="615" y="122" fill="#bae6fd" fontSize="10" fontFamily="monospace">&bull; case &quot;Y&quot;, &quot;YES&quot; -&gt; true</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">&bull; case 200, 201 -&gt; &quot;OK&quot;</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Tabular Business Rules
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JEP 361 (Java 14+): Comma-separated labels condense multi-branch dispatch tables without fall-through risks.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Comma-Separated Label Patterns Across Data Types
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Data Type</th>
                <th className="p-3 font-semibold text-emerald-400">Code Example</th>
                <th className="p-3 font-semibold text-amber-400">Real-World Scenario</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400 font-bold">Enum</td>
                <td className="p-3 font-mono text-xs">case MON, TUE, WED, THU, FRI -&gt; &quot;Weekday&quot;;</td>
                <td className="p-3 text-xs">Academic &amp; work week scheduling</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-400 font-bold">Integer</td>
                <td className="p-3 font-mono text-xs">case 1, 3, 5, 7, 8, 10, 12 -&gt; 31;</td>
                <td className="p-3 text-xs">Calendar month day counts</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-purple-400 font-bold">String</td>
                <td className="p-3 font-mono text-xs">case &quot;Y&quot;, &quot;YES&quot;, &quot;TRUE&quot;, &quot;1&quot; -&gt; true;</td>
                <td className="p-3 text-xs">User affirmative command parser</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-amber-400 font-bold">Character</td>
                <td className="p-3 font-mono text-xs">case &apos;a&apos;, &apos;e&apos;, &apos;i&apos;, &apos;o&apos;, &apos;u&apos; -&gt; &quot;Vowel&quot;;</td>
                <td className="p-3 text-xs">Vowel and phonetics character analysis</td>
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
            MultipleCaseLabelsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates multiple case labels per branch for enum schedules, leap-year-aware days-in-month calculations, affirmative response parsing, and quarterly tuition batch routing in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={multiLabelDemoCode}
          title="MultipleCaseLabelsDemo.java"
          highlightLines={[51, 53, 62, 63, 64, 71, 79, 80, 81, 82]}
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
              <span>❌</span> Pitfall 1: Duplicate Constants in the Same Case List
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">case 1, 2, 1 -&gt; ...</code> causes a compile error (&quot;duplicate case label 1&quot;).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Align Grouped Cases Horizontally for Readability
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Format multi-label rules cleanly in aligned tables to make business category boundaries visually apparent.
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
            🤔 <em>&ldquo;How does the JVM handle a multi-label list `case 1, 3, 5, 7 -&gt; 31;` in bytecode?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Shared Jump Offsets! The compiler generates a single bytecode block for the return value <code className="text-emerald-300 font-mono">31</code>, and simply registers keys <code className="text-sky-300 font-mono">1, 3, 5, 7</code> in the <code className="text-purple-300 font-mono">tableswitch</code> or <code className="text-purple-300 font-mono">lookupswitch</code> index to jump directly to that single common instruction address!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Multiple Case Labels FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 13: Multiple Case Labels Per Branch"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic13_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Comma-separated case labels make your business logic compact and joyful to read. Group related constants logically and keep your code clean! In Topic 14, we dive into Using Switch as an Expression that Returns a Value! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
