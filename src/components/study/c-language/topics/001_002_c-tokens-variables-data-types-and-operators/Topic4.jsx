import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic4_files/OperatorsPrecedenceBitwiseDemo.c?raw";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_002 · Topic 4
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Operators &amp; Bit Manipulation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Operator Precedence, Associativity &amp; Bitwise Engineering Mechanics
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master the complete 15-level C operator precedence hierarchy, short-circuit logical safety, and bitwise hardware manipulation idioms (<code>&amp;</code>, <code>|</code>, <code>^</code>, <code>~</code>, <code>&lt;&lt;</code>, <code>&gt;&gt;</code>) for register flag inspection and setting.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Operator Hierarchy &amp; Hardware Bitwise Control
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Expressions in C are evaluated according to a deterministic mathematical hierarchy known as <strong>Operator Precedence</strong> and <strong>Associativity</strong>. When multiple operators compete within an unparenthesized expression, precedence decides which operation binds first.
          </p>
          <p>
            Furthermore, C provides direct silicon-level access through <strong>Bitwise Operators</strong>, allowing developers to manipulate individual register bits without assembly language:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs md:text-sm">
            <li className="bg-slate-900/70 p-3 rounded-xl border border-slate-750">
              <strong className="text-sky-400 block mb-1">Bitwise AND (&amp;) &amp; Bit Masking</strong>
              Isolates specific bits: <code>val &amp; (1 &lt;&lt; n)</code> checks if bit <code>n</code> is active (1).
            </li>
            <li className="bg-slate-900/70 p-3 rounded-xl border border-slate-750">
              <strong className="text-emerald-400 block mb-1">Bitwise OR (|) &amp; Bit Setting</strong>
              Turns specific bits ON: <code>val |= (1 &lt;&lt; n)</code> forces bit <code>n</code> to 1 without altering other bits.
            </li>
            <li className="bg-slate-900/70 p-3 rounded-xl border border-slate-750">
              <strong className="text-amber-400 block mb-1">Bitwise XOR (^) &amp; Bit Toggling</strong>
              Flips bits: <code>val ^= (1 &lt;&lt; n)</code> inverts bit <code>n</code> (0 becomes 1, 1 becomes 0).
            </li>
            <li className="bg-slate-900/70 p-3 rounded-xl border border-slate-750">
              <strong className="text-purple-400 block mb-1">Bitwise Shifts (&lt;&lt; / &gt;&gt;)</strong>
              Fast power-of-2 multiplication (<code>&lt;&lt;</code>) and integer division (<code>&gt;&gt;</code>) at single-cycle CPU speed.
            </li>
          </ul>

          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2 mt-4">
            <p className="font-semibold text-amber-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore Systems Lab):</p>
            <p>
              <strong>Swadeep</strong> and <strong>Debangshu</strong> were writing an embedded sensor status check: <code>if (status &amp; 1 == 0)</code> and noticed the check always evaluated to false even when status was 0! <strong>Sukanta Hui</strong> showed them that in the C standard, relational equality (<code>==</code>) has precedence level 7 while bitwise AND (<code>&amp;</code>) is down at level 8! The compiler was actually evaluating <code>status &amp; (1 == 0)</code> which equals <code>status &amp; 0 = 0</code>! Wrapping it in parentheses <code>((status &amp; 1) == 0)</code> fixed the bug immediately.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Bitwise Operations &amp; Shift Register
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 300" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="280" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              8-Bit Register Bit Manipulation &amp; Masking Operations
            </text>

            {/* AND Operation */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="30" y="60" width="265" height="130" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="162" y="85" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">BITWISE AND (&amp;) · MASK</text>
              <text x="50" y="110" fill="#94a3b8" className="font-mono text-xs">A: 0101 0101 (0x55)</text>
              <text x="50" y="130" fill="#94a3b8" className="font-mono text-xs">B: 0000 1111 (0x0F)</text>
              <line x1="50" y1="140" x2="270" y2="140" stroke="#475569" strokeWidth="1" />
              <text x="50" y="165" fill="#38bdf8" className="font-mono text-xs font-bold">R: 0000 0101 (0x05)</text>
              <text x="162" y="180" textAnchor="middle" fill="#64748b" className="text-[10px]">1 &amp; 1 = 1 | Isolates lower nibble</text>
            </g>

            {/* OR Operation */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="325" y="60" width="265" height="130" rx="10" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="457" y="85" textAnchor="middle" fill="#34d399" className="font-bold text-xs">BITWISE OR (|) · SET BITS</text>
              <text x="345" y="110" fill="#94a3b8" className="font-mono text-xs">A: 0101 0101 (0x55)</text>
              <text x="345" y="130" fill="#94a3b8" className="font-mono text-xs">B: 0000 1111 (0x0F)</text>
              <line x1="345" y1="140" x2="565" y2="140" stroke="#475569" strokeWidth="1" />
              <text x="345" y="165" fill="#34d399" className="font-mono text-xs font-bold">R: 0101 1111 (0x5F)</text>
              <text x="457" y="180" textAnchor="middle" fill="#64748b" className="text-[10px]">0 | 1 = 1 | Forces bits to ON</text>
            </g>

            {/* XOR Operation */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="620" y="60" width="265" height="130" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="752" y="85" textAnchor="middle" fill="#f59e0b" className="font-bold text-xs">BITWISE XOR (^) · TOGGLE</text>
              <text x="640" y="110" fill="#94a3b8" className="font-mono text-xs">A: 0101 0101 (0x55)</text>
              <text x="640" y="130" fill="#94a3b8" className="font-mono text-xs">B: 0000 1111 (0x0F)</text>
              <line x1="640" y1="140" x2="860" y2="140" stroke="#475569" strokeWidth="1" />
              <text x="640" y="165" fill="#f59e0b" className="font-mono text-xs font-bold">R: 0101 1010 (0x5A)</text>
              <text x="752" y="180" textAnchor="middle" fill="#64748b" className="text-[10px]">Flips bits where mask has 1s</text>
            </g>

            {/* Shift Bar */}
            <rect x="30" y="205" width="855" height="65" rx="10" fill="#111827" stroke="#334155" strokeWidth="1" />
            <text x="457" y="232" textAnchor="middle" fill="#a78bfa" className="text-xs font-mono font-bold">
              Shift Mechanics: (0x55 &lt;&lt; 2) = 0x54 (x 4) | (0x55 &gt;&gt; 2) = 0x15 (/ 4)
            </text>
            <text x="457" y="255" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
              Logical Short Circuit: In <code>if (a &amp;&amp; b)</code>, if <code>a == 0</code>, operand <code>b</code> is completely skipped by CPU branch predictor.
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: Complete Operator Precedence Hierarchy
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Rank</th>
                <th className="p-3">Category</th>
                <th className="p-3">Operators</th>
                <th className="p-3">Associativity</th>
                <th className="p-3">Direction Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">1 (Highest)</td>
                <td className="p-3">Postfix</td>
                <td className="p-3 font-mono text-amber-300">() [] -&gt; . ++ --</td>
                <td className="p-3">Left to Right</td>
                <td className="p-3">Function call, array index, member access</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">2</td>
                <td className="p-3">Unary Prefix</td>
                <td className="p-3 font-mono text-amber-300">++ -- + - ! ~ * &amp; (type) sizeof</td>
                <td className="p-3 text-purple-400 font-bold">Right to Left</td>
                <td className="p-3">Address-of, dereference, logical/bitwise NOT</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">3</td>
                <td className="p-3">Multiplicative</td>
                <td className="p-3 font-mono text-amber-300">* / %</td>
                <td className="p-3">Left to Right</td>
                <td className="p-3">Multiply, divide, integer modulo</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">4</td>
                <td className="p-3">Additive</td>
                <td className="p-3 font-mono text-amber-300">+ -</td>
                <td className="p-3">Left to Right</td>
                <td className="p-3">Addition, subtraction</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">5</td>
                <td className="p-3">Bit Shifts</td>
                <td className="p-3 font-mono text-amber-300">&lt;&lt; &gt;&gt;</td>
                <td className="p-3">Left to Right</td>
                <td className="p-3">Bitwise Left and Right shift</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">6 &amp; 7</td>
                <td className="p-3">Relational &amp; Equality</td>
                <td className="p-3 font-mono text-amber-300">&lt; &lt;= &gt; &gt;= == !=</td>
                <td className="p-3">Left to Right</td>
                <td className="p-3">Comparisons and equality tests</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">8, 9, 10</td>
                <td className="p-3">Bitwise Logical</td>
                <td className="p-3 font-mono text-amber-300">&amp; ^ |</td>
                <td className="p-3">Left to Right</td>
                <td className="p-3">Bitwise AND, XOR, OR in descending precedence</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">11 &amp; 12</td>
                <td className="p-3">Logical Flow</td>
                <td className="p-3 font-mono text-amber-300">&amp;&amp; ||</td>
                <td className="p-3">Left to Right</td>
                <td className="p-3">Short-circuit boolean AND, OR</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">13</td>
                <td className="p-3">Ternary Conditional</td>
                <td className="p-3 font-mono text-amber-300">? :</td>
                <td className="p-3 text-purple-400 font-bold">Right to Left</td>
                <td className="p-3">Conditional inline expression</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">14</td>
                <td className="p-3">Assignments</td>
                <td className="p-3 font-mono text-amber-300">= += -= *= /= %= &amp;= |= ^=</td>
                <td className="p-3 text-purple-400 font-bold">Right to Left</td>
                <td className="p-3">Assign computed rvalue to lvalue</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">15 (Lowest)</td>
                <td className="p-3">Comma</td>
                <td className="p-3 font-mono text-amber-300">,</td>
                <td className="p-3">Left to Right</td>
                <td className="p-3">Sequential expression evaluation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Precedence &amp; Bitwise Mechanics Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>OperatorsPrecedenceBitwiseDemo.c</code>) demonstrates arithmetic expression evaluation order, short-circuit branching, and 8-bit hardware register bit-setting, checking, clearing, and toggling routines.
        </p>

        <CFileLoader fileModule={cCode} title="OperatorsPrecedenceBitwiseDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     OPERATORS & BITWISE MECHANICS - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [1] Precedence Evaluation ---
Expression : 10 + 20 * 5 / 2 - 3
Calculated : 57 (Matches Step-by-Step = 57)

--- [2] Short-Circuit Safety ---
Condition  : if (x != 0 && (evaluated = 100))
x value    : 0 | evaluated value : 0 (Safe: RHS Skipped!)

--- [3] 8-Bit Bitwise Operations ---
regA (0x55)   : 0101 0101
regB (0x0F)   : 0000 1111
regA & regB    : 0000 0101 (AND)
regA | regB    : 0101 1111 (OR)
regA ^ regB    : 0101 1010 (XOR)
~regA          : 1010 1010 (NOT)
regA << 2      : 0101 0100 (Left Shift x 4)
regA >> 2      : 0001 0101 (Right Shift / 4)

--- [4] Bit Manipulation Tests ---
Was Bit 3 Set? : YES (1)
Final StatusReg: 0x00 (Bits 3 cleared, Bit 6 toggled)

--- [5] Ternary Evaluation ---
Score: 82 -> Grade: A
===================================================================`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li><strong>Bitwise &amp; vs Equality Precedence Trap:</strong> <code>==</code> binds tighter than <code>&amp;</code>. Always write <code>if ((val &amp; MASK) == EXPECTED)</code> instead of <code>if (val &amp; MASK == EXPECTED)</code>.</li>
          <li><strong>Modifying variables multiple times without sequence points:</strong> <code>a[i] = i++</code> or <code>printf("%d %d", i++, i++)</code> triggers undefined behavior!</li>
          <li><strong>Shifting by &gt;= Bit Width:</strong> Shifting a 32-bit integer by 32 or more bits produces undefined behavior on x86/ARM CPUs.</li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          How does the famous formula <code>n &amp; (n - 1)</code> reset the lowest active 1-bit in binary? Why does <code>(x &gt; 0) &amp;&amp; ((x &amp; (x - 1)) == 0)</code> verify whether a number is a pure power of 2 in just two CPU instructions?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_002 Topic 4 FAQs: Operators & Bitwise" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 4 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_002_topic4_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Mastering bitwise manipulation is the true dividing line between high-level coders and systems engineers. Always draw out the 8 or 32 binary bits on paper when crafting bitmasks! — Sukanta Hui" />
      </section>
    </div>
  );
}
