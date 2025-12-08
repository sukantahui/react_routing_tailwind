import React from "react";

export default function Topic1() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Entering Text, Numbers, Dates and Times Correctly
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Learn how Excel treats different types of data and how to enter them
          so that formulas and formatting work correctly.
        </p>
      </header>

      {/* TEXT VS NUMBERS */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          Text vs Numbers – How Excel Sees Them
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>
            <strong>Text (Label):</strong> letters, words, or mixtures like{" "}
            <span className="font-mono">"Rita"</span>,{" "}
            <span className="font-mono">"Class 10"</span>.
          </li>
          <li>
            <strong>Numbers (Value):</strong> values Excel can calculate with,
            such as <span className="font-mono">120</span>,{" "}
            <span className="font-mono">450.75</span>.
          </li>
          <li>
            By default, numbers align to the <strong>right</strong>, text to the{" "}
            <strong>left</strong>.
          </li>
        </ul>
      </section>

      {/* ENTERING NUMBERS */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-amber-300">
          Entering Numbers
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Type numbers without extra symbols if you want to use them in
          calculations.
        </p>
        <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`Correct for calculations:
  500
  450.75
  -120

Incorrect (treated as text):
  Rs. 500
  "450.75"
  1,20,000 (depending on system settings)`}
        </pre>
        <p className="text-xs md:text-sm text-slate-400">
          You can add currency and commas later using number formatting.
        </p>
      </section>

      {/* DATES & TIMES */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-purple-300">
          Entering Dates and Times
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Excel stores dates as serial numbers and times as fractions of a day.
          That is why you can sort and calculate with them.
        </p>

        <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="bg-slate-900 border border-sky-500/60 rounded-2xl p-4">
            <h3 className="font-semibold text-sky-300 mb-2">✅ Correct Dates</h3>
            <pre className="bg-slate-950 rounded-xl p-3 font-mono leading-relaxed overflow-x-auto">
{`Type:
  01-01-2025
  1/1/2025
  01 Jan 2025

Excel will store as:
  A date value (serial number)
  Ready for sorting and formulas.`}
            </pre>
          </div>

          <div className="bg-slate-900 border border-rose-500/60 rounded-2xl p-4">
            <h3 className="font-semibold text-rose-300 mb-2">❌ Wrong Entries</h3>
            <pre className="bg-slate-950 rounded-xl p-3 font-mono leading-relaxed overflow-x-auto">
{`"January 1st, 2025" (as long text)
"Today" (word)
"01-13-2025" (invalid if month 13)`}
            </pre>
            <p className="mt-2 text-slate-300">
              These may become text and will not work well in date formulas.
            </p>
          </div>
        </div>

        <p className="text-sm md:text-base text-slate-300">
          Times can be entered as <span className="font-mono">10:30</span>,{" "}
          <span className="font-mono">10:30 AM</span> or{" "}
          <span className="font-mono">22:15</span> (24-hour format).
        </p>
      </section>

      {/* EXAMPLES TABLE */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-sky-300">
          Quick Example – Mixed Data Entry
        </h2>
        <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`A           B         C         D
-----------------------------------------
Date        Name      Hours     Amount
01-01-25    Rita      4.5       500
02-01-25    Rahul     3         300
02-01-25    Sneha     5.25      650`}
        </pre>
        <p className="text-xs md:text-sm text-slate-400">
          Here, Date = date, Name = text, Hours and Amount = numbers.
        </p>
      </section>

      {/* TEACHER TIP */}
      <section className="bg-slate-900/70 border border-emerald-500/60 rounded-2xl p-4 md:p-5">
        <h2 className="text-base md:text-lg font-semibold text-emerald-300 mb-2">
          Teacher&apos;s Tips 🧑‍🏫
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-xs md:text-sm text-slate-200">
          <li>
            Ask students to type a set of dates and then change the date format
            from Short Date to Long Date.
          </li>
          <li>
            Mix correct and incorrect entries and ask them to identify which
            ones Excel recognizes as dates or numbers.
          </li>
          <li>
            Show how sorting fails when some dates are stored as text.
          </li>
        </ul>
      </section>
    </div>
  );
}
