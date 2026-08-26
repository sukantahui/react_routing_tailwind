import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import loopConceptDemoCode from "./topic0_files/LoopConceptDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowLoop {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-lp {
            animation: glowLoop 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Concept of Iteration &amp; Why Loops are Fundamental to Programming
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the foundational theory of repetitive execution: the Böhm-Jacopini Structure Theorem (Sequence, Selection, Iteration), the DRY principle vs manual code duplication (WET), the 4 essential loop phases (Init, Condition, Body, Update), and automated batch tuition voucher processing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Power of Repetition in Computation
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In computer science, <strong>Iteration</strong> is the repeated execution of a block of code instructions until a specific boolean condition becomes false.
          </p>
          <p>
            According to the <strong>Böhm-Jacopini Structure Theorem (1966)</strong>, any computable algorithm in existence can be expressed using only three fundamental control mechanisms:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 ml-2">
            <li><strong>Sequence:</strong> Top-to-bottom consecutive statement execution.</li>
            <li><strong>Selection:</strong> Decision making via <code className="text-sky-300 font-mono">if-else</code> and <code className="text-sky-300 font-mono">switch</code>.</li>
            <li><strong>Iteration:</strong> Repetitive execution via loops (<code className="text-emerald-400 font-mono">for</code>, <code className="text-emerald-400 font-mono">while</code>, <code className="text-emerald-400 font-mono">do-while</code>).</li>
          </ul>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Batch Voucher Processing):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> were tasked with generating 5,000 tuition installment receipts in Indian Rupees (<code className="text-emerald-400 font-semibold">₹5,000</code> each). Copy-pasting 5,000 print statements (WET anti-pattern) would bloat the codebase with 10,000 lines of unmaintainable code! By writing a clean 4-line <code className="text-emerald-400 font-mono">for</code> loop (DRY principle), <strong>Abhronila</strong> and <strong>Debangshu</strong> executed all 5,000 receipts in less than 2 milliseconds across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 4 Fundamental Phases of Every Loop Lifecycle
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Every loop in Java—whether for, while, or do-while—progresses through four interconnected operational phases:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="The 4 Loop Phases Lifecycle Diagram"
          >
            <defs>
              <linearGradient id="gradInit" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradCond" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradUpdate" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: 1. Initialization */}
            <rect x="25" y="40" width="180" height="180" rx="10" fill="url(#gradInit)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="115" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">1. Initialization</text>
            <rect x="35" y="80" width="160" height="80" rx="6" fill="#0c4a6e" />
            <text x="45" y="105" fill="#bae6fd" fontSize="10" fontFamily="monospace">int i = 1;</text>
            <text x="45" y="125" fill="#e0f2fe" fontSize="9">Sets starting counter</text>
            <text x="45" y="145" fill="#e0f2fe" fontSize="9">Executes ONCE only</text>
            <text x="115" y="190" fill="#f0f9ff" fontSize="10" textAnchor="middle" fontWeight="bold">
              Starting State
            </text>

            {/* Arrow 1 -> 2 */}
            <path d="M 205 130 L 235 130" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

            {/* Box 2: 2. Condition */}
            <rect x="245" y="40" width="180" height="180" rx="10" fill="url(#gradCond)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="335" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">2. Condition Check</text>
            <rect x="255" y="80" width="160" height="80" rx="6" fill="#451a03" />
            <text x="265" y="105" fill="#fde68a" fontSize="10" fontFamily="monospace">i &lt;= 5</text>
            <text x="265" y="125" fill="#fef3c7" fontSize="9">Evaluates boolean</text>
            <text x="265" y="145" fill="#fef3c7" fontSize="9">True &rarr; Body | False &rarr; Exit</text>
            <text x="335" y="190" fill="#fef3c7" fontSize="10" textAnchor="middle" fontWeight="bold">
              Gatekeeper
            </text>

            {/* Arrow 2 -> 3 */}
            <path d="M 425 130 L 455 130" stroke="#f59e0b" strokeWidth="3" />

            {/* Box 3: 3. Body */}
            <rect x="465" y="40" width="180" height="180" rx="10" fill="url(#gradBody)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="555" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">3. Loop Body</text>
            <rect x="475" y="80" width="160" height="80" rx="6" fill="#022c22" />
            <text x="485" y="105" fill="#a7f3d0" fontSize="10" fontFamily="monospace">printReceipt(i);</text>
            <text x="485" y="125" fill="#d1fae5" fontSize="9">Payload statements</text>
            <text x="485" y="145" fill="#d1fae5" fontSize="9">Business calculations</text>
            <text x="555" y="190" fill="#ecfdf5" fontSize="10" textAnchor="middle" fontWeight="bold">
              Payload Work
            </text>

            {/* Arrow 3 -> 4 */}
            <path d="M 645 130 L 675 130" stroke="#10b981" strokeWidth="3" />

            {/* Box 4: 4. Update */}
            <rect x="685" y="40" width="170" height="180" rx="10" fill="url(#gradUpdate)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="770" y="65" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">4. Update Step</text>
            <rect x="695" y="80" width="150" height="80" rx="6" fill="#2e1065" />
            <text x="705" y="105" fill="#ddd6fe" fontSize="10" fontFamily="monospace">i++ (i = i + 1)</text>
            <text x="705" y="125" fill="#ede9fe" fontSize="9">Steps counter forward</text>
            <text x="705" y="145" fill="#ede9fe" fontSize="9">Loops back to Condition!</text>
            <text x="770" y="190" fill="#f5f3ff" fontSize="10" textAnchor="middle" fontWeight="bold">
              Progress Step
            </text>

            {/* Loopback Arrow (4 back to 2) */}
            <path d="M 770 220 L 770 245 L 335 245 L 335 220" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5" fill="none" />
            <text x="555" y="260" fill="#c4b5fd" fontSize="11" textAnchor="middle">
              ↺ Loops back to Condition Check until false!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Comparison: The 3 Core Java Loop Constructs
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Loop Construct</th>
                <th className="p-3 font-semibold text-amber-400">Control Type</th>
                <th className="p-3 font-semibold text-emerald-400">Minimum Executions</th>
                <th className="p-3 font-semibold text-purple-400">Ideal Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-400 font-bold">for loop</td>
                <td className="p-3 text-xs text-sky-300">Entry-controlled (Pre-test)</td>
                <td className="p-3 text-xs text-amber-400 font-mono">0 times</td>
                <td className="p-3 text-xs">Definite iteration with known bounds/ranges</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400 font-bold">while loop</td>
                <td className="p-3 text-xs text-emerald-300">Entry-controlled (Pre-test)</td>
                <td className="p-3 text-xs text-amber-400 font-mono">0 times</td>
                <td className="p-3 text-xs">Indefinite iteration driven by state/events</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-purple-400 font-bold">do-while loop</td>
                <td className="p-3 text-xs text-purple-300">Exit-controlled (Post-test)</td>
                <td className="p-3 text-xs text-emerald-400 font-mono font-bold">1 time (Guaranteed)</td>
                <td className="p-3 text-xs">Interactive menus, retry attempts</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-amber-400 font-bold">enhanced for-each</td>
                <td className="p-3 text-xs text-amber-300">Iterator / Index-free</td>
                <td className="p-3 text-xs text-amber-400 font-mono">0 times</td>
                <td className="p-3 text-xs">Traversing arrays, Lists, Sets without index</td>
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
            LoopConceptDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program compares manual duplication against automated loop iteration and performs a high-speed batch transaction audit in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={loopConceptDemoCode}
          title="LoopConceptDemo.java"
          highlightLines={[32, 33, 34, 35, 36, 45, 46, 47, 48]}
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
              <span>❌</span> Pitfall 1: Off-By-One Errors (OBOE) in Loop Termination
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Using <code className="text-rose-300 font-mono">i &lt;= array.length</code> instead of <code className="text-emerald-300 font-mono">i &lt; array.length</code> on 0-indexed structures causes runtime <code className="text-rose-400 font-mono">ArrayIndexOutOfBoundsException</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Keep Counter Mutation Isolated to the Header
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never modify loop counter variables (<code className="text-sky-300 font-mono">i += 2</code>) randomly inside the loop body unless intentionally implementing dynamic stepping.
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
            🤔 <em>&ldquo;Can every loop be converted between `for`, `while`, and `do-while`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Turing Completeness! Any algorithm written with a <code className="text-sky-300 font-mono">for</code> loop can be rewritten as a <code className="text-emerald-300 font-mono">while</code> loop (and vice-versa). The choice of loop is about <strong>developer readability and intention</strong>, not computational power!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Concept of Iteration FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 0: Concept of Iteration and Loops"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic0_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Welcome to Module 001_005! Iteration is what transforms code into an automated powerhouse. Understand the 4 phases—Init, Condition, Body, and Update—and you will master every loop construct in Java. In Topic 1, we dissect the Standard 'for' loop lifecycle! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
