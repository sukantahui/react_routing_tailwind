import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/StringMemoryBasicsDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_006 · Topic 0
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Strings &amp; Text Processing
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Character Arrays vs. Null-Terminated Strings ('\0') &amp; Memory Representation
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Uncover the physical architecture of text in C. Explore why C has no native string primitive type, how the invisible null terminator <code>'\0'</code> dictates buffer boundaries, and the critical difference between mutable stack arrays and read-only string literals.
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
                Teacher's Corner: The Sentence &amp; Full Stop Analogy
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
            In our Barrackpore center, <strong>Swadeep</strong> declared a char array <code>char name[5] = &#123;'H','e','l','l','o'&#125;;</code> and printed it using <code>printf("%s", name);</code>. Instead of printing just "Hello", the terminal printed <code>Hello%@#&amp;!</code> followed by a crash!
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              🛑 The Full-Stop in English Sentences
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Imagine reading an English paragraph where all full stops (period symbols) are erased. You would keep reading past the end of the page into random margins!
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              In C, <code>printf("%s")</code> and string functions don't know array dimensions. They blindly read byte after byte in RAM until they encounter a byte containing <code>0x00</code> (the <strong>Null Terminator <code>'\0'</code></strong>). Without <code>'\0'</code>, C continues reading unowned stack memory into the abyss!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: String Memory Layout &amp; The Null Terminator
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 280" className="w-full min-w-[750px] font-sans">
            <text x="460" y="30" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              String: char city[12] = "Barrackpore"; (11 Letters + 1 Null Terminator '\0' = 12 Bytes)
            </text>

            {/* Letter Cells */}
            <g transform="translate(40, 60)">
              {["B", "a", "r", "r", "a", "c", "k", "p", "o", "r", "e"].map((char, idx) => (
                <g key={idx} transform={`translate(${idx * 68}, 0)`}>
                  <rect x="0" y="0" width="60" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="30" y="32" textAnchor="middle" fill="#fff" className="font-bold text-lg font-mono">'{char}'</text>
                  <text x="30" y="50" textAnchor="middle" fill="#94a3b8" className="text-[10px] font-mono">
                    ASCII {char.charCodeAt(0)}
                  </text>
                  <text x="30" y="80" textAnchor="middle" fill="#f59e0b" className="text-[10px] font-mono">
                    [{idx}]
                  </text>
                </g>
              ))}

              {/* Null Terminator Special Highlight Cell */}
              <g transform="translate(748, 0)">
                <rect x="0" y="0" width="80" height="60" rx="8" fill="#e11d48" stroke="#f43f5e" strokeWidth="2" />
                <text x="40" y="32" textAnchor="middle" fill="#fff" className="font-bold text-lg font-mono">'\0'</text>
                <text x="40" y="50" textAnchor="middle" fill="#fecdd3" className="text-[10px] font-mono">ASCII 0</text>
                <text x="40" y="80" textAnchor="middle" fill="#f59e0b" className="text-[10px] font-mono">[11] STOP</text>
              </g>
            </g>

            {/* Explanatory footer */}
            <rect x="40" y="180" width="840" height="60" rx="8" fill="#0f172a" stroke="#334155" />
            <text x="460" y="205" textAnchor="middle" fill="#34d399" className="text-xs font-mono font-bold">
              ✓ char city[] = "Barrackpore"; → sizeof(city) = 12 Bytes | strlen(city) = 11 Characters
            </text>
            <text x="460" y="225" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
              printf("%s") scans until it reaches '\0' at index [11], halting cleanly!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Mutable Stack vs. Read-Only String Literals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-emerald-300 text-sm">1. Character Array on Stack (Mutable)</h3>
            <p className="font-mono text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
              char str[] = "Hello";<br />
              str[0] = 'M'; // ✅ Perfectly Valid! "Mello"
            </p>
            <p className="text-slate-400 leading-relaxed">
              Allocates 6 mutable bytes directly on the active function stack frame. Elements can be read, overwritten, sorted, and reversed freely.
            </p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-rose-300 text-sm">2. Pointer to String Literal (Read-Only .rodata)</h3>
            <p className="font-mono text-rose-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
              const char *str = "Hello";<br />
              // str[0] = 'M'; // ❌ CRASH (Segmentation Fault)!
            </p>
            <p className="text-slate-400 leading-relaxed">
              Resides in write-protected <code>.rodata</code> virtual memory pages. Always qualify with <code>const char *</code> to catch illegal writes at compile time!
            </p>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: String Memory Inspection Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>StringMemoryBasicsDemo.c</code>) demonstrates byte-by-byte string memory inspection, displays ASCII and Hex codes, and proves the existence of the terminating <code>'\0'</code>.
        </p>

        <CFileLoader fileModule={cCode} title="StringMemoryBasicsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 C Strings: Character Arrays & Null-Terminator '\\0'
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

