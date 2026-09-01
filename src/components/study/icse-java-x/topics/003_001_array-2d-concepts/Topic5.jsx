import React, { useState } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic5_files/ICSEMatrixPatternsDemo.java?raw";
import noteText from "./topic5_files/topic5_note.txt?raw";
import questions from "./topic5_files/topic5_questions";

/**
 * Interactive ICSE Matrix Pattern Simulator Component
 * Supports Boundary, Non-Boundary, Upper Triangular, and Matrix Transpose
 */
const InteractiveICSEMatrixPatternLab = () => {
  const [patternType, setPatternType] = useState("boundary"); // "boundary" | "nonBoundary" | "upper" | "transpose"

  const matrix4x4 = [
    [10, 20, 30, 40],
    [15, 25, 35, 45],
    [50, 60, 70, 80],
    [55, 65, 75, 85]
  ];

  const R = 4;
  const C = 4;

  const isBoundary = (r, c) => r === 0 || r === R - 1 || c === 0 || c === C - 1;
  const isNonBoundary = (r, c) => r > 0 && r < R - 1 && c > 0 && c < C - 1;
  const isUpperTriangular = (r, c) => r <= c;

  // Calculate sum for current active pattern
  let activeSum = 0;
  matrix4x4.forEach((row, r) => {
    row.forEach((val, c) => {
      if (patternType === "boundary" && isBoundary(r, c)) activeSum += val;
      if (patternType === "nonBoundary" && isNonBoundary(r, c)) activeSum += val;
      if (patternType === "upper" && isUpperTriangular(r, c)) activeSum += val;
      if (patternType === "transpose") activeSum += val;
    });
  });

  return (
    <div className="bg-slate-950/90 p-6 rounded-2xl border border-slate-800 space-y-6">
      {/* Header & Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-sky-400">
            🧩 ICSE 10-Year Board Matrix Pattern Simulator
          </h3>
          <p className="text-xs text-slate-400">
            Select a classic ICSE Board Question pattern below to observe cell filtering logic.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setPatternType("boundary")}
            className={clsx(
              "px-3 py-1.5 rounded-lg transition-all",
              patternType === "boundary" ? "bg-emerald-500 text-white font-bold shadow-md shadow-emerald-500/20" : "text-slate-400 hover:text-slate-200"
            )}
          >
            Boundary Elements
          </button>
          <button
            onClick={() => setPatternType("nonBoundary")}
            className={clsx(
              "px-3 py-1.5 rounded-lg transition-all",
              patternType === "nonBoundary" ? "bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20" : "text-slate-400 hover:text-slate-200"
            )}
          >
            Non-Boundary (Core)
          </button>
          <button
            onClick={() => setPatternType("upper")}
            className={clsx(
              "px-3 py-1.5 rounded-lg transition-all",
              patternType === "upper" ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20" : "text-slate-400 hover:text-slate-200"
            )}
          >
            Upper Triangular
          </button>
          <button
            onClick={() => setPatternType("transpose")}
            className={clsx(
              "px-3 py-1.5 rounded-lg transition-all",
              patternType === "transpose" ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20" : "text-slate-400 hover:text-slate-200"
            )}
          >
            Matrix Transpose
          </button>
        </div>
      </div>

      {/* Grid Display & Condition Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Matrix Grid Visualization */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
          <div className="flex justify-between items-center w-full px-2 text-xs text-slate-400 font-semibold">
            <span>4x4 Input Matrix Grid</span>
            <span className="text-amber-400 font-mono">Pattern Sum = {activeSum}</span>
          </div>

          <div className="grid grid-cols-4 gap-2 font-mono">
            {patternType === "transpose"
              ? // Render transpose grid
                matrix4x4.map((_, r) =>
                  matrix4x4.map((_, c) => {
                    const val = matrix4x4[c][r]; // Transposed indexing
                    return (
                      <div
                        key={`t-${r}-${c}`}
                        className="w-14 h-14 rounded-xl border bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400/30 flex flex-col items-center justify-center font-bold text-sm"
                      >
                        <span className="text-[9px] opacity-60">[{r}][{c}]</span>
                        <span>{val}</span>
                      </div>
                    );
                  })
                )
              : // Standard pattern grid
                matrix4x4.map((row, r) =>
                  row.map((val, c) => {
                    let isMatch = false;
                    let styleClass = "bg-slate-950 text-slate-600 border-slate-800/80 opacity-40";

                    if (patternType === "boundary" && isBoundary(r, c)) {
                      isMatch = true;
                      styleClass = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold ring-2 ring-emerald-500/30 scale-105";
                    } else if (patternType === "nonBoundary" && isNonBoundary(r, c)) {
                      isMatch = true;
                      styleClass = "bg-indigo-500/20 border-indigo-400 text-indigo-300 font-bold ring-2 ring-indigo-400/30 scale-105";
                    } else if (patternType === "upper" && isUpperTriangular(r, c)) {
                      isMatch = true;
                      styleClass = "bg-sky-500/20 border-sky-400 text-sky-300 font-bold ring-2 ring-sky-400/30 scale-105";
                    }

                    return (
                      <div
                        key={`${r}-${c}`}
                        className={clsx(
                          "w-14 h-14 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 font-mono text-sm",
                          styleClass
                        )}
                      >
                        <span className="text-[9px] opacity-60">[{r}][{c}]</span>
                        <span>{isMatch ? val : "·"}</span>
                      </div>
                    );
                  })
                )}
          </div>
        </div>

        {/* Condition Formula & Code Snippet Card */}
        <div className="space-y-4 font-mono text-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-sans">
            Java Condition & Logic Breakdown
          </div>

          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
            {patternType === "boundary" && (
              <>
                <div className="text-emerald-400 font-bold text-sm font-sans">Boundary Condition (Outer Border):</div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-emerald-300 text-[11px] leading-relaxed">
                  if (i == 0 || i == R - 1 || j == 0 || j == C - 1) &#123;<br />
                  &nbsp;&nbsp;System.out.print(mat[i][j] + "\t");<br />
                  &#125; else &#123;<br />
                  &nbsp;&nbsp;System.out.print("\t"); // Leave blank<br />
                  &#125;
                </div>
                <p className="text-slate-400 text-[11px] font-sans">
                  Selects outer ring cells where row index is 0/last or column index is 0/last.
                </p>
              </>
            )}

            {patternType === "nonBoundary" && (
              <>
                <div className="text-indigo-400 font-bold text-sm font-sans">Non-Boundary Condition (Inner Core):</div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-indigo-300 text-[11px] leading-relaxed">
                  if (i &gt; 0 && i &lt; R - 1 && j &gt; 0 && j &lt; C - 1) &#123;<br />
                  &nbsp;&nbsp;System.out.print(mat[i][j] + "\t");<br />
                  &#125;
                </div>
                <p className="text-slate-400 text-[11px] font-sans">
                  Selects inner grid cells excluding top/bottom rows and leftmost/rightmost columns.
                </p>
              </>
            )}

            {patternType === "upper" && (
              <>
                <div className="text-sky-400 font-bold text-sm font-sans">Upper Triangular Condition:</div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-sky-300 text-[11px] leading-relaxed">
                  if (i &lt;= j) &#123;<br />
                  &nbsp;&nbsp;System.out.print(mat[i][j] + "\t");<br />
                  &#125;
                </div>
                <p className="text-slate-400 text-[11px] font-sans">
                  Selects primary diagonal elements and all cells above the primary diagonal.
                </p>
              </>
            )}

            {patternType === "transpose" && (
              <>
                <div className="text-amber-400 font-bold text-sm font-sans">Transpose Matrix Logic (Swap Rows & Cols):</div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-amber-300 text-[11px] leading-relaxed">
                  for (int i = 0; i &lt; C; i++) &#123;<br />
                  &nbsp;&nbsp;for (int j = 0; j &lt; R; j++) &#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;System.out.print(mat[j][i] + "\t"); // Access [j][i]<br />
                  &nbsp;&nbsp;&#125;<br />
                  &#125;
                </div>
                <p className="text-slate-400 text-[11px] font-sans">
                  Swaps row index and column index so rows become columns.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic5 = () => {
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
            Module 003_001 · Topic 5
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            2D Array Concepts
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Board Pattern Programs on Matrices
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Solving classic ICSE Class X Section B 10-mark matrix problems: boundary elements, non-boundary elements, upper/lower triangular forms, and transpose matrices.
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Concept Overview: ICSE Board Matrix Patterns
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            In the ICSE Class X Computer Applications Section B paper (60 marks), matrix pattern problems carry <strong>10 marks each</strong>.
            These questions test your ability to construct precise conditional checks (<code className="text-amber-300 font-mono">if</code> statements) inside nested loops.
          </p>

          <div className="p-4 bg-slate-950/60 rounded-xl border-l-4 border-sky-500 text-slate-300">
            <p className="font-semibold text-sky-300 mb-1">Classroom Scenario (Barrackpore Lab):</p>
            <p className="text-sm">
              Debangshu practices ICSE 10-year board paper questions with Sukanta Hui: printing boundary elements of a 4x4 matrix, leaving non-boundary inner spaces blank using <code className="text-amber-300 font-mono">System.out.print("\t")</code>!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Interactive ICSE Matrix Pattern Simulator */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Interactive ICSE Matrix Pattern Simulator
        </h2>
        <InteractiveICSEMatrixPatternLab />
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🔍</span> Summary Table of Classic Board Conditions
        </h2>
        <div className="overflow-x-auto bg-slate-950/60 rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-sky-300 uppercase font-semibold border-b border-slate-800">
              <tr>
                <th className="p-3">Pattern Type</th>
                <th className="p-3 font-mono">Java Logical Condition</th>
                <th className="p-3">Output Formatting Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono">
              <tr>
                <td className="p-3 font-sans font-semibold text-emerald-400">Boundary Elements</td>
                <td className="p-3 text-amber-300">i == 0 || i == R - 1 || j == 0 || j == C - 1</td>
                <td className="p-3 font-sans text-slate-400">Print element + \t; else print blank \t</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-indigo-400">Non-Boundary Elements</td>
                <td className="p-3 text-amber-300">i &gt; 0 && i &lt; R - 1 && j &gt; 0 && j &lt; C - 1</td>
                <td className="p-3 font-sans text-slate-400">Excludes outer ring cells</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-sky-400">Upper Triangular</td>
                <td className="p-3 text-amber-300">i &lt;= j</td>
                <td className="p-3 font-sans text-slate-400">Elements on/above primary diagonal</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-amber-400">Lower Triangular</td>
                <td className="p-3 text-amber-300">i &gt;= j</td>
                <td className="p-3 font-sans text-slate-400">Elements on/below primary diagonal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Hands-on Code Example Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Java Source Code: <code className="font-mono text-emerald-300">ICSEMatrixPatternsDemo.java</code>
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="ICSEMatrixPatternsDemo.java"
          highlightLines={[22, 23, 24, 26]}
        />
      </section>

      {/* 6. Common Pitfalls & Best Practices Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls & ICSE Board Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-rose-300 mb-2">Common Board Exam Pitfall</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Forgetting the <code className="text-rose-300 font-mono">else</code> block when printing boundary elements. If you omit <code className="text-rose-300 font-mono">else System.out.print("\t");</code>, inner elements disappear without preserving the 2D grid shape!
            </p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-300 mb-2">ICSE Best Practice</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Always write a <strong>Variable Description Table</strong> (Mnemonics, Data Type, Purpose) at the end of your Section B board program for full 10/10 marks.
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
          <li>• How would you write a program to check if a matrix is Symmetric ($A[i][j] == A[j][i]$)?</li>
          <li>• How can you print only the 4 corner elements of an $R \times C$ matrix?</li>
        </ul>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section className="space-y-5">
        <FAQTemplate
          title="Board Pattern Programs FAQs"
          questions={questions}
        />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 003_001 Topic 5: Board Pattern Programs on Matrices"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_001_topic5_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section className="space-y-5">
        <Teacher
          note="Practice writing Variable Description Tables for every matrix pattern program. It guarantees top marks in ICSE Board Examinations! — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic5;
