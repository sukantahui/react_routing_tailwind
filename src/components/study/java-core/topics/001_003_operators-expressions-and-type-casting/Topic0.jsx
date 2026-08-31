import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import expressionDemoCode from "./topic0_files/ExpressionEvaluationDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

export default function Topic0() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseOp {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-pulse-op {
            animation: pulseOp 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Operands, Operators &amp; Expression Evaluation in Java
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Welcome to Module 001_003: master the grammar of Java computations: operator arity (unary, binary, ternary), expression vs statement distinctions, Java&apos;s strict Left-to-Right operand evaluation guarantee (JLS §15.7), and student scholarship calculations in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Computational Grammar of Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, <strong>Operators</strong> are special symbols that perform operations on one, two, or three <strong>Operands</strong> (variables, literals, or sub-expressions) to produce a new value.
          </p>
          <p>
            Java classifies operators into three fundamental arity groups: <strong>Unary</strong> (1 operand, e.g. <code className="text-purple-300 font-mono">++x</code>, <code className="text-purple-300 font-mono">!flag</code>), <strong>Binary</strong> (2 operands, e.g. <code className="text-sky-300 font-mono">a + b</code>, <code className="text-sky-300 font-mono">x &gt; y</code>), and <strong>Ternary</strong> (3 operands, e.g. <code className="text-emerald-300 font-mono">condition ? val1 : val2</code>).
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Merit Assessment):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an automated student merit evaluator. By combining arithmetic and ternary operators (<code className="text-emerald-300 font-mono">double score = (theory * 0.6) + (practical * 0.4);</code>), <strong>Abhronila</strong> and <strong>Debangshu</strong> awarded fee discounts in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>) to outstanding learners across Naihati and Shyamnagar with deterministic precision.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The Anatomy of a Java Expression &amp; Left-to-Right Evaluation Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How operands, operators, and the JLS §15.7 evaluation order guarantee function together:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 280"
            className="w-full h-auto"
            aria-label="Java Expression Architecture and Evaluation Pipeline Diagram"
          >
            <defs>
              <linearGradient id="gradUnary" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#7e22ce" />
              </linearGradient>
              <linearGradient id="gradBinary" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradTernary" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Box 1: Unary */}
            <rect x="30" y="40" width="250" height="130" rx="10" fill="url(#gradUnary)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="155" y="70" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">1. Unary (1 Operand)</text>
            <text x="155" y="95" fill="#faf5ff" fontSize="11" textAnchor="middle">++x, --x, +x, -x, !flag, ~mask</text>
            <text x="155" y="125" fill="#e9d5ff" fontSize="11" fontFamily="monospace" textAnchor="middle">boolean pass = !failed;</text>
            <text x="155" y="150" fill="#d8b4fe" fontSize="10" textAnchor="middle">Single value transformation</text>

            {/* Box 2: Binary */}
            <rect x="315" y="40" width="250" height="130" rx="10" fill="url(#gradBinary)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="70" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">2. Binary (2 Operands)</text>
            <text x="440" y="95" fill="#f0f9ff" fontSize="11" textAnchor="middle">+, -, *, /, %, ==, &lt;, &gt;, &amp;&amp;, ||</text>
            <text x="440" y="125" fill="#bae6fd" fontSize="11" fontFamily="monospace" textAnchor="middle">fee = base + (base * 0.18);</text>
            <text x="440" y="150" fill="#e0f2fe" fontSize="10" textAnchor="middle">Two operands evaluated L-to-R</text>

            {/* Box 3: Ternary */}
            <rect x="600" y="40" width="250" height="130" rx="10" fill="url(#gradTernary)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="725" y="70" fill="#ffffff" fontSize="15" fontWeight="bold" textAnchor="middle">3. Ternary (3 Operands)</text>
            <text x="725" y="95" fill="#ecfdf5" fontSize="11" textAnchor="middle">Condition ? ExprTrue : ExprFalse</text>
            <text x="725" y="125" fill="#a7f3d0" fontSize="11" fontFamily="monospace" textAnchor="middle">discount = score &gt;= 90 ? 0.1 : 0;</text>
            <text x="725" y="150" fill="#d1fae5" fontSize="10" textAnchor="middle">Inline conditional choice</text>

            {/* JLS Evaluation Rule Bar */}
            <rect x="30" y="190" width="820" height="65" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
            <text x="50" y="215" fill="#38bdf8" fontSize="12" fontWeight="bold">
              JLS §15.7 Golden Rule: Left-to-Right Operand Evaluation Guarantee
            </text>
            <text x="50" y="235" fill="#94a3b8" fontSize="11">
              Java guarantees that in any expression `A + B`, operand `A` is fully evaluated before operand `B` is evaluated, preventing compiler-dependent bugs!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Expressions vs Statements vs Blocks
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Construct</th>
                <th className="p-3 font-semibold text-emerald-400">Definition</th>
                <th className="p-3 font-semibold text-amber-400">Syntax Example</th>
                <th className="p-3 font-semibold text-slate-400">Evaluation / Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Expression</td>
                <td className="p-3">Produces a single concrete data value</td>
                <td className="p-3 font-mono text-emerald-400">baseFee * 1.18</td>
                <td className="p-3 text-xs">Evaluates to double <code className="text-sky-300">17700.0</code></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Expression Statement</td>
                <td className="p-3">An expression terminated with a semicolon</td>
                <td className="p-3 font-mono text-emerald-400">counter++;</td>
                <td className="p-3 text-xs">Mutates variable and produces statement execution</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Statement</td>
                <td className="p-3">Complete standalone unit of execution</td>
                <td className="p-3 font-mono text-emerald-400">double total = baseFee * 1.18;</td>
                <td className="p-3 text-xs">Allocates variable and assigns evaluated expression</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-medium text-white">Block</td>
                <td className="p-3">Zero or more statements grouped in &#123; &#125;</td>
                <td className="p-3 font-mono text-emerald-400">&#123; int a = 1; int b = 2; &#125;</td>
                <td className="p-3 text-xs">Defines new local variable scope</td>
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
            ExpressionEvaluationDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates unary, binary, and ternary operators, verifies Java&apos;s strict Left-to-Right evaluation guarantee (JLS §15.7), and computes student scholarship reports in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={expressionDemoCode}
          title="ExpressionEvaluationDemo.java"
          highlightLines={[21, 22, 25, 28, 38, 47, 48, 67, 68, 69, 70]}
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
              <span>❌</span> Pitfall 1: Multiple Side-Effect Mutating Expressions
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing expressions like <code className="text-rose-300 font-mono">int z = a++ + ++a * --a;</code> produces unreadable, confusing code that creates bugs during maintenance.
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Keep expressions simple and split multi-step increments into clean separate statements.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Parentheses for Clarity
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Even though operator precedence rules exist, writing <code className="text-emerald-300 font-mono">double total = (qty * unitPrice) + tax;</code> makes business logic instantly obvious to team members without needing to recall precedence tables.
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
            🤔 <em>&ldquo;Why does `10 + 20 + &quot;Barrackpore&quot;` evaluate to `&quot;30Barrackpore&quot;`, but `&quot;Barrackpore&quot; + 10 + 20` evaluates to `&quot;Barrackpore1020&quot;`?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Left-to-Right Associativity! In the first case, <code className="text-sky-300 font-mono">10 + 20</code> executes first as integer addition (<code className="text-emerald-400 font-mono">30</code>) before concatenating with the String. In the second case, <code className="text-purple-300 font-mono">&quot;Barrackpore&quot; + 10</code> becomes a String immediately (<code className="text-purple-300 font-mono">&quot;Barrackpore10&quot;</code>), so the subsequent <code className="text-sky-300 font-mono">+ 20</code> performs another String concatenation!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Operands &amp; Expressions FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 0: Operands, Operators & Expressions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic0_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Welcome to Module 001_003! Operators are the verbs of the Java language. Always remember Java's strict Left-to-Right operand evaluation guarantee (JLS §15.7) and never hesitate to use parentheses to make your calculations clear and self-documenting. In our next topic (Topic 1), we dive into Arithmetic Operators and Modulus arithmetic! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
