import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic6 extends Component {
  render() {
    return (
      <div className="space-y-12 text-slate-200 leading-relaxed">

        {/* ============================================================
            HEADER
        ============================================================ */}
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-sky-300 flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L15 8H9L12 2Z M12 22L9 16H15L12 22Z M2 12L8 15V9L2 12Z M22 12L16 9V15L22 12Z"
                stroke="#38bdf8" strokeWidth="1.5"
              />
            </svg>
            Event Delegation & Smart Dynamic Components
          </h1>

          <p className="text-slate-400 text-sm md:text-base">
            Event delegation allows you to handle interactions **efficiently**, especially when
            working with **dynamic elements** that are added, removed, or updated at runtime.
          </p>
        </header>

        {/* ============================================================
            SVG DIAGRAM — BUBBLING
        ============================================================ */}
        <section>
          <h2 className="text-xl font-semibold text-emerald-400">How Event Bubbling Works</h2>

          <p className="text-slate-300 mb-4">
            When an element is clicked, the event travels upward (bubbles) through its parent
            elements. We can take advantage of this behavior to attach **one listener** for many
            items.
          </p>

          <div className="w-full flex justify-center">
            <svg width="300" height="240" viewBox="0 0 300 240">
              <rect x="30" y="20" width="240" height="200" rx="12" fill="#0f172a" stroke="#475569" />
              <rect x="60" y="60" width="180" height="140" rx="10" fill="#1e293b" stroke="#38bdf8" />
              <rect x="90" y="100" width="120" height="80" rx="8" fill="#0ea5e9" />
              <text x="100" y="145" fill="white" fontSize="14">Clicked Element</text>
              <text x="80" y="50" fill="#38bdf8" fontSize="12">Bubbles Up → Parent</text>
              <text x="40" y="15" fill="#38bdf8" fontSize="12">→ Document</text>
            </svg>
          </div>
        </section>

        {/* ============================================================
            SIMPLE EXAMPLE — WRONG WAY
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            ❌ The Wrong Way — Adding Many Event Listeners
          </h2>

          <p className="text-slate-300">
            If you add listeners to every single button, your app becomes slow and hard to update.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const buttons = document.querySelectorAll(".delete");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    console.log("Deleting item...");
  });
});`}
          />

          <p className="text-yellow-400 text-sm">
            Problem: If items are added later, newly added buttons will NOT have click events!
          </p>
        </section>

        {/* ============================================================
            CORRECT WAY — EVENT DELEGATION
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            ✅ The Smart Way — Event Delegation
          </h2>

          <p className="text-slate-300">
            Instead of attaching 20 listeners, we attach **one listener to the parent**, and detect
            which child was clicked.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`document.querySelector("#list").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    console.log("Delete pressed for:", e.target.dataset.id);
  }
});`}
          />

          <p className="text-emerald-400 text-sm">
            Meaning → Even if items are added later, the same parent listener handles everything.
          </p>
        </section>

        {/* ============================================================
            REAL EXAMPLE — DYNAMIC TODO LIST
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            Real Example: Dynamic Todo List (Add / Delete Using Delegation)
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const list = document.getElementById("todoList");
const input = document.getElementById("taskInput");

// Add Task
document.getElementById("addBtn").addEventListener("click", () => {
  const li = document.createElement("li");
  li.innerHTML = \`
    \${input.value}
    <button class="delete">❌</button>
  \`;
  list.appendChild(li);
  input.value = "";
});

// Delete Task (event delegation)
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});`}
          />

          <p className="text-slate-300">
            This is exactly how modern UI libraries efficiently update dynamic lists.
          </p>
        </section>

        {/* ============================================================
            EXAMPLE — MULTI-ACTION CARDS
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            Advanced Example — Multi-Action Cards
          </h2>

          <p className="text-slate-300">
            Each card has 3 actions but we still use **one** parent event listener.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`document.querySelector("#cards").addEventListener("click", (e) => {
  const card = e.target.closest(".card");

  if (!card) return;

  if (e.target.matches(".edit")) {
    console.log("Editing:", card.dataset.id);
  }

  if (e.target.matches(".delete")) {
    card.remove();
  }

  if (e.target.matches(".view")) {
    alert("Viewing card details...");
  }
});`}
          />
        </section>

        {/* ============================================================
            SVG — SMART COMPONENT ARCHITECTURE
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            Smart Component Architecture (How Professionals Think)
          </h2>

          <p className="text-slate-300">
            Professional UI structure uses parent controllers that manage children.
            Like React components but manually.
          </p>

          <div className="w-full flex justify-center">
            <svg width="360" height="230" viewBox="0 0 360 230">
              <rect x="20" y="20" width="320" height="180" rx="12" fill="#0f172a" stroke="#475569"/>
              <text x="100" y="45" fill="#38bdf8">Parent Controller</text>

              <rect x="40" y="70" width="280" height="40" rx="8" fill="#1e293b"/>
              <text x="120" y="95" fill="#a5f3fc">Child Element 1</text>

              <rect x="40" y="120" width="280" height="40" rx="8" fill="#1e293b"/>
              <text x="120" y="145" fill="#a5f3fc">Child Element 2</text>

              <text x="70" y="185" fill="#38bdf8" fontSize="12">
                Events bubble → Parent handles everything
              </text>
            </svg>
          </div>
        </section>

        {/* ============================================================
            FOOTER
        ============================================================ */}
        <footer className="pt-6 border-t border-slate-800 text-slate-400 text-sm">
          <p>
            You now understand event delegation and smart event architecture—
            foundational skills required for frameworks like <b>React, Vue, and Svelte</b>.
          </p>
        </footer>
      </div>
    );
  }
}
