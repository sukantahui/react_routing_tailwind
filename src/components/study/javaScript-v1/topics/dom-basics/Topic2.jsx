import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Changing Text, HTML & CSS Using JavaScript
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Once you select an element from the DOM, the next step is modifying
          what it displays. JavaScript allows you to change:
        </p>

        <ul className="list-disc ml-5 text-slate-300 text-sm">
          <li><strong>innerText</strong> – text only</li>
          <li><strong>innerHTML</strong> – HTML + formatting</li>
          <li><strong>style</strong> – CSS dynamically</li>
          <li><strong>classList</strong> – add/remove CSS classes</li>
        </ul>

        {/* ===========================
            SECTION 1 — Changing Text
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          1. Changing Text using innerText
        </h3>

        <p className="text-slate-300 text-sm">
          <code>innerText</code> replaces the text content of an element.
        </p>

        {/* HTML */}
        <CodeBlock
          code={`<h2 id="greet">Welcome to Coder & AccoTax</h2>`}
          language="html"
        />

        {/* JS */}
        <CodeBlock
          code={`const title = document.getElementById("greet");
title.innerText = "Hello Students — Class by Sukanta Hui";`}
          language="javascript"
        />

        {/* ===========================
            SECTION 2 — innerHTML
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          2. Changing HTML using innerHTML
        </h3>

        <p className="text-slate-300 text-sm">
          <code>innerHTML</code> allows inserting HTML tags inside the element.
        </p>

        <CodeBlock
          code={`<div id="box"></div>`}
          language="html"
        />

        <CodeBlock
          code={`document.getElementById("box").innerHTML = \`
  <h3 style="color:skyblue">Today's Students</h3>
  <ul>
    <li>Ritaja</li>
    <li>Mounita</li>
    <li>Swadeep</li>
  </ul>
\`;`}
          language="javascript"
        />

        {/* ===========================
            SECTION 3 — Changing CSS
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          3. Changing CSS Style Dynamically
        </h3>

        <p className="text-slate-300 text-sm">
          You can modify CSS properties using the <code>style</code> object.
        </p>

        {/* HTML */}
        <CodeBlock
          code={`<p id="note">Important Notice</p>`}
          language="html"
        />

        {/* JS */}
        <CodeBlock
          code={`const note = document.getElementById("note");
note.style.color = "yellow";
note.style.backgroundColor = "black";
note.style.padding = "8px";
note.style.borderRadius = "6px";`}
          language="javascript"
        />

        {/* ===========================
            SECTION 4 — classList API
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          4. Using classList (add, remove, toggle)
        </h3>

        <p className="text-slate-300 text-sm">
          <code>classList</code> lets you add or remove CSS classes cleanly.
        </p>

        <CodeBlock
          code={`<p id="studentName" class="tag">Kaustav</p>`}
          language="html"
        />

        <CodeBlock
          code={`const student = document.getElementById("studentName");

// Add highlight
student.classList.add("highlight");

// Remove a class
student.classList.remove("tag");

// Toggle dark mode
student.classList.toggle("dark-theme");`}
          language="javascript"
        />

        {/* ===========================
            Realistic Classroom Example
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          Realistic Classroom Example — Coder & AccoTax (Barrackpore)
        </h3>

        <p className="text-slate-300 text-sm">
          In Sukanta Hui’s JavaScript class, we often update student lists dynamically.
        </p>

        {/* HTML */}
        <CodeBlock
          code={`<ul id="attendance">
  <li>Pranjali</li>
  <li>Susmita</li>
</ul>

<button id="add">Add Devangshu</button>`}
          language="html"
        />

        {/* JS */}
        <CodeBlock
          code={`const attendance = document.getElementById("attendance");
const btn = document.getElementById("add");

btn.addEventListener("click", () => {
  attendance.innerHTML += "<li>Devangshu</li>";
});`}
          language="javascript"
        />

        {/* ===========================
            Summary
        ============================== */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-8">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>
          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><code>innerText</code> → change plain text only</li>
            <li><code>innerHTML</code> → insert formatted HTML</li>
            <li><code>style</code> → change CSS properties</li>
            <li><code>classList.add/remove/toggle</code> → best way to manage CSS classes</li>
            <li>DOM updates make pages interactive and dynamic</li>
          </ul>
        </section>

      </div>
    );
  }
}
