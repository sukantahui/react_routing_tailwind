import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-8">

      <h2 className="text-xl font-semibold text-sky-300">
        Basic Loop Patterns (Sum, Factorial, Multiplication Table)
      </h2>

      <h3 className="text-lg text-slate-200 font-semibold">Sum of 1 to N</h3>
      <CodeBlock
        code={`let sum = 0;

for (let i = 1; i <= 5; i++) {
  sum += i;
}

console.log(sum);  // 15`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">Factorial</h3>
      <CodeBlock
        code={`let fact = 1;

for (let i = 1; i <= 5; i++) {
  fact *= i;
}

console.log(fact);  // 120`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">Multiplication Table</h3>
      <CodeBlock
        code={`let n = 7;

for (let i = 1; i <= 10; i++) {
  console.log(\`\${n} x \${i} = \${n * i}\`);
}`}
        language="javascript"
      />

    </div>
  );
}
