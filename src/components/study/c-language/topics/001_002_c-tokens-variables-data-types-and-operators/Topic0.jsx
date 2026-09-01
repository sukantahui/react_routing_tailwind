import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/CTokensDemo.c?raw";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";

export default function Topic0() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_002 · Topic 0
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Lexical Analysis &amp; C Tokens
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          C Tokens: Keywords, Identifiers, Constants, Strings, Symbols &amp; Operators
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master the fundamental atomic elements of C source code. Explore how the compiler’s lexical scanner tokenizes keywords, identifier naming constraints, literal constants across bases, string literals, punctuators, and computational operators.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: The Lexical Anatomy of C Programs
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            When you pass a C source file (<code>.c</code>) to the compiler toolchain, the compiler’s front-end runs a <strong>Lexical Analyzer (Scanner)</strong>. The scanner breaks down raw character streams into the smallest syntactically meaningful units called <strong>Tokens</strong>.
          </p>
          <p>
            Every single line of code you write in C is composed strictly of six token classifications:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs md:text-sm">
            <li className="bg-slate-900/70 p-3 rounded-xl border border-slate-750">
              <strong className="text-sky-400 block mb-1">1. Keywords (Reserved Words)</strong>
              32 core words in ANSI C89 (e.g., <code>int</code>, <code>float</code>, <code>return</code>, <code>if</code>, <code>while</code>) with immutable system meanings.
            </li>
            <li className="bg-slate-900/70 p-3 rounded-xl border border-slate-750">
              <strong className="text-emerald-400 block mb-1">2. Identifiers</strong>
              Programmer-defined symbolic names for variables, functions, and arrays adhering to strict character rules.
            </li>
            <li className="bg-slate-900/70 p-3 rounded-xl border border-slate-750">
              <strong className="text-amber-400 block mb-1">3. Constants (Literals)</strong>
              Fixed, immutable values: Decimal (<code>101</code>), Hex (<code>0x2A</code>), Octal (<code>052</code>), Float (<code>3.14f</code>), Char (<code>'A'</code>).
            </li>
            <li className="bg-slate-900/70 p-3 rounded-xl border border-slate-750">
              <strong className="text-purple-400 block mb-1">4. String Literals</strong>
              Double-quoted character arrays terminated automatically by a null character (<code>'\0'</code>) in <code>.rodata</code>.
            </li>
            <li className="bg-slate-900/70 p-3 rounded-xl border border-slate-750">
              <strong className="text-pink-400 block mb-1">5. Special Symbols / Punctuators</strong>
              Syntactic boundaries: Semicolons (<code>;</code>), Braces (<code>{`{}`}</code>), Parentheses (<code>()</code>), Brackets (<code>[]</code>), Commas (<code>,</code>).
            </li>
            <li className="bg-slate-900/70 p-3 rounded-xl border border-slate-750">
              <strong className="text-cyan-400 block mb-1">6. Operators</strong>
              Instruction symbols directing the CPU to perform computation: Arithmetic, Relational, Logical, Bitwise, and Assignment.
            </li>
          </ul>

          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2 mt-4">
            <p className="font-semibold text-amber-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore Lab):</p>
            <p>
              During a lab session, <strong>Abhronila</strong> declared a variable as <code>int 2ndSemesterTotal;</code> and encountered a baffling compilation error. <strong>Sukanta Hui</strong> demonstrated to <strong>Swadeep</strong>, <strong>Tuhina</strong>, and <strong>Debangshu</strong> how the GCC lexical analyzer starts reading <code>2</code> as a numeric constant token, then encounters letters <code>ndSemesterTotal</code>, resulting in an immediate lexical syntax violation. Renaming it to <code>secondSemesterTotal</code> or <code>_2ndSemesterTotal</code> solved the problem instantly.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Lexical Scanner Token Stream
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
            
            {/* Input C Code Stream */}
            <text x="460" y="40" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              C Source Code Input Stream: const int roll = 101;
            </text>

            {/* Token Boxes */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="30" y="70" width="120" height="75" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="90" y="100" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">const</text>
              <text x="90" y="125" textAnchor="middle" fill="#94a3b8" className="text-[10px]">KEYWORD</text>
            </g>

            <path d="M 155 107 L 175 107" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="180" y="70" width="120" height="75" rx="10" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="240" y="100" textAnchor="middle" fill="#34d399" className="font-bold text-xs">int</text>
              <text x="240" y="125" textAnchor="middle" fill="#94a3b8" className="text-[10px]">KEYWORD</text>
            </g>

            <path d="M 305 107 L 325 107" stroke="#64748b" strokeWidth="2" />

            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="330" y="70" width="130" height="75" rx="10" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
              <text x="395" y="100" textAnchor="middle" fill="#fbbf24" className="font-bold text-xs">roll</text>
              <text x="395" y="125" textAnchor="middle" fill="#94a3b8" className="text-[10px]">IDENTIFIER</text>
            </g>

            <path d="M 465 107 L 485 107" stroke="#64748b" strokeWidth="2" />

            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="490" y="70" width="100" height="75" rx="10" fill="#1e293b" stroke="#a78bfa" strokeWidth="2" />
              <text x="540" y="100" textAnchor="middle" fill="#a78bfa" className="font-bold text-xs">=</text>
              <text x="540" y="125" textAnchor="middle" fill="#94a3b8" className="text-[10px]">OPERATOR</text>
            </g>

            <path d="M 595 107 L 615 107" stroke="#64748b" strokeWidth="2" />

            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="620" y="70" width="120" height="75" rx="10" fill="#1e293b" stroke="#f472b6" strokeWidth="2" />
              <text x="680" y="100" textAnchor="middle" fill="#f472b6" className="font-bold text-xs">101</text>
              <text x="680" y="125" textAnchor="middle" fill="#94a3b8" className="text-[10px]">CONSTANT</text>
            </g>

            <path d="M 745 107 L 765 107" stroke="#64748b" strokeWidth="2" />

            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="770" y="70" width="110" height="75" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="825" y="100" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">;</text>
              <text x="825" y="125" textAnchor="middle" fill="#94a3b8" className="text-[10px]">PUNCTUATOR</text>
            </g>

            {/* Bottom Summary Bar */}
            <rect x="30" y="180" width="850" height="60" rx="10" fill="#111827" stroke="#334155" strokeWidth="1" />
            <text x="455" y="205" textAnchor="middle" fill="#e2e8f0" className="text-xs font-medium">
              Lexical Scanner Output: Continuous Stream of Typed Token Structs Fed into Abstract Syntax Tree (AST) Parser
            </text>
            <text x="455" y="225" textAnchor="middle" fill="#64748b" className="text-[11px]">
              Whitespace and comments are completely stripped before token tree generation.
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: Token Classification &amp; Validity Matrix
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-indigo-300 text-sm flex items-center gap-2">
              <span>✅</span> Valid vs Invalid Identifiers
            </h3>
            <div className="space-y-2 text-slate-300">
              <div className="p-2 bg-emerald-950/40 border border-emerald-800/40 rounded-lg">
                <span className="font-mono text-emerald-300 font-bold">totalMarks, _counter, student_1, MAX_SIZE</span>
                <p className="text-[11px] text-slate-400">Valid: Starts with letter/underscore, uses legal alphanumeric chars.</p>
              </div>
              <div className="p-2 bg-rose-950/40 border border-rose-800/40 rounded-lg">
                <span className="font-mono text-rose-300 font-bold">1stRank, student-age, for, total$</span>
                <p className="text-[11px] text-slate-400">Invalid: Starts with digit, contains hyphens/symbols, or conflicts with keywords.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-amber-300 text-sm flex items-center gap-2">
              <span>🔢</span> Numeric Literal Representation Bases
            </h3>
            <div className="space-y-2 text-slate-300">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-700">
                <span className="font-mono text-sky-300">Decimal (Base 10): </span>
                <code>42</code> (Digits 0–9)
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-700">
                <span className="font-mono text-amber-300">Octal (Base 8): </span>
                <code>052</code> (Prefix 0, Digits 0–7 = 42 Decimal)
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-700">
                <span className="font-mono text-purple-300">Hexadecimal (Base 16): </span>
                <code>0x2A</code> (Prefix 0x, Digits 0–9, A–F = 42 Decimal)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: C Tokens Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>CTokensDemo.c</code>) demonstrates all six token categories in action: keywords, valid identifiers, integer and floating literals across different number bases, string literals, punctuators, and relational/arithmetic operators.
        </p>

        <CFileLoader fileModule={cCode} title="CTokensDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`========================================================
     C TOKENS DEMONSTRATION - Coder & AccoTax
     Location: Barrackpore, Kolkata | Year: 2026
