// src/components/study/python/lists/Topic9.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-fuchsia-500/20";

export default class Topic9 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-fuchsia-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Custom Sorting Using key Functions
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Real-world data rarely sorts naturally.  
            The <code>key</code> function tells Python <strong>what to compare</strong>.
          </p>
        </header>

        {/* ================= SIMPLE KEY ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Sorting by Length
          </h3>

          <p className="text-slate-300 text-sm">
            Sort strings based on their length using <code>len</code>.
          </p>

          <EditablePythonCodeBlock
            title="Sort by Length"
            initialCode={`words = ["python", "is", "fun"]
words.sort(key=len)
print(words)`}
          />
        </section>

        {/* ================= KEY SVG ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🔑 How key Works
          </p>

          <svg viewBox="0 0 560 140" className="w-full h-36">
            {[
              { w: "python", k: 6 },
              { w: "is", k: 2 },
              { w: "fun", k: 3 },
            ]
              .sort((a, b) => a.k - b.k)
              .map((item, idx) => (
                <g
                  key={idx}
                  className="transition-all duration-300 hover:scale-105"
                >
                  <rect
                    x={40 + idx * 170}
                    y={40}
                    width={130}
                    height={40}
                    rx={10}
                    fill="#312e81"
                  />
                  <text
                    x={105 + idx * 170}
                    y={66}
                    fill="#e5e7eb"
                    fontSize="13"
                    textAnchor="middle"
                  >
                    {item.w} → {item.k}
                  </text>
                </g>
              ))}
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Python sorts using the key values, not the original items.
          </p>
        </section>

        {/* ================= SORTED WITH KEY ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Using sorted() with key
          </h3>

          <EditablePythonCodeBlock
            title="sorted() + key"
            initialCode={`words = ["apple", "kiwi", "banana"]

result = sorted(words, key=len)
print(result)
print(words)`}
          />
        </section>

        {/* ================= SORT NUMBERS ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            3️⃣ Sorting by Absolute Value
          </h3>

          <EditablePythonCodeBlock
            title="Sort by Absolute Value"
            initialCode={`nums = [-5, 3, -1, 2]
nums.sort(key=abs)
print(nums)`}
          />
        </section>

        {/* ================= SORT DICTIONARY DATA ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-indigo-300">
            4️⃣ Sorting Complex Data (Tuples)
          </h3>

          <EditablePythonCodeBlock
            title="Sort Tuples by Second Value"
            initialCode={`data = [(1, 3), (4, 1), (2, 2)]
data.sort(key=lambda x: x[1])
print(data)`}
          />
        </section>

        {/* ================= LAMBDA ================= */}
        <section
          className={`border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h4 className="text-indigo-300 font-semibold mb-2">
            ✨ Why lambda?
          </h4>

          <p className="text-indigo-200 text-sm">
            <code>lambda</code> creates a tiny function used once for sorting.
          </p>
        </section>

        {/* ================= MULTI KEY ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            5️⃣ Multi-level Sorting
          </h3>

          <EditablePythonCodeBlock
            title="Sort by Multiple Fields"
            initialCode={`students = [
    ("Ritaja", 90),
    ("Mounita", 90),
    ("Swadeep", 85)
]

students.sort(key=lambda x: (-x[1], x[0]))
print(students)`}
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
            title="Wrong Key Usage"
            initialCode={`nums = [3, 1, 2]
nums.sort(key=nums[0])
print(nums)`}
          />

          <p className="text-red-200 text-sm">
            <code>key</code> must be a function, not a value.
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
            Key functions are called <strong>once per element</strong>,  
            making custom sorting efficient.
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-fuchsia-700 rounded-xl p-4 bg-fuchsia-900/20 ${hoverCard}`}
        >
          <h3 className="text-fuchsia-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-fuchsia-200 text-sm">
            ✔ Always think: “What am I comparing?”  
            ✔ Keep key logic simple  
            ✔ Avoid complex lambdas — readability matters
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic9 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li><code>key</code> controls sorting logic</li>
            <li>Works with both <code>sort()</code> and <code>sorted()</code></li>
            <li>Essential for real-world data</li>
          </ul>
        </footer>

      </div>
    );
  }
}
