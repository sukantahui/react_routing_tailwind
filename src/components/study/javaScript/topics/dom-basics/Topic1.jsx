import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Selecting Elements — getElementById, querySelector & querySelectorAll
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          To work with the DOM, the first step is to <strong>select</strong> the
          HTML elements using JavaScript.  
          JavaScript gives several methods to do this — each useful in different situations.
        </p>

        {/* getElementById */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. document.getElementById()
        </h3>
        <p className="text-slate-300 text-sm">
          Selects exactly one element by its <strong>id</strong>.
        </p>

        {/* HTML */}
        <CodeBlock
          code={`<h2 id="title">Welcome Students</h2>`}
          language="html"
        />

        {/* JS */}
        <CodeBlock
          code={`const heading = document.getElementById("title");
console.log(heading.innerText);`}
          language="javascript"
        />

        {/* querySelector */}
        <h3 className="text-lg font-semibold text-slate-200">
          2. document.querySelector()
        </h3>

        <p className="text-slate-300 text-sm">
          Selects the <strong>first matching element</strong>.  
          It accepts CSS selectors: <code>#id</code>, <code>.class</code>, <code>tag</code>.
        </p>

        <CodeBlock
          code={`<p class="student">Ritaja</p>
<p class="student">Swadeep</p>`}
          language="html"
        />

        <CodeBlock
          code={`const firstStudent = document.querySelector(".student");
console.log(firstStudent.innerText);  // Ritaja`}
          language="javascript"
        />

        {/* querySelectorAll */}
        <h3 className="text-lg font-semibold text-slate-200">
          3. document.querySelectorAll()
        </h3>

        <p className="text-slate-300 text-sm">
          Selects <strong>all matching elements</strong>.  
          Returns a <strong>NodeList</strong> (similar to an array).
        </p>

        <CodeBlock
          code={`const allStudents = document.querySelectorAll(".student");
console.log(allStudents.length);   // 2

allStudents.forEach(s => console.log(s.innerText));`}
          language="javascript"
        />

        {/* Classroom Example */}
        <h3 className="text-lg font-semibold text-slate-200">
          Realistic Classroom Example — Coder & AccoTax (Barrackpore)
        </h3>

        <p className="text-slate-300 text-sm">
          Imagine a list of students attending a JavaScript class:
        </p>

        {/* HTML */}
        <CodeBlock
          code={`<ul>
  <li class="std">Mounita</li>
  <li class="std">Pranjali</li>
  <li class="std">Kaustav</li>
</ul>`}
          language="html"
        />

        {/* JS */}
        <CodeBlock
          code={`// Select first student
const first = document.querySelector(".std");
console.log(first.innerText);  // Mounita

// Select all students
const list = document.querySelectorAll(".std");
list.forEach(item => console.log(item.innerText));`}
          language="javascript"
        />

        {/* Selecting by Tag */}
        <h3 className="text-lg font-semibold text-slate-200">
          Selecting by Tag Name
        </h3>

        <CodeBlock
          code={`const allListItems = document.querySelectorAll("li");
console.log(allListItems);`}
          language="javascript"
        />

        {/* Summary */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>
          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><code>getElementById()</code> → Fastest, selects by ID</li>
            <li><code>querySelector()</code> → First match (CSS selector)</li>
            <li><code>querySelectorAll()</code> → All matches (NodeList)</li>
            <li>Most modern websites use <code>querySelector</code> for flexibility</li>
          </ul>
        </section>
      </div>
    );
  }
}
