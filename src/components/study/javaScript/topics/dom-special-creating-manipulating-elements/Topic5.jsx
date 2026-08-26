import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-12 text-slate-200 leading-relaxed">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <header className="space-y-3">
          <h1 className="text-2xl font-bold text-fuchsia-300 flex items-center gap-3">

            {/* Decorative SVG */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.7"/>
            </svg>

            Advanced DOM Components — Factory & Render System
          </h1>

          <p className="text-slate-400 text-sm md:text-base">
            In this chapter we move beyond simple DOM manipulation and build  
            *a reusable component system* using JavaScript functions.
            You will learn:
            <br />✔ Component Factory Pattern  
            ✔ Centralized State  
            ✔ Render Function  
            ✔ Mini Virtual DOM Idea  
            ✔ Updating UI from Data  
            <br />
            This topic is essential before learning **React, Vue, Svelte or Angular**.
          </p>
        </header>

        {/* =====================================================
            SECTION 1 — What Are Component Factories?
        ===================================================== */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
            <svg width="28" height="28" fill="none">
              <rect x="4" y="4" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            1. What Are Component Factory Functions?
          </h2>

          <p className="text-slate-300">
            A **component factory function** creates DOM elements from data.  
            Instead of manually creating DOM every time, we build **factories**  
            that take data as input and return ready UI components.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function Card({ title, desc }) {
  const card = document.createElement("div");
  card.className = "card";

  const h3 = document.createElement("h3");
  h3.textContent = title;

  const p = document.createElement("p");
  p.textContent = desc;

  card.append(h3, p);
  return card;
}`}
          />

          <p className="text-slate-400 text-sm">
            ✔ Factory functions make UI reusable  
            ✔ Similar to React functional components  
          </p>
        </section>

        {/* =====================================================
            SECTION 2 — UI Rendering Engine
        ===================================================== */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
            <svg width="26" height="26" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            2. Creating a Simple Render Engine
          </h2>

          <p className="text-slate-300">
            A render engine takes:
            <br />• Data  
            • A root element  
            • A component factory  
            <br />and regenerates UI based on the data.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function render(root, data, component) {
  root.innerHTML = ""; // clear old UI
  data.forEach(item => {
    const el = component(item);
    root.appendChild(el);
  });
}`}
          />
        </section>

        {/* =====================================================
            SECTION 3 — State + Render System in Action
        ===================================================== */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-teal-300 flex items-center gap-2">
            <svg width="26" height="26" fill="none">
              <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            3. Building a Central State
          </h2>

          <p className="text-slate-300">
            State is our single source of truth.  
            Changing state → triggers render → updates UI automatically.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const state = {
  products: [
    { id: 1, name: "Keyboard", price: 500 },
    { id: 2, name: "Mouse", price: 300 }
  ]
};`}
          />
        </section>

        {/* =====================================================
            SECTION 4 — Product Card Component
        ===================================================== */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
            <svg width="28" height="28" fill="none">
              <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            4. Product Card Component for Render Engine
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function ProductCard({ id, name, price }) {
  const card = document.createElement("div");
  card.className = "product-card";

  const title = document.createElement("h3");
  title.textContent = name;

  const p = document.createElement("p");
  p.textContent = "₹" + price;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "remove-btn";
  removeBtn.onclick = () => removeProduct(id);

  card.append(title, p, removeBtn);
  return card;
}`}
          />
        </section>

        {/* =====================================================
            SECTION 5 — Remove Product Logic
        ===================================================== */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-red-300 flex items-center gap-2">
            <svg width="26" height="26" fill="none">
              <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            5. Remove Item + Auto Re-render
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function removeProduct(id) {
  state.products = state.products.filter(p => p.id !== id);
  updateUI();
}

function updateUI() {
  render(document.getElementById("root"), state.products, ProductCard);
}

// Initial draw
updateUI();`}
          />

          <p className="text-slate-400">
            ✔ State changes automatically update UI  
            ✔ Similar thinking used in React state updates  
          </p>
        </section>

        {/* =====================================================
            SECTION 6 — Adding New Product Using State + Renderer
        ===================================================== */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-green-300 flex items-center gap-2">
            <svg width="26" height="26" fill="none">
              <path d="M12 4v16M4 12h16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            6. Adding Items (Consistent with the Render Cycle)
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function addProduct(name, price) {
  const newItem = {
    id: Date.now(),
    name,
    price
  };

  state.products.push(newItem);
  updateUI();
}

document.getElementById("addBtn").onclick = () => {
  const n = document.getElementById("nameInput").value.trim();
  const p = Number(document.getElementById("priceInput").value);

  if (!n || !p) return;

  addProduct(n, p);
};`}
          />

          <p className="text-slate-300">
            ✔ UI updates from a single source of truth  
            ✔ Display always stays in sync with data  
          </p>
        </section>

        {/* =====================================================
            SECTION 7 — Component Styling
        ===================================================== */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-pink-300 flex items-center gap-2">
            <svg width="26" height="26" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            7. CSS for Cards & Components
          </h2>

          <EditableCodeBlock
            language="css"
            initialCode={`.product-card {
  background: #0f172a;
  border: 1px solid #1e293b;
  padding: 14px;
  border-radius: 10px;
  margin-bottom: 12px;
  transition: 0.3s;
}

.product-card:hover {
  transform: translateY(-3px);
  border-color: #38bdf8;
}

.remove-btn {
  background: #dc2626;
  padding: 6px 10px;
  margin-top: 6px;
  border-radius: 6px;
  color: white;
}`} />
        </section>

        {/* =====================================================
            Conclusion
        ===================================================== */}
        <footer className="pt-8 border-t border-slate-800 text-slate-400 text-sm">
          <p>
            Fantastic Baba! 🎉  
            You have now built:
            <br />✔ A component factory  
            ✔ A render engine  
            ✔ Central state management  
            ✔ Reactive UI  
            <br />
            These concepts are exactly what React, Vue, Angular, and Svelte are built on.
          </p>
        </footer>
      </div>
    );
  }
}
