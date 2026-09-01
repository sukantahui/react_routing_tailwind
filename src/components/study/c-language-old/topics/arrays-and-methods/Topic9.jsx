import React from "react";
import clsx from "clsx";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import example1 from "./topic9_files/example1.c?raw";
import example2 from "./topic9_files/example2.c?raw";
import example3 from "./topic9_files/example3.c?raw";

// Inline keyframes for animations (scoped to this component)
const animationStyles = `
  @keyframes fade-slide-up {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const Topic9 = () => {
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
            Topic 9: Memory layout of 2D arrays (row‑major order concept)
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
            How two‑dimensional arrays are actually stored in memory – row by row – and why it matters for performance.
          </p>
        </section>

        {/* Conceptual explanation */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[100ms]">
          <h2 className="text-2xl font-medium mb-4">🧠 Row‑major order</h2>
          <p className="leading-relaxed">
            In C, 2D arrays are stored in <strong>row‑major order</strong>. This means that all elements of the first row are placed in consecutive memory locations, followed immediately by all elements of the second row, and so on. For an array declared as <code>int arr[3][4]</code>, the layout in memory is: <code>arr[0][0], arr[0][1], arr[0][2], arr[0][3], arr[1][0], …</code>
          </p>
          <p className="leading-relaxed mt-4">
            The address of element <code>arr[row][col]</code> can be computed as:
            <br />
            <code>base_address + (row * number_of_columns + col) * sizeof(element)</code>
            <br />
            This formula is used by the compiler to generate efficient code.
          </p>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
            <p className="text-sm font-medium">🏫 Real‑world analogy:</p>
            <p className="text-sm mt-1">
              At <strong>Barrackpore CNAT</strong>, imagine writing all students' marks subject‑wise on a long roll of paper. You write all marks for Student 1 (Math, Physics, Chemistry), then all marks for Student 2, etc. That's row‑major. If you wrote all students' Math marks first, then all Physics, that would be column‑major.
            </p>
          </div>
        </section>

        {/* SVG Illustration: memory layout */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[200ms]">
          <h2 className="text-2xl font-medium mb-4">🗺️ Row‑major memory layout</h2>
          <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl transition-all duration-300 hover:shadow-xl">
            <svg width="450" height="200" viewBox="0 0 450 200" className="max-w-full h-auto">
              {/* Row 0 boxes */}
              {[0,1,2,3].map((col) => (
                <g key={`r0c${col}`}>
                  <rect x={30 + col*60} y="30" width="50" height="30" fill="none" stroke="#3b82f6" strokeWidth="2" rx="2" />
                  <text x={30 + col*60 + 25} y="50" textAnchor="middle" fill="currentColor" fontSize="12">[0][{col}]</text>
                </g>
              ))}
              {/* Row 1 boxes */}
              {[0,1,2,3].map((col) => (
                <g key={`r1c${col}`}>
                  <rect x={30 + col*60} y="80" width="50" height="30" fill="none" stroke="#10b981" strokeWidth="2" rx="2" />
                  <text x={30 + col*60 + 25} y="100" textAnchor="middle" fill="currentColor" fontSize="12">[1][{col}]</text>
                </g>
              ))}
              {/* Row 2 boxes */}
              {[0,1,2,3].map((col) => (
                <g key={`r2c${col}`}>
                  <rect x={30 + col*60} y="130" width="50" height="30" fill="none" stroke="#ef4444" strokeWidth="2" rx="2" />
                  <text x={30 + col*60 + 25} y="150" textAnchor="middle" fill="currentColor" fontSize="12">[2][{col}]</text>
                </g>
              ))}
              {/* Address arrow for [1][2] */}
              <line x1="210" y1="170" x2="210" y2="135" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
              <text x="250" y="180" fill="#ef4444" fontSize="10">address = base + (1*4 + 2)*4</text>
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 Z" fill="#ef4444" />
                </marker>
              </defs>
            </svg>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center">
            Elements are stored row by row: all row0, then row1, then row2.
          </p>
        </section>

        {/* C code examples */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[300ms] space-y-6">
          <h2 className="text-2xl font-medium mb-4">💻 Exploring row‑major order in C</h2>

          <EditableCCodeBlock
            title="Example 1: Printing addresses to see row‑major layout"
            initialCode={example1}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            Notice that <code>&arr[0][3]</code> and <code>&arr[1][0]</code> are adjacent in memory.
          </p>

          <EditableCCodeBlock
            title="Example 2: Pointer arithmetic with 2D arrays"
            initialCode={example2}
          />

          <EditableCCodeBlock
            title="Example 3: Performance impact – row vs column traversal"
            initialCode={example3}
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 -mt-2">
            Row‑wise traversal is cache‑friendly and much faster for large arrays.
          </p>
        </section>

        {/* Tips & Tricks */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[400ms]">
          <h2 className="text-2xl font-medium mb-4">💡 Tips & Tricks (Professional habits)</h2>
          <ul className="list-disc list-inside space-y-2 leading-relaxed">
            <li><strong>{`Always traverse 2D arrays in row-major order`}</strong>{` (rows outer, columns inner) for better cache utilization.`}</li>
            <li><strong>When passing a 2D array to a function, you must specify the column dimension</strong> because the compiler needs it to compute offsets. Example: 
            <code>{`void func(int arr[][COLS], int rows)`}</code>.
            </li>
            <li><strong>Use pointer arithmetic carefully</strong>: <code>{`arr[i][j]</code> is equivalent to <code>*(*(arr + i) + j)`}</code>. The first dereference gives a pointer to the row.</li>
            <li><strong>If you need a contiguous block of memory for a matrix, consider using a 1D array and manual indexing</strong> – this can sometimes be more flexible.</li>
            <li><strong>For very large matrices, be aware of cache line sizes and alignment</strong> – but that's advanced.</li>
          </ul>
        </section>

        {/* Common Mistakes */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[500ms]">
          <h2 className="text-2xl font-medium mb-4">⚠️ Common Pitfalls (Beginner traps)</h2>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Assuming column‑major order</p>
              <p className="text-sm">Some languages (like Fortran) use column‑major. If you port code, the indexing formulas differ.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Incorrect pointer arithmetic on 2D array name</p>
              <p className="text-sm"><code>arr + 1</code> jumps by the size of one row (cols * element_size), not one element. This catches many beginners.</p>
            </div>
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
              <p className="font-medium">Forgetting column dimension in function parameters</p>
              <p className="text-sm">If you write <code>void func(int arr[][])</code>, the compiler doesn't know the row stride – you must specify the second dimension.</p>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[600ms]">
          <h2 className="text-2xl font-medium mb-4">✅ Best Practices (Write clean, safe code)</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>When processing 2D arrays, use nested loops with rows outer, columns inner.</li>
            <li>If you need to pass a 2D array to a function, define the column dimension as a constant or pass it as a parameter.</li>
            <li>Use <code>typedef</code> to create a matrix type with fixed dimensions for clarity.</li>
            <li>Document any non‑standard traversal orders (e.g., column‑wise for specific algorithms).</li>
            <li>For performance‑critical code, consider using a 1D array and computing index manually (<code>index = row * cols + col</code>) – it gives you control over the memory layout.</li>
          </ul>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[700ms] p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
          <h2 className="text-xl font-medium mb-2">📋 Mini Checklist – What to remember</h2>
          <ul className="list-check list-inside space-y-1">
            <li>✔️ C uses row‑major order for 2D arrays.</li>
            <li>✔️ Address formula: base + (row * cols + col) * element_size.</li>
            <li>✔️ Traverse rows outer, columns inner for cache efficiency.</li>
            <li>✔️ <code>arr + 1</code> advances by one row (cols elements).</li>
            <li>✔️ In function parameters, column dimension must be specified.</li>
          </ul>
        </section>

        {/* Hint Section */}
        <section className="animate-[fade-slide-up_0.6s_ease-out] motion-safe:animate animation-delay-[800ms] p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
          <h2 className="text-xl font-medium mb-2">🤔 Hint – Think like a programmer</h2>
          <p className="italic">
            “In Example 1, observe the address difference between <code>&arr[0][3]</code> and <code>&arr[1][0]</code>. Is it 4 bytes (size of int) or more? That tells you if the rows are tightly packed.”
          </p>
          <p className="italic mt-2">
            “Try swapping the loops in Example 3 to traverse column‑wise. For a large matrix, you'll see a significant slowdown due to cache misses.”
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
              💬 “At <strong>Naihati CNAT</strong>, I draw a long strip of paper and divide it into cells. Then I say: ‘If we write row0, then row1, then row2, we get row‑major. If we write col0, then col1, then col2, that's column‑major. C uses the first. This simple drawing helps students visualize why <code>matrix[1][2]</code> is found by skipping an entire row first.”
            </p>
            <p className="mt-2">
              🔍 <strong>Point to remember:</strong> Row‑major order isn't just a theoretical detail – it affects performance dramatically. Always iterate in the natural order unless you have a strong reason not to.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Topic9;