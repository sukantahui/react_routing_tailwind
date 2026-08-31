import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import modernSwitchDemoCode from "./topic11_files/ModernArrowSwitchDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowArrow {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-arr {
            animation: glowArrow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Modern Switch Expressions (Java 14+) &amp; Arrow Syntax (<code className="text-emerald-400 font-mono">case X -&gt; Y</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the modern evolution of Java switch (JEP 361, Java 14+): arrow syntax (<code className="text-emerald-400 font-mono">case X -&gt; Y</code>), value-returning switch expressions, zero fall-through by design, elimination of boilerplate <code className="text-rose-400 font-mono">break;</code> statements, independent branch scoping, and course fee mapping in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Java 14+ Switch Revolution (JEP 361)
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Standardized in <strong>Java SE 14</strong>, <strong>Switch Expressions</strong> with <strong>Arrow Syntax (<code className="text-emerald-400 font-mono">case X -&gt; Y</code>)</strong> solved the two largest complaints against traditional switch: verbose boilerplate and accidental fall-through bugs.
          </p>
          <p>
            In modern Java, switch can be used directly as an <strong>expression that yields a value</strong>:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            final int tuitionFee = switch ( track ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case JAVA_CORE &nbsp;&nbsp;&nbsp;&nbsp;-&gt; 15000;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case SPRING_BOOT &nbsp;&nbsp;-&gt; 22000;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case ACCOTAX_GST &nbsp;&nbsp;-&gt; 12000;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;default &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-&gt; 10000;
            <br />
            &#125;; // Note trailing semicolon on assignment statement!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Course Enrollment Refactoring):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> refactored a legacy 40-line course tuition calculator into a clean 6-line Java 14+ switch expression in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). <strong>Abhronila</strong> and <strong>Debangshu</strong> eliminated all mutable intermediate variables and missing-break defects across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Legacy Colon Syntax vs. Modern Java 14+ Arrow Expression
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing traditional colon statements against value-returning arrow expressions:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Legacy Colon vs Modern Arrow Switch Diagram"
          >
            <defs>
              <linearGradient id="gradLegacyColon" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradModernArrow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradBenefits" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Legacy Colon Syntax */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradLegacyColon)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Legacy Colon (Java 1-13)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="55" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">case JAVA: fee=15000; break;</text>
            <text x="55" y="122" fill="#fecdd3" fontSize="10">Requires mutable variables</text>
            <text x="55" y="142" fill="#fecdd3" fontSize="10">Accidental fall-through hazard</text>
            <text x="160" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ⚠️ Boilerplate &amp; Fall-Through
            </text>

            {/* Box 2: Modern Arrow Syntax */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradModernArrow)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Modern Arrow (Java 14+)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">int fee = switch (track) &#123;</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&nbsp;&nbsp;case JAVA -&gt; 15000;</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">&#125;; // Direct return value!</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Concise &amp; Immutable
            </text>

            {/* Box 3: Architectural Benefits */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradBenefits)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Key Advantages</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">&bull; ZERO Fall-Through</text>
            <text x="615" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">&bull; No &apos;break;&apos; boilerplate</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">&bull; Independent block scoping</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Modern Clean Architecture
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JEP 361 (Java 14+): Arrow syntax provides value-returning expressions with zero fall-through.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Feature Comparison: Traditional Switch vs. Java 14+ Switch Expression
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Feature</th>
                <th className="p-3 font-semibold text-rose-400">Traditional Switch (Java 1-13)</th>
                <th className="p-3 font-semibold text-emerald-400">Modern Switch (Java 14+)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Case Syntax</td>
                <td className="p-3 font-mono text-rose-300">case CONSTANT:</td>
                <td className="p-3 font-mono text-emerald-300">case CONSTANT -&gt;</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Value Returning</td>
                <td className="p-3 text-xs text-rose-400">NO (Requires mutating external variables)</td>
                <td className="p-3 text-xs text-emerald-400">YES (Yields value directly to assignment)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Fall-Through</td>
                <td className="p-3 text-xs text-rose-400 font-bold">Enabled by default (Requires explicit &apos;break;&apos;)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">ELIMINATED completely (Zero fall-through)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Exhaustiveness</td>
                <td className="p-3 text-xs">Optional (Unhandled cases silently pass)</td>
                <td className="p-3 text-xs text-emerald-400">Enforced by compiler for expressions</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Variable Scoping</td>
                <td className="p-3 text-xs text-rose-400">Single shared scope across all cases</td>
                <td className="p-3 text-xs text-emerald-400">Independent lexical scope per arrow rule</td>
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
            ModernArrowSwitchDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates modern Java 14+ arrow switch expressions, statement switches without break, and multi-statement block bodies in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={modernSwitchDemoCode}
          title="ModernArrowSwitchDemo.java"
          highlightLines={[25, 26, 27, 28, 29, 30, 48, 49, 50, 59, 64]}
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
              <span>❌</span> Pitfall 1: Mixing Colon (:) and Arrow (-&gt;) Syntax in the Same Switch
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">case 1: ... case 2 -&gt; ...</code> in the same switch causes a compile error (&quot;different case kinds used in the switch&quot;).
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Standardize on modern arrow syntax across your entire codebase.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Assign Switch Expressions Directly to &apos;final&apos; Variables
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Declare <code className="text-emerald-400 font-mono">final int fee = switch (...) &#123; ... &#125;;</code> to enforce immutability and eliminate mutable temporary state.
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
            🤔 <em>&ldquo;Why does Java require a trailing semicolon on a switch expression but forbids it on a switch statement?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Expression Statements vs Control Statements! In Java, all variable assignment statements (<code className="text-sky-300 font-mono">int x = expression;</code>) must end with a semicolon. When switch is used as an expression on the right-hand side of <code className="text-emerald-400 font-mono">=</code>, the entire line is an assignment statement, requiring <code className="text-rose-400 font-bold">;</code> at the end of the closing brace!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Modern Switch Expressions FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 11: Modern Switch Expressions & Arrow Syntax"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic11_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Modern Switch Expressions are a massive leap forward in Java syntax elegance. Say goodbye to verbose break statements and mutable variables! In Topic 12, we explore the formal elimination of fall-through in arrow switch expressions! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
