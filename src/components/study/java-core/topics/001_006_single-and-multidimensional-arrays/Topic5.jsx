import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import indexDemoCode from "./topic5_files/ArrayIndexingAndElementAccessDemo.java?raw";
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
          @keyframes glowIndex {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-ix {
            animation: glowIndex 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          0-Based Array Indexing &amp; Element Access Mechanics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master 0-based array indexing in Java (JLS §10.4): memory offset calculations (<code className="text-sky-300 font-mono">Address = Base + i × Size</code>), valid boundaries (<code className="text-emerald-400 font-mono">0 to length - 1</code>), in-place element mutations, dynamic index expressions, and student lab fee ledgers in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Why Array Indexing is Strictly 0-Based
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, array indexing starts at <code className="text-emerald-400 font-mono">0</code> because the index represents the <strong>memory offset</strong> from the base address of the array payload:
          </p>
          <p className="font-mono text-emerald-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            Address of arr[i] = Base_Address + ( i × element_size_in_bytes )
            <br />
            <span className="text-slate-400">// At index 0: Address = Base + (0 × 8B) = Base (Instant 0-offset fetch!)</span>
          </p>
          <p>
            <strong>Index Boundary Rule:</strong> For an array of length <code className="text-sky-300 font-mono">N</code>, the valid index range is strictly <code className="text-emerald-400 font-mono">0 &lt;= index &lt;= N - 1</code>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Lab Workstation Seat Mapping):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> occupies seat <code className="text-sky-300 font-mono">[0]</code> (₹12,000 fee), <strong>Tuhina</strong> occupies seat <code className="text-sky-300 font-mono">[1]</code> (₹15,000 fee), <strong>Abhronila</strong> occupies seat <code className="text-sky-300 font-mono">[2]</code> (₹18,000 fee), and <strong>Debangshu</strong> occupies last seat <code className="text-sky-300 font-mono">[3]</code> (<code className="text-emerald-400 font-mono">length - 1</code>) in Indian Rupees across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> 0-Based Offset Arithmetic &amp; Index Boundaries
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How memory addresses are calculated in $O(1)$ time and where boundaries lie:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="0-Based Array Indexing Diagram"
          >
            <defs>
              <linearGradient id="gradFirstEl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradMidEl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradLastEl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: First Element arr[0] */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradFirstEl)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. First: arr[0]</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Offset = 0 * 8B = 0B</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Addr = Base (0x7000)</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Swadeep &rarr; ₹12,000</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Base Pointer (0-Offset)
            </text>

            {/* Box 2: Middle Element arr[length / 2] */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradMidEl)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Midpoint: arr[len / 2]</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="335" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">Offset = 2 * 8B = 16B</text>
            <text x="335" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">Addr = Base + 16 (0x7010)</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Abhronila &rarr; ₹18,000</text>
            <text x="440" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Median Offset Access
            </text>

            {/* Box 3: Last Element arr[length - 1] */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradLastEl)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Last: arr[len - 1]</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">Offset = 3 * 8B = 24B</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="11" fontFamily="monospace">Addr = Base + 24 (0x7018)</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Debangshu &rarr; ₹14,000</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Upper Bound (len - 1)
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §10.4: Valid indices range strictly from 0 to (length - 1); indexing length throws ArrayIndexOutOfBoundsException.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Summary of Array Access Operations &amp; Time Complexities
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operation</th>
                <th className="p-3 font-semibold text-emerald-400">Java Syntax</th>
                <th className="p-3 font-semibold text-purple-400">Memory Action</th>
                <th className="p-3 font-semibold text-amber-400">Time Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Read First Element</td>
                <td className="p-3 text-slate-300">`double val = arr[0];`</td>
                <td className="p-3 text-emerald-300">Reads base memory address</td>
                <td className="p-3 text-emerald-400 font-bold">$O(1)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Read Last Element</td>
                <td className="p-3 text-slate-300">`double val = arr[arr.length - 1];`</td>
                <td className="p-3 text-emerald-300">Reads $(length-1)$ offset</td>
                <td className="p-3 text-emerald-400 font-bold">$O(1)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-amber-400 font-bold">In-Place Mutation</td>
                <td className="p-3 text-slate-300">`arr[i] += 1500.0;`</td>
                <td className="p-3 text-emerald-300">Writes directly to heap slot</td>
                <td className="p-3 text-emerald-400 font-bold">$O(1)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-rose-400 font-bold">Off-By-One Attempt</td>
                <td className="p-3 text-rose-300">`double val = arr[arr.length];`</td>
                <td className="p-3 text-rose-400">Triggers bounds violation trap</td>
                <td className="p-3 text-rose-400 font-bold">Throws Exception</td>
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
            ArrayIndexingAndElementAccessDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates 0-based element access, in-place fee mutations, dynamic index lookups, and midpoint calculation in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={indexDemoCode}
          title="ArrayIndexingAndElementAccessDemo.java"
          highlightLines={[23, 24, 25, 31, 37, 40]}
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
              <span>❌</span> Pitfall 1: Accessing `arr[arr.length]` (Off-by-One Error)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Because arrays are 0-indexed, an array of length 4 has indices 0, 1, 2, 3. Accessing <code className="text-rose-300 font-mono">arr[4]</code> causes an immediate <code className="text-rose-400 font-mono">ArrayIndexOutOfBoundsException</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use `arr.length - 1` for the Last Element
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always idiomatically access the final item using <code className="text-emerald-400 font-mono">arr[arr.length - 1]</code> rather than hardcoding numeric constants.
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
            🤔 <em>&ldquo;Why doesn&apos;t Java support negative indices like Python&apos;s `arr[-1]`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Direct Memory Hardware Efficiency! Python&apos;s <code className="text-slate-300 font-mono">arr[-1]</code> requires runtime conditional branch checking (<code className="text-slate-300 font-mono">if (idx &lt; 0) idx += len</code>). Java strictly uses direct hardware memory offsets for maximum raw throughput, making negative index checking redundant and throwing <code className="text-rose-400 font-bold">ArrayIndexOutOfBoundsException</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="0-Based Array Indexing FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 5: 0-Based Array Indexing & Access"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic5_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: 0-based indexing is pure memory offset math! Always remember: First element is arr[0], and last element is arr[arr.length - 1]. In Topic 6, we dive deep into the 'length' property vs String.length() method! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
