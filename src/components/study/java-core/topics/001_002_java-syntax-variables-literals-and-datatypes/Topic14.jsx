import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import finalDemoCode from "./topic14_files/FinalConstantsDemo.java?raw";
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
          @keyframes lockPulse {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(234, 179, 8, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(234, 179, 8, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-lock-pulse {
            animation: lockPulse 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_002 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Defining Immutable Constants Using the <code className="text-amber-400">final</code> Keyword
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the mechanics of single-assignment variables in Java: global compile-time constants (<code className="text-amber-300">public static final</code>), blank final variables initialized in constructors, the crucial distinction between reference immutability and object state mutability, and Indian Rupee (₹) GST calculations.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Purpose of Immutability and Constants in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In software architecture, unintended variable reassignments and mutable shared state are primary causes of production bugs and concurrency deadlocks. The <code className="text-amber-400 font-bold">final</code> keyword acts as a compiler-enforced contract of single assignment: once a <code className="text-amber-300">final</code> variable receives an initial value, it can never be changed.
          </p>
          <p>
            Java distinguishes between <strong>compile-time global constants</strong> (<code className="text-sky-300 font-mono">public static final double STANDARD_GST_RATE = 0.18;</code>) which are inlined across classfiles, and <strong>blank final instance fields</strong> (<code className="text-emerald-300 font-mono">private final int studentId;</code>) which must be assigned in constructors.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300 space-y-2">
            <p className="font-medium text-amber-300">Classroom Case Study (Barrackpore Accounting Ledger):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an automated tuition fee generator. By declaring tax rates as <code className="text-amber-300 font-mono">public static final double GST = 0.18;</code> and student registration numbers as <code className="text-emerald-300 font-mono">final long studentId;</code>, <strong>Abhronila</strong> and <strong>Debangshu</strong> guaranteed that invoices calculated in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) remained completely immutable and tamper-proof.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Final Reference vs. Object Mutability Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Understanding the boundary: declaring a reference variable <code className="text-amber-300">final</code> freezes the memory pointer address, but does not freeze the internal state of the referenced object.
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Final Reference Immutability Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradRef" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradHeapObj" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradBlocked" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>

            {/* Stack Frame Box */}
            <rect x="30" y="40" width="260" height="200" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <text x="160" y="70" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Stack Memory (Variable Binding)</text>
            
            <rect x="50" y="90" width="220" height="60" rx="8" fill="url(#gradRef)" opacity="0.9" />
            <text x="160" y="117" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">final int[] arr</text>
            <text x="160" y="137" fill="#fef3c7" fontSize="11" fontFamily="monospace" textAnchor="middle">Pointer: 0x7FFF12A0</text>
            
            <text x="160" y="180" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">🔒 Pointer Address Locked!</text>
            <text x="160" y="200" fill="#94a3b8" fontSize="10" textAnchor="middle">Cannot point to any other array</text>
            <text x="160" y="220" fill="#f87171" fontSize="10" textAnchor="middle">arr = new int[5]; // ✗ ERROR</text>

            {/* Pointer Arrow */}
            <path d="M 270 120 L 370 120" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrow)" />
            <polygon points="370,115 385,120 370,125" fill="#fbbf24" />

            {/* Heap Memory Box (Referenced Array Object) */}
            <rect x="390" y="40" width="460" height="200" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <text x="620" y="70" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">Heap Memory (Actual Array Object: 0x7FFF12A0)</text>

            {/* Array Elements */}
            <rect x="420" y="95" width="120" height="65" rx="8" fill="url(#gradHeapObj)" />
            <text x="480" y="122" fill="#ffffff" fontSize="12" textAnchor="middle">arr[0] = 85 &rarr; 95</text>
            <text x="480" y="142" fill="#d1fae5" fontSize="10" textAnchor="middle">✓ MUTATION OK</text>

            <rect x="560" y="95" width="120" height="65" rx="8" fill="url(#gradHeapObj)" />
            <text x="620" y="122" fill="#ffffff" fontSize="12" textAnchor="middle">arr[1] = 90</text>
            <text x="620" y="142" fill="#d1fae5" fontSize="10" textAnchor="middle">✓ Element access</text>

            <rect x="700" y="95" width="120" height="65" rx="8" fill="url(#gradHeapObj)" />
            <text x="760" y="122" fill="#ffffff" fontSize="12" textAnchor="middle">arr[2] = 78</text>
            <text x="760" y="142" fill="#d1fae5" fontSize="10" textAnchor="middle">✓ Element access</text>

            {/* Explanation Note */}
            <text x="620" y="195" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">
              Key Insight: Modifying internal elements (arr[0] = 95) is 100% VALID.
            </text>
            <text x="620" y="215" fill="#94a3b8" fontSize="11" textAnchor="middle">
              For complete immutability, combine `final` with `List.of()` or immutable classes.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Final Keyword Variations &amp; Execution Scopes
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Application Target</th>
                <th className="p-3 font-semibold text-emerald-400">Declaration Example</th>
                <th className="p-3 font-semibold text-amber-400">Initialization Deadline</th>
                <th className="p-3 font-semibold text-slate-400">Architectural Effect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Global Constant</td>
                <td className="p-3 font-mono text-emerald-400">public static final double GST = 0.18;</td>
                <td className="p-3">At point of declaration</td>
                <td className="p-3 text-xs">Constant folded and inlined directly into client class bytecode</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Blank Static Final</td>
                <td className="p-3 font-mono text-emerald-400">static final long REG_ID;</td>
                <td className="p-3">Inside <code className="text-amber-300">static &#123; &#125;</code> block</td>
                <td className="p-3 text-xs">Initialized once during JVM class loading phase</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Blank Instance Final</td>
                <td className="p-3 font-mono text-emerald-400">private final int studentId;</td>
                <td className="p-3">In EVERY constructor path</td>
                <td className="p-3 text-xs">Ensures every instantiated object has immutable identity state</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Local Final Variable</td>
                <td className="p-3 font-mono text-emerald-400">final double baseFee = 15000.0;</td>
                <td className="p-3">Before first read access</td>
                <td className="p-3 text-xs">Prevents accidental variable reassignment in complex methods</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Method Parameter</td>
                <td className="p-3 font-mono text-emerald-400">void process(final int id)</td>
                <td className="p-3">At method invocation call</td>
                <td className="p-3 text-xs">Parameter becomes read-only inside method algorithm body</td>
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
            FinalConstantsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates global compile-time constants, static and instance blank finals, local final invoice calculations in Indian Rupees (₹), and the critical difference between reference immutability and object mutability.
        </p>

        <JavaFileLoader
          fileModule={finalDemoCode}
          title="FinalConstantsDemo.java"
          highlightLines={[15, 16, 17, 18, 22, 23, 27, 28, 47, 48, 49, 69, 70, 71]}
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
              <span>❌</span> Pitfall 1: Assuming `final` Makes Collection Objects Immutable
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">final List&lt;String&gt; list = new ArrayList&lt;&gt;();</code> only prevents reassigning <code className="text-sky-300 font-mono">list</code> to another list. Calling <code className="text-amber-300 font-mono">list.add(&quot;item&quot;)</code> or <code className="text-amber-300 font-mono">list.clear()</code> is completely unrestricted!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Use truly immutable collections: <code className="bg-slate-900 px-1 py-0.5 rounded">final List&lt;String&gt; list = List.of(&quot;Barrackpore&quot;, &quot;Kolkata&quot;);</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 2: Stale Inlined Constants When Updating Shared Libraries
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Because the Java compiler inlines primitive <code className="text-amber-300 font-mono">public static final</code> values directly into client bytecode, updating a shared library JAR without recompiling the client app results in the client using the old hardcoded constant.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always perform a full clean rebuild (<code className="bg-slate-900 px-1 py-0.5 rounded">mvn clean compile</code> or <code className="bg-slate-900 px-1 py-0.5 rounded">gradle build --clean</code>) when constant definitions change.
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
            🤔 <em>&ldquo;Why can an abstract class NEVER be declared `final`, and why can a constructor NEVER have the `final` modifier?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> <code className="text-sky-300 font-mono">abstract</code> demands that child classes extend and implement the class, while <code className="text-amber-300 font-mono">final</code> strictly forbids inheritance—they are philosophical opposites! And constructors are never inherited in Java, making the <code className="text-amber-300 font-mono">final</code> modifier completely meaningless for constructors.
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Final Constants FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 14: Defining Immutable Constants with final"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_002_topic14_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: In modern software engineering, favor immutability wherever possible. Making your fields and variables `final` prevents unexpected side effects, makes your code inherently thread-safe, and allows the JVM JIT compiler to perform aggressive optimizations. Always name your constants in UPPER_SNAKE_CASE! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
