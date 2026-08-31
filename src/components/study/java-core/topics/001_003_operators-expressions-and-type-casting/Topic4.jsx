import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import concatDemoCode from "./topic4_files/StringConcatenationOverloadingDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

export default function Topic4() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowConcat {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(168, 85, 247, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(168, 85, 247, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-concat {
            animation: glowConcat 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          String Concatenation Operator (<code className="text-purple-400">+</code>) &amp; Operator Overloading Mechanics
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Discover why <code className="text-purple-300 font-mono">+</code> is Java&apos;s only built-in overloaded operator: Left-to-Right associativity traps (<code className="text-rose-400 font-mono">&quot;Text&quot; + 10 + 20</code> vs <code className="text-emerald-300 font-mono">&quot;Text&quot; + (10 + 20)</code>), null safety conversions, Java 9+ <code className="text-sky-300 font-mono">invokedynamic</code> (JEP 280), loop optimizations with <code className="text-amber-300 font-mono">StringBuilder</code>, and certificate generation in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Special Status of the &apos;+&apos; Operator in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java explicitly disallows user-defined operator overloading to keep the language simple and maintainable. However, the Java Language Specification makes a deliberate exception for the <code className="text-purple-400 font-bold">+</code> operator.
          </p>
          <p>
            When both operands are numbers, <code className="text-sky-300 font-mono">+</code> performs <strong>numeric addition</strong>. But if <em>either</em> operand is a <code className="text-emerald-300 font-mono">String</code>, Java automatically converts the non-string operand to text and performs <strong>String concatenation</strong>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Classroom Case Study (Barrackpore Certificate Engine):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an automated student certificate and invoice generator. When printing course totals, they initially wrote <code className="text-rose-300 font-mono">&quot;Fee: ₹&quot; + baseFee + labFee</code>, which produced <code className="text-amber-300 font-mono">&quot;Fee: ₹150002500&quot;</code> instead of <code className="text-emerald-400 font-semibold">&quot;Fee: ₹17500&quot;</code>. <strong>Abhronila</strong> and <strong>Debangshu</strong> added parentheses <code className="text-emerald-300 font-mono">&quot;Fee: ₹&quot; + (baseFee + labFee)</code> to force numeric addition first, generating flawless invoices in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Left-to-Right String Concatenation vs. Numeric Addition Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How Left-to-Right associativity dictates whether numbers are added mathematically or converted to text:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="String Concatenation Left-to-Right Evaluation Diagram"
          >
            <defs>
              <linearGradient id="gradNumFirst" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradStrFirst" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradParen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Case 1: 10 + 20 + " Barrackpore" */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradNumFirst)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Numbers First</text>
            <rect x="45" y="80" width="230" height="75" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">10 + 20 + &quot; B&quot;</text>
            <text x="55" y="122" fill="#e0f2fe" fontSize="10">→ (10 + 20) = 30 (Numeric)</text>
            <text x="55" y="142" fill="#e0f2fe" fontSize="10">→ 30 + &quot; B&quot; = &quot;30 B&quot;</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Numeric Sum First
            </text>

            {/* Case 2: "Barrackpore " + 10 + 20 (THE TRAP) */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradStrFirst)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. String First (TRAP!)</text>
            <rect x="325" y="80" width="230" height="75" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">&quot;B &quot; + 10 + 20</text>
            <text x="335" y="122" fill="#fecdd3" fontSize="10">→ (&quot;B &quot; + 10) = &quot;B 10&quot;</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="10">→ &quot;B 10&quot; + 20 = &quot;B 1020&quot;</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✗ Numbers NOT Added!
            </text>

            {/* Case 3: "Barrackpore " + (10 + 20) */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradParen)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. With Parentheses</text>
            <rect x="605" y="80" width="230" height="75" rx="6" fill="#022c22" />
            <text x="615" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">&quot;B &quot; + (10 + 20)</text>
            <text x="615" y="122" fill="#d1fae5" fontSize="10">→ (10 + 20) = 30 (Parentheses)</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">→ &quot;B &quot; + 30 = &quot;B 30&quot;</text>
            <text x="720" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Clean &amp; Intentional
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Java 9+ Bytecode Architecture: Desugared into high-speed `invokedynamic` (JEP 280 StringConcatFactory).
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> String Concatenation vs. Character Addition Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Expression</th>
                <th className="p-3 font-semibold text-emerald-400">Evaluated Result</th>
                <th className="p-3 font-semibold text-amber-400">Result Type</th>
                <th className="p-3 font-semibold text-slate-400">Explanation &amp; Evaluation Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">10 + 20 + &quot;Rs&quot;</td>
                <td className="p-3 font-mono text-amber-300">&quot;30Rs&quot;</td>
                <td className="p-3 font-mono">String</td>
                <td className="p-3 text-xs">Integer addition (10+20=30) executes first before string concatenation</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">&quot;Rs &quot; + 10 + 20</td>
                <td className="p-3 font-mono text-rose-400">&quot;Rs 1020&quot;</td>
                <td className="p-3 font-mono">String</td>
                <td className="p-3 text-xs">Left-to-right concatenation converts 10 and 20 into strings sequentially</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">&apos;A&apos; + &apos;B&apos;</td>
                <td className="p-3 font-mono text-amber-300">131</td>
                <td className="p-3 font-mono">int</td>
                <td className="p-3 text-xs">Both operands are char, so numeric promotion performs integer math (65+66)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">&quot;&quot; + &apos;A&apos; + &apos;B&apos;</td>
                <td className="p-3 font-mono text-emerald-300">&quot;AB&quot;</td>
                <td className="p-3 font-mono">String</td>
                <td className="p-3 text-xs">Empty string prefix forces string concatenation for each character</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">&quot;Student: &quot; + null</td>
                <td className="p-3 font-mono text-purple-300">&quot;Student: null&quot;</td>
                <td className="p-3 font-mono">String</td>
                <td className="p-3 text-xs">String.valueOf(null) produces &quot;null&quot; without NullPointerException</td>
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
            StringConcatenationOverloadingDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates String concatenation vs numeric addition, Left-to-Right evaluation traps, null reference handling, loop performance comparisons with <code className="text-amber-300 font-mono">StringBuilder</code>, and certificate generation in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={concatDemoCode}
          title="StringConcatenationOverloadingDemo.java"
          highlightLines={[25, 29, 32, 35, 38, 39, 49, 57, 63, 64, 73, 74]}
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
              <span>❌</span> Pitfall 1: Using += for String Concatenation Inside Loops
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">str += item;</code> inside a loop with thousands of iterations instantiates a new <code className="text-sky-300 font-mono">StringBuilder</code> on every single iteration, copying all previous characters and creating <code className="text-rose-400 font-mono">O(N^2)</code> quadratic memory bloat.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always use a single <code className="bg-slate-900 px-1 py-0.5 rounded">StringBuilder</code> outside the loop: <code className="bg-slate-900 px-1 py-0.5 rounded">sb.append(item);</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Parentheses for Numeric Sums in Strings
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always wrap arithmetic calculations in parentheses when prefixing with text: <code className="text-emerald-400 font-mono">&quot;Total Fee: ₹&quot; + (baseFee + gstAmount)</code>.
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
            🤔 <em>&ldquo;Why does `&apos;A&apos; + &apos;B&apos;` print 131, but `&quot;&quot; + &apos;A&apos; + &apos;B&apos;` prints &quot;AB&quot;?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Data types! <code className="text-purple-300 font-mono">&apos;A&apos;</code> and <code className="text-purple-300 font-mono">&apos;B&apos;</code> are primitive characters. Without any String present, binary numeric promotion converts them to integers (<code className="text-emerald-400 font-mono">65 + 66 = 131</code>). Adding <code className="text-sky-300 font-mono">&quot;&quot;</code> introduces a String, turning the entire chain into String concatenation!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="String Concatenation FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 4: String Concatenation & Overloading"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic4_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: The '+' operator is the only overloaded operator in Java. Always be mindful of Left-to-Right evaluation order when mixing numbers and strings, and remember: inside loops, always choose StringBuilder for high-performance O(N) execution! In Topic 5, we explore Unary Operators (+, -, !, ~)! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
