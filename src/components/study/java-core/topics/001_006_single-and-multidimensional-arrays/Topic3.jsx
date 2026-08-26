import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import instDemoCode from "./topic3_files/ArrayInstantiationAndDefaultsDemo.java?raw";
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
          @keyframes glowInst {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-in {
            animation: glowInst 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Array Instantiation with <code className="text-emerald-400 font-mono">&apos;new&apos;</code> &amp; Default Element Values
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master dynamic array instantiation in Java (JLS §10.3): runtime dimension sizing, JVM automatic type-safe zero-initialization, zero-length array objects (<code className="text-sky-300 font-mono">new int[0]</code>), <code className="text-rose-400 font-mono">NegativeArraySizeException</code> prevention, and student scholarship ledgers in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Dynamic Runtime Instantiation Mechanics
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The <code className="text-emerald-400 font-mono">new</code> keyword allocates physical contiguous memory on the Java Heap:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            int studentCount = 4; // Dynamic runtime variable
            <br />
            double[] scholarshipLedger = new double[studentCount];
          </p>
          <p>
            <strong>JVM Zero-Initialization Guarantee:</strong> When memory is allocated, the JVM executes bulk zeroing instructions, ensuring every primitive element starts at <code className="text-emerald-400 font-mono">0</code>, <code className="text-emerald-400 font-mono">0.0</code>, or <code className="text-amber-400 font-mono">false</code>, and every object slot starts at <code className="text-rose-400 font-mono">null</code>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Scholarship Fund):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> allocated dynamic scholarship accounts in Indian Rupees (<code className="text-emerald-400 font-semibold">₹5,000 baseline</code>). Dynamic instantiation ensured capacity matched the exact student roster size with zero uninitialized garbage memory across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 3-Step Array Instantiation Lifecycle
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the JVM processes dynamic sizing, heap memory allocation, and bulk zero-filling:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Array Instantiation Lifecycle Diagram"
          >
            <defs>
              <linearGradient id="gradEvalSize" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradHeapAlloc" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradZeroFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Runtime Size Evaluation */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradEvalSize)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Evaluate Dimension</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">int n = getCount();</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">new double[n];</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Guards if n &lt; 0 &rarr; Exception</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Dynamic Runtime Sizing
            </text>

            {/* Box 2: Heap Contiguous Allocation */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradHeapAlloc)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Heap Object Creation</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Header: 16 Bytes</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">length = n (final)</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Contiguous memory reserved</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              TLAB Fast Allocation
            </text>

            {/* Box 3: Bulk Zeroing */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradZeroFill)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Bulk Zero-Filling</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">double &rarr; 0.0</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="11" fontFamily="monospace">int &rarr; 0 | bool &rarr; false</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Object refs &rarr; null</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              JVM Type-Safe Guarantee
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §10.3: The &apos;new&apos; keyword evaluates dimensions dynamically, allocates heap space, and guarantees zero-filled defaults.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Summary of Array Default Values Across Data Types
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Data Type Category</th>
                <th className="p-3 font-semibold text-emerald-400">Example Types</th>
                <th className="p-3 font-semibold text-purple-400">Default Value Upon Instantiation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Integer Primitives</td>
                <td className="p-3 text-slate-400">byte, short, int, long</td>
                <td className="p-3 text-emerald-400 font-bold">0 (or 0L)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Floating-Point Primitives</td>
                <td className="p-3 text-slate-400">float, double</td>
                <td className="p-3 text-emerald-400 font-bold">0.0f / 0.0</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Boolean Primitive</td>
                <td className="p-3 text-slate-400">boolean</td>
                <td className="p-3 text-amber-400 font-bold">false</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Character Primitive</td>
                <td className="p-3 text-slate-400">char</td>
                <td className="p-3 text-purple-300 font-bold">&apos;\u0000&apos; (NUL)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Object Reference Types</td>
                <td className="p-3 text-slate-400">String, StudentRecord, Object</td>
                <td className="p-3 text-rose-400 font-bold">null</td>
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
            ArrayInstantiationAndDefaultsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program verifies dynamic array sizing via <code className="text-emerald-400 font-mono">new</code>, default zero-values across all Java types, and zero-length arrays.
        </p>

        <JavaFileLoader
          fileModule={instDemoCode}
          title="ArrayInstantiationAndDefaultsDemo.java"
          highlightLines={[22, 23, 30, 31, 32, 33, 34, 35, 36, 37, 38, 51]}
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
              <span>❌</span> Pitfall 1: Dereferencing Default Null Elements in Object Arrays
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">String[] arr = new String[5]; arr[0].toUpperCase();</code> throws a <code className="text-rose-400 font-mono">NullPointerException</code> because <code className="text-slate-300 font-mono">arr[0]</code> is <code className="text-rose-400 font-mono">null</code> until you explicitly assign an object!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use `new int[0]` Instead of `null` for Empty Return Values
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Return zero-length arrays <code className="text-emerald-400 font-mono">new int[0]</code> from methods when no data is found, allowing callers to iterate safely without null-checking.
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
            🤔 <em>&ldquo;Why can an array dimension be 0, but cannot be negative?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Cardinality vs Invalid Memory! An array of length 0 represents an empty set (0 elements, valid object header). A negative size is mathematically nonsensical and throws <code className="text-rose-400 font-bold">NegativeArraySizeException</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Array Instantiation FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 3: Array Instantiation with 'new' & Defaults"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic3_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The 'new' keyword dynamically creates your array on the Heap and zero-initializes every slot automatically. Remember: Object arrays default to null! In Topic 4, we explore Array Initialization Literals: int[] numbers = {10, 20, 30}! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
