import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import freqDemoCode from "./topic5_files/ArrayElementFrequencyCounterDemo.java?raw";
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
          @keyframes glowFreq {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-fq {
            animation: glowFreq 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Algorithmic Lab 5 · Hash &amp; Direct Tables
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Array Element Frequency Counter &amp; Direct Address Tables
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master high-performance element frequency counting in Java: Direct Address Frequency Arrays (<code className="text-emerald-400 font-mono">O(N) Time, O(K) Space, L1 CPU Cache fit</code>), <code className="text-sky-300 font-mono">LinkedHashMap</code> for sparse/negative keys, and in-place modulo counting.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Two Paradigms: Direct Address Array vs. Hash Table
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Choosing the right frequency counting data structure depends on the value range and sparsity of the elements:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">1. Direct Address Array (Bounded [0..K])</h3>
              <p className="text-emerald-300 mb-1">int[] freq = new int[maxVal + 1];</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Direct array index increment (<code className="text-emerald-400 font-mono">freq[num]++</code>). Eliminates object boxing, hashing, and collisions. Runs entirely in CPU L1 cache!
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">2. LinkedHashMap Table (Unbounded/Negative)</h3>
              <p className="text-sky-300 mb-1">map.put(val, map.getOrDefault(val, 0) + 1)</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Handles negative integers, sparse keys (e.g. <code className="text-slate-300 font-mono">101, 1000000000</code>), and strings safely in <code className="text-sky-300 font-mono">O(N)</code> time, preserving insertion order.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Grade Distribution Audit):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> counted student scores on a 0..10 scale using a direct address array (<code className="text-emerald-400 font-mono">score 8 appeared 4 times</code>), while <strong>Abhronila</strong> counted sparse course enrollment IDs (including negative refund tokens) using <code className="text-sky-300 font-mono">LinkedHashMap</code> flawlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Direct Address Array vs. LinkedHashMap Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing direct hardware memory indexing with dynamic bucket hash maps:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Frequency Counter Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradDirect" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradMap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Left Panel: Direct Address Array */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="225" y="55" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">1. DIRECT ADDRESS ARRAY (0..10 Marks)</text>

            <rect x="45" y="70" width="360" height="35" rx="4" fill="#022c22" />
            <text x="55" y="92" fill="#a7f3d0" fontSize="10" fontFamily="monospace">freq[6] = 1 student  | freq[7] = 3 students</text>

            <rect x="45" y="110" width="360" height="35" rx="4" fill="#022c22" />
            <text x="55" y="132" fill="#fef08a" fontSize="10" fontFamily="monospace" fontWeight="bold">freq[8] = 4 students (Mode: Peak frequency)</text>

            <rect x="45" y="150" width="360" height="35" rx="4" fill="#022c22" />
            <text x="55" y="172" fill="#a7f3d0" fontSize="10" fontFamily="monospace">freq[9] = 3 students | freq[10] = 2 students</text>

            <text x="225" y="215" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">Direct CPU Indexing | Fits in L1 Cache | O(1) Memory</text>

            {/* Right Panel: LinkedHashMap Table */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="650" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">2. LINKED HASH MAP (Sparse / Negative Keys)</text>

            <rect x="465" y="70" width="370" height="35" rx="4" fill="#082f49" />
            <text x="475" y="92" fill="#bae6fd" fontSize="10" fontFamily="monospace">Key: 101  &rarr; Count: 4 enrollments</text>

            <rect x="465" y="110" width="370" height="35" rx="4" fill="#082f49" />
            <text x="475" y="132" fill="#bae6fd" fontSize="10" fontFamily="monospace">Key: 204  &rarr; Count: 2 enrollments</text>

            <rect x="465" y="150" width="370" height="35" rx="4" fill="#082f49" />
            <text x="475" y="172" fill="#fca5a5" fontSize="10" fontFamily="monospace">Key: -50  &rarr; Count: 1 refund (Negative key safe!)</text>

            <text x="650" y="215" fill="#7dd3fc" fontSize="10" fontWeight="bold" textAnchor="middle">Preserves Insertion Order | Unbounded Range</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Use Direct Address Arrays for small bounded positive integers; use LinkedHashMap for negative, sparse, or string data.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Frequency Counting Approaches Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Technique</th>
                <th className="p-3 font-semibold text-emerald-400">Time Complexity</th>
                <th className="p-3 font-semibold text-purple-400">Space Complexity</th>
                <th className="p-3 font-semibold text-amber-400">Ideal Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Direct Address Array</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(N)$</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(K)$ bounded</td>
                <td className="p-3 text-slate-300 font-sans">Scores, student grades, ASCII chars ($K \le 10^6$)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">LinkedHashMap Table</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(N)$</td>
                <td className="p-3 text-purple-300 font-sans">$O(U)$ unique keys</td>
                <td className="p-3 text-slate-300 font-sans">Negative numbers, sparse IDs, Strings</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">In-Place Modulo $N$ Count</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(N)$</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(1)$ strictly in-place</td>
                <td className="p-3 text-slate-300 font-sans">Array size $N$ with elements in $[1..N]$ without extra RAM</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Character Array `int[26]`</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(N)$</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(1)$ (26 slots)</td>
                <td className="p-3 text-slate-300 font-sans">Anagram verification &amp; letter counting</td>
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
            ArrayElementFrequencyCounterDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program implements direct address arrays, LinkedHashMap tables, and in-place modulo frequency counting.
        </p>

        <JavaFileLoader
          fileModule={freqDemoCode}
          title="ArrayElementFrequencyCounterDemo.java"
          highlightLines={[20, 24, 34, 37, 49, 55, 60, 71, 83, 94]}
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
              <span>❌</span> Pitfall 1: Allocating Giant Frequency Arrays for Sparse Values
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If an array contains values like <code className="text-rose-300 font-mono">&#123;5, 1_000_000_000&#125;</code>, allocating <code className="text-rose-400 font-mono">new int[1_000_000_001]</code> requires 4 GB RAM and throws an <code className="text-rose-400 font-mono">OutOfMemoryError</code>. Always use a <code className="text-emerald-400 font-mono">HashMap</code> for sparse keys!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use `Map.getOrDefault()` for Concise Code
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Replace verbose <code className="text-slate-300 font-mono">if (!map.containsKey(k)) map.put(k, 1); else map.put(k, map.get(k)+1);</code> with the clean one-liner: <code className="text-emerald-400 font-mono">map.put(val, map.getOrDefault(val, 0) + 1);</code>.
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
            🤔 <em>&ldquo;How does an in-place modulo frequency counter store both the original number and its frequency count in the same integer slot?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Division &amp; Modulo Packing! In <code className="text-emerald-400 font-mono">val % N</code>, the remainder gives the original element, while in <code className="text-emerald-400 font-mono">val / N</code>, the quotient gives how many times $N$ was added (the frequency)!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Array Frequency Counter FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 5: Array Frequency Counters"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic5_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Direct address arrays are the foundation of counting sort and bucket sort. In Topic 6, we master Decimal to Binary & Hexadecimal Conversions without built-in methods! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
