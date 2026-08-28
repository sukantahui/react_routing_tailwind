import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Types of Errors: Syntax, Runtime & Logical Errors
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Errors occur in every program. A good JavaScript developer—and every
            student at <strong>Coder & AccoTax, Barrackpore</strong>—must learn
            to recognise the category of an error before solving it.
            Teachers like <strong>Sukanta Hui</strong> always tell students like
            Ritaja, Mounita and Devangshu that understanding errors is the first
            step toward debugging mastery.
          </p>

          {/* SYNTAX ERRORS */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-2">
              1. Syntax Errors
            </h2>

            <p className="text-slate-300 text-sm mb-3">
              These errors occur when the code breaks JavaScript grammar rules.
              The browser <strong>does not run</strong> the script until the syntax
              is fixed.
            </p>

            <CodeBlock
              language="javascript"
              code={`
// Missing parenthesis → SyntaxError
console.log("Welcome to Coder & AccoTax"; 
              `}
            />

            <p className="text-slate-400 text-xs mt-2">
              Syntax errors are the easiest to detect because the interpreter
              points directly to the mistake.
            </p>
          </section>

          {/* RUNTIME ERRORS */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-2">
              2. Runtime Errors
            </h2>

            <p className="text-slate-300 text-sm mb-3">
              These happen while the program is running. The code is syntactically
              valid, but something unexpected happens.
            </p>

            <CodeBlock
              language="javascript"
              code={`
// Trying to access something that doesn't exist → Runtime Error
let student;
console.log(student.name); // ❌ Cannot read properties of undefined
              `}
            />

            <p className="text-slate-400 text-xs mt-2">
              Runtime errors are common among beginners like Swadeep or Kaustav
              when they forget to initialise variables.
            </p>
          </section>

          {/* LOGICAL ERRORS */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-2">
              3. Logical Errors
            </h2>

            <p className="text-slate-300 text-sm mb-3">
              These are the most tricky. The program <em>runs successfully</em>,
              but the output is incorrect due to flawed logic.
            </p>

            <CodeBlock
              language="javascript"
              code={`
// Logical mistake: wrong operator used
function calculateTotal(marks1, marks2) {
  return marks1 - marks2; // ❌ wrong
}

console.log(calculateTotal(80, 20)); 
// Output: 60 (Expected: 100)
              `}
            />

            <p className="text-slate-400 text-xs mt-2">
              Logical bugs require thinking, analysing and testing—something
              improved through practice and guidance by teachers like Tanusree Hui
              and Chandan Das.
            </p>
          </section>

          {/* SUMMARY CARD */}
          <section className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-2">Key Differences</h2>

            <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
              <li><strong>Syntax Error</strong>: Code cannot start running.</li>
              <li><strong>Runtime Error</strong>: Code starts but crashes midway.</li>
              <li><strong>Logical Error</strong>: Code runs fully but gives wrong output.</li>
            </ul>
          </section>

        </div>
      </div>
    );
  }
}
