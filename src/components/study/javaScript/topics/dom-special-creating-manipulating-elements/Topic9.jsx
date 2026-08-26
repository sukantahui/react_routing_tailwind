import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic9 extends Component {
  render() {
    return (
      <div className="space-y-12 text-slate-200 leading-relaxed">

        {/* ============================================================
            HEADER
        ============================================================ */}
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300 flex items-center gap-3">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="3"
                stroke="#38bdf8"
                strokeWidth="1.6"
              />
              <path
                d="M7 9H17M7 13H14"
                stroke="#38bdf8"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            Advanced Template Rendering Engine (Mini React – No Diffing)
          </h1>

          <p className="text-slate-400 text-sm md:text-base">
            In this topic, we will build a **simple rendering engine** using:
            <br />
            • Template functions that generate HTML strings<br />
            • A central <code>state</code> object<br />
            • A <code>render()</code> function that re-renders everything
            <br />
            This is like a **very basic React**, but without the Virtual DOM diffing.
          </p>
        </header>

        {/* ============================================================
            SVG — RENDERING ENGINE OVERVIEW
        ============================================================ */}
        <section className="flex justify-center">
          <svg width="360" height="220" viewBox="0 0 360 220">
            <rect
              x="15"
              y="15"
              width="330"
              height="190"
              rx="14"
              fill="#020617"
              stroke="#1f2937"
            />
            <text x="110" y="40" fill="#38bdf8" fontSize="16">
              Simple Render Engine
            </text>

            <rect x="40" y="70" width="120" height="40" rx="8" fill="#0f172a" />
            <text x="65" y="95" fill="#a5f3fc" fontSize="12">
              state (data)
            </text>

            <rect x="200" y="70" width="120" height="40" rx="8" fill="#0f172a" />
            <text x="218" y="95" fill="#a5f3fc" fontSize="12">
              view(state)
            </text>

            <rect x="120" y="130" width="120" height="50" rx="10" fill="#0f172a" />
            <text x="145" y="160" fill="#4ade80" fontSize="12">
              root.innerHTML
            </text>

            <path
              d="M100 90H190"
              stroke="#38bdf8"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M260 110L210 130"
              stroke="#38bdf8"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M140 130L100 110"
              stroke="#38bdf8"
              strokeWidth="1.5"
              markerEnd="url(#arrowhead)"
            />

            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="3"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
              </marker>
            </defs>
          </svg>
        </section>

        {/* ============================================================
            SECTION 1 — Basic Idea: view(state) → HTML
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            1. Template Function Concept
          </h2>

          <p className="text-slate-300">
            We write a function that **accepts the current state** and returns an **HTML string**.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`// Our template / view function
function view(state) {
  return \`
    <div>
      <h2>Hello, \${state.userName}</h2>
      <p>You have \${state.notifications} notifications.</p>
    </div>
  \`;
}

// Example state
const state = {
  userName: "Student",
  notifications: 3,
};`}
          />
        </section>

        {/* ============================================================
            SECTION 2 — render(root, state)
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            2. The <code>render(root, state)</code> Function
          </h2>

          <p className="text-slate-300">
            The <code>render</code> function takes:
            <br />• a root element (where UI appears)  
            • the latest state  
            • and the view function
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function render(root, state) {
  root.innerHTML = view(state);
}

// Usage:
const root = document.getElementById("app");
render(root, state);`}
          />

          <p className="text-slate-400 text-sm">
            Every time <code>state</code> changes, we call <code>render(root, state)</code> again.
          </p>
        </section>

        {/* ============================================================
            SECTION 3 — Adding Buttons + State Updates
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            3. Adding Interactive Controls (Increase / Reset)
          </h2>

          <p className="text-slate-300">
            We want buttons that change the state and then **re-render** the UI.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`let state = {
  userName: "Student",
  notifications: 0,
};

function view(state) {
  return \`
    <div class="panel">
      <h2>Welcome, \${state.userName}</h2>
      <p>You have <strong>\${state.notifications}</strong> notifications.</p>
      <button id="incBtn">+ Add Notification</button>
      <button id="resetBtn">Reset</button>
    </div>
  \`;
}

function render(root) {
  root.innerHTML = view(state);

  // Re-attach events after every render
  document.getElementById("incBtn").onclick = () => {
    state.notifications++;
    render(root);
  };

  document.getElementById("resetBtn").onclick = () => {
    state.notifications = 0;
    render(root);
  };
}

const root = document.getElementById("app");
render(root);`}
          />

          <p className="text-emerald-300 text-sm">
            Key idea: After we replace <code>innerHTML</code>, we must **attach events again**
            to new elements.
          </p>
        </section>

        {/* ============================================================
            SECTION 4 — Component-Like Functions (Mini React)
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-amber-300">
            4. Component-Like Functions Returning HTML
          </h2>

          <p className="text-slate-300">
            We split UI into small template functions that behave like **stateless components**.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function NotificationBadge(count) {
  const color = count > 0 ? "#22c55e" : "#6b7280";
  const label = count > 0 ? count + " new" : "No new notifications";

  return \`
    <span
      style="
        display:inline-block;
        padding:4px 10px;
        border-radius:999px;
        background:\${color};
        color:white;
        font-size:12px;
      "
    >
      \${label}
    </span>
  \`;
}

function view(state) {
  return \`
    <div>
      <h2>Hi, \${state.userName}</h2>
      <p>Status: \${NotificationBadge(state.notifications)}</p>
    </div>
  \`;
}`}
          />

          <p className="text-slate-400 text-sm">
            You are now basically building a **mini JSX-like system**, but using template strings.
          </p>
        </section>

        {/* ============================================================
            SECTION 5 — Rendering Dynamic Lists from State
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            5. Rendering Lists with Template Helpers
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`let state = {
  todos: [
    { id: 1, text: "Finish JavaScript practice", done: false },
    { id: 2, text: "Revise DOM Special chapter", done: true },
  ],
};

function TodoItem(todo) {
  return \`
    <li data-id="\${todo.id}">
      <input type="checkbox" \${todo.done ? "checked" : ""} />
      <span>\${todo.text}</span>
      <button class="removeBtn">❌</button>
    </li>
  \`;
}

function TodoList(todos) {
  return \`
    <ul>
      \${todos.map(TodoItem).join("")}
    </ul>
  \`;
}

function view(state) {
  return \`
    <div>
      <h2>Todo List</h2>
      \${TodoList(state.todos)}
      <input id="newTask" placeholder="New task" />
      <button id="addBtn">Add</button>
    </div>
  \`;
}`}
          />
        </section>

        {/* ============================================================
            SECTION 6 — Wiring Events After Each Render
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            6. Event Layer: Add / Toggle / Remove
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function attachEvents(root) {
  const addBtn = root.querySelector("#addBtn");
  const input = root.querySelector("#newTask");
  const list = root.querySelector("ul");

  if (addBtn) {
    addBtn.onclick = () => {
      const text = input.value.trim();
      if (!text) return;

      state.todos.push({
        id: Date.now(),
        text,
        done: false,
      });

      render(root);
    };
  }

  if (list) {
    list.onclick = (e) => {
      const li = e.target.closest("li");
      if (!li) return;
      const id = Number(li.dataset.id);

      if (e.target.matches("input[type='checkbox']")) {
        const todo = state.todos.find((t) => t.id === id);
        if (todo) todo.done = !todo.done;
        render(root);
      }

      if (e.target.matches(".removeBtn")) {
        state.todos = state.todos.filter((t) => t.id !== id);
        render(root);
      }
    };
  }
}

function render(root) {
  root.innerHTML = view(state);
  attachEvents(root);
}

const root = document.getElementById("app");
render(root);`}
          />

          <p className="text-slate-400 text-sm">
            We have now combined:
            <br />• <strong>State</strong>  
            • <strong>Template components</strong>  
            • <strong>Render function</strong>  
            • <strong>Event wiring</strong>  
            <br />
            This is a **small framework** already.
          </p>
        </section>

        {/* ============================================================
            SECTION 7 — Styling the Rendered Output
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-pink-300">
            7. Optional — CSS to Make It Look Professional
          </h2>

          <EditableCodeBlock
            language="css"
            initialCode={`.panel {
  background: #020617;
  border: 1px solid #1e293b;
  padding: 16px;
  border-radius: 12px;
  color: #e5e7eb;
  width: 280px;
}

.panel h2 {
  margin: 0 0 8px;
}

.panel button {
  margin-right: 6px;
  margin-top: 8px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.removeBtn {
  margin-left: auto;
  background: #dc2626;
  color: white;
  border-radius: 6px;
  padding: 2px 8px;
  border: none;
  cursor: pointer;
}`}
          />
        </section>

        {/* ============================================================
            FOOTER — SUMMARY
        ============================================================ */}
        <footer className="pt-6 border-t border-slate-800 text-slate-400 text-sm">
          <p className="mb-2">
            In this topic, you built a **Mini React-style rendering system**:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Central <code>state</code> object</li>
            <li><code>view(state)</code> template function</li>
            <li><code>render(root)</code> to refresh UI</li>
            <li>Component-like template helpers (<code>TodoItem</code>, <code>NotificationBadge</code>)</li>
            <li>Dynamic lists + events after every render</li>
          </ul>

          <p className="mt-3">
            These ideas make it very easy to understand **React, Vue, Svelte and other libraries**
            because they follow the same mental model: <b>State → View → Re-render on change</b>.
          </p>
        </footer>
      </div>
    );
  }
}
