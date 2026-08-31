import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import controlFlowDemoCode from "./topic0_files/ControlFlowConceptDemo.java?raw";
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
          @keyframes glowFlow {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-flow {
            animation: glowFlow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Concept of Control Flow &amp; Conditional Branching in Software
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the foundational architecture of decision making in Java: the Böhm-Jacopini Structured Programming Theorem (Sequence, Selection, Iteration), CPU instruction pointer redirection, bytecode branching opcodes (<code className="text-sky-300 font-mono">ifeq</code>, <code className="text-sky-300 font-mono">tableswitch</code>), ATM transaction routing, and student admission auditing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Essence of Control Flow: Why Software Must Make Decisions
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            By default, a computer program executes sequentially from top to bottom. However, real-world applications require intelligence: reacting dynamically to inputs, handling security barriers, routing transactions, and recovering from errors.
          </p>
          <p>
            The <strong>Böhm-Jacopini Theorem (1966)</strong> established that any computable algorithm can be expressed using only three canonical control structures:
            <br />
            <strong>1. Sequence:</strong> Linear execution of statements (A → B → C).
            <br />
            <strong>2. Selection (Branching):</strong> Diverting execution based on a boolean predicate (<code className="text-sky-300 font-mono">if</code>, <code className="text-sky-300 font-mono">if-else</code>, <code className="text-indigo-300 font-mono">switch</code>).
            <br />
            <strong>3. Iteration (Looping):</strong> Repeating a block until a termination condition is met (<code className="text-emerald-300 font-mono">for</code>, <code className="text-emerald-300 font-mono">while</code>).
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore ATM &amp; Fee Router):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an automated ATM machine transaction engine for student tuition fees in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By leveraging structured selection statements to route withdrawals, balance inquiries, and fee deposits, <strong>Abhronila</strong> and <strong>Debangshu</strong> eliminated invalid transaction states across Naihati and Shyamnagar with 100% predictable execution.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Böhm-Jacopini Canonical Control Structures
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The three universal building blocks of all computer algorithms:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Böhm-Jacopini Control Structures Diagram"
          >
            <defs>
              <linearGradient id="gradSeq" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradSelect" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradIter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Sequence */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradSeq)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Sequence (Linear)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">Statement 1;</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">Statement 2;</text>
            <text x="55" y="142" fill="#bae6fd" fontSize="11" fontFamily="monospace">Statement 3;</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Default Top-to-Bottom
            </text>

            {/* Box 2: Selection */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradSelect)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Selection (Branching)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">if (condition) &#123; ... &#125;</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">else &#123; ... &#125;</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">switch (key) &#123; ... &#125;</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Decision &amp; Multi-Routing
            </text>

            {/* Box 3: Iteration */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradIter)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Iteration (Looping)</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">while (hasMore) &#123; ... &#125;</text>
            <text x="615" y="122" fill="#fde68a" fontSize="11" fontFamily="monospace">for (int i=0; i&lt;N; i++)</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">Repeats until condition ends</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Controlled Repetition
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Böhm-Jacopini Theorem: Sequence + Selection + Iteration can express any computable program.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Overview of Java Decision-Making Statements
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Statement / Structure</th>
                <th className="p-3 font-semibold text-emerald-400">Syntax Style</th>
                <th className="p-3 font-semibold text-amber-400">Decision Paradigm</th>
                <th className="p-3 font-semibold text-slate-400">Primary Industry Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">Simple if</td>
                <td className="p-3 font-mono text-emerald-400">if (condition) &#123; ... &#125;</td>
                <td className="p-3 text-xs">Single-branch conditional execution</td>
                <td className="p-3 text-xs">Guard clauses, optional logging, preconditions</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">if-else</td>
                <td className="p-3 font-mono text-emerald-400">if (c) &#123; &#125; else &#123; &#125;</td>
                <td className="p-3 text-xs">Binary mutually-exclusive path</td>
                <td className="p-3 text-xs">Pass/fail validation, fallback defaults</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">else-if ladder</td>
                <td className="p-3 font-mono text-emerald-400">if .. else if .. else</td>
                <td className="p-3 text-xs">Sequential multi-tier range check</td>
                <td className="p-3 text-xs">Grade slabs, tax brackets, score thresholds</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">Traditional Switch</td>
                <td className="p-3 font-mono text-amber-300">switch (v) &#123; case X: break; &#125;</td>
                <td className="p-3 text-xs">Constant matching with break/fall-through</td>
                <td className="p-3 text-xs">Menu dispatchers, command handlers</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">Modern Switch (14+)</td>
                <td className="p-3 font-mono text-purple-300">switch (v) &#123; case X -&gt; Y; &#125;</td>
                <td className="p-3 text-xs">Value-producing expression without fall-through</td>
                <td className="p-3 text-xs">Modern pattern matching, functional mapping</td>
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
            ControlFlowConceptDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates sequential execution, binary conditional branching (<code className="text-sky-300 font-mono">if-else</code>), and multi-way transaction routing via modern switch in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={controlFlowDemoCode}
          title="ControlFlowConceptDemo.java"
          highlightLines={[21, 22, 31, 33, 38, 47, 48, 54]}
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
              <span>❌</span> Pitfall 1: The "Pyramid of Doom" (Excessive Nesting)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Nesting 5+ levels of <code className="text-rose-300 font-mono">if-else</code> statements makes code unreadable, introduces branch bugs, and skyrockets cyclomatic complexity.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Flatten code by returning early using Guard Clauses.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Always Use Braces &#123;&#125; for Every Control Block
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never omit curly braces even for single-line statements. The infamous Apple SSL &ldquo;goto fail&rdquo; defect was caused by unbraced conditional statements!
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
            🤔 <em>&ldquo;Why did the Böhm-Jacopini theorem change the history of software engineering?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Elimination of Unstructured Goto! In early programming languages (Fortran, Assembly, Basic), developers used arbitrary <code className="text-rose-300 font-mono">goto</code> jumps, creating unmaintainable &ldquo;spaghetti code&rdquo;. Böhm &amp; Jacopini mathematically proved that every program in the universe can be constructed cleanly with just <code className="text-emerald-400 font-bold">Sequence</code>, <code className="text-sky-400 font-bold">Selection</code>, and <code className="text-amber-400 font-bold">Iteration</code>, giving birth to modern structured programming!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Control Flow Concepts FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 0: Control Flow Concepts & Branching"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic0_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Welcome to Module 001_004! Control flow is the brain of your software. In this module, we will explore everything from simple if statements to Java 14+ modern switch expressions and pattern matching. In Topic 1, we begin with the Simple 'if' Statement! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
