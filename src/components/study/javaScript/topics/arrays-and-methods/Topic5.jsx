import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic5() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Higher-Order Methods — map, filter, reduce
      </h2>

      <p className="text-slate-300 text-sm">
        These powerful functions help transform and process arrays in a clean, functional style.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">map()</h3>

      <CodeBlock
        code={`const nums = [1, 2, 3];

const doubled = nums.map(n => n * 2);
console.log(doubled); // [2,4,6]`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">filter()</h3>

      <CodeBlock
        code={`const even = nums.filter(n => n % 2 === 0);
console.log(even); // [2]`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">reduce()</h3>

      <CodeBlock
        code={`const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(sum); // 6`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        These methods make your code cleaner, shorter and more expressive — a style followed in professional coding environments like Coder & AccoTax, Barrackpore.
      </p>

    </div>
  );
}
