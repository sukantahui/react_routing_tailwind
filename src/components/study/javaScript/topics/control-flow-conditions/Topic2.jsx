import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-10">

      {/* ============================================================
          SECTION 1 — INTRODUCTION
      ============================================================ */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-sky-300">
          The <span className="text-sky-400">Ternary Operator</span>
        </h2>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          The <strong>ternary operator</strong> is a short, compact alternative to 
          <code className="text-sky-300"> if / else </code>.  
          It evaluates a condition and returns one of two values depending on whether the condition is
          <span className="text-emerald-400 font-semibold"> true</span> or 
          <span className="text-rose-400 font-semibold"> false</span>.
        </p>

        {/* Basic Example */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`let age = 20;

let message = age >= 18 
  ? "Adult" 
  : "Minor";

console.log(message);`}
        />

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          This line replaces a full <code>if / else</code> structure, making your code more concise.
        </p>
      </section>

      {/* ============================================================
          SECTION 2 — GENERAL SYNTAX
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-300">Syntax</h3>

        <EditableCodeBlock
          language="javascript"
          initialCode={`condition ? valueIfTrue : valueIfFalse`}
        />

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          The ternary operator must always return a value — not a code block.
        </p>
      </section>

      {/* ============================================================
          SECTION 3 — REAL-WORLD EXAMPLES
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-sky-300">Real-World Examples</h3>

        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
          Ternary operators are often used when updating UI text, checking status, or assigning values.
        </p>

        {/* Example 1 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`let isLoggedIn = true;

let buttonText = isLoggedIn ? "Logout" : "Login";

console.log(buttonText);`}
        />

        {/* Example 2 */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`let temperature = 32;

let status = temperature > 30 
  ? "Hot" 
  : "Comfortable";

console.log(status);`}
        />

        <p className="text-slate-300 text-sm md:text-base">
          These examples are ideal because each has only **two possible outcomes**.
        </p>
      </section>

      {/* ============================================================
          SECTION 4 — NESTED TERNARIES
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-sky-300">Nested Ternary Operators</h3>

        <p className="text-slate-300">
          You *can* nest ternary operators, but it often hurts readability.
        </p>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let score = 85;

let grade = 
  score >= 90 ? "A" :
  score >= 75 ? "B" :
  score >= 60 ? "C" :
  "D";

console.log(grade);`}
        />

        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          This works, but for longer logic, it's better to use
          <code className="text-sky-300"> if / else if </code>.
        </p>
      </section>

      {/* ============================================================
          SECTION 5 — TERNARY VS IF/ELSE
      ============================================================ */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-emerald-400">
          When To Use the Ternary Operator
        </h3>

        <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm md:text-base leading-relaxed">
          <li>Use for simple, short decisions.</li>
          <li>Avoid nested or complicated ternaries.</li>
          <li>Use when you need to **return a value** based on a condition.</li>
        </ul>

        {/* Comparison Example */}
        <EditableCodeBlock
          language="javascript"
          initialCode={`// BAD: Too long
let result;
if (x > 10) {
  result = "High";
} else {
  result = "Low";
}

// GOOD: Clean & simple
let result = x > 10 ? "High" : "Low";`}
        />
      </section>

      {/* ============================================================
          SECTION 6 — COMMON MISTAKES
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-rose-300">Common Mistakes</h3>

        <ul className="list-disc pl-5 space-y-2 text-slate-400 text-sm md:text-base leading-relaxed">
          <li>Putting too much logic inside a ternary.</li>
          <li>Using ternaries when side effects (e.g., console.log) are needed.</li>
          <li>Making code harder to read by nesting too many conditions.</li>
        </ul>
      </section>

      {/* ============================================================
          SECTION 7 — PRACTICE TASK
      ============================================================ */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-sky-300">Try It Yourself</h3>

        <p className="text-slate-300">Write a ternary operator that outputs:</p>

        <ul className="list-disc pl-5 space-y-1 text-slate-400">
          <li>"Free Shipping" if price ≥ 500</li>
          <li>"Shipping Charges Apply" otherwise</li>
        </ul>

        <EditableCodeBlock
          language="javascript"
          initialCode={`let price = 650;

// Write your ternary below 👇`}
        />
      </section>

    </div>
  );
}
