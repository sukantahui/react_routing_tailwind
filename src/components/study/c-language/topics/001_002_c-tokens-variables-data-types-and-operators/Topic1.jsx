import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic1_files/DataTypesMemoryDemo.c?raw";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

export default function Topic1() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_002 · Topic 1
          </span>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Memory Architecture &amp; Data Types
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Fundamental Data Types &amp; Memory Footprints Across Architectures
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Explore primitive C types (<code>char</code>, <code>int</code>, <code>float</code>, <code>double</code>, <code>void</code>), memory byte layouts, <code>sizeof</code> compile-time evaluation, and architecture variances across 32-bit (ILP32) and 64-bit (LP64 vs LLP64) operating systems.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: How C Maps Data Directly to Silicon Memory
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Unlike high-level languages that abstract memory away behind garbage-collected object wrappers, C types correspond directly to hardware CPU registers and RAM memory cells. Choosing the correct data type determines both execution speed and memory efficiency.
          </p>
          <p>
            The C standard does not mandate absolute fixed byte sizes; rather, it specifies <strong>minimum size constraints</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-300">
            <li><code>sizeof(char) == 1</code> byte (always exactly 1 byte by language definition).</li>
            <li><code>sizeof(short) &gt;= 2</code> bytes.</li>
            <li><code>sizeof(int) &gt;= 2</code> bytes (typically 4 bytes on modern 32-bit and 64-bit CPUs).</li>
            <li><code>sizeof(long) &gt;= 4</code> bytes (8 bytes on 64-bit Linux/GCC, 4 bytes on 64-bit Windows MSVC).</li>
            <li><code>sizeof(long long) &gt;= 8</code> bytes (guaranteed 64-bit integer standard in C99).</li>
            <li><code>sizeof(float) == 4</code> bytes (IEEE-754 single precision, ~7 decimal digits).</li>
            <li><code>sizeof(double) == 8</code> bytes (IEEE-754 double precision, ~15-17 decimal digits).</li>
          </ul>

          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2 mt-4">
            <p className="font-semibold text-amber-300">🏫 Classroom Story at Coder &amp; AccoTax (Shyamnagar &amp; Barrackpore Labs):</p>
            <p>
              When <strong>Swadeep</strong> and <strong>Tuhina</strong> ran a benchmark program storing 10 million telemetry records on a Linux server and a Windows laptop, they noticed the Linux binary consumed 40 MB more RAM. <strong>Sukanta Hui</strong> showed them that under the <strong>LP64</strong> model on Linux, <code>long</code> is 8 bytes, whereas under Windows <strong>LLP64</strong>, <code>long</code> is only 4 bytes. This is why systems engineers specify fixed-width types like <code>int32_t</code> or <code>int64_t</code>!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>📊</span> Semantic Visual Diagram: Memory Byte Footprints in Physical RAM
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
            
            <text x="460" y="40" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              RAM Memory Footprint &amp; Byte Width Breakdown
            </text>

            {/* char (1 Byte) */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="40" y="70" width="120" height="110" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="100" y="100" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">char</text>
              <rect x="55" y="115" width="90" height="28" rx="6" fill="#0284c7" />
              <text x="100" y="133" textAnchor="middle" fill="#ffffff" className="font-mono text-xs font-bold">1 Byte (8b)</text>
              <text x="100" y="165" textAnchor="middle" fill="#94a3b8" className="text-[10px]">%c · %d</text>
            </g>

            {/* short (2 Bytes) */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="180" y="70" width="150" height="110" rx="10" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
              <text x="255" y="100" textAnchor="middle" fill="#818cf8" className="font-bold text-sm">short</text>
              <div className="flex gap-1">
                <rect x="195" y="115" width="55" height="28" rx="6" fill="#4f46e5" />
                <rect x="255" y="115" width="55" height="28" rx="6" fill="#4f46e5" />
              </div>
              <text x="255" y="133" textAnchor="middle" fill="#ffffff" className="font-mono text-xs font-bold">2 Bytes (16b)</text>
              <text x="255" y="165" textAnchor="middle" fill="#94a3b8" className="text-[10px]">%hd · %hu</text>
            </g>

            {/* int / float (4 Bytes) */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="350" y="70" width="220" height="110" rx="10" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="460" y="100" textAnchor="middle" fill="#34d399" className="font-bold text-sm">int / float</text>
              <rect x="365" y="115" width="190" height="28" rx="6" fill="#059669" />
              <text x="460" y="133" textAnchor="middle" fill="#ffffff" className="font-mono text-xs font-bold">4 Bytes (32b)</text>
              <text x="460" y="165" textAnchor="middle" fill="#94a3b8" className="text-[10px]">%d · %u · %f</text>
            </g>

            {/* double / long long (8 Bytes) */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="590" y="70" width="290" height="110" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="735" y="100" textAnchor="middle" fill="#f59e0b" className="font-bold text-sm">double / long long / pointer</text>
              <rect x="605" y="115" width="260" height="28" rx="6" fill="#d97706" />
              <text x="735" y="133" textAnchor="middle" fill="#ffffff" className="font-mono text-xs font-bold">8 Bytes (64b)</text>
              <text x="735" y="165" textAnchor="middle" fill="#94a3b8" className="text-[10px]">%lf · %lld · %p</text>
            </g>

            {/* Bottom Note */}
            <rect x="40" y="200" width="840" height="45" rx="8" fill="#111827" stroke="#334155" strokeWidth="1" />
            <text x="460" y="228" textAnchor="middle" fill="#cbd5e1" className="text-xs">
              💡 The <code>sizeof(expr)</code> operator calculates byte width at compile time with zero runtime CPU overhead!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: Data Type Matrix &amp; Ranges
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Data Type</th>
                <th className="p-3">Bytes</th>
                <th className="p-3">Bit Width</th>
                <th className="p-3">Format Specifier</th>
                <th className="p-3">Minimum Value (<code className="text-amber-300">&lt;limits.h&gt;</code>)</th>
                <th className="p-3">Maximum Value (<code className="text-amber-300">&lt;limits.h&gt;</code>)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">signed char</td>
                <td className="p-3">1</td>
                <td className="p-3">8</td>
                <td className="p-3 font-mono">%c / %d</td>
                <td className="p-3">-128 (SCHAR_MIN)</td>
                <td className="p-3">+127 (SCHAR_MAX)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-300">unsigned char</td>
                <td className="p-3">1</td>
                <td className="p-3">8</td>
                <td className="p-3 font-mono">%u / %c</td>
                <td className="p-3">0</td>
                <td className="p-3">255 (UCHAR_MAX)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">short int</td>
                <td className="p-3">2</td>
                <td className="p-3">16</td>
                <td className="p-3 font-mono">%hd</td>
                <td className="p-3">-32,768 (SHRT_MIN)</td>
                <td className="p-3">+32,767 (SHRT_MAX)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">int (signed)</td>
                <td className="p-3">4</td>
                <td className="p-3">32</td>
                <td className="p-3 font-mono">%d</td>
                <td className="p-3">-2,147,483,648 (INT_MIN)</td>
                <td className="p-3">+2,147,483,647 (INT_MAX)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-300">unsigned int</td>
                <td className="p-3">4</td>
                <td className="p-3">32</td>
                <td className="p-3 font-mono">%u</td>
                <td className="p-3">0</td>
                <td className="p-3">4,294,967,295 (UINT_MAX)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">long long</td>
                <td className="p-3">8</td>
                <td className="p-3">64</td>
                <td className="p-3 font-mono">%lld</td>
                <td className="p-3">-9,223,372,036,854,775,808</td>
                <td className="p-3">+9,223,372,036,854,775,807</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-amber-300">float</td>
                <td className="p-3">4</td>
                <td className="p-3">32</td>
                <td className="p-3 font-mono">%f / %e</td>
                <td className="p-3">~1.175494e-38 (FLT_MIN)</td>
                <td className="p-3">~3.402823e+38 (FLT_MAX)</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-amber-300">double</td>
                <td className="p-3">8</td>
                <td className="p-3">64</td>
                <td className="p-3 font-mono">%lf / %f</td>
                <td className="p-3">~2.225073e-308 (DBL_MIN)</td>
                <td className="p-3">~1.797693e+308 (DBL_MAX)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Data Types &amp; Memory Inspection Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>DataTypesMemoryDemo.c</code>) queries the target platform's architecture using <code>sizeof</code>, prints header constants from <code>&lt;limits.h&gt;</code> and <code>&lt;float.h&gt;</code>, and showcases formatted memory value output.
        </p>

        <CFileLoader fileModule={cCode} title="DataTypesMemoryDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     C DATA TYPES & MEMORY FOOTPRINTS - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

Data Type            Byte Size    Bit Width         
-------------------------------------------------------------------
char                 1            8                 
short                2            16                
int                  4            32                
long                 4            32                
long long            8            64                
float                4            32                
double               8            64                
long double          16           128               

--- Architectural Range Limits (<limits.h> / <float.h>) ---
Signed char range    : -128 to 127
Unsigned char range  : 0 to 255
Signed short range   : -32768 to 32767
Signed int range     : -2147483648 to 2147483647
Signed long long max : 9223372036854775807
Float precision      : 6 decimal digits (Min: 1.175494e-38, Max: 3.402823e+38)
Double precision     : 15 decimal digits (Min: 2.225074e-308, Max: 1.797693e+308)

--- Sample Values in Memory ---
Character       : A (ASCII: 65)
Integer         : 45000
Long Population : 1428627663
Float Temp      : 36.60 °C
Double Precision: 3.141592653589793
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
          <li><strong>Using %d to print size_t:</strong> <code>sizeof</code> returns <code>size_t</code>. On 64-bit systems, <code>size_t</code> is 64 bits while <code>%d</code> expects 32 bits, causing compiler warnings or corrupt stack formatting. Always use <code>%zu</code>.</li>
          <li><strong>Floating-Point Direct Equality (==):</strong> Binary rounding errors mean <code>0.1f + 0.2f == 0.3f</code> evaluates to false! Always compare using epsilon margins: <code>fabs(a - b) &lt; 1e-6</code>.</li>
          <li><strong>Signed Integer Overflow:</strong> Exceeding <code>INT_MAX</code> in signed arithmetic invokes undefined behavior (UB). For wrap-around guarantees, use unsigned types.</li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does <code>sizeof('A')</code> evaluate to <code>4</code> (or <code>sizeof(int)</code>) in standard C, but evaluates to <code>1</code> (<code>sizeof(char)</code>) in C++? (Hint: In C, character literals are typed as <code>int</code>!).
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_002 Topic 1 FAQs: Data Types & Memory" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 1 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_002_topic1_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Always keep a mental model of byte widths and register sizes. When writing low-level drivers or high-performance financial systems, choosing between uint8_t and uint64_t directly impacts CPU cache line efficiency! — Sukanta Hui" />
      </section>
    </div>
  );
}
