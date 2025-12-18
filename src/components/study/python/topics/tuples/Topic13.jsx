// src/components/study/python/tuples/Topic13.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic13 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Tuple Assignment and Swapping Variables
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Python allows assigning multiple values to multiple variables
            in a <strong>single statement</strong> using tuples.
          </p>

          <p className="text-slate-400 text-sm">
            This feature is called <strong>tuple unpacking</strong>.
          </p>
        </header>

        {/* ================= BASIC ASSIGNMENT ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Basic Tuple Assignment
          </h3>

          <EditablePythonCodeBlock
            title="Assigning Multiple Variables"
            initialCode={`a, b, c = (10, 20, 30)

print(a)
print(b)
print(c)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Values are assigned left to right  
            ✔ Number of variables must match number of values
          </p>
        </section>

        {/* ================= WITHOUT PARENTHESES ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Tuple Assignment Without Parentheses
          </h3>

          <EditablePythonCodeBlock
            title="Implicit Tuple Packing"
            initialCode={`x, y = 5, 10

print(x)
print(y)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Parentheses are optional  
            ✔ Python automatically packs values into a tuple
          </p>
        </section>

        {/* ================= SVG ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔄 Tuple Assignment (Conceptual View)
          </p>

          <svg viewBox="0 0 520 140" className="w-full h-36">
            {/* Tuple */}
            <rect x="30" y="50" width="200" height="40" rx="10" fill="#1e293b" />
            <text x="130" y="75" fill="#e5e7eb" fontSize="14" textAnchor="middle">
              (10, 20)
            </text>

            {/* Arrow */}
            <text x="260" y="75" fill="#a5b4fc" fontSize="20">→</text>

            {/* Variables */}
            <rect x="300" y="40" width="80" height="30" rx="6" fill="#064e3b" />
            <text x="340" y="60" fill="#ecfeff" fontSize="12" textAnchor="middle">
              a = 10
            </text>

            <rect x="300" y="80" width="80" height="30" rx="6" fill="#064e3b" />
            <text x="340" y="100" fill="#ecfeff" fontSize="12" textAnchor="middle">
              b = 20
            </text>
          </svg>
        </section>

        {/* ================= SWAPPING ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Swapping Variables Using Tuples
          </h3>

          <p className="text-slate-300 text-sm">
            Python can swap values <strong>without using a temporary variable</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Swapping Two Variables"
            initialCode={`a = 5
b = 10

a, b = b, a

print(a)
print(b)`}
          />

          <p className="text-emerald-300 text-sm">
            ✔ Clean  
            ✔ Pythonic  
            ✔ No extra memory
          </p>
        </section>

        {/* ================= TRADITIONAL VS PYTHON ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            🔍 Traditional vs Pythonic Swapping
          </h3>

          <EditablePythonCodeBlock
            title="Traditional (Not Recommended)"
            initialCode={`temp = a
a = b
b = temp`}
          />

          <p className="text-slate-400 text-sm">
            ❌ More lines  
            ❌ Less readable
          </p>
        </section>

        {/* ================= MULTIPLE VALUES ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Assigning Multiple Values at Once
          </h3>

          <EditablePythonCodeBlock
            title="Multiple Assignment"
            initialCode={`name, age, city = "Ritaja", 16, "Kolkata"

print(name)
print(age)
print(city)`}
          />
        </section>

        {/* ================= ERROR CASE ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ Common Errors
          </h3>

          <EditablePythonCodeBlock
            title="Mismatch in Values"
            initialCode={`# ❌ ValueError
# a, b = (10, 20, 30)`}
          />

          <ul className="list-disc list-inside text-rose-200 text-sm space-y-1">
            <li>Too many values</li>
            <li>Too few variables</li>
          </ul>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            5️⃣ Real-World Example
          </h3>

          <EditablePythonCodeBlock
            title="Swapping Coordinates"
            initialCode={`x, y = 10, 20

y, x = x, y

print(x, y)`}
          />
        </section>

        {/* ================= EXAM NOTES ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            📝 Exam & Interview Notes
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>Tuple unpacking happens automatically</li>
            <li>Swapping does not need a temporary variable</li>
            <li>Mismatch causes ValueError</li>
            <li>Frequently tested in output questions</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic13 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Tuple assignment assigns multiple variables</li>
            <li>Swapping is simple and elegant</li>
            <li>Python handles packing and unpacking automatically</li>
          </ul>
        </footer>

      </div>
    );
  }
}
