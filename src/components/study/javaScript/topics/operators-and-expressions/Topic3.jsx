import React from "react";

export default function Topic3() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        Logical Operators (&&, ||, !)
      </h2>

      <p className="text-slate-300 text-sm">
        Logical operators help combine conditions.
      </p>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`console.log(true && true);    // true
console.log(true && false);   // false
console.log(true || false);   // true
console.log(false || false);  // false
console.log(!true);           // false`}
      </pre>

      <p className="text-slate-400 text-sm">
        <strong>Shortcut behavior:</strong>  
        <code>||</code> returns first truthy value,  
        <code>&&</code> returns first falsy value.
      </p>

    </div>
  );
}
