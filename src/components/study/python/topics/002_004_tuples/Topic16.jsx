// src/components/study/python/tuples/Topic16.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic16 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Performance Benefits of Tuples
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Tuples are not just about immutability — they are
            <strong> faster, lighter, and safer</strong> than lists.
          </p>

          <p className="text-slate-400 text-sm">
            This is why Python internally uses tuples in many places.
          </p>
        </header>

        {/* ================= MEMORY ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Tuples Use Less Memory
          </h3>

          <EditablePythonCodeBlock
            title="Memory Comparison"
            initialCode={`import sys

lst = [1, 2, 3, 4, 5]
tup = (1, 2, 3, 4, 5)

print(sys.getsizeof(lst))
print(sys.getsizeof(tup))`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Tuples store only values  
            ✔ Lists store values + resizing metadata
          </p>
        </section>

        {/* ================= SPEED ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Faster Iteration
          </h3>

          <EditablePythonCodeBlock
            title="Iteration Speed Concept"
            initialCode={`# Conceptual example
for i in (1, 2, 3, 4):
    pass

for i in [1, 2, 3, 4]:
    pass`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Tuples are faster because Python trusts immutability  
            ✔ No need to check for changes
          </p>
        </section>

        {/* ================= SVG ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            ⚡ Why Tuples Are Faster (Concept)
          </p>

          <svg viewBox="0 0 520 180" className="w-full h-44">
            {/* Tuple */}
            <rect x="40" y="40" width="180" height="60" rx="10" fill="#064e3b" />
            <text x="130" y="75" fill="#ecfeff" fontSize="13" textAnchor="middle">
              Tuple → Fixed Size
            </text>
            <text x="130" y="95" fill="#a7f3d0" fontSize="11" textAnchor="middle">
              No resize checks
            </text>

            {/* Arrow */}
            <text x="240" y="80" fill="#94a3b8" fontSize="22">→</text>

            {/* CPU */}
            <rect x="280" y="40" width="200" height="60" rx="10" fill="#1e293b" />
            <text x="380" y="75" fill="#e5e7eb" fontSize="13" textAnchor="middle">
              Faster Execution
            </text>
          </svg>
        </section>

        {/* ================= HASHING ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Hashing & Dictionary Optimization
          </h3>

          <EditablePythonCodeBlock
            title="Tuple as Dictionary Key"
            initialCode={`locations = {
    (22.57, 88.36): "Kolkata",
    (28.61, 77.20): "Delhi"
}

print(locations[(28.61, 77.20)])`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Immutable → hashable  
            ✔ Enables fast dictionary lookup
          </p>
        </section>

        {/* ================= INTERNAL PYTHON ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Python Internals Prefer Tuples
          </h3>

          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Function arguments internally treated as tuples</li>
            <li>Multiple return values use tuples</li>
            <li>Fixed-size records use tuples</li>
          </ul>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            5️⃣ Real-World Optimization Example
          </h3>

          <EditablePythonCodeBlock
            title="Coordinates Example"
            initialCode={`# Using tuple for performance & safety
point = (22.57, 88.36)

# Bad design with list
point_list = [22.57, 88.36]

# point[0] = 0  ❌ Not allowed (safe)
point_list[0] = 0  # ✔ Accidentally allowed`}
          />
        </section>

        {/* ================= WHEN NOT TO ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            ⚠️ When NOT to Use Tuples
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>When data must change frequently</li>
            <li>When size is not fixed</li>
            <li>When you need many built-in methods</li>
          </ul>
        </section>

        {/* ================= INTERVIEW SECRET ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            💡 Interview Secret
          </h3>

          <p className="text-indigo-200 text-sm">
            Saying “tuples are faster because they are immutable” is not enough.  
            The real reason is:  
            <strong>Python skips safety checks and resizing logic</strong>.
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic16 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Tuples use less memory</li>
            <li>Tuples are faster to iterate</li>
            <li>Tuples enable hashing</li>
            <li>Preferred for fixed, read-only data</li>
          </ul>
        </footer>

      </div>
    );
  }
}
