import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import pbvDemoCode from "./topic5_files/PassByValueMemoryMechanicsDemo.java?raw";
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
          @keyframes glowPbv {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-pb {
            animation: glowPbv 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 5
          </span>
          <span className="px-3 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold rounded-full">
            Core JVM Memory Semantics
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Pass-by-Value in Java: Primitives vs. Object References
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the ultimate Java memory rule (JLS §4.3, §8.4.1): why Java is strictly 100% Pass-by-Value, how Stack value copying isolates primitives, why mutating shared Heap objects works while parameter pointer reassignment fails, and student account tests in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Cardinal Invariant: Java is Strictly Pass-by-Value
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            There is <strong>no Pass-by-Reference in Java</strong>. When any argument is passed to a method, Java copies its raw binary bits:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. Primitive Pass-by-Value</h3>
              <p className="text-sky-300 mb-1">fee = fee + 5000.0;</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                The 64-bit value is copied into the method&apos;s stack frame. Modifying the formal parameter has <strong>zero effect</strong> on the caller&apos;s variable!
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. Object Reference Pass-by-Value</h3>
              <p className="text-emerald-300 mb-1">student.setFeeBalance(15000.0);</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                The memory address pointer is copied by value. Both references point to the <strong>same shared Heap object</strong>, so field mutations alter the object, but reassigning the pointer (<code className="text-emerald-300 font-mono">s = new Student()</code>) affects only local stack memory!
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Account Proofs):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> (₹18,000 balance) had his tuition discounted to ₹15,000 because <code className="text-emerald-400 font-mono">modifyObjectInternalState()</code> mutated the shared Heap instance. Meanwhile, <strong>Tuhina</strong> (₹15,000 balance) tested <code className="text-rose-300 font-mono">attemptReferenceReassignment()</code>: reassigning the parameter pointer to a new record did not alter Tuhina&apos;s original caller variable in Indian Rupees (<code className="text-emerald-400 font-semibold">₹15,000</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Primitive Copying vs. Heap Object Reference Sharing
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing stack value duplication with shared heap object pointer dereferencing:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Pass by Value Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradPrim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradObj" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradReassign" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
            </defs>

            {/* Panel 1: Primitive Value Copy */}
            <rect x="30" y="30" width="380" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="220" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1. PRIMITIVE PASS-BY-VALUE</text>

            <rect x="45" y="70" width="160" height="60" rx="6" fill="#1e293b" />
            <text x="125" y="92" fill="#ffffff" fontSize="10" textAnchor="middle">Caller Stack: originalFee</text>
            <text x="125" y="112" fill="#38bdf8" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">₹12,000.00</text>

            <rect x="235" y="70" width="160" height="60" rx="6" fill="#1e293b" />
            <text x="315" y="92" fill="#ffffff" fontSize="10" textAnchor="middle">Method Stack: fee (Copy)</text>
            <text x="315" y="112" fill="#f87171" fontSize="12" fontFamily="monospace" fontWeight="bold" textAnchor="middle">₹17,000.00</text>

            <text x="220" y="165" fill="#94a3b8" fontSize="10" textAnchor="middle">Value is copied. Modifying method slot</text>
            <text x="220" y="185" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">leaves caller variable 100% INTACT!</text>

            {/* Panel 2: Reference Sharing & Mutation */}
            <rect x="460" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="655" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">2. OBJECT REFERENCE PASS-BY-VALUE</text>

            {/* Caller Stack */}
            <rect x="475" y="70" width="160" height="40" rx="6" fill="#1e293b" />
            <text x="555" y="88" fill="#ffffff" fontSize="9" textAnchor="middle">Caller: swadeep</text>
            <text x="555" y="102" fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="middle">ptr: 0x50A0 &rarr;</text>

            {/* Method Stack */}
            <rect x="475" y="120" width="160" height="40" rx="6" fill="#1e293b" />
            <text x="555" y="138" fill="#ffffff" fontSize="9" textAnchor="middle">Method: student</text>
            <text x="555" y="152" fill="#10b981" fontSize="9" fontFamily="monospace" textAnchor="middle">ptr: 0x50A0 &rarr;</text>

            {/* Shared Heap Object */}
            <rect x="665" y="70" width="170" height="90" rx="8" fill="url(#gradObj)" />
            <text x="750" y="95" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Heap: StudentRecord</text>
            <text x="750" y="118" fill="#d1fae5" fontSize="10" textAnchor="middle">Swadeep</text>
            <text x="750" y="138" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">₹18,000 &rarr; ₹15,000</text>

            <text x="655" y="195" fill="#a7f3d0" fontSize="10" textAnchor="middle">Address pointer is copied by value.</text>
            <text x="655" y="215" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">Both mutate the SAME Heap instance!</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §8.4.1: Java copies values: primitive data bits for scalar types, memory address bits for object references.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Pass-by-Value Mechanics Across Data Types
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Data Type Passed</th>
                <th className="p-3 font-semibold text-emerald-400">What Value is Copied?</th>
                <th className="p-3 font-semibold text-purple-400">Can Method Mutate Caller State?</th>
                <th className="p-3 font-semibold text-amber-400">Can Method Reassign Caller Variable?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Primitive (`int`, `double`)</td>
                <td className="p-3 text-slate-300">Raw scalar value bits</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO (Stack copy isolated)</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-300 font-bold">Mutable Object (`StudentRecord`)</td>
                <td className="p-3 text-slate-300">Heap address pointer bits</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ YES (Via setter methods)</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO (Only local pointer changes)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-300 font-bold">Immutable Object (`String`)</td>
                <td className="p-3 text-slate-300">Heap address pointer bits</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO (Cannot mutate String)</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-amber-300 font-bold">Array (`double[]`)</td>
                <td className="p-3 text-slate-300">Heap array address pointer bits</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ YES (`arr[0] = val`)</td>
                <td className="p-3 text-rose-400 font-sans">❌ NO (`arr = new double[N]` fails)</td>
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
            PassByValueMemoryMechanicsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program proves primitive value isolation, object field mutation, and pointer reassignment failure in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={pbvDemoCode}
          title="PassByValueMemoryMechanicsDemo.java"
          highlightLines={[39, 41, 48, 51, 58, 61, 71, 78, 85]}
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
              <span>❌</span> Pitfall 1: Writing `swap(a, b)` Methods Expecting Them to Work
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Attempting to swap two primitives or two object references using <code className="text-rose-300 font-mono">swap(int a, int b)</code> or <code className="text-rose-300 font-mono">swap(Student s1, Student s2)</code> does not affect caller variables because Java passes only copies of values!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Immutable Objects &amp; Defensive Copies
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              To prevent accidental shared heap mutation when passing objects across methods, design domain classes as immutable <code className="text-emerald-400 font-mono">record</code> types or make defensive clones.
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
            🤔 <em>&ldquo;If Java passes object references by value, why does <code className="text-emerald-400 font-mono">str += &quot; extra&quot;</code> NOT modify the caller&apos;s string?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> String Immutability! <code className="text-emerald-400 font-mono">String</code> objects cannot be modified in-place. The concatenation operator creates a <em>new</em> String on the Heap and reassigns the local parameter pointer, leaving the caller&apos;s original String object untouched!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Pass-by-Value in Java FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 5: Pass-by-Value in Java"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic5_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: This is one of the most famous core concepts in all of Java. Always remember: Java is strictly 100% Pass-by-Value! It copies primitive values and reference address pointers. In Topic 6, we demonstrate Parameter Re-assignment vs In-Place Mutation! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
