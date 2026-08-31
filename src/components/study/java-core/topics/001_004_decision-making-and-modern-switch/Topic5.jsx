import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import complexBoolDemoCode from "./topic5_files/ComplexBooleanConditionsDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

export default function Topic5() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowBool {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(16, 185, 129, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(16, 185, 129, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-bool {
            animation: glowBool 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_004 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Combining Complex Boolean Conditions Using <code className="text-emerald-400">&amp;&amp;</code>, <code className="text-sky-300">||</code>, and <code className="text-rose-400">!</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master composite decision predicates in Java: operator precedence hierarchy (<code className="text-rose-400 font-mono">!</code> &gt; <code className="text-emerald-400 font-mono">&amp;&amp;</code> &gt; <code className="text-sky-300 font-mono">||</code>), short-circuit evaluation guarantees, De Morgan&apos;s laws in condition refactoring, defensive null-guard recipes, and education loan sanction audits in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Mathematics of Composite Decision Predicates
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, complex business rules are expressed by combining boolean conditions using logical operators:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 font-mono text-sm">
            <li><strong className="text-rose-400">! (Logical NOT):</strong> Inverts boolean truth (Unary, highest precedence).</li>
            <li><strong className="text-emerald-400">&amp;&amp; (Logical AND):</strong> True if BOTH operands are true (Short-circuits on <code className="text-rose-400">false</code>).</li>
            <li><strong className="text-sky-300">|| (Logical OR):</strong> True if AT LEAST ONE operand is true (Short-circuits on <code className="text-emerald-400">true</code>).</li>
          </ul>
          <p>
            <strong>De Morgan&apos;s Laws:</strong> <code className="text-amber-300 font-mono">!(A &amp;&amp; B) &equiv; !A || !B</code> and <code className="text-amber-300 font-mono">!(A || B) &equiv; !A &amp;&amp; !B</code> provide the mathematical foundation for inverting complex nested branches into clean guard clauses.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Education Loan Sanction Engine):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> configured an education loan approval engine in Indian Rupees (<code className="text-emerald-400 font-semibold">₹</code>). By formulating composite eligibility rules (<code className="text-emerald-300 font-mono">(score &gt;= 80 || credit &gt;= 720) &amp;&amp; (loan &lt;= 300000.0 || hasCoSigner)</code>), <strong>Abhronila</strong> and <strong>Debangshu</strong> protected loan disbursements with zero null-pointer crashes across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Precedence Hierarchy &amp; Defensive Null Guard Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How operators bind, how short-circuit evaluation prevents exceptions, and De Morgan&apos;s law equivalence:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Complex Boolean Conditions and Null Guard Diagram"
          >
            <defs>
              <linearGradient id="gradPrecedence" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradNullGuard" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradDeMorgan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Precedence Hierarchy */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradPrecedence)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Precedence Hierarchy</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="55" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">1. ! (Logical NOT)</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">2. &amp;&amp; (Logical AND)</text>
            <text x="55" y="142" fill="#bae6fd" fontSize="11" fontFamily="monospace">3. || (Logical OR)</text>
            <text x="160" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              ! &gt; &amp;&amp; &gt; ||
            </text>

            {/* Box 2: Defensive Null Guard */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradNullGuard)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Defensive Null Guard</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">if (s != null &amp;&amp; s.isEnrolled())</text>
            <text x="335" y="122" fill="#d1fae5" fontSize="10">If &apos;s&apos; is null, &amp;&amp; stops immediately!</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">→ Zero NullPointerException!</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Crash-Proof Short-Circuit
            </text>

            {/* Box 3: De Morgan's Laws */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradDeMorgan)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. De Morgan&apos;s Laws</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">!(A &amp;&amp; B) &equiv; !A || !B</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="11" fontFamily="monospace">!(A || B) &equiv; !A &amp;&amp; !B</text>
            <text x="615" y="142" fill="#ede9fe" fontSize="10">Simplifies inverted conditions</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Logic Equivalence
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §15.23 &amp; §15.24: Short-circuiting guarantees right operand is skipped when left operand is decisive.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Truth Table Matrix of Composite Boolean Logic
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">A</th>
                <th className="p-3 font-semibold text-sky-400">B</th>
                <th className="p-3 font-semibold text-emerald-400">A &amp;&amp; B</th>
                <th className="p-3 font-semibold text-sky-300">A || B</th>
                <th className="p-3 font-semibold text-amber-400">!(A &amp;&amp; B)</th>
                <th className="p-3 font-semibold text-purple-400">!A || !B</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">false</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-emerald-400">true</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-rose-400">false</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
                <td className="p-3 font-mono text-emerald-400 font-bold">true</td>
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
            ComplexBooleanConditionsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates interval range checking, operator precedence hierarchies (<code className="text-rose-400 font-mono">! &gt; &amp;&amp; &gt; ||</code>), De Morgan&apos;s laws in guard refactoring, defensive short-circuit null guards, and education loan sanction audits in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={complexBoolDemoCode}
          title="ComplexBooleanConditionsDemo.java"
          highlightLines={[21, 33, 36, 46, 54, 60, 77]}
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
              <span>❌</span> Pitfall 1: Writing Chained Inequalities (0 &lt;= x &lt;= 100)
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In Java, writing <code className="text-rose-300 font-mono">0 &lt;= x &lt;= 100</code> causes a compilation error because <code className="text-sky-300 font-mono">0 &lt;= x</code> evaluates to a boolean, which cannot be compared to an integer!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Always combine intervals with <code className="bg-slate-900 px-1 py-0.5 rounded">&amp;&amp;</code>: <code className="bg-slate-900 px-1 py-0.5 rounded">x &gt;= 0 &amp;&amp; x &lt;= 100</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Parentheses for Mixed &amp;&amp; and || Expressions
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always write <code className="text-emerald-400 font-mono">(isStudent &amp;&amp; isMerit) || isVIP</code> to explicitly communicate intent and prevent operator precedence misinterpretations.
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
            🤔 <em>&ldquo;How does De Morgan&apos;s law make your guard clauses 10x cleaner?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Inverting Positive Logic! If an admission rule requires <code className="text-emerald-300 font-mono">(hasPaidFee &amp;&amp; hasIdCard)</code>, applying De Morgan&apos;s Law <code className="text-amber-300 font-mono">!(hasPaidFee &amp;&amp; hasIdCard) &equiv; !hasPaidFee || !hasIdCard</code> allows you to write early guard returns: <code className="text-rose-400 font-mono">if (!hasPaidFee || !hasIdCard) return;</code>, instantly keeping your primary logic flat and unnested!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Complex Boolean Conditions FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_004 Topic 5: Combining Complex Boolean Conditions"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_004_topic5_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Combining boolean conditions is the heart of decision logic in software. Master operator precedence, leverage short-circuit null guards, and apply De Morgan's laws to keep your code clean and expressive. In Topic 6, we dive into the Traditional 'switch-case' Statement! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
