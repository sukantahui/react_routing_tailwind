import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-10">

      {/* ============================================================
          SECTION 1 — IF / ELSE BASICS
      ============================================================ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-sky-300">
          Understanding <span className="text-sky-400">if / else</span> Statements
        </h2>

        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          An <code className="text-sky-300">if</code> statement allows your program to perform
          different actions based on a condition. A condition must always evaluate to a
          boolean (<span className="text-emerald-400 font-semibold">true</span> or 
          <span className="text-rose-400 font-semibold"> false</span>).
        </p>

        {/* Example 1 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`let age = 18;

if (age >= 18) {
  console.log("You are an adult");
} else {
  console.log("You are a minor");
}`}
        />

        <div className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed">
          <p>How this works:</p>

          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>The condition <code className="text-sky-300">age &gt= 18</code> is checked.</li>
            <li>If it's <strong className="text-emerald-400">true</strong>, the first block runs.</li>
            <li>If it's <strong className="text-rose-400">false</strong>, the <code>else</code> block runs.</li>
          </ul>

          <p>
            This structure is helpful when your logic needs **two possible outcomes**.
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 2 — ELSE IF FOR MULTIPLE CONDITIONS
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-sky-300">
          Using <code>else if</code> for Multiple Conditions
        </h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          When a decision requires **more than two possibilities**, use the 
          <code className="text-sky-300"> else if </code> chain.
        </p>

        {/* Example 2 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 75) {
  console.log("Grade: B");
} else if (score >= 60) {
  console.log("Grade: C");
} else {
  console.log("Grade: D");
}`}
        />

        <div className="text-slate-300 space-y-3 leading-relaxed text-sm md:text-base">
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>Conditions are checked from **top to bottom**.</li>
            <li>Only the **first true condition** executes.</li>
            <li>The rest of the conditions are automatically ignored.</li>
          </ul>

          <p>
            Use <code className="text-sky-300">else if</code> when your logic has 
            **three or more decision levels**.
          </p>
        </div>
      </section>

      {/* ============================================================
          SECTION 3 — REAL-WORLD EXAMPLE
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-sky-300">Real-World Example</h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          This example checks whether a user can access a website feature.
        </p>

        {/* Example 3 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`let isLoggedIn = true;
let isAdmin = false;

if (!isLoggedIn) {
  console.log("You must log in first.");
} else if (isAdmin) {
  console.log("Welcome, Admin! You have full access.");
} else {
  console.log("Welcome! You have limited access.");
}`}
        />

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Notice how the logic flows from the **most restrictive** condition to 
          the **most permissive**.
        </p>
      </section>

      {/* ============================================================
          SECTION 4 — TERNARY OPERATOR (SHORTCUT)
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-sky-300">
          Shorthand: The Ternary Operator
        </h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          For simple decisions, you can shorten 
          <code className="text-sky-300"> if / else </code> using the **ternary operator**:
        </p>

        {/* Example 4 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`let age = 20;

let message = age >= 18 
  ? "Adult"
  : "Minor";

console.log(message);`}
        />

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Use this only when the logic is short and readable.
        </p>
      </section>

      {/* ============================================================
          SECTION 5 — COMMON MISTAKES
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-rose-300">Common Mistakes</h3>

        <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm md:text-base leading-relaxed">
          <li>
            Using <code>=</code> instead of <code>==</code> or <code>===</code>  
            (assignment vs comparison).
          </li>
          <li>
            Forgetting that <code>true</code> and <code>false</code> come from 
            *expressions*, not from text like "yes" or "no".
          </li>
          <li>
            Writing too many nested <code>if</code> blocks instead of using
            <code> else if</code>.
          </li>
        </ul>
      </section>

      {/* ============================================================
          SECTION 6 — BEST PRACTICES
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-emerald-400">Best Practices</h3>

        <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm md:text-base leading-relaxed">
          <li>Keep conditions simple and readable.</li>
          <li>Prefer <code>===</code> for strict comparison.</li>
          <li>Avoid deep nesting — use early returns if needed.</li>
          <li>Ternary operator is good for small checks only.</li>
        </ul>
      </section>

    </div>
  );
}
