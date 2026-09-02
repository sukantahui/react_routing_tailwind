import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic3_files/CustomStringAlgorithmsDemo.c?raw";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

export default function Topic3() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_006 · Topic 3
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Pure C Algorithms
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Custom String Manipulation Algorithms (Without &lt;string.h&gt;)
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Re-engineer fundamental string algorithms from first principles. Implement pointer-based <code>my_strlen</code>, <code>my_strcpy</code>, in-place string reversal, palindrome detection, and ASCII case conversion routines without third-party library dependencies.
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
                Teacher's Corner: The Magic Behind the Black Box
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
            In our Barrackpore laboratory, <strong>Sukanta Hui</strong> often asks advanced students: <em>"If you are programming an aerospace microcontroller or an embedded medical device with no standard library available, how do you measure, copy, reverse, and compare strings?"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              ⚙️ Pure Pointer Mechanics
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Every string function is simply a loop that traverses characters until <code>*ptr == '\0'</code>. Understanding how to build custom string engines gives you total freedom in embedded firmware, custom game engines, and OS kernel development where standard libraries cannot be linked!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: In-Place String Reversal Algorithm
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="30" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              In-Place String Reversal: Two Pointers i and j Swapping Towards Center
            </text>

            {/* Step 1 */}
            <g transform="translate(60, 60)">
              <text x="0" y="20" fill="#f59e0b" className="text-xs font-bold">Step 1: Swap str[0] ('B') and str[10] ('e')</text>
              <rect x="0" y="30" width="45" height="40" rx="6" fill="#e11d48" />
              <text x="22" y="55" textAnchor="middle" fill="#fff" className="font-bold text-sm font-mono">'e'</text>
              <rect x="50" y="30" width="160" height="40" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="130" y="55" textAnchor="middle" fill="#94a3b8" className="font-mono text-xs">arrackpor</text>
              <rect x="215" y="30" width="45" height="40" rx="6" fill="#38bdf8" />
              <text x="237" y="55" textAnchor="middle" fill="#fff" className="font-bold text-sm font-mono">'B'</text>
            </g>

            {/* Step 2 */}
            <g transform="translate(420, 60)">
              <text x="0" y="20" fill="#f59e0b" className="text-xs font-bold">Step 2: Advance i++, Decrement j-- → Swap 'a' and 'r'</text>
              <rect x="0" y="30" width="40" height="40" rx="6" fill="#1e293b" stroke="#34d399" />
              <text x="20" y="55" textAnchor="middle" fill="#34d399" className="font-mono text-xs">'e'</text>
              <rect x="45" y="30" width="45" height="40" rx="6" fill="#e11d48" />
              <text x="67" y="55" textAnchor="middle" fill="#fff" className="font-bold text-sm font-mono">'r'</text>
              <rect x="95" y="30" width="80" height="40" rx="6" fill="#1e293b" stroke="#475569" />
              <text x="135" y="55" textAnchor="middle" fill="#94a3b8" className="font-mono text-xs">rackp</text>
              <rect x="180" y="30" width="45" height="40" rx="6" fill="#38bdf8" />
              <text x="202" y="55" textAnchor="middle" fill="#fff" className="font-bold text-sm font-mono">'a'</text>
              <rect x="230" y="30" width="40" height="40" rx="6" fill="#1e293b" stroke="#34d399" />
              <text x="250" y="55" textAnchor="middle" fill="#34d399" className="font-mono text-xs">'B'</text>
            </g>

            {/* Final result */}
            <rect x="60" y="160" width="800" height="60" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="460" y="185" textAnchor="middle" fill="#10b981" className="text-xs font-mono font-bold">
              ✓ Process terminates when i &gt;= j at the middle character in O(N/2) = O(N) Time and O(1) Space!
            </text>
            <text x="460" y="205" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
              Final Result: "eropkcarraB" (Reversed completely in place)
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: The Classic K&amp;R C Idiom
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-indigo-300 text-sm">The 1-Line strcpy Loop</h3>
            <p className="font-mono text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
              while ((*dest++ = *src++));
            </p>
            <p className="text-slate-400 leading-relaxed">
              1. <code>*src</code> is copied into <code>*dest</code>.<br />
              2. Both pointers are incremented to the next memory address.<br />
              3. The loop continues until the copied character is <code>'\0'</code> (evaluating to false / 0).
            </p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-indigo-300 text-sm">ASCII Case Conversion Arithmetic</h3>
            <div className="font-mono text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <p className="text-sky-300">// Lowercase to Uppercase:</p>
              <p className="text-emerald-400">c = c - 32; // ('a' 97 - 32 = 'A' 65)</p>
              <p className="text-sky-300 pt-1">// Uppercase to Lowercase:</p>
              <p className="text-emerald-400">c = c + 32; // ('A' 65 + 32 = 'a' 97)</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Custom String Manipulation Engine Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>CustomStringAlgorithmsDemo.c</code>) demonstrates manual implementations of length counting, string copying, in-place reversal, palindrome checking, and uppercase conversion.
        </p>

        <CFileLoader fileModule={cCode} title="CustomStringAlgorithmsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 Custom String Manipulation Algorithms (No string.h)
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

1. my_strlen("Barrackpore") = 11

2. my_strcpy(buffer, "Barrackpore") → buffer = "Barrackpore"

3. my_reverse() on "Barrackpore" → "eropkcarraB"

4. Palindrome Tests:
   • Is "Madam" a palindrome? NO (Case Mismatch)
   • Is "radar" a palindrome? YES (Palindrome)

5. Lowercase string : "shyamnagar"
   my_to_uppercase() : "SHYAMNAGAR"`}
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
            <strong>Forgetting to Null-Terminate in Custom Functions:</strong> When writing a function that generates or copies a string, always assign <code>*dest = '\0';</code> at the conclusion of the copy loop.
          </li>
          <li>
            <strong>Case Sensitivity in Palindrome Checking:</strong> "Racecar" will fail a simple character equality check because <code>'R' != 'r'</code>. Normalize both sides with <code>tolower()</code> if case-insensitive matching is required.
          </li>
          <li>
            <strong>Modifying Read-Only String Pointers:</strong> Passing <code>char *str = "text";</code> into <code>my_reverse(str)</code> will crash with a Segmentation Fault because string literals reside in <code>.rodata</code>.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          How can you reverse the order of words in a sentence (e.g., turning <code>"I love C"</code> into <code>"C love I"</code>) in $O(n)$ time using only in-place reversals? 
          <em>(Hint: First reverse the entire sentence, then reverse each word individually!)</em>
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_006 Topic 3 FAQs: Custom String Manipulation" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_006 Topic 3 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 3 Note"
          downloadFileName="module_002_006_topic3_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Re-implementing standard library functions from scratch is the #1 way to build deep pointer intuition and master low-level memory mechanics! — Sukanta Hui" />
      </section>
    </div>
  );
}
