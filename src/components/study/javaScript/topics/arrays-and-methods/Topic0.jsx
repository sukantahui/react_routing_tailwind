import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Creating Arrays, Indexing & Length
      </h2>

      <p className="text-slate-300 text-sm">
        Arrays allow you to store multiple values in a single variable. They are one of the most widely used structures in JavaScript.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">Creating Arrays</h3>

      <CodeBlock
        code={`const students = ["Sukanta Hui", "Rahul", "Amit"];
const marks = [85, 90, 95];
const mixed = ["Coder & AccoTax", 1977, true];`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">Indexing</h3>

      <CodeBlock
        code={`const cities = ["Barrackpore", "Kolkata", "Delhi"];

console.log(cities[0]); // Barrackpore
console.log(cities[2]); // Delhi`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">Length Property</h3>

      <CodeBlock
        code={`const nums = [10, 20, 30, 40];
console.log(nums.length); // 4`}
        language="javascript"
      />

    </div>
  );
}
