import React from "react";

export default function Topic4() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Format Painter and Cell Styles for Quick Formatting
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Learn how to quickly copy formatting from one cell to another using
          Format Painter and how to use built-in cell styles.
        </p>
      </header>

      {/* FORMAT PAINTER */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          Format Painter – Copy the Look
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Format Painter copies formatting (font, color, borders, etc.) from one
          cell or range and applies it to another. It does not change the data.
        </p>

        <ol className="list-decimal pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>Select the cell or range with the formatting you want.</li>
          <li>Click <strong>Format Painter</strong> (Home tab → Clipboard group).</li>
          <li>Click on the cell or drag over the range where you want formatting.</li>
        </ol>

        <p className="text-xs md:text-sm text-slate-400">
          Double-click Format Painter to apply formatting to multiple places
          until you press Esc.
        </p>
      </section>

      {/* DIAGRAM – BEFORE/AFTER */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-amber-300">
          Example – Before and After Format Painter
        </h2>
        <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`Before:
A            B
-----------------------------
Sales        5000   (Bold, Blue, Yellow fill)
Profit       1200   (Normal, no color)

After using Format Painter from A1:B1 to A2:B2:
A            B
-----------------------------
Sales        5000   (Bold, Blue, Yellow fill)
Profit       1200   (Bold, Blue, Yellow fill)`}
        </pre>
      </section>

      {/* CELL STYLES */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-purple-300">
          Cell Styles – Ready-Made Formatting
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Cell Styles are predefined formatting sets that you can apply quickly
          to headings, titles, totals and more.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>Home tab → Styles group → Cell Styles.</li>
          <li>Choose styles like <strong>Heading 1</strong>, <strong>Title</strong>, <strong>Total</strong>, etc.</li>
          <li>Helps maintain a consistent look across the sheet.</li>
        </ul>
      </section>

      {/* TEACHER TIP */}
      <section className="bg-slate-900/70 border border-emerald-500/60 rounded-2xl p-4 md:p-5">
        <h2 className="text-base md:text-lg font-semibold text-emerald-300 mb-2">
          Teacher&apos;s Tips 🧑‍🏫
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-xs md:text-sm text-slate-200">
          <li>
            Give one nicely formatted header row and ask students to use Format
            Painter to format all other header rows.
          </li>
          <li>
            Show how Cell Styles can standardize headings for multiple sheets in
            a workbook.
          </li>
          <li>
            Explain that using styles also helps if design needs to be changed
            later – fewer manual changes.
          </li>
        </ul>
      </section>
    </div>
  );
}
