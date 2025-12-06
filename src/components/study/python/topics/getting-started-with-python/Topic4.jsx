import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-sky-300">
        Running Python Files vs Interactive Shell
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        Python can be executed in two major ways:
        The <b>Interactive Shell</b> for quick tests, and
        <b>Python Script Files</b> for full programs. Understanding the difference is
        important for proper development.
      </p>

      {/* Interactive Shell */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">1. Interactive Python Shell</h3>
        <p className="text-slate-300 text-sm">
          Also called REPL (Read–Eval–Print Loop). Use it for quick calculations, testing
          small pieces of code, or learning Python syntax.
        </p>

        <EditablePythonCodeBlock
          initialCode={`>>> 5 + 3
8

>>> print("Hello Python!")
Hello Python!`}
        />
      </section>

      {/* Script File Execution */}
      <section className="space-y-3">
        <h3 className="text-lg text-slate-200 font-semibold">2. Running Python Files</h3>
        <p className="text-slate-300 text-sm">
          Write your code in a file such as <code>program.py</code> and run it using:
        </p>

        <EditablePythonCodeBlock
          initialCode={`# program.py
print("This is a Python script")`}
        />

        <EditablePythonCodeBlock
          initialCode={`# Run the script from terminal
python program.py`}
        />
      </section>

      {/* Summary */}
      <section className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 text-lg font-semibold">Difference Summary</h3>
        <ul className="list-disc text-slate-300 text-sm ml-6 mt-2 space-y-1">
          <li>Interactive shell is temporary and does not save code.</li>
          <li>Script files allow building real applications.</li>
          <li>Debugging, importing, and long projects require script files.</li>
        </ul>
      </section>
    </div>
  );
}
