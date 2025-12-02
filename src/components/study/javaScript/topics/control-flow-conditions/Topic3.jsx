import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">switch Statement</h2>

      <p className="text-slate-300 text-sm">
        The <code>switch</code> statement is ideal for comparing a variable against multiple values.
      </p>

      <CodeBlock
        code={`let day = 3;
let result = "";

switch (day) {
  case 1:
    result = "Monday";
    break;
  case 2:
    result = "Tuesday";
    break;
  case 3:
    result = "Wednesday";
    break;
  default:
    result = "Unknown day";
}

console.log(result);`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Don’t forget <code>break</code>, otherwise the next case will also run (fall-through).
      </p>

    </div>
  );
}
