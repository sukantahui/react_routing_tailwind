import React from "react";

export default function Topic0() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        Statements, Semicolons, Indentation & Code Style
      </h2>

      <p className="text-slate-300 text-sm">
        JavaScript programs are built from statements. A statement is an 
        instruction that the browser executes from top to bottom.
      </p>

      <h3 className="text-lg font-semibold text-slate-200">Semicolons</h3>
      <p className="text-slate-300 text-sm">
        Semicolons are optional in JavaScript because of Automatic Semicolon Insertion (ASI), 
        but adding them prevents unexpected errors.
      </p>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`let x = 10;
let y = 20;
console.log(x + y);`}
      </pre>

      <h3 className="text-lg font-semibold text-slate-200">Indentation & Style</h3>
      <p className="text-slate-300 text-sm">
        Use 2 or 4 spaces for indentation. Consistent code style improves readability.
      </p>

    </div>
  );
}
