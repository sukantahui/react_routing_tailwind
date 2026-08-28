// src/components/study/javaScript/topics/dom-special-creating-manipulating-elements/Topic12.jsx

import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";
import CodePenPlayground from "../../../../../common/CodePenPlayground";

export default class Topic12 extends Component {
    render() {
        return (
            <div className="space-y-14 text-slate-200">

                {/* ============================================================
                     HEADER
                ============================================================ */}
                <header className="space-y-3">
                    <h1 className="text-3xl font-bold text-sky-400">
                        Mini Project — Dynamic Card Generator with Filters
                    </h1>

                    <p className="text-slate-400 max-w-3xl leading-relaxed">
                        In this project, we build a **Card Generator UI** where products or courses 
                        are rendered dynamically using JavaScript.  
                        Students will learn:
                        <b> cloneNode() </b>,
                        <b> template patterns </b>,
                        <b> filtering </b>,
                        <b> searching </b>,
                        <b> dynamic rendering </b>,
                        and <b>performance-friendly updates</b>.
                    </p>
                </header>



                {/* ============================================================
                        SECTION 1 — Understanding Card Rendering Architecture
                ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-semibold text-purple-300">
                        1. Architecture — How Dynamic Card Rendering Works
                    </h2>

                    <p className="text-slate-400 max-w-2xl">
                        Learn the UI pattern used by Amazon, Flipkart, Udemy, YouTube, and every 
                        modern web app displaying data lists.
                    </p>

                    <ul className="list-disc pl-6 text-slate-300 space-y-1">
                        <li>A dataset (products, courses, items)</li>
                        <li>A template card to clone for each item</li>
                        <li>A container to display generated cards</li>
                        <li>Filters (category buttons, dropdowns)</li>
                        <li>Live search bar</li>
                        <li>Rendering engine that updates UI efficiently</li>
                    </ul>

                    {/* SVG Diagram */}
                    <svg width="460" height="200">
                        <rect x="20" y="20" width="420" height="160" rx="12"
                              fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

                        <text x="40" y="55" fill="#38bdf8" fontSize="14">
                            DATA → TEMPLATE → cloneNode() → GRID
                        </text>

                        <text x="40" y="90" fill="#a855f7" fontSize="12">
                            Filters change which items are rendered
                        </text>

                        <text x="40" y="135" fill="#22c55e" fontSize="14">
                            SEARCH → Live updates UI as you type
                        </text>

                        <text x="40" y="165" fill="#f97316" fontSize="12">
                            Efficient rendering = fast UI, no lag
                        </text>
                    </svg>

                    {/* === PLAYGROUND === */}
                    <CodePenPlayground
                        initialHTML={`<div class="card">Architecture Loaded</div>`}
                        initialCSS={`.card { padding: 16px; background:#1e293b; color:#bae6fd; border-radius:8px; }`}
                        initialJS={`console.log("Architecture section active");`}
                    />
                </section>





                {/* ============================================================
                        SECTION 2 — Creating the Template & Dataset
                ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-semibold text-emerald-300">
                        2. Creating the Card Template & Dataset
                    </h2>

                    <EditableCodeBlock
                        language="html"
                        initialCode={`<!-- Template -->
<template id="cardTemplate">
  <div class="card">
    <h3 class="title"></h3>
    <p class="category"></p>
    <p class="price"></p>
  </div>
</template>

// Dataset (JS)
const products = [
  { title: "JavaScript Mastery", category: "Programming", price: 399 },
  { title: "Photoshop Basics", category: "Design", price: 249 },
  { title: "Excel Advanced", category: "Productivity", price: 299 }
];`}
                    />

                    {/* Playground */}
                    <CodePenPlayground
                        initialHTML={`
<template id="cardTemplate">
  <div class="card">
    <h3 class="title"></h3>
    <p class="category"></p>
    <p class="price"></p>
  </div>
</template>

<div id="grid"></div>`}

                        initialCSS={`
.card { 
  padding: 12px; 
  border: 1px solid #334155; 
  border-radius: 10px; 
  margin: 6px 0;
  background:#1e293b;
  color: white;
}`}
                        initialJS={`
// Sample dataset
const products = [
  { title: "JavaScript Mastery", category: "Programming", price: 399 },
  { title: "Photoshop Basics", category: "Design", price: 249 },
  { title: "Excel Advanced", category: "Productivity", price: 299 }
];

console.log("Template & Dataset Ready");`}
                    />
                </section>





                {/* ============================================================
                        SECTION 3 — Rendering Cards Dynamically
                ============================================================ */}
                <section className="space-y-10">
                    <h2 className="text-2xl font-semibold text-sky-300">
                        3. Rendering Cards Dynamically Using cloneNode()
                    </h2>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`function render(list) {
  grid.innerHTML = "";

  list.forEach(item => {
    const copy = template.content.cloneNode(true);
    copy.querySelector(".title").textContent = item.title;
    copy.querySelector(".category").textContent = item.category;
    copy.querySelector(".price").textContent = "₹" + item.price;

    grid.appendChild(copy);
  });
}`}
                    />

                    {/* Playground */}
                    <CodePenPlayground
                        initialHTML={`
<template id="cardTemplate">
  <div class="card">
    <h3 class="title"></h3>
    <p class="category"></p>
    <p class="price"></p>
  </div>
</template>

<div id="grid"></div>`}

                        initialCSS={`
.card { 
  padding: 12px; 
  background:#0f172a;
  border: 1px solid #334155; 
  border-radius: 10px;
  margin-bottom: 8px;
  color:#bae6fd;
}`}
                        initialJS={`const products = [
  { title: "JavaScript Mastery", category: "Programming", price: 399 },
  { title: "Photoshop Basics", category: "Design", price: 249 },
  { title: "Excel Advanced", category: "Productivity", price: 299 }
];

const template = document.querySelector("#cardTemplate");
const grid = document.querySelector("#grid");

function render(list) {
  grid.innerHTML = "";

  list.forEach(item => {
    const copy = template.content.cloneNode(true);
    copy.querySelector(".title").textContent = item.title;
    copy.querySelector(".category").textContent = item.category;
    copy.querySelector(".price").textContent = "₹" + item.price;
    grid.appendChild(copy);
  });
}

render(products);`}
                    />
                </section>





                {/* ============================================================
                        SECTION 4 — Category Filters
                ============================================================ */}
                <section className="space-y-10">
                    <h2 className="text-2xl font-semibold text-amber-300">
                        4. Adding Category Filters (Programming / Design / Productivity)
                    </h2>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`buttons.forEach(btn => {
  btn.onclick = () => {
    const cat = btn.dataset.cat;
    if (cat === "All") return render(products);

    const filtered = products.filter(p => p.category === cat);
    render(filtered);
  };
});`}
                    />

