import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic0_files/TokensAndOperatorsDemo.c?raw";
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
            Tokens & Operators
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          C Tokens, Data Types & Operator Mechanics
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master primitive types, memory footprints, exact-width integer headers (&lt;stdint.h&gt;), bitwise operations, implicit vs explicit type promotion, and operator precedence.
        </p>
      </header>

      {/* 2. Concept Overview */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🧠</span> Tokens & Low-Level Memory Footprints
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Every program written in C is decomposed by the compiler into tokens. Primitive data types map directly to physical RAM word sizes. Bitwise operators enable direct control over hardware CPU registers and flag bits.
        </p>
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-750 text-xs text-slate-300 space-y-2">
          <p className="font-semibold text-amber-300">🏫 Classroom Context (Shyamnagar & Barrackpore Labs):</p>
          <p>
            <b>Debangshu</b> noticed that dividing 15 by 4 in C yields 3 instead of 3.75. <b>Sukanta Hui</b> demonstrated explicit casting <code>(float)15 / 4</code> to prevent integer truncation bugs in financial calculations.
          </p>
        </div>
      </section>

      {/* 3. Visual SVG Diagram */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          📊 Semantic Visual Diagram: Memory Footprints & Bitwise Shift
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 800 200" className="w-full min-w-[600px] font-sans">
            {/* Bitwise Shift Diagram */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="50" y="50" width="300" height="100" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="200" y="85" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">Bitwise Left Shift (5 &lt;&lt; 1)</text>
              <text x="200" y="115" textAnchor="middle" fill="#f59e0b" className="font-mono text-xs">00000101 (5) -&gt; 00001010 (10)</text>
            </g>

            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="420" y="50" width="330" height="100" rx="12" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="585" y="85" textAnchor="middle" fill="#34d399" className="font-bold text-sm">Explicit Type Casting</text>
              <text x="585" y="115" textAnchor="middle" fill="#e2e8f0" className="font-mono text-xs">(float)15 / 4 = 3.75f</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Operator Precedence & Memory Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Data Type</th>
                <th className="p-3">Byte Size</th>
                <th className="p-3">Format Specifier</th>
                <th className="p-3">Numeric Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-mono">char / uint8_t</td>
                <td className="p-3">1 Byte</td>
                <td className="p-3 font-mono">%c / %d</td>
                <td className="p-3">-128 to 127 / 0 to 255</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">short</td>
                <td className="p-3">2 Bytes</td>
                <td className="p-3 font-mono">%hd</td>
                <td className="p-3">-32,768 to 32,767</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">int / int32_t</td>
                <td className="p-3">4 Bytes</td>
                <td className="p-3 font-mono">%d</td>
                <td className="p-3">-2,147,483,648 to 2,147,483,647</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">float</td>
                <td className="p-3">4 Bytes</td>
                <td className="p-3 font-mono">%f</td>
                <td className="p-3">7 decimal digits precision</td>
              </tr>
              <tr>
                <td className="p-3 font-mono">double</td>
                <td className="p-3">8 Bytes</td>
                <td className="p-3 font-mono">%lf</td>
                <td className="p-3">15 decimal digits precision</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Hands-on Code Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          💻 Hands-on Code Example: TokensAndOperatorsDemo.c
        </h2>
        <CFileLoader fileModule={cCode} title="TokensAndOperatorsDemo.c" editable={false} />
      </section>

      {/* 6. Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400">
          ⚠️ Common Pitfalls & Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li><b>Integer Division Truncation:</b> <code>7 / 2</code> evaluates to <code>3</code> in C. Cast at least one operand to <code>float</code> or <code>double</code> for decimal precision.</li>
          <li><b>Bitwise Shift Range Overflow:</b> Shifting an 8-bit integer past 7 bits results in undefined behavior.</li>
        </ul>
      </section>

      {/* 7. Thinking Prompt */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400">
          🤔 Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does <code>x & (x - 1)</code> reset the lowest set bit in a binary number? How is this trick used to count set bits in $O(k)$ time?
        </p>
      </section>

      {/* 8. FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_002 Topic 0 FAQs" questions={questions} />
      </section>

      {/* 9. Plain Text Note */}
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

      {/* 10. Teacher Note */}
      <section>
        <Teacher note="Always prefer <stdint.h> types like int32_t or uint8_t when writing hardware drivers or network protocol packers to prevent architecture size mismatches! — Sukanta Hui" />
      </section>
    </div>
  );
}
