// src/components/study/python/tuples/Topic2.jsx

import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

const fadeIn = "animate-[fadeIn_0.8s_ease-out]";

export default class Topic3 extends Component {
  render() {
    return (
      <div className={`space-y-14 ${fadeIn}`}>

        {/* ================= HEADER ================= */}
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-indigo-300 tracking-wide">
            Tuple Packing, Unpacking & Variable Assignment
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Tuple packing and unpacking is one of the most
            <strong> powerful and Pythonic features</strong>.
            It allows multiple values to be grouped and distributed
            cleanly and safely.
          </p>

          <p className="text-slate-400 text-sm">
            This topic is extremely important for:
            <strong> exams, interviews, clean code, and real projects</strong>.
          </p>
        </header>

        {/* ================= PACKING ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            1️⃣ Tuple Packing
          </h3>

          <p className="text-slate-300 text-sm">
            When multiple values are assigned together, Python automatically
            packs them into a tuple.
          </p>

          <EditablePythonCodeBlock
            title="Tuple Packing Example"
            initialCode={`data = 10, 20, 30
print(data)
print(type(data))`}
          />

          <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-3">
            <p className="text-emerald-300 text-sm font-semibold">
              Key Concept
            </p>
            <p className="text-emerald-200 text-xs">
              Packing happens automatically when values are separated by commas.
            </p>
          </div>
        </section>

        {/* ================= BASIC UNPACKING ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            2️⃣ Basic Tuple Unpacking
          </h3>

          <p className="text-slate-300 text-sm">
            Unpacking means assigning tuple elements to individual variables.
          </p>

          <EditablePythonCodeBlock
            title="Unpacking Values"
            initialCode={`t = (1, 2, 3)
a, b, c = t

print(a)
print(b)
print(c)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Number of variables must match number of elements.
          </p>
        </section>

        {/* ================= UNPACKING ERROR ================= */}
        <section className="space-y-4 border border-rose-700 rounded-xl p-4 bg-rose-900/20">
          <h3 className="text-rose-300 font-semibold">
            ❌ Unpacking Error (Very Common)
          </h3>

          <EditablePythonCodeBlock
            title="Unpacking Mismatch"
            initialCode={`t = (1, 2, 3)
a, b = t  # ❌ Error`}
          />

          <p className="text-rose-200 text-sm">
            Python raises <strong>ValueError</strong> if counts do not match.
          </p>
        </section>

        {/* ================= SWAPPING ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-indigo-300">
            3️⃣ Swapping Variables Using Tuples
          </h3>

          <p className="text-slate-300 text-sm">
            Python uses tuple packing and unpacking internally to swap values.
          </p>

          <EditablePythonCodeBlock
            title="Swapping Without Temporary Variable"
            initialCode={`a = 5
b = 10

a, b = b, a
print(a, b)`}
          />

          <div className="bg-indigo-900/20 border border-indigo-700 rounded-lg p-3">
            <p className="text-indigo-300 text-sm font-semibold">
              Teacher Secret
            </p>
            <p className="text-indigo-200 text-xs">
              Python creates a hidden tuple behind the scenes.
            </p>
          </div>
        </section>

        {/* ================= PARTIAL UNPACKING ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            4️⃣ Using * for Extended Unpacking
          </h3>

          <p className="text-slate-300 text-sm">
            The <code>*</code> operator collects remaining values into a list.
          </p>

          <EditablePythonCodeBlock
            title="Extended Unpacking"
            initialCode={`t = (1, 2, 3, 4, 5)
a, b, *rest = t

print(a)
print(b)
print(rest)`}
          />

          <p className="text-slate-400 text-sm">
            ✔ <code>rest</code> is always a list, not a tuple.
          </p>
        </section>

        {/* ================= IGNORING VALUES ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-emerald-300">
            5️⃣ Ignoring Values During Unpacking
          </h3>

          <EditablePythonCodeBlock
            title="Ignoring Unwanted Values"
            initialCode={`data = (10, 20, 30)

a, _, c = data
print(a, c)`}
          />

          <p className="text-slate-300 text-sm">
            The underscore <code>_</code> is a convention for ignored values.
          </p>
        </section>

        {/* ================= NESTED UNPACKING ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-sky-300">
            6️⃣ Nested Tuple Unpacking
          </h3>

          <EditablePythonCodeBlock
            title="Nested Structure Unpacking"
            initialCode={`t = (1, (2, 3))
a, (b, c) = t

print(a, b, c)`}
          />

          <p className="text-slate-300 text-sm">
            Nested unpacking follows the structure of the tuple.
          </p>
        </section>

        {/* ================= FUNCTION RETURN ================= */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-indigo-300">
            7️⃣ Tuples as Function Return Values
          </h3>

          <EditablePythonCodeBlock
            title="Multiple Return Values"
            initialCode={`def calculate(x, y):
    return x + y, x * y

sum_val, product = calculate(3, 4)
print(sum_val, product)`}
          />

          <p className="text-slate-300 text-sm">
            Python returns a tuple when multiple values are returned.
          </p>
        </section>

        {/* ================= COMMON PITFALLS ================= */}
        <section className="space-y-4 border border-amber-700 rounded-xl p-4 bg-amber-900/20">
          <h3 className="text-amber-300 font-semibold">
            ⚠ Common Mistakes & Pitfalls
          </h3>

          <ul className="list-disc list-inside text-amber-200 text-sm space-y-1">
            <li>Mismatched number of variables</li>
            <li>Forgetting that * creates a list</li>
            <li>Unpacking without checking structure</li>
            <li>Assuming unpacking modifies the tuple</li>
          </ul>
        </section>

        {/* ================= SUMMARY ================= */}
        <footer className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
          <p className="text-slate-200 text-sm font-semibold mb-1">
            ✅ Topic2 Summary
          </p>
          <ul className="list-disc list-inside text-slate-400 text-xs space-y-1">
            <li>Tuple packing groups values automatically</li>
            <li>Unpacking distributes values to variables</li>
            <li>* helps handle variable-length tuples</li>
            <li>Used heavily in swapping and functions</li>
          </ul>
        </footer>

      </div>
    );
  }
}
