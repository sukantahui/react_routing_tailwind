import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Iterating Arrays — for, for-of & forEach
      </h2>

      <p className="text-slate-300 text-sm">
        Looping is fundamental to processing lists of values.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">for Loop</h3>

      <CodeBlock
        code={`const nums = [10, 20, 30];

for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">for...of</h3>

      <CodeBlock
        code={`for (let value of nums) {
  console.log(value);
}`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">forEach()</h3>

      <CodeBlock
        code={`nums.forEach(n => console.log(n));`}
        language="javascript"
      />

    </div>
  );
}
