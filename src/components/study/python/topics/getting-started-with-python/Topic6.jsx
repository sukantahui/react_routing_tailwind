import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic6() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-sky-300">
        Basic Debugging with print() Statements
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        Debugging means finding and fixing errors in your program. The simplest and most
        powerful debugging tool for beginners is the <code>print()</code> function.
      </p>

      {/* Debugging Example */}
      <section>
        <h3 className="text-lg text-slate-200 font-semibold">Why print debugging?</h3>

        <EditablePythonCodeBlock
          initialCode={`x = 10
y = 0

print("Before division: x =", x, ", y =", y)

# find error
result = x / y  # This will cause ZeroDivisionError

print("Result =", result)`}
        />
      </section>

      <p className="text-slate-400 text-sm">
        By printing values before the operation, you can identify the mistake.
      </p>

      {/* Tracking Program Flow */}
      <section>
        <h3 className="text-lg text-slate-200 font-semibold">Tracking Program Flow</h3>

        <EditablePythonCodeBlock
          initialCode={`print("Start Program")

for i in range(3):
    print("Loop iteration =", i)

print("End Program")`}
        />
      </section>

      {/* Teachers Tips */}
      <section className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 text-lg font-semibold">Teacher’s Tips</h3>
        <ul className="list-disc text-slate-300 text-sm ml-6 mt-2 space-y-1">
          <li>Use print() to verify values at different lines.</li>
          <li>Check loop indexes, conditions, and variable updates.</li>
          <li>Print debugging builds a strong understanding of program logic.</li>
          <li>Professional developers still use print() for quick tests!</li>
        </ul>
      </section>

    </div>
  );
}
