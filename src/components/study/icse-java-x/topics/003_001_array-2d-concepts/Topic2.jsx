import React, { useState } from "react";
import clsx from "clsx";
import JavaFileLoader from "../../../../../common/JavaFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import demoCode from "./topic2_files/MatrixRowColSumDemo.java?raw";
import noteText from "./topic2_files/topic2_note.txt?raw";
import questions from "./topic2_files/topic2_questions";

/**
 * Interactive 3x3 Row Sum & Column Sum Calculator Component
 */
const InteractiveRowColSumCalculator = () => {
  const [matrix, setMatrix] = useState([
    [10, 15, 20],
    [25, 30, 35],
    [40, 45, 50]
  ]);

  const handleCellChange = (r, c, val) => {
    const num = parseInt(val, 10);
    const updated = matrix.map((rowArr, rIdx) =>
      rowArr.map((cellVal, cIdx) => (rIdx === r && cIdx === c ? (isNaN(num) ? 0 : num) : cellVal))
    );
    setMatrix(updated);
  };

  // Row sums calculation
  const rowSums = matrix.map((row) => row.reduce((acc, val) => acc + val, 0));

  // Column sums calculation
  const colSums = [0, 1, 2].map((colIdx) =>
    matrix.reduce((acc, row) => acc + (row[colIdx] || 0), 0)
  );

  // Grand total
  const grandTotal = rowSums.reduce((acc, val) => acc + val, 0);

  return (
    <div className="bg-slate-950/90 p-6 rounded-2xl border border-slate-800 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-sky-400">
            📊 Real-Time Row Sum & Column Sum Calculator
          </h3>
          <p className="text-xs text-slate-400">
            Edit cell values below to observe live row totals, column totals, and grand total calculations.
          </p>
        </div>
        <div className="text-xs text-amber-400 font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          Grand Total = <strong className="text-white text-sm">{grandTotal}</strong>
        </div>
      </div>

      {/* Grid with Margins for Row/Col Totals */}
      <div className="overflow-x-auto">
        <div className="min-w-[420px] max-w-xl mx-auto space-y-3 font-mono">
          {/* Column Header Titles */}
          <div className="grid grid-cols-5 gap-3 text-center text-xs text-slate-400 font-semibold">
            <span></span>
            <span>Col 0</span>
            <span>Col 1</span>
            <span>Col 2</span>
            <span className="text-sky-400">Row Sums</span>
          </div>

          {/* Matrix Rows with Row Sum at Right */}
          {matrix.map((row, rIdx) => (
            <div key={rIdx} className="grid grid-cols-5 gap-3 items-center">
              <span className="text-xs font-semibold text-slate-400 text-right pr-2">Row {rIdx}</span>
              {row.map((val, cIdx) => (
                <input
                  key={cIdx}
                  type="number"
                  value={val}
                  onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                  className="text-center bg-slate-900 border border-slate-700 focus:border-sky-500 rounded-lg py-2.5 text-xs font-mono text-amber-300 outline-none transition-all shadow-inner"
                />
              ))}
              {/* Row Total Display */}
              <div className="bg-sky-500/10 border border-sky-500/30 text-sky-300 font-bold text-center py-2.5 rounded-lg text-xs">
                {rowSums[rIdx]}
              </div>
            </div>
          ))}

          {/* Column Totals Row at Bottom */}
          <div className="grid grid-cols-5 gap-3 items-center pt-2 border-t border-slate-800">
            <span className="text-xs font-semibold text-indigo-400 text-right pr-2">Col Sums</span>
            {colSums.map((cSum, cIdx) => (
              <div key={cIdx} className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold text-center py-2.5 rounded-lg text-xs">
                {cSum}
              </div>
            ))}
            {/* Corner Grand Total Cell */}
            <div className="bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold text-center py-2.5 rounded-lg text-xs">
              {grandTotal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Topic2 = () => {
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
            Module 003_001 · Topic 2
          </span>
          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold rounded-full uppercase tracking-wider">
            2D Array Concepts
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          Row Sum & Column Sum Calculation
        </h1>
        <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-4xl">
          Calculating individual row totals and column totals in 2D matrices by positioning accumulator variables inside outer vs inner loop scopes.
        </p>
      </header>

      {/* 2. Concept Overview Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-sky-400 flex items-center gap-2">
          <span>📖</span> Concept Overview: Accumulator Reset Rule
        </h2>
        <div className="space-y-4 text-slate-300 leading-relaxed">
          <p>
            When calculating <strong>Row Sums</strong> or <strong>Column Sums</strong> in ICSE Board Java programs, the most critical rule is <strong>where you reset your sum accumulator variable to 0</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-300">
            <li><strong>Row Sum (<code className="text-sky-300 font-mono">rowSum = 0</code>):</strong> Must be reset to <code className="text-emerald-400 font-mono">0</code> <em>inside the outer row loop</em> before traversing each row's columns.</li>
            <li><strong>Column Sum (<code className="text-indigo-300 font-mono">colSum = 0</code>):</strong> Must be reset to <code className="text-emerald-400 font-mono">0</code> <em>inside the outer column loop</em> before traversing each column's rows.</li>
          </ul>

          <div className="p-4 bg-slate-950/60 rounded-xl border-l-4 border-sky-500 text-slate-300">
            <p className="font-semibold text-sky-300 mb-1">Classroom Analogy (Ichapur Center):</p>
            <p className="text-sm">
              In Ichapur, Tuhina analyzes sales figures across 3 store branches (rows) and 3 product categories (columns).
              To find total sales for Branch 0, she resets her calculator to 0 before adding up Branch 0's items. If she forgets to reset to 0 for Branch 1, Branch 0's total gets added to Branch 1!
            </p>
          </div>
        </div>
      </section>

      {/* 3. Interactive Calculator Engine */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-indigo-400 flex items-center gap-2">
          <span>⚙️</span> Interactive Row & Column Sum Calculator
        </h2>
        <InteractiveRowColSumCalculator />
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
          <span>🔍</span> Technical Breakdown: Loop Scoping Comparison
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {/* Row Sum Logic */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-sky-300 text-base">1. Row Sum Execution Pattern</h3>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 space-y-1">
              <div>for (int i = 0; i &lt; rows; i++) &#123;</div>
              <div className="pl-4 text-emerald-400 font-bold">int rowSum = 0; // RESET FOR EACH ROW</div>
              <div className="pl-4">for (int j = 0; j &lt; cols; j++) &#123;</div>
              <div className="pl-8 text-slate-300">rowSum += matrix[i][j];</div>
              <div className="pl-4">&#125;</div>
              <div className="pl-4 text-sky-300">System.out.println("Row " + i + " = " + rowSum);</div>
              <div>&#125;</div>
            </div>
            <p className="text-xs text-slate-400">
              <code className="text-emerald-300 font-mono">rowSum</code> is zeroed out before starting column additions for row <code className="text-sky-300 font-mono">i</code>.
            </p>
          </div>

          {/* Column Sum Logic */}
          <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-indigo-300 text-base">2. Column Sum Execution Pattern</h3>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 space-y-1">
              <div>for (int j = 0; j &lt; cols; j++) &#123; // OUTER COL LOOP</div>
              <div className="pl-4 text-emerald-400 font-bold">int colSum = 0; // RESET FOR EACH COL</div>
              <div className="pl-4">for (int i = 0; i &lt; rows; i++) &#123; // INNER ROW LOOP</div>
              <div className="pl-8 text-slate-300">colSum += matrix[i][j];</div>
              <div className="pl-4">&#125;</div>
              <div className="pl-4 text-indigo-300">System.out.println("Col " + j + " = " + colSum);</div>
              <div>&#125;</div>
            </div>
            <p className="text-xs text-slate-400">
              Outer loop runs over columns <code className="text-indigo-300 font-mono">j</code>, inner loop adds elements across rows <code className="text-sky-300 font-mono">i</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Hands-on Code Example Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Hands-on Java Source Code: <code className="font-mono text-emerald-300">MatrixRowColSumDemo.java</code>
        </h2>
        <JavaFileLoader
          fileModule={demoCode}
          title="MatrixRowColSumDemo.java"
          highlightLines={[18, 19, 21, 27, 28, 30]}
        />
      </section>

      {/* 6. Common Pitfalls & Best Practices Section */}
      <section className="space-y-5 bg-slate-800/40 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-lg hover:border-slate-700 transition-all duration-300">
        <h2 className="text-2xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls & ICSE Board Exam Guidelines
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-rose-300 mb-2">Common Board Exam Pitfall</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Declaring <code className="text-rose-300 font-mono">int sum = 0;</code> <strong>BEFORE</strong> the outer loop. This causes previous row totals to accumulate continuously, yielding incorrect values for subsequent rows!
            </p>
          </div>
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h3 className="font-semibold text-emerald-300 mb-2">ICSE Best Practice</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Always declare accumulator variables inside the outer loop body (e.g., <code className="text-emerald-300 font-mono">int rowSum = 0;</code> right after <code className="text-emerald-300 font-mono">for(int i=0;...)</code>).
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
          <li>• Can you calculate both row sums AND column sums in a single pass of nested loops? (Hint: Use a 1D array <code className="text-sky-300 font-mono">int[] colSums = new int[cols];</code>)</li>
          <li>• How would you find the row index with the highest row sum?</li>
        </ul>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section className="space-y-5">
        <FAQTemplate
          title="Row Sum & Column Sum FAQs"
          questions={questions}
        />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section className="space-y-5">
        <PlainTextPrint
          content={noteText}
          title="Module 003_001 Topic 2: Row Sum and Column Sum Calculation"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="003_001_topic2_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section className="space-y-5">
        <Teacher
          note="Scope matters! Always double check where rowSum = 0 is initialized in ICSE Section B programs. If it's outside the outer loop, you lose marks! — Sukanta Hui"
        />
      </section>
    </div>
  );
};

export default Topic2;
