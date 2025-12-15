import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-sky-300">
            Topic 3: Nested Loops in Python
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            A <strong>nested loop</strong> means a loop placed inside another loop.
            The inner loop runs completely for every iteration of the outer loop.
            Nested loops are widely used in pattern printing, tables, and matrix-based problems.
          </p>
        </div>

        {/* ================= CONCEPT ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            1. What is a Nested Loop?
          </h3>

          <p className="text-slate-300 text-sm">
            When one loop is written inside another loop, it is called a nested loop.
          </p>

          <p className="text-slate-400 text-sm font-mono">General Syntax:</p>
          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`for outer in sequence:
    for inner in sequence:
        statements`}
          </pre>

          {/* SVG Diagram */}
          <svg width="420" height="160">
            <rect x="20" y="20" width="160" height="40" fill="#1e293b" />
            <text x="35" y="45" fill="#38bdf8">Outer Loop</text>

            <rect x="60" y="80" width="180" height="40" fill="#0f766e" />
            <text x="80" y="105" fill="#ffffff">Inner Loop (runs fully)</text>

            <line x1="100" y1="60" x2="140" y2="80" stroke="#94a3b8" />
          </svg>

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            If the outer loop runs <strong>m</strong> times and the inner loop runs
            <strong> n</strong> times, the total executions will be <strong>m × n</strong>.
          </div>
        </section>

        {/* ================= EXAMPLE 1 ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            2. Basic Nested for Loop
          </h3>

          <p className="text-slate-300 text-sm">
            This example shows how the inner loop runs completely for each
            iteration of the outer loop.
          </p>

          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 4):
    for j in range(1, 4):
        print(i, j)`}
          />

          <EditablePythonCodeBlock
            initialCode={`for row in range(1, 3):
    for col in range(1, 5):
        print(f"Row {row}, Col {col}")`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            The inner loop completes all its iterations before the outer loop
            moves to the next cycle.
          </div>
        </section>

        {/* ================= EXAMPLE 2 ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            3. Nested Loop with while and for
          </h3>

          <p className="text-slate-300 text-sm">
            Nested loops can be created using different types of loops together.
          </p>

          <EditablePythonCodeBlock
            initialCode={`i = 1
while i <= 3:
    j = 1
    while j <= 2:
        print("i =", i, "j =", j)
        j += 1
    i += 1`}
          />

          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 4):
    j = 1
    while j <= 3:
        print(i, j)
        j += 1`}
          />
        </section>

        {/* ================= MULTIPLICATION TABLE ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            4. Multiplication Table using Nested Loops
          </h3>

          <p className="text-slate-300 text-sm">
            Nested loops are commonly used to generate multiplication tables.
          </p>

          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 6):
    for j in range(1, 6):
        print(i * j, end=" ")
    print()`}
          />

          <EditablePythonCodeBlock
            initialCode={`num = 3
for i in range(1, 11):
    print(num, "x", i, "=", num * i)`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            Table and matrix problems almost always require nested loops.
          </div>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            5. Common Mistakes in Nested Loops
          </h3>

          <EditablePythonCodeBlock
            initialCode={`# Incorrect indentation causes logical errors
for i in range(1, 4):
    for j in range(1, 4):
        print(i)
    print(j)`}
          />

          <EditablePythonCodeBlock
            initialCode={`# Forgetting to reset inner loop variable
i = 1
while i <= 3:
    j = 1
    while j <= 3:
        print(i, j)
        j += 1
    i += 1`}
          />

          <div className="bg-red-900/30 border-l-4 border-red-400 p-3 text-sm text-red-200">
            <strong>⚠ Teacher Warning:</strong>  
            Wrong indentation and missing resets are the most common exam mistakes
            in nested loop programs.
          </div>
        </section>

      </div>
    );
  }
}
