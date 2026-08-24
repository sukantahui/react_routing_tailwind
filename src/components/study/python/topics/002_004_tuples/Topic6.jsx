// src/components/study/python/tuples/Topic6.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic6 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Immutability of Tuples
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            One of the most important characteristics of tuples in Python is
            that they are <strong>immutable</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            Immutability means: <strong>once created, a tuple cannot be changed</strong>.
          </p>
        </header>

        {/* ================= DEFINITION ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ What Does Immutability Mean?
          </h3>

          <p className="text-slate-300 text-sm">
            After a tuple is created, you <strong>cannot</strong>:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
            <li>Change an element</li>
            <li>Add a new element</li>
            <li>Remove an element</li>
          </ul>
        </section>

        {/* ================= ERROR DEMO ================= */}
        <section className="space-y-4">
          <EditablePythonCodeBlock
            title="Attempting to Modify a Tuple (❌ Error)"
            initialCode={`t = (10, 20, 30)
t[1] = 99`}
          />

          <p className="text-rose-300 text-sm">
            ❌ This raises <strong>TypeError</strong> because tuples do not support item assignment.
          </p>
        </section>

        {/* ================= SVG CONCEPT ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔒 Tuple vs List (Conceptual View)
          </p>

          <svg viewBox="0 0 520 120" className="w-full h-32">
            {/* Tuple */}
            <rect x="20" y="30" width="220" height="60" rx="10" fill="#1e293b" />
            <text x="130" y="20" fill="#a5b4fc" fontSize="12" textAnchor="middle">
              Tuple (Immutable)
            </text>
            <text x="130" y="65" fill="#e0e7ff" fontSize="14" textAnchor="middle">
              (10, 20, 30)
            </text>
            <text x="130" y="90" fill="#fca5a5" fontSize="11" textAnchor="middle">
              ❌ Cannot Change
            </text>

            {/* List */}
            <rect x="280" y="30" width="220" height="60" rx="10" fill="#064e3b" />
            <text x="390" y="20" fill="#6ee7b7" fontSize="12" textAnchor="middle">
              List (Mutable)
            </text>
            <text x="390" y="65" fill="#ecfeff" fontSize="14" textAnchor="middle">
              [10, 20, 30]
            </text>
            <text x="390" y="90" fill="#bbf7d0" fontSize="11" textAnchor="middle">
              ✔ Can Change
            </text>
          </svg>
        </section>

        {/* ================= WHAT IS ALLOWED ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ What Is Still Allowed?
          </h3>

          <p className="text-slate-300 text-sm">
            Although tuples cannot be modified, you can:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
            <li>Access elements</li>
            <li>Iterate through them</li>
            <li>Concatenate tuples (creates a new tuple)</li>
          </ul>

          <EditablePythonCodeBlock
            title="Tuple Concatenation (Creates New Tuple)"
            initialCode={`t1 = (1, 2)
t2 = (3, 4)
t3 = t1 + t2

print(t3)`}
          />
        </section>

        {/* ================= TRICKY CASE ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            ⚠ Tricky but Important Case
          </h3>

          <p className="text-slate-300 text-sm">
            A tuple itself is immutable, but it may contain
            <strong>mutable objects</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Tuple with Mutable Element"
            initialCode={`t = (1, [2, 3])
t[1].append(4)

print(t)`}
          />

          <p className="text-amber-300 text-sm">
            ✔ Tuple structure didn’t change  
            ✔ Inner list was modified
          </p>
        </section>

        {/* ================= WHY THIS MATTERS ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Why Immutability Matters
          </h3>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
            <li>Prevents accidental data changes</li>
            <li>Makes code safer and predictable</li>
            <li>Allows tuples to be used as dictionary keys</li>
          </ul>
        </section>

        {/* ================= EXAM NOTES ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            📝 Exam & Interview Notes
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>Tuples are immutable → no item assignment</li>
            <li>TypeError occurs on modification attempt</li>
            <li>Inner mutable objects can still change</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic6 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Tuples cannot be modified after creation</li>
            <li>Immutability ensures safety and reliability</li>
            <li>Concatenation creates new tuples</li>
          </ul>
        </footer>

      </div>
    );
  }
}
