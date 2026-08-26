import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import booleanDemoCode from "./topic13_files/BooleanDataTypeDemo.java?raw";
import noteText from "./topic13_files/topic13_note.txt?raw";
import questions from "./topic13_files/topic13_questions";

export default function Topic13() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseLogic {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-pulse-logic {
            animation: pulseLogic 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_002 · Topic 13
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Boolean Primitive Data Type: <code className="text-emerald-400">true</code> and <code className="text-emerald-400">false</code> Literals
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Understand how Java enforces absolute type safety through the <code className="text-emerald-300 font-mono">boolean</code> primitive: strict separation from numeric integers, eradication of the classic C assignment bug (<code className="text-rose-400 font-mono">if (x = 1)</code>), short-circuit guard evaluation (<code className="text-sky-300 font-mono">&amp;&amp;</code>, <code className="text-sky-300 font-mono">||</code>), and student scholarship eligibility logic.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Purity of Truth Values in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In many historical programming languages (such as C and C++), truth values were intertwined with integer values where <code className="text-amber-300 font-mono">0</code> meant false and any non-zero integer meant true. This conflation led to subtle bugs, such as accidentally writing <code className="text-rose-300 font-mono">if (x = 1)</code> instead of <code className="text-emerald-300 font-mono">if (x == 1)</code>, which silently assigned 1 and always evaluated to true.
          </p>
          <p>
            In Java, <code className="text-emerald-400 font-bold">boolean</code> is a standalone primitive type with exactly two literal values: <code className="text-emerald-300 font-bold">true</code> and <code className="text-rose-300 font-bold">false</code> (all lowercase reserved keywords). Java strictly forbids any casting between boolean and numeric integers.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Scholarship Engine):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> implemented an automated scholarship assessment system. By chaining relational and logical conditions (<code className="text-sky-300 font-mono">boolean isEligible = (marks &gt;= 85) &amp;&amp; attendanceOk;</code>), their code rewarded deserving students with a 25% discount on course fees in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) with zero risk of logic errors.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Boolean Type Safety &amp; Short-Circuit Guard Execution Flow
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the Java compiler protects against assignment bugs and how short-circuit <code className="text-sky-300">&amp;&amp;</code> avoids NullPointerExceptions:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 280"
            className="w-full h-auto"
            aria-label="Boolean Type Safety and Short-Circuit Flow Diagram"
          >
            <defs>
              <linearGradient id="gradSafe" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradTrap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradShortCircuit" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Left Box: Compile-Time Bug Prevention */}
            <rect x="30" y="40" width="380" height="190" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <text x="220" y="70" fill="#f87171" fontSize="14" fontWeight="bold" textAnchor="middle">
              1. Type Safety: Bug Prevention at Compile-Time
            </text>
            <rect x="50" y="85" width="340" height="40" rx="6" fill="#450a0a" stroke="#dc2626" strokeWidth="1" />
            <text x="60" y="110" fill="#fca5a5" fontSize="12" fontFamily="monospace">
              if (x = 1) &#123; &#125; // ✗ COMPILER ERROR!
            </text>
            <text x="60" y="145" fill="#94a3b8" fontSize="11">
              Java detects `x = 1` evaluates to `int 1`, NOT `boolean`.
            </text>
            <rect x="50" y="160" width="340" height="40" rx="6" fill="#064e3b" stroke="#059669" strokeWidth="1" />
            <text x="60" y="185" fill="#a7f3d0" fontSize="12" fontFamily="monospace">
              if (x == 1) &#123; &#125; // ✓ Evaluates to boolean
            </text>

            {/* Right Box: Short-Circuit Guard Flow */}
            <rect x="440" y="40" width="410" height="190" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <text x="645" y="70" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
              2. Short-Circuit Guard: (student != null &amp;&amp; ...)
            </text>
            
            {/* Condition A */}
            <rect x="460" y="90" width="160" height="50" rx="8" fill="url(#gradShortCircuit)" />
            <text x="540" y="115" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">student != null</text>
            <text x="540" y="130" fill="#e0f2fe" fontSize="10" textAnchor="middle">Evaluates to FALSE</text>

            {/* Arrow with STOP */}
            <path d="M 625 115 L 675 115" stroke="#ef4444" strokeWidth="3" />
            <text x="650" y="105" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">STOP</text>

            {/* Skipped Condition */}
            <rect x="680" y="90" width="150" height="50" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="1" strokeDasharray="4 4" />
            <text x="755" y="115" fill="#64748b" fontSize="11" textAnchor="middle">student.length() &gt; 0</text>
            <text x="755" y="130" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">SKIPPED (Null-Safe!)</text>

            <text x="645" y="175" fill="#34d399" fontSize="12" textAnchor="middle" fontWeight="medium">
              ✓ Prevents NullPointerException without extra nested if-blocks!
            </text>
            <text x="645" y="200" fill="#94a3b8" fontSize="11" textAnchor="middle">
              Eager `&amp;` would evaluate both sides and CRASH.
            </text>

            {/* Footnote */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Bytecode Guarantee: Booleans compile to fast, atomic single-byte / 32-bit integer instructions.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Logical Operators Truth Table
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operand A</th>
                <th className="p-3 font-semibold text-sky-400">Operand B</th>
                <th className="p-3 font-semibold text-emerald-400">A &amp;&amp; B (AND)</th>
                <th className="p-3 font-semibold text-emerald-400">A || B (OR)</th>
                <th className="p-3 font-semibold text-purple-400">A ^ B (XOR)</th>
                <th className="p-3 font-semibold text-rose-400">!A (NOT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-semibold text-emerald-400">true</td>
                <td className="p-3 font-mono font-semibold text-emerald-400">true</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">false</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-semibold text-emerald-400">true</td>
                <td className="p-3 font-mono font-semibold text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
                <td className="p-3 font-mono text-rose-400">false</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-semibold text-rose-400">false</td>
                <td className="p-3 font-mono font-semibold text-emerald-400">true</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-semibold text-rose-400">false</td>
                <td className="p-3 font-mono font-semibold text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
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
            BooleanDataTypeDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates boolean declarations, short-circuit guard execution vs eager evaluation, XOR multi-factor security logic, and student scholarship computations.
        </p>

        <JavaFileLoader
          fileModule={booleanDemoCode}
          title="BooleanDataTypeDemo.java"
          highlightLines={[20, 21, 22, 30, 31, 44, 45, 52, 56, 62, 63, 71, 72, 73]}
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
              <span>❌</span> Pitfall 1: Comparing with (flag == true) Redundancy
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">if (isEnrolled == true)</code> is redundant and introduces typo vulnerabilities (<code className="text-amber-300 font-mono">isEnrolled = true</code> in other languages).
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Write directly: <code className="bg-slate-900 px-1 py-0.5 rounded">if (isEnrolled)</code> or <code className="bg-slate-900 px-1 py-0.5 rounded">if (!isEnrolled)</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 2: NullPointerException on Boolean Wrapper Auto-Unboxing
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When using the wrapper object <code className="text-sky-300 font-mono">java.lang.Boolean</code>, uninitialized variables default to <code className="text-rose-400 font-mono">null</code>. Writing <code className="text-rose-300 font-mono">if (boolObj)</code> triggers an automatic call to <code className="text-rose-300 font-mono">boolObj.booleanValue()</code>, crashing with <code className="text-rose-400 font-mono">NullPointerException</code>.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Use primitive <code className="bg-slate-900 px-1 py-0.5 rounded">boolean</code> whenever nullability is not required, or check <code className="bg-slate-900 px-1 py-0.5 rounded">Boolean.TRUE.equals(boolObj)</code>.
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
            🤔 <em>&ldquo;Why does Java provide both short-circuit operators (`&amp;&amp;`, `||`) and eager non-short-circuit operators (`&amp;`, `|`) for boolean operands?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Think about side effects! In rare system validation loops, you may intentionally want both validation methods to execute to log diagnostic errors (e.g. <code className="text-sky-300 font-mono">validateEmail() &amp; validatePhone()</code>), even if the first check failed!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Boolean Data Type FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 13: Boolean Primitive Data Type"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_002_topic13_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Boolean logic is the heartbeat of computer science. Always take advantage of short-circuit `&&` and `||` operators to protect your code against NullPointerExceptions. Keep your conditional statements clean: write `if (isValid)` instead of `if (isValid == true)`! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
