
import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Return Values & Early Returns
      </h2>

      <p className="text-slate-300 text-sm">
        A function can return data using the <code>return</code> statement.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">Basic Return</h3>

      <CodeBlock
        code={`function add(a, b) {
  return a + b;
}

console.log(add(5, 10)); // 15`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">Early Return</h3>

      <CodeBlock
        code={`function checkAge(age) {
  if (age < 18) return "Not allowed";
  return "Welcome!";
}

console.log(checkAge(16));`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Early return improves readability and reduces nested conditions.
      </p>

    </div>
  );
}
