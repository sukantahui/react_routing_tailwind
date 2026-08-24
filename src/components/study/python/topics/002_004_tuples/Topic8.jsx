// src/components/study/python/tuples/Topic8.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic8 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Accessing Elements Inside Nested Tuples
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            A <strong>nested tuple</strong> is a tuple that contains another tuple
            (or list) as one of its elements.
          </p>

          <p className="text-slate-400 text-sm">
            Accessing nested data requires <strong>step-by-step indexing</strong>.
          </p>
        </header>

        {/* ================= BASIC NESTED TUPLE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Basic Nested Tuple
          </h3>

          <EditablePythonCodeBlock
            title="Simple Nested Tuple"
            initialCode={`t = (10, 20, (30, 40))

print(t[0])      # First element
print(t[2])      # Inner tuple
print(t[2][1])   # Element inside inner tuple`}
          />

          <p className="text-slate-300 text-sm">
            ✔ First index selects the inner tuple  
            ✔ Second index selects the element inside it
          </p>
        </section>

        {/* ================= STEP BY STEP ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Step-by-Step Access (Think Like This)
          </h3>

          <ol className="list-decimal list-inside text-slate-400 text-sm space-y-1">
            <li>Start from the outer tuple</li>
            <li>Move inward one level at a time</li>
            <li>Apply indexing at each level</li>
          </ol>
        </section>

        {/* ================= SVG VISUAL ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔍 Nested Tuple Structure (Visual Guide)
          </p>

          <svg viewBox="0 0 520 140" className="w-full h-36">
            {/* Outer */}
            <rect x="20" y="40" width="480" height="60" rx="10" fill="#1e293b" />
            <text x="260" y="30" fill="#a5b4fc" fontSize="12" textAnchor="middle">
              Outer Tuple
            </text>

            {/* Elements */}
            <rect x="40" y="60" width="80" height="30" rx="6" fill="#334155" />
            <text x="80" y="80" fill="#e5e7eb" fontSize="12" textAnchor="middle">
              t[0]=10
            </text>

            <rect x="140" y="60" width="80" height="30" rx="6" fill="#334155" />
            <text x="180" y="80" fill="#e5e7eb" fontSize="12" textAnchor="middle">
              t[1]=20
            </text>

            <rect x="240" y="55" width="220" height="40" rx="8" fill="#064e3b" />
            <text x="350" y="50" fill="#6ee7b7" fontSize="12" textAnchor="middle">
              Inner Tuple → t[2]
            </text>
            <text x="350" y="80" fill="#ecfeff" fontSize="13" textAnchor="middle">
              (30, 40)
            </text>
          </svg>
        </section>

        {/* ================= MULTI LEVEL ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Multi-Level Nested Tuples
          </h3>

          <EditablePythonCodeBlock
            title="Deeply Nested Tuple"
            initialCode={`t = (1, (2, (3, (4, 5))))

print(t[1])        # (2, (3, (4, 5)))
print(t[1][1])     # (3, (4, 5))
print(t[1][1][1])  # (4, 5)
print(t[1][1][1][0])  # 4`}
          />
        </section>

        {/* ================= NESTED WITH LIST ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            4️⃣ Nested Tuple with Mutable Elements
          </h3>

          <p className="text-slate-300 text-sm">
            A tuple may contain a <strong>list</strong>, which can be modified.
          </p>

          <EditablePythonCodeBlock
            title="Tuple Containing a List"
            initialCode={`t = (1, [2, 3], 4)

t[1][0] = 99
print(t)`}
          />

          <p className="text-amber-300 text-sm">
            ✔ Tuple structure unchanged  
            ✔ Inner list modified
          </p>
        </section>

        {/* ================= COMMON ERRORS ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ Common Mistakes
          </h3>

          <EditablePythonCodeBlock
            title="Invalid Access"
            initialCode={`t = (10, (20, 30))

# WRONG
# print(t[2][0])  # IndexError

# WRONG
# t[1] = (40, 50)  # TypeError`}
          />

          <ul className="list-disc list-inside text-rose-200 text-sm space-y-1">
            <li>Using wrong index level</li>
            <li>Trying to replace inner tuples</li>
          </ul>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            5️⃣ Real-World Example
          </h3>

          <EditablePythonCodeBlock
            title="Coordinates Stored as Nested Tuples"
            initialCode={`location = ("Kolkata", (22.57, 88.36))

city = location[0]
latitude = location[1][0]
longitude = location[1][1]

print(city, latitude, longitude)`}
          />
        </section>

        {/* ================= EXAM NOTES ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            📝 Exam & Interview Notes
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>Nested access uses chained indexing</li>
            <li>Access outer → then inner</li>
            <li>Tuples cannot be reassigned</li>
            <li>Lists inside tuples can change</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic8 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Nested tuples require multi-level indexing</li>
            <li>Always move one level at a time</li>
            <li>Very common exam trap — practice carefully</li>
          </ul>
        </footer>

      </div>
    );
  }
}
