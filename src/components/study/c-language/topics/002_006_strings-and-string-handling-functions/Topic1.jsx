import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic1_files/SafeStringIODemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_006 · Topic 1
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Secure Input / Output
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Safe String Input/Output: gets() Vulnerabilities, fgets() &amp; scanf() Pitfalls
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master secure string input handling in C. Understand why <code>gets()</code> was permanently banned from the ISO C standard (CWE-120), learn bounded input buffering with <code>fgets()</code>, sanitize trailing newlines, and avoid input stream buffering traps.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY CNAT STYLE) */}
      <section className="space-y-6 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 text-xl border border-indigo-500/30">
              🧑‍🏫
            </span>
            <div>
              <h2 className="text-2xl font-black text-indigo-200 tracking-tight">
                Teacher's Corner: The Overflowing Water Bucket
              </h2>
              <p className="text-xs text-indigo-300/80">
                Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Security Insight
          </span>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In our lab, <strong>Abhronila</strong> was writing a student admission form and used <code>gets(studentName);</code> with a 20-character buffer. When <strong>Debangshu</strong> entered a long 60-character test name, the program suddenly displayed a security alert: <em>*** stack smashing detected ***: terminated</em>!
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🌊 The Water Bucket with No Rim Guard
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              <code>gets()</code> is like pouring a high-pressure fire hose into a small 5-liter bucket with no overflow shut-off valve. The water floods the entire floor, short-circuiting electrical appliances! In computing, excess characters spill over the stack frame, overwriting the CPU's Instruction Pointer (return address). This is the notorious <strong>Buffer Overflow exploit (CWE-120)</strong>.
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              <code>fgets(buffer, sizeof(buffer), stdin)</code>, by contrast, has an automatic shut-off valve: it strictly stops pouring after <code>sizeof(buffer) - 1</code> characters, protecting your stack!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Stack Frame Smashing vs. Bounded Input
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 300" className="w-full min-w-[750px] font-sans">
            {/* Unsafe gets() diagram */}
            <g transform="translate(40, 40)">
              <rect x="0" y="0" width="380" height="220" rx="10" fill="#1e1e2e" stroke="#ef4444" strokeWidth="2" />
              <text x="190" y="30" textAnchor="middle" fill="#f87171" className="font-bold text-sm">
                ❌ Unsafe gets() (Buffer Overflow Attack)
              </text>
              <rect x="30" y="55" width="320" height="40" rx="6" fill="#1e293b" stroke="#64748b" />
              <text x="190" y="80" textAnchor="middle" fill="#94a3b8" className="text-xs">char name[10] (Allocated Buffer)</text>

              {/* Overflow spill */}
              <rect x="30" y="105" width="320" height="40" rx="6" fill="#e11d48" opacity="0.8" />
              <text x="190" y="130" textAnchor="middle" fill="#fff" className="font-bold text-xs">
                ⚠️ Spills into Stack Frame Memory!
              </text>

              <rect x="30" y="155" width="320" height="40" rx="6" fill="#b91c1c" />
              <text x="190" y="180" textAnchor="middle" fill="#fecdd3" className="font-bold text-xs font-mono">
                Overwrites Return Address → CRASH!
              </text>
            </g>

            {/* Safe fgets() diagram */}
            <g transform="translate(500, 40)">
              <rect x="0" y="0" width="380" height="220" rx="10" fill="#1e1e2e" stroke="#10b981" strokeWidth="2" />
              <text x="190" y="30" textAnchor="middle" fill="#34d399" className="font-bold text-sm">
                ✅ Safe fgets(name, 10, stdin) (Bounded Input)
              </text>
              <rect x="30" y="55" width="320" height="50" rx="6" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="190" y="80" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs font-mono">
                Reads max 9 chars + appends '\0'
              </text>
              <text x="190" y="98" textAnchor="middle" fill="#94a3b8" className="text-[10px]">
                Remaining input stays safely in stdin stream
              </text>

              <rect x="30" y="130" width="320" height="65" rx="6" fill="#0f172a" stroke="#475569" />
              <text x="190" y="155" textAnchor="middle" fill="#10b981" className="font-bold text-xs">
                ✓ Stack Frame Remains Intact &amp; Secure
              </text>
              <text x="190" y="178" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
                Zero memory corruption / No stack overflow
              </text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: String I/O Methods Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3 border-b border-slate-700">Function</th>
                <th className="p-3 border-b border-slate-700">Reads Spaces?</th>
                <th className="p-3 border-b border-slate-700">Bounds Checked?</th>
                <th className="p-3 border-b border-slate-700">Captures '\n'?</th>
                <th className="p-3 border-b border-slate-700">ISO Standard Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 bg-slate-900/60">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-rose-400 font-mono">gets(str)</td>
                <td className="p-3 text-emerald-400">Yes</td>
                <td className="p-3 text-rose-400 font-bold">NO (Dangerous!)</td>
                <td className="p-3 text-slate-400">No</td>
                <td className="p-3 text-rose-400 font-bold">REMOVED in C11</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-emerald-400 font-mono">fgets(s, n, stdin)</td>
                <td className="p-3 text-emerald-400">Yes</td>
                <td className="p-3 text-emerald-400 font-bold">YES (Safe)</td>
                <td className="p-3 text-amber-400 font-bold">YES (Must trim)</td>
                <td className="p-3 text-emerald-400 font-bold">Standard &amp; Recommended</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-amber-300 font-mono">scanf("%s", s)</td>
                <td className="p-3 text-rose-400">NO (Stops at space)</td>
                <td className="p-3 text-rose-400">NO (Unless %29s used)</td>
                <td className="p-3 text-slate-400">No</td>
                <td className="p-3 text-amber-400">Use with width limits only</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-bold text-sky-300 font-mono">puts(s)</td>
                <td className="p-3 text-slate-400">N/A (Output)</td>
                <td className="p-3 text-slate-400">N/A</td>
                <td className="p-3 text-emerald-400">Appends '\n' automatically</td>
                <td className="p-3 text-emerald-400 font-bold">Standard Output</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Safe String Input &amp; Sanitization Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>SafeStringIODemo.c</code>) demonstrates reading strings safely, removing trailing newline characters, bounded <code>sscanf</code> extraction, and formatted <code>puts()</code> console output.
        </p>

        <CFileLoader fileModule={cCode} title="SafeStringIODemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Safe String Input/Output (fgets vs gets & scanf)
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

