// src/components/study/python/lists/Topic17.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20";

export default class Topic17 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-cyan-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            List Unpacking & Starred Expressions
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            List unpacking lets you <strong>assign multiple values at once</strong>.
            Starred expressions (<code>*</code>) help capture remaining elements.
          </p>
        </header>

        {/* ================= BASIC UNPACKING ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Basic List Unpacking
          </h3>

          <EditablePythonCodeBlock
            title="Simple Unpacking"
            initialCode={`values = [10, 20, 30]

a, b, c = values
print(a, b, c)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Number of variables must match number of elements.
          </p>
        </section>

        {/* ================= ERROR CASE ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ Common Error
          </h3>

          <EditablePythonCodeBlock
            title="Too Many / Too Few Values"
            initialCode={`values = [1, 2, 3]

# a, b = values      # ❌ ValueError
# a, b, c, d = values  # ❌ ValueError`}
          />

          <p className="text-red-200 text-sm">
            Python raises <code>ValueError</code> if counts don’t match.
          </p>
        </section>

        {/* ================= STARRED EXPRESSION ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Starred Expression (<code>*</code>)
          </h3>

          <p className="text-slate-300 text-sm">
            The star collects <strong>remaining elements</strong> into a list.
          </p>

          <EditablePythonCodeBlock
            title="Using * to Capture Remaining Values"
            initialCode={`numbers = [1, 2, 3, 4, 5]

first, *rest = numbers
print(first)
print(rest)`}
          />
        </section>

        {/* ================= VISUAL ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            ✨ How Starred Unpacking Works (Hover)
          </p>

          <svg viewBox="0 0 520 120" className="w-full h-32">
            {[1, 2, 3, 4, 5].map((val, idx) => (
              <g
                key={idx}
                className="transition-all duration-300 hover:scale-110"
              >
                <rect
                  x={30 + idx * 90}
                  y={50}
                  width={70}
                  height={40}
                  rx={8}
                  fill={idx === 0 ? "#0f766e" : "#1e293b"}
                />
                <text
                  x={65 + idx * 90}
                  y={76}
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
            First value → variable, remaining → starred list
          </p>
        </section>

        {/* ================= STAR IN MIDDLE ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            3️⃣ Starred Expression in the Middle
          </h3>

          <EditablePythonCodeBlock
            title="Star in Middle"
            initialCode={`data = [10, 20, 30, 40, 50]

start, *middle, end = data
print(start)
print(middle)
print(end)`}
          />
        </section>

        {/* ================= MULTIPLE STARS ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ Invalid Usage
          </h3>

          <EditablePythonCodeBlock
            title="Only One Star Allowed"
            initialCode={`# ❌ Invalid
# a, *b, *c = [1, 2, 3, 4]`}
          />

          <p className="text-red-200 text-sm">
            Only <strong>one starred variable</strong> is allowed.
          </p>
        </section>

        {/* ================= FUNCTION RETURNS ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-green-300">
            4️⃣ Unpacking Function Return Values
          </h3>

          <EditablePythonCodeBlock
            title="Multiple Returns"
            initialCode={`def stats(numbers):
    return min(numbers), max(numbers), sum(numbers)

low, high, total = stats([4, 7, 2, 9])
print(low, high, total)`}
          />
        </section>

        {/* ================= LOOP UNPACKING ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-purple-300">
            5️⃣ Unpacking in Loops
          </h3>

          <EditablePythonCodeBlock
            title="Unpacking While Iterating"
            initialCode={`pairs = [(1, "A"), (2, "B"), (3, "C")]

for num, letter in pairs:
    print(num, letter)`}
          />
        </section>

        {/* ================= REAL WORLD ================= */}
        <section
          className={`border border-emerald-700 rounded-xl p-4 bg-emerald-900/20 ${hoverCard}`}
        >
          <h3 className="text-emerald-300 font-semibold">
            🌍 Real-World Example
          </h3>

          <EditablePythonCodeBlock
            title="CSV Row Processing"
            initialCode={`row = ["Ritaja", 92, 88, 91]

name, *marks = row
print(name)
print(marks)`}
          />
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-cyan-700 rounded-xl p-4 bg-cyan-900/20 ${hoverCard}`}
        >
          <h3 className="text-cyan-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-cyan-200 text-sm">
            ✔ Use unpacking for clarity  
            ✔ Starred expressions simplify slicing logic  
            ✔ Avoid clever but unreadable patterns
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic17 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Unpacking assigns multiple values at once</li>
            <li>* captures remaining elements</li>
            <li>Only one starred variable allowed</li>
          </ul>
        </footer>

      </div>
    );
  }
}
