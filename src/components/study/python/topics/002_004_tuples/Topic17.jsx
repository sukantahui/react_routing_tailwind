
// src/components/study/python/tuples/Topic17.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic17 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Tuples as Dictionary Keys
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            One powerful feature of tuples is that they can be used as
            <strong> dictionary keys</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            This is possible because tuples are <strong>immutable</strong>.
          </p>
        </header>

        {/* ================= WHY POSSIBLE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Why Tuples Can Be Dictionary Keys
          </h3>

          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Dictionary keys must be immutable</li>
            <li>Tuples do not change after creation</li>
            <li>Tuples are hashable (if elements are immutable)</li>
          </ul>
        </section>

        {/* ================= BASIC EXAMPLE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Basic Example
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
            ✔ Each tuple represents a coordinate  
            ✔ Clean, fast, and safe lookup
          </p>
        </section>

        {/* ================= INVALID CASE ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ Why Lists Cannot Be Keys
          </h3>

          <EditablePythonCodeBlock
            title="Invalid Dictionary Key"
            initialCode={`# ❌ This will raise TypeError
# locations = {
#     [22.57, 88.36]: "Kolkata"
# }`}
          />

          <p className="text-rose-200 text-sm">
            Lists are mutable → not hashable → invalid keys
          </p>
        </section>

        {/* ================= HASHING RULE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Hashing Rule (IMPORTANT)
          </h3>

          <EditablePythonCodeBlock
            title="Nested Immutability Rule"
            initialCode={`# ✔ Valid
key1 = (1, 2, 3)

# ❌ Invalid (contains a list)
# key2 = (1, [2, 3])`}
          />

          <p className="text-slate-400 text-sm">
            ✔ All elements inside the tuple must also be immutable
          </p>
        </section>

        {/* ================= SVG ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔐 Key Validity Rule (Conceptual)
          </p>

          <svg viewBox="0 0 520 180" className="w-full h-44">
            {/* Valid */}
            <rect x="40" y="40" width="200" height="50" rx="10" fill="#064e3b" />
            <text x="140" y="70" fill="#ecfeff" fontSize="13" textAnchor="middle">
              (1, 2, 3) → Valid Key
            </text>

            {/* Arrow */}
            <text x="260" y="70" fill="#94a3b8" fontSize="22">✔</text>

            {/* Invalid */}
            <rect x="40" y="100" width="200" height="50" rx="10" fill="#7f1d1d" />
            <text x="140" y="130" fill="#fee2e2" fontSize="13" textAnchor="middle">
              (1, [2,3]) → Invalid Key
            </text>
          </svg>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Real-World Use Cases
          </h3>

          <EditablePythonCodeBlock
            title="Matrix Coordinates"
            initialCode={`matrix = {
    (0, 0): 1,
    (0, 1): 2,
    (1, 0): 3,
    (1, 1): 4
}

print(matrix[(1, 0)])`}
          />

          <EditablePythonCodeBlock
            title="Student Records (Composite Key)"
            initialCode={`students = {
    ("Ritaja", 9): 88,
    ("Mounita", 9): 92
}

print(students[("Mounita", 9)])`}
          />
        </section>

        {/* ================= WHY BETTER ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            5️⃣ Why Tuples Are Better Keys Than Strings
          </h3>

          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Avoid string concatenation hacks</li>
            <li>More structured data</li>
            <li>Prevents accidental key collisions</li>
          </ul>
        </section>

        {/* ================= EXAM TRAPS ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            ⚠️ Exam Traps
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>Tuple with list inside → invalid key</li>
            <li>Confusing tuple immutability with content immutability</li>
            <li>Trying to modify tuple key after insertion</li>
          </ul>
        </section>

        {/* ================= INTERVIEW SECRET ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            💡 Interview Secret
          </h3>

          <p className="text-indigo-200 text-sm">
            Tuples as keys are commonly used in  
            <strong>caching, memoization, coordinate systems, and graph algorithms</strong>.
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic17 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Tuples are valid dictionary keys</li>
            <li>All elements must be immutable</li>
            <li>Lists are invalid as keys</li>
            <li>Used for composite and structured keys</li>
          </ul>
        </footer>

      </div>
    );
  }
}
