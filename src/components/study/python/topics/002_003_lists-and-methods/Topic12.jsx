// src/components/study/python/lists/Topic12.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20";

export default class Topic12 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Conditional List Comprehensions
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Conditional list comprehensions allow you to
            <strong> filter elements</strong> while creating a new list.
          </p>
        </header>

        {/* ================= BASIC CONDITION ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Filtering with <code>if</code>
          </h3>

          <p className="text-slate-300 text-sm">
            Use <code>if</code> at the end to include elements selectively.
          </p>

          <EditablePythonCodeBlock
            title="Filter Even Numbers"
            initialCode={`nums = [1, 2, 3, 4, 5, 6]

evens = [x for x in nums if x % 2 == 0]
print(evens)`}
          />
        </section>

        {/* ================= VISUAL ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🔍 Filtering Process (Hover)
          </p>

          <svg viewBox="0 0 560 140" className="w-full h-36">
            {[1, 2, 3, 4, 5, 6].map((val, idx) => (
              <g
                key={idx}
                className="transition-all duration-300 hover:scale-105"
              >
                <rect
                  x={30 + idx * 85}
                  y={50}
                  width={70}
                  height={40}
                  rx={8}
                  fill={val % 2 === 0 ? "#065f46" : "#1e293b"}
                />
                <text
                  x={65 + idx * 85}
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
            Only elements satisfying the condition are collected.
          </p>
        </section>

        {/* ================= IF-ELSE ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Using <code>if-else</code> (Ternary Style)
          </h3>

          <p className="text-slate-300 text-sm">
            Conditional expressions can also <strong>transform values</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Transform with if-else"
            initialCode={`nums = [1, 2, 3, 4]

labels = ["Even" if x % 2 == 0 else "Odd" for x in nums]
print(labels)`}
          />
        </section>

        {/* ================= SYNTAX NOTE ================= */}
        <section
          className={`border border-sky-700 rounded-xl p-4 bg-sky-900/20 ${hoverCard}`}
        >
          <h3 className="text-sky-300 font-semibold">
            🧠 Syntax Reminder
          </h3>

          <pre className="text-slate-200 text-sm mt-2">
            <code>[value_if_true if condition else value_if_false for item in iterable]</code>
          </pre>

          <p className="text-sky-200 text-sm mt-2">
            Order matters: <strong>if-else comes before for</strong>.
          </p>
        </section>

        {/* ================= MULTIPLE CONDITIONS ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            3️⃣ Multiple Conditions
          </h3>

          <EditablePythonCodeBlock
            title="Multiple Conditions"
            initialCode={`nums = range(1, 21)

result = [x for x in nums if x % 2 == 0 and x % 5 == 0]
print(result)`}
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
            title="Incorrect Placement of if-else"
            initialCode={`# ❌ Wrong
# [x for x in nums if x % 2 == 0 else x]

# ✔ Correct
[x if x % 2 == 0 else -x for x in nums]`}
          />

          <p className="text-red-200 text-sm">
            Filtering <code>if</code> goes at the end.  
            Transforming <code>if-else</code> goes before <code>for</code>.
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
            title="Pass/Fail Labels"
            initialCode={`marks = [45, 67, 89, 32, 76]

status = ["Pass" if m >= 40 else "Fail" for m in marks]
print(status)`}
          />
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h3 className="text-indigo-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-indigo-200 text-sm">
            ✔ Use filtering when you want fewer items  
            ✔ Use if-else when all items are needed but transformed  
            ✔ Avoid mixing too many conditions — readability first
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic12 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Use <code>if</code> for filtering</li>
            <li>Use <code>if-else</code> for transformation</li>
            <li>Syntax order is critical</li>
          </ul>
        </footer>

      </div>
    );
  }
}
