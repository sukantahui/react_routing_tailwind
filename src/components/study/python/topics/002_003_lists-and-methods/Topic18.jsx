// src/components/study/python/lists/Topic18.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-violet-500/20";

export default class Topic18 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-violet-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Lists vs Tuples: When to Use What
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Lists and tuples both store ordered data, but choosing the right one
            depends on <strong>mutability, intent, safety, and performance</strong>.
          </p>
        </header>

        {/* ================= CORE DIFFERENCE ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Core Difference: Mutability
          </h3>

          <EditablePythonCodeBlock
            title="Mutability Comparison"
            initialCode={`# List (mutable)
nums = [1, 2, 3]
nums.append(4)
print(nums)

# Tuple (immutable)
coords = (10, 20)
# coords.append(30)  # ❌ AttributeError`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Lists can change  
            ✔ Tuples cannot be modified after creation
          </p>
        </section>

        {/* ================= VISUAL INTUITION ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🧠 Conceptual Model (Hover)
          </p>

          <svg viewBox="0 0 520 140" className="w-full h-36">
            <rect x="40" y="50" width="160" height="50" rx="10" fill="#0f766e" />
            <text x="120" y="80" fill="#e5e7eb" fontSize="14" textAnchor="middle">
              List → Changeable
            </text>

            <rect x="320" y="50" width="160" height="50" rx="10" fill="#4338ca" />
            <text x="400" y="80" fill="#e5e7eb" fontSize="14" textAnchor="middle">
              Tuple → Fixed
            </text>
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Lists = working data | Tuples = fixed data
          </p>
        </section>

        {/* ================= PERFORMANCE ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Performance & Memory
          </h3>

          <EditablePythonCodeBlock
            title="Memory Comparison"
            initialCode={`import sys

lst = [1, 2, 3]
tup = (1, 2, 3)

print(sys.getsizeof(lst))
print(sys.getsizeof(tup))`}
          />

          <p className="text-slate-400 text-sm">
            Tuples usually consume less memory and are slightly faster to access.
          </p>
        </section>

        {/* ================= INTENT ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            3️⃣ Intent & Meaning
          </h3>

          <EditablePythonCodeBlock
            title="Expressing Intent Clearly"
            initialCode={`# Fixed meaning → tuple
coordinate = (22.57, 88.36)

# Changeable collection → list
marks = [56, 78, 91]`}
          />

          <p className="text-slate-400 text-sm">
            Tuples communicate: “This should not change”.
          </p>
        </section>

        {/* ================= SAFETY ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            🛡 Safety & Bug Prevention
          </h3>

          <EditablePythonCodeBlock
            title="Tuples Prevent Accidental Changes"
            initialCode={`def move(point):
    # point[0] += 1   # ❌ Error if tuple
    print(point)

move((5, 7))`}
          />

          <p className="text-red-200 text-sm">
            Tuples protect data from unintended modification.
          </p>
        </section>

        {/* ================= DICTIONARY KEYS ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-indigo-300">
            4️⃣ Tuples as Dictionary Keys
          </h3>

          <EditablePythonCodeBlock
            title="Why Tuples Are Used as Keys"
            initialCode={`locations = {
    (22.57, 88.36): "Kolkata",
    (28.61, 77.20): "Delhi"
}

print(locations[(22.57, 88.36)])`}
          />

          <p className="text-slate-400 text-sm">
            Lists cannot be dictionary keys because they are mutable.
          </p>
        </section>

        {/* ================= WHEN TO USE ================= */}
        <section
          className={`border border-green-700 rounded-xl p-4 bg-green-900/20 ${hoverCard}`}
        >
          <h3 className="text-green-300 font-semibold">
            ✔ When to Use What
          </h3>

          <ul className="list-disc list-inside text-green-200 text-sm space-y-1">
            <li>Use <strong>list</strong> for dynamic data</li>
            <li>Use <strong>tuple</strong> for fixed records</li>
            <li>Use <strong>tuple</strong> for dictionary keys</li>
            <li>Use <strong>list</strong> when mutation is required</li>
          </ul>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section
          className={`border border-emerald-700 rounded-xl p-4 bg-emerald-900/20 ${hoverCard}`}
        >
          <h3 className="text-emerald-300 font-semibold">
            🌍 Real-World Examples
          </h3>

          <EditablePythonCodeBlock
            title="Choosing Correct Structure"
            initialCode={`# Student record (fixed structure)
student = ("Ritaja", 16, "ISC")

# Shopping cart (dynamic)
cart = ["Pen", "Notebook"]
cart.append("Pencil")`}
          />
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-violet-700 rounded-xl p-4 bg-violet-900/20 ${hoverCard}`}
        >
          <h3 className="text-violet-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-violet-200 text-sm">
            ✔ Data structure choice reflects thinking maturity  
            ✔ Tuples express intent and safety  
            ✔ Lists express flexibility and change
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic18 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Lists are mutable, tuples are immutable</li>
            <li>Tuples are safer and faster</li>
            <li>Choose based on intent, not habit</li>
          </ul>
        </footer>

      </div>
    );
  }
}
