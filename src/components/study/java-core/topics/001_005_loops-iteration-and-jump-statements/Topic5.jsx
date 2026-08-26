import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import doWhileDemoCode from "./topic5_files/DoWhileExitControlledDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowDoWhile {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(245, 158, 11, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-dw {
            animation: glowDoWhile 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 5
          </span>
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Exit-Controlled <code className="text-amber-400">&apos;do-while&apos;</code> Loops: Syntax &amp; Guaranteed Single Execution
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master post-test exit-controlled iteration in Java (JLS §14.13): guaranteed minimum single execution, mandatory trailing semicolon syntax (<code className="text-amber-300 font-mono">while (cond);</code>), interactive menu systems, input validation retry loops, and student portal billing simulations in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Post-Test Exit-Controlled Architecture
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            A <strong><code className="text-amber-400 font-mono">do-while</code> loop</strong> is an <em>exit-controlled</em> (post-test) construct. It executes its body statements <strong>first</strong> before evaluating the termination condition:
          </p>
          <p className="font-mono text-amber-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            do &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;displayPortalMenu();
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;studentChoice = promptUserSelection();
            <br />
            &#125; while ( studentChoice != 3 ) ; // Mandatory trailing semicolon!
          </p>
          <p>
            <strong>Guaranteed Minimum 1 Execution:</strong> Even if the condition evaluates to <code className="text-rose-400 font-mono">false</code> on the very first evaluation, the body is <strong>guaranteed to execute at least once</strong>. This eliminates duplicate priming reads and makes <code className="text-amber-400 font-mono">do-while</code> the premier choice for interactive menus and validation retries.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300 space-y-2">
            <p className="font-medium text-amber-300">Classroom Case Study (Barrackpore Portal &amp; ATM PIN Verification):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an interactive student portal menu in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). Meanwhile, <strong>Abhronila</strong> and <strong>Debangshu</strong> implemented a 3-attempt PIN retry authenticator using <code className="text-amber-300 font-mono">do-while</code>, guaranteeing the student is prompted for their credentials at least once before validating permissions across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Post-Test Execution Cycle &amp; Trailing Semicolon Rule
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How do-while executes the body first, evaluates the condition afterwards, and loops back:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Do While Execution Flow Diagram"
          >
            <defs>
              <linearGradient id="gradDoBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradPostTest" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradUseMenu" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Body Executes FIRST */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradDoBody)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Body Executes FIRST</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="55" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">do &#123;</text>
            <text x="55" y="122" fill="#fef3c7" fontSize="10">&nbsp;&nbsp;renderMenu(); promptInput();</text>
            <text x="55" y="142" fill="#fef3c7" fontSize="10">&#125; // 1 guaranteed execution!</text>
            <text x="160" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Guaranteed Initial Pass
            </text>

            {/* Box 2: Post-Test Condition */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradPostTest)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Post-Test Condition</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">while (choice != 3);</text>
            <text x="335" y="122" fill="#d1fae5" fontSize="10">Evaluated AFTER body</text>
            <text x="335" y="142" fill="#fca5a5" fontSize="10">Mandatory trailing semicolon &apos;;&apos;</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Exit Evaluator
            </text>

            {/* Box 3: Common Applications */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradUseMenu)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Common Patterns</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="10" fontFamily="monospace">&bull; Interactive Console Menus</text>
            <text x="615" y="122" fill="#bae6fd" fontSize="10" fontFamily="monospace">&bull; PIN / Password Retry Loops</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">&bull; Hardware Handshake Polls</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              User Interaction Workflows
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.13: do-while evaluates condition after body execution, guaranteeing at least one full cycle.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Pre-Test (`while`) vs. Post-Test (`do-while`) Comparison
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Dimension</th>
                <th className="p-3 font-semibold text-emerald-400">`while` Loop (Pre-Test)</th>
                <th className="p-3 font-semibold text-amber-400">`do-while` Loop (Post-Test)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Condition Evaluation</td>
                <td className="p-3 text-xs text-emerald-400">BEFORE body executes</td>
                <td className="p-3 text-xs text-amber-400">AFTER body executes</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Minimum Executions</td>
                <td className="p-3 text-xs text-rose-400 font-mono">0 times</td>
                <td className="p-3 text-xs text-emerald-400 font-mono font-bold">1 time (Guaranteed)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Trailing Semicolon</td>
                <td className="p-3 text-xs text-rose-400">Illegal / Bug if placed after while (c);</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">MANDATORY after while (c);</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Priming Read Needed?</td>
                <td className="p-3 text-xs text-rose-400">YES (Duplicate read before loop)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">NO (Reads directly in body)</td>
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
            DoWhileExitControlledDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates guaranteed single execution proof, interactive student portal menu simulation, and PIN validation retries in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={doWhileDemoCode}
          title="DoWhileExitControlledDemo.java"
          highlightLines={[22, 23, 24, 25, 33, 44, 52, 59]}
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
              <span>❌</span> Pitfall 1: Declaring Condition Variable Inside the `do` Body
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">do &#123; int choice = get(); &#125; while (choice != 0);</code> causes a compile-time error (&quot;cannot find symbol choice&quot;) because <code className="text-rose-300 font-mono">choice</code> is scoped strictly inside the curly braces!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use `do-while` to Eliminate Duplicate Priming Reads
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Whenever user input or network data must be acquired at least once, use <code className="text-amber-300 font-mono">do-while</code> to avoid copy-pasting the read call before the loop.
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
            🤔 <em>&ldquo;Why does `do-while` emit slightly more compact bytecode than `while`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Direct Top-Down Execution! A <code className="text-emerald-300 font-mono">while</code> loop requires an initial <code className="text-purple-300 font-mono">goto</code> instruction to jump over the body to the condition check at the bottom. In contrast, <code className="text-amber-400 font-mono">do-while</code> enters the body directly from the top without an initial jump instruction, saving 3 bytes of bytecode per loop!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Exit-Controlled 'do-while' Loop FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 5: Exit-Controlled 'do-while' Loops"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic5_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Remember the golden rule of do-while: it guarantees at least one execution and requires a trailing semicolon (;). It is your best tool for interactive menus and validation retries. In Topic 6, we compare for vs while vs do-while and master when to choose which! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
