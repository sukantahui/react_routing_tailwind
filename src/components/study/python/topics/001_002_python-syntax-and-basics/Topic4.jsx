import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Python Indentation, Comments, Variables & User Input
      </h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        This topic explains the foundation of Python syntax—indentation rules, comments, 
        variables, naming conventions, core data types, type casting, and taking input 
        from the user. These are essential concepts used in every Python program from 
        beginner to advanced level.
      </p>


      {/* ===============================================================
          1 — INDENTATION RULES
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">1. Python Indentation Rules</h2>

        <p className="text-slate-300 text-sm">
          Python uses **indentation instead of braces `{}`** to define blocks.  
          Incorrect indentation results in an error.
        </p>

        <EditablePythonCodeBlock
          initialCode={`# Correct indentation
if 5 > 2:
    print("Five is greater than two!")

# Incorrect indentation → ERROR
if 5 > 2:
print("This will cause an IndentationError")`}
        />

        <p className="text-slate-400 text-xs">
          Recommended indentation: <b>4 spaces</b>, not tabs.
        </p>
      </section>


      {/* ===============================================================
          2 — COMMENTS (#)
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">2. Comments in Python (#)</h2>

        <p className="text-slate-300 text-sm">
          Python supports only **single-line comments** using <code>#</code>.  
          They help describe code but are ignored during execution.
        </p>

        <EditablePythonCodeBlock
          initialCode={`# This is a comment
x = 10  # Inline comment
print(x)  # Prints 10`}
        />
      </section>


      {/* ===============================================================
          3 — VARIABLES IN PYTHON
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">3. Variables and Naming Conventions</h2>

        <p className="text-slate-300 text-sm">
          Variables are created when a value is assigned using <code>=</code>.  
          Python automatically decides the data type based on the value.
        </p>

        <EditablePythonCodeBlock
          initialCode={`name = "Sukanta"
age = 18
pi = 3.14
is_student = True

print(name, age, pi, is_student)`}
        />

        <h3 className="text-slate-200 font-semibold text-sm">Naming Rules</h3>
        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li>Must start with a letter or underscore</li>
          <li>Cannot start with a number</li>
          <li>Can contain letters, digits, underscore</li>
          <li>Case-sensitive (age ≠ Age)</li>
        </ul>

        <h3 className="text-slate-200 font-semibold text-sm mt-3">Good Naming Style</h3>
        <p className="text-slate-300 text-sm">Use <b>snake_case</b>:</p>

        <EditablePythonCodeBlock
          initialCode={`student_name = "Ritaja"
total_marks = 480`}
        />
      </section>


      {/* ===============================================================
          4 — KEYWORDS vs IDENTIFIERS
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">4. Keywords vs Identifiers</h2>

        <p className="text-slate-300 text-sm">
          **Keywords** are reserved words in Python. You cannot use them as variable names.  
          **Identifiers** are names you define.
        </p>

        <EditablePythonCodeBlock
          initialCode={`import keyword
print(keyword.kwlist)  # Shows all Python keywords`}
        />

        <p className="text-slate-300 text-sm">
          Examples of keywords: <code>if</code>, <code>elif</code>, <code>else</code>, 
          <code>while</code>, <code>for</code>, <code>class</code>, <code>True</code>, <code>False</code>.
        </p>
      </section>


      {/* ===============================================================
          5 — CORE DATA TYPES
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">5. Core Data Types in Python</h2>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li><b>int</b> – whole numbers</li>
          <li><b>float</b> – decimals</li>
          <li><b>str</b> – text</li>
          <li><b>bool</b> – True / False</li>
        </ul>

        <EditablePythonCodeBlock
          initialCode={`a = 10          # int
b = 3.14        # float
c = "Hello"     # str
d = True        # bool

print(type(a), type(b), type(c), type(d))`}
        />
      </section>


      {/* ===============================================================
          6 — TYPE CASTING
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">6. Type Casting: Converting Data Types</h2>

        <p className="text-slate-300 text-sm">
          Use built-in functions to convert types:
        </p>

        <EditablePythonCodeBlock
          initialCode={`x = "20"
y = int(x)   # "20" → 20
z = float(x) # "20" → 20.0

print(y, z)`}
        />

        <EditablePythonCodeBlock
          initialCode={`# bool(): empty values → False
print(bool(""))     # False
print(bool("Hi"))   # True
print(bool(0))      # False
print(bool(5))      # True`}
        />
      </section>


      {/* ===============================================================
          7 — INPUT USING input()
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">7. Taking User Input using input()</h2>

        <p className="text-slate-300 text-sm">
          <code>input()</code> always returns a string. Convert it if you need a number.
        </p>

        <EditablePythonCodeBlock
          initialCode={`name = input("Enter your name: ")
age = int(input("Enter age: "))

print("Welcome", name)
print("Next year you will be", age + 1)`}
        />
      </section>


      {/* ===============================================================
          TEACHER'S TIPS
      =============================================================== */}
      <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 text-lg font-semibold">Teacher’s Tips</h3>

        <ul className="list-disc ml-6 mt-2 text-slate-300 text-sm space-y-2">
          <li>Students must practice indentation; it's the #1 cause of beginner errors.</li>
          <li>Make them memorize what <b>input()</b> returns — always a string.</li>
          <li>Encourage proper variable naming from the start (snake_case).</li>
          <li>Use <code>type()</code> frequently to understand Python’s dynamic typing.</li>
        </ul>
      </section>

    </div>
  );
}
