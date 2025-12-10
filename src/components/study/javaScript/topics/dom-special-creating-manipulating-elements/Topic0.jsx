import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-10 text-slate-200 leading-relaxed">

        {/* ============================================================
            HEADER
        ============================================================ */}
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-sky-300">
            Creating Elements Dynamically in the DOM
          </h1>

          <p className="text-slate-400 text-sm md:text-base">
            Learn how JavaScript creates elements <b>programmatically</b> using
            <code className="text-sky-300"> createElement() </code>,
            <code className="text-sky-300"> createTextNode() </code>,
            and other core DOM APIs.  
            These concepts are the foundation of how modern frameworks like React actually work.
          </p>
        </header>

        {/* ============================================================
            SECTION 1 — WHY DOM CREATION?
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            Why Create Elements Using JavaScript?
          </h2>

          <p className="text-slate-300">
            JavaScript lets you create HTML elements <i>without writing them in HTML</i>.
            This skill helps you:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li>Build UI dynamically (cards, alerts, menus, lists)</li>
            <li>Manipulate UI based on user input</li>
            <li>Create elements from API data</li>
            <li>Generate components programmatically</li>
            <li>Understand framework internals (React, Vue, Angular)</li>
          </ul>
        </section>

        {/* ============================================================
            SECTION 2 — createElement()
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            1. document.createElement()
          </h2>

          <p className="text-slate-300">
            This method creates a new HTML element in memory.  
            It will NOT appear on the page until you append it.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const box = document.createElement("div");
console.log(box); // <div></div>`}
          />

          <p className="text-slate-300">
            You can later update text, classes, styles, attributes, and more.
          </p>
        </section>

        {/* ============================================================
            SECTION 3 — createTextNode()
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            2. createTextNode()
          </h2>

          <p className="text-slate-300">
            Creates plain text safely — better than innerHTML when only text is needed.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const textNode = document.createTextNode("Hello Baba!");
console.log(textNode);`}
          />

          <p className="text-slate-300">
            Text nodes are often attached using
            <code className="text-sky-300"> appendChild() </code>.
          </p>
        </section>

        {/* ============================================================
            SECTION 4 — Example 1: Card Component
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            Example 1 — Creating a Card Component Programmatically
          </h2>

          <p className="text-slate-300">
            This example builds a full card with a title, description, and button.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const card = document.createElement("div");
card.className = "card";

// Title
const title = document.createElement("h2");
title.textContent = "Coder & AccoTax";

// Description
const desc = document.createElement("p");
desc.textContent = "Learn JavaScript the professional way.";

// Button
const btn = document.createElement("button");
btn.textContent = "Explore";

// Assemble card
card.append(title);
card.append(desc);
card.append(btn);

// Add to page
document.body.append(card);`}
          />
        </section>

        {/* ============================================================
            SECTION 5 — Example 2: Notification Box
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            Example 2 — Building a Notification (Toast) Box
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function showNotification(message) {
  const box = document.createElement("div");
  box.className = "notification";
  
  const text = document.createTextNode(message);
  box.appendChild(text);

  document.body.append(box);

  setTimeout(() => box.remove(), 3000);
}

showNotification("Welcome to DOM Special Class!");`}
          />

          <p className="text-slate-300">
            This is how real websites create auto-disappearing toast messages.
          </p>
        </section>

        {/* ============================================================
            SECTION 6 — Example 3: Loop-Based Creation
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            Example 3 — Creating Multiple Items Using Loops
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const fruits = ["Mango", "Banana", "Apple", "Lichi"];

const ul = document.createElement("ul");

for (const item of fruits) {
  const li = document.createElement("li");
  li.textContent = item;
  ul.appendChild(li);
}

document.body.appendChild(ul);`}
          />

          <p className="text-slate-300">
            Useful for dynamic menus, lists, dropdowns, and table rows.
          </p>
        </section>

        {/* ============================================================
            SECTION 7 — Utility Function
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            Reusable DOM Utility — createElement Helper
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function make(tag, text = "", classes = "") {
  const el = document.createElement(tag);
  if (text) el.textContent = text;
  if (classes) el.className = classes;
  return el;
}

// Usage:
const message = make("div", "Dynamic Box", "msg-box");
document.body.append(message);`}
          />
        </section>

        {/* ============================================================
            FOOTER
        ============================================================ */}
        <footer className="pt-6 border-t border-slate-800 text-slate-400 text-sm">
          <p>
            Next, we will explore
            <span className="text-sky-300">
              {" "}
              appending, inserting, and removing DOM elements
            </span>
            — the core of dynamic UI building.
          </p>
        </footer>
      </div>
    );
  }
}
