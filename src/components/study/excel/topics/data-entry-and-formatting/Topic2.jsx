import React from "react";

export default function Topic2() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Copy, Cut, Paste, AutoFill and Flash Fill Basics
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Learn the most frequently used editing commands in Excel and how
          AutoFill and Flash Fill can save time.
        </p>
      </header>

      {/* COPY/CUT/PASTE */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          Copy, Cut and Paste – Keyboard and Mouse
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>
            <strong>Copy:</strong> <span className="font-mono">Ctrl + C</span>{" "}
            (leaves original data).
          </li>
          <li>
            <strong>Cut:</strong> <span className="font-mono">Ctrl + X</span>{" "}
            (moves data).
          </li>
          <li>
            <strong>Paste:</strong>{" "}
            <span className="font-mono">Ctrl + V</span>.
          </li>
          <li>
            Right-click menu: Copy, Cut, Paste also available via mouse.
          </li>
        </ul>
      </section>

      {/* AUTOFILL DIAGRAM */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-amber-300">
          AutoFill – Drag the Fill Handle
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          AutoFill copies values or extends patterns when you drag the small
          square at the bottom-right corner of a selected cell or range.
        </p>

        <pre className="bg-slate-950 rounded-xl p-3 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`Example 1 – Series of Numbers
A
---------
1
2
3
(Select A1:A3, drag the fill handle down to continue 4,5,6,...)

Example 2 – Days of Week
A
---------
Mon
Tue
Wed
(Drag fill handle down to fill Thu, Fri, Sat, ...)`}
        </pre>

        <p className="text-xs md:text-sm text-slate-400">
          AutoFill can automatically continue numbers, dates, days, months, and
          even some custom lists.
        </p>
      </section>

      {/* FLASH FILL */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-purple-300">
          Flash Fill – Smart Pattern Recognition
        </h2>
        <p className="text-sm md:text-base text-slate-300">
          Flash Fill looks at examples you type and automatically fills the rest
          of the column following the same pattern. It is available from Excel
          2013 onwards (Data tab → Flash Fill).
        </p>

        <div className="grid md:grid-cols-2 gap-4 text-xs md:text-sm">
          <div className="bg-slate-900 border border-sky-500/60 rounded-2xl p-4">
            <h3 className="font-semibold text-sky-300 mb-2">
              Example – Split Full Name
            </h3>
            <pre className="bg-slate-950 rounded-xl p-3 font-mono leading-relaxed overflow-x-auto">
{`A              B         C
----------------------------------
Full Name      First     Last
Rita Das       Rita
Sourav Dey     Sourav
(Select C2, type 'Das', then use Flash Fill)`}
            </pre>
          </div>

          <div className="bg-slate-900 border border-emerald-500/60 rounded-2xl p-4">
            <h3 className="font-semibold text-emerald-300 mb-2">
              Example – Extract Year from Date
            </h3>
            <pre className="bg-slate-950 rounded-xl p-3 font-mono leading-relaxed overflow-x-auto">
{`A             B
-------------------------
Date          Year
01-01-2025    2025
05-03-2024    (type 2024 and apply Flash Fill)`}
            </pre>
          </div>
        </div>
      </section>

      {/* TEACHER TIP */}
      <section className="bg-slate-900/70 border border-emerald-500/60 rounded-2xl p-4 md:p-5">
        <h2 className="text-base md:text-lg font-semibold text-emerald-300 mb-2">
          Teacher&apos;s Tips 🧑‍🏫
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-xs md:text-sm text-slate-200">
          <li>
            Demonstrate the difference between copying a single value and using
            AutoFill to continue a series.
          </li>
          <li>
            Ask students to use Flash Fill to separate first name and last name,
            and then to join them back with a space.
          </li>
          <li>
            Show how mistakes appear when the pattern is not clearly defined for
            Flash Fill.
          </li>
        </ul>
      </section>
    </div>
  );
}
