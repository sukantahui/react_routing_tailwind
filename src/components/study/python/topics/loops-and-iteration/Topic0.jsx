import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default class TopicX extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-sky-300">
            Loops & Control Flow in Python
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Loops allow us to repeat a block of code multiple times.
            Python provides <code>while</code> and <code>for</code> loops along with
            control statements like <code>break</code>, <code>continue</code>, and
            <code>pass</code>.
          </p>
        </div>

        {/* ================= WHILE LOOP ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            1. while Loop
          </h3>

          <p className="text-slate-300 text-sm">
            A <code>while</code> loop executes as long as a given condition remains
            <strong> True</strong>.
          </p>

          <p className="text-slate-400 text-sm font-mono">
            Syntax:
          </p>

          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`while condition:
    statements`}
          </pre>

          {/* SVG */}
          <svg width="300" height="120">
            <rect x="20" y="20" width="120" height="40" fill="#1e293b" />
            <text x="30" y="45" fill="#38bdf8">Condition</text>
            <line x1="80" y1="60" x2="80" y2="100" stroke="#94a3b8" />
            <text x="40" y="110" fill="#22c55e">Loop Body</text>
          </svg>

          <EditablePythonCodeBlock
            initialCode={`i = 1
while i <= 5:
    print(i)
    i += 1`}
          />

          <EditablePythonCodeBlock
            initialCode={`num = 5
while num > 0:
    print("Countdown:", num)
    num -= 1`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            Always update the loop variable. Otherwise, the loop may become
            an infinite loop.
          </div>
        </section>

        {/* ================= FOR LOOP ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            2. for Loop with range()
          </h3>

          <p className="text-slate-300 text-sm">
            A <code>for</code> loop iterates over a sequence such as a list,
            string, or range.
          </p>

          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`for variable in range(start, stop, step):
    statements`}
          </pre>

          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 6):
    print(i)`}
          />

          <EditablePythonCodeBlock
            initialCode={`for i in range(2, 11, 2):
    print(i)`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            The <code>stop</code> value in <code>range()</code> is always excluded.
          </div>
        </section>

        {/* ================= LOOP CONTROL ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            3. Loop Control Statements
          </h3>

          <h4 className="text-lg text-sky-300">break</h4>
          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 10):
    if i == 5:
        break
    print(i)`}
          />

          <h4 className="text-lg text-sky-300">continue</h4>
          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 6):
    if i == 3:
        continue
    print(i)`}
          />

          <h4 className="text-lg text-sky-300">pass</h4>
          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 4):
    if i == 2:
        pass
    print(i)`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            <code>pass</code> does nothing — it is used as a placeholder.
          </div>
        </section>

        {/* ================= NESTED LOOPS ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            4. Nested Loops
          </h3>

          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 4):
    for j in range(1, 4):
        print(i, j)`}
          />

          <EditablePythonCodeBlock
            initialCode={`for i in range(3):
    for j in range(i + 1):
        print("*", end="")
    print()`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            Inner loop completes all iterations for each outer loop cycle.
          </div>
        </section>

        {/* ================= PATTERN PRINTING ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            5. Pattern Printing
          </h3>

          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 6):
    print("*" * i)`}
          />

          <EditablePythonCodeBlock
            initialCode={`for i in range(5, 0, -1):
    print("*" * i)`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            Pattern questions improve loop logic and are common in exams.
          </div>
        </section>

        {/* ================= MENU PROGRAM ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            6. Simple Menu-Driven Program
          </h3>

          <EditablePythonCodeBlock
            initialCode={`while True:
    print("1. Add")
    print("2. Subtract")
    print("3. Exit")

    choice = int(input("Enter choice: "))

    if choice == 1:
        a = int(input("A: "))
        b = int(input("B: "))
        print("Sum =", a + b)
    elif choice == 2:
        a = int(input("A: "))
        b = int(input("B: "))
        print("Difference =", a - b)
    elif choice == 3:
        break
    else:
        print("Invalid choice")`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            Menu-driven programs combine loops and conditional logic and are
            very important for practical exams.
          </div>
        </section>

      </div>
    );
  }
}
