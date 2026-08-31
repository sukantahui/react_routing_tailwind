import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import nestedIfDemoCode from "./topic3_files/NestedIfElseDanglingElseDemo.java?raw";
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
          @keyframes glowNested {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(168, 85, 247, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-nest {
            animation: glowNested 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 3
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Nested <code className="text-purple-400">&apos;if-else&apos;</code> &amp; Resolving the Dangling Else Ambiguity
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master hierarchical decision trees in Java: resolving the famous Dangling Else ambiguity (JLS §14.5), avoiding misleading indentation traps, disambiguating scope with curly braces (<code className="text-emerald-400 font-mono">&#123;&#125;</code>), refactoring pyramids of doom into clean guard clauses, and student scholarship tier audits in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Dangling Else Ambiguity &amp; Grammar Resolution
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When <code className="text-sky-300 font-mono">if</code> statements are nested without curly braces, an ambiguity arises:
          </p>
          <p className="font-mono text-rose-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
            if ( conditionA )
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;if ( conditionB )
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;statement1();
            <br />
            else
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;statement2(); // ⚠️ To which &apos;if&apos; does this &apos;else&apos; belong?
          </p>
          <p>
            <strong>Java&apos;s Grammar Rule (JLS §14.5):</strong> An <code className="text-amber-300 font-mono">else</code> is <strong>ALWAYS paired with the nearest preceding unclosed <code className="text-emerald-300 font-mono">if</code> statement</strong> (in this case, <code className="text-sky-300 font-mono">if (conditionB)</code>!).
            <br />
            Because Java is free-format and ignores indentation, humans frequently misinterpret the code. The only bulletproof solution is to <strong>always use explicit curly braces <code className="text-emerald-400 font-mono">&#123;&#125;</code></strong>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Classroom Case Study (Barrackpore Scholarship Matrix):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> audited multi-tier tuition waivers. By structuring nested checks (academic score &ge; 85% → family income &le; ₹2,00,000 for Tier 1 Full Waiver vs local residence for Tier 2/3 waivers), <strong>Abhronila</strong> and <strong>Debangshu</strong> eliminated dangling else errors and refactored deep pyramids into flat guard clauses in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Dangling Else Parse Tree vs. Guard Clause Flattening
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the compiler binds unbraced else branches and how guard clauses flatten nested pyramids:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Dangling Else Ambiguity and Guard Clauses Diagram"
          >
            <defs>
              <linearGradient id="gradDangleTrap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradBraceFix" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradGuardFlat" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Dangling Else Trap */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradDangleTrap)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Unbraced Dangling Else</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="55" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">if (A) if (B) s1();</text>
            <text x="55" y="122" fill="#fca5a5" fontSize="11" fontFamily="monospace">else s2();</text>
            <text x="55" y="142" fill="#fecdd3" fontSize="10">Else attaches to B, NOT A!</text>
            <text x="160" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Misleading Indentation
            </text>

            {/* Box 2: Explicit Braces Fix */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradBraceFix)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Explicit Braces &#123;&#125;</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">if (A) &#123; if (B) s1(); &#125;</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">else &#123; s2(); &#125;</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Else belongs to A 100%!</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Unambiguous Scope
            </text>

            {/* Box 3: Guard Clauses */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradGuardFlat)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Guard Clause Flattening</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">if (!hasPaid) return;</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="11" fontFamily="monospace">if (!hasId) return;</text>
            <text x="615" y="142" fill="#ede9fe" fontSize="10">Flattens Pyramid of Doom!</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Clean Architecture
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.5: Always use curly braces &#123;&#125; and return early using guard clauses to maintain readability.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Dangling Else Evaluation Behavior Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Condition A</th>
                <th className="p-3 font-semibold text-sky-400">Condition B</th>
                <th className="p-3 font-semibold text-rose-400">Unbraced Execution (Dangling Else)</th>
                <th className="p-3 font-semibold text-emerald-400">Braced Execution (Else on A)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-emerald-400">Executes statement1</td>
                <td className="p-3 font-mono text-emerald-400">Executes statement1</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">Executes statement2 (Else on B!)</td>
                <td className="p-3 font-mono text-slate-400">Does nothing (B is false)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-slate-400">Does nothing (A is false)</td>
                <td className="p-3 font-mono text-emerald-400">Executes statement2 (Else on A!)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-slate-400">Does nothing (A is false)</td>
                <td className="p-3 font-mono text-emerald-400">Executes statement2 (Else on A!)</td>
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
            NestedIfElseDanglingElseDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates the unbraced dangling else parsing trap, curly brace disambiguation, a multi-tier student scholarship matrix, and guard clause refactoring in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={nestedIfDemoCode}
          title="NestedIfElseDanglingElseDemo.java"
          highlightLines={[25, 26, 29, 36, 37, 43, 62, 63, 66, 80, 86, 92]}
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
              <span>❌</span> Pitfall 1: Relying on Indentation to Structure Nested Logic
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Indenting <code className="text-rose-300 font-mono">else</code> under an outer <code className="text-sky-300 font-mono">if</code> statement has zero effect on the compiler. The else always binds to the inner if!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always use explicit curly braces <code className="bg-slate-900 px-1 py-0.5 rounded">&#123;&#125;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Guard Clauses to Flatten Deep Pyramids
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Invert precondition checks and return early (<code className="text-emerald-400 font-mono">if (!valid) return;</code>), keeping your core business logic unnested and clean.
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
            🤔 <em>&ldquo;Why is the &lsquo;Pyramid of Doom&rsquo; considered one of the worst anti-patterns in software engineering?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Cognitive Overload &amp; Cyclomatic Explosion! When code nests 4 or 5 levels deep, each branch multiplies the number of paths an engineer must hold in their head simultaneously. Testing becomes difficult, bugs hide in edge cases, and code reviews slow down. By refactoring to <code className="text-emerald-400 font-bold">Guard Clauses</code>, you flatten the structure into a linear checklist!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Nested 'if-else' & Dangling Else FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 3: Nested 'if-else' & Dangling Else Ambiguity"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic3_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The Dangling Else problem is a classic milestone in your programming journey. Always use curly braces to state your intent clearly, and use guard clauses to keep your methods flat and readable. In Topic 4, we explore the 'else-if' ladder for multi-branch evaluations! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
