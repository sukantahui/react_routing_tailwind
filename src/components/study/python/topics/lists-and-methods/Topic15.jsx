// src/components/study/python/lists/Topic15.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20";

export default class Topic15 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Iterating Lists (for, enumerate)
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Iteration means <strong>processing elements one by one</strong>.
            Python provides clean and readable ways to do this.
          </p>
        </header>

        {/* ================= BASIC FOR LOOP ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Iterating with a Simple <code>for</code> Loop
          </h3>

          <EditablePythonCodeBlock
            title="Basic Iteration"
            initialCode={`fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Preferred way when you only need values.
          </p>
        </section>

        {/* ================= INDEX BASED LOOP ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Index-Based Iteration (Not Recommended)
          </h3>

          <EditablePythonCodeBlock
            title="Using range(len())"
            initialCode={`numbers = [10, 20, 30]

for i in range(len(numbers)):
    print(i, numbers[i])`}
          />

          <p className="text-slate-400 text-sm">
            ⚠ Works, but verbose and error-prone.
          </p>
        </section>

        {/* ================= ENUMERATE ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            3️⃣ Iterating with <code>enumerate()</code>
          </h3>

          <p className="text-slate-300 text-sm">
            <code>enumerate()</code> gives both <strong>index and value</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Using enumerate()"
            initialCode={`colors = ["red", "green", "blue"]

for index, color in enumerate(colors):
    print(index, color)`}
          />
        </section>

        {/* ================= ENUMERATE START ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-pink-300">
            4️⃣ Custom Starting Index
          </h3>

          <EditablePythonCodeBlock
            title="enumerate(start=1)"
            initialCode={`students = ["Ritaja", "Mounita", "Kaustav"]

for roll, name in enumerate(students, start=1):
    print(roll, name)`}
          />
        </section>

        {/* ================= MODIFY DURING ITERATION ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ Modifying List While Iterating
          </h3>

          <EditablePythonCodeBlock
            title="Dangerous Pattern"
            initialCode={`nums = [1, 2, 3, 4]

for n in nums:
    if n % 2 == 0:
        nums.remove(n)

print(nums)`}
          />

          <p className="text-red-200 text-sm">
            This causes skipped elements and bugs.
          </p>
        </section>

        {/* ================= SAFE WAY ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-green-300">
            ✔ Safe Iteration Pattern
          </h3>

          <EditablePythonCodeBlock
            title="Iterate Over Copy"
            initialCode={`nums = [1, 2, 3, 4]

for n in nums[:]:
    if n % 2 == 0:
        nums.remove(n)

print(nums)`}
          />
        </section>

        {/* ================= LOOP WITH CONDITION ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-cyan-300">
            5️⃣ Iteration with Conditions
          </h3>

          <EditablePythonCodeBlock
            title="Conditional Logic"
            initialCode={`marks = [45, 82, 67, 30]

for m in marks:
    if m >= 40:
        print("Pass:", m)
    else:
        print("Fail:", m)`}
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
            title="Menu Display"
            initialCode={`menu = ["Start", "Settings", "Exit"]

for index, option in enumerate(menu, start=1):
    print(f"{index}. {option}")`}
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
            ✔ Use <code>for item in list</code> by default  
            ✔ Use <code>enumerate()</code> when index is needed  
            ✔ Avoid modifying lists during iteration
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic15 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>for-loop is simplest and safest</li>
            <li>enumerate() gives index + value</li>
            <li>Never mutate list while looping</li>
          </ul>
        </footer>

      </div>
    );
  }
}
