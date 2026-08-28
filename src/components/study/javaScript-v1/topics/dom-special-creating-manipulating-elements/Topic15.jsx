// src/components/study/javaScript/topics/dom-special-creating-manipulating-elements/Topic15.jsx

import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";
import CodePenPlayground from "../../../../../common/CodePenPlayground";

export default class Topic15 extends Component {
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
              <rect
                x="14"
                y="14"
                width="20"
                height="14"
                rx="3"
                fill="#0f172a"
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
              <rect
                x="20"
                y="30"
                width="10"
                height="4"
                rx="2"
                fill="#38bdf8"
              />
            </svg>
            Bounding &amp; Positioning –{" "}
            <span className="text-emerald-300">
              getBoundingClientRect() &amp; Layout Measurement
            </span>
          </h1>

          <p className="text-slate-400 text-sm md:text-base max-w-3xl">
            In this ultra–expert topic, you’ll learn how to <b>measure elements</b>{" "}
            on the page using <code>getBoundingClientRect()</code>, understand{" "}
            <b>viewport coordinates</b>, and build reusable utilities to place
            tooltips, dropdowns, modals, and floating elements <b>pixel-perfect</b>.
            This is the foundation of engines like Popper.js, Material UI overlays,
            and advanced tutorial / onboarding systems.
          </p>
        </header>

        {/* ============================================================
            SECTION 1 — Visual Model: Viewport & Element Box
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-sky-300">
            1. Visual Model – Where is My Element on the Screen?
          </h2>

          <p className="text-slate-400 max-w-3xl text-sm md:text-base">
            The browser draws your page inside a <b>viewport</b>. Each element has:
          </p>

          <ul className="list-disc pl-6 text-sm text-slate-300 space-y-1">
            <li>
              A <b>position</b> (top, left) relative to the viewport.
            </li>
            <li>
              A <b>size</b> (width, height).
            </li>
            <li>
              A <b>bounding box</b> (rectangle) used for hit-testing &amp; layout.
            </li>
          </ul>

          {/* SVG: viewport + element + rect */}
          <div className="flex justify-center">
            <svg width="360" height="210" viewBox="0 0 360 210">
              {/* viewport */}
              <rect
                x="20"
                y="20"
                width="320"
                height="170"
                rx="12"
                fill="#020617"
                stroke="#1f2937"
              />
              <text
                x="30"
                y="38"
                fill="#64748b"
                fontSize="11"
              >
                viewport (browser visible area)
              </text>

              {/* element */}
              <rect
                x="110"
                y="80"
                width="130"
                height="70"
                rx="8"
                fill="#0f172a"
                stroke="#38bdf8"
              />
              <text
                x="130"
                y="105"
                fill="#e5e7eb"
                fontSize="12"
              >
                .card
              </text>
              <text
                x="130"
                y="122"
                fill="#22c55e"
                fontSize="10"
              >
                width, height
              </text>

              {/* top arrow */}
              <line
                x1="110"
                y1="80"
                x2="110"
                y2="50"
                stroke="#38bdf8"
                strokeWidth="1.5"
                markerEnd="url(#arrowHead15)"
              />
              <text
                x="82"
                y="60"
                fill="#38bdf8"
                fontSize="10"
              >
                top
              </text>

              {/* left arrow */}
              <line
                x1="110"
                y1="80"
                x2="70"
                y2="80"
                stroke="#38bdf8"
                strokeWidth="1.5"
                markerEnd="url(#arrowHead15)"
              />
              <text
                x="60"
                y="92"
                fill="#38bdf8"
                fontSize="10"
              >
                left
              </text>

              {/* center point */}
              <circle
                cx="175"
                cy="115"
                r="4"
                fill="#f97316"
              />
              <text
                x="185"
                y="118"
                fill="#f97316"
                fontSize="10"
              >
                center
              </text>

