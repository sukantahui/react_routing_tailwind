import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic7() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-sky-300">
        Numbers in JavaScript — Arithmetic, NaN, Infinity & Precision
      </h2>

      {/* Intro */}
      <p className="text-slate-300 text-sm leading-relaxed">
        JavaScript uses a single number type called <strong>IEEE 754 double precision</strong>.
        This means all numbers—integers, floats, and scientific notation—are stored in the same format.
        Understanding how JavaScript handles numbers helps avoid common math bugs.
      </p>

      {/* Basic Arithmetic */}
      <h3 className="text-lg text-slate-200 font-semibold">
        🟦 Basic Arithmetic Operators
      </h3>

      <CodeBlock
        language="javascript"
        code={`console.log(10 + 5);   // 15
console.log(10 - 5);   // 5
console.log(10 * 5);   // 50
console.log(10 / 5);   // 2
console.log(10 % 3);   // 1   (remainder)
console.log(2 ** 3);   // 8   (exponentiation)`}
      />

      <p className="text-slate-300 text-sm">
        JavaScript follows <strong>BODMAS</strong> (PEMDAS) for mathematical precedence.
      </p>

      {/* Special Numbers */}
      <h3 className="text-lg text-slate-200 font-semibold">
        🟥 Special Number Values in JavaScript
      </h3>

      <p className="text-slate-300 text-sm">JavaScript numbers include some special values:</p>

      <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
        <li><strong>NaN</strong> → “Not-a-Number”</li>
        <li><strong>Infinity</strong> → result of division by zero</li>
        <li><strong>-Infinity</strong></li>
      </ul>

      <CodeBlock
        language="javascript"
        code={`console.log(0 / 0);        // NaN
console.log(10 / 0);       // Infinity
console.log(-10 / 0);      // -Infinity
console.log("abc" * 3);    // NaN`}
      />

      {/* NaN Behavior */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ❗ NaN is Very Special
      </h3>

      <p className="text-slate-300 text-sm">
        <strong>NaN is the only value in JavaScript that is NOT equal to itself!</strong>
      </p>

      <CodeBlock
        language="javascript"
        code={`console.log(NaN === NaN);  // false
console.log(Number.isNaN(NaN)); // true`}
      />

      <p className="text-slate-400 text-sm italic">
        Always use <code>Number.isNaN()</code> to check for NaN.
      </p>

      {/* Floating precision */}
      <h3 className="text-lg text-slate-200 font-semibold">
        🔢 Floating-Point Precision Issues
      </h3>

      <p className="text-slate-300 text-sm">
        JavaScript cannot represent some decimal numbers accurately.
      </p>

      <CodeBlock
        language="javascript"
        code={`console.log(0.1 + 0.2);      // 0.30000000000000004
console.log(0.3 === 0.1 + 0.2); // false`}
      />

      <p className="text-slate-300 text-sm">
        Fix using <code>toFixed()</code> or integer math:
      </p>

      <CodeBlock
        language="javascript"
        code={`Number((0.1 + 0.2).toFixed(2)); // 0.3

// OR
(0.1 * 100 + 0.2 * 100) / 100; // 0.3`}
      />

      {/* Number Checking */}
      <h3 className="text-lg text-slate-200 font-semibold">
        🟩 Useful Number Checking Methods
      </h3>

      <CodeBlock
        language="javascript"
        code={`Number.isInteger(10);          // true
Number.isInteger(10.5);        // false
Number.isFinite(100);          // true
Number.isFinite(Infinity);     // false
Number.isNaN("hello");         // false  (not a number, but not NaN!)
Number.isNaN(NaN);             // true`}
      />

      {/* Summary Table */}
      <h3 className="text-lg text-slate-200 font-semibold">
        📊 Summary: Special Number Cases
      </h3>

      <div className="text-sm text-slate-300">
        <table className="w-full border border-slate-700 text-left text-xs md:text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-2 border border-slate-700 w-1/3">Value</th>
              <th className="p-2 border border-slate-700">Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2 border border-slate-700">NaN</td><td className="p-2 border">Not-a-number</td></tr>
            <tr><td className="p-2 border border-slate-700">Infinity</td><td className="p-2 border">Division by zero</td></tr>
            <tr><td className="p-2 border border-slate-700">-Infinity</td><td className="p-2 border">Negative division by zero</td></tr>
            <tr><td className="p-2 border border-slate-700">0.1 + 0.2</td><td className="p-2 border">Floating precision error</td></tr>
          </tbody>
        </table>
      </div>

      {/* Best Practices */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ⭐ Best Practices
      </h3>

      <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
        <li>Avoid floating-point arithmetic without rounding.</li>
        <li>Use <code>Number.isNaN()</code> instead of <code>== NaN</code>.</li>
        <li>Never compare NaN with itself.</li>
        <li>Use <code>Number.isFinite()</code> to validate numeric inputs.</li>
      </ul>

      {/* Mini Practice */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ✏ Mini Practice Task
      </h3>

      <p className="text-slate-300 text-sm">Predict the output:</p>

      <CodeBlock
        language="javascript"
        code={`console.log("10" - 5);
console.log("10" + 5);
console.log(1 / 0);
console.log(-1 / 0);
console.log("hello" * 2);
console.log(Number.isNaN("hello" - 2));`}
      />

      <p className="text-slate-400 text-xs italic">
        Try these in your JavaScript Playground.
      </p>

    </div>
  );
}
