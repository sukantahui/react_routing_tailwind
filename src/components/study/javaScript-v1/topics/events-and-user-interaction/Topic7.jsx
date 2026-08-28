import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic7 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          Building a Custom Virtual Keyboard (Advanced)
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          A virtual keyboard allows users to type using on-screen buttons.  
          This is often used in touch devices, ATMs, learning apps, exam portals,  
          and UI testing taught at <strong>Coder & AccoTax, Barrackpore</strong>.  
          Here you will learn how students like <strong>Kaustav</strong> and <strong>Mounita</strong>  
          build their first virtual keyboard using JavaScript events.
        </p>

        {/* ---------------------------------------------------------
            1. BASIC LAYOUT OF THE VIRTUAL KEYBOARD
        ----------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-6">
          1. Basic Layout
        </h3>

        <p className="text-slate-300 text-sm">
          The virtual keyboard contains:
        </p>

        <ul className="list-disc ml-5 text-sm text-slate-300 space-y-1">
          <li>An input box (user types here)</li>
          <li>A container holding buttons for letters</li>
          <li>A backspace key</li>
          <li>A space key</li>
          <li>A clear/reset key</li>
        </ul>

        {/* HTML */}
        <CodeBlock
          language="html"
          code={`<input id="vkInput" placeholder="Type here..." />

<div id="keyboard">
  <button class="key">Q</button>
  <button class="key">W</button>
  <button class="key">E</button>
  <button class="key">R</button>
  <button class="key">T</button>
  <button class="key">Y</button>
  <!-- You will add more keys similarly -->

  <button class="key space">SPACE</button>
  <button class="key backspace">⌫</button>
  <button class="key clear">CLEAR</button>
</div>`}
        />

        {/* ---------------------------------------------------------
            2. ADDING CLICK EVENTS TO KEYS
        ----------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. Adding Events to Keys
        </h3>

        <p className="text-slate-300 text-sm">
          Clicking a key should insert its value into the input box.
        </p>

        <CodeBlock
          language="javascript"
          code={`const input = document.getElementById("vkInput");
const keys = document.querySelectorAll("#keyboard .key");

keys.forEach(key => {
  key.addEventListener("click", () => {
    const value = key.innerText;

    if (key.classList.contains("space")) {
      input.value += " ";
    } 
    else if (key.classList.contains("backspace")) {
      input.value = input.value.slice(0, -1);
    }
    else if (key.classList.contains("clear")) {
      input.value = "";
    }
    else {
      input.value += value;
    }
  });
});`}
        />

        <p className="text-slate-400 text-sm">
          This is the same logic students use in UI/UX workshops inside Coder & AccoTax labs.
        </p>

        {/* ---------------------------------------------------------
            3. OPTIONAL — KEY HIGHLIGHT EFFECT
        ----------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. Optional — Highlight Key on Press
        </h3>

        <p className="text-slate-300 text-sm">
          A small animation improves user experience.
        </p>

        <CodeBlock
          language="javascript"
          code={`keys.forEach(key => {
  key.addEventListener("click", () => {
    key.classList.add("active");

    setTimeout(() => {
      key.classList.remove("active");
    }, 150);
  });
});`}
        />

        <p className="text-slate-400 text-sm">
          In a real UI, you use CSS to show highlight or ripple effect.
        </p>

        {/* ---------------------------------------------------------
            4. OPTIONAL — FULL KEYBOARD ROWS (QWERTY)
        ----------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          4. Optional — Full QWERTY Layout
        </h3>

        <p className="text-slate-300 text-sm">
          You can generate keys dynamically using an array.
        </p>

        <CodeBlock
          language="javascript"
          code={`const keysRow1 = ["Q","W","E","R","T","Y","U","I","O","P"];
const keysRow2 = ["A","S","D","F","G","H","J","K","L"];
const keysRow3 = ["Z","X","C","V","B","N","M"];

function createKeyboard() {
  const container = document.getElementById("keyboard");
  [...keysRow1, ...keysRow2, ...keysRow3].forEach(letter => {
    const btn = document.createElement("button");
    btn.className = "key";
    btn.innerText = letter;
    container.appendChild(btn);
  });
}
createKeyboard();`}
        />

        <p className="text-slate-400 text-sm">
          This is how digital exam systems generate keyboard layouts.
        </p>

        {/* ---------------------------------------------------------
            5. REAL CLASSROOM EXAMPLE (CODER & ACCOTAX)
        ----------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-10">
          Real Classroom Example — Coder & AccoTax
        </h3>

        <p className="text-slate-300 text-sm leading-relaxed">
          During practice in JavaScript batches, students like <strong>Ritaja</strong>,  
          <strong>Swadeep</strong> and <strong>Susmita</strong> build virtual keyboards for:
        </p>

        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li>Touch-screen typing app</li>
          <li>Number pad for calculator</li>
          <li>Password input with hidden characters</li>
          <li>Typing games for beginners</li>
        </ul>

        <p className="text-slate-300 text-sm mt-2">
          This improves event handling skills and DOM manipulation confidence.
        </p>

        {/* ---------------------------------------------------------
            SUMMARY BOX
        ----------------------------------------------------------- */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li>Virtual keyboards work through click events</li>
            <li>Each key updates the input field manually</li>
            <li>Space, backspace and clear keys need custom logic</li>
            <li>UI components can be automated using arrays</li>
            <li>Great DOM + events practice for students</li>
          </ul>

          <p className="text-slate-400 text-xs mt-3">
            This topic helps in understanding complex UI event-driven systems taught at Coder & AccoTax.
          </p>
        </section>
      </div>
    );
  }
}
