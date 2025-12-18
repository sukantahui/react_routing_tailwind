// src/components/study/python/tuples/Topic7.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic7 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Why Tuples Are Immutable
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Python did not make tuples immutable by accident.  
            There are <strong>strong design, performance, and safety reasons</strong>
            behind this decision.
          </p>
        </header>

        {/* ================= BIG IDEA ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ The Core Idea
          </h3>

          <p className="text-slate-300 text-sm">
            Tuples represent <strong>fixed, constant data</strong> — data that
            should not change once created.
          </p>

          <p className="text-slate-400 text-sm">
            Python separates data structures into:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
            <li><strong>Mutable</strong> → meant to change (list, dict, set)</li>
            <li><strong>Immutable</strong> → meant to stay constant (tuple, str)</li>
          </ul>
        </section>

        {/* ================= PERFORMANCE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Performance Benefits
          </h3>

          <p className="text-slate-300 text-sm">
            Because tuples never change, Python can store and access them
            <strong>more efficiently</strong> than lists.
          </p>

          <EditablePythonCodeBlock
            title="Tuple vs List Creation (Conceptual)"
            initialCode={`# Tuples are lighter and faster
t = (1, 2, 3, 4, 5)

# Lists need extra memory for mutability
l = [1, 2, 3, 4, 5]`}
          />

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
            <li>No resizing logic</li>
            <li>No mutation checks</li>
            <li>Lower memory overhead</li>
          </ul>
        </section>

        {/* ================= SAFETY ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Data Safety & Predictability
          </h3>

          <p className="text-slate-300 text-sm">
            Immutability protects data from <strong>accidental modification</strong>,
            especially in large programs.
          </p>

          <EditablePythonCodeBlock
            title="Why Immutability Is Safer"
            initialCode={`def process_point(point):
    # point should never change
    x, y = point
    return x * x + y * y

p = (3, 4)
result = process_point(p)

print(p)   # Still unchanged`}
          />

          <p className="text-emerald-300 text-sm">
            ✔ Functions can trust tuple data  
            ✔ No unexpected side-effects
          </p>
        </section>

        {/* ================= HASHING ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            4️⃣ Hashing & Dictionary Keys (VERY IMPORTANT)
          </h3>

          <p className="text-slate-300 text-sm">
            Only immutable objects can be <strong>hashed</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            That is why:
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
            <li>Tuples ✅ can be dictionary keys</li>
            <li>Lists ❌ cannot be dictionary keys</li>
          </ul>

          <EditablePythonCodeBlock
            title="Tuple as Dictionary Key"
            initialCode={`locations = {
    (10, 20): "Park",
    (5, 15): "School"
}

print(locations[(10, 20)])`}
          />
        </section>

        {/* ================= SVG VISUAL ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔐 Hashing & Mutability (Concept View)
          </p>

          <svg viewBox="0 0 520 130" className="w-full h-36">
            {/* Immutable */}
            <rect x="30" y="40" width="200" height="60" rx="10" fill="#1e293b" />
            <text x="130" y="30" fill="#a5b4fc" fontSize="12" textAnchor="middle">
              Immutable Object
            </text>
            <text x="130" y="75" fill="#e0e7ff" fontSize="14" textAnchor="middle">
              Tuple → Hashable
            </text>
            <text x="130" y="95" fill="#bbf7d0" fontSize="11" textAnchor="middle">
              ✔ Allowed as dict key
            </text>

            {/* Mutable */}
            <rect x="290" y="40" width="200" height="60" rx="10" fill="#7f1d1d" />
            <text x="390" y="30" fill="#fecaca" fontSize="12" textAnchor="middle">
              Mutable Object
            </text>
            <text x="390" y="75" fill="#fee2e2" fontSize="14" textAnchor="middle">
              List → Not Hashable
            </text>
            <text x="390" y="95" fill="#fecaca" fontSize="11" textAnchor="middle">
              ❌ Cannot be dict key
            </text>
          </svg>
        </section>

        {/* ================= DESIGN PHILOSOPHY ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            5️⃣ Python Design Philosophy
          </h3>

          <p className="text-slate-300 text-sm">
            Python follows a simple rule:
          </p>

          <blockquote className="border-l-4 border-sky-400 pl-4 text-slate-200 text-sm italic">
            “Different data structures exist for different intentions.”
          </blockquote>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
            <li>Use lists when data changes</li>
            <li>Use tuples when data must stay fixed</li>
          </ul>
        </section>

        {/* ================= EXAM NOTES ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            📝 Exam & Interview Gold
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>Tuples are immutable by design</li>
            <li>Immutability enables hashing</li>
            <li>Tuples are safer and faster than lists</li>
            <li>Used for fixed records & dictionary keys</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic7 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Immutability improves safety & predictability</li>
            <li>Enables hashing and dictionary usage</li>
            <li>Reflects Python’s clean design philosophy</li>
          </ul>
        </footer>

      </div>
    );
  }
}
