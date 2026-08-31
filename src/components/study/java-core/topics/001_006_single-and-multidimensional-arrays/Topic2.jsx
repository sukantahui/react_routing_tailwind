import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import declDemoCode from "./topic2_files/ArrayDeclarationStylesDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

export default function Topic2() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowDecl {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-dc {
            animation: glowDecl 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 2
          </span>
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Array Declaration Styles: <code className="text-sky-300 font-mono">int[] arr</code> vs. <code className="text-rose-400 font-mono">int arr[]</code>
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master array declaration syntax in Java (JLS §10.2): type-bound brackets (<code className="text-emerald-400 font-mono">int[]</code>), legacy C-style syntax traps (<code className="text-rose-400 font-mono">int a[], b;</code>), Google Java Style Guide standards, multidimensional bracket placements, and student fee rosters in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Type-Bound vs. Identifier-Bound Brackets
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java supports two declaration syntaxes, but one is universally preferred:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold font-mono text-sm mb-2">✓ Java Style (Preferred)</h3>
              <p className="font-mono text-emerald-300 text-xs mb-2">double[] feesA, feesB;</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Brackets attach to the <strong>Type</strong>. Both <code className="text-emerald-300 font-mono">feesA</code> and <code className="text-emerald-300 font-mono">feesB</code> are declared as <code className="text-sky-300 font-mono">double[]</code> arrays!
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-rose-500/30">
              <h3 className="text-rose-400 font-bold font-mono text-sm mb-2">❌ C-Style (Legacy Trap)</h3>
              <p className="font-mono text-rose-300 text-xs mb-2">double feesC[], scalarD;</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Brackets attach to the <strong>Identifier</strong>. <code className="text-rose-300 font-mono">feesC</code> is an array, but <code className="text-amber-300 font-mono">scalarD</code> is an accidental single primitive scalar!
              </p>
            </div>
          </div>

          <p>
            <strong>Dimension Rule:</strong> In Java, specifying an array dimension size in the declaration (e.g. <code className="text-rose-400 font-mono">int[5] arr;</code>) is a <strong>compile-time error</strong>! Size belongs strictly in instantiation (<code className="text-emerald-400 font-mono">new int[5]</code>).
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-sky-500 text-slate-300 space-y-2">
            <p className="font-medium text-sky-300">Classroom Case Study (Barrackpore Accounting Ledger Safety):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> declared multi-batch ledgers in Indian Rupees (<code className="text-emerald-400 font-semibold">₹12,000 to ₹18,000</code>). By using <code className="text-sky-300 font-mono">double[] feesA, feesB;</code>, they ensured all batch ledgers were type-safe arrays, avoiding the scalar variable trap identified by <strong>Abhronila</strong> and <strong>Debangshu</strong> across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Multi-Variable Declaration Architecture (Java vs. C Style)
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How bracket placement alters the types of variables in multi-variable declarations:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Array Declaration Styles Comparison Diagram"
          >
            <defs>
              <linearGradient id="gradJavaDecl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradCStyleDecl" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="gradMultiDim" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Java Style int[] a, b; */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradJavaDecl)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Java Style: &apos;int[] a, b;&apos;</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">int[] a → int[] Array</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="11" fontFamily="monospace">int[] b → int[] Array</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">✓ Both variables are arrays!</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Type-Level Binding (Clean)
            </text>

            {/* Box 2: C Style int a[], b; */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradCStyleDecl)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. C Style: &apos;int a[], b;&apos;</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#4c0519" />
            <text x="335" y="102" fill="#fca5a5" fontSize="11" fontFamily="monospace">a → int[] Array</text>
            <text x="335" y="122" fill="#fde68a" fontSize="11" fontFamily="monospace">b → Primitive scalar int!</text>
            <text x="335" y="142" fill="#fecdd3" fontSize="10">⚠️ Accidental non-array scalar!</text>
            <text x="440" y="190" fill="#ffe4e6" fontSize="11" textAnchor="middle" fontWeight="bold">
              Variable-Level Binding (Buggy)
            </text>

            {/* Box 3: 2D Combination int[] a, b[]; */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradMultiDim)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Mixed: &apos;int[] a, b[];&apos;</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="11" fontFamily="monospace">a → 1D Array (int[])</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="11" fontFamily="monospace">b → 2D Array (int[][])</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">Adds extra dimension to b!</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Dimensional Stacking
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Google Java Style Guide: Always attach brackets to the type (String[] args) for uniform, bug-free declarations.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Declaration Patterns &amp; Variable Type Resolutions
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Declaration Statement</th>
                <th className="p-3 font-semibold text-emerald-400">Type of First Variable</th>
                <th className="p-3 font-semibold text-purple-400">Type of Second Variable</th>
                <th className="p-3 font-semibold text-amber-400">Convention Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`int[] a, b;`</td>
                <td className="p-3 text-emerald-400">int[] (1D Array)</td>
                <td className="p-3 text-purple-300">int[] (1D Array)</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Preferred Standard</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-rose-300 font-bold">`int a[], b;`</td>
                <td className="p-3 text-emerald-400">int[] (1D Array)</td>
                <td className="p-3 text-rose-400 font-bold">int (Scalar Primitive)</td>
                <td className="p-3 text-rose-400">❌ Discouraged (Bug-prone)</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-300 font-bold">`int[] a, b[];`</td>
                <td className="p-3 text-emerald-400">int[] (1D Array)</td>
                <td className="p-3 text-purple-300 font-bold">int[][] (2D Array)</td>
                <td className="p-3 text-amber-400">⚠️ Confusing Syntax</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">`int[][] a, b;`</td>
                <td className="p-3 text-emerald-400">int[][] (2D Array)</td>
                <td className="p-3 text-purple-300">int[][] (2D Array)</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Preferred Standard</td>
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
            ArrayDeclarationStylesDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program compares Java-style type-bound declarations against C-style variable-bound declarations and multidimensional variations.
        </p>

        <JavaFileLoader
          fileModule={declDemoCode}
          title="ArrayDeclarationStylesDemo.java"
          highlightLines={[21, 28, 36, 38]}
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
              <span>❌</span> Pitfall 1: Specifying Dimension Size in Array Declaration
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">int[5] arr;</code> is a compile-time syntax error! Size is established ONLY during instantiation: <code className="text-emerald-400 font-mono">int[] arr = new int[5];</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Follow Google Java Style Guide
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always write <code className="text-emerald-400 font-mono">String[] args</code> and never <code className="text-rose-300 font-mono">String args[]</code>. Declare each array variable on its own dedicated line.
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
            🤔 <em>&ldquo;Why is `var arr = {1, 2, 3};` a compile-time error, but `var arr = new int[]{1, 2, 3};` is valid?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Target Typing! The naked array literal <code className="text-rose-300 font-mono">&#123;1, 2, 3&#125;</code> has no inherent type—it could be an <code className="text-sky-300 font-mono">int[]</code>, <code className="text-sky-300 font-mono">byte[]</code>, <code className="text-sky-300 font-mono">short[]</code>, or <code className="text-sky-300 font-mono">double[]</code>. Because <code className="text-purple-300 font-mono">var</code> infers type from the right-hand side, Java cannot guess your intention without <code className="text-emerald-400 font-bold">new int[]&#123;1, 2, 3&#125;</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Array Declaration Styles FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 2: Array Declaration Styles"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic2_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Brackets belong to the TYPE, not the variable! Always write int[] arr instead of int arr[]. This avoids dangerous multi-variable declaration bugs. In Topic 3, we master Array Instantiation with 'new' and element default values! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
