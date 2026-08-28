import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">for Loop</h2>

      <p className="text-slate-300 text-sm">
        The <code>for</code> loop is the most commonly used loop in JavaScript.
      </p>

      <CodeBlock
        code={`for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1 2 3 4 5`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Best for counting loops — start, end, and step are controlled in one place.
      </p>

    </div>
  );
}
