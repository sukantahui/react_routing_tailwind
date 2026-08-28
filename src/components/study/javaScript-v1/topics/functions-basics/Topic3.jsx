import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic3() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Function Scope: Local vs Global
      </h2>

      <p className="text-slate-300 text-sm">
        Variables declared inside a function are <strong>local</strong>.  
        Variables outside are <strong>global</strong>.
      </p>

      <CodeBlock
        code={`let city = "Barrackpore";  // global

function showCity() {
  let name = "Sukanta Hui"; // local
  console.log(name, city);
}

showCity();

// console.log(name); // ❌ error: not accessible`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Local variables are destroyed after the function exits.
      </p>

    </div>
  );
}
