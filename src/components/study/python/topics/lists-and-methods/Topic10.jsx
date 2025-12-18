// src/components/study/python/lists/Topic10.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20";

export default class Topic10 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-cyan-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Reversing Lists: reverse() vs Slicing
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Reversing changes the order of elements.  
            Python provides <strong>two different approaches</strong> — one mutates, one copies.
          </p>
        </header>

        {/* ================= REVERSE METHOD ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ reverse() — In-Place Reversal
          </h3>

          <p className="text-slate-300 text-sm">
            <code>reverse()</code> reverses the list <strong>in-place</strong>.
          </p>

          <EditablePythonCodeBlock
            title="reverse() Example"
            initialCode={`nums = [1, 2, 3, 4]
nums.reverse()
print(nums)`}
          />

          <p className="text-slate-400 text-xs">
            ✔ Original list is modified  
            ❌ Returns <code>None</code>
          </p>
        </section>

        {/* ================= REVERSE SVG ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🔁 reverse() Visual
          </p>

          <svg viewBox="0 0 560 140" className="w-full h-36">
            {[4, 3, 2, 1].map((val, idx) => (
              <g
                key={idx}
                className="transition-transform duration-300 hover:-translate-y-2"
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

        {/* ================= SLICING ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-indigo-300">
            2️⃣ Slicing — Create a Reversed Copy
          </h3>

          <p className="text-slate-300 text-sm">
            Slicing with <code>[::-1]</code> returns a <strong>new reversed list</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Slicing Reverse Example"
            initialCode={`nums = [1, 2, 3, 4]
rev = nums[::-1]

print(rev)
print(nums)`}
          />
        </section>

        {/* ================= COMPARISON ================= */}
        <section
          className={`border border-violet-700 rounded-xl p-4 bg-violet-900/20 ${hoverCard}`}
        >
          <h3 className="text-violet-300 font-semibold">
            🔍 reverse() vs Slicing
          </h3>

          <ul className="text-violet-200 text-sm space-y-1">
            <li><code>reverse()</code> → modifies original list</li>
            <li><code>[::-1]</code> → creates new list</li>
            <li><code>reverse()</code> → memory efficient</li>
            <li><code>[::-1]</code> → safer when original order matters</li>
          </ul>
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
            initialCode={`nums = [1, 2, 3]
nums = nums.reverse()
print(nums)`}
          />

          <p className="text-red-200 text-sm">
            <code>reverse()</code> returns <code>None</code>.
          </p>
        </section>

        {/* ================= PERFORMANCE ================= */}
        <section
          className={`border border-amber-700 rounded-xl p-4 bg-amber-900/20 ${hoverCard}`}
        >
          <h3 className="text-amber-300 font-semibold">
            ⚡ Performance Insight
          </h3>

          <p className="text-amber-200 text-sm">
            ✔ <code>reverse()</code> is faster and memory efficient  
            ✔ Slicing uses extra memory
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-cyan-700 rounded-xl p-4 bg-cyan-900/20 ${hoverCard}`}
        >
          <h3 className="text-cyan-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-cyan-200 text-sm">
            ✔ Use <code>reverse()</code> when mutation is acceptable  
            ✔ Use slicing when original order must be preserved  
            ✔ Never assign result of <code>reverse()</code>
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic10 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li><code>reverse()</code> mutates the list</li>
            <li>Slicing returns a new reversed list</li>
            <li>Choose based on safety vs performance</li>
          </ul>
        </footer>

      </div>
    );
  }
}
