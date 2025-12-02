import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">Nested If Statements</h2>

      <p className="text-slate-300 text-sm">
        Nested <code>if</code> statements allow multiple layers of decision-making.
      </p>

      <CodeBlock
        code={`let score = 85;

if (score >= 60) {
  if (score >= 80) {
    console.log("Excellent");
  } else {
    console.log("Good");
  }
} else {
  console.log("Fail");
}`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Nesting too many <code>if</code> blocks can reduce readability.
      </p>

    </div>
  );
}
