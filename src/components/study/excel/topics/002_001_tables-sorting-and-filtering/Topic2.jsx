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
            Excel supports both **single-column sorting** and  
            **multi-column sorting (Custom Sort)** which is essential for
            managing structured data.
          </p>
        </header>

        {/* WHY SORTING MATTERS */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-300">
            Why Sorting Matters
          </h2>

          <ul className="list-disc ml-6 space-y-1 text-slate-300 text-sm">
            <li>Helps identify highest/lowest values quickly</li>
            <li>Organises large datasets for easy reading</li>
            <li>Prepares data for reports, dashboards and charts</li>
            <li>Enables grouped analysis (e.g., Class → Marks)</li>
          </ul>
        </section>

        {/* SAMPLE DATA */}
        <section>
          <h2 className="text-lg font-semibold text-sky-400 mb-2">
            Sample Dataset
          </h2>

          <pre className="bg-slate-900 p-3 rounded-xl text-sm">
{`Name       Class     Marks
Ritaja      X-A       87
Mounita     X-B       76
Swadeep     X-A       92
Devangshu   X-C       65`}
          </pre>
        </section>

        {/* SINGLE COLUMN SORT */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-emerald-300">
            1. Sorting by One Column
          </h2>

          <p className="text-sm text-slate-300">
            Sorting a single column is useful when arranging:
            <br />✔ Names alphabetically  
            ✔ Marks from highest → lowest  
            ✔ Dates from oldest → newest  
          </p>

          {/* SVG – Single Column Sort */}
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
              <polygon points="95,26 100,34 90,34" className="fill-emerald-300" />

              <text x="160" y="145" textAnchor="middle"
                className="fill-emerald-300 text-[10px]">
                Sorting by Name → Alphabetical
              </text>
            </svg>
          </div>

          {/* Teacher Tip */}
          <div className="rounded-xl bg-emerald-900/30 border border-emerald-700 p-4">
            <h3 className="font-semibold text-emerald-300">Teacher’s Tip</h3>
            <p className="text-sm">
              Always select the entire dataset before sorting — otherwise only
              one column moves, causing mismatched data.
            </p>
          </div>
        </section>

        {/* MULTI-COLUMN SORT */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-purple-300">
            2. Sorting by Multiple Columns (Custom Sort)
          </h2>

          <p className="text-sm text-slate-300">
            Multi-column sorting is useful when you need data arranged by more
            than one rule.  
            Example:
          </p>

          <ul className="ml-6 list-disc text-sm text-slate-300 space-y-1">
            <li>Sort by <strong>Class</strong> (A → C)</li>
            <li>Then by <strong>Marks</strong> (Largest → Smallest)</li>
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

              <text x="70" y="35" textAnchor="middle" className="fill-purple-200 text-[11px]">
                Name
              </text>
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

              {/* Sort Indicators */}
              <polygon points="200,26 205,34 195,34" className="fill-purple-300" />
              <polygon points="295,26 300,34 290,34" className="fill-purple-300" />

              <text x="175" y="155" textAnchor="middle"
                className="fill-purple-300 text-[10px]">
                1st Sort → Class (A → C)
              </text>

              <text x="175" y="170" textAnchor="middle"
                className="fill-purple-300 text-[10px]">
                2nd Sort → Marks (High → Low)
              </text>
            </svg>
          </div>

          {/* Teacher Tip */}
          <div className="rounded-xl bg-purple-900/30 border border-purple-700 p-4">
            <h3 className="font-semibold text-purple-300">Teacher’s Tip</h3>
            <p className="text-sm">
              When using “Custom Sort”, always check  
              <strong>“My data has headers”</strong> to avoid sorting the header row accidentally.
            </p>
          </div>
        </section>

        {/* MISTAKES */}
        <section>
          <h2 className="text-xl font-semibold text-rose-300">
            Common Mistakes Students Make
          </h2>

          <div className="rounded-2xl bg-rose-950/20 border border-rose-700 p-4 mt-2">
            <ul className="list-disc ml-6 text-sm space-y-1 text-rose-200">
              <li>Sorting only one column instead of the whole table</li>
              <li>Leaving blank rows inside the dataset</li>
              <li>Sorting numbers stored as text</li>
              <li>Not understanding secondary sort priorities</li>
            </ul>
          </div>
        </section>

        {/* SUMMARY */}
        <section className="rounded-2xl bg-sky-950/20 border border-sky-700 p-4">
          <h2 className="text-lg font-semibold text-sky-200 flex items-center gap-2">
            📘 Summary
          </h2>

          <ul className="text-sm list-disc ml-6 space-y-1 text-slate-300 mt-2">
            <li>Sorting rearranges data to improve readability.</li>
            <li>Use single-column sort for simple organisation.</li>
            <li>Use multi-column sort for structured datasets.</li>
            <li>Sorting affects charts, dashboards and future analysis.</li>
          </ul>
        </section>

      </div>
    );
  }
}
