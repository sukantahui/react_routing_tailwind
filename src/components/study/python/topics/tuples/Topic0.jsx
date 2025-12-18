// src/components/study/python/tuples/Topic0.jsx

import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic0 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            🧩 Python Tuples — Introduction & Fundamentals
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            A <strong>tuple</strong> is a built-in Python data structure used to store
            an <strong>ordered collection of fixed values</strong>.
            Once created, a tuple <strong>cannot be modified</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            Tuples are commonly used when data should remain
            <strong>constant, safe, and predictable</strong>.
          </p>
        </header>

        {/* ================= SVG: TUPLE OVERVIEW ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔍 Tuple Structure (Conceptual View)
          </p>

          <svg viewBox="0 0 520 90" className="w-full h-24">
            <rect x="10" y="20" width="120" height="40" rx="8" fill="#312e81" />
            <rect x="140" y="20" width="120" height="40" rx="8" fill="#312e81" />
            <rect x="270" y="20" width="120" height="40" rx="8" fill="#312e81" />
            <rect x="400" y="20" width="100" height="40" rx="8" fill="#312e81" />

            <text x="60" y="45" fill="#e0e7ff" fontSize="14" textAnchor="middle">10</text>
            <text x="200" y="45" fill="#e0e7ff" fontSize="14" textAnchor="middle">20</text>
            <text x="330" y="45" fill="#e0e7ff" fontSize="14" textAnchor="middle">30</text>
            <text x="450" y="45" fill="#e0e7ff" fontSize="14" textAnchor="middle">40</text>

            <text x="60" y="75" fill="#94a3b8" fontSize="11" textAnchor="middle">Index 0</text>
            <text x="200" y="75" fill="#94a3b8" fontSize="11" textAnchor="middle">Index 1</text>
            <text x="330" y="75" fill="#94a3b8" fontSize="11" textAnchor="middle">Index 2</text>
            <text x="450" y="75" fill="#94a3b8" fontSize="11" textAnchor="middle">Index 3</text>
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Tuple elements are ordered, indexed, and immutable.
          </p>
        </section>

        {/* ================= CREATING TUPLES ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Creating Tuples
          </h3>

          <EditableCodeBlock
            title="Tuple Creation"
            initialCode={`# With parentheses
t1 = (10, 20, 30)

# Without parentheses (tuple packing)
t2 = 10, 20, 30

print(t1)
print(t2)`}
          />

          <p className="text-slate-300 text-sm">
            Parentheses are optional, but commas are mandatory.
          </p>

          <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3">
            <p className="text-amber-300 text-sm font-semibold">
              👨‍🏫 Teacher Note
            </p>
            <p className="text-amber-200 text-xs">
              Many beginners think parentheses create tuples.
              Actually, <strong>commas do</strong>.
            </p>
          </div>
        </section>

        {/* ================= SINGLE ELEMENT ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            2️⃣ Single-Element Tuples
          </h3>

          <EditableCodeBlock
            title="Trailing Comma Rule"
            initialCode={`a = (5)
b = (5,)

print(type(a))
print(type(b))`}
          />

          <p className="text-slate-300 text-sm">
            A trailing comma is required to create a single-element tuple.
          </p>
        </section>

        {/* ================= IMMUTABILITY ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-rose-300">
            3️⃣ Immutability of Tuples
          </h3>

          <EditableCodeBlock
            title="Immutability Example"
            initialCode={`t = (1, 2, 3)
t[0] = 10  # ❌ Error`}
          />

          <p className="text-slate-300 text-sm">
            Tuples cannot be changed after creation.
          </p>

          <div className="bg-rose-900/20 border border-rose-700 rounded-lg p-3">
            <p className="text-rose-300 text-sm font-semibold">
              Why are tuples immutable?
            </p>
            <ul className="list-disc list-inside text-rose-200 text-xs space-y-1">
              <li>Data safety</li>
              <li>Performance optimization</li>
              <li>Hashable (usable as dictionary keys)</li>
            </ul>
          </div>
        </section>

        {/* ================= UNPACKING ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Tuple Packing & Unpacking
          </h3>

          <EditableCodeBlock
            title="Unpacking Example"
            initialCode={`data = (10, 20, 30)
a, b, c = data

print(a, b, c)`}
          />

          <p className="text-slate-300 text-sm">
            Python automatically assigns tuple values to variables.
          </p>
        </section>

        {/* ================= INDEXING ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            5️⃣ Indexing, Slicing & Negative Indexing
          </h3>

          <EditableCodeBlock
            title="Accessing Tuple Elements"
            initialCode={`t = (10, 20, 30, 40)

print(t[0])
print(t[-1])
print(t[1:3])`}
          />

          <p className="text-slate-300 text-sm">
            Tuples support indexing and slicing just like lists.
          </p>
        </section>

        {/* ================= METHODS ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-lime-300">
            6️⃣ Tuple Methods
          </h3>

          <EditableCodeBlock
            title="count() and index()"
            initialCode={`t = (1, 2, 2, 3)

print(t.count(2))
print(t.index(3))`}
          />

          <p className="text-slate-300 text-sm">
            Tuples have only two methods — minimal but efficient.
          </p>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-indigo-300">
            7️⃣ Real-World Use Cases
          </h3>

          <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
            <li>Coordinates → <code>(x, y)</code></li>
            <li>RGB colors → <code>(255, 0, 0)</code></li>
            <li>Database records</li>
            <li>Function returning multiple values</li>
            <li>Dictionary keys</li>
          </ul>

          <EditableCodeBlock
            title="Tuple as Dictionary Key"
            initialCode={`location = {(10,20): "Park"}
print(location[(10,20)])`}
          />
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Key Takeaways
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Tuples are ordered and immutable</li>
            <li>Use tuples for fixed, safe data</li>
            <li>Tuples are faster than lists</li>
            <li>Ideal for records and mappings</li>
          </ul>
        </footer>

      </div>
    );
  }
}
