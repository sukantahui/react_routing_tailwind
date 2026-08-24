
// src/components/study/python/tuples/Topic18.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic18 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Common Tuple Pitfalls and Errors
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Tuples look simple, but they hide some
            <strong> dangerous traps</strong> that confuse even good students.
          </p>

          <p className="text-slate-400 text-sm">
            Let’s expose them one by one.
          </p>
        </header>

        {/* ================= PITFALL 1 ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-rose-300">
            ❌ Pitfall 1: Forgetting the Trailing Comma
          </h3>

          <EditablePythonCodeBlock
            title="Single-Element Tuple Mistake"
            initialCode={`a = (5)
b = (5,)

print(type(a))
print(type(b))`}
          />

          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li><code>(5)</code> → int</li>
            <li><code>(5,)</code> → tuple</li>
          </ul>
        </section>

        {/* ================= PITFALL 2 ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-rose-300">
            ❌ Pitfall 2: Trying to Modify a Tuple
          </h3>

          <EditablePythonCodeBlock
            title="Immutability Error"
            initialCode={`t = (1, 2, 3)
# ❌ This causes TypeError
# t[0] = 10`}
          />

          <p className="text-rose-200 text-sm">
            Tuples are immutable — elements cannot be reassigned.
          </p>
        </section>

        {/* ================= PITFALL 3 ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-rose-300">
            ❌ Pitfall 3: Mutable Objects Inside Tuples
          </h3>

          <EditablePythonCodeBlock
            title="Tuple with Mutable Content"
            initialCode={`t = (1, [2, 3])
t[1].append(4)
print(t)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Tuple itself is immutable  
            ❌ Contents may still change
          </p>
        </section>

        {/* ================= SVG ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔍 Immutability vs Mutability (Concept)
          </p>

          <svg viewBox="0 0 520 180" className="w-full h-44">
            {/* Tuple */}
            <rect x="40" y="60" width="180" height="50" rx="10" fill="#1e293b" />
            <text x="130" y="90" fill="#e5e7eb" fontSize="13" textAnchor="middle">
              Tuple → Fixed
            </text>

            {/* Arrow */}
            <text x="240" y="90" fill="#94a3b8" fontSize="22">→</text>

            {/* List inside */}
            <rect x="280" y="60" width="200" height="50" rx="10" fill="#064e3b" />
            <text x="380" y="90" fill="#ecfeff" fontSize="13" textAnchor="middle">
              List inside → Mutable
            </text>
          </svg>
        </section>

        {/* ================= PITFALL 4 ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-rose-300">
            ❌ Pitfall 4: Unpacking Mismatch
          </h3>

          <EditablePythonCodeBlock
            title="Too Many / Too Few Values"
            initialCode={`t = (1, 2, 3)

# ❌ ValueError
# a, b = t

# ✔ Correct
a, b, c = t`}
          />
        </section>

        {/* ================= PITFALL 5 ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-rose-300">
            ❌ Pitfall 5: Assuming Tuple Has List Methods
          </h3>

          <EditablePythonCodeBlock
            title="Invalid Method Usage"
            initialCode={`t = (1, 2, 3)

# ❌ Tuples do NOT support append()
# t.append(4)`}
          />

          <p className="text-slate-400 text-sm">
            Tuples only support:
            <code className="ml-1">count()</code>,
            <code className="ml-1">index()</code>
          </p>
        </section>

        {/* ================= PITFALL 6 ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-rose-300">
            ❌ Pitfall 6: Confusing () with Empty Tuple
          </h3>

          <EditablePythonCodeBlock
            title="Empty Tuple vs Expression"
            initialCode={`t = ()
print(t)
print(type(t))`}
          />

          <p className="text-slate-400 text-sm">
            ✔ <code>()</code> is a valid empty tuple
          </p>
        </section>

        {/* ================= EXAM TRAPS ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            ⚠️ Exam Traps to Remember
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li><code>(5)</code> is NOT a tuple</li>
            <li>Tuple immutability ≠ content immutability</li>
            <li>Unpacking count must match</li>
            <li>No append/remove in tuples</li>
          </ul>
        </section>

        {/* ================= INTERVIEW SECRET ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            💡 Interview Secret
          </h3>

          <p className="text-indigo-200 text-sm">
            Most tuple bugs are <strong>logical bugs</strong>, not syntax errors.
            They pass silently and fail later — that’s why professionals are cautious.
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic18 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Always use trailing comma for single-element tuples</li>
            <li>Never try to modify tuple elements</li>
            <li>Be careful with mutable objects inside tuples</li>
            <li>Match unpacking counts correctly</li>
          </ul>
        </footer>

      </div>
    );
  }
}
