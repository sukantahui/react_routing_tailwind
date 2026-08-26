import React, { Component } from "react";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-6 text-slate-200">

        <h1 className="text-2xl font-bold text-sky-300">
          AutoSum & Status Bar Calculations
        </h1>

        <h2 className="text-xl font-semibold text-emerald-300">1. AutoSum</h2>
        <p>Located in Home → Editing → AutoSum (Σ)</p>

        <pre className="bg-slate-800 p-4 rounded-xl text-sm text-sky-300">
{`Click Σ and Excel automatically inserts: =SUM(range)`}
        </pre>

        <h2 className="text-xl font-semibold text-emerald-300">
          2. Status Bar Calculations
        </h2>

        <p>Select any group of numbers to see:</p>
        <ul className="list-disc list-inside text-sky-200">
          <li>Average</li>
          <li>Count</li>
          <li>Sum</li>
          <li>Min/Max</li>
        </ul>

        <div className="bg-slate-800 border border-sky-600 p-4 rounded-xl">
          <strong>Teacher’s Tip:</strong>  
          Status bar shows calculations without writing any formula.
        </div>

      </div>
    );
  }
}
