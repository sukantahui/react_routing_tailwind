import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic6() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Basic Input & Output: console, alert & prompt
      </h2>

      <p className="text-slate-300 text-sm">
        JavaScript provides simple ways to show messages and collect input from users.
      </p>

      <CodeBlock
        code={`console.log("Hello Console!");   // Output message

alert("Welcome!");                 // Popup message (browser only)

let name = prompt("Enter name:");  // Ask user for input
console.log("Hello " + name);`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        <strong>Note:</strong> <code>alert</code> and <code>prompt</code> do not work in Node.js.
      </p>

    </div>
  );
}
