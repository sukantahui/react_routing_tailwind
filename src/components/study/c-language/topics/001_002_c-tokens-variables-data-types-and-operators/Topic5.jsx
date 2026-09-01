import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic5_files/TypeCastingPromotionDemo.c?raw";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_002 · Topic 5
          </span>
          <span className="bg-pink-500/10 text-pink-400 border border-pink-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Type Conversion &amp; Casting
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Implicit Type Promotion vs Explicit Type Casting
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master C's integer promotion rules, Usual Arithmetic Conversions hierarchy, the hazardous signed-vs-unsigned comparison trap, and low-level pointer reinterpretation for memory endianness inspection.
        </p>
      </header>

      {/* 2. DEDICATED TEACHER EXPLANATION SECTION (BEGINNER-FRIENDLY & INTUITIVE) */}
      <section className="space-y-6 bg-gradient-to-br from-pink-950/40 via-slate-900 to-slate-900 border-2 border-pink-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pink-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/20 text-pink-300 text-xl border border-pink-500/30">
              🧑‍🏫
            </span>
            <div>
              <h2 className="text-2xl font-black text-pink-200 tracking-tight">
                Teacher's Breakdown: Type Conversion &amp; Casting Made Easy
              </h2>
              <p className="text-xs text-pink-300/80">
                A step-by-step beginner guide by Sukanta Hui (Coder &amp; AccoTax)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            Beginner Friendly Concept
          </span>
        </div>

        {/* Part A: The Water Bucket Analogy */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <span>🪣</span> Step 1: The Water Bucket Analogy (Small Cup vs Big Jug)
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Think of each data type in C as a water container of a specific size:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-sky-300 font-bold block text-sm">char (1-Liter Cup)</span>
              <span className="text-slate-400">Holds small values (-128 to 127)</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-indigo-300 font-bold block text-sm">int (4-Liter Jug)</span>
              <span className="text-slate-400">Holds standard whole numbers</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-1">
              <span className="text-pink-300 font-bold block text-sm">double (8-Liter Tank)</span>
              <span className="text-slate-400">Holds huge decimal numbers</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 text-xs">
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl space-y-1">
              <span className="text-emerald-300 font-bold flex items-center gap-1">
                <span>⬆️</span> Pouring Small Cup into Big Tank (Promotion / Widening):
              </span>
              <p className="text-slate-300">
                1 Liter of water easily fits into an 8-Liter tank without spilling a drop. The compiler does this automatically for you (<strong>Implicit Type Promotion</strong>)!
              </p>
            </div>
            <div className="p-3 bg-rose-950/40 border border-rose-800/40 rounded-xl space-y-1">
              <span className="text-rose-300 font-bold flex items-center gap-1">
                <span>⬇️</span> Pouring Big Tank into Small Cup (Truncation / Narrowing):
              </span>
              <p className="text-slate-300">
                If you pour 8 Liters of water into a 1-Liter cup, water overflows and is permanently lost. This is why converting <code>3.99f</code> into <code>int</code> discards the <code>.99</code>!
              </p>
            </div>
          </div>
        </div>

        {/* Part B: The 15 / 4 = 3 Division Mystery */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-sky-300 flex items-center gap-2">
            <span>🍕</span> Step 2: The Pizza Mystery: Why Does 15 / 4 Equal 3 in C?
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Imagine sharing <strong>15 slices of pizza</strong> equally among <strong>4 students</strong> in our Barrackpore classroom (<strong>Swadeep, Tuhina, Abhronila, and Debangshu</strong>). Each student should get <strong>3.75 slices</strong>. But if you write:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-950/30 border border-rose-800/40 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-rose-400 font-bold block font-sans">❌ The Mistake Beginners Make:</span>
              <p className="text-slate-300">
                float share = 15 / 4;<br />
                <span className="text-slate-500">// What happens:</span><br />
                <span className="text-amber-300">15</span> (int) / <span className="text-amber-300">4</span> (int) = <span className="text-rose-400">3</span> (int)<br />
                <span className="text-slate-400">// C chops off .75 BEFORE saving!</span><br />
                printf("%.2f", share); <span className="text-rose-400">// Prints 3.00!</span>
              </p>
            </div>

            <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-emerald-400 font-bold block font-sans">✅ The Teacher's Fix (Explicit Cast):</span>
              <p className="text-slate-300">
                float share = (float)15 / 4;<br />
                <span className="text-slate-500">// What happens:</span><br />
                <span className="text-emerald-300">15.0f</span> (float) / <span className="text-amber-300">4</span> (int) = <span className="text-emerald-400">3.75f</span><br />
                <span className="text-slate-400">// (float) wakes up C's decimal engine!</span><br />
                printf("%.2f", share); <span className="text-emerald-400">// Prints 3.75!</span>
              </p>
            </div>
          </div>
          <p className="text-xs text-amber-300 font-semibold pt-1">
            📌 Rule of Thumb: When dividing integers to find an average or percentage, ALWAYS add <code>(float)</code> or <code>(double)</code> in front of at least one number!
          </p>
        </div>

        {/* Part C: The Shocking -1 < 1U Riddle */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
            <span>🤯</span> Step 3: Sukanta's Famous Classroom Riddle (Why is -1 NOT less than 1?)
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            In our lab, Sukanta Hui tested the class with this simple 2-line code:
          </p>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200">
            int a = -1;<br />
            unsigned int b = 1;<br />
            if (a &lt; b) printf("YES, -1 is smaller than 1");<br />
            else printf("NO, -1 is NOT smaller than 1");
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            The computer printed: <strong className="text-rose-400">"NO, -1 is NOT smaller than 1"</strong>! Why?
          </p>

          <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30 space-y-2 text-xs">
            <span className="font-bold text-purple-300 text-sm">🛵 The Motorcycle Odometer Analogy:</span>
            <p className="text-slate-300 leading-relaxed">
              Think of a digital scooter odometer that can only count positive kilometers from <code>0000</code> to <code>9999</code> (an unsigned counter). If you roll the wheel backwards past <code>0</code>, what does it show? It doesn't show <code>-1</code>, it flips all the way to <strong>9999</strong>!
            </p>
            <p className="text-slate-300 leading-relaxed">
              In a 32-bit computer, <code>-1</code> is stored in binary as 32 ones (<code>11111111...</code>). When C compares signed <code>int</code> with <code>unsigned int</code>, C converts <code>-1</code> into an unsigned number. All those binary ones suddenly turn into <strong>4,294,967,295</strong>!
            </p>
            <p className="text-amber-300 font-bold">
              Is 4.29 Billion less than 1? Absolutely NOT! That's why the condition evaluates to FALSE!
            </p>
          </div>
        </div>

        {/* Part D: Beginner's 3-Rule Cheat Sheet */}
        <div className="p-5 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl space-y-2 text-xs">
          <h4 className="font-bold text-emerald-300 text-sm flex items-center gap-2">
            <span>🛡️</span> The Teacher's 3 Golden Rules for Safe Coding
          </h4>
          <ul className="list-disc pl-5 text-slate-300 space-y-1.5">
            <li><strong>Rule 1 (For Averages &amp; Percentages):</strong> Always cast division: <code>float average = (float)total / studentCount;</code></li>
            <li><strong>Rule 2 (For Comparisons):</strong> Never compare an <code>int</code> with an <code>unsigned int</code> or <code>sizeof()</code> without casting both to the same type.</li>
            <li><strong>Rule 3 (For Converting Floating to Integer):</strong> Remember that <code>(int)4.99</code> becomes <code>4</code> (it chops off, it does not round!). If you want rounding, add <code>0.5</code>: <code>(int)(4.99 + 0.5) = 5</code>.</li>
          </ul>
        </div>
      </section>

      {/* 3. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Technical Topic Description: Type Conversion Dynamics in the CPU
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            When performing calculations involving operands of mixed types, C reconciles data types through two distinct mechanisms:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-300">
            <li>
              <strong>Implicit Type Conversion (Coercion):</strong> Automatically executed by the compiler. Types narrower than <code>int</code> (like <code>char</code> and <code>short</code>) are immediately promoted to <code>int</code> (Integer Promotion). In binary operations, narrower operands are promoted to match wider operands following the <em>Usual Arithmetic Conversions</em> ladder.
            </li>
            <li>
              <strong>Explicit Type Casting:</strong> Manually triggered by the programmer using the unary cast operator: <code>(target_type) expression</code>. Used to avoid integer truncation in division, convert pointer types, or narrow bit widths intentionally.
            </li>
          </ul>

          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2 mt-4">
            <p className="font-semibold text-amber-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore Lab):</p>
            <p>
              When <strong>Tuhina</strong>, <strong>Swadeep</strong>, and <strong>Abhronila</strong> tested mixed calculations, <strong>Sukanta Hui</strong> demonstrated how casting pointer addresses <code>(uint8_t*)&amp;word</code> allows us to look inside CPU memory byte-by-byte to reveal Little-Endian architecture!
            </p>
          </div>
        </div>
      </section>

      {/* 4. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: The Type Promotion Hierarchy Ladder
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 300" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="280" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              Usual Arithmetic Conversions Ladder (Widening Promotion Direction)
            </text>

            {/* Steps in Ladder */}
            <g transform="translate(60, 60)">
              {/* Step 1: char / short */}
              <g className="transition-transform duration-300 hover:scale-105">
                <rect x="0" y="150" width="160" height="45" rx="8" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
                <text x="80" y="177" textAnchor="middle" fill="#94a3b8" className="font-bold text-xs">char / short</text>
              </g>

              <path d="M 160 172 L 200 172" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

              {/* Step 2: int */}
              <g className="transition-transform duration-300 hover:scale-105">
                <rect x="200" y="125" width="130" height="45" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                <text x="265" y="152" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">int</text>
              </g>

              <path d="M 330 147 L 360 147" stroke="#64748b" strokeWidth="2" />

              {/* Step 3: unsigned int */}
              <g className="transition-transform duration-300 hover:scale-105">
                <rect x="360" y="100" width="130" height="45" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <text x="425" y="127" textAnchor="middle" fill="#34d399" className="font-bold text-xs">unsigned int</text>
              </g>

              <path d="M 490 122 L 520 122" stroke="#64748b" strokeWidth="2" />

              {/* Step 4: long long */}
              <g className="transition-transform duration-300 hover:scale-105">
                <rect x="520" y="75" width="130" height="45" rx="8" fill="#1e293b" stroke="#a78bfa" strokeWidth="2" />
                <text x="585" y="102" textAnchor="middle" fill="#a78bfa" className="font-bold text-xs">long long</text>
              </g>

              <path d="M 650 97 L 680 97" stroke="#64748b" strokeWidth="2" />

              {/* Step 5: float / double */}
              <g className="transition-transform duration-300 hover:scale-105">
                <rect x="680" y="50" width="140" height="45" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <text x="750" y="77" textAnchor="middle" fill="#f59e0b" className="font-bold text-xs">float / double</text>
              </g>
            </g>

            {/* Bottom Summary Callout */}
            <rect x="40" y="210" width="840" height="60" rx="10" fill="#111827" stroke="#334155" strokeWidth="1" />
            <text x="460" y="235" textAnchor="middle" fill="#f43f5e" className="text-xs font-mono font-bold">
              ⚠️ TRAP: In mixed signed/unsigned arithmetic, signed int is promoted to unsigned int!
            </text>
            <text x="460" y="255" textAnchor="middle" fill="#cbd5e1" className="text-[11px]">
              Explicit Division Fix: <code>(float)15 / 4 = 3.75f</code> (Without cast: <code>15 / 4 = 3</code>).
            </text>
          </svg>
        </div>
      </section>

      {/* 5. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: Conversion Rules &amp; Edge Cases
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-sky-300 text-sm flex items-center gap-2">
              <span>🔄</span> Integer Promotion Rules
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Whenever an expression involves types smaller than <code>int</code> (such as <code>char</code>, <code>signed char</code>, <code>unsigned char</code>, <code>short</code>, <code>unsigned short</code>), the compiler automatically upgrades them to <code>int</code> before executing the CPU opcode.
            </p>
            <div className="p-2 bg-slate-900 rounded-lg font-mono text-amber-300 text-[11px]">
              char a = 100, b = 50;<br />
              // a and b promoted to 32-bit int before addition:<br />
              int sum = a + b; // Result: 150
            </div>
          </div>

          <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-750 space-y-3">
            <h3 className="font-bold text-purple-300 text-sm flex items-center gap-2">
              <span>🎯</span> Explicit Cast Operator Usages
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Explicit casting forces conversion when default rules would cause unwanted loss or type errors.
            </p>
            <ul className="list-disc pl-5 text-slate-300 space-y-1 text-[11px]">
              <li><strong>Division Precision:</strong> <code>(float)sum / count</code> prevents truncation to integer.</li>
              <li><strong>Pointer Reinterpretation:</strong> <code>(uint8_t*)&amp;word</code> allows byte-by-byte inspection.</li>
              <li><strong>Narrowing Truncation:</strong> <code>(uint8_t)largeNumber</code> intentionally keeps lower 8 bits.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Type Promotion &amp; Casting Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>TypeCastingPromotionDemo.c</code>) demonstrates integer promotion, division truncation fixes with explicit casting, the signed-vs-unsigned comparison pitfall, and pointer casting to inspect endian byte layout in physical RAM.
        </p>

        <CFileLoader fileModule={cCode} title="TypeCastingPromotionDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     TYPE PROMOTION & CASTING - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [1] Integer Promotion (char -> int) ---
charA (100) + charB (50) = 150 (Promoted to 32-bit int)

--- [2] Integer Division vs Explicit Casting ---
Without Cast (15 / 4)   : 3.0000 (Bug: Integer Truncation to 3.0000)
Explicit Cast ((float)15 / 4): 3.7500 (Correct: 3.7500)

--- [3] Signed vs Unsigned Promotion Trap ---
Comparing: -1 < 1U
Raw Evaluation Result   : 0 (FALSE (TRAP: -1 promoted to 4294967295U)!)

--- [4] Pointer Casting (Memory Endianness Inspection) ---
32-bit Value: 0x12345678
Byte 0 at address 0x7ffd90: 0x78 (Little Endian LSB First)
Byte 1 at address 0x7ffd91: 0x56
Byte 2 at address 0x7ffd92: 0x34
Byte 3 at address 0x7ffd93: 0x12
===================================================================`}
          </pre>
        </div>
      </section>

      {/* 7. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li><strong>Division Truncation:</strong> <code>float avg = total / n;</code> truncates before assignment! Always write <code>float avg = (float)total / n;</code>.</li>
          <li><strong>Signed/Unsigned Mixed Comparisons:</strong> Never compare <code>int</code> with <code>unsigned int</code> or <code>size_t</code> directly without explicit casting.</li>
          <li><strong>Strict Aliasing Violations:</strong> Do not cast arbitrary pointer types like <code>float *fp = (float*)&amp;myInt;</code> as compiler optimizer passes (<code>-O2</code>) may generate corrupted code. Use <code>char*</code>, <code>uint8_t*</code>, or <code>union</code>.</li>
        </ul>
      </section>

      {/* 8. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does Little-Endian architecture store <code>0x12345678</code> as <code>78 56 34 12</code> in memory? How does casting a 32-bit integer pointer to a 1-byte <code>uint8_t*</code> allow us to instantly determine whether a CPU is Little-Endian or Big-Endian at runtime?
        </p>
      </section>

      {/* 9. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_002 Topic 5 FAQs: Type Promotion & Casting" questions={questions} />
      </section>

      {/* 10. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 5 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_002_topic5_note.txt"
        />
      </section>

      {/* 11. Teacher's Note Section */}
      <section>
        <Teacher note="Always remember: the C compiler will never protect you from signed/unsigned comparison bugs! When comparing loop bounds or buffer lengths against size_t, ensure both operands share the same signedness! — Sukanta Hui" />
      </section>
    </div>
  );
}
