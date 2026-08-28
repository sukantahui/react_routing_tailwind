import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic6 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Keyboard Events — keydown, keyup & keypress
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Keyboard events allow us to respond when the user types on the keyboard.  
          These events are essential for search bars, forms, shortcuts, and input validation  
          taught at Coder & AccoTax, Barrackpore.
        </p>

        {/* -------------------------
            1. keydown Event
        --------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. keydown — Fires When a Key is Pressed Down
        </h3>

        <p className="text-slate-300 text-sm">
          This is triggered the moment the key is pushed.
        </p>

        <CodeBlock
          language="html"
          code={`<input id="nameInput" placeholder="Type your name..." />`}
        />

        <CodeBlock
          language="javascript"
          code={`document.getElementById("nameInput").addEventListener("keydown", (e) => {
  console.log("Key pressed:", e.key);
});`}
        />

        <p className="text-slate-400 text-sm">
          If Ritaja presses <strong>A</strong>, console shows:  
          <code>A</code>
        </p>


        {/* -------------------------
            2. keyup Event
        --------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. keyup — Fires When the Key is Released
        </h3>

        <CodeBlock
          language="javascript"
          code={`document.getElementById("nameInput").addEventListener("keyup", () => {
  console.log("Current value:", nameInput.value);
});`}
        />

        <p className="text-slate-400 text-sm">
          Often used in live search boxes.
        </p>


        {/* -------------------------
            3. keypress Event
        --------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. keypress — Deprecated But Still Seen
        </h3>

        <p className="text-slate-300 text-sm">
          <strong>keypress</strong> is now old and not recommended.  
          Use <strong>keydown</strong> or <strong>keyup</strong> instead.
        </p>

        <CodeBlock
          language="javascript"
          code={`document.addEventListener("keypress", (e) => {
  console.log("keypress:", e.key);
});`}
        />


        {/* -------------------------
            VALIDATION EXAMPLE
        --------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          4. Restrict Input — Alphabets Only (Common in Admission Forms)
        </h3>

        <p className="text-slate-300 text-sm">
          Useful when students like Pranjali or Susmita fill names incorrectly.
        </p>

        <CodeBlock
          language="javascript"
          code={`document.getElementById("nameInput").addEventListener("keydown", (e) => {
  const allowed = /^[A-Za-z ]+$/;

  if (!allowed.test(e.key) && e.key !== "Backspace") {
    e.preventDefault(); // block key
    alert("Only alphabets allowed!");
  }
});`}
        />


        {/* -------------------------
            LIVE SEARCH EXAMPLE
        --------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          5. Live Search using keyup (Instant Filtering)
        </h3>

        <p className="text-slate-300 text-sm">
          Example: Searching students in a class list.
        </p>

        {/* HTML */}
        <CodeBlock
          language="html"
          code={`<input id="search" placeholder="Search student..." />

<ul id="studentList">
  <li>Mounita</li>
  <li>Kaustav</li>
  <li>Swadeep</li>
  <li>Devangshu</li>
</ul>`}
        />

        {/* JS */}
        <CodeBlock
          language="javascript"
          code={`const search = document.getElementById("search");
const list = document.querySelectorAll("#studentList li");

search.addEventListener("keyup", () => {
  const text = search.value.toLowerCase();

  list.forEach(item => {
    item.style.display = item.innerText.toLowerCase().includes(text)
      ? "block"
      : "none";
  });
});`}
        />


        {/* -------------------------
            KEYBOARD SHORTCUTS
        --------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          6. Keyboard Shortcuts (Ctrl + S, Ctrl + P)
        </h3>

        <p className="text-slate-300 text-sm">
          Helpful for in-class practice, e.g., prevent Ctrl+S from saving.
        </p>

        <CodeBlock
          language="javascript"
          code={`document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    alert("Ctrl + S is disabled (Coder & AccoTax Style)");
  }
});`}
        />


        {/* -------------------------
            ARROW KEYS EXAMPLE
        --------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          7. Detect Arrow Keys
        </h3>

        <CodeBlock
          language="javascript"
          code={`document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") console.log("Up arrow pressed");
  if (e.key === "ArrowDown") console.log("Down arrow pressed");
});`}
        />

        <p className="text-slate-400 text-sm">
          Useful for sliders, games, carousels, animations.
        </p>


        {/* -------------------------
            SUMMARY
        --------------------------- */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><strong>keydown</strong> → on key press</li>
            <li><strong>keyup</strong> → on key release</li>
            <li><strong>keypress</strong> → old & deprecated</li>
            <li>Useful for validation, live search, shortcuts</li>
            <li>Essential for interactive UI components</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            These techniques are used in live JavaScript batches at Coder & AccoTax, Barrackpore.
          </p>
        </section>
      </div>
    );
  }
}
