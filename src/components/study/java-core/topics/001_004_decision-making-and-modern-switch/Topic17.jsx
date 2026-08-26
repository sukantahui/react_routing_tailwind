import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cleanLogicDemoCode from "./topic17_files/CleanConditionalLogicDemo.java?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions";

export default function Topic17() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowClean {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-cln {
            animation: glowClean 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 17 (Module Finale)
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Clean Architecture Mastery
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Best Practices for Clean, Maintainable Conditional Logic &amp; Avoiding Deep Nesting
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master professional conditional architecture in Java: eliminating the &ldquo;Pyramid of Doom&rdquo; (Arrow Anti-Pattern) via Guard Clauses and Early Returns (the Bouncer Pattern), keeping the Happy Path left-aligned, extracting explanatory boolean query methods, ternary operator discipline, and student enrollment verification in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Philosophy of Flat, Readable Decision Pipelines
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In software engineering, deeply nested <code className="text-rose-300 font-mono">if-else</code> structures (the <strong>Pyramid of Doom</strong> or <strong>Arrow Anti-Pattern</strong>) create cognitive overload, making code hard to read and test.
          </p>
          <p>
            <strong>The Guard Clause Pattern (Bouncer Pattern):</strong> Invert preconditions and exit immediately upon failure. This flattens the hierarchy into a linear sequence of checks and keeps the <strong>Happy Path</strong> completely unindented:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            // Precondition Guards (Fail-Fast)
            <br />
            if ( s == null ) return;
            <br />
            if ( !s.hasValidId() ) return;
            <br />
            if ( s.academicScore() &lt; 50 ) return;
            <br />
            if ( s.paymentDeposit() &lt; 10000.0 ) return;
            <br />
            <br />
            // --- HAPPY PATH (Left-aligned, zero nesting!) ---
            <br />
            enrollStudent(s);
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Admission Verification Pipeline):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> refactored a legacy 6-tier nested admission validation engine in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By replacing deep pyramids with linear guard clauses, <strong>Abhronila</strong> and <strong>Debangshu</strong> reduced cognitive complexity from 18 down to 2, achieving 100% test coverage with zero regression bugs across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Pyramid of Doom vs. Linear Guard Clause Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing deeply indented arrow anti-patterns against clean, flat, early-return guard pipelines:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Clean Conditional Logic Diagram"
          >
            <defs>
              <linearGradient id="gradPyramid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradGuards" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradGoldenRules" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Pyramid of Doom (Anti-Pattern) */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradPyramid)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Pyramid of Doom (Bad)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="55" y="98" fill="#fca5a5" fontSize="10" fontFamily="monospace">if (s != null) &#123;</text>
            <text x="55" y="112" fill="#fca5a5" fontSize="10" fontFamily="monospace">&nbsp;&nbsp;if (hasId) &#123;</text>
            <text x="55" y="126" fill="#fca5a5" fontSize="10" fontFamily="monospace">&nbsp;&nbsp;&nbsp;&nbsp;if (score &gt;= 50) &#123; pass(); &#125;&#125;&#125;</text>
            <text x="160" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ⚠️ High Cognitive Debt (Nesting &gt; 3)
            </text>

            {/* Box 2: Guard Clauses (Clean) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradGuards)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Guard Clauses (Clean)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="98" fill="#a7f3d0" fontSize="10" fontFamily="monospace">if (s == null) return;</text>
            <text x="335" y="114" fill="#a7f3d0" fontSize="10" fontFamily="monospace">if (!hasId) return;</text>
            <text x="335" y="130" fill="#d1fae5" fontSize="10" fontFamily="monospace">enrollStudent(s); // Happy path!</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Flat &amp; Left-Aligned (Nesting 0)
            </text>

            {/* Box 3: 5 Golden Rules */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradGoldenRules)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. The 5 Golden Rules</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="98" fill="#bae6fd" fontSize="10" fontFamily="monospace">1. Guard Clauses / Early Exit</text>
            <text x="615" y="114" fill="#bae6fd" fontSize="10" fontFamily="monospace">2. Explanatory Helper Queries</text>
            <text x="615" y="130" fill="#bae6fd" fontSize="10" fontFamily="monospace">3. Modern Switch Expressions</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Enterprise Clean Code
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Clean Code Principle: Flatten nested conditional hierarchies with guard clauses and keep the happy path unnested.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Summary of Conditional Architecture Patterns
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Technique</th>
                <th className="p-3 font-semibold text-emerald-400">Clean Practice</th>
                <th className="p-3 font-semibold text-rose-400">Anti-Pattern to Avoid</th>
                <th className="p-3 font-semibold text-amber-400">Cognitive Benefit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400 font-bold">Guard Clauses</td>
                <td className="p-3 text-xs text-emerald-300">Exit early on failure; keep happy path left-aligned</td>
                <td className="p-3 text-xs text-rose-400">Nesting 4+ levels of if-else</td>
                <td className="p-3 text-xs text-emerald-400">Eliminates indentation drift</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-400 font-bold">Explanatory Queries</td>
                <td className="p-3 text-xs text-sky-300">Extract complex conditions into `isEligible()`</td>
                <td className="p-3 text-xs text-rose-400">Cryptic 5-operator compound boolean algebra</td>
                <td className="p-3 text-xs text-sky-400">Self-documenting natural language</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-purple-400 font-bold">Switch Expressions</td>
                <td className="p-3 text-xs text-purple-300">Use arrow switch for multi-way constant dispatch</td>
                <td className="p-3 text-xs text-rose-400">20-branch else-if ladders on discrete keys</td>
                <td className="p-3 text-xs text-purple-400">$O(1)$ speed &amp; exhaustiveness</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-amber-400 font-bold">Ternary Discipline</td>
                <td className="p-3 text-xs text-amber-300">Use strictly for simple 2-way variable assignment</td>
                <td className="p-3 text-xs text-rose-400">Chained/nested ternary operators (`a ? b ? c : d : e`)</td>
                <td className="p-3 text-xs text-amber-300">Prevents mental parsing fatigue</td>
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
            CleanConditionalLogicDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program contrasts the nested Pyramid of Doom against linear Guard Clauses, explanatory boolean query methods, and admission audits in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={cleanLogicDemoCode}
          title="CleanConditionalLogicDemo.java"
          highlightLines={[42, 43, 44, 45, 65, 70, 75, 80, 85, 96]}
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
              <span>❌</span> Pitfall 1: Nesting Ternary Operators
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">int rate = (a &gt; 10) ? ((b &gt; 5) ? 100 : 50) : 0;</code> creates severe cognitive friction during code review.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Use if-else or modern switch expressions for multi-condition assignments.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Keep the Happy Path Left-Aligned
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Reject invalid inputs early at the top of the method and let the primary business logic flow linearly down the left margin without indentation.
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
            🤔 <em>&ldquo;Why do leading tech companies enforce a maximum nesting limit of 2 in their static analysis quality gates?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Working Memory Limits in Human Cognition! Psychological research shows that human working memory can track approximately 4 &plusmn; 1 items simultaneously. A method with 4 levels of nested <code className="text-rose-300 font-mono">if</code> blocks consumes 100% of a developer&apos;s mental bandwidth just maintaining branch preconditions, drastically increasing the likelihood of introducing regression bugs!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Clean Conditional Logic FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 17: Best Practices for Clean Conditional Logic"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic17_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Congratulations on completing Module 001_004! You have mastered the entire spectrum of decision making in Java—from simple if-else and switch statements to modern arrow switch expressions, yield keywords, pattern matching with when guards, and clean guard-clause architecture. In Module 001_005, we advance to Loops, Iteration Statements, and Jump Controls! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
