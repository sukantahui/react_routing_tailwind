import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-12 text-slate-200 leading-relaxed">

        {/* ============================================================
            HEADER
        ============================================================ */}
        <header className="space-y-3">
          <h1 className="text-2xl font-bold text-purple-300 flex items-center gap-3">
            {/* SVG DECORATION */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-purple-400"
            >
              <path
                d="M4 4h16v16H4z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 8h8v8H8z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Appending, Removing & Replacing DOM Elements
          </h1>

          <p className="text-slate-400 text-sm md:text-base">
            In this chapter, we learn how to **add**, **insert**, **remove**, and
            **replace** HTML elements using DOM API methods — the real power behind UI creation.
            These actions replicate what modern frameworks do internally.
          </p>
        </header>

        {/* ============================================================
            WHAT YOU WILL LEARN
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-purple-300 flex gap-2 items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            What You Will Learn
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-300">
            <li>Adding elements dynamically with <b>append()</b> and <b>appendChild()</b></li>
            <li>Inserting elements at the beginning using <b>prepend()</b></li>
            <li>Placing new elements before a specific node using <b>insertBefore()</b></li>
            <li>Removing elements safely using <b>remove()</b> and <b>removeChild()</b></li>
            <li>Replacing existing nodes using <b>replaceChild()</b></li>
            <li>Building interactive UI components with animations</li>
          </ul>
        </section>

        {/* ============================================================
            SECTION 1 — append() & appendChild()
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            1. Adding Elements — append() & appendChild()
          </h2>

          <p className="text-slate-300">
            <b>append()</b> can insert **multiple nodes or text**, while
            <b>appendChild()</b> inserts **only one node** and returns it.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const container = document.getElementById("box");

const msg = document.createElement("p");
msg.textContent = "Hello from append()!";

// append can add multiple items
container.append(msg, " — dynamically added");

// appendChild adds only nodes
const msg2 = document.createElement("p");
msg2.textContent = "Added using appendChild()";

container.appendChild(msg2);`}
          />
        </section>

        {/* ============================================================
            SECTION 2 — prepend()
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-sky-400 flex items-center gap-2">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <path d="M12 19V5M5 12h14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            2. Adding at the Top — prepend()
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const msg = document.createElement("p");
msg.textContent = "I appear at the TOP!";

document.getElementById("box").prepend(msg);`}
          />

          <p className="text-slate-300">
            This is useful for notifications, timelines, chat apps, etc.
          </p>
        </section>

        {/* ============================================================
            SECTION 3 — insertBefore()
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            3. Insert Before a Specific Element — insertBefore()
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const parent = document.getElementById("list");
const newItem = document.createElement("li");
newItem.textContent = "Inserted before Item 2";

const item2 = parent.children[1]; // target element

parent.insertBefore(newItem, item2);`}
          />
        </section>

        {/* ============================================================
            SECTION 4 — remove() & removeChild()
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-red-400 flex items-center gap-2">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            4. Removing Elements — remove() & removeChild()
          </h2>

          <p className="text-slate-300">
            Modern method: <b>remove()</b>  
            Old/better for compatibility: <b>removeChild()</b>
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`// remove()
document.getElementById("adBox").remove();

// removeChild()
const parent = document.getElementById("list");
const li = parent.children[0];
parent.removeChild(li);`}
          />
        </section>

        {/* ============================================================
            SECTION 5 — replaceChild()
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-pink-400 flex items-center gap-2">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            5. Replacing Elements — replaceChild()
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const parent = document.getElementById("profile");

const newNode = document.createElement("h2");
newNode.textContent = "Updated Name";

const oldNode = document.getElementById("username");

parent.replaceChild(newNode, oldNode);`}
          />
        </section>

        {/* ============================================================
            SECTION 6 — Example: Animated Add & Remove
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-emerald-300">
            Example — Animated Add & Remove Buttons
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function addItem() {
  const li = document.createElement("li");
  li.textContent = "New Item";
  li.className = "fade-in";

  document.getElementById("list").append(li);

  // CSS: 
  // .fade-in { animation: fadeIn 0.4s ease-out; }
}

function removeLast() {
  const list = document.getElementById("list");
  if (list.lastChild) {
    list.lastChild.classList.add("fade-out");
    setTimeout(() => list.lastChild.remove(), 300);
  }
}

// CSS:
// @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
// @keyframes fadeOut { from { opacity: 1 } to { opacity: 0 } }`}
          />
        </section>

        {/* ============================================================
            FOOTER
        ============================================================ */}
        <footer className="pt-6 border-t border-slate-800 text-slate-400 text-sm">
          <p>
            In the next chapter, we will explore
            <span className="text-sky-300"> modifying elements (text, HTML, styles, classes) </span>
            and building real UI components using DOM manipulation.
          </p>
        </footer>
      </div>
    );
  }
}
