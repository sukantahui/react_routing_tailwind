import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import defaultDemoCode from "./topic8_files/SwitchDefaultPlacementDemo.java?raw";
import noteText from "./topic8_files/topic8_note.txt?raw";
import questions from "./topic8_files/topic8_questions";

export default function Topic8() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowDefault {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-def {
            animation: glowDefault 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 8
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          The <code className="text-amber-400">&apos;default&apos;</code> Case &amp; Placement Best Practices
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master fallback mechanics in Java switch blocks: grammar and execution semantics (JLS §14.11), avoiding the dangerous non-bottom placement trap (<code className="text-rose-400 font-mono">default:</code> at the top falling into <code className="text-sky-300 font-mono">case 1:</code>), compiler Definite Assignment guarantees, fail-fast exception throwing, and course fee counseling audits in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Role and Mechanics of the &apos;default&apos; Case
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The <strong><code className="text-amber-400 font-mono">default</code> label</strong> acts as a catch-all fallback block that executes when none of the explicit <code className="text-emerald-400 font-mono">case</code> constant values match the selector expression:
          </p>
          <p className="font-mono text-amber-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            switch ( trackCode ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case &quot;JAVA&quot;: &nbsp;&nbsp;&nbsp;enrollJava(); break;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case &quot;PYTHON&quot;: enrollPython(); break;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;default: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;generalCounseling(); break;
            <br />
            &#125;
          </p>
          <p>
            While Java grammar allows <code className="text-amber-400 font-mono">default:</code> to be placed anywhere in the switch block (top, middle, or bottom), placing it at the top without a <code className="text-rose-400 font-mono">break;</code> causes it to fall through into subsequent cases when an unmatched key is passed. <strong>Always place default at the bottom!</strong>
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300 space-y-2">
            <p className="font-medium text-amber-300">Classroom Case Study (Barrackpore Banking Action Validator):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built a banking transaction validator in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By leveraging a bottom-placed <code className="text-amber-400 font-mono">default:</code> branch that throws an explicit <code className="text-rose-400 font-mono">IllegalArgumentException</code> on unrecognized action tokens, <strong>Abhronila</strong> and <strong>Debangshu</strong> enforced the Fail-Fast Principle, preventing unauthorized execution states across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Standard Bottom Placement vs The Top Placement Trap
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How default branches execute and why non-bottom placement without break causes bugs:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Switch Default Placement and Traps Diagram"
          >
            <defs>
              <linearGradient id="gradDefaultBottom" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradDefaultTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradFailFast" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Standard Bottom Placement */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradDefaultBottom)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Standard Bottom Placement</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">case 1: s1(); break;</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">default: fallback(); break;</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Natural reading order &amp; safe</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Industry Best Practice
            </text>

            {/* Box 2: Top Placement Trap */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradDefaultTop)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Top Placement Trap</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">default: sD(); // No break!</text>
            <text x="335" y="122" fill="#fecdd3" fontSize="10">case 1: s1(); break;</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="10">Falls through into case 1!</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ⚠️ Fall-Through Hazard
            </text>

            {/* Box 3: Fail-Fast Exception */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradFailFast)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Fail-Fast Exception</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">default: throw new</text>
            <text x="615" y="122" fill="#fef3c7" fontSize="10">IllegalArgumentException(&quot;...&quot;);</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">Prevents corrupt data persistence</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Defensive Domain Modeling
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.11: Only one default is allowed per switch; always place default at the bottom.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Default Placement Patterns &amp; Risk Assessment
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Placement Position</th>
                <th className="p-3 font-semibold text-emerald-400">Code Syntax Style</th>
                <th className="p-3 font-semibold text-amber-400">Fall-Through Risk</th>
                <th className="p-3 font-semibold text-slate-400">Readability &amp; Safety</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400 font-bold">Bottom Placement</td>
                <td className="p-3 font-mono text-emerald-300">default: fallback(); break;</td>
                <td className="p-3 text-xs text-emerald-400">Zero risk (Nothing follows default)</td>
                <td className="p-3 text-xs text-emerald-400 font-semibold">Gold Standard (Clean &amp; Safe)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400 font-bold">Top Placement</td>
                <td className="p-3 font-mono text-rose-300">default: sD(); case 1: s1();</td>
                <td className="p-3 text-xs text-rose-400 font-bold">HIGH: Falls into following cases without break</td>
                <td className="p-3 text-xs text-rose-400">Anti-pattern / Confusing</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-amber-400 font-bold">Middle Placement</td>
                <td className="p-3 font-mono text-amber-300">case 1: ... default: ... case 2: ...</td>
                <td className="p-3 text-xs text-rose-400 font-bold">HIGH: Falls into case 2 without break</td>
                <td className="p-3 text-xs text-amber-300">Discouraged</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-purple-400 font-bold">Modern Arrow Default</td>
                <td className="p-3 font-mono text-purple-300">default -&gt; throw new ...;</td>
                <td className="p-3 text-xs text-emerald-400">Zero risk (No fall-through possible)</td>
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
            SwitchDefaultPlacementDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates standard bottom default placement, the non-bottom default fall-through trap, and defensive exception throwing in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={defaultDemoCode}
          title="SwitchDefaultPlacementDemo.java"
          highlightLines={[22, 28, 30, 52, 55, 58, 61, 71, 74]}
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
              <span>❌</span> Pitfall 1: Multiple Default Labels in a Single Switch
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">default: ... default: ...</code> causes a compile-time error. Exactly one default label is permitted per switch block.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Throw IllegalArgumentException in Default for Domain Safety
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In business-critical switches, if an unhandled value indicates an invalid state, throw <code className="text-emerald-400 font-mono">new IllegalArgumentException(&quot;Unknown value: &quot; + val)</code> inside <code className="text-amber-300 font-mono">default:</code> to fail fast.
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
            🤔 <em>&ldquo;Why does Java permit placing `default` at the top of a switch statement if it causes fall-through bugs?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Grammar Flexibility vs Style Best Practices! The Java grammar (JLS §14.11) treats <code className="text-amber-400 font-mono">default</code> as just another switch label alongside <code className="text-emerald-400 font-mono">case</code>. The JVM jump table resolves all constant cases first, only jumping to <code className="text-amber-400 font-mono">default</code> if no case matches. However, because execution proceeds sequentially once inside the block, a non-bottom default without <code className="text-rose-400 font-mono">break;</code> falls through into whatever follows it!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Switch 'default' Case FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 8: The 'default' Case & Placement Best Practices"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic8_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The default case is your ultimate safety net. Always place default at the bottom of the switch block, include a defensive break or exception, and use it to satisfy Definite Assignment. In Topic 9, we compare 'switch' vs 'else-if' ladder: readability, jump tables, and performance! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
