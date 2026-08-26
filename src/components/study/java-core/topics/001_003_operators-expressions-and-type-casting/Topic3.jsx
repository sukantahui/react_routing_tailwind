import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import modulusDemoCode from "./topic3_files/ModulusOperatorDeepDiveDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseCircle {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(129, 140, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(129, 140, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-pulse-circle {
            animation: pulseCircle 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Modulus Operator (<code className="text-indigo-400">%</code>): Positive, Negative &amp; Floating-Point Numbers
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the full mathematical power of the remainder operator: the 4-quadrant sign truth matrix, native floating-point modulus, circular ring buffer indexing, production-safe hash bucket mapping, and currency paise conversions in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Mathematical Mechanics of Modulus in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In the Java Language Specification (JLS §15.17.3), the modulus operator (<code className="text-indigo-400 font-mono">%</code>) is defined by the algebraic equation: <code className="text-emerald-300 font-mono">a % b = a - (a / b) * b</code>.
          </p>
          <p>
            Because integer division <code className="text-sky-300 font-mono">a / b</code> truncates toward zero, the sign of the remainder <strong>always follows the sign of the dividend <code className="text-amber-300 font-mono">a</code></strong> (the left operand), completely ignoring the sign of divisor <code className="text-purple-300 font-mono">b</code>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-indigo-500 text-slate-300 space-y-2">
            <p className="font-medium text-indigo-300">Classroom Case Study (Barrackpore Lab Batch Allocator):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore center, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> implemented a cyclic batch allocation algorithm that distributes students across 4 physical computer laboratories in Barrackpore, Naihati, Shyamnagar, and Ichapur using circular ring indexing (<code className="text-indigo-300 font-mono">int roomIndex = rollNumber % 4;</code>) and decomposed large tuition fee totals into full Rupees and remaining Paise (<code className="text-emerald-400 font-semibold">₹</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Modulus 4-Quadrant Sign Matrix &amp; Circular Ring Buffer
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the dividend governs result signs and how circular modulus wraps array indices:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Modulus Sign Matrix and Circular Buffer Diagram"
          >
            <defs>
              <linearGradient id="gradSign" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="gradRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Left Box: 4-Quadrant Sign Matrix */}
            <rect x="30" y="40" width="410" height="190" rx="10" fill="url(#gradSign)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="235" y="65" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">
              1. Modulus Sign Truth Matrix (a % b)
            </text>
            
            <rect x="50" y="80" width="370" height="100" rx="6" fill="#1e1b4b" />
            <text x="60" y="105" fill="#c7d2fe" fontSize="12" fontFamily="monospace">
              (+15) % (+4) = +3  &rarr; Dividend (+15) &rarr; Positive
            </text>
            <text x="60" y="125" fill="#fca5a5" fontSize="12" fontFamily="monospace">
              (-15) % (+4) = -3  &rarr; Dividend (-15) &rarr; Negative
            </text>
            <text x="60" y="145" fill="#c7d2fe" fontSize="12" fontFamily="monospace">
              (+15) % (-4) = +3  &rarr; Divisor sign is IGNORED!
            </text>
            <text x="60" y="165" fill="#fca5a5" fontSize="12" fontFamily="monospace">
              (-15) % (-4) = -3  &rarr; Dividend (-15) &rarr; Negative
            </text>
            <text x="235" y="210" fill="#e0e7ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Golden Rule: Sign ALWAYS matches left operand &apos;a&apos;!
            </text>

            {/* Right Box: Circular Ring Buffer */}
            <rect x="460" y="40" width="390" height="190" rx="10" fill="url(#gradRing)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="655" y="65" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">
              2. Circular Ring Buffer: (i % 4)
            </text>
            
            {/* 4 Ring Slots */}
            <rect x="490" y="85" width="70" height="40" rx="6" fill="#022c22" stroke="#34d399" strokeWidth="2" />
            <text x="525" y="110" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">Slot 0</text>

            <rect x="580" y="85" width="70" height="40" rx="6" fill="#022c22" stroke="#34d399" strokeWidth="2" />
            <text x="615" y="110" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">Slot 1</text>

            <rect x="670" y="85" width="70" height="40" rx="6" fill="#022c22" stroke="#34d399" strokeWidth="2" />
            <text x="705" y="110" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">Slot 2</text>

            <rect x="760" y="85" width="70" height="40" rx="6" fill="#022c22" stroke="#34d399" strokeWidth="2" />
            <text x="795" y="110" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">Slot 3</text>

            <text x="655" y="155" fill="#ecfdf5" fontSize="12" textAnchor="middle" fontFamily="monospace">
              Item 0 &rarr; Slot 0 | Item 3 &rarr; Slot 3
            </text>
            <text x="655" y="175" fill="#fef08a" fontSize="12" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
              Item 4 % 4 &rarr; Wraps to Slot 0!
            </text>
            <text x="655" y="210" fill="#d1fae5" fontSize="11" textAnchor="middle">
              Enables round-robin schedulers, carousel UIs &amp; ring queues
            </text>

            {/* Bottom Caption */}
            <text x="440" y="260" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Production Hash Indexing: `(key.hashCode() &amp; 0x7FFFFFFF) % numBuckets` protects against negative indices!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Modulus Operations Across All Data Types
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operand Types</th>
                <th className="p-3 font-semibold text-emerald-400">Sample Expression</th>
                <th className="p-3 font-semibold text-amber-400">Evaluated Result</th>
                <th className="p-3 font-semibold text-purple-400">Result Type</th>
                <th className="p-3 font-semibold text-slate-400">Key Takeaway</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">int % int</td>
                <td className="p-3 font-mono text-emerald-400">15 % 4</td>
                <td className="p-3 font-mono text-amber-300">3</td>
                <td className="p-3 font-mono">int</td>
                <td className="p-3 text-xs">Standard integer remainder</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">negative int % int</td>
                <td className="p-3 font-mono text-emerald-400">-15 % 4</td>
                <td className="p-3 font-mono text-rose-400">-3</td>
                <td className="p-3 font-mono">int</td>
                <td className="p-3 text-xs">Sign matches negative dividend</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">double % double</td>
                <td className="p-3 font-mono text-emerald-400">14.75 % 4.50</td>
                <td className="p-3 font-mono text-amber-300">1.25</td>
                <td className="p-3 font-mono">double</td>
                <td className="p-3 text-xs">Supported natively in Java without external C library functions</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">double % 0.0</td>
                <td className="p-3 font-mono text-emerald-400">10.0 % 0.0</td>
                <td className="p-3 font-mono text-purple-300">Double.NaN</td>
                <td className="p-3 font-mono">double</td>
                <td className="p-3 text-xs">Does NOT throw exception; yields IEEE 754 NaN</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">int % 0</td>
                <td className="p-3 font-mono text-emerald-400">10 % 0</td>
                <td className="p-3 font-mono text-rose-400">ArithmeticException</td>
                <td className="p-3 font-mono">None (Throws)</td>
                <td className="p-3 text-xs">Hardware trap caught as runtime exception</td>
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
            ModulusOperatorDeepDiveDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following runnable program demonstrates the 4-quadrant sign truth matrix, floating-point modulus, circular ring buffer allocations, and production-safe hash bucket indexing in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={modulusDemoCode}
          title="ModulusOperatorDeepDiveDemo.java"
          highlightLines={[22, 23, 24, 25, 39, 40, 41, 46, 47, 51, 52, 63, 73]}
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
              <span>❌</span> Pitfall 1: Math.abs(key.hashCode()) % buckets Hash Crash
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If an object&apos;s <code className="text-rose-300 font-mono">hashCode()</code> returns <code className="text-amber-300 font-mono">Integer.MIN_VALUE</code> (<code className="text-amber-300 font-mono">-2147483648</code>), <code className="text-rose-300 font-mono">Math.abs()</code> cannot negate it and returns a negative number, crashing the array index with <code className="text-rose-400 font-mono">ArrayIndexOutOfBoundsException</code>!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Use bitwise mask: <code className="bg-slate-900 px-1 py-0.5 rounded">(key.hashCode() &amp; 0x7FFFFFFF) % buckets</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Math.floorMod for True Mathematical Modulo
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When working with circular clock mathematics (e.g. subtracting hours past midnight) or calendar calculations where negative dividends must wrap to the upper positive boundary, use Java 8 <code className="text-sky-300 font-mono">Math.floorMod(a, b)</code>.
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
            🤔 <em>&ldquo;Why is `15 % -4` positive 3, but `-15 % 4` is negative 3?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> The fundamental formula! In <code className="text-sky-300 font-mono">15 % -4</code>, the calculation is <code className="text-emerald-300 font-mono">15 - (15 / -4) * -4</code> = <code className="text-emerald-300 font-mono">15 - (-3 * -4)</code> = <code className="text-emerald-300 font-mono">15 - 12</code> = <code className="text-emerald-400 font-bold">+3</code>. The minus sign on the divisor cancels out during multiplication, leaving the sign of the dividend completely in control!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Modulus Operator FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 3: Modulus Operator Deep Dive"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic3_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The modulus operator is one of the most versatile tools in computer science. Whether you are building circular buffers, round-robin schedulers, unit converters, or hash tables, remember the Dividend Sign Invariant and always use the bitwise mask `(hash & 0x7FFFFFFF)` for hash tables. In Topic 4, we will explore the String Concatenation Operator (+) and operator overloading mechanics! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
