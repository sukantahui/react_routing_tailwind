import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cloneDemoCode from "./topic17_files/ArrayCloningAndCopyingDemo.java?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions";

export default function Topic17() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowCopy {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-cp {
            animation: glowCopy 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 17
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Memory &amp; Cloning
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Cloning &amp; Copying Arrays: <code className="text-emerald-400 font-mono">System.arraycopy()</code>, <code className="text-sky-300 font-mono">clone()</code> &amp; <code className="text-purple-300 font-mono">Arrays.copyOf()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master array duplication and memory transfer in Java: native C++ <code className="text-emerald-400 font-mono">System.arraycopy()</code> hardware intrinsics, self-overlapping memory shifts, covariant <code className="text-sky-300 font-mono">arr.clone()</code>, <code className="text-purple-300 font-mono">Arrays.copyOf()</code> resizing/slicing, and student ledger backups in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Three Array Copying Mechanisms
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java offers three distinct tools for copying and cloning arrays:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">1. System.arraycopy()</h3>
              <p className="text-emerald-300 mb-2">System.arraycopy(s,0,d,0,len);</p>
              <p className="text-slate-300 font-sans leading-relaxed">
                Native C++ JVM intrinsic. Fastest direct memory transfer. Zero heap allocation. Safe for self-overlapping shifts.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">2. arr.clone()</h3>
              <p className="text-sky-300 mb-2">double[] c = orig.clone();</p>
              <p className="text-slate-300 font-sans leading-relaxed">
                Covariant return type (no cast needed). Allocates a new 1D array on Heap. Performs shallow copy on objects and 2D arrays.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">3. Arrays.copyOf()</h3>
              <p className="text-purple-300 mb-2">Arrays.copyOf(arr, newLen);</p>
              <p className="text-slate-300 font-sans leading-relaxed">
                High-level utility that resizes (pads zeros or truncates) and slices (<code className="text-purple-300 font-mono">copyOfRange</code>) by wrapping <code className="text-purple-300 font-mono">System.arraycopy</code>.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Fee Archive Backups):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> created historical fee backups in Indian Rupees (<code className="text-emerald-400 font-semibold">₹12,000 to ₹20,000</code>). Native <code className="text-emerald-400 font-mono">System.arraycopy()</code> executed in-place shifts, while <code className="text-sky-300 font-mono">Arrays.copyOf()</code> expanded batch capacities safely across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Native Memory Transfer vs. Heap Allocation Utilities
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How each copy mechanism transfers elements across CPU memory and JVM Heap:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Array Cloning and Copying Diagram"
          >
            <defs>
              <linearGradient id="gradSysCopy" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradClone" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradCopyOf" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: System.arraycopy */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradSysCopy)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. System.arraycopy()</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Native C++ JVM memmove</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="10">Zero Heap Allocation (Direct write)</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Self-overlapping shift safe</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Raw SIMD Block Transfer
            </text>

            {/* Box 2: arr.clone() */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradClone)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. arr.clone()</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="335" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">Covariant: double[] c</text>
            <text x="335" y="122" fill="#bae6fd" fontSize="10">Allocates new 1D array on Heap</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Independent primitive copy</text>
            <text x="440" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Covariant 1D Cloning
            </text>

            {/* Box 3: Arrays.copyOf */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradCopyOf)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Arrays.copyOf()</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">Resize &amp; Slicing Utility</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="10">Pads zeros or truncates length</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Wraps System.arraycopy internally</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Flexible Resizing &amp; Slicing
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              System.arraycopy() delivers maximum raw speed; arr.clone() provides concise 1D duplication; Arrays.copyOf() handles resizing.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Feature Comparison of Copying Methods
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Method</th>
                <th className="p-3 font-semibold text-emerald-400">Memory Allocation</th>
                <th className="p-3 font-semibold text-purple-400">Resizing Support</th>
                <th className="p-3 font-semibold text-amber-400">Self-Overlapping Shifts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-400 font-bold">`System.arraycopy()`</td>
                <td className="p-3 text-slate-300">None (Writes to pre-allocated array)</td>
                <td className="p-3 text-rose-400 font-sans">❌ Manual only</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ 100% Safe</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-400 font-bold">`arr.clone()`</td>
                <td className="p-3 text-emerald-300">Allocates new array of same size</td>
                <td className="p-3 text-rose-400 font-sans">❌ Fixed same length</td>
                <td className="p-3 text-rose-400 font-sans">❌ N/A (creates new array)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-400 font-bold">`Arrays.copyOf()`</td>
                <td className="p-3 text-emerald-300">Allocates new array of requested size</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ Automatic (Pads / Truncates)</td>
                <td className="p-3 text-rose-400 font-sans">❌ N/A (creates new array)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-amber-400 font-bold">`Arrays.copyOfRange()`</td>
                <td className="p-3 text-emerald-300">Allocates new array of slice length</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ Slicing $[from, to)$</td>
                <td className="p-3 text-rose-400 font-sans">❌ N/A (creates new array)</td>
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
            ArrayCloningAndCopyingDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates <code className="text-emerald-400 font-mono">System.arraycopy()</code>, self-overlapping left shifting, <code className="text-sky-300 font-mono">arr.clone()</code>, expansion, and range slicing in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={cloneDemoCode}
          title="ArrayCloningAndCopyingDemo.java"
          highlightLines={[25, 29, 34, 41, 42, 49]}
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
              <span>❌</span> Pitfall 1: Primitive Type Mismatch in `System.arraycopy()`
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Attempting to copy an <code className="text-rose-300 font-mono">int[]</code> array into a <code className="text-slate-300 font-mono">double[]</code> array using <code className="text-rose-300 font-mono">System.arraycopy()</code> throws <code className="text-rose-400 font-mono">ArrayStoreException</code>. Types must match exactly!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use `System.arraycopy()` for In-Array Element Shifting
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When removing or inserting elements inside an array (e.g. deleting an element at index $k$), use <code className="text-emerald-400 font-mono">System.arraycopy(arr, k+1, arr, k, len - k - 1)</code> for instantaneous native shifting.
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
            🤔 <em>&ldquo;Why doesn&apos;t `arr.clone()` throw `CloneNotSupportedException` on Java arrays?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Built-in JVM `Cloneable` Implementation! All Java arrays automatically implement the <code className="text-emerald-400 font-mono">java.lang.Cloneable</code> interface with a <code className="text-emerald-400 font-bold">public</code> override of <code className="text-emerald-400 font-mono">clone()</code>, eliminating the need for `try-catch` blocks!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Array Cloning & Copying FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 17: Array Cloning & Copying"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic17_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Master System.arraycopy() for peak performance in high-frequency systems, and use Arrays.copyOf() for clean resizing and slicing! In Topic 18, we dive deep into the crucial difference between Deep Copy and Shallow Copy! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
