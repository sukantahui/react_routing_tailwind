import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Logical Operators (&&, ||, !)
      </h2>

      <p className="text-slate-300 text-sm">
        Logical operators help combine multiple conditions or invert boolean values.
      </p>

      <CodeBlock
        code={`console.log(true && true);     // true
console.log(true && false);    // false

console.log(true || false);    // true
console.log(false || false);   // false

console.log(!true);            // false`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        <strong>Short-circuit behavior:</strong><br />
        <code>||</code> returns the first truthy value.<br />
        <code>&&</code> returns the first falsy value.
      </p>

    </div>
  );
}
