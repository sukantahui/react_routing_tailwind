import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import methodsDemoCode from "./topic16_files/ScannerMethodsDeepDiveDemo.java?raw";
import noteText from "./topic16_files/topic16_note.txt?raw";
import questions from "./topic16_files/topic16_questions";

export default function Topic16() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowMethods {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-methods {
            animation: glowMethods 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_002 · Topic 16
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Scanner Methods Deep Dive: <code className="text-sky-400">next()</code>, <code className="text-sky-400">nextLine()</code>, <code className="text-sky-400">nextInt()</code>, <code className="text-sky-400">nextDouble()</code>, <code className="text-sky-400">nextBoolean()</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Explore the mechanics of individual Scanner parsing methods: token-based word reading vs whole-line capture, primitive number conversions, high-precision <code className="text-emerald-300 font-mono">BigDecimal</code> currency inputs in Indian Rupees (₹), and handling multi-word postal addresses.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Understanding Scanner Method Specializations
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The <code className="text-sky-300 font-mono">java.util.Scanner</code> class provides distinct parsing methods designed for specific data representations. Understanding whether a method reads a single <strong>whitespace-delimited token</strong> (like <code className="text-sky-300 font-mono">next()</code>, <code className="text-emerald-300 font-mono">nextInt()</code>, <code className="text-emerald-300 font-mono">nextDouble()</code>) or consumes the <strong>entire physical line</strong> (like <code className="text-purple-300 font-mono">nextLine()</code>) is essential for avoiding input bugs.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Multi-Field Student Ledger):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an address verification tool. When capturing single-word student first names, they utilized <code className="text-sky-300 font-mono">next()</code>; when capturing multi-word postal addresses across Naihati and Shyamnagar (<code className="text-slate-200 italic">&quot;25(10/A) Shibtala Road, N.C. Pukur, Barrackpore&quot;</code>), <strong>Abhronila</strong> and <strong>Debangshu</strong> switched to <code className="text-purple-300 font-mono">nextLine()</code> to capture spaces and punctuation without truncation.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Word Tokenizer (<code className="text-sky-300">next()</code>) vs Full Line Reader (<code className="text-purple-300">nextLine()</code>)
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How different Scanner methods consume character streams and position their internal buffer pointers:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 280"
            className="w-full h-auto"
            aria-label="Scanner Methods Token Comparison Diagram"
          >
            <defs>
              <linearGradient id="gradNext" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
            </defs>

            {/* Input Stream Buffer Bar */}
            <rect x="30" y="40" width="820" height="60" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <text x="50" y="65" fill="#94a3b8" fontSize="11" fontWeight="bold">Input Stream Buffer:</text>
            <text x="50" y="85" fill="#f8fafc" fontSize="13" fontFamily="monospace">
              [ &quot;Swadeep&quot; ] [ &quot;Hui&quot; ] [ &quot;Barrackpore&quot; ] [ &quot;15000.0&quot; ] \n [ &quot;Next Line Data...&quot; ]
            </text>

            {/* Left Box: next() Behavior */}
            <rect x="30" y="120" width="390" height="135" rx="10" fill="url(#gradNext)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="225" y="145" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">
              scanner.next() / nextInt() / nextDouble()
            </text>
            <text x="225" y="170" fill="#f0f9ff" fontSize="12" textAnchor="middle">
              ✓ Reads ONE single token (e.g. &quot;Swadeep&quot;)
            </text>
            <text x="225" y="195" fill="#e0f2fe" fontSize="11" textAnchor="middle">
              Stops at whitespace delimiter (space, tab)
            </text>
            <text x="225" y="220" fill="#bae6fd" fontSize="11" textAnchor="middle" fontWeight="bold">
              Leaves trailing space/newline in the buffer!
            </text>

            {/* Right Box: nextLine() Behavior */}
            <rect x="460" y="120" width="390" height="135" rx="10" fill="url(#gradLine)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="655" y="145" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">
              scanner.nextLine()
            </text>
            <text x="655" y="170" fill="#faf5ff" fontSize="12" textAnchor="middle">
              ✓ Reads entire line including spaces
            </text>
            <text x="655" y="195" fill="#f3e8ff" fontSize="11" textAnchor="middle">
              Consumes text all the way up to &apos;\n&apos; or &apos;\r\n&apos;
            </text>
            <text x="655" y="220" fill="#e9d5ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Consumes &amp; removes the newline delimiter!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Detailed Parsing Methods Reference Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Scanner Method</th>
                <th className="p-3 font-semibold text-emerald-400">Data Type Handled</th>
                <th className="p-3 font-semibold text-amber-400">Allowed Input Format</th>
                <th className="p-3 font-semibold text-slate-400">Throws on Invalid Input</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">next()</td>
                <td className="p-3">String (Single word)</td>
                <td className="p-3 font-mono text-emerald-400">&quot;Swadeep&quot;, &quot;CSE101&quot;</td>
                <td className="p-3 text-xs text-rose-300">NoSuchElementException (at EOF)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">nextLine()</td>
                <td className="p-3">String (Whole line)</td>
                <td className="p-3 font-mono text-emerald-400">&quot;25 Shibtala Rd, Barrackpore&quot;</td>
                <td className="p-3 text-xs text-rose-300">NoSuchElementException (at EOF)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">nextInt()</td>
                <td className="p-3 font-mono">int (32-bit)</td>
                <td className="p-3 font-mono text-emerald-400">101, -42, 2026</td>
                <td className="p-3 text-xs text-rose-300">InputMismatchException</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">nextDouble()</td>
                <td className="p-3 font-mono">double (64-bit)</td>
                <td className="p-3 font-mono text-emerald-400">15000.50, 3.14159, 1.5e3</td>
                <td className="p-3 text-xs text-rose-300">InputMismatchException</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">nextBoolean()</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono text-emerald-400">&quot;true&quot;, &quot;false&quot; (case-insensitive)</td>
                <td className="p-3 text-xs text-rose-300">InputMismatchException</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">nextBigDecimal()</td>
                <td className="p-3 font-mono">BigDecimal (Finance)</td>
                <td className="p-3 font-mono text-emerald-400">25000000000.75 (Exact ₹)</td>
                <td className="p-3 text-xs text-rose-300">InputMismatchException</td>
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
            ScannerMethodsDeepDiveDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program compares word-based and line-based reading, parses the full spectrum of Java primitives and <code className="text-emerald-300">BigDecimal</code>, and processes multi-row student registries with course fee totals in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={methodsDemoCode}
          title="ScannerMethodsDeepDiveDemo.java"
          highlightLines={[23, 27, 34, 43, 44, 45, 46, 47, 48, 49, 64, 65, 66, 67, 68]}
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
              <span>❌</span> Pitfall 1: Using next() to Read Multi-Word Full Names
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If you write <code className="text-rose-300 font-mono">String name = scanner.next();</code> and the user inputs <code className="text-amber-300 font-mono">&quot;Swadeep Hui&quot;</code>, only <code className="text-emerald-400 font-mono">&quot;Swadeep&quot;</code> is assigned to <code className="text-sky-300 font-mono">name</code>. The remaining surname <code className="text-amber-300 font-mono">&quot;Hui&quot;</code> remains in the input buffer, unintentionally corrupting subsequent prompts!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always use <code className="bg-slate-900 px-1 py-0.5 rounded">scanner.nextLine()</code> when reading full names, sentences, or addresses.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 2: Forgetting to Discard Bad Tokens in Input Validation Loops
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When <code className="text-rose-300 font-mono">InputMismatchException</code> occurs, the invalid token is NOT consumed. If your loop does not call <code className="text-sky-300 font-mono">scanner.next()</code> to discard the erroneous token, the loop will infinitely fail on the same unconsumed text.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always consume and discard the invalid token: <code className="bg-slate-900 px-1 py-0.5 rounded">String badToken = scanner.next();</code>.
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
            🤔 <em>&ldquo;Why does calling `scanner.nextInt()` followed immediately by `scanner.nextLine()` cause `nextLine()` to instantly return an empty string without waiting for the user to type?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Preview of Topic 17! When you type <code className="text-amber-300">101</code> and press Enter, <code className="text-sky-300 font-mono">nextInt()</code> consumes only the digits <code className="text-emerald-400">101</code>, leaving the newline character <code className="text-rose-400">\n</code> unconsumed in the buffer. When <code className="text-purple-300 font-mono">nextLine()</code> is called next, it sees the pending <code className="text-rose-400">\n</code> and returns immediately! We will master the complete fix in Topic 17!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Scanner Methods FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 16: Scanner Methods Deep Dive"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_002_topic16_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Selecting the right Scanner method is a foundational engineering skill. Use `next()` for single identifiers or codes, `nextLine()` for full names and addresses, and `nextBigDecimal()` for financial transactions. In our next topic (Topic 17), we will dissect and permanently solve the most famous trap in beginner Java: the Scanner newline skip bug! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
