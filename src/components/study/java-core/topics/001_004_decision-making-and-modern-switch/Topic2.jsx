import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ifElseDemoCode from "./topic2_files/IfElseStatementDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowIfElse {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-ifelse {
            animation: glowIfElse 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          <code className="text-sky-400">&apos;if-else&apos;</code> Statement for Binary Decision Paths
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master binary decision routing in Java: mutually exclusive execution (JLS §14.9.2), bytecode jump mechanics, compiler Definite Assignment analysis (JLS §16), comparing <code className="text-sky-300 font-mono">if-else</code> statements vs functional ternary expressions (<code className="text-emerald-400 font-mono">? :</code>), and ATM cash withdrawal validation in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Binary Mutually Exclusive Paradigm
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The <strong><code className="text-sky-400 font-mono">if-else</code> statement</strong> routes program execution along one of two mutually exclusive paths:
          </p>
          <p className="font-mono text-sky-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            if ( booleanCondition ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;// Path A: Executed when booleanCondition is TRUE
            <br />
            &#125; else &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;// Path B: Executed when booleanCondition is FALSE
            <br />
            &#125;
          </p>
          <p>
            Exactly <strong>one branch</strong> is guaranteed to run per evaluation. Under JLS §16 (Definite Assignment), if a local variable is initialized in both branches, the compiler guarantees it is initialized and safe to access afterwards.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore ATM Cash Dispenser):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an automated cash dispenser. Using an <code className="text-sky-400 font-mono">if-else</code> construct, their system verified requested withdrawal amounts against student account balances: dispensing rupees when <code className="text-emerald-300 font-mono">currentBalance &gt;= requestAmount</code> or declining the transaction with an exact shortage receipt in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Binary Execution Architecture &amp; Definite Assignment
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the JVM routes binary branches and guarantees variable initialization:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="If-Else Statement Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradPathTrue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradPathFalse" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradDefAssign" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: True Branch */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradPathTrue)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. &apos;then&apos; Path (TRUE)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">if (score &gt;= 40) &#123;</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&nbsp;&nbsp;result = &quot;PASS&quot;;</text>
            <text x="55" y="142" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&#125;</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Executes on Condition Truth
            </text>

            {/* Box 2: False Branch */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradPathFalse)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. &apos;else&apos; Path (FALSE)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">else &#123;</text>
            <text x="335" y="122" fill="#fecdd3" fontSize="11" fontFamily="monospace">&nbsp;&nbsp;result = &quot;FAIL&quot;;</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="11" fontFamily="monospace">&#125;</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Mutually Exclusive Fallback
            </text>

            {/* Box 3: Definite Assignment */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradDefAssign)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Definite Assignment</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">String result;</text>
            <text x="615" y="122" fill="#e0f2fe" fontSize="10">Assigned in both branches</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">→ 100% Safe to read after!</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              JLS §16 Compiler Guarantee
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.9.2: Exactly one branch executes per evaluation; use ternary expressions for simple value assignments.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> &apos;if-else&apos; Statement vs Ternary Operator Comparison
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Feature / Dimension</th>
                <th className="p-3 font-semibold text-emerald-400">&apos;if-else&apos; Statement</th>
                <th className="p-3 font-semibold text-purple-400">Ternary Operator (? :)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Grammar Category</td>
                <td className="p-3 text-xs">Control Statement (performs actions)</td>
                <td className="p-3 text-xs">Expression (produces and returns a value)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Final Variable Init</td>
                <td className="p-3 text-xs">Requires multi-line block initialization</td>
                <td className="p-3 text-xs font-mono text-emerald-400">final int x = (c) ? 1 : 2;</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Multi-statement Body</td>
                <td className="p-3 text-xs font-semibold text-emerald-400">Fully Supported via &#123;&#125; blocks</td>
                <td className="p-3 text-xs text-rose-400">Not supported (expressions only)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Recommended Use Case</td>
                <td className="p-3 text-xs">Complex logic, side effects, I/O actions</td>
                <td className="p-3 text-xs">Concise inline value selection</td>
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
            IfElseStatementDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates mutually exclusive pass/fail determination, ATM cash withdrawal authorization, and a comparison between <code className="text-sky-300 font-mono">if-else</code> and ternary expressions in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={ifElseDemoCode}
          title="IfElseStatementDemo.java"
          highlightLines={[22, 24, 38, 45, 59, 63]}
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
              <span>❌</span> Pitfall 1: Redundant Else After Return
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">if (c) return x; else return y;</code> adds unnecessary nesting.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Flatten code: <code className="bg-slate-900 px-1 py-0.5 rounded">if (c) return x; return y;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Ternary Expressions for Final Variable Assignment
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Use <code className="text-emerald-400 font-mono">final String res = (score &gt;= 40) ? &quot;PASS&quot; : &quot;FAIL&quot;;</code> to initialize immutable variables cleanly in a single line.
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
            🤔 <em>&ldquo;Why does declaring `int a;` and initializing it in both `if` and `else` allow printing `a` without compiler error?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Definite Assignment Analysis (JLS §16)! The Java compiler analyzes all possible execution paths through the method. Since an <code className="text-sky-300 font-mono">if-else</code> statement is mutually exclusive and exhaustive, the variable <code className="text-amber-300 font-mono">a</code> is guaranteed to receive a value regardless of whether the condition evaluates to true or false! Therefore, <code className="text-amber-300 font-mono">a</code> is &ldquo;definitely assigned&rdquo; when leaving the block!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="'if-else' Statement FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 2: 'if-else' Statement for Binary Paths"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic2_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The if-else statement is the bedrock of binary decision routing. Keep your code clean by using curly braces, leveraging definite assignment, and using ternary expressions when appropriate. In Topic 3, we explore Nested 'if-else' Statements and Resolving the Dangling Else Ambiguity! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
