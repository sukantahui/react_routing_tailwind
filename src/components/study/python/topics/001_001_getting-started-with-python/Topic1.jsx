import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-10">

      {/* ---------------------- TITLE ---------------------- */}
      <section>
        <h2 className="text-2xl font-bold text-sky-300">
          Features of Python – Interpreted, High-Level & Portable
        </h2>
        <p className="text-slate-300 mt-2 text-sm leading-relaxed">
          Python is a simple, powerful, and modern programming language.  
          Its design makes it ideal for beginners and professionals working
          in fields like data science, AI, automation, app development, and more.
        </p>
      </section>

      {/* ---------------------- INTERPRETED LANGUAGE ---------------------- */}
      <section className="border border-slate-700 bg-slate-900 p-5 rounded-2xl">
        <h3 className="text-xl font-semibold text-emerald-300">
          1. Python is an Interpreted Language
        </h3>

        <p className="text-slate-300 mt-2 text-sm leading-relaxed">
          Python executes code line-by-line using an interpreter.  
          This helps beginners quickly identify mistakes and test ideas rapidly.
        </p>

        <p className="mt-3 text-sky-300 font-semibold">Example:</p>

        <EditablePythonCodeBlock
          initialCode={`print("Hello Python")\nprint(10 + 20)\nprint("Line-by-line execution")`}
        />

        <div className="mt-3 bg-slate-800 p-3 rounded-xl">
          <p className="text-sm text-yellow-300 font-semibold">
            Teacher's Tip:
          </p>
          <p className="text-slate-300 text-sm mt-1">
            If one line contains an error, Python stops at that line only.
            Always check errors from the top — Python tells you exactly where the
            problem is.
          </p>
        </div>
      </section>

      {/* ---------------------- HIGH LEVEL LANGUAGE ---------------------- */}
      <section className="border border-slate-700 bg-slate-900 p-5 rounded-2xl">
        <h3 className="text-xl font-semibold text-indigo-300">
          2. Python is a High-Level Language
        </h3>

        <p className="text-slate-300 mt-2 text-sm leading-relaxed">
          Python abstracts complex machine-level details.  
          You get clean, readable, English-like syntax that focuses on logic,
          not memory management or low-level operations.
        </p>

        <EditablePythonCodeBlock
          initialCode={`numbers = [10, 20, 30, 40]\nprint("Total =", sum(numbers))`}
        />

        <div className="mt-3 bg-slate-800 p-3 rounded-xl">
          <p className="text-sm text-yellow-300 font-semibold">Teacher's Tip:</p>
          <p className="text-slate-300 text-sm mt-1">
            Python handles memory, garbage collection, and internal complexity —
            helping students concentrate on solving real-world problems.
          </p>
        </div>
      </section>

      {/* ---------------------- PORTABILITY ---------------------- */}
      <section className="border border-slate-700 bg-slate-900 p-5 rounded-2xl">
        <h3 className="text-xl font-semibold text-purple-300">
          3. Python is Portable (Write Once, Run Anywhere)
        </h3>

        <p className="text-slate-300 mt-2 text-sm leading-relaxed">
          Python programs run identically on Windows, macOS, Linux, Android (Termux),
          cloud platforms, and even inside browsers (PyScript).
        </p>

        <EditablePythonCodeBlock
          initialCode={`for i in range(3):\n    print("Cross-platform Python:", i)`}
        />

        <div className="mt-3 bg-slate-800 p-3 rounded-xl">
          <p className="text-sm text-yellow-300 font-semibold">Point to Remember:</p>
          <p className="text-slate-300 text-sm mt-1">
            As long as Python is installed, the same script runs everywhere without
            any modification or recompilation.
          </p>
        </div>
      </section>

      {/* ---------------------- SUMMARY ---------------------- */}
      <section className="border border-slate-800 bg-slate-900 p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-sky-300 mb-2">Summary</h3>

        <ul className="list-disc list-inside text-slate-300 text-sm space-y-1">
          <li>Python executes code line-by-line (interpreted).</li>
          <li>High-level → very easy to write and understand.</li>
          <li>Portable → same program runs across all OS.</li>
          <li>Beginner-friendly and widely used in AI, ML, Data Science, Web, Automation.</li>
        </ul>
      </section>

    </div>
  );
}
