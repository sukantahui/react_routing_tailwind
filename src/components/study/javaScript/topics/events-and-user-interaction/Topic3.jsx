import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Event Bubbling & Capturing in JavaScript
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          When you click on an element, the event does not stay on that element.  
          It travels through the DOM tree in a specific order — this is called  
          <strong>Bubbling</strong> and <strong>Capturing</strong>.  
          Understanding this is important for UI components, modals, menus, and forms used in Coder & AccoTax applications.
        </p>

        {/* ASCII Diagram */}
        <div className="p-4 bg-slate-900/60 border border-slate-700 rounded-xl">
          <p className="text-slate-300 text-sm font-mono leading-relaxed">
{`Capturing Phase (Top → Target)
--------------------------------
window
  ↓
document
  ↓
<html>
  ↓
<body>
  ↓
<div id="outer">
  ↓
<button id="inner"> CLICK </button>
  ↑
Bubbling Phase (Target → Top)
`}
          </p>
        </div>

        {/* =============================
            BUBBLING EXAMPLE
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          1. Event Bubbling (Default)
        </h3>

        <p className="text-slate-300 text-sm">
          Event travels from the <strong>target element upward</strong>.
        </p>

        <CodeBlock
          language="html"
          code={`<div id="outer" style="padding:20px;background:#334155">
  Outer Div
  <button id="inner" style="margin-top:10px">Click Me</button>
</div>`}
        />

        <CodeBlock
          language="javascript"
          code={`document.getElementById("outer").addEventListener("click", () => {
  console.log("Outer clicked");
});

document.getElementById("inner").addEventListener("click", () => {
  console.log("Inner clicked");
});`}
        />

        <p className="text-slate-400 text-sm">
          If Kaustav clicks the button:
        </p>

        <ul className="list-disc ml-5 text-slate-400 text-sm">
          <li>Inner clicked</li>
          <li>Outer clicked</li>
        </ul>


        {/* =============================
            CAPTURING EXAMPLE
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. Event Capturing (useCapture = true)
        </h3>

        <p className="text-slate-300 text-sm">
          Event travels from the <strong>root element to the target</strong>.
        </p>

        <CodeBlock
          language="javascript"
          code={`document.getElementById("outer").addEventListener("click", () => {
  console.log("Outer (capturing)");
}, true);

document.getElementById("inner").addEventListener("click", () => {
  console.log("Inner (capturing)");
}, true);`}
        />

        <p className="text-slate-400 text-sm">
          Clicking the button prints:
        </p>

        <ul className="list-disc ml-5 text-slate-400 text-sm">
          <li>Outer (capturing)</li>
          <li>Inner (capturing)</li>
        </ul>


        {/* =============================
            stopPropagation()
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          3. stopPropagation() — Stop the event from going further
        </h3>

        <p className="text-slate-300 text-sm">
          Useful for preventing parent menus from opening when inner buttons are clicked.
        </p>

        <CodeBlock
          language="javascript"
          code={`document.getElementById("outer").addEventListener("click", () => {
  console.log("Outer clicked");
});

document.getElementById("inner").addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Inner clicked only");
});`}
        />

        <p className="text-slate-400 text-sm">
          Clicking inner button prints only <code>Inner clicked only</code>.
        </p>


        {/* =============================
            Real-life Example: Dropdown Menu
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          4. Real-life Example — Dropdown Menu Click Handling
        </h3>

        <p className="text-slate-300 text-sm">
          Teachers like <strong>Sukanta Hui</strong> or <strong>Tanusree Hui</strong> show this example in JavaScript UI sessions.
        </p>

        <CodeBlock
          language="html"
          code={`<button id="menuBtn">Menu</button>
<div id="menu" style="display:none; background:#475569; padding:10px">
  <p onclick="alert('Hello Ritaja')">Profile</p>
  <p>Settings</p>
</div>`}
        />

        <CodeBlock
          language="javascript"
          code={`const btn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

// Open dropdown
btn.addEventListener("click", (e) => {
  menu.style.display = "block";
  e.stopPropagation(); // prevent document click
});

// Close dropdown when clicking anywhere else
document.addEventListener("click", () => {
  menu.style.display = "none";
});`}
        />


        {/* =============================
            Coder & AccoTax Example
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          5. Coder & AccoTax Classroom Example
        </h3>

        <p className="text-slate-300 text-sm">
          When students like <strong>Pranjali</strong>, <strong>Mounita</strong> or 
          <strong> Swadeep</strong> click on FAQ items, bubbling affects outer container.
        </p>

        <CodeBlock
          language="html"
          code={`<div id="faqContainer">
  <div class="faq">
    <h3 class="q">What is DOM?</h3>
    <p class="a" style="display:none">DOM is Document Object Model.</p>
  </div>
</div>`}
        />

        <CodeBlock
          language="javascript"
          code={`document.getElementById("faqContainer").addEventListener("click", () => {
  console.log("FAQ Container clicked");
});

document.querySelector(".q").addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("Question clicked only");
});`}
        />


        {/* =============================
            SUMMARY
        ============================== */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><strong>Capturing</strong> → Root → Target</li>
            <li><strong>Bubbling</strong> → Target → Root (default)</li>
            <li><strong>stopPropagation()</strong> → Prevent event from moving further</li>
            <li>Useful in menus, modals, accordions and nested UI elements</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            These concepts play a major role in UI logic used at Coder & AccoTax, Barrackpore.
          </p>
        </section>

      </div>
    );
  }
}
