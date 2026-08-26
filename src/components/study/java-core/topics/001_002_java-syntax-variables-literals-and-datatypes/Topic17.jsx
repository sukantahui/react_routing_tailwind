import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import bugDemoCode from "./topic17_files/ScannerNewlineBugDemo.java?raw";
import noteText from "./topic17_files/topic17_note.txt?raw";
import questions from "./topic17_files/topic17_questions";

export default function Topic17() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowFix {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(244, 63, 94, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-fix {
            animation: glowFix 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_002 · Topic 17
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Resolving the Classic Scanner Newline Skip Bug (<code className="text-rose-400">nextInt()</code> followed by <code className="text-emerald-400">nextLine()</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Dissect and permanently resolve the most famous beginner trap in Java: why <code className="text-sky-300 font-mono">nextInt()</code> leaves unconsumed newlines in the stream buffer, why subsequent <code className="text-emerald-300 font-mono">nextLine()</code> calls skip prompts, and the three proven industry solutions with student admissions in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Anatomy of the Newline Skip Bug
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When a user enters a number in the console (e.g. <code className="text-amber-300 font-mono">101</code>) and presses <kbd className="px-2 py-0.5 bg-slate-700 text-slate-200 text-xs rounded border border-slate-600">Enter</kbd>, the terminal stream receives both the digits <code className="text-amber-300 font-mono">&quot;101&quot;</code> and the newline control character <code className="text-rose-400 font-mono">&apos;\n&apos;</code>.
          </p>
          <p>
            The method <code className="text-sky-300 font-mono">scanner.nextInt()</code> only consumes the numeric digits <code className="text-amber-300 font-mono">101</code> and stops immediately before <code className="text-rose-400 font-mono">&apos;\n&apos;</code>, leaving the newline sitting at the head of the buffer. When <code className="text-purple-300 font-mono">scanner.nextLine()</code> is called next, it immediately sees <code className="text-rose-400 font-mono">&apos;\n&apos;</code>, consumes it, and returns an empty string <code className="text-rose-300 font-mono">&quot;&quot;</code> without pausing for user input!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-rose-500 text-slate-300 space-y-2">
            <p className="font-medium text-rose-300">Classroom Lab Scenario (Barrackpore Admission Desk):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore lab, <strong>Swadeep</strong> and <strong>Tuhina</strong> ran into this exact bug when entering student records: after entering the roll number, the terminal skipped the prompt for full student name. <strong>Abhronila</strong> and <strong>Debangshu</strong> inspected the stream buffer and applied the buffer flush call (<code className="text-emerald-300 font-mono">scanner.nextLine();</code>), enabling clean multi-field input capture.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Buffer State Breakdown: Buggy vs Flushed Execution
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Step-by-step visualization of characters in the <code className="text-amber-300">System.in</code> buffer:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 300"
            className="w-full h-auto"
            aria-label="Scanner Newline Bug Buffer Diagram"
          >
            <defs>
              <linearGradient id="gradBuggy" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradFixed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Step 1: User Types */}
            <rect x="30" y="30" width="820" height="55" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <text x="50" y="55" fill="#38bdf8" fontSize="12" fontWeight="bold">Step 1: User types &quot;101&quot; + Press Enter:</text>
            <text x="50" y="75" fill="#f8fafc" fontSize="13" fontFamily="monospace">
              Input Buffer: [ &apos;1&apos; ] [ &apos;0&apos; ] [ &apos;1&apos; ] [ &apos;\n&apos; ] [ &apos;S&apos; ] [ &apos;w&apos; ] [ &apos;a&apos; ] [ &apos;d&apos; ] [ &apos;e&apos; ] [ &apos;e&apos; ] [ &apos;p&apos; ] ...
            </text>

            {/* Left Box: The Bug */}
            <rect x="30" y="105" width="395" height="175" rx="10" fill="url(#gradBuggy)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="227" y="130" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
              ❌ Without Buffer Flush (THE BUG)
            </text>
            <rect x="45" y="145" width="365" height="55" rx="6" fill="#4c0519" />
            <text x="55" y="165" fill="#fca5a5" fontSize="11" fontFamily="monospace">1. int roll = scanner.nextInt(); // Consumes &quot;101&quot;</text>
            <text x="55" y="185" fill="#fca5a5" fontSize="11" fontFamily="monospace">2. String name = scanner.nextLine(); // Swallows &apos;\n&apos;!</text>
            
            <text x="227" y="225" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Result: name = &quot;&quot; (Empty String!)
            </text>
            <text x="227" y="245" fill="#fecdd3" fontSize="10" textAnchor="middle">
              Console skips prompt and continues instantly without user typing!
            </text>

            {/* Right Box: The Fix */}
            <rect x="455" y="105" width="395" height="175" rx="10" fill="url(#gradFixed)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="652" y="130" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
              ✓ With Buffer Flush (THE FIX)
            </text>
            <rect x="470" y="145" width="365" height="55" rx="6" fill="#022c22" />
            <text x="480" y="160" fill="#a7f3d0" fontSize="10" fontFamily="monospace">1. int roll = scanner.nextInt();</text>
            <text x="480" y="175" fill="#fef08a" fontSize="10" fontFamily="monospace">2. scanner.nextLine(); // FLUSH: Consumes &apos;\n&apos;</text>
            <text x="480" y="190" fill="#a7f3d0" fontSize="10" fontFamily="monospace">3. String name = scanner.nextLine(); // Waits for user!</text>

            <text x="652" y="225" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Result: name = &quot;Swadeep Hui&quot; (Clean!)
            </text>
            <text x="652" y="245" fill="#d1fae5" fontSize="10" textAnchor="middle">
              Stream buffer is cleanly reset for the next line input prompt.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Summary of the 3 Industry Solutions
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Solution Strategy</th>
                <th className="p-3 font-semibold text-emerald-400">Code Pattern</th>
                <th className="p-3 font-semibold text-amber-400">Mechanism</th>
                <th className="p-3 font-semibold text-slate-400">Ideal Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">1. Dummy Flushing nextLine()</td>
                <td className="p-3 font-mono text-emerald-400">nextInt(); scanner.nextLine();</td>
                <td className="p-3 text-xs">Consumes leftover &apos;\n&apos; sitting at the head of the buffer</td>
                <td className="p-3 text-xs">Standard interactive console terminals &amp; student menus</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">2. Line-First Integer.parseInt()</td>
                <td className="p-3 font-mono text-emerald-400">Integer.parseInt(scanner.nextLine().trim());</td>
                <td className="p-3 text-xs">Reads full lines for all inputs; no orphan &apos;\n&apos; possible</td>
                <td className="p-3 text-xs">Competitive programming &amp; automated grading test pipelines</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">3. Word-Based next()</td>
                <td className="p-3 font-mono text-emerald-400">nextInt(); String s = scanner.next();</td>
                <td className="p-3 text-xs">next() automatically skips leading whitespace/newlines</td>
                <td className="p-3 text-xs">Single-word inputs without embedded spaces</td>
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
            ScannerNewlineBugDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following runnable program reproduces the newline skip bug in simulated memory, demonstrates the buffer flushing solution, and presents line-first parsing for student admissions in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={bugDemoCode}
          title="ScannerNewlineBugDemo.java"
          highlightLines={[23, 24, 38, 39, 41, 43, 44, 46, 58, 59, 60, 61]}
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
              <span>❌</span> Pitfall 1: Calling Extra nextLine() When No Newline is Pending
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If your previous call was already <code className="text-sky-300 font-mono">nextLine()</code>, calling another <code className="text-rose-300 font-mono">scanner.nextLine()</code> causes the program to block and hang, waiting for a redundant blank line from the user.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Only call the flushing <code className="bg-slate-900 px-1 py-0.5 rounded">scanner.nextLine()</code> when transitioning from a token method (<code className="bg-slate-900 px-1 py-0.5 rounded">nextInt</code>, <code className="bg-slate-900 px-1 py-0.5 rounded">nextDouble</code>) to <code className="bg-slate-900 px-1 py-0.5 rounded">nextLine()</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Always .trim() Line-First Numbers
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              When using <code className="text-sky-300 font-mono">Integer.parseInt(scanner.nextLine())</code>, accidental leading or trailing spaces (e.g. <code className="text-amber-300 font-mono">&quot; 101 &quot;</code>) will throw <code className="text-rose-400 font-mono">NumberFormatException</code>.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always chain <code className="bg-slate-900 px-1 py-0.5 rounded">.trim()</code>: <code className="bg-slate-900 px-1 py-0.5 rounded">Integer.parseInt(scanner.nextLine().trim())</code>.
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
            🤔 <em>&ldquo;Why does calling `scanner.nextLine()` followed by `scanner.nextInt()` NOT cause any newline skip bug?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Order matters! <code className="text-purple-300 font-mono">nextLine()</code> consumes its own newline character at the end of the line. The subsequent <code className="text-sky-300 font-mono">nextInt()</code> then starts with a completely clean buffer!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Scanner Newline Bug FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 17: Resolving Scanner Newline Bug"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_002_topic17_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Encountering the Scanner newline skip bug is a rite of passage for every Java programmer. Now that you understand the exact byte-level mechanics in the input stream buffer, you will never be stumped by it again! In our final topic of Module 001_002 (Topic 18), we will learn how to properly close Scanner resources and prevent OS descriptor leaks! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
