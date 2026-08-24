
// src/components/study/python/lists/Topic4.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20";

export default class Topic4 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-emerald-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Mutating Operations: append(), insert(), extend()
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Lists are <strong>mutable</strong>.  
            These methods <strong>modify the same list</strong> instead of creating a new one.
          </p>
        </header>

        {/* ================= APPEND ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            1️⃣ append() — Add at the End
          </h3>

          <p className="text-slate-300 text-sm">
            <code>append()</code> adds exactly <strong>one element</strong> to the end of a list.
          </p>

          <EditablePythonCodeBlock
            title="append() Example"
            initialCode={`nums = [1, 2, 3]
nums.append(4)
print(nums)`}
          />
        </section>

        {/* ================= APPEND SVG ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            ➕ append() Visual
          </p>

          <svg viewBox="0 0 560 120" className="w-full h-32">
            {[1, 2, 3, 4].map((val, idx) => (
              <g
                key={idx}
                className="transition-transform duration-300 hover:-translate-y-2"
              >
                <rect
                  x={40 + idx * 120}
                  y={40}
                  width={90}
                  height={40}
                  rx={10}
                  fill={idx === 3 ? "#065f46" : "#1e293b"}
                />
                <text
                  x={85 + idx * 120}
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
            New element is always added at the end.
          </p>
        </section>

        {/* ================= INSERT ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            2️⃣ insert() — Add at a Specific Position
          </h3>

          <p className="text-slate-300 text-sm">
            <code>insert(index, value)</code> adds an element at a chosen position.
          </p>

          <EditablePythonCodeBlock
            title="insert() Example"
            initialCode={`nums = [10, 20, 40]
nums.insert(2, 30)
print(nums)`}
          />
        </section>

        {/* ================= INSERT SVG ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            📌 insert() Visual
          </p>

          <svg viewBox="0 0 560 140" className="w-full h-36">
            {[10, 20, 30, 40].map((val, idx) => (
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
                  fill={idx === 2 ? "#7c2d12" : "#1e293b"}
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
            Elements shift right to make space.
          </p>
        </section>

        {/* ================= EXTEND ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            3️⃣ extend() — Add Multiple Elements
          </h3>

          <p className="text-slate-300 text-sm">
            <code>extend()</code> adds elements from another iterable one-by-one.
          </p>

          <EditablePythonCodeBlock
            title="extend() Example"
            initialCode={`a = [1, 2]
b = [3, 4]
a.extend(b)
print(a)`}
          />
        </section>

        {/* ================= APPEND vs EXTEND ================= */}
        <section
          className={`space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h3 className="text-indigo-300 font-semibold">
            ⚠️ append() vs extend()
          </h3>

          <EditablePythonCodeBlock
            title="Difference Between append() and extend()"
            initialCode={`nums = [1, 2]

nums.append([3, 4])
print(nums)

nums = [1, 2]
nums.extend([3, 4])
print(nums)`}
          />

          <p className="text-indigo-200 text-sm">
            ✔ <code>append()</code> adds as a single element  
            ✔ <code>extend()</code> spreads elements
          </p>
        </section>

        {/* ================= RETURN VALUE ================= */}
        <section
          className={`space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20 ${hoverCard}`}
        >
          <h3 className="text-amber-300 font-semibold">
            ⚠️ Important Rule
          </h3>

          <EditablePythonCodeBlock
            title="Mutation Methods Return None"
            initialCode={`nums = [1, 2, 3]
result = nums.append(4)
print(result)`}
          />

          <p className="text-amber-200 text-sm">
            These methods <strong>modify the list</strong> and return <code>None</code>.
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`space-y-4 border border-emerald-700 rounded-xl p-4 bg-emerald-900/20 ${hoverCard}`}
        >
          <h3 className="text-emerald-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-emerald-200 text-sm">
            Beginners often write:
            <br />
            <code>nums = nums.append(5)</code> ❌  
            <br />
            This is one of the <strong>most common Python list mistakes</strong>.
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic4 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li><code>append()</code> → add one element</li>
            <li><code>insert()</code> → add at position</li>
            <li><code>extend()</code> → add multiple elements</li>
            <li>All mutate the original list</li>
          </ul>
        </footer>

      </div>
    );
  }
}