              <defs>
                <marker
                  id="arrowHead15"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0 0 L6 3 L0 6 Z" fill="#38bdf8" />
                </marker>
              </defs>
            </svg>
          </div>

          <p className="text-slate-400 text-xs md:text-sm max-w-2xl">
            To access this rectangle in JavaScript, you use{" "}
            <code>element.getBoundingClientRect()</code>.
          </p>
        </section>

        {/* ============================================================
            SECTION 2 — getBoundingClientRect(): Syntax & Return Type
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-emerald-300">
            2. getBoundingClientRect() — Syntax, Return Object &amp; Properties
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-3xl">
            <code>getBoundingClientRect()</code> returns a <b>DOMRect</b> object
            describing the element&apos;s size and position relative to the{" "}
            <b>viewport</b> (not the whole document).
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`// Syntax:
const rect = element.getBoundingClientRect();

// Return Type:
  // DOMRect object with the following useful properties:
  // rect.top      → distance from viewport's top (px)
  // rect.left     → distance from viewport's left (px)
  // rect.right    → distance from viewport's left + width (px)
  // rect.bottom   → distance from viewport's top + height (px)
  // rect.width    → element's CSS pixel width
  // rect.height   → element's CSS pixel height
  // rect.x, rect.y → aliases for left and top in modern browsers`}
          />

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
              <h3 className="font-semibold text-sky-300 mb-2">
                ✅ What the values mean
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li>
                  <code>top</code> / <code>left</code> – position in the current
                  scroll viewport.
                </li>
                <li>
                  <code>bottom</code> / <code>right</code> – useful for placing
                  elements <b>below</b> or <b>beside</b> another element.
                </li>
                <li>
                  <code>width</code> / <code>height</code> – layout dimensions in
                  CSS pixels.
                </li>
              </ul>
            </div>
            <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4">
              <h3 className="font-semibold text-rose-300 mb-2">
                ⚠️ Common confusion
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-slate-300">
                <li>
                  Values are <b>relative to viewport</b>, not to the entire
                  document.
                </li>
                <li>
                  If you scroll, <code>top</code> changes even if the element is
                  visually &quot;in the same place&quot;.
                </li>
                <li>
                  For absolute coordinates in the document, you must combine{" "}
                  <code>rect</code> with <code>window.scrollX</code> /
                  <code>scrollY</code>.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3 — Example: Inspecting an Element's Box
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-sky-300">
            3. Example – Inspecting a Card&apos;s Bounding Box
          </h2>

          <p className="text-slate-300 text-sm md:text-base">
            First, let&apos;s just log the bounding box properties of a simple
            card and highlight it visually.
          </p>

          <CodePenPlayground
            initialHTML={`<div class="card" id="myCard">
  <h3>Coder &amp; AccoTax</h3>
  <p>DOM Measurement Demo (getBoundingClientRect)</p>
  <button id="measureBtn">Measure Card</button>
</div>

<pre id="output"></pre>`}
            initialCSS={`body {
  font-family: system-ui, sans-serif;
  background: #020617;
  color: #e5e7eb;
  padding: 20px;
}

.card {
  width: 260px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #38bdf8;
  background: radial-gradient(circle at top, #0f172a, #020617);
  box-shadow: 0 10px 25px rgba(15,23,42,0.8);
  margin-bottom: 16px;
}

.card.highlight {
  outline: 2px dashed #fbbf24;
  outline-offset: 4px;
}

#measureBtn {
  margin-top: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  border: none;
  background: #38bdf8;
  color: #020617;
  font-weight: 600;
  cursor: pointer;
}

#measureBtn:hover {
  background: #22c55e;
}

#output {
  background: #020617;
  border-radius: 8px;
  border: 1px solid #1f2937;
  padding: 10px;
  font-size: 12px;
  white-space: pre-wrap;
}`}
            initialJS={`const card = document.getElementById("myCard");
const btn = document.getElementById("measureBtn");
const output = document.getElementById("output");

btn.addEventListener("click", () => {
  const rect = card.getBoundingClientRect();

  card.classList.add("highlight");
  setTimeout(() => card.classList.remove("highlight"), 800);

  output.textContent = [
    "top:    " + rect.top.toFixed(1),
    "left:   " + rect.left.toFixed(1),
    "width:  " + rect.width.toFixed(1),
    "height: " + rect.height.toFixed(1),
    "bottom: " + rect.bottom.toFixed(1),
    "right:  " + rect.right.toFixed(1)
  ].join("\\n");
});`}
          />

          <p className="text-xs text-slate-400 max-w-2xl">
            Try resizing the browser or scrolling (if there is scroll). You will see
            how the values shift, especially <code>top</code> and{" "}
            <code>left</code>.
          </p>
        </section>

        {/* ============================================================
            SECTION 4 — Tooltip & Dropdown Positioning
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-emerald-300">
            4. Real Use Case – Position a Tooltip Under a Button
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-3xl">
            A classic use case: show a tooltip or dropdown <b>exactly below</b> a
            button, aligned by <code>left</code> or <code>center</code>.
          </p>

          <CodePenPlayground
            initialHTML={`<button id="infoBtn" class="btn">
  ℹ️ Hover me
</button>

<div id="tooltip" class="tooltip" hidden>
  Hello Baba! I'm a smart tooltip.
</div>`}
            initialCSS={`body {
  font-family: system-ui, sans-serif;
  background: #020617;
  color: #e5e7eb;
  padding: 40px;
}

.btn {
  padding: 8px 14px;
  border-radius: 999px;
  border: 1px solid #38bdf8;
  background: #0f172a;
  color: #e5e7eb;
  cursor: pointer;
}

.tooltip {
  position: fixed;
  padding: 8px 12px;
  background: #020617;
  border-radius: 8px;
  border: 1px solid #38bdf8;
  box-shadow: 0 10px 30px rgba(15,23,42,0.8);
  font-size: 13px;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.15s ease, transform 0.15s ease;
  pointer-events: none;
}

.tooltip--visible {
  opacity: 1;
  transform: translateY(0);
}`}
            initialJS={`const btn = document.getElementById("infoBtn");
const tooltip = document.getElementById("tooltip");

btn.addEventListener("mouseenter", () => {
  const rect = btn.getBoundingClientRect();

  // Place tooltip below the button, aligned center
  const tooltipWidth = 200; // assume ~200px, or measure if needed
  const centerX = rect.left + rect.width / 2;

  tooltip.style.top = rect.bottom + 8 + "px";
  tooltip.style.left = centerX - tooltipWidth / 2 + "px";
  tooltip.style.width = tooltipWidth + "px";
  tooltip.hidden = false;

  requestAnimationFrame(() => {
    tooltip.classList.add("tooltip--visible");
  });
});

btn.addEventListener("mouseleave", () => {
  tooltip.classList.remove("tooltip--visible");
  setTimeout(() => (tooltip.hidden = true), 160);
});`}
          />

          <p className="text-xs text-slate-400 max-w-2xl">
            We used <code>rect.bottom</code> to place the tooltip just below the
            button and <code>rect.left + rect.width / 2</code> to align it with the
            center. This pattern is used in dropdown menus, popovers, and teaching
            overlays.
          </p>
        </section>

        {/* ============================================================
            SECTION 5 — Viewport vs Document Coordinates
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-sky-300">
            5. Viewport vs Document — Combining with scrollX / scrollY
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-3xl">
            Sometimes you need coordinates relative to the <b>whole page</b>{" "}
            (document), not the visible viewport. In that case:
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`const rect = element.getBoundingClientRect();

// viewport-relative
const viewportTop = rect.top;
const viewportLeft = rect.left;

// document-relative (absolute)
const absoluteTop = rect.top + window.scrollY;
const absoluteLeft = rect.left + window.scrollX;

console.log({ viewportTop, viewportLeft, absoluteTop, absoluteLeft });`}
          />

          <div className="bg-slate-900/70 border border-slate-700 rounded-xl p-4 text-sm space-y-2">
            <h3 className="font-semibold text-amber-300">
              When do we need document-relative coordinates?
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>Saving the position in a database for later restore.</li>
              <li>Drawing an overlay on a canvas positioned over the document.</li>
              <li>
                Syncing with other systems that use <b>scroll-independent</b>{" "}
                coordinates.
              </li>
            </ul>
          </div>
        </section>

        {/* ============================================================
            SECTION 6 — Utility: measureElement() Helper
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-emerald-300">
            6. Building a Reusable measureElement() Utility
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-3xl">
            Let&apos;s wrap <code>getBoundingClientRect()</code> into a small{" "}
            <b>helper function</b> that returns friendly values including{" "}
            <code>centerX</code> and <code>centerY</code>.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`/**
 * Measure an element's box in viewport and document coordinates.
 * @param {Element} el - DOM element to measure
 * @returns {{
 *   top: number, left: number, right: number, bottom: number,
 *   width: number, height: number,
 *   centerX: number, centerY: number,
 *   absTop: number, absLeft: number
 * }}
 */
function measureElement(el) {
  const rect = el.getBoundingClientRect();

  const top = rect.top;
  const left = rect.left;
  const width = rect.width;
  const height = rect.height;

  const centerX = left + width / 2;
  const centerY = top + height / 2;

  const absTop = top + window.scrollY;
  const absLeft = left + window.scrollX;

  return {
    top,
    left,
    right: rect.right,
    bottom: rect.bottom,
    width,
    height,
    centerX,
    centerY,
    absTop,
    absLeft,
  };
}

// Usage:
const box = document.querySelector(".box");
const info = measureElement(box);
console.log(info.centerX, info.centerY);`}
          />

          <p className="text-xs text-slate-400 max-w-2xl">
            This kind of utility is reused everywhere: tooltips, context menus,
            drag-and-drop indicators, custom cursor effects, and more.
          </p>
        </section>

        {/* ============================================================
            SECTION 7 — Scroll to Center an Element
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-sky-300">
            7. Example – Smooth Scroll to Center an Element on Screen
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-3xl">
            Many tutorials and dashboards scroll to bring a particular card or
            error field into the center of the screen. Let&apos;s build that with
            our measurement helper.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function scrollElementToCenter(el) {
  const rect = el.getBoundingClientRect();
  const elementCenter = rect.top + rect.height / 2;
  const viewportCenter = window.innerHeight / 2;

  const scrollOffset = elementCenter - viewportCenter;

  window.scrollBy({
    top: scrollOffset,
    left: 0,
    behavior: "smooth",
  });
}

// Usage:
const target = document.querySelector("#highlightMe");
scrollElementToCenter(target);`}
          />

