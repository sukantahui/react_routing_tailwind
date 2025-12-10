// src/components/study/javaScript/topics/dom-special-creating-manipulating-elements/Topic11.jsx

import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";
import CodePenPlayground from "../../../../../common/CodePenPlayground";

export default class Topic11 extends Component {
    render() {
        return (
            <div className="space-y-14 text-slate-200">

                {/* ============================================================
                    HEADER
                ============================================================ */}
                <header className="space-y-3">
                    <h1 className="text-3xl font-bold text-sky-400">
                        Mini Project — Dynamic List Manager (Add / Edit / Remove Items)
                    </h1>

                    <p className="text-slate-400 max-w-3xl">
                        This project teaches you how to build a fully interactive **List Manager UI**
                        using real-world DOM APIs used in dashboards, inventory systems, todo apps,
                        admin panels, and form builders.
                        You will use:
                        <b> createElement() </b>,
                        <b> appendChild() </b>,
                        <b> replaceChild() </b>,
                        <b> remove() </b>,
                        <b> classList </b>, and
                        <b>event delegation</b>.
                    </p>
                </header>



                {/* ============================================================
                    SECTION 1 — Architecture of a List Manager
                ============================================================ */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-semibold text-purple-300">
                        1. Architecture — How a List Manager Works
                    </h2>

                    <p className="text-slate-400 max-w-2xl">
                        Before writing code, understand what UI elements and behaviors are required
                        for a real list manager.
                    </p>

                    <ul className="list-disc pl-6 text-slate-300 space-y-1">
                        <li>Input box to add new items</li>
                        <li>Add button to create list entries</li>
                        <li>A dynamic list of items</li>
                        <li>Edit button → inline editing</li>
                        <li>Delete button → remove item</li>
                        <li>Optionally store in LocalStorage</li>
                    </ul>

                    {/* SVG Architecture Diagram */}
                    <svg width="430" height="170">
                        <rect x="20" y="20" width="380" height="130" rx="12"
                            fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

                        <text x="40" y="55" fill="#38bdf8" fontSize="14">
                            INPUT BOX → ADD BUTTON
                        </text>

                        <text x="40" y="85" fill="#a855f7" fontSize="12">
                            ↓ Creates LI elements dynamically via JS
                        </text>

                        <text x="40" y="120" fill="#22c55e" fontSize="14">
                            LIST → &lt;li&gt; Item [Edit] [Delete]
                        </text>

                        <text x="40" y="150" fill="#f97316" fontSize="12">
                            Editing replaces text with input + Save button
                        </text>
                    </svg>

                    {/* === PLAYGROUND === */}
                    <CodePenPlayground
                        initialHTML={`
<div class="box">
  <p>List Manager Architecture Demo</p>
</div>`}

                        initialCSS={`
.box { 
  padding: 14px; 
  background: #1e293b; 
  border-radius: 10px; 
  color: #bae6fd; 
  text-align: center;
  border: 1px solid #334155;
}`}
                        initialJS={`console.log("Architecture section loaded");`}
                    />
                </section>




                {/* ============================================================
                    SECTION 2 — Basic Structure (HTML + JS)
                ============================================================ */}
                <section className="space-y-8">

                    <h2 className="text-2xl font-semibold text-emerald-300">
                        2. Basic Structure (UI + Base Script)
                    </h2>

                    <EditableCodeBlock
                        language="html"
                        initialCode={`<!-- HTML -->
<div class="manager">
    <input id="itemInput" placeholder="Enter item..." />
    <button id="addBtn">Add</button>
    <ul id="list"></ul>
</div>

// JavaScript Base
const input = document.querySelector("#itemInput");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#list");

addBtn.onclick = () => {
    const value = input.value.trim();
    if (!value) return;
    addItem(value);
    input.value = "";
};`}
                    />

                    {/* === PLAYGROUND === */}
                    <CodePenPlayground
                        initialHTML={`
<div class="manager">
  <input id="itemInput" placeholder="Enter item..." />
  <button id="addBtn">Add</button>
  <ul id="list"></ul>
</div>`}

                        initialCSS={`
.manager { padding: 10px; }
button { margin-left: 5px; }
ul li { padding: 5px 0; }`}

                        initialJS={`
const input = document.querySelector("#itemInput");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#list");

addBtn.onclick = () => {
  const value = input.value.trim();
  if (!value) return;
  const li = document.createElement("li");
  li.textContent = value;
  list.appendChild(li);
  input.value = "";
};`}
                    />

                </section>




                {/* ============================================================
                    SECTION 3 — Adding Items Dynamically
                ============================================================ */}
                <section className="space-y-8">

                    <h2 className="text-2xl font-semibold text-sky-300">
                        3. Adding Items Dynamically
                    </h2>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`function addItem(text) {
  const li = document.createElement("li");
  li.className = "item";

  const span = document.createElement("span");
  span.textContent = text;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";

  li.append(span, editBtn, delBtn);
  list.appendChild(li);
}`}
                    />

                    {/* === PLAYGROUND === */}
                    <CodePenPlayground
                        initialHTML={`
<input id="txt" placeholder="Item..."/>
<button id="add">Add</button>
<ul id="list"></ul>`}

                        initialCSS={`
li { padding: 4px; margin: 4px 0; }
button { margin-left: 6px; }`}

                        initialJS={`
const txt = document.querySelector("#txt");
const add = document.querySelector("#add");
const list = document.querySelector("#list");

add.onclick = () => {
  const value = txt.value.trim();
  if (!value) return;

  const li = document.createElement("li");
  li.textContent = value;
  list.appendChild(li);
  txt.value = "";
};`}
                    />
                </section>




                {/* ============================================================
                    SECTION 4 — Inline Editing
                ============================================================ */}
                <section className="space-y-8">

                    <h2 className="text-2xl font-semibold text-amber-300">
                        4. Inline Editing (replaceChild)
                    </h2>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`editBtn.onclick = () => {
  const input = document.createElement("input");
  input.value = span.textContent;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";

  const wrapper = document.createElement("div");
  wrapper.append(input, saveBtn);

  // Replace text with editable box
  li.replaceChild(wrapper, span);

  saveBtn.onclick = () => {
    span.textContent = input.value;
    li.replaceChild(span, wrapper);
  };
};`}
                    />

                    {/* === PLAYGROUND === */}
                    <CodePenPlayground
                        initialHTML={`
<ul id="list">
 <li>
   <span>Example Item</span>
   <button class="edit">Edit</button>
 </li>
</ul>`}

                        initialCSS={`
li { padding: 5px; }
input { margin-right: 5px; }`}

                        initialJS={`
const li = document.querySelector("li");
const span = li.querySelector("span");
const editBtn = li.querySelector(".edit");

editBtn.onclick = () => {
  const input = document.createElement("input");
  input.value = span.textContent;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";

  const wrapper = document.createElement("div");
  wrapper.append(input, saveBtn);

  li.replaceChild(wrapper, span);

  saveBtn.onclick = () => {
    span.textContent = input.value;
    li.replaceChild(span, wrapper);
  };
};`}
                    />
                </section>




                {/* ============================================================
                    SECTION 5 — Removing Items
                ============================================================ */}
                <section className="space-y-8">

                    <h2 className="text-2xl font-semibold text-rose-300">
                        5. Removing Items
                    </h2>

                    <EditableCodeBlock
                        language="javascript"
                        initialCode={`delBtn.onclick = () => {
  li.classList.add("fade-out");
  setTimeout(() => li.remove(), 300);
};`}
                    />

                    {/* === PLAYGROUND === */}
                    <CodePenPlayground
                        initialHTML={`
<ul id="list">
  <li>Delete me <button class="del">Delete</button></li>
</ul>`}

                        initialCSS={`
.fade-out { 
  opacity: 0; 
  transition: opacity .3s; 
}`}

                        initialJS={`
const li = document.querySelector("li");
const del = document.querySelector(".del");

del.onclick = () => {
  li.classList.add("fade-out");
  setTimeout(() => li.remove(), 300);
};`}
                    />
                </section>




                {/* ============================================================
                    SECTION 6 — Full Working Project
                ============================================================ */}
                <section className="space-y-8">

                    <h2 className="text-2xl font-semibold text-indigo-300">
                        6. Full Working Project — Dynamic List Manager
                    </h2>

                    {/* === PLAYGROUND === */}
                    <CodePenPlayground
                        initialHTML={`
<div class="manager">
  <input id="itemInput" placeholder="Enter item..." />
  <button id="addBtn">Add</button>
  <ul id="list"></ul>
</div>`}

                        initialCSS={`
.item { padding: 6px; }
button { margin-left: 8px; }
.fade-out { opacity: 0; transition: opacity .3s; }`}

                        initialJS={`
// Select elements
const input = document.querySelector("#itemInput");
const addBtn = document.querySelector("#addBtn");
const list = document.querySelector("#list");

addBtn.onclick = () => {
  const value = input.value.trim();
  if (!value) return;
  addItem(value);
  input.value = "";
};

function addItem(text) {
  const li = document.createElement("li");
  li.className = "item";

  const span = document.createElement("span");
  span.textContent = text;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";

  li.append(span, editBtn, delBtn);
  list.appendChild(li);

  // Edit
  editBtn.onclick = () => {
    const input = document.createElement("input");
    input.value = span.textContent;

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";

    const wrapper = document.createElement("div");
    wrapper.append(input, saveBtn);

    li.replaceChild(wrapper, span);

    saveBtn.onclick = () => {
      span.textContent = input.value;
      li.replaceChild(span, wrapper);
    };
  };

  // Delete
  delBtn.onclick = () => {
    li.classList.add("fade-out");
    setTimeout(() => li.remove(), 300);
  };
}`}
                    />

                </section>


                {/* FOOTER */}
                <footer className="pt-10 pb-6 text-slate-500 text-sm">
                    🎉 You built a professional dynamic List Manager used in real UI systems.
                    In the next topics, we will build even more advanced component architectures.
                </footer>

            </div>
        );
    }
}
