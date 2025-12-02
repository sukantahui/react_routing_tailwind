import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Searching in Arrays — indexOf, includes, find, findIndex
      </h2>

      <p className="text-slate-300 text-sm">
        JavaScript provides multiple ways to search within arrays.
      </p>

      <h3 className="text-lg font-semibold text-slate-200">indexOf()</h3>

      <CodeBlock
        code={`const names = ["Sukanta", "Rahul", "Amit"];

console.log(names.indexOf("Rahul")); // 1`}
        language="javascript"
      />

      <h3 className="text-lg font-semibold text-slate-200">includes()</h3>

      <CodeBlock
        code={`console.log(names.includes("Amit")); // true`}
        language="javascript"
      />

      <h3 className="text-lg font-semibold text-slate-200">find()</h3>

      <CodeBlock
        code={`const nums = [10, 20, 30, 40];

const found = nums.find(n => n > 25);
console.log(found); // 30`}
        language="javascript"
      />

      <h3 className="text-lg font-semibold text-slate-200">findIndex()</h3>

      <CodeBlock
        code={`const index = nums.findIndex(n => n > 25);
console.log(index); // 2`}
        language="javascript"
      />

    </div>
  );
}
