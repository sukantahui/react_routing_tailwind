// Topic2.jsx
import React from "react";

export default function Topic2() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Exploring the Excel Interface
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Learn the main parts of the Excel window: ribbon, tabs, groups,
          formula bar, status bar and sheet tabs – the places you will use every
          time you open Excel.
        </p>
      </header>

      {/* MAIN PARTS */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-emerald-300">
          Main Parts of the Excel Window
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>
            <span className="font-semibold text-sky-300">Title Bar:</span> Shows
            the file name and application name.
          </li>
          <li>
            <span className="font-semibold text-sky-300">
              Quick Access Toolbar:
            </span>{" "}
            Small toolbar usually at top-left with Save, Undo, Redo etc.
          </li>
          <li>
            <span className="font-semibold text-sky-300">Ribbon:</span> The
            wide strip containing tabs like Home, Insert, Page Layout etc. Each
            tab contains groups of commands.
          </li>
          <li>
            <span className="font-semibold text-sky-300">Tabs:</span> Home,
            Insert, Page Layout, Formulas, Data, Review, View, etc.
          </li>
          <li>
            <span className="font-semibold text-sky-300">Formula Bar:</span> The
            bar where you can see and edit the contents or formula of the active
            cell.
          </li>
          <li>
            <span className="font-semibold text-sky-300">Name Box:</span> Shows
            the address of the active cell (like A1, B2).
          </li>
          <li>
            <span className="font-semibold text-sky-300">Status Bar:</span>{" "}
            Bottom strip showing information like sum, average, count, zoom
            level, page layout view, etc.
          </li>
          <li>
            <span className="font-semibold text-sky-300">Sheet Tabs:</span>{" "}
            Buttons at the bottom to switch between different sheets in the
            workbook.
          </li>
        </ul>
      </section>

      {/* HOME TAB EXAMPLE */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-amber-300">
          Example: Home Tab & Its Groups
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          The <span className="font-semibold">Home</span> tab is the most
          frequently used tab. It contains groups like:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>
            <span className="font-semibold">Clipboard:</span> Cut, Copy, Paste.
          </li>
          <li>
            <span className="font-semibold">Font:</span> Bold, Italic, Underline,
            Font size, Font color, Fill color.
          </li>
          <li>
            <span className="font-semibold">Alignment:</span> Left, center, right
            align, wrap text, merge cells.
          </li>
          <li>
            <span className="font-semibold">Number:</span> Change formatting to
            currency, percentage, date, etc.
          </li>
          <li>
            <span className="font-semibold">Editing:</span> AutoSum, Fill,
            Clear, Sort & Filter, Find & Select.
          </li>
        </ul>
      </section>

      {/* ACTIVITY */}
      <section className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6">
        <h2 className="text-lg font-semibold text-emerald-300">
          Try It Yourself – Explore & Note
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>Open Excel and create a new blank workbook.</li>
          <li>Move your mouse over each tab in the ribbon one by one.</li>
          <li>
            For each tab, note down at least 3 groups and 3 commands in a
            notebook.
          </li>
          <li>
            Click in the formula bar, type something, and see how it appears in
            the active cell.
          </li>
          <li>
            Look at the status bar at the bottom – try selecting a few cells and
            see the “Average”, “Count” or “Sum” appearing there.
          </li>
        </ol>
      </section>
    </div>
  );
}
