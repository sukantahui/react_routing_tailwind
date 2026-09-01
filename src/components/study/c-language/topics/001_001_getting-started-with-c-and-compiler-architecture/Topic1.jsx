import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import versionDemoCode from "./topic1_files/VersionEvolutionDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_001 · Topic 1
          </span>
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            History & Standards Evolution
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          History & Evolution of C: From K&R to Modern C23
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Trace the 50-year evolutionary journey of C—from Dennis Ritchie's PDP-11 laboratory in 1972 through K&R C, ANSI C89/C90, C99, C11, C17, and modern C23 standards.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: The 50-Year Journey of C Programming
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In 1972 at AT&T Bell Laboratories in Murray Hill, New Jersey, <strong>Dennis Ritchie</strong> and <strong>Ken Thompson</strong> were rewriting the Unix operating system kernel. The previous programming language, <em>B</em> (developed by Thompson from BCPL), was a typeless language that operated purely on raw machine memory words.
          </p>
          <p>
            Ritchie enhanced B by introducing structured primitive data types (such as <code>char</code>, <code>int</code>, and typed pointers), creating <strong>C</strong>. C allowed over 95% of the Unix operating system kernel to be written in portable, high-level structured code instead of non-portable assembly language instructions.
          </p>
          <p>
            As C rapidly gained popularity across minicomputers and Unix workstations, different computer vendors implemented custom extensions, creating fragmentation. To unify the language, formal standards were established:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-300">
            <li>
              <strong>K&amp;R C (1978):</strong> Published in Brian Kernighan & Dennis Ritchie's landmark book <em>"The C Programming Language"</em>, serving as the de facto informal specification.
            </li>
            <li>
              <strong>ANSI C89 / ISO C90:</strong> The first formal international standard, introducing function prototypes (compiler parameter checking), the <code>void*</code> generic pointer, and <code>const</code>/<code>volatile</code> qualifiers.
            </li>
            <li>
              <strong>ISO C99:</strong> Modernized C with single-line comments (<code>//</code>), variable declarations anywhere inside code blocks, fixed-width integer types in <code>&lt;stdint.h&gt;</code>, <code>&lt;stdbool.h&gt;</code>, and <code>inline</code> functions.
            </li>
            <li>
              <strong>ISO C11 &amp; C17:</strong> Added native multi-core threading (<code>&lt;threads.h&gt;</code>), compile-time <code>_Static_assert</code>, and static memory alignment controls.
            </li>
            <li>
              <strong>ISO C23:</strong> The latest standard introducing binary literals (<code>0b1010</code>), <code>constexpr</code>, <code>typeof</code> operator, <code>auto</code> type inference, and <code>nullptr</code>.
            </li>
          </ul>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-amber-500 text-slate-300 text-xs md:text-sm mt-4">
            <p className="font-semibold text-amber-300 mb-1">🏫 Classroom Scenario at Coder & AccoTax (Barrackpore & Shyamnagar):</p>
            <p className="leading-relaxed">
              During a systems lab at our Barrackpore academy, <b>Swadeep</b> and <b>Tuhina</b> asked why Java and Python don't need explicit compiler flags like <code>-std=c11</code>. <b>Sukanta Hui</b> explained how C compilers maintain strict backward compatibility across 50 years of standards, allowing 1989 C code to compile alongside modern C23 microservices!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>📅</span> Visual Evolution Timeline (1972 → 2023)
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 300" className="w-full min-w-[750px] font-sans" aria-label="C Standards Timeline">
            <line x1="50" y1="150" x2="870" y2="150" stroke="#475569" strokeWidth="4" strokeDasharray="6" />

            {/* 1972 */}
            <g className="transition-transform duration-300 hover:scale-105">
              <circle cx="90" cy="150" r="14" fill="#38bdf8" stroke="#0284c7" strokeWidth="3" />
              <rect x="20" y="40" width="140" height="80" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="90" y="65" textAnchor="middle" fill="#38bdf8" fontWeight="bold" className="text-xs">1972 · Birth of C</text>
              <text x="90" y="85" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Dennis Ritchie</text>
              <text x="90" y="100" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Bell Labs / Unix</text>
            </g>

            {/* 1978 */}
            <g className="transition-transform duration-300 hover:scale-105">
              <circle cx="230" cy="150" r="14" fill="#818cf8" stroke="#4f46e5" strokeWidth="3" />
              <rect x="160" y="180" width="140" height="80" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="230" y="205" textAnchor="middle" fill="#818cf8" fontWeight="bold" className="text-xs">1978 · K&amp;R C</text>
              <text x="230" y="225" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Informal Spec Book</text>
              <text x="230" y="240" textAnchor="middle" fill="#94a3b8" className="text-[10px]">De Facto Standard</text>
            </g>

            {/* 1989 */}
            <g className="transition-transform duration-300 hover:scale-105">
              <circle cx="370" cy="150" r="14" fill="#f59e0b" stroke="#d97706" strokeWidth="3" />
              <rect x="300" y="40" width="140" height="80" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
              <text x="370" y="65" textAnchor="middle" fill="#f59e0b" fontWeight="bold" className="text-xs">1989 · ANSI C89</text>
              <text x="370" y="85" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Function Prototypes</text>
              <text x="370" y="100" textAnchor="middle" fill="#94a3b8" className="text-[10px]">void* &amp; const</text>
            </g>

            {/* 1999 */}
            <g className="transition-transform duration-300 hover:scale-105">
              <circle cx="510" cy="150" r="14" fill="#34d399" stroke="#059669" strokeWidth="3" />
              <rect x="440" y="180" width="140" height="80" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
              <text x="510" y="205" textAnchor="middle" fill="#34d399" fontWeight="bold" className="text-xs">1999 · ISO C99</text>
              <text x="510" y="225" textAnchor="middle" fill="#94a3b8" className="text-[10px]">// Comments &amp; inline</text>
              <text x="510" y="240" textAnchor="middle" fill="#94a3b8" className="text-[10px]">&lt;stdint.h&gt; &amp; &lt;stdbool.h&gt;</text>
            </g>

            {/* 2011 */}
            <g className="transition-transform duration-300 hover:scale-105">
              <circle cx="650" cy="150" r="14" fill="#ec4899" stroke="#db2777" strokeWidth="3" />
              <rect x="580" y="40" width="140" height="80" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
              <text x="650" y="65" textAnchor="middle" fill="#ec4899" fontWeight="bold" className="text-xs">2011 · ISO C11</text>
              <text x="650" y="85" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Multi-threading</text>
              <text x="650" y="100" textAnchor="middle" fill="#94a3b8" className="text-[10px]">_Static_assert</text>
            </g>

            {/* 2023 */}
            <g className="transition-transform duration-300 hover:scale-105">
              <circle cx="790" cy="150" r="14" fill="#a855f7" stroke="#7e22ce" strokeWidth="3" />
              <rect x="720" y="180" width="140" height="80" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
              <text x="790" y="205" textAnchor="middle" fill="#a855f7" fontWeight="bold" className="text-xs">2023 · ISO C23</text>
              <text x="790" y="225" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Binary literals (0b)</text>
              <text x="790" y="240" textAnchor="middle" fill="#94a3b8" className="text-[10px]">constexpr &amp; typeof</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Technical Breakdown: Comparison of C Standards
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">C Standard</th>
                <th className="p-3">Release Year</th>
                <th className="p-3">Key Features Introduced</th>
                <th className="p-3">GCC Compiler Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-semibold text-sky-400">K&amp;R C</td>
                <td className="p-3">1978</td>
                <td className="p-3">First published book standard; un-prototyped function headers.</td>
                <td className="p-3 font-mono text-amber-300">N/A (Historical)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-sky-400">ANSI C89 / ISO C90</td>
                <td className="p-3">1989 / 1990</td>
                <td className="p-3">Function prototypes, <code>void*</code>, <code>const</code>, <code>volatile</code>, standard library headers.</td>
                <td className="p-3 font-mono text-amber-300">-std=c89</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-sky-400">ISO C99</td>
                <td className="p-3">1999</td>
                <td className="p-3"><code>//</code> comments, inline functions, <code>&lt;stdint.h&gt;</code>, <code>&lt;stdbool.h&gt;</code>, for-loop declarations.</td>
                <td className="p-3 font-mono text-amber-300">-std=c99</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-sky-400">ISO C11</td>
                <td className="p-3">2011</td>
                <td className="p-3">Multi-threading (<code>&lt;threads.h&gt;</code>), <code>_Static_assert</code>, anonymous structs/unions.</td>
                <td className="p-3 font-mono text-amber-300">-std=c11</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-sky-400">ISO C17</td>
                <td className="p-3">2017 / 2018</td>
                <td className="p-3">Maintenance defect fixes and clarifications (no new syntax).</td>
                <td className="p-3 font-mono text-amber-300">-std=c17</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-sky-400">ISO C23</td>
                <td className="p-3">2023</td>
                <td className="p-3">Binary literals (<code>0b1010</code>), <code>constexpr</code>, <code>typeof</code>, <code>auto</code>, <code>nullptr</code>.</td>
                <td className="p-3 font-mono text-amber-300">-std=c23</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: C Standards &amp; Syntax Demonstration
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            The program below (<code>VersionEvolutionDemo.c</code>) demonstrates features across C standards. Notice how modern C99+ allows declaring variables anywhere in the code block, uses <code>uint32_t</code> fixed-width types from <code>&lt;stdint.h&gt;</code>, and uses <code>bool</code> from <code>&lt;stdbool.h&gt;</code>.
          </p>
        </div>

        {/* Code Loader */}
        <CFileLoader fileModule={versionDemoCode} title="VersionEvolutionDemo.c" editable={false} />

        {/* Expected Output Box */}
        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Evolution of C Standards: From K&R to C23
 Educator: Sukanta Hui | Coder & AccoTax
====================================================

1. 1972 - Birth of C at Bell Labs by Dennis Ritchie
   Initial release on PDP-11 for Unix kernel development.

2. 1978 - K&R C (Kernighan & Ritchie)
   First informal specification published.

3. 1989/1990 - ANSI C89 / ISO C90 (C89)
   Function prototypes introduced, void* pointer type added.

4. 1999 - ISO C99 (C99)
   Single-line comments (//), <stdint.h>, <stdbool.h> added.
   Is modern C enabled? YES (C99+ Standard Active)

5. 2011 - ISO C11 (C11)
   Multi-threading support (<threads.h>), _Static_assert introduced.

6. 2023 - ISO C23 (C23)
   Binary literals (0b), typeof operator, constexpr introduced.`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400">
          ⚠️ Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <b>Relying on Non-Standard GCC Extensions:</b> Compiling with non-portable GCC extensions (like statement expressions) without passing <code>-std=c99</code> can cause build failures when compiling on Windows MSVC.
          </li>
          <li>
            <b>Using Deprecated gets() Function:</b> <code>gets()</code> was officially deprecated in C99 and removed in C11 due to security buffer overflow vulnerabilities. Always use <code>fgets()</code> instead!
          </li>
          <li>
            <b>Forgetting Compiler Flags:</b> Always specify explicit standard flags when building C applications: <code>gcc -std=c11 -Wall -Wextra main.c -o main</code>.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400">
          🤔 Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why did C99 introduce exact-width integer types in <code>&lt;stdint.h&gt;</code> like <code>uint8_t</code> and <code>int32_t</code> instead of relying on standard <code>int</code> or <code>long</code>? How does this guarantee cross-platform memory portability when transmitting packets across 32-bit and 64-bit CPU architectures?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_001 Topic 1 FAQs" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_001_topic1_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Understanding C standard revisions is crucial for writing cross-platform industrial code. Always build with -std=c11 -Wall -Wextra to catch standards compliance issues during compilation! — Sukanta Hui" />
      </section>
    </div>
  );
}
