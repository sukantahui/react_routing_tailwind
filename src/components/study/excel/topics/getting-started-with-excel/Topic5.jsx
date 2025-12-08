// Topic5.jsx
import React from "react";

export default function Topic5() {
  return (
    <div className="space-y-8 text-slate-100">
      <header className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
        Basic Navigation in Excel
        </h1>
        <p className="text-sm md:text-base text-slate-400 mt-2">
          Learn how to move around efficiently using mouse, keyboard shortcuts,
          Name Box and the Go To feature.
        </p>
      </header>

      {/* MOUSE */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-emerald-300">
          Navigating with Mouse
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-sm md:text-base text-slate-300">
          <li>Single-click a cell to make it active.</li>
          <li>Drag the mouse to select a range of cells.</li>
          <li>Use the scrollbars to move up–down and left–right.</li>
          <li>Click on sheet tabs to change sheets.</li>
        </ul>
      </section>

      {/* KEYBOARD */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-amber-300">
          Keyboard Navigation – Important Shortcuts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-sky-300">
              <tr>
                <th className="p-2 border border-slate-800 text-left">
                  Shortcut
                </th>
                <th className="p-2 border border-slate-800 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-950/60">
              <tr>
                <td className="p-2 border border-slate-800 font-mono">Arrow Keys</td>
                <td className="p-2 border border-slate-800">
                  Move one cell up, down, left, right.
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800 font-mono">Ctrl + Arrow</td>
                <td className="p-2 border border-slate-800">
                  Jump to edge of data region.
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800 font-mono">Tab</td>
                <td className="p-2 border border-slate-800">Move one cell to the right.</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800 font-mono">Shift + Tab</td>
                <td className="p-2 border border-slate-800">Move one cell to the left.</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800 font-mono">Enter</td>
                <td className="p-2 border border-slate-800">Move one cell down.</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800 font-mono">Shift + Enter</td>
                <td className="p-2 border border-slate-800">Move one cell up.</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800 font-mono">Ctrl + Home</td>
                <td className="p-2 border border-slate-800">
                  Go to cell A1 of the current sheet.
                </td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-800 font-mono">Ctrl + End</td>
                <td className="p-2 border border-slate-800">
                  Go to last used cell in the sheet.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* NAME BOX + GO TO */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-purple-300">
          Name Box and Go To
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          The <span className="font-semibold">Name Box</span> (left of the
          formula bar) shows the address of the active cell. You can also type a
          cell address there (like <span className="font-mono">D50</span>) and
          press Enter to jump directly.
        </p>
        <p className="text-slate-300 text-sm md:text-base">
          <span className="font-semibold">Go To (F5 or Ctrl + G)</span> is a
          dialog that lets you quickly move to a specific cell or named range.
        </p>
        <ol className="list-decimal pl-6 space-y-1 text-slate-300 text-sm md:text-base">
          <li>Press <strong>F5</strong> or <strong>Ctrl + G</strong>.</li>
          <li>Type a cell address (e.g., <strong>K1000</strong>).</li>
          <li>Press Enter – Excel jumps to that cell.</li>
        </ol>
      </section>
    </div>
  );
}
