import React from "react";

export default function Topic5() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        typeof Operator & Basic Type Checking
      </h2>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`console.log(typeof "hello");  // string
console.log(typeof 123);       // number
console.log(typeof true);      // boolean
console.log(typeof undefined); // undefined
console.log(typeof null);      // object (special case!)
console.log(typeof 123n);      // bigint`}
      </pre>

      <p className="text-slate-400 text-sm">
        Note: <strong>null</strong> returns <strong>"object"</strong> — a famous JavaScript quirk.
      </p>

    </div>
  );
}
