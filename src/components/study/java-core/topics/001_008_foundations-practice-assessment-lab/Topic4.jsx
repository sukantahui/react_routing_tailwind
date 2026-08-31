import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import dupDemoCode from "./topic4_files/DuplicateAndMissingNumbersDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowDup {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-dp {
            animation: glowDup 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Algorithmic Lab 4 · Bitwise &amp; Pointers
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Finding Duplicate &amp; Missing Numbers in Arrays
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master optimal algorithms for finding missing and duplicate values in Java: Bitwise XOR elimination (<code className="text-emerald-400 font-mono">O(N) time, O(1) space, zero overflow</code>), Floyd&apos;s Tortoise and Hare Cycle Detection, and Negative Index Marking for Set Mismatches.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Three Core Algorithmic Techniques
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Locating missing and duplicate values in arrays can be solved with three distinct mathematical and pointer strategies:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. Bitwise XOR Isolation</h3>
              <p className="text-sky-300 mb-1">xorFull ^ xorArray</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Leverages <code className="text-sky-300 font-mono">X ^ X = 0</code> to cancel out matching pairs, leaving only the missing number without integer overflow hazards.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">2. Floyd&apos;s Cycle Detection</h3>
              <p className="text-purple-300 mb-1">Tortoise &amp; Hare</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Treats values as linked list next-pointers to detect cycles in <code className="text-purple-300 font-mono">O(1)</code> space non-destructively.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">3. Negative Index Marking</h3>
              <p className="text-emerald-300 mb-1">nums[abs(val)-1] = -nums</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Uses the sign bit of array elements to flag visited indices in-place, solving Set Mismatches in two linear passes.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Roll ID Audits):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> used Bitwise XOR to find missing Roll ID <code className="text-emerald-400 font-mono">4</code> from <code className="text-sky-300 font-mono">[1, 2, 3, 5, 6, 7, 8, 9, 10]</code>, <strong>Tuhina</strong> located duplicate ID <code className="text-emerald-400 font-mono">3</code> via Floyd&apos;s cycle detection, and <strong>Abhronila</strong> identified the Set Mismatch pair <code className="text-emerald-400 font-semibold">[Duplicate: 2, Missing: 3]</code> in transaction logs.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Algorithmic Visualizations: Bitwise XOR &amp; Floyd&apos;s Cycle Detection
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing bitwise pair cancellation with pointer cycle convergence:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Duplicate and Missing Numbers Diagram"
          >
            <defs>
              <linearGradient id="gradXor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradFloyd" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Left Panel: Bitwise XOR Cancellation */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="225" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1. BITWISE XOR ISOLATION (Missing Number)</text>

            <rect x="45" y="70" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="92" fill="#bae6fd" fontSize="10" fontFamily="monospace">Full Range (1..5) : (1 ^ 2 ^ 3 ^ 4 ^ 5)</text>

            <rect x="45" y="110" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="132" fill="#bae6fd" fontSize="10" fontFamily="monospace">Array Elements     : (1 ^ 2 ^ 3 ^ 5)</text>

            <rect x="45" y="150" width="360" height="40" rx="4" fill="#022c22" />
            <text x="55" y="174" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold">XOR Sum: (1^1) ^ (2^2) ^ (3^3) ^ (5^5) ^ 4</text>

            <text x="225" y="215" fill="#fef08a" fontSize="11" fontWeight="bold" textAnchor="middle">Result = 0 ^ 0 ^ 0 ^ 0 ^ 4 = 4 (Missing Found!)</text>

            {/* Right Panel: Floyd's Cycle Detection */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="650" y="55" fill="#a78bfa" fontSize="13" fontWeight="bold" textAnchor="middle">2. FLOYD&apos;S CYCLE DETECTION (Duplicate: 3)</text>

            <rect x="465" y="70" width="370" height="40" rx="4" fill="#2e1065" />
            <text x="475" y="90" fill="#ddd6fe" fontSize="10" fontFamily="monospace">Index Graph: [3, 1, 3, 4, 2]</text>
            <text x="475" y="102" fill="#c4b5fd" fontSize="9">Index 0 → 3 → 4 → 2 → 3 (Cycle on 3!)</text>

            <rect x="465" y="120" width="370" height="35" rx="4" fill="#2e1065" />
            <text x="475" y="142" fill="#ddd6fe" fontSize="10" fontFamily="monospace">Phase 1: Slow (1x) &amp; Fast (2x) meet at Index 2</text>

            <rect x="465" y="165" width="370" height="40" rx="4" fill="#022c22" />
            <text x="475" y="185" fill="#a7f3d0" fontSize="10" fontFamily="monospace" fontWeight="bold">Phase 2: ptr1(0) &amp; ptr2(meet) intersect at value 3!</text>

            <text x="650" y="225" fill="#a78bfa" fontSize="9" textAnchor="middle">O(N) Time | O(1) Space Non-Destructive</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Bitwise XOR cancels duplicate pairs in O(1) space; Floyd&apos;s Tortoise and Hare locates cycle entries without mutating array memory.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Strategy Comparison Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Target Problem</th>
                <th className="p-3 font-semibold text-emerald-400">Optimal Technique</th>
                <th className="p-3 font-semibold text-purple-400">Time / Space Complexity</th>
                <th className="p-3 font-semibold text-amber-400">Key Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Single Missing Number</td>
                <td className="p-3 text-emerald-400 font-sans font-bold">Bitwise XOR Sum</td>
                <td className="p-3 text-slate-300 font-sans">$O(N)$ Time / $O(1)$ Space</td>
                <td className="p-3 text-emerald-300 font-sans">Immune to integer overflow</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Single Duplicate ($N+1$)</td>
                <td className="p-3 text-emerald-400 font-sans font-bold">Floyd&apos;s Cycle Detection</td>
                <td className="p-3 text-slate-300 font-sans">$O(N)$ Time / $O(1)$ Space</td>
                <td className="p-3 text-purple-300 font-sans">Zero array mutation (read-only)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Set Mismatch (Pair)</td>
                <td className="p-3 text-emerald-400 font-sans font-bold">Negative Index Marking</td>
                <td className="p-3 text-slate-300 font-sans">$O(N)$ Time / $O(1)$ Space</td>
                <td className="p-3 text-amber-300 font-sans">Locates both duplicate &amp; missing in 2 passes</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Multiple Missing Values</td>
                <td className="p-3 text-emerald-400 font-sans font-bold">`java.util.BitSet`</td>
                <td className="p-3 text-slate-300 font-sans">$O(N)$ Time / $O(N/8)$ Space</td>
                <td className="p-3 text-slate-300 font-sans">8x less memory than boolean array</td>
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
            DuplicateAndMissingNumbersDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program implements Bitwise XOR for missing numbers, Floyd&apos;s Tortoise and Hare for duplicates, and Negative Index Marking for Set Mismatch.
        </p>

        <JavaFileLoader
          fileModule={dupDemoCode}
          title="DuplicateAndMissingNumbersDemo.java"
          highlightLines={[21, 25, 30, 36, 47, 53, 58, 64, 76, 84, 91]}
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
              <span>❌</span> Pitfall 1: Forgetting to Restore Array Signs in Negative Marking
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If you use negative index marking, leaving the array in a corrupted negative state creates bugs for downstream caller methods. Always restore signs with <code className="text-emerald-400 font-mono">nums[i] = Math.abs(nums[i])</code> before returning!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Prefer Bitwise XOR Over Sum Formulas for Large $N$
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When finding missing numbers in large datasets ($N &gt; 100,000$), Bitwise XOR is inherently safe from 32-bit integer overflow and avoids the need to allocate 64-bit <code className="text-emerald-400 font-mono">long</code> variables.
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
            🤔 <em>&ldquo;Why is Floyd&apos;s Cycle Detection guaranteed to find a duplicate in an array of size $N+1$ with values $1..N$?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> The Pigeonhole Principle! Putting $N+1$ items into $N$ boxes means at least one box contains two items. In array indexing, this means two different indices point to the same next node, creating an inescapable cycle!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Duplicate & Missing Numbers FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 4: Duplicate & Missing Numbers"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic4_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Bitwise XOR and Floyd's cycle detection are legendary interview patterns. Master these three algorithms! In Topic 5, we tackle Algorithmic Problem 5: Array Element Frequency Counter using Frequency Arrays! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
