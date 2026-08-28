import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          The Event Object — event.target, event.type, event.key, coordinates & more
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Every event handler receives a special object called the <strong>event object</strong>.  
          It contains information about what happened — which key was pressed, which element was clicked, mouse position, and more.  
          Understanding this is crucial for interactive applications built at Coder & AccoTax.
        </p>


        {/* =============================
            event.target
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          1. event.target — The element that triggered the event
        </h3>

        <CodeBlock
          language="html"
          code={`<button class="btn">Mark Attendance</button>
<button class="btn">Homework Done</button>`}
        />

        <CodeBlock
          language="javascript"
          code={`document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", function(event) {
    console.log("Clicked:", event.target.innerText);
  });
});`}
        />

        <p className="text-slate-400 text-sm">
          If Devangshu clicks the second button, it prints:  
          <code>Homework Done</code>
        </p>


        {/* =============================
            event.type
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. event.type — Which event occurred?
        </h3>

        <CodeBlock
          language="javascript"
          code={`btn.addEventListener("click", function(e) {
  console.log(e.type);   // "click"
});`}
        />


        {/* =============================
            event.key
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. event.key — Which key was pressed? (Keyboard Events)
        </h3>

        <CodeBlock
          language="html"
          code={`<input id="typingBox" placeholder="Type something..." />`}
        />

        <CodeBlock
          language="javascript"
          code={`const input = document.getElementById("typingBox");

input.addEventListener("keydown", function(e) {
  console.log("Key Pressed:", e.key);
});`}
        />

        <p className="text-slate-400 text-sm">
          If <strong>Ritaja</strong> presses "A", console prints:  
          <code>Key Pressed: A</code>
        </p>


        {/* =============================
            event.clientX & event.clientY
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          4. Mouse Coordinates — event.clientX & event.clientY
        </h3>

        <p className="text-slate-300 text-sm">
          Useful for drawing apps, games, drag-drop tools, etc.
        </p>

        <CodeBlock
          language="html"
          code={`<div id="box" style="width:120px;height:120px;background:#475569"></div>`}
        />

        <CodeBlock
          language="javascript"
          code={`document.getElementById("box").addEventListener("mousemove", function(e) {
  console.log("X:", e.clientX, "Y:", e.clientY);
});`}
        />


        {/* =============================
            event.preventDefault()
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          5. preventDefault() — Stop default behaviour
        </h3>

        <p className="text-slate-300 text-sm">
          Used often in forms, links, drag-drop, etc.
        </p>

        <CodeBlock
          language="html"
          code={`<a id="link" href="https://www.codernaccotax.co.in">Visit Website</a>`}
        />

        <CodeBlock
          language="javascript"
          code={`const link = document.getElementById("link");

link.addEventListener("click", function(e) {
  e.preventDefault();
  console.log("Navigation blocked by teacher Sukanta Hui.");
});`}
        />


        {/* =============================
            event.stopPropagation()
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          6. stopPropagation() — Stop event bubbling
        </h3>

        <CodeBlock
          language="html"
          code={`<div id="outer" style="padding:20px;background:#334155">
  Outer Box
  <div id="inner" style="margin-top:10px;padding:20px;background:#64748b">
    Inner Box
  </div>
</div>`}
        />

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
          Clicking inside the inner box will not trigger outer box.
        </p>


        {/* =============================
            FULL Practical Example
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          Real Classroom Example — Input Analysis Tool (Coder & AccoTax)
        </h3>

        <p className="text-slate-300 text-sm">
          Students like <strong>Pranjali</strong> and <strong>Susmita</strong> use this to see their typing pattern:
        </p>

        <CodeBlock
          language="html"
          code={`<input id="activity" placeholder="Type here..." />`}
        />

        <CodeBlock
          language="javascript"
          code={`const box = document.getElementById("activity");

box.addEventListener("keyup", function(e) {
  console.log("Key:", e.key);
  console.log("Event Type:", e.type);
  console.log("Target:", e.target.value);
});`}
        />


        {/* =============================
            SUMMARY
        ============================== */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><strong>event.target</strong> → element where event happened</li>
            <li><strong>event.type</strong> → event name</li>
            <li><strong>event.key</strong> → keyboard key pressed</li>
            <li><strong>clientX/Y</strong> → mouse coordinates</li>
            <li><strong>preventDefault()</strong> → stop default behavior</li>
            <li><strong>stopPropagation()</strong> → stop bubbling</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            This is heavily used in interactive applications taught at Coder & AccoTax, Barrackpore.
          </p>
        </section>
      </div>
    );
  }
}
