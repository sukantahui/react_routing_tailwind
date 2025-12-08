import React from "react";

export default function Topic5() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Adjusting Column Width, Row Height and Wrap Text
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Learn how to fit your text properly inside cells by changing column
          width, row height and using Wrap Text.
        </p>
      </header>

      {/* COLUMN WIDTH */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          Adjusting Column Width
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>Drag the boundary between column letters to resize.</li>
          <li>
            Double-click the boundary to <strong>AutoFit</strong> based on the
            longest entry.
          </li>
          <li>
            Home → Cells group → Format → Column Width to set an exact value.
          </li>
        </ul>
        <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`Example:
If text "Product Name" is cut off, drag the boundary between column A and B
to make column A wider, or double-click to AutoFit.`}
        </pre>
      </section>

      {/* ROW HEIGHT */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-amber-300">
          Adjusting Row Height
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Row height can be increased for readability or to fit wrapped text.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>Drag the boundary between row numbers to change height.</li>
          <li>
            Double-click row boundary to AutoFit to the tallest cell in that row.
          </li>
          <li>
            Home → Cells → Format → Row Height to set a specific height.
          </li>
        </ul>
      </section>

      {/* WRAP TEXT DIAGRAM */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-purple-300">
          Wrap Text – Show All Text Inside the Cell
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Wrap Text allows long text to display in multiple lines within the
          same cell instead of overflowing into the next column.
        </p>
        <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`Without Wrap Text:
| A                          | B    |
-------------------------------------
| Product name is very long  | 1200 |
(text may overflow into column B)

With Wrap Text:
| A                          | B    |
-------------------------------------
| Product name is very       | 1200 |
| long                       |      |`}
        </pre>
        <p className="text-xs md:text-sm text-slate-400">
          Use Home → Alignment → Wrap Text.
        </p>
      </section>

      {/* TEACHER TIP */}
      <section className="bg-slate-900/70 border border-emerald-500/60 rounded-2xl p-4 md:p-5">
        <h2 className="text-base md:text-lg font-semibold text-emerald-300 mb-2">
          Teacher&apos;s Tips 🧑‍🏫
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-xs md:text-sm text-slate-200">
          <li>
            Provide a table where some values are hidden because columns are too
            narrow; ask students to AutoFit all.
          </li>
          <li>
            Ask students to decide when Wrap Text is better versus increasing
            column width.
          </li>
          <li>
            Demonstrate printing with and without proper column width – students
            see how layout affects printouts.
          </li>
        </ul>
      </section>
    </div>
  );
}
