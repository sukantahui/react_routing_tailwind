import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Logical Operators in Python (and, or, not)
      </h1>

      <p className="text-slate-300 text-sm">
        Logical operators allow you to combine multiple conditions. They always return 
        <code> True </code> or <code> False</code> based on the rules of logic.
      </p>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          1. Logical Operators Overview
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          1. Types of Logical Operators in Python
        </h2>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li><code>and</code> → True if **both** conditions are True</li>
          <li><code>or</code> → True if **at least one** condition is True</li>
          <li><code>not</code> → Reverses a boolean value</li>
        </ul>

        <EditablePythonCodeBlock
          initialCode={`x = 10
y = 20

print(x > 5 and y > 10)   # True
print(x > 15 or y > 15)   # True
print(not (x == 10))      # False`}
        />
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          2. Truth Tables
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">
          2. Logical Operator Truth Tables
        </h2>

        <div className="text-slate-300 text-xs md:text-sm space-y-4">

          {/* AND Table */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">AND Operator</h3>
            <pre className="bg-slate-800 p-3 rounded-xl whitespace-pre">
A      B      A and B
-------------------------
True   True     True
True   False    False
False  True     False
False  False    False
            </pre>
          </div>

          {/* OR Table */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">OR Operator</h3>
            <pre className="bg-slate-800 p-3 rounded-xl whitespace-pre">
A      B      A or B
-------------------------
True   True     True
True   False    True
False  True     True
False  False    False
            </pre>
          </div>

          {/* NOT Table */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-1">NOT Operator</h3>
            <pre className="bg-slate-800 p-3 rounded-xl whitespace-pre">
A        not A
-----------------
True       False
False      True
            </pre>
          </div>

        </div>
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          3. Logical Operators with Numbers & Strings
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200">
          3. Using Logical Operators with Numbers & Strings
        </h2>

        <p className="text-slate-300 text-sm">
          Any non-zero number or non-empty string in Python is considered <code>True</code>.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print(10 and 20)         # 20  (both True → returns last value)
print(0 and 5)           # 0   (0 is False → returns first False value)
print("" or "hello")     # "hello" (empty string is False)
print(not "")            # True`}
        />

        <div className="p-4 bg-slate-800 rounded-xl text-sm text-slate-300 mt-2">
          <strong>Important:</strong> Logical operators return actual values in Python, not just True/False.
        </div>
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          4. Real-life Examples
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          4. Real-Life Examples
        </h2>

        <EditablePythonCodeBlock
          initialCode={`age = 17
has_id = True

# Must be 18+ AND have ID
if age >= 18 and has_id:
    print("Eligible for entry")
else:
    print("Not eligible")`}
        />

        <EditablePythonCodeBlock
          initialCode={`username = "admin"
password = "1234"

# At least one must match
if username == "admin" or password == "pass123":
    print("Login permitted")
else:
    print("Access denied")`}
        />
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          5. Common Mistakes
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200">
          5. Common Mistakes to Avoid
        </h2>

        <EditablePythonCodeBlock
          initialCode={`x = 10

# ❌ Mistake: Using bitwise operators instead of logical
print(x > 5 & x < 20)    # WRONG (not logical AND)

# ✔ Correct
print(x > 5 and x < 20)  # True`}
        />

        <div className="p-4 bg-slate-800 rounded-xl text-sm text-slate-300">
          <strong>Teacher’s Tip:</strong>  
          Beginners often confuse <code>&amp;</code> with <code>and</code>  
          — they behave differently in Python.
        </div>
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          SUMMARY
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="p-4 bg-slate-800 rounded-xl text-slate-300 text-sm">
        <h2 className="font-semibold text-slate-200 mb-2">Summary</h2>

        <ul className="list-disc ml-6 space-y-1">
          <li><code>and</code> → True only if both conditions are True.</li>
          <li><code>or</code> → True if any one condition is True.</li>
          <li><code>not</code> → Reverses True/False.</li>
          <li>Logical operators return actual values, not only booleans.</li>
          <li>Do not confuse <code>&amp;</code>/<code>|</code> with logical operators.</li>
        </ul>
      </section>

    </div>
  );
}
