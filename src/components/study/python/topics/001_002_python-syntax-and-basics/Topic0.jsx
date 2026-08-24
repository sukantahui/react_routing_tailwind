import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-8">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Python Basics — Indentation, Comments, Variables, Data Types & Input
      </h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        This topic covers the fundamental building blocks of Python programming.
        Understanding indentation, comments, variables, data types, and input will
        give you the perfect start to writing clean and correct Python programs.
      </p>

      {/* =====================================================
          SECTION 1 — INDENTATION
      ===================================================== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">1. Python Indentation Rules</h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Python uses <b>indentation</b> (spaces at the beginning of a line) to define blocks of code.
          Unlike other languages (C, Java), Python does not use braces <code>{`{}`}</code>.
        </p>

        <EditablePythonCodeBlock
          initialCode={`if True:
    print("This is inside the block")
    print("Still inside")

print("Outside the block")`}
        />

        <ul className="list-disc text-slate-300 text-sm ml-6">
          <li>Recommended indentation = 4 spaces</li>
          <li>Indentation errors are one of the most common beginner mistakes</li>
        </ul>
      </section>

      {/* =====================================================
          SECTION 2 — COMMENTS
      ===================================================== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">2. Comments in Python</h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Comments help explain your code and are ignored by Python during execution.
        </p>

        <EditablePythonCodeBlock
          initialCode={`# This is a single-line comment
print("Hello!")  # Comment at the end`}
        />
      </section>

      {/* =====================================================
          SECTION 3 — VARIABLES & NAMING RULES
      ===================================================== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">3. Variables & Naming Conventions</h2>

        <p className="text-slate-300 text-sm">
          A variable is a name given to store data. Python automatically detects data type.
        </p>

        <EditablePythonCodeBlock
          initialCode={`age = 25
name = "Sukanta"
is_student = True`}
        />

        <h3 className="text-slate-300 font-semibold">Naming Rules:</h3>
        <ul className="list-disc ml-6 text-slate-300 text-sm">
          <li>Start with a letter or underscore</li>
          <li>Cannot start with a digit</li>
          <li>No spaces allowed</li>
          <li>Case-sensitive — <code>name</code> and <code>Name</code> are different</li>
        </ul>
      </section>

      {/* =====================================================
          SECTION 4 — KEYWORDS & IDENTIFIERS
      ===================================================== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">4. Keywords & Identifiers</h2>

        <p className="text-slate-300 text-sm">
          Keywords are reserved words in Python (cannot be used as variable names).
        </p>

        <EditablePythonCodeBlock
          initialCode={`import keyword
print(keyword.kwlist)`}
        />
      </section>

      {/* =====================================================
          SECTION 5 — CORE DATA TYPES
      ===================================================== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">5. Core Data Types in Python</h2>

        <EditablePythonCodeBlock
          initialCode={`x = 10       # int
pi = 3.14    # float
name = "Tom" # str
happy = True # bool`}
        />

        <p className="text-slate-300 text-sm">
          Python also has advanced types like list, tuple, dict, etc. (covered in later chapters).
        </p>
      </section>

      {/* =====================================================
          SECTION 6 — TYPE CASTING (Conversion)
      ===================================================== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">6. Type Casting</h2>

        <p className="text-slate-300 text-sm">Convert one data type to another:</p>

        <EditablePythonCodeBlock
          initialCode={`a = "20"
b = int(a)     # "20" → 20

x = 3.14
y = int(x)     # 3.14 → 3

z = str(100)   # 100 → "100"`}
        />
      </section>

      {/* =====================================================
          SECTION 7 — input() FUNCTION
      ===================================================== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">7. Getting User Input</h2>

        <p className="text-slate-300 text-sm">
          <code>input()</code> always returns a string, so type conversion may be required.
        </p>

        <EditablePythonCodeBlock
          initialCode={`name = input("Enter your name: ")
age = int(input("Enter age: "))

print("Hello,", name)
print("Age in 5 years =", age + 5)`}
        />
      </section>

      {/* =====================================================
          SECTION 8 — PRINT FORMATTING: sep & end
      ===================================================== */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">8. print() Formatting — sep & end</h2>

        <p className="text-slate-300 text-sm">
          <code>sep</code> controls the separator, <code>end</code> controls what prints at the end.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print("A", "B", "C", sep="-") 
# Output: A-B-C

print("Hello", end=" ")
print("World")
# Output: Hello World`}
        />
      </section>

      {/* Teacher Tips */}
      <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 font-semibold text-lg">Teacher’s Tips</h3>
        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-2 mt-2">
          <li>Indent properly — Python errors often come from wrong spacing.</li>
          <li>Use comments to explain logic; it improves readability.</li>
          <li>Choose meaningful variable names like <code>total_amount</code>, <code>student_name</code>.</li>
          <li>Use input() to make programs interactive.</li>
          <li>sep and end help produce precise output formats.</li>
        </ul>
      </section>

    </div>
  );
}
