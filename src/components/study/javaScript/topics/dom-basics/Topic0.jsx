import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          What is the DOM? Nodes, Elements & Tree Structure
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          The <span className="text-sky-300 font-semibold">DOM (Document Object Model)</span> 
          is a programming interface that represents the structure of a webpage.  
          JavaScript uses the DOM to read or change any part of the page — text, buttons, 
          images, forms, etc.
        </p>

        <p className="text-slate-300 text-sm">
          Think of the DOM as a <strong>tree of elements</strong> where every tag in HTML 
          becomes a node in JavaScript.
        </p>

        {/* HTML Example */}
        <h3 className="text-lg font-semibold text-slate-200">
          Example: Simple HTML Structure (Shown as DOM Tree)
        </h3>

        <CodeBlock
          code={`<!DOCTYPE html>
<html>
  <body>
    <h1>Welcome to Coder & AccoTax</h1>
    <p>Student: Ritaja</p>
    <button id="clickBtn">Click Me</button>
  </body>
</html>`}
          language="html"
        />

        <p className="text-slate-400 text-sm">
          The DOM converts this HTML into a <strong>tree</strong> that JavaScript can control.
        </p>

        {/* DOM Tree Visualization */}
        <h3 className="text-lg font-semibold text-slate-200">DOM Tree Representation</h3>

        <CodeBlock
          code={`Document
 └── html
      └── body
           ├── h1
           ├── p
           └── button`}
          language="text"
        />

        {/* JS Access Example */}
        <h3 className="text-lg font-semibold text-slate-200">
          JavaScript Accessing DOM Nodes
        </h3>

        <CodeBlock
          code={`const heading = document.querySelector("h1");
console.log(heading.innerText);

const studentPara = document.querySelector("p");
console.log(studentPara.innerText);

const btn = document.getElementById("clickBtn");
console.log(btn.tagName);`}
          language="javascript"
        />

        <p className="text-slate-400 text-sm">
          JavaScript can read and modify any part of this DOM tree.
        </p>

        {/* Realistic Example */}
        <h3 className="text-lg font-semibold text-slate-200">
          Realistic Classroom Example — Coder & AccoTax (Barrackpore)
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          Suppose you have a list of students appearing in a JavaScript class:
        </p>

        {/* HTML */}
        <CodeBlock
          code={`<ul id="studentList">
  <li>Ritaja</li>
  <li>Mounita</li>
  <li>Swadeep</li>
</ul>`}
          language="html"
        />

        {/* JS */}
        <CodeBlock
          code={`const list = document.getElementById("studentList");
console.log(list.children);  // Shows all 3 <li> elements`}
          language="javascript"
        />

        <p className="text-slate-400 text-sm">
          The browser converts this list into DOM <strong>node objects</strong> that 
          JavaScript can interact with.
        </p>

        {/* Summary */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>
          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li>The DOM represents HTML as a tree structure.</li>
            <li>Every HTML tag becomes a JavaScript-accessible node.</li>
            <li>You can use JS to read, change, add, or remove parts of the DOM.</li>
            <li>DOM is the foundation of all interactivity in webpages.</li>
          </ul>
        </section>
      </div>
    );
  }
}
