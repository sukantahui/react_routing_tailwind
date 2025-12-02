import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Mini Projects — Counter, Show/Hide Password & FAQ Toggle
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Let’s build some small but powerful DOM-based mini projects.  
          These exercises help students at Coder & AccoTax (Barrackpore) understand how JavaScript interacts with HTML dynamically.
        </p>

        {/* ===========================
            PROJECT 1 — COUNTER APP
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          1. Counter App (Beginner Friendly)
        </h3>

        <p className="text-slate-300 text-sm">
          A simple counter that increases or decreases on button click.
        </p>

        <CodeBlock
          language="html"
          code={`<div>
  <h2 id="count">0</h2>
  <button id="inc">Increase</button>
  <button id="dec">Decrease</button>
</div>`}
        />

        <CodeBlock
          language="javascript"
          code={`let count = 0;

const countEl = document.getElementById("count");
const inc = document.getElementById("inc");
const dec = document.getElementById("dec");

inc.addEventListener("click", () => {
  count++;
  countEl.innerText = count;
});

dec.addEventListener("click", () => {
  count--;
  countEl.innerText = count;
});`}
        />

        <p className="text-slate-400 text-sm">
          Students like Ritaja and Swadeep usually practice this on Day 1 of DOM Basics.
        </p>

        {/* ===========================
            PROJECT 2 — SHOW/HIDE PASSWORD
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. Show / Hide Password Toggle
        </h3>

        <p className="text-slate-300 text-sm">
          A common feature used in real login forms.
        </p>

        <CodeBlock
          language="html"
          code={`<input type="password" id="pass" placeholder="Enter password" />
<button id="toggle">Show</button>`}
        />

        <CodeBlock
          language="javascript"
          code={`const pass = document.getElementById("pass");
const toggle = document.getElementById("toggle");

toggle.addEventListener("click", () => {
  if (pass.type === "password") {
    pass.type = "text";
    toggle.innerText = "Hide";
  } else {
    pass.type = "password";
    toggle.innerText = "Show";
  }
});`}
        />

        <p className="text-slate-400 text-sm">
          In class, teacher Sukanta Hui demonstrates how websites like banking portals use this simple logic.
        </p>

        {/* ===========================
            PROJECT 3 — FAQ ACCORDION
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. FAQ Toggle (Accordion)
        </h3>

        <p className="text-slate-300 text-sm">
          Common UI component — clicking a question shows/hides the answer.
        </p>

        <CodeBlock
          language="html"
          code={`<div class="faq">
  <h3 class="q">What is JavaScript?</h3>
  <p class="ans" style="display:none">
    JavaScript is a programming language used for web development.
  </p>
</div>

<div class="faq">
  <h3 class="q">Who teaches JavaScript at Coder & AccoTax?</h3>
  <p class="ans" style="display:none">
    Classes are taken by Sukanta Hui and Tanusree Hui.
  </p>
</div>`}
        />

        <CodeBlock
          language="javascript"
          code={`const questions = document.querySelectorAll(".q");

questions.forEach(q => {
  q.addEventListener("click", () => {
    const ans = q.nextElementSibling;

    // Toggle visibility
    if (ans.style.display === "none") {
      ans.style.display = "block";
    } else {
      ans.style.display = "none";
    }
  });
});`}
        />

        <p className="text-slate-400 text-sm">
          Students like Pranjali and Kaustav create this in their mini projects folder.
        </p>

        {/* ===========================
            SUMMARY
        ============================ */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-8">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li>Mini projects help understand real DOM manipulation</li>
            <li>Counter app → Basics of state and updates</li>
            <li>Password toggle → Input fields & attribute updates</li>
            <li>FAQ accordion → Event handling & element relationships</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            These projects are part of the DOM Basics module used in our classroom training at Coder & AccoTax, Barrackpore.
          </p>
        </section>
      </div>
    );
  }
}
