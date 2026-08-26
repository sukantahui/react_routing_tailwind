import React from "react";

export default function Topic6() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Basic Conditional Formatting using Built-in Rules
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Learn how to quickly highlight important values using built-in
          conditional formatting rules.
        </p>
      </header>

      {/* INTRO */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          What is Conditional Formatting?
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Conditional Formatting changes the appearance of cells automatically
          based on their values. It helps you see patterns and outliers at a
          glance.
        </p>
        <p className="text-sm md:text-base text-slate-300">
          Home → Styles group → Conditional Formatting.
        </p>
      </section>

      {/* EXAMPLE: HIGHLIGHT > 50 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-amber-300">
          Example – Highlight Marks Above 50
        </h2>
        <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`A        B
-------------------
Name     Marks
Rita     65
Rahul    45
Sneha    82`}
        </pre>
        <ol className="list-decimal pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>Select cells <span className="font-mono">B2:B4</span>.</li>
          <li>
            Click <strong>Conditional Formatting → Highlight Cells Rules → Greater Than...</strong>
          </li>
          <li>Enter <span className="font-mono">50</span> and choose a light fill color.</li>
          <li>Click OK. Marks more than 50 will be highlighted.</li>
        </ol>
      </section>

      {/* BUILT-IN RULE TYPES */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-purple-300">
          Common Built-in Conditional Formatting Rules
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>
            <strong>Highlight Cells Rules:</strong> Greater Than, Less Than, Between,
            Equal To, Text that Contains, A Date Occurring, Duplicate Values.
          </li>
          <li>
            <strong>Top/Bottom Rules:</strong> Top 10 Items, Top 10%, Bottom 10, Above
            Average, Below Average.
          </li>
          <li>
            <strong>Data Bars, Color Scales, Icon Sets:</strong> Show visual scales inside
            cells based on value.
          </li>
        </ul>
      </section>

      {/* SIMPLE ICON SET DIAGRAM */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-sky-300">
          Visual Example – Icon Set
        </h2>
        <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`Marks     Icon
-------------------------
90         ✅ (Green)
60         ⚠️ (Yellow)
30         ⛔ (Red)

(Automatically assigned by Conditional Formatting → Icon Sets)`}
        </pre>
      </section>

      {/* TEACHER TIP */}
      <section className="bg-slate-900/70 border border-emerald-500/60 rounded-2xl p-4 md:p-5">
        <h2 className="text-base md:text-lg font-semibold text-emerald-300 mb-2">
          Teacher&apos;s Tips 🧑‍🏫
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-xs md:text-sm text-slate-200">
          <li>
            Give a marksheet and ask students to highlight failing marks below a
            certain pass mark.
          </li>
          <li>
            Show how conditional formatting changes automatically when values are
            edited.
          </li>
          <li>
            Warn students not to apply too many different rules – keep it simple
            and meaningful.
          </li>
        </ul>
      </section>
    </div>
  );
}
