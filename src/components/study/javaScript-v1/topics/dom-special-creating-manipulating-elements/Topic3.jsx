import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-12 text-slate-200 leading-relaxed">

        {/* =====================================================
            HEADER
        ===================================================== */}
        <header className="space-y-3">
          <h1 className="text-2xl font-bold text-sky-300 flex items-center gap-3">

            {/* SVG DECORATION */}
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" />
            </svg>

            Creating Dynamic UI Components Using the DOM
          </h1>

          <p className="text-slate-400 text-sm md:text-base">
            In this chapter, we go beyond editing single elements —  
            we learn how to **build UI components dynamically**,  
            create **reusable DOM utilities**, and render **multiple elements using loops**.  
            This is exactly how frameworks like React, Vue, and Svelte work internally.
          </p>
        </header>

        {/* =====================================================
            SECTION 1 — Creating UI Cards Dynamically
        ===================================================== */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-purple-300 flex items-center gap-2">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            1. Creating a UI Card Dynamically
          </h2>

          <p className="text-slate-300">
            Let’s build a dynamic **profile card component** using only JavaScript and DOM APIs.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function createProfileCard(name, role, imageURL) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = imageURL;
  img.className = "avatar";

  const title = document.createElement("h3");
  title.textContent = name;

  const subtitle = document.createElement("p");
  subtitle.textContent = role;

  card.append(img, title, subtitle);
  document.body.appendChild(card);
}

createProfileCard("Ritaja Ghosh", "Student", "ritaja.png");
createProfileCard("Mounita Bhandari", "Developer", "mounita.png");`}
          />
        </section>

        {/* =====================================================
            SECTION 2 — Notification Component
        ===================================================== */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M3 3h18v14H3z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M3 17h18v4H3z" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            2. Creating a Notification Popup Component
          </h2>

          <p className="text-slate-300">
            Notifications are used everywhere — let’s build a reusable and animated one.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function showNotification(message, type = "info") {
  const box = document.createElement("div");
  box.className = "notify " + type;
  box.textContent = message;

  document.body.appendChild(box);

  // Auto remove after animation
  setTimeout(() => box.remove(), 2500);
}

showNotification("Welcome back, Sukanta!", "success");
showNotification("Your file has been uploaded.", "info");
showNotification("Error: Unable to process request!", "error");`}
          />

          <p className="text-yellow-300 text-sm">
            ✔ Add CSS for smooth fade-in and fade-out animations  
          </p>
        </section>

        {/* =====================================================
            SECTION 3 — Dynamic Alert Box With Buttons
        ===================================================== */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-red-300 flex items-center gap-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 7v5M12 16h.01" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            3. Building an Interactive Alert / Confirmation Box
          </h2>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function showAlert(message, onConfirm) {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  const box = document.createElement("div");
  box.className = "alert-box";

  const msg = document.createElement("p");
  msg.textContent = message;

  const yesBtn = document.createElement("button");
  yesBtn.textContent = "Yes";
  yesBtn.onclick = () => {
    onConfirm();
    overlay.remove();
  };

  const noBtn = document.createElement("button");
  noBtn.textContent = "Cancel";
  noBtn.onclick = () => overlay.remove();

  box.append(msg, yesBtn, noBtn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

showAlert("Do you want to delete this file?", () => {
  console.log("File deleted!");
});`}
          />

          <p className="text-slate-300">
            This pattern is the foundation of custom modals and React popup components.
          </p>
        </section>

        {/* =====================================================
            SECTION 4 — Reusable DOM Utility Functions
        ===================================================== */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-sky-300 flex items-center gap-2">
            <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
              <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            4. Creating Reusable DOM Helper Functions
          </h2>

          <p className="text-slate-300">
            Reusable functions improve code cleanliness and reduce repetition.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`// Creates an element with optional classes & text
function el(tag, className = "", text = "") {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text) e.textContent = text;
  return e;
}

// Example usage:
const box = el("div", "card", "Hello Coder & AccoTax!");
document.body.appendChild(box);`}
          />
        </section>

        {/* =====================================================
            SECTION 5 — Rendering Lists (Loops + DOM)
        ===================================================== */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-pink-300 flex items-center gap-2">
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M8 6h13M8 12h13M8 18h13" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="4" cy="6" r="1.5" fill="currentColor"/>
              <circle cx="4" cy="12" r="1.5" fill="currentColor"/>
              <circle cx="4" cy="18" r="1.5" fill="currentColor"/>
            </svg>
            5. Handling Multiple Elements — Rendering a List
          </h2>

          <p className="text-slate-300">
            This is how you render arrays of data into UI — the core of frontend frameworks.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const students = [
  { name: "Ritaja", score: 92 },
  { name: "Swadeep", score: 88 },
  { name: "Pranjali", score: 95 }
];

const list = document.createElement("ul");
list.className = "student-list";

students.forEach((s) => {
  const item = document.createElement("li");
  item.textContent = \`\${s.name}: \${s.score}\`;
  list.appendChild(item);
});

document.body.appendChild(list);`}
          />
        </section>

        {/* =====================================================
            SECTION 6 — Mini Project
        ===================================================== */}
        <section className="space-y-5">
          <h2 className="text-xl font-bold text-yellow-300">
            ⭐ Mini Project: Dynamic Badge Generator
          </h2>

          <p className="text-slate-300">
            Build a feature where the user types text and the badge updates live.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const input = document.getElementById("badgeInput");
const badge = document.getElementById("badge");

input.addEventListener("input", () => {
  badge.textContent = input.value;
  badge.classList.add("pulse");
  setTimeout(() => badge.classList.remove("pulse"), 500);
});`}
          />
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}
        <footer className="pt-6 border-t border-slate-800 text-slate-400 text-sm">
          <p>
            In the next chapter, we build
            <span className="text-sky-300"> a complete mini-application </span>
            using dynamic components, events, and DOM utilities.
          </p>
        </footer>

      </div>
    );
  }
}
