import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Reading & Understanding Common Error Messages
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            When students at <strong>Coder & AccoTax, Barrackpore</strong> learn JavaScript,
            one of the MOST important skills they develop is understanding error messages.
            Teachers like <strong>Sukanta Hui</strong> always remind students like Ritaja,
            Mounita and Kaustav:
            <br />
            <em>“Always read the error first — it tells you exactly what went wrong.”</em>
          </p>

          {/* SECTION 1 */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-3">
              1. ReferenceError — Variable Not Found
            </h2>

            <p className="text-slate-300 text-sm mb-3">
              This error means JavaScript cannot find a variable you used.
            </p>

            <CodeBlock
              language="javascript"
              code={`console.log(studentName); 
// ❌ ReferenceError: studentName is not defined
`}
            />

            <p className="text-slate-400 text-xs mt-2">
              This happens often when beginners forget to declare a variable.
            </p>
          </section>

          {/* SECTION 2 */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-3">
              2. TypeError — Wrong Operation on Wrong Type
            </h2>

            <p className="text-slate-300 text-sm mb-3">
              A <strong>TypeError</strong> occurs when you try to use a function on an invalid type.
            </p>

            <CodeBlock
              language="javascript"
              code={`let marks = null;
marks.toUpperCase();  
// ❌ TypeError: marks.toUpperCase is not a function
`}
            />

            <p className="text-slate-400 text-xs">
              The error message tells you <strong>exactly</strong> which method is invalid.
            </p>
          </section>

          {/* SECTION 3 */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-3">
              3. Cannot read properties of undefined
            </h2>

            <p className="text-slate-300 text-sm mb-3">
              One of the MOST common errors students like Devangshu and Susmita face.
            </p>

            <CodeBlock
              language="javascript"
              code={`let student = undefined;
console.log(student.name);
// ❌ TypeError: Cannot read properties of undefined (reading 'name')
`}
            />

            <p className="text-slate-400 text-xs">
              Means: <em>You tried to access a property on something that does not exist.</em>
            </p>
          </section>

          {/* SECTION 4 */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-3">
              4. SyntaxError — Grammar Mistakes
            </h2>

            <CodeBlock
              language="javascript"
              code={`if (marks > 40 {  
  console.log("Passed");
// ❌ SyntaxError: Unexpected token '{'
`}
            />

            <p className="text-slate-400 text-xs">
              Usually caused by missing parentheses, brackets or quotes.
            </p>
          </section>

          {/* SECTION 5 */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-3">
              5. Unexpected token — Wrong Symbol Used
            </h2>

            <CodeBlock
              language="javascript"
              code={`let student = {
  name: "Ritaja",
  age: 18,,  
};
// ❌ SyntaxError: Unexpected token ','
`}
            />

            <p className="text-slate-400 text-xs">
              This usually appears when there are extra commas or symbols.
            </p>
          </section>

          {/* SECTION 6 */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-3">
              6. Real Debugging Tip
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              At Coder & AccoTax, we teach students to:
            </p>

            <ul className="list-disc ml-5 text-slate-300 text-sm mt-2 space-y-1">
              <li>Read the error message line by line</li>
              <li>Check the file name & line number</li>
              <li>Identify the variable causing the issue</li>
              <li>Test with <code>console.log()</code> to isolate the issue</li>
            </ul>
          </section>

        </div>
      </div>
    );
  }
}
