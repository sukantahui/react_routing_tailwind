// src/components/study/python/lists/Topic16.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";
const hoverCard =
  "transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-rose-500/20";

export default class Topic16 extends Component {
  render() {
    return (
      <div className={`space-y-16 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-rose-300 tracking-wide animate-[slideDown_0.6s_ease-out]">
            Copying Lists: Shallow Copy vs Reference
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed animate-[fadeIn_1s_ease-out]">
            Understanding how lists are copied is critical to avoid
            <strong> silent bugs and unexpected data changes</strong>.
          </p>
        </header>

        {/* ================= REFERENCE COPY ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-red-300">
            1️⃣ Reference Copy (Assignment)
          </h3>

          <p className="text-slate-300 text-sm">
            Assignment does <strong>not</strong> create a new list.
            It only copies the reference.
          </p>

          <EditablePythonCodeBlock
            title="Reference Copy Example"
            initialCode={`a = [1, 2, 3]
b = a

b.append(4)

print(a)
print(b)`}
          />

          <p className="text-red-200 text-sm">
            ❗ Both variables point to the same list.
          </p>
        </section>

        {/* ================= VISUAL ================= */}
        <section
          className={`bg-slate-900/60 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm mb-3 font-semibold">
            🔗 Reference Relationship (Hover)
          </p>

          <svg viewBox="0 0 520 120" className="w-full h-32">
            <rect x="40" y="40" width="120" height="40" rx="8" fill="#7f1d1d" />
            <text x="100" y="66" fill="#fff" fontSize="13" textAnchor="middle">
              a
            </text>

            <rect x="200" y="40" width="120" height="40" rx="8" fill="#7f1d1d" />
            <text x="260" y="66" fill="#fff" fontSize="13" textAnchor="middle">
              b
            </text>

            <rect x="380" y="30" width="100" height="60" rx="10" fill="#0f172a" />
            <text x="430" y="66" fill="#e5e7eb" fontSize="12" textAnchor="middle">
              [1, 2, 3, 4]
            </text>

            <line x1="160" y1="60" x2="380" y2="60" stroke="#e5e7eb" />
            <line x1="320" y1="60" x2="380" y2="60" stroke="#e5e7eb" />
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            a and b → same memory object
          </p>
        </section>

        {/* ================= SHALLOW COPY ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-emerald-300">
            2️⃣ Shallow Copy (Correct Way)
          </h3>

          <p className="text-slate-300 text-sm">
            A shallow copy creates a <strong>new list</strong> with the same elements.
          </p>

          <EditablePythonCodeBlock
            title="Using copy()"
            initialCode={`a = [1, 2, 3]
b = a.copy()

b.append(4)

print(a)
print(b)`}
          />
        </section>

        {/* ================= OTHER METHODS ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-sky-300">
            3️⃣ Other Ways to Copy Lists
          </h3>

          <EditablePythonCodeBlock
            title="Different Shallow Copy Methods"
            initialCode={`a = [1, 2, 3]

b = a[:]          # slicing
c = list(a)       # list constructor

print(b, c)`}
          />
        </section>

        {/* ================= NESTED LIST PROBLEM ================= */}
        <section
          className={`border border-amber-700 rounded-xl p-4 bg-amber-900/20 ${hoverCard}`}
        >
          <h3 className="text-amber-300 font-semibold">
            ⚠ Shallow Copy with Nested Lists
          </h3>

          <EditablePythonCodeBlock
            title="Hidden Trap"
            initialCode={`a = [[1, 2], [3, 4]]
b = a.copy()

b[0][0] = 99
print(a)`}
          />

          <p className="text-amber-200 text-sm">
            Inner lists are still shared.
          </p>
        </section>

        {/* ================= DEEP COPY ================= */}
        <section className={`space-y-4 ${hoverCard}`}>
          <h3 className="text-xl font-semibold text-green-300">
            4️⃣ Deep Copy (Complete Separation)
          </h3>

          <EditablePythonCodeBlock
            title="Using deepcopy()"
            initialCode={`import copy

a = [[1, 2], [3, 4]]
b = copy.deepcopy(a)

b[0][0] = 99
print(a)
print(b)`}
          />
        </section>

        {/* ================= COMPARISON TABLE ================= */}
        <section
          className={`border border-indigo-700 rounded-xl p-4 bg-indigo-900/20 ${hoverCard}`}
        >
          <h3 className="text-indigo-300 font-semibold">
            🧠 Comparison Summary
          </h3>

          <ul className="list-disc list-inside text-indigo-200 text-sm space-y-1">
            <li><code>=</code> → same reference</li>
            <li><code>copy()</code> / slicing → shallow copy</li>
            <li><code>deepcopy()</code> → full independent copy</li>
          </ul>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section
          className={`border border-emerald-700 rounded-xl p-4 bg-emerald-900/20 ${hoverCard}`}
        >
          <h3 className="text-emerald-300 font-semibold">
            🌍 Real-World Example
          </h3>

          <EditablePythonCodeBlock
            title="Template Configuration"
            initialCode={`default_settings = ["dark", True, 30]

user_settings = default_settings.copy()
user_settings[2] = 60

print(default_settings)
print(user_settings)`}
          />
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section
          className={`border border-rose-700 rounded-xl p-4 bg-rose-900/20 ${hoverCard}`}
        >
          <h3 className="text-rose-300 font-semibold">
            👨‍🏫 Teacher Note
          </h3>

          <p className="text-rose-200 text-sm">
            ✔ Use <code>=</code> only when shared data is intentional  
            ✔ Use <code>copy()</code> for flat lists  
            ✔ Use <code>deepcopy()</code> for nested structures
          </p>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer
          className={`bg-slate-900/70 border border-slate-700 rounded-xl p-4 ${hoverCard}`}
        >
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic16 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Assignment copies reference</li>
            <li>Shallow copy duplicates outer list</li>
            <li>Deep copy duplicates everything</li>
          </ul>
        </footer>

      </div>
    );
  }
}
