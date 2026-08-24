
import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-14">

        {/* ================= HEADER ================= */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-sky-300">
            Topic 2: Loop Control Statements in Python
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Loop control statements are used to change the normal execution
            flow of loops. Python provides <code>break</code>,
            <code>continue</code>, and <code>pass</code> for this purpose.
          </p>
        </div>

        {/* ================= BREAK ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            1. break Statement
          </h3>

          <p className="text-slate-300 text-sm">
            The <code>break</code> statement is used to <strong>terminate the loop
            immediately</strong> when a condition is met.
          </p>

          <p className="text-slate-400 text-sm font-mono">Syntax:</p>
          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`for/while condition:
    if condition:
        break`}
          </pre>

          {/* SVG Diagram */}
          <svg width="340" height="140">
            <rect x="20" y="20" width="130" height="40" fill="#1e293b" />
            <text x="35" y="45" fill="#38bdf8">Loop Running</text>
            <line x1="85" y1="60" x2="85" y2="100" stroke="#94a3b8" />
            <text x="30" y="120" fill="#ef4444">break → Exit Loop</text>
          </svg>

          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 10):
    if i == 5:
        break
    print(i)`}
          />

          <EditablePythonCodeBlock
            initialCode={`num = 1
while True:
    if num > 3:
        break
    print(num)
    num += 1`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            <code>break</code> is often used in menu-driven programs to exit
            infinite loops.
          </div>
        </section>

        {/* ================= CONTINUE ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            2. continue Statement
          </h3>

          <p className="text-slate-300 text-sm">
            The <code>continue</code> statement skips the <strong>current iteration</strong>
            and moves to the next loop cycle.
          </p>

          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`for/while condition:
    if condition:
        continue`}
          </pre>

          {/* SVG Diagram */}
          <svg width="340" height="140">
            <rect x="20" y="20" width="150" height="40" fill="#1e293b" />
            <text x="35" y="45" fill="#38bdf8">Iteration Skipped</text>
            <line x1="95" y1="60" x2="200" y2="60" stroke="#22c55e" />
            <text x="180" y="55" fill="#22c55e">Next Loop</text>
          </svg>

          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 6):
    if i == 3:
        continue
    print(i)`}
          />

          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 11):
    if i % 2 == 0:
        continue
    print("Odd:", i)`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            <code>continue</code> does NOT stop the loop, it only skips one iteration.
          </div>
        </section>

        {/* ================= PASS ================= */}
        <section className="space-y-6">
          <h3 className="text-xl font-semibold text-indigo-300">
            3. pass Statement
          </h3>

          <p className="text-slate-300 text-sm">
            The <code>pass</code> statement is a <strong>null statement</strong>.
            It does nothing and is used as a placeholder.
          </p>

          <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
{`for/while condition:
    pass`}
          </pre>

          {/* SVG Diagram */}
          <svg width="320" height="120">
            <rect x="20" y="30" width="180" height="40" fill="#1e293b" />
            <text x="35" y="55" fill="#94a3b8">
              pass → No Operation
            </text>
          </svg>

          <EditablePythonCodeBlock
            initialCode={`for i in range(1, 4):
    if i == 2:
        pass
    print(i)`}
          />

          <EditablePythonCodeBlock
            initialCode={`if True:
    pass
print("Program continues")`}
          />

          <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
            <strong>👩‍🏫 Teacher Note:</strong>  
            <code>pass</code> is useful when writing program structure before
            implementing logic.
          </div>
        </section>

      </div>
    );
  }
}
