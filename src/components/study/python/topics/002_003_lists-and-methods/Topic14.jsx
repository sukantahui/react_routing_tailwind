// src/components/study/python/lists/Topic14.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-teal-500/20";

export default class Topic14 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-teal-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Nested Lists & 2D Data Structures
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            A nested list is a <strong>list containing other lists</strong>.
            This allows Python to represent <strong>2D data</strong> like tables and grids.
          </p>
        </header>

        {/* ================= BASIC NESTED LIST ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ What Is a Nested List?
          </h3>

          <EditablePythonCodeBlock
            title="Simple Nested List"
            initialCode={`matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix)`}
          />

          <p className="text-slate-400 text-sm">
            Each inner list represents a <strong>row</strong>.
          </p>
        </section>

        {/* ================= VISUAL GRID ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🧱 2D Structure Visualization (Hover)
          </p>

          <svg viewBox="0 0 360 160" className="w-full h-40">
            {[0, 1, 2].map((row) =>
              [0, 1, 2].map((col) => (
                <g
                  key={`${row}-${col}`}
                  className="transition-all duration-300 hover:scale-110"
                >
                  <rect
                    x={60 + col * 80}
                    y={30 + row * 40}
                    width={60}
                    height={30}
                    rx={6}
                    fill="#0f766e"
                  />
                  <text
                    x={90 + col * 80}
                    y={50 + row * 40}
                    fill="#e5e7eb"
                    fontSize="12"
                    textAnchor="middle"
                  >
                    [{row},{col}]
                  </text>
                </g>
              ))
            )}
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Access pattern → <code>matrix[row][column]</code>
          </p>
        </section>

        {/* ================= ACCESSING ELEMENTS ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Accessing Elements
          </h3>

          <EditablePythonCodeBlock
            title="Access Using Double Index"
            initialCode={`matrix = [
    [10, 20, 30],
    [40, 50, 60]
]

print(matrix[0][1])   # 20
print(matrix[1][2])   # 60`}
          />
        </section>

        {/* ================= ITERATION ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            3️⃣ Iterating Through a 2D List
          </h3>

          <EditablePythonCodeBlock
            title="Row-wise Iteration"
            initialCode={`matrix = [
    [1, 2, 3],
    [4, 5, 6]
]

for row in matrix:
    for value in row:
        print(value, end=" ")
    print()`}
          />
        </section>

        {/* ================= MODIFYING ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-pink-300">
            4️⃣ Modifying Nested Lists
          </h3>

          <EditablePythonCodeBlock
            title="Update an Element"
            initialCode={`matrix = [[1, 2], [3, 4]]

matrix[1][0] = 99
print(matrix)`}
          />

          <p className="text-slate-400 text-sm">
            Lists are mutable — changes affect the structure directly.
          </p>
        </section>

        {/* ================= COMMON PITFALL ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ Common Pitfall: Shallow Copy Trap
          </h3>

          <EditablePythonCodeBlock
            title="Wrong Way to Create 2D List"
            initialCode={`grid = [[0]*3]*3
grid[0][0] = 1
print(grid)`}
          />

          <p className="text-red-200 text-sm">
            All rows refer to the <strong>same list</strong>.
          </p>
        </section>

        {/* ================= CORRECT WAY ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-green-300">
            ✔ Correct Way to Create 2D List
          </h3>

          <EditablePythonCodeBlock
            title="Safe 2D List Creation"
            initialCode={`grid = [[0 for _ in range(3)] for _ in range(3)]
grid[0][0] = 1
print(grid)`}
          />
        </section>

        {/* ================= REAL WORLD ================= */}
        <section
          className={`border border-emerald-700 rounded-xl p-4 bg-emerald-900/20 ${hoverCard}`}
        >
          <h3 className="text-emerald-300 font-semibold">
            🌍 Real-World Use Cases
          </h3>

          <ul className="list-disc list-inside text-emerald-200 text-sm space-y-1">
            <li>Chess boards / game grids</li>
            <li>Student marks table</li>
            <li>Image pixels</li>
            <li>Matrix operations</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-teal-700 rounded-xl p-4 bg-teal-900/20 ${hoverCard}`}
        >
          <h3 className="text-teal-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-teal-200 text-sm">
            ✔ Always visualize rows and columns  
            ✔ Be careful with shallow copies  
            ✔ Nested lists = foundation for real-world data
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic14 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Nested lists represent 2D data</li>
            <li>Access using <code>[row][col]</code></li>
            <li>Avoid shallow copy mistakes</li>
          </ul>
        </footer>

      </div>
    );
  }
}
