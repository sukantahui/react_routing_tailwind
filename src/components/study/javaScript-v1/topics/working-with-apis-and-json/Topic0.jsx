import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          What is JSON? Syntax and Common Patterns
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          JSON stands for <strong>JavaScript Object Notation</strong>. It is a
          lightweight text format used to send and store data between systems
          (browser ↔ server). Almost every modern API that you call from
          JavaScript returns data in JSON format.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          1. JSON vs JavaScript Object
        </h3>

        <p className="text-slate-300 text-sm">
          JSON <em>looks like</em> JavaScript objects, but it is just a{" "}
          <strong>string</strong>. Key differences:
        </p>

        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li>JSON keys must be in double quotes.</li>
          <li>Strings must use double quotes.</li>
          <li>No trailing commas allowed.</li>
          <li>Only basic types: string, number, boolean, null, array, object.</li>
        </ul>

        <CodeBlock
          language="json"
          code={`{
  "name": "Ritaja",
  "course": "JavaScript",
  "centre": "Coder & AccoTax",
  "city": "Barrackpore",
  "marks": {
    "js": 92,
    "es6": 95
  },
  "skills": ["HTML", "CSS", "JavaScript"]
}`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          2. Common JSON Patterns
        </h3>

        <p className="text-slate-300 text-sm">
          Many APIs return <strong>arrays of objects</strong>. For example, a
          list of students at Coder &amp; AccoTax might look like:
        </p>

        <CodeBlock
          language="json"
          code={`[
  {
    "name": "Mounita",
    "batch": "JS-01",
    "city": "Barrackpore"
  },
  {
    "name": "Swadeep",
    "batch": "JS-01",
    "city": "Kolkata"
  }
]`}
        />

        <p className="text-slate-300 text-sm">
          JSON is language-independent. Python, Java, PHP, C#, and JavaScript
          all can parse and generate JSON.
        </p>

        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h4 className="text-sm font-semibold text-slate-100">
            When do we use JSON?
          </h4>
          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Fetching data from REST APIs.</li>
            <li>Storing structured data in files.</li>
            <li>Saving data in localStorage as strings.</li>
            <li>Config files (e.g. VS Code settings, package.json).</li>
          </ul>
        </section>
      </div>
    );
  }
}
