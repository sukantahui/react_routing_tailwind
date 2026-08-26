import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import whileDemoCode from "./topic4_files/WhileLoopEntryControlledDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowWhile {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-wh {
            animation: glowWhile 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Entry-Controlled <code className="text-emerald-400">&apos;while&apos;</code> Loops: Syntax, Condition Validation &amp; Use Cases
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master entry-controlled iteration in Java (JLS §14.12): pre-test condition validation, guaranteed 0-iteration behavior when initially false, state-driven flag monitoring, number digit extraction algorithms, and prepaid lab wallet balance deductions in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Entry-Controlled &apos;while&apos; Architecture
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            A <strong><code className="text-emerald-400 font-mono">while</code> loop</strong> is an <em>entry-controlled</em> (pre-test) loop. It evaluates its boolean condition <strong>before</strong> executing the loop body:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            while ( studentWalletBalance &gt;= hourlyLabCharge ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;hoursConsumed++;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;studentWalletBalance -= hourlyLabCharge; // Mutating tested state!
            <br />
            &#125;
          </p>
          <p>
            <strong>Pre-Test 0-Execution Guarantee:</strong> If <code className="text-sky-300 font-mono">studentWalletBalance</code> is less than <code className="text-sky-300 font-mono">hourlyLabCharge</code> initially, the loop body executes <strong>0 times</strong>—preventing unauthorized resource consumption!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Lab Wallet &amp; Registration Digit Sum):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an automated lab wallet deduction engine in Indian Rupees (<code className="text-emerald-400 font-semibold">₹400</code>/hr). Meanwhile, <strong>Abhronila</strong> and <strong>Debangshu</strong> extracted registration number digits (<code className="text-emerald-400 font-mono">while (n &gt; 0) &#123; sum += n % 10; n /= 10; &#125;</code>) to verify student exam identity checksums across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Entry-Controlled Pre-Test Gatekeeper &amp; State Mutation
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the pre-test condition checks state, gates entry, and loops back:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="While Loop Pre-Test Gatekeeper Diagram"
          >
            <defs>
              <linearGradient id="gradPreTest" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradWhileBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradDigitExtract" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Pre-test Gatekeeper */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradPreTest)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Pre-Test Gatekeeper</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="55" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">while (balance &gt;= fee)</text>
            <text x="55" y="122" fill="#fef3c7" fontSize="10">true &rarr; enter body</text>
            <text x="55" y="142" fill="#fca5a5" fontSize="10">false &rarr; 0 executions (EXIT)!</text>
            <text x="160" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Entry Gatekeeper
            </text>

            {/* Box 2: Body & State Mutation */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradWhileBody)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Body &amp; State Mutation</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">balance -= fee;</text>
            <text x="335" y="122" fill="#d1fae5" fontSize="10">Must mutate tested state</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Prevents infinite loop!</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              State Mutation Step
            </text>

            {/* Box 3: Classic Digit Extraction */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradDigitExtract)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Digit Extraction Pattern</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">int d = n % 10;</text>
            <text x="615" y="122" fill="#bae6fd" fontSize="10">sum += d;</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">n /= 10; // while (n &gt; 0)</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Indefinite Math Loop
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.12: Entry-controlled loops test conditions before entry, ensuring zero execution when preconditions fail.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Comparison: &apos;while&apos; Loop vs. Standard &apos;for&apos; Loop
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Feature</th>
                <th className="p-3 font-semibold text-emerald-400">`while` Loop</th>
                <th className="p-3 font-semibold text-purple-400">Standard `for` Loop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Primary Intent</td>
                <td className="p-3 text-xs text-emerald-400 font-semibold">Indefinite / Event-driven / State polling</td>
                <td className="p-3 text-xs text-purple-400 font-semibold">Definite / Known count / Bounded ranges</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Clause Placement</td>
                <td className="p-3 text-xs">Condition in header; init &amp; update separated</td>
                <td className="p-3 text-xs">Init, condition, and update in single header</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Minimum Executions</td>
                <td className="p-3 text-xs text-amber-400 font-mono">0 times</td>
                <td className="p-3 text-xs text-amber-400 font-mono">0 times</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Infinite Form</td>
                <td className="p-3 text-xs font-mono text-slate-300">while (true) &#123; ... &#125;</td>
                <td className="p-3 text-xs font-mono text-slate-300">for (;;) &#123; ... &#125;</td>
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
            WhileLoopEntryControlledDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates entry-controlled <code className="text-emerald-400 font-mono">while</code> loops for wallet balance deduction, zero-execution proof, and algorithmic digit extraction in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={whileDemoCode}
          title="WhileLoopEntryControlledDemo.java"
          highlightLines={[25, 26, 27, 39, 48, 49, 50, 51]}
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
              <span>❌</span> Pitfall 1: Forgetting to Update State Variable Inside Body
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">while (balance &gt;= fee) &#123; print(); &#125;</code> without decrementing <code className="text-rose-300 font-mono">balance -= fee;</code> creates a CPU-hanging infinite loop!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Sentinel and State-Driven Loops with `while`
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Use <code className="text-emerald-400 font-mono">while</code> whenever the stopping condition depends on external factors (network responses, user keystrokes, digit division) rather than fixed iteration counts.
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
            🤔 <em>&ldquo;Why is `while (1)` illegal in Java, but standard in C and C++?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Type Safety! Java enforces strict distinction between integers and boolean truth values. An integer <code className="text-rose-300 font-mono">1</code> is never coerced into <code className="text-emerald-300 font-mono">true</code>. You must write <code className="text-emerald-400 font-bold">while (true)</code> in Java, eliminating accidental assignment bugs like <code className="text-rose-300 font-mono">while (x = 1)</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Entry-Controlled 'while' Loop FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 4: Entry-Controlled 'while' Loops"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic4_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The while loop is your go-to tool for state-driven algorithms like digit extraction, stream processing, and wallet balance deductions. Always ensure your loop body mutates the tested state! In Topic 5, we explore Exit-Controlled 'do-while' loops! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
