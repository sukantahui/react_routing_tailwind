// src/components/study/python/tuples/Topic9.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic9 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Tuple Concatenation and Repetition
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Even though tuples are <strong>immutable</strong>, Python still allows
            you to <strong>combine</strong> and <strong>repeat</strong> them.
          </p>

          <p className="text-slate-400 text-sm">
            Important rule: these operations always create a <strong>new tuple</strong>.
          </p>
        </header>

        {/* ================= CONCATENATION ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Tuple Concatenation (`+`)
          </h3>

          <p className="text-slate-300 text-sm">
            Tuple concatenation joins two or more tuples using the <code>+</code> operator.
          </p>

          <EditablePythonCodeBlock
            title="Basic Tuple Concatenation"
            initialCode={`t1 = (1, 2, 3)
t2 = (4, 5)

t3 = t1 + t2
print(t3)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Original tuples remain unchanged  
            ✔ Result is a brand-new tuple
          </p>
        </section>

        {/* ================= SVG ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            ➕ Tuple Concatenation (Visual)
          </p>

          <svg viewBox="0 0 520 130" className="w-full h-36">
            {/* t1 */}
            <rect x="30" y="50" width="160" height="40" rx="8" fill="#1e293b" />
            <text x="110" y="75" fill="#e5e7eb" fontSize="14" textAnchor="middle">
              (1, 2, 3)
            </text>

            <text x="230" y="75" fill="#a5b4fc" fontSize="20">+</text>

            {/* t2 */}
            <rect x="260" y="50" width="120" height="40" rx="8" fill="#1e293b" />
            <text x="320" y="75" fill="#e5e7eb" fontSize="14" textAnchor="middle">
              (4, 5)
            </text>

            <text x="400" y="75" fill="#6ee7b7" fontSize="20">→</text>

            {/* result */}
            <rect x="430" y="50" width="200" height="40" rx="8" fill="#064e3b" />
            <text x="530" y="75" fill="#ecfeff" fontSize="14" textAnchor="middle">
              (1, 2, 3, 4, 5)
            </text>
          </svg>
        </section>

        {/* ================= TYPE ERROR ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ Common Error
          </h3>

          <EditablePythonCodeBlock
            title="Invalid Concatenation"
            initialCode={`t = (1, 2, 3)

# ❌ TypeError
# result = t + [4, 5]`}
          />

          <p className="text-rose-200 text-sm">
            Tuples can only be concatenated with <strong>tuples</strong>.
          </p>
        </section>

        {/* ================= REPETITION ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Tuple Repetition (`*`)
          </h3>

          <p className="text-slate-300 text-sm">
            Tuple repetition duplicates the elements using the <code>*</code> operator.
          </p>

          <EditablePythonCodeBlock
            title="Tuple Repetition"
            initialCode={`t = (1, 2)

print(t * 3)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Elements are repeated in order  
            ✔ New tuple is created
          </p>
        </section>

        {/* ================= TRICKY CASE ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            ⚠ Tricky Case: Repetition with Mutable Elements
          </h3>

          <EditablePythonCodeBlock
            title="Shared References Problem"
            initialCode={`t = ([0],) * 3
t[0][0] = 99

print(t)`}
          />

          <p className="text-amber-300 text-sm">
            ❗ All tuple elements refer to the <strong>same list</strong>
          </p>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Real-World Examples
          </h3>

          <EditablePythonCodeBlock
            title="Fixed Pattern Data"
            initialCode={`week = ("Mon", "Tue", "Wed", "Thu", "Fri")
full_week = week + ("Sat", "Sun")

print(full_week)`}
          />

          <EditablePythonCodeBlock
            title="Default Coordinates"
            initialCode={`origin = (0, 0)
grid = origin * 3

print(grid)`}
          />
        </section>

        {/* ================= EXAM NOTES ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            📝 Exam & Interview Notes
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li><code>+</code> joins tuples</li>
            <li><code>*</code> repeats tuples</li>
            <li>Original tuples never change</li>
            <li>Be careful with mutable elements inside tuples</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic9 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Tuples can be combined and repeated</li>
            <li>Operations always create new tuples</li>
            <li>Immutability is preserved</li>
          </ul>
        </footer>

      </div>
    );
  }
}
