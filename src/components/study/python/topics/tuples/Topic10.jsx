// src/components/study/python/tuples/Topic10.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic10 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Tuple Methods: <code>count()</code> and <code>index()</code>
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Tuples have very few methods because they are immutable.  
            The two most important ones are <strong>count()</strong> and <strong>index()</strong>.
          </p>
        </header>

        {/* ================= COUNT ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ <code>count()</code> Method
          </h3>

          <p className="text-slate-300 text-sm">
            The <code>count()</code> method returns the number of times
            a value appears in a tuple.
          </p>

          <p className="text-slate-400 text-sm">
            <strong>Syntax:</strong> <code>tuple.count(value)</code>  
            <br />
            <strong>Return type:</strong> <code>int</code>
          </p>

          <EditablePythonCodeBlock
            title="Basic count() Example"
            initialCode={`t = (1, 2, 3, 2, 2, 4)

print(t.count(2))
print(t.count(5))`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Returns 0 if value is not present  
            ✔ Never raises an error
          </p>
        </section>

        {/* ================= COUNT EDGE ================= */}
        <section className="space-y-4 border border-indigo-700 rounded-xl p-4 bg-indigo-900/20">
          <h3 className="text-indigo-300 font-semibold">
            ⚠ Tricky count() Cases
          </h3>

          <EditablePythonCodeBlock
            title="count() with Nested Tuples"
            initialCode={`t = (1, (2, 3), (2, 3))

print(t.count((2, 3)))`}
          />

          <p className="text-amber-300 text-sm">
            ✔ count() checks <strong>exact match</strong> only
          </p>
        </section>

        {/* ================= INDEX ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ <code>index()</code> Method
          </h3>

          <p className="text-slate-300 text-sm">
            The <code>index()</code> method returns the position of the
            <strong>first occurrence</strong> of a value.
          </p>

          <p className="text-slate-400 text-sm">
            <strong>Syntax:</strong> <code>tuple.index(value[, start[, end]])</code>  
            <br />
            <strong>Return type:</strong> <code>int</code>
          </p>

          <EditablePythonCodeBlock
            title="Basic index() Example"
            initialCode={`t = (10, 20, 30, 20, 40)

print(t.index(20))`}
          />
        </section>

        {/* ================= INDEX RANGE ================= */}
        <section className="space-y-4">
          <EditablePythonCodeBlock
            title="index() with start and end"
            initialCode={`t = (10, 20, 30, 20, 40)

print(t.index(20, 2))`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Search starts from index 2  
            ✔ Finds the next occurrence
          </p>
        </section>

        {/* ================= INDEX ERROR ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ index() Error Case
          </h3>

          <EditablePythonCodeBlock
            title="Value Not Found"
            initialCode={`t = (1, 2, 3)

# ❌ Raises ValueError
# print(t.index(5))`}
          />

          <p className="text-rose-200 text-sm">
            ❗ Unlike count(), <code>index()</code> raises <strong>ValueError</strong>
            if the value is missing.
          </p>
        </section>

        {/* ================= COMPARISON ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            3️⃣ count() vs index()
          </h3>

          <table className="w-full text-sm border border-slate-700">
            <thead className="bg-slate-800 text-slate-200">
              <tr>
                <th className="p-2 border">Feature</th>
                <th className="p-2 border">count()</th>
                <th className="p-2 border">index()</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr>
                <td className="p-2 border">Purpose</td>
                <td className="p-2 border">Count occurrences</td>
                <td className="p-2 border">Find position</td>
              </tr>
              <tr>
                <td className="p-2 border">Return</td>
                <td className="p-2 border">int</td>
                <td className="p-2 border">int</td>
              </tr>
              <tr>
                <td className="p-2 border">On missing value</td>
                <td className="p-2 border">Returns 0</td>
                <td className="p-2 border">Raises ValueError</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ================= REAL WORLD ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Real-World Example
          </h3>

          <EditablePythonCodeBlock
            title="Counting Fixed Codes"
            initialCode={`errors = ("404", "500", "404", "403", "404")

print("404 count:", errors.count("404"))
print("First 500 at index:", errors.index("500"))`}
          />
        </section>

        {/* ================= EXAM NOTES ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            📝 Exam & Interview Notes
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>Tuples have only two main methods</li>
            <li><code>count()</code> never throws error</li>
            <li><code>index()</code> throws ValueError if missing</li>
            <li><code>index()</code> returns first match only</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic10 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>count() → frequency</li>
            <li>index() → position</li>
            <li>Both return integers</li>
          </ul>
        </footer>

      </div>
    );
  }
}
