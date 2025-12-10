// src/components/study/javaScript/topics/dom-special-creating-manipulating-elements/Topic13.jsx

import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";
import CodePenPlayground from "../../../../../common/CodePenPlayground";

export default class Topic13 extends Component {
  render() {
    return (
      <div className="space-y-12 text-slate-200 leading-relaxed">
        {/* ============================================================
            HEADER
        ============================================================ */}
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300 flex items-center gap-3">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <rect
                x="4"
                y="4"
                width="40"
                height="40"
                rx="10"
                fill="#020617"
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
              <path
                d="M16 20H32M16 26H30M16 32H26"
                stroke="#38bdf8"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            DOM Special – Animated Notification Center (Toast System)
          </h1>

          <p className="text-slate-400 text-sm md:text-base max-w-3xl">
            In this topic, you will build a **professional Notification Center** (toast system) using:
            <b> createElement()</b>, <b>append()</b>, <b>classList</b>,{" "}
            <b>setTimeout()</b>, <b>requestAnimationFrame()</b>, and clean DOM architecture patterns.
            This style of component is used in dashboards, admin panels, ERPs, and modern web apps.
          </p>
        </header>

        {/* ============================================================
            SVG OVERVIEW – FLOW MAP
        ============================================================ */}
        <section className="flex justify-center">
          <svg width="360" height="220" viewBox="0 0 360 220">
            <defs>
              <linearGradient id="toastFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>

            <rect
              x="15"
              y="15"
              width="330"
              height="190"
              rx="16"
              fill="#020617"
              stroke="#1f2937"
            />
            <text x="70" y="40" fill="#e5e7eb" fontSize="15">
              Notification / Toast Flow
            </text>

            {/* Triggers */}
            <rect x="32" y="70" width="110" height="40" rx="10" fill="#0f172a" />
            <text x="45" y="94" fill="#a5f3fc" fontSize="11">
              Button / API / Form
            </text>

            {/* Manager */}
            <rect x="130" y="120" width="120" height="50" rx="10" fill="#0f172a" />
            <text x="142" y="145" fill="#bbf7d0" fontSize="11">
              Toast Manager
            </text>
            <text x="145" y="160" fill="#9ca3af" fontSize="9">
              showToast(message, type)
            </text>

            {/* UI Container */}
            <rect x="260" y="70" width="80" height="100" rx="10" fill="#0f172a" />
            <text x="268" y="97" fill="#f9a8d4" fontSize="11">
              Toast
            </text>
            <text x="268" y="115" fill="#f9a8d4" fontSize="11">
              Container
            </text>

            {/* Arrows */}
            <path
              d="M142 90H260"
              stroke="url(#toastFlow)"
              strokeWidth="1.8"
              markerEnd="url(#toastArrow)"
            />
            <path
              d="M180 120V110"
              stroke="url(#toastFlow)"
              strokeWidth="1.8"
              markerEnd="url(#toastArrow)"
            />
            <path
              d="M250 145H260"
              stroke="url(#toastFlow)"
              strokeWidth="1.8"
              markerEnd="url(#toastArrow)"
            />

            <defs>
              <marker
                id="toastArrow"
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
            PART 1 — What is a Toast Notification Center?
        ============================================================ */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-sky-300">
            1. What is a Toast Notification Center?
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-3xl">
            A **toast** is a small, temporary message that appears on top of the UI and disappears
            automatically. A **Notification Center** is a structured place where these toasts appear,
            stack, animate, and can be dismissed manually.
          </p>

          <ul className="list-disc pl-6 text-sm space-y-1 text-slate-300">
            <li>Shows short messages like <b>“Saved!”</b>, <b>“Error occurred”</b>, <b>“New message”</b>.</li>
            <li>Auto dismisses after a few seconds (e.g., 3–5s).</li>
            <li>Supports multiple types: <b>success</b>, <b>error</b>, <b>warning</b>, <b>info</b>.</li>
            <li>Uses **CSS transitions** + **JS class toggles** for smooth animations.</li>
            <li>Is often implemented as a separate, reusable JS module.</li>
          </ul>
        </section>

        {/* ============================================================
            PART 2 — Basic Structure (HTML + CSS)
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">
            2. Basic Toast Container – HTML & CSS
          </h2>

          <p className="text-slate-300 text-sm md:text-base">
            First, we create a **fixed-position container** that will hold all toast messages.
            Then we design toast cards with **entry/exit animations** using CSS transitions.
          </p>

          <EditableCodeBlock
            language="html"
            initialCode={`<!-- Toast container (fixed on top-right) -->
<div id="toast-root" aria-live="polite" aria-atomic="true"></div>`}
          />

          <EditableCodeBlock
            language="css"
            initialCode={`/* container */
#toast-root {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 9999;
}

/* base toast */
.toast {
  min-width: 220px;
  max-width: 320px;
  padding: 0.75rem 0.9rem;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  color: #0b1120;
  background: #e5e7eb;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  opacity: 0;
  transform: translateX(16px) translateY(8px);
  transition: opacity 0.22s ease-out, transform 0.22s ease-out;
}

/* visible state */
.toast--show {
  opacity: 1;
  transform: translateX(0) translateY(0);
}

/* type colors */
.toast--success { border-left: 4px solid #22c55e; }
.toast--error   { border-left: 4px solid #f97373; }
.toast--warning { border-left: 4px solid #facc15; }
.toast--info    { border-left: 4px solid #38bdf8; }

.toast__icon {
  font-size: 1.1rem;
}

.toast__content {
  flex: 1;
}

.toast__title {
  font-weight: 600;
  margin-bottom: 0.15rem;
}

.toast__close {
  border: none;
  background: transparent;
  color: #0f172a;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 0.25rem;
}`}
          />
        </section>

        {/* ============================================================
            PART 3 — Core JS: showToast(message, options)
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sky-300">
            3. Core JavaScript: <code>showToast(message, options)</code>
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-3xl">
            We&apos;ll now create a **small toast manager** function. This function:
          </p>

          <ul className="list-disc pl-6 text-sm text-slate-300 space-y-1">
            <li>Creates a new <code>div.toast</code> element using <code>document.createElement()</code>.</li>
            <li>Adds proper classes based on the <code>type</code> (success / error / info / warning).</li>
            <li>Appends to the <code>#toast-root</code> container.</li>
            <li>Adds <code>toast--show</code> class once inserted (for entry animation).</li>
            <li>Sets <code>setTimeout</code> to auto-remove after a delay.</li>
          </ul>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const toastRoot = document.getElementById("toast-root");

function showToast(message, options = {}) {
  const {
    type = "info",
    title = "Notification",
    duration = 3000,
  } = options;

  // 1) create toast element
  const toast = document.createElement("div");
  toast.className = \`toast toast--\${type}\`;

  // 2) basic structure: icon + content + close
  const icon = document.createElement("span");
  icon.className = "toast__icon";
  icon.textContent =
    type === "success" ? "✅" :
    type === "error"   ? "❌" :
    type === "warning" ? "⚠️" :
                         "ℹ️";

  const content = document.createElement("div");
  content.className = "toast__content";

  const titleEl = document.createElement("div");
  titleEl.className = "toast__title";
  titleEl.textContent = title;

  const bodyEl = document.createElement("div");
  bodyEl.textContent = message;

  content.append(titleEl, bodyEl);

  const closeBtn = document.createElement("button");
  closeBtn.className = "toast__close";
  closeBtn.innerHTML = "&times;";

  closeBtn.addEventListener("click", () => {
    hideToast(toast);
  });

  toast.append(icon, content, closeBtn);

  // 3) insert into DOM
  toastRoot.appendChild(toast);

  // 4) trigger enter animation
  requestAnimationFrame(() => {
    toast.classList.add("toast--show");
  });

  // 5) auto-remove
  const hideTimer = setTimeout(() => {
    hideToast(toast);
  }, duration);

  // store timer reference in dataset (for future use)
  toast.dataset.timerId = hideTimer;
}

function hideToast(toast) {
  toast.classList.remove("toast--show");
  // wait for CSS transition to finish
  setTimeout(() => {
    toast.remove();
  }, 220);
}`}
          />
        </section>

        {/* ============================================================
            PART 4 — Live Playground (CodePen-style)
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-400">
            4. Live Playground – Try the Notification Center
          </h2>

          <p className="text-slate-300 text-sm md:text-base">
            Use this playground to **experiment** with the toast system: trigger success, error,
            warning, and info toasts. This is perfect for classroom demos.
          </p>

          <CodePenPlayground
            initialHTML={`<div style="padding: 1rem;">
  <h2>Dynamic Toast Notification Center</h2>
  <p>Click a button to show a toast:</p>
  <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.75rem;">
    <button id="btnSuccess">Success</button>
    <button id="btnError">Error</button>
    <button id="btnWarning">Warning</button>
    <button id="btnInfo">Info</button>
  </div>
</div>

<div id="toast-root" aria-live="polite" aria-atomic="true"></div>`}
            initialCSS={`body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: #020617;
  color: #e5e7eb;
}

button {
  padding: 0.4rem 0.7rem;
  border-radius: 0.4rem;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
}

#btnSuccess { background: #22c55e; color: #022c22; }
#btnError   { background: #f97373; color: #450a0a; }
#btnWarning { background: #facc15; color: #431407; }
#btnInfo    { background: #38bdf8; color: #082f49; }

#toast-root {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 9999;
}

/* Toast base */
.toast {
  min-width: 220px;
  max-width: 320px;
  padding: 0.75rem 0.9rem;
  border-radius: 0.6rem;
  font-size: 0.9rem;
  color: #0b1120;
  background: #e5e7eb;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  opacity: 0;
  transform: translateX(16px) translateY(8px);
  transition: opacity 0.22s ease-out, transform 0.22s ease-out;
}

/* visible state */
.toast--show {
  opacity: 1;
  transform: translateX(0) translateY(0);
}

/* types */
.toast--success { border-left: 4px solid #22c55e; }
.toast--error   { border-left: 4px solid #f97373; }
.toast--warning { border-left: 4px solid #facc15; }
.toast--info    { border-left: 4px solid #38bdf8; }

.toast__icon {
  font-size: 1.1rem;
  margin-top: 0.1rem;
}

.toast__content { flex: 1; }

.toast__title {
  font-weight: 600;
  margin-bottom: 0.15rem;
}

.toast__close {
  border: none;
  background: transparent;
  color: #0f172a;
  cursor: pointer;
  font-size: 0.9rem;
  margin-left: 0.25rem;
}`}
            initialJS={`const toastRoot = document.getElementById("toast-root");

function showToast(message, options = {}) {
  const {
    type = "info",
    title = "Notification",
    duration = 3000,
  } = options;

  const toast = document.createElement("div");
  toast.className = "toast toast--" + type;

  const icon = document.createElement("span");
  icon.className = "toast__icon";
  icon.textContent =
    type === "success" ? "✅" :
    type === "error"   ? "❌" :
    type === "warning" ? "⚠️" :
                         "ℹ️";

  const content = document.createElement("div");
  content.className = "toast__content";

  const titleEl = document.createElement("div");
  titleEl.className = "toast__title";
  titleEl.textContent = title;

  const bodyEl = document.createElement("div");
  bodyEl.textContent = message;

  content.append(titleEl, bodyEl);

  const closeBtn = document.createElement("button");
  closeBtn.className = "toast__close";
  closeBtn.innerHTML = "\\u00D7";

  closeBtn.addEventListener("click", () => hideToast(toast));

  toast.append(icon, content, closeBtn);
  toastRoot.appendChild(toast);

  // animate in
  requestAnimationFrame(() => {
    toast.classList.add("toast--show");
  });

  const timer = setTimeout(() => hideToast(toast), duration);
  toast.dataset.timerId = timer;
}

function hideToast(toast) {
  toast.classList.remove("toast--show");
  setTimeout(() => toast.remove(), 230);
}

// demo buttons
document.getElementById("btnSuccess").onclick = () =>
  showToast("Data saved successfully!", { type: "success", title: "Success" });

document.getElementById("btnError").onclick = () =>
  showToast("Something went wrong.", { type: "error", title: "Error" });

document.getElementById("btnWarning").onclick = () =>
  showToast("Please check your input.", { type: "warning", title: "Warning" });

document.getElementById("btnInfo").onclick = () =>
  showToast("Welcome to Coder & AccoTax!", { type: "info", title: "Hello Baba" });`}
          />
        </section>

        {/* ============================================================
            PART 5 — Queue, Max Toasts & Reusable Helper
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-purple-300">
            5. Queue, Maximum Toasts & Reusable Helper Module
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-3xl">
            In real apps, you often want to **limit** the number of visible toasts and keep the API
            clean. Let&apos;s build a tiny <code>ToastManager</code> module with:
          </p>

          <ul className="list-disc pl-6 text-sm text-slate-300 space-y-1">
            <li>Configurable max visible toasts (e.g., 4).</li>
            <li>Reusable helper methods like <code>ToastManager.success()</code>.</li>
            <li>Internal queue array that tracks active toasts.</li>
          </ul>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const ToastManager = (function () {
  const root = document.getElementById("toast-root");
  const maxVisible = 4;
  const active = [];

  function createToast(message, { type = "info", title = "Notification", duration = 3000 } = {}) {
    const id = Date.now() + Math.random().toString(16).slice(2);
    const toast = document.createElement("div");
    toast.className = \`toast toast--\${type}\`;
    toast.dataset.id = id;

    const icon = document.createElement("span");
    icon.className = "toast__icon";
    icon.textContent =
      type === "success" ? "✅" :
      type === "error"   ? "❌" :
      type === "warning" ? "⚠️" :
                           "ℹ️";

    const content = document.createElement("div");
    content.className = "toast__content";

    const titleEl = document.createElement("div");
    titleEl.className = "toast__title";
    titleEl.textContent = title;

    const bodyEl = document.createElement("div");
    bodyEl.textContent = message;

    content.append(titleEl, bodyEl);

    const closeBtn = document.createElement("button");
    closeBtn.className = "toast__close";
    closeBtn.innerHTML = "&times;";

    closeBtn.addEventListener("click", () => removeToast(id, toast));

    toast.append(icon, content, closeBtn);

    return { id, toast, duration };
  }

  function show(message, options) {
    // if too many, remove oldest
    if (active.length >= maxVisible) {
      const oldest = active.shift();
      oldest.toast.classList.remove("toast--show");
      setTimeout(() => oldest.toast.remove(), 220);
    }

    const entry = createToast(message, options);
    active.push(entry);
    root.appendChild(entry.toast);

    requestAnimationFrame(() => {
      entry.toast.classList.add("toast--show");
    });

    entry.timerId = setTimeout(() => removeToast(entry.id, entry.toast), entry.duration);
  }

  function removeToast(id, toastEl) {
    const index = active.findIndex((t) => t.id === id);
    if (index !== -1) {
      const [entry] = active.splice(index, 1);
      clearTimeout(entry.timerId);
    }

    toastEl.classList.remove("toast--show");
    setTimeout(() => toastEl.remove(), 220);
  }

  // public API
  return {
    show,
    success(msg, opts = {}) {
      show(msg, { ...opts, type: "success", title: opts.title || "Success" });
    },
    error(msg, opts = {}) {
      show(msg, { ...opts, type: "error", title: opts.title || "Error" });
    },
    info(msg, opts = {}) {
      show(msg, { ...opts, type: "info", title: opts.title || "Info" });
    },
    warning(msg, opts = {}) {
      show(msg, { ...opts, type: "warning", title: opts.title || "Warning" });
    },
  };
})();`}
          />

          <p className="text-slate-400 text-xs">
            💡 Now you can simply call <code>ToastManager.success("Saved!")</code> from anywhere.
          </p>
        </section>

        {/* ============================================================
            PART 6 — Full Project View & Summary
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-300">
            6. Full Project – Notification Center (Summary Version)
          </h2>

          <p className="text-slate-300 text-sm md:text-base">
            This final snippet shows a **compact but complete** version of the Notification Center.
            You can copy this into a separate <code>toast.js</code> file and reuse it across projects.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`// toast.js
(function () {
  const rootId = "toast-root";
  let root = document.getElementById(rootId);
  if (!root) {
    root = document.createElement("div");
    root.id = rootId;
    document.body.appendChild(root);
  }

  root.style.position = "fixed";
  root.style.top = "1rem";
  root.style.right = "1rem";
  root.style.display = "flex";
  root.style.flexDirection = "column";
  root.style.gap = "0.5rem";
  root.style.zIndex = 9999;

  const maxVisible = 4;
  const active = [];

  function createToast(message, { type = "info", title = "Notification", duration = 3000 } = {}) {
    const id = Date.now() + Math.random().toString(16).slice(2);
    const el = document.createElement("div");
    el.className = "toast toast--" + type;
    el.dataset.id = id;

    const icon = document.createElement("span");
    icon.className = "toast__icon";
    icon.textContent =
      type === "success" ? "✅" :
      type === "error"   ? "❌" :
      type === "warning" ? "⚠️" :
                           "ℹ️";

    const content = document.createElement("div");
    content.className = "toast__content";

    const titleEl = document.createElement("div");
    titleEl.className = "toast__title";
    titleEl.textContent = title;

    const bodyEl = document.createElement("div");
    bodyEl.textContent = message;

    content.append(titleEl, bodyEl);

    const closeBtn = document.createElement("button");
    closeBtn.className = "toast__close";
    closeBtn.innerHTML = "\\u00D7";

    closeBtn.addEventListener("click", () => removeToast(id, el));

    el.append(icon, content, closeBtn);

    return { id, el, duration };
  }

  function show(message, opts) {
    if (active.length >= maxVisible) {
      const oldest = active.shift();
      oldest.el.classList.remove("toast--show");
      setTimeout(() => oldest.el.remove(), 220);
    }

    const entry = createToast(message, opts);
    active.push(entry);
    root.appendChild(entry.el);

    requestAnimationFrame(() => {
      entry.el.classList.add("toast--show");
    });

    entry.timerId = setTimeout(() => removeToast(entry.id, entry.el), entry.duration);
  }

  function removeToast(id, el) {
    const index = active.findIndex((t) => t.id === id);
    if (index !== -1) {
      const [entry] = active.splice(index, 1);
      clearTimeout(entry.timerId);
    }
    el.classList.remove("toast--show");
    setTimeout(() => el.remove(), 220);
  }

  window.ToastCenter = {
    show,
    success(msg, opts = {}) {
      show(msg, { ...opts, type: "success", title: opts.title || "Success" });
    },
    error(msg, opts = {}) {
      show(msg, { ...opts, type: "error", title: opts.title || "Error" });
    },
    warning(msg, opts = {}) {
      show(msg, { ...opts, type: "warning", title: opts.title || "Warning" });
    },
    info(msg, opts = {}) {
      show(msg, { ...opts, type: "info", title: opts.title || "Info" });
    },
  };
})();`}
          />

          <p className="text-slate-400 text-sm">
            📌 Now in any page, you can simply call:
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`ToastCenter.success("Student added successfully!");
ToastCenter.error("Failed to save marks.");
ToastCenter.info("Welcome to Coder & AccoTax.");`}
          />
        </section>

        {/* FOOTER */}
        <footer className="pt-8 pb-6 border-t border-slate-800 text-slate-400 text-sm">
          <p className="mb-1">
            In this **Animated Notification Center** topic, you learned how to design a reusable,
            high-quality toast system with DOM APIs, animations, queues and helpers.
          </p>
          <p>
            This is the same pattern used in real dashboards and SPA frameworks. With this,
            your students move from &quot;JavaScript learner&quot; to **UI engineer** level. 🚀
          </p>
        </footer>
      </div>
    );
  }
}
