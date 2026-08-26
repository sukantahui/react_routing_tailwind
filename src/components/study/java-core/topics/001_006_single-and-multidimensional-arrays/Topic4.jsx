import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import litDemoCode from "./topic4_files/ArrayInitializationLiteralsDemo.java?raw";
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
          @keyframes glowLiteral {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-lt {
            animation: glowLiteral 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Array Initialization Literals: <code className="text-emerald-400 font-mono">&#123;10, 20, 30&#125;</code> &amp; Anonymous Arrays
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master array literal syntax in Java (JLS §10.6): declaration initializers, anonymous array creation expressions (<code className="text-emerald-300 font-mono">new Type[]&#123;...&#125;</code>), reassignment rules, passing inline arrays to methods, 2D jagged matrices, and course pricing packages in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Declaration Shortcuts vs. Anonymous Array Expressions
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Java provides two powerful literal mechanisms for initializing arrays:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold font-mono text-sm mb-2">1. Declaration Shortcut</h3>
              <p className="font-mono text-emerald-300 text-xs mb-2">double[] fees = &#123;12000.0, 15000.0&#125;;</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Available <strong>only during initial variable declaration</strong>. The compiler infers length automatically and populates the Heap array.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold font-mono text-sm mb-2">2. Anonymous Array Expression</h3>
              <p className="font-mono text-sky-300 text-xs mb-2">fees = new double[]&#123;14000.0, 18000.0&#125;;</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Usable <strong>anywhere in code</strong> (reassignments, method arguments, return values) without creating temporary local variables!
              </p>
            </div>
          </div>

          <p>
            <strong>Syntax Rule:</strong> Never specify dimension size inside brackets when an initializer list is provided: <code className="text-rose-400 font-mono">new int[3]&#123;1, 2, 3&#125;</code> is a <strong>compile error</strong>!
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Course Package Pricing):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> configured tuition packages in Indian Rupees (<code className="text-emerald-400 font-semibold">₹12,000 to ₹25,000</code>). When <strong>Abhronila</strong> and <strong>Debangshu</strong> calculated total batch revenues, they passed anonymous arrays (<code className="text-sky-300 font-mono">computeTotal(new double[]&#123;12000.0, 15000.0&#125;)</code>) directly across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Array Literal Compilation &amp; Anonymous Expressions
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How declaration shortcuts and anonymous arrays construct heap objects:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Array Initialization Literals Diagram"
          >
            <defs>
              <linearGradient id="gradDeclLit" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradAnonLit" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradJaggedLit" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Declaration Shortcut */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradDeclLit)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Declaration Shortcut</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">int[] a = &#123;10, 20, 30&#125;;</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="10">Length = 3 inferred by compiler</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Declaration point ONLY!</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Automatic Length Inference
            </text>

            {/* Box 2: Anonymous Array */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradAnonLit)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Anonymous Array</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="335" y="102" fill="#bae6fd" fontSize="10" fontFamily="monospace">pass(new int[]&#123;1, 2&#125;);</text>
            <text x="335" y="122" fill="#bae6fd" fontSize="10">a = new int[]&#123;4, 5&#125;;</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Usable in any expression</text>
            <text x="440" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Inline Anonymous Creation
            </text>

            {/* Box 3: 2D Jagged Literals */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradJaggedLit)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. 2D Jagged Literals</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="10" fontFamily="monospace">int[][] m = &#123;</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="10" fontFamily="monospace">&nbsp;&nbsp;&#123;1&#125;, &#123;2, 3&#125;, &#123;4, 5, 6&#125;</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">&#125;; // Row lengths 1, 2, 3!</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Irregular Matrix Assembly
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              JLS §10.6: Array initializers provide clean syntactic sugar for inline heap allocation and element population.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Array Literal Syntax Comparison Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Syntax Style</th>
                <th className="p-3 font-semibold text-emerald-400">Code Example</th>
                <th className="p-3 font-semibold text-purple-400">Valid Usage Contexts</th>
                <th className="p-3 font-semibold text-amber-400">Compile Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-400 font-bold">Declaration Initializer</td>
                <td className="p-3 text-slate-300">`int[] a = &#123;1, 2, 3&#125;;`</td>
                <td className="p-3 text-sky-300">Variable declaration only</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Valid</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-400 font-bold">Anonymous Array</td>
                <td className="p-3 text-slate-300">`new int[]&#123;1, 2, 3&#125;`</td>
                <td className="p-3 text-sky-300">Anywhere (arguments, reassignments)</td>
                <td className="p-3 text-emerald-400 font-bold">✓ Valid</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-rose-400 font-bold">Reassignment with Braces</td>
                <td className="p-3 text-slate-300">`a = &#123;4, 5&#125;;`</td>
                <td className="p-3 text-rose-400">Reassigning existing variable</td>
                <td className="p-3 text-rose-400 font-bold">❌ COMPILE ERROR</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-rose-400 font-bold">Dimension with Initializer</td>
                <td className="p-3 text-slate-300">`new int[3]&#123;1, 2, 3&#125;`</td>
                <td className="p-3 text-rose-400">Any context</td>
                <td className="p-3 text-rose-400 font-bold">❌ COMPILE ERROR</td>
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
            ArrayInitializationLiteralsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program demonstrates declaration initializers, anonymous inline array passing, and 2D jagged seating matrices in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={litDemoCode}
          title="ArrayInitializationLiteralsDemo.java"
          highlightLines={[25, 32, 36, 41, 42, 43, 44]}
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
              <span>❌</span> Pitfall 1: Attempting to Specify Dimension Size with an Initializer
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">new int[3]&#123;10, 20, 30&#125;</code> is illegal! The dimension <code className="text-rose-400 font-mono">[3]</code> is redundant because the compiler infers length from the braces. Write <code className="text-emerald-400 font-mono">new int[]&#123;10, 20, 30&#125;</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Anonymous Arrays for Method Return Values
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Eliminate temporary variables by returning anonymous arrays directly: <code className="text-emerald-400 font-mono">return new int[]&#123;x, y&#125;;</code>.
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
            🤔 <em>&ldquo;Why are trailing commas like `{10, 20, 30,}` permitted in Java array initializers?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Clean Git Diffs &amp; Code Generation! In multi-line array declarations, leaving a trailing comma allows adding a new element on the next line without modifying the preceding line, producing clean single-line Git diffs!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Array Initialization Literals FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 4: Array Initialization Literals & Anonymous Arrays"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic4_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Use the {...} shortcut when declaring arrays, and anonymous new Type[]{...} when passing inline arrays to methods. Never specify the dimension count inside brackets with an initializer! In Topic 5, we master 0-Based Array Indexing and Element Access! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
