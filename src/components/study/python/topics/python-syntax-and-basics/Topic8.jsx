import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic8() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Input Handling & Output Formatting (input(), sep, end)
      </h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        Python provides simple and powerful ways to take user input and control how 
        values are displayed using the <code>print()</code> function.  
        This topic covers:
        <br />
        <b>input(), sep, end, multi-value printing, and common mistakes.</b>
      </p>


      {/* ===============================================================
          1. input() — Taking User Input
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">1. input() — Taking User Input</h2>

        <p className="text-slate-300 text-sm">
          <code>input()</code> always returns a <b>string</b>, even if the user types a number.
        </p>

        <EditablePythonCodeBlock
          initialCode={`name = input("Enter your name: ")
print("Hello", name)`}
        />

        <p className="text-slate-400 text-xs">
          Important: convert the input using <code>int()</code>, <code>float()</code> if needed.
        </p>
      </section>


      {/* ===============================================================
          2. Type Casting with input()
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          2. Converting Input to Numbers
        </h2>

        <EditablePythonCodeBlock
          initialCode={`age = int(input("Enter your age: "))
marks = float(input("Enter marks: "))

print("Age:", age)
print("Marks:", marks)`}
        />

        <p className="text-slate-400 text-xs">
          Without conversion, <code>age</code> and <code>marks</code> would be strings.
        </p>
      </section>


      {/* ===============================================================
          3. print() — sep parameter
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          3. Controlling Output Using <code>sep</code>
        </h2>

        <p className="text-slate-300 text-sm">
          <code>sep</code> controls the separator placed between printed values.  
          Default separator: a space.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print("Python", "is", "fun")              # default sep=' '
print("Python", "is", "fun", sep="-")  # custom separator
print("2025", "12", "31", sep="/")     # formatting a date`}
        />
      </section>


      {/* ===============================================================
          4. print() — end parameter
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          4. Using <code>end</code> to Control Line Endings
        </h2>

        <p className="text-slate-300 text-sm">
          <code>end</code> decides what is printed at the end of the line.  
          By default: <code>end="\\n"</code> (new line).
        </p>

        <EditablePythonCodeBlock
          initialCode={`print("Hello", end=" ")
print("World")

print("A", end="-")
print("B", end="-")
print("C")`}
        />
      </section>


      {/* ===============================================================
          5. Combining sep and end together
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          5. Combining sep and end for Better Formatting
        </h2>

        <EditablePythonCodeBlock
          initialCode={`print("Sukanta", "Hui", sep=" ", end=" | ")
print("Coder & AccoTax", "Barrackpore", sep=" - ")`}
        />

        <p className="text-slate-300 text-sm">
          Useful for printing tables, logs, status lines, etc.
        </p>
      </section>


      {/* ===============================================================
          6. Real-World Example — Collecting Student Info
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          6. Real-World Example
        </h2>

        <EditablePythonCodeBlock
          initialCode={`name = input("Enter your name: ")
age  = int(input("Enter age: "))
city = input("Enter city: ")

print("Student Info:", name, age, city, sep=" | ")`}
        />
      </section>


      {/* ===============================================================
          Common Mistakes
      =============================================================== */}
      <section className="bg-slate-900/50 p-5 border border-slate-700 rounded-xl">
        <h2 className="text-xl font-semibold text-rose-300">⚠ Common Mistakes</h2>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-2 mt-2">
          <li>Trying to perform math with values from <code>input()</code> without casting.</li>
          <li>Using incorrect separators like <code>sep=""</code> (prints without spacing).</li>
          <li>Forgetting that <code>end</code> removes newline, causing outputs to join together.</li>
        </ul>
      </section>


      {/* ===============================================================
          Teacher’s Tips
      =============================================================== */}
      <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 text-lg font-semibold">Teacher’s Tips</h3>

        <ul className="list-disc ml-6 mt-2 text-slate-300 text-sm space-y-2">
          <li>Ask students to format dates, names, and labels using <code>sep</code>.</li>
          <li>Give small exercises requiring <code>end=""</code> to print patterns.</li>
          <li>Ensure students master <code>input()</code> with type conversion early — it removes 80% beginner errors.</li>
          <li>Use debugging print statements with <code>sep</code> for clean logs.</li>
        </ul>
      </section>

    </div>
  );
}
