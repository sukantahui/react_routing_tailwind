// Topic6.jsx
import React from "react";

export default function Topic6() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Understanding Cell References and Used Range
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Learn what an active cell is, how cell addresses are written, and what
          we mean by used range.
        </p>
      </header>

      {/* ACTIVE CELL */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">Active Cell</h2>
        <p className="text-slate-300 text-sm md:text-base">
          The <span className="font-semibold">active cell</span> is the cell
          where you are currently working. It has a thick border around it. Any
          data you type or formula you enter will go into the active cell.
        </p>
      </section>

      {/* CELL ADDRESS */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-300">
          Cell Address (Cell Reference)
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Every cell has an address based on its column letter and row number.
          For example:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li><strong>A1</strong> → Column A, Row 1</li>
          <li><strong>C5</strong> → Column C, Row 5</li>
          <li><strong>F10</strong> → Column F, Row 10</li>
        </ul>
        <p className="text-slate-300 text-sm md:text-base">
          When we select multiple cells together, it is called a{" "}
          <span className="font-semibold">range</span>, e.g.,{" "}
          <span className="font-mono">A1:D5</span>.
        </p>
      </section>

      {/* USED RANGE */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-purple-300">Used Range</h2>
        <p className="text-slate-300 text-sm md:text-base">
          The <span className="font-semibold">used range</span> is the smallest
          rectangular area on the sheet that contains any data or formatting.
        </p>
        <p className="text-slate-300 text-sm md:text-base">
          For example, if you have data from A1 to D10, then the used range of
          that sheet is <span className="font-mono">A1:D10</span>. When you
          press <strong>Ctrl + End</strong>, Excel takes you to the last cell of
          the used range.
        </p>
      </section>

      {/* PRACTICE */}
      <section className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6">
        <h2 className="text-lg font-semibold text-emerald-300">
          Try It Yourself – Identify Addresses and Ranges
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>Enter any data in cells A1, B3, D5 and F8.</li>
          <li>Observe the Name Box when you move to each cell.</li>
          <li>Select cells A1 to C3 – notice the range shown.</li>
          <li>
            Press <strong>Ctrl + End</strong> and see which cell is considered
            the last cell in the used range.
          </li>
        </ol>
      </section>
    </div>
  );
}
