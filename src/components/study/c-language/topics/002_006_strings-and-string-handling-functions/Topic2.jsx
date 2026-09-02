import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic2_files/StringHLibraryDemo.c?raw";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_006 · Topic 2
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Standard Library Utilities
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Standard String Library Functions (&lt;string.h&gt;)
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master the complete standard C string manipulation header: <code>strlen</code>, <code>strcpy</code>/<code>strncpy</code>, <code>strcat</code>/<code>strncat</code>, <code>strcmp</code>/<code>strncmp</code>, <code>strchr</code>, and <code>strstr</code> with pointer return semantics.
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
                Teacher's Corner: The Standard Toolbag for Text
              </h2>
              <p className="text-xs text-indigo-300/80">
                Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Insight
          </span>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            When <strong>Tuhina</strong> and <strong>Swadeep</strong> were building a student record search tool, they wrote manual while loops to measure word lengths, copy names, and search substrings. 
          </p>
          <p>
            <strong>Sukanta Hui</strong> introduced the C standard library <code>&lt;string.h&gt;</code>: <em>"These routines are written in highly optimized assembly by compiler engineers to utilize SIMD CPU vector registers (AVX/SSE). Knowing their exact behavior, pointer return types, and buffer safety boundaries is essential for every systems programmer!"</em>
          </p>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: &lt;string.h&gt; Core Function Operations
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Standard &lt;string.h&gt; Pipeline: Copying, Concatenating, Comparing &amp; Substring Search
            </text>

            {/* strcpy */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="190" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="95" y="28" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">strcpy(dest, src)</text>
              <text x="95" y="52" textAnchor="middle" fill="#fff" className="font-mono text-xs">"Hello" → dest</text>
              <text x="95" y="72" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Overwrites dest with src + '\0'</text>
            </g>

            {/* strcat */}
            <g transform="translate(260, 50)">
              <rect x="0" y="0" width="190" height="90" rx="8" fill="#1e293b" stroke="#818cf8" strokeWidth="1.5" />
              <text x="95" y="28" textAnchor="middle" fill="#818cf8" className="font-bold text-sm">strcat(dest, src)</text>
              <text x="95" y="52" textAnchor="middle" fill="#fff" className="font-mono text-xs">"Hi" + "World" → "HiWorld"</text>
              <text x="95" y="72" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Appends src at dest's '\0'</text>
            </g>

            {/* strcmp */}
            <g transform="translate(480, 50)">
              <rect x="0" y="0" width="190" height="90" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
              <text x="95" y="28" textAnchor="middle" fill="#34d399" className="font-bold text-sm">strcmp(s1, s2)</text>
              <text x="95" y="52" textAnchor="middle" fill="#fff" className="font-mono text-xs">ASCII Difference</text>
              <text x="95" y="72" textAnchor="middle" fill="#94a3b8" className="text-[10px]">0: Match | &lt;0: s1&lt;s2 | &gt;0: s1&gt;s2</text>
            </g>

            {/* strstr */}
            <g transform="translate(700, 50)">
              <rect x="0" y="0" width="180" height="90" rx="8" fill="#1e293b" stroke="#f472b6" strokeWidth="1.5" />
              <text x="90" y="28" textAnchor="middle" fill="#f472b6" className="font-bold text-sm">strstr(haystack, needle)</text>
              <text x="90" y="52" textAnchor="middle" fill="#fff" className="font-mono text-xs">Substring Search</text>
              <text x="90" y="72" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Returns char* pointer or NULL</text>
            </g>

            {/* Bottom rule banner */}
            <rect x="40" y="170" width="840" height="80" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="460" y="200" textAnchor="middle" fill="#f59e0b" className="text-xs font-mono font-bold">
              ⚡ Bound Protection: Always prefer strncpy(), strncat(), strncmp() &amp; snprintf()!
            </text>
            <text x="460" y="225" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
              Remember: strncpy does NOT append '\0' if source length exceeds n! Always manually assign dest[n-1] = '\0'.
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Function Signatures &amp; Return Types
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300 uppercase text-[11px] font-bold">
              <tr>
                <th className="p-3 border-b border-slate-700">Function Signature</th>
                <th className="p-3 border-b border-slate-700">Return Type</th>
                <th className="p-3 border-b border-slate-700">Operation</th>
                <th className="p-3 border-b border-slate-700">Safety Caveat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 bg-slate-900/60">
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-mono text-emerald-400">size_t strlen(const char *s)</td>
                <td className="p-3 font-mono">size_t</td>
                <td className="p-3">Counts characters up to '\0'</td>
                <td className="p-3 text-rose-300">Passing NULL crashes immediately</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-mono text-emerald-400">char *strcpy(char *d, const char *s)</td>
                <td className="p-3 font-mono">char* (dest)</td>
                <td className="p-3">Copies string s into d</td>
                <td className="p-3 text-rose-300">No bounds check on destination</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-mono text-emerald-400">char *strcat(char *d, const char *s)</td>
                <td className="p-3 font-mono">char* (dest)</td>
                <td className="p-3">Appends string s to d</td>
                <td className="p-3 text-rose-300">Dest must have adequate pre-allocated space</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-mono text-emerald-400">int strcmp(const char *s1, const char *s2)</td>
                <td className="p-3 font-mono">int</td>
                <td className="p-3">Lexicographical comparison</td>
                <td className="p-3 text-amber-300">Returns 0 on match (not boolean true)</td>
              </tr>
              <tr className="hover:bg-slate-800/40">
                <td className="p-3 font-mono text-emerald-400">char *strstr(const char *h, const char *n)</td>
                <td className="p-3 font-mono">char*</td>
                <td className="p-3">Locates substring n in h</td>
                <td className="p-3 text-emerald-400">Returns NULL if substring not found</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: &lt;string.h&gt; Functions Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>StringHLibraryDemo.c</code>) demonstrates measuring lengths, copying, concatenating, comparing, and locating characters and substrings using standard header routines.
        </p>

        <CFileLoader fileModule={cCode} title="StringHLibraryDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Standard String Library (<string.h>) Functions
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

