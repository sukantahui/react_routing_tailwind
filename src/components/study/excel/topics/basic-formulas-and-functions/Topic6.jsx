import React, { Component } from "react";

export default class Topic6 extends Component {
  render() {
    return (
      <div className="space-y-6 text-slate-200">

        <h1 className="text-2xl font-bold text-sky-300">
          Handling Common Excel Errors
        </h1>

        <h2 className="text-xl font-semibold text-emerald-300">1. #DIV/0!</h2>
        <p>Division by zero.</p>
        <pre className="bg-slate-800 p-4 rounded-xl text-sky-300 text-sm">
{`=10/0  → #DIV/0!`}
        </pre>

        <h2 className="text-xl font-semibold text-emerald-300">2. #VALUE!</h2>
        <p>Mismatched data type.</p>

        <pre className="bg-slate-800 p-4 rounded-xl text-sky-300 text-sm">
{`="Hello" + 10  → #VALUE!`}
        </pre>

        <h2 className="text-xl font-semibold text-emerald-300">3. #NAME?</h2>
        <p>Function name typed incorrectly.</p>

        <pre className="bg-slate-800 p-4 rounded-xl text-sky-300 text-sm">
{`=SUMM(A1:A5)  → #NAME?`}
        </pre>

        <div className="bg-slate-800 border border-red-500 p-4 rounded-xl">
          <strong>Teacher’s Tip:</strong>  
          Use <strong>Formulas → Error Checking</strong> to trace errors.
        </div>

      </div>
    );
  }
}
