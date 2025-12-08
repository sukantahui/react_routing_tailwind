import React, { Component } from "react";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-6 text-slate-200">

        <h1 className="text-2xl font-bold text-sky-300">
          Mathematical Operators in Excel
        </h1>

        <h2 className="text-xl text-emerald-300 font-semibold">Operators</h2>

        <pre className="bg-slate-800 p-4 rounded-xl text-sm text-sky-300">
{`
+  Addition
-  Subtraction
*  Multiplication
/  Division
^  Exponent (Power)
`}
        </pre>

        <h2 className="text-xl font-semibold text-emerald-300">
          Examples
        </h2>

        <pre className="bg-slate-900 p-4 rounded-xl text-sm text-sky-300">
{`
=10 + 5        → 15
=20 - 4        → 16
=8 * 5         → 40
=50 / 10       → 5
=2 ^ 3         → 8
`}
        </pre>

        <div className="bg-slate-800 p-4 rounded-xl border border-sky-600">
          <strong>Teacher’s Tip:</strong> Excel follows BODMAS/PEMDAS.
        </div>

      </div>
    );
  }
}
