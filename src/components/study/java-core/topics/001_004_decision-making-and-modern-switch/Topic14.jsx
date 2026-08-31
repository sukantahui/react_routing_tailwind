import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import valueSwitchDemoCode from "./topic14_files/SwitchAsValueExpressionDemo.java?raw";
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
          @keyframes glowValExpr {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-val {
            animation: glowValExpr 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Using Switch as an Expression that Returns a Value
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master value-returning switch expressions in Java (JLS §15.28): compile-time exhaustiveness verification, poly-expression type inference, embedding switch inside method arguments and return statements, final field initialization, and student scholarship fee calculations in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Functional Architecture of Switch Expressions
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java 14+, a <strong>Switch Expression</strong> computes and yields a single value that can be assigned directly to variables or returned from functions:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            final double discount = switch ( category ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case MERIT_SCHOLAR &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; 0.50; // 50% Tuition Waiver
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case BPL_EWS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; 0.75; // 75% Welfare Subsidy
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case CORPORATE_SPONSORED -&gt; 0.20; // 20% Partner Discount
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case GENERAL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; 0.00; // Standard Fee
            <br />
            &#125;;
          </p>
          <p>
            <strong>Strict Exhaustiveness:</strong> The Java compiler verifies that <em>every possible value</em> of the selector produces a result. For an enum covering all constants, <code className="text-sky-300 font-mono">default</code> is optional. If an enum constant is added later, the compiler immediately flags an error!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Scholarship Engine):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built a student scholarship calculator in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By assigning discount rates directly to <code className="text-emerald-400 font-mono">final double discountRate</code> via exhaustive switch expressions, <strong>Abhronila</strong> and <strong>Debangshu</strong> eliminated mutable intermediate states and uninitialized variable bugs across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Value-Returning Expression Pipeline &amp; Exhaustiveness
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How switch expressions evaluate directly to values and how exhaustiveness guarantees type safety:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Switch Expression Value Pipeline Diagram"
          >
            <defs>
              <linearGradient id="gradDirectAssign" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradExhaustive" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradEmbed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Direct Assignment */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradDirectAssign)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Direct Assignment</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">final int fee = switch(t) &#123;</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&nbsp;&nbsp;case JAVA -&gt; 15000;</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">&#125;; // Single initialization</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Immutable &amp; Thread-Safe
            </text>

            {/* Box 2: Exhaustiveness Check */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradExhaustive)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Exhaustiveness Check</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="335" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">All enum constants covered</text>
            <text x="335" y="122" fill="#ddd6fe" fontSize="10">No &apos;default&apos; required</text>
            <text x="335" y="142" fill="#ede9fe" fontSize="10">Catches missing cases at build!</text>
            <text x="440" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Compile-Time Soundness
            </text>

            {/* Box 3: Embedding Anywhere */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradEmbed)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Embed Anywhere</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="10" fontFamily="monospace">return switch(x) &#123; ... &#125;;</text>
            <text x="615" y="122" fill="#bae6fd" fontSize="10">printf(switch(cat) &#123; ... &#125;);</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">Constructor final field init</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Poly-Expression Power
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §15.28: Switch expressions yield values to assignments, arguments, and return statements with compile-time exhaustiveness.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Exhaustiveness Rules Matrix for Switch Expressions
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Selector Type</th>
                <th className="p-3 font-semibold text-emerald-400">Exhaustiveness Condition</th>
                <th className="p-3 font-semibold text-amber-400">Is &apos;default&apos; Mandatory?</th>
                <th className="p-3 font-semibold text-slate-400">Compiler Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400 font-bold">Enum</td>
                <td className="p-3 text-xs">All enum constants matched</td>
                <td className="p-3 text-xs text-emerald-400">NO (Optional if all constants covered)</td>
                <td className="p-3 text-xs text-emerald-400">Validates enum constant set</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-400 font-bold">int / byte / short / char</td>
                <td className="p-3 text-xs">Integer range is unbounded</td>
                <td className="p-3 text-xs text-rose-400 font-bold">YES (Mandatory default)</td>
                <td className="p-3 text-xs">Rejects expression without default</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-purple-400 font-bold">String</td>
                <td className="p-3 text-xs">String space is infinite</td>
                <td className="p-3 text-xs text-rose-400 font-bold">YES (Mandatory default)</td>
                <td className="p-3 text-xs">Rejects expression without default</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-amber-400 font-bold">Sealed Hierarchy</td>
                <td className="p-3 text-xs">All permitted subclasses covered</td>
                <td className="p-3 text-xs text-emerald-400">NO (Optional if all subclasses covered)</td>
                <td className="p-3 text-xs">Java 17+ pattern matching</td>
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
            SwitchAsValueExpressionDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates direct immutable assignment, embedding switch expressions inside method arguments, and returning switch expressions directly in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={valueSwitchDemoCode}
          title="SwitchAsValueExpressionDemo.java"
          highlightLines={[25, 26, 27, 28, 29, 30, 52, 53, 54, 55, 62, 63, 64]}
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
              <span>❌</span> Pitfall 1: Missing Trailing Semicolon on Variable Assignment
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">int fee = switch (x) &#123; ... &#125;</code> without the ending semicolon <code className="text-rose-400 font-mono">;</code> causes a compile error because the entire line is a variable declaration statement!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Leverage Exhaustiveness on Enums Without Default
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Omit <code className="text-amber-300 font-mono">default</code> on enum switch expressions when you want the compiler to alert you if a new enum constant is added in the future.
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
            🤔 <em>&ldquo;Why is a switch expression superior to ternary chains for multi-way value mapping?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Clean Formatting &amp; Exhaustiveness! Chained ternary operators (<code className="text-rose-300 font-mono">a ? 1 : b ? 2 : c ? 3 : 4</code>) become messy and hard to read beyond 2 conditions. A switch expression formats cleanly as a tabular decision matrix, compiles to an $O(1)$ jump table, and enforces compile-time exhaustiveness!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Switch as Value Expression FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 14: Switch as a Value-Returning Expression"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic14_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Using switch as a value expression promotes clean immutability and functional design in your Java programs. In Topic 15, we explore the 'yield' keyword for returning values from multi-statement switch blocks! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
