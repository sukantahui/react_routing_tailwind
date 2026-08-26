import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import scopeDemoCode from "./topic2_files/ForLoopVariableScopeDemo.java?raw";
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
          @keyframes glowScope {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(139, 92, 246, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-sc {
            animation: glowScope 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 2
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Variable Scope Within <code className="text-purple-400">&apos;for&apos;</code> Loop Headers
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master lexical scoping and variable lifetimes in Java <code className="text-purple-400 font-mono">for</code> loops (JLS §6.3, §14.14.1): block isolation, reusing loop counter identifiers across sibling loops, shadowing restrictions, preserving counter state across loop boundaries, and student seat allocation in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Lexical Scoping and Block Lifetime
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When a variable is declared inside the initialization clause of a <code className="text-emerald-400 font-mono">for</code> loop header, its <strong>scope is strictly confined</strong> to the header and body of that loop:
          </p>
          <p className="font-mono text-purple-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            for ( int batchId = 101 ; batchId &lt;= 103 ; batchId++ ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;System.out.printf(&quot;Processing Batch #%d%n&quot;, batchId);
            <br />
            &#125;
            <br />
            // System.out.println(batchId); // COMPILER ERROR: cannot find symbol batchId!
          </p>
          <p>
            <strong>Sibling Loop Reusability:</strong> Because <code className="text-purple-300 font-mono">batchId</code> is destroyed as soon as the loop terminates, subsequent sibling loops in the same method can redeclare <code className="text-emerald-400 font-mono">int batchId</code> without any variable name collision.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Classroom Case Study (Barrackpore Batch Seat Allocator):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built a shift seat allocation engine in Indian Rupees (<code className="text-emerald-400 font-semibold">₹15,000</code> course tier). By isolating counter variables to loop headers in morning and evening batches (<code className="text-purple-300 font-mono">seatNo</code>), <strong>Abhronila</strong> and <strong>Debangshu</strong> eliminated variable bleed and avoided accidental state corruption across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Variable Lifetime &amp; Scope Boundary Isolation
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How loop header variables live and die within bounded blocks, and how sibling loops reuse stack frame slots:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="For Loop Variable Scope Diagram"
          >
            <defs>
              <linearGradient id="gradLoopA" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradLoopB" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Loop A Scope */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradLoopA)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Loop A (Morning Shift)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="55" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">for (int seatNo=1;..)</text>
            <text x="55" y="122" fill="#ede9fe" fontSize="10">&apos;seatNo&apos; born in header</text>
            <text x="55" y="142" fill="#fca5a5" fontSize="10">&apos;seatNo&apos; DESTROYED at &apos;&#125;&apos;!</text>
            <text x="160" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Scoped to Loop A
            </text>

            {/* Box 2: Loop B Scope */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradLoopB)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Loop B (Evening Shift)</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">for (int seatNo=1;..)</text>
            <text x="335" y="122" fill="#d1fae5" fontSize="10">Fresh &apos;seatNo&apos; declared</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Zero variable collision!</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Reusable Identifier
            </text>

            {/* Box 3: Preserving State Outside */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradOuter)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Preserving Outside Loop</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">int index;</text>
            <text x="615" y="122" fill="#bae6fd" fontSize="10">for (index=0; index&lt;N;..)</text>
            <text x="615" y="142" fill="#a7f3d0" fontSize="10">&apos;index&apos; survives loop exit!</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Search &amp; Match Pattern
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §6.3: Loop header variables have bounded block lifetimes, preventing accidental mutation in enclosing methods.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Scoping Rules &amp; Shadowing Matrix in Java Loops
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Scoping Scenario</th>
                <th className="p-3 font-semibold text-emerald-400">Code Pattern</th>
                <th className="p-3 font-semibold text-amber-400">Java Compiler Result</th>
                <th className="p-3 font-semibold text-purple-400">Technical Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-purple-400 font-bold">Header Declaration</td>
                <td className="p-3 font-mono text-xs">for (int i = 0; i &lt; 5; i++)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">✓ Valid (Scoped to loop)</td>
                <td className="p-3 text-xs">Variable destroyed upon loop exit</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400 font-bold">Local Variable Shadowing</td>
                <td className="p-3 font-mono text-xs">int i = 10; for (int i = 0; ..)</td>
                <td className="p-3 text-xs text-rose-400 font-bold">❌ Compile Error</td>
                <td className="p-3 text-xs">Java forbids shadowing local method variables</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-400 font-bold">Field Shadowing</td>
                <td className="p-3 font-mono text-xs">this.id; for (int id = 0; ..)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">✓ Valid (Shadows field)</td>
                <td className="p-3 text-xs">Field remains accessible via `this.id`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-amber-400 font-bold">Sibling Loop Reuse</td>
                <td className="p-3 font-mono text-xs">for (int i;..) ... for (int i;..)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">✓ Valid (Non-overlapping)</td>
                <td className="p-3 text-xs">JVM reuses stack frame variable slot</td>
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
            ForLoopVariableScopeDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates header scope isolation, reusing counter names in sibling loops, and preserving the search index after loop termination in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={scopeDemoCode}
          title="ForLoopVariableScopeDemo.java"
          highlightLines={[21, 30, 35, 45, 46, 55]}
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
              <span>❌</span> Pitfall 1: Attempting to Read Loop Counter After Loop
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">for (int i = 0; i &lt; 5; i++) &#123; ... &#125; System.out.println(i);</code> causes a compile error (&quot;cannot find symbol i&quot;).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Minimize Variable Scope (Effective Java Item 57)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always declare loop counters directly inside the <code className="text-purple-300 font-mono">for</code> loop header unless their value is explicitly needed by subsequent statements.
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
            🤔 <em>&ldquo;Why doesn&apos;t Java allow local variable shadowing inside the same method?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Defensive Language Design! Unlike C++, Java strictly prohibits declaring a local variable with the same name as an outer local variable in the same method. This prevents disastrous bugs where a developer intends to mutate the outer variable but accidentally mutates an identically named inner loop variable instead!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Variable Scope in Loops FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 2: Variable Scope in for Loop Headers"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic2_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Scoping is all about keeping your code clean and leak-free. Confining variables to loop headers prevents variable bleed and makes your methods robust. In Topic 3, we explore Multiple Initializations and Updates in a Single for Loop Header! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
