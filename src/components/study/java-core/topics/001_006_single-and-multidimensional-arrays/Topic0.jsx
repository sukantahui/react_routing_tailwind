import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import arrayDemoCode from "./topic0_files/ArrayFundamentalsAndFixedSizeDemo.java?raw";
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
          @keyframes glowArray {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-arr {
            animation: glowArray 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          What is an Array? Fixed-Size Reference Types in Java
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the foundational linear data structure in Java (JLS §10): homogeneous element containment, fixed-size heap allocation, first-class object nature (<code className="text-sky-300 font-mono">java.lang.Object</code> inheritance), <code className="text-emerald-400 font-mono">O(1)</code> contiguous address mathematics, and fixed semester lab seat registrations in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Array as a First-Class Object
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, an <strong>Array</strong> is a container object that holds a <em>fixed number</em> of values of a single <em>homogeneous type</em>:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            double[] studentTuitionFees = new double[4]; // Contiguous Heap Object
            <br />
            studentTuitionFees[0] = 12000.0; // Swadeep
            <br />
            studentTuitionFees[1] = 15000.0; // Tuhina
          </p>
          <p>
            <strong>First-Class Objects:</strong> Unlike C/C++ where arrays are mere memory pointers, Java arrays are true reference objects that inherit directly from <code className="text-purple-300 font-mono">java.lang.Object</code>, implement <code className="text-sky-300 font-mono">Cloneable</code> and <code className="text-sky-300 font-mono">Serializable</code>, and store their own immutable <code className="text-amber-300 font-mono">public final int length</code> field!
          </p>
          <p>
            <strong>Why Fixed-Size?</strong> Allocating contiguous memory blocks enables the CPU to calculate the exact address of <code className="text-emerald-400 font-mono">arr[i]</code> in instantaneous <code className="text-sky-300 font-mono">O(1)</code> constant time: <code className="text-slate-300 font-mono">Address = Base + (i × 8 bytes)</code>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Fixed Batch Seat Registration):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> registered for a 4-seat advanced Java batch in Indian Rupees (<code className="text-emerald-400 font-semibold">₹12,000 to ₹18,000</code>). Because the batch array has fixed capacity (<code className="text-sky-300 font-mono">new double[4]</code>), enrolling a 5th student (Pritam) requires allocating a new larger array across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Stack Reference Pointer &amp; Contiguous Heap Object Layout
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How array references on the Stack point to contiguous memory objects on the Heap:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Array Memory Layout Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradStackRef" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradHeapObj" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradMathOffset" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Stack Reference */}
            <rect x="30" y="40" width="200" height="180" rx="10" fill="url(#gradStackRef)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="130" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">STACK MEMORY</text>
            <rect x="45" y="80" width="170" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="105" fill="#bae6fd" fontSize="11" fontFamily="monospace">double[] fees</text>
            <text x="55" y="125" fill="#a7f3d0" fontSize="10">Points to Heap: 0x7FA2</text>
            <text x="55" y="145" fill="#e0f2fe" fontSize="10">Local reference variable</text>
            <text x="130" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Stack Reference Pointer
            </text>

            {/* Box 2: Heap Object Container (4 contiguous slots) */}
            <rect x="260" y="40" width="340" height="180" rx="10" fill="url(#gradHeapObj)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="430" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">HEAP: Contiguous Array Object (0x7FA2)</text>
            <rect x="275" y="80" width="310" height="80" rx="6" fill="#022c22" />
            <text x="285" y="100" fill="#fde68a" fontSize="10" fontFamily="monospace">Header: 16B (Mark + Klass + length=4)</text>
            
            {/* 4 slots */}
            <g transform="translate(285, 110)">
              <rect x="0" y="0" width="70" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <text x="35" y="18" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontFamily="monospace">[0] ₹12k</text>
              <text x="35" y="32" fill="#94a3b8" fontSize="8" textAnchor="middle">Swadeep</text>

              <rect x="75" y="0" width="70" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <text x="110" y="18" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontFamily="monospace">[1] ₹15k</text>
              <text x="110" y="32" fill="#94a3b8" fontSize="8" textAnchor="middle">Tuhina</text>

              <rect x="150" y="0" width="70" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <text x="185" y="18" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontFamily="monospace">[2] ₹18k</text>
              <text x="185" y="32" fill="#94a3b8" fontSize="8" textAnchor="middle">Abhronila</text>

              <rect x="225" y="0" width="70" height="40" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <text x="260" y="18" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontFamily="monospace">[3] ₹14k</text>
              <text x="260" y="32" fill="#94a3b8" fontSize="8" textAnchor="middle">Debangshu</text>
            </g>

            <text x="430" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Contiguous Sequential Memory
            </text>

            {/* Box 3: O(1) Address Calculation */}
            <rect x="630" y="40" width="220" height="180" rx="10" fill="url(#gradMathOffset)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="740" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">O(1) Address Math</text>
            <rect x="645" y="80" width="190" height="80" rx="6" fill="#2e1065" />
            <text x="655" y="102" fill="#ddd6fe" fontSize="10" fontFamily="monospace">Addr = Base + i*Size</text>
            <text x="655" y="122" fill="#ddd6fe" fontSize="10">i=2 &rarr; Base + 2*8B</text>
            <text x="655" y="142" fill="#a7f3d0" fontSize="10">Instant 0-overhead fetch</text>
            <text x="740" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              O(1) Random Access
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §10: Arrays in Java are reference objects allocated in Heap memory with fixed, immutable capacity.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Java Arrays vs. Dynamic Collections (ArrayList)
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Feature</th>
                <th className="p-3 font-semibold text-emerald-400">Raw Array (`double[]`)</th>
                <th className="p-3 font-semibold text-purple-400">Dynamic Collection (`ArrayList&lt;Double&gt;`)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Size Resizability</td>
                <td className="p-3 text-xs text-rose-400 font-bold">Fixed (Immutable length)</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">Dynamic (Auto-expanding)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Primitive Support</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">✓ Native primitives (No overhead)</td>
                <td className="p-3 text-xs text-rose-400">❌ Objects only (Requires Autoboxing)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Memory &amp; CPU Cache Locality</td>
                <td className="p-3 text-xs text-emerald-400 font-bold">Maximum (Contiguous 64B cache lines)</td>
                <td className="p-3 text-xs">Lower (Scattered heap pointer dereferencing)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-slate-300">Length Syntax</td>
                <td className="p-3 text-xs font-mono">arr.length (Field property)</td>
                <td className="p-3 text-xs font-mono">list.size() (Method call)</td>
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
            ArrayFundamentalsAndFixedSizeDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program demonstrates fixed-size array allocation, object class verification, and length immutability in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={arrayDemoCode}
          title="ArrayFundamentalsAndFixedSizeDemo.java"
          highlightLines={[21, 24, 25, 26, 27, 36, 37, 43]}
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
              <span>❌</span> Pitfall 1: Confusing `final` Array Reference with Element Immutability
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">final double[] fees = new double[4];</code> prevents reassigning <code className="text-slate-300 font-mono">fees = new double[10];</code>, but the elements <code className="text-emerald-400 font-mono">fees[0] = 999.0;</code> remain completely mutable!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Return Empty Arrays (`new int[0]`) Instead of `null`
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Adhere to Effective Java Item 54: Always return empty arrays rather than <code className="text-rose-300 font-mono">null</code> to prevent <code className="text-rose-400 font-mono">NullPointerException</code> in caller client code.
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
            🤔 <em>&ldquo;Why is an array length accessed as `arr.length` without parentheses, but `str.length()` has parentheses?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Field Property vs Method Call! In Java, <code className="text-emerald-400 font-bold">length</code> on an array is a direct, immutable <code className="text-emerald-300 font-mono">public final int</code> field allocated inside the array&apos;s 16-byte object header. On <code className="text-purple-300 font-mono">String</code>, <code className="text-purple-300 font-mono">length()</code> is a method that inspects internal byte coder flags!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Array Fundamentals FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 0: Array Fundamentals & Fixed-Size Reference Nature"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic0_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="Welcome to Module 001_006 (Arrays and Multidimensional Arrays)! Swadeep, Tuhina, Abhronila, and Debangshu: Arrays are the fastest linear data structures in Java because of contiguous Heap memory math. Remember: Arrays are objects inheriting java.lang.Object! In Topic 1, we dive into Stack vs Heap Memory Allocation for arrays! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
