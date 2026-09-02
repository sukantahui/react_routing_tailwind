import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic4_files/MatrixOperationsDemo.c?raw";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  return (
    <div className="mt-4 pt-2 md:pt-4 space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800 shadow-xl">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 002_005 · Topic 4
          </span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            2D Matrix Algebra &amp; Memory Strides
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          2D Arrays, Row-Major Memory Mapping &amp; Matrix Algebra Operations
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Uncover the physical 1D reality of 2D matrices in RAM. Calculate row-major memory stride offsets, master matrix addition, transposition, and implement $O(N^3)$ triple-nested matrix multiplication.
        </p>
      </header>

      {/* 2. Dedicated Topic Description Section (MANDATORY CNAT STYLE) */}
      <section className="space-y-6 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border-2 border-indigo-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 text-xl border border-indigo-500/30">
              🧑‍🏫
            </span>
            <div>
              <h2 className="text-2xl font-black text-indigo-200 tracking-tight">
                Teacher's Corner: The Spreadsheet Grid vs Linear RAM
              </h2>
              <p className="text-xs text-indigo-300/80">
                Classroom discussion by Sukanta Hui (Coder &amp; AccoTax, Barrackpore)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Insight
          </span>
        </div>

        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            During our systems programming workshop in Barrackpore, <strong>Debangshu</strong> asked: <em>"Sir, hardware memory chips only have linear byte addresses (0, 1, 2, 3...). How can the C compiler create a 2-dimensional grid of rows and columns?"</em>
          </p>
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm md:text-base">
              📐 The Theater Seating Row-Major Model
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              Imagine cinema hall seating at a theater in Barrackpore with 3 rows of 4 seats each. The theater staff doesn't need 2D physical wiring. They simply install Seat 1..4 in Row 0, then immediately place Seat 5..8 in Row 1, and Seat 9..12 in Row 2!
            </p>
            <p className="text-xs md:text-sm text-slate-300">
              To find seat <code>[row][col]</code>, you simply skip past all preceding rows (<code>row * TotalColumns</code>) and take <code>col</code> additional steps:
              <br />
              <code className="text-emerald-400 font-mono font-bold block pt-1">
                Linear Memory Address = BaseAddress + ((row * COLS) + col) * sizeof(Type)
              </code>
            </p>
          </div>
        </div>
      </section>

      {/* 3. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: 2D Matrix Row-Major Linearization
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
          <svg viewBox="0 0 920 310" className="w-full min-w-[750px] font-sans">
            <text x="460" y="25" textAnchor="middle" fill="#38bdf8" className="font-bold text-sm">
              Conceptual 2D Grid (3x3) Linearized into Physical RAM Strip (9 Consecutive Elements)
            </text>

            {/* 2D Grid View */}
            <g transform="translate(60, 50)">
              <text x="80" y="0" textAnchor="middle" fill="#f59e0b" className="font-bold text-xs">Conceptual 2D Table</text>
              <rect x="0" y="10" width="160" height="130" rx="8" fill="#0f172a" stroke="#475569" />
              {/* Row 0 */}
              <rect x="10" y="20" width="40" height="30" rx="4" fill="#1e293b" stroke="#38bdf8" />
              <text x="30" y="40" textAnchor="middle" fill="#fff" className="font-bold text-xs">A00</text>
              <rect x="60" y="20" width="40" height="30" rx="4" fill="#1e293b" stroke="#38bdf8" />
              <text x="80" y="40" textAnchor="middle" fill="#fff" className="font-bold text-xs">A01</text>
              <rect x="110" y="20" width="40" height="30" rx="4" fill="#1e293b" stroke="#38bdf8" />
              <text x="130" y="40" textAnchor="middle" fill="#fff" className="font-bold text-xs">A02</text>
              {/* Row 1 */}
              <rect x="10" y="60" width="40" height="30" rx="4" fill="#1e293b" stroke="#818cf8" />
              <text x="30" y="80" textAnchor="middle" fill="#fff" className="font-bold text-xs">A10</text>
              <rect x="60" y="60" width="40" height="30" rx="4" fill="#1e293b" stroke="#818cf8" />
              <text x="80" y="80" textAnchor="middle" fill="#fff" className="font-bold text-xs">A11</text>
              <rect x="110" y="60" width="40" height="30" rx="4" fill="#1e293b" stroke="#818cf8" />
              <text x="130" y="80" textAnchor="middle" fill="#fff" className="font-bold text-xs">A12</text>
              {/* Row 2 */}
              <rect x="10" y="100" width="40" height="30" rx="4" fill="#1e293b" stroke="#34d399" />
              <text x="30" y="120" textAnchor="middle" fill="#fff" className="font-bold text-xs">A20</text>
              <rect x="60" y="100" width="40" height="30" rx="4" fill="#1e293b" stroke="#34d399" />
              <text x="80" y="120" textAnchor="middle" fill="#fff" className="font-bold text-xs">A21</text>
              <rect x="110" y="100" width="40" height="30" rx="4" fill="#1e293b" stroke="#34d399" />
              <text x="130" y="120" textAnchor="middle" fill="#fff" className="font-bold text-xs">A22</text>
            </g>

            {/* Connecting arrow */}
            <path d="M 250 115 L 320 115" stroke="#f59e0b" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x="285" y="105" textAnchor="middle" fill="#f59e0b" className="text-xs font-bold">Linearize</text>

            {/* Flat RAM strip */}
            <g transform="translate(330, 80)">
              <text x="260" y="-10" textAnchor="middle" fill="#34d399" className="font-bold text-xs">Physical Linear RAM Memory Order</text>
              {/* Row 0 Elements */}
              <rect x="0" y="10" width="55" height="50" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="27" y="35" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">A[0][0]</text>
              <text x="27" y="52" textAnchor="middle" fill="#94a3b8" className="text-[9px]">0x00</text>

              <rect x="60" y="10" width="55" height="50" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="87" y="35" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">A[0][1]</text>
              <text x="87" y="52" textAnchor="middle" fill="#94a3b8" className="text-[9px]">0x04</text>

              <rect x="120" y="10" width="55" height="50" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x="147" y="35" textAnchor="middle" fill="#38bdf8" className="font-bold text-xs">A[0][2]</text>
              <text x="147" y="52" textAnchor="middle" fill="#94a3b8" className="text-[9px]">0x08</text>

              {/* Row 1 Elements */}
              <rect x="180" y="10" width="55" height="50" rx="4" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
              <text x="207" y="35" textAnchor="middle" fill="#818cf8" className="font-bold text-xs">A[1][0]</text>
              <text x="207" y="52" textAnchor="middle" fill="#94a3b8" className="text-[9px]">0x0C</text>

              <rect x="240" y="10" width="55" height="50" rx="4" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
              <text x="267" y="35" textAnchor="middle" fill="#818cf8" className="font-bold text-xs">A[1][1]</text>
              <text x="267" y="52" textAnchor="middle" fill="#94a3b8" className="text-[9px]">0x10</text>

              <rect x="300" y="10" width="55" height="50" rx="4" fill="#1e293b" stroke="#818cf8" strokeWidth="2" />
              <text x="327" y="35" textAnchor="middle" fill="#818cf8" className="font-bold text-xs">A[1][2]</text>
              <text x="327" y="52" textAnchor="middle" fill="#94a3b8" className="text-[9px]">0x14</text>

              {/* Row 2 Elements */}
              <rect x="360" y="10" width="55" height="50" rx="4" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="387" y="35" textAnchor="middle" fill="#34d399" className="font-bold text-xs">A[2][0]</text>
              <text x="387" y="52" textAnchor="middle" fill="#94a3b8" className="text-[9px]">0x18</text>

              <rect x="420" y="10" width="55" height="50" rx="4" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="447" y="35" textAnchor="middle" fill="#34d399" className="font-bold text-xs">A[2][1]</text>
              <text x="447" y="52" textAnchor="middle" fill="#94a3b8" className="text-[9px]">0x1C</text>

              <rect x="480" y="10" width="55" height="50" rx="4" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              <text x="507" y="35" textAnchor="middle" fill="#34d399" className="font-bold text-xs">A[2][2]</text>
              <text x="507" y="52" textAnchor="middle" fill="#94a3b8" className="text-[9px]">0x20</text>
            </g>

            {/* Formula box */}
            <rect x="60" y="240" width="800" height="40" rx="8" fill="#1e1e2e" stroke="#334155" />
            <text x="460" y="265" textAnchor="middle" fill="#f472b6" className="text-xs font-mono font-bold">
              Offset Formula: Stride = (Row_Index * 3 + Col_Index) * 4 Bytes
            </text>
          </svg>
        </div>
      </section>

      {/* 4. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300">
          🔍 Deep Technical Breakdown: Matrix Algorithms Anatomy
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-sky-300 text-sm">1. Matrix Addition</h3>
            <p className="text-slate-300 font-mono text-emerald-400">C[i][j] = A[i][j] + B[i][j]</p>
            <p className="text-slate-400 leading-relaxed">
              Requires identical dimensions. Double nested loop running in $O(ROWS \times COLS)$ time.
            </p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-amber-300 text-sm">2. Matrix Transpose</h3>
            <p className="text-slate-300 font-mono text-emerald-400">T[j][i] = A[i][j]</p>
            <p className="text-slate-400 leading-relaxed">
              Flips matrix across main diagonal. $M \times N$ matrix transforms into $N \times M$.
            </p>
          </div>

          <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-750 space-y-2">
            <h3 className="font-bold text-purple-300 text-sm">3. Matrix Multiplication</h3>
            <p className="text-slate-300 font-mono text-emerald-400">C[i][j] += A[i][k] * B[k][j]</p>
            <p className="text-slate-400 leading-relaxed">
              Requires $Cols(A) == Rows(B)$. Triple nested loop with dot-product accumulation in $O(N^3)$ time.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Complete Matrix Operations Suite Demonstration
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>MatrixOperationsDemo.c</code>) demonstrates physical memory address calculation, matrix addition, matrix transposition, and matrix dot-product multiplication.
        </p>

        <CFileLoader fileModule={cCode} title="MatrixOperationsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`====================================================
 2D Arrays & Matrix Algebra Operations in C
 Coder & AccoTax | Educator: Sukanta Hui
====================================================

🔍 Physical Row-Major Memory Inspection for Matrix A:
  A[0][0] = 1 at address 00000084E6DFF6B0 (Offset: 0 bytes)
  A[0][1] = 2 at address 00000084E6DFF6B4 (Offset: 4 bytes)
  A[0][2] = 3 at address 00000084E6DFF6B8 (Offset: 8 bytes)
  A[1][0] = 4 at address 00000084E6DFF6BC (Offset: 12 bytes)
  A[1][1] = 5 at address 00000084E6DFF6C0 (Offset: 16 bytes)
  A[1][2] = 6 at address 00000084E6DFF6C4 (Offset: 20 bytes)
  A[2][0] = 7 at address 00000084E6DFF6C8 (Offset: 24 bytes)
  A[2][1] = 8 at address 00000084E6DFF6CC (Offset: 28 bytes)
  A[2][2] = 9 at address 00000084E6DFF6D0 (Offset: 32 bytes)

Matrix A (3x3):
  [   1   2   3 ]
  [   4   5   6 ]
  [   7   8   9 ]

Matrix B (3x3):
  [   9   8   7 ]
  [   6   5   4 ]
  [   3   2   1 ]

Matrix Sum (A + B) (3x3):
  [  10  10  10 ]
  [  10  10  10 ]
  [  10  10  10 ]

Matrix Transpose of A (3x3):
  [   1   4   7 ]
  [   2   5   8 ]
  [   3   6   9 ]

Matrix Product (A * B) (3x3):
  [  30  24  18 ]
  [  84  69  54 ]
  [ 138 114  90 ]`}
          </pre>
        </div>
      </section>

      {/* 6. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li>
            <strong>Omitting Column Dimension in Signatures:</strong> Declaring <code>void f(int m[][])</code> causes a compiler error. Column width is strictly mandatory for stride calculation: <code>void f(int m[][COLS])</code>.
          </li>
          <li>
            <strong>Inverted Loop Traversal (Cache Inefficiency):</strong> Looping with outer <code>j</code> (columns) and inner <code>i</code> (rows) jumps across large memory strides on each access, causing massive CPU cache misses on big matrices. Always loop row-first (outer <code>i</code>, inner <code>j</code>).
          </li>
          <li>
            <strong>Mismatched Matrix Multiplication Dimensions:</strong> Multiplying matrices without checking if <code>Cols(A) == Rows(B)</code> leads to memory access out of bounds or garbage math results.
          </li>
        </ul>
      </section>

      {/* 7. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          How would you rotate an $N \times N$ square matrix by 90 degrees clockwise in-place with $O(1)$ extra memory? 
          <em>(Hint: First take the Transpose of the matrix, then reverse each individual row!)</em>
        </p>
      </section>

      {/* 8. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 002_005 Topic 4 FAQs: 2D Arrays & Matrix Algebra" questions={questions} />
      </section>

      {/* 9. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 002_005 Topic 4 Printable Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Topic 4 Note"
          downloadFileName="module_002_005_topic4_note.txt"
        />
      </section>

      {/* 10. Teacher's Note Section */}
      <section>
        <Teacher note="Always loop row-by-row (outer i, inner j) when processing 2D matrices in C. This aligns with hardware cache line fetching and speeds up numerical computations drastically! — Sukanta Hui" />
      </section>
    </div>
  );
}