1. Raw input captured by fgets(): "Swadeep Mukherjee
"
   Notice trailing '\\n' at end of string.

2. Sanitized string after trimTrailingNewline(): "Swadeep Mukherjee"

3. Bounded Single Word parsing: "Barrackpore"

4. Output using puts():
   ✓ puts() automatically appends a newline character!
Swadeep Mukherjee`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Security Rules
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <strong>NEVER Call <code>gets()</code>:</strong> Modern GCC compilers generate build warnings or refuse to link <code>gets()</code> because it enables arbitrary stack smashing exploits.
          </li>
          <li>
            <strong>Forgetting to Strip Trailing <code>\n</code>:</strong> <code>fgets()</code> retains the newline character. If you compare with <code>strcmp(str, "admin")</code> without trimming, it compares with <code>"admin\n"</code> and fails!
          </li>
          <li>
            <strong>Calling <code>fflush(stdin)</code>:</strong> <code>fflush()</code> is strictly undefined on input streams according to ISO C. To clear <code>stdin</code>, loop with <code>while ((c = getchar()) != '\n' && c != EOF);</code>.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does <code>scanf("%d", &amp;age);</code> followed immediately by <code>fgets(name, sizeof(name), stdin);</code> skip user input for name? 
          <em>(Hint: Where does the newline character from pressing 'Enter' after age go?)</em>
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_006 Topic 1 FAQs: Safe String I/O" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_006 Topic 1 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 1 Note"
          downloadFileName="module_002_006_topic1_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Always clean up your input buffers! In C, stdin is a continuous character stream—if you leave a newline hanging from scanf, fgets will eat it immediately! — Sukanta Hui" />
      </section>
    </div>
  );
}
