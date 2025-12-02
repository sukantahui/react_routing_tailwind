import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">Ternary Operator</h2>

      <p className="text-slate-300 text-sm">
        The ternary operator is a compact way to write an if/else statement.
      </p>

      <CodeBlock
        code={`let age = 20;

let message = (age >= 18) 
  ? "Adult" 
  : "Minor";

console.log(message);`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Use ternary operators for short decisions, not complex logic.
      </p>

    </div>
  );
}
