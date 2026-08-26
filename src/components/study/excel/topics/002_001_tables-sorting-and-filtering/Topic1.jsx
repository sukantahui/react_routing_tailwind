import React, { Component } from "react";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-10 text-slate-200">
        
        {/* HEADER */}
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Excel Essentials · Smart Tables
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Benefits of Excel Tables: Structured References, Auto-Expansion & Built-in Filters
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-slate-300">
            Excel Tables convert raw data into an intelligent, dynamic structure
            that far exceeds the capabilities of a normal cell range.  
            They provide **readable formulas**, **automatic updates**, **filters**,  
            and **a clean visual design** for analysis.
          </p>
        </header>

        {/* SECTION 1 – STRUCTURED REFERENCES */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            1. Structured References — Human-Readable Formulas
          </h2>

          <p className="text-sm text-slate-300">
            Instead of traditional cell addresses (<code>A2</code>, <code>B3</code>),  
            Excel Tables use **column names** inside formulas.
          </p>

          <div className="rounded-2xl border border-sky-700 bg-slate-900/70 p-4 grid md:grid-cols-2 gap-6">

            {/* BEFORE – normal reference */}
            <div>
              <h3 className="font-semibold text-rose-300 mb-2">Before (Normal Range)</h3>
              <pre className="bg-slate-950 p-3 rounded-xl text-[13px] text-slate-200">
{`=B2 * 0.10`}
              </pre>

              <p className="text-xs text-rose-300 mt-1">
                Hard to understand later — what is in B2?
              </p>

              {/* SVG – plain cell formula */}
              <svg viewBox="0 0 240 100" className="mt-4 w-full">
                <rect x="5" y="5" width="230" height="90" rx="10" className="fill-slate-900 stroke-slate-700" />

                {/* Cell highlight */}
                <rect x="30" y="40" width="40" height="20" rx="4" className="fill-rose-800/40 stroke-rose-400" />
                <text x="50" y="54" textAnchor="middle" className="fill-rose-300 text-[10px]">B2</text>

                {/* Formula box */}
                <text x="120" y="30" textAnchor="middle" className="fill-slate-300 text-[10px]">
                  Formula uses cell address → =B2*10%
                </text>
              </svg>
            </div>

            {/* AFTER – structured reference */}
            <div>
              <h3 className="font-semibold text-emerald-300 mb-2">After (Excel Table)</h3>

              <pre className="bg-slate-950 p-3 rounded-xl text-[13px] text-emerald-300">
{`=[@Sales] * 0.10`}
              </pre>

              <p className="text-xs text-emerald-400 mt-1">
                Much clearer — easy for teachers, students, and colleagues.
              </p>

              {/* SVG – structured reference */}
              <svg viewBox="0 0 240 100" className="mt-4 w-full">
                <rect x="5" y="5" width="230" height="90" rx="10" className="fill-slate-900 stroke-emerald-600" />

                {/* Header */}
                <rect x="30" y="25" width="180" height="18" rx="4" className="fill-emerald-900/60 stroke-emerald-500" />
                <text x="120" y="38" textAnchor="middle" className="fill-emerald-200 text-[10px]">
                  Sales ▾
                </text>

                {/* Structured reference text */}
                <text x="120" y="70" textAnchor="middle" className="fill-emerald-300 text-[10px]">
                  Formula refers to column name → [@Sales]
                </text>
              </svg>
            </div>

          </div>

          {/* Teacher Tip */}
          <div className="rounded-xl bg-sky-900/30 border border-sky-700 p-4">
            <h3 className="font-semibold text-sky-300">Teacher’s Tip</h3>
            <p className="text-sm text-slate-300">
              Encourage students to explain structured reference formulas verbally —  
              it improves understanding and helps in exam writing.
            </p>
          </div>
        </section>

        {/* SECTION 2 – AUTO EXPANSION */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-300">
            2. Auto-Expansion — Tables Grow Automatically
          </h2>

          <p className="text-sm">
            One of the most powerful features:  
            **Type anything directly below or beside the table, and Excel expands it automatically.**
          </p>

          <div className="rounded-2xl border border-emerald-700 bg-emerald-950/20 p-4">
            <svg viewBox="0 0 310 150" className="w-full max-w-md mx-auto">

              {/* Table region */}
              <rect x="20" y="20" width="270" height="90" rx="10" className="fill-slate-900 stroke-emerald-600" />

              {/* Headers */}
              <rect x="30" y="30" width="120" height="20" rx="4" className="fill-emerald-900/70" />
              <rect x="160" y="30" width="120" height="20" rx="4" className="fill-emerald-900/70" />
              <text x="90" y="44" textAnchor="middle" className="fill-sky-300 text-[10px]">Product ▾</text>
              <text x="220" y="44" textAnchor="middle" className="fill-sky-300 text-[10px]">Sales ▾</text>

              {/* Existing rows */}
              {[0, 1].map(i => (
                <g key={i}>
                  <rect
                    x="30"
                    y={60 + i * 20}
                    width="250"
                    height="18"
                    rx="4"
                    className={i % 2 === 0 ? "fill-slate-900 stroke-slate-700" : "fill-slate-800/70 stroke-slate-700"}
                  />
                </g>
              ))}

              {/* New row highlight */}
              <rect x="30" y="100" width="250" height="18" rx="4" className="fill-emerald-800/40 stroke-emerald-500" />
              <text x="155" y="112" textAnchor="middle" className="fill-emerald-300 text-[9px]">
                New data typed → Table expands
              </text>

              {/* Arrow */}
              <path d="M155 120 L155 135" stroke="#22c55e" strokeWidth="2" />
              <path d="M150 132 L155 138 L160 132" stroke="#22c55e" strokeWidth="2" fill="none" />

            </svg>

            <p className="text-xs text-emerald-300 mt-3">
              Charts, structured formulas, and PivotTables refresh automatically when the table expands.
            </p>
          </div>

          {/* Teacher Tip */}
          <div className="rounded-xl bg-emerald-900/30 border border-emerald-700 p-4">
            <h3 className="font-semibold text-emerald-300">Teacher’s Tip</h3>
            <p className="text-sm">
              Ask students to add a new row and observe how formulas fill down automatically —
              this builds confidence in understanding dynamic lists.
            </p>
          </div>
        </section>

        {/* SECTION 3 – BUILT-IN FILTERS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-amber-300">
            3. Built-in Filters for Faster Sorting & Searching
          </h2>

          <p className="text-sm text-slate-300">
            Every Excel Table header comes with a small filter drop-down.  
            It enables quick sorting, searching, and filtering by conditions.
          </p>

          <div className="rounded-2xl border border-amber-700 bg-amber-950/20 p-4">
            <svg viewBox="0 0 300 120" className="w-full max-w-md mx-auto">

              {/* Header row */}
              <rect
                x="20"
                y="20"
                width="260"
                height="25"
                rx="5"
                className="fill-amber-900/40 stroke-amber-500"
              />

              {/* Column headers */}
              <text x="90" y="37" textAnchor="middle" className="fill-amber-200 text-[10px]">
                Product ▾
              </text>
              <text x="210" y="37" textAnchor="middle" className="fill-amber-200 text-[10px]">
                Sales ▾
              </text>

              {/* Drop-down symbol */}
              <polygon points="225,30 230,38 220,38" className="fill-amber-400" />

              {/* Rows */}
              {[0,1].map(i => (
                <g key={i}>
                  <rect
                    x="20"
                    y={50 + i*20}
                    width="260"
                    height="18"
                    rx="4"
                    className="fill-slate-900 stroke-slate-700"
                  />
                </g>
              ))}

              {/* Caption */}
              <text x="150" y="105" textAnchor="middle" className="fill-amber-300 text-[9px]">
                Built-in filter drop-downs for fast sorting & searching
              </text>

            </svg>

            <ul className="list-disc ml-6 text-xs text-slate-300 mt-3 space-y-1">
              <li>Sort A→Z or Z→A</li>
              <li>Filter numbers by &gt;, &lt;, = conditions</li>
              <li>Filter dates by months, years or periods</li>
              <li>Filter text by begins with / contains</li>
            </ul>
          </div>

          {/* Teacher Tip */}
          <div className="rounded-xl bg-amber-900/30 border border-amber-700 p-4">
            <h3 className="font-semibold text-amber-300">Teacher’s Tip</h3>
            <p className="text-sm">
              Show students how filtering respects the Total Row because Excel
              uses SUBTOTAL — a trick that impresses beginners!
            </p>
          </div>
        </section>

        {/* COMMON MISTAKES */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-rose-300">
            Common Mistakes When Using Table Features
          </h2>

          <div className="rounded-2xl bg-rose-950/20 border border-rose-700 p-4">
            <ul className="list-disc ml-6 text-sm space-y-1 text-rose-200">
              <li>Manually formatting cells instead of converting to a Table</li>
              <li>Forgetting to use structured references after conversion</li>
              <li>Not naming the Table — using the default <code>Table1</code></li>
              <li>Mixing text & numbers in the same column (breaks sorting)</li>
            </ul>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="rounded-2xl bg-sky-950/20 border border-sky-700 p-4">
          <h2 className="text-lg font-semibold text-sky-200 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20">📘</span>
            Summary
          </h2>

          <ul className="text-sm list-disc ml-6 space-y-1 text-slate-300 mt-2">
            <li>Tables make formulas readable using structured references.</li>
            <li>Rows & columns expand automatically, keeping formulas stable.</li>
            <li>Built-in filters make sorting & searching effortless.</li>
            <li>Tables update charts, pivot tables & formulas automatically.</li>
          </ul>
        </section>
      </div>
    );
  }
}
