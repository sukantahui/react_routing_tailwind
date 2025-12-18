// src/components/study/python/lists/Topic6.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-sky-500/20";

export default class Topic6 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-sky-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Searching in Lists: in, index(), count()
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Searching means checking <strong>existence</strong>, finding
            <strong>position</strong>, or counting <strong>frequency</strong> of elements.
          </p>
        </header>

        {/* ================= IN OPERATOR ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Using <code>in</code> — Existence Check
          </h3>

          <p className="text-slate-300 text-sm">
            The <code>in</code> operator checks whether an element exists in a list.
          </p>

          <EditablePythonCodeBlock
            title="'in' Operator Example"
            initialCode={`nums = [10, 20, 30]

print(20 in nums)
print(40 in nums)`}
          />

          <p className="text-slate-400 text-xs">
            ✔ Returns <code>True</code> or <code>False</code>  
            ✔ Safest way to check existence
          </p>
        </section>

        {/* ================= IN SVG ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🔍 How <code>in</code> Works (Linear Search)
          </p>

          <svg viewBox="0 0 560 120" className="w-full h-32">
            {[10, 20, 30].map((val, idx) => (
              <g
                key={idx}
                className="transition-transform duration-300 hover:-translate-y-2"
              >
                <rect
                  x={60 + idx * 140}
                  y={40}
                  width={100}
                  height={40}
                  rx={10}
                  fill={val === 20 ? "#065f46" : "#1e293b"}
                />
                <text
                  x={110 + idx * 140}
                  y={66}
                  fill="#e5e7eb"
                  fontSize="14"
                  textAnchor="middle"
                >
                  {val}
                </text>
              </g>
            ))}
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Python checks elements one-by-one (O(n)).
          </p>
        </section>

        {/* ================= INDEX ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-indigo-300">
            2️⃣ index() — Find Position
          </h3>

          <p className="text-slate-300 text-sm">
            <code>index(value)</code> returns the <strong>index of the first occurrence</strong>.
          </p>

          <EditablePythonCodeBlock
            title="index() Example"
            initialCode={`nums = [5, 10, 15, 10]

print(nums.index(10))`}
          />

          <p className="text-slate-400 text-xs">
            ✔ Stops at first match  
            ❌ Raises <code>ValueError</code> if value not found
          </p>
        </section>

        {/* ================= SAFE INDEX ================= */}
        <section
          className={`border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h4 className="text-indigo-300 font-semibold mb-2">
            ✅ Safe index() Pattern
          </h4>

          <EditablePythonCodeBlock
            title="Safe index() Usage"
            initialCode={`nums = [1, 2, 3]

if 4 in nums:
    print(nums.index(4))
else:
    print("Not found")`}
          />
        </section>

        {/* ================= COUNT ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            3️⃣ count() — Frequency
          </h3>

          <p className="text-slate-300 text-sm">
            <code>count(value)</code> returns how many times a value appears.
          </p>

          <EditablePythonCodeBlock
            title="count() Example"
            initialCode={`nums = [1, 2, 2, 3, 2]

print(nums.count(2))`}
          />

          <p className="text-slate-400 text-xs">
            ✔ Always safe  
            ✔ Returns <code>0</code> if value not found
          </p>
        </section>

        {/* ================= REAL USE CASE ================= */}
        <section
          className={`border border-emerald-700 rounded-xl p-4 bg-emerald-900/20 ${hoverCard}`}
        >
          <h3 className="text-emerald-300 font-semibold">
            🌍 Real-World Example
          </h3>

          <EditablePythonCodeBlock
            title="Attendance Count Example"
            initialCode={`attendance = ["P", "A", "P", "P", "A"]

present = attendance.count("P")
absent = attendance.count("A")

print(present, absent)`}
          />
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ Common Mistakes
          </h3>

          <EditablePythonCodeBlock
            title="index() Error"
            initialCode={`nums = [1, 2, 3]
print(nums.index(5))`}
          />

          <p className="text-red-200 text-sm">
            Always check with <code>in</code> before using <code>index()</code>.
          </p>
        </section>

        {/* ================= PERFORMANCE NOTE ================= */}
        <section
          className={`border border-violet-700 rounded-xl p-4 bg-violet-900/20 ${hoverCard}`}
        >
          <h3 className="text-violet-300 font-semibold">
            ⚡ Performance Insight
          </h3>

          <p className="text-violet-200 text-sm">
            All list searches are <strong>O(n)</strong>.  
            For frequent lookups, consider <strong>sets</strong> or <strong>dictionaries</strong>.
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic6 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li><code>in</code> → existence check</li>
            <li><code>index()</code> → position (unsafe if missing)</li>
            <li><code>count()</code> → frequency</li>
            <li>All searches are linear</li>
          </ul>
        </footer>

      </div>
    );
  }
}
