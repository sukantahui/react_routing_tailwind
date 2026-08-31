import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import continueDemoCode from "./topic13_files/ContinueStatementLoopControlDemo.java?raw";
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
          @keyframes glowContinue {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-cn {
            animation: glowContinue 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Jump Statements: The <code className="text-emerald-400 font-mono">&apos;continue&apos;</code> Statement for Skipping Iterations &amp; Guard Clauses
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master iteration skipping in Java (JLS §14.16): flattening nested hierarchies with Guard Clauses, jumping directly to update clauses (<code className="text-emerald-300 font-mono">i++</code>), preventing infinite loops in <code className="text-emerald-300 font-mono">while</code> loops, and batch invoice filtering in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Mechanics of Iteration Skipping &amp; Guard Clauses
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The <strong><code className="text-emerald-400 font-mono">continue</code> statement</strong> immediately skips the remainder of the current loop iteration and advances directly to the next iteration cycle:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            for ( StudentInvoice inv : invoices ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;if ( inv.balanceDue() &lt;= 0.0 ) continue; // Skip zero balances!
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;if ( inv.isScholarshipExempt() ) continue; // Skip scholarship recipients!
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;generateTuitionInvoice(inv); // Flat, un-nested business logic!
            <br />
            &#125;
          </p>
          <p>
            <strong>Destination Target:</strong> In a <code className="text-sky-300 font-mono">for</code> loop, <code className="text-emerald-400 font-mono">continue</code> jumps straight to the update expression (<code className="text-sky-300 font-mono">i++</code>). In a <code className="text-amber-300 font-mono">while</code> loop, it jumps straight to the boolean condition check.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Invoice Batch Generator):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> processed batch student fee invoices in Indian Rupees (<code className="text-emerald-400 font-semibold">₹3,000 to ₹5,500</code>). Using <code className="text-emerald-400 font-mono">continue</code> as guard clauses, <strong>Abhronila</strong> and <strong>Debangshu</strong> cleanly filtered out zero-balance accounts and scholarship exemptions without writing complex nested <code className="text-slate-300 font-mono">if-else</code> ladders across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The &apos;continue&apos; Jump Flow &amp; Update Target Destination
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How continue bypasses lower body statements and routes control directly to the loop update clause:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Continue Statement Flow Diagram"
          >
            <defs>
              <linearGradient id="gradGuardCheck" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradContinueJump" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradTargetUpdate" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Guard Clause Evaluation */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradGuardCheck)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Guard Clause Check</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="55" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">if (due &lt;= 0) continue;</text>
            <text x="55" y="122" fill="#fef3c7" fontSize="10">Invalid / Exempt record</text>
            <text x="55" y="142" fill="#fef3c7" fontSize="10">Bypasses invoice generation</text>
            <text x="160" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Guard Evaluator
            </text>

            {/* Box 2: 'continue' Jump Action */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradContinueJump)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. The &apos;continue&apos; Jump</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Skips rest of body</text>
            <text x="335" y="122" fill="#d1fae5" fontSize="10">Never reaches invoice printer</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Jumps to update clause →</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Immediate Skip Action
            </text>

            {/* Box 3: Update Target Destination */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradTargetUpdate)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Update Destination</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">for (..) → executes &apos;i++&apos;</text>
            <text x="615" y="122" fill="#bae6fd" fontSize="10">while (..) → tests condition</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">Advances to next iteration!</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Loop Lifecycle Advances
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.16: continue bypasses remaining body statements and advances directly to the loop update expression.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Comparison: &apos;break&apos; vs. &apos;continue&apos;
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Dimension</th>
                <th className="p-3 font-semibold text-rose-400">`break` Statement</th>
                <th className="p-3 font-semibold text-emerald-400">`continue` Statement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Scope of Impact</td>
                <td className="p-3 text-xs text-rose-400 font-bold">Terminates ENTIRE loop</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">Skips ONLY current iteration</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Target Destination in `for`</td>
                <td className="p-3 text-xs">First statement AFTER loop</td>
                <td className="p-3 text-xs text-emerald-300 font-mono">Loop update clause (`i++`)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Applicable in `switch`?</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">✓ YES (Exits switch branch)</td>
                <td className="p-3 text-xs text-rose-400 font-bold">❌ NO (Compile error in switch)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Primary Architectural Role</td>
                <td className="p-3 text-xs">Early search exit, budget cutoff</td>
                <td className="p-3 text-xs">Data filtering, Guard Clauses</td>
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
            ContinueStatementLoopControlDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates student record filtering with Guard Clauses and safe counter increments in <code className="text-emerald-400 font-mono">while</code> loops in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={continueDemoCode}
          title="ContinueStatementLoopControlDemo.java"
          highlightLines={[31, 37, 51, 52, 53]}
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
              <span>❌</span> Pitfall 1: Placing Counter Increment After `continue` in `while` Loops
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">while (i &lt; 5) &#123; if (i == 2) continue; i++; &#125;</code> causes an infinite loop because skipping <code className="text-rose-400 font-mono">i++</code> leaves <code className="text-slate-300 font-mono">i</code> stuck at 2 forever!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Guard Clauses to Flatten Indentation
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Skip invalid data at the top of the loop body with <code className="text-emerald-400 font-mono">if (invalid) continue;</code> to keep your main happy-path business logic cleanly un-nested.
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
            🤔 <em>&ldquo;Why is `continue` allowed in `for` loops but illegal inside a standalone `switch`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Iteration Semantics! A <code className="text-sky-300 font-mono">switch</code> statement is a branch selection construct, not a loop; it has no &ldquo;next iteration&rdquo; or update clause to jump to. Therefore, <code className="text-rose-300 font-mono">continue</code> has no valid semantic meaning inside a standalone switch!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="The 'continue' Statement FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 13: The 'continue' Jump Statement"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic13_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Use 'continue' as guard clauses to keep your loop bodies clean, flat, and elegant. In while loops, always increment your counter BEFORE calling continue! In Topic 14, we conquer Labeled 'break' and 'continue' in Nested Loops! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
