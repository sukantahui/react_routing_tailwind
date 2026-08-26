// Topic3.jsx
import React from "react";

export default function Topic3() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Understanding Workbooks, Worksheets, Rows, Columns and Cells
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Learn the basic building blocks of Excel: the workbook file, the
          sheets inside it, and how rows, columns and cells are arranged.
        </p>
      </header>

      {/* DEFINITIONS */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          Key Terms and Their Meaning
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>
            <span className="font-semibold text-sky-300">Workbook:</span> An
            Excel file (.xlsx). It can contain one or more worksheets.
          </li>
          <li>
            <span className="font-semibold text-sky-300">Worksheet (Sheet):</span>{" "}
            A single page inside the workbook where data is entered in a grid.
          </li>
          <li>
            <span className="font-semibold text-sky-300">Row:</span> A
            horizontal line of cells, numbered 1, 2, 3, ... on the left side.
          </li>
          <li>
            <span className="font-semibold text-sky-300">Column:</span> A
            vertical line of cells, labeled A, B, C, ... at the top.
          </li>
          <li>
            <span className="font-semibold text-sky-300">Cell:</span> A single
            box formed by the intersection of a row and a column (e.g., B3).
          </li>
        </ul>
      </section>

      {/* SIMPLE VISUAL TABLE */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-300">
          Visualizing the Grid
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Think of the worksheet as a big grid. Each small square is a cell.
        </p>

        <div className="inline-block border border-slate-700 rounded-xl overflow-hidden">
          <table className="text-sm">
            <thead className="bg-slate-900 text-sky-300">
              <tr>
                <th className="w-10 border border-slate-800" />
                <th className="w-12 border border-slate-800 text-center">A</th>
                <th className="w-12 border border-slate-800 text-center">B</th>
                <th className="w-12 border border-slate-800 text-center">C</th>
              </tr>
            </thead>
            <tbody className="bg-slate-950/60">
              <tr>
                <td className="border border-slate-800 text-center text-slate-400">
                  1
                </td>
                <td className="border border-slate-800 text-center">A1</td>
                <td className="border border-slate-800 text-center">B1</td>
                <td className="border border-slate-800 text-center">C1</td>
              </tr>
              <tr>
                <td className="border border-slate-800 text-center text-slate-400">
                  2
                </td>
                <td className="border border-slate-800 text-center">A2</td>
                <td className="border border-slate-800 text-center">B2</td>
                <td className="border border-slate-800 text-center">C2</td>
              </tr>
              <tr>
                <td className="border border-slate-800 text-center text-slate-400">
                  3
                </td>
                <td className="border border-slate-800 text-center">A3</td>
                <td className="border border-slate-800 text-center">B3</td>
                <td className="border border-slate-800 text-center">C3</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-slate-500">
          (In real Excel, there are thousands of rows and many columns.)
        </p>
      </section>

      {/* PRACTICAL TASK */}
      <section className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6">
        <h2 className="text-lg font-semibold text-emerald-300">
          Try It Yourself – Explore Workbook & Sheets
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>Create a new workbook and notice sheet names at the bottom.</li>
          <li>
            Right-click a sheet tab → Rename it to <strong>Marks</strong>.
          </li>
          <li>
            Add another sheet and rename to <strong>Fees</strong>.
          </li>
          <li>
            Click in cell B3 of the Marks sheet and type{" "}
            <span className="font-mono">English</span>.
          </li>
          <li>
            Look at the Name Box – it should show <strong>B3</strong>, which is
            the address of the active cell.
          </li>
        </ol>
      </section>
    </div>
  );
}
