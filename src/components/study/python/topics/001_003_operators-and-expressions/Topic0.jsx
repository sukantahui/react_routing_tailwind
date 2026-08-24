import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-10">

      {/* ================================================================
          TITLE
      ================================================================ */}
      <h1 className="text-2xl font-bold text-sky-300">
        Introduction to Python Operators
      </h1>

      <p className="text-slate-300 text-sm">
        Operators are symbols used to perform operations on variables and values.
        Python provides a wide range of operators—from arithmetic to logical to 
        expression evaluation. This topic lays the foundation for mastering them.
      </p>

      {/* ================================================================
          1. Arithmetic Operators
      ================================================================ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">1. Arithmetic Operators</h2>

        <p className="text-sm text-slate-300">
          Arithmetic operators perform mathematical operations.
          Python supports: <strong>+, -, *, /, //, %, **</strong>
        </p>

        <EditablePythonCodeBlock
          initialCode={`a = 10
b = 3

print(a + b)   # Addition → 13
print(a - b)   # Subtraction → 7
print(a * b)   # Multiplication → 30
print(a / b)   # Division(float) → 3.333...
print(a // b)  # Floor division → 3
print(a % b)   # Modulus → 1
print(a ** b)  # Exponentiation → 1000`}
        />

        <div className="p-4 rounded-xl bg-slate-800 text-slate-300 text-sm">
          <strong>Teacher's Tip:</strong>  
          Always prefer <strong>//</strong> when you need integer results, especially in loops.
        </div>
      </section>

      {/* ================================================================
          2. Assignment & Compound Assignment
      ================================================================ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">2. Assignment & Compound Assignment</h2>

        <p className="text-sm text-slate-300">
          Assignment stores a value.  
          Compound assignment modifies the variable in-place.
        </p>

        <EditablePythonCodeBlock
          initialCode={`x = 10
x += 5   # x = 15
x -= 3   # x = 12
x *= 2   # x = 24
x /= 4   # x = 6.0
x **= 2  # x = 36
x //= 5  # x = 7

print(x)`}
        />

        <div className="p-4 rounded-xl bg-slate-800 text-slate-300 text-sm">
          <strong>Remember:</strong>  
          Compound operators make your code shorter and more readable.
        </div>
      </section>

      {/* ================================================================
          3. Comparison Operators
      ================================================================ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">3. Comparison Operators</h2>

        <p className="text-sm text-slate-300">
          These operators compare two values and return <strong>True</strong> or <strong>False</strong>.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print(5 > 3)   # True
print(5 < 3)   # False
print(5 >= 5)  # True
print(5 <= 4)  # False
print(5 == 5)  # True
print(5 != 2)  # True`}
        />
      </section>

      {/* ================================================================
          4. Logical Operators
      ================================================================ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">4. Logical Operators (and, or, not)</h2>

        <p className="text-sm text-slate-300">
          These operators evaluate multiple conditions.
        </p>

        <EditablePythonCodeBlock
          initialCode={`age = 20
city = "Kolkata"

print(age > 18 and city == "Kolkata")   # True
print(age < 18 or city == "Delhi")      # False
print(not(age > 18))                    # False`}
        />
      </section>

      {/* ================================================================
          5. String Concatenation & f-Strings
      ================================================================ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">5. String Concatenation & f-Strings</h2>

        <EditablePythonCodeBlock
          initialCode={`name = "Ritaja"
age = 15

# Normal concatenation
print("My name is " + name)

# f-string (recommended)
print(f"My name is {name} and I am {age} years old")`}
        />

        <div className="p-4 rounded-xl bg-slate-800 text-slate-300 text-sm">
          <strong>Teacher's Tip:</strong>  
          Use <strong>f-strings</strong> for readability and formatting power.
        </div>
      </section>

      {/* ================================================================
          6. Operator Precedence
      ================================================================ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">6. Operator Precedence</h2>

        <p className="text-sm text-slate-300">
          Precedence determines which operation executes first.
          Use parentheses <strong>()</strong> when unsure.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print(10 + 5 * 2)     # 20 → multiplication first
print((10 + 5) * 2)   # 30 → parenthesis first`}
        />

        <div className="p-4 rounded-xl bg-slate-800 text-slate-300 text-sm">
          <strong>Most important:</strong>  
          <code>* / // %</code> have higher precedence than <code>+ -</code>.
        </div>
      </section>

      {/* ================================================================
          7. Evaluating Expressions
      ================================================================ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">7. Evaluating Expressions</h2>

        <EditablePythonCodeBlock
          initialCode={`x = 10
y = 5
result = (x + y) * (x - y) / 5

print("Result =", result)`}
        />

        <div className="p-4 rounded-xl bg-slate-800 text-slate-300 text-sm">
          <strong>Key Idea:</strong>  
          Break complex expressions into smaller parts for clarity and debugging.
        </div>
      </section>

      {/* ================================================================
          SUMMARY
      ================================================================ */}
      <section className="p-4 bg-slate-800 rounded-xl text-slate-300 text-sm">
        <h2 className="font-semibold text-slate-200 mb-2">Summary</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Python supports rich arithmetic and logical operators.</li>
          <li>Assignment operators help simplify your code.</li>
          <li>Comparison operators return boolean values.</li>
          <li>Use f-strings for best formatting.</li>
          <li>Operator precedence determines evaluation order.</li>
        </ul>
      </section>

    </div>
  );
}
