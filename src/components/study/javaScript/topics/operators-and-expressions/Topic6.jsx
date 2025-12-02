import React from "react";

export default function Topic6() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        Basic Input & Output: console, alert & prompt
      </h2>

      <p className="text-slate-300 text-sm">
        JavaScript offers simple ways to interact with users and display messages.
      </p>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`console.log("Hello Console!"); // Output

alert("Welcome!");              // Popup message (browser only)

let name = prompt("Enter name:");
console.log("Hello " + name);`}
      </pre>

      <p className="text-slate-400 text-sm">
        <strong>Note:</strong> `prompt` and `alert` do NOT work in Node.js.
      </p>

    </div>
  );
}
