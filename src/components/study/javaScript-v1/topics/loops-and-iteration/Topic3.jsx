import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">break & continue</h2>

      <p className="text-slate-300 text-sm">
        <strong>break</strong> stops the loop completely.<br />
        <strong>continue</strong> skips the current iteration.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">break Example</h3>

      <CodeBlock
        code={`for (let i = 1; i <= 10; i++) {
  if (i === 5) break;
  console.log(i);
}
// Output: 1 2 3 4`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">continue Example</h3>

      <CodeBlock
        code={`for (let i = 1; i <= 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
// Output: 1 2 4 5`}
        language="javascript"
      />

    </div>
  );
}