                    <CodePenPlayground
                        initialHTML={`
<div class="filters">
  <button data-cat="All">All</button>
  <button data-cat="Programming">Programming</button>
  <button data-cat="Design">Design</button>
  <button data-cat="Productivity">Productivity</button>
</div>

<template id="cardTemplate">
  <div class="card">
    <h3 class="title"></h3>
    <p class="category"></p>
    <p class="price"></p>
  </div>
</template>

<div id="grid"></div>`}

                        initialCSS={`
button { margin-right: 6px; padding:6px 10px; }
.card { 
  background:#1e293b; 
  padding:12px; 
  margin-top:8px;
  border-radius:8px;
  color:white;
}`}
                        initialJS={`const products = [
  { title: "JavaScript Mastery", category: "Programming", price: 399 },
  { title: "Photoshop Basics", category: "Design", price: 249 },
  { title: "Excel Advanced", category: "Productivity", price: 299 }
];

const template = document.querySelector("#cardTemplate");
const grid = document.querySelector("#grid");
const buttons = [...document.querySelectorAll("button")];

function render(list) {
  grid.innerHTML = "";
  list.forEach(item => {
    const copy = template.content.cloneNode(true);
    copy.querySelector(".title").textContent = item.title;
    copy.querySelector(".category").textContent = item.category;
    copy.querySelector(".price").textContent = "₹" + item.price;
    grid.appendChild(copy);
  });
}
render(products);

buttons.forEach(btn => {
  btn.onclick = () => {
    const cat = btn.dataset.cat;
    if (cat === "All") return render(products);
    render(products.filter(p => p.category === cat));
  };
});`}
                    />
                </section>




                {/* ============================================================
                        SECTION 5 — Live Search Feature
                ============================================================ */}
                <section className="space-y-10">
                    <h2 className="text-2xl font-semibold text-rose-300">
                        5. Live Search (Instant Result Updating)
                    </h2>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`searchInput.oninput = () => {
  const text = searchInput.value.toLowerCase();
  const result = products.filter(p =>
    p.title.toLowerCase().includes(text)
  );
  render(result);
};`}
                    />

                    <CodePenPlayground
                        initialHTML={`
<input id="search" placeholder="Search courses..." />

<template id="cardTemplate">
  <div class="card">
    <h3 class="title"></h3>
    <p class="category"></p>
    <p class="price"></p>
  </div>
</template>

<div id="grid"></div>`}

                        initialCSS={`
#search { padding: 8px; width: 220px; }
.card { 
  background:#0f172a; 
  margin-top:8px;
  padding:14px;
  border-radius:10px;
  color:#bae6fd;
}`}
                        initialJS={`const products = [
  { title: "JavaScript Mastery", category: "Programming", price: 399 },
  { title: "Photoshop Basics", category: "Design", price: 249 },
  { title: "Excel Advanced", category: "Productivity", price: 299 }
];

const search = document.querySelector("#search");
const template = document.querySelector("#cardTemplate");
const grid = document.querySelector("#grid");

function render(list) {
  grid.innerHTML = "";
  list.forEach(item => {
    const node = template.content.cloneNode(true);
    node.querySelector(".title").textContent = item.title;
    node.querySelector(".category").textContent = item.category;
    node.querySelector(".price").textContent = "₹" + item.price;
    grid.appendChild(node);
  });
}

render(products);

search.oninput = () => {
  const text = search.value.toLowerCase();
  const result = products.filter(p =>
    p.title.toLowerCase().includes(text)
  );
  render(result);
};`}
                    />
                </section>




                {/* FOOTER */}
                <footer className="pt-10 pb-6 text-slate-500 text-sm">
                    🎉 You now understand how real e-commerce, course platforms, and dashboards 
                    generate dynamic card layouts with filters and search.  
                    Next: We move into advanced UI architecture.
                </footer>

            </div>
        );
    }
}