========================================================

--- [1 & 2] Keywords & Valid Identifiers ---
Student Name      : Abhronila Saha
Roll Number       : 101
Age               : 19 years
Section           : A
Exam Score        : 94.75%

--- [3 & 4] Constants & Numeric Literals ---
Hex Constant 0x2A : Decimal 42
Octal Constant 052: Decimal 42

--- [5 & 6] Operators & Evaluated Expressions ---
Classes Attended  : 114 / 120
Attendance Rate   : 95.00%
Eligibility Status: ELIGIBLE FOR LAB EXAM
========================================================`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li><strong>Accidental Octal Conversion:</strong> Adding a leading zero (e.g. <code>int pincode = 07001;</code>) causes GCC to parse the literal as Base-8 octal, resulting in compilation errors if digits 8 or 9 are present!</li>
          <li><strong>Modifying String Literals:</strong> Writing <code>char *str = "Hello"; str[0] = 'h';</code> triggers undefined behavior (SIGSEGV / segmentation fault) because string literals reside in read-only <code>.rodata</code> segment.</li>
          <li><strong>Identifier Case-Mismatch:</strong> <code>totalMarks</code> and <code>TotalMarks</code> are treated as two distinct memory variables. Maintain consistent camelCase or snake_case conventions.</li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why did Dennis Ritchie and the ANSI C committee reserve only 32 keywords in 1989, keeping the language minimal, while modern languages like C++ have over 90 keywords? How does a minimal keyword set allow C compilers to remain ultra-fast and easily embeddable into tiny microcontrollers?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_002 Topic 0 FAQs: C Tokens" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 0 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_002_topic0_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Always treat C tokens as atomic Lego bricks. When debugging compiler syntax errors, isolate whether the issue is an invalid identifier name, an unquoted character, or an unclosed punctuator! — Sukanta Hui" />
      </section>
    </div>
  );
}
