import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Arithmetic Operators in Python
      </h1>

      <p className="text-slate-300 text-sm">
        Arithmetic operators are used to perform mathematical calculations. 
        Python supports both basic and advanced arithmetic operations like 
        exponentiation and floor division. This topic helps you develop a strong 
        foundation for numerical computations.
      </p>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          1. List of Operators
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200">
          1. List of Arithmetic Operators
        </h2>

        <ul className="list-disc ml-6 text-slate-300 text-sm mt-2 space-y-1">
          <li><strong>+</strong>  → Addition</li>
          <li><strong>-</strong>  → Subtraction</li>
          <li><strong>*</strong>  → Multiplication</li>
          <li><strong>/</strong>  → Division (float result)</li>
          <li><strong>//</strong> → Floor Division (integer result)</li>
          <li><strong>%</strong>  → Modulus (remainder)</li>
          <li><strong>**</strong> → Exponentiation (power)</li>
        </ul>
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          2. Basic Examples
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          2. Basic Arithmetic Examples
        </h2>

        <p className="text-sm text-slate-300">
          Let's start with simple arithmetic operations:
        </p>

        <EditablePythonCodeBlock
          initialCode={`a = 12
b = 5

print("a + b =", a + b)
print("a - b =", a - b)
print("a * b =", a * b)
print("a / b =", a / b)    # floating result
print("a // b =", a // b)  # floor division
print("a % b =", a % b)    # remainder
print("a ** b =", a ** b)  # exponentiation`}
        />
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          3. Floor Division & Modulus
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          3. Floor Division & Modulus – Where They Are Used?
        </h2>

        <p className="text-sm text-slate-300">
          These two operators are extremely useful in number system problems.
        </p>

        <EditablePythonCodeBlock
          initialCode={`# Example 1: Last digit of a number
num = 9876
print(num % 10)   # 6

# Example 2: Remove last digit
print(num // 10)  # 987

# Example 3: Ratio calculation
a = 17
b = 3
print("floor division =", a // b)
print("exact division =", a / b)`}
        />

        <div className="p-4 rounded-xl bg-slate-800 text-slate-300 text-sm">
          <strong>Teacher’s Tip:</strong>  
          Use <code>%</code> and <code>//</code> together in loops, recursion, 
          and number system conversions (decimal → binary, octal, etc.).
        </div>
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          4. Exponentiation (**)
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          4. Exponentiation (**)
        </h2>

        <p className="text-sm text-slate-300">
          Python’s power operator <code>**</code> is powerful and fast.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print(2 ** 3)     # 8
print(5 ** 2)     # 25
print(10 ** 0)    # 1
print(2 ** 10)    # 1024`}
        />
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          5. Combining Operators
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          5. Combining Arithmetic Operators
        </h2>

        <EditablePythonCodeBlock
          initialCode={`x = 10
y = 3

result = (x + y) * (x - y) / y
print(result)`}
        />

        <div className="p-4 rounded-xl bg-slate-800 text-slate-300 text-sm">
          <strong>Point to Remember:</strong>  
          Parentheses <code>()</code> change the natural precedence of operators.  
          When in doubt, use parentheses!
        </div>
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          6. Real-Life Examples
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          6. Real-Life Use Cases
        </h2>

        <EditablePythonCodeBlock
          initialCode={`# EMI calculation (very simplified)
p = 10000    # principal
r = 10       # rate
t = 2        # years

interest = (p * r * t) / 100
print("Interest =", interest)

# Splitting items equally
items = 37
persons = 5
print("Items per person =", items // persons)
print("Remaining items =", items % persons)`}
        />
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          Summary
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="p-4 bg-slate-800 rounded-xl text-slate-300 text-sm">
        <h2 className="font-semibold text-slate-200 mb-2">Summary</h2>

        <ul className="list-disc ml-6 space-y-1">
          <li>Arithmetic operators help perform mathematical calculations.</li>
          <li><code>//</code> gives integer output; <code>/</code> gives float output.</li>
          <li><code>%</code> is useful for digit extraction and cycles.</li>
          <li><code>**</code> is used for powers and exponential calculations.</li>
          <li>Use parentheses to avoid confusion in complex expressions.</li>
        </ul>
      </section>

    </div>
  );
}
