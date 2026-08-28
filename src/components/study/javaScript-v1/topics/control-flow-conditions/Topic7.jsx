import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic7() {
  return (
    <div className="space-y-10">

      {/* ============================================================
          SECTION 1 — INTRODUCTION
      ============================================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-sky-300">
          Short-Circuit Evaluation in JavaScript
        </h2>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          Short-circuiting is the behavior where JavaScript stops evaluating an
          expression as soon as the result is determined.  
        </p>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          This happens with logical operators:  
          <code className="text-emerald-400"> && (AND)</code>,  
          <code className="text-sky-400"> || (OR)</code>, and  
          <code className="text-indigo-400"> ?? (Nullish Coalescing)</code>.
        </p>
      </section>

      {/* ============================================================
          SECTION 2 — && (AND)
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-emerald-400">
          1. AND (<code>&amp;&amp;</code>) Operator
        </h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          The <code>&amp;&amp;</code> operator stops early if the first value is
          <strong className="text-rose-400"> falsy</strong>.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`console.log(false && "Hello");   // false
console.log(0 && "Hello");       // 0
console.log(true && "Hello");    // "Hello"`}
        />

        <p className="text-slate-400">
          If the first operand is falsy → JS returns it immediately.
        </p>
      </section>

      {/* ============================================================
          SECTION 3 — || (OR)
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-400">
          2. OR (<code>||</code>) Operator
        </h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          The <code>||</code> operator returns the first
          <strong className="text-emerald-400"> truthy</strong> value.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`console.log("" || "Default");   // "Default"
console.log(0 || 10);          // 10
console.log("Hi" || "Hello");  // "Hi"`}
        />

        <p className="text-slate-400">
          OR is often used for fallback/default values.
        </p>
      </section>

      {/* ============================================================
          SECTION 4 — Nullish Coalescing Operator ??
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-indigo-400">
          3. Nullish Coalescing (<code>??</code>)
        </h3>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          <code>??</code> returns the right-hand value only when the left-hand side is
          <strong className="text-rose-400"> null</strong> or
          <strong className="text-rose-400"> undefined</strong>.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`console.log(null ?? "Default");     // "Default"
console.log(undefined ?? "Default"); // "Default"
console.log(0 ?? "Default");         // 0 (NOT replaced)
console.log("" ?? "Default");        // "" (NOT replaced)`}
        />

        <p className="text-slate-400">
          Use this when you want defaults ONLY for missing values, not falsy values.
        </p>
      </section>

      {/* ============================================================
          SECTION 5 — REAL-WORLD USE CASES
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-sky-300">
          Real-World Examples
        </h3>

        {/* Example 1 */}
        <h4 className="text-lg text-slate-200 font-semibold">🔹 1. Safe Function Calls</h4>
        <EditableCodeBlock
          language="javascript"
          initialCode={`let user = { name: "Amit" };

console.log(user && user.name);   // "Amit"`}
        />

        {/* Example 2 */}
        <h4 className="text-lg text-slate-200 font-semibold">🔹 2. Setting Default Values</h4>
        <EditableCodeBlock
          language="javascript"
          initialCode={`let input = "";

let value = input || "Default Text";
console.log(value);`}
        />

        {/* Example 3 */}
        <h4 className="text-lg text-slate-200 font-semibold">🔹 3. Using ?? for Safer Defaults</h4>
        <EditableCodeBlock
          language="javascript"
          initialCode={`let count = 0;

console.log(count || 10);  // 10 (bad: 0 is treated as falsy)
console.log(count ?? 10);  // 0 (correct)`}
        />

      </section>

      {/* ============================================================
          SECTION 6 — COMMON PITFALLS
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-rose-300">
          Common Mistakes
        </h3>

        <ul className="list-disc pl-5 text-slate-400 space-y-2 text-sm md:text-base leading-relaxed">
          <li>
            Using <code>||</code> instead of <code>??</code> when <code>0</code> or <code>""</code> are valid values.
          </li>
          <li>
            Assuming <code>&amp;&amp;</code> always returns a boolean — it returns the actual value.
          </li>
          <li>
            Forgetting that JS stops evaluating as soon as the result is known.
          </li>
        </ul>
      </section>

      {/* ============================================================
          SECTION 7 — PRACTICE
      ============================================================ */}
      <section className="space-y-4 pb-6">
        <h3 className="text-xl font-semibold text-emerald-400">Try It Yourself</h3>

        <p className="text-slate-300 text-sm md:text-base">
          Fill in the missing logic using <code>&amp;&amp;</code>, <code>||</code>, or <code>??</code>.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let username = "";
let displayName;

// Use short-circuiting so that:
// If username exists → use it
// Otherwise → use "Guest"

displayName = /* Write code here */

console.log(displayName);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`let value = null;

// Replace null only, NOT false or 0

let finalValue = /* Write code here */

console.log(finalValue);`}
        />

        <EditableCodeBlock
          language="javascript"
          initialCode={`let isLoggedIn = true;

// Print "Welcome" ONLY if logged in
// Otherwise print nothing

isLoggedIn /* Write code using && */ console.log("Welcome");`}
        />
      </section>

    </div>
  );
}
