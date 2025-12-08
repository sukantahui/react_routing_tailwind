import React from "react";

export default function Topic0() {
  return (
    <div className="space-y-8 text-slate-100">
      {/* HEADER */}
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Best Practices for Data Entry in Excel
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Learn how to structure your data correctly using clear headers, no
          blank columns or rows, and consistent formats. Good data structure is
          the foundation of powerful Excel work.
        </p>
      </header>

      {/* WHY STRUCTURE MATTERS */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          Why Good Data Entry Matters
        </h2>
        <p className="text-sm md:text-base text-slate-300 leading-relaxed">
          Excel formulas, charts, PivotTables, filters and sorting all work best
          when data is arranged in a clean, tabular format. Poor structure
          creates errors and makes analysis difficult.
        </p>
      </section>

      {/* TABLE DIAGRAM: GOOD VS BAD */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-amber-300">
          Good vs Bad Data Layout
        </h2>

        <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="bg-slate-900 border border-emerald-500/60 rounded-2xl p-4">
            <h3 className="font-semibold text-emerald-300 mb-2">
              ✅ Good Layout (Clean Table)
            </h3>
            <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`A        B          C        D
----------------------------------------
Date     Name       Product  Amount
01-01   Rita       Pen      50
01-01   Rahul      Copy     120
02-01   Sneha      Pencil   30`}
            </pre>
            <ul className="mt-2 list-disc pl-5 text-slate-300">
              <li>Single header row.</li>
              <li>No blank columns.</li>
              <li>Each row = one record.</li>
            </ul>
          </div>

          <div className="bg-slate-900 border border-rose-500/60 rounded-2xl p-4">
            <h3 className="font-semibold text-rose-300 mb-2">
              ❌ Bad Layout (Hard to Analyse)
            </h3>
            <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`A          B        C       D
-----------------------------------------
Sales of January
Date     Name     Amount

01-01    Rita     50

Rahul    120   (blank date)
02-01           30 (blank name)`}
            </pre>
            <ul className="mt-2 list-disc pl-5 text-slate-300">
              <li>Extra titles mixed with data.</li>
              <li>Blank rows breaking the table.</li>
              <li>Missing values in important columns.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* HEADERS */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-sky-300">
          Use Clear, Simple Headers
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>Use one row at the top for column headings.</li>
          <li>Avoid merged cells in the header row.</li>
          <li>Use short but clear names: <span className="font-mono">Date</span>, <span className="font-mono">CustomerName</span>, <span className="font-mono">Amount</span>.</li>
          <li>Do not leave header cells blank.</li>
        </ul>
      </section>

      {/* NO BLANK COLUMNS / ROWS */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-purple-300">
          Avoid Blank Columns and Rows Inside Your Table
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Blank rows or columns inside your table break the data range. Excel
          may treat them as separators and stop formulas, sorting and filters at
          that point.
        </p>
        <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`Good:
A      B      C
---------------------
Name   Class  Marks
Rita   X      88
Sourav X      75

Bad (blank column B):
A      B      C
---------------------
Name          Marks
Rita          88
Sourav        75`}
        </pre>
      </section>

      {/* CONSISTENT FORMATS */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-amber-300">
          Keep Data Types Consistent in a Column
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Each column should contain the same type of data. Do not mix text and
          numbers in the same column if you plan to calculate or sort.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>
            <strong>Good:</strong> <span className="font-mono">Amount</span>{" "}
            column contains only numbers.
          </li>
          <li>
            <strong>Bad:</strong> mixing <span className="font-mono">“Rs. 500”</span>,{" "}
            <span className="font-mono">500</span>, and <span className="font-mono">“Five Hundred”</span>.
          </li>
          <li>
            Use one date format across the column: e.g.{" "}
            <span className="font-mono">dd-mm-yyyy</span>.
          </li>
        </ul>
      </section>

      {/* TEACHER TIP */}
      <section className="bg-slate-900/70 border border-emerald-500/60 rounded-2xl p-4 md:p-5">
        <h2 className="text-base md:text-lg font-semibold text-emerald-300 mb-2">
          Teacher&apos;s Tips 🧑‍🏫
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-xs md:text-sm text-slate-200">
          <li>Ask students to redesign a “bad” table into a “good” one.</li>
          <li>
            Show how filters or PivotTables fail when blank rows/columns are used.
          </li>
          <li>
            Give them a printed example of a messy bill register and tell them
            to enter it properly in Excel.
          </li>
        </ul>
      </section>
    </div>
  );
}
