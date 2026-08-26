import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import underscoreCode from "./topic10_files/UnderscoreNumericLiteralsDemo.java?raw";
import noteText from "./topic10_files/topic10_note.txt?raw";
import questions from "./topic10_files/topic10_questions";

export default function Topic10() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseHighlight {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-pulse-highlight {
            animation: pulseHighlight 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_002 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Numeric Literal Enhancement: Underscores (<code className="text-emerald-400">_</code>) for Readability
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master the Java 7+ underscore enhancement in numeric literals: improving readability for massive integer constants, Indian Rupee (₹) Lakhs/Crores, binary bitmasks, hexadecimal color palettes, and understanding zero-overhead compiler stripping.
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Need for Underscores in Numeric Literals
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            When working with large numbers in software—such as calculating a company revenue of <span className="text-amber-300 font-semibold">₹1,00,00,000</span> (₹1 Crore) or configuring a 32-bit binary subnet mask—writing uninterrupted sequences of digits like <code className="text-rose-300 font-mono">10000000</code> is error-prone. A software engineer can easily miss or add a zero, resulting in catastrophic tenfold accounting errors.
          </p>
          <p>
            Introduced in <strong>Java 7 (Project Coin, JSR 334)</strong>, Java allows developers to place one or more underscores (<code className="text-emerald-400 font-bold">_</code>) anywhere <strong>between digits</strong> in numeric literals.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore &amp; Shyamnagar):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore center, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an accounting module for a textile distributor in Shyamnagar. By formatting order transactions with Indian Lakhs and Crores grouping (<code className="text-emerald-400 font-mono">long payment = 25_00_000L;</code> for ₹25 Lakhs), code reviews with <strong>Abhronila</strong> and <strong>Debangshu</strong> became instant, self-documenting, and 100% immune to miscounting bugs.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram (Compiler Lexer Stripping) */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> How the Java Compiler Processes Underscores (Zero Runtime Overhead)
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          The Java compiler (<code className="text-sky-300">javac</code>) strips all underscores during the lexical analysis tokenization phase. The resulting constant pool entry in the generated <code className="text-amber-300">.class</code> file is purely the raw numeric value.
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 260"
            className="w-full h-auto"
            aria-label="Compiler Lexical Stripping Pipeline Diagram"
          >
            <defs>
              <linearGradient id="gradSourceBox" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradLexer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
              <linearGradient id="gradBytecodeBox" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Stage 1: Developer Source Code */}
            <rect x="30" y="40" width="220" height="150" rx="12" fill="url(#gradSourceBox)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="140" y="70" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Java Source Code</text>
            <text x="140" y="100" fill="#f0f9ff" fontSize="12" fontFamily="monospace" textAnchor="middle">int x = 1_000_000;</text>
            <text x="140" y="125" fill="#f0f9ff" fontSize="12" fontFamily="monospace" textAnchor="middle">long fee = 25_00_000L;</text>
            <text x="140" y="150" fill="#f0f9ff" fontSize="12" fontFamily="monospace" textAnchor="middle">int hex = 0xFF_AA_55;</text>
            <text x="140" y="175" fill="#bae6fd" fontSize="10" textAnchor="middle">(Human Readable Syntax)</text>

            {/* Arrow 1 */}
            <path d="M 260 115 L 310 115" stroke="#94a3b8" strokeWidth="3" markerEnd="url(#arrowhead)" />
            <polygon points="310,110 325,115 310,120" fill="#94a3b8" />

            {/* Stage 2: Compiler Lexical Analysis */}
            <rect x="330" y="40" width="220" height="150" rx="12" fill="url(#gradLexer)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="70" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Javac Lexer Scanner</text>
            <text x="440" y="100" fill="#fdf4ff" fontSize="12" textAnchor="middle">Strips &apos;_&apos; between digits</text>
            <text x="440" y="125" fill="#fdf4ff" fontSize="11" fontFamily="monospace" textAnchor="middle">_1_000_000 &rarr; 1000000</text>
            <text x="440" y="150" fill="#fdf4ff" fontSize="11" textAnchor="middle">Validates boundary rules</text>
            <text x="440" y="175" fill="#e9d5ff" fontSize="10" textAnchor="middle">(Compile-Time Only)</text>

            {/* Arrow 2 */}
            <path d="M 560 115 L 610 115" stroke="#94a3b8" strokeWidth="3" />
            <polygon points="610,110 625,115 610,120" fill="#94a3b8" />

            {/* Stage 3: Classfile Bytecode */}
            <rect x="630" y="40" width="220" height="150" rx="12" fill="url(#gradBytecodeBox)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="740" y="70" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. JVM Bytecode (.class)</text>
            <text x="740" y="100" fill="#ecfdf5" fontSize="12" fontFamily="monospace" textAnchor="middle">ldc #2 // int 1000000</text>
            <text x="740" y="125" fill="#ecfdf5" fontSize="12" fontFamily="monospace" textAnchor="middle">ldc2_w #4 // 2500000l</text>
            <text x="740" y="150" fill="#ecfdf5" fontSize="12" fontFamily="monospace" textAnchor="middle">ldc #6 // int 16755285</text>
            <text x="740" y="175" fill="#a7f3d0" fontSize="10" textAnchor="middle">(Zero Runtime Overhead)</text>

            {/* Footer Legend */}
            <text x="440" y="235" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Bytecode Guarantee: No underscore metadata exists in compiled class files or JVM heap memory.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown (Syntax Rules) */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📋</span> Legal vs. Illegal Underscore Placement Rules
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Rule Category</th>
                <th className="p-3 font-semibold text-emerald-400">Valid Java Syntax (✓)</th>
                <th className="p-3 font-semibold text-rose-400">Illegal Syntax (Compilation Error ✗)</th>
                <th className="p-3 font-semibold text-slate-400">Technical Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Boundary Edges</td>
                <td className="p-3 font-mono text-emerald-400">int x = 1_000;</td>
                <td className="p-3 font-mono text-rose-400">int x = _1000; / 1000_;</td>
                <td className="p-3 text-xs">Start is parsed as variable identifier; end violates between-digits rule.</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Decimal Points</td>
                <td className="p-3 font-mono text-emerald-400">double d = 3.14_15;</td>
                <td className="p-3 font-mono text-rose-400">double d = 3._14; / 3_.14;</td>
                <td className="p-3 text-xs">A decimal point (&apos;.&apos;) is a delimiter, not a numerical digit.</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Type Suffixes (L, F, D)</td>
                <td className="p-3 font-mono text-emerald-400">long l = 1_000L;</td>
                <td className="p-3 font-mono text-rose-400">long l = 1000_L;</td>
                <td className="p-3 text-xs">&apos;L&apos; and &apos;F&apos; are type indicators, not digits.</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Radix Prefixes (0x, 0b)</td>
                <td className="p-3 font-mono text-emerald-400">int hex = 0xFF_55;</td>
                <td className="p-3 font-mono text-rose-400">0_xFF / 0x_FF / 0b_101;</td>
                <td className="p-3 text-xs">Radix specifiers &apos;0x&apos; and &apos;0b&apos; cannot have internal or trailing underscores.</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Scientific Exponent (&apos;e&apos;)</td>
                <td className="p-3 font-mono text-emerald-400">double s = 1.5e3_0;</td>
                <td className="p-3 font-mono text-rose-400">double s = 1.5_e3; / 1.5e_3;</td>
                <td className="p-3 text-xs">Exponent &apos;e&apos; is a separator token; underscores cannot touch it.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Hands-on Code Example */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>💻</span> Compilable Java Source Code
          </h2>
          <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            UnderscoreNumericLiteralsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following runnable Java program illustrates clean underscore grouping across Indian Rupee (₹) currency ledgers, masked card identifiers, binary network masks, hexadecimal colors, and floating-point scientific constants.
        </p>

        <JavaFileLoader
          fileModule={underscoreCode}
          title="UnderscoreNumericLiteralsDemo.java"
          highlightLines={[22, 23, 24, 30, 31, 38, 40, 47, 48, 55, 56, 57]}
        />
      </section>

      {/* Section 5: Common Pitfalls & Best Practices */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Industry Best Practices
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 1: Expecting Integer.parseInt() to Parse Underscores
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Underscores in numeric literals are strictly a <strong>compile-time language syntax feature</strong>. Calling <code className="text-rose-300 font-mono">Integer.parseInt(&quot;1_000_000&quot;)</code> or <code className="text-rose-300 font-mono">new BigDecimal(&quot;12_500.50&quot;)</code> throws a runtime <code className="text-rose-400 font-mono">NumberFormatException</code>.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Strip underscores before parsing user or file input: <code className="bg-slate-900 px-1 py-0.5 rounded">Integer.parseInt(input.replace(&quot;_&quot;, &quot;&quot;))</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/50 space-y-2">
            <p className="text-rose-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>❌</span> Pitfall 2: Overusing Arbitrary Underscore Placements
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              While the compiler allows writing <code className="text-amber-300 font-mono">int x = 1_0_0_0_0_0_0;</code>, arbitrary placement confuses human readers and defeats the purpose of the feature.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Standardize grouping by domain convention: 3 digits for Western thousands (<code className="bg-slate-900 px-1 py-0.5 rounded">1_000_000</code>), 2-2-3 for Indian Lakhs/Crores (<code className="bg-slate-900 px-1 py-0.5 rounded">15_00_000</code>), 4 bits for binary (<code className="bg-slate-900 px-1 py-0.5 rounded">0b1111_0000</code>), and 2 hex digits for colors (<code className="bg-slate-900 px-1 py-0.5 rounded">0xFF_57_33</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Section 6: Thinking & Hints Section */}
      <section className="space-y-4 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>💡</span> Think About This...
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            🤔 <em>&ldquo;Why did the Java compiler designers allow underscores in numeric literals but explicitly forbid commas (such as `1,000,000`)?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> In Java grammar, the comma (<code className="text-amber-300">,</code>) is already heavily overloaded as a separator in parameter lists, variable declaration lists, and array initializers (e.g. <code className="text-sky-300 font-mono">int a = 1, b = 2;</code>). Introducing commas inside numeric literals would create massive lexical ambiguities, whereas the underscore (<code className="text-emerald-400">_</code>) between digits is completely unambiguous!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Underscores in Numeric Literals FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_002 Topic 10: Underscores in Numeric Literals"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_002_topic10_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Always remember that clean code is written once but read hundreds of times by your fellow developers. Whenever you define numeric constants exceeding 4 digits, always use underscores to group them meaningfully (especially in Indian Rupees ₹ with 10_00_000 for 10 Lakhs). It costs zero CPU cycles at runtime and saves hours of debugging! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
