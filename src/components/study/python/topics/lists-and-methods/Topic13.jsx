// src/components/study/python/lists/Topic13.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20";

export default class Topic13 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-purple-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Nested List Comprehensions
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Nested list comprehensions allow you to work with
            <strong> lists inside lists</strong> using a compact syntax.
          </p>

          <p className="text-slate-400 text-sm">
            ⚠ Powerful feature — misuse can destroy readability.
          </p>
        </header>

        {/* ================= BASIC IDEA ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ What Does “Nested” Mean?
          </h3>

          <p className="text-slate-300 text-sm">
            A nested list comprehension contains <strong>more than one for-loop</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Flatten a 2D List"
            initialCode={`matrix = [[1, 2], [3, 4], [5, 6]]

flat = [num for row in matrix for num in row]
print(flat)`}
          />
        </section>

        {/* ================= VISUAL ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🧩 How Flattening Works (Hover)
          </p>

          <svg viewBox="0 0 600 160" className="w-full h-40">
            {[
              [1, 2],
              [3, 4],
              [5, 6],
            ].map((row, rIdx) =>
              row.map((val, cIdx) => (
                <g
                  key={`${rIdx}-${cIdx}`}
                  className="transition-all duration-300 hover:scale-110"
                >
                  <rect
                    x={40 + cIdx * 80 + rIdx * 160}
                    y={60}
                    width={60}
                    height={40}
                    rx={8}
                    fill="#312e81"
                  />
                  <text
                    x={70 + cIdx * 80 + rIdx * 160}
                    y={86}
                    fill="#e5e7eb"
                    fontSize="13"
                    textAnchor="middle"
                  >
                    {val}
                  </text>
                </g>
              ))
            )}
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Outer loop → rows, Inner loop → elements
          </p>
        </section>

        {/* ================= EQUIVALENT LOOP ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Equivalent Normal Loop (Clarity)
          </h3>

          <EditablePythonCodeBlock
            title="Same Logic Without Comprehension"
            initialCode={`matrix = [[1, 2], [3, 4], [5, 6]]

flat = []
for row in matrix:
    for num in row:
        flat.append(num)

print(flat)`}
          />

          <p className="text-slate-400 text-sm">
            If comprehension is harder to read than this — don’t use it.
          </p>
        </section>

        {/* ================= WITH CONDITION ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            3️⃣ Nested Comprehension with Condition
          </h3>

          <EditablePythonCodeBlock
            title="Filter While Flattening"
            initialCode={`matrix = [[1, 2], [3, 4], [5, 6]]

even_numbers = [
    num
    for row in matrix
    for num in row
    if num % 2 == 0
]

print(even_numbers)`}
          />
        </section>

        {/* ================= MULTI-DIMENSION ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-pink-300">
            4️⃣ 2D Structure Creation
          </h3>

          <EditablePythonCodeBlock
            title="Create Multiplication Table"
            initialCode={`table = [
    [i * j for j in range(1, 4)]
    for i in range(1, 4)
]

print(table)`}
          />
        </section>

        {/* ================= READABILITY RULES ================= */}
        <section
          className={`border border-yellow-700 rounded-xl p-4 bg-yellow-900/20 ${hoverCard}`}
        >
          <h3 className="text-yellow-300 font-semibold">
            📏 Readability Rules (VERY IMPORTANT)
          </h3>

          <ul className="list-disc list-inside text-yellow-200 text-sm space-y-2">
            <li>✔ Max 2 nested loops</li>
            <li>✔ Break lines for clarity</li>
            <li>✔ Avoid deep conditions</li>
            <li>❌ Never nest 3+ loops</li>
          </ul>
        </section>

        {/* ================= BAD EXAMPLE ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ Bad Practice Example
          </h3>

          <EditablePythonCodeBlock
            title="Unreadable Comprehension"
            initialCode={`# ❌ Hard to read — avoid
result = [x for a in data for b in a if b > 0 for x in b if x % 2 == 0]`}
          />

          <p className="text-red-200 text-sm">
            This should be written using normal loops.
          </p>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section
          className={`border border-emerald-700 rounded-xl p-4 bg-emerald-900/20 ${hoverCard}`}
        >
          <h3 className="text-emerald-300 font-semibold">
            🌍 Real-World Example
          </h3>

          <EditablePythonCodeBlock
            title="Extract Scores Above Threshold"
            initialCode={`students = [
    [45, 78, 90],
    [33, 56, 88],
    [100, 67]
]

top_scores = [score for marks in students for score in marks if score >= 80]
print(top_scores)`}
          />
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-purple-700 rounded-xl p-4 bg-purple-900/20 ${hoverCard}`}
        >
          <h3 className="text-purple-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-purple-200 text-sm">
            ✔ Use nested comprehensions for simple data transforms  
            ✔ Prefer clarity over cleverness  
            ✔ Readability is more important than one-line code
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic13 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Nested comprehensions use multiple for-loops</li>
            <li>Best for flattening and simple transforms</li>
            <li>Avoid deep nesting</li>
          </ul>
        </footer>

      </div>
    );
  }
}