1. strlen("Barrackpore") = 11 characters

2. strcpy(dest1, "Barrackpore") → dest1 = "Barrackpore"
   strncpy(boundedDest, "Barrackpore", 5) → boundedDest = "Barra"

3. strcat(dest2, "Barrackpore") → dest2 = "Coder & AccoTax, Barrackpore"

4. strcmp("Apple", "Banana") = -1 (Apple < Banana)
   strcmp("Apple", "Apple") = 0 (Identical Strings)
   strncmp("Barrack", "Barrackpore", 7) = 0 (First 7 chars match!)

5. strchr('P') found at offset 10: "Programming in Barrackpore, West Bengal"
6. strstr("Barrackpore") found at offset 25: "Barrackpore, West Bengal"`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <strong><code>strncpy()</code> Missing Null Terminator:</strong> If source length &gt;= <code>n</code>, <code>strncpy()</code> will NOT append <code>'\0'</code>! Always manually set <code>dest[n - 1] = '\0';</code>.
          </li>
          <li>
            <strong>Assuming <code>strcmp()</code> Returns Boolean True on Match:</strong> <code>strcmp</code> returns <strong>0</strong> when strings are equal! Writing <code>if (strcmp(a, b))</code> treats equal strings as FALSE! Always write <code>if (strcmp(a, b) == 0)</code>.
          </li>
          <li>
            <strong>Calling <code>strcat()</code> Without Destination Capacity:</strong> If <code>dest</code> has only 10 bytes and currently holds 8 characters, calling <code>strcat(dest, "World")</code> causes a stack buffer overflow.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          How can you calculate the exact zero-based integer index of a found substring in <code>haystack</code> using pointer subtraction? 
          <em>(Hint: <code>int index = strstr(haystack, needle) - haystack;</code>!)</em>
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_006 Topic 2 FAQs: <string.h> Utilities" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_006 Topic 2 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 2 Note"
          downloadFileName="module_002_006_topic2_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Always verify the return value of strchr() and strstr() against NULL before attempting to dereference the pointer! If a search target does not exist, dereferencing NULL causes a segmentation fault. — Sukanta Hui" />
      </section>
    </div>
  );
}
