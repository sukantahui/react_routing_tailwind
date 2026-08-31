import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import breakDemoCode from "./topic7_files/SwitchBreakAndFallthroughDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
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
          .animate-glow-break {
            animation: glowBreak 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 7
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-rose-400">&apos;break&apos;</code> Statement &amp; Intentional vs Accidental Fall-Through
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master execution termination and cascading flow in Java switch blocks: understanding the <code className="text-rose-400 font-mono">break;</code> statement (JLS §14.15), avoiding dangerous accidental fall-through bugs, utilizing intentional multi-case stacking and cumulative benefit cascades, labeled breaks from loops, and student membership tier audits in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Mechanics of Fall-Through &amp; the &apos;break&apos; Statement
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In traditional Java switch statements, when a matching <code className="text-emerald-400 font-mono">case</code> is found, execution flows sequentially down through all subsequent statements until a <code className="text-rose-400 font-mono">break;</code> or the end of the block is reached.
          </p>
          <p>
            <strong>Accidental Fall-Through:</strong> Forgetting a <code className="text-rose-400 font-mono">break;</code> causes the statements of the next case to execute unintentionally, which is one of the most common sources of business logic bugs.
            <br />
            <strong>Intentional Fall-Through:</strong> Deliberately omitting <code className="text-rose-400 font-mono">break;</code> to allow multi-case grouping (e.g. stacking Monday through Friday) or cumulative privilege inheritance.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-rose-500 text-slate-300 space-y-2">
            <p className="font-medium text-rose-300">Classroom Case Study (Barrackpore Membership Privilege Cascade):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built a student membership privilege engine in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By leveraging intentional cascading fall-through, a Level 3 Platinum student receives high-end cloud server access (₹10,000 value), falling through to 1-on-1 mentorship and standard laboratory workstation perks without duplicating code across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Fall-Through Flow vs. Intentional Multi-Case Stacking
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How missing break statements cascade downward and how cases can be cleanly stacked:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Switch Fall-Through and Break Diagram"
          >
            <defs>
              <linearGradient id="gradAccidental" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradStacking" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradLabeledBreak" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Accidental Fall-Through */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradAccidental)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Accidental Fall-Through</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="55" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">case 1: s1(); // No break!</text>
            <text x="55" y="122" fill="#fecdd3" fontSize="10">case 2: s2(); // Runs s2() too!</text>
            <text x="55" y="142" fill="#fecdd3" fontSize="10">Severe logic bug in production</text>
            <text x="160" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ⚠️ Missing Break Hazard
            </text>

            {/* Box 2: Multi-Case Stacking */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradStacking)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Multi-Case Stacking</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">case &quot;SAT&quot;:</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">case &quot;SUN&quot;: workshop(); break;</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Shared execution block</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Intentional Grouping
            </text>

            {/* Box 3: Labeled Break from Loops */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradLabeledBreak)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Labeled Break</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">LOOP: while (true) &#123;</text>
            <text x="615" y="122" fill="#bae6fd" fontSize="10">&nbsp;&nbsp;switch (cmd) &#123;</text>
            <text x="615" y="142" fill="#e0f2fe" fontSize="10">&nbsp;&nbsp;&nbsp;&nbsp;case &quot;Q&quot;: break LOOP;</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Exits Enclosing Loop Directly
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.15: Break terminates switch; use @SuppressWarnings(&quot;fallthrough&quot;) for intentional cascades.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Intentional vs Accidental Fall-Through Patterns
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Pattern Type</th>
                <th className="p-3 font-semibold text-emerald-400">Code Structure</th>
                <th className="p-3 font-semibold text-amber-400">Execution Behavior</th>
                <th className="p-3 font-semibold text-rose-400">Risk / Quality Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400 font-bold">Accidental Omission</td>
                <td className="p-3 font-mono text-rose-300">case 1: s1(); case 2: s2();</td>
                <td className="p-3 text-xs text-rose-400">Executes s1() then s2() unintentionally</td>
                <td className="p-3 text-xs text-rose-400 font-semibold">Severe Bug / Major Code Smell</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400 font-bold">Case Stacking</td>
                <td className="p-3 font-mono text-emerald-300">case 1: case 2: s(); break;</td>
                <td className="p-3 text-xs text-emerald-300">Both case 1 and 2 execute common action s()</td>
                <td className="p-3 text-xs text-emerald-400">Clean Idiomatic Standard</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-400 font-bold">Cumulative Cascade</td>
                <td className="p-3 font-mono text-sky-300">case 3: p3(); case 2: p2(); break;</td>
                <td className="p-3 text-xs text-sky-300">Tier 3 inherits Tier 2 perks cumulatively</td>
                <td className="p-3 text-xs text-sky-400">Legitimate (Must be commented!)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-purple-400 font-bold">Java 14+ Arrow Switch</td>
                <td className="p-3 font-mono text-purple-300">case 1, 2 -&gt; s();</td>
                <td className="p-3 text-xs text-purple-300">Executes s() without any fall-through</td>
                <td className="p-3 text-xs text-purple-400">Modern State of the Art</td>
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
            SwitchBreakAndFallthroughDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates accidental fall-through bugs, intentional multi-case grouping, and cumulative membership tier cascading in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={breakDemoCode}
          title="SwitchBreakAndFallthroughDemo.java"
          highlightLines={[23, 27, 30, 48, 52, 57, 72, 75, 78]}
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
              <span>❌</span> Pitfall 1: Assuming Braces &#123;&#125; Stop Fall-Through
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">case 1: &#123; int y = 10; &#125; case 2: ...</code> isolates variable scope but DOES NOT stop execution fall-through! A <code className="text-emerald-400 font-mono">break;</code> statement is still required!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Labeled Break to Exit Outer Loops from Switch
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When a switch is embedded inside a loop, an unlabeled <code className="text-sky-300 font-mono">break;</code> exits only the switch. Use <code className="text-emerald-400 font-mono">break LOOP_LABEL;</code> to exit the enclosing loop.
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
            🤔 <em>&ldquo;Why did traditional switch have fall-through by default in the first place?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Assembly Line Heritage from C! Dennis Ritchie designed C&apos;s switch statement in 1972 as a thin abstraction over raw assembly jump tables. Fall-through allowed assembly programmers to execute sequential machine instructions without inserting jump instructions. While useful in low-level systems code, it proved to be a frequent source of bugs in high-level business software, which is why Java 14 introduced arrow syntax <code className="text-emerald-400 font-bold">case X -&gt; Y</code> to eliminate fall-through entirely!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Switch 'break' & Fall-Through FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 7: The 'break' Statement & Fall-Through"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic7_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The break statement is your safeguard against accidental fall-through. Always double-check your cases for explicit break statements, or leverage Java 14+ arrow switch expressions. In Topic 8, we explore the 'default' case and placement best practices! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
