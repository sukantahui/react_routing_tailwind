import React from "react";

export default function Topic4() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        String Concatenation & Template Literals
      </h2>

      <h3 className="text-lg text-slate-200 font-semibold">Concatenation</h3>
      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`let name = "John";
console.log("Hello " + name + "!");`}
      </pre>

      <h3 className="text-lg text-slate-200 font-semibold">Template Literals</h3>
      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`console.log(\`Hello \${name}!\`);`}
      </pre>

      <p className="text-slate-400 text-sm">
        Template literals allow multi-line strings and embedded expressions.
      </p>

    </div>
  );
}
