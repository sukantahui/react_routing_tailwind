
// src/components/study/python/lists/Topic1.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic1 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Creating Lists (Literals & List Constructor)
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Before performing operations on lists, you must know
            <strong> all valid and professional ways to create them</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            Python provides two main approaches — list literals and the
            <code className="px-1">list()</code> constructor.
          </p>
        </header>

        {/* ================= LIST LITERALS ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Creating Lists Using Literals
          </h3>

          <p className="text-slate-300 text-sm">
            The most common and readable way to create a list is using
            <strong> square brackets</strong>.
          </p>

          <EditablePythonCodeBlock
            title="List Literal Examples"
            initialCode={`numbers = [10, 20, 30]
names = ["Ritaja", "Mounita", "Kaustav"]
mixed = [1, "Python", True, 3.14]

print(numbers)
print(names)
print(mixed)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Easy to read  
            ✔ Preferred in almost all real-world code
          </p>
        </section>

        {/* ================= EMPTY LIST ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Creating an Empty List
          </h3>

          <EditablePythonCodeBlock
            title="Empty List Creation"
            initialCode={`items = []
print(items)`}
          />

          <p className="text-slate-400 text-sm">
            This pattern is extremely common when building a list dynamically
            (using loops or user input).
          </p>
        </section>

        {/* ================= LIST CONSTRUCTOR ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Creating Lists Using <code>list()</code> Constructor
          </h3>

          <p className="text-slate-300 text-sm">
            The <code>list()</code> constructor converts
            <strong> iterable objects</strong> into lists.
          </p>

          <EditablePythonCodeBlock
            title="Using list() Constructor"
            initialCode={`chars = list("Python")
nums = list((1, 2, 3))
unique = list({10, 20, 30})

print(chars)
print(nums)
print(unique)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Works with strings, tuples, sets, ranges  
            ⚠ Order from sets is not guaranteed
          </p>
        </section>

        {/* ================= SVG EXPLANATION ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔄 Iterable → List Conversion (Concept)
          </p>

          <svg viewBox="0 0 520 160" className="w-full h-40">
            {/* Iterable */}
            <rect x="40" y="50" width="180" height="60" rx="10" fill="#064e3b" />
            <text x="130" y="75" fill="#ecfeff" fontSize="13" textAnchor="middle">
              Iterable
            </text>
            <text x="130" y="95" fill="#a7f3d0" fontSize="11" textAnchor="middle">
              string / tuple / set
            </text>

            {/* Arrow */}
            <text x="240" y="80" fill="#94a3b8" fontSize="22">→</text>

            {/* List */}
            <rect x="280" y="50" width="200" height="60" rx="10" fill="#1e293b" />
            <text x="380" y="80" fill="#e5e7eb" fontSize="13" textAnchor="middle">
              List (mutable)
            </text>
          </svg>
        </section>

        {/* ================= RANGE TO LIST ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Creating Lists from <code>range()</code>
          </h3>

          <EditablePythonCodeBlock
            title="range() to list"
            initialCode={`nums = list(range(1, 6))
print(nums)`}
          />

          <p className="text-slate-400 text-sm">
            This is commonly used for numeric sequences and loops.
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            ⚠️ Common Mistakes
          </h3>

          <EditablePythonCodeBlock
            title="Mistakes to Avoid"
            initialCode={`lst = list(123)   # ❌ Error: int is not iterable
lst = list("ABC") # ✔ ['A', 'B', 'C']`}
          />

          <p className="text-amber-200 text-sm">
            Always remember: <strong>list()</strong> works only with iterables.
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-indigo-200 text-sm">
            Use list literals <strong>[]</strong> by default.  
            Use <strong>list()</strong> only when converting from another iterable.
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic1 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Lists are created using [] or list()</li>
            <li>list() converts iterables into lists</li>
            <li>Use [] for clarity and performance</li>
            <li>Understand iterable behavior clearly</li>
          </ul>
        </footer>

      </div>
    );
  }
}
