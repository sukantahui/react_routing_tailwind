
// src/components/study/python/lists/Topic2.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20";

export default class Topic2 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Accessing Elements: Indexing & Slicing
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Once a list is created, the next critical skill is
            <strong> accessing its elements correctly</strong>.
          </p>
        </header>

        {/* ================= INDEXING ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Indexing in Lists
          </h3>

          <EditablePythonCodeBlock
            title="Basic Indexing"
            initialCode={`nums = [10, 20, 30, 40]

print(nums[0])
print(nums[2])`}
          />
        </section>

        {/* ================= SVG INDEX MAP ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🧭 Index Mapping (Hover Each Box)
          </p>

          <svg viewBox="0 0 520 160" className="w-full h-40">
            {[10, 20, 30, 40].map((val, idx) => (
              <g
                key={idx}
                className="transition-transform duration-300 hover:-translate-y-2"
              >
                <rect
                  x={40 + idx * 110}
                  y={50}
                  width={90}
                  height={50}
                  rx={8}
                  fill="#1e293b"
                />
                <text
                  x={85 + idx * 110}
                  y={75}
                  fill="#e5e7eb"
                  fontSize="13"
                  textAnchor="middle"
                >
                  {val}
                </text>
                <text
                  x={85 + idx * 110}
                  y={95}
                  fill="#94a3b8"
                  fontSize="11"
                  textAnchor="middle"
                >
                  index {idx}
                </text>
              </g>
            ))}
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Hover any box to feel index focus.
          </p>
        </section>

        {/* ================= INDEX ERROR ================= */}
        <section
          className={`space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20 ${hoverCard}`}
        >
          <h3 className="text-amber-300 font-semibold">
            ⚠️ IndexError (Hover to Highlight)
          </h3>

          <EditablePythonCodeBlock
            title="Index Out of Range"
            initialCode={`nums = [1, 2, 3]
print(nums[3])`}
          />
        </section>

        {/* ================= SLICING ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Slicing Lists
          </h3>

          <EditablePythonCodeBlock
            title="Basic Slicing"
            initialCode={`nums = [10, 20, 30, 40, 50]

print(nums[1:4])
print(nums[:3])
print(nums[2:])`}
          />
        </section>

        {/* ================= SLICE VISUAL ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            ✂️ Slice Highlight (Hover Green Area)
          </p>

          <svg viewBox="0 0 520 160" className="w-full h-40">
            {[10, 20, 30, 40, 50].map((val, idx) => (
              <g
                key={idx}
                className="transition-all duration-300 hover:scale-105"
              >
                <rect
                  x={30 + idx * 95}
                  y={50}
                  width={80}
                  height={50}
                  rx={8}
                  fill={idx >= 1 && idx <= 3 ? "#065f46" : "#1e293b"}
                />
                <text
                  x={70 + idx * 95}
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
            nums[1:4] → highlighted region
          </p>
        </section>

        {/* ================= STEP SLICING ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Slicing with Step
          </h3>

          <EditablePythonCodeBlock
            title="Step in Slicing"
            initialCode={`nums = [0,1,2,3,4,5,6]

print(nums[::2])
print(nums[1::2])`}
          />
        </section>

        {/* ================= COPY USING SLICE ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Copying Lists with Slicing
          </h3>

          <EditablePythonCodeBlock
            title="Safe Copy"
            initialCode={`a = [1, 2, 3]
b = a[:]

b[0] = 99
print(a)
print(b)`}
          />
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h3 className="text-indigo-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-indigo-200 text-sm">
            Indexing → single element  
            Slicing → always returns a new list
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic2 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Index starts at 0</li>
            <li>Out-of-range → IndexError</li>
            <li>Slicing returns new lists</li>
            <li>Slicing never mutates original data</li>
          </ul>
        </footer>

      </div>
    );
  }
}
