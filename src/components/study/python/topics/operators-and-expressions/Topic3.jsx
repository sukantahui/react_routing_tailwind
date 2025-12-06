import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Comparison Operators in Python
      </h1>

      <p className="text-slate-300 text-sm">
        Comparison (or relational) operators compare two values and return 
        <code> True </code> or <code> False</code>. They are commonly used in 
        decision-making, loops, and validations.
      </p>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          1. List of Comparison Operators
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          1. Comparison Operators in Python
        </h2>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li><code>==</code> → Equal to</li>
          <li><code>!=</code> → Not equal to</li>
          <li><code>&gt;</code> → Greater than</li>
          <li><code>&lt;</code> → Less than</li>
          <li><code>&gt;=</code> → Greater than or equal to</li>
          <li><code>&lt;=</code> → Less than or equal to</li>
        </ul>

        <EditablePythonCodeBlock
          initialCode={`a = 10
b = 20

print(a == b)   # False
print(a != b)   # True
print(a > b)    # False
print(a < b)    # True
print(a >= 10)  # True
print(b <= 25)  # True`}
        />
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          2. Comparisons with Strings
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-200">
          2. Comparison with Strings
        </h2>

        <p className="text-slate-300 text-sm">
          String comparison is based on **lexicographical (dictionary) order** using ASCII/Unicode values.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print("apple" == "apple")   # True
print("apple" != "banana") # True
print("cat" > "bat")       # True ('c' > 'b')
print("A" < "a")           # True (ASCII of A < a)`}
        />
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          3. Comparisons with Boolean Values
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200">
          3. Boolean Comparisons
        </h2>

        <p className="text-slate-300 text-sm">
          In Python:
        </p>

        <ul className="ml-6 list-disc text-sm text-slate-300 space-y-1">
          <li><code>True</code> acts like <code>1</code></li>
          <li><code>False</code> acts like <code>0</code></li>
        </ul>

        <EditablePythonCodeBlock
          initialCode={`print(True == 1)     # True
print(False == 0)    # True
print(True > False)  # True`}
        />
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          4. Chained Comparisons
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          4. Chained Comparisons (Python Feature)
        </h2>

        <p className="text-slate-300 text-sm">
          Python allows mathematical-style chaining of comparisons:
        </p>

        <EditablePythonCodeBlock
          initialCode={`x = 15

print(10 < x < 20)     # True
print(5 < x <= 15)     # True
print(20 > x == 15)    # True`}
        />

        <div className="p-4 bg-slate-800 rounded-xl text-sm text-slate-300">
          <strong>Teacher’s Tip:</strong>  
          Chained comparisons read naturally and reduce multiple <code>and</code> conditions.
        </div>
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          5. Real-life Example
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200">
          5. Real-Life Example — Checking Eligibility
        </h2>

        <EditablePythonCodeBlock
          initialCode={`age = 17

if age >= 18:
    print("Eligible to vote")
else:
    print("Not eligible")`}
        />
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          6. Common Mistakes to Avoid
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          6. Common Mistakes
        </h2>

        <EditablePythonCodeBlock
          initialCode={`x = 10

# Mistake: Using = instead of ==
if x = 10:
    print("Wrong!")  # ERROR`}
        />

        <div className="p-4 bg-slate-800 rounded-xl text-slate-300 text-sm">
          <strong>Remember:</strong>  
          <code>=</code> is assignment, <code>==</code> is comparison.
        </div>
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          SUMMARY
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="p-4 bg-slate-800 rounded-xl text-slate-300 text-sm">
        <h2 className="font-semibold text-slate-200 mb-2">Summary</h2>

        <ul className="list-disc ml-6 space-y-1">
          <li>Comparison operators return <code>True/False</code>.</li>
          <li>Strings compare lexicographically.</li>
          <li>Booleans behave like numbers (1 and 0).</li>
          <li>Python supports chained comparisons.</li>
          <li>Avoid confusing <code>=</code> with <code>==</code>.</li>
        </ul>
      </section>

    </div>
  );
}
