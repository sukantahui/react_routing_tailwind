import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl md:text-2xl text-sky-300 font-semibold">
        Comments in JavaScript
      </h2>

      {/* Intro */}
      <p className="text-slate-300 text-sm leading-relaxed">
        Comments are notes written inside your code to explain logic, structure, or
        reasoning. They are <strong>ignored by JavaScript</strong> during execution.
        Good comments make your code more readable and maintainable—especially for
        teams, future debugging, and documentation.
      </p>

      {/* Section 1 */}
      <h3 className="text-lg text-slate-200 font-semibold">
        🟦 Single-line Comments
      </h3>

      <p className="text-slate-300 text-sm">
        Use <code>//</code> for short explanations.
      </p>

      <CodeBlock
        language="javascript"
        code={`// This prints a welcome message
console.log("Hello from Coder & AccoTax!");

// Increase score
score = score + 1;`}
      />

      {/* Section 2 */}
      <h3 className="text-lg text-slate-200 font-semibold">
        🟩 Multi-line Comments
      </h3>

      <p className="text-slate-300 text-sm">
        Use <code>/* ... */</code> when you need longer explanations or want to 
        temporarily disable blocks of code.
      </p>

      <CodeBlock
        language="javascript"
        code={`/*
  This function calculates the bill amount
  including GST, discount, and service charge.
  Written by: Sukanta Hui (Barrackpore)
*/
function calculateBill(amount, gstRate) {
  return amount + (amount * gstRate) / 100;
}`}
      />

      {/* Section 3 */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ⭐ Why Comments Are Useful
      </h3>

      <ul className="text-slate-300 text-sm list-disc pl-6 space-y-1">
        <li>Explain tricky logic</li>
        <li>Describe purpose of functions or variables</li>
        <li>Mark TODO tasks</li>
        <li>Disable code temporarily without deleting</li>
      </ul>

      {/* Real Example */}
      <h3 className="text-lg text-slate-200 font-semibold">
        🧠 Real-World Example
      </h3>

      <CodeBlock
        language="javascript"
        code={`// TODO: Replace with API call when backend is ready
const students = ["Ritaja", "Swadeep", "Mounita"];

/*
  Loop through each student and print
  a greeting message on the screen.
*/
students.forEach(function(name) {
  console.log("Welcome, " + name);
});`}
      />

      {/* Common mistakes */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ❗ Common Mistakes
      </h3>

      <ul className="text-red-300 text-sm list-disc pl-6 space-y-1">
        <li>Using comments instead of writing clean code</li>
        <li>Writing obvious comments like <code>// add 1 to x</code></li>
        <li>Leaving outdated comments that no longer match the code</li>
        <li>Nesting comments inside multi-line comments (not allowed)</li>
      </ul>

      {/* Mini Practice */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ✏ Mini Practice Task
      </h3>

      <p className="text-slate-300 text-sm mb-1">
        Add useful comments to the following code:
      </p>

      <CodeBlock
        language="javascript"
        code={`let price = 900;
let discount = 100;

let finalPrice = price - discount;

console.log(finalPrice);`}
      />

      <p className="text-slate-400 text-xs italic">
        Try this in your JavaScript Playground!
      </p>
    </div>
  );
}
