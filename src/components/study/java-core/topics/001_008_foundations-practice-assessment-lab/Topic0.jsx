import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import synthDemoCode from "./topic0_files/Segment1FoundationsSynthesisDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowPillars {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-pi {
            animation: glowPillars 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Segment 1 Foundations Capstone Lab
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Review of Segment 1 Core Concepts: JVM, Datatypes, Control Flow, Arrays &amp; Methods
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Comprehensive synthesis of all 7 foundational pillars in Java Core (Modules 001_001 through 001_007): integrating JVM execution, type casting, decision ladders, loops, multi-dimensional arrays, methods, and recursion into an academic ledger system in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The 7 Pillars of Java Core Foundations (Segment 1)
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Segment 1 establishes the rock-solid foundations required before advancing to Object-Oriented Programming (OOP):
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-1">1. JVM Architecture</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Bytecode execution, ClassLoaders, JIT compiler, and Stack vs Heap memory.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-1">2. Types &amp; Operators</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                8 primitive types, type widening promotions, casting, and arithmetic expressions.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-1">3. Control &amp; Loops</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                if-else ladders, modern Java 14+ switch expressions, for/while/for-each loops.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/30">
              <h3 className="text-amber-400 font-bold text-sm mb-1">4. Arrays &amp; Methods</h3>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                1D/2D arrays, pass-by-value, varargs, method overloading, and Call Stack recursion.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Capstone Ledger):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> (91.25% → ₹20,060 net fee), <strong>Tuhina</strong> (95.00% → ₹23,600 net fee), <strong>Abhronila</strong> (84.75% → ₹19,116 net fee), and <strong>Debangshu</strong> (79.75% → ₹16,815 net fee) processed academic grades via enhanced switch expressions, multi-tier tuition invoicing in Indian Rupees (<code className="text-emerald-400 font-semibold">₹79,591.00 Total Revenue</code>), and recursive loyalty points.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 7 Pillars Architecture Map of Java Foundations
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing how all 7 modules connect into a unified Java programming foundation:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Segment 1 Foundations Architecture Map"
          >
            <defs>
              <linearGradient id="gradPill1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradPill2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradPill3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradPill4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Top Header Block: The Java Application */}
            <rect x="30" y="25" width="820" height="40" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <text x="440" y="50" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
              JAVA CORE SEGMENT 1: THE 7 FOUNDATIONAL PILLARS
            </text>

            {/* Pillar 1: JVM & Types */}
            <rect x="30" y="80" width="190" height="155" rx="8" fill="url(#gradPill1)" opacity="0.9" />
            <text x="125" y="105" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">PILLAR 1 &amp; 2</text>
            <text x="125" y="125" fill="#e0f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">JVM &amp; Datatypes</text>
            <text x="125" y="150" fill="#ffffff" fontSize="9" textAnchor="middle">• Bytecode &amp; JIT</text>
            <text x="125" y="170" fill="#ffffff" fontSize="9" textAnchor="middle">• Stack vs Heap</text>
            <text x="125" y="190" fill="#ffffff" fontSize="9" textAnchor="middle">• 8 Primitive Types</text>
            <text x="125" y="210" fill="#ffffff" fontSize="9" textAnchor="middle">• Widening &amp; Casting</text>

            {/* Pillar 2: Operators & Control Flow */}
            <rect x="240" y="80" width="190" height="155" rx="8" fill="url(#gradPill2)" opacity="0.9" />
            <text x="335" y="105" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">PILLAR 3 &amp; 4</text>
            <text x="335" y="125" fill="#d1fae5" fontSize="10" fontWeight="bold" textAnchor="middle">Operators &amp; Control</text>
            <text x="335" y="150" fill="#ffffff" fontSize="9" textAnchor="middle">• Arithmetic &amp; Bitwise</text>
            <text x="335" y="170" fill="#ffffff" fontSize="9" textAnchor="middle">• if-else Ladders</text>
            <text x="335" y="190" fill="#ffffff" fontSize="9" textAnchor="middle">• Switch Expressions</text>
            <text x="335" y="210" fill="#ffffff" fontSize="9" textAnchor="middle">• Ternary Operators</text>

            {/* Pillar 3: Loops & Arrays */}
            <rect x="450" y="80" width="190" height="155" rx="8" fill="url(#gradPill3)" opacity="0.9" />
            <text x="545" y="105" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">PILLAR 5 &amp; 6</text>
            <text x="545" y="125" fill="#ede9fe" fontSize="10" fontWeight="bold" textAnchor="middle">Loops &amp; Arrays</text>
            <text x="545" y="150" fill="#ffffff" fontSize="9" textAnchor="middle">• for, while, do-while</text>
            <text x="545" y="170" fill="#ffffff" fontSize="9" textAnchor="middle">• Enhanced for-each</text>
            <text x="545" y="190" fill="#ffffff" fontSize="9" textAnchor="middle">• 1D &amp; 2D Matrices</text>
            <text x="545" y="210" fill="#ffffff" fontSize="9" textAnchor="middle">• Ragged Grid Bounds</text>

            {/* Pillar 4: Methods & Recursion */}
            <rect x="660" y="80" width="190" height="155" rx="8" fill="url(#gradPill4)" opacity="0.9" />
            <text x="755" y="105" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">PILLAR 7</text>
            <text x="755" y="125" fill="#fef3c7" fontSize="10" fontWeight="bold" textAnchor="middle">Methods &amp; Recursion</text>
            <text x="755" y="150" fill="#ffffff" fontSize="9" textAnchor="middle">• Pass-by-Value</text>
            <text x="755" y="170" fill="#ffffff" fontSize="9" textAnchor="middle">• Method Overloading</text>
            <text x="755" y="190" fill="#ffffff" fontSize="9" textAnchor="middle">• Varargs (Type...)</text>
            <text x="755" y="210" fill="#ffffff" fontSize="9" textAnchor="middle">• Call Stack &amp; Base Case</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Module 001_008 synthesizes these 7 pillars into comprehensive algorithmic problem-solving and assessment!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Segment 1 Comprehensive Competency Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Module</th>
                <th className="p-3 font-semibold text-emerald-400">Core Concepts</th>
                <th className="p-3 font-semibold text-purple-400">Key Syntax / Primitives</th>
                <th className="p-3 font-semibold text-amber-400">Common Pitfall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_001 JVM Architecture</td>
                <td className="p-3 text-slate-300 font-sans">WORA, Bytecode, ClassLoaders, Memory</td>
                <td className="p-3 text-slate-300">`javac`, `java`, Stack vs Heap</td>
                <td className="p-3 text-rose-400 font-sans">Confusing Stack with Heap</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_002 Types &amp; Variables</td>
                <td className="p-3 text-slate-300 font-sans">8 Primitives, Wrappers, Literals</td>
                <td className="p-3 text-slate-300">`byte`, `int`, `double`, `boolean`</td>
                <td className="p-3 text-rose-400 font-sans">Integer overflow on 32-bit int</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_003 Operators &amp; Casting</td>
                <td className="p-3 text-slate-300 font-sans">Precedence, Widening, Explicit Cast</td>
                <td className="p-3 text-slate-300">`(int) d`, `++x` vs `x++`, `&amp;&amp;`, `||`</td>
                <td className="p-3 text-rose-400 font-sans">Truncation loss during narrowing</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_004 Decision Making</td>
                <td className="p-3 text-slate-300 font-sans">if-else, Enhanced Switch Expressions</td>
                <td className="p-3 text-slate-300">`switch (x) &#123; case 1 -&gt; "A"; &#125;`</td>
                <td className="p-3 text-rose-400 font-sans">Legacy switch fall-through</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_005 Loops &amp; Iteration</td>
                <td className="p-3 text-slate-300 font-sans">for, while, enhanced for-each, break</td>
                <td className="p-3 text-slate-300">`for (int s : arr)`, `break`, `continue`</td>
                <td className="p-3 text-rose-400 font-sans">Off-by-one index loop errors</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_006 Arrays in Java</td>
                <td className="p-3 text-slate-300 font-sans">1D &amp; 2D matrices, Ragged Arrays</td>
                <td className="p-3 text-slate-300">`new int[N]`, `matrix[r][c]`</td>
                <td className="p-3 text-rose-400 font-sans">ArrayIndexOutOfBoundsException</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">001_007 Methods &amp; Recursion</td>
                <td className="p-3 text-slate-300 font-sans">Pass-by-value, Overloading, Recursion</td>
                <td className="p-3 text-slate-300">`Type...`, Call Stack, Base Case</td>
                <td className="p-3 text-rose-400 font-sans">StackOverflowError on missing base</td>
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
            Segment1FoundationsSynthesisDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program integrates data models, switch expressions, tax computations, arrays, and recursion into an academic billing ledger in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={synthDemoCode}
          title="Segment1FoundationsSynthesisDemo.java"
          highlightLines={[23, 39, 48, 51, 60, 68, 77, 85, 96, 107]}
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
              <span>❌</span> Pitfall 1: Monolithic Main Method Anti-Pattern
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing all business logic inside a single giant <code className="text-rose-300 font-mono">main()</code> method makes code un-testable and un-maintainable. Always modularize tasks into small helper functions.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Follow Clean Code &amp; Google Java Style Conventions
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Use standard camelCase method names (<code className="text-emerald-400 font-mono">computeFinalPayable</code>), descriptive constants (<code className="text-emerald-400 font-mono">INSTITUTE_NAME</code>), and defensive null/empty bounds checks.
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
            🤔 <em>&ldquo;Why does mastering Segment 1 Foundations make Object-Oriented Programming (OOP) much easier?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Memory Mechanics &amp; Modularity! When you understand Stack vs Heap references, primitive values vs object pointers, and method frame execution, OOP concepts like <code className="text-slate-300 font-mono">this</code>, encapsulation, polymorphism, and inheritance become intuitive and clear!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Segment 1 Foundations Review FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 0: Segment 1 Foundations Review"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic0_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="Welcome Swadeep, Tuhina, Abhronila, and Debangshu to Module 001_008: Our Segment 1 Capstone Lab! You have mastered all 7 pillars. In Topic 1, we tackle our first interview algorithm: Prime Number Generation using the Sieve of Eratosthenes! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
