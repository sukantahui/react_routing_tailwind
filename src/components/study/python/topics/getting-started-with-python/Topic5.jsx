import React from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default function Topic5() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold text-sky-300">
        print() Function and First Python Program
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        The <code>print()</code> function displays output on the screen. It is the first
        function every Python programmer learns.
      </p>

      {/* First Program */}
      <section>
        <h3 className="text-lg text-slate-200 font-semibold">Your First Program</h3>

        <EditablePythonCodeBlock
          initialCode={`print("Hello, Python!")`}
        />
      </section>

      {/* Printing Variables */}
      <section>
        <h3 className="text-lg text-slate-200 font-semibold">Printing Variables</h3>

        <EditablePythonCodeBlock
          initialCode={`name = "Sukanta Hui"
course = "Python"

print("Student:", name)
print("Course:", course)`}
        />
      </section>

      {/* Multiple Values */}
      <section>
        <h3 className="text-lg text-slate-200 font-semibold">Printing Multiple Values</h3>

        <EditablePythonCodeBlock
          initialCode={`print("Sum =", 5 + 3)`}
        />
      </section>

      {/* Teachers Tips */}
      <section className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
        <h3 className="text-sky-300 text-lg font-semibold">Teacher’s Tips</h3>
        <ul className="list-disc text-slate-300 text-sm ml-6 mt-2 space-y-1">
          <li>You can print numbers, text, variables, expressions.</li>
          <li>Use print() often while learning — it helps understand program flow.</li>
          <li>Every big program starts with small print() tests.</li>
        </ul>
      </section>
    </div>
  );
}
