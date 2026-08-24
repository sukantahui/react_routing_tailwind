// src/components/study/python/lists/Topic19.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20";

export default class Topic19 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Lists vs Sets vs Dictionaries
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Python provides multiple collection types.  
            The key skill is knowing <strong>which one to use and why</strong>.
          </p>
        </header>

        {/* ================= BASIC OVERVIEW ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Basic Nature of Each Structure
          </h3>

          <EditablePythonCodeBlock
            title="Basic Examples"
            initialCode={`# List → ordered, allows duplicates
fruits = ["apple", "banana", "apple"]

# Set → unordered, unique values
unique_fruits = {"apple", "banana"}

# Dictionary → key-value mapping
marks = {"Ritaja": 92, "Mounita": 88}

print(fruits)
print(unique_fruits)
print(marks)`}
          />
        </section>

        {/* ================= VISUAL INTUITION ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🧠 Conceptual View (Hover)
          </p>

          <svg viewBox="0 0 620 150" className="w-full h-40">
            <rect x="30" y="50" width="160" height="50" rx="10" fill="#0f766e" />
            <text x="110" y="80" fill="#e5e7eb" fontSize="14" textAnchor="middle">
              List → Sequence
            </text>

            <rect x="230" y="50" width="160" height="50" rx="10" fill="#7c2d12" />
            <text x="310" y="80" fill="#e5e7eb" fontSize="14" textAnchor="middle">
              Set → Unique
            </text>

            <rect x="430" y="50" width="160" height="50" rx="10" fill="#4338ca" />
            <text x="510" y="80" fill="#e5e7eb" fontSize="14" textAnchor="middle">
              Dict → Mapping
            </text>
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Order | Uniqueness | Key-value relationship
          </p>
        </section>

        {/* ================= ORDER & ACCESS ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Order & Access Pattern
          </h3>

          <EditablePythonCodeBlock
            title="Access Comparison"
            initialCode={`lst = ["a", "b", "c"]
st = {"a", "b", "c"}
dct = {"a": 1, "b": 2}

print(lst[0])       # index-based
# print(st[0])      # ❌ error
print(dct["a"])    # key-based`}
          />

          <p className="text-slate-400 text-sm">
            Lists → index | Sets → no direct access | Dicts → key-based access
          </p>
        </section>

        {/* ================= DUPLICATES ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-amber-300">
            3️⃣ Handling Duplicates
          </h3>

          <EditablePythonCodeBlock
            title="Duplicate Behavior"
            initialCode={`data = [1, 2, 2, 3, 3]

print(data)
print(set(data))`}
          />

          <p className="text-slate-400 text-sm">
            Sets automatically remove duplicates.
          </p>
        </section>

        {/* ================= PERFORMANCE ================= */}
        <section
          className={`border border-purple-700 rounded-xl p-4 bg-purple-900/20 ${hoverCard}`}
        >
          <h3 className="text-purple-300 font-semibold">
            ⚡ Performance Insight
          </h3>

          <EditablePythonCodeBlock
            title="Lookup Speed"
            initialCode={`nums = list(range(100000))
nums_set = set(nums)

print(99999 in nums)
print(99999 in nums_set)`}
          />

          <p className="text-purple-200 text-sm">
            Sets and dictionaries are much faster for lookups.
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
            <li><strong>List</strong> → ordered data, indexing, duplicates allowed</li>
            <li><strong>Set</strong> → uniqueness, fast membership tests</li>
            <li><strong>Dictionary</strong> → labeled data, mappings, configs</li>
          </ul>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section
          className={`border border-emerald-700 rounded-xl p-4 bg-emerald-900/20 ${hoverCard}`}
        >
          <h3 className="text-emerald-300 font-semibold">
            🌍 Real-World Use Cases
          </h3>

          <EditablePythonCodeBlock
            title="Practical Choices"
            initialCode={`# Attendance list (order matters)
attendance = ["Ritaja", "Mounita", "Ritaja"]

# Unique registered users
users = set(attendance)

# Student marks mapping
marks = {
    "Ritaja": 92,
    "Mounita": 88
}

print(attendance)
print(users)
print(marks["Ritaja"])`}
          />
        </section>

        {/* ================= COMMON MISTAKE ================= */}
        <section
          className={`border border-red-700 rounded-xl p-4 bg-red-900/20 ${hoverCard}`}
        >
          <h3 className="text-red-300 font-semibold">
            ❌ Common Mistake
          </h3>

          <p className="text-red-200 text-sm">
            Using lists for membership checks when sets are required — leads to
            poor performance.
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h3 className="text-indigo-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-indigo-200 text-sm">
            ✔ Data structure choice reflects problem understanding  
            ✔ Professionals choose structures for performance and clarity  
            ✔ Wrong choice = slow and buggy programs
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic19 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Lists → ordered collections</li>
            <li>Sets → unique elements</li>
            <li>Dictionaries → key-value mappings</li>
          </ul>
        </footer>

      </div>
    );
  }
}
