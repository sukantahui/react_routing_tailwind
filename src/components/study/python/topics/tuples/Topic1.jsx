// src/components/study/python/tuples/Topic1.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic1 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-sky-300 tracking-wide">
            Creating Tuples in Python
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            In Python, tuples can be created in <strong>multiple ways</strong>.
            Understanding these forms is crucial because
            <strong>syntax mistakes are very common in exams and interviews</strong>.
          </p>

          <p className="text-slate-400 text-sm">
            In this topic, we will learn every valid way to create tuples and
            understand <strong>why Python behaves the way it does</strong>.
          </p>
        </header>

        {/* ================= BASIC CREATION ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Creating Tuples Using Parentheses
          </h3>

          <EditablePythonCodeBlock
            title="Tuple with Parentheses"
            initialCode={`t = (10, 20, 30)
print(t)
print(type(t))`}
          />

          <p className="text-slate-300 text-sm">
            This is the most readable and commonly used form.
          </p>

          <p className="text-slate-400 text-xs">
            ✔ Recommended for beginners and teaching code.
          </p>
        </section>

        {/* ================= WITHOUT PARENTHESES ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            2️⃣ Creating Tuples Without Parentheses (Tuple Packing)
          </h3>

          <EditablePythonCodeBlock
            title="Tuple Packing"
            initialCode={`t = 10, 20, 30
print(t)
print(type(t))`}
          />

          <p className="text-slate-300 text-sm">
            Python automatically packs comma-separated values into a tuple.
          </p>

          <div className="bg-indigo-900/20 border border-indigo-700 rounded-lg p-3">
            <p className="text-indigo-300 text-sm font-semibold">
              👨‍🏫 Teacher Insight
            </p>
            <p className="text-indigo-200 text-xs">
              Parentheses are optional, but <strong>commas are mandatory</strong>.
              This is one of the most misunderstood tuple rules.
            </p>
          </div>
        </section>

        {/* ================= SINGLE ELEMENT ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-amber-300">
            3️⃣ Single-Element Tuple (The Trailing Comma Rule)
          </h3>

          <EditablePythonCodeBlock
            title="Single Element Trap"
            initialCode={`a = (5)
b = (5,)

print(a, type(a))
print(b, type(b))`}
          />

          <p className="text-slate-300 text-sm">
            A single value inside parentheses is <strong>not</strong> a tuple.
          </p>

          <div className="bg-amber-900/20 border border-amber-700 rounded-lg p-3">
            <p className="text-amber-300 text-sm font-semibold">
              ⚠ Exam Alert
            </p>
            <p className="text-amber-200 text-xs">
              <code>(5)</code> → int  
              <br />
              <code>(5,)</code> → tuple
            </p>
          </div>
        </section>

        {/* ================= EMPTY TUPLE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            4️⃣ Creating an Empty Tuple
          </h3>

          <EditablePythonCodeBlock
            title="Empty Tuple"
            initialCode={`t = ()
print(t)
print(type(t))`}
          />

          <p className="text-slate-300 text-sm">
            An empty tuple must use parentheses.
          </p>

          <p className="text-slate-400 text-xs">
            ❌ There is no alternative syntax for empty tuple creation.
          </p>
        </section>

        {/* ================= TUPLE FROM ITERABLE ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            5️⃣ Creating Tuples Using tuple() Constructor
          </h3>

          <EditablePythonCodeBlock
            title="tuple() Constructor"
            initialCode={`t1 = tuple([1, 2, 3])
t2 = tuple("ABC")

print(t1)
print(t2)`}
          />

          <p className="text-slate-300 text-sm">
            The <code>tuple()</code> constructor converts any iterable into a tuple.
          </p>

          <div className="bg-sky-900/20 border border-sky-700 rounded-lg p-3">
            <p className="text-sky-300 text-sm font-semibold">
              Hidden Detail
            </p>
            <p className="text-sky-200 text-xs">
              Strings are iterables, so each character becomes an element.
            </p>
          </div>
        </section>

        {/* ================= NESTED TUPLES ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            6️⃣ Creating Nested Tuples
          </h3>

          <EditablePythonCodeBlock
            title="Nested Tuple"
            initialCode={`t = (1, (2, 3), (4, 5))
print(t)
print(t[1])`}
          />

          <p className="text-slate-300 text-sm">
            Tuples can contain other tuples, forming structured data.
          </p>
        </section>

        {/* ================= COMMON ERRORS ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ Common Tuple Creation Mistakes
          </h3>

          <ul className="list-disc list-inside text-rose-200 text-sm space-y-1">
            <li>Forgetting trailing comma in single-element tuple</li>
            <li>Thinking parentheses create tuples</li>
            <li>Confusing tuple() with dict()</li>
            <li>Assuming empty tuple can be created without ()</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic1 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Tuples can be created with or without parentheses</li>
            <li>Commas define tuples, not brackets</li>
            <li>Single-element tuples require a trailing comma</li>
            <li>tuple() converts iterables into tuples</li>
          </ul>
        </footer>

      </div>
    );
  }
}
