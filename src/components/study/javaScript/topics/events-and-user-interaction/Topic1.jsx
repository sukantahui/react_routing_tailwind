import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          addEventListener() & removeEventListener() in JavaScript
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          JavaScript uses <code>addEventListener()</code> to attach events to elements, 
          and <code>removeEventListener()</code> to detach them.  
          This helps us control user interactions cleanly, without mixing HTML and JavaScript.
        </p>

        {/* =============================
            addEventListener() — BASICS
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          1. addEventListener() — Basic Usage
        </h3>

        <p className="text-slate-300 text-sm">Syntax:</p>

        <CodeBlock
          language="javascript"
          code={`element.addEventListener("eventName", functionName);`}
        />

        <h4 className="text-md font-semibold text-slate-300 mt-3">Example:</h4>

        <CodeBlock
          language="html"
          code={`<button id="btn">Click Me</button>`}
        />

        <CodeBlock
          language="javascript"
          code={`const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  console.log("Button Clicked!");
});`}
        />


        {/* ===================================
            Class Example — Coder & AccoTax
        ==================================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          Classroom Example — Attendance Button
        </h3>

        <p className="text-slate-300 text-sm">
          When students like <strong>Ritaja</strong>, <strong>Devangshu</strong>, or 
          <strong> Mounita</strong> click a button, their presence is logged.
        </p>

        <CodeBlock
          language="html"
          code={`<button id="mark">Mark Attendance</button>`}
        />

        <CodeBlock
          language="javascript"
          code={`const markBtn = document.getElementById("mark");

markBtn.addEventListener("click", () => {
  console.log("Attendance marked by teacher Sukanta Hui.");
});`}
        />


        {/* ===================================
            removeEventListener()
        ==================================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. removeEventListener() — Detaching Events
        </h3>

        <p className="text-slate-300 text-sm">
          To remove a listener, the function must have a <strong>name</strong>.
        </p>

        <CodeBlock
          language="javascript"
          code={`function sayHello() {
  console.log("Hello!");
}

btn.addEventListener("click", sayHello);

// Remove the listener
btn.removeEventListener("click", sayHello);`}
        />

        <p className="text-slate-400 text-sm">
          Anonymous functions <strong>cannot</strong> be removed.
        </p>


        {/* ===================================
            PRACTICAL UI EXAMPLE — TOGGLE BUTTON
        ==================================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. Practical UI Example — Disable a Button After One Click
        </h3>

        <CodeBlock
          language="html"
          code={`<button id="submitBtn">Submit</button>`}
        />

        <CodeBlock
          language="javascript"
          code={`const submitBtn = document.getElementById("submitBtn");

function handleSubmit() {
  console.log("Form submitted by Susmita!");
  submitBtn.removeEventListener("click", handleSubmit);
}

submitBtn.addEventListener("click", handleSubmit);`}
        />

        <p className="text-slate-400 text-sm">
          Useful for preventing multiple submissions in forms.
        </p>


        {/* ===================================
            REAL APP EXAMPLE — Modal Open/Close
        ==================================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          4. Modal Example — Adding & Removing Events
        </h3>

        <p className="text-slate-300 text-sm">
          Used when teaching UI components in Coder & AccoTax.
        </p>

        <CodeBlock
          language="html"
          code={`<button id="open">Open Modal</button>
<div id="modal" style="display:none">Welcome Students</div>`}
        />

        <CodeBlock
          language="javascript"
          code={`const open = document.getElementById("open");
const modal = document.getElementById("modal");

function showModal() {
  modal.style.display = "block";
  open.removeEventListener("click", showModal);
}

open.addEventListener("click", showModal);`}
        />


        {/* ===================================
            Example — Removing multiple listeners
        ==================================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          5. Removing Multiple Event Listeners
        </h3>

        <CodeBlock
          language="javascript"
          code={`function greet() { console.log("Hello!"); }
function warn() { console.log("Be careful!"); }

btn.addEventListener("mouseover", greet);
btn.addEventListener("mouseover", warn);

// Remove both
btn.removeEventListener("mouseover", greet);
btn.removeEventListener("mouseover", warn);`}
        />


        {/* ===================================
            Summary
        ==================================== */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><code>addEventListener()</code> attaches event handlers</li>
            <li><code>removeEventListener()</code> removes them</li>
            <li>To remove, the function must have a <strong>name</strong></li>
            <li>Useful for buttons, modals, validation, disabling UI</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            These concepts are essential for interactive applications built at Coder & AccoTax, Barrackpore.
          </p>
        </section>
      </div>
    );
  }
}
