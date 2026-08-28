import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-10">

      {/* TITLE */}
      <h2 className="text-2xl font-semibold text-sky-300">
        Arithmetic Operators in JavaScript (+, -, *, /, %, **)
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        JavaScript provides several arithmetic operators that help you perform
        mathematical calculations. These operators are essential when working with
        numbers, loops, arrays, financial calculations, and even animations.
      </p>

      {/* SYNTAX BLOCK */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <p className="text-sky-200 text-sm font-semibold mb-2">Syntax</p>

        <CodeBlock
          code={`let result;

result = a + b;   // Addition
result = a - b;   // Subtraction
result = a * b;   // Multiplication
result = a / b;   // Division
result = a % b;   // Remainder
result = a ** b;  // Exponentiation`}
          language="javascript"
        />
      </div>

      {/* OPERATOR TABLE */}
      <div className="bg-slate-900/60 border border-slate-700 rounded-xl p-4 text-sm">
        <p className="font-semibold text-sky-200 mb-3">Operator Overview</p>

        <div className="grid grid-cols-3 gap-3 text-slate-300">
          <div><span className="text-sky-400 font-bold">+</span> — Addition</div>
          <div><span className="text-sky-400 font-bold">-</span> — Subtraction</div>
          <div><span className="text-sky-400 font-bold">*</span> — Multiplication</div>

          <div><span className="text-sky-400 font-bold">/</span> — Division</div>
          <div><span className="text-sky-400 font-bold">%</span> — Modulo (Remainder)</div>
          <div><span className="text-sky-400 font-bold">**</span> — Exponent</div>
        </div>
      </div>

      {/* EXAMPLE WITH EDITOR */}
      <div className="space-y-3">
        <p className="text-slate-200 text-sm font-semibold">
          Example — Basic Arithmetic Operations
        </p>

        <EditableCodeBlock
          initialCode={`let a = 10;
let b = 3;

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Remainder:", a % b);
console.log("Power:", a ** b);`}
          language="javascript"
        />
      </div>

      {/* REAL WORLD EXAMPLE */}
      <div className="space-y-3">
        <p className="text-slate-200 text-sm font-semibold">
          Real-Life Example — Student Score Calculation (Coder & AccoTax)
        </p>

        <EditableCodeBlock
          initialCode={`let totalMarks = 480;
let subjects = 6;

let average = totalMarks / subjects;
let percentage = (totalMarks / 600) * 100;

console.log("Average Marks:", average);
console.log("Percentage:", percentage.toFixed(2) + "%");`}
          language="javascript"
        />
      </div>

      {/* NOTES */}
      <div className="bg-blue-900/40 border border-blue-700 text-slate-200 p-4 rounded-xl text-sm space-y-2">
        <p className="font-bold text-blue-300">Important Notes</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>JavaScript uses <b>floating-point arithmetic</b>. So some results may not be exact.</li>
          <li><code>**</code> is the exponent operator introduced in ES7.</li>
          <li><code>%</code> does NOT give percentage—it gives remainder.</li>
        </ul>
      </div>

      {/* COMMON MISTAKES */}
      <div className="bg-red-900/40 border border-red-700 text-red-300 p-4 rounded-xl text-sm">
        <p className="font-bold mb-2 text-red-200">Common Mistakes</p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Using <code>%</code> for percentage instead of <code>(value / 100)</code>.</li>
          <li>Expecting <code>3 / 2</code> to give integer — JS always gives decimal.</li>
          <li>Writing <code>a ^ b</code> thinking it means exponent — it's XOR, not power.</li>
        </ul>
      </div>

      {/* PRACTICE */}
      <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-xl text-sm">
        <p className="font-semibold text-sky-300 mb-2">Practice Questions</p>
        <ul className="list-disc ml-5 text-slate-300 space-y-1">
          <li>Write a program to calculate the area of a rectangle.</li>
          <li>Calculate simple interest using arithmetic operators.</li>
          <li>Find the square and cube of a number using <code>**</code>.</li>
          <li>Check if a number is even or odd using modulo <code>%</code>.</li>
          <li>Convert Celsius to Fahrenheit using formula.</li>
        </ul>
      </div>
    </div>
  );
}
