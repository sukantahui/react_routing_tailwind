import React, { Component } from "react";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-8 text-slate-200">

        <h1 className="text-2xl font-bold text-sky-300">
          Basic Excel Functions
        </h1>

        <h2 className="text-xl font-semibold text-emerald-300">1. SUM</h2>
        <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 text-sm">
{`=SUM(A1:A10)`}
        </pre>

        <h2 className="text-xl font-semibold text-emerald-300">2. AVERAGE</h2>
        <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 text-sm">
{`=AVERAGE(B1:B5)`}
        </pre>

        <h2 className="text-xl font-semibold text-emerald-300">3. MIN & MAX</h2>
        <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 text-sm">
{`
=MIN(C1:C10)
=MAX(C1:C10)
`}
        </pre>

        <h2 className="text-xl font-semibold text-emerald-300">4. COUNT & COUNTA</h2>
        <pre className="bg-slate-900 p-4 rounded-xl text-sky-300 text-sm">
{`
COUNT  → Numbers only
COUNTA → Anything (text + numbers)
`}
        </pre>

        <h3 className="text-xl text-sky-300 font-semibold">Example Table</h3>
        <pre className="bg-slate-800 p-4 rounded-xl text-sm text-sky-400">
{`
     A
1   10
2   20
3   30
4   Good
5   50
`}
        </pre>

        <p>
          <strong>=COUNT(A1:A5)</strong> → 4  
          <strong>=COUNTA(A1:A5)</strong> → 5
        </p>

      </div>
    );
  }
}
