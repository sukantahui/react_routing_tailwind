import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-12 text-slate-200 leading-relaxed">

        {/* ============================================================
            HEADER
        ============================================================ */}
        <header className="space-y-3">
          <h1 className="text-2xl font-bold text-sky-300 flex items-center gap-3">

            {/* SVG DECORATION */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" />
            </svg>

            Modifying DOM Elements: Content, Classes, Styles & Attributes
          </h1>

          <p className="text-slate-400 text-sm md:text-base">
            In this chapter, we learn how to **change text**, **insert HTML**, **style elements dynamically**,  
            **add or remove CSS classes**, and **manipulate attributes** on DOM nodes —  
            the foundation of interactive UI development.
          </p>
        </header>

        {/* ============================================================
            WHAT YOU WILL LEARN
        ============================================================ */}
        <section>
          <h2 className="text-xl font-semibold text-sky-300 mb-3 flex gap-2 items-center">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            What You Will Learn
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li>Changing element text using <b>textContent</b></li>
            <li>Inserting formatted HTML using <b>innerHTML</b></li>
            <li>Using <b>classList</b> to add, remove, toggle and replace classes</li>
            <li>Styling elements with <b>element.style</b></li>
            <li>Managing attributes using <b>setAttribute()</b>, <b>getAttribute()</b>, <b>removeAttribute()</b></li>
            <li>Building dynamic UI interactions</li>
          </ul>
        </section>

        {/* ============================================================
            SECTION 1 — textContent vs innerHTML
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h10M4 18h8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            1. Updating Element Text — textContent vs innerHTML
          </h2>

          <p className="text-slate-300">
            <b>textContent</b> sets plain text only.  
            <b>innerHTML</b> allows HTML formatting.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const box = document.getElementById("messageBox");

// textContent — Safe, plain text
box.textContent = "Hello, this is plain text";

// innerHTML — Can include tags
box.innerHTML = "<b>Hello!</b> <i>This is formatted HTML</i>";`}
          />
        </section>

        {/* ============================================================
            SECTION 2 — classList (add, remove, toggle, replace)
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M6 12h12M12 6v12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            2. Working with Classes — classList Operations
          </h2>

          <p className="text-slate-300">
            The <b>classList</b> API allows clean manipulation of CSS classes.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const card = document.getElementById("card");

// Add a class
card.classList.add("highlight");

// Remove a class
card.classList.remove("highlight");

// Toggle a class (on/off)
card.classList.toggle("active");

// Replace a class
card.classList.replace("old-style", "new-style");`}
          />
        </section>

        {/* ============================================================
            SECTION 3 — Styling with element.style
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-yellow-300 flex items-center gap-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            3. Changing CSS Styles Dynamically
          </h2>

          <p className="text-slate-300">
            Use <b>element.style</b> to directly modify inline styles.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const box = document.getElementById("box");

box.style.backgroundColor = "purple";
box.style.padding = "20px";
box.style.borderRadius = "12px";
box.style.color = "white";`}
          />
        </section>

        {/* ============================================================
            SECTION 4 — Attributes (set, get, remove)
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-red-300 flex items-center gap-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            4. Working with HTML Attributes
          </h2>

          <p className="text-slate-300">
            Attributes control extra properties of HTML elements.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const img = document.getElementById("heroImage");

// Set attribute
img.setAttribute("src", "banner.png");

// Get attribute
const source = img.getAttribute("src");
console.log(source);

// Remove attribute
img.removeAttribute("alt");`}
          />
        </section>

        {/* ============================================================
            SECTION 5 — Example: Dynamic Profile Card Update
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-pink-300">
            Example — Interactive Profile Card Updater
          </h2>

          <p className="text-slate-300">
            A real-life example where we update classes, content, and attributes together.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function updateProfile() {
  const name = document.getElementById("username");
  const avatar = document.getElementById("avatar");
  const card = document.getElementById("profileCard");

  name.textContent = "Ritaja Ghosh";
  avatar.setAttribute("src", "ritaja.png");

  // Styling
  card.style.border = "2px solid #38bdf8";

  // Highlight animation class
  card.classList.add("pulse");

  setTimeout(() => {
    card.classList.remove("pulse");
  }, 1200);
}

// CSS:
// .pulse { animation: pulseAnim 1.2s ease-out; }
// @keyframes pulseAnim {
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// }`}
          />
        </section>

        {/* ============================================================
            FOOTER
        ============================================================ */}
        <footer className="pt-6 border-t border-slate-800 text-slate-400 text-sm">
          <p>
            In the next chapter, we will explore
            <span className="text-purple-300"> creating dynamic UI components </span>
            like notifications, cards, alert boxes, and interactive widgets.
          </p>
        </footer>
      </div>
    );
  }
}
