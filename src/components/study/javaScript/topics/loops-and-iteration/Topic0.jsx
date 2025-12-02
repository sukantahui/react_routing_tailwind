import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-6">
    
      <h2 className="text-xl font-semibold text-sky-300">while Loop</h2>

      <p className="text-slate-300 text-sm">
        A <code>while</code> loop repeats as long as the condition is <strong>true</strong>.
      </p>

      <CodeBlock
        code={`let i = 1;

while (i <= 5) {
  console.log(i);
  i++;
}
// Output: 1 2 3 4 5`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Make sure the condition eventually becomes false to avoid an infinite loop.
      </p>
    
    </div>
  );
}
