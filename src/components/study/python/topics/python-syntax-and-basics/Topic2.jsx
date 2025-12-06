import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Variables, Keywords, Identifiers & Python’s Dynamic Typing
      </h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        In Python, variables do not need explicit type declarations.  
        Their type is determined automatically based on the assigned value.  
        This topic explains how variables work, naming rules, Python keywords,
        and how Python stores and reuses memory references.
      </p>

      {/* ===============================================================
           SECTION 1 — VARIABLES IN PYTHON
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          1. What is a Variable?
        </h2>

        <p className="text-slate-300 text-sm">
          A variable is a name that refers to a value stored in memory.  
          Python creates a variable automatically when you assign a value to it.
        </p>

        <EditablePythonCodeBlock
          initialCode={`x = 10
y = 3.14
name = "Sukanta Hui"
is_student = True

print(x, y, name, is_student)`}
        />
      </section>

      {/* ===============================================================
           SECTION 2 — PYTHON IS DYNAMICALLY TYPED
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          2. Python is a Dynamically Typed Language
        </h2>

        <p className="text-slate-300 text-sm">
          A variable’s type can change depending on the value assigned.
        </p>

        <EditablePythonCodeBlock
          initialCode={`a = 10       # int
print(type(a))

a = "Hello"  # str
print(type(a))

a = 3.14     # float
print(type(a))`}
        />
      </section>

      {/* ===============================================================
           SECTION 3 — NAMING RULES FOR VARIABLES
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          3. Naming Rules for Variables
        </h2>

        <p className="text-slate-300 text-sm">Rules:</p>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li>Can contain letters, digits, underscore.</li>
          <li>Cannot start with a digit.</li>
          <li>Cannot contain spaces or special characters.</li>
          <li>Case-sensitive (age ≠ Age ≠ AGE).</li>
        </ul>

        <EditablePythonCodeBlock
          initialCode={`valid_name = 10
ValidName = 20
_valid = 5
name2 = "Python"

# Invalid:
# 2value = 5      (cannot start with number)
# user-name = 10  (dash not allowed)`}
        />
      </section>

      {/* ===============================================================
           SECTION 4 — PYTHON KEYWORDS (RESERVED WORDS)
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">4. Python Keywords</h2>

        <p className="text-slate-300 text-sm">
          Keywords are reserved words used by Python’s syntax.  
          They cannot be used as variable names.
        </p>

        <EditablePythonCodeBlock
          initialCode={`import keyword
print(keyword.kwlist)
print("Total keywords:", len(keyword.kwlist))`}
        />
      </section>

      {/* ===============================================================
           SECTION 5 — IDENTIFIERS
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">5. Identifiers</h2>

        <p className="text-slate-300 text-sm">
          Identifiers are the names we give to variables, functions, classes, etc.
        </p>

        <EditablePythonCodeBlock
          initialCode={`name = "Alice"        # variable identifier
def greet():      # function identifier
    print("Hello!")

class Student:    # class identifier
    pass`}
        />
      </section>

      {/* ===============================================================
           SECTION 6 — MULTIPLE ASSIGNMENT
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">6. Multiple Assignment</h2>

        <p className="text-slate-300 text-sm">
          Python allows assigning values to multiple variables in one line.
        </p>

        <EditablePythonCodeBlock
          initialCode={`x, y, z = 10, 20, 30
name1 = name2 = "Coder & AccoTax"

print(x, y, z)
print(name1, name2)`}
        />
      </section>

      {/* ===============================================================
           SECTION 7 — CONSTANTS IN PYTHON
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">7. Constants in Python</h2>

        <p className="text-slate-300 text-sm">
          Python does not have true constants, but by convention,  
          constants are written in UPPERCASE.
        </p>

        <EditablePythonCodeBlock
          initialCode={`PI = 3.14159
GST_RATE = 0.18

print(PI, GST_RATE)`}
        />
      </section>

      {/* ===============================================================
           SECTION 8 — MEMORY & id() FUNCTION
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          8. Memory Reference Using id()
        </h2>

        <EditablePythonCodeBlock
          initialCode={`a = 10
b = 10

print(id(a))
print(id(b))
# Same memory location (small integers reused by Python)

x = 300
y = 300
print(id(x))
print(id(y))
# May differ depending on implementation`}
        />
      </section>

      {/* ===============================================================
           TEACHER TIPS
      =============================================================== */}
      <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 font-semibold text-lg">Teacher’s Tips</h3>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-2 mt-2">
          <li>Encourage students to use meaningful variable names.</li>
          <li>Make them memorize naming rules—common exam question.</li>
          <li>Explain that Python's dynamic typing reduces complexity for beginners.</li>
          <li>Show real examples where constants prevent mistakes.</li>
          <li>Use <code>id()</code> to teach how Python references memory.</li>
        </ul>
      </section>
    </div>
  );
}
