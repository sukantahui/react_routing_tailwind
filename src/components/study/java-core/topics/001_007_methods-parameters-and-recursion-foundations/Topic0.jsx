import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import modularDemoCode from "./topic0_files/MethodModularizationDemo.java?raw";
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
          @keyframes glowModular {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-mod {
            animation: glowModular 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Software Architecture &amp; Modularization
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          What is a Method &amp; Why Modularization is Critical in Software Engineering
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover the foundational building block of modular Java programming (JLS §8.4): breaking monolithic spaghetti code into cohesive, single-responsibility methods, enforcing DRY principles, unit testability, abstraction, and student fee invoicing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Philosophy of Modularization in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            A <strong>Method</strong> is a named block of code statements grouped together to execute a specific, well-defined operation. Instead of writing massive 1,000-line monolithic scripts, software engineers decompose complex business requirements into discrete, reusable functions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">1. DRY Principle</h3>
              <p className="text-emerald-300 mb-1">Don&apos;t Repeat Yourself</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Write logic (e.g. 18% GST calculation) once inside a method and call it across thousands of student records without duplicating code.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">2. Single Responsibility</h3>
              <p className="text-sky-300 mb-1">Do ONE task and do it well</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Separate computation (<code className="text-sky-300 font-mono">calculateGrossFee</code>), business validation, and invoice printing into independent methods.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">3. Unit Testability</h3>
              <p className="text-purple-300 mb-1">Isolated Verification</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Test input/output calculations in JUnit test suites independently from UI or database layers.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Coder &amp; AccoTax Fee Invoicing Engine):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> (Barrackpore - 10% scholarship), <strong>Tuhina</strong> (Naihati - 15% scholarship), <strong>Abhronila</strong> (Shyamnagar - 5% scholarship), and <strong>Debangshu</strong> (Ichapur - 0% scholarship) processed course tuition in Indian Rupees (<code className="text-emerald-400 font-semibold">₹12,000 to ₹24,000</code>). Decomposing the invoice calculation into modular worker methods (<code className="text-emerald-400 font-mono">calculateGrossFee</code>, <code className="text-sky-300 font-mono">calculateDiscount</code>, <code className="text-purple-300 font-mono">calculateGst</code>) made updating tax rules instantaneous with zero side-effects.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Monolithic Spaghetti Code vs. Clean Modular Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing tangled, duplicated monoliths with cohesive, layered method decomposition:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Modular Method Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradMonolith" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradModular" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradWorker" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Panel 1: Monolithic Anti-pattern */}
            <rect x="30" y="30" width="380" height="210" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="220" y="55" fill="#f43f5e" fontSize="13" fontWeight="bold" textAnchor="middle">MONOLITHIC SPAGHETTI CODE (1000+ Lines)</text>
            <rect x="45" y="75" width="350" height="145" rx="6" fill="#1e1e2e" />
            <text x="60" y="100" fill="#fca5a5" fontSize="10" fontFamily="monospace">// All computations mixed inside main()</text>
            <text x="60" y="125" fill="#fca5a5" fontSize="10" fontFamily="monospace">double g1 = 4000 * 4; double d1 = g1 * 0.10; ...</text>
            <text x="60" y="150" fill="#fca5a5" fontSize="10" fontFamily="monospace">double g2 = 5000 * 3; double d2 = g2 * 0.15; ...</text>
            <text x="60" y="175" fill="#f87171" fontSize="10" fontFamily="monospace">❌ Logic duplicated 400 times (Violation of DRY)</text>
            <text x="60" y="200" fill="#f87171" fontSize="10" fontFamily="monospace">❌ Untestable, rigid, bug-prone</text>

            {/* Panel 2: Modular Architecture */}
            <rect x="470" y="30" width="380" height="210" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="660" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">CLEAN MODULAR ARCHITECTURE (Layered)</text>

            {/* Coordinator */}
            <rect x="485" y="70" width="350" height="40" rx="6" fill="url(#gradModular)" />
            <text x="660" y="94" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Coordinator: processEnrollment()</text>

            {/* Worker Methods */}
            <rect x="485" y="120" width="105" height="50" rx="6" fill="url(#gradWorker)" />
            <text x="537" y="142" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">calculateGrossFee()</text>
            <text x="537" y="158" fill="#d1fae5" fontSize="8" textAnchor="middle">Gross Tuition</text>

            <rect x="605" y="120" width="110" height="50" rx="6" fill="url(#gradWorker)" />
            <text x="660" y="142" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">calculateDiscount()</text>
            <text x="660" y="158" fill="#d1fae5" fontSize="8" textAnchor="middle">Scholarship %</text>

            <rect x="730" y="120" width="105" height="50" rx="6" fill="url(#gradWorker)" />
            <text x="782" y="142" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">calculateGst()</text>
            <text x="782" y="158" fill="#d1fae5" fontSize="8" textAnchor="middle">GST (18%)</text>

            {/* Presentation */}
            <rect x="485" y="180" width="350" height="35" rx="6" fill="#065f46" />
            <text x="660" y="202" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Presentation: printStudentInvoice()</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §8.4: Modular methods encapsulate discrete operations, maximizing reuse, testability, and maintainability.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Monolithic Code vs. Modular Methods
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Engineering Metric</th>
                <th className="p-3 font-semibold text-rose-400">Monolithic Architecture</th>
                <th className="p-3 font-semibold text-emerald-400">Modular Method Architecture</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">DRY Compliance</td>
                <td className="p-3 text-rose-400 font-sans">❌ Highly duplicated code across files</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ Written once, called everywhere</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Single Responsibility</td>
                <td className="p-3 text-rose-400 font-sans">❌ Multiple concerns mixed together</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ Each method performs exactly ONE task</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Bug Localization</td>
                <td className="p-3 text-rose-400 font-sans">❌ Difficult to find in 1,000+ line blocks</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ Instant via JVM stack trace method names</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Unit Testability</td>
                <td className="p-3 text-rose-400 font-sans">❌ Cannot test math without running whole app</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ Isolated JUnit testing per method</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">JVM JIT Optimization</td>
                <td className="p-3 text-rose-400 font-sans">❌ Mega-methods cannot be inlined by JIT</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ Small methods automatically inlined for speed</td>
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
            MethodModularizationDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates clean method decomposition for student invoice calculation in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={modularDemoCode}
          title="MethodModularizationDemo.java"
          highlightLines={[17, 26, 34, 41, 56, 68, 69, 70]}
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
              <span>❌</span> Pitfall 1: The &ldquo;God Method&rdquo; Anti-Pattern
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing monolithic 500-line methods that parse user input, perform business mathematics, execute database queries, and print reports simultaneously. Always break multi-step logic into small, focused sub-methods!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Guard Clauses to Validate Arguments Early
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Place early exit checks at the beginning of a method (e.g. <code className="text-emerald-400 font-mono">if (units &lt;= 0) return 0.0;</code>) to eliminate deeply nested <code className="text-slate-300 font-mono">if-else</code> structures.
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
            🤔 <em>&ldquo;Does creating many small methods slow down Java program execution due to method call overhead?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> JVM HotSpot Inlining Magic! The Java Just-In-Time (JIT) compiler detects frequently executed small methods and automatically inlines their bytecode into the calling site at runtime, delivering the performance of monolithic code with all the readability and modularity of clean architecture!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Method Modularization FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 0: What is a Method & Modularization"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic0_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Methods are the true foundation of professional software engineering. Always write small, single-responsibility methods that do one job exceptionally well. In Topic 1, we dissect the Anatomy of a Method Declaration! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
