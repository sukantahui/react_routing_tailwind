import React from "react";

export default function Topic4() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl text-sky-300 font-semibold">
        Primitive Data Types in JavaScript
      </h2>

      <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
        <li>Number</li>
        <li>String</li>
        <li>Boolean</li>
        <li>Null</li>
        <li>Undefined</li>
        <li>Symbol</li>
        <li>BigInt</li>
      </ul>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`let age = 20;            // number
let name = "Alice";       // string
let isOnline = true;      // boolean
let score = null;         // null
let data;                 // undefined
let id = Symbol("id");    // symbol
let big = 123n;           // BigInt`}
      </pre>

    </div>
  );
}
