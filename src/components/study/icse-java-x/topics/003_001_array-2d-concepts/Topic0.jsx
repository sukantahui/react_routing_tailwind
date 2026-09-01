import React, { useState, useEffect } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic0_files/MatrixDeclarationDemo.java?raw";
import noteText from "./topic0_files/topic0_note.txt?raw";
import questions from "./topic0_files/topic0_questions";

/**
 * Interactive 2D Array Memory Diagram
 * Demonstrates Stack reference -> Heap Row References -> Individual 1D Arrays (Array of Arrays)
 */
const InteractiveMemoryDiagram = () => {
  const [selectedCell, setSelectedCell] = useState({ r: 0, c: 0 });
  const [activeTab, setActiveTab] = useState("rectangular"); // "rectangular" | "jagged"

  const rectangularData = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
  ];

  const jaggedData = [
    [5, 15],
    [25, 35, 45, 55],
    [65]
  ];

  const currentData = activeTab === "rectangular" ? rectangularData : jaggedData;

  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Memory Layout Model:
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => { setActiveTab("rectangular"); setSelectedCell({ r: 0, c: 0 }); }}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              activeTab === "rectangular"
                ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
                : "bg-slate-900 text-slate-400 hover:text-slate-200"
            )}
          >
            Rectangular Matrix (3x3)
          </button>
          <button
            onClick={() => { setActiveTab("jagged"); setSelectedCell({ r: 0, c: 0 }); }}
            className={clsx(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              activeTab === "jagged"
                ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                : "bg-slate-900 text-slate-400 hover:text-slate-200"
            )}
          >
            Jagged Array (Unequal Rows)
          </button>
        </div>
      </div>

      {/* Memory Visual Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stack Frame */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-sky-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
              <h4 className="text-sm font-bold text-sky-400 uppercase tracking-wider">Stack Memory</h4>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Local reference variable stored on the execution stack frame.
            </p>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1 font-mono text-xs">
              <div className="text-amber-400 font-semibold">int[][] matrix</div>
              <div className="text-slate-400 text-[11px]">Ref Pointer: <span className="text-emerald-400">@0x7a89b</span></div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            Points to row array object on Heap.
          </div>
        </div>

        {/* Heap Memory - Row References */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-indigo-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-400"></span>
              <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Heap: Row Array Object</h4>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Primary 1D array holding references to each row array.
            </p>
            <div className="space-y-2 font-mono text-xs">
              {currentData.map((row, rIdx) => (
                <div
                  key={rIdx}
                  onClick={() => setSelectedCell({ r: rIdx, c: 0 })}
                  className={clsx(
                    "p-2.5 rounded-lg border transition-all cursor-pointer flex justify-between items-center",
                    selectedCell.r === rIdx
                      ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  )}
                >
                  <span>matrix[{rIdx}]</span>
                  <span className="text-[11px] text-emerald-400">@row_{rIdx}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            Array of length = {currentData.length}
          </div>
        </div>

        {/* Heap Memory - Actual Elements */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Heap: Primitive Element Rows</h4>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Click any cell to inspect its row-column index and value.
          </p>

          <div className="space-y-3 font-mono text-xs">
            {currentData.map((row, rIdx) => (
              <div key={rIdx} className="space-y-1">
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Row {rIdx} ({row.length} items)</span>
                  <span className="text-emerald-400/80">@row_{rIdx}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {row.map((val, cIdx) => {
                    const isSelected = selectedCell.r === rIdx && selectedCell.c === cIdx;
                    return (
                      <button
                        key={cIdx}
                        onClick={() => setSelectedCell({ r: rIdx, c: cIdx })}
                        className={clsx(
                          "px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-200 min-w-[48px] text-center",
                          isSelected
                            ? "bg-amber-500 text-slate-950 border-amber-400 ring-2 ring-amber-400/30 scale-105"
                            : "bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700"
                        )}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Cell Inspector */}
      <div className="bg-slate-950/90 p-4 rounded-xl border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono rounded">
            matrix[{selectedCell.r}][{selectedCell.c}]
          </span>
          <span className="text-sm text-slate-300">
            Value: <strong className="text-amber-300 font-mono text-base">{currentData[selectedCell.r]?.[selectedCell.c] ?? "N/A"}</strong>
          </span>
        </div>
        <div className="text-xs text-slate-400">
          Row index <code className="text-sky-300">i = {selectedCell.r}</code> | Column index <code className="text-indigo-300">j = {selectedCell.c}</code>
        </div>
      </div>
    </div>
  );
};

/**
 * Interactive Nested Loop Execution Stepper
 */
const InteractiveLoopStepper = () => {
  const matrix = [
    [10, 20],
    [30, 40]
  ];
  const rows = matrix.length;
  const cols = matrix[0].length;

  const totalSteps = rows * cols;
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setStepIndex((prev) => (prev + 1) % totalSteps);
      }, 1200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps]);

  const currentR = Math.floor(stepIndex / cols);
  const currentC = stepIndex % cols;
  const currentVal = matrix[currentR][currentC];

  return (
    <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-sky-400">
            🔄 Interactive Nested Loop Step-by-Step Tracer
          </h3>
          <p className="text-xs text-slate-400">
            Watch outer row loop (i) and inner column loop (j) execute step-by-step.
          </p>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStepIndex((prev) => (prev > 0 ? prev - 1 : totalSteps - 1))}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 transition-all"
          >
            ◀ Prev Step
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={clsx(
              "px-4 py-1.5 text-xs font-bold rounded-lg shadow-md transition-all",
              isPlaying
                ? "bg-amber-500 text-slate-950 hover:bg-amber-400"
                : "bg-emerald-500 text-white hover:bg-emerald-400"
            )}
          >
            {isPlaying ? "⏸ Pause" : "▶ Play Auto Trace"}
          </button>
          <button
            onClick={() => setStepIndex((prev) => (prev + 1) % totalSteps)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 transition-all"
          >
            Next Step ▶
          </button>
          <button
            onClick={() => { setStepIndex(0); setIsPlaying(false); }}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs rounded-lg border border-slate-800"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Matrix Visualization */}
        <div className="space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            2D Array Grid (2x2 Matrix)
          </div>
          <div className="grid grid-cols-2 gap-3 p-4 bg-slate-900 rounded-xl border border-slate-800">
            {matrix.map((row, r) =>
              row.map((val, c) => {
                const isActive = r === currentR && c === currentC;
                return (
                  <div
                    key={`${r}-${c}`}
                    className={clsx(
                      "p-4 rounded-xl border text-center transition-all duration-300 font-mono",
                      isActive
                        ? "bg-sky-500/20 border-sky-400 text-white ring-2 ring-sky-400/40 scale-105 shadow-lg shadow-sky-500/10"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    )}
                  >
                    <div className="text-[10px] text-slate-500 mb-1">[{r}][{c}]</div>
                    <div className="text-lg font-bold">{val}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Live Execution State */}
        <div className="space-y-3 font-mono text-xs">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Live Trace Table State
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-slate-400">Step Progress:</span>
              <span className="text-amber-400 font-bold">Step {stepIndex + 1} of {totalSteps}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Outer Loop (Row i):</span>
              <span className="text-sky-300 font-bold">i = {currentR}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Inner Loop (Col j):</span>
              <span className="text-indigo-300 font-bold">j = {currentC}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Accessed Cell:</span>
              <span className="text-emerald-400 font-bold">matrix[{currentR}][{currentC}] = {currentVal}</span>
            </div>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-300 leading-relaxed font-sans">
              💡 <span className="font-semibold">Execution note:</span> For <code className="text-sky-300">i = {currentR}</code>, inner loop <code className="text-indigo-300">j = {currentC}</code> accesses cell value <strong className="text-amber-300">{currentVal}</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic0 = () => {
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
            Module 003_001 · Topic 0
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            2D Array Concepts
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Declaration & Memory Representation of 2D Arrays
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Mastering row-column indexing, Heap memory allocation, and Java's "Array of Arrays" architecture for ICSE Board Exams.
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Concept Overview: What is a 2D Array in Java?
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            A <strong>Two-Dimensional (2D) Array</strong> in Java is a collection of elements organized in a grid of <strong>rows</strong> and <strong>columns</strong>.
            Unlike C or C++ where 2D arrays are stored in a contiguous block of memory, Java treats a 2D array as an <strong>"Array of Arrays"</strong>.
          </p>
          <div className="p-4 bg-slate-950/60 rounded-xl border-l-4 border-sky-500 text-slate-300">
            <p className="font-semibold text-sky-300 mb-1">Classroom Scenario (Barrackpore Lab):</p>
            <p className="text-sm">
              Sukanta Hui asks Debangshu and Swadeep to visualize their classroom seating arrangement in Barrackpore.
              Row 0 has 3 students, Row 1 has 3 students, and Row 2 has 3 students. To find Swadeep at desk <code className="text-amber-300 font-mono">[1][2]</code>, you go to <strong>Row 1</strong> and count to <strong>Column 2</strong>!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Interactive Heap & Stack Memory Model */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>🧠</span> Interactive Memory Model: "Array of Arrays" Architecture
        </h2>
        <InteractiveMemoryDiagram />
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🔍</span> Technical Syntax & Declaration Variations
        </h2>
        <div className="space-y-4 text-slate-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <h3 className="font-semibold text-sky-300 mb-2">1. Dynamic Allocation (using <code className="text-xs">new</code>)</h3>
              <code className="text-xs text-amber-300 font-mono bg-slate-900 p-2 rounded block mb-2">
                int[][] matrix = new int[3][4];
              </code>
              <p className="text-xs text-slate-400">
                Allocates 3 rows and 4 columns on the Heap. All 12 integer cells are initialized to default value <code className="text-emerald-400 font-mono">0</code>.
              </p>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <h3 className="font-semibold text-sky-300 mb-2">2. Direct Literal Initializer</h3>
              <code className="text-xs text-amber-300 font-mono bg-slate-900 p-2 rounded block mb-2">
                int[][] matrix = {`{{10, 20}, {30, 40}}`};
              </code>
              <p className="text-xs text-slate-400">
                Creates a 2x2 matrix pre-populated with specified integer values.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
            <h4 className="font-semibold text-emerald-400 mb-2 text-sm">Valid Syntax Options in ICSE Exams:</h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs font-mono text-slate-300">
              <li><code className="text-amber-300">int[][] arr = new int[3][3];</code> (Standard & Recommended)</li>
              <li><code className="text-amber-300">int arr[][] = new int[3][3];</code> (Valid C-style syntax)</li>
              <li><code className="text-amber-300">int[] arr[] = new int[3][3];</code> (Valid Java syntax)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Interactive Nested Loop Execution Stepper */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>⚡</span> Live Loop Tracer & Execution Engine
        </h2>
        <InteractiveLoopStepper />
      </section>

      {/* 6. Hands-on Code Example Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Compilable Java Source Code: <code className="font-mono text-emerald-300">MatrixDeclarationDemo.java</code>
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="MatrixDeclarationDemo.java"
          highlightLines={[3, 4, 5, 6, 7, 13, 14, 15]}
        />
      </section>

      {/* 7. Common Pitfalls & Best Practices Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls & Best Practices in ICSE Exams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-rose-300 mb-2">Common Board Exam Pitfalls</h3>
            <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-400">
              <li>Writing <code className="text-rose-300 font-mono">matrix[3][3]</code> for a 3x3 array (Index ranges from 0 to 2; causes <code className="text-rose-300 font-mono">ArrayIndexOutOfBoundsException</code>).</li>
              <li>Confusing <code className="text-amber-300 font-mono">matrix.length</code> (Number of rows) with <code className="text-amber-300 font-mono">matrix[0].length</code> (Number of columns).</li>
            </ul>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-300 mb-2">ICSE Best Practices</h3>
            <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-400">
              <li>Use <code className="text-emerald-300 font-mono">matrix.length</code> for outer loop bound and <code className="text-emerald-300 font-mono">matrix[i].length</code> for inner loop bound.</li>
              <li>Format matrix output using tab <code className="text-emerald-300 font-mono">\t</code> and newline <code className="text-emerald-300 font-mono">System.out.println()</code> after completing inner loop.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Thinking & Hints Section */}
      <section className="space-y-5 bg-sky-950/40 p-6 md:p-8 rounded-2xl border border-sky-800/60 shadow-lg">
        <h3 className="text-lg font-semibold text-sky-300 flex items-center gap-2">
          <span>💭</span> Think About This...
        </h3>
        <ul className="space-y-2 text-sky-200 text-sm">
          <li>• Why does Java allow rows in a 2D array to have different lengths (Jagged arrays)?</li>
          <li>• What is stored in <code className="text-sky-300 font-mono">matrix[0]</code>? (It stores a reference address to the first 1D array row!)</li>
        </ul>
      </section>

      {/* 9. Comprehensive FAQ Section */}
      <section className="space-y-5">
        <FAQTemplate
          title="Declaration & Memory Representation FAQs"
          questions={questions}
        />
      </section>

      {/* 10. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 003_001 Topic 0: Declaration & Memory Representation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_001_topic0_note.txt"
        />
      </section>

      {/* 11. Teacher's Note Section */}
      <section className="space-y-5">
        <Teacher
          note="Always remember that matrix[i][j] means row i, column j. Draw out your 2D grid table on scratch paper during ICSE Section B programming exams! — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic0;
