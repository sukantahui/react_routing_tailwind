import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic5() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Operator Precedence & Parentheses
      </h2>

      <p className="text-slate-300 text-sm">
        Operator precedence determines the order of evaluation. Parentheses override it.
      </p>

      <CodeBlock
        code={`console.log(2 + 3 * 4);     // 14 (multiplication first)
console.log((2 + 3) * 4);    // 20 (parentheses first)`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Use parentheses for clarity when mixing multiple operators.
      </p>

    </div>
  );
}
