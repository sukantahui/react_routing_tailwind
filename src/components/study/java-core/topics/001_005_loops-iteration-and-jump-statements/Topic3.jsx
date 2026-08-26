import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import multiVarDemoCode from "./topic3_files/MultiVarForLoopHeaderDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowTwoPointer {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-tp {
            animation: glowTwoPointer 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Multiple Initializations &amp; Updates in a Single <code className="text-emerald-400">&apos;for&apos;</code> Loop Header
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master advanced multi-variable iteration in Java <code className="text-emerald-400 font-mono">for</code> loop headers (JLS §14.14.1): comma-separated initializations, comma operator rules in update clauses, two-pointer convergence algorithms, in-place array reversing, and dual-batch financial reconciliations in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Multi-Variable Control in Java Loop Headers
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java allows multiple variables of the <strong>same data type</strong> to be declared in the initialization clause, and multiple expressions to be sequenced in the update clause using the comma operator:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            for ( int left = 0, right = arr.length - 1 ; left &lt; right ; left++, right-- ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;String temp = arr[left];
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;arr[left] = arr[right];
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;arr[right] = temp;
            <br />
            &#125;
          </p>
          <p>
            <strong>The Condition Constraint:</strong> While initialization and update clauses use commas, the boolean condition clause <em>cannot</em> use commas—it must evaluate to a single boolean expression (e.g. <code className="text-amber-300 font-mono">left &lt; right &amp;&amp; isValid</code>).
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Batch List Reversal &amp; Dual Ledger):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> reversed student roll call rosters in-place using two converging pointers (<code className="text-emerald-400 font-mono">left++, right--</code>). Meanwhile, <strong>Abhronila</strong> and <strong>Debangshu</strong> reconciled morning and evening batch tuition ledgers (<code className="text-emerald-400 font-semibold">₹5,000</code> and <code className="text-emerald-400 font-semibold">₹6,000</code> per batch) in a single synchronized multi-counter loop across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Two-Pointer Convergence Model &amp; Header Clauses
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How multiple initializations and synchronized updates drive two-pointer array algorithms:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Two Pointer Convergence Diagram"
          >
            <defs>
              <linearGradient id="gradInitMulti" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradCondMulti" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradUpdateMulti" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Box 1: Comma Initializations */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradInitMulti)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Comma Initializations</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">int left = 0, right = 4;</text>
            <text x="55" y="122" fill="#e0f2fe" fontSize="10">Both MUST share same type (int)</text>
            <text x="55" y="142" fill="#e0f2fe" fontSize="10">Executed once upon entry</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Dual Pointer Setup
            </text>

            {/* Box 2: Single Boolean Condition */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradCondMulti)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Condition (No Commas!)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="335" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">left &lt; right</text>
            <text x="335" y="122" fill="#fef3c7" fontSize="10">Single boolean expression</text>
            <text x="335" y="142" fill="#fca5a5" fontSize="10">Commas NOT allowed here!</text>
            <text x="440" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Convergence Boundary
            </text>

            {/* Box 3: Comma Updates */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradUpdateMulti)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Comma Updates</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="615" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">left++, right--</text>
            <text x="615" y="122" fill="#d1fae5" fontSize="10">Evaluated left-to-right</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Moves pointers inward!</text>
            <text x="720" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Synchronized Stepping
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.14.1: Two-pointer loops converge in O(N/2) time with O(1) space using comma-separated header clauses.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Comma Usage Matrix in &apos;for&apos; Loop Header Clauses
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Header Clause</th>
                <th className="p-3 font-semibold text-emerald-400">Is Comma Allowed?</th>
                <th className="p-3 font-semibold text-amber-400">Syntax Rule</th>
                <th className="p-3 font-semibold text-slate-400">Example Snippet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-400 font-bold">1. Initialization</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">YES</td>
                <td className="p-3 text-xs">All variables must share the same type specifier</td>
                <td className="p-3 font-mono text-xs text-slate-300">int l = 0, r = 10</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-amber-400 font-bold">2. Boolean Condition</td>
                <td className="p-3 text-xs text-rose-400 font-bold">NO (Illegal)</td>
                <td className="p-3 text-xs">Must be a single boolean expression (use &amp;&amp; or ||)</td>
                <td className="p-3 font-mono text-xs text-slate-300">l &lt; r &amp;&amp; active</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400 font-bold">3. Update Expression</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">YES</td>
                <td className="p-3 text-xs">Evaluates expressions sequentially left-to-right</td>
                <td className="p-3 font-mono text-xs text-slate-300">l++, r--, step += 2</td>
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
            MultiVarForLoopHeaderDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates two-pointer convergence, in-place array reversing, and dual-batch ledger reconciliation in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={multiVarDemoCode}
          title="MultiVarForLoopHeaderDemo.java"
          highlightLines={[23, 31, 42, 43, 44]}
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
              <span>❌</span> Pitfall 1: Mixing Different Types in Header Declaration
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">for (int i = 0, double d = 0.5; ...)</code> causes a compile-time error because Java declarations allow only one type specifier.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Cache Collection Lengths in Initialization
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Use <code className="text-emerald-400 font-mono">for (int i = 0, len = str.length(); i &lt; len; i++)</code> to cache collection bounds once, avoiding redundant method invocations on every iteration.
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
            🤔 <em>&ldquo;Why doesn&apos;t Java allow the comma operator in arbitrary expressions like C++ does?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Code Simplicity &amp; Readability! In C++, expressions like <code className="text-rose-300 font-mono">a = (b = 3, b + 2)</code> are legal, but lead to obfuscated code. Java designers intentionally restricted comma-separated expressions exclusively to <code className="text-emerald-400 font-mono">for</code> loop headers where multi-pointer iteration is a clear, standard use case!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Multiple Initializations & Updates FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 3: Multiple Initializations and Updates in for Loops"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic3_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Multi-variable for loop headers are essential for algorithms like two-pointer reversing, palindrome verification, and condition length caching. Master the comma rules and keep your algorithmic code sleek! In Topic 4, we explore Entry-Controlled 'while' loops! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
