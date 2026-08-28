import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Template Literals — Interpolation & Multi-line Strings (ES6)
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Template literals, introduced in ES6, make string handling more powerful and easier to read.  
          They allow variable interpolation, multi-line strings, embedded expressions, and more —  
          features widely used in all modern JavaScript projects taught at Coder & AccoTax.
        </p>


        {/* --------------------------------------------------------
            1. BASIC STRING INTERPOLATION
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. Basic Interpolation Using ${`{ }`}
        </h3>

        <p className="text-slate-300 text-sm">
          You can insert variables inside strings using <strong>${`{ }`}</strong>.
        </p>

        <CodeBlock
          language="javascript"
          code={`const name = "Ritaja";
const course = "JavaScript";

const message = \`Hello \${name}, welcome to the \${course} course!\`;

console.log(message);
// Hello Ritaja, welcome to the JavaScript course!`}
        />

        <p className="text-slate-400 text-sm">
          No string concatenation needed.
        </p>


        {/* --------------------------------------------------------
            2. MULTI-LINE STRINGS
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. Multi-Line Strings Without <code>\\n</code>
        </h3>

        <p className="text-slate-300 text-sm">
          Template literals allow multi-line text easily.
        </p>

        <CodeBlock
          language="javascript"
          code={`const description = \`
Coder & AccoTax
Barrackpore
Advanced JavaScript Sessions
\`;

console.log(description);`}
        />


        {/* --------------------------------------------------------
            3. STRING CONCATENATION (OLD WAY vs NEW WAY)
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. Old Way vs Modern ES6 Way
        </h3>

        <CodeBlock
          language="javascript"
          code={`// OLD WAY (confusing)
const student = "Mounita";
const oldMsg = "Welcome " + student + " to Coder & AccoTax!";
console.log(oldMsg);

// MODERN WAY
const newMsg = \`Welcome \${student} to Coder & AccoTax!\`;
console.log(newMsg);`}
        />


        {/* --------------------------------------------------------
            4. EMBED EXPRESSIONS (MATH, FUNCTION CALLS)
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          4. Embed Expressions Inside Strings
        </h3>

        <p className="text-slate-300 text-sm">
          Any JavaScript expression can be written inside <strong>${`{ }`}</strong>.
        </p>

        <CodeBlock
          language="javascript"
          code={`const a = 10;
const b = 20;

console.log(\`Sum = \${a + b}\`);   // Sum = 30

function greet(name) {
  return \`Hello \${name}\`;
}
console.log(\`\${greet("Devangshu")}!\`);`}
        />


        {/* --------------------------------------------------------
            5. TEMPLATE LITERALS WITH ARRAY OR OBJECT DATA
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          5. Using Template Literals with Arrays/Objects
        </h3>

        <CodeBlock
          language="javascript"
          code={`const student = {
  name: "Susmita",
  score: 92
};

const result = \`\${student.name} scored \${student.score} marks.\`;

console.log(result);`}
        />


        {/* --------------------------------------------------------
            6. TAGGED TEMPLATES (ADVANCED)
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          6. Tagged Template Literals (Advanced Feature)
        </h3>

        <p className="text-slate-300 text-sm">
          Tagged templates allow modifying how template literals work.  
          This is advanced — used in libraries like styled-components.
        </p>

        <CodeBlock
          language="javascript"
          code={`function highlight(strings, ...values) {
  return strings.reduce((final, str, i) => {
    return final + str + (values[i] ? values[i].toUpperCase() : "");
  }, "");
}

const name = "Kaustav";

console.log(highlight\`Hello \${name}, welcome!\`);
// Output: Hello KAUSTAV, welcome!`}
        />


        {/* --------------------------------------------------------
            SUMMARY BOX
        --------------------------------------------------------- */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li>Use backticks (` `) to create template literals</li>
            <li>Insert variables using ${`{variable}`}</li>
            <li>Create multi-line strings without <code>\\n</code></li>
            <li>Embed expressions and function calls</li>
            <li>Advanced: Tagged templates modify output</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            Template literals simplify string work and make modern JS much cleaner.
          </p>
        </section>

      </div>
    );
  }
}
