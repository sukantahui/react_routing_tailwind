// src/components/study/python/tuples/Topic5.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic5 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Negative Indexing in Tuples
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Python allows accessing tuple elements not only from the beginning,
            but also from the <strong>end</strong> using
            <strong>negative indexing</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            This feature is extremely useful when you want the
            <strong>last or last few elements</strong>.
          </p>
        </header>

        {/* ================= BASIC IDEA ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ What is Negative Indexing?
          </h3>

          <p className="text-slate-300 text-sm">
            Negative indexing starts from <code>-1</code>, which refers to
            the <strong>last element</strong> of the tuple.
          </p>

          <EditablePythonCodeBlock
            title="Basic Negative Indexing"
            initialCode={`t = (10, 20, 30, 40)

print(t[-1])
print(t[-2])`}
          />

          <p className="text-slate-400 text-sm">
            ✔ <code>-1</code> → last element  
            <br />
            ✔ <code>-2</code> → second last element
          </p>
        </section>

        {/* ================= SVG VISUAL ================= */}
        <section className="bg-slate-900/60 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm mb-2 font-semibold">
            🔍 Positive vs Negative Indexing
          </p>

          <svg viewBox="0 0 520 110" className="w-full h-28">
            {/* Boxes */}
            <rect x="10" y="30" width="120" height="40" rx="8" fill="#312e81" />
            <rect x="140" y="30" width="120" height="40" rx="8" fill="#312e81" />
            <rect x="270" y="30" width="120" height="40" rx="8" fill="#312e81" />
            <rect x="400" y="30" width="100" height="40" rx="8" fill="#312e81" />

            {/* Values */}
            <text x="60" y="55" fill="#e0e7ff" fontSize="14" textAnchor="middle">10</text>
            <text x="200" y="55" fill="#e0e7ff" fontSize="14" textAnchor="middle">20</text>
            <text x="330" y="55" fill="#e0e7ff" fontSize="14" textAnchor="middle">30</text>
            <text x="450" y="55" fill="#e0e7ff" fontSize="14" textAnchor="middle">40</text>

            {/* Positive indexes */}
            <text x="60" y="20" fill="#93c5fd" fontSize="11" textAnchor="middle">0</text>
            <text x="200" y="20" fill="#93c5fd" fontSize="11" textAnchor="middle">1</text>
            <text x="330" y="20" fill="#93c5fd" fontSize="11" textAnchor="middle">2</text>
            <text x="450" y="20" fill="#93c5fd" fontSize="11" textAnchor="middle">3</text>

            {/* Negative indexes */}
            <text x="60" y="95" fill="#fca5a5" fontSize="11" textAnchor="middle">-4</text>
            <text x="200" y="95" fill="#fca5a5" fontSize="11" textAnchor="middle">-3</text>
            <text x="330" y="95" fill="#fca5a5" fontSize="11" textAnchor="middle">-2</text>
            <text x="450" y="95" fill="#fca5a5" fontSize="11" textAnchor="middle">-1</text>
          </svg>

          <p className="text-slate-400 text-xs mt-2">
            Negative indexes count backward from the end.
          </p>
        </section>

        {/* ================= NEGATIVE SLICING ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Negative Indexing with Slicing
          </h3>

          <EditablePythonCodeBlock
            title="Negative Index Slicing"
            initialCode={`t = (10, 20, 30, 40, 50)

print(t[-3:])
print(t[-4:-1])`}
          />

          <p className="text-slate-300 text-sm">
            Negative slicing is very helpful for extracting
            the last few elements.
          </p>
        </section>

        {/* ================= COMMON ERROR ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ Common Mistake
          </h3>

          <EditablePythonCodeBlock
            title="Invalid Negative Index"
            initialCode={`t = (1, 2, 3)
print(t[-4])  # ❌ Error`}
          />

          <p className="text-rose-200 text-sm">
            Negative indexes must still be within range.
          </p>
        </section>

        {/* ================= REAL USE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-indigo-300">
            3️⃣ Real-World Use
          </h3>

          <EditablePythonCodeBlock
            title="Access Last Record"
            initialCode={`records = ("A", "B", "C", "D")
print(records[-1])`}
          />

          <p className="text-slate-300 text-sm">
            Negative indexing avoids calculating length manually.
          </p>
        </section>

        {/* ================= EXAM NOTES ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Exam & Interview Notes
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li><code>-1</code> always means last element</li>
            <li>Negative slicing follows the same rules</li>
            <li>Out-of-range still causes IndexError</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic5 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Negative indexing accesses elements from the end</li>
            <li>-1 refers to the last element</li>
            <li>Useful for last records and suffix data</li>
          </ul>
        </footer>

      </div>
    );
  }
}
