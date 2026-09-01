import React, { useState } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic4_files/MatrixAdditionSubtractionDemo.java?raw";
import noteText from "./topic4_files/topic4_note.txt?raw";
import questions from "./topic4_files/topic4_questions";

/**
 * Interactive Dual Matrix Operations Laboratory Component
 * Computes Addition (A + B), Subtraction (A - B), and Scalar Multiplication (k * A)
 */
const InteractiveMatrixOperationsLab = () => {
  const [operation, setOperation] = useState("add"); // "add" | "subtract" | "scalar"
  const [scalarK, setScalarK] = useState(2);

  const [matrixA, setMatrixA] = useState([
    [10, 20, 30],
    [40, 50, 60]
  ]);

  const [matrixB, setMatrixB] = useState([
    [5, 12, 15],
    [20, 25, 30]
  ]);

  const handleCellChange = (matType, r, c, val) => {
    const num = parseInt(val, 10);
    const validVal = isNaN(num) ? 0 : num;

    if (matType === "A") {
      setMatrixA((prev) =>
        prev.map((rowArr, rIdx) =>
          rowArr.map((cellVal, cIdx) => (rIdx === r && cIdx === c ? validVal : cellVal))
        )
      );
    } else {
      setMatrixB((prev) =>
        prev.map((rowArr, rIdx) =>
          rowArr.map((cellVal, cIdx) => (rIdx === r && cIdx === c ? validVal : cellVal))
        )
      );
    }
  };

  // Compute Result Matrix C
  const matrixC = matrixA.map((rowArr, rIdx) =>
    rowArr.map((valA, cIdx) => {
      const valB = matrixB[rIdx]?.[cIdx] ?? 0;
      if (operation === "add") return valA + valB;
      if (operation === "subtract") return valA - valB;
      return valA * scalarK; // scalar
    })
  );

  return (
    <div className="bg-slate-950/90 p-6 rounded-2xl border border-slate-800 space-y-6">
      {/* Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-sky-400">
            🧪 Interactive Dual-Matrix Operations Laboratory
          </h3>
          <p className="text-xs text-slate-400">
            Edit elements in Matrix A and Matrix B to observe real-time element-wise C[i][j] calculations.
          </p>
        </div>

        {/* Mode Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setOperation("add")}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              operation === "add" ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "bg-slate-900 text-slate-400 hover:text-slate-200"
            )}
          >
            Addition (A + B)
          </button>
          <button
            onClick={() => setOperation("subtract")}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              operation === "subtract" ? "bg-sky-500 text-white shadow-md shadow-sky-500/20" : "bg-slate-900 text-slate-400 hover:text-slate-200"
            )}
          >
            Subtraction (A - B)
          </button>
          <button
            onClick={() => setOperation("scalar")}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
              operation === "scalar" ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20" : "bg-slate-900 text-slate-400 hover:text-slate-200"
            )}
          >
            Scalar (k · A)
          </button>
        </div>
      </div>

      {/* Scalar Factor Slider (Visible in Scalar Mode) */}
      {operation === "scalar" && (
        <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-xl border border-slate-800">
          <span className="text-xs text-amber-400 font-mono font-semibold">Scalar Multiplier k = {scalarK}</span>
          <input
            type="range"
            min="1"
            max="10"
            value={scalarK}
            onChange={(e) => setScalarK(parseInt(e.target.value, 10))}
            className="flex-1 accent-amber-500 cursor-pointer"
          />
        </div>
      )}

      {/* Matrices Grid Layout: A [op] B = C */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Matrix A */}
        <div className="space-y-2 bg-slate-900/80 p-4 rounded-xl border border-sky-500/30">
          <div className="flex items-center justify-between text-xs font-semibold text-sky-400">
            <span>Matrix A (2x3)</span>
            <span className="text-[10px] text-slate-500">Term 1 Scores</span>
          </div>
          <div className="space-y-2">
            {matrixA.map((row, r) => (
              <div key={r} className="flex gap-2">
                {row.map((val, c) => (
                  <input
                    key={c}
                    type="number"
                    value={val}
                    onChange={(e) => handleCellChange("A", r, c, e.target.value)}
                    className="w-full text-center bg-slate-950 border border-slate-700 focus:border-sky-500 rounded-lg py-2 text-xs font-mono text-sky-300 outline-none"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Operation Sign & Matrix B */}
        {operation !== "scalar" ? (
          <div className="space-y-2 bg-slate-900/80 p-4 rounded-xl border border-indigo-500/30">
            <div className="flex items-center justify-between text-xs font-semibold text-indigo-400">
              <span>Matrix B (2x3)</span>
              <span className="text-[10px] text-slate-500">Term 2 Scores</span>
            </div>
            <div className="space-y-2">
              {matrixB.map((row, r) => (
                <div key={r} className="flex gap-2">
                  {row.map((val, c) => (
                    <input
                      key={c}
                      type="number"
                      value={val}
                      onChange={(e) => handleCellChange("B", r, c, e.target.value)}
                      className="w-full text-center bg-slate-950 border border-slate-700 focus:border-indigo-500 rounded-lg py-2 text-xs font-mono text-indigo-300 outline-none"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 bg-slate-900/50 rounded-xl border border-amber-500/30 flex flex-col items-center justify-center text-center space-y-2">
            <div className="text-2xl font-bold text-amber-400 font-mono">× {scalarK}</div>
            <div className="text-xs text-slate-400">Each element of A is multiplied by {scalarK}</div>
          </div>
        )}

        {/* Result Matrix C */}
        <div className="space-y-2 bg-slate-900/90 p-4 rounded-xl border border-emerald-500/40">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
            <span>Result Matrix C (2x3)</span>
            <span className="text-[10px] text-emerald-500/80">C[i][j]</span>
          </div>
          <div className="space-y-2 font-mono">
            {matrixC.map((row, r) => (
              <div key={r} className="flex gap-2">
                {row.map((val, c) => (
                  <div
                    key={c}
                    className="w-full text-center bg-emerald-500/10 border border-emerald-500/40 rounded-lg py-2 text-xs font-bold text-emerald-300"
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Formula Note */}
      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 flex items-center justify-between">
        <span className="text-slate-400">Element Formula for cell [0][0]:</span>
        <span className="text-emerald-400 font-bold">
          {operation === "add" && `C[0][0] = A[0][0] + B[0][0] -> ${matrixA[0][0]} + ${matrixB[0][0]} = ${matrixC[0][0]}`}
          {operation === "subtract" && `C[0][0] = A[0][0] - B[0][0] -> ${matrixA[0][0]} - ${matrixB[0][0]} = ${matrixC[0][0]}`}
          {operation === "scalar" && `C[0][0] = ${scalarK} * A[0][0] -> ${scalarK} * ${matrixA[0][0]} = ${matrixC[0][0]}`}
        </span>
      </div>
    </div>
  );
};

const Topic4 = () => {
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
            Module 003_001 · Topic 4
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            2D Array Concepts
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Matrix Addition & Subtraction
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Performing element-wise matrix arithmetic <code className="text-emerald-400 font-mono">C[i][j] = A[i][j] ± B[i][j]</code> on matching matrix dimensions.
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Concept Overview: The Dimension Compatibility Rule
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            To perform Matrix Addition or Subtraction in Java, <strong>both matrices must have identical dimensions</strong> ($R \times C$).
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
            <li><strong>Addition:</strong> <code className="text-emerald-400 font-mono">C[i][j] = A[i][j] + B[i][j]</code> for all $i \in [0, R-1]$ and $j \in [0, C-1]$.</li>
            <li><strong>Subtraction:</strong> <code className="text-sky-400 font-mono">C[i][j] = A[i][j] - B[i][j]</code> for all $i \in [0, R-1]$ and $j \in [0, C-1]$.</li>
          </ul>

          <div className="p-4 bg-slate-950/60 rounded-xl border-l-4 border-sky-500 text-slate-300">
            <p className="font-semibold text-sky-300 mb-1">Classroom Scenario (Barrackpore Center):</p>
            <p className="text-sm">
              Sukanta Hui combines Swadeep's Term 1 exam scores (Matrix A) and Term 2 exam scores (Matrix B) for 2 students across 3 subjects.
              Since both term reports have 2 rows and 3 columns, student scores add up cell-by-cell into Total Scores (Matrix C)!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Interactive Dual Matrix Operations Laboratory */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Interactive Dual-Matrix Operations Laboratory
        </h2>
        <InteractiveMatrixOperationsLab />
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🔍</span> Technical Breakdown: Nested Loop Execution Pattern
        </h2>
        <div className="bg-slate-950/60 p-6 rounded-xl border border-slate-800 space-y-4 text-slate-300">
          <p className="font-semibold text-sky-300 text-sm">Java Nested Loop Implementation for Matrix Addition:</p>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 font-mono text-xs text-amber-300 space-y-1">
            <div>int[][] c = new int[rows][cols]; // Resultant matrix</div>
            <div className="pt-2">for (int i = 0; i &lt; rows; i++) &#123;</div>
            <div className="pl-4">for (int j = 0; j &lt; cols; j++) &#123;</div>
            <div className="pl-8 text-emerald-400 font-bold">c[i][j] = a[i][j] + b[i][j]; // Element-wise sum</div>
            <div className="pl-4">&#125;</div>
            <div>&#125;</div>
          </div>
          <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-400">
            <li>Resultant matrix <code className="text-emerald-400 font-mono">c</code> must be instantiated with dimensions <code className="text-amber-300 font-mono">new int[rows][cols]</code>.</li>
            <li>Both matrices <code className="text-sky-300 font-mono">a</code> and <code className="text-indigo-300 font-mono">b</code> are accessed using the same loop indices <code className="text-amber-300 font-mono">[i][j]</code>.</li>
          </ol>
        </div>
      </section>

      {/* 5. Hands-on Code Example Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Java Source Code: <code className="font-mono text-emerald-300">MatrixAdditionSubtractionDemo.java</code>
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="MatrixAdditionSubtractionDemo.java"
          highlightLines={[22, 23, 24]}
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
              Attempting matrix addition on matrices of unequal dimensions (e.g., Matrix A is 2x3 and Matrix B is 3x2). This causes an immediate <code className="text-rose-300 font-mono">ArrayIndexOutOfBoundsException</code> during loop execution!
            </p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-300 mb-2">ICSE Best Practice</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Always verify that <code className="text-emerald-300 font-mono">a.length == b.length</code> and <code className="text-emerald-300 font-mono">a[0].length == b[0].length</code> before running matrix addition or subtraction loops.
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
          <li>• Is matrix addition commutative? That is, does $A + B == B + A$? (Yes!)</li>
          <li>• Is matrix subtraction commutative? Does $A - B == B - A$? (No, $A - B == -(B - A)$!)</li>
        </ul>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section className="space-y-5">
        <FAQTemplate
          title="Matrix Addition & Subtraction FAQs"
          questions={questions}
        />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 003_001 Topic 4: Matrix Addition and Subtraction"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_001_topic4_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section className="space-y-5">
        <Teacher
          note="In Section B matrix programs, always instantiate the third result matrix C with the same dimensions as A and B before entering the nested loops! — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic4;
