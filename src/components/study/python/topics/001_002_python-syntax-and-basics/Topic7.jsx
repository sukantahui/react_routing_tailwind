import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic7() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Type Casting in Python — int(), float(), str(), bool()
      </h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        Type casting (also called <b>type conversion</b>) is the process of converting one 
        data type into another.  
        Python provides built-in functions to convert values between 
        <code>int</code>, <code>float</code>, <code>str</code>, and <code>bool</code>.
      </p>


      {/* ===============================================================
          1 — int() conversion
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">1. int() — Convert to Integer</h2>

        <p className="text-slate-300 text-sm">
          Converts numbers or numeric strings to integers.<br/>
          Decimals are truncated (not rounded).
        </p>

        <EditablePythonCodeBlock
          initialCode={`print(int(3.9))      # 3 (decimal removed)
print(int("20"))    # 20
print(int(True))    # 1
print(int(False))   # 0`}
        />

        <p className="text-slate-400 text-xs">Note: <code>int("hello")</code> will cause an error.</p>
      </section>


      {/* ===============================================================
          2 — float() conversion
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">2. float() — Convert to Decimal</h2>

        <p className="text-slate-300 text-sm">
          Converts integers, strings, or booleans into floating-point numbers.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print(float(10))       # 10.0
print(float("3.14"))   # 3.14
print(float(True))     # 1.0
print(float(False))    # 0.0`}
        />
      </section>


      {/* ===============================================================
          3 — str() conversion
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">3. str() — Convert to String</h2>

        <p className="text-slate-300 text-sm">
          Converts any value into a text-based representation.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print(str(100))        # "100"
print(str(3.14))       # "3.14"
print(str(True))       # "True"
print(str(False))      # "False"`}
        />

        <p className="text-slate-400 text-xs">
          Useful when concatenating numbers with strings.
        </p>
      </section>


      {/* ===============================================================
          4 — bool() conversion
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">4. bool() — Convert to Boolean</h2>

        <p className="text-slate-300 text-sm">
          Converts any value to either <code>True</code> or <code>False</code>.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print(bool(10))     # True
print(bool(0))      # False
print(bool("Hello"))# True
print(bool(""))     # False
print(bool([]))     # False
print(bool([1,2]))  # True`}
        />

        <p className="text-slate-400 text-xs">
          Empty values (0, "", [], {}, None) become False.  
          Everything else becomes True.
        </p>
      </section>


      {/* ===============================================================
          5 — Real-World Example: Mixed Input Cleanup
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          5. Real-World Example: Cleaning Input Values
        </h2>

        <EditablePythonCodeBlock
          initialCode={`age = int(input("Enter age: "))
height = float(input("Enter height (in meters): "))

print("Age:", age)
print("Height:", height)`}
        />

        <p className="text-slate-300 text-sm">
          Inputs from users are always strings — type casting is required.
        </p>
      </section>


      {/* ===============================================================
          6 — Common Errors in Type Conversion
      =============================================================== */}
      <section className="space-y-4 bg-slate-900/50 border border-slate-700 p-5 rounded-xl">
        <h2 className="text-xl font-semibold text-rose-300">Common Errors</h2>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-2">
          <li><code>int("abc")</code> → ❌ cannot convert non-numeric text.</li>
          <li><code>float("ten")</code> → ❌ invalid literal.</li>
          <li>Using <code>input()</code> without type-casting leads to string-based math (wrong results).</li>
          <li>Boolean conversion surprises beginners — e.g., <code>bool("0") → True</code>.</li>
        </ul>
      </section>

      
      {/* ===============================================================
          TEACHER'S TIPS
      =============================================================== */}
      <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 text-lg font-semibold">Teacher’s Tips</h3>

        <ul className="list-disc ml-6 mt-2 text-slate-300 text-sm space-y-2">
          <li>Ask students to predict the output of <code>bool()</code> conversions — excellent for exams.</li>
          <li>Use type casting frequently in input-based programs to avoid logical errors.</li>
          <li>Highlight the difference between truncation (int) and conversion (float).</li>
          <li>Make students practice converting values from input(), ensuring correct data type usage.</li>
        </ul>
      </section>

    </div>
  );
}
