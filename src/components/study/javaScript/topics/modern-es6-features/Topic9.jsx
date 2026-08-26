import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic9 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-sky-300">
          ES6 Modules — import & export
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          ES6 Modules allow you to split JavaScript code into multiple files and
          reuse them using <code>import</code> and <code>export</code>. This is
          how modern JavaScript projects are structured, including real projects
          built at <strong>Coder &amp; AccoTax, Barrackpore</strong>.
        </p>

        {/* 1. WHAT IS A MODULE */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. What is a Module?
        </h3>

        <p className="text-slate-300 text-sm">
          A module is simply a JavaScript file that can export values (functions,
          variables, classes) and import values from other files.
        </p>

        <CodeBlock
          language="javascript"
          code={`// file: mathUtils.js
export function add(a, b) {
  return a + b;
}

// file: main.js
import { add } from "./mathUtils.js";

console.log(add(10, 20)); // 30`}
        />

        {/* 2. NAMED EXPORTS */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. Named Exports
        </h3>

        <p className="text-slate-300 text-sm">
          You can export multiple things from one file using <strong>named
          exports</strong>.
        </p>

        <CodeBlock
          language="javascript"
          code={`// file: results.js

export const centreName = "Coder & AccoTax";
export const city = "Barrackpore";

export function getResult(name, marks) {
  return \`\${name} scored \${marks} marks.\`;
}`}
        />

        <CodeBlock
          language="javascript"
          code={`// file: app.js

import { centreName, city, getResult } from "./results.js";

console.log(centreName);          // Coder & AccoTax
console.log(city);                // Barrackpore
console.log(getResult("Ritaja", 92));`}
        />

        {/* 3. DEFAULT EXPORT */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. Default Export
        </h3>

        <p className="text-slate-300 text-sm">
          A file can have <strong>one default export</strong>, which is imported
          without curly braces.
        </p>

        <CodeBlock
          language="javascript"
          code={`// file: greet.js

export default function greet(name) {
  return \`Hello \${name}, welcome to Coder & AccoTax!\`;
}`}
        />

        <CodeBlock
          language="javascript"
          code={`// file: main.js

import greet from "./greet.js";

console.log(greet("Mounita"));`}
        />

        <p className="text-slate-400 text-sm">
          You can choose any name when importing a default export.
        </p>

        {/* 4. MIXING DEFAULT + NAMED EXPORTS */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          4. Mixing Default and Named Exports
        </h3>

        <CodeBlock
          language="javascript"
          code={`// file: studentService.js

export default function getStudentName() {
  return "Kaustav";
}

export function getBatch() {
  return "JS-2025";
}

export const centre = "Coder & AccoTax";`}
        />

        <CodeBlock
          language="javascript"
          code={`// file: main.js

import getStudentName, { getBatch, centre } from "./studentService.js";

console.log(getStudentName()); // Kaustav
console.log(getBatch());       // JS-2025
console.log(centre);           // Coder & AccoTax`}
        />

        {/* 5. RENAMING IMPORTS / EXPORTS */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          5. Renaming Imports (import ... as ...)
        </h3>

        <CodeBlock
          language="javascript"
          code={`// file: marks.js

export function total(m1, m2, m3) {
  return m1 + m2 + m3;
}

export function average(m1, m2, m3) {
  return total(m1, m2, m3) / 3;
}`}
        />

        <CodeBlock
          language="javascript"
          code={`// file: analysis.js

import { total as getTotal, average as getAverage } from "./marks.js";

console.log(getTotal(80, 85, 90));   // 255
console.log(getAverage(80, 85, 90)); // 85`}
        />

        {/* 6. IMPORT EVERYTHING AS AN OBJECT */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          6. Import Everything as a Single Object
        </h3>

        <CodeBlock
          language="javascript"
          code={`// file: utils.js

export function greet(name) {
  return \`Hello \${name}\`;
}

export const institute = "Coder & AccoTax";

export function add(a, b) {
  return a + b;
}`}
        />

        <CodeBlock
          language="javascript"
          code={`// file: main.js

import * as Utils from "./utils.js";

console.log(Utils.institute);          // Coder & AccoTax
console.log(Utils.greet("Susmita"));   // Hello Susmita
console.log(Utils.add(10, 20));        // 30`}
        />

        {/* 7. RE-EXPORTING FROM AN INDEX FILE */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          7. Re-exporting from an Index File (Barrel Pattern)
        </h3>

        <p className="text-slate-300 text-sm">
          For bigger projects, you often create an <code>index.js</code> file to 
          re-export everything from a folder.
        </p>

        <CodeBlock
          language="javascript"
          code={`// file: services/student.js
export function getStudentList() {
  return ["Ritaja", "Mounita", "Kaustav"];
}

// file: services/teacher.js
export function getTeacherList() {
  return ["Sukanta Hui", "Tanusree Hui", "Chandan Das"];
}

// file: services/index.js  (barrel file)
export * from "./student.js";
export * from "./teacher.js";`}
        />

        <CodeBlock
          language="javascript"
          code={`// file: app.js

import { getStudentList, getTeacherList } from "./services/index.js";

console.log(getStudentList());
console.log(getTeacherList());`}
        />

        {/* 8. BROWSER TIP */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          8. Using ES Modules in the Browser (Quick Demo)
        </h3>

        <p className="text-slate-300 text-sm">
          In plain HTML, you must use <code>type="module"</code> for ES6 imports to work.
        </p>

        <CodeBlock
          language="html"
          code={`<script type="module">
  import { greet } from "./greetModule.js";
  console.log(greet("Devangshu"));
</script>`}
        />

        {/* SUMMARY */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><code>export</code> / <code>import</code> lets you split code into modules</li>
            <li>Named exports use <code>{`{ }`}</code>, default exports do not</li>
            <li>You can rename imports with <code>as</code></li>
            <li><code>import * as obj</code> collects all exports in one object</li>
            <li>Modules help organise large codebases (classes, services, utilities)</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            ES6 Modules are the foundation of modern JavaScript structure in React, Node.js,
            and almost every professional JS project.
          </p>
        </section>
      </div>
    );
  }
}
