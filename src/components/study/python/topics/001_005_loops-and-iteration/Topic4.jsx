import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-sky-300">
            Topic 4: Pattern Printing in Python
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Pattern printing problems are used to test a student’s understanding
            of <strong>loops, nested loops, spacing, and logic building</strong>.
            These problems are very common in school and competitive exams.
          </p>
        </div>

        {/* ================= BASIC STAR PATTERN ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            1. Basic Star Pattern (Increasing Triangle)
          </h3>

          <p className="text-slate-300 text-sm">
            This pattern prints stars in increasing order using a loop.
          </p>

          <p className="text-slate-400 text-sm font-mono">Pattern:</p>
          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`*
**
***
****
*****`}
          </pre>

          <p className="text-slate-400 text-sm font-mono">Syntax Logic:</p>
          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`for row in range(1, n+1):
    print("*" * row)`}
          </pre>

          {/* SVG */}
          <svg width="360" height="140">
            <rect x="20" y="20" width="150" height="40" fill="#1e293b" />
            <text x="35" y="45" fill="#38bdf8">Rows Increase</text>
            <line x1="95" y1="60" x2="95" y2="110" stroke="#22c55e" />
            <text x="40" y="130" fill="#22c55e">Stars Increase</text>
          </svg>

          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 6):
    print("*" * i)`}
          />

          <EditablePythonCodeBlock
            initialCode={`n = 4
for i in range(1, n + 1):
    print("*" * i)`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            This is the most basic pattern and the foundation for all other patterns.
          </div>
        </section>

        {/* ================= REVERSE STAR PATTERN ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            2. Reverse Star Pattern (Decreasing Triangle)
          </h3>

          <p className="text-slate-300 text-sm">
            This pattern prints stars in decreasing order.
          </p>

          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`*****
****
***
**
*`}
          </pre>

          <EditablePythonCodeBlock
            initialCode={`for i in range(5, 0, -1):
    print("*" * i)`}
          />

          <EditablePythonCodeBlock
            initialCode={`n = 4
for i in range(n, 0, -1):
    print("*" * i)`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            Reverse patterns are usually created by looping backwards.
          </div>
        </section>

        {/* ================= NUMBER PATTERN ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            3. Number Pattern
          </h3>

          <p className="text-slate-300 text-sm">
            Number patterns are created using nested loops or string repetition.
          </p>

          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`1
12
123
1234`}
          </pre>

          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 5):
    for j in range(1, i + 1):
        print(j, end="")
    print()`}
          />

          <EditablePythonCodeBlock
            initialCode={`n = 4
for i in range(1, n + 1):
    print("".join(str(j) for j in range(1, i + 1)))`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            Nested loops are essential for number-based patterns.
          </div>
        </section>

        {/* ================= PYRAMID PATTERN ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            4. Pyramid Star Pattern
          </h3>

          <p className="text-slate-300 text-sm">
            Pyramid patterns require correct handling of spaces and stars.
          </p>

          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`    *
   ***
  *****
 *******
*********`}
          </pre>

          <EditablePythonCodeBlock
            initialCode={`n = 5
for i in range(1, n + 1):
    print(" " * (n - i) + "*" * (2 * i - 1))`}
          />

          <EditablePythonCodeBlock
            initialCode={`rows = 4
for i in range(rows):
    spaces = rows - i - 1
    stars = 2 * i + 1
    print(" " * spaces + "*" * stars)`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            Pyramid patterns test logic, spacing, and loop control together.
          </div>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            5. Common Mistakes in Pattern Programs
          </h3>

          <EditablePythonCodeBlock
            initialCode={`# Missing print() for new line
for i in range(1, 4):
    for j in range(1, i + 1):
        print("*", end="")`}
          />

          <EditablePythonCodeBlock
            initialCode={`# Wrong space calculation
n = 4
for i in range(1, n + 1):
    print(" " * i + "*" * (2 * i - 1))`}
          />

          <div className="bg-red-900/30 border-l-4 border-red-400 p-3 text-sm text-red-200">
            <strong>⚠ Teacher Warning:</strong>  
            Forgetting <code>print()</code> for a new line is the most common
            mistake in pattern questions.
          </div>
        </section>

      </div>
    );
  }
}
