import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import nestedDemoCode from "./topic10_files/NestedLoopsAndGridTraversalDemo.java?raw";
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
          @keyframes glowGrid {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(139, 92, 246, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(139, 92, 246, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-gr {
            animation: glowGrid 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_005 · Topic 10
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Beginner Foundation
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Nested Loops: Outer vs. Inner Execution Order &amp; 2D Grid Traversal
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master multidimensional coordinate iteration in Java: outer vs. inner loop lifecycle coordination, multiplicative time complexity (<code className="text-purple-400 font-mono">O(R × C)</code>), row-major 2D matrix traversal, and computer lab workstation fee matrices in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Multiplicative Dynamics of Nested Loops
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            A <strong>Nested Loop</strong> is a loop placed entirely inside the body of an outer enclosing loop:
          </p>
          <p className="font-mono text-purple-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
            for ( int row = 1 ; row &lt;= 3 ; row++ ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;for ( int col = 1 ; col &lt;= 4 ; col++ ) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.printf(&quot;Workstation[%d][%d] &quot;, row, col);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;System.out.println(); // Newline after each row
            <br />
            &#125;
          </p>
          <p>
            <strong>The Core Execution Rule:</strong> For <em>every single step</em> of the outer loop, the inner loop executes its <em>entire full sequence</em> from start to finish!
          </p>
          <p>
            <strong>Total Iterations:</strong> <code className="text-emerald-400 font-mono">Total = Rows × Columns = 3 × 4 = 12 iterations</code>.
          </p>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-purple-500 text-slate-300 space-y-2">
            <p className="font-medium text-purple-300">Classroom Case Study (Barrackpore 2D Fee Matrix Traversal):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> traversed a 3-semester × 3-track course tuition grid in Indian Rupees (<code className="text-emerald-400 font-semibold">₹12,000 to ₹20,000</code> per cell). By implementing nested row-major traversal, <strong>Abhronila</strong> and <strong>Debangshu</strong> calculated row subtotals and the grand total matrix revenue with 100% precision across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> The 2D Coordinate Grid Matrix Model ($3 \times 4 = 12$ Cells)
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How the outer loop manages row advancement while the inner loop visits every column cell:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Nested Loops Grid Matrix Diagram"
          >
            <defs>
              <linearGradient id="gradOuterLoop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
              <linearGradient id="gradInnerCell" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Outer Row Indicator (Left) */}
            <rect x="30" y="40" width="200" height="200" rx="10" fill="url(#gradOuterLoop)" opacity="0.9" />
            <text x="130" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">OUTER LOOP (Rows)</text>
            <rect x="45" y="80" width="170" height="140" rx="6" fill="#2e1065" />
            <text x="55" y="105" fill="#ddd6fe" fontSize="11" fontFamily="monospace">for (int r=1; r&lt;=3; r++)</text>
            <text x="55" y="130" fill="#a7f3d0" fontSize="10">&bull; Row 1 → Inner 1..4</text>
            <text x="55" y="150" fill="#a7f3d0" fontSize="10">&bull; Row 2 → Inner 1..4</text>
            <text x="55" y="170" fill="#a7f3d0" fontSize="10">&bull; Row 3 → Inner 1..4</text>
            <text x="130" y="205" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Steps 3 Times
            </text>

            {/* Inner Grid Visual (Right: 3 rows x 4 cols) */}
            <g transform="translate(260, 40)">
              <rect x="0" y="0" width="580" height="200" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
              <text x="290" y="25" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                INNER LOOP: (col = 1 to 4 per row) → 12 Total Grid Operations
              </text>

              {/* Row 1 */}
              <rect x="30" y="40" width="110" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <text x="85" y="65" fill="#bae6fd" fontSize="11" textAnchor="middle" fontFamily="monospace">(Row 1, Col 1)</text>

              <rect x="160" y="40" width="110" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <text x="215" y="65" fill="#bae6fd" fontSize="11" textAnchor="middle" fontFamily="monospace">(Row 1, Col 2)</text>

              <rect x="290" y="40" width="110" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <text x="345" y="65" fill="#bae6fd" fontSize="11" textAnchor="middle" fontFamily="monospace">(Row 1, Col 3)</text>

              <rect x="420" y="40" width="110" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <text x="475" y="65" fill="#bae6fd" fontSize="11" textAnchor="middle" fontFamily="monospace">(Row 1, Col 4)</text>

              {/* Row 2 */}
              <rect x="30" y="90" width="110" height="40" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1" />
              <text x="85" y="115" fill="#ddd6fe" fontSize="11" textAnchor="middle" fontFamily="monospace">(Row 2, Col 1)</text>

              <rect x="160" y="90" width="110" height="40" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1" />
              <text x="215" y="115" fill="#ddd6fe" fontSize="11" textAnchor="middle" fontFamily="monospace">(Row 2, Col 2)</text>

              <rect x="290" y="90" width="110" height="40" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1" />
              <text x="345" y="115" fill="#ddd6fe" fontSize="11" textAnchor="middle" fontFamily="monospace">(Row 2, Col 3)</text>

              <rect x="420" y="90" width="110" height="40" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1" />
              <text x="475" y="115" fill="#ddd6fe" fontSize="11" textAnchor="middle" fontFamily="monospace">(Row 2, Col 4)</text>

              {/* Row 3 */}
              <rect x="30" y="140" width="110" height="40" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
              <text x="85" y="165" fill="#a7f3d0" fontSize="11" textAnchor="middle" fontFamily="monospace">(Row 3, Col 1)</text>

              <rect x="160" y="140" width="110" height="40" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
              <text x="215" y="165" fill="#a7f3d0" fontSize="11" textAnchor="middle" fontFamily="monospace">(Row 3, Col 2)</text>

              <rect x="290" y="140" width="110" height="40" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
              <text x="345" y="165" fill="#a7f3d0" fontSize="11" textAnchor="middle" fontFamily="monospace">(Row 3, Col 3)</text>

              <rect x="420" y="140" width="110" height="40" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
              <text x="475" y="165" fill="#a7f3d0" fontSize="11" textAnchor="middle" fontFamily="monospace">(Row 3, Col 4)</text>
            </g>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Total Iterations = Outer (3) × Inner (4) = 12 total grid iterations executed in row-major order.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Nested Loop Patterns &amp; Algorithmic Complexities
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Pattern Name</th>
                <th className="p-3 font-semibold text-emerald-400">Loop Bounds Structure</th>
                <th className="p-3 font-semibold text-amber-400">Total Iterations</th>
                <th className="p-3 font-semibold text-purple-400">Time Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-sky-400 font-bold">Rectangular Grid</td>
                <td className="p-3 font-mono text-xs">for (r=0; r&lt;R; r++) for (c=0; c&lt;C; c++)</td>
                <td className="p-3 text-xs font-mono">$R \times C$</td>
                <td className="p-3 text-xs text-sky-300 font-mono font-bold">$O(R \times C)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-emerald-400 font-bold">Triangular (Dependent)</td>
                <td className="p-3 font-mono text-xs">for (i=1; i&lt;=N; i++) for (j=1; j&lt;=i; j++)</td>
                <td className="p-3 text-xs font-mono">$N(N+1)/2$</td>
                <td className="p-3 text-xs text-emerald-300 font-mono font-bold">$O(N^2)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-purple-400 font-bold">All-Pairs Comparison</td>
                <td className="p-3 font-mono text-xs">for (i=0; i&lt;N; i++) for (j=i+1; j&lt;N; j++)</td>
                <td className="p-3 text-xs font-mono">$N(N-1)/2$</td>
                <td className="p-3 text-xs text-purple-300 font-mono font-bold">$O(N^2)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 font-mono text-amber-400 font-bold">Matrix Multiplication</td>
                <td className="p-3 font-mono text-xs">for (i..) for (j..) for (k..)</td>
                <td className="p-3 text-xs font-mono">$N^3$</td>
                <td className="p-3 text-xs text-amber-300 font-mono font-bold">$O(N^3)$</td>
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
            NestedLoopsAndGridTraversalDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program traces outer vs inner loop execution order step by step and performs a 2D matrix revenue audit in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={nestedDemoCode}
          title="NestedLoopsAndGridTraversalDemo.java"
          highlightLines={[21, 23, 38, 41, 44]}
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
              <span>❌</span> Pitfall 1: Mutating Outer Counter Inside Inner Loop Header
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Writing <code className="text-rose-300 font-mono">for (int j = 0; j &lt; 3; i++)</code> (typing <code className="text-rose-400 font-mono">i++</code> instead of <code className="text-rose-400 font-mono">j++</code>) mutates the outer counter, causing bizarre infinite loops or skipped cycles!
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Use Row-Major Order for CPU Cache Locality
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always traverse 2D arrays row-by-row (<code className="text-emerald-400 font-mono">matrix[r][c]</code>) rather than column-by-column (<code className="text-rose-300 font-mono">matrix[c][r]</code>) to maximize CPU L1/L2 cache line hits.
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
            🤔 <em>&ldquo;Why does `break;` inside an inner loop NOT stop the outer loop?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Lexical Innermost Binding! In Java, an unlabeled <code className="text-rose-300 font-mono">break;</code> statement binds strictly to the <strong>innermost enclosing switch, for, while, or do-while statement</strong>. To break out of both loops simultaneously, you must attach a statement label (e.g. <code className="text-emerald-400 font-bold">OUTER: for (...)</code>) and call <code className="text-emerald-400 font-bold">break OUTER;</code>!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Nested Loops & Grid Traversal FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_005 Topic 10: Nested Loops & Grid Traversal"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_005_topic10_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Nested loops are the foundation of 2D grid processing, matrices, and visual star patterns. Remember: Inner loop completes ALL iterations per 1 outer step! In Topic 11, we master Dry Running Nested Loops using Iteration Trace Tables! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
