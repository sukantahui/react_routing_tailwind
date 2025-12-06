import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Running Python Programs & The print() Function
      </h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        Python can be executed in two main ways: running scripts in a file, 
        or writing commands interactively in Python's shell.  
        This topic also covers the <code>print()</code> function, formatting values, 
        escape sequences, and using print for debugging.
      </p>


      {/* ===============================================================
          1 — RUNNING PYTHON: SCRIPT VS INTERACTIVE SHELL
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          1. Running Python — Script vs Interactive Shell
        </h2>

        <p className="text-slate-300 text-sm">
          Python programs can run in two ways:
        </p>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li>
            <b>Interactive Shell (REPL):</b> Write and execute one line at a time.
          </li>
          <li>
            <b>Script Mode:</b> Write code in a <code>.py</code> file and run it.
          </li>
        </ul>

        <EditablePythonCodeBlock
          initialCode={`# Running inside interactive shell:
>>> 2 + 3
5

# Running a script:
# Save as hello.py and run:
# python hello.py`}
        />
      </section>


      {/* ===============================================================
          2 — PYTHON EDITORS: IDLE, VS CODE, PYCHARM
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          2. Using IDLE, VS Code & PyCharm
        </h2>

        <p className="text-slate-300 text-sm">
          Different environments help you write and run Python more efficiently:
        </p>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li>
            <b>IDLE:</b> Comes with Python by default; beginner-friendly.
          </li>
          <li>
            <b>VS Code:</b> Popular editor with Python extension support.
          </li>
          <li>
            <b>PyCharm:</b> Professional IDE for larger Python applications.
          </li>
        </ul>
      </section>


      {/* ===============================================================
          3 — YOUR FIRST PYTHON PROGRAM
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          3. First Python Program — hello.py
        </h2>

        <p className="text-slate-300 text-sm">
          A Python program usually starts with a simple <code>print()</code> statement.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print("Hello, Python!")`}
        />

        <p className="text-slate-400 text-xs">
          Save this as <code>hello.py</code> and run:
        </p>

        <EditablePythonCodeBlock
          initialCode={`python hello.py`}
        />
      </section>


      {/* ===============================================================
          4 — THE print() FUNCTION
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          4. Understanding the print() Function
        </h2>

        <p className="text-slate-300 text-sm">
          The <code>print()</code> function displays output to the screen. 
          It can print text, numbers, variables, expressions, or multiple values.
        </p>

        <EditablePythonCodeBlock
          initialCode={`x = 10
y = 20
print("The sum is:", x + y)
print("Values:", x, y, "Python")`}
        />
      </section>


      {/* ===============================================================
          5 — sep and end PARAMETERS
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          5. Formatting Output: <code>sep</code> and <code>end</code>
        </h2>

        <p className="text-slate-300 text-sm">
          The <code>print()</code> function has two useful optional parameters:
        </p>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li><b>sep</b> → separator between values</li>
          <li><b>end</b> → what to print at the end (default is newline)</li>
        </ul>

        <EditablePythonCodeBlock
          initialCode={`print("Python", "is", "awesome", sep="-")
print("Welcome", end=" ")
print("to Coder & AccoTax!")`}
        />
      </section>


      {/* ===============================================================
          6 — ESCAPE SEQUENCES
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          6. Escape Sequences in print()
        </h2>

        <p className="text-slate-300 text-sm">Common escape sequences:</p>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li><code>\n</code> → new line</li>
          <li><code>\t</code> → tab space</li>
          <li><code>\\</code> → backslash</li>
          <li><code>\\"</code> → double quote</li>
        </ul>

        <EditablePythonCodeBlock
          initialCode={`print("Hello\\nPython")
print("A\\tB\\tC")
print("He said, \\"Python is fun!\\"")`}
        />
      </section>


      {/* ===============================================================
          7 — SIMPLE DEBUGGING USING print()
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          7. Basic Debugging with print() Statements
        </h2>

        <p className="text-slate-300 text-sm">
          Before learning advanced debugging tools, beginners can debug logic 
          by printing intermediate values.
        </p>

        <EditablePythonCodeBlock
          initialCode={`x = 10
y = 0

print("Before division: x =", x, "y =", y)

# Debug check
if y == 0:
    print("[DEBUG] y is zero, cannot divide!")
else:
    print("Result:", x / y)`}
        />
      </section>


      {/* ===============================================================
          TEACHER'S TIPS
      =============================================================== */}
      <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 text-lg font-semibold">Teacher’s Tips</h3>

        <ul className="list-disc ml-6 mt-2 text-slate-300 text-sm space-y-2">
          <li>Encourage students to practice both script and interactive mode.</li>
          <li>Make them frequently use <code>print()</code> to understand program flow.</li>
          <li>Explain clearly that <code>sep</code> and <code>end</code> appear in board exams often.</li>
          <li>Ask them to observe how escape sequences change behavior.</li>
        </ul>
      </section>
    </div>
  );
}
