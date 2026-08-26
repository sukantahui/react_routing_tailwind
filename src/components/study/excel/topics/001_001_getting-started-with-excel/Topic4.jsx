// Topic4.jsx
import React from "react";

export default function Topic4() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
          Creating, Saving and Opening Workbooks
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Learn how to create a new Excel file, save it in different formats,
          and reopen saved files confidently.
        </p>
      </header>

      {/* CREATING */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          Creating a New Workbook
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>Open Excel from Start Menu or Desktop.</li>
          <li>Select <strong>Blank workbook</strong>.</li>
          <li>A new workbook opens with a default name like Book1.</li>
        </ol>
      </section>

      {/* SAVING */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-300">
          Saving Your Workbook
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          You should save your work frequently to avoid data loss.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>
            Press <strong>Ctrl + S</strong> to save quickly.
          </li>
          <li>
            Use <strong>File → Save As</strong> to choose folder, file name and
            file type.
          </li>
          <li>
            Give a meaningful name like{" "}
            <span className="font-mono">StudentMarks2025.xlsx</span>.
          </li>
        </ul>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-sky-300">
              <tr>
                <th className="p-2 border border-slate-800 text-left">
                  File Type
                </th>
                <th className="p-2 border border-slate-800 text-left">
                  Extension
                </th>
                <th className="p-2 border border-slate-800 text-left">Use</th>
              </tr>
            </thead>
            <tbody className="bg-slate-950/60">
              <tr>
                <td className="p-2 border border-slate-800">Excel Workbook</td>
                <td className="p-2 border border-slate-800">.xlsx</td>
                <td className="p-2 border border-slate-800">
                  Default format for most work.
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800">Excel 97–2003</td>
                <td className="p-2 border border-slate-800">.xls</td>
                <td className="p-2 border border-slate-800">
                  For compatibility with very old Excel versions.
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800">
                  CSV (Comma Delimited)
                </td>
                <td className="p-2 border border-slate-800">.csv</td>
                <td className="p-2 border border-slate-800">
                  For data import/export with other software.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* OPENING */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-purple-300">
          Opening an Existing Workbook
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>Open Excel.</li>
          <li>Click <strong>File → Open</strong>.</li>
          <li>
            Choose <strong>Browse</strong> and locate the folder where you saved
            the file.
          </li>
          <li>Select the file and click <strong>Open</strong>.</li>
        </ol>
      </section>

      {/* PRACTICE */}
      <section className="space-y-3 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6">
        <h2 className="text-lg font-semibold text-emerald-300">
          Try It Yourself – Save Different Versions
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-sm md:text-base text-slate-300">
          <li>Create a small student mark sheet.</li>
          <li>Save it as <strong>Marks.xlsx</strong>.</li>
          <li>
            Use <strong>Save As</strong> and save another copy as{" "}
            <strong>Marks_Old.xls</strong>.
          </li>
          <li>
            Again use <strong>Save As</strong> and save as{" "}
            <strong>Marks.csv</strong>.
          </li>
          <li>Close Excel and reopen each file to see the difference.</li>
        </ol>
      </section>
    </div>
  );
}
