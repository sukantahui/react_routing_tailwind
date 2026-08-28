// src/components/study/javaScript/topics/dom-special-creating-manipulating-elements/Topic10.jsx

import React, { Component } from "react";
import CodePenPlayground from "../../../../../common/CodePenPlayground";

export default class Topic10 extends Component {
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
                d="M14 18H34M14 24H28M14 30H22"
                stroke="#38bdf8"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            DOM Special – Advanced Patterns & Power Techniques
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            In this topic, you will learn <strong>advanced DOM patterns</strong> used in modern,
            high-performance JavaScript applications – from cloning and batch updates to observers,
            animations and small helper libraries (a mini jQuery style).
          </p>
        </header>

        {/* ============================================================
            SVG OVERVIEW MAP
        ============================================================ */}
        <section className="flex justify-center">
          <svg width="360" height="220" viewBox="0 0 360 220">
            <defs>
              <linearGradient id="domFlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#a855f7" />
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
            <text x="70" y="40" fill="#e5e7eb" fontSize="16">
              Advanced DOM Power Flow
            </text>

            <rect x="30" y="70" width="120" height="40" rx="10" fill="#0f172a" />
            <text x="50" y="95" fill="#a5f3fc" fontSize="12">
              Create / Clone
            </text>

            <rect x="210" y="70" width="120" height="40" rx="10" fill="#0f172a" />
            <text x="228" y="95" fill="#a5f3fc" fontSize="12">
              Batch &amp; Templates
            </text>

            <rect x="30" y="140" width="120" height="40" rx="10" fill="#0f172a" />
            <text x="52" y="165" fill="#bbf7d0" fontSize="12">
              Events &amp; UI
            </text>

            <rect x="210" y="140" width="120" height="40" rx="10" fill="#0f172a" />
            <text x="218" y="165" fill="#f9a8d4" fontSize="12">
              Observers &amp; Perf
            </text>

            <path
              d="M150 90H210"
              stroke="url(#domFlow)"
              strokeWidth="1.8"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M270 110L270 140"
              stroke="url(#domFlow)"
              strokeWidth="1.8"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M90 110L90 140"
              stroke="url(#domFlow)"
              strokeWidth="1.8"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M150 160H210"
              stroke="url(#domFlow)"
              strokeWidth="1.8"
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
            1. cloneNode() — Deep, Precise & Complete Reference
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sky-300">
            1. cloneNode() — Precise Behavior, Deep / Shallow Copy, Edge Cases, Best Use
          </h2>

          {/* SVG DIAGRAM: Original vs Clone */}
          <svg width="380" height="150" className="bg-transparent">
            <rect
              x="20"
              y="25"
              width="150"
              height="110"
              rx="12"
              fill="#020617"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            <text x="40" y="55" fill="#38bdf8" fontSize="13">
              Original Node
            </text>
            <text x="40" y="75" fill="#9ca3af" fontSize="10">
              Type: Element / Text
            </text>

            <rect
              x="210"
              y="25"
              width="150"
              height="110"
              rx="12"
              fill="#020617"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <text x="230" y="55" fill="#22c55e" fontSize="13">
              Cloned Node
            </text>
            <text x="230" y="75" fill="#9ca3af" fontSize="10">
              New object &amp; ID
            </text>

            <line
              x1="170"
              y1="80"
              x2="210"
              y2="80"
              stroke="#a855f7"
              strokeWidth="2"
              markerEnd="url(#arrowHeadClone)"
            />

            <defs>
              <marker
                id="arrowHeadClone"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0 0 L6 3 L0 6 Z" fill="#a855f7" />
              </marker>
            </defs>
          </svg>

