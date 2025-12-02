import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* ===========================
             TITLE
        ============================ */}
        <h2 className="text-xl font-semibold text-sky-300">
          Creating, Appending & Removing Elements in the DOM
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          The DOM allows JavaScript to <strong>create new HTML elements</strong>,
          <strong>insert them</strong> into the page, and <strong>remove them</strong> when needed.
        </p>

        <p className="text-slate-300 text-sm">
          These operations are essential for building interactive interfaces like:
        </p>

        <ul className="list-disc ml-5 text-slate-300 text-sm">
          <li>Dynamically generated lists</li>
          <li>Interactive forms</li>
          <li>Chat messages</li>
          <li>Real-time dashboards</li>
        </ul>


        {/* ===========================
             1 — createElement()
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          1. Creating Elements with createElement()
        </h3>

        <p className="text-slate-300 text-sm">
          <code>document.createElement()</code> creates a new element in memory — it is
          <strong>NOT visible</strong> until appended to the document.
        </p>

        {/* HTML */}
        <CodeBlock
          language="html"
          code={`<div id="container"></div>`}
        />

        {/* JS */}
        <CodeBlock
          language="javascript"
          code={`const box = document.createElement("p");
box.innerText = "Hello from Coder & AccoTax";`}
        />


        {/* ===========================
             2 — appendChild()
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">2. appendChild()</h3>

        <p className="text-slate-300 text-sm">
          Used to insert a created element <strong>at the end</strong> of a parent.
        </p>

        <CodeBlock
          language="javascript"
          code={`const container = document.getElementById("container");

// Create element
const line = document.createElement("p");
line.innerText = "Welcome Ritaja!";

// Add to container
container.appendChild(line);`}
        />


        {/* ===========================
             3 — prepend()
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">3. prepend()</h3>

        <p className="text-slate-300 text-sm">
          Inserts the element <strong>at the top</strong> of the parent.
        </p>

        <CodeBlock
          language="javascript"
          code={`const title = document.createElement("h3");
title.innerText = "Today's Class by Sukanta Hui";

// Insert at the top
container.prepend(title);`}
        />


        {/* ===========================
             4 — remove()
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">4. remove()</h3>

        <p className="text-slate-300 text-sm">
          Removes an element from the DOM immediately.
        </p>

        <CodeBlock
          language="javascript"
          code={`const unwanted = document.getElementById("oldNotice");
unwanted.remove();`}
        />


        {/* ===========================
             Coder & AccoTax Classroom Example
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          Realistic Classroom Example — Adding Students Dynamically
        </h3>

        <p className="text-slate-300 text-sm">
          During a JavaScript session in Coder & AccoTax, Barrackpore,  
          assume we maintain an online attendance list.
        </p>

        {/* HTML */}
        <CodeBlock
          language="html"
          code={`<ul id="students">
  <li>Kaustav</li>
  <li>Mounita</li>
</ul>

<button id="addBtn">Add New Student</button>`}
        />

        {/* JS */}
        <CodeBlock
          language="javascript"
          code={`const list = document.getElementById("students");
const btn = document.getElementById("addBtn");

btn.addEventListener("click", () => {
  const newStd = document.createElement("li");
  newStd.innerText = "Devangshu";
  list.appendChild(newStd);
});`}
        />


        {/* ===========================
             Removing Students Example
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          Removing Elements – Example
        </h3>

        <CodeBlock
          language="javascript"
          code={`// Remove first student
const firstStudent = list.querySelector("li");
firstStudent.remove();`}
        />


        {/* ===========================
             Summary
        ============================ */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-8">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><code>createElement()</code> → Create elements in memory</li>
            <li><code>appendChild()</code> → Add element at the end</li>
            <li><code>prepend()</code> → Add element at the beginning</li>
            <li><code>remove()</code> → Delete element from the DOM</li>
            <li>Useful for lists, chat apps, dynamic tables, dashboards, etc.</li>
          </ul>
        </section>

      </div>
    );
  }
}
