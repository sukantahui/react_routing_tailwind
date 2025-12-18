// src/components/study/python/tuples/Topic15.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic15 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Tuples vs Lists: Key Differences
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Tuples and lists look similar, but they are designed for
            <strong> very different purposes</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            Choosing the wrong one leads to bugs, poor performance, and bad design.
          </p>
        </header>

        {/* ================= BASIC SYNTAX ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Syntax Comparison
          </h3>

          <EditablePythonCodeBlock
            title="List vs Tuple Syntax"
            initialCode={`# List
marks_list = [85, 90, 88]

# Tuple
marks_tuple = (85, 90, 88)

print(type(marks_list))
print(type(marks_tuple))`}
          />
        </section>

        {/* ================= MUTABILITY ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Mutability (MOST IMPORTANT DIFFERENCE)
          </h3>

          <EditablePythonCodeBlock
            title="List is Mutable"
            initialCode={`marks = [85, 90]
marks[0] = 95
print(marks)`}
          />

          <EditablePythonCodeBlock
            title="Tuple is Immutable"
            initialCode={`marks = (85, 90)
# ❌ This will cause an error
# marks[0] = 95`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Lists can be changed  
            ❌ Tuples cannot be changed after creation
          </p>
        </section>

        {/* ================= SVG COMPARISON ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔍 Conceptual Difference
          </p>

          <svg viewBox="0 0 520 160" className="w-full h-40">
            {/* List */}
            <rect x="40" y="50" width="180" height="50" rx="10" fill="#1e293b" />
            <text x="130" y="80" fill="#a7f3d0" fontSize="13" textAnchor="middle">
              List → Editable
            </text>

            {/* Arrow */}
            <text x="240" y="80" fill="#94a3b8" fontSize="22">↔</text>

            {/* Tuple */}
            <rect x="280" y="50" width="180" height="50" rx="10" fill="#1e293b" />
            <text x="370" y="80" fill="#fca5a5" fontSize="13" textAnchor="middle">
              Tuple → Read-only
            </text>
          </svg>
        </section>

        {/* ================= METHODS ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Available Methods
          </h3>

          <EditablePythonCodeBlock
            title="List Methods"
            initialCode={`lst = [1, 2, 3]
lst.append(4)
lst.remove(2)
print(lst)`}
          />

          <EditablePythonCodeBlock
            title="Tuple Methods"
            initialCode={`t = (1, 2, 2, 3)
print(t.count(2))
print(t.index(3))`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Lists → many methods  
            ✔ Tuples → only count() and index()
          </p>
        </section>

        {/* ================= PERFORMANCE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Performance & Memory
          </h3>

          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Tuples use less memory</li>
            <li>Tuples are faster to iterate</li>
            <li>Lists consume more memory</li>
            <li>Lists are slower due to mutability</li>
          </ul>
        </section>

        {/* ================= USE CASE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            5️⃣ When to Use What?
          </h3>

          <EditablePythonCodeBlock
            title="Correct Use Cases"
            initialCode={`# Tuple → fixed data
coordinates = (22.57, 88.36)

# List → changing data
shopping_cart = ["Milk", "Bread"]
shopping_cart.append("Eggs")

print(coordinates)
print(shopping_cart)`}
          />
        </section>

        {/* ================= DICTIONARY KEY ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            6️⃣ Dictionary Key Rule
          </h3>

          <EditablePythonCodeBlock
            title="Tuple as Dictionary Key"
            initialCode={`locations = {
    (22.57, 88.36): "Kolkata",
    (28.61, 77.20): "Delhi"
}

print(locations[(22.57, 88.36)])`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Tuples can be dictionary keys  
            ❌ Lists cannot (mutable)
          </p>
        </section>

        {/* ================= EXAM TRAPS ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ Common Exam Traps
          </h3>

          <ul className="list-disc list-inside text-rose-200 text-sm space-y-1">
            <li>Confusing syntax vs behavior</li>
            <li>Using list when immutability is required</li>
            <li>Forgetting tuple has fewer methods</li>
            <li>Trying to modify a tuple</li>
          </ul>
        </section>

        {/* ================= INTERVIEW SECRET ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            💡 Interview Secret
          </h3>

          <p className="text-indigo-200 text-sm">
            If data <strong>should not change</strong>, use a tuple.  
            It makes your code safer, faster, and intention-clear.
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic15 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Lists are mutable, tuples are immutable</li>
            <li>Tuples are faster and memory efficient</li>
            <li>Use tuples for fixed data</li>
            <li>Use lists for dynamic data</li>
          </ul>
        </footer>

      </div>
    );
  }
}
