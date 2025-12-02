import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Arithmetic Operators (+, -, *, /, %, **)
      </h2>

      <p className="text-slate-300 text-sm">
        Arithmetic operators allow you to perform mathematical calculations in JavaScript.
      </p>

      <CodeBlock
        code={`let a = 10;
let b = 3;

console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.333...
console.log(a % b);  // 1
console.log(a ** b); // 1000`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        JavaScript performs floating-point division by default.
      </p>

    </div>
  );
}
