import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic4_files/ConsoleIODemo.c?raw";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_001 · Topic 4
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Formatted I/O &amp; Memory Stream Interpretation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Formatted Console I/O: printf(), scanf() &amp; Format Specifiers
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master the complete grammar of C format specifiers. Learn how <code>printf</code> and <code>scanf</code> decode memory bytes into human-readable representations, control precision, align columns, and handle input buffer streams.
        </p>
      </header>

      {/* 2. DEDICATED TEACHER EXPLANATION SECTION (FRIENDLY CNAT STYLE) */}
      <section className="space-y-6 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 text-xl border border-indigo-500/30">
              🧑‍🏫
            </span>
            <div>
              <h2 className="text-2xl font-black text-indigo-200 tracking-tight">
                Teacher's Corner: The Magic of Format Specifiers Made Simple
              </h2>
              <p className="text-xs text-indigo-300/80">
                A beginner-friendly guide by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Style
          </span>
        </div>

        {/* Step 1: The Foreign Language Translator Analogy */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <span>🗣️</span> Step 1: The Foreign Language Translator Analogy
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Inside your computer's RAM, there are no letters, words, or decimal numbers—there are <strong>only raw zeros and ones</strong> (like <code>01000001</code>). If you tell the computer to print <code>01000001</code>, how should it display it on the screen?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-sky-500/30 space-y-1">
              <span className="text-sky-300 font-bold block">1. As Character (`%c`):</span>
              <span className="text-slate-300">Displays the letter <strong>'A'</strong> (ASCII 65)</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-amber-500/30 space-y-1">
              <span className="text-amber-300 font-bold block">2. As Decimal (`%d`):</span>
              <span className="text-slate-300">Displays the number <strong>65</strong></span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 space-y-1">
              <span className="text-emerald-300 font-bold block">3. As Hex (`%#X`):</span>
              <span className="text-slate-300">Displays the hex code <strong>0x41</strong></span>
            </div>
          </div>
          <p className="text-xs text-indigo-300 pt-1">
            💡 <strong>The Key Lesson:</strong> A format specifier is a <strong>translator badge</strong>! It tells <code>printf</code> exactly which lens to wear when reading the raw bytes from memory!
          </p>
        </div>

        {/* Step 2: The Mysterious Scanf Buffer Skip */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
            <span>👻</span> Step 2: The Ghost Newline Trap in `scanf(" %c", &amp;ch)`
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            When <strong>Swadeep</strong> and <strong>Tuhina</strong> were taking student inputs, their program mysteriously skipped the grade input! Why did that happen?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-950/30 border border-rose-800/40 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-rose-400 font-bold block font-sans">❌ The Buggy Code:</span>
              <pre className="text-slate-200">
{`int age;
char grade;

printf("Enter Age: ");
scanf("%d", &age); // User types 20 and hits ENTER!

printf("Enter Grade: ");
scanf("%c", &grade); // SKIPPED!
// The leftover '\n' from pressing Enter
// is instantly swallowed by %c!`}</pre>
            </div>

            <div className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-xl space-y-2 font-mono text-xs">
              <span className="text-emerald-400 font-bold block font-sans">✅ The Teacher's Golden Fix:</span>
              <pre className="text-slate-200">
{`int age;
char grade;

printf("Enter Age: ");
scanf("%d", &age);

printf("Enter Grade: ");
scanf(" %c", &grade); 
// NOTICE THE SPACE BEFORE %c!
// The space tells scanf:
// "Ignore all leftover Enter keys and
// wait for a real character!"`}</pre>
            </div>
          </div>
        </div>

        {/* Step 3: %f vs %lf */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-sky-300 flex items-center gap-2">
            <span>⚖️</span> Step 3: Why `double` MUST use `%lf` in `scanf`
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            In <code>printf</code>, both <code>%f</code> and <code>%lf</code> work because C automatically promotes floats to doubles. But in <code>scanf</code>, <strong>you must pass `%lf` for double</strong>! If you pass <code>%f</code> for a double in <code>scanf</code>, it only writes 4 bytes into an 8-byte variable, corrupting your memory with garbage numbers!
          </p>
        </div>
      </section>

      {/* 3. COMPREHENSIVE FORMAT SPECIFIER MASTER REFERENCE SECTION */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-lg">
        <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
              <span>📑</span> Comprehensive Format Specifiers &amp; Modifiers Master Table
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Every format specifier, modifier flag, and conversion rule in C
            </p>
          </div>
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            ANSI C / C99 Standards
          </span>
        </div>

        {/* Master Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Specifier</th>
                <th className="p-3">Data Type / Description</th>
                <th className="p-3">printf Usage Example</th>
                <th className="p-3">Rendered Output</th>
                <th className="p-3">scanf Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-mono font-bold text-amber-300">%d / %i</td>
                <td className="p-3">Signed 32-bit decimal integer</td>
                <td className="p-3 font-mono">printf("%d", 42);</td>
                <td className="p-3 font-mono text-emerald-400">42</td>
                <td className="p-3 text-slate-400">%i auto-detects octal/hex bases</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-amber-300">%u</td>
                <td className="p-3">Unsigned 32-bit decimal integer</td>
                <td className="p-3 font-mono">printf("%u", 4000000000U);</td>
                <td className="p-3 font-mono text-emerald-400">4000000000</td>
                <td className="p-3 text-slate-400">Expects unsigned int*</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">%f</td>
                <td className="p-3">Single-precision floating-point</td>
                <td className="p-3 font-mono">printf("%.2f", 3.14159f);</td>
                <td className="p-3 font-mono text-emerald-400">3.14</td>
                <td className="p-3 text-slate-400">Writes 4-byte float*</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">%lf</td>
                <td className="p-3">Double-precision floating-point</td>
                <td className="p-3 font-mono">printf("%.4lf", 2.71828);</td>
                <td className="p-3 font-mono text-emerald-400">2.7183</td>
                <td className="p-3 text-amber-300 font-bold">MANDATORY for double* in scanf</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-pink-300">%c</td>
                <td className="p-3">Single ASCII Character</td>
                <td className="p-3 font-mono">printf("%c", 'Z');</td>
                <td className="p-3 font-mono text-emerald-400">Z</td>
                <td className="p-3 text-rose-300 font-semibold">Use " %c" with space to skip '\n'</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-pink-300">%s</td>
                <td className="p-3">Null-terminated string (char array)</td>
                <td className="p-3 font-mono">printf("%s", "Barrackpore");</td>
                <td className="p-3 font-mono text-emerald-400">Barrackpore</td>
                <td className="p-3 text-slate-400">Stops at first whitespace space</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-300">%x / %X</td>
                <td className="p-3">Hexadecimal (lowercase / uppercase)</td>
                <td className="p-3 font-mono">printf("%#X", 255);</td>
                <td className="p-3 font-mono text-emerald-400">0XFF</td>
                <td className="p-3 text-slate-400">Reads hex with/without 0x prefix</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-300">%o</td>
                <td className="p-3">Octal integer (base-8)</td>
                <td className="p-3 font-mono">printf("%o", 64);</td>
                <td className="p-3 font-mono text-emerald-400">100</td>
                <td className="p-3 text-slate-400">Parses base-8 numbers</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-indigo-300">%p</td>
                <td className="p-3">Pointer memory address</td>
                <td className="p-3 font-mono">printf("%p", (void*)&amp;x);</td>
                <td className="p-3 font-mono text-emerald-400">0x7ffeefbff568</td>
                <td className="p-3 text-slate-400">Reads raw hexadecimal memory pointer</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-cyan-300">%e / %E</td>
                <td className="p-3">Scientific exponential notation</td>
                <td className="p-3 font-mono">printf("%e", 6022000.0);</td>
                <td className="p-3 font-mono text-emerald-400">6.022000e+06</td>
                <td className="p-3 text-slate-400">Parses float in scientific notation</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-cyan-300">%g / %G</td>
                <td className="p-3">Shortest decimal / scientific form</td>
                <td className="p-3 font-mono">printf("%g", 1200.500);</td>
                <td className="p-3 font-mono text-emerald-400">1200.5</td>
                <td className="p-3 text-slate-400">Removes trailing redundant zeros</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-300">%lld / %llu</td>
                <td className="p-3">64-bit signed / unsigned long long</td>
                <td className="p-3 font-mono">printf("%lld", 9000000000000LL);</td>
                <td className="p-3 font-mono text-emerald-400">9000000000000</td>
                <td className="p-3 text-slate-400">Target must be 64-bit int*</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-emerald-300">%zu</td>
                <td className="p-3">Size type (returned by sizeof)</td>
                <td className="p-3 font-mono">printf("%zu", sizeof(double));</td>
                <td className="p-3 font-mono text-emerald-400">8</td>
                <td className="p-3 text-slate-400">Standard C99 size_t format</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-rose-300">%%</td>
                <td className="p-3">Literal percent sign</td>
                <td className="p-3 font-mono">printf("100%%");</td>
                <td className="p-3 font-mono text-emerald-400">100%</td>
                <td className="p-3 text-slate-400">Matches literal % in input stream</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Formatting Flags, Width and Precision Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2.5">
            <span className="font-bold text-sky-300 text-sm flex items-center gap-2">
              <span>📏</span> Alignment, Padding &amp; Width Flags
            </span>
            <ul className="list-disc pl-4 text-slate-300 space-y-1.5 leading-relaxed">
              <li><code>%8d</code>: <strong>Right-aligns</strong> in a field of at least 8 spaces.</li>
              <li><code>%-8d</code>: <strong>Left-aligns</strong> in a field of 8 spaces.</li>
              <li><code>%08d</code>: <strong>Pads leading zeros</strong> (e.g. <code>42</code> becomes <code>00000042</code>).</li>
              <li><code>%+d</code>: <strong>Forces sign display</strong> (shows <code>+42</code> or <code>-42</code>).</li>
              <li><code>% d</code>: <strong>Space flag</strong> (leaves space for positive numbers for tabular alignment).</li>
            </ul>
          </div>

          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2.5">
            <span className="font-bold text-purple-300 text-sm flex items-center gap-2">
              <span>🔍</span> Precision, Scansets &amp; Dynamic Modifiers
            </span>
            <ul className="list-disc pl-4 text-slate-300 space-y-1.5 leading-relaxed">
              <li><code>%.2f</code>: Rounds/formats to exactly <strong>2 decimal places</strong>.</li>
              <li><code>%.5s</code>: Prints at most the first <strong>5 characters</strong> of a string.</li>
              <li><code>%*.*f</code>: <strong>Dynamic width/precision</strong> passed as integer parameters at runtime.</li>
              <li><code>%[^\n]</code>: <strong>Scanf Scanset</strong> reads a full line containing spaces until Enter.</li>
              <li><code>%49s</code>: <strong>Bounded string input</strong> prevents buffer overflow.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. DEDICATED MULTI-SCENARIO EXAMPLES SECTION */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-lg">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>📚</span> Multi-Scenario Code Examples &amp; Practical Variations
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-world console formatting patterns from tabular reports to hex dumps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario 1: Tabular Report Generation */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">Scenario 1: Tabular Report Generator</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">Width Alignment</span>
            </div>
            <p className="text-xs text-slate-400">
              Aligns text and numbers into perfectly spaced terminal columns.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`printf("%-15s %-10s %10s\\n", "Item", "Category", "Price (INR)");
printf("----------------------------------------\\n");
printf("%-15s %-10s %10.2f\\n", "Motherboard", "Hardware", 8500.50);
printf("%-15s %-10s %10.2f\\n", "RAM 16GB", "Memory", 3200.00);
printf("%-15s %-10s %10.2f\\n", "SSD 1TB", "Storage", 6450.75);`}</pre>
          </div>

          {/* Scenario 2: Memory Address & Hex Byte Dump */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Scenario 2: Hex Byte Dump Inspector</span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">Hex &amp; Pointer</span>
            </div>
            <p className="text-xs text-slate-400">
              Inspects physical byte patterns using <code>%02X</code> and <code>%p</code>.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`unsigned char packet[] = {0x7F, 0x45, 0x4C, 0x46}; // ELF magic bytes

printf("Packet Base Address: %p\\n", (void*)packet);
printf("Raw Hex Bytes: ");
for (int i = 0; i < 4; i++) {
    printf("%02X ", packet[i]); // Prints: 7F 45 4C 46
}
printf("\\n");`}</pre>
          </div>

          {/* Scenario 3: Safe Multi-Word Input with Scansets */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">Scenario 3: Reading Sentences with Spaces</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20">Scanset %[^\n]</span>
            </div>
            <p className="text-xs text-slate-400">
              Reads entire user strings including spaces without stopping at whitespace.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`char instituteName[100];

printf("Enter Institute Name: ");
// %99[^\n] reads up to 99 chars until Enter is pressed
if (scanf(" %99[^\\n]", instituteName) == 1) {
    printf("Enrolled at: %s\\n", instituteName);
}`}</pre>
          </div>

          {/* Scenario 4: Dynamic Width and Precision Formatting */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400 text-sm">Scenario 4: Dynamic Runtime Formatting</span>
              <span className="bg-pink-500/10 text-pink-400 text-[10px] px-2 py-0.5 rounded border border-pink-500/20">Wildcard *.*</span>
            </div>
            <p className="text-xs text-slate-400">
              Passes column width and decimal precision as variables at runtime.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`double pi = 3.1415926535;

for (int precision = 1; precision <= 5; precision++) {
    // Dynamic width 12, dynamic precision
    printf("Precision %d: [%*.*f]\\n", precision, 12, precision, pi);
}`}</pre>
          </div>
        </div>
      </section>

      {/* 5. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: Format Specifier Anatomy
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              Grammar Breakdown of "%+010.2lf" Format Specifier
            </text>

            {/* % Box */}
            <g transform="translate(80, 80)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="80" height="70" rx="8" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
              <text x="40" y="40" textAnchor="middle" fill="#f8fafc" className="font-mono text-xl font-bold">%</text>
              <text x="40" y="60" textAnchor="middle" fill="#94a3b8" className="text-[10px]">Prefix</text>
            </g>

            {/* Flags Box */}
            <g transform="translate(180, 80)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="120" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="60" y="40" textAnchor="middle" fill="#f59e0b" className="font-mono text-xl font-bold">+ 0</text>
              <text x="60" y="60" textAnchor="middle" fill="#fde68a" className="text-[10px]">Flags (Sign / Pad)</text>
            </g>

            {/* Width Box */}
            <g transform="translate(320, 80)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="120" height="70" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="60" y="40" textAnchor="middle" fill="#38bdf8" className="font-mono text-xl font-bold">10</text>
              <text x="60" y="60" textAnchor="middle" fill="#bae6fd" className="text-[10px]">Field Width (Min 10)</text>
            </g>

            {/* Precision Box */}
            <g transform="translate(460, 80)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="120" height="70" rx="8" fill="#1e293b" stroke="#a78bfa" strokeWidth="2" />
              <text x="60" y="40" textAnchor="middle" fill="#a78bfa" className="font-mono text-xl font-bold">.2</text>
              <text x="60" y="60" textAnchor="middle" fill="#ddd6fe" className="text-[10px]">Precision (2 Decimals)</text>
            </g>

            {/* Length Modifier Box */}
            <g transform="translate(600, 80)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="100" height="70" rx="8" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="50" y="40" textAnchor="middle" fill="#34d399" className="font-mono text-xl font-bold">l</text>
              <text x="50" y="60" textAnchor="middle" fill="#a7f3d0" className="text-[10px]">Length (Long)</text>
            </g>

            {/* Specifier Character Box */}
            <g transform="translate(720, 80)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="120" height="70" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
              <text x="60" y="40" textAnchor="middle" fill="#f43f5e" className="font-mono text-xl font-bold">f</text>
              <text x="60" y="60" textAnchor="middle" fill="#fecdd3" className="text-[10px]">Type Specifier</text>
            </g>

            {/* Bottom Output Callout */}
            <rect x="80" y="180" width="760" height="50" rx="10" fill="#111827" stroke="#334155" strokeWidth="1" />
            <text x="460" y="210" textAnchor="middle" fill="#e2e8f0" className="font-mono text-xs">
              Formatted Result for 42.5: <tspan fill="#34d399" className="font-bold">[+000042.50]</tspan> (10 chars wide, positive sign, zero-padded, 2 decimals)
            </text>
          </svg>
        </div>
      </section>

      {/* 6. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Console I/O Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>ConsoleIODemo.c</code>) demonstrates formatted output for all standard types, hexadecimal representation, dynamic width precision, and pointer addresses.
        </p>

        <CFileLoader fileModule={demoCode} title="ConsoleIODemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     FORMATTED CONSOLE I/O & SPECIFIERS - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [1] Standard Type Specifiers ---
Student Name (%s)        : Swadeep Sharma
Student ID (%d)          : 1042
Letter Grade (%c)        : A
Semester GPA (%.2f)      : 3.88
Account Balance (%.2lf)  : INR 158500.75

--- [2] Integer Base & Memory Address Specifiers ---
Decimal (%d)             : 255
Octal (%o)               : 377
Hexadecimal Lower (%x)   : ff
Hexadecimal Upper (%#X)  : 0XFF (with prefix)
Pointer Address (%p)     : 0x7ffeefbff568

--- [3] Width, Padding & Alignment Flags ---
Right-Aligned (%8d)     : [    1042]
Left-Aligned (%-8d)      : [1042    ]
Zero-Padded (%08d)       : [00001042]
Positive Sign (%+d)      : [+1042]

--- [4] Scientific Notation & Dynamic Width (*.*) ---
Scientific (%e)          : 6.626070e-34
Shortest Rep (%g)        : 1200.5
Dynamic Specifier (%*.*f): [     3.142]
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
          <li><strong>Forgetting '&amp;' in scanf:</strong> <code>scanf("%d", age)</code> passes the variable's value instead of its memory address, causing a Segmentation Fault (`SIGSEGV`).</li>
          <li><strong>Using %f for double in scanf:</strong> Always use <code>%lf</code> for <code>double</code> in <code>scanf</code> to prevent memory truncation.</li>
          <li><strong>Unbounded %s in scanf:</strong> Always use width limits like <code>scanf("%49s", str)</code> to prevent buffer overflow attacks.</li>
        </ul>
      </section>

      {/* 8. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          Why does <code>printf</code> return the total number of characters printed, while <code>scanf</code> returns the count of successfully parsed input items? How does checking <code>if (scanf("%d", &amp;num) != 1)</code> protect interactive programs against infinite loop bugs when a user types letters instead of numbers?
        </p>
      </section>

      {/* 9. Comprehensive FAQs */}
      <section>
        <FAQTemplate title="Module 001_001 Topic 4 FAQs: Format Specifiers" questions={questions} />
      </section>

      {/* 10. Plain Text Note */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_001 Topic 4 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_001_topic4_note.txt"
        />
      </section>

      {/* 11. Teacher Note */}
      <section>
        <Teacher note="Always remember: printf and scanf trust your format string completely! Master format specifiers and width limits to keep your programs beautiful, aligned, and safe from buffer overflows! — Sukanta Hui" />
      </section>
    </div>
  );
}
