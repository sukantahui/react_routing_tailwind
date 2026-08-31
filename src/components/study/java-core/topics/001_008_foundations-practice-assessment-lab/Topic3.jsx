import React from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import matrixDemoCode from "./topic3_files/MatrixSpiralAndRotationAlgorithmsDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

export default function Topic3() {
  return (
    <div className="space-y-12 px-4 md:px-8 py-8 text-slate-200 bg-slate-900 min-h-screen">
      {/* Inline Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes glowMatrix {
            0%, 100% { filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4)); }
            50% { filter: drop-shadow(0 0 14px rgba(56, 189, 248, 0.8)); }
          }
          .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
          }
          .animate-glow-mx {
            animation: glowMatrix 3s ease-in-out infinite;
          }
        `}
      </style>

      {/* Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 001_008 · Topic 3
          </span>
          <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold rounded-full">
            Algorithmic Lab 3 · 2D Matrices
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
          Matrix Spiral Traversal &amp; In-Place 90-Degree Clockwise Rotation
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Master interview-grade 2D matrix manipulation in Java: 4-boundary pointer spiral traversal (<code className="text-emerald-400 font-mono">O(R &times; C)</code>), and the two-step formula for in-place 90-degree clockwise square rotation (<code className="text-purple-300 font-mono">Transpose + Row Reversal</code> in <code className="text-emerald-400 font-mono">O(1) Auxiliary Space</code>).
        </p>
      </header>

      {/* Section 1: Conceptual Foundation */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> The Two Landmark Matrix Operations
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed text-sm md:text-base">
          <p>
            2D array algorithms test your precision with multi-index pointer manipulation and in-place transformations:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-sky-500/30">
              <h3 className="text-sky-400 font-bold text-sm mb-2">1. Spiral Order Traversal</h3>
              <p className="text-sky-300 mb-1">4 Pointers: top, bottom, left, right</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Visits cells in clockwise spiral boundaries. Top (left→right), Right (top→bottom), Bottom (right→left, guarded by <code className="text-slate-300 font-mono">top &lt;= bottom</code>), Left (bottom→top, guarded by <code className="text-slate-300 font-mono">left &lt;= right</code>).
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-emerald-500/30">
              <h3 className="text-emerald-400 font-bold text-sm mb-2">2. In-Place 90° Clockwise Rotation</h3>
              <p className="text-emerald-300 mb-1">Transpose + Horizontal Row Reversal</p>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Step 1: Swap <code className="text-emerald-400 font-mono">matrix[i][j]</code> with <code className="text-emerald-400 font-mono">matrix[j][i]</code> across main diagonal. Step 2: Reverse each row horizontally in <code className="text-emerald-400 font-mono">O(1)</code> space without allocating a second matrix.
              </p>
            </div>
          </div>
          
          <div className="p-4 bg-slate-900/60 rounded-xl border-l-4 border-emerald-500 text-slate-300 space-y-2">
            <p className="font-medium text-emerald-300">Classroom Case Study (Barrackpore Seating &amp; Score Grids):</p>
            <p className="text-sm leading-relaxed">
              In our Barrackpore laboratory, <strong>Swadeep</strong> and <strong>Tuhina</strong> traversed a 3x4 seating grid yielding spiral order <code className="text-emerald-400 font-semibold">[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]</code>, while <strong>Abhronila</strong> and <strong>Debangshu</strong> rotated a 4x4 student assessment score matrix 90 degrees clockwise in-place with zero memory allocation!
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Semantic Visual Diagram */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Algorithmic Visualizations: Spiral Path &amp; In-Place 90° Rotation
        </h2>
        <p className="text-sm md:text-base text-slate-400 leading-relaxed">
          Comparing 4-boundary spiral flow with the two-step rotation pipeline:
        </p>

        {/* Semantic SVG Diagram */}
        <div className="w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-950 p-4">
          <svg
            viewBox="0 0 880 290"
            className="w-full h-auto"
            aria-label="Matrix Spiral and Rotation Diagram"
          >
            <defs>
              <linearGradient id="gradSpiral" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
              <linearGradient id="gradRotate" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#6d28d9" />
              </linearGradient>
            </defs>

            {/* Left Panel: Spiral Traversal (4 Boundary Pointers) */}
            <rect x="30" y="30" width="390" height="215" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="225" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">1. SPIRAL ORDER (4 Boundary Pointers)</text>

            <rect x="45" y="70" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="92" fill="#bae6fd" fontSize="10" fontFamily="monospace">1. Top Row     : left → right | top++</text>

            <rect x="45" y="110" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="132" fill="#bae6fd" fontSize="10" fontFamily="monospace">2. Right Column: top → bottom  | right--</text>

            <rect x="45" y="150" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="172" fill="#bae6fd" fontSize="10" fontFamily="monospace">3. Bottom Row  : right → left | bottom-- (if top&lt;=bot)</text>

            <rect x="45" y="190" width="360" height="35" rx="4" fill="#082f49" />
            <text x="55" y="212" fill="#bae6fd" fontSize="10" fontFamily="monospace">4. Left Column : bottom → top  | left++ (if left&lt;=rt)</text>

            {/* Right Panel: 90° In-Place Rotation (2 Steps) */}
            <rect x="450" y="30" width="400" height="215" rx="10" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="650" y="55" fill="#a78bfa" fontSize="13" fontWeight="bold" textAnchor="middle">2. IN-PLACE 90° ROTATION (2 Steps)</text>

            <rect x="465" y="70" width="370" height="60" rx="6" fill="#2e1065" />
            <text x="475" y="92" fill="#ddd6fe" fontSize="10" fontWeight="bold">STEP 1: TRANSPOSE MATRIX (Main Diagonal)</text>
            <text x="475" y="112" fill="#c4b5fd" fontSize="9" fontFamily="monospace">Swap matrix[i][j] &harr; matrix[j][i] for j &gt; i</text>

            <rect x="465" y="140" width="370" height="60" rx="6" fill="#022c22" />
            <text x="475" y="162" fill="#a7f3d0" fontSize="10" fontWeight="bold">STEP 2: REVERSE EACH ROW HORIZONTALLY</text>
            <text x="475" y="182" fill="#6ee7b7" fontSize="9" fontFamily="monospace">Two-pointer swap matrix[i][left] &harr; matrix[i][right]</text>

            <text x="650" y="225" fill="#a78bfa" fontSize="10" fontWeight="bold" textAnchor="middle">O(N&sup2;) Time | O(1) Auxiliary Memory</text>

            {/* Bottom Caption */}
            <text x="440" y="265" fill="#94a3b8" fontSize="12" textAnchor="middle">
              Spiral traversal dynamically shrinks 4 boundary pointers; 90° Clockwise Rotation = Transposition + Horizontal Row Reversal.
            </text>
          </svg>
        </div>
      </section>

      {/* Section 3: Deep Technical Breakdown */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>📊</span> Matrix Operations Complexity &amp; Invariant Matrix
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-700 text-slate-300 bg-slate-900/50">
                <th className="p-3 font-semibold text-sky-400">Operation</th>
                <th className="p-3 font-semibold text-emerald-400">Time Complexity</th>
                <th className="p-3 font-semibold text-purple-400">Auxiliary Space</th>
                <th className="p-3 font-semibold text-amber-400">Core Invariant Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-mono text-xs">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">Spiral Traversal ($R \times C$)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(R \times C)$</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(1)$ auxiliary</td>
                <td className="p-3 text-slate-300 font-sans">Guard bottom &amp; left with `top &lt;= bottom` &amp; `left &lt;= right`</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">90° Clockwise Rotation ($N \times N$)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(N^2)$</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(1)$ in-place</td>
                <td className="p-3 text-slate-300 font-sans">Transpose across diagonal + Reverse rows horizontally</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">90° Counter-Clockwise ($N \times N$)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(N^2)$</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(1)$ in-place</td>
                <td className="p-3 text-slate-300 font-sans">Transpose across diagonal + Reverse columns vertically</td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="p-3 text-sky-300 font-bold">180° In-Place Rotation ($N \times N$)</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(N^2)$</td>
                <td className="p-3 text-emerald-400 font-bold font-sans">$O(1)$ in-place</td>
                <td className="p-3 text-slate-300 font-sans">Reverse rows horizontally + Reverse rows vertically</td>
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
            MatrixSpiralAndRotationAlgorithmsDemo.java
          </span>
        </div>
        
        <p className="text-sm text-slate-300 leading-relaxed">
          The following program implements 4-boundary spiral matrix traversal and in-place 90-degree square matrix rotation.
        </p>

        <JavaFileLoader
          fileModule={matrixDemoCode}
          title="MatrixSpiralAndRotationAlgorithmsDemo.java"
          highlightLines={[20, 24, 30, 36, 42, 49, 58, 62, 70, 78, 92, 103]}
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
              <span>❌</span> Pitfall 1: Starting Transposition Inner Loop at `j = 0`
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Starting transposition at <code className="text-rose-300 font-mono">j = 0</code> will swap elements twice, leaving the matrix unchanged! Always start at <code className="text-emerald-400 font-mono">int j = i + 1</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/50 space-y-2">
            <p className="text-emerald-300 font-semibold flex items-center gap-2 text-sm md:text-base">
              <span>🛡️</span> Best Practice: Guard Bottom and Left Passes in Rectangular Spiral
            </p>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Always wrap the bottom-row and left-column passes with <code className="text-emerald-400 font-mono">if (top &lt;= bottom)</code> and <code className="text-emerald-400 font-mono">if (left &lt;= right)</code> to prevent duplicate traversals on single-row or single-column matrices.
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
            🤔 <em>&ldquo;Can an $R \times C$ non-square rectangular matrix (e.g. 3x4) be rotated 90° strictly in-place in Java?&rdquo;</em>
          </p>
          <p>
            👉 <strong>Hint:</strong> Dimension Mismatch! A 3x4 matrix rotated 90° becomes a 4x3 matrix. In Java&apos;s array memory model, an array&apos;s row and column dimensions are immutable once created; rotating a non-square matrix requires allocating a new <code className="text-emerald-400 font-mono">new int[cols][rows]</code> matrix!
          </p>
        </div>
      </section>

      {/* Section 7: FAQs */}
      <section className="space-y-4">
        <FAQTemplate
          title="Matrix Spiral & Rotation FAQs"
          questions={questions}
        />
      </section>

      {/* Section 8: Plain Text Printable Note */}
      <section className="space-y-4">
        <PlainTextPrint
          content={noteText}
          title="Module 001_008 Topic 3: Matrix Spiral & 90-Degree Rotation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="001_008_topic3_note.txt"
        />
      </section>

      {/* Section 9: Teacher's Note */}
      <section className="space-y-4">
        <Teacher
          note="To Swadeep, Tuhina, Abhronila, and Debangshu: Matrix algorithms are the ultimate test of pointer bounds discipline. In Topic 4, we conquer Algorithmic Problem 4: Finding Duplicate & Missing Numbers in Arrays! — Sukanta Hui"
        />
      </section>
    </div>
  );
}
