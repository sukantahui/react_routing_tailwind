import React, { Component } from "react";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-10 text-slate-200">

        {/* HEADER */}
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Excel Data Management · Sorting Essentials
          </p>

          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Sorting Data on One or Multiple Columns
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-slate-300">
            Sorting helps you arrange information in a meaningful order —  
            alphabetically, numerically, or chronologically.  
            Excel supports **single-column sort** and **multi-column sort**
            (also known as **Custom Sort**), which is crucial for managing
            large datasets.
          </p>
        </header>

        {/* SECTION 1 — WHY SORTING MATTERS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            Why Sorting Matters
          </h2>

          <ul className="list-disc ml-6 space-y-1 text-slate-300 text-sm">
            <li>Easier to analyse student marks or sales data</li>
            <li>Find top or bottom performers quickly</li>
            <li>Arrange dates chronologically for trend analysis</li>
            <li>Prepare data for charts, pivot tables & reports</li>
          </ul>
        </section>

        {/* SAMPLE DATA */}
        <section>
          <h2 className="text-lg font-semibold text-sky-400 mb-2">
            Sample Data
          </h2>

          <pre className="bg-slate-900 p-3 rounded-xl text-sm">
{`Name      Class     Marks
Ritaja     X-A       87
Mounita    X-B       76
Swadeep    X-A       92
Devangshu  X-C       65`}
          </pre>
        </section>

        {/* SECTION 2 — SINGLE-COLUMN SORT */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-300">
            1. Sorting on a Single Column
          </h2>

          <p className="text-sm text-slate-300">
            You can sort names alphabetically, marks from high to low, or
            classes in order.
          </p>

          {/* SVG — Single Column Sort */}
          <div className="rounded-2xl border border-emerald-700 bg-emerald-950/20 p-4 flex justify-center">
            <svg viewBox="0 0 320 160" className="w-full max-w-lg">

              {/* Table Outline */}
              <rect x="10" y="10" width="300" height="140" rx="12"
                className="fill-slate-900 stroke-emerald-600" />

              {/* Headers */}
              <rect x="20" y="20" width="90" height="20" rx="4"
                className="fill-emerald-900/60" />
              <rect x="115" y="20" width="90" height="20" rx="4"
                className="fill-emerald-900/40" />
              <rect x="210" y="20" width="90" height="20" rx="4"
                className="fill-emerald-900/60" />

              <text x="65" y="35" textAnchor="middle" className="fill-emerald-200 text-[10px]">Name ▾</text>
              <text x="160" y="35" textAnchor="middle" className="fill-emerald-200 text-[10px]">Class</text>
              <text x="255" y="35" textAnchor="middle" className="fill-emerald-200 text-[10px]">Marks</text>

              {/* Rows */}
              {[0, 1, 2, 3].map(i => (
                <rect key={i}
                  x="20"
                  y={50 + i * 22}
                  width="280"
                  height="18"
                  rx="4"
                  className={(i % 2 === 0)
                    ? "fill-slate-900 stroke-slate-700"
                    : "fill-slate-800/60 stroke-slate-700"}
                />
              ))}

              {/* Sort Arrow */}
              <polygon points="95,26 100,34 90,34"
                className="fill-emerald-300" />

              <text x="160" y="145" textAnchor="middle"
                className="fill-emerald-300 text-[10px]">
                Sorting by Name → Alphabetical Order
              </text>

            </svg>
          </div>

          {/* Teacher Tip */}
          <div className="rounded-xl bg-emerald-900/30 border border-emerald-700 p-4">
            <h3 className="font-semibold text-emerald-300">Teacher’s Tip</h3>
            <p className="text-sm">
              Encourage students to sort by multiple columns only after ensuring
              all data rows are complete — empty cells can shift incorrectly.
            </p>
          </div>
        </section>

        {/* SECTION 3 — MULTI-COLUMN SORT */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300">
            2. Sorting on Multiple Columns (Custom Sort)
          </h2>

          <p className="text-sm text-slate-300">
            Multi-column sorting lets you arrange data using more than one rule.
            Example:
          </p>

          <ul className="ml-6 list-disc text-sm text-slate-300 space-y-1">
            <li>Sort by <strong>Class</strong> (A → C)</li>
            <li>Then sort by <strong>Marks</strong> (High → Low)</li>
          </ul>

          {/* SVG — Multi Column Sort */}
          <div className="rounded-2xl border border-purple-700 bg-purple-950/20 p-4 flex justify-center">
            <svg viewBox="0 0 350 180" className="w-full max-w-lg">

              {/* Table Container */}
              <rect x="15" y="10" width="320" height="160" rx="12"
                className="fill-slate-900 stroke-purple-600" />

              {/* Headers */}
              <rect x="25" y="20" width="90" height="20" rx="4"
                className="fill-purple-900/50" />
              <rect x="120" y="20" width="90" height="20" rx="4"
                className="fill-purple-900/70" />
              <rect x="215" y="20" width="90" height="20" rx="4"
                className="fill-purple-900/50" />

              <text x="70" y="35" textAnchor="middle" className="fill-purple-200 text-[11px]">Name</text>
              <text x="165" y="35" textAnchor="middle" className="fill-purple-200 text-[11px]">
                Class ▾
              </text>
              <text x="260" y="35" textAnchor="middle" className="fill-purple-200 text-[11px]">
                Marks ▾
              </text>

              {/* Rows */}
              {[0, 1, 2, 3].map(i => (
                <rect key={i}
                  x="25"
                  y={55 + i * 25}
                  width="280"
                  height="20"
                  rx="4"
                  className={(i % 2 === 0)
                    ? "fill-slate-900 stroke-slate-700"
                    : "fill-slate-800/60 stroke-slate-700"}
                />
              ))}

              {/* Arrow indicators */}
              <polygon points="200,26 205,34 195,34" className="fill-purple-300" />
              <polygon points="295,26 300,34 290,34" className="fill-purple-300" />

              <text x="175" y="155" textAnchor="middle"
                className="fill-purple-300 text-[10px]">
                First Sort: Class → A → C  
              </text>

              <text x="175" y="168" textAnchor="middle"
                className="fill-purple-300 text-[10px]">
                Second Sort: Marks → Largest to Smallest
              </text>

            </svg>
          </div>

          {/* Teacher Tip */}
          <div className="rounded-xl bg-purple-900/30 border border-purple-700 p-4">
            <h3 className="font-semibold text-purple-300">Teacher’s Tip</h3>
            <p className="text-sm">
              Always check “My data has headers” in the Custom Sort window.
              Otherwise Excel may include the header row in sorting — a common mistake.
            </p>
          </div>
        </section>

        {/* COMMON MISTAKES */}
        <section className="space-y-2">
          <h2 className="text-xl font-semibold text-rose-300">
            Common Sorting Mistakes Students Make
          </h2>

          <div className="rounded-2xl bg-rose-950/20 border border-rose-700 p-4">
            <ul className="list-disc ml-6 text-sm space-y-1 text-rose-200">
              <li>Sorting only one column instead of the full dataset</li>
              <li>Leaving blank rows between data blocks</li>
              <li>Sorting text numbers (e.g., "100") instead of numeric values</li>
              <li>Unsorted data causing charts to appear incorrect</li>
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
            <li>Sorting rearranges data for better readability & analysis.</li>
            <li>Single-column sort is ideal for simple arrangement.</li>
            <li>Multi-column sort arranges data using several rules.</li>
            <li>Sorting affects charts, dashboards & further analysis.</li>
          </ul>
        </section>

      </div>
    );
  }
}
