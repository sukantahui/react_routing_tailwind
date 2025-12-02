import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic5() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Pure Functions vs Side Effects
      </h2>

      <p className="text-slate-300 text-sm">
        A pure function always produces the same output for the same input and does not modify external data.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">Pure Function</h3>

      <CodeBlock
        code={`function add(a, b) {
  return a + b;
}

console.log(add(5, 10));`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">Function with Side Effect</h3>

      <CodeBlock
        code={`let counter = 0;

function increment() {
  counter++;        // modifies external variable
}

increment();
console.log(counter);`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Pure functions are predictable and easier to test — great for clean coding practice as taught in Coder & AccoTax.
      </p>

    </div>
  );
}
