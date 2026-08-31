import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import switchDemoCode from "./topic6_files/TraditionalSwitchCaseDemo.java?raw";
import noteText from "./topic6_files/topic6_note.txt?raw";
import questions from "./topic6_files/topic6_questions";

export default function Topic6() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowSwitch {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(168, 85, 247, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-switch {
            animation: glowSwitch 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 6
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Traditional <code className="text-purple-400">&apos;switch-case&apos;</code> Statement &amp; Valid Data Types
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master multi-way constant dispatch in Java: valid selector types (<code className="text-emerald-400 font-mono">byte</code>, <code className="text-emerald-400 font-mono">short</code>, <code className="text-emerald-400 font-mono">int</code>, <code className="text-emerald-400 font-mono">char</code>, <code className="text-sky-300 font-mono">String</code>, <code className="text-amber-300 font-mono">enum</code>), illegal types (<code className="text-rose-400 font-mono">long</code>, <code className="text-rose-400 font-mono">float</code>, <code className="text-rose-400 font-mono">double</code>, <code className="text-rose-400 font-mono">boolean</code>), compile-time constant case labels, bytecode jump tables (<code className="text-sky-300 font-mono">tableswitch</code> vs <code className="text-sky-300 font-mono">lookupswitch</code>), and course track dispatches in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Multi-Way Constant Matching Architecture
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            The <strong>Traditional <code className="text-purple-400 font-mono">switch-case</code> statement</strong> evaluates a selector expression and transfers execution directly to a matching compile-time constant <code className="text-emerald-400 font-mono">case</code> label:
          </p>
          <p className="font-mono text-purple-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            switch ( selectorExpression ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case CONSTANT_1:
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;statement1();
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;case CONSTANT_2:
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;statement2();
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;default:
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fallbackStatement();
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break;
            <br />
            &#125;
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Classroom Case Study (Barrackpore Course &amp; Branch Dispatcher):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built a campus management dispatcher. By switching on integers for course tracks (Java Core ₹15,000 vs Enterprise Spring Boot ₹22,000), transaction strings (<code className="text-sky-300 font-mono">&quot;WITHDRAW&quot;</code>, <code className="text-sky-300 font-mono">&quot;DEPOSIT&quot;</code>), and location enums (<code className="text-amber-300 font-mono">BARRACKPORE</code>, <code className="text-amber-300 font-mono">SHYAMNAGAR</code>, <code className="text-amber-300 font-mono">NAIHATI</code>, <code className="text-amber-300 font-mono">ICHAPUR</code>), <strong>Abhronila</strong> and <strong>Debangshu</strong> achieved $O(1)$ routing speed in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Valid Selector Types &amp; Bytecode Jump Tables
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Which data types are permitted, which are illegal, and how the JVM optimizes dense integer branches:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Switch Data Types and Jump Table Diagram"
          >
            <defs>
              <linearGradient id="gradValidTypes" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradIllegalTypes" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradTableSwitch" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Valid Types */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradValidTypes)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. VALID Selector Types</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&bull; byte, short, int, char</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&bull; String (Java 7+)</text>
            <text x="55" y="142" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&bull; enum types (Java 5+)</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Supported by JLS §14.11
            </text>

            {/* Box 2: Illegal Types */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradIllegalTypes)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. ILLEGAL Selector Types</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">&times; long (64-bit)</text>
            <text x="335" y="122" fill="#fca5a5" fontSize="11" fontFamily="monospace">&times; float, double (Rounding)</text>
            <text x="335" y="142" fill="#fca5a5" fontSize="11" fontFamily="monospace">&times; boolean (Use if-else!)</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ⚠️ Compile-Time Error!
            </text>

            {/* Box 3: Bytecode tableswitch */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradTableSwitch)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Bytecode tableswitch</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">tableswitch 1 to 4:</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="10">Direct O(1) indexed jump table</text>
            <text x="615" y="142" fill="#ede9fe" fontSize="10">lookupswitch for sparse keys</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              O(1) Direct Branch Jump
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §14.11: Case labels must be compile-time constants; null selectors throw NullPointerException.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Data Type Compatibility Matrix for Switch Selector
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Data Type</th>
                <th className="p-3 font-semibold text-emerald-400">Supported in Switch?</th>
                <th className="p-3 font-semibold text-amber-400">Introduced In</th>
                <th className="p-3 font-semibold text-slate-400">JVM Architectural Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">byte, short, int, char</td>
                <td className="p-3 font-semibold text-emerald-400">YES</td>
                <td className="p-3 text-xs">Java 1.0</td>
                <td className="p-3 text-xs">Direct 32-bit integer register jump table</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">enum types</td>
                <td className="p-3 font-semibold text-emerald-400">YES</td>
                <td className="p-3 text-xs">Java 5.0</td>
                <td className="p-3 text-xs">Maps to enum ordinal integer constants</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">String</td>
                <td className="p-3 font-semibold text-emerald-400">YES</td>
                <td className="p-3 text-xs">Java 7.0</td>
                <td className="p-3 text-xs">Compiles to hashCode() table + .equals() verification</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">long</td>
                <td className="p-3 font-semibold text-rose-400">NO</td>
                <td className="p-3 text-xs">N/A</td>
                <td className="p-3 text-xs">64-bit jump tables are memory prohibitive</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">float, double</td>
                <td className="p-3 font-semibold text-rose-400">NO</td>
                <td className="p-3 text-xs">N/A</td>
                <td className="p-3 text-xs">Binary floating-point representation lacks exact equality</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">boolean</td>
                <td className="p-3 font-semibold text-rose-400">NO</td>
                <td className="p-3 text-xs">N/A</td>
                <td className="p-3 text-xs">Binary state (true/false) is optimally handled by if-else</td>
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
            TraditionalSwitchCaseDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates traditional switch dispatching on primitive integers, characters, Java 7 Strings, and Java 5 Enums in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={switchDemoCode}
          title="TraditionalSwitchCaseDemo.java"
          highlightLines={[25, 26, 29, 32, 42, 45, 68, 71, 84, 87]}
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
              <span>❌</span> Pitfall 1: Variable Scope Collision Across Cases
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Declaring <code className="text-rose-300 font-mono">int temp = 10;</code> in case 1 and <code className="text-rose-300 font-mono">int temp = 20;</code> in case 2 causes a compile error because the entire switch block shares a single scope!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Enclose each case body in curly braces: <code className="bg-slate-900 px-1 py-0.5 rounded">case 1: &#123; int temp = 10; break; &#125;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Unqualified Enum Names in Case Labels
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always write <code className="text-emerald-400 font-mono">case BARRACKPORE:</code> instead of <code className="text-rose-300 font-mono">case StudentBranch.BARRACKPORE:</code>. The compiler already knows the enum type from the selector.
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
            🤔 <em>&ldquo;Why can&apos;t we switch on `long` (64-bit) in Java?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> JVM Bytecode Architecture! The Java Virtual Machine uses the <code className="text-sky-300 font-mono">tableswitch</code> instruction, which generates an indexed jump table based on 32-bit signed integer offsets. Indexing a 64-bit space would require massive multi-gigabyte lookup tables in memory, which is completely unfeasible!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Traditional switch-case FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 6: Traditional 'switch-case' Statement"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic6_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The switch statement is your fastest multi-way routing tool. Remember valid types (byte/short/int/char/String/enum) and always keep case labels as compile-time constants. In Topic 7, we explore the 'break' statement and intentional vs accidental fall-through! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
