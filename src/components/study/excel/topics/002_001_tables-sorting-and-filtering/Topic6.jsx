import React, { Component } from "react";

export default class Topic6 extends Component {
  render() {
    return (
      <div className="space-y-10 text-slate-200">

        {/* ----------------------------------------- */}
        {/* HEADER */}
        {/* ----------------------------------------- */}
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Excel Tables · Data Summary & Aggregation
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Total Row & Basic Aggregation in Excel Tables
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-slate-300">
            Excel Tables include a powerful feature called the <strong>Total Row</strong>.
            It allows you to quickly calculate totals, averages, counts, and more —
            all with dynamic updates whenever data changes.
          </p>
        </header>

        {/* ----------------------------------------- */}
        {/* SAMPLE TABLE */}
        {/* ----------------------------------------- */}
        <section>
          <h2 className="text-lg font-semibold text-sky-400 mb-2">
            Sample Table
          </h2>

          <pre className="bg-slate-900 p-3 rounded-xl text-sm">
{`Product       Price
Laptop        85000
Tablet        30000
Phone         55000
Desktop       40000`}
          </pre>

          <p className="text-sm mt-2">
            When converted to a Table, Excel can automatically calculate totals at the bottom.
          </p>
        </section>

        {/* ----------------------------------------- */}
        {/* TOTAL ROW SVG */}
        {/* ----------------------------------------- */}
        <section>
          <h2 className="text-xl font-semibold text-emerald-300">
            Understanding the Total Row
          </h2>

          <p className="text-sm text-slate-300">
            The Total Row appears at the bottom of a Table and provides a dropdown
            with built-in functions like:
          </p>

          <ul className="list-disc ml-6 text-sm space-y-1">
            <li>SUM</li>
            <li>AVERAGE</li>
            <li>COUNT</li>
            <li>MAX</li>
            <li>MIN</li>
          </ul>

          {/* SVG Diagram */}
          <div className="rounded-2xl border border-emerald-700 bg-emerald-950/20 p-5 flex justify-center">
            <svg viewBox="0 0 420 220" className="w-full max-w-2xl">

              {/* Table Background */}
              <rect x="20" y="20" width="380" height="150" rx="10"
                className="fill-slate-900 stroke-emerald-600" />

              {/* Header */}
              <rect x="20" y="20" width="180" height="30"
                className="fill-emerald-900/40 stroke-emerald-500" />
              <rect x="200" y="20" width="200" height="30"
                className="fill-emerald-900/40 stroke-emerald-500" />

              <text x="110" y="40" textAnchor="middle"
                className="fill-emerald-200 text-[12px]">Product</text>
              <text x="300" y="40" textAnchor="middle"
                className="fill-emerald-200 text-[12px]">Price</text>

              {/* Rows */}
              {["Laptop", "Tablet", "Phone", "Desktop"].map((item, i) => (
                <text
                  key={i}
                  x="40"
                  y={75 + i * 25}
                  className="fill-emerald-100 text-[11px]"
                >
                  {item}
                </text>
              ))}

              {[85000, 30000, 55000, 40000].map((price, i) => (
                <text
                  key={i}
                  x="300"
                  y={75 + i * 25}
                  textAnchor="middle"
                  className="fill-emerald-100 text-[11px]"
                >
                  {price}
                </text>
              ))}

              {/* Total Row */}
              <rect x="20" y="170" width="380" height="30" rx="8"
                className="fill-emerald-900/40 stroke-emerald-500" />

              <text x="60" y="190" className="fill-emerald-300 text-[11px]">
                Total:
              </text>

              {/* Dropdown */}
              <rect x="240" y="176" width="140" height="18" rx="4"
                className="fill-emerald-800 stroke-emerald-400" />

              <text x="310" y="189" textAnchor="middle"
                className="fill-emerald-100 text-[11px]">
                SUM ▼
              </text>
            </svg>
          </div>

          <p className="text-sm mt-3 text-slate-300">
            The Total Row updates automatically when new rows are added.
          </p>
        </section>

        {/* ----------------------------------------- */}
        {/* HOW TOTAL ROW WORKS */}
        {/* ----------------------------------------- */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-300">
            How Total Row Works Internally
          </h2>

          <p className="text-sm text-slate-300">
            Excel uses <strong>structured references</strong> inside Tables.
            When you choose SUM from the Total Row dropdown, Excel creates:
          </p>

          <pre className="bg-slate-900 p-3 rounded-xl text-sm">
{`=SUBTOTAL(109, Table1[Price])`}
          </pre>

          <p className="text-sm text-slate-300">
            <strong>Why SUBTOTAL?</strong>  
            Because it automatically ignores filtered-out values.
          </p>
        </section>

        {/* ----------------------------------------- */}
        {/* AUTO-UPDATE SVG */}
        {/* ----------------------------------------- */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-purple-300">
            Total Row Updates Automatically
          </h2>

          <p className="text-sm text-slate-300">
            When you add new rows to a Table, structured references expand automatically.
          </p>

          {/* Auto-expansion SVG */}
          <div className="rounded-2xl border border-purple-700 bg-purple-950/20 p-5 flex justify-center">
            <svg viewBox="0 0 430 200" className="w-full max-w-2xl">

              {/* Existing Rows */}
              <rect x="20" y="20" width="380" height="120" rx="10"
                className="fill-slate-900 stroke-purple-600" />

              <text x="210" y="105" textAnchor="middle"
                className="fill-purple-200 text-[12px]">
                Existing Data Range (Table1)
              </text>

              {/* New row added */}
              <rect x="20" y="150" width="380" height="25" rx="8"
                className="fill-purple-900/40 stroke-purple-500" />

              <text x="210" y="167" textAnchor="middle"
                className="fill-purple-200 text-[11px]">
                New Row → Table Expands Automatically
              </text>
            </svg>
          </div>
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
              <li>Not realizing Total Row is dynamic — it refreshes with data changes.</li>
              <li>Adding totals manually using regular formulas instead of SUBTOTAL.</li>
              <li>Forgetting that filtered-out values are excluded automatically.</li>
              <li>Trying to copy or move the Total Row like a normal row.</li>
            </ul>
          </div>
        </section>

        {/* ----------------------------------------- */}
        {/* TEACHER TIP */}
        {/* ----------------------------------------- */}
        <section className="rounded-xl bg-emerald-900/30 border border-emerald-700 p-4">
          <h3 className="font-semibold text-emerald-300">Teacher’s Tip</h3>
          <p className="text-sm">
            Use Total Row when creating dashboards or summaries.
            It ensures totals always reflect the visible (filtered) data.
          </p>
        </section>

        {/* ----------------------------------------- */}
        {/* SUMMARY */}
        {/* ----------------------------------------- */}
        <section className="rounded-2xl bg-sky-950/20 border border-sky-700 p-4">
          <h2 className="text-lg font-semibold text-sky-200">
            📘 Summary
          </h2>

          <ul className="text-sm list-disc ml-6 space-y-1 text-slate-300 mt-2">
            <li>The Total Row provides built-in aggregation tools.</li>
            <li>Uses SUBTOTAL(), not SUM(), for accurate filtering behavior.</li>
            <li>Automatically expands as Table grows.</li>
            <li>Makes reporting much easier and error-free.</li>
          </ul>
        </section>

      </div>
    );
  }
}
