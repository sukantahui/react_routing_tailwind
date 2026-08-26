import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import forLoopDemoCode from "./topic1_files/StandardForLoopDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowFor {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(14, 165, 233, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(14, 165, 233, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-fr {
            animation: glowFor 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Standard <code className="text-sky-400">&apos;for&apos;</code> Loop: Initialization, Condition, Update &amp; Execution Lifecycle
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the exact 5-step execution lifecycle of the traditional Java <code className="text-emerald-400 font-mono">for</code> loop (JLS §14.14.1): ascending increments, descending countdowns, step multiples, accumulator patterns, and quarterly tuition milestone auditing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Anatomy of the Standard &apos;for&apos; Loop
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The standard <code className="text-emerald-400 font-mono">for</code> loop consolidates iteration control into a single, compact header with three semicolon-delimited clauses:
          </p>
          <p className="font-mono text-sky-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            for ( int month = 1 ; month &lt;= 4 ; month++ ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;System.out.printf(&quot;Month %d: Fee ₹%,.2f%n&quot;, month, 4500.0);
            <br />
            &#125;
          </p>
          <p>
            <strong>The 5-Step Execution Sequence:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-1 text-slate-300 ml-2">
            <li><strong>Initialization:</strong> <code className="text-sky-300 font-mono">int month = 1</code> executes <em>exactly once</em> upon entry.</li>
            <li><strong>Condition Check:</strong> <code className="text-amber-300 font-mono">month &lt;= 4</code> is evaluated. If <code className="text-emerald-400 font-mono">true</code>, proceed to Step 3; if <code className="text-rose-400 font-mono">false</code>, terminate.</li>
            <li><strong>Body Execution:</strong> Statements inside <code className="text-emerald-300 font-mono">&#123; ... &#125;</code> execute.</li>
            <li><strong>Update Expression:</strong> <code className="text-purple-300 font-mono">month++</code> executes at the <em>end</em> of the body.</li>
            <li><strong>Loopback:</strong> Control returns directly to Step 2 to re-evaluate the condition.</li>
          </ol>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Quarterly Tuition Milestones):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an academic milestone auditor in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By running a 4-cycle <code className="text-emerald-400 font-mono">for</code> loop with an accumulator variable, <strong>Abhronila</strong> and <strong>Debangshu</strong> tracked cumulative tuition payments (₹4,500 per month $\to$ ₹18,000 total) with 100% precision across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 5-Step Execution Cycle &amp; State Flow
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The precise order in which the JVM evaluates initialization, condition, body statements, and updates:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="For Loop Execution Cycle Diagram"
          >
            <defs>
              <linearGradient id="gradStep1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradStep2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradStep3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradStep4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: (1) Init */}
            <rect x="25" y="40" width="180" height="180" rx="10" fill="url(#gradStep1)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="115" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">(1) Init (Once Only)</text>
            <rect x="35" y="80" width="160" height="80" rx="6" fill="#0c4a6e" />
            <text x="45" y="105" fill="#bae6fd" fontSize="11" fontFamily="monospace">int i = 1;</text>
            <text x="45" y="125" fill="#e0f2fe" fontSize="9">Allocates counter &apos;i&apos;</text>
            <text x="45" y="145" fill="#e0f2fe" fontSize="9">Sets starting value 1</text>
            <text x="115" y="190" fill="#f0f9ff" fontSize="10" textAnchor="middle" fontWeight="bold">
              Entry Step
            </text>

            {/* Box 2: (2) Condition */}
            <rect x="245" y="40" width="180" height="180" rx="10" fill="url(#gradStep2)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="335" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">(2) Condition (Pre-test)</text>
            <rect x="255" y="80" width="160" height="80" rx="6" fill="#451a03" />
            <text x="265" y="105" fill="#fde68a" fontSize="11" fontFamily="monospace">i &lt;= 4</text>
            <text x="265" y="125" fill="#fef3c7" fontSize="9">true &rarr; proceed to (3)</text>
            <text x="265" y="145" fill="#fca5a5" fontSize="9">false &rarr; EXIT loop immediately</text>
            <text x="335" y="190" fill="#fef3c7" fontSize="10" textAnchor="middle" fontWeight="bold">
              Boundary Check
            </text>

            {/* Box 3: (3) Body */}
            <rect x="465" y="40" width="180" height="180" rx="10" fill="url(#gradStep3)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="555" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">(3) Body Execution</text>
            <rect x="475" y="80" width="160" height="80" rx="6" fill="#022c22" />
            <text x="485" y="105" fill="#a7f3d0" fontSize="10" fontFamily="monospace">sum += fee;</text>
            <text x="485" y="125" fill="#d1fae5" fontSize="9">printMilestone(i);</text>
            <text x="485" y="145" fill="#d1fae5" fontSize="9">Payload computation</text>
            <text x="555" y="190" fill="#ecfdf5" fontSize="10" textAnchor="middle" fontWeight="bold">
              Work Payload
            </text>

            {/* Box 4: (4) Update */}
            <rect x="685" y="40" width="170" height="180" rx="10" fill="url(#gradStep4)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="770" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">(4) Update (Post-body)</text>
            <rect x="695" y="80" width="150" height="80" rx="6" fill="#2e1065" />
            <text x="705" y="105" fill="#ddd6fe" fontSize="11" fontFamily="monospace">i++</text>
            <text x="705" y="125" fill="#ede9fe" fontSize="9">i becomes i + 1</text>
            <text x="705" y="145" fill="#ede9fe" fontSize="9">Next: jump back to (2)</text>
            <text x="770" y="190" fill="#f5f3ff" fontSize="10" textAnchor="middle" fontWeight="bold">
              Counter Step
            </text>

            {/* Loopback Arrow (4 back to 2) */}
            <path d="M 770 220 L 770 245 L 335 245 L 335 220" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" fill="none" />
            <text x="555" y="260" fill="#c4b5fd" fontSize="11" textAnchor="middle">
              ↺ (5) Control jumps back to Condition (2) until condition is false!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Iteration Trace Table: Quarterly Tuition Milestone Accumulator
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Iteration #</th>
                <th className="p-3 font-semibold text-amber-400">Counter `installment`</th>
                <th className="p-3 font-semibold text-emerald-400">Condition (`inst &lt;= 4`)</th>
                <th className="p-3 font-semibold text-purple-400">Monthly Fee Added</th>
                <th className="p-3 font-semibold text-cyan-400">Cumulative `runningTotal`</th>
                <th className="p-3 font-semibold text-rose-400">Next Counter (`inst++`)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">1</td>
                <td className="p-3 font-mono text-amber-400">1</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">1 &lt;= 4 &rarr; true</td>
                <td className="p-3 text-xs font-mono">₹4,500.00</td>
                <td className="p-3 text-xs text-cyan-300 font-bold font-mono">₹4,500.00</td>
                <td className="p-3 font-mono text-rose-300">2</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">2</td>
                <td className="p-3 font-mono text-amber-400">2</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">2 &lt;= 4 &rarr; true</td>
                <td className="p-3 text-xs font-mono">₹4,500.00</td>
                <td className="p-3 text-xs text-cyan-300 font-bold font-mono">₹9,000.00</td>
                <td className="p-3 font-mono text-rose-300">3</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">3</td>
                <td className="p-3 font-mono text-amber-400">3</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">3 &lt;= 4 &rarr; true</td>
                <td className="p-3 text-xs font-mono">₹4,500.00</td>
                <td className="p-3 text-xs text-cyan-300 font-bold font-mono">₹13,500.00</td>
                <td className="p-3 font-mono text-rose-300">4</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">4</td>
                <td className="p-3 font-mono text-amber-400">4</td>
                <td className="p-3 text-xs text-emerald-400 font-mono">4 &lt;= 4 &rarr; true</td>
                <td className="p-3 text-xs font-mono">₹4,500.00</td>
                <td className="p-3 text-xs text-cyan-300 font-bold font-mono">₹18,000.00</td>
                <td className="p-3 font-mono text-rose-300">5</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors bg-rose-950/20">
                <td className="p-3 font-mono text-rose-400">Exit</td>
                <td className="p-3 font-mono text-rose-400">5</td>
                <td className="p-3 text-xs text-rose-400 font-mono font-bold">5 &lt;= 4 &rarr; FALSE</td>
                <td className="p-3 text-xs text-slate-500">—</td>
                <td className="p-3 text-xs text-cyan-300 font-bold font-mono">₹18,000.00 (Final)</td>
                <td className="p-3 text-xs text-rose-400">Loop Terminates</td>
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
            StandardForLoopDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates ascending <code className="text-emerald-400 font-mono">for</code> loops, descending countdowns, custom steps, and quarterly fee accumulations in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={forLoopDemoCode}
          title="StandardForLoopDemo.java"
          highlightLines={[22, 28, 35, 43, 44]}
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
              <span>❌</span> Pitfall 1: Placing a Semicolon Directly After the Loop Header
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">for (int i = 0; i &lt; 5; i++);</code> makes the loop execute an empty statement 5 times, and the block that follows executes only <strong>once</strong> afterwards!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Always Use Integer Counters for Loops
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Avoid using <code className="text-rose-300 font-mono">float</code> or <code className="text-rose-300 font-mono">double</code> as loop counters due to IEEE 754 precision rounding errors (<code className="text-slate-300 font-mono">0.1 + 0.2 != 0.3</code>).
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
            🤔 <em>&ldquo;Is there any performance difference between `i++` and `++i` in a for loop update header?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Bytecode Equivalence! In Java bytecode, both <code className="text-sky-300 font-mono">i++</code> and <code className="text-sky-300 font-mono">++i</code> compile to the exact same instruction: <code className="text-emerald-300 font-mono">iinc 1, 1</code> (increment local variable 1 by constant 1). There is zero performance or behavioral difference when used as a standalone statement in the update clause!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Standard 'for' Loop FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 1: Standard 'for' Loop Execution Lifecycle"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic1_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The standard for loop is your workhorse for definite iteration. Keep its 5-step lifecycle crystal clear: Init (once) -> Condition -> Body -> Update -> Condition. In Topic 2, we explore Variable Scope within for loop headers! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
