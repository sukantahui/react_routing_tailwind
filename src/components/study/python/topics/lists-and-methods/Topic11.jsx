
// src/components/study/python/lists/Topic11.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20";

export default class Topic11 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            List Comprehension (Basics)
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            List comprehension provides a <strong>compact and readable</strong> way
            to create lists from existing iterables.
          </p>
        </header>

        {/* ================= TRADITIONAL WAY ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            1️⃣ Traditional Loop vs List Comprehension
          </h3>

          <EditablePythonCodeBlock
            title="Traditional Loop"
            initialCode={`squares = []
for i in range(5):
    squares.append(i * i)

print(squares)`}
          />

          <EditablePythonCodeBlock
            title="List Comprehension"
            initialCode={`squares = [i * i for i in range(5)]
print(squares)`}
          />

          <p className="text-slate-400 text-xs">
            ✔ Same result  
            ✔ Less code  
            ✔ More readable
          </p>
        </section>

        {/* ================= COMPREHENSION SYNTAX ================= */}
        <section
          className={`border border-sky-700 rounded-xl p-4 bg-sky-900/20 ${hoverCard}`}
        >
          <h3 className="text-sky-300 font-semibold">
            🧩 General Syntax
          </h3>

          <pre className="text-slate-200 text-sm mt-2">
            <code>[ expression for item in iterable ]</code>
          </pre>

          <p className="text-sky-200 text-sm mt-2">
            Python reads it left to right:
            <br />
            <strong>What to do</strong> → <strong>For whom</strong> → <strong>From where</strong>
          </p>
        </section>

        {/* ================= SIMPLE EXAMPLES ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-indigo-300">
            2️⃣ Simple Examples
          </h3>

          <EditablePythonCodeBlock
            title="Multiply Each Element"
            initialCode={`nums = [1, 2, 3, 4]
double = [x * 2 for x in nums]
print(double)`}
          />

          <EditablePythonCodeBlock
            title="Convert Strings to Uppercase"
            initialCode={`names = ["ritaja", "mounita"]
upper_names = [n.upper() for n in names]
print(upper_names)`}
          />
        </section>

        {/* ================= VISUAL ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🔁 How List Comprehension Works
          </p>

          <svg viewBox="0 0 560 140" className="w-full h-36">
            {[1, 2, 3].map((val, idx) => (
              <g
                key={idx}
                className="transition-all duration-300 hover:scale-105"
              >
                <rect
                  x={40 + idx * 160}
                  y={40}
                  width={120}
                  height={40}
                  rx={10}
                  fill="#065f46"
                />
                <text
                  x={100 + idx * 160}
                  y={66}
                  fill="#e5e7eb"
                  fontSize="14"
                  textAnchor="middle"
                >
                  {val} → {val * 2}
                </text>
              </g>
            ))}
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Each element is transformed and collected into a new list.
          </p>
        </section>

        {/* ================= COMMON MISTAKE ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ Common Mistake
          </h3>

          <EditablePythonCodeBlock
            title="Incorrect Syntax"
            initialCode={`# ❌ Wrong
nums = [x * 2 for x in range(5)]

# ✔ Correct
nums = [x * 2 for x in range(5)]
print(nums)`}
          />

          <p className="text-red-200 text-sm">
            List comprehension must be inside <code>[]</code>.
          </p>
        </section>

        {/* ================= WHEN TO USE ================= */}
        <section
          className={`border border-emerald-700 rounded-xl p-4 bg-emerald-900/20 ${hoverCard}`}
        >
          <h3 className="text-emerald-300 font-semibold">
            ✅ When to Use List Comprehension
          </h3>

          <ul className="text-emerald-200 text-sm list-disc list-inside space-y-1">
            <li>Simple transformations</li>
            <li>Readable one-line logic</li>
            <li>Creating new lists (not mutating)</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h3 className="text-indigo-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-indigo-200 text-sm">
            ✔ Prefer list comprehension over loops when logic is simple  
            ✔ Avoid nesting at beginner level  
            ✔ Readability is more important than compactness
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic11 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>List comprehension creates new lists</li>
            <li>More readable than loops for simple logic</li>
            <li>Use wisely — clarity first</li>
          </ul>
        </footer>

      </div>
    );
  }
}
