import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import allocDemoCode from "./topic1_files/ArrayStackHeapMemoryAllocationDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

export default function Topic1() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowAlloc {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-al {
            animation: glowAlloc 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Array Memory Allocation: Stack References &amp; Dynamic Heap Objects
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master JVM memory architecture for arrays (JLS §10.2): Stack reference pointers, dynamic Heap object payloads, automatic type-safe zero-initialization, reference aliasing (<code className="text-emerald-300 font-mono">b = a</code>), and student workstation deposit ledgers in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Dual-Memory Architecture (Stack vs. Heap)
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When an array is declared and instantiated in Java, memory is split across two distinct JVM memory regions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-300 ml-2">
            <li>
              <strong className="text-sky-300 font-mono">Stack Memory:</strong> Holds the local reference variable (<code className="text-sky-300 font-mono">labDeposits</code>), which is a 4-byte or 8-byte pointer holding the memory address of the Heap object.
            </li>
            <li>
              <strong className="text-emerald-300 font-mono">Heap Memory:</strong> Holds the actual array object containing the 16-byte object header and contiguous type-initialized element slots.
            </li>
          </ul>
          <p>
            <strong>JVM Zero-Initialization Guarantee:</strong> The JVM guarantees that newly allocated array elements are automatically initialized to their default values (<code className="text-emerald-400 font-mono">0</code> for integers, <code className="text-emerald-400 font-mono">0.0</code> for doubles, <code className="text-amber-400 font-mono">false</code> for booleans, and <code className="text-rose-400 font-mono">null</code> for objects).
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Lab Deposit Ledger):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong>, <strong>Tuhina</strong>, and <strong>Abhronila</strong> deposited workstation security funds in Indian Rupees (<code className="text-emerald-400 font-semibold">₹5,000 to ₹6,000</code>). When <strong>Debangshu</strong> created an alias reference (<code className="text-sky-300 font-mono">aliasRef = labDeposits</code>) and modified a balance, both variables reflected the change because they shared the exact same Heap object across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Stack Reference vs. Heap Payload &amp; Reference Aliasing
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How stack pointers reference heap arrays and how aliasing shares underlying objects:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Array Stack Heap Allocation Diagram"
          >
            <defs>
              <linearGradient id="gradStackAl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradHeapAl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradDefaults" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Stack Frame Variables */}
            <rect x="30" y="40" width="220" height="180" rx="10" fill="url(#gradStackAl)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="140" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">STACK MEMORY</text>
            <rect x="45" y="80" width="190" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">labDeposits: 0x5BC1</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">aliasRef:    0x5BC1</text>
            <text x="55" y="142" fill="#fde68a" fontSize="10">Both point to SAME object!</text>
            <text x="140" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Stack Reference Pointers
            </text>

            {/* Box 2: Heap Object Payload */}
            <rect x="280" y="40" width="310" height="180" rx="10" fill="url(#gradHeapAl)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="435" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">HEAP ARRAY OBJECT (0x5BC1)</text>
            <rect x="295" y="80" width="280" height="80" rx="6" fill="#022c22" />
            <text x="305" y="100" fill="#fde68a" fontSize="10" fontFamily="monospace">Header: 16B (Mark + Klass + length=3)</text>
            
            <g transform="translate(305, 110)">
              <rect x="0" y="0" width="80" height="40" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
              <text x="40" y="18" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontFamily="monospace">[0] ₹7,500</text>
              <text x="40" y="32" fill="#94a3b8" fontSize="8" textAnchor="middle">Mutated!</text>

              <rect x="90" y="0" width="80" height="40" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
              <text x="130" y="18" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontFamily="monospace">[1] ₹5,000</text>
              <text x="130" y="32" fill="#94a3b8" fontSize="8" textAnchor="middle">Tuhina</text>

              <rect x="180" y="0" width="80" height="40" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
              <text x="220" y="18" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontFamily="monospace">[2] ₹6,000</text>
              <text x="220" y="32" fill="#94a3b8" fontSize="8" textAnchor="middle">Abhronila</text>
            </g>

            <text x="435" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Shared Heap Array Object
            </text>

            {/* Box 3: Default Zero Values */}
            <rect x="620" y="40" width="230" height="180" rx="10" fill="url(#gradDefaults)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="735" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">DEFAULT INITIAL VALUES</text>
            <rect x="635" y="80" width="200" height="80" rx="6" fill="#2e1065" />
            <text x="645" y="98" fill="#ddd6fe" fontSize="10" fontFamily="monospace">int, long    &rarr; 0</text>
            <text x="645" y="114" fill="#ddd6fe" fontSize="10" fontFamily="monospace">float, double &rarr; 0.0</text>
            <text x="645" y="130" fill="#ddd6fe" fontSize="10" fontFamily="monospace">boolean       &rarr; false</text>
            <text x="645" y="146" fill="#fca5a5" fontSize="10" fontFamily="monospace">Object ref    &rarr; null</text>
            <text x="735" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Zero-Fill Guarantee
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §10.2: Array reference variables on the Stack point to dynamically allocated, zero-initialized objects on the Heap.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> JVM Default Zero-Initialization Specification
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Array Type</th>
                <th className="p-3 font-semibold text-emerald-400">Default Value Per Element</th>
                <th className="p-3 font-semibold text-purple-400">Bit Pattern in Heap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`int[]`, `short[]`, `byte[]`, `long[]`</td>
                <td className="p-3 text-emerald-400 font-bold">`0` (or `0L`)</td>
                <td className="p-3 text-slate-400">All 0 bits (0x00)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`float[]`, `double[]`</td>
                <td className="p-3 text-emerald-400 font-bold">`0.0` (or `0.0f`)</td>
                <td className="p-3 text-slate-400">IEEE 754 +0.0 (All 0 bits)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`boolean[]`</td>
                <td className="p-3 text-amber-400 font-bold">`false`</td>
                <td className="p-3 text-slate-400">Byte 0x00</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`char[]`</td>
                <td className="p-3 text-purple-300 font-bold">`'\u0000'` (NUL)</td>
                <td className="p-3 text-slate-400">16-bit 0x0000</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`Object[]` (e.g. `String[]`, `Student[]`)</td>
                <td className="p-3 text-rose-400 font-bold">`null`</td>
                <td className="p-3 text-slate-400">Null pointer address (0x00000000)</td>
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
            ArrayStackHeapMemoryAllocationDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates Stack reference allocation, default zero initialization across types, and reference aliasing in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={allocDemoCode}
          title="ArrayStackHeapMemoryAllocationDemo.java"
          highlightLines={[21, 24, 38, 39, 40, 41, 48, 49]}
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
              <span>❌</span> Pitfall 1: Assuming `b = a` Creates an Independent Copy of the Array
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">int[] b = a;</code> creates an alias (copies the pointer). Modifying <code className="text-slate-300 font-mono">b[0]</code> changes <code className="text-slate-300 font-mono">a[0]</code>! To create an independent copy, use <code className="text-emerald-400 font-mono">a.clone()</code> or <code className="text-emerald-400 font-mono">Arrays.copyOf()</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Instantiate Individual Objects in Object Arrays
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Remember that <code className="text-sky-300 font-mono">StudentRecord[] roster = new StudentRecord[5];</code> creates 5 <code className="text-rose-400 font-mono">null</code> references! You must instantiate each individual object before invoking methods: <code className="text-emerald-400 font-mono">roster[0] = new StudentRecord(&quot;Swadeep&quot;, 101);</code>.
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
            🤔 <em>&ldquo;Why does `a == b` evaluate to false even if both arrays have the exact same numbers?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Reference Identity vs Content Equality! The <code className="text-rose-300 font-mono">==</code> operator on reference types compares Heap memory pointer addresses. Because <code className="text-sky-300 font-mono">new int[]&#123;1&#125;</code> and <code className="text-sky-300 font-mono">new int[]&#123;1&#125;</code> live at two different Heap addresses, <code className="text-rose-400 font-mono">a == b</code> is false. To check element content equality, always use <code className="text-emerald-400 font-bold">Arrays.equals(a, b)</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Array Memory Allocation FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 1: Array Memory Allocation (Stack & Heap)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic1_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Always visualize the Stack pointer pointing to the Heap object! Remember that b = a copies the pointer, not the array, and newly allocated arrays are guaranteed to be zero-filled by the JVM. In Topic 2, we explore Array Declaration Styles: int[] arr vs int arr[]! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
