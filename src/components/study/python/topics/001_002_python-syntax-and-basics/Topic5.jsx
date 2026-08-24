import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic5() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Output Formatting in Python — sep, end & Advanced print() Usage
      </h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        Python’s <code>print()</code> function is extremely flexible.  
        In this topic, you will learn how to control spacing between values, remove 
        newlines, and create clean outputs using <code>sep</code> and <code>end</code>.
      </p>


      {/* ===============================================================
          1 — DEFAULT PRINT BEHAVIOR
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          1. Default Behaviour of print()
        </h2>

        <p className="text-slate-300 text-sm">
          By default:
        </p>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li>Values are separated by **a space**</li>
          <li>A **newline** is added after every print</li>
        </ul>

        <EditablePythonCodeBlock
          initialCode={`print("Hello", "Python", 2025)
print("Line 1")
print("Line 2")`}
        />
      </section>


      {/* ===============================================================
          2 — THE sep PARAMETER
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          2. Using <code>sep</code> — Custom Separator
        </h2>

        <p className="text-slate-300 text-sm">
          <code>sep</code> defines how multiple printed values are separated.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print("2025", "02", "15", sep="-")
print("A", "B", "C", sep=" | ")
print("Coding", "is", "fun", sep="♥")`}
        />

        <p className="text-slate-400 text-xs">Default separator = a single space `" "`.</p>
      </section>


      {/* ===============================================================
          3 — THE end PARAMETER
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          3. Using <code>end</code> — Custom Line Ending
        </h2>

        <p className="text-slate-300 text-sm">
          <code>end</code> controls what happens after a print statement.  
          Default value = <code>"\\n"</code> (newline).
        </p>

        <EditablePythonCodeBlock
          initialCode={`print("Hello", end=" ")
print("World!")

print("Loading", end="...")
print("Done!")`}
        />
      </section>


      {/* ===============================================================
          4 — PRINTING WITHOUT NEWLINES
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          4. Printing Without Newlines
        </h2>

        <p className="text-slate-300 text-sm">
          Printing on the *same line* is done by changing the <code>end</code> character.
        </p>

        <EditablePythonCodeBlock
          initialCode={`for i in range(5):
    print(i, end=" ")

# Output: 0 1 2 3 4`}
        />
      </section>


      {/* ===============================================================
          5 — COMBINING sep AND end
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          5. Combining <code>sep</code> and <code>end</code>
        </h2>

        <EditablePythonCodeBlock
          initialCode={`print("Name", "Age", "City", sep=" | ", end="\\n---\\n")
print("Ritaja", 14, "Kolkata", sep=" | ")`}
        />
      </section>


      {/* ===============================================================
          6 — PRINTING FORMATTED OUTPUT (INTRO)
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          6. Introduction to Formatted Output
        </h2>

        <p className="text-slate-300 text-sm">
          Python supports many formatting styles. Here we introduce the first one:  
          <code>print()</code> with commas, <code>sep</code> and <code>end</code>.
        </p>

        <EditablePythonCodeBlock
          initialCode={`name = "Mounita"
score = 92

print("Student:", name, "Score:", score, sep=" ")`}
        />

        <p className="text-slate-300 text-sm">
          Upcoming topics will cover:
        </p>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li>f-strings</li>
          <li>format()</li>
          <li>% formatting</li>
        </ul>
      </section>


      {/* ===============================================================
          TEACHER'S TIPS
      =============================================================== */}
      <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 text-lg font-semibold">Teacher’s Tips</h3>

        <ul className="list-disc ml-6 mt-2 text-slate-300 text-sm space-y-2">
          <li>
            Make students practice <code>sep</code> and <code>end</code> because
            they are heavily used in school Python exams.
          </li>
          <li>
            Encourage writing loop outputs on same line to understand how <code>end</code> works.
          </li>
          <li>
            Stress that <b>print() always ends with a newline unless changed</b>.
          </li>
        </ul>
      </section>

    </div>
  );
}
