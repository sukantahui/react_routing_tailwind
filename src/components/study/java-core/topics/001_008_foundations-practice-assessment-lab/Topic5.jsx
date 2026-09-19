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
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Array Element Frequency Counter &amp; Direct Address Tables
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master high-performance element frequency counting in Java: Direct Address Frequency Arrays (<code className="text-emerald-400 font-mono">O(N) Time, O(K) Space, L1 CPU Cache fit</code>), <code className="text-sky-300 font-mono">LinkedHashMap</code> for sparse/negative keys, and in-place modulo counting.
        </p>
      </header>

      {/* Section 1: Problem Definition & Specifications */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
          <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
            <span>🎯</span> Problem Definition &amp; Clear Algorithmic Specifications
          </h2>
          <span className="text-xs font-semibold px-3 py-1 bg-sky-500/10 text-sky-300 border border-sky-500/30 rounded-full w-fit">
            Foundations Assessment Lab · Problem 5
          </span>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          In this algorithmic lab, you are required to count the occurrence frequency of elements in an array using <strong>pure Java Foundations constructs</strong>: implementing both a high-speed Direct Address Frequency Array for bounded values and a Visited Boolean Array for sparse values without relying on HashMaps.
        </p>

        {/* Two Columns / Cards for Problem 5A and Problem 5B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card A: Direct Address Frequency Array */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 border border-sky-500/30 p-5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-sky-950 text-sky-400 border border-sky-800">
                  Problem 5A
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                  O(N) Time · O(K) Space
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Direct Address Frequency Table (Bounded [0..K])
              </h3>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Given an array of integers whose values are bounded within <code className="text-sky-300 font-mono">[0..K]</code>, tally occurrences by using the element values directly as array indices in a pre-allocated primitive array <code className="text-emerald-400 font-mono">int[] freq = new int[K + 1]</code>.
              </p>

              {/* Specs Table */}
              <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3 space-y-2 text-xs">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Input:</span>
                  <span className="col-span-2 font-mono text-sky-300">int[] arr (size N, values in [0..K])</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Output:</span>
                  <span className="col-span-2 font-mono text-emerald-300">int[] freq (size K + 1)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Increment:</span>
                  <span className="col-span-2 text-slate-300">Single pass: <code className="text-sky-300">freq[arr[i]]++</code></span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Complexity:</span>
                  <span className="col-span-2 text-slate-300">O(N) Time · O(K) Auxiliary Memory</span>
                </div>
              </div>

              {/* Concrete Example */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Concrete Walkthrough:</p>
                <div className="p-3 bg-slate-900/95 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
                  <div className="text-slate-400">Input: arr = [1, 3, 1, 2, 3, 1], K = 3</div>
                  <div className="text-sky-300 text-[11px]">freq = new int[4] initialized to [0, 0, 0, 0]</div>
                  <div className="text-sky-300 text-[11px]">Iterating: freq[1]++ (x3), freq[2]++ (x1), freq[3]++ (x2)</div>
                  <div className="text-emerald-400 font-semibold pt-1 border-t border-slate-800 text-[11px]">
                    Output: freq = [0, 3, 1, 2] (Value 1: 3x, Value 2: 1x, Value 3: 2x)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Visited Boolean Array */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 border border-purple-500/30 p-5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-purple-950 text-purple-400 border border-purple-800">
                  Problem 5B
                </span>
                <span className="text-xs font-semibold text-purple-400 bg-purple-950/60 border border-purple-800/50 px-2 py-0.5 rounded">
                  O(N²) Time · O(N) Space · Zero Maps
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Visited Boolean Array (Arbitrary / Sparse Values)
              </h3>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Given an array with arbitrary or large numbers (e.g. course IDs 101, 102), count frequencies without HashMap. Use a boolean <code className="text-purple-300 font-mono">visited[]</code> array to skip already processed elements.
              </p>

              {/* Specs Table */}
              <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3 space-y-2 text-xs">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Input:</span>
                  <span className="col-span-2 font-mono text-purple-300">int[] arr (size N, arbitrary values)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Output:</span>
                  <span className="col-span-2 font-mono text-emerald-300">Printed frequency table without duplicates</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Skip Rule:</span>
                  <span className="col-span-2 text-slate-300"><code className="text-purple-300">if (visited[i]) continue;</code></span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Mark Rule:</span>
                  <span className="col-span-2 text-slate-300">Inner loop marks matches: <code className="text-purple-300">visited[j] = true</code></span>
                </div>
              </div>

              {/* Concrete Example */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Concrete Walkthrough:</p>
                <div className="p-3 bg-slate-900/95 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
                  <div className="text-slate-400">Input: [101, 102, 101, 103, 101, 102]</div>
                  <div className="text-purple-300 text-[11px]">i = 0 (101): count = 3, marks indices 2 &amp; 4 visited</div>
                  <div className="text-purple-300 text-[11px]">i = 1 (102): count = 2, marks index 5 visited</div>
                  <div className="text-purple-300 text-[11px]">i = 2 (101): visited is true → skips immediately</div>
                  <div className="text-emerald-400 font-semibold pt-1 border-t border-slate-800 text-[11px]">
                    Result: 101: 3x | 102: 2x | 103: 1x (Zero collections used!)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Conceptual Foundation */}
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
              <h3 className="text-sky-400 font-bold text-sm mb-2">2. Visited Boolean Array (Unbounded/Negative)</h3>
              <p className="text-sky-300 mb-1">boolean[] visited = new boolean[n];</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Handles negative integers and arbitrary sparse values safely in foundational Java without external Map libraries, tracking counted elements via a visited boolean array.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Grade Distribution Audit):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> counted student scores on a 0..10 scale using a direct address array (<code className="text-emerald-400 font-mono">score 8 appeared 4 times</code>), while <strong>Abhronila</strong> counted sparse course enrollment IDs (including negative refund tokens) using a <code className="text-sky-300 font-mono">visited boolean array</code> tracking mechanism.
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
            <text x="475" y="92" fill="#bae6fd" fontSize="10" fontFamily="monospace">Key: 101  → Count: 4 enrollments</text>

            <rect x="465" y="110" width="370" height="35" rx="4" fill="#082f49" />
            <text x="475" y="132" fill="#bae6fd" fontSize="10" fontFamily="monospace">Key: 204  → Count: 2 enrollments</text>

            <rect x="465" y="150" width="370" height="35" rx="4" fill="#082f49" />
            <text x="475" y="172" fill="#fca5a5" fontSize="10" fontFamily="monospace">Key: -50  → Count: 1 refund (Negative key safe!)</text>

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
                <td className="p-3 text-emerald-400 font-bold font-sans">O(N)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(K) bounded</td>
                <td className="p-3 text-slate-300 font-sans">Scores, student grades, ASCII chars (K ≤ 10⁶)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">LinkedHashMap Table</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(N)</td>
                <td className="p-3 text-purple-300 font-sans">O(U) unique keys</td>
                <td className="p-3 text-slate-300 font-sans">Negative numbers, sparse IDs, Strings</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">In-Place Modulo N Count</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(N)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(1) strictly in-place</td>
                <td className="p-3 text-slate-300 font-sans">Array size N with elements in [1..N] without extra RAM</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Character Array `int[26]`</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(N)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(1) (26 slots)</td>
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
          The following program implements direct address arrays, visited boolean array tables, and in-place modulo frequency counting.
        </p>

        <JavaFileLoader
          fileModule={freqDemoCode}
          title="ArrayElementFrequencyCounterDemo.java"
          highlightLines={[18, 22, 33, 38, 55, 60, 66, 73, 83, 97, 115]}
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
            👉 <strong>Hint:</strong> Division &amp; Modulo Packing! In <code className="text-emerald-400 font-mono">val % N</code>, the remainder gives the original element, while in <code className="text-emerald-400 font-mono">val / N</code>, the quotient gives how many times N was added (the frequency)!
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
