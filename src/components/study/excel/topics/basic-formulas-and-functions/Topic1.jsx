import React, { Component } from "react";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-8 text-slate-200">

        <h1 className="text-3xl font-bold text-sky-300">
          Relative, Absolute & Mixed Cell References in Excel
        </h1>

        <p className="text-slate-300">
          Cell references decide how Excel formulas behave when you copy them.
          Mastering this topic removes 80% of formula errors.
        </p>

        {/* RELATIVE */}
        <section>
          <h2 className="text-xl font-semibold text-emerald-300">
            1️⃣ Relative Reference — A1 (Default)
          </h2>
          <p>
            Relative references change automatically based on position when
            copied.
          </p>

          <pre className="bg-slate-900 p-4 rounded-xl text-sm text-sky-300">
{`
Original Formula in C1:
=A1 + B1

Copy Down:
C2 → =A2 + B2
C3 → =A3 + B3
`}
          </pre>

          <p className="text-slate-400">
            📌 Used when each row has its own data like marks, sales or expenses.
          </p>
        </section>

        {/* ABSOLUTE */}
        <section>
          <h2 className="text-xl font-semibold text-emerald-300">
            2️⃣ Absolute Reference — $A$1
          </h2>
          <p>
            Absolute references never change when copied.
          </p>

          <pre className="bg-slate-900 p-4 rounded-xl text-sm text-sky-300">
{`
Tax Rate stored in D1 = 18%

Formula:
=B2 * $D$1

Copied down:
=B3 * $D$1
=B4 * $D$1
`}
          </pre>

          <p className="text-slate-400">
            📌 Best for fixed values like tax rate, GST %, interest rate.
          </p>
        </section>

        {/* MIXED */}
        <section>
          <h2 className="text-xl font-semibold text-emerald-300">
            3️⃣ Mixed References — $A1 or A$1
          </h2>

          <pre className="bg-slate-900 p-4 rounded-xl text-sm text-sky-300">
{`
=A$1  → Row fixed
=$A1  → Column fixed
`}
          </pre>

          <p className="text-slate-400">
            📌 Used in multiplication tables, mark distribution grids etc.
          </p>
        </section>

        {/* PRACTICAL */}
        <section>
          <h2 className="text-xl font-semibold text-sky-300">
            Real Life Example – Tuition Fee Sheet
          </h2>

          <pre className="bg-slate-800 p-4 rounded-xl text-sm text-sky-300">
{`
Monthly Fee in B1 = 1200
Students in column A

Total Fee Formula:
=B$1 * A2
`}
          </pre>
        </section>

        {/* COMMON MISTAKES */}
        <section className="bg-red-950 p-4 rounded-xl border border-red-600">
          <h3 className="text-red-300 font-bold">⚠ Common Mistakes</h3>
          <ul className="list-disc list-inside text-red-200">
            <li>Forgetting $ while copying tax formulas</li>
            <li>Using relative instead of absolute for constants</li>
            <li>Not checking formula before drag-fill</li>
          </ul>
        </section>

        {/* PRACTICE */}
        <section className="bg-emerald-950 p-4 rounded-xl border border-emerald-600">
          <h3 className="text-emerald-300 font-bold">📝 Practice Task</h3>
          <p>Create a marks sheet with:</p>
          <ul className="list-disc list-inside">
            <li>Each subject mark in columns</li>
            <li>Total using relative reference</li>
            <li>Grade slab using absolute reference</li>
          </ul>
        </section>

        {/* TEACHER TIP */}
        <div className="bg-slate-800 p-4 rounded-xl border border-sky-600">
          <strong>Teacher’s Tip:</strong> Press <strong>F4</strong> repeatedly to
          toggle reference types instantly.
        </div>

      </div>
    );
  }
}
