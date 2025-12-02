import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Building UI Components Using Events — Modal, Tabs & Accordion
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Modern websites rely heavily on UI components such as modals, tabs, and FAQ accordions.  
          These components are powered by JavaScript events like <strong>click</strong> and <strong>toggle</strong>.  
          You will learn how teachers like <strong>Sukanta Hui</strong> and <strong>Mounita Bhandari</strong>  
          teach these components at Coder & AccoTax, Barrackpore.
        </p>

        {/* =============================
            1. MODAL POPUP
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          1. Modal Popup Component
        </h3>

        <p className="text-slate-300 text-sm">
          A modal is a popup dialog that appears on top of the page.  
          Example: Displaying notification for students like Ritaja or Swadeep.
        </p>

        {/* HTML */}
        <CodeBlock
          language="html"
          code={`<button id="openModal">Open Modal</button>

<div id="modal" style="display:none; position:fixed; inset:0;
background:rgba(0,0,0,0.6); align-items:center; justify-content:center;">
  <div style="background:#1e293b; padding:20px; border-radius:12px; width:300px;">
    <h3>Hello Student!</h3>
    <p>This popup message is for practice.</p>
    <button id="closeModal">Close</button>
  </div>
</div>`}
        />

        {/* JS */}
        <CodeBlock
          language="javascript"
          code={`const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close on background click
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});`}
        />

        <p className="text-slate-400 text-sm">
          Background click closes modal — useful in real UI design.
        </p>

        {/* =============================
            2. TABS COMPONENT
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          2. Tabs Component (Switch Content)
        </h3>

        <p className="text-slate-300 text-sm">
          Tabs allow switching between different content blocks without leaving the page.
        </p>

        {/* HTML */}
        <CodeBlock
          language="html"
          code={`<div class="tabs">
  <button class="tabBtn active" data-target="tab1">Overview</button>
  <button class="tabBtn" data-target="tab2">Examples</button>
  <button class="tabBtn" data-target="tab3">Practice</button>
</div>

<div id="tab1" class="tabContent">Overview content here…</div>
<div id="tab2" class="tabContent" style="display:none;">Examples content here…</div>
<div id="tab3" class="tabContent" style="display:none;">Practice content here…</div>`}
        />

        {/* JS */}
        <CodeBlock
          language="javascript"
          code={`const tabButtons = document.querySelectorAll(".tabBtn");
const tabContents = document.querySelectorAll(".tabContent");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    // Remove active class
    tabButtons.forEach(b => b.classList.remove("active"));

    // Hide all tabs
    tabContents.forEach(c => c.style.display = "none");

    // Activate clicked button
    btn.classList.add("active");

    // Show content
    const target = btn.dataset.target;
    document.getElementById(target).style.display = "block";
  });
});`}
        />

        <p className="text-slate-400 text-sm">
          This technique is used in course pages like JavaScript Basic → Pro on your website.
        </p>

        {/* =============================
            3. ACCORDION (FAQ)
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          3. Accordion (FAQ Toggle)
        </h3>

        <p className="text-slate-300 text-sm">
          Accordions are used frequently in FAQ sections, for example on  
          Coder & AccoTax course pages when students like Mounita or Kaustav check details.
        </p>

        {/* HTML */}
        <CodeBlock
          language="html"
          code={`<div class="faq">
  <div class="question">What is JavaScript?</div>
  <div class="answer" style="display:none;">
    JavaScript is a scripting language for web pages.
  </div>
</div>`}
        />

        {/* JS */}
        <CodeBlock
          language="javascript"
          code={`const questions = document.querySelectorAll(".question");

questions.forEach(q => {
  q.addEventListener("click", () => {
    const answer = q.nextElementSibling;

    // Toggle logic
    if (answer.style.display === "none") {
      answer.style.display = "block";
    } else {
      answer.style.display = "none";
    }
  });
});`}
        />

        <p className="text-slate-400 text-sm">
          Very useful in student portals, notes sections, and help centers.
        </p>

        {/* =============================
            4. Real Classroom Explanation
        ============================== */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          Real Classroom Example — Coder & AccoTax
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          During JavaScript practice sessions at Coder & AccoTax, Barrackpore,  
          students like <strong>Ritaja</strong>, <strong>Mounita</strong>, <strong>Susmita</strong>,  
          and <strong>Devangshu</strong> build UI components such as:
        </p>

        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li>Attendance modal popups</li>
          <li>Tabbed chapters (Loops, Arrays, DOM)</li>
          <li>FAQ accordion for assignment help</li>
        </ul>

        {/* =============================
            SUMMARY
        ============================== */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><strong>Modal</strong> → open/close logic using click events</li>
            <li><strong>Tabs</strong> → show/hide content using dataset attributes</li>
            <li><strong>Accordion</strong> → toggle nextElementSibling</li>
            <li>Events form the backbone of UI interactivity</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            These components are essential in all frontend work taught at Coder & AccoTax.
          </p>
        </section>
      </div>
    );
  }
}
