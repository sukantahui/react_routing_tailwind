import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">do…while Loop</h2>

      <p className="text-slate-300 text-sm">
        A <code>do…while</code> loop runs the block <strong>at least once</strong>, even if the condition is false.
      </p>

      <CodeBlock
        code={`let i = 1;

do {
  console.log(i);
  i++;
} while (i <= 5);

// Output: 1 2 3 4 5`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Use when you need the loop to run at least once.
      </p>

    </div>
  );
}
