import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import escapeDemoCode from "./topic12_files/EscapeSequencesDemo.java?raw";
import noteText from "./topic12_files/topic12_note.txt?raw";
import questions from "./topic12_files/topic12_questions";

export default function Topic12() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseTerm {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(14, 165, 233, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(14, 165, 233, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-pulse-term {
            animation: pulseTerm 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_002 · Topic 12
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Escape Sequences in Java: <code className="text-sky-400">\n</code>, <code className="text-sky-400">\t</code>, <code className="text-sky-400">\r</code>, <code className="text-sky-400">\b</code>, <code className="text-sky-400">\&apos;</code>, <code className="text-sky-400">\&quot;</code>, <code className="text-sky-400">\\</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master character and string escape sequences: formatting clean tabular output with tabs (<code className="text-sky-300">\t</code>), building live in-place terminal progress bars with carriage returns (<code className="text-amber-300">\r</code>), escaping Windows file paths (<code className="text-emerald-300">\\</code>), and adopting cross-platform newline best practices.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Understanding Escape Sequences in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java source code, certain characters cannot be typed directly because they serve as syntax delimiters (like double quotes <code className="text-amber-300">&quot;</code> or single quotes <code className="text-amber-300">&apos;</code>) or represent non-printable control commands (like newlines or tabs).
          </p>
          <p>
            To include these characters inside <code className="text-purple-300 font-mono">char</code> or <code className="text-purple-300 font-mono">String</code> literals, Java provides <strong>Escape Sequences</strong>—a backslash (<code className="text-sky-300 font-bold">\</code>) followed by a specific character code.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Scenario (Barrackpore &amp; Ichapur Lab):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built a student fee billing terminal for vocational centers in Ichapur and Naihati. They utilized <code className="text-sky-300 font-mono">\t</code> to create perfectly aligned columnar invoices in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) and <code className="text-amber-300 font-mono">\r</code> to render live in-place download progress bars without filling the console screen with redundant scrolling lines.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 8 Standard Java Escape Sequences Architecture
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How escape characters control terminal positioning, quotation encapsulation, and filesystem paths:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 300"
            className="w-full h-auto"
            aria-label="Java Escape Sequences Action Diagram"
          >
            <defs>
              <linearGradient id="gradNl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradTab" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              <linearGradient id="gradCr" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
              <linearGradient id="gradQuotes" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradSlash" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#be185d" />
              </linearGradient>
            </defs>

            {/* Box 1: \n */}
            <rect x="30" y="40" width="150" height="110" rx="10" fill="url(#gradNl)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="105" y="70" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">\n (Line Feed)</text>
            <text x="105" y="95" fill="#f0f9ff" fontSize="12" fontFamily="monospace" textAnchor="middle">ASCII 10 (0x0A)</text>
            <text x="105" y="125" fill="#bae6fd" fontSize="11" textAnchor="middle">&darr; Cursor moves down 1 row</text>

            {/* Box 2: \t */}
            <rect x="195" y="40" width="150" height="110" rx="10" fill="url(#gradTab)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="270" y="70" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">\t (Tab)</text>
            <text x="270" y="95" fill="#eef2ff" fontSize="12" fontFamily="monospace" textAnchor="middle">ASCII 9 (0x09)</text>
            <text x="270" y="125" fill="#c7d2fe" fontSize="11" textAnchor="middle">&rarr; Jump to next tab stop</text>

            {/* Box 3: \r */}
            <rect x="360" y="40" width="160" height="110" rx="10" fill="url(#gradCr)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="70" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">\r (Carriage Return)</text>
            <text x="440" y="95" fill="#fffbeb" fontSize="12" fontFamily="monospace" textAnchor="middle">ASCII 13 (0x0D)</text>
            <text x="440" y="125" fill="#fde68a" fontSize="11" textAnchor="middle">&larr; Reset cursor to column 0</text>

            {/* Box 4: \" and \' */}
            <rect x="535" y="40" width="150" height="110" rx="10" fill="url(#gradQuotes)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="610" y="70" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">\&quot; and \&apos;</text>
            <text x="610" y="95" fill="#ecfdf5" fontSize="12" fontFamily="monospace" textAnchor="middle">ASCII 34 &amp; 39</text>
            <text x="610" y="125" fill="#a7f3d0" fontSize="11" textAnchor="middle">Embed quotes in strings</text>

            {/* Box 5: \\ */}
            <rect x="700" y="40" width="150" height="110" rx="10" fill="url(#gradSlash)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="775" y="70" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">\\ (Backslash)</text>
            <text x="775" y="95" fill="#fdf2f8" fontSize="12" fontFamily="monospace" textAnchor="middle">ASCII 92 (0x5C)</text>
            <text x="775" y="125" fill="#fbcfe8" fontSize="11" textAnchor="middle">Windows paths &amp; Regex</text>

            {/* Lower Demonstration Box: Live In-Place Overwrite Visualizer */}
            <rect x="30" y="170" width="820" height="90" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <text x="50" y="200" fill="#38bdf8" fontSize="13" fontWeight="bold">
              In-Place Console Progress Animation via \r (Carriage Return):
            </text>
            <text x="50" y="225" fill="#94a3b8" fontSize="12" fontFamily="monospace">
              System.out.print(&quot;\r[Downloading Courseware] Progress: 75% [========    ]&quot;);
            </text>
            <text x="50" y="245" fill="#10b981" fontSize="12">
              ✓ Cursor rewinds to the start of the line, dynamically overwriting previous progress without spamming new lines!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Complete Escape Sequence Reference Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Escape</th>
                <th className="p-3 font-semibold text-emerald-400">Character Name</th>
                <th className="p-3 font-semibold text-amber-400">ASCII Code</th>
                <th className="p-3 font-semibold text-purple-400">Primary Industry Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">\n</td>
                <td className="p-3">Line Feed (LF)</td>
                <td className="p-3 font-mono">10 (0x0A)</td>
                <td className="p-3 text-xs">Standard Unix/Linux newline, multiline string splitting</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">\t</td>
                <td className="p-3">Horizontal Tab</td>
                <td className="p-3 font-mono">9 (0x09)</td>
                <td className="p-3 text-xs">Tabular column alignment in invoices and terminal logs</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">\r</td>
                <td className="p-3">Carriage Return (CR)</td>
                <td className="p-3 font-mono">13 (0x0D)</td>
                <td className="p-3 text-xs">Windows CRLF line endings, live in-place CLI progress bars/spinners</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">\b</td>
                <td className="p-3">Backspace</td>
                <td className="p-3 font-mono">8 (0x08)</td>
                <td className="p-3 text-xs">Terminal cursor step-back, erasing previous typed character</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">\&quot;</td>
                <td className="p-3">Double Quote</td>
                <td className="p-3 font-mono">34 (0x22)</td>
                <td className="p-3 text-xs">Embedding JSON payloads and quoted strings without string termination</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">\&apos;</td>
                <td className="p-3">Single Quote</td>
                <td className="p-3 font-mono">39 (0x27)</td>
                <td className="p-3 text-xs">Declaring single quote character literals: <code className="text-emerald-300">&apos;\&apos;&apos;</code></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">\\</td>
                <td className="p-3">Backslash</td>
                <td className="p-3 font-mono">92 (0x5C)</td>
                <td className="p-3 text-xs">Windows directory file paths and Regular Expression meta-character escaping</td>
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
            EscapeSequencesDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program demonstrates escape sequences across tabular student invoice reports in Indian Rupees (₹), live in-place progress bar simulations with <code className="text-sky-300">\r</code>, Windows filesystem paths, and platform-independent line separators.
        </p>

        <JavaFileLoader
          fileModule={escapeDemoCode}
          title="EscapeSequencesDemo.java"
          highlightLines={[20, 21, 22, 23, 30, 31, 32, 40, 47, 48, 56, 62]}
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
              <span>❌</span> Pitfall 1: Unescaped Windows File Paths
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">&quot;C:\Users\newProject\test.txt&quot;</code> causes compilation errors because <code className="text-amber-300 font-mono">\U</code>, <code className="text-amber-300 font-mono">\n</code>, and <code className="text-amber-300 font-mono">\t</code> are interpreted as escape sequences (<code className="text-amber-300 font-mono">\n</code> splits the path across two lines!).
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Double every backslash: <code className="bg-slate-900 px-1 py-0.5 rounded">&quot;C:\\Users\\newProject\\test.txt&quot;</code> or use forward slashes <code className="bg-slate-900 px-1 py-0.5 rounded">&quot;C:/Users/newProject/test.txt&quot;</code> (supported across modern JVMs).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 2: Hardcoding \n in Cross-Platform Server Logs
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">\n</code> generates Unix line endings (LF). When files are opened on older Windows systems or standard Notepad, lines appear run together without breaks.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Use <code className="bg-slate-900 px-1 py-0.5 rounded">System.lineSeparator()</code> or format specifier <code className="bg-slate-900 px-1 py-0.5 rounded">%n</code> in <code className="bg-slate-900 px-1 py-0.5 rounded">System.out.printf()</code>.
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
            🤔 <em>&ldquo;Why does `System.out.println(&quot;\\\\&quot;.length());` output 1, while `System.out.println(&quot;\\\\\\\\&quot;.length());` outputs 2?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Remember the lexer transformation rule: every pair of backslashes in source code (<code className="text-sky-300">\\</code>) collapses into exactly one real backslash character (<code className="text-emerald-400">\</code>) in memory!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Escape Sequences FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 12: Escape Sequences in Java"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_002_topic12_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Escape sequences give you full command of the text console. When building command-line utilities, mastering `\t` for tabular alignment and `\r` for live progress animation turns a plain terminal program into an elegant, commercial-grade tool. Always remember: in printf, prefer %n over \\n! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
