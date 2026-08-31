import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bitwiseDemoCode from "./topic11_files/BitwiseOperatorsDemo.java?raw";
import noteText from "./topic11_files/topic11_note.txt?raw";
import questions from "./topic11_files/topic11_questions";

export default function Topic11() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowBitwise {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-bitwise {
            animation: glowBitwise 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 11
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Bitwise Operators: Bitwise AND (<code className="text-emerald-400">&amp;</code>), Bitwise OR (<code className="text-emerald-400">|</code>), Bitwise XOR (<code className="text-emerald-400">^</code>), Bitwise NOT (<code className="text-emerald-400">~</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master silicon-level binary arithmetic in Java: the 4 core bitwise operators (<code className="text-sky-300 font-mono">&amp;</code>, <code className="text-emerald-300 font-mono">|</code>, <code className="text-amber-300 font-mono">^</code>, <code className="text-purple-300 font-mono">~</code>), the 4 essential bitmask engineering recipes (Set, Check, Toggle, Clear), in-place XOR variable swapping, and student security permissions in Barrackpore.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Binary Bit Manipulation in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            <strong>Bitwise Operators</strong> perform boolean logic directly on the individual binary bits (0s and 1s) of integer types (<code className="text-sky-300 font-mono">byte</code>, <code className="text-sky-300 font-mono">short</code>, <code className="text-sky-300 font-mono">char</code>, <code className="text-sky-300 font-mono">int</code>, <code className="text-sky-300 font-mono">long</code>).
          </p>
          <p>
            Bitmasking allows encoding multiple boolean flags into a single integer:
            <br />
            <strong>SET a Flag:</strong> <code className="text-emerald-300 font-mono">flags |= MASK;</code> (Bitwise OR forces bit to 1).
            <br />
            <strong>CHECK a Flag:</strong> <code className="text-sky-300 font-mono">(flags &amp; MASK) != 0</code> (Bitwise AND isolates bit).
            <br />
            <strong>TOGGLE a Flag:</strong> <code className="text-amber-300 font-mono">flags ^= MASK;</code> (Bitwise XOR inverts bit).
            <br />
            <strong>CLEAR a Flag:</strong> <code className="text-rose-300 font-mono">flags &amp;= ~MASK;</code> (Bitwise AND with NOT clears bit).
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Portal Permissions):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an authorization engine for student accounts. By packing granular permission flags (Course View = 1, Lab Access = 2, PDF Download = 4, Admin = 8) into a single 8-bit mask, <strong>Abhronila</strong> and <strong>Debangshu</strong> checked laboratory privileges with microsecond speed across Naihati and Shyamnagar without database lookup latency.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 4 Bitmask Recipes &amp; In-Place XOR Swapping Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How bitwise operators manipulate binary flags and execute algorithmic operations:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Bitwise Operators and Bitmask Recipes Diagram"
          >
            <defs>
              <linearGradient id="gradBitAnd" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradBitOr" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradBitXor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Box 1: Bitwise AND & OR */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradBitAnd)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. AND (&amp;) &amp; OR (|)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">SET  : flags |= MASK;</text>
            <text x="55" y="122" fill="#bae6fd" fontSize="11" fontFamily="monospace">CHECK: (flags &amp; MASK) != 0</text>
            <text x="55" y="142" fill="#e0f2fe" fontSize="10">12 &amp; 10 = 8 | 12 | 10 = 14</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Flag Setting &amp; Isolation
            </text>

            {/* Box 2: Bitwise XOR (^) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradBitOr)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. XOR (^) &amp; Toggle</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">TOGGLE: flags ^= MASK;</text>
            <text x="335" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">SWAP  : a^=b; b^=a; a^=b;</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">x ^ x = 0 | x ^ 0 = x</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              In-Place Swaps &amp; Unique ID
            </text>

            {/* Box 3: Bitwise NOT (~) */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradBitXor)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. NOT (~) &amp; Clear</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#451a03" />
            <text x="615" y="102" fill="#fde68a" fontSize="11" fontFamily="monospace">CLEAR: flags &amp;= ~MASK;</text>
            <text x="615" y="122" fill="#fde68a" fontSize="11" fontFamily="monospace">Formula: ~x = -(x + 1)</text>
            <text x="615" y="142" fill="#fef3c7" fontSize="10">~12 = -13 | ~0 = -1</text>
            <text x="720" y="190" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Bit Inversion Masking
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Precedence Warning: `!=` precedes `&amp;` &mdash; always write `((flags &amp; MASK) != 0)` with outer parentheses!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Bitwise Truth Table &amp; Binary Operations
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Bit A</th>
                <th className="p-3 font-semibold text-sky-400">Bit B</th>
                <th className="p-3 font-semibold text-emerald-400">Bitwise AND (A &amp; B)</th>
                <th className="p-3 font-semibold text-indigo-400">Bitwise OR (A | B)</th>
                <th className="p-3 font-semibold text-amber-400">Bitwise XOR (A ^ B)</th>
                <th className="p-3 font-semibold text-rose-400">Bitwise NOT (~A)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">1</td>
                <td className="p-3 font-mono text-emerald-400">1</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">1</td>
                <td className="p-3 font-mono text-indigo-300 font-bold">1</td>
                <td className="p-3 font-mono text-amber-400">0</td>
                <td className="p-3 font-mono text-rose-400">0</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">1</td>
                <td className="p-3 font-mono text-rose-400">0</td>
                <td className="p-3 font-mono text-rose-400 font-bold">0</td>
                <td className="p-3 font-mono text-indigo-300 font-bold">1</td>
                <td className="p-3 font-mono text-amber-400 font-bold">1</td>
                <td className="p-3 font-mono text-rose-400">0</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">0</td>
                <td className="p-3 font-mono text-emerald-400">1</td>
                <td className="p-3 font-mono text-rose-400 font-bold">0</td>
                <td className="p-3 font-mono text-indigo-300 font-bold">1</td>
                <td className="p-3 font-mono text-amber-400 font-bold">1</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">1</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">0</td>
                <td className="p-3 font-mono text-rose-400">0</td>
                <td className="p-3 font-mono text-rose-400 font-bold">0</td>
                <td className="p-3 font-mono text-rose-400 font-bold">0</td>
                <td className="p-3 font-mono text-amber-400">0</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">1</td>
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
            BitwiseOperatorsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates bitwise truth tables, binary representation formatting, the 4 bitmask recipes (Set, Check, Toggle, Clear), in-place XOR variable swapping, and student security permission filtering in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={bitwiseDemoCode}
          title="BitwiseOperatorsDemo.java"
          highlightLines={[14, 15, 16, 17, 28, 29, 30, 31, 45, 49, 54, 58, 67, 68, 69, 78]}
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
              <span>❌</span> Pitfall 1: Missing Parentheses in Bitmask Checks
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">if (flags &amp; MASK != 0)</code> fails to compile because <code className="text-sky-300 font-mono">!=</code> has higher precedence than <code className="text-emerald-300 font-mono">&amp;</code>, causing Java to attempt <code className="text-rose-300 font-mono">flags &amp; (MASK != 0)</code>!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always wrap the bitwise operation in parentheses: <code className="bg-slate-900 px-1 py-0.5 rounded">if ((flags &amp; MASK) != 0)</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use (n &amp; 1) != 0 for Parity Checks
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Instead of writing modulus checks that risk negative dividend traps, <code className="text-emerald-400 font-mono">(n &amp; 1) != 0</code> checks the least significant bit directly and works flawlessly across both positive and negative integers.
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
            🤔 <em>&ldquo;How does `a ^= b; b ^= a; a ^= b;` swap two numbers without using a temporary variable?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> The self-inverse property of XOR (<code className="text-amber-300 font-mono">x ^ x = 0</code> and <code className="text-amber-300 font-mono">x ^ 0 = x</code>)! Step 1: <code className="text-sky-300 font-mono">a = a ^ b</code> stores the combined difference. Step 2: <code className="text-emerald-300 font-mono">b = (a ^ b) ^ b = a ^ 0 = a</code> (b gets original a!). Step 3: <code className="text-purple-300 font-mono">a = (a ^ b) ^ a = b ^ 0 = b</code> (a gets original b!). Zero temporary memory needed!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Bitwise Operators FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 11: Bitwise Operators (&, |, ^, ~)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic11_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Bitwise operators allow you to control individual silicon bits. Remember the four golden recipes: SET with |, CHECK with &, TOGGLE with ^, and CLEAR with & ~. Always enclose bitmask checks in parentheses! In Topic 12, we explore Shift Operators (<<, >>, >>>)! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
