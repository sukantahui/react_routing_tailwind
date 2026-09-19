import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import sieveDemoCode from "./topic1_files/SieveOfEratosthenesPrimeDemo.java?raw";
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
          @keyframes glowSieve {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-sv {
            animation: glowSieve 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Algorithmic Lab 1 · Prime Generator
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Prime Number Generation using Sieve of Eratosthenes
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the optimal prime generation algorithm in Java: mathematical principles of prime sieving, achieving <code className="text-emerald-400 font-mono">O(N log(log N))</code> near-linear time, the critical <code className="text-sky-300 font-mono">p * p</code> inner-loop start optimization, <code className="text-purple-300 font-mono">int[]</code> bit array 32x memory reduction, and student cryptographic token generation in Barrackpore.
        </p>
      </header>

      {/* Section 1: Problem Definition & Specifications */}
      <section className="space-y-6 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700/60 pb-4">
          <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
            <span>🎯</span> Problem Definition &amp; Clear Algorithmic Specifications
          </h2>
          <span className="text-xs font-semibold px-3 py-1 bg-sky-500/10 text-sky-300 border border-sky-500/30 rounded-full w-fit">
            Foundations Assessment Lab · Problem 1
          </span>
        </div>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          In this algorithmic lab, you are required to generate prime numbers up to a specified upper bound <code className="text-sky-300 font-mono">N</code> using the ancient mathematical algorithm of the <strong>Sieve of Eratosthenes</strong>. You must implement both a canonical boolean table and a memory-efficient bit-packed array using Java Foundations constructs.
        </p>

        {/* Two Columns / Cards for Problem 1A and Problem 1B */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card A: Classical Boolean Sieve */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 border border-sky-500/30 p-5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-sky-950 text-sky-400 border border-sky-800">
                  Problem 1A
                </span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                  O(N log(log N)) Time · O(N) Space
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Classical Boolean Sieve of Eratosthenes
              </h3>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Given an integer limit <code className="text-sky-300 font-mono">N &ge; 2</code>, construct a boolean array of size <code className="text-sky-300 font-mono">N + 1</code> where index <code className="text-sky-300 font-mono">i</code> represents whether <code className="text-sky-300 font-mono">i</code> is prime. Eliminate multiples iteratively starting at <code className="text-emerald-400 font-mono">p &times; p</code>.
              </p>

              {/* Specs Table */}
              <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3 space-y-2 text-xs">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Input:</span>
                  <span className="col-span-2 font-mono text-sky-300">int limit (e.g. N = 100,000)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Output:</span>
                  <span className="col-span-2 font-mono text-emerald-300">boolean[] isPrime (size N + 1)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Key Rule:</span>
                  <span className="col-span-2 text-slate-300">Outer loop up to <code className="text-sky-300">p * p &lt;= N</code>; inner step <code className="text-sky-300">i += p</code></span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Constraints:</span>
                  <span className="col-span-2 text-slate-300">No collections; basic loop initialization</span>
                </div>
              </div>

              {/* Concrete Example */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Concrete Example Walkthrough (N = 30):</p>
                <div className="p-3 bg-slate-900/95 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
                  <div className="text-slate-400">1. Initialize boolean array [0..30] with true, indices 0 &amp; 1 = false.</div>
                  <div className="text-sky-300 text-[11px]">p = 2: Mark 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30 false</div>
                  <div className="text-sky-300 text-[11px]">p = 3: Start at 3*3=9; Mark 9, 12, 15, 18, 21, 24, 27, 30 false</div>
                  <div className="text-sky-300 text-[11px]">p = 5: Start at 5*5=25; Mark 25 false (stop, since 7*7 &gt; 30)</div>
                  <div className="text-emerald-400 font-semibold pt-1 border-t border-slate-800 text-[11px]">
                    Primes Found (10): 2, 3, 5, 7, 11, 13, 17, 19, 23, 29
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Bit-Packed Primitive Sieve */}
          <div className="flex flex-col justify-between rounded-xl bg-slate-950/70 border border-purple-500/30 p-5 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-purple-950 text-purple-400 border border-purple-800">
                  Problem 1B
                </span>
                <span className="text-xs font-semibold text-purple-400 bg-purple-950/60 border border-purple-800/50 px-2 py-0.5 rounded">
                  O(N log(log N)) Time · O(N/32) Space
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Bit-Packed Primitive Array Sieve
              </h3>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                Pack 32 boolean flags into each 32-bit primitive <code className="text-purple-300 font-mono">int</code> using bitwise shifts (<code className="text-purple-300 font-mono">p &gt;&gt; 5</code> and <code className="text-purple-300 font-mono">1 &lt;&lt; (p &amp; 31)</code>) to achieve a 32x memory reduction for massive ranges.
              </p>

              {/* Specs Table */}
              <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3 space-y-2 text-xs">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Input:</span>
                  <span className="col-span-2 font-mono text-purple-300">int limit (large N up to 10⁸)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Output:</span>
                  <span className="col-span-2 font-mono text-emerald-300">int[] compositeBits (size (N &gt;&gt; 5) + 1)</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Bit Formula:</span>
                  <span className="col-span-2 text-slate-300">Set: <code className="text-purple-300">arr[p&gt;&gt;5] |= (1&lt;&lt;(p&amp;31))</code></span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-slate-400 font-semibold">Query:</span>
                  <span className="col-span-2 text-slate-300">Prime if <code className="text-purple-300">(arr[p&gt;&gt;5] &amp; (1&lt;&lt;(p&amp;31))) == 0</code></span>
                </div>
              </div>

              {/* Concrete Example */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Concrete Bit Masking Trace:</p>
                <div className="p-3 bg-slate-900/95 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
                  <div className="text-slate-400">Word Index: p &gt;&gt; 5 (p / 32) | Bit Index: p &amp; 31 (p % 32)</div>
                  <div className="text-purple-300 text-[11px]">Number 4: word 4&gt;&gt;5 = 0, bit 4&amp;31 = 4 → word[0] |= (1 &lt;&lt; 4)</div>
                  <div className="text-purple-300 text-[11px]">Number 35: word 35&gt;&gt;5 = 1, bit 35&amp;31 = 3 → word[1] |= (1 &lt;&lt; 3)</div>
                  <div className="text-emerald-400 font-semibold pt-1 border-t border-slate-800 text-[11px]">
                    RAM Efficiency: 100M numbers fit in ~12.5 MB instead of 100 MB!
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
          <span>📖</span> How the Sieve of Eratosthenes Works
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Instead of testing every number individually for divisibility (<code className="text-rose-400 font-mono">O(N &radic;N)</code>), the <strong>Sieve of Eratosthenes</strong> eliminates composite numbers in multiples:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">1. Array Initialization</h3>
              <p className="text-emerald-300 mb-1">boolean[] isPrime = new boolean[N + 1];</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Fill with <code className="text-emerald-400 font-mono">true</code>; set indices 0 and 1 to <code className="text-rose-400 font-mono">false</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">2. Outer Loop Limit: &radic;N</h3>
              <p className="text-sky-300 mb-1">for (int p = 2; p * p &lt;= N; p++)</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                If <code className="text-sky-300 font-mono">isPrime[p]</code> is true, it is prime. Only need to check up to <code className="text-sky-300 font-mono">&radic;N</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">3. Inner Loop: Start at p * p</h3>
              <p className="text-purple-300 mb-1">for (int m = p * p; m &lt;= N; m += p)</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Mark composites starting at <code className="text-purple-300 font-mono">p * p</code> because smaller multiples were already marked by earlier primes.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Token Generation Benchmark):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> generated all primes up to 100,000. The Sieve generated <code className="text-emerald-400 font-semibold">9,592 primes</code> in just a few milliseconds, outperforming trial division by over 10x, while our primitive <code className="text-purple-300 font-mono">int[]</code> bit-array implementation reduced memory by 87.5%!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Sieve Elimination Grid: Marking Multiples [1..30]
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Visualizing the systematic elimination of composites by prime multiples:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 280"
            className="w-full h-auto"
            aria-label="Sieve of Eratosthenes Grid Elimination Diagram"
          >
            <defs>
              <linearGradient id="gradPrimeSurv" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Header Legend */}
            <rect x="30" y="20" width="820" height="35" rx="6" fill="#1e293b" />
            <text x="50" y="42" fill="#94a3b8" fontSize="11">LEGEND:</text>
            <circle cx="130" cy="38" r="7" fill="#10b981" />
            <text x="145" y="42" fill="#a7f3d0" fontSize="10">Prime Numbers</text>
            <rect x="260" y="31" width="14" height="14" rx="2" fill="#ef4444" opacity="0.4" />
            <text x="282" y="42" fill="#fca5a5" fontSize="10">Multiples of 2 (p=2)</text>
            <rect x="420" y="31" width="14" height="14" rx="2" fill="#38bdf8" opacity="0.4" />
            <text x="442" y="42" fill="#bae6fd" fontSize="10">Multiples of 3 (p=3)</text>
            <rect x="580" y="31" width="14" height="14" rx="2" fill="#a855f7" opacity="0.4" />
            <text x="602" y="42" fill="#e9d5ff" fontSize="10">Multiples of 5 (p=5)</text>

            {/* Grid Row 1 (1 to 10) */}
            {/* 1 (Neither) */}
            <rect x="40" y="70" width="70" height="40" rx="6" fill="#334155" />
            <text x="75" y="95" fill="#64748b" fontSize="12" fontWeight="bold" textAnchor="middle">1 ❌</text>

            {/* 2 (Prime) */}
            <rect x="120" y="70" width="70" height="40" rx="6" fill="url(#gradPrimeSurv)" />
            <text x="155" y="95" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">2 ✓</text>

            {/* 3 (Prime) */}
            <rect x="200" y="70" width="70" height="40" rx="6" fill="url(#gradPrimeSurv)" />
            <text x="235" y="95" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">3 ✓</text>

            {/* 4 (2*2) */}
            <rect x="280" y="70" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="315" y="95" fill="#fca5a5" fontSize="12" textAnchor="middle">4 ✕₂</text>

            {/* 5 (Prime) */}
            <rect x="360" y="70" width="70" height="40" rx="6" fill="url(#gradPrimeSurv)" />
            <text x="395" y="95" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">5 ✓</text>

            {/* 6 (2*3) */}
            <rect x="440" y="70" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="475" y="95" fill="#fca5a5" fontSize="12" textAnchor="middle">6 ✕₂</text>

            {/* 7 (Prime) */}
            <rect x="520" y="70" width="70" height="40" rx="6" fill="url(#gradPrimeSurv)" />
            <text x="555" y="95" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">7 ✓</text>

            {/* 8 (2*4) */}
            <rect x="600" y="70" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="635" y="95" fill="#fca5a5" fontSize="12" textAnchor="middle">8 ✕₂</text>

            {/* 9 (3*3) */}
            <rect x="680" y="70" width="70" height="40" rx="6" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
            <text x="715" y="95" fill="#7dd3fc" fontSize="12" textAnchor="middle">9 ✕₃</text>

            {/* 10 (2*5) */}
            <rect x="760" y="70" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="795" y="95" fill="#fca5a5" fontSize="12" textAnchor="middle">10 ✕₂</text>

            {/* Grid Row 2 (11 to 20) */}
            {/* 11 (Prime) */}
            <rect x="40" y="120" width="70" height="40" rx="6" fill="url(#gradPrimeSurv)" />
            <text x="75" y="145" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">11 ✓</text>

            {/* 12 */}
            <rect x="120" y="120" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="155" y="145" fill="#fca5a5" fontSize="12" textAnchor="middle">12 ✕₂</text>

            {/* 13 (Prime) */}
            <rect x="200" y="120" width="70" height="40" rx="6" fill="url(#gradPrimeSurv)" />
            <text x="235" y="145" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">13 ✓</text>

            {/* 14 */}
            <rect x="280" y="120" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="315" y="145" fill="#fca5a5" fontSize="12" textAnchor="middle">14 ✕₂</text>

            {/* 15 (3*5) */}
            <rect x="360" y="120" width="70" height="40" rx="6" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
            <text x="395" y="145" fill="#7dd3fc" fontSize="12" textAnchor="middle">15 ✕₃</text>

            {/* 16 */}
            <rect x="440" y="120" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="475" y="145" fill="#fca5a5" fontSize="12" textAnchor="middle">16 ✕₂</text>

            {/* 17 (Prime) */}
            <rect x="520" y="120" width="70" height="40" rx="6" fill="url(#gradPrimeSurv)" />
            <text x="555" y="145" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">17 ✓</text>

            {/* 18 */}
            <rect x="600" y="120" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="635" y="145" fill="#fca5a5" fontSize="12" textAnchor="middle">18 ✕₂</text>

            {/* 19 (Prime) */}
            <rect x="680" y="120" width="70" height="40" rx="6" fill="url(#gradPrimeSurv)" />
            <text x="715" y="145" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">19 ✓</text>

            {/* 20 */}
            <rect x="760" y="120" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="795" y="145" fill="#fca5a5" fontSize="12" textAnchor="middle">20 ✕₂</text>

            {/* Grid Row 3 (21 to 30) */}
            {/* 21 (3*7) */}
            <rect x="40" y="170" width="70" height="40" rx="6" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
            <text x="75" y="195" fill="#7dd3fc" fontSize="12" textAnchor="middle">21 ✕₃</text>

            {/* 22 */}
            <rect x="120" y="170" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="155" y="195" fill="#fca5a5" fontSize="12" textAnchor="middle">22 ✕₂</text>

            {/* 23 (Prime) */}
            <rect x="200" y="170" width="70" height="40" rx="6" fill="url(#gradPrimeSurv)" />
            <text x="235" y="195" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">23 ✓</text>

            {/* 24 */}
            <rect x="280" y="170" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="315" y="195" fill="#fca5a5" fontSize="12" textAnchor="middle">24 ✕₂</text>

            {/* 25 (5*5) */}
            <rect x="360" y="170" width="70" height="40" rx="6" fill="#3b0764" stroke="#a855f7" strokeWidth="1" />
            <text x="395" y="195" fill="#d8b4fe" fontSize="12" textAnchor="middle">25 ✕₅</text>

            {/* 26 */}
            <rect x="440" y="170" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="475" y="195" fill="#fca5a5" fontSize="12" textAnchor="middle">26 ✕₂</text>

            {/* 27 (3*9) */}
            <rect x="520" y="170" width="70" height="40" rx="6" fill="#082f49" stroke="#38bdf8" strokeWidth="1" />
            <text x="555" y="195" fill="#7dd3fc" fontSize="12" textAnchor="middle">27 ✕₃</text>

            {/* 28 */}
            <rect x="600" y="170" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="635" y="195" fill="#fca5a5" fontSize="12" textAnchor="middle">28 ✕₂</text>

            {/* 29 (Prime) */}
            <rect x="680" y="170" width="70" height="40" rx="6" fill="url(#gradPrimeSurv)" />
            <text x="715" y="195" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">29 ✓</text>

            {/* 30 */}
            <rect x="760" y="170" width="70" height="40" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1" />
            <text x="795" y="195" fill="#fca5a5" fontSize="12" textAnchor="middle">30 ✕₂</text>

            {/* Bottom Caption */}
            <text x="440" y="250" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Green tiles represent surviving primes up to 30. Composite marking starts at p*p (e.g. 4 for 2, 9 for 3, 25 for 5).
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Primality Algorithms Comparison Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Algorithm</th>
                <th className="p-3 font-semibold text-emerald-400">Time Complexity</th>
                <th className="p-3 font-semibold text-purple-400">Space Complexity</th>
                <th className="p-3 font-semibold text-amber-400">Best Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Standard Sieve of Eratosthenes</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(N log(log N))</td>
                <td className="p-3 text-slate-300 font-sans">O(N) boolean array</td>
                <td className="p-3 text-slate-300 font-sans">Generating all primes up to N ≤ 10⁷</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Bit-Packed Primitive Sieve</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(N log(log N))</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(N/32) 32× less RAM</td>
                <td className="p-3 text-slate-300 font-sans">Memory-constrained systems using bitwise ops</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Segmented Sieve</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(N log(log N))</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(√N) L1 cache fit</td>
                <td className="p-3 text-slate-300 font-sans">Massive ranges up to N ≤ 10¹²</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Naive Trial Division (6k ± 1)</td>
                <td className="p-3 text-rose-400 font-sans">O(N√N)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">O(1) constant memory</td>
                <td className="p-3 text-slate-300 font-sans">Testing single random individual numbers</td>
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
            SieveOfEratosthenesPrimeDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program implements the Sieve of Eratosthenes, primitive bit-array memory optimization, and benchmarks performance against trial division.
        </p>

        <JavaFileLoader
          fileModule={sieveDemoCode}
          title="SieveOfEratosthenesPrimeDemo.java"
          highlightLines={[18, 22, 27, 30, 42, 45, 50, 66, 83, 102, 119]}
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
              <span>❌</span> Pitfall 1: Starting the Inner Loop at `2 * p` Instead of `p * p`
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Starting at <code className="text-rose-300 font-mono">2 * p</code> performs redundant writes because all multiples below <code className="text-slate-300 font-mono">p * p</code> were already marked by earlier primes. Always start at <code className="text-emerald-400 font-mono">int multiple = p * p</code>!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Bit Manipulation for Massive Ranges
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When sieving large ranges, packing 32 flags per <code className="text-emerald-400 font-mono">int</code> using bitwise shifts (<code className="text-slate-300 font-mono">p &gt;&gt; 5</code> and <code className="text-slate-300 font-mono">1 &lt;&lt; (p &amp; 31)</code>) reduces memory footprint by up to 32x compared to standard arrays.
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
            🤔 <em>&ldquo;Can <code className="text-emerald-400 font-mono">p * p</code> overflow 32-bit signed integers in Java?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Integer Overflow Hazard! If p &gt; 46,340, p × p exceeds <code className="text-slate-300 font-mono">Integer.MAX_VALUE</code> (2.14 × 10⁹), overflowing into negative numbers and crashing with <code className="text-rose-400 font-mono">ArrayIndexOutOfBoundsException</code>! Always guard loop condition with <code className="text-emerald-400 font-mono">p * p &lt;= limit</code> or cast to <code className="text-emerald-400 font-mono">(long) p * p</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Sieve of Eratosthenes FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 1: Sieve of Eratosthenes Prime Generation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic1_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Sieve of Eratosthenes is a classic interview favorite. Remember to start your inner loop at p * p! In Topic 2, we tackle Algorithmic Problem 2: Palindromic Number & String Verification! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
