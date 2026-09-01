import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic2_files/TypeModifiersStdintDemo.c?raw";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

export default function Topic2() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_002 · Topic 2
          </span>
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Type Modifiers &amp; stdint.h
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Type Modifiers (short, long, signed, unsigned) &amp; Exact-Width Integers
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Deep-dive into signed vs unsigned bitwise representations, two's complement arithmetic, modular wrap-around behavior, and cross-platform exact-width types via <code>&lt;stdint.h&gt;</code> and <code>&lt;inttypes.h&gt;</code>.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Signedness, Bit Modifiers &amp; Deterministic Types
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In systems programming, controlling the exact range and signedness of numeric data is critical. Standard types like <code>int</code> or <code>long</code> lack deterministic bit widths across platforms.
          </p>
          <p>
            C solves this using two mechanisms:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm text-slate-300">
            <li>
              <strong>Type Modifiers:</strong> Keywords (<code>signed</code>, <code>unsigned</code>, <code>short</code>, <code>long</code>, <code>long long</code>) applied to base types to shift their numeric range or adjust byte sizes.
            </li>
            <li>
              <strong>Exact-Width Integers (<code>&lt;stdint.h&gt;</code>):</strong> Standardized in C99 to provide unambiguous bit widths (<code>int8_t</code>, <code>uint8_t</code>, <code>int16_t</code>, <code>uint16_t</code>, <code>int32_t</code>, <code>uint32_t</code>, <code>int64_t</code>, <code>uint64_t</code>).
            </li>
          </ul>

          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2 mt-4">
            <p className="font-semibold text-amber-300">🏫 Classroom Story at Coder &amp; AccoTax (Naihati &amp; Barrackpore Labs):</p>
            <p>
              <strong>Debangshu</strong> wrote a countdown loop: <code>for (unsigned int i = 5; i &gt;= 0; i--)</code> and the program printed numbers infinitely until the terminal froze. <strong>Sukanta Hui</strong> demonstrated that because <code>unsigned int</code> cannot represent negative values, when <code>i</code> decrements from 0, it wraps around to <code>4,294,967,295</code> (which is still <code>&gt;= 0</code>). <strong>Swadeep</strong> and <strong>Abhronila</strong> learned firsthand why signedness matters for loop bounds!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Signed vs Unsigned 8-Bit Layout &amp; Wrap Wheel
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              8-Bit Byte: Signed Two's Complement (int8_t) vs Unsigned (uint8_t)
            </text>

            {/* Signed int8_t */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="50" y="60" width="380" height="130" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="240" y="90" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">signed char / int8_t (-128 to +127)</text>
              
              {/* Bit row */}
              <g transform="translate(70, 110)">
                <rect x="0" y="0" width="40" height="35" fill="#e11d48" rx="4" />
                <text x="20" y="22" textAnchor="middle" fill="#ffffff" className="font-mono text-xs font-bold">MSB</text>
                <text x="20" y="50" textAnchor="middle" fill="#fda4af" className="text-[10px]">Sign Bit</text>

                <rect x="45" y="0" width="290" height="35" fill="#0284c7" rx="4" />
                <text x="190" y="22" textAnchor="middle" fill="#ffffff" className="font-mono text-xs font-bold">7 Magnitude Bits (Two's Complement)</text>
              </g>
            </g>

            {/* Unsigned uint8_t */}
            <g className="transition-transform duration-300 hover:scale-105">
              <rect x="490" y="60" width="380" height="130" rx="12" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="680" y="90" textAnchor="middle" fill="#34d399" className="font-bold text-sm">unsigned char / uint8_t (0 to 255)</text>

              {/* Bit row */}
              <g transform="translate(510, 110)">
                <rect x="0" y="0" width="340" height="35" fill="#059669" rx="4" />
                <text x="170" y="22" textAnchor="middle" fill="#ffffff" className="font-mono text-xs font-bold">All 8 Bits Represent Positive Magnitude</text>
                <text x="170" y="50" textAnchor="middle" fill="#6ee7b7" className="text-[10px]">No sign bit · Pure binary weight (1, 2, 4, 8, 16, 32, 64, 128)</text>
              </g>
            </g>

            {/* Modular Wrap Box */}
            <rect x="50" y="205" width="820" height="45" rx="8" fill="#111827" stroke="#334155" strokeWidth="1" />
            <text x="460" y="233" textAnchor="middle" fill="#facc15" className="text-xs font-mono">
              Unsigned Wrap: 255 + 1 = 0 (Defined Modulo 256) | Signed Overflow: 127 + 1 = Undefined Behavior!
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: Exact-Width Types (<code className="text-amber-300">&lt;stdint.h&gt;</code>) Matrix
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Exact Type</th>
                <th className="p-3">Bits / Bytes</th>
                <th className="p-3">Range Limits</th>
                <th className="p-3">Format Macro (<code className="text-amber-300">&lt;inttypes.h&gt;</code>)</th>
                <th className="p-3">Typical Industrial Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">int8_t / uint8_t</td>
                <td className="p-3">8 bits (1B)</td>
                <td className="p-3 font-mono">-128..127 / 0..255</td>
                <td className="p-3 font-mono text-amber-300">PRId8 / PRIu8</td>
                <td className="p-3">Hardware registers, byte stream buffers, ASCII characters</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">int16_t / uint16_t</td>
                <td className="p-3">16 bits (2B)</td>
                <td className="p-3 font-mono">-32768..32767 / 0..65535</td>
                <td className="p-3 font-mono text-amber-300">PRId16 / PRIu16</td>
                <td className="p-3">Network port numbers (HTTP 80, SSH 22), audio PCM samples</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">int32_t / uint32_t</td>
                <td className="p-3">32 bits (4B)</td>
                <td className="p-3 font-mono">-2.14B..+2.14B / 0..4.29B</td>
                <td className="p-3 font-mono text-amber-300">PRId32 / PRIu32</td>
                <td className="p-3">IPv4 addresses, Unix 32-bit timestamps, game score state</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">int64_t / uint64_t</td>
                <td className="p-3">64 bits (8B)</td>
                <td className="p-3 font-mono">-9.22E18..+9.22E18 / 0..18.4E18</td>
                <td className="p-3 font-mono text-amber-300">PRId64 / PRIu64</td>
                <td className="p-3">High-precision nanosecond clocks, large disk file offsets, UUIDs</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-300">uintptr_t</td>
                <td className="p-3">Platform ptr size</td>
                <td className="p-3 font-mono">0 to UINTPTR_MAX</td>
                <td className="p-3 font-mono text-amber-300">PRIuPTR / PRIxPTR</td>
                <td className="p-3">Pointer-to-integer conversions, memory alignment masks</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Type Modifiers &amp; &lt;stdint.h&gt; Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>TypeModifiersStdintDemo.c</code>) demonstrates signed vs unsigned modifiers, exact-width types with <code>&lt;inttypes.h&gt;</code> format macros, and unsigned modular wrap-around in real memory.
        </p>

        <CFileLoader fileModule={cCode} title="TypeModifiersStdintDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     TYPE MODIFIERS & <stdint.h> - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [1] Classic C Type Modifiers ---
Signed Temperature     (%d)   : -15 °C
Unsigned Packet Count  (%u)   : 65000
Signed Short Sensor    (%hd)  : 3200
Unsigned Short Port    (%hu)  : 8080
Signed Long Timestamp  (%ld)  : 1715000000
Unsigned Long Long Max (%llu) : 18446744073709551615

--- [2] Modern <stdint.h> Exact-Width Types & <inttypes.h> ---
int8_t   statusByte    (PRId8)  : -120
uint8_t  hardwareFlag  (PRIu8)  : 254 (Hex: 0xFE)
int16_t  dacOutput     (PRId16) : -32000
uint16_t ethernetPort  (PRIu16) : 443
int32_t  transactionId (PRId32) : -2100000000
uint32_t ipv4Address   (PRIu32) : 3232235521
int64_t  bigCounter    (PRId64) : -9000000000000000000
uint64_t globalUuid    (PRIu64) : 18000000000000000000

--- [3] Unsigned Integer Wrap-Around Mechanics ---
Initial uint8_t value : 255
After wrapCounter++   : 0 (Modular 256 Wrap)
After wrapCounter--   : 255 (Wrap back to Max)
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
          <li><strong>Unsigned Loop Terminations:</strong> Writing <code>for (unsigned int i = n; i &gt;= 0; i--)</code> results in an infinite loop because unsigned variables can never be negative. Use signed <code>int</code> for decrementing loops.</li>
          <li><strong>Format Specifier Mismatches:</strong> Printing a <code>uint64_t</code> using <code>%u</code> or <code>%d</code> truncates 32 bits of information. Always use <code>%llu</code> or <code>PRIu64</code>.</li>
          <li><strong>Assuming long is always 64-bit:</strong> Remember that on 64-bit Windows, <code>long</code> is only 32 bits! Always use <code>int64_t</code> or <code>long long</code> when 64 bits are required.</li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why did the Year 2038 Problem (Y2K38) arise in legacy C systems? (Hint: 32-bit signed <code>time_t</code> counts seconds since Jan 1, 1970 and will overflow at 2,147,483,647 seconds on January 19, 2038, wrapping into year 1901!). How does migrating to <code>int64_t time_t</code> solve the problem for the next 292 billion years?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_002 Topic 2 FAQs: Type Modifiers & stdint.h" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 2 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_002_topic2_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Always include <stdint.h> in your projects. Writing uint8_t, int32_t, and uint64_t instantly elevates your C code to professional, platform-resilient industry engineering standards! — Sukanta Hui" />
      </section>
    </div>
  );
}
