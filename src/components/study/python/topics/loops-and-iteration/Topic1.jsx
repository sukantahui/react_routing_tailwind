import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-sky-300">
            Topic 1: while Loop and for Loop in Python
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Loops are used to execute a block of code repeatedly.
            Python mainly provides <code>while</code> and <code>for</code> loops
            to perform repetitive tasks efficiently.
          </p>
        </div>

        {/* ================= WHILE LOOP ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            1. while Loop
          </h3>

          <p className="text-slate-300 text-sm">
            A <code>while</code> loop executes a block of code
            <strong> as long as the given condition is True</strong>.
          </p>

          <p className="text-slate-400 text-sm font-mono">Syntax:</p>
          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`while condition:
    statements`}
          </pre>

          {/* SVG Diagram */}
          <svg width="360" height="140">
            <rect x="20" y="20" width="150" height="40" fill="#1e293b" />
            <text x="35" y="45" fill="#38bdf8">Condition True?</text>
            <line x1="95" y1="60" x2="95" y2="100" stroke="#94a3b8" />
            <rect x="40" y="100" width="110" height="30" fill="#0f766e" />
            <text x="60" y="120" fill="#ffffff">Loop Body</text>
          </svg>

          {/* Examples */}
          <EditablePythonCodeBlock
            initialCode={`i = 1
while i <= 5:
    print(i)
    i += 1`}
          />

          <EditablePythonCodeBlock
            initialCode={`num = 10
while num > 0:
    print(num)
    num -= 2`}
          />

          <EditablePythonCodeBlock
            initialCode={`password = ""
while password != "python":
    password = input("Enter password: ")
print("Access granted")`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            Always ensure the loop condition eventually becomes False,
            otherwise an <strong>infinite loop</strong> will occur.
          </div>
        </section>

        {/* ================= FOR LOOP ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            2. for Loop with range()
          </h3>

          <p className="text-slate-300 text-sm">
            A <code>for</code> loop is used to iterate over a sequence.
            The <code>range()</code> function generates a sequence of numbers.
          </p>

          <p className="text-slate-400 text-sm font-mono">Syntax:</p>
          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`for variable in range(start, stop, step):
    statements`}
          </pre>

          {/* SVG Diagram */}
          <svg width="360" height="140">
            <rect x="20" y="20" width="140" height="40" fill="#1e293b" />
            <text x="35" y="45" fill="#38bdf8">range()</text>
            <line x1="90" y1="60" x2="220" y2="60" stroke="#22c55e" />
            <text x="190" y="55" fill="#22c55e">Iteration</text>
          </svg>

          {/* Examples */}
          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 6):
    print(i)`}
          />

          <EditablePythonCodeBlock
            initialCode={`for i in range(2, 11, 2):
    print("Even:", i)`}
          />

          <EditablePythonCodeBlock
            initialCode={`for i in range(5, 0, -1):
    print(i)`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            The <code>stop</code> value in <code>range()</code> is always excluded.
            This is a very common exam question.
          </div>
        </section>

      </div>
    );
  }
}
