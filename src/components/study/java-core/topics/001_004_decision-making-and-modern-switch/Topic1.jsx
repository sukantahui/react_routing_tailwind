import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import ifDemoCode from "./topic1_files/SimpleIfStatementDemo.java?raw";
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
          @keyframes glowIf {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-if {
            animation: glowIf 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Simple <code className="text-emerald-400">&apos;if&apos;</code> Statement: Syntax, Boolean Conditions &amp; Execution Flow
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the fundamental decision unit in Java: syntax grammar (JLS §14.9.1), strict boolean condition evaluation, block vs single-statement execution, avoiding the infamous empty semicolon trap (<code className="text-rose-400 font-mono">if (cond); &#123; ... &#125;</code>), and early-bird tuition discount audits in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> How the Simple &apos;if&apos; Statement Works
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The <strong>Simple <code className="text-emerald-400 font-mono">if</code> statement</strong> enables conditional execution of a block of code based on whether a boolean expression evaluates to <code className="text-emerald-400 font-mono">true</code>:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            if ( booleanCondition ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;// Executed ONLY when booleanCondition is true
            <br />
            &#125;
          </p>
          <p>
            If the condition is <code className="text-rose-400 font-mono">false</code>, the JVM skips the enclosed block and resumes execution with the next sequential statement.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Admission Discount Surcharge):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> configured an admission portal. Using simple independent <code className="text-emerald-400 font-mono">if</code> blocks, they applied a 10% Early-Bird discount when <code className="text-emerald-300 font-mono">isEarlyBird</code> was true and an additional ₹1,000 waiver when <code className="text-sky-300 font-mono">meritScore &gt;= 85</code>, computing accurate course fees in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Execution Flow &amp; The Semicolon Trap
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How conditional branches alter instruction paths and how an extra semicolon causes unconditional execution:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Simple If Execution and Semicolon Trap Diagram"
          >
            <defs>
              <linearGradient id="gradIfTrue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradSemiTrap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradBytecodeJump" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Normal If Flow */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradIfTrue)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Normal &apos;if&apos; Flow</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">if (score &gt;= 40) &#123;</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&nbsp;&nbsp;pass();</text>
            <text x="55" y="142" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&#125;</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Executes only if TRUE
            </text>

            {/* Box 2: Semicolon Trap */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradSemiTrap)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. The Semicolon Bug</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">if (balance &gt;= fee); // ⚠️</text>
            <text x="335" y="122" fill="#fecdd3" fontSize="11" fontFamily="monospace">&#123; grantAccess(); &#125;</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="10">Runs UNCONDITIONALLY!</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Empty Statement Bug
            </text>

            {/* Box 3: Bytecode Inverted Jump */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradBytecodeJump)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Bytecode Inversion</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">if_icmplt LABEL_EXIT</text>
            <text x="615" y="122" fill="#e0f2fe" fontSize="10">Compiler inverts condition</text>
            <text x="615" y="142" fill="#e0f2fe" fontSize="10">to skip body if FALSE</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              PC Forward Jump
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.9.1: Condition must evaluate to boolean; always wrap statement bodies in curly braces &#123;&#125;.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Idiomatic vs Non-Idiomatic Boolean Patterns
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-rose-400">Non-Idiomatic (Code Smell)</th>
                <th className="p-3 font-semibold text-emerald-400">Clean Idiomatic Java</th>
                <th className="p-3 font-semibold text-amber-400">Rationale &amp; Benefit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">if (isEnrolled == true)</td>
                <td className="p-3 font-mono text-emerald-400">if (isEnrolled)</td>
                <td className="p-3 text-xs">Eliminates redundant noise; directly evaluates boolean variable</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">if (isEnrolled == false)</td>
                <td className="p-3 font-mono text-emerald-400">if (!isEnrolled)</td>
                <td className="p-3 text-xs">Uses logical NOT operator <code className="text-sky-300 font-mono">!</code></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">if (flag = true)</td>
                <td className="p-3 font-mono text-emerald-400">if (flag == true) &rarr; if (flag)</td>
                <td className="p-3 text-xs">Prevents accidental assignment operator bug</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">if (str.length() != 0)</td>
                <td className="p-3 font-mono text-emerald-400">if (!str.isEmpty())</td>
                <td className="p-3 text-xs">More expressive standard library method</td>
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
            SimpleIfStatementDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates basic simple <code className="text-emerald-400 font-mono">if</code> flow, early-bird tuition discount deductions, the dangerous semicolon bug (<code className="text-rose-400 font-mono">if (cond);</code>), and idiomatic boolean expressions in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={ifDemoCode}
          title="SimpleIfStatementDemo.java"
          highlightLines={[22, 23, 39, 48, 53, 67, 74]}
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
              <span>❌</span> Pitfall 1: Placing a Semicolon After the If Condition
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">if (balance &gt;= fee); &#123; grantAccess(); &#125;</code> causes <code className="text-emerald-400 font-mono">grantAccess()</code> to execute unconditionally because the semicolon terminates the if statement as an empty statement!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Never place a semicolon after the parentheses of an if statement.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Always Use Braces &#123;&#125; Even for Single Statements
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Enclosing all statements in <code className="text-emerald-400 font-mono">&#123;&#125;</code> protects future code modifications from accidentally appending statements outside the if block.
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
            🤔 <em>&ldquo;Why does `if (x = 5)` cause a compiler error in Java while `if (flag = true)` compiles cleanly?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Strict Type System! In Java, the expression inside <code className="text-sky-300 font-mono">if (...)</code> MUST evaluate to type <code className="text-emerald-400 font-mono">boolean</code>. The assignment <code className="text-rose-300 font-mono">x = 5</code> produces an <code className="text-amber-300 font-mono">int (5)</code>, which cannot be converted to boolean (compiler error!). However, <code className="text-rose-300 font-mono">flag = true</code> assigns and returns <code className="text-emerald-400 font-mono">true (boolean)</code>, so it compiles cleanly but creates an accidental assignment bug! Always write <code className="text-emerald-400 font-bold">if (flag)</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Simple 'if' Statement FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 1: Simple 'if' Statement"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic1_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The simple if statement is the first conditional tool in your developer toolbox. Always remember to enclose bodies in curly braces, avoid the semicolon bug, and write clean idiomatic checks. In Topic 2, we explore binary decision paths with the 'if-else' statement! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
