// src/components/study/python/tuples/Topic11.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic11 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Iterating Through Tuples
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Iteration means accessing each element of a tuple
            <strong> one by one</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            Tuples support iteration naturally because they are
            <strong> ordered collections</strong>.
          </p>
        </header>

        {/* ================= BASIC FOR LOOP ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Iterating Using a <code>for</code> Loop
          </h3>

          <EditablePythonCodeBlock
            title="Basic Tuple Iteration"
            initialCode={`t = (10, 20, 30)

for value in t:
    print(value)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Values are accessed in order  
            ✔ No index needed
          </p>
        </section>

        {/* ================= SVG VISUAL ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔁 Tuple Iteration (Conceptual View)
          </p>

          <svg viewBox="0 0 520 120" className="w-full h-32">
            <rect x="30" y="50" width="460" height="40" rx="10" fill="#1e293b" />
            <text x="80" y="75" fill="#e5e7eb" fontSize="14">10</text>
            <text x="180" y="75" fill="#e5e7eb" fontSize="14">20</text>
            <text x="280" y="75" fill="#e5e7eb" fontSize="14">30</text>
            <text x="380" y="75" fill="#94a3b8" fontSize="12">
              for value in tuple →
            </text>
          </svg>
        </section>

        {/* ================= USING RANGE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Iterating Using Index (<code>range()</code>)
          </h3>

          <EditablePythonCodeBlock
            title="Iteration with Index"
            initialCode={`t = ("a", "b", "c")

for i in range(len(t)):
    print(i, t[i])`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Useful when index is needed  
            ❌ Slightly less readable than direct iteration
          </p>
        </section>

        {/* ================= ENUMERATE ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            3️⃣ Best Practice: <code>enumerate()</code>
          </h3>

          <EditablePythonCodeBlock
            title="Iterating with enumerate()"
            initialCode={`t = ("Python", "Java", "C++")

for index, value in enumerate(t):
    print(index, value)`}
          />

          <p className="text-emerald-300 text-sm">
            ✔ Clean  
            ✔ Pythonic  
            ✔ Recommended
          </p>
        </section>

        {/* ================= NESTED TUPLES ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            4️⃣ Iterating Nested Tuples
          </h3>

          <EditablePythonCodeBlock
            title="Nested Tuple Iteration"
            initialCode={`t = ((1, 2), (3, 4), (5, 6))

for pair in t:
    for value in pair:
        print(value)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Outer loop → inner tuple  
            ✔ Inner loop → elements
          </p>
        </section>

        {/* ================= UNPACKING ================= */}
        <section className="space-y-4 border border-sky-700 rounded-xl p-4 bg-sky-900/20">
          <h3 className="text-sky-300 font-semibold">
            5️⃣ Iteration with Tuple Unpacking
          </h3>

          <EditablePythonCodeBlock
            title="Unpacking While Iterating"
            initialCode={`records = (("Ritaja", 90), ("Mounita", 85))

for name, marks in records:
    print(name, marks)`}
          />

          <p className="text-emerald-300 text-sm">
            ✔ Very readable  
            ✔ Common in real-world data processing
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ Common Mistakes
          </h3>

          <EditablePythonCodeBlock
            title="Mistakes During Iteration"
            initialCode={`t = (1, 2, 3)

# ❌ Wrong
# for i in t:
#     print(t[i])   # TypeError

# ✔ Correct
for i in range(len(t)):
    print(t[i])`}
          />

          <ul className="list-disc list-inside text-rose-200 text-sm space-y-1">
            <li>Confusing value with index</li>
            <li>Using value as index</li>
          </ul>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            6️⃣ Real-World Example
          </h3>

          <EditablePythonCodeBlock
            title="Iterating Coordinates"
            initialCode={`path = ((0,0), (1,2), (3,4))

for x, y in path:
    print(f"x={x}, y={y}")`}
          />
        </section>

        {/* ================= EXAM NOTES ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            📝 Exam & Interview Notes
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>Tuples are iterable</li>
            <li>Use <code>for value in tuple</code> for simplicity</li>
            <li>Use <code>enumerate()</code> when index is needed</li>
            <li>Unpacking improves readability</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic11 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Tuples support multiple iteration styles</li>
            <li><code>enumerate()</code> is best practice</li>
            <li>Nested tuples need nested loops</li>
          </ul>
        </footer>

      </div>
    );
  }
}
