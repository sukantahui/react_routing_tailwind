import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-10">

      {/* ============================================================
          SECTION 1 — INTRODUCTION
      ============================================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-sky-300">
          Nested <span className="text-sky-400">if</span> Statements
        </h2>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          A <strong>nested if statement</strong> is an <code className="text-sky-300">if</code> placed
          inside another <code className="text-sky-300">if</code>.  
          It allows you to perform **multi-level decision making**, where one decision depends on the outcome of another.
        </p>

        {/* Example 1 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`let score = 85;

if (score >= 60) {
  if (score >= 80) {
    console.log("Excellent");
  } else {
    console.log("Good");
  }
} else {
  console.log("Fail");
}`}
        />

        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          In the example above, the second decision (<code>score &gt= 80</code>) happens only if
          the first condition (<code>score &gt= 60</code>) is true.
        </p>
      </section>

      {/* ============================================================
          SECTION 2 — FLOW OF NESTED IF
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-300">How the Logic Flows</h3>

        <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm md:text-base leading-relaxed">
          <li>The outer <code>if</code> checks the main condition.</li>
          <li>If it is true, the program evaluates the inner <code>if</code>.</li>
          <li>If not, the inner block is skipped entirely.</li>
        </ul>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          This structure helps when decisions must follow a **specific sequence**.
        </p>
      </section>

      {/* ============================================================
          SECTION 3 — REAL WORLD EXAMPLE
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-sky-300">
          Real-World Example: Login + Role Check
        </h3>

        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          Nested <code>if</code> is commonly used when one verification depends on another—like checking login status before checking user roles.
        </p>

        {/* Example 2 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`let isLoggedIn = true;
let isAdmin = false;

if (isLoggedIn) {
  if (isAdmin) {
    console.log("Welcome, Admin!");
  } else {
    console.log("Welcome, User!");
  }
} else {
  console.log("Please log in.");
}`}
        />

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Here, the program checks:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-slate-400">
          <li><code>isLoggedIn</code> must be true before role checking happens.</li>
          <li>This prevents checking admin privileges for users who aren’t logged in.</li>
        </ul>
      </section>

      {/* ============================================================
          SECTION 4 — AVOIDING OVER-NESTING
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-rose-300">
          Over-Nesting Can Reduce Readability
        </h3>

        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          Too many nested blocks make code hard to read, debug, and maintain.
          A common improvement is to use <strong>guard clauses</strong> or
          <strong> else if</strong> instead of deep nesting.
        </p>

        {/* Improved version example */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`let score = 85;

if (score < 60) {
  console.log("Fail");
} else if (score < 80) {
  console.log("Good");
} else {
  console.log("Excellent");
}`}
        />

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Same logic — but much cleaner.  
          This approach is preferred when multiple conditions are unrelated to each other.
        </p>
      </section>

      {/* ============================================================
          SECTION 5 — BEST PRACTICES
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-emerald-400">Best Practices</h3>

        <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm md:text-base leading-relaxed">
          <li>Avoid deep nesting; it makes code difficult to understand.</li>
          <li>Prefer <strong>else if</strong> when conditions are independent.</li>
          <li>Use nested <code>if</code> only when one condition depends on another.</li>
          <li>Use meaningful variable names to improve readability.</li>
        </ul>
      </section>

      {/* ============================================================
          SECTION 6 — PRACTICE EXAMPLE
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-300">Try It Yourself</h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Write a nested <code>if</code> that checks:
        </p>

        <ul className="list-disc pl-5 text-slate-400 space-y-1">
          <li>If the user is logged in</li>
          <li>If their subscription is active</li>
          <li>If both true → show “Access granted”</li>
        </ul>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let loggedIn = true;
let subscriptionActive = true;

// Try writing the logic here 👇`}
        />
      </section>

    </div>
  );
}
