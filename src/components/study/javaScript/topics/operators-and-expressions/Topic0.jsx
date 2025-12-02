import React from "react";

export default function Topic0() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        Arithmetic Operators (+, -, *, /, %, **)
      </h2>

      <p className="text-slate-300 text-sm">
        Arithmetic operators allow you to perform mathematical calculations in JavaScript.
      </p>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`let a = 10;
let b = 3;

console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.333...
console.log(a % b);  // 1 (remainder)
console.log(a ** b); // 1000 (exponent)`}
      </pre>

      <p className="text-slate-400 text-sm">
        <strong>Note:</strong> JavaScript does not have integer division — all numbers are floats.
      </p>

    </div>
  );
}
