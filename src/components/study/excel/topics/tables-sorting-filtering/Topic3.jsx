import React, { Component } from "react";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-10 text-slate-200">

        {/* ----------------------------------------- */}
        {/* HEADER */}
        {/* ----------------------------------------- */}
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Excel Data Management · Filters & AutoFilter
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Filtering Data Using AutoFilter & Filter Drop-Downs
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-slate-300">
            Filtering allows you to temporarily hide data that does not match
            specific conditions.  
            Excel's **AutoFilter** adds dropdowns to each column header so you can
            filter text, numbers, dates, and even apply conditions like “Top 10”.
          </p>
        </header>

        {/* ----------------------------------------- */}
        {/* SAMPLE DATA */}
        {/* ----------------------------------------- */}
        <section>
          <h2 className="text-lg font-semibold text-sky-400 mb-2">
            Sample Dataset
          </h2>

          <pre className="bg-slate-900 p-3 rounded-xl text-sm">
{`Name        Department      Salary
Ritaja      HR              42000
Mounita     Accounts        38000
Swadeep     IT              55000
Devangshu   HR              46000`}
          </pre>
        </section>

        {/* ----------------------------------------- */}
        {/* WHAT FILTERING DOES */}
        {/* ----------------------------------------- */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-300">
            What Filtering Can Do
          </h2>

          <ul className="ml-6 list-disc text-sm text-slate-300 space-y-1">
            <li>Show only HR department employees</li>
            <li>Display salaries above ₹40,000</li>
            <li>Find records matching multiple conditions</li>
            <li>Hide irrelevant rows without deleting them</li>
          </ul>
        </section>

        {/* ----------------------------------------- */}
        {/* SVG — FILTER DROPDOWN APPEARING */}
        {/* ----------------------------------------- */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-300">
            How AutoFilter Adds a Drop-Down to Each Header
          </h2>

          <div className="rounded-2xl border border-emerald-700 bg-emerald-950/20 p-4 flex justify-center">
            <svg viewBox="0 0 360 150" className="w-full max-w-xl">

              {/* Table container */}
              <rect x="10" y="10" width="340" height="130" rx="12"
                className="fill-slate-900 stroke-emerald-600" />

              {/* Header Row */}
              {["Name", "Dept ▾", "Salary"].map((text, i) => (
                <g key={i}>
                  <rect
                    x={20 + i * 110}
                    y={20}
                    width="100"
                    height="28"
                    rx="5"
                    className="fill-emerald-900/40"
                  />
                  <text
                    x={70 + i * 110}
                    y="38"
                    textAnchor="middle"
                    className="fill-emerald-200 text-[11px]"
                  >
                    {text}
                  </text>
                </g>
              ))}

              {/* Sample rows */}
              {[0, 1, 2].map((row) => (
                <rect
                  key={row}
                  x="20"
                  y={55 + row * 25}
                  width="300"
                  height="20"
                  rx="4"
                  className={
                    row % 2 === 0
                      ? "fill-slate-900 stroke-slate-700"
                      : "fill-slate-800/70 stroke-slate-700"
                  }
                />
              ))}

              {/* Highlight arrow for filter */}
              <polygon
                points="120,32 125,40 115,40"
                className="fill-emerald-300"
              />

              <text
                x="170"
                y="130"
                textAnchor="middle"
                className="fill-emerald-300 text-[10px]"
              >
                Filter drop-down added to every header
              </text>
            </svg>
          </div>
        </section>

        {/* ----------------------------------------- */}
        {/* HOW TO APPLY FILTER */}
        {/* ----------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            Steps to Apply a Filter
          </h2>

          <ol className="ml-6 list-decimal text-slate-300 text-sm space-y-1">
            <li>Select any cell inside your dataset.</li>
            <li>Go to <strong>Data → Filter</strong>.</li>
            <li>Small drop-down arrows will appear on each header.</li>
            <li>Click the arrow → choose what you want to display.</li>
          </ol>

          {/* SVG — Filter Panel Concept */}
          <div className="rounded-2xl border border-purple-700 bg-purple-950/20 p-4 flex justify-center">
            <svg viewBox="0 0 340 200" className="w-full max-w-md">

              {/* Panel */}
              <rect x="20" y="20" width="300" height="160" rx="10"
                className="fill-slate-900 stroke-purple-600" />

              {/* Filter panel title */}
              <text x="170" y="40" textAnchor="middle"
                className="fill-purple-300 text-[12px] font-semibold">
                Filter – Department
              </text>

              {/* Search box */}
              <rect x="40" y="55" width="260" height="20" rx="4"
                className="fill-purple-900/40" />
              <text x="50" y="70" className="fill-purple-200 text-[10px]">
                Search…
              </text>

              {/* Checkboxes */}
              {["HR", "Accounts", "IT"].map((dept, i) => (
                <g key={i}>
                  <rect
                    x="45"
                    y={90 + i * 25}
                    width="12"
                    height="12"
                    rx="2"
                    className="fill-purple-900 stroke-purple-500"
                  />
                  <text
                    x="65"
                    y={100 + i * 25}
                    className="fill-purple-200 text-[11px]"
                  >
                    {dept}
                  </text>
                </g>
              ))}

              {/* OK Button */}
              <rect x="200" y="150" width="70" height="20" rx="4"
                className="fill-purple-700" />
              <text x="235" y="165" textAnchor="middle"
                className="fill-white text-[10px]">
                Apply Filter
              </text>
            </svg>
          </div>
        </section>

        {/* ----------------------------------------- */}
        {/* TEACHER TIP */}
        {/* ----------------------------------------- */}
        <section className="rounded-xl bg-emerald-900/30 border border-emerald-700 p-4">
          <h3 className="font-semibold text-emerald-300">Teacher’s Tip</h3>
          <p className="text-sm">
            Always filter within an Excel Table (Ctrl + T) if possible —  
            filters applied outside tables may not auto-expand or update correctly.
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
              <li>Leaving blank rows in the dataset (Excel treats them as separate tables)</li>
              <li>Filtering numbers stored as text</li>
              <li>Not clearing filters and assuming rows are deleted</li>
              <li>Using filters on merged cells (Excel cannot filter properly)</li>
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
            <li>Filters hide non-matching rows temporarily.</li>
            <li>Use checkboxes, search, or text/number/date filters.</li>
            <li>Always filter inside a proper Excel Table.</li>
            <li>Remove filters from Data → Clear Filter.</li>
          </ul>
        </section>

      </div>
    );
  }
}
