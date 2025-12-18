// src/components/study/python/tuples/Topic4.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic4 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-sky-300 tracking-wide">
            Indexing and Slicing Tuples
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Tuples are <strong>ordered collections</strong>, which means
            each element has a fixed position called an <strong>index</strong>.
            Python allows accessing tuple data using
            <strong>indexing and slicing</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            These rules are identical to lists — but remember,
            tuples themselves <strong>cannot be modified</strong>.
          </p>
        </header>

        {/* ================= INDEXING CONCEPT ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ What is Indexing?
          </h3>

          <p className="text-slate-300 text-sm">
            Indexing means accessing a single element using its position.
            Python uses <strong>zero-based indexing</strong>.
          </p>

          <EditablePythonCodeBlock
            title="Basic Indexing"
            initialCode={`t = (10, 20, 30, 40)

print(t[0])
print(t[2])`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Index <code>0</code> refers to the first element.
          </p>
        </section>

        {/* ================= SVG INDEX VISUAL ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔍 Tuple Index Positions
          </p>

          <svg viewBox="0 0 520 90" className="w-full h-24">
            <rect x="10" y="20" width="120" height="40" rx="8" fill="#064e3b" />
            <rect x="140" y="20" width="120" height="40" rx="8" fill="#064e3b" />
            <rect x="270" y="20" width="120" height="40" rx="8" fill="#064e3b" />
            <rect x="400" y="20" width="100" height="40" rx="8" fill="#064e3b" />

            <text x="60" y="45" fill="#ecfeff" fontSize="14" textAnchor="middle">10</text>
            <text x="200" y="45" fill="#ecfeff" fontSize="14" textAnchor="middle">20</text>
            <text x="330" y="45" fill="#ecfeff" fontSize="14" textAnchor="middle">30</text>
            <text x="450" y="45" fill="#ecfeff" fontSize="14" textAnchor="middle">40</text>

            <text x="60" y="75" fill="#a7f3d0" fontSize="11" textAnchor="middle">Index 0</text>
            <text x="200" y="75" fill="#a7f3d0" fontSize="11" textAnchor="middle">Index 1</text>
            <text x="330" y="75" fill="#a7f3d0" fontSize="11" textAnchor="middle">Index 2</text>
            <text x="450" y="75" fill="#a7f3d0" fontSize="11" textAnchor="middle">Index 3</text>
          </svg>
        </section>

        {/* ================= SLICING ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-indigo-300">
            2️⃣ Slicing Tuples
          </h3>

          <p className="text-slate-300 text-sm">
            Slicing extracts a <strong>portion</strong> of a tuple.
            The syntax is:
          </p>

          <p className="text-slate-400 text-sm font-mono">
            tuple[start : end]
          </p>

          <EditablePythonCodeBlock
            title="Tuple Slicing"
            initialCode={`t = (10, 20, 30, 40, 50)

print(t[1:4])
print(t[:3])
print(t[2:])`}
          />

          <p className="text-slate-400 text-sm">
            ✔ The end index is <strong>excluded</strong>.
          </p>
        </section>

        {/* ================= SLICING RETURNS TUPLE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ Important Observation
          </h3>

          <EditablePythonCodeBlock
            title="Type After Slicing"
            initialCode={`t = (1, 2, 3, 4)
part = t[1:3]

print(part)
print(type(part))`}
          />

          <p className="text-slate-300 text-sm">
            Slicing a tuple always produces a <strong>new tuple</strong>.
          </p>
        </section>

        {/* ================= INDEX ERROR ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ IndexError (Very Common)
          </h3>

          <EditablePythonCodeBlock
            title="Invalid Index Access"
            initialCode={`t = (1, 2, 3)
print(t[5])  # ❌ Error`}
          />

          <p className="text-rose-200 text-sm">
            Accessing an index outside the range raises <strong>IndexError</strong>.
          </p>
        </section>

        {/* ================= EXAM NOTES ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Exam & Interview Notes
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>Indexing starts from 0</li>
            <li>Slicing never modifies the original tuple</li>
            <li>End index is always excluded</li>
            <li>Out-of-range index causes IndexError</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic4 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Tuples support indexing and slicing</li>
            <li>Indexing accesses single elements</li>
            <li>Slicing extracts a new tuple</li>
            <li>Original tuple always remains unchanged</li>
          </ul>
        </footer>

      </div>
    );
  }
}
