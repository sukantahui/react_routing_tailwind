
// src/components/study/python/lists/Topic3.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20";

export default class Topic3 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Negative Indexing & Slicing Tricks
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Python allows accessing list elements not only from the beginning,
            but also from the <strong>end</strong> using negative indexes.
          </p>
        </header>

        {/* ================= NEGATIVE INDEXING ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Negative Indexing
          </h3>

          <p className="text-slate-300 text-sm">
            Negative indexes start counting from the <strong>right side</strong>
            of the list.
          </p>

          <EditablePythonCodeBlock
            title="Negative Indexing Example"
            initialCode={`nums = [10, 20, 30, 40]

print(nums[-1])   # last element
print(nums[-2])   # second last element`}
          />
        </section>

        {/* ================= SVG NEGATIVE INDEX MAP ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🔁 Positive vs Negative Indexing (Hover Boxes)
          </p>

          <svg viewBox="0 0 560 180" className="w-full h-44">
            {[10, 20, 30, 40].map((val, idx) => {
              const neg = idx - 4;
              return (
                <g
                  key={idx}
                  className="transition-transform duration-300 hover:-translate-y-2"
                >
                  <rect
                    x={40 + idx * 120}
                    y={60}
                    width={100}
                    height={50}
                    rx={10}
                    fill="#1e293b"
                  />
                  <text
                    x={90 + idx * 120}
                    y={85}
                    fill="#e5e7eb"
                    fontSize="13"
                    textAnchor="middle"
                  >
                    {val}
                  </text>
                  <text
                    x={90 + idx * 120}
                    y={105}
                    fill="#94a3b8"
                    fontSize="11"
                    textAnchor="middle"
                  >
                    {idx} / {neg}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Format: positive index / negative index
          </p>
        </section>

        {/* ================= WHY USE ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Why Negative Indexing Is Useful
          </h3>

          <EditablePythonCodeBlock
            title="Cleaner Code with Negative Indexing"
            initialCode={`data = [100, 200, 300, 400]

# Without negative index
print(data[len(data) - 1])

# With negative index
print(data[-1])`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Shorter  
            ✔ Cleaner  
            ✔ Less error-prone
          </p>
        </section>

        {/* ================= NEGATIVE SLICING ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Negative Slicing
          </h3>

          <p className="text-slate-300 text-sm">
            Negative slicing extracts elements relative to the end of the list.
          </p>

          <EditablePythonCodeBlock
            title="Negative Slicing Examples"
            initialCode={`nums = [10, 20, 30, 40, 50]

print(nums[-3:])     # last 3 elements
print(nums[:-2])     # all except last 2
print(nums[-4:-1])   # middle slice`}
          />
        </section>

        {/* ================= SLICE VISUAL ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            ✂️ Negative Slice Visualization
          </p>

          <svg viewBox="0 0 560 160" className="w-full h-40">
            {[10, 20, 30, 40, 50].map((val, idx) => (
              <g
                key={idx}
                className="transition-all duration-300 hover:scale-105"
              >
                <rect
                  x={30 + idx * 100}
                  y={50}
                  width={85}
                  height={50}
                  rx={8}
                  fill={idx >= 2 && idx <= 3 ? "#065f46" : "#1e293b"}
                />
                <text
                  x={72 + idx * 100}
                  y={80}
                  fill="#e5e7eb"
                  fontSize="13"
                  textAnchor="middle"
                >
                  {val}
                </text>
              </g>
            ))}
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Highlight shows <code>nums[-4:-1]</code>
          </p>
        </section>

        {/* ================= REVERSE TRICK ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Reverse List Using Slicing
          </h3>

          <EditablePythonCodeBlock
            title="Reverse with Negative Step"
            initialCode={`nums = [1, 2, 3, 4, 5]
print(nums[::-1])`}
          />

          <p className="text-slate-400 text-sm">
            Step = <strong>-1</strong> walks the list backwards.
          </p>
        </section>

        {/* ================= COMMON ERRORS ================= */}
        <section
          className={`space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20 ${hoverCard}`}
        >
          <h3 className="text-amber-300 font-semibold">
            ⚠️ Common Mistakes
          </h3>

          <EditablePythonCodeBlock
            title="Mistakes with Negative Indexing"
            initialCode={`nums = [1, 2, 3]

print(nums[-4])   # ❌ IndexError`}
          />

          <p className="text-amber-200 text-sm">
            Negative indexes still must be within valid range.
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h3 className="text-indigo-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-indigo-200 text-sm">
            Professionals heavily use <code>-1</code> and
            <code>[:-1]</code> patterns — master them early.
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic3 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Negative indexing starts from the end</li>
            <li>-1 always means last element</li>
            <li>Negative slicing is powerful and concise</li>
            <li>Reverse lists using <code>[::-1]</code></li>
          </ul>
        </footer>

      </div>
    );
  }
}