          {/* Syntax + Return Type */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-emerald-300">
              Full Syntax, Parameters &amp; Return Type
            </h3>

            <pre className="bg-slate-900 p-4 rounded-xl text-sm whitespace-pre-wrap">
{`// Syntax:
const clone = node.cloneNode(deep);

// Parameters:
   deep (optional: boolean)
     false (default) → Shallow clone:
         • Clones ONLY the node
         • Does NOT clone children
     true → Deep clone:
         • Clones the node + ALL descendants

Return Type:
   Node — same concrete type as original:
   Element, Text, Comment, DocumentFragment, etc.

Important Notes:
   • clone is NOT inserted in DOM automatically
   • clone === node → false (new reference)
   • IDs are copied—must fix manually
   • Event listeners are NOT cloned
   • Node.dataset is cloned normally
   • Custom JS properties are NOT copied
   • <template>.content deep cloning behaves specially (uses fragments)
`}
            </pre>
          </div>

          {/* What gets copied vs not */}
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
              <h4 className="font-semibold text-sky-300 mb-2">✅ What IS copied</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li>The element type (DIV, LI, BUTTON…)</li>
                <li>
                  All attributes:
                  <ul className="list-disc pl-5">
                    <li>class</li>
                    <li>style</li>
                    <li>data-* attributes (dataset)</li>
                    <li>id (⚠️ Duplicate IDs risk)</li>
                  </ul>
                </li>
                <li>Text nodes (deep clone only)</li>
                <li>Child elements (deep clone only)</li>
                <li>Inline style properties</li>
                <li>Form state (value, checked, etc.) is usually copied</li>
              </ul>
            </div>

            <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
              <h4 className="font-semibold text-rose-300 mb-2">❌ What is NOT copied</h4>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li>Event listeners added via <code>addEventListener()</code></li>
                <li>Custom JS properties (e.g. <code>element.customData</code>)</li>
                <li>External references / closures you attached manually</li>
                <li>Runtime UI state like cursor position in input</li>
                <li>Attached external objects (Maps, Sets, etc.)</li>
              </ul>
            </div>
          </div>

          {/* Example 1 — Shallow vs Deep Clone */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-300">
              Example 1 — Shallow vs Deep Clone
            </h3>
            <CodePenPlayground
              initialJS={`const box = document.getElementById("box");

// shallow clone → NO children
const shallow = box.cloneNode();
console.log("Shallow clone:", shallow.outerHTML);

// deep clone → FULL subtree
const deep = box.cloneNode(true);
console.log("Deep clone:", deep.outerHTML);

// Example visual in DOM (if #box exists)
document.body.appendChild(document.createElement("hr"));
document.body.appendChild(deep);`}
            />
          </div>

          {/* Example 2 — Event listeners not copied */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-300">
              Example 2 — Event Listeners Are NOT Copied
            </h3>
            <CodePenPlayground
              initialHTML={`<button id="mainBtn">Original Button</button>`}
              initialJS={`const btn = document.querySelector("#mainBtn");

btn.addEventListener("click", () => console.log("Clicked main button"));

const clone = btn.cloneNode(true);
clone.textContent = "Cloned Button";
document.body.appendChild(clone);

clone.addEventListener("click", () => console.log("Clone clicked"));`}
            />
            <p className="text-xs text-slate-400">
              💡 Even with <code>cloneNode(true)</code>, event listeners must be attached to the clone
              separately.
            </p>
          </div>

          {/* Example 3 — cloneNode with <template> & DocumentFragment */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-300">
              Example 3 — cloneNode() with &lt;template&gt; and DocumentFragment
            </h3>
            <CodePenPlayground
              initialHTML={`<template id="cardTemplate">
  <article class="card">
    <h3 class="card-title">Title</h3>
    <p class="card-body">Body text here…</p>
  </article>
</template>

<div id="cardMount"></div>`}
              initialCSS={`.card {
  padding: 12px 16px;
  margin: 8px 0;
  border-radius: 10px;
  background: #0f172a;
  color: #e5e7eb;
  border: 1px solid #1f2937;
}

.card-title {
  font-weight: 600;
  color: #38bdf8;
  margin-bottom: 4px;
}

.card-body {
  font-size: 14px;
  color: #cbd5f5;
}`}
              initialJS={`const tmpl = document.getElementById("cardTemplate");
const mount = document.getElementById("cardMount");

// template.content is a DocumentFragment
const fragmentClone = tmpl.content.cloneNode(true);
fragmentClone.querySelector(".card-title").textContent = "Cloned Card";
fragmentClone.querySelector(".card-body").textContent =
  "This card comes from cloneNode(true) on template.content.";

mount.appendChild(fragmentClone);`}
            />
          </div>

          {/* Example 4 — Fix duplicate IDs */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-purple-300">
              Example 4 — Avoid Duplicate IDs After Cloning
            </h3>
            <CodePenPlayground
              initialHTML={`<div id="userCard" class="user-card">
  <h3 id="userName">Student Name</h3>
  <button class="edit-btn">Edit</button>
</div>`}
              initialCSS={`.user-card {
  padding: 10px 14px;
  border-radius: 10px;
  margin: 6px 0;
  background: #020617;
  border: 1px solid #1f2937;
  color: #e5e7eb;
}

.edit-btn {
  margin-top: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  background: #38bdf8;
  color: #020617;
  border: none;
  cursor: pointer;
}`}
              initialJS={`const card = document.getElementById("userCard");
const cloned = card.cloneNode(true);

// Fix duplicate ID
cloned.id = "userCardCopy";
const nameEl = cloned.querySelector("#userName");
// IDs duplicated inside clone — better to remove or change
if (nameEl) {
  nameEl.id = "userNameCopy";
  nameEl.textContent = "Cloned Student";
}

document.body.appendChild(cloned);`}
            />
          </div>

          {/* Tips & Best Practices */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-amber-300">
              Pro Tips &amp; Best Practices with cloneNode()
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-300 text-sm">
              <li>
                Use <strong>deep clones</strong> with hidden templates (cards, list items, buttons) to
                render repeated UI.
              </li>
              <li>
                Combine <code>cloneNode(true)</code> with <code>DocumentFragment</code> for high-performance
                list rendering.
              </li>
              <li>
                Always review and fix duplicated <code>id</code> attributes on clones.
              </li>
              <li>Attach event listeners to clones explicitly after cloning.</li>
              <li>
                Avoid cloning extremely large trees repeatedly — create once, reuse carefully or split into
                smaller components.
              </li>
              <li>
                Prefer <code>cloneNode()</code> over raw <code>innerHTML</code> when you want safer DOM
                generation and fewer XSS risks.
              </li>
            </ul>
          </div>
        </section>

        {/* ============================================================
            EXTRA Enhancements — cloneNode() Professional Add-ons
        ============================================================ */}

        {/* A. Visual Tree Diagram */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-indigo-300">
            Visual Understanding — How cloneNode() Copies the DOM Tree
          </h2>

          <svg width="500" height="260">
            {/* Left: Original */}
            <text x="40" y="25" fill="#38bdf8" fontSize="14">
              Original DOM Tree
            </text>

            <rect
              x="40"
              y="40"
              width="80"
              height="40"
              rx="8"
              fill="#0f172a"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            <text x="55" y="65" fill="#38bdf8" fontSize="12">
              DIV
            </text>

            <rect
              x="30"
              y="100"
              width="70"
              height="35"
              rx="6"
              fill="#0f172a"
              stroke="#fbbf24"
              strokeWidth="2"
            />
            <text x="40" y="122" fill="#fbbf24" fontSize="10">
              P
            </text>

            <rect
              x="120"
              y="100"
              width="90"
              height="35"
              rx="6"
              fill="#0f172a"
              stroke="#a855f7"
              strokeWidth="2"
            />
            <text x="135" y="122" fill="#a855f7" fontSize="10">
              BUTTON
            </text>

            {/* Right: Deep clone */}
            <text x="260" y="25" fill="#22c55e" fontSize="14">
              Deep Clone Output
            </text>

            <rect
              x="260"
              y="40"
              width="80"
              height="40"
              rx="8"
              fill="#0f172a"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <text x="275" y="65" fill="#22c55e" fontSize="12">
              DIV
            </text>

            <rect
              x="250"
              y="100"
              width="70"
              height="35"
              rx="6"
              fill="#0f172a"
              stroke="#fbbf24"
              strokeWidth="2"
            />
            <text x="260" y="122" fill="#fbbf24" fontSize="10">
              P
            </text>

            <rect
              x="340"
              y="100"
              width="90"
              height="35"
              rx="6"
              fill="#0f172a"
              stroke="#a855f7"
              strokeWidth="2"
            />
            <text x="355" y="122" fill="#a855f7" fontSize="10">
              BUTTON
            </text>
          </svg>

          <p className="text-slate-400 text-sm max-w-2xl">
            In a <strong>deep clone</strong>, the entire subtree is recreated. In a{" "}
            <strong>shallow clone</strong>, only the root node is copied – no children.
          </p>
        </section>

        {/* B. cloneNode() Comparison Table */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">
            cloneNode() vs innerHTML vs &lt;template&gt; — Which Should You Use?
          </h2>

          <table className="w-full text-sm border border-slate-700">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="p-2 border">Method</th>
                <th className="p-2 border">Copies Events?</th>
                <th className="p-2 border">Safety</th>
                <th className="p-2 border">Performance</th>
                <th className="p-2 border">Typical Use</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr>
                <td className="border p-2">cloneNode(true)</td>
                <td className="border p-2">❌ No</td>
                <td className="border p-2">✅ Safe (DOM-based)</td>
                <td className="border p-2">⭐⭐⭐⭐</td>
                <td className="border p-2">Component templates, repeated UI</td>
              </tr>
              <tr>
                <td className="border p-2">innerHTML</td>
                <td className="border p-2">❌ No</td>
                <td className="border p-2 text-red-400">⚠️ Risk of XSS if misused</td>
                <td className="border p-2">⭐⭐⭐</td>
                <td className="border p-2">Quick HTML injection from strings</td>
              </tr>
              <tr>
                <td className="border p-2">&lt;template&gt;</td>
                <td className="border p-2">N/A (relies on fragment clones)</td>
                <td className="border p-2">✅ Very Safe &amp; structured</td>
                <td className="border p-2">⭐⭐⭐⭐⭐</td>
                <td className="border p-2">Professional, scalable UI systems</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* C. Browser Compatibility */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-pink-300">Browser Support</h2>

          <table className="w-full text-sm border border-slate-700">
            <thead className="bg-slate-800 text-sky-300">
              <tr>
                <th className="border p-2">Browser</th>
                <th className="border p-2">Support</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              <tr>
                <td className="border p-2">Chrome</td>
                <td className="border p-2">✔️ Yes</td>
              </tr>
              <tr>
                <td className="border p-2">Firefox</td>
                <td className="border p-2">✔️ Yes</td>
              </tr>
              <tr>
                <td className="border p-2">Safari</td>
                <td className="border p-2">✔️ Yes</td>
              </tr>
              <tr>
                <td className="border p-2">Edge</td>
                <td className="border p-2">✔️ Yes</td>
              </tr>
              <tr>
                <td className="border p-2">IE (old)</td>
                <td className="border p-2 text-red-400">⚠️ Partial / buggy</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* D. Performance Benchmark */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-yellow-300">
            Performance Benchmark — cloneNode vs createElement
          </h2>

          <CodePenPlayground
            initialJS={`console.log("Open DevTools console to see timings.");

const template = document.createElement("div");
template.textContent = "Hi";

console.time("clone");
for (let i = 0; i < 5000; i++) {
  template.cloneNode(true);
}
console.timeEnd("clone");

console.time("createElement");
for (let i = 0; i < 5000; i++) {
  const el = document.createElement("div");
  el.textContent = "Hi";
}
console.timeEnd("createElement");`}
          />

          <p className="text-slate-400 text-sm">
            In many cases, <code>cloneNode()</code> is faster when duplicating structured components,
            especially together with <code>DocumentFragment</code>.
          </p>
        </section>

        {/* E. Real Engineering Notes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-sky-400">
            Real Engineering Notes (React, Vue, Svelte Developers)
          </h2>

          <ul className="list-disc pl-6 text-sm space-y-1 text-slate-300">
            <li>React does not rely on <code>cloneNode()</code>; it uses a Virtual DOM diffing system.</li>
            <li>Vue compiles templates into render functions (JS), not direct DOM clones.</li>
            <li>
              Web Components often use <code>template</code> + <code>cloneNode(true)</code> for Shadow DOM
              structures.
            </li>
            <li>
              Custom UI libraries (no framework) can use <code>cloneNode()</code> + fragments for very fast
              rendering.
            </li>
          </ul>
        </section>

        {/* F. Pitfalls */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-red-300">
            Pitfalls Developers Must Know
          </h2>
          <ul className="list-disc pl-6 text-sm space-y-1 text-slate-300">
            <li>Duplicate IDs break <code>querySelector</code>, CSS targeting, and accessibility.</li>
            <li>Video/audio elements may lose playback state when cloned.</li>
            <li>Canvas and SVG cloning can behave slightly differently across browsers.</li>
            <li>Form fields clone their value — sometimes you might want an empty copy.</li>
            <li>Cloning very large DOM trees repeatedly can freeze or jank the UI.</li>
          </ul>
        </section>

        {/* G. Mini Exercise — Fix the Broken Clone */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-purple-300">
            Mini Exercise — Fix the Broken Clone
          </h2>

          <p className="text-slate-300 text-sm">
            Click a button → clone a card → fix ID → reattach events → append to container.
          </p>

          <CodePenPlayground
            initialHTML={`<button id="cloneBtn">Clone User Card</button>

<div class="container">
  <article id="userCard" class="user-card">
    <h3 class="name">Student Name</h3>
    <button class="edit">Edit</button>
  </article>
</div>`}
            initialCSS={`.user-card {
  margin-top: 10px;
  padding: 10px 14px;
  border-radius: 10px;
  background: #020617;
  border: 1px solid #1f2937;
  color: #e5e7eb;
}

.user-card + .user-card {
  margin-top: 8px;
}

.edit {
  margin-top: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  background: #22c55e;
  border: none;
  color: #020617;
  cursor: pointer;
}`}
            initialJS={`const card = document.querySelector("#userCard");
const btn = document.querySelector("#cloneBtn");
const container = document.querySelector(".container");

function attachEditHandler(cardEl) {
  const editBtn = cardEl.querySelector(".edit");
  if (!editBtn) return;
  editBtn.onclick = () => alert("Edited: " + cardEl.querySelector(".name").textContent);
}

// initial attach for original card
attachEditHandler(card);

btn.onclick = () => {
  const copy = card.cloneNode(true);

  // Fix duplicate ID
  copy.id = "userCard-" + Math.random().toString(36).slice(2);
  const nameEl = copy.querySelector(".name");
  if (nameEl) {
    nameEl.textContent = "Cloned – " + nameEl.textContent;
  }

  // Reattach event for the clone
  attachEditHandler(copy);

  container.appendChild(copy);
};`}
          />
        </section>

        {/* H. Architecture Guidance for cloneNode */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-300">
            Architecture: When Should You Use cloneNode() in Real Projects?
          </h2>

          <ul className="list-disc pl-6 space-y-1 text-slate-300 text-sm">
            <li>When building a custom UI library (buttons, cards, modals, list items).</li>
            <li>When rendering repeating components efficiently (lists, grids, dashboards).</li>
            <li>When you need stable, reusable DOM skeletons (templates).</li>
            <li>When performance matters more than flexible HTML string manipulation.</li>
            <li>
              When you want a safer alternative to string-based <code>innerHTML</code> templating.
            </li>
          </ul>
        </section>

        {/* ======= PART 2+ SECTIONS WILL BE INSERTED BELOW IN NEXT MESSAGES ======= */}
      </div>
    );
  }
}
        {/* ============================================================
            2. DocumentFragment – Efficient Batch Updates
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            2. <code>DocumentFragment</code>: Efficient Batch Updates
          </h2>

          <p className="text-slate-300">
            A <code>DocumentFragment</code> is a lightweight container used to assemble DOM pieces
            <strong> in memory</strong> and append them <strong>in one go</strong>, reducing reflows and
            repaints.
          </p>

          {/* Example 1 – bulk list creation */}
          <CodePenPlayground
            initialHTML={`<ul id="bigList"></ul>`}
            initialJS={`const frag = document.createDocumentFragment();
const ul = document.getElementById("bigList");

for (let i = 1; i <= 200; i++) {
  const li = document.createElement("li");
  li.textContent = "Item " + i;
  frag.appendChild(li);
}

ul.appendChild(frag);`}
          />

          {/* Example 2 – building student cards */}
          <CodePenPlayground
            initialHTML={`<div id="studentGrid"></div>`}
            initialCSS={`.student-card {
  padding: 8px 12px;
  margin: 6px 0;
  border-radius: 10px;
  background: #020617;
  color: #e5e7eb;
  border: 1px solid #1f2937;
}`}
            initialJS={`const students = ["Ritaja", "Mounita", "Devangshu", "Pranjali"];
const frag = document.createDocumentFragment();

students.forEach((name) => {
  const card = document.createElement("div");
  card.className = "student-card";
  card.textContent = name;
  frag.appendChild(card);
});

document.querySelector("#studentGrid").appendChild(frag);`}
          />

          {/* Example 3 – combining with <template> */}
          <CodePenPlayground
            initialHTML={`<template id="productTemplate">
  <article class="product">
    <h3 class="title"></h3>
    <p class="price"></p>
  </article>
</template>

<div id="products"></div>`}
            initialCSS={`.product {
  padding: 10px 14px;
  margin: 6px 0;
  border-radius: 10px;
  background: #020617;
  border: 1px solid #1f2937;
  color: #e5e7eb;
}
.product .title { color: #38bdf8; font-weight: 600; }
.product .price { font-size: 14px; color: #a5b4fc; }`}
            initialJS={`const products = [
  { title: "Mouse", price: 599 },
  { title: "Keyboard", price: 1299 },
  { title: "Headphones", price: 2199 }
];

const template = document.getElementById("productTemplate");
const frag = document.createDocumentFragment();

products.forEach((p) => {
  const clone = template.content.cloneNode(true);
  clone.querySelector(".title").textContent = p.title;
  clone.querySelector(".price").textContent = "₹" + p.price;
  frag.appendChild(clone);
});

document.querySelector("#products").appendChild(frag);`}
          />

          <p className="text-xs text-slate-400">
            💡 Use <code>DocumentFragment</code> whenever you create many elements in a loop. It keeps the DOM
            faster and smoother.
          </p>
        </section>

        {/* ============================================================
            3. &lt;template&gt; Element – Reusable DOM Structures
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            3. <code>&lt;template&gt;</code> Element: Reusable DOM Structures
          </h2>

          <p className="text-slate-300">
            The <code>&lt;template&gt;</code> tag holds HTML that isn&apos;t rendered until you{" "}
            <strong>clone</strong> and insert it via JavaScript. This is a professional way to build repeatable
            UI blocks.
          </p>

          {/* Example 1 – base user card */}
          <CodePenPlayground
            initialHTML={`<template id="userTemplate">
  <article class="user-card">
    <h3 class="name"></h3>
    <p class="role"></p>
  </article>
</template>

<div id="userContainer"></div>`}
            initialCSS={`.user-card {
  padding: 10px 14px;
  margin: 6px 0;
  border-radius: 10px;
  background: #020617;
  border: 1px solid #1f2937;
  color: #e5e7eb;
}
.user-card .name { color: #38bdf8; font-weight: 600; }
.user-card .role { font-size: 13px; color: #a5b4fc; }`}
            initialJS={`const users = [
  { name: "Kaustav", role: "Developer" },
  { name: "Susmita", role: "Analyst" }
];

const template = document.getElementById("userTemplate");
const container = document.getElementById("userContainer");

users.forEach((u) => {
  const clone = template.content.cloneNode(true);
  clone.querySelector(".name").textContent = u.name;
  clone.querySelector(".role").textContent = u.role;
  container.appendChild(clone);
});`}
          />

          {/* Example 2 – notification template */}
          <CodePenPlayground
            initialHTML={`<template id="toastTemplate">
  <div class="toast">
    <strong class="toast-title"></strong>
    <p class="toast-body"></p>
  </div>
</template>

<div id="toastArea"></div>`}
            initialCSS={`.toast {
  margin: 6px 0;
  padding: 8px 12px;
  border-radius: 10px;
  background: #0f172a;
  border: 1px solid #1f2937;
  color: #e5e7eb;
}
.toast-title { color: #facc15; font-weight: 600; }
.toast-body { font-size: 13px; color: #cbd5f5; }`}
            initialJS={`function showToast(title, body) {
  const tpl = document.getElementById("toastTemplate");
  const clone = tpl.content.cloneNode(true);
  clone.querySelector(".toast-title").textContent = title;
  clone.querySelector(".toast-body").textContent = body;
  document.getElementById("toastArea").appendChild(clone);
}

showToast("Success", "Data saved successfully!");
showToast("Warning", "Please check your inputs.");`}
          />

          {/* Example 3 – nested template usage */}
          <CodePenPlayground
            initialHTML={`<template id="courseTemplate">
  <div class="course-card">
    <h3 class="course-title"></h3>
    <p class="course-level"></p>
  </div>
</template>

<div id="courseList"></div>`}
            initialCSS={`.course-card {
  padding: 10px 14px;
  margin: 6px 0;
  border-radius: 10px;
  background: #020617;
  border: 1px solid #1f2937;
  color: #e5e7eb;
}
.course-title { color: #38bdf8; font-weight: 600; }
.course-level { font-size: 13px; color: #a5b4fc; }`}
            initialJS={`const courses = [
  { title: "JS Basics", level: "Beginner" },
  { title: "DOM Special", level: "Intermediate" }
];

function renderCourses() {
  const tpl = document.getElementById("courseTemplate");
  const frag = document.createDocumentFragment();

  courses.forEach((c) => {
    const clone = tpl.content.cloneNode(true);
    clone.querySelector(".course-title").textContent = c.title;
    clone.querySelector(".course-level").textContent = c.level;
    frag.appendChild(clone);
  });

  document.getElementById("courseList").appendChild(frag);
}

renderCourses();`}
          />
        </section>

        {/* ============================================================
            4. dataset & data-* Attributes
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            4. <code>dataset</code> &amp; <code>data-*</code> Attributes
          </h2>

          <p className="text-slate-300">
            Use <code>data-*</code> attributes to store small, custom pieces of metadata in HTML. Access them
            via <code>element.dataset</code> — very useful in UI systems.
          </p>

          {/* Example 1 – storing ids & roles */}
          <CodePenPlayground
            initialHTML={`<button
  class="user-btn"
  data-user-id="101"
  data-role="admin"
>
  Open Admin Panel
</button>`}
            initialJS={`const btn = document.querySelector(".user-btn");
console.log(btn.dataset.userId); // "101"
console.log(btn.dataset.role);   // "admin"`}
          />

          {/* Example 2 – using dataset in list + event delegation */}
          <CodePenPlayground
            initialHTML={`<ul id="productList">
  <li data-id="1" data-price="999">Mouse</li>
  <li data-id="2" data-price="2999">Keyboard</li>
</ul>`}
            initialJS={`const list = document.getElementById("productList");

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const { id, price } = li.dataset;
  console.log("Product clicked:", id, "Price:", price);
});`}
          />

          {/* Example 3 – tabs using dataset */}
          <CodePenPlayground
            initialHTML={`<div class="tabs">
  <button data-tab-target="panel1">Tab 1</button>
  <button data-tab-target="panel2">Tab 2</button>
</div>

<div id="panel1" class="tab-panel">Content for Panel 1</div>
<div id="panel2" class="tab-panel" hidden>Content for Panel 2</div>`}
            initialCSS={`.tab-panel { margin-top: 10px; padding: 8px 12px; border-radius: 8px; background: #020617; color: #e5e7eb; }
button[data-tab-target] { margin-right: 6px; padding: 4px 10px; border-radius: 6px; border: 1px solid #1f2937; background:#0f172a; color:#e5e7eb; cursor:pointer; }
button[data-tab-target].active { background:#38bdf8; color:#020617; }`}
            initialJS={`const tabs = document.querySelector(".tabs");

tabs.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-tab-target]");
  if (!btn) return;

  const targetId = btn.dataset.tabTarget;

  document.querySelectorAll("[data-tab-target]").forEach((b) =>
    b.classList.toggle("active", b === btn)
  );

  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.hidden = panel.id !== targetId;
  });
});`}
          />
        </section>

        {/* ============================================================
            5. Measuring Layout – getBoundingClientRect()
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            5. Measuring Layout with <code>getBoundingClientRect()</code>
          </h2>

          <p className="text-slate-300">
            <code>getBoundingClientRect()</code> returns size &amp; position of an element in the viewport.
            This is essential for tooltips, modals, scroll effects and precise UI positioning.
          </p>

          {/* Small SVG explanation */}
          <div className="flex justify-center">
            <svg width="260" height="140" viewBox="0 0 260 140">
              <rect
                x="20"
                y="20"
                width="220"
                height="100"
                fill="#020617"
                stroke="#1f2937"
              />
              <rect
                x="70"
                y="40"
                width="80"
                height="40"
                fill="#0f172a"
                stroke="#38bdf8"
              />
              <text x="76" y="65" fill="#e5e7eb" fontSize="11">
                element
              </text>
              <text x="70" y="30" fill="#38bdf8" fontSize="10">
                top
              </text>
              <text x="52" y="76" fill="#38bdf8" fontSize="10">
                left
              </text>
            </svg>
          </div>

          {/* Example 1 – log metrics */}
          <CodePenPlayground
            initialHTML={`<div class="box">Measure Me</div>`}
            initialCSS={`.box {
  margin-top: 40px;
  width: 160px;
  height: 80px;
  background: #0f172a;
  border-radius: 10px;
  border: 1px solid #38bdf8;
  color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}`}
            initialJS={`const box = document.querySelector(".box");
const rect = box.getBoundingClientRect();

console.log("top:", rect.top, "left:", rect.left);
console.log("width:", rect.width, "height:", rect.height);`}
          />

          {/* Example 2 – positioning tooltip */}
          <CodePenPlayground
            initialHTML={`<button class="help-btn">Hover Me</button>
<div class="tooltip" hidden>Tooltip text from Sukanta Sir</div>`}
            initialCSS={`.help-btn {
  margin-top: 40px;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #1f2937;
  background:#0f172a;
  color:#e5e7eb;
  cursor:pointer;
}
.tooltip {
  position: fixed;
  padding: 6px 10px;
  border-radius: 8px;
  background:#020617;
  border:1px solid #38bdf8;
  color:#e5e7eb;
  font-size: 12px;
}`}
            initialJS={`const btn = document.querySelector(".help-btn");
const tooltip = document.querySelector(".tooltip");

btn.addEventListener("mouseenter", () => {
  const rect = btn.getBoundingClientRect();
  tooltip.style.top = rect.bottom + 8 + "px";
  tooltip.style.left = rect.left + "px";
  tooltip.hidden = false;
});

btn.addEventListener("mouseleave", () => {
  tooltip.hidden = true;
});`}
          />

          {/* Example 3 – scroll element to center */}
          <CodePenPlayground
            initialHTML={`<button id="scrollBtn">Scroll Target to Center</button>

<div style="height: 800px;"></div>
<div id="targetSection" style="height:120px;background:#0f172a;color:#e5e7eb;border-radius:12px;display:flex;align-items:center;justify-content:center;">
  Target Section
</div>
<div style="height: 800px;"></div>`}
            initialJS={`function scrollToCenter(el) {
  const rect = el.getBoundingClientRect();
  const offset =
    rect.top + window.scrollY - window.innerHeight / 2 + rect.height / 2;
  window.scrollTo({ top: offset, behavior: "smooth" });
}

document
  .getElementById("scrollBtn")
  .addEventListener("click", () =>
    scrollToCenter(document.getElementById("targetSection"))
  );`}
          />
        </section>

        {/* ============================================================
            6. Reflow, Repaint & Batch DOM Updates
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            6. Reflow, Repaint &amp; Batch DOM Updates (Micro-Optimizations)
          </h2>

          <p className="text-slate-300">
            Changing layout (size, position) causes <strong>reflow</strong>. Changing only colors or shadows
            causes <strong>repaint</strong>. Calling layout methods repeatedly between style changes can slow
            things down.
          </p>

          {/* Example 1 – bad pattern */}
          <CodePenPlayground
            initialHTML={`<div id="box" style="width:100px;height:40px;background:#0f172a;border-radius:8px;margin-top:20px;"></div>`}
            initialJS={`// BAD: triggers layout repeatedly
for (let i = 0; i < 20; i++) {
  const el = document.getElementById("box");
  el.style.width = 100 + i * 2 + "px";
  console.log("width:", el.offsetWidth); // forces layout each time
}`}
          />

          {/* Example 2 – better: read once, then write */}
          <CodePenPlayground
            initialHTML={`<div id="box2" style="width:100px;height:40px;background:#0f172a;border-radius:8px;margin-top:20px;"></div>`}
            initialJS={`// BETTER: read layout once, apply updates in batch
const box = document.getElementById("box2");
const startWidth = box.offsetWidth; // read once

let width = startWidth;
for (let i = 0; i < 20; i++) {
  width += 2;
}

box.style.width = width + "px";
console.log("final width:", width);`}
          />

          {/* Example 3 – CSS class toggle instead of many inline styles */}
          <CodePenPlayground
            initialHTML={`<style>
.floating-box {
  position: absolute;
  top: 40px;
  left: 40px;
  background: #38bdf8;
  width: 120px;
  height: 60px;
  border-radius: 12px;
}
</style>

<button id="apply">Apply Floating Style</button>
<div id="target" style="margin-top:20px;width:80px;height:40px;background:#0f172a;border-radius:8px;"></div>`}
            initialJS={`const el = document.getElementById("target");
document.getElementById("apply").addEventListener("click", () => {
  el.classList.add("floating-box");
});`}
          />

          <p className="text-xs text-slate-400">
            ✅ Tip: <strong>Read layout first</strong>, then apply style changes in bulk. Prefer adding /
            removing CSS classes over many inline style changes.
          </p>
        </section>
        {/* ============================================================
            7. Event Delegation Pattern
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            7. Event Delegation Pattern for Large DOM Trees
          </h2>

          <p className="text-slate-300">
            Instead of adding listeners to <strong>every child</strong>, add one listener to a parent and detect
            clicks via <code>event.target</code> or <code>closest()</code>.
          </p>

          {/* Example 1 – classic list click */}
          <CodePenPlayground
            initialHTML={`<ul class="todo-list">
  <li data-id="1">Learn JavaScript</li>
  <li data-id="2">Practice DOM</li>
  <li data-id="3">Master React</li>
</ul>`}
            initialJS={`const list = document.querySelector(".todo-list");

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  alert("Clicked item ID: " + li.dataset.id);
});`}
          />

          {/* Example 2 – edit/delete buttons */}
          <CodePenPlayground
            initialHTML={`<table class="students-table">
  <tr data-id="101">
    <td>Ritaja</td>
    <td><button class="btn-edit">Edit</button></td>
    <td><button class="btn-delete">Delete</button></td>
  </tr>
  <tr data-id="102">
    <td>Mounita</td>
    <td><button class="btn-edit">Edit</button></td>
    <td><button class="btn-delete">Delete</button></td>
  </tr>
</table>`}
            initialJS={`const table = document.querySelector(".students-table");

table.addEventListener("click", (e) => {
  const row = e.target.closest("tr");
  if (!row) return;

  if (e.target.closest(".btn-edit")) {
    alert("Edit student ID: " + row.dataset.id);
  } else if (e.target.closest(".btn-delete")) {
    alert("Delete student ID: " + row.dataset.id);
  }
});`}
          />

          {/* Example 3 – tabs via dataset */}
          <CodePenPlayground
            initialHTML={`<div class="tabs">
  <button data-tab-target="p1">Panel 1</button>
  <button data-tab-target="p2">Panel 2</button>
</div>

<div id="p1" class="panel">This is Panel 1</div>
<div id="p2" class="panel" hidden>This is Panel 2</div>`}
            initialCSS={`.panel{
  margin-top:12px;
  padding:10px;
  border-radius:10px;
  background:#020617;
  color:#e5e7eb;
}
button[data-tab-target] {
  padding:5px 12px;
  border-radius:6px;
  margin-right:6px;
  background:#0f172a;
  border:1px solid #1f2937;
  color:#e5e7eb;
  cursor:pointer;
}
button.active {
  background:#38bdf8;
  color:#020617;
}`}
            initialJS={`const tabs = document.querySelector(".tabs");

tabs.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-tab-target]");
  if (!btn) return;

  const targetId = btn.dataset.tabTarget;

  document.querySelectorAll("[data-tab-target]").forEach((b) =>
    b.classList.toggle("active", b === btn)
  );

  document.querySelectorAll(".panel").forEach((panel) => {
    panel.hidden = panel.id !== targetId;
  });
});`}
          />
        </section>

        {/* ============================================================
            8. CSS Transitions + Class Toggles (Animations)
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            8. Creating Animations Using Class Toggles + CSS Transitions
          </h2>

          <p className="text-slate-300">
            Most UI animation can be done by just toggling a class—CSS handles the smoothness.
          </p>

          {/* Example 1 – fade in/out */}
          <CodePenPlayground
            initialHTML={`<button id="toggleBtn">Toggle Box</button>
<div class="box"></div>`}
            initialCSS={`.box {
  width:120px;
  height:60px;
  background:#0f172a;
  border-radius:8px;
  opacity:0;
  transform:translateY(10px);
  transition: opacity .25s ease, transform .25s ease;
  margin-top:20px;
}
.box--visible {
  opacity:1;
  transform:translateY(0);
}`}
            initialJS={`const box = document.querySelector(".box");
document.getElementById("toggleBtn").addEventListener("click", () => {
  box.classList.toggle("box--visible");
});`}
          />

          {/* Example 2 – slide-in sidebar */}
          <CodePenPlayground
            initialHTML={`<button id="menuBtn">Toggle Menu</button>
<div class="sidebar">Menu Content</div>`}
            initialCSS={`.sidebar {
  position:fixed;
  top:0;
  right:0;
  width:180px;
  height:100vh;
  background:#020617;
  border-left:1px solid #1f2937;
  transform:translateX(100%);
  transition:transform .3s ease;
  padding:20px;
  color:#e5e7eb;
}
.sidebar--open {
  transform:translateX(0);
}`}
            initialJS={`document.getElementById("menuBtn").onclick = () => {
  document.querySelector(".sidebar").classList.toggle("sidebar--open");
};`}
          />

          {/* Example 3 – toast appearance animation */}
          <CodePenPlayground
            initialHTML={`<button id="showToast">Show Toast</button>
<div id="toastArea"></div>`}
            initialCSS={`.toast {
  padding:10px 14px;
  border-radius:10px;
  background:#0f172a;
  color:#e5e7eb;
  margin:6px 0;
  opacity:0;
  transform:translateY(10px);
  transition:all .25s ease;
  border:1px solid #1f2937;
}
.toast--show {
  opacity:1;
  transform:translateY(0);
}`}
            initialJS={`document.getElementById("showToast").onclick = () => {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = "Hello Baba! Toast Activated.";

  const area = document.getElementById("toastArea");
  area.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast--show"));

  setTimeout(() => {
    toast.classList.remove("toast--show");
    setTimeout(() => toast.remove(), 250);
  }, 2000);
};`}
          />
        </section>

        {/* ============================================================
            9. Toast Notifications & Alerts
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-400">
            9. Toast Notifications & Animated Alerts
          </h2>

          <p className="text-slate-300">
            Toasts show brief messages for success, error, or updates. They disappear automatically.
          </p>

          {/* Example 1 – simple toast function */}
          <CodePenPlayground
            initialHTML={`<button id="successBtn">Success</button>
<button id="errorBtn">Error</button>
<div id="toastArea"></div>`}
            initialCSS={`.toast {
  padding:12px;
  margin:6px 0;
  border-radius:10px;
  background:#1e293b;
  border-left:4px solid #38bdf8;
  color:#e5e7eb;
  opacity:0;
  transform:translateY(10px);
  transition:all .25s ease;
}
.toast--success { border-color:#22c55e; }
.toast--error { border-color:#ef4444; }
.toast--show { opacity:1; transform:translateY(0); }`}
            initialJS={`function show(type, message) {
  const toast = document.createElement("div");
  toast.className = "toast toast--" + type;
  toast.textContent = message;

  document.getElementById("toastArea").appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("toast--show"));

  setTimeout(() => {
    toast.classList.remove("toast--show");
    setTimeout(() => toast.remove(), 250);
  }, 2000);
}

document.getElementById("successBtn").onclick = () =>
  show("success", "Data saved successfully!");

document.getElementById("errorBtn").onclick = () =>
  show("error", "Something went wrong.");`}
          />

          {/* Example 2 – template-based toast */}
          <CodePenPlayground
            initialHTML={`<template id="toastTemplate">
  <div class="toast">
    <strong class="tTitle"></strong>
    <p class="tBody"></p>
  </div>
</template>

<div id="toastArea"></div>
<button id="btnShow">Show Template Toast</button>`}
            initialCSS={`.toast {
  padding:12px;
  background:#0f172a;
  border-left:4px solid #38bdf8;
  margin-top:8px;
  border-radius:10px;
  color:#e5e7eb;
  opacity:0;
  transform:translateY(10px);
  transition:all .25s ease;
}
.toast--show { opacity:1; transform:translateY(0); }`}
            initialJS={`function showTemplateToast(title, body) {
  const tpl = document.getElementById("toastTemplate");
  const clone = tpl.content.cloneNode(true);

  clone.querySelector(".tTitle").textContent = title;
  clone.querySelector(".tBody").textContent = body;

  const area = document.getElementById("toastArea");
  area.appendChild(clone);

  const toast = area.lastElementChild;
  requestAnimationFrame(() => toast.classList.add("toast--show"));

  setTimeout(() => {
    toast.classList.remove("toast--show");
    setTimeout(() => toast.remove(), 250);
  }, 2000);
}

document.getElementById("btnShow").onclick = () =>
  showTemplateToast("Reminder", "Revise DOM Special today!");`}
          />

          {/* Example 3 – click-to-dismiss */}
          <CodePenPlayground
            initialHTML={`<div id="closeArea"></div>
<button id="addToast">Add Toast</button>`}
            initialCSS={`.toast {
  padding:10px;
  margin:6px 0;
  background:#334155;
  border-radius:10px;
  color:white;
  cursor:pointer;
  opacity:0;
  transform:translateY(10px);
  transition:all .25s ease;
}
.toast--show { opacity:1; transform:translateY(0); }`}
            initialJS={`document.getElementById("addToast").onclick = () => {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = "Click to dismiss";
  const area = document.getElementById("closeArea");
  area.appendChild(t);
  requestAnimationFrame(() => t.classList.add("toast--show"));
};

document.getElementById("closeArea").addEventListener("click", (e) => {
  const toast = e.target.closest(".toast");
  if (!toast) return;
  toast.classList.remove("toast--show");
  setTimeout(() => toast.remove(), 250);
});`}
          />
        </section>

        {/* ============================================================
            10. Tooltip, Modal & Dropdown Components
        ============================================================ */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">
            10. Tooltip, Modal & Dropdown — Reusable UI Components
          </h2>

          <p className="text-slate-300">
            These are common UI patterns you should master: tooltip (hover), modal (dialog), dropdown (menu).
          </p>

          {/* Example 1 – Dropdown Menu */}
          <CodePenPlayground
            initialHTML={`<button id="dropdownBtn">Toggle Menu</button>
<ul id="dropdownMenu" class="hidden">
  <li>Profile</li>
  <li>Settings</li>
  <li>Logout</li>
</ul>`}
            initialCSS={`#dropdownMenu {
  background:#020617;
  color:#e5e7eb;
  padding:10px;
  margin-top:8px;
  border-radius:8px;
  border:1px solid #1f2937;
}
.hidden { display:none; }`}
            initialJS={`const btn = document.getElementById("dropdownBtn");
const menu = document.getElementById("dropdownMenu");

btn.addEventListener("click", () => menu.classList.toggle("hidden"));`}
          />

          {/* Example 2 – Modal */}
          <CodePenPlayground
            initialHTML={`<button id="openModal">Open Modal</button>

<div id="overlay" class="hidden overlay">
  <div class="modal">
    <p>This is a modal</p>
    <button id="closeModal">Close</button>
  </div>
</div>`}
            initialCSS={`.overlay {
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.5);
  display:flex;
  align-items:center;
  justify-content:center;
}
.modal {
  background:#0f172a;
  padding:20px;
  color:#e5e7eb;
  border-radius:10px;
  border:1px solid #1f2937;
}
.hidden { display:none; }`}
            initialJS={`const open = document.getElementById("openModal");
const close = document.getElementById("closeModal");
const overlay = document.getElementById("overlay");

open.onclick = () => overlay.classList.remove("hidden");
close.onclick = () => overlay.classList.add("hidden");

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) overlay.classList.add("hidden");
});`}
          />

          {/* Example 3 – Tooltip */}
          <CodePenPlayground
            initialHTML={`<button class="btn" data-tooltip="Hello Baba! I am a tooltip.">Hover Me</button>
<div id="tooltip" class="tooltip" hidden></div>`}
            initialCSS={`.btn {
  margin-top:20px;
  padding:6px 12px;
  background:#0f172a;
  border:1px solid #1f2937;
  border-radius:8px;
  color:#e5e7eb;
  cursor:pointer;
}
.tooltip {
  position:fixed;
  padding:6px 10px;
  border-radius:8px;
  background:#020617;
  border:1px solid #38bdf8;
  color:#e5e7eb;
  font-size:12px;
}`}
            initialJS={`const tooltip = document.getElementById("tooltip");

document.addEventListener("mouseover", (e) => {
  const target = e.target.closest("[data-tooltip]");
  if (!target) return (tooltip.hidden = true);

  const rect = target.getBoundingClientRect();
  tooltip.textContent = target.dataset.tooltip;
  tooltip.style.top = rect.bottom + 8 + "px";
  tooltip.style.left = rect.left + "px";
  tooltip.hidden = false;
});`}
          />
        </section>
        {/* ============================================================
            11. Virtualized Rendering — Handling 1000+ DOM Items Smoothly
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sky-400">
            11. Virtualized Rendering (Windowing) — Optimizing Huge Lists
          </h2>

          <p className="text-slate-300 leading-relaxed">
            When a list has <strong>1000+</strong> rows (e.g., tables, chat messages, logs),
            rendering all items will cause <b>massive reflow and lag</b>.  
            <br />
            Virtualization means:  
            <strong>Render only what is visible.</strong>
          </p>

          {/* Visual SVG */}
          <svg width="420" height="150">
            <rect x="10" y="20" width="400" height="120" rx="10" fill="#0f172a" stroke="#38bdf8" />
            <rect x="10" y="60" width="400" height="40" rx="8" fill="#1e293b" stroke="#22c55e" />
            <text x="20" y="50" fill="#38bdf8" fontSize="12">Visible Window</text>
            <text x="20" y="85" fill="#22c55e" fontSize="12">Only these rows are rendered</text>
          </svg>

          {/* Example — simplified virtualization */}
          <CodePenPlayground
            initialHTML={`<div id="viewport" class="viewport"></div>`}
            initialCSS={`.viewport {
  height:200px;
  overflow-y:auto;
  border:1px solid #1f2937;
  padding:0;
}
.row {
  padding:8px;
  border-bottom:1px solid #1f2937;
  color:#e5e7eb;
  background:#0f172a;
}`}
            initialJS={`const viewport = document.getElementById("viewport");
const total = 1000;
const rowHeight = 30;

viewport.style.height = "200px";
viewport.style.position = "relative";

const spacer = document.createElement("div");
spacer.style.height = total * rowHeight + "px";
viewport.appendChild(spacer);

viewport.addEventListener("scroll", () => renderRows());

function renderRows() {
  const start = Math.floor(viewport.scrollTop / rowHeight);
  const end = start + 6;

  viewport.querySelectorAll(".row").forEach((el) => el.remove());

  for (let i = start; i < end; i++) {
    const row = document.createElement("div");
    row.className = "row";
    row.textContent = "Row #" + i;
    row.style.position = "absolute";
    row.style.top = i * rowHeight + "px";
    viewport.appendChild(row);
  }
}

renderRows();`}
          />

          <p className="text-slate-400 text-sm">
            👉 This is the foundation behind libraries like <b>React Window</b> & <b>Virtualized Lists</b>.
          </p>
        </section>

        {/* ============================================================
            12. requestAnimationFrame — Smooth JS Animations
        ============================================================ */}
        <section className="space-y-5">
          <h2 className="text-2xl font-semibold text-emerald-400">
            12. requestAnimationFrame() — Browser-Synced Animations
          </h2>

          <p className="text-slate-300">
            Instead of <code>setInterval()</code>, use <b>requestAnimationFrame</b> (rAF) for:
          </p>
          <ul className="list-disc pl-6 text-slate-300">
            <li>Smoother animations</li>
            <li>Better performance</li>
            <li>Automatic throttling in background tabs</li>
          </ul>

          <CodePenPlayground
            initialHTML={`<button id="startBtn">Move Box</button>
<div id="ball" class="ball"></div>`}
            initialCSS={`.ball {
  width:40px;
  height:40px;
  border-radius:50%;
  background:#38bdf8;
  position:relative;
  margin-top:20px;
}`}
            initialJS={`const ball = document.getElementById("ball");

document.getElementById("startBtn").onclick = () => {
  let x = 0;
  function animate() {
    x += 2;
    ball.style.left = x + "px";
    if (x < 250) requestAnimationFrame(animate);
  }
  animate();
};`}
          />

          <p className="text-slate-400 text-sm">
            ✔ rAF syncs animation frames with monitor refresh rate.
          </p>
        </section>

        {/* ============================================================
            13. IntersectionObserver — Lazy Loading & Visibility Detection
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sky-400">
            13. IntersectionObserver — Lazy Loading Images & Reveal Effects
          </h2>

          <p className="text-slate-300">
            Perfect for:  
            <b>Lazy-loaded images, infinite scroll, reveal-on-scroll animations.</b>
          </p>

          <CodePenPlayground
            initialHTML={`<img class="lazy" data-src="https://picsum.photos/300" width="300" />`}
            initialCSS={`.lazy {
  opacity:0;
  transition:opacity .5s;
}
.lazy--loaded {
  opacity:1;
}`}
            initialJS={`const img = document.querySelector(".lazy");

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;

    img.src = img.dataset.src;
    img.onload = () => img.classList.add("lazy--loaded");

    io.disconnect();
  });
});

io.observe(img);`}
          />

          <p className="text-xs text-slate-400">
            ✔ The observer disconnects itself after the image becomes visible.
          </p>
        </section>

        {/* ============================================================
            14. ResizeObserver — Track Element Size Changes
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-amber-300">
            14. ResizeObserver — Responsive Components that React to Size
          </h2>

          <p className="text-slate-300">
            Useful when building grids, charts, responsive panels.
          </p>

          <CodePenPlayground
            initialHTML={`<div id="panel" class="panel">Resize the window</div>`}
            initialCSS={`.panel {
  background:#0f172a;
  padding:20px;
  color:#e5e7eb;
  border-radius:10px;
  resize:horizontal;
  overflow:auto;
}`}
            initialJS={`const panel = document.getElementById("panel");

new ResizeObserver((entries) => {
  for (const e of entries) {
    panel.textContent = 
      "Width: " + e.contentRect.width.toFixed(0) + "px";
  }
}).observe(panel);`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Runs whenever the element's size changes (not viewport).
          </p>
        </section>

        {/* ============================================================
            15. MutationObserver — Detect DOM Changes Automatically
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-pink-300">
            15. MutationObserver — Reacting to DOM Changes Programmatically
          </h2>

          <p className="text-slate-300">
            Use this when you need to monitor:  
            <strong>Added/removed nodes, attribute changes, text changes.</strong>
          </p>

          <CodePenPlayground
            initialHTML={`<button id="add">Add Item</button>
<ul id="list"></ul>`}
            initialCSS={`li {
  padding:6px;
  color:#e5e7eb;
  border-bottom:1px solid #1f2937;
}`}
            initialJS={`const list = document.getElementById("list");
const add = document.getElementById("add");

new MutationObserver((mut) => {
  console.log("DOM changed:", mut);
}).observe(list, { childList: true });

add.onclick = () => {
  const li = document.createElement("li");
  li.textContent = "Item " + (list.children.length + 1);
  list.appendChild(li);
};`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Ideal for UI auto-update systems.
          </p>
        </section>
        {/* ============================================================
            16. Build Your Own DOM Helper Library (Mini-jQuery Style)
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-yellow-300">
            16. Build Your Own DOM Helper Library (Mini jQuery)
          </h2>

          <p className="text-slate-300">
            Let’s create a **clean, reusable DOM utility library** so you don't repeat code
            everywhere. This teaches abstraction and prepares students for React/Vue thinking.
          </p>

          {/* Helper library core */}
          <CodePenPlayground
            initialHTML={`<button id="demoBtn">Click Me</button>`}
            initialCSS={`body { padding:20px; font-family:Arial; }`}
            initialJS={`// Basic DOM helper object
const $ = {
  one(selector, scope = document) {
    return scope.querySelector(selector);
  },
  all(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
  },
  on(el, event, handler) {
    el.addEventListener(event, handler);
  },
  create(tag, opts = {}) {
    const el = document.createElement(tag);
    if (opts.class) el.className = opts.class;
    if (opts.text) el.textContent = opts.text;
    if (opts.html) el.innerHTML = opts.html;
    return el;
  }
};

// Usage example
const btn = $.one("#demoBtn");
$.on(btn, "click", () => alert("Hello from mini jQuery!"));`}
          />

          <p className="text-slate-400 text-sm">
            ✔ This is the foundation for building **UI frameworks**.
          </p>
        </section>


        {/* ============================================================
            17. UI Logic vs State Logic — Clean Architecture
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-sky-400">
            17. UI Logic vs State Logic (Clean Architecture)
          </h2>

          <p className="text-slate-300">
            Separate <b>state (data)</b> from <b>UI (DOM)</b>. This is the core principle behind
            React, Vue, Angular.
          </p>

          <CodePenPlayground
            initialHTML={`<button id="add">Add Course</button>
<div id="cart"></div>`}
            initialCSS={`#cart { padding:10px; color:white; background:#0f172a; margin-top:10px; }`}
            initialJS={`// STATE MODULE (Pure Logic)
const cart = {
  items: [],
  add(item) {
    this.items.push(item);
  },
  total() {
    return this.items.length;
  }
};

// UI MODULE (Rendering Only)
function renderCart(root, cart) {
  root.innerHTML = "";
  const ul = document.createElement("ul");

  cart.items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });

  root.appendChild(ul);

  const total = document.createElement("p");
  total.textContent = "Total courses: " + cart.total();
  root.appendChild(total);
}

// CONTROLLER
const addBtn = document.getElementById("add");
const root = document.getElementById("cart");

addBtn.onclick = () => {
  cart.add("New Course " + (cart.total() + 1));
  renderCart(root, cart);
};`}
          />
        </section>


        {/* ============================================================
            18. Progressive Enhancement — Never Break the Page
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-400">
            18. Progressive Enhancement — The Professional Way
          </h2>

          <p className="text-slate-300">
            Build your site so that it works WITHOUT JavaScript.  
            Then add enhancements that improve UX when JS is available.
          </p>

          <CodePenPlayground
            initialHTML={`<!-- Base link (works even without JS) -->
<a href="/contact.html" id="contactLink">Contact Us</a>

<!-- Modal -->
<div id="modal" class="modal hidden">
  <div class="box">Contact Form Loaded Here</div>
</div>`}
            initialCSS={`.modal {
  position:fixed; inset:0;
  background:rgba(0,0,0,.6);
  display:flex; justify-content:center; align-items:center;
}
.modal.hidden { display:none; }
.box {
  background:#0f172a; padding:20px; border-radius:10px; color:white;
}`}
            initialJS={`const link = document.getElementById("contactLink");
const modal = document.getElementById("modal");

link.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.remove("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});`}
          />

          <p className="text-xs text-slate-400">
            ✔ A real company-level pattern used everywhere.
          </p>
        </section>


        {/* ============================================================
            19. Mini Project 1 — Dynamic Card Generator with Filters
        ============================================================ */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-indigo-300">
            19. Mini Project — Dynamic Card Generator (Filters + DOM Rendering)
          </h2>

          <CodePenPlayground
            initialHTML={`<select id="filter">
  <option value="all">All</option>
  <option value="Beginner">Beginner</option>
  <option value="Advanced">Advanced</option>
</select>

<div id="grid"></div>`}
            initialCSS={`#grid {
  margin-top:15px;
  display:flex; gap:10px; flex-wrap:wrap;
}
.card {
  padding:12px;
  border-radius:8px;
  background:#1e293b;
  color:white;
  width:150px;
}`}
            initialJS={`const data = [
  { title: "JS Basics", level: "Beginner" },
  { title: "DOM Advanced", level: "Advanced" },
  { title: "APIs & Async", level: "Advanced" }
];

const filter = document.getElementById("filter");
const grid = document.getElementById("grid");

function render(level = "all") {
  grid.innerHTML = "";
  data
    .filter((i) => level === "all" || i.level === level)
    .forEach((item) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = "<b>" + item.title + "</b><br/>" + item.level;
      grid.appendChild(div);
    });
}

filter.onchange = () => render(filter.value);
render();`}
          />
        </section>


        {/* ============================================================
            20. Mini Project 2 — Animated Notification Center
        ============================================================ */}
        <section className="space-y-8 pb-12">
          <h2 className="text-2xl font-semibold text-pink-300">
            20. Mini Project — Animated Notification Center
          </h2>

          <CodePenPlayground
            initialHTML={`<button id="success">Success</button>
<button id="error">Error</button>
<ul id="notif"></ul>`}
            initialCSS={`#notif { list-style:none; padding:0; margin-top:15px; }
.notif {
  padding:10px;
  margin-bottom:10px;
  border-radius:6px;
  opacity:0;
  transform:translateY(10px);
  transition:.3s;
}
.notif.show {
  opacity:1;
  transform:translateY(0);
}
.notif.success { background:#22c55e; }
.notif.error { background:#ef4444; }`}
            initialJS={`const listRoot = document.getElementById("notif");

function add(text, type) {
  const li = document.createElement("li");
  li.className = "notif " + type;
  li.textContent = text;
  listRoot.prepend(li);

  requestAnimationFrame(() => li.classList.add("show"));

  setTimeout(() => {
    li.classList.remove("show");
    setTimeout(() => li.remove(), 300);
  }, 2500);
}

document.getElementById("success").onclick = () =>
  add("Payment Successful", "success");

document.getElementById("error").onclick = () =>
  add("Payment Failed", "error");`}
          />
        </section>
        {/* ============================================================
            21. GRAND SUMMARY — Everything You Learned in DOM Special
        ============================================================ */}
        <section className="space-y-6 pt-10 border-t border-slate-800">
          <h2 className="text-3xl font-bold text-sky-300">
            21. Grand Summary — What You Learned in DOM Special
          </h2>

          <p className="text-slate-300 text-base leading-relaxed max-w-3xl">
            Congratulations 🎉 Baba’s students!  
            You have completed one of the **most advanced DOM engineering modules** taught in any
            JavaScript course.  
            You learned everything required to work like a **professional front-end engineer**.
          </p>

          <ul className="list-disc pl-6 space-y-2 text-slate-300 text-sm">
            <li>Creating elements dynamically (<code>createElement</code>, <code>createTextNode</code>)</li>
            <li>Appending & inserting elements (<code>append</code>, <code>prepend</code>, <code>insertBefore</code>)</li>
            <li>Removing & replacing elements (<code>remove</code>, <code>removeChild</code>, <code>replaceChild</code>)</li>
            <li>Modifying content & attributes (<code>textContent</code>, <code>innerHTML</code>, <code>dataset</code>, <code>classList</code>)</li>
            <li>Using <code>cloneNode()</code> safely and professionally</li>
            <li>Super-fast rendering using <b>DocumentFragment</b></li>
            <li>Reusable UI with <code>&lt;template&gt;</code></li>
            <li>Efficient patterns using <b>event delegation</b></li>
            <li>User interface animations using CSS + class toggles</li>
            <li>Measurements with <code>getBoundingClientRect()</code></li>
            <li>Performance tuning (Reflow, Repaint, batching)</li>
            <li>Building your own mini-jQuery style helper library</li>
            <li>Observer APIs (Intersection / Resize / Mutation)</li>
            <li>Progressive Enhancement</li>
            <li>Mini Projects (Cards, Notifications, Filters, Virtual List)</li>
          </ul>

          <p className="text-slate-400 text-sm">
            ✔ These skills are used in React, Vue, Svelte, Web Components & professional UI frameworks.
          </p>
        </section>


        {/* ============================================================
            22. INTERVIEW QUESTIONS — DOM Engineering Round
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-300">
            22. Interview Questions (Asked in Real Front-End Interviews)
          </h2>

          <ul className="list-decimal pl-6 space-y-3 text-slate-300 text-sm">

            <li>
              What is the difference between:
              <ul className="list-disc pl-6 mt-1">
                <li><code>append()</code> vs <code>appendChild()</code></li>
                <li><code>prepend()</code> vs <code>insertBefore()</code></li>
              </ul>
            </li>

            <li>Explain shallow vs deep cloning in <code>cloneNode()</code>.</li>

            <li>Why are event listeners not copied when using <code>cloneNode()</code>?</li>

            <li>Explain what <code>DocumentFragment</code> is and why it's so fast.</li>

            <li>Compare <code>innerHTML</code>, <code>cloneNode()</code> & <code>&lt;template&gt;</code>.</li>

            <li>What is event delegation? Why is it essential for large DOM structures?</li>

            <li>Explain <b>Reflow</b> vs <b>Repaint</b> with examples.</li>

            <li>Why is <code>getBoundingClientRect()</code> expensive? When should it be avoided?</li>

            <li>What does the IntersectionObserver API do?</li>

            <li>Explain progressive enhancement with an example.</li>

            <li>How does virtualized rendering improve performance?</li>

          </ul>
        </section>


        {/* ============================================================
            23. ASSIGNMENTS — Professional-Level Tasks
        ============================================================ */}
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold text-purple-300">
            23. Assignments — Practice Like a Real Engineer
          </h2>

          <div className="space-y-6 text-slate-300">

            <div>
              <h3 className="font-semibold text-sky-300">Assignment 1 — Build a Dynamic FAQ Component</h3>
              <p className="text-sm">
                Requirements:
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use <code>template</code> + <code>cloneNode()</code></li>
                  <li>Use event delegation for expanding/collapsing</li>
                  <li>Add animations using class toggles</li>
                </ul>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sky-300">Assignment 2 — Animated Image Gallery</h3>
              <p className="text-sm">
                Requirements:
                <ul className="list-disc pl-6 space-y-1">
                  <li>Generate thumbnails dynamically</li>
                  <li>Use <code>DocumentFragment</code> for speed</li>
                  <li>Create a modal viewer for full-size images</li>
                  <li>Add fade-in animations</li>
                </ul>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sky-300">Assignment 3 — Notification Center</h3>
              <p className="text-sm">
                Requirements:
                <ul className="list-disc pl-6 space-y-1">
                  <li>Build reusable <code>showToast()</code> function</li>
                  <li>Support types: success, warning, info, error</li>
                  <li>Auto-dismiss with animation</li>
                  <li>Store notification history in an array</li>
                </ul>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-sky-300">
                Assignment 4 — Build a Mini Virtual List (1000+ items)
              </h3>
              <p className="text-sm">
                Requirements:
                <ul className="list-disc pl-6 space-y-1">
                  <li>Render only visible rows</li>
                  <li>Use scroll event + requestAnimationFrame</li>
                  <li>Prevent UI freezing</li>
                </ul>
              </p>
            </div>

          </div>
        </section>


        {/* ============================================================
            24. REAL-WORLD PRACTICAL TASKS FOR STUDENTS
        ============================================================ */}
        <section className="space-y-6 pb-12">
          <h2 className="text-2xl font-semibold text-pink-300">
            24. Real-World Practice Tasks (Industry Grade)
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-300 text-sm">

            <li>Build a “Recently Viewed Products” component using <code>cloneNode()</code>.</li>

            <li>Create an expandable sidebar using class toggles + transitions.</li>

            <li>Implement lazy loading of images using <code>IntersectionObserver</code>.</li>

            <li>Make a progress bar that fills based on scroll position.</li>

            <li>Build an auto-updating chat box using <code>MutationObserver</code>.</li>

            <li>Create reusable components:
              <ul className="list-disc pl-6">
                <li>Modal</li>
                <li>Dropdown</li>
                <li>Tooltip</li>
                <li>Snackbar</li>
              </ul>
            </li>

            <li>Optimize a slow page by removing layout thrashing.</li>

            <li>
              Build a mini library:
              <code>dom.js</code>  
              containing helpers for create, update, events, templates, animations.
            </li>

          </ul>

          <p className="text-slate-400 text-xs pt-4">
            ✔ Completing these tasks will make you capable of writing UI-level JavaScript found in  
            **React, Vue, Svelte, Alpine.js, jQuery UI, Bootstrap JS, Tailwind UI logic, and Web Components**.
          </p>
        </section>
