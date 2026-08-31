import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import scannerDemoCode from "./topic15_files/ScannerConsoleInputDemo.java?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseScanner {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-pulse-scanner {
            animation: pulseScanner 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_002 · Topic 15
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Interactive Console Input Using <code className="text-sky-400">java.util.Scanner</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master interactive keyboard input in Java: binding <code className="text-sky-300">Scanner</code> to the standard input stream (<code className="text-amber-300">System.in</code>), token-based whitespace parsing, delimiter customization for CSV files, defensive validation with <code className="text-emerald-300">hasNextInt()</code>, and recording student admissions in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> How Scanner Simplifies Input in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Before Java 5, reading interactive keyboard input required complex boilerplate code involving <code className="text-sky-300 font-mono">BufferedReader</code>, <code className="text-sky-300 font-mono">InputStreamReader</code>, and manual parsing with <code className="text-amber-300 font-mono">Integer.parseInt()</code>.
          </p>
          <p>
            The <code className="text-sky-400 font-bold">java.util.Scanner</code> class revolutionized console input by acting as a high-level tokenizer that breaks incoming input streams into tokens using whitespace delimiters and automatically converts them into target primitive types (<code className="text-emerald-300 font-mono">nextInt()</code>, <code className="text-emerald-300 font-mono">nextDouble()</code>, <code className="text-emerald-300 font-mono">nextBoolean()</code>).
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Admission Terminal):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore center, <strong>Swadeep</strong>, <strong>Tuhina</strong>, <strong>Abhronila</strong>, and <strong>Debangshu</strong> built a console-based student registration portal for learners across Naihati and Shyamnagar. By using <code className="text-sky-300 font-mono">Scanner</code> with defensive pre-checks (<code className="text-emerald-300 font-mono">scanner.hasNextDouble()</code>), their program captured student names, roll numbers, and fees in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) without crashing on unexpected user input.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Scanner Tokenization &amp; Type Conversion Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the raw character stream from <code className="text-amber-300">System.in</code> is partitioned into tokens and parsed into typed variables:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 270"
            className="w-full h-auto"
            aria-label="Scanner Tokenization Pipeline Diagram"
          >
            <defs>
              <linearGradient id="gradInput" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradDelim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
              <linearGradient id="gradType" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Stage 1: Raw System.in Input Stream */}
            <rect x="30" y="40" width="230" height="160" rx="12" fill="url(#gradInput)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="145" y="70" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Raw Console Stream</text>
            <text x="145" y="95" fill="#f0f9ff" fontSize="11" textAnchor="middle">System.in (Byte Stream)</text>
            <rect x="45" y="110" width="200" height="35" rx="6" fill="#0c4a6e" />
            <text x="145" y="132" fill="#bae6fd" fontSize="11" fontFamily="monospace" textAnchor="middle">&quot;Swadeep 101 15000.0&quot;</text>
            <text x="145" y="175" fill="#e0f2fe" fontSize="10" textAnchor="middle">Buffer reads raw keyboard bytes</text>

            {/* Arrow 1 */}
            <path d="M 270 120 L 320 120" stroke="#94a3b8" strokeWidth="3" />
            <polygon points="320,115 335,120 320,125" fill="#94a3b8" />

            {/* Stage 2: Tokenization via Delimiters */}
            <rect x="340" y="40" width="240" height="160" rx="12" fill="url(#gradDelim)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="460" y="70" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Regex Tokenizer</text>
            <text x="460" y="95" fill="#faf5ff" fontSize="11" textAnchor="middle">Default Delimiter: \\s+ (Whitespace)</text>
            <rect x="355" y="110" width="210" height="55" rx="6" fill="#4c1d95" />
            <text x="460" y="130" fill="#e9d5ff" fontSize="10" fontFamily="monospace" textAnchor="middle">Token 1: &quot;Swadeep&quot;</text>
            <text x="460" y="145" fill="#e9d5ff" fontSize="10" fontFamily="monospace" textAnchor="middle">Token 2: &quot;101&quot; | Token 3: &quot;15000.0&quot;</text>
            <text x="460" y="185" fill="#d8b4fe" fontSize="10" textAnchor="middle">Skips spaces, tabs &amp; newlines</text>

            {/* Arrow 2 */}
            <path d="M 590 120 L 640 120" stroke="#94a3b8" strokeWidth="3" />
            <polygon points="640,115 655,120 640,125" fill="#94a3b8" />

            {/* Stage 3: Typed Variables */}
            <rect x="660" y="40" width="200" height="160" rx="12" fill="url(#gradType)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="760" y="70" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Java Variables</text>
            <text x="760" y="100" fill="#ecfdf5" fontSize="11" fontFamily="monospace" textAnchor="middle">String name = next();</text>
            <text x="760" y="125" fill="#ecfdf5" fontSize="11" fontFamily="monospace" textAnchor="middle">int roll = nextInt();</text>
            <text x="760" y="150" fill="#ecfdf5" fontSize="11" fontFamily="monospace" textAnchor="middle">double fee = nextDouble();</text>
            <text x="760" y="180" fill="#a7f3d0" fontSize="10" textAnchor="middle">✓ Strongly Typed Results</text>

            {/* Legend */}
            <text x="440" y="240" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Defensive Habit: Always pre-check with hasNextInt() / hasNextDouble() to prevent InputMismatchException!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Essential Scanner Method Reference Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Method</th>
                <th className="p-3 font-semibold text-emerald-400">Return Type</th>
                <th className="p-3 font-semibold text-amber-400">Guard Validation Method</th>
                <th className="p-3 font-semibold text-slate-400">Reading Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">next()</td>
                <td className="p-3 font-mono">String</td>
                <td className="p-3 font-mono text-amber-300">hasNext()</td>
                <td className="p-3 text-xs">Reads the next single whitespace-delimited word token</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">nextLine()</td>
                <td className="p-3 font-mono">String</td>
                <td className="p-3 font-mono text-amber-300">hasNextLine()</td>
                <td className="p-3 text-xs">Reads all text up to the next newline boundary (\n or \r\n)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">nextInt()</td>
                <td className="p-3 font-mono">int</td>
                <td className="p-3 font-mono text-amber-300">hasNextInt()</td>
                <td className="p-3 text-xs">Parses the next token as a 32-bit integer</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">nextDouble()</td>
                <td className="p-3 font-mono">double</td>
                <td className="p-3 font-mono text-amber-300">hasNextDouble()</td>
                <td className="p-3 text-xs">Parses the next token as a 64-bit IEEE 754 floating point number</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">nextBoolean()</td>
                <td className="p-3 font-mono">boolean</td>
                <td className="p-3 font-mono text-amber-300">hasNextBoolean()</td>
                <td className="p-3 text-xs">Parses case-insensitive &quot;true&quot; or &quot;false&quot; tokens</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">next().charAt(0)</td>
                <td className="p-3 font-mono">char</td>
                <td className="p-3 font-mono text-amber-300">hasNext()</td>
                <td className="p-3 text-xs">Standard idiom to read a single character input in Java</td>
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
            ScannerConsoleInputDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following runnable program demonstrates reading tokens from an input stream, parsing custom CSV formatted data with custom delimiters, and performing defensive <code className="text-emerald-300">hasNextInt()</code> validations for student admissions in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={scannerDemoCode}
          title="ScannerConsoleInputDemo.java"
          highlightLines={[22, 23, 24, 25, 26, 27, 40, 41, 42, 57, 58, 60, 61]}
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
              <span>❌</span> Pitfall 1: Unchecked Calls Leading to InputMismatchException
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Directly invoking <code className="text-rose-300 font-mono">int age = scanner.nextInt();</code> without checking <code className="text-emerald-300 font-mono">scanner.hasNextInt()</code> crashes the entire application if a user types a word like &quot;twenty&quot; instead of a number.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always wrap in defensive checks: <code className="bg-slate-900 px-1 py-0.5 rounded">while (!scanner.hasNextInt()) &#123; scanner.next(); &#125;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 2: Prematurely Closing Scanner(System.in)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Calling <code className="text-rose-300 font-mono">scanner.close()</code> on a Scanner tied to <code className="text-amber-300 font-mono">System.in</code> closes the underlying standard input stream for the entire JVM process. Subsequent attempts to create new Scanners on <code className="text-amber-300 font-mono">System.in</code> will fail permanently.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Only close Scanners associated with disk Files or Network Streams; keep a single application-wide Scanner for <code className="bg-slate-900 px-1 py-0.5 rounded">System.in</code> until program termination.
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
            🤔 <em>&ldquo;Why is there no `scanner.nextChar()` method in java.util.Scanner?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Think about the tokenization model! <code className="text-sky-300 font-mono">Scanner</code> operates on delimiter-separated words/tokens. A character is merely an index within a word token, so calling <code className="text-emerald-300 font-mono">scanner.next().charAt(0)</code> naturally extracts the first character without needing a redundant scanner method!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Scanner Console Input FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 15: Interactive Console Input with Scanner"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_002_topic15_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Console input is where your software meets real humans. Always code defensively! Never assume the user will enter valid numbers—always use hasNextInt() and hasNextDouble() to validate tokens before reading. In our next topic (Topic 16), we will explore the nuances of individual Scanner parsing methods! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
