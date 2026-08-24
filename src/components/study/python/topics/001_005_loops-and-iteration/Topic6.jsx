import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default class Topic6 extends Component {
    render() {
        return (
            <div className="space-y-14">

                {/* ================= HEADER ================= */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-sky-300">
                        Topic 6: Jump Statements in Python
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        <strong>Jump statements</strong> are used to change the normal flow
                        of program execution.
                        In Python, the commonly used jump statements are
                        <code> break</code>, <code>continue</code>, <code>pass</code>,
                        and <code>return</code>.
                    </p>
                </div>

                {/* ================= CONCEPT ================= */}
                <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-indigo-300">
                        1. What are Jump Statements?
                    </h3>

                    <p className="text-slate-300 text-sm">
                        Jump statements transfer control from one part of a program
                        to another part immediately.
                    </p>

                    <p className="text-slate-400 text-sm font-mono">General Idea:</p>
                    <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
                        {`statement executes
↓
control jumps to another location`}
                    </pre>

                    {/* SVG */}
                    <svg width="420" height="180" viewBox="0 0 420 180">
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto">
                                <path d="M0,0 L0,6 L9,3 z" fill="#94a3b8" />
                            </marker>
                        </defs>

                        <rect x="130" y="10" width="160" height="35" rx="6" fill="#1e293b" />
                        <text x="155" y="33" fill="#38bdf8">Function Start</text>

                        <line x1="210" y1="45" x2="210" y2="75" stroke="#94a3b8" marker-end="url(#arrow)" />

                        <rect x="120" y="75" width="180" height="40" rx="6" fill="#0f766e" />
                        <text x="150" y="100" fill="#ffffff">return value</text>

                        <line x1="210" y1="115" x2="360" y2="155" stroke="#22c55e" marker-end="url(#arrow)" />
                        <text x="250" y="160" fill="#22c55e">Exit Function</text>
                    </svg>




                    <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
                        <strong>👩‍🏫 Teacher Note:</strong>
                        Jump statements must be used carefully, otherwise program logic
                        may become confusing.
                    </div>
                </section>

                {/* ================= BREAK ================= */}
                <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-indigo-300">
                        2. break Statement
                    </h3>

                    <p className="text-slate-300 text-sm">
                        The <code>break</code> statement immediately terminates the loop
                        and transfers control outside the loop.
                    </p>

                    <p className="text-slate-400 text-sm font-mono">Syntax:</p>
                    <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
                        {`for/while condition:
    if condition:
        break`}
                    </pre>

                    <EditablePythonCodeBlock
                        initialCode={`for i in range(1, 10):
    if i == 6:
        break
    print(i)`}
                    />

                    <EditablePythonCodeBlock
                        initialCode={`while True:
    num = int(input("Enter number (0 to exit): "))
    if num == 0:
        break
    print("You entered:", num)`}
                    />

                    <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
                        <strong>👩‍🏫 Teacher Note:</strong>
                        <code>break</code> is most commonly used in menu-driven programs.
                    </div>
                </section>

                {/* ================= CONTINUE ================= */}
                <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-indigo-300">
                        3. continue Statement
                    </h3>

                    <p className="text-slate-300 text-sm">
                        The <code>continue</code> statement skips the current iteration
                        and jumps to the next iteration of the loop.
                    </p>

                    <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
                        {`for/while condition:
    if condition:
        continue`}
                    </pre>

                    <EditablePythonCodeBlock
                        initialCode={`for i in range(1, 8):
    if i == 4:
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
                        <code>continue</code> does not stop the loop, it only skips one cycle.
                    </div>
                </section>

                {/* ================= PASS ================= */}
                <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-indigo-300">
                        4. pass Statement
                    </h3>

                    <p className="text-slate-300 text-sm">
                        The <code>pass</code> statement is a null statement.
                        It is used when a statement is syntactically required but
                        no action is needed.
                    </p>

                    <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
                        {`if condition:
    pass`}
                    </pre>

                    <EditablePythonCodeBlock
                        initialCode={`for i in range(1, 5):
    if i == 3:
        pass
    print(i)`}
                    />

                    <EditablePythonCodeBlock
                        initialCode={`def future_function():
    pass

print("Function defined successfully")`}
                    />

                    <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
                        <strong>👩‍🏫 Teacher Note:</strong>
                        <code>pass</code> is mainly used during program planning and structure building.
                    </div>
                </section>

                {/* ================= RETURN ================= */}
                <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-indigo-300">
                        5. return Statement
                    </h3>

                    <p className="text-slate-300 text-sm">
                        The <code>return</code> statement is used to exit a function
                        and send a value back to the caller.
                    </p>

                    <pre className="bg-slate-900 p-4 rounded text-green-300 text-sm">
                        {`def function_name():
    return value`}
                    </pre>

                    <EditablePythonCodeBlock
                        initialCode={`def add(a, b):
    return a + b

result = add(3, 5)
print(result)`}
                    />

                    <EditablePythonCodeBlock
                        initialCode={`def check_even(n):
    if n % 2 == 0:
        return "Even"
    return "Odd"

print(check_even(7))`}
                    />

                    <div className="bg-yellow-900/30 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200">
                        <strong>👩‍🏫 Teacher Note:</strong>
                        Once <code>return</code> is executed, the function stops immediately.
                    </div>
                </section>

                {/* ================= COMMON MISTAKES ================= */}
                <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-indigo-300">
                        6. Common Mistakes with Jump Statements
                    </h3>

                    <EditablePythonCodeBlock
                        initialCode={`# break outside loop (ERROR)
if True:
    break`}
                    />

                    <EditablePythonCodeBlock
                        initialCode={`# Code after return never executes
def test():
    return 10
    print("Hello")`}
                    />

                    <div className="bg-red-900/30 border-l-4 border-red-400 p-3 text-sm text-red-200">
                        <strong>⚠ Teacher Warning:</strong>
                        <code>break</code> and <code>continue</code> can be used only inside loops,
                        while <code>return</code> can be used only inside functions.
                    </div>
                </section>

            </div>
        );
    }
}
