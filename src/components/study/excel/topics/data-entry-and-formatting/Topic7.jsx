import React from "react";

export default function Topic7() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Practice – Data Entry and Formatting Essentials
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Apply everything you have learned: clean data entry, correct types,
          editing, formatting, and basic conditional formatting.
        </p>
      </header>

      {/* TASK 1 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          Task 1 – Create a Clean Sales Table
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>
            Create a new sheet and name it{" "}
            <span className="font-mono">SalesData</span>.
          </li>
          <li>
            In row 1, create headers:{" "}
            <span className="font-mono">
              Date, CustomerName, Product, Quantity, Rate, Amount
            </span>
          </li>
          <li>
            Enter at least 10 rows of sample data with correct date, text and
            numeric formats.
          </li>
          <li>
            Ensure there are no blank columns or extra header rows inside the
            table.
          </li>
        </ol>
      </section>

      {/* TASK 2 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-300">
          Task 2 – Use AutoFill and Flash Fill
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>In a new sheet, create a list of dates for one week using AutoFill.</li>
          <li>Use AutoFill to generate a sequence of invoice numbers.</li>
          <li>
            Enter a column of full names like{" "}
            <span className="font-mono">"Rita Das"</span>,{" "}
            <span className="font-mono">"Sourav Dey"</span>, etc.
          </li>
          <li>
            Use Flash Fill to split the names into First Name and Last Name in
            separate columns.
          </li>
        </ol>
      </section>

      {/* TASK 3 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-purple-300">
          Task 3 – Format the Sheet Professionally
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>Make the header row bold with a light fill color.</li>
          <li>
            Apply number formats: dates for Date column, Number or Currency for
            Amount.
          </li>
          <li>Adjust column width so that all text is visible.</li>
          <li>Apply borders to the entire data range.</li>
          <li>
            Use Format Painter to apply formatting from one total cell to all
            other total cells.
          </li>
        </ol>
      </section>

      {/* TASK 4 */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-sky-300">
          Task 4 – Basic Conditional Formatting
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>
            Use Conditional Formatting to highlight all Amount values greater
            than a chosen target (e.g., 1000).
          </li>
          <li>
            Apply Data Bars to the Amount column to visualize which entry is
            highest.
          </li>
          <li>
            Try Duplicate Values rule on the CustomerName column to see if any
            name is repeated.
          </li>
        </ol>
      </section>

      {/* TEACHER TIP */}
      <section className="bg-slate-900/70 border border-emerald-500/60 rounded-2xl p-4 md:p-5">
        <h2 className="text-base md:text-lg font-semibold text-emerald-300 mb-2">
          Teacher&apos;s Tips 🧑‍🏫
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-xs md:text-sm text-slate-200">
          <li>
            Treat this practice sheet as a mini-project and grade students on
            cleanliness, correctness and readability.
          </li>
          <li>
            Encourage them to export or print the sheet as a one-page report.
          </li>
          <li>
            Ask them to explain why each formatting choice (color, border,
            alignment) was used.
          </li>
        </ul>
      </section>
    </div>
  );
}
