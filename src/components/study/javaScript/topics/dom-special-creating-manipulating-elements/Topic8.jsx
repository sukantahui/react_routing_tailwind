import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic8 extends Component {
  render() {
    return (
      <div className="space-y-12 text-slate-200 leading-relaxed">

        {/* ============================================================
            HEADER
        ============================================================ */}
        <header className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300 flex items-center gap-3">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 4H21M3 12H21M3 20H21"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Handling Multiple Elements & Bulk DOM Creation
          </h1>

          <p className="text-slate-400 text-sm md:text-base">
            Learn how to create **dozens or thousands of DOM elements** efficiently using loops,
            templates, fragments, and reusable rendering utilities. These techniques are used
            internally by modern JS frameworks.
          </p>
        </header>

        {/* ============================================================
            SVG DIAGRAM — BULK CREATION FLOW
        ============================================================ */}
        <section className="flex justify-center py-4">
          <svg width="360" height="220" viewBox="0 0 360 200">
            <rect x="10" y="10" width="340" height="180" rx="14" fill="#0f172a" stroke="#475569" />
            <text x="90" y="40" fill="#38bdf8" fontSize="16">Bulk DOM Creation</text>

            <rect x="30" y="70" width="300" height="40" rx="8" fill="#1e293b" />
            <text x="120" y="95" fill="#a5f3fc">Loop → Create → Append</text>

            <rect x="30" y="120" width="300" height="40" rx="8" fill="#1e293b" />
            <text x="115" y="145" fill="#a5f3fc">Template → Clone → Insert</text>
          </svg>
        </section>

        {/* ============================================================
            SECTION 1 — BASIC LOOP BASED CREATION
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            1. Creating Multiple Elements with Loops
          </h2>

          <p className="text-slate-300">
            The most common real-world need is to display a list (tasks, products, users).  
            Loops + <code>createElement</code> solve this cleanly.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const items = ["Apple", "Banana", "Orange", "Grapes"];

const ul = document.createElement("ul");

for (const item of items) {
  const li = document.createElement("li");
  li.textContent = item;
  ul.appendChild(li);
}

document.body.appendChild(ul);`}
          />
        </section>

        {/* ============================================================
            SECTION 2 — RENDERING COMPLEX OBJECT ARRAYS
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            2. Rendering Arrays of Objects (Professional UI)
          </h2>

          <p className="text-slate-300">
            Most data in applications comes from objects — user profiles, products, tasks.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const students = [
  { name: "Ritaja", score: 92 },
  { name: "Mounita", score: 88 },
  { name: "Devangshu", score: 95 },
];

const container = document.createElement("div");

for (const s of students) {
  const card = document.createElement("div");
  card.className = "student-card";

  card.innerHTML = \`
    <h3>\${s.name}</h3>
    <p>Score: \${s.score}</p>
  \`;

  container.appendChild(card);
}

document.body.appendChild(container);`}
          />
        </section>

        {/* ============================================================
            SECTION 3 — USING DOCUMENT FRAGMENTS
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            3. Using DocumentFragment for Performance
          </h2>

          <p className="text-slate-300">
            Creating 500+ elements one by one causes **reflows**.  
            A DocumentFragment builds everything in memory first.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const list = document.createDocumentFragment();

for (let i = 1; i <= 500; i++) {
  const div = document.createElement("div");
  div.textContent = "Item " + i;
  list.appendChild(div);
}

document.body.appendChild(list); // One-time render`}
          />
        </section>

        {/* ============================================================
            SECTION 4 — TEMPLATE TAG (PRO LEVEL)
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            4. Using &lt;template&gt; for Clean Dynamic UI
          </h2>

          <p className="text-slate-300">
            Templates allow you to write HTML once and clone it for each item — clean & powerful.
          </p>

          <EditableCodeBlock
            language="html"
            initialCode={`<template id="userTemplate">
  <div class="userCard">
    <h3 class="name"></h3>
    <p class="role"></p>
  </div>
</template>`}
          />

          <EditableCodeBlock
            language="javascript"
            initialCode={`const users = [
  { name: "Kaustav", role: "Developer" },
  { name: "Pranjali", role: "Designer" }
];

const template = document.getElementById("userTemplate");
const container = document.createElement("div");

for (const u of users) {
  const clone = template.content.cloneNode(true);

  clone.querySelector(".name").textContent = u.name;
  clone.querySelector(".role").textContent = u.role;

  container.appendChild(clone);
}

document.body.appendChild(container);`}
          />
        </section>

        {/* ============================================================
            SECTION 5 — REUSABLE renderList() UTILITY
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            5. Creating a Reusable <code>renderList()</code> Function
          </h2>

          <p className="text-slate-300">
            Build your own jQuery-like rendering helper.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function renderList(parent, items, renderFn) {
  const frag = document.createDocumentFragment();

  for (const item of items) {
    const el = renderFn(item);
    frag.appendChild(el);
  }

  parent.appendChild(frag);
}

// Usage:
renderList(document.body, ["A", "B", "C"], (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div;
});`}
          />
        </section>

        {/* ============================================================
            SECTION 6 — PROFESSIONAL TEMPLATE + ANIMATION RENDERER
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            6. Animated Bulk Rendering (Fade-in Cards)
          </h2>

          <p className="text-slate-300">
            Add animations while rendering lists — exactly how modern UI frameworks work.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const products = [
  { title: "Laptop", price: 52000 },
  { title: "Mouse", price: 800 },
  { title: "Keyboard", price: 1600 }
];

function createProductCard(p) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = \`
    <h3>\${p.title}</h3>
    <p>₹\${p.price}</p>
  \`;

  // Animation
  card.style.opacity = 0;
  setTimeout(() => (card.style.opacity = 1), 50);

  return card;
}

renderList(document.body, products, createProductCard);`}
          />
        </section>

        {/* ============================================================
            SECTION 7 — REAL-WORLD PROJECT DATASET RENDER
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            7. Rendering Real-World Data (Students, Tasks, Courses)
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const tasks = [
  { id: 1, text: "Complete JS Assignment", done: false },
  { id: 2, text: "Prepare React Notes", done: true }
];

renderList(document.body, tasks, (t) => {
  const box = document.createElement("div");
  box.className = "task";

  box.innerHTML = \`
    <input type="checkbox" \${t.done ? "checked" : ""} />
    <span>\${t.text}</span>
  \`;

  return box;
});`}
          />
        </section>

        {/* ============================================================
            FOOTER
        ============================================================ */}
        <footer className="pt-6 border-t border-slate-800 text-slate-400 text-sm">
          <p>
            Bulk DOM creation & template rendering are **core frontend engineering skills**.  
            These techniques scale easily from small classroom projects to full web applications.
          </p>
        </footer>
      </div>
    );
  }
}
