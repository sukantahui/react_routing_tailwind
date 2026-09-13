import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic5_files/Dynamic2DArrayDemo.c?raw";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

export default function Topic5() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 003_009 · Topic 5
          </span>
          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Multi-Dimensional Dynamic Memory
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Allocating Dynamic 2D Arrays &amp; Matrices
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Explore the two primary architectural techniques for dynamically allocated 2D matrices: Array of Row Pointers (<code>int **</code>) vs Single-Block Contiguous 1D Flattening (<code>int *</code>). Master safe row-by-row deallocation and cache-conscious engineering.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: 2D Matrix Memory Layouts
        </h2>
        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            In scientific computing, graphics programming, image processing, and linear algebra engines, 2D matrices whose row and column dimensions depend on runtime datasets must be allocated dynamically on the heap.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-indigo-500 text-xs md:text-sm text-slate-300 space-y-2">
            <p className="font-semibold text-indigo-300">🏫 Classroom Story at Coder &amp; AccoTax (Barrackpore):</p>
            <p>
              In our Barrackpore algorithm lab, Debangshu tried to deallocate a 2D matrix by calling <code>free(matrix);</code> directly without freeing the individual row arrays first. The program leaked thousands of bytes because all row pointers were orphaned. Sukanta Hui illustrated the reversal rule on the board: <em>always free inward-to-outward, in the exact reverse sequence of allocation!</em>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          ⚙️ Semantic Visual Diagram: 2D Pointer-to-Pointer Architecture
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 900 300" className="w-full min-w-[750px] font-sans">
            <rect x="20" y="20" width="860" height="260" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="2" />

            {/* Stack Pointer */}
            <g transform="translate(40, 50)">
              <rect x="0" y="0" width="160" height="70" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
              <text x="15" y="25" fill="#a5b4fc" className="font-bold text-xs">STACK (Local Var)</text>
              <rect x="15" y="35" width="130" height="25" fill="#312e81" rx="4" />
              <text x="25" y="52" fill="#e0e7ff" className="font-mono text-xs">int **mat = 0x1000</text>
            </g>

            {/* Pointer Array */}
            <g transform="translate(260, 50)">
              <rect x="0" y="0" width="200" height="190" rx="8" fill="#3b0764" stroke="#d946ef" strokeWidth="1.5" />
              <text x="15" y="25" fill="#f5d0fe" className="font-bold text-xs">HEAP: Row Pointers (0x1000)</text>
              
              <rect x="15" y="40" width="170" height="35" fill="#581c87" rx="4" />
              <text x="25" y="62" fill="#fae8ff" className="font-mono text-xs">mat[0] = 0x5000 →</text>
              
              <rect x="15" y="85" width="170" height="35" fill="#581c87" rx="4" />
              <text x="25" y="107" fill="#fae8ff" className="font-mono text-xs">mat[1] = 0x6000 →</text>
              
              <rect x="15" y="130" width="170" height="35" fill="#581c87" rx="4" />
              <text x="25" y="152" fill="#fae8ff" className="font-mono text-xs">mat[2] = 0x7000 →</text>
            </g>

            {/* Row Buffers */}
            <g transform="translate(520, 50)">
              <rect x="0" y="0" width="340" height="190" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
              <text x="15" y="25" fill="#6ee7b7" className="font-bold text-xs">HEAP: Dynamic Integer Rows</text>
              
              <rect x="15" y="40" width="310" height="35" fill="#065f46" rx="4" />
              <text x="25" y="62" fill="#ecfdf5" className="font-mono text-xs">Row 0 (0x5000): [ 10, 11, 12, 13 ]</text>
              
              <rect x="15" y="85" width="310" height="35" fill="#065f46" rx="4" />
              <text x="25" y="107" fill="#ecfdf5" className="font-mono text-xs">Row 1 (0x6000): [ 14, 15, 16, 17 ]</text>
              
              <rect x="15" y="130" width="310" height="35" fill="#065f46" rx="4" />
              <text x="25" y="152" fill="#ecfdf5" className="font-mono text-xs">Row 2 (0x7000): [ 18, 19, 20, 21 ]</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Pointer-of-Pointers vs Contiguous Flattened
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-indigo-300 text-sm">1. Array of Pointers (int **)</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><strong>Access:</strong> Clean syntax <code>matrix[r][c]</code>.</li>
              <li><strong>Flexibility:</strong> Supports jagged rows with varying lengths.</li>
              <li><strong>Deallocation:</strong> Requires looping to free each row first.</li>
              <li><strong>Cache:</strong> Slower due to scattered heap addresses.</li>
            </ul>
          </div>
          <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700 space-y-2">
            <h3 className="font-bold text-emerald-300 text-sm">2. Contiguous Flattened Block (int *)</h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              <li><strong>Access:</strong> Index formula <code>matrix[r * cols + c]</code>.</li>
              <li><strong>Flexibility:</strong> Fixed rectangular matrix only.</li>
              <li><strong>Deallocation:</strong> Single <code>free(matrix)</code> call!</li>
              <li><strong>Cache:</strong> Blazing fast hardware prefetching and cache hits.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Dynamic 2D Array Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>Dynamic2DArrayDemo.c</code>) demonstrates both the Array of Pointers approach with step-by-step row deallocation and the contiguous single-block approach.
        </p>

        <CFileLoader fileModule={cCode} title="Dynamic2DArrayDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`========================================================
   CODER & ACCOTAX - DYNAMIC 2D ARRAYS & MATRICES       
