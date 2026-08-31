import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import yieldDemoCode from "./topic15_files/SwitchYieldKeywordDemo.java?raw";
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
          @keyframes glowYield {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(245, 158, 11, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-yld {
            animation: glowYield 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 15
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The <code className="text-amber-400">&apos;yield&apos;</code> Keyword in Multi-Statement Switch Blocks
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master returning values from multi-line switch blocks (JLS §14.21, Java 14+): contextual keyword mechanics, yielding values from arrow block bodies (<code className="text-emerald-400 font-mono">case X -&gt; &#123; ... yield val; &#125;</code>), the critical distinction between <code className="text-amber-300 font-mono">yield</code> vs <code className="text-sky-300 font-mono">return</code> vs <code className="text-rose-400 font-mono">break</code>, and multi-factor course tuition calculations in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> What is the &apos;yield&apos; Statement in Java?
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When a branch in a switch expression requires multiple statements (such as logging, parameter validation, or intermediate calculations), the statements are enclosed in curly braces <code className="text-amber-300 font-mono">&#123; ... &#125;</code> and the final result is produced using the <strong><code className="text-amber-400 font-mono">yield</code> statement</strong>:
          </p>
          <p className="font-mono text-amber-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            int tuition = switch ( selectedTier ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case PROFESSIONAL -&gt; &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int base = 18000;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int meritDiscount = (score &gt;= 80) ? 3000 : 0;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;logDiscount(meritDiscount);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;yield base - meritDiscount; // Produces value from switch!
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;default -&gt; 10000;
            <br />
            &#125;;
          </p>
          <p>
            <strong>Contextual Keyword:</strong> <code className="text-amber-400 font-mono">yield</code> is a restricted identifier. It acts as a keyword ONLY inside switch blocks, meaning variables or methods named <code className="text-slate-300 font-mono">yield</code> outside switch continue to compile without issue.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300 space-y-2">
            <p className="font-medium text-amber-300">Classroom Case Study (Barrackpore Plan Settlement Engine):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built a course plan settlement engine in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By calculating intermediate discounts and logging telemetry inside multi-statement block bodies before calling <code className="text-amber-400 font-mono">yield netPayable;</code>, <strong>Abhronila</strong> and <strong>Debangshu</strong> preserved high system observability while keeping variable assignments clean and immutable across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Multi-Statement Block Flow &amp; &apos;yield&apos; vs &apos;return&apos; vs &apos;break&apos;
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How yield produces values from switch blocks without exiting the enclosing method:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Yield vs Return vs Break Diagram"
          >
            <defs>
              <linearGradient id="gradYield" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradReturn" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradBreak" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>

            {/* Box 1: yield value */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradYield)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. yield value;</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="55" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">yield result;</text>
            <text x="55" y="122" fill="#fef3c7" fontSize="10">Exits ONLY the switch expression</text>
            <text x="55" y="142" fill="#fef3c7" fontSize="10">Method continues execution!</text>
            <text x="160" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Produces Switch Value
            </text>

            {/* Box 2: return value */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradReturn)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. return value;</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="335" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">return methodResult;</text>
            <text x="335" y="122" fill="#bae6fd" fontSize="10">Exits the ENTIRE enclosing method</text>
            <text x="335" y="142" fill="#e0f2fe" fontSize="10">Method caller receives value</text>
            <text x="440" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Exits Entire Method
            </text>

            {/* Box 3: break */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradBreak)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. break;</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="615" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">break;</text>
            <text x="615" y="122" fill="#fecdd3" fontSize="10">Exits loop or switch statement</text>
            <text x="615" y="142" fill="#fecdd3" fontSize="10">Does NOT produce a value!</text>
            <text x="720" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Terminates Statement
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.21: Use &apos;yield&apos; to produce values from multi-statement switch blocks while keeping the enclosing method active.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Control Statement Comparison: yield vs. return vs. break
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Statement</th>
                <th className="p-3 font-semibold text-amber-400">Scope of Termination</th>
                <th className="p-3 font-semibold text-emerald-400">Produces Value?</th>
                <th className="p-3 font-semibold text-slate-400">Valid Contexts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-amber-400 font-bold">yield value;</td>
                <td className="p-3 text-xs text-amber-300 font-semibold">Exits ONLY the Switch Expression</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">YES (Yields to switch caller)</td>
                <td className="p-3 text-xs">Switch Expressions only</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-400 font-bold">return value;</td>
                <td className="p-3 text-xs text-rose-400">Exits the ENTIRE Enclosing Method</td>
                <td className="p-3 text-xs text-emerald-400">YES (Yields to method caller)</td>
                <td className="p-3 text-xs">Methods and Constructors</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400 font-bold">break;</td>
                <td className="p-3 text-xs text-rose-400">Exits Loop or Switch Statement</td>
                <td className="p-3 text-xs text-rose-400 font-bold">NO (Void control transfer)</td>
                <td className="p-3 text-xs">Loops, Switch Statements</td>
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
            SwitchYieldKeywordDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates <code className="text-amber-400 font-mono">yield</code> in multi-statement arrow blocks, colon-style switch expressions, and the difference between <code className="text-amber-300 font-mono">yield</code> vs <code className="text-sky-300 font-mono">return</code> in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={yieldDemoCode}
          title="SwitchYieldKeywordDemo.java"
          highlightLines={[25, 27, 33, 39, 50, 53, 56, 73, 77, 81]}
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
              <span>❌</span> Pitfall 1: Missing &apos;yield&apos; on Inner if-else Execution Paths
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If an arrow block has <code className="text-rose-300 font-mono">if (c) yield 10;</code> without an <code className="text-rose-300 font-mono">else yield 20;</code>, the compiler raises an error because the branch does not yield a value on all paths!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Keep Block Bodies Short and Concise
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Limit multi-statement <code className="text-amber-300 font-mono">&#123; ... yield; &#125;</code> blocks to 3-5 lines. Extract larger algorithms into private helper methods called via clean single-line arrows.
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
            🤔 <em>&ldquo;Why didn&apos;t Java just reuse `break value;` instead of creating the `yield` keyword?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Grammar Ambiguity with Labeled Loops! If you have a loop labeled <code className="text-sky-300 font-mono">OUTER: for (...)</code> and also declare a variable named <code className="text-sky-300 font-mono">OUTER</code>, writing <code className="text-rose-300 font-mono">break OUTER;</code> inside a switch is completely ambiguous—is it breaking the labeled loop, or yielding the variable <code className="text-sky-300 font-mono">OUTER</code>? Introducing <code className="text-amber-400 font-bold">yield value;</code> completely resolved this parsing ambiguity!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="The 'yield' Keyword FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 15: The 'yield' Keyword in Switch Expressions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic15_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The yield keyword gives you the freedom to log, validate, and compute before producing a final value from your switch expression. In Topic 16, we explore modern Guard Conditions in Pattern Matching (Java 17-21)! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
