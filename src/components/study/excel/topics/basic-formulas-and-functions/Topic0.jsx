import React, { Component } from "react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6 text-slate-200">
        
        <h1 className="text-2xl font-bold text-sky-300">
          Understanding Formulas in Excel
        </h1>

        <p>
          Excel becomes powerful when you use formulas. A formula always starts
          with an <strong>equals sign (=)</strong>. This tells Excel that what
          follows is a calculation.
        </p>

        <h2 className="text-xl font-semibold text-emerald-300">
          1. Formula Structure
        </h2>
        <pre className="bg-slate-800 p-4 rounded-xl text-sm text-sky-300">
{`=A1 + B1
=50 * 10
=(A2 - A1) / 2`}
        </pre>

        <h2 className="text-xl font-semibold text-emerald-300">
          2. Cell References
        </h2>
        <p>
          A cell reference points to a location like <strong>A1</strong>,
          <strong> B3</strong>, <strong>D10</strong>.
        </p>

        <h3 className="text-lg text-sky-300 font-semibold">Diagram</h3>
        <pre className="bg-slate-900 p-4 rounded-xl text-sm text-sky-400">
{`
      A      B      C
1    10     20     =A1 + B1
2    5      15     =A2 + B2
`}
        </pre>

        <h2 className="text-xl font-semibold text-emerald-300">
          3. Formula Bar
        </h2>

        <p>
          The formula bar displays the actual formula behind a cell.  
          Example: Cell C1 shows 30 but formula bar shows <strong>=A1+B1</strong>.
        </p>

        <h2 className="text-xl font-semibold text-emerald-300">
          Teacher’s Tip
        </h2>
        <div className="bg-slate-800 p-4 rounded-xl border border-sky-600">
          Always start with <strong>=</strong>. Without it, Excel treats your
          calculation as plain text.
        </div>

      </div>
    );
  }
}
