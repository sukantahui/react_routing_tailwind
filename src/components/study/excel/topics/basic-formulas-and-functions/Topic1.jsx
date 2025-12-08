import React, { Component } from "react";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-6 text-slate-200">

        <h1 className="text-2xl font-bold text-sky-300">
          Relative, Absolute & Mixed Cell References
        </h1>

        <h2 className="text-xl font-semibold text-emerald-300">
          1. Relative Reference (default)
        </h2>
        <p>
          Changes automatically when copied.  
          Example: <strong>=A1 + B1</strong>
        </p>

        <pre className="bg-slate-900 p-4 rounded-xl text-sm text-sky-300">
{`
Copy down:
Row 1 → =A1 + B1
Row 2 → =A2 + B2
Row 3 → =A3 + B3
`}
        </pre>

        <h2 className="text-xl font-semibold text-emerald-300">
          2. Absolute Reference — $A$1
        </h2>
        <p>Does NOT change when copied.</p>

        <pre className="bg-slate-900 p-4 rounded-xl text-sm text-sky-300">
{`
=$A$1 + B1
`}
        </pre>

        <p>
          <strong>$</strong> freezes row, column, or both.
        </p>

        <h2 className="text-xl font-semibold text-emerald-300">
          3. Mixed References
        </h2>

        <pre className="bg-slate-900 p-4 rounded-xl text-sm text-sky-300">
{`
=A$1   → Row fixed
=$A1   → Column fixed
`}
        </pre>

        <h2 className="text-xl font-semibold text-sky-300">
          Real Example
        </h2>

        <pre className="bg-slate-800 p-4 rounded-xl text-sm text-sky-300">
{`
Price in A1 = 50
Quantity in B1 = 10
Total = A1 * B1

Copying total down needs:
= A$1 * B1   (Price fixed)
`}
        </pre>

        <div className="bg-slate-800 p-4 rounded-xl border border-emerald-600">
          <strong>Teacher’s Tip:</strong> Press <strong>F4</strong> to toggle
          reference types quickly.
        </div>

      </div>
    );
  }
}
