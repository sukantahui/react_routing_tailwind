import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">Arrow Functions</h2>

      <p className="text-slate-300 text-sm">
        Arrow functions offer a shorter syntax introduced in ES6.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">Normal vs Arrow</h3>

      <CodeBlock
        code={`// Normal
function add(a, b) {
  return a + b;
}

// Arrow
const addArrow = (a, b) => a + b;

console.log(addArrow(5, 7));`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">With one parameter</h3>

      <CodeBlock
        code={`const greet = name => \`Hello \${name}!\`;

console.log(greet("Coder & AccoTax"));`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Arrow functions do not have their own <code>this</code>.
      </p>

    </div>
  );
}
