import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic5() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-sky-300">
        typeof Operator & Basic Type Checking
      </h2>

      {/* Intro */}
      <p className="text-slate-300 text-sm leading-relaxed">
        JavaScript provides the <code>typeof</code> operator to check the type of
        any value. It helps you identify strings, numbers, booleans, objects,
        functions, and more.  
        Understanding <code>typeof</code> is essential for debugging and writing
        error-free code.
      </p>

      {/* Code Example */}
      <CodeBlock
        language="javascript"
        code={`console.log(typeof "hello");   // "string"
console.log(typeof 123);        // "number"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);       // "object" ❗ (special case)
console.log(typeof 123n);       // "bigint"`}
      />

      {/* Explanation of null issue */}
      <p className="text-slate-400 text-sm">
        The <strong>"null"</strong> type returning <strong>"object"</strong> is a well-known
        JavaScript bug that has existed since 1995!  
        It is kept for backward compatibility.
      </p>

      {/* typeof table */}
      <h3 className="text-lg text-slate-200 font-semibold mt-4">
        📊 typeof Results for Different Values
      </h3>

      <div className="text-sm text-slate-300">
        <table className="w-full border border-slate-700 text-left text-xs md:text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-2 border border-slate-700">Value</th>
              <th className="p-2 border border-slate-700">typeof Result</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="p-2 border border-slate-700">"Hello"</td><td className="p-2 border">string</td></tr>
            <tr><td className="p-2 border border-slate-700">42</td><td className="p-2 border">number</td></tr>
            <tr><td className="p-2 border border-slate-700">true</td><td className="p-2 border">boolean</td></tr>
            <tr><td className="p-2 border border-slate-700">undefined</td><td className="p-2 border">undefined</td></tr>
            <tr><td className="p-2 border border-slate-700">null</td><td className="p-2 border">object ❗</td></tr>
            <tr><td className="p-2 border border-slate-700">{} (object)</td><td className="p-2 border">object</td></tr>
            <tr><td className="p-2 border border-slate-700">[] (array)</td><td className="p-2 border">object</td></tr>
            <tr><td className="p-2 border border-slate-700">()=&gt{}</td><td className="p-2 border">function</td></tr>
            <tr><td className="p-2 border border-slate-700">123n</td><td className="p-2 border">bigint</td></tr>
          </tbody>
        </table>
      </div>

      {/* Notes about objects */}
      <h3 className="text-lg text-slate-200 font-semibold">
        🟦 typeof object vs array vs null
      </h3>

      <p className="text-slate-300 text-sm">
        <code>typeof</code> cannot distinguish between:
      </p>

      <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
        <li><code>{`{}`}</code> → object</li>
        <li><code>[ ]</code> → object</li>
        <li><code>null</code> → object (quirk)</li>
      </ul>

      <p className="text-slate-300 text-sm">
        For arrays, use:
      </p>

      <CodeBlock
        language="javascript"
        code={`Array.isArray([1, 2, 3]); // true`}
      />

      {/* typeof function */}
      <h3 className="text-lg text-slate-200 font-semibold">
        🟩 typeof for Functions
      </h3>

      <p className="text-slate-300 text-sm">
        Only functions return <strong>function</strong> as their type.
      </p>

      <CodeBlock
        language="javascript"
        code={`function sayHi() {}
console.log(typeof sayHi); // "function"`}
      />

      {/* Best Practices */}
      <h3 className="text-lg text-slate-200 font-semibold">⭐ Best Practices</h3>

      <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
        <li>Use <code>typeof</code> for basic type checking.</li>
        <li>Use <code>Array.isArray()</code> to detect arrays.</li>
        <li>Use <code>value === null</code> to check explicitly for null.</li>
        <li>Use <code>typeof variable === "number"</code> before performing math operations.</li>
      </ul>

      {/* Common Mistakes */}
      <h3 className="text-lg text-slate-200 font-semibold">❗ Common Mistakes</h3>

      <ul className="list-disc pl-6 text-red-300 text-sm space-y-1">
        <li>Expecting <code>typeof null</code> to return "null"</li>
        <li>Assuming arrays return "array"</li>
        <li>Using <code>typeof</code> to check for NaN</li>
      </ul>

      {/* Mini Practice */}
      <h3 className="text-lg text-slate-200 font-semibold">✏ Mini Practice Task</h3>

      <p className="text-slate-300 text-sm">Predict the output:</p>

      <CodeBlock
        language="javascript"
        code={`console.log(typeof []);       
console.log(typeof {});
console.log(typeof (() => {}));
console.log(typeof NaN);
console.log(typeof null);`}
      />

      <p className="text-slate-400 text-xs italic">
        Try evaluating these in your JavaScript playground.
      </p>

    </div>
  );
}
