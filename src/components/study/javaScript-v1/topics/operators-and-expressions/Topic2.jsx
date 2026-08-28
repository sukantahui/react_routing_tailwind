import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Comparison Operators (==, ===, !=, !==, &gt;, &lt;, &gt=, &lt=)
      </h2>

      <p className="text-slate-300 text-sm">
        Comparison operators evaluate expressions and return a boolean value:
        <strong> true</strong> or <strong>false</strong>.
      </p>

      {/* == vs === */}
      <h3 className="text-lg text-slate-200 font-semibold">== vs ===</h3>

      <CodeBlock
        code={`console.log(5 == "5");     // true  (value comparison only)
console.log(5 === "5");    // false (value + type comparison)`}
        language="javascript"
      />

      {/* Other comparisons */}
      <h3 className="text-lg text-slate-200 font-semibold">Other Comparisons</h3>

      <CodeBlock
        code={`console.log(10 > 5);      // true
console.log(10 < 5);      // false
console.log(10 >= 10);    // true
console.log(4 <= 8);      // true`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Always use <strong>===</strong> instead of <strong>==</strong> to avoid
        unexpected type coercion.
      </p>

    </div>
  );
}