          <p className="text-xs text-slate-400 max-w-2xl">
            This UX pattern is used in form validation (scrolling to the first
            error field) and guided walkthroughs.
          </p>
        </section>

        {/* ============================================================
            SECTION 8 — Collision-Safe Tooltip Positioning (Edges)
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-emerald-300">
            8. Avoiding Screen Overflow – Basic Collision Handling
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-3xl">
            What if the tooltip goes outside the screen? We can clamp the{" "}
            <code>left</code> position so it always stays inside the viewport.
          </p>

          <EditableCodeBlock
            language="javascript"
            initialCode={`function positionTooltipBelow(target, tooltip, padding = 8) {
  const rect = target.getBoundingClientRect();
  const viewportWidth = window.innerWidth;

  const tooltipWidth = tooltip.offsetWidth || 220;
  let left = rect.left + rect.width / 2 - tooltipWidth / 2;

  // Clamp within viewport
  const minLeft = padding;
  const maxLeft = viewportWidth - tooltipWidth - padding;

  left = Math.max(minLeft, Math.min(left, maxLeft));

  tooltip.style.position = "fixed";
  tooltip.style.top = rect.bottom + padding + "px";
  tooltip.style.left = left + "px";
}

// Usage:
// positionTooltipBelow(button, tooltipElement);`}
          />

          <p className="text-xs text-slate-400 max-w-2xl">
            In professional UI libraries, this logic becomes a full &quot;popper
            engine&quot;, with many strategies: top, bottom, left, right, flip,
            etc. Here you see the basic building block.
          </p>
        </section>

        {/* ============================================================
            SECTION 9 — Mini Project – Highlight Overlay Around Element
        ============================================================ */}
        <section className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-pink-300">
            9. Mini Project – Guided Highlight Overlay (Tutorial Step)
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-3xl">
            Let&apos;s create a <b>floating rectangle</b> that highlights any
            element we choose – like the first step of a product tour.
          </p>

