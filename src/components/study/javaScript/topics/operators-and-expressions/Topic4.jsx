import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        String Concatenation & Template Literals
      </h2>

      <h3 className="text-lg text-slate-200 font-semibold">Concatenation (+)</h3>

      <CodeBlock
        code={`let name = "John";
console.log("Hello " + name + "!");`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">Template Literals</h3>

      <CodeBlock
        code={`let name = "John";
console.log(\`Hello \${name}!\`);`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Template literals allow multi-line strings and embedded expressions.
      </p>

    </div>
  );
}
