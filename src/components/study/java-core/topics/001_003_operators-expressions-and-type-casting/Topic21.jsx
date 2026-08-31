import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import overflowDemoCode from "./topic21_files/ArithmeticOverflowUnderflowDemo.java?raw";
import noteText from "./topic21_files/topic21_note.txt?raw";
import questions from "./topic21_files/topic21_questions";

export default function Topic21() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowOverflow {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(244, 63, 94, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(244, 63, 94, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-over {
            animation: glowOverflow 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_003 · Topic 21
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Module Grand Finale
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Detecting &amp; Preventing Arithmetic Overflow &amp; Underflow
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master crash-proof arithmetic in Java: understanding silent two&apos;s complement wrap-arounds (<code className="text-rose-400 font-mono">Integer.MAX_VALUE + 1 → MIN_VALUE</code>), Java 8+ safe <code className="text-emerald-300 font-mono">Math.*Exact()</code> methods, avoiding the <code className="text-amber-300 font-mono">long total = a + b</code> upcasting trap, arbitrary precision with <code className="text-sky-300 font-mono">BigInteger</code> &amp; <code className="text-sky-300 font-mono">BigDecimal</code>, and financial ledger auditing in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Silent Overflow Dilemma in Java
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            In Java, standard primitive integer arithmetic operations (<code className="text-sky-300 font-mono">+</code>, <code className="text-sky-300 font-mono">-</code>, <code className="text-sky-300 font-mono">*</code>) <strong>SILENTLY wrap around</strong> upon overflow or underflow without throwing any compiler warning or runtime exception:
          </p>
          <p className="font-mono text-rose-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
            Integer.MAX_VALUE (2,147,483,647) + 1 → -2,147,483,648 (Integer.MIN_VALUE!)
          </p>
          <p>
            To prevent silent data corruption in mission-critical applications, Java 8 introduced the <code className="text-emerald-300 font-mono">Math.*Exact()</code> suite (<code className="text-emerald-300 font-mono">addExact</code>, <code className="text-emerald-300 font-mono">multiplyExact</code>, <code className="text-emerald-300 font-mono">toIntExact</code>), which detects overflow conditions and throws <code className="text-rose-400 font-mono">ArithmeticException</code> immediately.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-rose-500 text-slate-300 space-y-2">
            <p className="font-medium text-rose-300">Classroom Case Study (Barrackpore Institutional Endowment Audit):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> built an institutional treasury tracker. When adding two departmental funds totaling ₹2.5 Billion, writing <code className="text-rose-300 font-mono">long total = fundA + fundB;</code> silently resulted in a negative balance because the addition occurred in 32-bit integer arithmetic! <strong>Abhronila</strong> and <strong>Debangshu</strong> fixed the pipeline using <code className="text-emerald-300 font-mono">Math.addExact()</code> and <code className="text-emerald-300 font-mono">BigDecimal</code>, guaranteeing 100% financial accuracy across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Silent Wrap-Around vs. Java 8 Exact Arithmetic Pipeline
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How silent overflow corrupts data and how modern exact methods detect errors:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Arithmetic Overflow and Prevention Diagram"
          >
            <defs>
              <linearGradient id="gradWrapTrap" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradExactSafe" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradBigArith" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Box 1: Silent Wrap-Around */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradWrapTrap)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Silent Wrap-Around</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="55" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">MAX_VALUE + 1</text>
            <text x="55" y="122" fill="#fecdd3" fontSize="10">→ Wraps to -2,147,483,648!</text>
            <text x="55" y="142" fill="#fecdd3" fontSize="10">Zero runtime exceptions thrown!</text>
            <text x="160" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Corrupted Data Risk
            </text>

            {/* Box 2: Java 8 Math.*Exact() */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradExactSafe)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Java 8 Math.*Exact()</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="335" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">Math.addExact(max, 1);</text>
            <text x="335" y="122" fill="#d1fae5" fontSize="10">→ Throws ArithmeticException!</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Allows clean error handling</text>
            <text x="440" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              ✓ Hardware Overflow Detection
            </text>

            {/* Box 3: BigInteger & BigDecimal */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradBigArith)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Arbitrary Precision</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="615" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">new BigDecimal(&quot;15000.75&quot;)</text>
            <text x="615" y="122" fill="#e0f2fe" fontSize="10">Exact decimal financial math</text>
            <text x="615" y="142" fill="#e0f2fe" fontSize="10">BigInteger for huge magnitudes</text>
            <text x="720" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Enterprise Monetary Math
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Upcasting Rule: Always write `(long) a + b` to perform 64-bit addition before assignment to `long`.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Overflow Detection Strategies Comparison
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Strategy</th>
                <th className="p-3 font-semibold text-emerald-400">Implementation Example</th>
                <th className="p-3 font-semibold text-amber-400">Overflow Response</th>
                <th className="p-3 font-semibold text-purple-400">Performance &amp; Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">Math.*Exact()</td>
                <td className="p-3 font-mono text-emerald-400">Math.addExact(a, b)</td>
                <td className="p-3 text-xs text-rose-400">Throws ArithmeticException</td>
                <td className="p-3 text-xs">High-speed hardware checks; best for systems code</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">Pre-Upcasting</td>
                <td className="p-3 font-mono text-emerald-400">(long) a + b</td>
                <td className="p-3 text-xs text-emerald-400">Accommodates values up to $9 \times 10^{18}$</td>
                <td className="p-3 text-xs">Fastest; single CPU register widened addition</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">BigDecimal</td>
                <td className="p-3 font-mono text-emerald-400">bg1.add(bg2)</td>
                <td className="p-3 text-xs text-emerald-400">Unbounded magnitude &amp; exact scale</td>
                <td className="p-3 text-xs">Mandatory for financial accounting &amp; currency (₹)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono font-bold text-sky-300">Bitwise Heuristic</td>
                <td className="p-3 font-mono text-emerald-400">((a ^ sum) &amp; (b ^ sum)) &lt; 0</td>
                <td className="p-3 text-xs text-amber-300">Returns boolean flag</td>
                <td className="p-3 text-xs">Embedded algorithms, compiler intrinsics</td>
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
            ArithmeticOverflowUnderflowDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates silent integer wrap-arounds, Java 8 <code className="text-emerald-300 font-mono">Math.*Exact()</code> defensive methods, pre-addition upcasting, <code className="text-sky-300 font-mono">BigDecimal</code> currency math, and endowment fund auditing in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={overflowDemoCode}
          title="ArithmeticOverflowUnderflowDemo.java"
          highlightLines={[25, 26, 35, 42, 50, 60, 62, 70, 75, 87]}
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
              <span>❌</span> Pitfall 1: Upcasting After the Addition Occurs
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">long total = a + b;</code> where <code className="text-sky-300 font-mono">a</code> and <code className="text-sky-300 font-mono">b</code> are 1.5 Billion overflows in 32-bit int space before being assigned to <code className="text-sky-300 font-mono">long</code>!
            </p>
            <p className="text-xs text-emerald-400 font-mono">
              <strong>Best Practice:</strong> Upcast before addition: <code className="bg-slate-900 px-1 py-0.5 rounded">long total = (long) a + b;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use BigDecimal for Financial &amp; Currency Calculations
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Never use <code className="text-rose-300 font-mono">double</code> for monetary transactions. <code className="text-emerald-400 font-mono">BigDecimal</code> provides exact scale and rounding control with zero binary fraction artifacts.
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
            🤔 <em>&ldquo;Why does `for (int i = 0; i &lt;= Integer.MAX_VALUE; i++)` result in an infinite loop?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Silent Integer Overflow! When <code className="text-sky-300 font-mono">i</code> reaches <code className="text-emerald-400 font-mono">Integer.MAX_VALUE</code> (<code className="text-emerald-400 font-mono">2,147,483,647</code>), the condition <code className="text-sky-300 font-mono">i &lt;= MAX_VALUE</code> is true. In the next step, <code className="text-rose-300 font-mono">i++</code> silently wraps around to <code className="text-rose-400 font-mono">-2,147,483,648</code> (<code className="text-rose-400 font-mono">MIN_VALUE</code>), which is still &lt;= MAX_VALUE! The loop condition never becomes false! To fix, use a <code className="text-emerald-400 font-bold">long</code> loop counter!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Arithmetic Overflow FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 21: Detecting & Preventing Arithmetic Overflow"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_003_topic21_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Congratulations on completing Module 001_003! You have mastered all 22 topics covering operators, expressions, precedence, type promotion, casting, and overflow prevention. In Module 001_004, we will explore Control Flow: Decision Making, Branching, Enhanced Switch Expressions, and Pattern Matching! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
