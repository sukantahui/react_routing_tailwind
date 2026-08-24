import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic5() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        String Concatenation & f-Strings in Python
      </h1>

      <p className="text-slate-300 text-sm">
        Python provides multiple ways to build strings. The most common and powerful
        method is using <strong>f-strings</strong>, introduced in Python 3.6.
      </p>

      {/* ✦ 1. String Concatenation */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          1. String Concatenation using <code>+</code>
        </h2>

        <p className="text-slate-300 text-sm">
          You can add (concatenate) two strings using the <code>+</code> operator.
        </p>

        <EditablePythonCodeBlock
          initialCode={`first = "Coder"
second = "AccoTax"
result = first + " & " + second
print(result)   # Coder & AccoTax`}
        />

        <p className="text-slate-400 text-sm">
          Note: <code>+</code> works only with strings.  
          Mixing numbers causes an error.
        </p>

        <EditablePythonCodeBlock
          initialCode={`name = "Python"
age = 33

# print(name + age)  # ❌ ERROR: cannot add string and integer

print(name + " is " + str(age) + " years old")  # ✔ Works using str()`}
        />
      </section>

      {/* ✦ 2. String Repetition */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          2. String Repetition using <code>*</code>
        </h2>

        <p className="text-slate-300 text-sm">
          You can repeat a string using the <code>*</code> operator.
        </p>

        <EditablePythonCodeBlock
          initialCode={`print("Hi! " * 3)
# Output: Hi! Hi! Hi!`}
        />
      </section>

      {/* ✦ 3. f-Strings (Fastest & Best Method) */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          3. f-Strings — The Modern Formatting Style
        </h2>

        <p className="text-slate-300 text-sm">
          f-Strings allow you to insert variables directly inside strings using <code>{`{}`}</code>.
        </p>

        <EditablePythonCodeBlock
          initialCode={`name = "Sukanta"
age = 47

print(f"My name is {name} and I am {age} years old.")`}
        />

        <p className="text-slate-300 text-sm">✔ Fastest  
✔ Most readable  
✔ Supports expressions inside {`{}`}</p>

        <EditablePythonCodeBlock
          initialCode={`a = 10
b = 5
print(f"Sum is {a + b}")`}
        />
      </section>

      {/* ✦ 4. Formatting Numbers with f-Strings */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          4. Formatting Numbers using f-Strings
        </h2>

        <EditablePythonCodeBlock
          initialCode={`pi = 3.14159265

print(f"Pi rounded to 2 decimals: {pi:.2f}")
print(f"Pi rounded to 4 decimals: {pi:.4f}")`}
        />

        <p className="text-slate-400 text-sm">
          <code>{`{pi:.2f}`}</code> → format pi to 2 decimal places.
        </p>
      </section>

      {/* ✦ 5. Using f-Strings for Alignment */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-200">
          5. Aligning Text with f-Strings
        </h2>

        <EditablePythonCodeBlock
          initialCode={`print(f"{'Python':>10}")  # Right aligned
print(f"{'Python':<10}")  # Left aligned
print(f"{'Python':^10}")  # Center aligned`}
        />
      </section>

      {/* ✦ 6. Multi-line f-Strings */}
      <section>
        <h2 className="text-xl font-semibold text-slate-200">
          6. Multi-line f-Strings
        </h2>

        <EditablePythonCodeBlock
          initialCode={`name = "Devangshu"
score = 92

message = f"""
Student: {name}
Score: {score}
Status: {'Pass' if score >= 40 else 'Fail'}
"""

print(message)`}
        />
      </section>

      {/* ✦ Common Mistakes */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-rose-300">
          Common Mistakes to Avoid
        </h2>

        <EditablePythonCodeBlock
          initialCode={`name = "Ritaja"

# ❌ Wrong — f missing
# print("Hello {name}")

# ✔ Correct
print(f"Hello {name}")`}
        />

        <EditablePythonCodeBlock
          initialCode={`a = 10
b = 20

# ❌ Wrong — cannot put quotes inside {}
# print(f"{a + "20"}")

# ✔ Correct
print(f"{a + b}")`}
        />

        <div className="p-4 bg-slate-800 rounded-xl text-slate-300 text-sm">
          <strong>Teacher's Tip:</strong>  
          f-Strings are evaluated at runtime, so you can put **any expression inside** <code>{`{}`}</code>.
        </div>
      </section>

      {/* SUMMARY */}
      <section className="p-4 bg-slate-800 rounded-xl text-slate-300 text-sm">
        <h2 className="font-semibold text-slate-100 mb-2">Summary</h2>

        <ul className="list-disc ml-6 space-y-1">
          <li>Use <code>+</code> for simple concatenation.</li>
          <li>Use <code>*</code> to repeat strings.</li>
          <li><strong>f-Strings are the best way</strong> to format strings.</li>
          <li>You can include expressions inside f-strings.</li>
          <li>f-Strings support number formatting & text alignment.</li>
        </ul>
      </section>

    </div>
  );
}
