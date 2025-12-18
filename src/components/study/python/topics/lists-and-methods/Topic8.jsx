// src/components/study/python/lists/Topic8.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20";

export default class Topic8 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Sorting Lists: sort() vs sorted()
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Sorting organizes data.  
            Python offers two powerful ways — one modifies the list, the other creates a new one.
          </p>
        </header>

        {/* ================= SORT ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ sort() — In-Place Sorting
          </h3>

          <p className="text-slate-300 text-sm">
            <code>sort()</code> rearranges the list itself and returns <code>None</code>.
          </p>

          <EditablePythonCodeBlock
            title="sort() Example"
            initialCode={`nums = [4, 1, 3, 2]
nums.sort()
print(nums)`}
          />

          <p className="text-slate-400 text-xs">
            ✔ Original list is modified  
            ❌ No return value
          </p>
        </section>

        {/* ================= SORT SVG ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🔃 sort() Visual (In-Place)
          </p>

          <svg viewBox="0 0 560 140" className="w-full h-36">
            {[4, 1, 3, 2].sort((a, b) => a - b).map((val, idx) => (
              <g
                key={idx}
                className="transition-all duration-300 hover:scale-105"
              >
                <rect
                  x={40 + idx * 120}
                  y={50}
                  width={90}
                  height={40}
                  rx={10}
                  fill="#065f46"
                />
                <text
                  x={85 + idx * 120}
                  y={76}
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
            Elements are rearranged inside the same list.
          </p>
        </section>

        {/* ================= SORTED ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ sorted() — New Sorted List
          </h3>

          <p className="text-slate-300 text-sm">
            <code>sorted()</code> creates a <strong>new sorted list</strong>.
          </p>

          <EditablePythonCodeBlock
            title="sorted() Example"
            initialCode={`nums = [4, 1, 3, 2]
new_nums = sorted(nums)

print(new_nums)
print(nums)`}
          />
        </section>

        {/* ================= COMPARISON ================= */}
        <section
          className={`border border-violet-700 rounded-xl p-4 bg-violet-900/20 ${hoverCard}`}
        >
          <h3 className="text-violet-300 font-semibold">
            🔍 sort() vs sorted()
          </h3>

          <ul className="text-violet-200 text-sm space-y-1">
            <li><code>sort()</code> → modifies original list</li>
            <li><code>sorted()</code> → returns new list</li>
            <li><code>sort()</code> → method of list</li>
            <li><code>sorted()</code> → built-in function</li>
          </ul>
        </section>

        {/* ================= REVERSE SORT ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            🔁 Reverse Sorting
          </h3>

          <EditablePythonCodeBlock
            title="Reverse Sorting"
            initialCode={`nums = [5, 1, 4]
nums.sort(reverse=True)
print(nums)

print(sorted(nums, reverse=True))`}
          />
        </section>

        {/* ================= COMMON MISTAKE ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ Common Mistake
          </h3>

          <EditablePythonCodeBlock
            title="Wrong Usage"
            initialCode={`nums = [3, 2, 1]
nums = nums.sort()
print(nums)`}
          />

          <p className="text-red-200 text-sm">
            <code>sort()</code> returns <code>None</code>.
          </p>
        </section>

        {/* ================= STABILITY ================= */}
        <section
          className={`border border-emerald-700 rounded-xl p-4 bg-emerald-900/20 ${hoverCard}`}
        >
          <h3 className="text-emerald-300 font-semibold">
            📌 Stability Insight
          </h3>

          <p className="text-emerald-200 text-sm">
            Python sorting is <strong>stable</strong> —  
            equal elements retain their original order.
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h3 className="text-indigo-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-indigo-200 text-sm">
            ✔ Use <code>sort()</code> when you want to modify the list  
            ✔ Use <code>sorted()</code> when original order matters  
            ✔ For advanced sorting, use <code>key</code> (next topic)
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic8 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li><code>sort()</code> modifies list in-place</li>
            <li><code>sorted()</code> returns a new list</li>
            <li>Both support reverse sorting</li>
          </ul>
        </footer>

      </div>
    );
  }
}
