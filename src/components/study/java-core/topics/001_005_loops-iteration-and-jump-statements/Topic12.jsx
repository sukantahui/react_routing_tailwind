import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import breakDemoCode from "./topic12_files/BreakStatementLoopControlDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowBreak {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(244, 63, 94, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(244, 63, 94, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-br {
            animation: glowBreak 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 12
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Jump Statements: The <code className="text-rose-400 font-mono">&apos;break&apos;</code> Statement for Immediate Loop Termination
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master unconditioned loop termination in Java (JLS §14.15): early exit optimizations in linear search, financial threshold budget cutoffs in Indian Rupees (₹), innermost lexical scope binding in nested hierarchies, and try-finally execution guarantees.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Mechanics of Immediate Jump Termination
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The <strong><code className="text-rose-400 font-mono">break</code> statement</strong> immediately terminates the innermost enclosing <code className="text-sky-300 font-mono">for</code>, <code className="text-emerald-300 font-mono">while</code>, <code className="text-amber-300 font-mono">do-while</code>, or <code className="text-purple-300 font-mono">switch</code> statement:
          </p>
          <p className="font-mono text-rose-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            for ( StudentRecord s : roster ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;if ( s.rollNo() == targetRoll ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;foundStudent = s;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break; // Immediately terminates loop!
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;
            <br />
            &#125;
          </p>
          <p>
            <strong>Early Exit Performance:</strong> In a roster of 10,000 students, finding the target at index 3 and executing <code className="text-rose-400 font-mono">break</code> saves 9,996 unnecessary iterations—reducing runtime from $O(N)$ to $O(1)$!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-rose-500 text-slate-300 space-y-2">
            <p className="font-medium text-rose-300">Classroom Case Study (Barrackpore Roster Search &amp; ₹6,000 Budget Cutoff):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> searched for student records using <code className="text-rose-300 font-mono">break</code> to halt inspection upon finding Abhronila&apos;s roll number. Simultaneously, <strong>Debangshu</strong> implemented a scholarship disbursement cutoff in Indian Rupees (<code className="text-emerald-400 font-semibold">₹6,000 budget ceiling</code>) that safely halted allocations when claims exceeded remaining funds across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Early Exit Optimization Flow with &apos;break&apos;
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How break bypasses remaining loop iterations and transfers control to the post-loop statement:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Break Statement Flow Diagram"
          >
            <defs>
              <linearGradient id="gradSearchFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradBreakTrigger" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradBypassed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#64748b" />
                <stop offset="100%" stopColor="#334155" />
              </linearGradient>
            </defs>

            {/* Box 1: Elements Checked */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradSearchFlow)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Sequential Inspection</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">Inspect #101: Swadeep (No)</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">Inspect #102: Tuhina (No)</text>
            <text x="55" y="142" fill="#a7f3d0" fontSize="10">Inspect #103: Abhronila (MATCH!)</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Target Located!
            </text>

            {/* Box 2: 'break' Trigger */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradBreakTrigger)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Instant Jump &apos;break;&apos;</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">if (roll == 103) break;</text>
            <text x="335" y="122" fill="#fecdd3" fontSize="10">Halts loop instantly!</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="10">Jumps to post-loop code &rarr;</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Abrupt Termination
            </text>

            {/* Box 3: Bypassed Redundant Checks */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradBypassed)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Bypassed Elements</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#1e293b" />
            <text x="615" y="102" fill="#94a3b8" fontSize="10" fontFamily="monospace">#104: Debangshu (Skipped)</text>
            <text x="615" y="122" fill="#94a3b8" fontSize="10" fontFamily="monospace">#105: Pritam (Skipped)</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">Saves CPU time &amp; battery!</text>
            <text x="720" y="190" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold">
              Zero Wasted Cycles
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.15: break transfers control immediately to the statement following the loop, bypassing all remaining cycles.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> &apos;break&apos; Behavior Across Loop Constructs
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Construct</th>
                <th className="p-3 font-semibold text-emerald-400">`break;` Execution Behavior</th>
                <th className="p-3 font-semibold text-purple-400">Update Clause Executed?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">Standard `for` Loop</td>
                <td className="p-3 text-xs">Exits immediately to next statement outside the loop</td>
                <td className="p-3 text-xs text-rose-400 font-bold">❌ NO (`i++` is bypassed)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-300">`while` Loop</td>
                <td className="p-3 text-xs">Exits immediately without re-checking condition</td>
                <td className="p-3 text-xs text-rose-400 font-bold">❌ NO (Condition bypassed)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-amber-300">`do-while` Loop</td>
                <td className="p-3 text-xs">Exits immediately, skipping post-test while condition</td>
                <td className="p-3 text-xs text-rose-400 font-bold">❌ NO (Post-test bypassed)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-purple-300">`switch` Inside `for`</td>
                <td className="p-3 text-xs text-amber-300 font-bold">Exits ONLY the `switch`; `for` loop continues!</td>
                <td className="p-3 text-xs text-emerald-400">✓ YES (`for` loop update runs)</td>
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
            BreakStatementLoopControlDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates linear search early exit, budget ceiling cutoffs, and innermost scope rules in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={breakDemoCode}
          title="BreakStatementLoopControlDemo.java"
          highlightLines={[32, 33, 46, 47, 60]}
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
              <span>❌</span> Pitfall 1: Expecting Unlabeled `break` to Exit an Outer Loop
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In nested loops, calling <code className="text-rose-300 font-mono">break;</code> inside the inner loop leaves the outer loop completely active! To break both, you must use a labeled break (<code className="text-emerald-400 font-mono">break OUTER;</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Prefer `break` Over Complex Boolean Flags
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Avoid creating cumbersome <code className="text-slate-300 font-mono">boolean isFound = false; while (!isFound &amp;&amp; i &lt; n)</code> flags. An immediate <code className="text-rose-400 font-mono">break</code> is cleaner, faster, and self-documenting.
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
            🤔 <em>&ldquo;If a `break` executes inside a try block, does the `finally` block still execute?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Absolute JVM Guarantee! The Java Virtual Machine guarantees that <code className="text-emerald-300 font-mono">finally</code> blocks are executed before control leaves the method or loop frame. The <code className="text-emerald-300 font-mono">finally</code> block will run completely before the <code className="text-rose-400 font-mono">break</code> statement transfers control to the post-loop statement!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="The 'break' Statement FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 12: The 'break' Jump Statement"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic12_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Use 'break' to make your search algorithms blazingly fast and cleanly enforce budget ceilings. Remember: Unlabeled break affects ONLY the innermost loop! In Topic 13, we explore the 'continue' statement to skip iterations! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
