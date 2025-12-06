import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Assignment & Compound Assignment Operators
      </h1>

      <p className="text-slate-300 text-sm">
        Assignment operators store values inside variables. Python also provides 
        several compound assignment operators that combine arithmetic with 
        assignment, making code shorter, cleaner & efficient.
      </p>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          1. Basic Assignment (=)
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200">
          1. Basic Assignment Operator (=)
        </h2>

        <p className="text-slate-300 text-sm">
          It assigns the value on the right side to the variable on the left side.
        </p>

        <EditablePythonCodeBlock
          initialCode={`x = 10
y = 5
name = "Python"

print(x, y, name)`}
        />

        <div className="p-4 mt-3 bg-slate-800 rounded-xl text-sm text-slate-300">
          <strong>Note:</strong> Python assigns values dynamically — no need to declare data types.
        </div>
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          2. Compound Assignment Operators
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-200">
          2. Compound Assignment Operators
        </h2>

        <p className="text-slate-300 text-sm">
          These operators update a variable with an arithmetic operation + assignment.
        </p>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1 mt-2">
          <li><code>+=</code> → Add and assign</li>
          <li><code>-=</code> → Subtract and assign</li>
          <li><code>*=</code> → Multiply and assign</li>
          <li><code>/=</code> → Divide and assign</li>
          <li><code>//=</code> → Floor division and assign</li>
          <li><code>%=</code> → Modulus and assign</li>
          <li><code>**=</code> → Exponent and assign</li>
        </ul>

        <EditablePythonCodeBlock
          initialCode={`x = 10

x += 5   # x = x + 5
print("After += :", x)

x -= 3   # x = x - 3
print("After -= :", x)

x *= 2   # x = x * 2
print("After *= :", x)

x /= 4   # x = x / 4
print("After /= :", x)

x //= 2  # x = x // 2
print("After //= :", x)

x %= 3   # x = x % 3
print("After %= :", x)

x **= 4  # x = x ** 4
print("After **= :", x)`}
        />
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          3. Why use compound operators?
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          3. Why Use Compound Assignment?
        </h2>

        <p className="text-sm text-slate-300">
          They help make the code shorter, faster, and cleaner. Commonly used 
          in loops, counters, accumulators, and mathematical updates.
        </p>

        <EditablePythonCodeBlock
          initialCode={`# Example: Counting occurrences
count = 0

for _ in range(5):
    count += 1   # increment counter

print("Counter:", count)`}
        />

        <div className="p-4 bg-slate-800 rounded-xl text-slate-300 text-sm">
          <strong>Teacher’s Tip:</strong>  
          Compound assignment reduces errors and makes logic easier to follow in loops.
        </div>
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          4. Real-Life Example
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          4. Real-Life Example — Shopping Cart
        </h2>

        <EditablePythonCodeBlock
          initialCode={`# Updating cart total
total = 0

price1 = 250
price2 = 499
price3 = 199

total += price1
total += price2
total += price3

print("Final Bill:", total)`}
        />
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          5. Common Mistake
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200">
          5. A Common Mistake to Avoid
        </h2>

        <EditablePythonCodeBlock
          initialCode={`x = 10
# WRONG: x =+ 5 (interpreted as x = (+5))
x =+ 5
print(x)   # 5, not 15!`}
        />

        <div className="mt-3 bg-slate-800 p-4 rounded-xl text-slate-300 text-sm">
          <strong>Important:</strong> <code>x =+ 5</code> is NOT the same as <code>x += 5</code>.
        </div>
      </section>

      {/* ++++++++++++++++++++++++++++++++++++++++++++++
          SUMMARY
      ++++++++++++++++++++++++++++++++++++++++++++++ */}
      <section className="p-4 bg-slate-800 rounded-xl text-slate-300 text-sm">
        <h2 className="font-semibold text-slate-200 mb-2">Summary</h2>

        <ul className="list-disc ml-6 space-y-1">
          <li><code>=</code> assigns a value to a variable.</li>
          <li>Compound operators reduce repetition (e.g., <code>x += 5</code>).</li>
          <li>Common in loops, counters, accumulators.</li>
          <li><code>x =+ 5</code> is a common bug — avoid it!</li>
        </ul>
      </section>
    </div>
  );
}
