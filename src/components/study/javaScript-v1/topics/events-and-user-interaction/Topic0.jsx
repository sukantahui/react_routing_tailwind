import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Event Types: click, input, change, submit, keyup, keydown, mouse events
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Events are actions performed by the user — clicking, typing, moving the mouse,
          submitting a form, etc.  
          JavaScript allows us to detect these actions and respond to them.  
          This is the foundation of interactive websites used by students at Coder & AccoTax.
        </p>

        {/* =============================
            CLICK EVENT
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          1. click Event
        </h3>

        <CodeBlock
          language="html"
          code={`<button id="btn">Click Me</button>`}
        />

        <CodeBlock
          language="javascript"
          code={`const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  console.log("Button clicked!");
});`}
        />

        <p className="text-slate-400 text-sm">
          In class, students like Ritaja and Kaustav practice this when learning basic DOM events.
        </p>


        {/* =============================
            INPUT EVENT
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          2. input Event (fires every time user types)
        </h3>

        <CodeBlock
          language="html"
          code={`<input type="text" id="nameInput" placeholder="Type your name" />`}
        />

        <CodeBlock
          language="javascript"
          code={`const nameInput = document.getElementById("nameInput");

nameInput.addEventListener("input", () => {
  console.log(nameInput.value);
});`}
        />

        <p className="text-slate-400 text-sm">
          Ideal when students like Susmita or Pranjali type their names and see the result instantly.
        </p>


        {/* =============================
            CHANGE EVENT
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          3. change Event (fires when field loses focus)
        </h3>

        <CodeBlock
          language="html"
          code={`<select id="course">
  <option>JavaScript</option>
  <option>Python</option>
  <option>GST</option>
</select>`}
        />

        <CodeBlock
          language="javascript"
          code={`const course = document.getElementById("course");

course.addEventListener("change", () => {
  console.log("Selected:", course.value);
});`}
        />

        <p className="text-slate-400 text-sm">
          Used at admission desk when students choose their course.
        </p>


        {/* =============================
            SUBMIT EVENT
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          4. submit Event (form submission)
        </h3>

        <CodeBlock
          language="html"
          code={`<form id="admissionForm">
  <input type="text" placeholder="Student Name" />
  <button type="submit">Submit</button>
</form>`}
        />

        <CodeBlock
          language="javascript"
          code={`const form = document.getElementById("admissionForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();  // stop page reload
  console.log("Form submitted!");
});`}
        />

        <p className="text-slate-400 text-sm">
          Teachers like Sukanta Hui demonstrate this while showing validation.
        </p>


        {/* =============================
            KEYUP & KEYDOWN EVENTS
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          5. keyup & keydown — Detecting Keyboard Presses
        </h3>

        <CodeBlock
          language="html"
          code={`<input type="text" id="textBox" placeholder="Press any key" />`}
        />

        <CodeBlock
          language="javascript"
          code={`const box = document.getElementById("textBox");

box.addEventListener("keydown", (e) => {
  console.log("Key Down:", e.key);
});

box.addEventListener("keyup", (e) => {
  console.log("Key Up:", e.key);
});`}
        />

        <p className="text-slate-400 text-sm">
          Very useful for search bars or typing tests (like your Typing Test tool).
        </p>


        {/* =============================
            MOUSE EVENTS
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          6. Mouse Events — mouseover, mouseout, mousemove, dblclick
        </h3>

        <CodeBlock
          language="html"
          code={`<div id="box" style="width:120px;height:120px;background:#334155"></div>`}
        />

        <CodeBlock
          language="javascript"
          code={`const square = document.getElementById("box");

square.addEventListener("mouseover", () => console.log("Mouse Over"));
square.addEventListener("mouseout", () => console.log("Mouse Out"));
square.addEventListener("mousemove", () => console.log("Mouse Moving"));
square.addEventListener("dblclick", () => console.log("Double Clicked"));`}
        />


        {/* =============================
            SUMMARY
        ============================== */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-8">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><strong>click</strong> → button presses</li>
            <li><strong>input</strong> → typing live</li>
            <li><strong>change</strong> → selecting dropdown</li>
            <li><strong>submit</strong> → form submissions</li>
            <li><strong>keyup / keydown</strong> → keyboard detection</li>
            <li><strong>mouse events</strong> → hover, movement, double-click</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            These event types are used in almost all UI components built in Coder & AccoTax, Barrackpore.
          </p>
        </section>
      </div>
    );
  }
}
