import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import matDemoCode from "./topic15_files/MatrixOperationsDemo.java?raw";
import noteText from "./topic15_files/topic15_note.txt?raw";
import questions from "./topic15_files/topic15_questions";

export default function Topic15() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowMath {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-mt {
            animation: glowMath 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_006 · Topic 15
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full">
            Mathematical Algorithms
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Matrix Operations: Addition, Transpose &amp; Matrix Multiplication
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master linear algebra matrix operations on 2D arrays in Java: dimension validation rules, cell-by-cell addition ($O(R \times C)$), matrix transposition, three-nested-loop matrix multiplication ($O(R_A \times C_A \times C_B)$), and campus semester fee consolidation in Indian Rupees (₹).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Mathematical Foundations &amp; Preconditions
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            Matrix operations require strict dimension compatibility checks before executing nested arithmetic loops:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">1. Matrix Addition</h3>
              <p className="text-emerald-300 mb-2">C[i][j] = A[i][j] + B[i][j]</p>
              <p className="text-slate-300 font-sans leading-relaxed">
                <strong>Precondition:</strong> Identical dimensions: <code className="text-emerald-400 font-mono">rA == rB</code> and <code className="text-emerald-400 font-mono">cA == cB</code>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">2. Matrix Transpose</h3>
              <p className="text-sky-300 mb-2">A^T[j][i] = A[i][j]</p>
              <p className="text-slate-300 font-sans leading-relaxed">
                <strong>Dimension Inversion:</strong> An $(R \times C)$ matrix transforms into a $(C \times R)$ transposed matrix.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30">
              <h3 className="text-purple-400 font-bold text-sm mb-2">3. Matrix Multiplication</h3>
              <p className="text-purple-300 mb-2">C[i][j] = &sum; A[i][k] * B[k][j]</p>
              <p className="text-slate-300 font-sans leading-relaxed">
                <strong>Precondition:</strong> Columns of $A$ MUST equal Rows of $B$ (<code className="text-purple-300 font-mono">cA == rB</code>).
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Semester Ledger Consolidation):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> combined Semester 1 and Semester 2 workstation fees (<code className="text-emerald-400 font-semibold">₹11,000 to ₹18,500</code>) via matrix addition. With <strong>Abhronila</strong> and <strong>Debangshu</strong>, they transposed campus tables and applied discount weighting vectors via matrix multiplication across Naihati and Shyamnagar.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Matrix Mechanics: Addition, Transposition &amp; Dot-Product
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          How data maps during addition, dimensional flipping, and triple-loop multiplication:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Matrix Operations Diagram"
          >
            <defs>
              <linearGradient id="gradAdd" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="gradTrans" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradMult" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Box 1: Matrix Addition */}
            <rect x="30" y="40" width="260" height="180" rx="10" fill="url(#gradAdd)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="160" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">1. Matrix Addition: O(R x C)</text>
            <rect x="45" y="80" width="230" height="80" rx="6" fill="#022c22" />
            <text x="55" y="102" fill="#a7f3d0" fontSize="11" fontFamily="monospace">C[i][j] = A[i][j] + B[i][j]</text>
            <text x="55" y="122" fill="#a7f3d0" fontSize="10">Requires: rA == rB &amp;&amp; cA == cB</text>
            <text x="55" y="142" fill="#d1fae5" fontSize="10">Cell-by-cell sum (₹25k + ₹26k)</text>
            <text x="160" y="190" fill="#ecfdf5" fontSize="11" textAnchor="middle" fontWeight="bold">
              Matching Dimensions
            </text>

            {/* Box 2: Matrix Transpose */}
            <rect x="310" y="40" width="260" height="180" rx="10" fill="url(#gradTrans)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="440" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">2. Matrix Transpose</text>
            <rect x="325" y="80" width="230" height="80" rx="6" fill="#0c4a6e" />
            <text x="335" y="102" fill="#bae6fd" fontSize="11" fontFamily="monospace">A(2x3) → A^T(3x2)</text>
            <text x="335" y="122" fill="#bae6fd" fontSize="10">Transposed[j][i] = A[i][j]</text>
            <text x="335" y="142" fill="#d1fae5" fontSize="10">Inverts rows and columns</text>
            <text x="440" y="190" fill="#f0f9ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Dimension Inversion
            </text>

            {/* Box 3: Matrix Multiplication */}
            <rect x="590" y="40" width="260" height="180" rx="10" fill="url(#gradMult)" opacity="0.9" className="hover:opacity-100 transition-opacity" />
            <text x="720" y="65" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">3. Matrix Multiply: O(N^3)</text>
            <rect x="605" y="80" width="230" height="80" rx="6" fill="#2e1065" />
            <text x="615" y="102" fill="#ddd6fe" fontSize="10" fontFamily="monospace">A(2x3) * B(3x2) → C(2x2)</text>
            <text x="615" y="122" fill="#ddd6fe" fontSize="10">Requires: cA == rB</text>
            <text x="615" y="142" fill="#d1fae5" fontSize="10">C[i][j] = sum(A[i][k] * B[k][j])</text>
            <text x="720" y="190" fill="#f5f3ff" fontSize="11" textAnchor="middle" fontWeight="bold">
              Row-by-Column Dot Product
            </text>

            {/* Bottom Caption */}
            <text x="440" y="255" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Linear Algebra on Java 2D Arrays: Addition O(R x C), Transpose (C x R), Multiplication O(R_A x C_A x C_B).
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Summary of Matrix Operations &amp; Complexity
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operation</th>
                <th className="p-3 font-semibold text-emerald-400">Input Condition</th>
                <th className="p-3 font-semibold text-purple-400">Output Dimensions</th>
                <th className="p-3 font-semibold text-amber-400">Time Complexity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-emerald-400 font-bold">Matrix Addition</td>
                <td className="p-3 text-slate-300">$R_A == R_B$ and $C_A == C_B$</td>
                <td className="p-3 text-emerald-300">$R_A \times C_A$</td>
                <td className="p-3 text-emerald-400 font-bold">$O(R \times C)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-400 font-bold">Matrix Transpose</td>
                <td className="p-3 text-slate-300">Any valid matrix $A(R \times C)$</td>
                <td className="p-3 text-emerald-300">$C \times R$</td>
                <td className="p-3 text-emerald-400 font-bold">$O(R \times C)$</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-purple-400 font-bold">Matrix Multiplication</td>
                <td className="p-3 text-slate-300">Columns of $A ==$ Rows of $B$ ($C_A == R_B$)</td>
                <td className="p-3 text-emerald-300">$R_A \times C_B$</td>
                <td className="p-3 text-rose-400 font-bold">$O(R_A \times C_A \times C_B)$</td>
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
            MatrixOperationsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program illustrates matrix addition with dimension validation, rectangular transposition, and triple-loop multiplication in Indian Rupees (₹).
        </p>

        <JavaFileLoader
          fileModule={matDemoCode}
          title="MatrixOperationsDemo.java"
          highlightLines={[20, 21, 27, 28, 43, 44, 62, 63, 64, 65, 66]}
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
              <span>❌</span> Pitfall 1: Swapping Elements Twice During Square In-Place Transpose
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              If your inner loop iterates <code className="text-rose-300 font-mono">for (int j = 0; j &lt; n; j++)</code>, every pair is swapped twice, resulting in the original matrix completely unchanged! Only iterate above the main diagonal: <code className="text-emerald-400 font-mono">for (int j = i + 1; j &lt; n; j++)</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Accumulate Dot-Products in Local Scalar Variables
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              In matrix multiplication, maintain <code className="text-emerald-400 font-mono">double sum = 0.0;</code> in a CPU register during the inner <code className="text-slate-300 font-mono">k</code> loop, assigning <code className="text-emerald-400 font-mono">result[i][j] = sum;</code> only once to eliminate redundant heap writes.
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
            🤔 <em>&ldquo;Why can reordering loops from (i, j, k) to (i, k, j) make Matrix Multiplication 10x faster?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Hardware Spatial Cache Locality! In Java, <code className="text-sky-300 font-mono">matrix[k]</code> is stored sequentially in memory. When the innermost loop iterates over <code className="text-emerald-400 font-bold">j</code> (<code className="text-slate-300 font-mono">B[k][j]</code>), contiguous memory is loaded into CPU L1 cache lines, eliminating expensive cache misses!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Matrix Operations FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_006 Topic 15: Matrix Operations (Add, Transpose, Multiply)"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_006_topic15_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Matrix algorithms are the bedrock of computer graphics, neural networks, and spreadsheet calculation engines. Always validate dimensions defensively before launching nested loops! In Topic 16, we explore Jagged / Ragged Arrays! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
