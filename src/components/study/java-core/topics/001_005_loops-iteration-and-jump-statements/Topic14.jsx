import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import labeledDemoCode from "./topic14_files/LabeledBreakAndContinueDemo.java?raw";
import noteText from "./topic14_files/topic14_note.txt?raw";
import questions from "./topic14_files/topic14_questions";

export default function Topic14() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowLabeled {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(139, 92, 246, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-lb {
            animation: glowLabeled 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 14
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Labeled <code className="text-purple-400 font-mono">&apos;break&apos;</code> &amp; <code className="text-emerald-400 font-mono">&apos;continue&apos;</code>: Multi-Tier Nested Loop Control
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master structured multi-level jump controls in Java (JLS §14.7, §14.15, §14.16): escaping 2D matrix searches via labeled <code className="text-rose-400 font-mono">break</code>, skipping entire grid rows via labeled <code className="text-emerald-400 font-mono">continue</code>, safe alternatives to arbitrary <code className="text-slate-400 font-mono">goto</code>, and campus examination hall seating lookups in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Multi-Tier Flow Control Without &apos;goto&apos;
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When working with nested loops, an unlabeled <code className="text-rose-300 font-mono">break</code> or <code className="text-emerald-300 font-mono">continue</code> affects <strong>only the immediate innermost loop</strong>. Java provides <strong>Labeled Statements</strong> to target outer loop tiers directly:
          </p>
          <p className="font-mono text-purple-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            HALL_SEARCH: // Statement Label on Outer Loop
            <br />
            for ( int hall = 0 ; hall &lt; halls.length ; hall++ ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;for ( int desk = 0 ; desk &lt; desks.length ; desk++ ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if ( currentRoll == targetRoll ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break HALL_SEARCH; // Escapes BOTH desk &amp; hall loops instantly!
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;
            <br />
            &#125;
          </p>
          <p>
            <strong>Structured Safety:</strong> Java reserves the <code className="text-slate-400 font-mono">goto</code> keyword but disallows it to prevent unstructured spaghetti code. Labeled jumps provide clean, structured multi-level flow control strictly tied to block boundaries!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Classroom Case Study (Barrackpore Seating Matrix Search &amp; Maintenance Audit):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> searched for candidate roll numbers across a 3-hall seating matrix. Finding Abhronila&apos;s roll in Hall 2 triggered <code className="text-purple-300 font-mono">break HALL_SEARCH;</code>, halting all scanning instantly. Meanwhile, <strong>Debangshu</strong> skipped an entire hall undergoing equipment repair using <code className="text-emerald-400 font-mono">continue HALL_LOOP;</code> across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Multi-Tier Jump Architecture (Labeled Break &amp; Continue)
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How labeled statements route control across nested loop boundaries:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Labeled Jumps Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradOuterLabel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradLabeledBreak" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradLabeledContinue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Box 1: Outer Loop Label */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradOuterLabel)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Labeled Outer Loop</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="55" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">OUTER: for (r=0; r&lt;R; r++)</text>
            <text x="55" y="122" fill="#ddd6fe" fontSize="11" fontFamily="monospace">&nbsp;&nbsp;for (c=0; c&lt;C; c++) &#123;</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">&nbsp;&nbsp;&nbsp;&nbsp;// Inner logic</text>
            <text x="160" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Enclosing Named Target
            </text>

            {/* Box 2: 'break OUTER;' */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradLabeledBreak)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. &apos;break OUTER;&apos;</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">if (found) break OUTER;</text>
            <text x="335" y="122" fill="#fecdd3" fontSize="10">Escapes ALL nested tiers!</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="10">Transfers past OUTER loop &rarr;</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Instant Matrix Breakout
            </text>

            {/* Box 3: 'continue OUTER;' */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradLabeledContinue)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. &apos;continue OUTER;&apos;</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="615" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">if (skip) continue OUTER;</text>
            <text x="615" y="122" fill="#d1fae5" fontSize="10">Skips remaining inner cols</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Jumps to &apos;r++&apos; of OUTER &rarr;</text>
            <text x="720" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Entire Row Skipping
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.7 &amp; §14.15: Labeled jumps provide structured multi-level flow control across nested loops.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Unlabeled vs. Labeled Jump Controls
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Statement</th>
                <th className="p-3 font-semibold text-rose-400">Jump Target Destination</th>
                <th className="p-3 font-semibold text-emerald-400">Multi-Tier Escape Capability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">`break;` (Unlabeled)</td>
                <td className="p-3 text-xs">Immediately after innermost loop</td>
                <td className="p-3 text-xs text-rose-400 font-bold">❌ Innermost loop ONLY</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-purple-300">`break LABEL;`</td>
                <td className="p-3 text-xs">Immediately after named labeled loop/block</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">✓ Exits ALL nested levels to label</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-300">`continue;` (Unlabeled)</td>
                <td className="p-3 text-xs">Update clause of innermost loop</td>
                <td className="p-3 text-xs text-rose-400 font-bold">❌ Innermost loop ONLY</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-300">`continue LABEL;`</td>
                <td className="p-3 text-xs">Update clause of named outer loop</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">✓ Skips rest of inner &amp; advances outer</td>
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
            LabeledBreakAndContinueDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates labeled <code className="text-purple-400 font-mono">break</code> for 2D matrix search and labeled <code className="text-emerald-400 font-mono">continue</code> for entire row skipping in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={labeledDemoCode}
          title="LabeledBreakAndContinueDemo.java"
          highlightLines={[30, 31, 39, 48, 49, 56]}
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
              <span>❌</span> Pitfall 1: Accidental Semicolon After Label Name
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">OUTER:; for (...)</code> attaches the label to the empty semicolon statement! Calling <code className="text-rose-400 font-mono">break OUTER;</code> inside the loop fails with <code className="text-rose-400 font-mono">undefined label</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use UPPER_SNAKE_CASE for Label Names
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Name your labels cleanly (e.g. <code className="text-purple-300 font-mono">SEARCH_MATRIX:</code>, <code className="text-purple-300 font-mono">ROW_LOOP:</code>) to distinguish them instantly from variables and methods.
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
            🤔 <em>&ldquo;Why can `break LABEL;` target an arbitrary `{ ... }` block, but `continue LABEL;` cannot?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Loop Iteration vs Block Termination! A <code className="text-rose-400 font-mono">break</code> simply transfers control past the end of a block. But <code className="text-emerald-400 font-mono">continue</code> requires an iteration mechanism (re-evaluating a condition and executing an update step). Because arbitrary compound blocks do not loop, <code className="text-emerald-400 font-mono">continue</code> is semantically illegal on non-loop blocks!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Labeled 'break' & 'continue' FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 14: Labeled 'break' & 'continue'"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic14_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Labeled jump statements give you precision surgical control over multi-level nested loops. Use break LABEL to exit 2D matrix searches instantly, and continue LABEL to skip entire grid rows cleanly! In Topic 15, we start 2D Visual Star Patterns! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
