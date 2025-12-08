import React from "react";

export default function Topic3() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Formatting Cells: Font, Alignment, Number, Borders and Fill
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Learn how to make your data clear and readable using font styles,
          alignment, number formats, borders and background colors.
        </p>
      </header>

      {/* FONT FORMATTING */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          Font Formatting
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>Bold, Italic, Underline from the Home → Font group.</li>
          <li>Change font family and size to improve readability.</li>
          <li>Use font color to highlight important values, not for decoration only.</li>
        </ul>
        <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`Examples:
Heading row → Bold + slightly bigger font
Total cells → Bold + maybe a different fill color
Negative values → Red font (via formatting or conditional formatting)`}
        </pre>
      </section>

      {/* ALIGNMENT */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-amber-300">
          Alignment – Horizontal and Vertical
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Alignment controls where the content sits inside the cell.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>Left, Center, Right for horizontal alignment.</li>
          <li>Top, Middle, Bottom for vertical alignment.</li>
          <li>
            <strong>Wrap Text</strong> to show long text in multiple lines in
            the same cell.
          </li>
        </ul>
      </section>

      {/* NUMBER FORMATS */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-purple-300">
          Number Formats – General, Number, Currency, Percentage
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Number formatting changes how numbers are displayed without changing
          their actual value.
        </p>
        <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`Original value in cell: 0.25

Displayed as:
  General    → 0.25
  Percentage → 25%
  Currency   → ₹0.25 (or based on system)
  Fraction   → 1/4`}
        </pre>
        <p className="text-xs md:text-sm text-slate-400">
          Use the Number group under the Home tab or right-click → Format Cells.
        </p>
      </section>

      {/* BORDERS & FILL */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-sky-300">
          Borders and Fill (Background Color)
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Borders make the table structure clear; fill color highlights
          important sections.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>Add outer borders to the whole table.</li>
          <li>Use thicker border lines for header or totals.</li>
          <li>Use light fill colors; avoid very dark backgrounds with dark text.</li>
        </ul>
        <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`Good practice:
  - Header row: Bold + light fill + bottom border
  - Total row: Top border (thick) + maybe bold`}
        </pre>
      </section>

      {/* TEACHER TIP */}
      <section className="bg-slate-900/70 border border-emerald-500/60 rounded-2xl p-4 md:p-5">
        <h2 className="text-base md:text-lg font-semibold text-emerald-300 mb-2">
          Teacher&apos;s Tips 🧑‍🏫
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-xs md:text-sm text-slate-200">
          <li>Give students a raw, plain table and ask them to format it.</li>
          <li>Compare a “messy” formatting example with a clean, professional one.</li>
          <li>Explain that formatting should support understanding, not just decoration.</li>
        </ul>
      </section>
    </div>
  );
}
