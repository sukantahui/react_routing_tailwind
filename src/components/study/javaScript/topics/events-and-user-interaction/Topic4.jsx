import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Form Handling & Simple Validation in JavaScript
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Forms allow users to input information.  
          In JavaScript, validating a form before submission is very important —  
          especially in real applications like Coder & AccoTax admission forms.  
        </p>

        {/* -------------------------
            1. Basic Form Structure
        --------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. Basic HTML Form
        </h3>

        <CodeBlock
          language="html"
          code={`<form id="myForm">
  <input type="text" id="nameInput" placeholder="Enter name" />
  <button type="submit">Submit</button>
</form>`}
        />

        <CodeBlock
          language="javascript"
          code={`document.getElementById("myForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Stop form from refreshing
  const n = document.getElementById("nameInput").value;

  if (n.trim() === "") {
    alert("Name cannot be empty");
    return;
  }

  alert("Form submitted by " + n);
});`}
        />

        <p className="text-slate-400 text-sm">
          If Devangshu or Pranjali enters nothing → validation stops the form.
        </p>

        {/* -------------------------
            2. Email Validation
        --------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          2. Email Validation
        </h3>

        <CodeBlock
          language="html"
          code={`<form id="emailForm">
  <input type="email" id="email" placeholder="Enter email" />
  <button>Submit</button>
</form>`}
        />

        <CodeBlock
          language="javascript"
          code={`document.getElementById("emailForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;

  const pattern = /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/;

  if (!pattern.test(email)) {
    alert("Invalid email. Try again.");
    return;
  }

  alert("Valid Email: " + email);
});`}
        />

        <p className="text-slate-400 text-sm">
          This is the same pattern teachers like <strong>Sukanta Hui</strong> and 
          <strong> Tanusree Hui</strong> teach in JS classes.
        </p>

        {/* -------------------------
            3. Mark Entry Validation (Coder & AccoTax Classroom)
        --------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          3. Mark Entry Validation (Coder & AccoTax)
        </h3>

        <p className="text-slate-300 text-sm">
          In practice, we often validate whether marks are within a valid range.
        </p>

        <CodeBlock
          language="html"
          code={`<form id="marksForm">
  <input type="number" id="marks" placeholder="Enter marks (0–100)" />
  <button>Check</button>
</form>`}
        />

        <CodeBlock
          language="javascript"
          code={`document.getElementById("marksForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const m = parseInt(document.getElementById("marks").value);

  if (isNaN(m) || m < 0 || m > 100) {
    alert("Invalid Marks! Enter 0–100.");
    return;
  }

  alert("Marks Entered: " + m);
});`}
        />

        {/* -------------------------
            4. Full Admission Form Example (Coder & AccoTax)
        --------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          4. Admission Form Example – Coder & AccoTax (Barrackpore)
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          This example shows validation similar to the real admission form students  
          like <strong>Ritaja</strong>, <strong>Mounita</strong>, <strong>Susmita</strong> fill at Coder & AccoTax.
        </p>

        <CodeBlock
          language="html"
          code={`<form id="admissionForm">
  <input type="text" id="studentName" placeholder="Full Name" />
  <input type="number" id="age" placeholder="Age" />
  <input type="text" id="course" placeholder="Preferred Course" />
  <button>Submit</button>
</form>`}
        />

        <CodeBlock
          language="javascript"
          code={`document.getElementById("admissionForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("studentName").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const course = document.getElementById("course").value.trim();

  if (name === "" || age === "" || course === "") {
    alert("All fields are required");
    return;
  }

  if (age < 10 || age > 60) {
    alert("Age must be between 10 and 60");
    return;
  }

  alert("Admission Form Submitted Successfully! Welcome " + name);
});`}
        />

        {/* -------------------------
            Summary
        --------------------------- */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><strong>submit</strong> event triggers form validation</li>
            <li><strong>preventDefault()</strong> stops the page refresh</li>
            <li>Validate empty fields, email format, number range</li>
            <li>Useful for login forms, registration forms, admission forms</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            Coder & AccoTax teaches these patterns in real-world JavaScript workshops in Barrackpore.
          </p>
        </section>
      </div>
    );
  }
}
