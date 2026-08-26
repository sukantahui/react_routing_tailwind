// Topic1.jsx
import React from "react";

export default function Topic1() {
  return (
    <div className="space-y-8 text-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Excel vs Google Sheets vs Other Spreadsheet Tools
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Compare Excel with Google Sheets and other spreadsheet tools to
          understand where each one is stronger and which is better for
          different situations.
        </p>
      </header>

      {/* OBJECTIVES */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6">
        <h2 className="text-lg font-semibold text-sky-300 mb-3">
          Learning Objectives
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>Understand what makes Excel powerful on desktop.</li>
          <li>Identify when Google Sheets is more convenient.</li>
          <li>Know about other spreadsheet tools like LibreOffice Calc.</li>
          <li>
            Decide which tool to use for offline work, online collaboration, and
            heavy data.
          </li>
        </ul>
      </section>

      {/* COMPARISON TABLE */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-emerald-300">
          High-Level Comparison
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-sky-300">
              <tr>
                <th className="p-2 border border-slate-800 text-left">Feature</th>
                <th className="p-2 border border-slate-800 text-left">Excel</th>
                <th className="p-2 border border-slate-800 text-left">
                  Google Sheets
                </th>
                <th className="p-2 border border-slate-800 text-left">
                  Other Tools (Calc, etc.)
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-950/60">
              <tr>
                <td className="p-2 border border-slate-800">Platform</td>
                <td className="p-2 border border-slate-800">
                  Desktop (Windows/Mac) + Online (Excel Online)
                </td>
                <td className="p-2 border border-slate-800">
                  Web-based, works in browser
                </td>
                <td className="p-2 border border-slate-800">
                  Mostly desktop, some have limited web support
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800">Best For</td>
                <td className="p-2 border border-slate-800">
                  Heavy data, advanced formulas, VBA, dashboards
                </td>
                <td className="p-2 border border-slate-800">
                  Collaboration, sharing, basic to medium calculations
                </td>
                <td className="p-2 border border-slate-800">
                  Free desktop work, basic spreadsheets
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800">
                  Real-time Collaboration
                </td>
                <td className="p-2 border border-slate-800">
                  Possible with OneDrive/SharePoint
                </td>
                <td className="p-2 border border-slate-800">
                  Excellent, built-in collaboration
                </td>
                <td className="p-2 border border-slate-800">Limited/none</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800">Offline Use</td>
                <td className="p-2 border border-slate-800">
                  Yes, complete features offline
                </td>
                <td className="p-2 border border-slate-800">
                  Limited offline (depends on settings)
                </td>
                <td className="p-2 border border-slate-800">Yes</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800">Cost</td>
                <td className="p-2 border border-slate-800">
                  Paid (MS Office / 365 subscription)
                </td>
                <td className="p-2 border border-slate-800">Free with Google account</td>
                <td className="p-2 border border-slate-800">Usually free/open-source</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* WHEN TO USE WHAT */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-300">
          When Should You Use Which?
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>
            <span className="font-semibold text-sky-300">Use Excel</span> when
            you are working with:
            <ul className="list-disc pl-6 mt-1 space-y-1 text-slate-300">
              <li>Large datasets (thousands of rows).</li>
              <li>Complex formulas, pivot tables, advanced charts.</li>
              <li>VBA macros or automation.</li>
              <li>Professional accounts and GST workings.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-emerald-300">
              Use Google Sheets
            </span>{" "}
            when:
            <ul className="list-disc pl-6 mt-1 space-y-1 text-slate-300">
              <li>You need to collaborate with many people in real-time.</li>
              <li>You are fine with browser-based work.</li>
              <li>The data size is small to medium.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold text-purple-300">
              Use Other Tools (LibreOffice Calc, etc.)
            </span>{" "}
            when:
            <ul className="list-disc pl-6 mt-1 space-y-1 text-slate-300">
              <li>You want a free desktop alternative to Excel.</li>
              <li>Basic to moderate spreadsheet work is enough.</li>
            </ul>
          </li>
        </ul>
      </section>

      {/* PRACTICAL TASK */}
      <section className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6">
        <h2 className="text-lg font-semibold text-emerald-300">
          Try It Yourself – Compare Two Tools
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>
            Create the same simple sales table in <strong>Excel</strong> and{" "}
            <strong>Google Sheets</strong>.
          </li>
          <li>
            Try entering formulas like Total = Quantity × Rate in both tools.
          </li>
          <li>Notice speed, look-and-feel, and ease of use.</li>
          <li>
            Write 3 differences that you personally felt in a notebook or note
            file.
          </li>
        </ol>
      </section>
    </div>
  );
}
