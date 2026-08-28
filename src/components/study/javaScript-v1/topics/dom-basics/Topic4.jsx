import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* ===========================
             TITLE
        ============================ */}
        <h2 className="text-xl font-semibold text-sky-300">
          Working with Attributes, Classes & data-* Attributes
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          HTML elements contain attributes like <code>href</code>, <code>src</code>, 
          <code>title</code>, <code>id</code>, <code>value</code>, etc.  
          JavaScript lets you <strong>read</strong>, <strong>modify</strong> and <strong>remove</strong> these attributes.
        </p>


        {/* ===========================
             SECTION 1 — getAttribute()
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-4">
          1. Reading Attributes using getAttribute()
        </h3>

        <p className="text-slate-300 text-sm">
          <code>getAttribute()</code> reads any attribute from an HTML tag.
        </p>

        {/* HTML */}
        <CodeBlock
          language="html"
          code={`<a id="profile" href="https://www.codernaccotax.co.in">Visit Site</a>`}
        />

        {/* JS */}
        <CodeBlock
          language="javascript"
          code={`const link = document.getElementById("profile");
console.log(link.getAttribute("href"));`}
        />


        {/* ===========================
             SECTION 2 — setAttribute()
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-4">
          2. Setting Attributes using setAttribute()
        </h3>

        <p className="text-slate-300 text-sm">
          You can update or add a new attribute using <code>setAttribute()</code>.
        </p>

        <CodeBlock
          language="javascript"
          code={`link.setAttribute("href", "https://www.youtube.com/codernaccotax");
link.setAttribute("title", "Coder & AccoTax Official");`}
        />


        {/* ===========================
             SECTION 3 — removeAttribute()
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-4">
          3. Removing Attributes
        </h3>

        <p className="text-slate-300 text-sm">
          <code>removeAttribute()</code> deletes an attribute completely.
        </p>

        <CodeBlock
          language="javascript"
          code={`link.removeAttribute("title");`}
        />


        {/* ===========================
             SECTION 4 — classList API
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          4. Using classList (add, remove, toggle, contains)
        </h3>

        <p className="text-slate-300 text-sm">
          <code>classList</code> is the best way to manage CSS classes in JavaScript.
        </p>

        <CodeBlock
          language="html"
          code={`<p id="stdName" class="label">Mounita</p>`}
        />

        <CodeBlock
          language="javascript"
          code={`const std = document.getElementById("stdName");

// Add a class
std.classList.add("highlight");

// Remove a class
std.classList.remove("label");

// Check if a class exists
console.log(std.classList.contains("highlight"));

// Toggle a class
std.classList.toggle("dark-theme");`}
        />


        {/* ===========================
             SECTION 5 — data-* Attributes
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          5. Using data-* Attributes (dataset)
        </h3>

        <p className="text-slate-300 text-sm">
          <code>data-*</code> attributes store custom information in an element.  
          JavaScript accesses these through the <code>dataset</code> object.
        </p>

        {/* HTML */}
        <CodeBlock
          language="html"
          code={`<div id="student" data-name="Ritaja" data-score="92"></div>`}
        />

        {/* JS */}
        <CodeBlock
          language="javascript"
          code={`const s = document.getElementById("student");
console.log(s.dataset.name);   // "Ritaja"
console.log(s.dataset.score);  // "92"

// Modify dataset
s.dataset.score = 95;`}
        />


        {/* ===========================
             Coder & AccoTax Classroom Example
        ============================ */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          Realistic Example — Marking Attendance in Coder & AccoTax
        </h3>

        <p className="text-slate-300 text-sm">
          Assume Sukanta Hui keeps student data using <code>data-id</code> and <code>data-course</code>.
        </p>

        <CodeBlock
          language="html"
          code={`<ul>
  <li class="std" data-id="101" data-course="JavaScript">Kaustav</li>
  <li class="std" data-id="102" data-course="JavaScript">Pranjali</li>
</ul>`}
        />

        <CodeBlock
          language="javascript"
          code={`const all = document.querySelectorAll(".std");

all.forEach(st => {
  console.log(st.dataset.id);       // student roll
  console.log(st.dataset.course);   // subject
});`}
        />


        {/* ===========================
             Summary
        ============================ */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-8">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><code>getAttribute(name)</code> → read value</li>
            <li><code>setAttribute(name, value)</code> → update or add</li>
            <li><code>removeAttribute(name)</code> → delete</li>
            <li><code>classList.add/remove/toggle</code> → best for CSS classes</li>
            <li><code>dataset</code> → read & write custom data</li>
          </ul>
        </section>

      </div>
    );
  }
}
