import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import forEachDemoCode from "./topic9_files/EnhancedForEachLoopArrayDemo.java?raw";
import noteText from "./topic9_files/topic9_note.txt?raw";
import questions from "./topic9_files/topic9_questions";

export default function Topic9() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowForEach {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-fe {
            animation: glowForEach 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 9
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          The Enhanced <code className="text-emerald-400 font-mono">for-each</code> Loop: Read-Only Semantics &amp; Bytecode
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the Enhanced for-each loop in Java (JLS §14.14.2): compiler bytecode desugaring into indexed loops, primitive local copy read-only limitations, object state mutation vs local reference reassignment, and student stipend auditing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> How the Enhanced For-Each Loop Works
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The enhanced for-each loop (<code className="text-emerald-400 font-mono">for (Type x : arr)</code>) is pure syntactic sugar that eliminates index variables and boundary checks:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">Source Code (Java)</h3>
              <p className="text-emerald-300 mb-2">for (double s : stipends) &#123;</p>
              <p className="text-slate-300">&nbsp;&nbsp;total += s;</p>
              <p className="text-emerald-300">&#125;</p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">Compiler Desugared Bytecode</h3>
              <p className="text-purple-300 mb-1">double[] a$ = stipends; int len$ = a$.length;</p>
              <p className="text-purple-300 mb-1">for (int i$ = 0; i$ &lt; len$; i$++) &#123;</p>
              <p className="text-slate-300">&nbsp;&nbsp;double s = a$[i$]; total += s;</p>
              <p className="text-purple-300">&#125;</p>
            </div>
          </div>

          <p>
            <strong>The Read-Only Limitation:</strong> Because <code className="text-amber-300 font-mono">s</code> is a local copy variable on the Stack, writing <code className="text-rose-300 font-mono">s += 1000.0;</code> modifies only the local variable—the original array slot in Heap memory remains unchanged!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Stipend Disbursal Audit):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, and <strong>Abhronila</strong> received monthly lab stipends in Indian Rupees (<code className="text-emerald-400 font-semibold">₹5,000 to ₹6,000</code>). When <strong>Debangshu</strong> iterated over <code className="text-sky-300 font-mono">StudentAccount[]</code> and called <code className="text-emerald-400 font-mono">acc.creditScholarship(₹1,000)</code>, the balance updated successfully because the object reference pointed directly to the shared Heap object across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Primitive Copy vs. Object State Mutation Mechanics
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Why primitive mutations fail in for-each loops while object method calls succeed:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Enhanced For-Each Loop Diagram"
          >
            <defs>
              <linearGradient id="gradDesugar" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradPrimTrap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradObjMut" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Box 1: Compiler Desugaring */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradDesugar)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Compiler Desugaring</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">for (double s : arr)</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="10">→ int i$=0; i$&lt;len$; i$++</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Zero Iterator allocation!</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Automated Indexing
            </text>

            {/* Box 2: Primitive Local Copy Trap */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradPrimTrap)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Primitive Copy Trap</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">s += 1000.0; // Stack only</text>
            <text x="335" y="122" fill="#fecdd3" fontSize="10">Heap array slot UNCHANGED!</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="10">&apos;s&apos; is destroyed at next step</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ❌ Read-Only on Primitives
            </text>

            {/* Box 3: Object Method Mutation */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradObjMut)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Object Method Mutation</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="615" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">acc.credit(1000.0);</text>
            <text x="615" y="122" fill="#a7f3d0" fontSize="10">Follows reference to Heap</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Heap object state IS modified!</text>
            <text x="720" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Mutates Shared Object
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.14.2: For-each variables are local values; use standard indexed loops to modify primitive array slots.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Enhanced For-Each vs. Standard Indexed For Loop
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Feature</th>
                <th className="p-3 font-semibold text-emerald-400">Enhanced For-Each Loop</th>
                <th className="p-3 font-semibold text-purple-400">Standard Indexed For Loop</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Syntax Simplicity</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">✓ Ultra-clean (`for (Type x : arr)`)</td>
                <td className="p-3 text-xs">Verbose (`for (int i=0; i&lt;len; i++)`)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Index Access ($i$)</td>
                <td className="p-3 text-xs text-rose-400">❌ No access to index counters</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">✓ Direct index access (`arr[i]`)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Primitive In-Place Mutation</td>
                <td className="p-3 text-xs text-rose-400">❌ Read-only (Modifies local copy only)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">✓ In-place mutation (`arr[i] *= 2`)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Reverse &amp; Step Skipping</td>
                <td className="p-3 text-xs text-rose-400">❌ Forward single-step only</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">✓ Flexible (Reverse, step $+2$, etc.)</td>
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
            EnhancedForEachLoopArrayDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates clean accumulation, the primitive local copy trap, and object method mutations in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={forEachDemoCode}
          title="EnhancedForEachLoopArrayDemo.java"
          highlightLines={[42, 43, 53, 54, 69, 70]}
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
              <span>❌</span> Pitfall 1: Attempting to Modify Primitive Elements in For-Each Loops
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">for (int x : arr) x = 0;</code> has zero effect on <code className="text-slate-300 font-mono">arr</code>! If you need to mutate elements in-place, always use a standard indexed loop: <code className="text-emerald-400 font-mono">for (int i = 0; i &lt; arr.length; i++) arr[i] = 0;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Prefer For-Each for All Read-Only Operations
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Whenever you do not need the index counter and are not modifying primitive array slots, always use the enhanced for-each loop to eliminate off-by-one errors and enhance code readability.
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
            🤔 <em>&ldquo;Does the Enhanced For-Each loop create an Iterator object when traversing a raw Java array?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Zero-Allocation Bytecode Desugaring! While for-each creates an <code className="text-purple-300 font-mono">Iterator</code> when traversing a <code className="text-sky-300 font-mono">List</code>, on raw arrays it desugars directly into a fast, zero-allocation integer index loop (<code className="text-emerald-400 font-bold">i$ = 0; i$ &lt; len$; i$++</code>)!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Enhanced For-Each Loop FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 9: Enhanced For-Each Loop & Read-Only Semantics"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic9_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Use the Enhanced For-Each loop for all read-only traversals, summing, and printing! But remember: when you need to change numbers inside the array, reach for the standard indexed for loop. In Topic 10, we master Passing and Returning Arrays in Methods! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
