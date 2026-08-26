// Topic7.jsx
import React from "react";

export default function Topic7() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Practice Session – Excel Basics
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Apply everything you’ve learned so far about workbooks, worksheets,
          navigation and cell references.
        </p>
      </header>

      {/* PRACTICE 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          Practice Task 1 – Simple Marks Sheet
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>Create a new workbook and rename Sheet1 to Marks.</li>
          <li>
            Enter the following headings in Row 1:
            <br />
            <span className="font-mono">
              A1: Roll No, B1: Name, C1: English, D1: Math, E1: Science
            </span>
          </li>
          <li>Fill in data for at least 5 students in rows 2 to 6.</li>
          <li>Adjust column width so that names are clearly visible.</li>
          <li>Use keyboard arrows and Tab to move between cells.</li>
        </ol>
      </section>

      {/* PRACTICE 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-300">
          Practice Task 2 – Simple Expenses Sheet
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>Add a new sheet and rename it to Expenses.</li>
          <li>
            Create headings: Date, Description, Category, Amount in row 1.
          </li>
          <li>Enter at least 10 expense records (can be imaginary).</li>
          <li>Use Go To (F5) to jump to cell D10 directly.</li>
          <li>
            Save the workbook as{" "}
            <span className="font-mono">PracticeBasics.xlsx</span>.
          </li>
        </ol>
      </section>

      {/* REFLECTION */}
      <section className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6">
        <h2 className="text-lg font-semibold text-purple-300">
          Self-Check Questions
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>Were you able to move quickly without using the mouse too much?</li>
          <li>Did you rename sheets and save the workbook correctly?</li>
          <li>Can you identify the cell address when you stand on any cell?</li>
        </ul>
      </section>
    </div>
  );
}
