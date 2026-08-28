// src/components/study/javaScript/topics/dom-special-creating-manipulating-elements/Topic14.jsx

import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";
import CodePenPlayground from "../../../../../common/CodePenPlayground";

export default class Topic14 extends Component {
    render() {
        return (
            <div className="space-y-16 text-slate-200 leading-relaxed">

                {/* ============================================================
            HEADER
        ============================================================ */}
                <header className="space-y-3">
                    <h1 className="text-3xl font-bold text-sky-400">
                        Advanced DOM Engineering — Essential Tools for Real-World UI Systems
                    </h1>

                    <p className="text-slate-400 max-w-3xl">
                        This topic introduces **industry-level DOM concepts** used in dashboards,
                        admin panels, UI frameworks, and enterprise web apps.
                        You will learn: performance behavior, observers, virtualization,
                        batch updates, event delegation, animation patterns,
                        metadata handling, layout measurement, and more.
                    </p>
                </header>

                {/* ============================================================
            SECTION 1 — dataset attributes (data-*)
        ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-semibold text-emerald-300">
                        1. dataset Attributes — Storing Custom Metadata in the DOM
                    </h2>

                    <p className="max-w-2xl text-slate-300">
                        The <code>dataset</code> API reads & writes HTML <code>data-*</code> attributes.
                        These are used heavily in UI systems to store IDs, states, configuration, and metadata
                        without mixing them into CSS classes.
                    </p>

                    {/* Syntax */}
                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`// Reading
element.dataset.key;      // maps to data-key
element.dataset.userId;   // maps to data-user-id

// Writing
element.dataset.status = "active";  // sets data-status="active"

// Return Type:
// DOMStringMap`}
                    />

                    {/* Example Demo */}
                    <CodePenPlayground
                        initialHTML={`<button id="task" data-id="42" data-status="pending">
  Task Item
</button>

<p id="out"></p>`}
                        initialCSS={`body { font-family: sans-serif; background:#020617; color:white; padding:20px; }`}
                        initialJS={`const btn = document.getElementById("task");
const out = document.getElementById("out");

out.textContent =
  "ID: " + btn.dataset.id +
  ", Status: " + btn.dataset.status;

btn.onclick = () => {
  btn.dataset.status = "completed";
  out.textContent =
    "Updated Status: " + btn.dataset.status;
};`}
                    />

                    <p className="text-slate-400 text-sm">
                        ✔ This is better than storing metadata in class names
                        ✔ Frameworks like React, Vue, Alpine often read <code>data-*</code> for configuration
                    </p>
                </section>



                {/* ============================================================
    EXTRA SECTION — classList Complete Professional Guide
============================================================ */}
                <section className="space-y-10">
                    <h2 className="text-2xl font-semibold text-sky-400">
                        Bonus — classList API: Full Syntax, Methods, Patterns & Best Practices
                    </h2>

                    <p className="text-slate-300 max-w-3xl">
                        The <code>classList</code> API is one of the most important DOM tools for modern UI engineering.
                        Frameworks like Tailwind, Bootstrap, and many JS libraries rely heavily on class-based state changes.
                        Understanding <code>classList</code> deeply is essential for animations, toggles, modals, tooltips,
                        dropdowns, alerts, and interactive UI components.
                    </p>

                    {/* Syntax & Return Type */}
                    <div>
                        <h3 className="text-xl font-semibold text-emerald-300">Syntax & Return Type</h3>

                        <EditableCodeBlock
                            language="javascript"
                            initialCode={`// Accessing classList
element.classList;

// Return Type: DOMTokenList
// A live list-like object with methods for managing CSS classes.`}
                        />
                    </div>

                    {/* Methods Table */}
                    <div>
                        <h3 className="text-xl font-semibold text-indigo-300">Available Methods</h3>

                        <EditableCodeBlock
                            language="javascript"
                            initialCode={`classList.add("cls1", "cls2");         // Adds one or more classes
classList.remove("cls1");             // Removes one or more classes
classList.toggle("open");             // Toggles class on/off
classList.toggle("open", true);       // Force ON
classList.toggle("open", false);      // Force OFF
classList.contains("active");         // Returns true/false
classList.replace("old", "new");      // Replace class names
`}
                        />

                        <p className="text-sm text-slate-400 mt-2">
                            ✔ <code>toggle()</code> is the most powerful for UI animations
                            ✔ <code>replace()</code> is useful for theme or mode switching
                            ✔ <code>contains()</code> is great for conditional UI logic
                        </p>
                    </div>

                    {/* Example 1 — Add / Remove */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-purple-300">
                            Example 1 — Basic add(), remove(), contains()
                        </h3>

                        <EditableCodeBlock
                            language="javascript"
                            initialCode={`const box = document.getElementById("box");

box.classList.add("visible");
box.classList.remove("hidden");

if (box.classList.contains("visible")) {
  console.log("Box is now visible");
}`}
                        />
                    </section>

                    {/* Example 2 — toggle() */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-purple-300">
                            Example 2 — toggle() for Dropdowns & Menus
                        </h3>

                        <EditableCodeBlock
                            language="javascript"
                            initialCode={`menuBtn.addEventListener("click", () => {
  menu.classList.toggle("open");
});`}
                        />

                        <p className="text-xs text-slate-400">
                            ✔ Used in accordions, dropdowns, sidebar menus, mobile navigation
                        </p>
                    </section>

                    {/* Example 3 — Animation with classList */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-amber-300">
                            Example 3 — CSS Transitions Triggered by classList
                        </h3>

                        <CodePenPlayground
                            initialHTML={`<button id="btn">Animate</button>
<div id="box" class="box"></div>`}
                            initialCSS={`body{background:#020617;color:white;font-family:sans-serif;padding:20px;}
.box{
  width:120px;height:120px;background:#38bdf8;border-radius:12px;
  transition:transform .3s ease, opacity .3s ease;
  transform:scale(.8); opacity:.5;
}
.box.active{
  transform:scale(1.2) translateX(40px);
  opacity:1;
}`}
                            initialJS={`const box = document.getElementById("box");
const btn = document.getElementById("btn");

btn.onclick = () => {
  box.classList.toggle("active");
};`}
                        />

                        <p className="text-xs text-slate-400">
                            ✔ Animation is controlled 100% by CSS
                            ✔ JavaScript only toggles the state
                        </p>
                    </section>

                    {/* Example 4 — replace() */}
                    <section className="space-y-3">
                        <h3 className="text-lg font-semibold text-lime-300">
                            Example 4 — replace() for Theme Switching
                        </h3>

                        <EditableCodeBlock
                            language="javascript"
                            initialCode={`document.documentElement.classList.replace("light", "dark");`}
                        />

                        <p className="text-sm text-slate-400">
                            ✔ Useful in theme switchers
                            ✔ Much cleaner than removing + adding separately
                        </p>
                    </section>

                    {/* Advanced Patterns */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-semibold text-pink-300">
                            Advanced Patterns Using classList
                        </h3>

                        <ul className="list-disc pl-6 space-y-2 text-slate-300 text-sm">
                            <li>Use <code>toggle("class", condition)</code> to avoid if-else logic</li>
                            <li>Use <code>replace()</code> for mode switching (dark/light/tab-state)</li>
                            <li>Use <code>contains()</code> to detect state and run animations conditionally</li>
                            <li>Avoid working with <code>className = ...</code> (unsafe + overrides everything)</li>
                            <li>Combine <code>classList</code> with CSS transitions for smooth UI effects</li>
                        </ul>
                    </section>

                    {/* Final Summary */}
                    <footer className="text-slate-400 text-sm pt-4 border-t border-slate-800">
                        <p>
                            <code>classList</code> is the backbone of modern UI engineering.
                            Mastering it unlocks dropdowns, modals, sidebars, tabs, toast notifications,
                            dark mode, animations, transitions, and component-based architecture.
                        </p>
                    </footer>
                </section>



                {/* ============================================================
            SECTION 2 — Bounding & Positioning (getBoundingClientRect)
        ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-semibold text-sky-300">
                        2. Layout Measurement — getBoundingClientRect()
                    </h2>

                    <p className="max-w-2xl text-slate-300">
                        This API returns the element’s **position & size** on the screen.
                        Tooltips, dropdowns, modals, animations, virtualization, and responsive layouts depend on this.
                    </p>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`const rect = element.getBoundingClientRect();

// Return Type: DOMRect
rect.top;
rect.left;
rect.width;
rect.height;
rect.bottom;
rect.right;`}
                    />

                    <CodePenPlayground
                        initialHTML={`<button id="box" style="padding:20px; background:#0ea5e9; border:none; border-radius:8px;">
  Measure Me
</button>

<p id="log"></p>`}
                        initialCSS={`body{ background:#020617; color:white; font-family:sans-serif; padding:20px; }`}
                        initialJS={`const box = document.getElementById("box");
const log = document.getElementById("log");

box.onclick = () => {
  const r = box.getBoundingClientRect();
  log.textContent = \`Top: \${r.top}, Left: \${r.left}, Width: \${r.width}\`;
};`}
                    />
                </section>

                {/* ============================================================
            SECTION 3 — Reflow & Repaint
        ============================================================ */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-amber-300">
                        3. Understanding Reflow & Repaint
                    </h2>

                    <p className="text-slate-300 max-w-3xl">
                        Every DOM update can trigger **layout calculations**.
                        If you read layout (like <code>offsetHeight</code>) immediately after writing style changes,
                        the browser is forced to **reflow**, reducing performance.
                    </p>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`// Bad: Forces reflow twice
box.style.width = "300px";
const h = box.offsetHeight; // Forces layout calculation
box.style.height = h + "px";`}
                    />

                    <p className="text-sm text-slate-400">
                        ✔ Solution: batch reads separately from writes
                    </p>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`// Good pattern
const height = box.offsetHeight;  // READ
requestAnimationFrame(() => {     // batch WRITE safely
  box.style.height = height + "px";
});`}
                    />
                </section>

                {/* ============================================================
            SECTION 4 — Batch DOM updates (Micro-Optimizations)
        ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-semibold text-indigo-300">
                        4. Batch DOM Updates for Performance
                    </h2>

                    <p className="max-w-2xl text-slate-300">
                        Touching DOM repeatedly inside loops is slow.
                        Use <code>DocumentFragment</code> to build off-screen DOM and append once.
                    </p>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`const frag = document.createDocumentFragment();

for (let i = 0; i < 500; i++) {
  const div = document.createElement("div");
  div.textContent = "Item " + i;
  frag.appendChild(div);
}

container.appendChild(frag); // one paint`}
                    />

                    <p className="text-xs text-slate-400">
                        ✔ 100× faster than appending in each loop
                    </p>
                </section>

                {/* ============================================================
            SECTION 5 — Event Delegation
        ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-semibold text-purple-300">
                        5. Event Delegation — The Most Powerful DOM Pattern
                    </h2>

                    <p className="text-slate-300 max-w-3xl">
                        Instead of adding click listeners to every button, attach **one listener** to a parent,
                        and detect which child triggered the event.
                    </p>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`list.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.classList.contains("edit")) {
    console.log("Edit clicked");
  }
  if (btn.classList.contains("delete")) {
    console.log("Delete clicked");
  }
});`}
                    />

                    <p className="text-xs text-slate-400">
                        ✔ Used in React (event delegation root)
                        ✔ Great for dynamic lists
                    </p>
                </section>



                {/* ============================================================
            SECTION 6 — Animations using class toggles
        ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-semibold text-rose-300">
                        6. Animations Using classList + CSS Transitions
                    </h2>

                    <CodePenPlayground
                        initialHTML={`<button id="btn">Toggle Box</button>
<div id="box" class="box"></div>`}
                        initialCSS={`body{background:#020617; color:white; padding:20px;}
#box{
  width:120px; height:120px;
  background:#38bdf8;
  border-radius:12px;
  opacity:0.4;
  transition:transform .3s ease, opacity .3s ease;
}
#box.active{
  transform:translateX(50px) scale(1.2);
  opacity:1;
}`}
                        initialJS={`const btn = document.getElementById("btn");
const box = document.getElementById("box");

btn.onclick = () => {
  box.classList.toggle("active");
};`}
                    />
                </section>

                {/* ============================================================
            SECTION 7 — Toast Notifications
        ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-semibold text-yellow-300">
                        7. Animated Toast Notifications (Intro)
                    </h2>

                    <CodePenPlayground
                        initialHTML={`<button id="show">Show Toast</button>
<div id="toast" class="toast hidden">Hello Baba!</div>`}
                        initialCSS={`body{background:#020617;color:white;font-family:sans-serif;}
.toast{
  position:fixed;
  bottom:20px; right:20px;
  background:#22c55e;
  padding:12px 18px;
  border-radius:8px;
  opacity:0;
  transform:translateY(20px);
  transition:all .25s ease;
}
.toast.show{
  opacity:1;
  transform:translateY(0);
}
.hidden{display:none;}`}
                        initialJS={`const t = document.getElementById("toast");
const show = document.getElementById("show");

show.onclick = () => {
  t.classList.remove("hidden");
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 1500);
};`}
                    />
                </section>

                {/* ============================================================
            SECTION 8 — Tooltip / Modal / Dropdown Intro
        ============================================================ */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-lime-300">
                        8. Tooltip, Modal & Dropdown — Core Structure
                    </h2>

                    <p className="text-slate-400">
                        These UI components rely on:
                        • Positioning (bounding rectangle)
                        • Visibility toggles
                        • Backdrop / overlay
                        • Focus trapping (modal)
                        • Event delegation
                    </p>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`// Modal show/hide pattern
openBtn.onclick = () => modal.classList.add("open");
closeBtn.onclick = () => modal.classList.remove("open");`}
                    />
                </section>

                {/* ============================================================
            SECTION 9 — Virtualized Rendering (1000+ items)
        ============================================================ */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-sky-300">
                        9. Virtualized Rendering — Efficient Huge Lists
                    </h2>

                    <p className="text-slate-300 max-w-3xl">
                        Rendering 1000+ DOM nodes is slow.
                        Virtualization renders only the items visible in the viewport.
                    </p>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`// Conceptual example
const start = scrollTop / itemHeight;
const end = start + visibleCount;

render(items.slice(start, end));`}
                    />
                </section>

                {/* ============================================================
            SECTION 10 — requestAnimationFrame() Animations
        ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-semibold text-purple-300">
                        10. Smooth Animations using requestAnimationFrame()
                    </h2>

                    <CodePenPlayground
                        initialHTML={`<button id="run">Animate Box</button>
<div id="box" style="width:40px;height:40px;background:#f43f5e;margin-top:20px;"></div>`}
                        initialCSS={`body{background:#020617;color:white;font-family:sans-serif;}`}
                        initialJS={`const box = document.getElementById("box");
const run = document.getElementById("run");

run.onclick = () => {
  let x = 0;

  function animate() {
    x += 2;
    box.style.transform = \`translateX(\${x}px)\`;

    if (x < 200) requestAnimationFrame(animate);
  }

  animate();
};`}
                    />
                </section>

                {/* ============================================================
            SECTION 11 — Observers (Intersection / Resize / Mutation)
        ============================================================ */}
                <section className="space-y-10">
                    <h2 className="text-2xl font-semibold text-emerald-300">
                        11. Observers — Watching DOM & Visibility
                    </h2>

                    {/* IntersectionObserver */}
                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`const obs = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) console.log("Visible!");
});
obs.observe(document.getElementById("box"));`}
                    />

                    {/* ResizeObserver */}
                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`new ResizeObserver(entries => {
  console.log("Size changed:", entries[0].contentRect);
}).observe(panel);`}
                    />

                    {/* MutationObserver */}
                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`new MutationObserver(mutations => {
  console.log("DOM mutated", mutations);
}).observe(app, { childList: true, subtree: true });`}
                    />
                </section>

                {/* ============================================================
            SECTION 12 — Mini DOM Helper Library
        ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-semibold text-yellow-300">
                        12. Build Your Own DOM Helper Library
                    </h2>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

function create(tag, props = {}) {
  const el = document.createElement(tag);
  return Object.assign(el, props);
}

function on(el, event, handler) {
  el.addEventListener(event, handler);
  return el;
}`} />

                    <p className="text-xs text-slate-400">
                        This is how jQuery, Alpine.js, Solid.js begin internally.
                    </p>
                </section>

                {/* ============================================================
            SECTION 13 — UI vs State Separation
        ============================================================ */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-indigo-300">
                        13. Separating UI Logic from State Logic
                    </h2>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`// STATE
let count = 0;

// UI UPDATE
function render() {
  counter.textContent = count;
}

// EVENT
incBtn.onclick = () => {
  count++;
  render();
};`}
                    />,
                </section>

                {/* ============================================================
            SECTION 14 — Progressive Enhancement
        ============================================================ */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-sky-300">
                        14. Progressive Enhancement — Never Break UI
                    </h2>

                    <p className="text-slate-300 max-w-3xl">
                        Websites must work **without JavaScript**, and improve when JS is available.
                    </p>

                    <EditableCodeBlock
                        language="html"
                        initialCode={`<!-- HTML works without JS -->
<button class="buy-btn">Buy Now</button>

<!-- JS enhances with modal -->
<script>
  document.querySelector(".buy-btn").onclick = showModal;
</script>`}
                    />
                </section>

                {/* ============================================================
            SECTION 15 — Mini Project 2: Dynamic Card Generator
        ============================================================ */}
                <section className="space-y-10">
                    <h2 className="text-2xl font-semibold text-emerald-300">
                        Mini Project 2 — Dynamic Card Generator with Filters
                    </h2>

                    <CodePenPlayground
                        initialHTML={`<input id="search" placeholder="Search..." />
<div id="cards"></div>`}
                        initialCSS={`body{background:#020617;color:white;font-family:sans-serif;}
.card{padding:12px;border:1px solid #38bdf8;border-radius:8px;margin-top:8px;}`}
                        initialJS={`const data = [
  { title: "JavaScript" },
  { title: "React" },
  { title: "CSS" },
  { title: "DOM Manipulation" }
];

const cards = document.getElementById("cards");
const search = document.getElementById("search");

function render(list) {
  cards.innerHTML = "";
  list.forEach(item => {
    const c = document.createElement("div");
    c.className = "card";
    c.textContent = item.title;
    cards.appendChild(c);
  });
}

render(data);

search.oninput = () => {
  const q = search.value.toLowerCase();
  render(data.filter(x => x.title.toLowerCase().includes(q)));
};`}
                    />
                </section>

                {/* ============================================================
            SECTION 16 — Mini Project 3: Animated Notification Center (Intro)
        ============================================================ */}
                <section className="space-y-10">
                    <h2 className="text-2xl font-semibold text-rose-300">
                        Mini Project 3 — Animated Notification Center (Intro)
                    </h2>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`function notify(msg, type="info") {
  const box = document.createElement("div");
  box.className = "toast " + type;
  box.textContent = msg;

  container.appendChild(box);

  requestAnimationFrame(() => box.classList.add("show"));

  setTimeout(() => box.classList.remove("show"), 2000);
}`}
                    />

                    <p className="text-xs text-slate-500">
                        Full Notification Center is in the next topic.
                    </p>
                </section>

                {/* ============================================================
            FOOTER
        ============================================================ */}
                <footer className="text-slate-400 text-sm pt-10 border-t border-slate-800">
                    You now understand professional DOM engineering fundamentals used in real UI frameworks.
                </footer>

            </div>
        );
    }
}
