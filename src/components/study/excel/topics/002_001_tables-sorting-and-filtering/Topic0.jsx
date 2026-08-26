import React, { Component } from "react";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-8 text-slate-200">
        {/* TITLE + INTRO */}
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Excel Essentials · Structured Data
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Converting Data Ranges into Excel Tables
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-slate-300">
            An <strong>Excel Table</strong> is not just formatting – it turns a
            plain data range into a <strong>smart, structured list</strong> with
            built-in filters, automatic expansion, and powerful features for
            sorting, filtering, and analysis.
          </p>
        </header>

        {/* BEFORE vs AFTER – SVG DIAGRAM */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* BEFORE: Normal Range */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
            <h2 className="text-lg font-semibold text-rose-300 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-900/40 text-xs">
                🧾
              </span>
              Before: Normal Range
            </h2>
            <p className="text-sm text-slate-300">
              Just a block of cells. No built-in filters, no automatic
              expansion, and formulas don’t adapt smartly.
            </p>

            {/* SVG: Plain range */}
            <div className="bg-slate-950/80 rounded-xl p-3 flex items-center justify-center">
              <svg
                viewBox="0 0 220 120"
                className="w-full max-w-xs"
                role="img"
                aria-label="Plain range without filters"
              >
                {/* Background */}
                <rect
                  x="5"
                  y="5"
                  width="210"
                  height="110"
                  rx="8"
                  className="fill-slate-900 stroke-slate-700"
                />
                {/* Header row */}
                <rect
                  x="15"
                  y="18"
                  width="85"
                  height="22"
                  rx="3"
                  className="fill-slate-800 stroke-slate-600"
                />
                <rect
                  x="115"
                  y="18"
                  width="85"
                  height="22"
                  rx="3"
                  className="fill-slate-800 stroke-slate-600"
                />
                <text
                  x="57"
                  y="33"
                  textAnchor="middle"
                  className="fill-sky-300 text-[9px]"
                >
                  Product
                </text>
                <text
                  x="157"
                  y="33"
                  textAnchor="middle"
                  className="fill-sky-300 text-[9px]"
                >
                  Sales
                </text>

                {/* Data rows (no banding, no filters) */}
                {["Laptop", "Tablet", "Phone"].map((label, i) => {
                  const y = 46 + i * 22;
                  return (
                    <g key={label}>
                      <rect
                        x="15"
                        y={y - 12}
                        width="85"
                        height="20"
                        rx="3"
                        className="fill-slate-900 stroke-slate-700"
                      />
                      <rect
                        x="115"
                        y={y - 12}
                        width="85"
                        height="20"
                        rx="3"
                        className="fill-slate-900 stroke-slate-700"
                      />
                      <text
                        x="57"
                        y={y}
                        textAnchor="middle"
                        className="fill-slate-200 text-[9px]"
                      >
                        {label}
                      </text>
                      <text
                        x="157"
                        y={y}
                        textAnchor="middle"
                        className="fill-slate-200 text-[9px]"
                      >
                        0
                      </text>
                    </g>
                  );
                })}
                {/* Caption */}
                <text
                  x="110"
                  y="110"
                  textAnchor="middle"
                  className="fill-slate-500 text-[8px]"
                >
                  Normal range – no filters, no banding, no auto-features
                </text>
              </svg>
            </div>

            <p className="text-xs text-slate-400">
              Formulas like <code className="text-emerald-300">=B2*10%</code> use{" "}
              <em>normal references</em> (A2, B2, etc.), which can break if
              rows are inserted or deleted incorrectly.
            </p>
          </div>

          {/* AFTER: Excel Table */}
          <div className="rounded-2xl border border-emerald-700/70 bg-emerald-950/20 p-4 space-y-3">
            <h2 className="text-lg font-semibold text-emerald-300 flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-900/40 text-xs">
                📋
              </span>
              After: Excel Table
            </h2>
            <p className="text-sm text-slate-200">
              The same data, but converted to a{" "}
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs">
                Smart Table
              </span>
              .
            </p>

            {/* SVG: Table with filters, banding, total row */}
            <div className="bg-slate-950/80 rounded-xl p-3 flex items-center justify-center">
              <svg
                viewBox="0 0 220 140"
                className="w-full max-w-xs"
                role="img"
                aria-label="Excel Table with filters and banded rows"
              >
                {/* Outer border */}
                <rect
                  x="5"
                  y="5"
                  width="210"
                  height="130"
                  rx="8"
                  className="fill-slate-900 stroke-emerald-600"
                />

                {/* Header band */}
                <rect
                  x="15"
                  y="18"
                  width="185"
                  height="22"
                  rx="4"
                  className="fill-emerald-900/80 stroke-emerald-500"
                />

                {/* Header cells */}
                <rect
                  x="15"
                  y="18"
                  width="95"
                  height="22"
                  className="fill-transparent"
                />
                <rect
                  x="105"
                  y="18"
                  width="95"
                  height="22"
                  className="fill-transparent"
                />

                {/* Header titles */}
                <text
                  x="50"
                  y="32"
                  className="fill-emerald-100 text-[9px]"
                >
                  Product ▾
                </text>
                <text
                  x="145"
                  y="32"
                  className="fill-emerald-100 text-[9px]"
                >
                  Sales ▾
                </text>

                {/* Data rows with banding */}
                {["Laptop", "Tablet", "Phone"].map((label, i) => {
                  const y = 46 + i * 20;
                  const isEven = i % 2 === 0;
                  return (
                    <g key={label}>
                      <rect
                        x="15"
                        y={y - 12}
                        width="185"
                        height="18"
                        rx="3"
                        className={
                          isEven
                            ? "fill-slate-900 stroke-slate-700"
                            : "fill-slate-800/80 stroke-slate-700"
                        }
                      />
                      <text
                        x="30"
                        y={y}
                        className="fill-slate-100 text-[9px]"
                      >
                        {label}
                      </text>
                      <text
                        x="165"
                        y={y}
                        textAnchor="end"
                        className="fill-slate-100 text-[9px]"
                      >
                        0
                      </text>
                    </g>
                  );
                })}

                {/* Total Row */}
                <rect
                  x="15"
                  y={46 + 3 * 20}
                  width="185"
                  height="18"
                  rx="3"
                  className="fill-emerald-900/70 stroke-emerald-500/60"
                />
                <text
                  x="30"
                  y={46 + 3 * 20 + 11}
                  className="fill-emerald-200 text-[9px]"
                >
                  Total
                </text>
                <text
                  x="165"
                  y={46 + 3 * 20 + 11}
                  textAnchor="end"
                  className="fill-emerald-200 text-[9px]"
                >
                  =SUBTOTAL(109,[Sales])
                </text>

                {/* Caption */}
                <text
                  x="110"
                  y="130"
                  textAnchor="middle"
                  className="fill-emerald-300 text-[8px]"
                >
                  Excel Table: filters, banded rows, Total Row & structured refs
                </text>
              </svg>
            </div>

            <ul className="text-xs text-emerald-200 space-y-1">
              <li>✔ Filter arrows automatically added</li>
              <li>✔ Rows auto-expand when you type below the table</li>
              <li>✔ Formulas can use structured names like{" "}
                <code className="text-emerald-300">
                  [@Sales]
                </code>
              </li>
            </ul>
          </div>
        </section>

        {/* STEP-BY-STEP: HOW TO CONVERT TO TABLE */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-300">
            Step-by-Step: Converting a Range to a Table
          </h2>

          <ol className="list-decimal ml-6 space-y-2 text-sm text-slate-200">
            <li>
              Select the entire data range, including headers.<br />
              <span className="text-slate-400 text-xs">
                Example: <code>A1:B10</code>
              </span>
            </li>
            <li>
              Use shortcut{" "}
              <code className="px-1.5 py-0.5 rounded bg-slate-800 text-[11px] border border-slate-600">
                Ctrl + T
              </code>{" "}
              (or{" "}
              <code className="px-1.5 py-0.5 rounded bg-slate-800 text-[11px] border border-slate-600">
                Ctrl + L
              </code>
              ).
            </li>
            <li>
              In the dialog, ensure{" "}
              <strong>“My table has headers”</strong> is ticked.
            </li>
            <li>Click <strong>OK</strong>.</li>
            <li>
              Excel applies a table style, filter buttons, and creates a{" "}
              <strong>Table Name</strong> (e.g. <code>SalesTable</code>).
            </li>
          </ol>

          {/* Mini SVG: Ctrl + T dialog concept */}
          <div className="bg-slate-900/70 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
            <svg
              viewBox="0 0 260 120"
              className="w-full max-w-sm"
              role="img"
              aria-label="Create Table dialog illustration"
            >
              <rect
                x="5"
                y="5"
                width="250"
                height="110"
                rx="10"
                className="fill-slate-900 stroke-slate-700"
              />
              <rect
                x="15"
                y="15"
                width="140"
                height="16"
                rx="3"
                className="fill-slate-800"
              />
              <text
                x="20"
                y="26"
                className="fill-slate-200 text-[9px]"
              >
                Create Table
              </text>

              <text
                x="20"
                y="48"
                className="fill-slate-300 text-[9px]"
              >
                Where is the data for your table?
              </text>
              <rect
                x="20"
                y="55"
                width="160"
                height="16"
                rx="3"
                className="fill-slate-800 stroke-slate-600"
              />
              <text
                x="25"
                y="66"
                className="fill-emerald-300 text-[9px]"
              >
                =Sheet1!$A$1:$B$10
              </text>

              <rect
                x="20"
                y="78"
                width="12"
                height="12"
                rx="2"
                className="fill-emerald-500"
              />
              <text
                x="38"
                y="87"
                className="fill-slate-200 text-[8px]"
              >
                My table has headers
              </text>

              <rect
                x="175"
                y="80"
                width="30"
                height="16"
                rx="4"
                className="fill-emerald-600"
              />
              <text
                x="190"
                y="92"
                textAnchor="middle"
                className="fill-white text-[8px]"
              >
                OK
              </text>

              <rect
                x="210"
                y="80"
                width="30"
                height="16"
                rx="4"
                className="fill-slate-700"
              />
              <text
                x="225"
                y="92"
                textAnchor="middle"
                className="fill-slate-200 text-[8px]"
              >
                Cancel
              </text>
            </svg>

            <div className="text-xs text-slate-300 space-y-1">
              <p>
                ✅ Always verify the range and headers before confirming.  
              </p>
              <p>
                ✅ After conversion, check the{" "}
                <span className="px-2 py-0.5 rounded bg-sky-900/40 border border-sky-500/40 text-[11px] text-sky-200">
                  Table Design
                </span>{" "}
                tab for name and options.
              </p>
            </div>
          </div>
        </section>

        {/* BENEFITS GRID */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-300">
            Key Benefits of Using Excel Tables
          </h2>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/20">
                  🔠
                </span>
                <h3 className="font-semibold text-sky-200">
                  Structured References
                </h3>
              </div>
              <p className="text-slate-300 text-xs">
                Use names instead of raw cell addresses:
              </p>
              <pre className="bg-slate-950 p-2 rounded-lg text-[11px] text-emerald-300 overflow-x-auto">
{`= [@Sales] * 0.10
= SUM( SalesTable[Sales] )`}
              </pre>
              <p className="text-xs text-slate-400">
                This makes formulas easier to read and maintain.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20">
                  📈
                </span>
                <h3 className="font-semibold text-emerald-200">
                  Auto-Expansion
                </h3>
              </div>
              <p className="text-slate-300 text-xs">
                Type a new record just below the table – it automatically
                becomes part of the table and all formulas, charts, and pivots
                update.
              </p>
              <p className="text-xs text-emerald-300">
                ➜ Perfect for daily/weekly data entry.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20">
                  🔍
                </span>
                <h3 className="font-semibold text-amber-200">
                  Built-in Filters & Sorting
                </h3>
              </div>
              <p className="text-slate-300 text-xs">
                Each header gets a drop-down for:
              </p>
              <ul className="text-xs text-slate-300 list-disc ml-4 space-y-1">
                <li>Fast sorting (A→Z, Z→A, largest to smallest)</li>
                <li>Number, text, and date filters</li>
                <li>Filter by color, search, and conditions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* COMMON MISTAKES PANEL */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-300">
            Common Mistakes to Avoid
          </h2>
          <div className="rounded-2xl border border-rose-700/70 bg-rose-950/20 p-4 text-sm space-y-2">
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <strong>No proper headers:</strong> Data mixed with headings in
                the same row.
              </li>
              <li>
                <strong>Blank rows or columns inside the range:</strong> They
                break the table’s continuity.
              </li>
              <li>
                <strong>Different data types in one column:</strong> Text mixed
                with numbers causes filter and sort confusion.
              </li>
              <li>
                <strong>Not naming the table:</strong> Using the default{" "}
                <code>Table1</code>, <code>Table2</code> instead of meaningful
                names like <code>SalesTable</code>.
              </li>
            </ul>
            <p className="text-xs text-rose-200">
              Fix these before converting to avoid strange charts, filters, or
              pivot results later.
            </p>
          </div>
        </section>

        {/* SHORTCUTS + TOTAL ROW */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Shortcuts */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
            <h2 className="text-lg font-semibold text-sky-300">
              Handy Keyboard Shortcuts
            </h2>
            <table className="w-full text-xs border-separate border-spacing-y-1">
              <tbody>
                {[
                  ["Ctrl + T", "Convert selected range into a Table"],
                  ["Ctrl + L", "Alternative shortcut for Table"],
                  ["Ctrl + Space", "Select entire column in the table"],
                  ["Shift + Space", "Select entire row in the table"],
                  ["Ctrl + Shift + ↓", "Extend selection to bottom"],
                ].map(([keys, desc]) => (
                  <tr key={keys}>
                    <td className="align-top pr-3 whitespace-nowrap">
                      <code className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-600 text-[11px]">
                        {keys}
                      </code>
                    </td>
                    <td className="align-top text-slate-300">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Row & Aggregation */}
          <div className="rounded-2xl border border-emerald-700/70 bg-emerald-950/20 p-4 space-y-3">
            <h2 className="text-lg font-semibold text-emerald-300">
              Total Row & Quick Aggregation
            </h2>
            <p className="text-sm text-slate-200">
              Turn on{" "}
              <span className="px-2 py-0.5 rounded bg-emerald-900/40 border border-emerald-500/40 text-[11px]">
                Total Row
              </span>{" "}
              from the <strong>Table Design</strong> tab. Excel automatically
              adds a special row at the bottom.
            </p>
            <ul className="list-disc ml-5 text-xs space-y-1 text-emerald-100">
              <li>Choose SUM, AVERAGE, COUNT, MIN, MAX etc. from drop-downs.</li>
              <li>Uses <strong>SUBTOTAL</strong> so filters are respected.</li>
              <li>Ideal for quick analysis without writing formulas manually.</li>
            </ul>
          </div>
        </section>

        {/* REAL-LIFE USE CASE + PRACTICE TASKS */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* Real-life use case */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
            <h2 className="text-lg font-semibold text-sky-300">
              Real-Life Use Case (Office Scenario)
            </h2>
            <p className="text-sm text-slate-300">
              You manage monthly sales in Excel. Every day, new rows are added
              at the bottom.
            </p>
            <ul className="list-disc ml-5 text-xs text-slate-300 space-y-1">
              <li>
                Convert your list into a Table named{" "}
                <code>SalesTable</code>.
              </li>
              <li>
                Build a PivotTable based on <code>SalesTable</code>.
              </li>
              <li>
                Next month, just add new rows – the pivot refresh updates
                automatically.
              </li>
            </ul>
            <p className="text-xs text-emerald-300">
              ➜ Tables become the foundation for dashboards and reports.
            </p>
          </div>

          {/* Practice tasks */}
          <div className="rounded-2xl border border-blue-700/70 bg-blue-950/20 p-4 space-y-2">
            <h2 className="text-lg font-semibold text-blue-200">
              Practice Tasks for Students
            </h2>
            <ol className="list-decimal ml-5 text-xs text-slate-200 space-y-1.5">
              <li>
                Take a simple marks list (Name, Subject, Marks) and convert it
                into an Excel Table using <code>Ctrl + T</code>.
              </li>
              <li>
                Rename the table to <code>MarksTable</code> and apply a table
                style of your choice.
              </li>
              <li>
                Turn on the <strong>Total Row</strong> and calculate:
                <ul className="list-disc ml-5 mt-1 space-y-1">
                  <li>Total marks (SUM)</li>
                  <li>Average marks</li>
                  <li>Number of students (COUNT)</li>
                </ul>
              </li>
              <li>
                Filter students with marks &gt;= 80 and observe how Total Row
                updates.
              </li>
            </ol>
          </div>
        </section>

        {/* FINAL SUMMARY BOX */}
        <section className="rounded-2xl border border-sky-700/70 bg-sky-950/20 p-4 text-sm space-y-2">
          <h2 className="text-lg font-semibold text-sky-200 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/30">
              ✅
            </span>
            Key Takeaways
          </h2>
          <ul className="list-disc ml-5 text-xs space-y-1 text-slate-200">
            <li>Tables make ranges smarter, not just prettier.</li>
            <li>
              Always include proper headers and avoid blank rows/columns inside
              the data.
            </li>
            <li>
              Use <code>Ctrl + T</code> and give your table a meaningful name.
            </li>
            <li>
              Use Total Row + filters for quick analysis without complex
              formulas.
            </li>
          </ul>
        </section>
      </div>
    );
  }
}
