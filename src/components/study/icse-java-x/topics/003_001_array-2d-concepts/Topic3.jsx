import React, { useState } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic3_files/MatrixDiagonalsDemo.java?raw";
import noteText from "./topic3_files/topic3_note.txt?raw";
import questions from "./topic3_files/topic3_questions";

/**
 * Interactive Matrix Diagonal Highlight & Sum Inspection Tool
 */
const InteractiveDiagonalVisualizer = () => {
  const [matrixSize, setMatrixSize] = useState(3); // 3x3 or 4x4
  const [highlightMode, setHighlightMode] = useState("primary"); // "primary" | "secondary" | "both" | "upper" | "lower"

  const matrix3x3 = [
    [12, 45, 67],
    [23, 89, 34],
    [56, 78, 91]
  ];

  const matrix4x4 = [
    [10, 20, 30, 40],
    [15, 25, 35, 45],
    [50, 60, 70, 80],
    [55, 65, 75, 85]
  ];

  const mat = matrixSize === 3 ? matrix3x3 : matrix4x4;
  const N = mat.length;

  // Determine element classification
  const isPrimary = (r, c) => r === c;
  const isSecondary = (r, c) => r + c === N - 1;
  const isUpper = (r, c) => r < c;
  const isLower = (r, c) => r > c;

  // Calculate sums
  let primarySum = 0;
  let secondarySum = 0;

  for (let i = 0; i < N; i++) {
    primarySum += mat[i][i];
    secondarySum += mat[i][N - 1 - i];
  }

  // Combined sum handling odd N double-counting center
  let combinedSum = primarySum + secondarySum;
  if (N % 2 === 1) {
    const centerIdx = Math.floor(N / 2);
    combinedSum -= mat[centerIdx][centerIdx]; // Subtract center once
  }

  return (
    <div className="bg-slate-950/90 p-6 rounded-2xl border border-slate-800 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-sky-400">
            📐 Interactive Diagonal Element Inspector
          </h3>
          <p className="text-xs text-slate-400">
            Select diagonal mode to highlight matrix cells and observe Mathematical index formulas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Size Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Size N:</span>
            <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              {[3, 4].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setMatrixSize(sz)}
                  className={clsx(
                    "px-2.5 py-1 text-xs font-mono rounded transition-all",
                    matrixSize === sz ? "bg-amber-500 text-slate-950 font-bold" : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  {sz}x{sz}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex flex-wrap gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setHighlightMode("primary")}
              className={clsx(
                "px-2.5 py-1 rounded transition-all font-medium",
                highlightMode === "primary" ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Primary (i == j)
            </button>
            <button
              onClick={() => setHighlightMode("secondary")}
              className={clsx(
                "px-2.5 py-1 rounded transition-all font-medium",
                highlightMode === "secondary" ? "bg-sky-500 text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Secondary (i + j == N - 1)
            </button>
            <button
              onClick={() => setHighlightMode("both")}
              className={clsx(
                "px-2.5 py-1 rounded transition-all font-medium",
                highlightMode === "both" ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-slate-200"
              )}
            >
              Both Diagonals
            </button>
          </div>
        </div>
      </div>

      {/* Grid & Live Sum Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matrix Grid Visualization */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            {N}x{N} Square Matrix Grid
          </div>

          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}
          >
            {mat.map((row, r) =>
              row.map((val, c) => {
                const p = isPrimary(r, c);
                const s = isSecondary(r, c);
                const u = isUpper(r, c);
                const l = isLower(r, c);

                let isHighlighted = false;
                let bgClass = "bg-slate-950 text-slate-400 border-slate-800";

                if (highlightMode === "primary" && p) {
                  isHighlighted = true;
                  bgClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30 font-bold scale-105 shadow-md shadow-emerald-500/10";
                } else if (highlightMode === "secondary" && s) {
                  isHighlighted = true;
                  bgClass = "bg-sky-500/20 border-sky-400 text-sky-300 ring-2 ring-sky-400/30 font-bold scale-105 shadow-md shadow-sky-500/10";
                } else if (highlightMode === "both") {
                  if (p && s) {
                    isHighlighted = true;
                    bgClass = "bg-amber-500/30 border-amber-400 text-amber-200 ring-2 ring-amber-400/50 font-bold scale-110 shadow-lg shadow-amber-500/20";
                  } else if (p) {
                    isHighlighted = true;
                    bgClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                  } else if (s) {
                    isHighlighted = true;
                    bgClass = "bg-sky-500/20 border-sky-400 text-sky-300 font-bold";
                  }
                }

                return (
                  <div
                    key={`${r}-${c}`}
                    className={clsx(
                      "w-14 h-14 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 font-mono",
                      bgClass
                    )}
                  >
                    <span className="text-[9px] opacity-60">[{r}][{c}]</span>
                    <span className="text-sm">{val}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Diagonal Sum Metrics & Formula Card */}
        <div className="space-y-4 font-mono text-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Live Diagonal Calculation Metrics
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-emerald-400 font-semibold">Primary Diagonal Sum (i == j):</span>
              <span className="text-emerald-300 font-bold text-sm">{primarySum}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-sky-400 font-semibold">Secondary Diagonal Sum (i + j == N - 1):</span>
              <span className="text-sky-300 font-bold text-sm">{secondarySum}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-amber-400 font-semibold">Combined Diagonal Sum (No Double Count):</span>
              <span className="text-amber-300 font-bold text-sm">{combinedSum}</span>
            </div>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2 text-slate-300 font-sans text-xs">
            <div className="font-semibold text-sky-300">Mathematical Index Rules for N = {N}:</div>
            <ul className="space-y-1 text-slate-400 font-mono text-[11px]">
              <li>• Primary Cell condition: <code className="text-emerald-400">row == col (i == j)</code></li>
              <li>• Secondary Cell condition: <code className="text-sky-400">i + j == {N - 1} (j == {N} - 1 - i)</code></li>
              {N % 2 === 1 && (
                <li className="text-amber-300">• Center Intersection Cell: <code className="text-amber-300">[{Math.floor(N / 2)}][{Math.floor(N / 2)}]</code></li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic3 = () => {
  return (
    <div className="dark bg-slate-900 text-slate-200 min-h-screen py-8 px-4 md:px-6 lg:px-8 space-y-12">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>

      {/* 1. Header Section */}
      <header className="space-y-4 border-b border-slate-800 pb-6 animate-fade-in">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 bg-sky-500/10 text-sky-400 border border-sky-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            Module 003_001 · Topic 3
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            2D Array Concepts
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Primary & Secondary Diagonal Elements
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Identifying left-to-right (<code className="text-emerald-400 font-mono">i == j</code>) and right-to-left (<code className="text-sky-400 font-mono">i + j == N - 1</code>) matrix diagonals in square matrices.
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Concept Overview: Square Matrix Diagonals
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            In ICSE Computer Applications, diagonal algorithms only apply to <strong>Square Matrices</strong> (where rows == columns, i.e., <code className="text-amber-300 font-mono">N x N</code>).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm pt-2">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <h3 className="font-bold text-emerald-400 mb-1">1. Primary (Main) Diagonal</h3>
              <p className="text-xs text-slate-400">
                Runs from top-left corner to bottom-right corner.
                Condition: <code className="text-emerald-300 font-mono">i == j</code> (e.g., [0][0], [1][1], [2][2]).
              </p>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <h3 className="font-bold text-sky-400 mb-1">2. Secondary (Anti) Diagonal</h3>
              <p className="text-xs text-slate-400">
                Runs from top-right corner to bottom-left corner.
                Condition: <code className="text-sky-300 font-mono">i + j == N - 1</code> (or <code className="text-sky-300 font-mono">j == N - 1 - i</code>).
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border-l-4 border-sky-500 text-slate-300">
            <p className="font-semibold text-sky-300 mb-1">Classroom Scenario (Naihati Lab):</p>
            <p className="text-sm">
              In Naihati, Sukanta Hui shows Abhronila that on a 3x3 chessboard, the primary diagonal entries have identical row and column numbers ([0][0], [1][1], [2][2]), while the secondary diagonal indices always sum up to <code className="text-amber-300 font-mono">2</code> (3 - 1)!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Interactive Diagonal Visualizer */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Interactive Diagonal Inspector Tool
        </h2>
        <InteractiveDiagonalVisualizer />
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🔍</span> Algorithmic Efficiency: $O(N^2)$ vs $O(N)$ Single-Loop Optimization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* O(N^2) Approach */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-amber-300 text-base">Standard Nested Loop ($O(N^2)$)</h3>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
              <div>for (int i = 0; i &lt; n; i++) &#123;</div>
              <div className="pl-4">for (int j = 0; j &lt; n; j++) &#123;</div>
              <div className="pl-8 text-emerald-400">if (i == j) &#123;</div>
              <div className="pl-12 text-slate-300">sum += mat[i][j];</div>
              <div className="pl-8">&#125;</div>
              <div className="pl-4">&#125;</div>
              <div>&#125;</div>
            </div>
            <p className="text-xs text-slate-400">Checks all $N^2$ cells using nested loops and conditional checks.</p>
          </div>

          {/* O(N) Single Loop Approach */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-400 text-base">Optimized Single Loop ($O(N)$)</h3>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400 space-y-1">
              <div>for (int i = 0; i &lt; n; i++) &#123;</div>
              <div className="pl-4 text-emerald-300 font-bold">primarySum += mat[i][i]; // Primary</div>
              <div className="pl-4 text-sky-300 font-bold">secondarySum += mat[i][n - 1 - i]; // Secondary</div>
              <div>&#125;</div>
            </div>
            <p className="text-xs text-slate-400">Traverses only $N$ steps directly accessing diagonal cells!</p>
          </div>
        </div>
      </section>

      {/* 5. Hands-on Code Example Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Java Source Code: <code className="font-mono text-emerald-300">MatrixDiagonalsDemo.java</code>
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="MatrixDiagonalsDemo.java"
          highlightLines={[20, 21, 26, 27]}
        />
      </section>

      {/* 6. Common Pitfalls & Best Practices Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls & ICSE Board Exam Rules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-rose-300 mb-2">Common Board Exam Pitfall</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Writing <code className="text-rose-300 font-mono">mat[i][n - i]</code> for secondary diagonal. This causes an immediate <code className="text-rose-300 font-mono">ArrayIndexOutOfBoundsException</code> when <code className="text-rose-300 font-mono">i = 0</code> because <code className="text-rose-300 font-mono">mat[0][n]</code> is out of bounds! The correct expression is <code className="text-emerald-300 font-mono">mat[i][n - 1 - i]</code>.
            </p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-300 mb-2">ICSE Best Practice</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              When calculating the sum of BOTH diagonals in an odd-sized matrix (e.g. 3x3 or 5x5), remember to subtract the center element once so it isn't double-counted!
            </p>
          </div>
        </div>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-5 bg-sky-950/40 p-6 md:p-8 rounded-2xl border border-sky-800/60 shadow-lg">
        <h3 className="text-lg font-semibold text-sky-300 flex items-center gap-2">
          <span>💭</span> Think About This...
        </h3>
        <ul className="space-y-2 text-sky-200 text-sm">
          <li>• What index condition identifies elements ABOVE the primary diagonal? (<code className="text-sky-300 font-mono">i &lt; j</code>)</li>
          <li>• What index condition identifies elements BELOW the primary diagonal? (<code className="text-sky-300 font-mono">i &gt; j</code>)</li>
        </ul>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section className="space-y-5">
        <FAQTemplate
          title="Primary & Secondary Diagonal FAQs"
          questions={questions}
        />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 003_001 Topic 3: Primary and Secondary Diagonal Elements"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_001_topic3_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section className="space-y-5">
        <Teacher
          note="Remember the golden formula: Primary is i == j, Secondary is i + j == N - 1. For secondary diagonal in a single loop, use mat[i][N - 1 - i]! — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic3;
