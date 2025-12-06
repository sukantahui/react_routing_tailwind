import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h1 className="text-2xl font-bold text-sky-300">
        Python Core Data Types, Type Casting, Input & Output Formatting
      </h1>

      <p className="text-slate-300 text-sm leading-relaxed">
        In this topic, we explore the foundation of Python's dynamic data system:
        integers, floats, strings, booleans, and how Python converts between these
        types. You will also learn how to accept user input and how to control
        output formatting using <code>sep</code> and <code>end</code>.
      </p>

      {/* ===============================================================
          SECTION 1 — CORE DATA TYPES
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">1. Core Data Types in Python</h2>

        <p className="text-slate-300 text-sm">
          Python supports multiple built-in data types. The most essential types for beginners are:
        </p>

        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-1">
          <li><b>int</b> — whole numbers (10, −3, 0)</li>
          <li><b>float</b> — decimal numbers (3.14, −0.45)</li>
          <li><b>str</b> — text data ("Hello", "123")</li>
          <li><b>bool</b> — logical values (True, False)</li>
        </ul>

        <EditablePythonCodeBlock
          initialCode={`a = 10          # int
b = 3.14        # float
c = "Python"    # str
d = True        # bool

print(type(a))
print(type(b))
print(type(c))
print(type(d))`}
        />
      </section>

      {/* ===============================================================
          SECTION 2 — TYPE CASTING (int(), float(), str(), bool())
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">2. Type Casting (Converting Data Types)</h2>

        <p className="text-slate-300 text-sm">
          Python allows converting from one type to another. This is known as <b>type casting</b>.
        </p>

        <EditablePythonCodeBlock
          initialCode={`x = "20"
num = int(x)     # "20" → 20

y = 3.99
val = int(y)     # 3.99 → 3 (decimal removed)

s = str(100)     # 100 → "100"

flag = bool(5)   # True (non-zero value converts to True)

print(num, val, s, flag)`}
        />

        <p className="text-slate-300 text-sm">
          ⚠️ Important: <code>int("hello")</code> will cause an error because the string cannot be converted.
        </p>
      </section>

      {/* ===============================================================
          SECTION 3 — INPUT USING input()
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">3. Getting User Input Using input()</h2>

        <p className="text-slate-300 text-sm">
          The <code>input()</code> function always returns a <b>string</b>.  
          You must convert it if you want numeric data.
        </p>

        <EditablePythonCodeBlock
          initialCode={`name = input("Enter your name: ")
age = int(input("Enter your age: "))

print("Hello", name)
print("Your age after 10 years:", age + 10)`}
        />
      </section>

      {/* ===============================================================
          SECTION 4 — print() Formatting (sep, end)
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">4. print() Formatting — sep and end</h2>

        <p className="text-slate-300 text-sm">
          Python’s <code>print()</code> offers two useful formatting options:
        </p>

        <ul className="list-disc ml-6 text-slate-300 text-sm">
          <li><b>sep</b> → controls how multiple values are separated</li>
          <li><b>end</b> → controls what is printed at the end</li>
        </ul>

        <EditablePythonCodeBlock
          initialCode={`print("A", "B", "C", sep="-")
# Output: A-B-C

print("Hello", end=" ")
print("World!")
# Output: Hello World!`}
        />
      </section>

      {/* ===============================================================
          SECTION 5 — COMBINED EXAMPLE
      =============================================================== */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-200">5. Combined Example</h2>

        <EditablePythonCodeBlock
          initialCode={`name = input("Enter your name: ")
marks1 = float(input("Enter marks in Test 1: "))
marks2 = float(input("Enter marks in Test 2: "))

total = marks1 + marks2
average = total / 2

print("Student:", name)
print("Total Marks =", total)
print("Average =", average)`}
        />
      </section>

      {/* ===============================================================
          SECTION 6 — Teacher Tips
      =============================================================== */}
      <section className="bg-slate-800/40 p-5 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 font-semibold text-lg">Teacher’s Tips</h3>
        <ul className="list-disc ml-6 text-slate-300 text-sm space-y-2 mt-2">
          <li>
            Always convert <code>input()</code> values to the required type before using them.
          </li>
          <li>
            Use <code>type()</code> often to understand what type your variables hold.
          </li>
          <li>
            <code>sep</code> is great for clean output formatting in tables or reports.
          </li>
          <li>
            <code>end</code> is useful when printing on the same line.
          </li>
          <li>
            Practice type casting with different values to build strong fundamentals.
          </li>
        </ul>
      </section>

    </div>
  );
}