String 'city' ("Barrackpore") has length 12 bytes in memory.
Pointer 'educator' ("Sukanta Hui") has sizeof(educator) = 8 bytes (Pointer size).

🔍 Byte-by-Byte Memory & ASCII Inspection for 'city':
-------------------------------------------------------------------
Index   | Memory Address   | Char     | ASCII Code   | Hex Value 
-------------------------------------------------------------------
[ 0]    | 0000004AE0BFF920   | 'B'      | 66           | 0x42
[ 1]    | 0000004AE0BFF921   | 'a'      | 97           | 0x61
[ 2]    | 0000004AE0BFF922   | 'r'      | 114          | 0x72
[ 3]    | 0000004AE0BFF923   | 'r'      | 114          | 0x72
[ 4]    | 0000004AE0BFF924   | 'a'      | 97           | 0x61
[ 5]    | 0000004AE0BFF925   | 'c'      | 99           | 0x63
[ 6]    | 0000004AE0BFF926   | 'k'      | 107          | 0x6B
[ 7]    | 0000004AE0BFF927   | 'p'      | 112          | 0x70
[ 8]    | 0000004AE0BFF928   | 'o'      | 111          | 0x6F
[ 9]    | 0000004AE0BFF929   | 'r'      | 114          | 0x72
[10]    | 0000004AE0BFF92A   | 'e'      | 101          | 0x65
[11]    | 0000004AE0BFF92B   | '\\0'     | 0            | 0x00 (NULL TERMINATOR)
-------------------------------------------------------------------

💡 Raw Char Array vs Null-Terminated String Output:
 • With '\\0' (str) : "Hello"
 • Note: Printing 'charArr' without '\\0' using %s leads to Undefined Behavior!`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Memory Safety Rules
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <strong>Off-By-One Buffer Sizing:</strong> Declaring <code>char str[5] = "Hello";</code> is a critical trap! "Hello" needs 6 bytes. <code>str</code> will not have a null terminator, causing <code>printf("%s")</code> to read past array limits!
          </li>
          <li>
            <strong>Comparing Strings with <code>==</code>:</strong> Writing <code>if (str == "admin")</code> compares pointer memory addresses, NOT text contents! Always use <code>strcmp(str, "admin") == 0</code>.
          </li>
          <li>
            <strong>Modifying String Literals:</strong> Writing through <code>char *p = "text"; p[0] = 'T';</code> crashes on modern operating systems because string literals are write-protected in <code>.rodata</code>.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does <code>sizeof('A')</code> return 4 bytes in C (type <code>int</code>), while <code>sizeof("A")</code> returns 2 bytes (array of 2 chars <code>'A'</code> and <code>'\0'</code>)?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_006 Topic 0 FAQs: String Basics & Memory" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_006 Topic 0 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 0 Note"
          downloadFileName="module_002_006_topic0_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Never forget the +1 rule: if a user can type a 20-character username, allocate at least char username[21] to hold the invisible null terminator '\0'! — Sukanta Hui" />
      </section>
    </div>
  );
}
