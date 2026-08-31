import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bugDemoCode from "./topic9_files/JavaCommonBugsDebuggingChallengeDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowBug {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(244, 63, 94, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(244, 63, 94, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-bg {
            animation: glowBug 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 9
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Debugging Challenge · 10 Classic Bugs
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Debugging Challenge: Identifying &amp; Resolving 10 Common Java Bugs
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master professional Java diagnostic skills: systematically identifying and resolving the 10 most common compilation, runtime, and logical bugs including String <code className="text-rose-400 font-mono">==</code> vs <code className="text-emerald-400 font-mono">.equals()</code>, NullPointerExceptions, off-by-one errors, integer division truncations, arithmetic overflows, and <code className="text-purple-300 font-mono">ConcurrentModificationException</code>.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The 10 Landmark Bug Categories in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Understanding these 10 failure patterns separates amateur coders from production-ready software engineers:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold text-sm mb-1">1. Reference Bugs</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                String <code className="text-rose-400 font-mono">==</code> address mismatch and unhandled <code className="text-rose-400 font-mono">NullPointerException</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-1">2. Arithmetic Bugs</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Integer division truncation (<code className="text-slate-300 font-mono">5/2 = 2</code>) and 32-bit overflow before long assignment.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">3. Control Flow Bugs</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Off-by-one array bounds, phantom semicolons (<code className="text-purple-300 font-mono">for(...);</code>), and switch fall-through.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">4. Scope &amp; Iteration</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Variable shadowing without <code className="text-slate-300 font-mono">this</code> and modifying lists in for-each loops.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Code Review Lab):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> fixed string equality using <code className="text-emerald-400 font-mono">.equals()</code>, <strong>Tuhina</strong> prevented financial overflow in fee calculations (<code className="text-emerald-400 font-semibold">₹3,000,000,000</code>), <strong>Abhronila</strong> resolved constructor shadowing with <code className="text-sky-300 font-mono">this.name = name</code>, and <strong>Debangshu</strong> safely removed list items using <code className="text-purple-300 font-mono">list.removeIf()</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚙️</span> The 4 Critical Bug Diagnostic Heatmaps
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing common bug triggers and their architectural remedies:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Java Bug Diagnostics Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradBug1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
              <linearGradient id="gradFix1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Panel 1: String Equality */}
            <rect x="30" y="30" width="190" height="215" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
            <text x="125" y="55" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">1. STRING EQUALITY</text>
            <rect x="40" y="70" width="170" height="40" rx="4" fill="#450a0a" />
            <text x="50" y="90" fill="#fca5a5" fontSize="9" fontFamily="monospace">BUG: a == b</text>
            <text x="50" y="102" fill="#fca5a5" fontSize="8">(Address check!)</text>
            <rect x="40" y="125" width="170" height="40" rx="4" fill="#022c22" />
            <text x="50" y="145" fill="#a7f3d0" fontSize="9" fontFamily="monospace">FIX: a.equals(b)</text>
            <text x="50" y="157" fill="#6ee7b7" fontSize="8">(Compares chars)</text>

            {/* Panel 2: Integer Division */}
            <rect x="240" y="30" width="190" height="215" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="335" y="55" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">2. INT DIVISION</text>
            <rect x="250" y="70" width="170" height="40" rx="4" fill="#451a03" />
            <text x="260" y="90" fill="#fde68a" fontSize="9" fontFamily="monospace">BUG: double avg = 5/2;</text>
            <text x="260" y="102" fill="#fde68a" fontSize="8">Yields 2.0 (Truncated!)</text>
            <rect x="250" y="125" width="170" height="40" rx="4" fill="#022c22" />
            <text x="260" y="145" fill="#a7f3d0" fontSize="9" fontFamily="monospace">FIX: (double) 5 / 2;</text>
            <text x="260" y="157" fill="#6ee7b7" fontSize="8">Yields exact 2.5</text>

            {/* Panel 3: Array Bounds */}
            <rect x="450" y="30" width="190" height="215" rx="8" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="545" y="55" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">3. ARRAY BOUNDS</text>
            <rect x="460" y="70" width="170" height="40" rx="4" fill="#2e1065" />
            <text x="470" y="90" fill="#ddd6fe" fontSize="9" fontFamily="monospace">BUG: i &lt;= arr.length</text>
            <text x="470" y="102" fill="#ddd6fe" fontSize="8">Throws IndexOutOfBounds</text>
            <rect x="460" y="125" width="170" height="40" rx="4" fill="#022c22" />
            <text x="470" y="145" fill="#a7f3d0" fontSize="9" fontFamily="monospace">FIX: i &lt; arr.length</text>
            <text x="470" y="157" fill="#6ee7b7" fontSize="8">Strict inequality &lt;</text>

            {/* Panel 4: Concurrent Mod */}
            <rect x="660" y="30" width="190" height="215" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="755" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">4. FOR-EACH MUTATION</text>
            <rect x="670" y="70" width="170" height="40" rx="4" fill="#082f49" />
            <text x="680" y="90" fill="#bae6fd" fontSize="9" fontFamily="monospace">BUG: list.remove(s)</text>
            <text x="680" y="102" fill="#bae6fd" fontSize="8">ConcurrentModException</text>
            <rect x="670" y="125" width="170" height="40" rx="4" fill="#022c22" />
            <text x="680" y="145" fill="#a7f3d0" fontSize="9" fontFamily="monospace">FIX: list.removeIf()</text>
            <text x="680" y="157" fill="#6ee7b7" fontSize="8">Safe batch removal</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Diagnosing and resolving these 10 bugs guarantees rock-solid, production-grade Java application behavior.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> The 10 Classic Bugs Summary Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">#</th>
                <th className="p-3 font-semibold text-rose-400">Bug Anti-Pattern</th>
                <th className="p-3 font-semibold text-emerald-400">Production Fix</th>
                <th className="p-3 font-semibold text-amber-400">Root Cause</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">1</td>
                <td className="p-3 text-rose-300">`a == b` (Strings)</td>
                <td className="p-3 text-emerald-300">`a.equals(b)`</td>
                <td className="p-3 text-slate-300 font-sans">Memory reference vs content comparison</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">2</td>
                <td className="p-3 text-rose-300">`text.length()` (Unchecked)</td>
                <td className="p-3 text-emerald-300">`text == null ? 0 : text.length()`</td>
                <td className="p-3 text-slate-300 font-sans">Null pointer dereference</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">3</td>
                <td className="p-3 text-rose-300">`i &lt;= arr.length`</td>
                <td className="p-3 text-emerald-300">`i &lt; arr.length`</td>
                <td className="p-3 text-slate-300 font-sans">Off-by-one array index violation</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">4</td>
                <td className="p-3 text-rose-300">`double avg = 5 / 2;`</td>
                <td className="p-3 text-emerald-300">`(double) 5 / 2`</td>
                <td className="p-3 text-slate-300 font-sans">Integer division truncation before assignment</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">5</td>
                <td className="p-3 text-rose-300">`long t = price * qty;`</td>
                <td className="p-3 text-emerald-300">`(long) price * qty`</td>
                <td className="p-3 text-slate-300 font-sans">32-bit integer overflow before long conversion</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">6</td>
                <td className="p-3 text-rose-300">`for(...); count++;`</td>
                <td className="p-3 text-emerald-300">`for(...) count++;`</td>
                <td className="p-3 text-slate-300 font-sans">Empty loop body created by phantom semicolon</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">7</td>
                <td className="p-3 text-rose-300">`name = name;`</td>
                <td className="p-3 text-emerald-300">`this.name = name;`</td>
                <td className="p-3 text-slate-300 font-sans">Constructor variable shadowing</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">8</td>
                <td className="p-3 text-rose-300">Missing switch `break`</td>
                <td className="p-3 text-emerald-300">`switch (x) &#123; case 1 -&gt; ... &#125;`</td>
                <td className="p-3 text-slate-300 font-sans">Fall-through execution bugs</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">9</td>
                <td className="p-3 text-rose-300">Infinite Recursion</td>
                <td className="p-3 text-emerald-300">`if (n &lt;= 0) return 0;`</td>
                <td className="p-3 text-slate-300 font-sans">Missing base case causing StackOverflow</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">10</td>
                <td className="p-3 text-rose-300">`list.remove()` in for-each</td>
                <td className="p-3 text-emerald-300">`list.removeIf(predicate)`</td>
                <td className="p-3 text-slate-300 font-sans">ModCount violation during iteration</td>
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
            JavaCommonBugsDebuggingChallengeDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program compiles and executes the resolved fixes for all 10 common bugs.
        </p>

        <JavaFileLoader
          fileModule={bugDemoCode}
          title="JavaCommonBugsDebuggingChallengeDemo.java"
          highlightLines={[22, 30, 39, 49, 58, 67, 80, 90, 100, 108]}
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
              <span>❌</span> Pitfall 1: Modifying Collections During Enhanced For-Each
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never call <code className="text-rose-300 font-mono">list.remove()</code> or <code className="text-rose-300 font-mono">list.add()</code> inside an enhanced for-each loop; it immediately throws <code className="text-rose-400 font-mono">ConcurrentModificationException</code>. Use <code className="text-emerald-400 font-mono">list.removeIf()</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Modern Switch Expressions
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Adopt Java 14+ switch expressions with arrow syntax (<code className="text-emerald-400 font-mono">case 1 -&gt; ...</code>) to permanently eliminate accidental fall-through bugs.
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
            🤔 <em>&ldquo;Why does <code className="text-emerald-400 font-mono">long total = price * qty;</code> fail when both price and qty are ints?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Expression Evaluation Precedence! In Java, the right-hand side <code className="text-rose-300 font-mono">price * qty</code> is evaluated FIRST using 32-bit signed integer arithmetic. If it overflows, it turns negative, and ONLY THEN is the corrupted negative integer widened to <code className="text-slate-300 font-mono">long</code>! Casting <code className="text-emerald-400 font-mono">(long) price * qty</code> forces 64-bit multiplication!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Java Debugging FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 9: Debugging 10 Common Java Bugs"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic9_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Debugging is where true mastery begins. When you know why these 10 bugs occur, you write defensive, bulletproof code! In Topic 10, we master Writing Clean, Readable Code Conforming to Google Java Style Guide! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
