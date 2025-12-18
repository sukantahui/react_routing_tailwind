// src/components/study/python/tuples/Topic12.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic12 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Membership Testing Using <code>in</code>
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Membership testing checks whether a value
            <strong> exists inside a tuple</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            Python provides the <code>in</code> and <code>not in</code> operators
            for this purpose.
          </p>
        </header>

        {/* ================= BASIC IN ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Using <code>in</code>
          </h3>

          <EditablePythonCodeBlock
            title="Basic Membership Test"
            initialCode={`t = (10, 20, 30)

print(20 in t)
print(40 in t)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Returns <code>True</code> if element exists  
            ✔ Returns <code>False</code> otherwise
          </p>
        </section>

        {/* ================= NOT IN ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Using <code>not in</code>
          </h3>

          <EditablePythonCodeBlock
            title="Using not in"
            initialCode={`t = ("apple", "banana", "cherry")

print("mango" not in t)
print("banana" not in t)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Logical opposite of <code>in</code>
          </p>
        </section>

        {/* ================= SVG ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔎 Membership Check (Conceptual)
          </p>

          <svg viewBox="0 0 520 120" className="w-full h-32">
            <rect x="30" y="50" width="460" height="40" rx="10" fill="#1e293b" />
            <text x="90" y="75" fill="#e5e7eb" fontSize="14">10</text>
            <text x="180" y="75" fill="#e5e7eb" fontSize="14">20</text>
            <text x="270" y="75" fill="#e5e7eb" fontSize="14">30</text>
            <text x="360" y="75" fill="#6ee7b7" fontSize="12">
              20 in tuple → True
            </text>
          </svg>
        </section>

        {/* ================= NESTED ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            3️⃣ Membership in Nested Tuples
          </h3>

          <EditablePythonCodeBlock
            title="Nested Membership Test"
            initialCode={`t = (1, (2, 3), 4)

print(2 in t)
print((2, 3) in t)`}
          />

          <p className="text-amber-300 text-sm">
            ⚠ Membership checks only the <strong>top level</strong>
          </p>
        </section>

        {/* ================= STRINGS ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            4️⃣ Membership with Strings Inside Tuples
          </h3>

          <EditablePythonCodeBlock
            title="String Membership"
            initialCode={`languages = ("Python", "Java", "C++")

print("Python" in languages)
print("Py" in languages)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Exact match required  
            ❌ Partial match does not work
          </p>
        </section>

        {/* ================= CONDITIONAL ================= */}
        <section className="space-y-4 border border-sky-700 rounded-xl p-4 bg-sky-900/20">
          <h3 className="text-sky-300 font-semibold">
            5️⃣ Using <code>in</code> in Conditions
          </h3>

          <EditablePythonCodeBlock
            title="Using in with if"
            initialCode={`allowed = ("admin", "manager")

user = "admin"

if user in allowed:
    print("Access granted")
else:
    print("Access denied")`}
          />
        </section>

        {/* ================= PERFORMANCE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            6️⃣ Performance Note
          </h3>

          <p className="text-slate-300 text-sm">
            Membership testing in tuples performs a
            <strong> linear search</strong>.
          </p>

          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
            <li>Time complexity: <code>O(n)</code></li>
            <li>Faster than list in some cases (less overhead)</li>
            <li>Slower than set for large data</li>
          </ul>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ Common Mistakes
          </h3>

          <EditablePythonCodeBlock
            title="Common Errors"
            initialCode={`t = (10, 20, 30)

# ❌ Wrong
# print(10 in (20, 30))

# ✔ Correct
print(10 in t)`}
          />

          <ul className="list-disc list-inside text-rose-200 text-sm space-y-1">
            <li>Checking wrong tuple</li>
            <li>Expecting partial matches</li>
          </ul>
        </section>

        {/* ================= EXAM NOTES ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            📝 Exam & Interview Notes
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li><code>in</code> returns True or False</li>
            <li>Membership is shallow, not deep</li>
            <li>Used heavily in conditions</li>
            <li>Tuple membership is O(n)</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic12 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li><code>in</code> checks presence</li>
            <li><code>not in</code> checks absence</li>
            <li>Exact match required</li>
          </ul>
        </footer>

      </div>
    );
  }
}
