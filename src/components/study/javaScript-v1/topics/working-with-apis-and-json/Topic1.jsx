import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          Parsing &amp; Stringifying JSON (JSON.parse &amp; JSON.stringify)
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          In JavaScript, we use two main methods to work with JSON:
        </p>

        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li>
            <code>JSON.parse()</code> – convert JSON <strong>string</strong> →{" "}
            JavaScript object.
          </li>
          <li>
            <code>JSON.stringify()</code> – convert JavaScript{" "}
            <strong>object</strong> → JSON string.
          </li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-200">
          1. JSON.parse – String to Object
        </h3>

        <CodeBlock
          language="javascript"
          code={`const jsonText = \`
{
  "name": "Kaustav",
  "course": "JavaScript",
  "centre": "Coder & AccoTax"
}
\`;

const student = JSON.parse(jsonText);

console.log(student.name);   // "Kaustav"
console.log(student.centre); // "Coder & AccoTax"`}
        />

        <p className="text-slate-400 text-sm">
          If the JSON string is invalid (wrong quotes, trailing comma, etc.),
          <code>JSON.parse</code> will throw an error.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          2. JSON.stringify – Object to String
        </h3>

        <CodeBlock
          language="javascript"
          code={`const result = {
  name: "Pranjali",
  batch: "Frontend-Pro",
  marks: { js: 90, es6: 94 }
};

const jsonText = JSON.stringify(result);

console.log(jsonText);
/*
Output is a JSON string:
"{\\"name\\":\\"Pranjali\\",\\"batch\\":\\"Frontend-Pro\\",\\"marks\\":{\\"js\\":90,\\"es6\\":94}}"
*/`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          3. Pretty Printing JSON
        </h3>

        <p className="text-slate-300 text-sm">
          You can pass extra arguments to <code>JSON.stringify</code> to format
          the JSON nicely (useful when saving to a file or showing on screen).
        </p>

        <CodeBlock
          language="javascript"
          code={`const pretty = JSON.stringify(result, null, 2);
console.log(pretty);

/*
{
  "name": "Pranjali",
  "batch": "Frontend-Pro",
  "marks": {
    "js": 90,
    "es6": 94
  }
}
*/`}
        />

        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h4 className="text-sm font-semibold text-slate-100">
            Use Cases in Coder &amp; AccoTax Projects
          </h4>
          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Saving quiz results for students like Ritaja or Susmita.</li>
            <li>Storing settings in localStorage as JSON strings.</li>
            <li>Sending student data to a backend API.</li>
          </ul>
        </section>
      </div>
    );
  }
}
