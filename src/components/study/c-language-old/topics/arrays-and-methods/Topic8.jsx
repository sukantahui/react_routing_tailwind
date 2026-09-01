import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic8_files/example1.c?raw";
import example2 from "./topic8_files/example2.c?raw";
import example3 from "./topic8_files/example3.c?raw";

// Inline keyframes for animations (scoped to this component)
const animationStyles = `
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic8 = () => {
  // Calculate teacher's experience dynamically
  const startYear = 1998;
  const currentYear = new Date().getFullYear();
  const experienceYears = currentYear - startYear;

  return (
    <div className="dark" style={{ backgroundColor: "#121212" }}> {/* dark mode default */}
      <style>{animationStyles}</style>
      <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        
        {/* Title section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate">
          <h1 className="text-4xl font-light tracking-tight leading-tight">
            Topic 8: Introduction to two‑dimensional arrays for tables and matrices
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            How to store and work with grid‑like data using arrays with two indices.
          </p>
        </section>

        {/* Conceptual explanation */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[100ms]">
          <h2 className="text-2xl font-medium mb-4">📊 What is a 2D array?</h2>
          <p className="leading-relaxed">
            A two‑dimensional array is essentially an array of arrays. It can be visualized as a table with rows and columns. In C, we declare it as <code>type name[rows][columns];</code>. For example, <code>int matrix[3][4];</code> creates a 3×4 grid (3 rows, 4 columns) of integers.
          </p>
          <p className="leading-relaxed mt-4">
            To access an element, we use two indices: <code>matrix[row][col]</code>. The first index selects the row, the second the column. Rows and columns are zero‑indexed, just like 1D arrays. This structure is perfect for representing matrices, game boards, spreadsheets, and tabular data.
          </p>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <p className="text-sm font-medium">🏫 Real‑world analogy:</p>
            <p className="text-sm mt-1">
              At <strong>Barrackpore CNAT</strong>, attendance is recorded in a grid: each row is a student (Swadeep, Tuhina, Abhronila…), each column is a day of the week. To find if Debangshu was present on Wednesday, you'd look at row 3, column 2. That's a 2D array.
            </p>
          </div>
        </section>

        {/* SVG Illustration: 2D array grid */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[200ms]">
          <h2 className="text-2xl font-medium mb-4">🧩 Visualizing a 2D array</h2>
          <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-xl">
            <svg width="300" height="200" viewBox="0 0 300 200" className="max-w-full h-auto">
              {/* Draw grid 3x4 */}
              {[0,1,2].map(row => (
                [0,1,2,3].map(col => {
                  const x = 40 + col * 50;
                  const y = 40 + row * 40;
                  return (
                    <g key={`${row}-${col}`}>
                      <rect x={x} y={y} width="40" height="30" fill="none" stroke="#3b82f6" strokeWidth="2" rx="2" />
                      <text x={x+20} y={y+18} textAnchor="middle" fill="currentColor" fontSize="12">
                        {row*4+col+1}
                      </text>
                      {row === 0 && col === 0 && (
                        <>
                          <text x={x-15} y={y+18} fill="#ef4444" fontSize="10">[0][0]</text>
                          <line x1={x-5} y1={y+15} x2={x} y2={y+15} stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow)" />
                        </>
                      )}
                    </g>
                  );
                })
              ))}
              {/* Row and column labels */}
              <text x="20" y="30" fill="#888" fontSize="10">Row 0</text>
              <text x="20" y="70" fill="#888" fontSize="10">Row 1</text>
              <text x="20" y="110" fill="#888" fontSize="10">Row 2</text>
              <text x="60" y="20" fill="#888" fontSize="10">Col0</text>
              <text x="110" y="20" fill="#888" fontSize="10">Col1</text>
              <text x="160" y="20" fill="#888" fontSize="10">Col2</text>
              <text x="210" y="20" fill="#888" fontSize="10">Col3</text>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            A 3×4 matrix: element at row 0, column 0 is highlighted.
          </p>
        </section>

        {/* C code examples */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[300ms] space-y-6">
          <h2 className="text-2xl font-medium mb-4">💻 2D arrays in C</h2>

          <EditableCCodeBlock
            title="Example 1: Declaring and printing a 2D array"
            initialCode={example1}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            Nested loops are used to traverse rows and columns.
          </p>

          <EditableCCodeBlock
            title="Example 2: Accessing and modifying elements"
            initialCode={example2}
          />

          <EditableCCodeBlock
            title="Example 3: Summing all elements (matrix total)"
            initialCode={example3}
          />
        </section>

        {/* Tips & Tricks */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[400ms]">
          <h2 className="text-2xl font-medium mb-4">💡 Tips & Tricks (Professional habits)</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li><strong>Always think rows first, then columns</strong> – the first index is the row, second is the column. Consistency avoids confusion.</li>
            <li><strong>Use nested loops with clear variable names</strong>: <code>for (int row = 0; row &lt; ROWS; row++)</code> and <code>for (int col = 0; col &lt; COLS; col++)</code>.</li>
            <li><strong>Initialize 2D arrays with braces</strong>: 
                <code>
                    {`int matrix[2][3] = {{1,2,3}, {4,5,6}};`}
                </code> – the inner braces are optional but improve readability.</li>
            <li><strong>When passing 2D arrays to functions, you must specify the column size</strong> (or use pointers to pointers, but that's advanced).</li>
            <li><strong>For large matrices, consider memory layout</strong> (row‑major order) – accessing elements in row order is cache‑friendly.</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[500ms]">
          <h2 className="text-2xl font-medium mb-4">⚠️ Common Pitfalls (Beginner traps)</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Confusing row and column order</p>
              <p className="text-sm">Declaring <code>int arr[3][4]</code> means 3 rows, 4 columns. Accessing <code>arr[4][3]</code> is out of bounds.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Forgetting that 2D arrays are stored row‑major</p>
              <p className="text-sm">This matters for performance and when using pointer casts, but beginners can ignore for now.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Incorrect initialization syntax</p>
              <p className="text-sm"><code>int arr[2][3] = {1,2,3,4,5,6};</code> works but is less clear. Missing inner braces can lead to wrong values.</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[600ms]">
          <h2 className="text-2xl font-medium mb-4">✅ Best Practices (Write clean, safe code)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Use named constants for rows and columns (<code>#define ROWS 3</code>).</li>
            <li>When initializing, use nested braces for clarity: <code>{`{{1,2,3}, {4,5,6}}`}</code>.</li>
            <li>In loops, iterate rows in outer loop and columns in inner loop for natural access.</li>
            <li>If a function modifies a 2D array, pass rows and cols as parameters.</li>
            <li>For fixed‑size 2D arrays, consider using <code>typedef</code> to create a matrix type.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[700ms] p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <h2 className="text-xl font-medium mb-2">📋 Mini Checklist – What to remember</h2>
          <ul className="list-check list-inside space-y-1">
            <li>✔️ Declaration: <code>type name[rows][cols];</code></li>
            <li>✔️ Access: <code>name[row][col]</code> (0‑based).</li>
            <li>✔️ Nested loops are used for traversal.</li>
            <li>✔️ Initialization with braces: <code>{`{{r0c0, r0c1}, {r1c0, r1c1}}`}</code>.</li>
            <li>✔️ Think rows first, columns second.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[800ms] p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <h2 className="text-xl font-medium mb-2">🤔 Hint – Think like a programmer</h2>
          <p className="italic">
            “If you have a 2D array <code>int marks[3][4]</code>, how would you access the element in the 2nd row and 3rd column? (Remember zero‑based: that's <code>marks[1][2]</code>.)”
          </p>
          <p className="italic mt-2">
            “Try modifying Example 1 to print the matrix in column‑major order (columns outer loop, rows inner). What changes?”
          </p>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[900ms] p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-medium mb-2">🧑‍🏫 Teacher's Note – Sukanta Hui</h2>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Sukanta Hui</strong> (email: <a href="mailto:sukantahui@codernaccotax.co.in" className="underline">sukantahui@codernaccotax.co.in</a>, mobile: 7003756860) has been teaching programming for <strong>{experienceYears} years</strong> (since 1998). His expertise spans Programming Languages, RDBMS, Operating Systems, and Web Development.
            </p>
            <p className="mt-2">
              💬 “At <strong>Naihati CNAT</strong>, I draw a grid on the board and label rows with student names and columns with subjects. Then I ask: ‘Where is Tuhina's Physics mark?’ They quickly say row 2, column 3. That’s the essence of 2D arrays – a natural way to store tabular data.”
            </p>
            <p className="mt-2">
              🔍 <strong>Point to remember:</strong> Nested loops are the key to processing 2D arrays. The outer loop runs through rows, the inner through columns – it's like reading a book line by line.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic8;