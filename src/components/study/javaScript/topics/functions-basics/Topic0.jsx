import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Function Declarations vs Function Expressions
      </h2>

      <p className="text-slate-300 text-sm">
        JavaScript provides two main ways to define functions: 
        <strong>declarations</strong> and <strong>expressions</strong>.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">Function Declaration</h3>

      <CodeBlock
        code={`function greet() {
  console.log("Hello from Coder & AccoTax!");
}

greet();`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">Function Expression</h3>

      <CodeBlock
        code={`const greet = function() {
  console.log("Hello from Barrackpore!");
};

greet();`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Function declarations are hoisted; expressions are not.
      </p>

    </div>
  );
}
