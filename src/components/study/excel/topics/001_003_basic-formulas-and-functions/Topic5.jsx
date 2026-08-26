import React, { Component } from "react";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-6 text-slate-200">

        <h1 className="text-2xl font-bold text-sky-300">
          Copying Formulas Using Fill Handle
        </h1>

        <p>
          Fill handle is the small square in the bottom-right corner of a
          selected cell.
        </p>

        <pre className="bg-slate-800 p-4 rounded-xl text-sm text-sky-300">
{`
=A1 + B1

↓ Drag down

=A2 + B2
=A3 + B3
=A4 + B4
`}
        </pre>

        <h2 className="text-xl text-emerald-300 font-semibold">
          Reference Changes
        </h2>

        <p>
          Relative references change; absolute references <strong>do not</strong>.
        </p>

        <pre className="bg-slate-800 p-4 rounded-xl text-sm text-sky-300">
{`
=A$1 + B1   → Row fixed
=$A1 + B1   → Column fixed
`}
        </pre>

        <div className="bg-slate-800 p-4 border border-emerald-600 rounded-xl">
          <strong>Teacher’s Tip:</strong>  
          Press <strong>Ctrl + D</strong> to fill down.
        </div>

      </div>
    );
  }
}
