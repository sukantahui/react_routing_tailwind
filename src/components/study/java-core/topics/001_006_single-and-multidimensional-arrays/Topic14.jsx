import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import matrixDemoCode from "./topic14_files/TwoDimensionalArraysAndMatrixDemo.java?raw";
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
          @keyframes glowMatrix {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-mx {
            animation: glowMatrix 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 14
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Multidimensional Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Two-Dimensional (2D) Arrays: Declaration, Heap Architecture &amp; Matrix Visualization
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master 2D arrays in Java (JLS §10.1, §10.2): understanding the &ldquo;Array of Arrays&rdquo; reference pointer model on the Heap, row-major grid traversals (<code className="text-emerald-400 font-mono">matrix[r][c]</code>), <code className="text-sky-300 font-mono">Arrays.deepToString()</code> formatting, and multi-campus fee matrices in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The &ldquo;Array of Arrays&rdquo; Memory Model
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Unlike C/C++ where 2D arrays occupy a single contiguous block of memory, Java represents 2D arrays as an <strong>array of reference pointers</strong>:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
            <li>
              <strong className="text-emerald-400 font-mono">Outer Array:</strong> Stored on the Heap, containing reference addresses (<code className="text-sky-300 font-mono">matrix[0]</code>, <code className="text-sky-300 font-mono">matrix[1]</code>, <code className="text-sky-300 font-mono">matrix[2]</code>). Its length is the <strong>number of rows</strong> (<code className="text-emerald-400 font-mono">matrix.length</code>).
            </li>
            <li>
              <strong className="text-sky-300 font-mono">Inner 1D Arrays:</strong> Independent heap objects representing each row. Their lengths are the <strong>column counts</strong> (<code className="text-sky-300 font-mono">matrix[r].length</code>).
            </li>
            <li>
              <strong className="text-purple-300 font-mono">Row Swapping in $O(1)$ Time:</strong> Swapping two entire rows is as simple as swapping their reference pointers with zero element copying!
            </li>
          </ul>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore, Naihati &amp; Shyamnagar Multi-Campus Matrix):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> structured lab workstations into a $3 \times 4$ campus matrix in Indian Rupees (<code className="text-emerald-400 font-semibold">₹11,000 to ₹19,000</code>). Nested loops calculated individual hall revenues and cumulative institutional earnings across West Bengal.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> 2D Array Heap Architecture &amp; Row Pointer Dereferencing
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the outer reference array points to independent 1D row arrays on the JVM Heap:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="2D Array Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradOuter2D" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradRow1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradRow2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradRow3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Outer Array Object (Rows) */}
            <rect x="30" y="40" width="220" height="180" rx="10" fill="url(#gradOuter2D)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="140" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">OUTER ARRAY (Rows)</text>
            <rect x="45" y="80" width="190" height="120" rx="6" fill="#0c4a6e" />
            <text x="55" y="105" fill="#bae6fd" fontSize="11" fontFamily="monospace">[0] → 0x10A0 (Barrackpore)</text>
            <text x="55" y="135" fill="#bae6fd" fontSize="11" fontFamily="monospace">[1] → 0x20B0 (Naihati)</text>
            <text x="55" y="165" fill="#bae6fd" fontSize="11" fontFamily="monospace">[2] → 0x30C0 (Shyamnagar)</text>
            <text x="140" y="195" fill="#f0f9ff" fontSize="10" textAnchor="middle" fontWeight="bold">
              matrix.length = 3 Rows
            </text>

            {/* Row 1 Object */}
            <rect x="300" y="40" width="550" height="50" rx="8" fill="url(#gradRow1)" opacity="0.9" />
            <text x="315" y="60" fill="#ffffff" fontSize="11" fontWeight="bold">Row [0] (0x10A0):</text>
            <text x="440" y="60" fill="#d1fae5" fontSize="11" fontFamily="monospace">[0] ₹12k | [1] ₹15k | [2] ₹18k | [3] ₹14k</text>
            <text x="780" y="60" fill="#a7f3d0" fontSize="10">len = 4</text>

            {/* Row 2 Object */}
            <rect x="300" y="105" width="550" height="50" rx="8" fill="url(#gradRow2)" opacity="0.9" />
            <text x="315" y="125" fill="#ffffff" fontSize="11" fontWeight="bold">Row [1] (0x20B0):</text>
            <text x="440" y="125" fill="#ddd6fe" fontSize="11" fontFamily="monospace">[0] ₹13k | [1] ₹16k | [2] ₹19k | [3] ₹15k</text>
            <text x="780" y="125" fill="#ddd6fe" fontSize="10">len = 4</text>

            {/* Row 3 Object */}
            <rect x="300" y="170" width="550" height="50" rx="8" fill="url(#gradRow3)" opacity="0.9" />
            <text x="315" y="190" fill="#ffffff" fontSize="11" fontWeight="bold">Row [2] (0x30C0):</text>
            <text x="440" y="190" fill="#fef3c7" fontSize="11" fontFamily="monospace">[0] ₹11k | [1] ₹14k | [2] ₹17k | [3] ₹13k</text>
            <text x="780" y="190" fill="#fde68a" fontSize="10">len = 4</text>

            {/* Bottom Caption */}
            <text x="440" y="260" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §10.1: Java 2D arrays are an outer array of reference pointers pointing to independent 1D row array objects on the Heap.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> 2D Matrix Terminology &amp; Key Properties
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Concept / Operation</th>
                <th className="p-3 font-semibold text-emerald-400">Java Code Expression</th>
                <th className="p-3 font-semibold text-purple-400">Result / Behavior</th>
                <th className="p-3 font-semibold text-amber-400">Time Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Total Row Count</td>
                <td className="p-3 text-slate-300">`matrix.length`</td>
                <td className="p-3 text-emerald-300">Outer array element count</td>
                <td className="p-3 text-emerald-400 font-bold">$O(1)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Column Count in Row $r$</td>
                <td className="p-3 text-slate-300">`matrix[r].length`</td>
                <td className="p-3 text-emerald-300">Length of 1D array at row $r$</td>
                <td className="p-3 text-emerald-400 font-bold">$O(1)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-300 font-bold">Row Pointer Swap</td>
                <td className="p-3 text-slate-300">`swap(matrix[0], matrix[1])`</td>
                <td className="p-3 text-emerald-300">Swaps reference pointers in Heap</td>
                <td className="p-3 text-emerald-400 font-bold">$O(1)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-amber-300 font-bold">Full Matrix Traversal</td>
                <td className="p-3 text-slate-300">`for (r) for (c) ...`</td>
                <td className="p-3 text-emerald-300">Visits all $R \times C$ elements</td>
                <td className="p-3 text-amber-400 font-bold">$O(R \times C)$</td>
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
            TwoDimensionalArraysAndMatrixDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates 2D array instantiation, literal grid population, formatted table visualization, and <code className="text-sky-300 font-mono">Arrays.deepToString()</code> output in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={matrixDemoCode}
          title="TwoDimensionalArraysAndMatrixDemo.java"
          highlightLines={[22, 23, 24, 30, 31, 32, 33, 44, 45, 46, 57]}
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
              <span>❌</span> Pitfall 1: Using `Arrays.toString()` on a 2D Array
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Calling <code className="text-rose-300 font-mono">Arrays.toString(matrix)</code> prints an array of hashcodes (<code className="text-slate-300 font-mono">[[I@7b...</code>) because it only prints the outer array&apos;s pointer addresses. Always use <code className="text-emerald-400 font-mono">Arrays.deepToString(matrix)</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use `matrix[r].length` for Column Loops
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never assume all rows have the same length as row 0. Always write the inner loop condition as <code className="text-emerald-400 font-mono">c &lt; matrix[r].length</code> to ensure complete safety across regular and jagged matrices.
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
            🤔 <em>&ldquo;Why is `int[][] a = new int[3][];` completely legal, but `int[][] a = new int[][4];` a compile error?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Top-Level Memory Allocation! The JVM must know how many references to allocate in the outer array object first. The inner 1D arrays can be allocated dynamically later, but the outer container cannot exist without a defined size!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="2D Arrays & Matrix FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 14: 2D Arrays & Matrix Visualization"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic14_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: 2D arrays open up the world of tables, matrices, and grids. Remember: a 2D array in Java is an array of references to 1D arrays on the Heap! In Topic 15, we conquer Matrix Operations: Addition, Transpose, and Multiplication! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
