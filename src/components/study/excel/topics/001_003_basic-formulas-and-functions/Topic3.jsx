import React, { Component } from "react";

export default class Topic3 extends Component {
  downloadExcel = async () => {
    const res = await fetch("/assets/downloads/excel/Excel_Full_Formulas_Practice.xlsx");
    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Excel_Full_Formulas_Practice.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };
  render() {
    return (
      <div className="space-y-8 text-slate-200">

        <h1 className="text-2xl font-bold text-sky-300">
          Basic Excel Functions
        </h1>

        {/* ===================== FUNCTION DEFINITIONS ===================== */}

        <div className="bg-slate-900/60 p-6 rounded-xl border border-slate-700 space-y-4">
          <h2 className="text-xl font-semibold text-yellow-300">Function Definitions</h2>

          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <span className="text-emerald-300 font-semibold">SUM(number1, [number2], ...)</span><br />
              <span className="text-slate-400">
                Adds all numeric values in the given cells or ranges.<br />
                <strong>Parameters:</strong> number1 (required), number2... (optional)<br />
                <strong>Return Type:</strong> Number (total sum)
              </span>
            </li>

            <li>
              <span className="text-emerald-300 font-semibold">AVERAGE(number1, [number2], ...)</span><br />
              <span className="text-slate-400">
                Calculates the average of given numeric values.<br />
                <strong>Parameters:</strong> number1 (required), number2... (optional)<br />
                <strong>Return Type:</strong> Number (mean value)
              </span>
            </li>

            <li>
              <span className="text-emerald-300 font-semibold">MIN(number1, [number2], ...)</span><br />
              <span className="text-slate-400">
                Finds the smallest value in a range or list.<br />
                <strong>Parameters:</strong> number1 (required), number2... (optional)<br />
                <strong>Return Type:</strong> Number (minimum value)
              </span>
            </li>

            <li>
              <span className="text-emerald-300 font-semibold">MAX(number1, [number2], ...)</span><br />
              <span className="text-slate-400">
                Finds the largest value in a range or list.<br />
                <strong>Parameters:</strong> number1 (required), number2... (optional)<br />
                <strong>Return Type:</strong> Number (maximum value)
              </span>
            </li>

            <li>
              <span className="text-emerald-300 font-semibold">COUNT(value1, [value2], ...)</span><br />
              <span className="text-slate-400">
                Counts only cells containing numeric values.<br />
                <strong>Parameters:</strong> value1 (required), value2... (optional)<br />
                <strong>Return Type:</strong> Number (count of numbers)
              </span>
            </li>

            <li>
              <span className="text-emerald-300 font-semibold">COUNTA(value1, [value2], ...)</span><br />
              <span className="text-slate-400">
                Counts all non-empty cells (numbers, text, symbols).<br />
                <strong>Parameters:</strong> value1 (required), value2... (optional)<br />
                <strong>Return Type:</strong> Number (count of non-blank cells)
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-10 bg-slate-900/60 border border-slate-700 p-6 rounded-xl space-y-3">
          <h2 className="text-xl font-semibold text-emerald-300">
            📥 Practice Excel File
          </h2>

          <p className="text-slate-400 text-sm">
            Download this Excel file and practice all the formulas you learned above:
            SUM, AVERAGE, MIN, MAX, COUNT, COUNTA.
          </p>

          <button
            onClick={this.downloadExcel}
            className="inline-flex items-center gap-3 mt-2 px-5 py-2 rounded-lg 
             border border-emerald-400/40 
             bg-emerald-500/10 backdrop-blur-md
             text-emerald-300 font-semibold
             hover:bg-emerald-500/20 hover:border-emerald-300
             transition-all duration-300"
          >
            {/* Excel File Icon */}
            <svg viewBox="0 0 48 48" className="w-6 h-6">
              <path fill="#185C37" d="M6 6h22l10 10v26H6z" />
              <path fill="#107C41" d="M28 6v10h10z" />
              <path fill="#21A366" d="M6 6h14v36H6z" />
              <path fill="#ffffff" d="M12.8 31l3.2-6-3.2-6h3l1.7 3.8 1.8-3.8h3l-3.3 6 3.3 6h-3l-1.8-4-1.7 4z" />
            </svg>

            {/* Download Arrow Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v12m0 0l4-4m-4 4l-4-4M4 17h16"
              />
            </svg>

            Download Practice File
          </button>

        </div>




        {/* ===================== EXISTING CONTENT ===================== */}

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
          <strong>=COUNT(A1:A5)</strong> → 4 <br />
          <strong>=COUNTA(A1:A5)</strong> → 5
        </p>

      </div>


    );
  }
}
