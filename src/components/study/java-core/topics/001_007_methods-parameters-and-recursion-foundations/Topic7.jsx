import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import overloadDemoCode from "./topic7_files/MethodOverloadingFoundationsDemo.java?raw";
import noteText from "./topic7_files/topic7_note.txt?raw";
import questions from "./topic7_files/topic7_questions";

export default function Topic7() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowOverload {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-ol {
            animation: glowOverload 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 7
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Compile-Time Polymorphism
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Method Overloading in Java: Count, Types &amp; Order
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master static compile-time polymorphism in Java (JLS §8.4.9): creating flexible, uniform APIs by overloading methods across parameter counts, data types, and positional order, chained delegation patterns, and student tuition calculators in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The 3 Dimensions of Method Overloading
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            <strong>Method Overloading</strong> allows multiple methods in the same class to share the <strong>exact same name</strong> with different parameter signatures:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. By Parameter Count</h3>
              <p className="text-sky-300 mb-1">calculateFee(rate)</p>
              <p className="text-sky-300">calculateFee(rate, mos)</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs mt-2">
                Simulates default arguments by delegating simpler overloads to a master method.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. By Parameter Types</h3>
              <p className="text-emerald-300 mb-1">calculateFee(int units)</p>
              <p className="text-emerald-300">calculateFee(String code)</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs mt-2">
                Accepts diverse data representations (units vs course code) with identical method naming.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">3. By Parameter Order</h3>
              <p className="text-purple-300 mb-1">displayBadge(name, id)</p>
              <p className="text-purple-300">displayBadge(id, name)</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs mt-2">
                Different positional type orders produce distinct compile-time signatures.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Flexible Invoicing API):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> (rate ₹4,000 + 6 mos + 15% discount = ₹20,400), <strong>Tuhina</strong> (rate ₹4,000 + 6 mos = ₹24,000), <strong>Abhronila</strong> (4 course units @ ₹3,500 = ₹14,000), and <strong>Debangshu</strong> (predefined course &ldquo;JAVA-CORE&rdquo; = ₹15,000) utilized the overloaded <code className="text-emerald-400 font-mono">calculateFee()</code> API in Indian Rupees (<code className="text-emerald-400 font-semibold">₹14,000 to ₹24,000</code>).
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Method Overloading Resolution Architecture Tree
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the Java compiler maps single method names across diverse parameter branches:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Method Overloading Tree Diagram"
          >
            <defs>
              <linearGradient id="gradRoot" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradCount" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradType" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradOrder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>
            </defs>

            {/* Root Node: calculateFee() */}
            <rect x="330" y="25" width="220" height="45" rx="8" fill="url(#gradRoot)" />
            <text x="440" y="52" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="monospace" textAnchor="middle">calculateFee(...)</text>

            {/* Connecting Lines */}
            <path d="M 380 70 L 160 115" stroke="#38bdf8" strokeWidth="2" fill="none" />
            <path d="M 440 70 L 440 115" stroke="#10b981" strokeWidth="2" fill="none" />
            <path d="M 500 70 L 720 115" stroke="#f59e0b" strokeWidth="2" fill="none" />

            {/* Branch 1: By Count */}
            <rect x="30" y="115" width="260" height="130" rx="8" fill="url(#gradCount)" opacity="0.9" />
            <text x="160" y="135" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">1. BY PARAMETER COUNT</text>
            <rect x="40" y="145" width="240" height="90" rx="4" fill="#082f49" />
            <text x="48" y="165" fill="#bae6fd" fontSize="9" fontFamily="monospace">(double rate)</text>
            <text x="48" y="185" fill="#bae6fd" fontSize="9" fontFamily="monospace">(double rate, int mos)</text>
            <text x="48" y="205" fill="#bae6fd" fontSize="9" fontFamily="monospace">(double rate, int mos, double disc)</text>
            <text x="48" y="225" fill="#38bdf8" fontSize="8" fontWeight="bold">→ Delegates to master overload</text>

            {/* Branch 2: By Type */}
            <rect x="310" y="115" width="260" height="130" rx="8" fill="url(#gradType)" opacity="0.9" />
            <text x="440" y="135" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2. BY PARAMETER TYPES</text>
            <rect x="320" y="145" width="240" height="90" rx="4" fill="#022c22" />
            <text x="328" y="168" fill="#a7f3d0" fontSize="9" fontFamily="monospace">(int courseUnits)</text>
            <text x="328" y="188" fill="#a7f3d0" fontSize="9" fontFamily="monospace">(String courseCode)</text>
            <text x="328" y="215" fill="#34d399" fontSize="8" fontWeight="bold">→ Distinct primitive / reference types</text>

            {/* Branch 3: By Order */}
            <rect x="590" y="115" width="260" height="130" rx="8" fill="url(#gradOrder)" opacity="0.9" />
            <text x="720" y="135" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">3. BY PARAMETER ORDER</text>
            <rect x="600" y="145" width="240" height="90" rx="4" fill="#451a03" />
            <text x="608" y="168" fill="#fde68a" fontSize="9" fontFamily="monospace">(String name, int id)</text>
            <text x="608" y="188" fill="#fde68a" fontSize="9" fontFamily="monospace">(int id, String name)</text>
            <text x="608" y="215" fill="#fbbf24" fontSize="8" fontWeight="bold">→ Permuted positional signatures</text>

            {/* Bottom Caption */}
            <text x="440" y="268" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §8.4.9: Compile-time polymorphism resolves the exact method target during compilation based on actual arguments.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Method Overloading Rules Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Signature Variation</th>
                <th className="p-3 font-semibold text-emerald-400">Valid Overload?</th>
                <th className="p-3 font-semibold text-rose-400">Compiler Behavior</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Different Parameter Count (`(int)` vs `(int, int)`)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ VALID</td>
                <td className="p-3 text-slate-300 font-sans">Matches based on argument count</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-300 font-bold">Different Parameter Types (`(int)` vs `(double)`)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ VALID</td>
                <td className="p-3 text-slate-300 font-sans">Matches based on argument data types</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-300 font-bold">Different Parameter Order (`(String, int)` vs `(int, String)`)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ VALID</td>
                <td className="p-3 text-slate-300 font-sans">Matches based on positional sequence</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-rose-300 font-bold">Different Return Type Only (`int m()` vs `double m()`)</td>
                <td className="p-3 text-rose-400 font-bold font-sans">❌ INVALID</td>
                <td className="p-3 text-rose-400 font-sans">`Compile Error: method already defined`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-rose-300 font-bold">Different Parameter Names Only (`(int a)` vs `(int b)`)</td>
                <td className="p-3 text-rose-400 font-bold font-sans">❌ INVALID</td>
                <td className="p-3 text-rose-400 font-sans">`Compile Error: method already defined`</td>
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
            MethodOverloadingFoundationsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates 5 overloaded calculateFee methods and badge printers in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={overloadDemoCode}
          title="MethodOverloadingFoundationsDemo.java"
          highlightLines={[20, 28, 36, 48, 56, 68, 75, 87, 91, 95]}
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
              <span>❌</span> Pitfall 1: Ambiguous Overloaded Method Calls
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If a class declares <code className="text-rose-300 font-mono">void m(int a, long b)</code> and <code className="text-rose-300 font-mono">void m(long a, int b)</code>, calling <code className="text-rose-300 font-mono">m(10, 10)</code> fails to compile with an <em>&ldquo;Ambiguous Method Invocation&rdquo;</em> error because both methods match equally via widening!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Method Chaining (Delegation) to Keep Code DRY
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Have smaller overloaded methods delegate to the most parameter-rich overload, supplying standard default arguments to centralize calculation logic in a single method body.
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
            🤔 <em>&ldquo;Can <code className="text-emerald-400 font-mono">void print(int... nums)</code> and <code className="text-rose-300 font-mono">void print(int[] nums)</code> coexist as overloaded methods in the same class?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Bytecode Erasure! In JVM bytecode, varargs <code className="text-emerald-400 font-mono">int...</code> compiles to <code className="text-slate-300 font-mono">int[]</code>. Both declarations produce the exact same bytecode signature <code className="text-slate-300 font-mono">print([I)</code>, resulting in a duplicate method compiler error!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Method Overloading FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 7: Method Overloading Foundations"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic7_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Method Overloading is compile-time polymorphism at its finest. Always delegate smaller overloads to your master overload to keep your code DRY. In Topic 8, we explore why Return Type Alone cannot overload a method! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