========================================================

--- 1. ARRAY OF POINTERS APPROACH (int **matrix) ---
  Populated 3x4 Matrix (matrix[r][c]):
  Row 0 (at 0x55a9b7e822e0):  10  11  12  13 
  Row 1 (at 0x55a9b7e82300):  14  15  16  17 
  Row 2 (at 0x55a9b7e82320):  18  19  20  21 
  Approach 1 successfully deallocated row-by-row.

--- 2. CONTIGUOUS SINGLE-BLOCK MATRIX (Cache Friendly) ---
  Flat Contiguous Matrix:
  Row 0:  101  102  103  104 
  Row 1:  201  202  203  204 
  Row 2:  301  302  303  304 
  Approach 2 freed with a single O(1) free() call.
========================================================`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-rose-400">
          ⚠️ Common Pitfalls &amp; Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-rose-950/20 border border-rose-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-rose-300">Pitfall: Freeing Outer Array First</h3>
            <p className="text-slate-300">
              Writing <code>free(matrix);</code> before freeing <code>matrix[r]</code> destroys the pointer array and leaves every single row permanently leaked in RAM!
            </p>
          </div>
          <div className="bg-emerald-950/20 border border-emerald-900/30 p-4 rounded-xl space-y-1.5">
            <h3 className="font-bold text-emerald-300">Best Practice: Prefer Contiguous Allocation</h3>
            <p className="text-slate-300">
              For high-performance numerical engines, always prefer single-block contiguous allocation <code>rows * cols * sizeof(type)</code> for superior L1/L2 cache spatial locality.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Thinking & Hints Section ("Think About This...") */}
      <section className="bg-slate-800/30 border border-slate-700/60 p-5 rounded-2xl space-y-2 text-xs md:text-sm">
        <h3 className="font-bold text-amber-300 flex items-center gap-1.5">
          <span>🤔</span> Think About This...
        </h3>
        <p className="text-slate-300 leading-relaxed">
          How would you allocate a dynamic 2D array of strings where each student name can be of variable length up to 100 characters?
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 003_009 Topic 5 FAQs: Dynamic 2D Arrays" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 003_009 Topic 5 Note: Dynamic 2D Arrays"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_003_009_topic5_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher
          note={
            "When dealing with pointer-of-pointers (int **), always reverse your steps during cleanup: free each allocated row first in a loop, then free the master pointer array, and set matrix = NULL! — Sukanta Hui"
          }
        />
      </section>
    </div>
  );
}
