import React, { useState } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic1_files/MatrixInputOutputDemo.java?raw";
import noteText from "./topic1_files/topic1_note.txt?raw";
import questions from "./topic1_files/topic1_questions";

/**
 * Interactive 2D Matrix Builder & Input Simulator
 * Enables custom row/col dimension selection, live cell value editing, and real-time formatted output preview.
 */
const InteractiveMatrixSimulator = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [gridData, setGridData] = useState([
    [12, 25, 34],
    [41, 56, 62],
    [78, 89, 90]
  ]);
  const [traversalMode, setTraversalMode] = useState("rowMajor"); // "rowMajor" | "colMajor"

  // Handle dimension changes dynamically
  const handleDimensionChange = (r, c) => {
    const newR = Math.max(1, Math.min(4, r));
    const newC = Math.max(1, Math.min(4, c));
    setRows(newR);
    setCols(newC);

    const newGrid = [];
    for (let i = 0; i < newR; i++) {
      const row = [];
      for (let j = 0; j < newC; j++) {
        row.push(gridData[i]?.[j] ?? (i + 1) * 10 + (j + 1));
      }
      newGrid.push(row);
    }
    setGridData(newGrid);
  };

  const handleCellChange = (r, c, val) => {
    const num = parseInt(val, 10);
    const updated = gridData.map((rowArr, rIdx) =>
      rowArr.map((cellVal, cIdx) => (rIdx === r && cIdx === c ? (isNaN(num) ? 0 : num) : cellVal))
    );
    setGridData(updated);
  };

  return (
    <div className="bg-slate-950/90 p-6 rounded-2xl border border-slate-800 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-sky-400">
            🧮 Interactive 2D Matrix Input & Format Simulator
          </h3>
          <p className="text-xs text-slate-400">
            Adjust matrix dimensions, edit cell input values, and view formatted console output.
          </p>
        </div>

        {/* Dimension Selectors */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Rows (R):</span>
            <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              {[2, 3, 4].map((r) => (
                <button
                  key={r}
                  onClick={() => handleDimensionChange(r, cols)}
                  className={clsx(
                    "px-2.5 py-1 text-xs font-mono rounded transition-all",
                    rows === r ? "bg-sky-500 text-white font-bold" : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Cols (C):</span>
            <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
              {[2, 3, 4].map((c) => (
                <button
                  key={c}
                  onClick={() => handleDimensionChange(rows, c)}
                  className={clsx(
                    "px-2.5 py-1 text-xs font-mono rounded transition-all",
                    cols === c ? "bg-indigo-500 text-white font-bold" : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Editor & Formatted Console Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interactive Cell Input Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
            <span>2D Input Cells [i][j]</span>
            <span className="text-sky-400 font-mono">{rows} x {cols} ({rows * cols} Total Elements)</span>
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
            {gridData.map((row, rIdx) => (
              <div key={rIdx} className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-500 w-12">Row {rIdx}:</span>
                <div className="flex gap-2 flex-1">
                  {row.map((val, cIdx) => (
                    <div key={cIdx} className="flex-1">
                      <input
                        type="number"
                        value={val}
                        onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                        className="w-full text-center bg-slate-950 border border-slate-700 focus:border-sky-500 rounded-lg py-2 text-xs font-mono text-amber-300 outline-none transition-all"
                      />
                      <div className="text-[9px] text-center text-slate-500 mt-0.5">[{rIdx}][{cIdx}]</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Formatted Output Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Terminal Output Preview
            </span>
            <div className="flex gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setTraversalMode("rowMajor")}
                className={clsx(
                  "px-2 py-0.5 text-[11px] font-medium rounded transition-all",
                  traversalMode === "rowMajor" ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-slate-200"
                )}
              >
                Row-Major
              </button>
              <button
                onClick={() => setTraversalMode("colMajor")}
                className={clsx(
                  "px-2 py-0.5 text-[11px] font-medium rounded transition-all",
                  traversalMode === "colMajor" ? "bg-indigo-500 text-white" : "text-slate-400 hover:text-slate-200"
                )}
              >
                Column-Major
              </button>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200 space-y-2">
            <div className="text-slate-500 text-[11px]">// Java Output (using System.out.print(matrix[i][j] + "\t"))</div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 space-y-1 overflow-x-auto">
              {traversalMode === "rowMajor" ? (
                gridData.map((row, rIdx) => (
                  <div key={rIdx} className="text-emerald-400 flex gap-6">
                    {row.map((val, cIdx) => (
                      <span key={cIdx} className="w-8 text-right inline-block">{val}</span>
                    ))}
                  </div>
                ))
              ) : (
                // Column major display
                Array.from({ length: cols }).map((_, cIdx) => (
                  <div key={cIdx} className="text-indigo-400 flex gap-6">
                    {gridData.map((row, rIdx) => (
                      <span key={rIdx} className="w-8 text-right inline-block">{row[cIdx]}</span>
                    ))}
                  </div>
                ))
              )}
            </div>
            <div className="text-[11px] text-slate-400 pt-1">
              {traversalMode === "rowMajor"
                ? "▶ Outer loop iterates rows (i = 0..R-1), inner loop prints columns (j = 0..C-1)."
                : "▶ Outer loop iterates columns (j = 0..C-1), inner loop prints rows (i = 0..R-1)."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic1 = () => {
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
            Module 003_001 · Topic 1
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            2D Array Concepts
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Matrix Input & Output Using Nested Loops
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Reading 2D array elements from users via Scanner or BufferedReader and displaying formatted matrix grids using nested <code className="text-amber-300 font-mono">for</code> loops.
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Concept Overview: The Nested Loop Traversal Rule
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            To process a 2D matrix in Java, you need <strong>two nested loops</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
            <li><strong>Outer Loop (<code className="text-amber-300 font-mono">i</code>):</strong> Controls the current <strong>row index</strong> from <code className="text-sky-300 font-mono">0</code> to <code className="text-sky-300 font-mono">rows - 1</code>.</li>
            <li><strong>Inner Loop (<code className="text-amber-300 font-mono">j</code>):</strong> Controls the current <strong>column index</strong> from <code className="text-sky-300 font-mono">0</code> to <code className="text-sky-300 font-mono">cols - 1</code>.</li>
          </ul>

          <div className="p-4 bg-slate-950/60 rounded-xl border-l-4 border-sky-500 text-slate-300">
            <p className="font-semibold text-sky-300 mb-1">Classroom Analogy (Shyamnagar Center):</p>
            <p className="text-sm">
              Sukanta Hui asks Swadeep to enter test scores for 3 subjects across 4 students. Swadeep inputs Row 0 (Student 1's scores), then Row 1 (Student 2's scores), and so on.
              Each row requires an inner loop pass across all subject columns!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Interactive Matrix Builder & Format Simulator */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Interactive Matrix Builder & Formatting Tool
        </h2>
        <InteractiveMatrixSimulator />
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🔍</span> Technical Breakdown: Input vs Output Execution Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Input Phase */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-sky-300 text-base">1. Matrix Input Phase</h3>
            <p className="text-xs text-slate-400">Reading user elements into cell locations:</p>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 space-y-1">
              <div>for (int i = 0; i &lt; rows; i++) &#123;</div>
              <div className="pl-4">for (int j = 0; j &lt; cols; j++) &#123;</div>
              <div className="pl-8 text-emerald-400">matrix[i][j] = sc.nextInt();</div>
              <div className="pl-4">&#125;</div>
              <div>&#125;</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs text-slate-400">
              <li>Populates each cell <code className="text-sky-300 font-mono">matrix[i][j]</code> sequentially in row-major order.</li>
            </ul>
          </div>

          {/* Output Phase */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-emerald-300 text-base">2. Formatted Output Phase</h3>
            <p className="text-xs text-slate-400">Printing cells as a neat 2D grid:</p>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 space-y-1">
              <div>for (int i = 0; i &lt; rows; i++) &#123;</div>
              <div className="pl-4">for (int j = 0; j &lt; cols; j++) &#123;</div>
              <div className="pl-8 text-emerald-400">System.out.print(matrix[i][j] + "\t");</div>
              <div className="pl-4">&#125;</div>
              <div className="pl-4 text-indigo-400">System.out.println(); // Newline per row</div>
              <div>&#125;</div>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs text-slate-400">
              <li>Use tab <code className="text-emerald-300 font-mono">\t</code> to separate column values.</li>
              <li>Call <code className="text-indigo-300 font-mono">System.out.println()</code> after completing each row.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Hands-on Code Example Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Java Source Code: <code className="font-mono text-emerald-300">MatrixInputOutputDemo.java</code>
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="MatrixInputOutputDemo.java"
          highlightLines={[14, 15, 16, 17, 23, 24, 25, 27]}
        />
      </section>

      {/* 6. Common Pitfalls & Best Practices Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls & ICSE Board Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-rose-300 mb-2">Common Exam Pitfall</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Forgetting to place <code className="text-rose-300 font-mono">System.out.println();</code> after the inner loop. Without it, all matrix elements will print in a single horizontal line instead of a grid!
            </p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-300 mb-2">ICSE Best Practice</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Always print user prompt messages like <code className="text-emerald-300 font-mono">"Enter element [" + i + "][" + j + "]: "</code> so users know which cell value they are entering in BlueJ terminal.
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
          <li>• What happens if you swap the inner and outer loops when printing a non-square matrix (e.g. 2x4)?</li>
          <li>• How can you print a 2D matrix in reverse row order (from bottom row to top row)?</li>
        </ul>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section className="space-y-5">
        <FAQTemplate
          title="Matrix Input & Output FAQs"
          questions={questions}
        />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 003_001 Topic 1: Matrix Input and Output Using Nested Loops"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_001_topic1_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section className="space-y-5">
        <Teacher
          note="Remember: inner loop prints columns across the current row, outer loop moves down to the next row. Never forget System.out.println() after closing inner loop! — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic1;
