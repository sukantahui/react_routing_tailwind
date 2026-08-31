import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import varargsDemoCode from "./topic10_files/VarargsFoundationsDemo.java?raw";
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
          @keyframes glowVarargs {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-va {
            animation: glowVarargs 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_007 · Topic 10
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Variable-Arity Methods
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Variable Arguments (Varargs - <code className="text-emerald-400 font-mono">Type... varName</code>)
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master dynamic argument lists in Java (JLS §8.4.1): syntax rules, internal array translation (<code className="text-sky-300 font-mono">Type... → Type[]</code>), the single-last-parameter constraint, zero-argument safety, and batch fee summation in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Power &amp; Mechanics of Java Varargs
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Introduced in Java 5, <strong>Varargs</strong> allows a method to accept <strong>zero or more arguments</strong> without requiring the caller to explicitly instantiate and populate an array:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">1. Syntax &amp; Array Packing</h3>
              <p className="text-emerald-300 mb-1">double... fees</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Under the hood, the compiler converts <code className="text-emerald-400 font-mono">double...</code> into a <code className="text-emerald-400 font-mono">double[]</code> array automatically.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">2. Single-Last Rule</h3>
              <p className="text-sky-300 mb-1">String campus, double... fees</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                A method can have <strong>at most ONE</strong> varargs parameter, and it <strong>MUST be the LAST</strong> parameter in the header.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">3. Zero-Argument Safety</h3>
              <p className="text-purple-300 mb-1">calculateBatch(&quot;Barrackpore&quot;)</p>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">
                Passing zero arguments creates an empty array of length 0 (<code className="text-purple-300 font-mono">new double[0]</code>), never <code className="text-rose-400 font-mono">null</code>.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Batch Tuition Processing):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> (₹12,000 + ₹15,000 = ₹27,000), <strong>Tuhina</strong> (₹10,000 + ₹14,000 + ₹18,000 + ₹22,000 = ₹64,000 at Naihati), <strong>Abhronila</strong> (₹16,000 + ₹19,000 + ₹21,000 = ₹56,000 at Shyamnagar), and <strong>Debangshu</strong> (zero fees = ₹0.00 at Barrackpore) processed dynamic tuition batches in Indian Rupees (<code className="text-emerald-400 font-semibold">₹0.00 to ₹64,000.00</code>) effortlessly with varargs.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Varargs Call Site Packaging &amp; Compiler Translation
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the Java compiler packs discrete arguments into an internal array:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Varargs Compiler Architecture Diagram"
          >
            <defs>
              <linearGradient id="gradCallVa" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradPackVa" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradMethodVa" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* Step 1: Call Site */}
            <rect x="30" y="30" width="250" height="210" rx="10" fill="url(#gradCallVa)" opacity="0.9" />
            <text x="155" y="55" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">1. CALL SITE INVOCATION</text>
            <rect x="45" y="70" width="220" height="150" rx="6" fill="#2e1065" />
            <text x="55" y="95" fill="#ddd6fe" fontSize="10" fontFamily="monospace">calculateBatchTotal(</text>
            <text x="65" y="125" fill="#a78bfa" fontSize="10" fontFamily="monospace">&quot;Barrackpore&quot;,</text>
            <text x="65" y="155" fill="#fde68a" fontSize="10" fontFamily="monospace">12000.0, 15000.0</text>
            <text x="55" y="185" fill="#ddd6fe" fontSize="10" fontFamily="monospace">);</text>
            <text x="155" y="210" fill="#c4b5fd" fontSize="9" textAnchor="middle">Discrete arguments supplied</text>

            {/* Step 2: Compiler Array Packaging */}
            <rect x="315" y="30" width="250" height="210" rx="10" fill="url(#gradPackVa)" opacity="0.9" />
            <text x="440" y="55" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">2. COMPILER PACKAGING</text>
            <rect x="330" y="70" width="220" height="150" rx="6" fill="#082f49" />
            <text x="340" y="95" fill="#bae6fd" fontSize="10" fontFamily="monospace">// Auto-generates array:</text>
            <text x="340" y="125" fill="#38bdf8" fontSize="10" fontFamily="monospace">new double[] &#123;</text>
            <text x="350" y="155" fill="#38bdf8" fontSize="10" fontFamily="monospace">12000.0, 15000.0</text>
            <text x="340" y="185" fill="#38bdf8" fontSize="10" fontFamily="monospace">&#125;</text>
            <text x="440" y="210" fill="#7dd3fc" fontSize="9" textAnchor="middle">Zero caller boilerplate!</text>

            {/* Step 3: Method Execution */}
            <rect x="600" y="30" width="250" height="210" rx="10" fill="url(#gradMethodVa)" opacity="0.9" />
            <text x="725" y="55" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">3. METHOD BODY</text>
            <rect x="615" y="70" width="220" height="150" rx="6" fill="#022c22" />
            <text x="625" y="95" fill="#a7f3d0" fontSize="10" fontFamily="monospace">double... fees</text>
            <text x="625" y="125" fill="#a7f3d0" fontSize="10" fontFamily="monospace">&darr; byte-translated as</text>
            <text x="625" y="155" fill="#fef08a" fontSize="10" fontFamily="monospace" fontWeight="bold">double[] fees</text>
            <text x="625" y="185" fill="#a7f3d0" fontSize="10" fontFamily="monospace">fees.length == 2</text>
            <text x="725" y="210" fill="#6ee7b7" fontSize="9" textAnchor="middle">Standard array iteration</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §8.4.1: Varargs (Type... name) translates to an array parameter under the hood. Must be the single, last parameter!
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Varargs vs. Explicit Array Parameters
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Feature</th>
                <th className="p-3 font-semibold text-emerald-400">Varargs (`double... fees`)</th>
                <th className="p-3 font-semibold text-purple-400">Explicit Array (`double[] fees`)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Call with Discrete Values</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ `calc(10, 20, 30)`</td>
                <td className="p-3 text-rose-400 font-sans">❌ `calc(new double[]{10, 20, 30})` required</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Call with Zero Arguments</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">✓ `calc()` (creates `new double[0]`)</td>
                <td className="p-3 text-rose-400 font-sans">❌ Cannot call empty (requires `new double[0]`)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Parameter Position</td>
                <td className="p-3 text-rose-400 font-sans">Must be the SINGLE, LAST parameter</td>
                <td className="p-3 text-emerald-400 font-sans font-bold">Can be placed anywhere in parameter list</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Bytecode Representation</td>
                <td className="p-3 text-slate-300 font-sans">Compiled to `double[]` array</td>
                <td className="p-3 text-slate-300 font-sans">Compiled to `double[]` array</td>
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
            VarargsFoundationsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates varargs batch fee summation, zero-argument calls, explicit array passing, and fixed-arity precedence in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={varargsDemoCode}
          title="VarargsFoundationsDemo.java"
          highlightLines={[21, 23, 37, 41, 53, 56, 59, 63, 68, 71]}
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
              <span>❌</span> Pitfall 1: Declaring Varargs Not as the Last Parameter
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">void process(double... fees, String campus)</code> causes an immediate <code className="text-rose-400 font-mono">Compile Error</code>. The varargs parameter MUST always be the last parameter in the method signature.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Enforce at Least One Required Argument
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If your method requires at least one argument (e.g. finding the minimum fee), declare <code className="text-emerald-400 font-mono">double min(double first, double... rest)</code> rather than runtime null/empty checks.
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
            🤔 <em>&ldquo;Does calling <code className="text-emerald-400 font-mono">calculateBatchTotal(&quot;Barrackpore&quot;)</code> with no fee arguments pass <code className="text-rose-300 font-mono">null</code>?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Non-null Empty Array! The compiler allocates an empty array <code className="text-emerald-400 font-mono">new double[0]</code> with length 0. It is <strong>never null</strong> unless the caller explicitly passes <code className="text-rose-300 font-mono">(double[]) null</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Varargs in Java FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_007 Topic 10: Variable Arguments (Varargs)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_007_topic10_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Varargs is a wonderful syntactic convenience that eliminates manual array creation. Remember: at most one varargs parameter, and it must be the last parameter! In Topic 11, we compare Static Methods vs Instance Methods! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
