import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Non-Mutating Methods — slice, concat
      </h2>

      <p className="text-slate-300 text-sm">
        These methods return NEW arrays and do not modify the original one.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">slice()</h3>

      <CodeBlock
        code={`const numbers = [10, 20, 30, 40, 50];

const part = numbers.slice(1, 4);
console.log(part);       // [20, 30, 40]

console.log(numbers);    // original unchanged`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">concat()</h3>

      <CodeBlock
        code={`const a = [1, 2];
const b = [3, 4];

const combined = a.concat(b);

console.log(combined); // [1,2,3,4]`}
        language="javascript"
      />

    </div>
  );
}
