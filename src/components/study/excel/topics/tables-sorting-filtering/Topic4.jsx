import React, { Component } from "react";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-10 text-slate-200">

        {/* ----------------------------------------- */}
        {/* HEADER */}
        {/* ----------------------------------------- */}
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Excel Data Filtering · Advanced Filter Types
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Using Number, Text & Date Filters Effectively
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-slate-300">
            Excel provides specialised filters for different types of data.
            These filters allow you to extract meaningful information
            without manually scanning rows.
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
{`Date        Product     Amount
01-Jan      Laptop      45000
03-Jan      Tablet      18000
05-Jan      Mouse       1200
10-Jan      Laptop      47000`}
          </pre>
        </section>

        {/* ----------------------------------------- */}
        {/* NUMBER FILTERS */}
        {/* ----------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-amber-300">
            Number Filters (Amount Column)
          </h2>

          <p className="text-sm leading-relaxed text-slate-300">
            Number Filters help you apply conditions such as:
          </p>

          <ul className="list-disc ml-6 text-sm space-y-1 text-slate-300">
            <li>Greater Than</li>
            <li>Less Than</li>
            <li>Between two values</li>
            <li>Top 10 amounts</li>
          </ul>

          {/* SVG Diagram – Number Filter Panel */}
          <div className="rounded-2xl border border-amber-700 bg-amber-950/20 p-4 flex justify-center">
            <svg viewBox="0 0 340 200" className="w-full max-w-md">

              <rect x="20" y="20" width="300" height="160" rx="10"
                className="fill-slate-900 stroke-amber-600" />

              <text x="170" y="40" textAnchor="middle"
                className="fill-amber-300 text-[12px] font-semibold">
                Number Filter – Amount
              </text>

              {["Equals", "Does Not Equal", "Greater Than", "Between"].map((opt, i) => (
                <text
                  key={i}
                  x="40"
                  y={75 + i * 25}
                  className="fill-amber-200 text-[11px]"
                >
                  • {opt}
                </text>
              ))}

              <rect x="200" y="150" width="70" height="20" rx="4"
                className="fill-amber-700" />
              <text x="235" y="165" textAnchor="middle"
                className="fill-white text-[10px]">
                Apply
              </text>
            </svg>
          </div>

          <p className="text-sm text-slate-300">
            Example: Show all sales above ₹40,000.
          </p>
        </section>

        {/* ----------------------------------------- */}
        {/* TEXT FILTERS */}
        {/* ----------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            Text Filters (Product Column)
          </h2>

          <p className="text-sm text-slate-300">
            Text filters help you match values using:
          </p>

          <ul className="list-disc ml-6 text-sm space-y-1 text-slate-300">
            <li>Begins With</li>
            <li>Ends With</li>
            <li>Contains</li>
            <li>Does Not Contain</li>
          </ul>

          {/* SVG – Text Filter Panel */}
          <div className="rounded-2xl border border-purple-700 bg-purple-950/20 p-4 flex justify-center">
            <svg viewBox="0 0 340 200" className="w-full max-w-md">
              <rect x="20" y="20" width="300" height="160" rx="10"
                className="fill-slate-900 stroke-purple-600" />

              <text x="170" y="40" textAnchor="middle"
                className="fill-purple-300 text-[12px] font-semibold">
                Text Filter – Product
              </text>

              {["Contains 'Lap'", "Begins With 'T'", "Ends With 'op'"].map(
                (opt, i) => (
                  <text
                    key={i}
                    x="40"
                    y={75 + i * 25}
                    className="fill-purple-200 text-[11px]"
                  >
                    • {opt}
                  </text>
                )
              )}

              <rect x="200" y="150" width="70" height="20" rx="4"
                className="fill-purple-700" />
              <text x="235" y="165" textAnchor="middle"
                className="fill-white text-[10px]">
                Apply
              </text>
            </svg>
          </div>

          <p className="text-sm text-slate-300">
            Example: Show all items containing “Lap”.
          </p>
        </section>

        {/* ----------------------------------------- */}
        {/* DATE FILTERS */}
        {/* ----------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            Date Filters (Date Column)
          </h2>

          <p className="text-sm text-slate-300">
            Excel automatically detects dates and groups them into:
          </p>

          <ul className="list-disc ml-6 text-sm space-y-1 text-slate-300">
            <li>Years → Months → Days</li>
            <li>This Week / Next Week</li>
            <li>Last Month / This Month</li>
            <li>Custom Date Ranges</li>
          </ul>

          {/* SVG – Date Hierarchy Panel */}
          <div className="rounded-2xl border border-sky-700 bg-sky-950/20 p-4 flex justify-center">
            <svg viewBox="0 0 360 180" className="w-full max-w-lg">

              <rect x="20" y="20" width="320" height="140" rx="10"
                className="fill-slate-900 stroke-sky-600" />

              <text x="180" y="40" textAnchor="middle"
                className="fill-sky-300 text-[12px] font-semibold">
                Date Filter – Hierarchy
              </text>

              {/* Year */}
              <rect x="40" y="60" width="80" height="25" rx="5"
                className="fill-sky-900/40 stroke-sky-700" />
              <text x="80" y="77" textAnchor="middle"
                className="fill-sky-200 text-[11px]">
                2025 ▾
              </text>

              {/* Months */}
              {["Jan", "Feb", "Mar"].map((m, i) => (
                <g key={i}>
                  <rect
                    x={140 + i * 60}
                    y="60"
                    width="50"
                    height="25"
                    rx="5"
                    className="fill-sky-900/20 stroke-sky-700"
                  />
                  <text
                    x={165 + i * 60}
                    y="77"
                    textAnchor="middle"
                    className="fill-sky-200 text-[11px]"
                  >
                    {m}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <p className="text-sm text-slate-300">
            Example: Show all sales of the current month.
          </p>
        </section>

        {/* ----------------------------------------- */}
        {/* TEACHER TIP */}
        {/* ----------------------------------------- */}
        <section className="rounded-xl bg-emerald-900/30 border border-emerald-700 p-4">
          <h3 className="font-semibold text-emerald-300">Teacher’s Tip</h3>
          <p className="text-sm">
            If filters aren’t working, check whether numbers or dates are
            stored as **text**. Excel won’t apply number/date filters on text values.
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
              <li>Using Contains for numbers instead of Number Filters</li>
              <li>Typing wrong date formats (Excel doesn’t recognise them)</li>
              <li>Selecting incomplete ranges before filtering</li>
              <li>Filtering on merged cells (Excel cannot filter properly)</li>
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
            <li>Use Number Filters for values like amount, quantity, marks.</li>
            <li>Use Text Filters for names, product categories, IDs.</li>
            <li>Use Date Filters to explore time-based patterns quickly.</li>
            <li>Ensure data types are correct for accurate filtering.</li>
          </ul>
        </section>

      </div>
    );
  }
}
