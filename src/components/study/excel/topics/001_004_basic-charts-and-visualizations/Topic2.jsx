import React, { Component } from "react";

/* ===========================================================
   SVG — CORRECT DATA RANGE
=========================================================== */
class CorrectRangeSvg extends Component {
  render() {
    return (
      <svg
        viewBox="0 0 300 160"
        className="w-full max-w-xl mx-auto"
        aria-label="Correct data selection"
      >
        {/* Background */}
        <rect width="300" height="160" rx="12" fill="#0f172a" />

        {/* Header row */}
        <rect x="40" y="30" width="220" height="30" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="90" y="50" fill="#e2e8f0" fontSize="12">Product</text>
        <text x="200" y="50" fill="#e2e8f0" fontSize="12">Sales</text>

        {/* Row 1 */}
        <rect x="40" y="60" width="220" height="30" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
        <text x="90" y="80" fill="#e2e8f0" fontSize="12">Laptop</text>
        <text x="200" y="80" fill="#e2e8f0" fontSize="12">85</text>

        {/* Row 2 */}
        <rect x="40" y="90" width="220" height="30" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
        <text x="90" y="110" fill="#e2e8f0" fontSize="12">Tablet</text>
        <text x="200" y="110" fill="#e2e8f0" fontSize="12">50</text>

        {/* Title */}
        <text x="150" y="20" fill="#38bdf8" fontSize="13" textAnchor="middle">
          ✔ Correct Range Selected (A1:B3)
        </text>
      </svg>
    );
  }
}

/* ===========================================================
   SVG — WRONG DATA RANGE (Extra Blank Rows)
=========================================================== */
class WrongRangeSvg extends Component {
  render() {
    return (
      <svg
        viewBox="0 0 300 200"
        className="w-full max-w-xl mx-auto"
        aria-label="Wrong data selection"
      >
        {/* Background */}
        <rect width="300" height="200" rx="12" fill="#0f172a" />

        {/* Selected area (highlight wrong extra rows) */}
        <rect x="40" y="30" width="220" height="120" fill="#1e293b" stroke="#f87171" strokeWidth="2" />

        {/* Header */}
        <text x="90" y="50" fill="#e2e8f0" fontSize="12">Product</text>
        <text x="200" y="50" fill="#e2e8f0" fontSize="12">Sales</text>

        {/* Row 1 */}
        <text x="90" y="80" fill="#e2e8f0" fontSize="12">Laptop</text>
        <text x="200" y="80" fill="#e2e8f0" fontSize="12">85</text>

        {/* Row 2 */}
        <text x="90" y="110" fill="#e2e8f0" fontSize="12">Tablet</text>
        <text x="200" y="110" fill="#e2e8f0" fontSize="12">50</text>

        {/* Wrong extra blank rows */}
        <rect x="40" y="120" width="220" height="30" fill="#7f1d1d" opacity="0.4" />
        <text x="150" y="138" fill="#fca5a5" fontSize="11" textAnchor="middle">
          (Blank row included ❌)
        </text>

        <text x="150" y="20" fill="#f87171" fontSize="13" textAnchor="middle">
          ❌ Wrong Range Selected (Extra Blank Rows)
        </text>
      </svg>
    );
  }
}

/* ===========================================================
   MAIN TOPIC COMPONENT
=========================================================== */

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-8 text-slate-200">

        <h1 className="text-2xl font-bold text-sky-300">
          Selecting Correct Data Ranges for Charts
        </h1>

        <p>
          Excel uses the selected data range to build charts.  
          Choosing the right range ensures accurate labels and values.
        </p>

        <h2 className="text-lg text-sky-400 font-semibold">✔ Correct Example</h2>

        <pre className="bg-slate-900 p-3 rounded-xl text-sm">
{`A1: Product    B1: Sales
A2: Laptop      B2: 85
A3: Tablet      B3: 50`}
        </pre>

        <p>
          Correct selection → <strong>A1:B3</strong> → Insert → Column Chart  
          Excel automatically uses headers for chart labels.
        </p>

        {/* SVG — Correct Range */}
        <CorrectRangeSvg />

        <h2 className="text-lg text-sky-400 font-semibold">❌ Wrong Example</h2>

        <p>
          Selecting extra blank rows or mixing data from another table results in
          incorrect charts and confusing labels.
        </p>

        {/* SVG — Wrong Range */}
        <WrongRangeSvg />

        <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/40">
          <h3 className="font-semibold text-emerald-300">Teacher’s Tip</h3>
          <p className="text-sm">
            Always select headers + values together. Excel uses the first row as 
            chart labels automatically.
          </p>
        </div>

      </div>
    );
  }
}
