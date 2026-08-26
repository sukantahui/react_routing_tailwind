import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import returnDemoCode from "./topic4_files/ReturnStatementAndGuardClausesDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowReturn {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-ret {
            animation: glowReturn 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Control Flow &amp; Defensive Programming
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Return Statement Semantics &amp; Early Returns as Guard Clauses
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master method termination mechanics in Java (JLS §14.17): value returns vs <code className="text-sky-300 font-mono">void</code> exits, eliminating the nested &ldquo;Arrow Anti-Pattern&rdquo; with Guard Clauses (Bouncer Pattern), unreachable code detection, and fee installments in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Mechanics of the `return` Statement
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The <code className="text-emerald-400 font-mono">return</code> statement halts method execution immediately, pops its stack frame, and transfers control back to the caller:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">1. Value-Returning Methods</h3>
              <p className="text-emerald-300 mb-2">return baseFee + lateFine;</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                The expression is evaluated and returned to the caller. All branches must guarantee a valid return statement.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">2. Void Early Returns</h3>
              <p className="text-sky-300 mb-2">if (!isRegistered) return;</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                In <code className="text-sky-300 font-mono">void</code> methods, a bare <code className="text-sky-300 font-mono">return;</code> exits the method immediately to stop execution on error or invalid access.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Installment Guard Clauses):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> (₹24,000 in 4 installments = ₹6,000/mo) and <strong>Tuhina</strong> (₹15,000 in 3 installments + ₹500 late fee = ₹5,500/mo) processed course payments in Indian Rupees (<code className="text-emerald-400 font-semibold">₹5,500 to ₹6,000</code>). When <strong>Debangshu</strong> tested 0 installments or negative fees, upfront Guard Clauses (<code className="text-emerald-400 font-mono">if (installments &lt;= 0) return 0.0;</code>) rejected invalid records instantly without messy nested <code className="text-slate-300 font-mono">if-else</code> pyramids.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Nested If-Else Pyramid of Doom vs. Clean Guard Clauses Flow
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing the Arrow Anti-Pattern with modern linear Bouncer Guard Clauses:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Guard Clauses Flow Diagram"
          >
            <defs>
              <linearGradient id="gradPyramid" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradGuard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradBouncer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Panel 1: Nested If-Else Pyramid (Anti-Pattern) */}
            <rect x="30" y="30" width="380" height="215" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="220" y="55" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">❌ ARROW ANTI-PATTERN (Pyramid of Doom)</text>

            <rect x="45" y="70" width="350" height="135" rx="6" fill="#1e1e2e" />
            <text x="55" y="92" fill="#fca5a5" fontSize="10" fontFamily="monospace">if (fee &gt; 0) &#123;</text>
            <text x="75" y="112" fill="#fca5a5" fontSize="10" fontFamily="monospace">if (installments &gt; 0) &#123;</text>
            <text x="95" y="132" fill="#fca5a5" fontSize="10" fontFamily="monospace">if (registered) &#123;</text>
            <text x="115" y="152" fill="#fca5a5" fontSize="10" fontFamily="monospace">// Business math 4 levels deep!</text>
            <text x="95" y="172" fill="#fca5a5" fontSize="10" fontFamily="monospace">&#125; &#125; &#125;</text>
            <text x="55" y="195" fill="#fda4af" fontSize="9">Hard to read, high cognitive load, bug-prone</text>

            {/* Panel 2: Clean Guard Clauses Flow */}
            <rect x="470" y="30" width="380" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="660" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">✓ LINEAR GUARD CLAUSES (Bouncer Pattern)</text>

            {/* Guard 1 */}
            <rect x="485" y="70" width="350" height="30" rx="4" fill="url(#gradBouncer)" />
            <text x="660" y="90" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Guard 1: if (fee &lt;= 0) return 0.0; [Exit Early]</text>

            {/* Guard 2 */}
            <rect x="485" y="108" width="350" height="30" rx="4" fill="url(#gradBouncer)" />
            <text x="660" y="128" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Guard 2: if (installments &lt;= 0) return 0.0; [Exit Early]</text>

            {/* Clean Happy Path */}
            <rect x="485" y="146" width="350" height="50" rx="6" fill="url(#gradGuard)" />
            <text x="660" y="168" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Clean Happy Path (Zero Nesting!)</text>
            <text x="660" y="186" fill="#d1fae5" fontSize="10" fontFamily="monospace" textAnchor="middle">return baseInstallment + lateFine;</text>

            <text x="660" y="228" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Linear, flat, testable, and maintainable</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.17: Guard clauses validate edge conditions at method start, keeping business logic linear and un-nested.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Guard Clauses vs. Single Exit Point Strategy
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Strategy</th>
                <th className="p-3 font-semibold text-emerald-400">Nesting Depth</th>
                <th className="p-3 font-semibold text-purple-400">Temporary Variables</th>
                <th className="p-3 font-semibold text-amber-400">Readability &amp; Maintainability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-400 font-bold">Guard Clauses (Early Exits)</td>
                <td className="p-3 text-emerald-300 font-sans">1 Level (Flat &amp; Linear)</td>
                <td className="p-3 text-emerald-300 font-sans">None needed</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ High (Happy path is obvious)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-rose-400 font-bold">Nested If-Else Pyramid</td>
                <td className="p-3 text-rose-400 font-sans">3 to 6+ Levels deep</td>
                <td className="p-3 text-slate-400 font-sans">Many flag variables</td>
                <td className="p-3 text-rose-400 font-sans">❌ Poor (Arrow anti-pattern)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-amber-400 font-bold">Forced Single Exit Point</td>
                <td className="p-3 text-slate-300 font-sans">Moderate</td>
                <td className="p-3 text-rose-400 font-sans">Requires mutable `result` flags</td>
                <td className="p-3 text-slate-400 font-sans">Outdated legacy style</td>
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
            ReturnStatementAndGuardClausesDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates defensive guard clauses, void early exits, and installment calculations in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={returnDemoCode}
          title="ReturnStatementAndGuardClausesDemo.java"
          highlightLines={[18, 19, 24, 25, 31, 38, 39]}
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
              <span>❌</span> Pitfall 1: Unreachable Code After Unconditional Return
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing statements directly after an unconditional <code className="text-rose-300 font-mono">return</code> statement causes a <code className="text-rose-400 font-mono">Compile Error: unreachable statement</code>. Always remove dead code!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Never Put Return Statements Inside `finally` Blocks
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              A <code className="text-rose-400 font-mono">return</code> statement inside a <code className="text-slate-300 font-mono">finally</code> block overrides and swallows any unhandled exceptions from the <code className="text-slate-300 font-mono">try</code> block, hiding critical bugs.
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
            🤔 <em>&ldquo;Why is returning <code className="text-emerald-400 font-mono">Optional&lt;Student&gt;</code> or an empty array better than returning <code className="text-rose-400 font-mono">null</code>?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Eliminating NullPointerException! Returning <code className="text-emerald-400 font-mono">Optional</code> forces calling code to handle the missing case explicitly, while returning empty collections allows callers to loop without crashing on null dereference!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Return Statements & Guard Clauses FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 4: Return Statements & Guard Clauses"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic4_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Guard clauses are the hallmark of clean code. Check your boundary conditions at the very top of your method and fail fast! In Topic 5, we tackle one of Java's most famous interview questions: Why Java is Strictly Pass-by-Value! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