          <CodePenPlayground
            initialHTML={`<div class="toolbar">
  <button class="tool" data-target="#box1">Highlight Box 1</button>
  <button class="tool" data-target="#box2">Highlight Box 2</button>
  <button class="tool" data-target="#box3">Highlight Box 3</button>
</div>

<div class="grid">
  <div class="box" id="box1">Box 1</div>
  <div class="box" id="box2">Box 2</div>
  <div class="box" id="box3">Box 3</div>
</div>

<div id="overlay" class="overlay"></div>`}
            initialCSS={`body {
  font-family: system-ui, sans-serif;
  background: #020617;
  color: #e5e7eb;
  padding: 24px;
}

.toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tool {
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #38bdf8;
  background: #0f172a;
  color: #e5e7eb;
  cursor: pointer;
  font-size: 12px;
}

.grid {
  display: flex;
  gap: 16px;
}

.box {
  flex: 1;
  height: 80px;
  border-radius: 12px;
  border: 1px solid #1f2937;
  background: radial-gradient(circle at top, #0f172a, #020617);
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: fixed;
  border-radius: 12px;
  border: 2px solid #fbbf24;
  box-shadow: 0 0 0 9999px rgba(0,0,0,0.6);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease, transform 0.15s ease;
  transform: scale(0.98);
}

.overlay--visible {
  opacity: 1;
  transform: scale(1);
}`}
            initialJS={`const overlay = document.getElementById("overlay");
const tools = document.querySelectorAll(".tool");

function highlight(selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  const rect = target.getBoundingClientRect();

  overlay.style.top = rect.top + "px";
  overlay.style.left = rect.left + "px";
  overlay.style.width = rect.width + "px";
  overlay.style.height = rect.height + "px";

  overlay.classList.add("overlay--visible");
}

tools.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetSelector = btn.dataset.target;
    highlight(targetSelector);
  });
});

// Hide highlight on ESC key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    overlay.classList.remove("overlay--visible");
  }
});`}
          />

          <p className="text-xs text-slate-400 max-w-2xl">
            You just built a basic &quot;focus ring&quot; overlay. Product tours,
            spotlight effects, and training overlays are combinations of this
            technique plus step-by-step messaging.
          </p>
        </section>

        {/* ============================================================
            FOOTER SUMMARY
        ============================================================ */}
        <footer className="pt-6 border-t border-slate-800 text-slate-400 text-xs md:text-sm">
          <p className="mb-2">
            In <b>Topic15</b>, you mastered <code>getBoundingClientRect()</code>,
            viewport vs document coordinates, utility-based measurement, tooltip
            positioning, collision avoidance, smooth centering, and highlight
            overlays.
          </p>
          <p>
            These skills are exactly what advanced frontend libraries use under the
            hood. With this, your students move from &quot;beginner JS&quot; to{" "}
            <b>DOM engineer</b> level.
          </p>
        </footer>
      </div>
    );
  }
}
