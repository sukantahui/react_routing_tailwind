import React, { Component } from "react";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-10 text-slate-200">

        {/* ----------------------------------------- */}
        {/* HEADER */}
        {/* ----------------------------------------- */}
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Excel Data Tools · Clean & Prepare Data
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Removing Duplicates & Finding Unique Records
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-slate-300">
            Duplicate data creates errors in reports, charts, and analysis.
            Excel provides powerful tools to clean data instantly by removing duplicates
            and extracting unique values.
          </p>
        </header>

        {/* ----------------------------------------- */}
        {/* SAMPLE DATA */}
        {/* ----------------------------------------- */}
        <section>
          <h2 className="text-lg font-semibold text-sky-400 mb-2">
            Sample Dataset with Duplicates
          </h2>

          <pre className="bg-slate-900 p-3 rounded-xl text-sm">
{`Name        City
Ritaja      Kolkata
Mounita     Delhi
Ritaja      Kolkata
Swadeep     Pune
Swadeep     Pune`}
          </pre>

          <p className="text-sm mt-2">
            Here we have duplicate entries for <strong>Ritaja</strong> and <strong>Swadeep</strong>.
          </p>
        </section>

        {/* ----------------------------------------- */}
        {/* REMOVE DUPLICATES BUTTON (SVG UI) */}
        {/* ----------------------------------------- */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-amber-300">
            Using Remove Duplicates (Data → Remove Duplicates)
          </h2>

          <p className="text-sm leading-relaxed text-slate-300">
            Excel identifies duplicate rows based on selected columns
            and removes repeated rows while keeping the first occurrence.
          </p>

          <div className="rounded-2xl border border-amber-700 bg-amber-950/20 p-4 flex justify-center">
            <svg viewBox="0 0 360 200" className="w-full max-w-xl">

              {/* Panel */}
              <rect x="20" y="20" width="320" height="160" rx="12"
                className="fill-slate-900 stroke-amber-600" />

              {/* Title */}
              <text x="180" y="45" textAnchor="middle"
                className="fill-amber-300 text-[13px] font-semibold">
                Remove Duplicates
              </text>

              {/* Columns */}
              {["Name", "City"].map((col, i) => (
                <g key={i}>
                  <rect
                    x={60}
                    y={70 + i * 35}
                    width="15"
                    height="15"
                    rx="3"
                    className="fill-amber-900/40 stroke-amber-500"
                  />
                  <text
                    x={90}
                    y={82 + i * 35}
                    className="fill-amber-200 text-[11px]"
                  >
                    {col}
                  </text>
                </g>
              ))}

              {/* Button */}
              <rect x="210" y="145" width="90" height="25" rx="5"
                className="fill-amber-600" />
              <text
                x="255"
                y="162"
                textAnchor="middle"
                className="fill-white text-[11px]"
              >
                Remove Duplicates
              </text>
            </svg>
          </div>

          <p className="text-sm text-slate-300">
            Result: Only unique rows are kept, duplicates are removed instantly.
          </p>
        </section>

        {/* ----------------------------------------- */}
        {/* UNIQUE FUNCTION (MODERN EXCEL) */}
        {/* ----------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            Using UNIQUE() Function (Excel 365 / Excel 2021+)
          </h2>

          <p className="text-sm text-slate-300">
            The <code className="text-sky-300">UNIQUE()</code> function extracts
            unique values dynamically — whenever the source changes,
            the output updates automatically.
          </p>

          <pre className="bg-slate-900 p-3 rounded-xl text-sm">
{`=UNIQUE(A2:B6)

OR

=UNIQUE(A2:A6)   → unique names only`}
          </pre>

          {/* SVG – UNIQUE Function Output */}
          <div className="rounded-2xl border border-purple-700 bg-purple-950/20 p-4 flex justify-center">
            <svg viewBox="0 0 360 220" className="w-full max-w-lg">

              {/* Input Table */}
              <rect x="20" y="20" width="150" height="160" rx="10"
                className="fill-slate-900 stroke-slate-700" />
              <text x="95" y="40" textAnchor="middle"
                className="fill-purple-200 text-[12px]">
                Input Data
              </text>

              {/* Rows */}
              {["Ritaja", "Mounita", "Ritaja", "Swadeep", "Swadeep"].map(
                (name, i) => (
                  <text
                    key={i}
                    x="40"
                    y={70 + i * 20}
                    className="fill-purple-300 text-[11px]"
                  >
                    • {name}
                  </text>
                )
              )}

              {/* Arrow */}
              <polygon
                points="200,100 230,115 200,130"
                className="fill-purple-300"
              />

              {/* Output Table */}
              <rect x="240" y="60" width="110" height="100" rx="10"
                className="fill-slate-900 stroke-purple-600" />
              <text x="295" y="80" textAnchor="middle"
                className="fill-purple-200 text-[12px]">
                UNIQUE Output
              </text>

              {["Ritaja", "Mounita", "Swadeep"].map((nm, i) => (
                <text
                  key={i}
                  x="260"
                  y={110 + i * 20}
                  className="fill-purple-200 text-[11px]"
                >
                  • {nm}
                </text>
              ))}
            </svg>
          </div>
        </section>

        {/* ----------------------------------------- */}
        {/* TEACHER TIP */}
        {/* ----------------------------------------- */}
        <section className="rounded-xl bg-emerald-900/30 border border-emerald-700 p-4">
          <h3 className="font-semibold text-emerald-300">Teacher’s Tip</h3>
          <p className="text-sm">
            Use <code className="text-sky-300">UNIQUE()</code> when you want
            results that **update automatically**.  
            Use <strong>Remove Duplicates</strong> when you want a **permanent cleanup**.
          </p>
        </section>

        {/* ----------------------------------------- */}
        {/* COMMON MISTAKES */}
        {/* ----------------------------------------- */}
        <section>
          <h2 className="text-xl font-semibold text-rose-300">
            Common Mistakes Students Make
          </h2>

          <div className="rounded-2xl bg-rose-950/20 border border-rose-700 p-4 mt-2">
            <ul className="list-disc ml-6 text-sm space-y-1 text-rose-200">
              <li>Selecting only one column instead of the entire table</li>
              <li>Removing duplicates accidentally without taking a backup</li>
              <li>Expecting Remove Duplicates to auto-update (it won't)</li>
              <li>Forgetting that UNIQUE() spills multiple rows</li>
            </ul>
          </div>
        </section>

        {/* ----------------------------------------- */}
        {/* SUMMARY */}
        {/* ----------------------------------------- */}
        <section className="rounded-2xl bg-sky-950/20 border border-sky-700 p-4">
          <h2 className="text-lg font-semibold text-sky-200">
            📘 Summary
          </h2>

          <ul className="text-sm list-disc ml-6 space-y-1 text-slate-300 mt-2">
            <li>Use Remove Duplicates for instant cleanup.</li>
            <li>Use UNIQUE() for dynamic, formula-based unique lists.</li>
            <li>Select all relevant columns to avoid wrong results.</li>
            <li>Check duplicates carefully before deleting them.</li>
          </ul>
        </section>

      </div>
    );
  }
}
