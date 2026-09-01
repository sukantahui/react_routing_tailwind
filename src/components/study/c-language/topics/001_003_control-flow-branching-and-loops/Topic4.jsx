import React from "react";
import CFileLoader from "../../../../../common/CFileLoader";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import Teacher from "../../../../../common/TeacherSukantaHui";

import cCode from "./topic4_files/NestedLoopsPatternsDemo.c?raw";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

export default function Topic4() {
  return (
    <div className="space-y-12 bg-slate-900 text-slate-200 p-4 md:p-8 rounded-2xl border border-slate-800">
      {/* 1. Header Section */}
      <header className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Module 001_003 · Topic 4
          </span>
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-semibold">
            Nested Loops &amp; Pattern Algorithms
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Building Nested Loop Algorithms: Matrix Indexing, Primes &amp; Pyramid Patterns
        </h1>
        <p className="text-slate-400 text-base max-w-4xl leading-relaxed">
          Master 2D coordinate spaces and nested iteration complexity in C. Learn the mathematics of star and number pyramids, 2D matrix transformations, and optimized $\mathcal&#123;O&#125;(\sqrt&#123;N&#125;)$ prime number search engines.
        </p>
      </header>

      {/* 2. DEDICATED TEACHER EXPLANATION SECTION (FRIENDLY CNAT STYLE) */}
      <section className="space-y-6 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-900 border-2 border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-500/20 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-300 text-xl border border-purple-500/30">
              🧑‍🏫
            </span>
            <div>
              <h2 className="text-2xl font-black text-purple-200 tracking-tight">
                Teacher's Corner: The Clock Hands &amp; Pattern Blueprint
              </h2>
              <p className="text-xs text-purple-300/80">
                Visualizing nested loops intuitively with Sukanta Hui (Coder &amp; AccoTax)
              </p>
            </div>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold">
            CNAT Classroom Style
          </span>
        </div>

        {/* Step 1: The Clock Hands Analogy */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-sky-300 flex items-center gap-2">
            <span>🕰️</span> Step 1: The Clock Hands Analogy
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Imagine looking at a wall clock in our Barrackpore computer center:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="text-sky-300 font-bold block text-sm">Outer Loop (The Slow Hour Hand):</span>
              <p className="text-slate-300">
                Controls the <strong>current row</strong>. It only moves <strong>1 step forward</strong> (from Row 1 to Row 2) after the inner loop has completed all its work!
              </p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30 space-y-2">
              <span className="text-purple-300 font-bold block text-sm">Inner Loop (The Fast Minute Hand):</span>
              <p className="text-slate-300">
                Controls the <strong>columns on this row</strong>. For every single hour, it must spin a full 60-minute circle from start to finish before letting the hour hand tick!
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: The 3-Question Pattern Blueprint */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
            <span>📐</span> Step 2: Sukanta's 3-Question Pattern Blueprint
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Any pattern (pyramids, triangles, diamonds) can be solved by answering 3 simple questions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block">1. Total Rows?</span>
              <p className="text-slate-300">Creates the outer loop: <code>for (int i = 1; i &lt;= N; i++)</code></p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-sky-400 font-bold block">2. What Prints Across?</span>
              <p className="text-slate-300">Inner loops for spaces <code>(N - i)</code> &amp; stars <code>(2*i - 1)</code></p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-bold block">3. Newline at Row End?</span>
              <p className="text-slate-300">Always place <code>printf("\n");</code> right after the inner loops!</p>
            </div>
          </div>
        </div>

        {/* Step 3: Prime Optimization */}
        <div className="space-y-3 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
            <span>⚡</span> Step 3: Why $\sqrt&#123;N&#125;$ Prime Checking is 1000x Faster
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            If a number like $100$ has factors, they always pair up ($2 \times 50$, $4 \times 25$, $10 \times 10$). If you don't find any divisor up to $\sqrt&#123;100&#125; = 10$, you are mathematically guaranteed that no divisor exists above 10!
          </p>
          <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/40 text-xs text-emerald-200">
            For $N = 1,000,000$, standard trial division takes 1,000,000 tests. With <code>d * d &lt;= num</code>, it takes only <strong>1,000 tests</strong>—a 1000x CPU speedup!
          </div>
        </div>
      </section>

      {/* 3. DEDICATED MULTI-SCENARIO EXAMPLES SECTION */}
      <section className="space-y-6 bg-slate-800/40 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-lg">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
            <span>📚</span> Multi-Scenario Code Examples &amp; Practical Variations
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Master 4 classic nested loop algorithmic patterns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scenario 1: Floyd's Natural Number Triangle */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 text-sm">Scenario 1: Floyd's Triangle</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20">Running Counter</span>
            </div>
            <p className="text-xs text-slate-400">
              Prints consecutive natural numbers in a triangle (1; 2 3; 4 5 6; 7 8 9 10).
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int count = 1, rows = 4;

for (int i = 1; i <= rows; i++) {
    for (int j = 1; j <= i; j++) {
        printf("%3d", count++);
    }
    printf("\\n");
}`}</pre>
          </div>

          {/* Scenario 2: Symmetrical Diamond Star Pattern */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 text-sm">Scenario 2: Symmetrical Diamond</span>
              <span className="bg-amber-500/10 text-amber-400 text-[10px] px-2 py-0.5 rounded border border-amber-500/20">Dual Pyramid</span>
            </div>
            <p className="text-xs text-slate-400">
              Combines an upper standard pyramid with a lower inverted pyramid.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int n = 4;
// Upper Pyramid
for (int i = 1; i <= n; i++) {
    for (int s = 1; s <= n - i; s++) printf(" ");
    for (int k = 1; k <= 2*i - 1; k++) printf("*");
    printf("\\n");
}
// Lower Inverted Pyramid
for (int i = n - 1; i >= 1; i--) {
    for (int s = 1; s <= n - i; s++) printf(" ");
    for (int k = 1; k <= 2*i - 1; k++) printf("*");
    printf("\\n");
}`}</pre>
          </div>

          {/* Scenario 3: 2D Matrix Transposition */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-purple-400 text-sm">Scenario 3: 2D Matrix Transpose</span>
              <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-0.5 rounded border border-purple-500/20">Coordinate Swapping</span>
            </div>
            <p className="text-xs text-slate-400">
              Reflects matrix elements across the main diagonal: $B[c][r] = A[r][c]$.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int A[2][3] = {{1, 2, 3}, {4, 5, 6}};
int B[3][2];

for (int r = 0; r < 2; r++) {
    for (int c = 0; c < 3; c++) {
        B[c][r] = A[r][c];
    }
}
// Matrix B is now 3x2 with transposed rows and columns`}</pre>
          </div>

          {/* Scenario 4: Checkerboard Alternating Binary Triangle */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-pink-400 text-sm">Scenario 4: 0-1 Checkerboard Triangle</span>
              <span className="bg-pink-500/10 text-pink-400 text-[10px] px-2 py-0.5 rounded border border-pink-500/20">Coordinate Parity</span>
            </div>
            <p className="text-xs text-slate-400">
              Prints alternating 1s and 0s based on whether $(row + col)$ is even or odd.
            </p>
            <pre className="bg-slate-900 p-3 rounded-xl font-mono text-[11px] text-slate-200 overflow-x-auto">
{`int rows = 4;
for (int i = 1; i <= rows; i++) {
    for (int j = 1; j <= i; j++) {
        if ((i + j) % 2 == 0) printf("1 ");
        else printf("0 ");
    }
    printf("\\n");
}`}</pre>
          </div>
        </div>
      </section>

      {/* 4. Dedicated Topic Description Section (MANDATORY) */}
      <section className="space-y-4 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
          <span>📖</span> Topic Description: Nested Loop Time Complexity &amp; Cache Locality
        </h2>
        <div className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>
            Nested loops multiply execution counts ($\mathcal&#123;O&#125;(N \times M)$). In systems programming, accessing 2D arrays row-by-row (<code>matrix[row][col]</code>) provides superior CPU cache line utilization compared to column-major jumps because C stores 2D matrices contiguously in Row-Major order.
          </p>
          <div className="bg-slate-900/60 p-4 rounded-xl border-l-4 border-amber-500 text-xs md:text-sm text-slate-300 space-y-2 mt-4">
            <p className="font-semibold text-amber-300">🏫 Classroom Context (Barrackpore Systems Lab):</p>
            <p>
              When <strong>Tuhina</strong> and <strong>Swadeep</strong> generated prime numbers up to 100,000, their program took 4 seconds with basic division up to $N$. When <strong>Sukanta Hui</strong> upgraded their condition to <code>d * d &lt;= num</code>, it completed in under 4 milliseconds!
            </p>
          </div>
        </div>
      </section>

      {/* 5. Semantic Visual Diagram Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>⚙️</span> Semantic Visual Diagram: 2D Matrix Row-Column Coordinate Traversal
        </h2>
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          <svg viewBox="0 0 920 280" className="w-full min-w-[760px] font-sans">
            <rect x="10" y="10" width="900" height="260" rx="16" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            <text x="460" y="38" textAnchor="middle" fill="#94a3b8" className="text-xs uppercase tracking-wider font-semibold">
              2D Iteration Space: Outer Row Loop (i) vs Inner Column Loop (j)
            </text>

            {/* Matrix Grid Representation */}
            <g transform="translate(160, 65)">
              {/* Row 0 */}
              <rect x="0" y="0" width="180" height="40" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
              <text x="90" y="25" textAnchor="middle" fill="#38bdf8" className="font-mono text-xs font-bold">[0,0]  [0,1]  [0,2]</text>
              <text x="-40" y="25" fill="#94a3b8" className="font-mono text-xs">i = 0 &rarr;</text>

              {/* Row 1 */}
              <rect x="0" y="55" width="180" height="40" rx="6" fill="#1e293b" stroke="#a78bfa" strokeWidth="1.5" />
              <text x="90" y="80" textAnchor="middle" fill="#a78bfa" className="font-mono text-xs font-bold">[1,0]  [1,1]  [1,2]</text>
              <text x="-40" y="80" fill="#94a3b8" className="font-mono text-xs">i = 1 &rarr;</text>

              {/* Row 2 */}
              <rect x="0" y="110" width="180" height="40" rx="6" fill="#1e293b" stroke="#34d399" strokeWidth="1.5" />
              <text x="90" y="135" textAnchor="middle" fill="#34d399" className="font-mono text-xs font-bold">[2,0]  [2,1]  [2,2]</text>
              <text x="-40" y="135" fill="#94a3b8" className="font-mono text-xs">i = 2 &rarr;</text>
            </g>

            {/* Right Callout Box */}
            <g transform="translate(480, 75)" className="transition-transform duration-300 hover:scale-105">
              <rect x="0" y="0" width="380" height="130" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
              <text x="190" y="30" textAnchor="middle" fill="#f59e0b" className="font-bold text-sm">Iteration Multiplier Principle</text>
              <text x="20" y="60" fill="#e2e8f0" className="text-xs">Outer Loop: Runs N times (e.g. 3 rows)</text>
              <text x="20" y="85" fill="#e2e8f0" className="text-xs">Inner Loop: Runs M times per row (e.g. 3 cols)</text>
              <text x="20" y="110" fill="#34d399" className="text-xs font-bold font-mono">Total Inner Cycles: N * M = 9 total executions</text>
            </g>
          </svg>
        </div>
      </section>

      {/* 6. Deep Technical Breakdown Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
          <span>🔍</span> Deep Technical Breakdown: Nested Loop Computational Patterns
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-3">Algorithm Pattern</th>
                <th className="p-3">Inner Loop Condition</th>
                <th className="p-3">Time Complexity</th>
                <th className="p-3">Core Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
              <tr>
                <td className="p-3 font-mono font-bold text-sky-300">Right-Angled Triangle</td>
                <td className="p-3 font-mono"><code>j &lt;= i</code></td>
                <td className="p-3 font-mono text-emerald-400">O(N^2 / 2) &rarr; O(N^2)</td>
                <td className="p-3">Pattern generation, lower triangular matrices</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-amber-300">Full 2D Matrix Grid</td>
                <td className="p-3 font-mono"><code>col &lt; totalCols</code></td>
                <td className="p-3 font-mono text-amber-400">O(Rows * Cols)</td>
                <td className="p-3">Image pixel filtering, matrix arithmetic</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-purple-300">Optimized Prime Search</td>
                <td className="p-3 font-mono"><code>d * d &lt;= num</code></td>
                <td className="p-3 font-mono text-emerald-400">O(N * sqrt(N))</td>
                <td className="p-3">Cryptographic key generation, prime ranges</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-rose-300">Matrix Multiplication</td>
                <td className="p-3 font-mono">3 nested loops (i, j, k)</td>
                <td className="p-3 font-mono text-rose-400">O(N^3) Cubic</td>
                <td className="p-3">3D Graphics transformations, neural network layers</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Dedicated Example Section (MANDATORY) */}
      <section className="space-y-5 bg-slate-800/40 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
          <span>💻</span> Example Section: Nested Loop Algorithms in Action
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          The program below (<code>NestedLoopsPatternsDemo.c</code>) demonstrates a 2D multiplication table grid, right-angled number triangle, centered equilateral star pyramid, and optimized prime search up to 30.
        </p>

        <CFileLoader fileModule={cCode} title="NestedLoopsPatternsDemo.c" editable={false} />

        <div className="mt-4 rounded-xl border border-slate-700 bg-slate-950 p-4">
          <div className="text-xs font-semibold text-sky-400 mb-2 flex items-center gap-2">
            <span>🖥️</span> Expected Console Execution Output:
          </div>
          <pre className="text-slate-200 text-xs md:text-sm font-mono leading-relaxed whitespace-pre overflow-x-auto">
{`===================================================================
     NESTED LOOPS & PATTERN ALGORITHMS - CODER & ACCOTAX
     Educator: Sukanta Hui | Barrackpore Systems Lab
===================================================================

--- [1] 5x5 Multiplication Table Matrix Grid ---
   1   2   3   4   5
   2   4   6   8  10
   3   6   9  12  15
   4   8  12  16  20
   5  10  15  20  25

--- [2] Right-Angled Number Triangle Pattern ---
1 
1 2 
1 2 3 
1 2 3 4 
1 2 3 4 5 

--- [3] Centered Equilateral Star Pyramid ---
    *
   ***
  *****
 *******
*********

--- [4] Prime Numbers up to 30 (Optimized sqrt(N) Check) ---
Primes: 2 3 5 7 11 13 17 19 23 29 
===================================================================`}
          </pre>
        </div>
      </section>

      {/* 8. Common Pitfalls & Best Practices */}
      <section className="space-y-4 bg-rose-950/20 border border-rose-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2">
          <span>⚠️</span> Common Pitfalls &amp; Best Practices
        </h2>
        <ul className="list-disc pl-5 text-sm text-slate-300 space-y-2">
          <li><strong>Variable Collision:</strong> Using <code>i</code> for both outer and inner loops corrupts the counter and creates infinite loops. Always use distinct variables (<code>i</code>, <code>j</code>, <code>k</code>).</li>
          <li><strong>Forgetting the Newline:</strong> Omitting <code>printf("\n");</code> after the inner loop prints all pattern elements on a single continuous horizontal line!</li>
          <li><strong>Unoptimized Prime Checking:</strong> Testing divisors all the way to $N-1$ instead of $\sqrt&#123;N&#125;$ wastes massive CPU time on large numbers.</li>
        </ul>
      </section>

      {/* 9. Thinking & Hints Section */}
      <section className="space-y-4 bg-amber-950/20 border border-amber-900/40 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
          <span>🤔</span> Think About This...
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          How would you modify the centered pyramid pattern to print a hollow pyramid where only the boundary stars and the base stars are printed? What conditional expression determines if $(row, col)$ lies on a boundary?
        </p>
      </section>

      {/* 10. Comprehensive FAQ Section */}
      <section>
        <FAQTemplate title="Module 001_003 Topic 4 FAQs: Nested Loops & Patterns" questions={questions} />
      </section>

      {/* 11. Plain Text Printable Note Section */}
      <section>
        <PlainTextPrint
          content={noteText}
          title="Module 001_003 Topic 4 Note"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Printable Note"
          downloadFileName="module_001_003_topic4_note.txt"
        />
      </section>

      {/* 12. Teacher's Note Section */}
      <section>
        <Teacher note="Always draft your pattern coordinate grid (i for row, j for column) on a notebook before touching the keyboard! Clear mental coordinate mapping makes pattern coding easy! — Sukanta Hui" />
      </section>
    </div>
  );
}
