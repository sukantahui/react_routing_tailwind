import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import jaggedDemoCode from "./topic16_files/JaggedArraysDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowJagged {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-jg {
            animation: glowJagged 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 16
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Advanced Architecture
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Jagged &amp; Ragged Arrays: Dynamic Row Allocations &amp; Memory Mechanics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master non-rectangular arrays in Java (JLS §10.1, §10.2): two-step dynamic row instantiation (<code className="text-emerald-400 font-mono">new Type[R][]</code>), row-specific boundary traversal (<code className="text-sky-300 font-mono">c &lt; matrix[r].length</code>), Pascal&apos;s triangle, memory footprint optimization, and campus batch management in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Understanding Jagged Arrays
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            A <strong>Jagged (or Ragged) Array</strong> is a 2D array where different rows have <strong>different column capacities</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">Step 1: Allocate Outer Container</h3>
              <p className="text-slate-300 mb-2">double[][] batches = new double[4][];</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Allocates an outer array of 4 reference pointers. All elements are initially <code className="text-rose-400 font-mono">null</code>!
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">Step 2: Allocate Custom Rows</h3>
              <p className="text-emerald-300 mb-1">batches[0] = new double[3]; // Barrackpore</p>
              <p className="text-emerald-300 mb-1">batches[1] = new double[2]; // Naihati</p>
              <p className="text-emerald-300 mb-1">batches[2] = new double[4]; // Shyamnagar</p>
              <p className="text-emerald-300">batches[3] = new double[1]; // Ichapur</p>
            </div>
          </div>

          <p>
            <strong>Memory Savings:</strong> Instead of allocating a fixed $4 \times 4 = 16$ rectangular block (wasting 6 unused memory slots), jagged allocation uses exactly $3 + 2 + 4 + 1 = 10$ elements!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore, Naihati, Shyamnagar &amp; Ichapur):</p>
            <p className="text-sm leading-relaxed">
              In our laboratory network, <strong>Swadeep</strong> (Barrackpore - 3 seats), <strong>Tuhina</strong> (Naihati - 2 seats), <strong>Abhronila</strong> (Shyamnagar - 4 seats), and <strong>Debangshu</strong> (Ichapur - 1 seat) tracked lab tuition in Indian Rupees (<code className="text-emerald-400 font-semibold">₹10,000 to ₹20,000</code>). Traversing with <code className="text-emerald-400 font-mono">c &lt; campusBatches[r].length</code> ensured seamless irregular row reporting without bounds errors.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Two-Step Jagged Allocation &amp; Variable Row Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the outer reference array points to rows of varying sizes on the Heap:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Jagged Array Diagram"
          >
            <defs>
              <linearGradient id="gradOuterJg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradJgRow1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradJgRow2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradJgRow3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradJgRow4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#be185d" />
              </linearGradient>
            </defs>

            {/* Box 1: Outer Array Container */}
            <rect x="30" y="30" width="220" height="210" rx="10" fill="url(#gradOuterJg)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="140" y="55" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">OUTER ARRAY (4 Rows)</text>
            <rect x="45" y="70" width="190" height="150" rx="6" fill="#0c4a6e" />
            <text x="55" y="95" fill="#bae6fd" fontSize="11" fontFamily="monospace">[0] → Barrackpore (len=3)</text>
            <text x="55" y="130" fill="#bae6fd" fontSize="11" fontFamily="monospace">[1] → Naihati (len=2)</text>
            <text x="55" y="165" fill="#bae6fd" fontSize="11" fontFamily="monospace">[2] → Shyamnagar (len=4)</text>
            <text x="55" y="200" fill="#bae6fd" fontSize="11" fontFamily="monospace">[3] → Ichapur (len=1)</text>

            {/* Row 1: 3 Elements */}
            <rect x="290" y="30" width="400" height="45" rx="8" fill="url(#gradJgRow1)" opacity="0.9" />
            <text x="305" y="55" fill="#ffffff" fontSize="11" fontWeight="bold">Row 0 (len 3):</text>
            <text x="400" y="55" fill="#d1fae5" fontSize="11" fontFamily="monospace">[0] ₹12k | [1] ₹15k | [2] ₹18k</text>

            {/* Row 2: 2 Elements */}
            <rect x="290" y="85" width="280" height="45" rx="8" fill="url(#gradJgRow2)" opacity="0.9" />
            <text x="305" y="110" fill="#ffffff" fontSize="11" fontWeight="bold">Row 1 (len 2):</text>
            <text x="400" y="110" fill="#ddd6fe" fontSize="11" fontFamily="monospace">[0] ₹13k | [1] ₹16k</text>

            {/* Row 3: 4 Elements */}
            <rect x="290" y="140" width="550" height="45" rx="8" fill="url(#gradJgRow3)" opacity="0.9" />
            <text x="305" y="165" fill="#ffffff" fontSize="11" fontWeight="bold">Row 2 (len 4):</text>
            <text x="400" y="165" fill="#fef3c7" fontSize="11" fontFamily="monospace">[0] ₹10k | [1] ₹12k | [2] ₹14k | [3] ₹16k</text>

            {/* Row 4: 1 Element */}
            <rect x="290" y="195" width="180" height="45" rx="8" fill="url(#gradJgRow4)" opacity="0.9" />
            <text x="305" y="220" fill="#ffffff" fontSize="11" fontWeight="bold">Row 3 (len 1):</text>
            <text x="400" y="220" fill="#fce7f3" fontSize="11" fontFamily="monospace">[0] ₹20k</text>

            {/* Bottom Caption */}
            <text x="440" y="270" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §10.2: Java jagged arrays store independent 1D row array objects of variable lengths on the Heap.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Jagged Arrays vs. Rectangular Matrices
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Feature</th>
                <th className="p-3 font-semibold text-emerald-400">Jagged / Ragged Array</th>
                <th className="p-3 font-semibold text-purple-400">Rectangular Array</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Row Length</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">Variable (`matrix[r].length` differs)</td>
                <td className="p-3 text-xs">Constant across all rows</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Instantiation</td>
                <td className="p-3 text-xs">Two-step (`new int[R][]` then custom rows)</td>
                <td className="p-3 text-xs">Single-step (`new int[R][C]`)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Memory Efficiency</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">High (Zero wasted padding cells)</td>
                <td className="p-3 text-xs text-rose-400">Wastes space on unused cells</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Loop Termination</td>
                <td className="p-3 text-xs font-mono text-emerald-400 font-bold">`c &lt; matrix[r].length`</td>
                <td className="p-3 text-xs font-mono">`c &lt; cols` or `matrix[0].length`</td>
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
            JaggedArraysDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates two-step jagged array instantiation, row-specific boundary traversals, and Pascal&apos;s triangle in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={jaggedDemoCode}
          title="JaggedArraysDemo.java"
          highlightLines={[22, 25, 26, 27, 28, 41, 43, 62, 63, 64]}
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
              <span>❌</span> Pitfall 1: Accessing Elements Before Allocating Row Arrays
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">int[][] a = new int[3][]; a[0][0] = 5;</code> throws <code className="text-rose-400 font-mono">NullPointerException</code> because <code className="text-slate-300 font-mono">a[0]</code> is <code className="text-rose-300 font-mono">null</code>. Always allocate the inner array first: <code className="text-emerald-400 font-mono">a[0] = new int[5];</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Always Bound Column Loops with `matrix[r].length`
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never use <code className="text-rose-300 font-mono">matrix[0].length</code> or a constant number to bound column loops in multidimensional arrays; always write <code className="text-emerald-400 font-mono">c &lt; matrix[r].length</code> to handle irregular row lengths gracefully.
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
            🤔 <em>&ldquo;Why can&apos;t you clone a Jagged Array using simple `arr.clone()`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Shallow Reference Pointer Copy! <code className="text-rose-300 font-mono">arr.clone()</code> only duplicates the outer array of row pointers; both copies continue pointing to the <em>same</em> inner 1D row objects on the Heap. A true deep copy requires iterating rows and cloning each row individually (<code className="text-emerald-400 font-bold">copy[r] = orig[r].clone();</code>)!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Jagged & Ragged Arrays FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 16: Jagged & Ragged Arrays"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic16_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Jagged arrays demonstrate the true power of Java's 'Array of Arrays' memory model. Always remember to allocate your inner rows before accessing elements, and loop with matrix[r].length! In Topic 17, we master Array Cloning and Copying: System.arraycopy(), clone(), and Arrays.copyOf()! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
