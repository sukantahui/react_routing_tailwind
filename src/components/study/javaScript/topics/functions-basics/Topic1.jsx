import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Parameters, Arguments & Default Values
      </h2>

      <p className="text-slate-300 text-sm">
        Parameters act as variables inside the function. Arguments are actual values passed during the call.
      </p>

      <CodeBlock
        code={`function welcome(name, city = "Barrackpore") {
  console.log(\`Welcome \${name} from \${city}!\`);
}

welcome("Sukanta Hui");
welcome("Rahul", "Kolkata");`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        Default parameters are used when arguments are not provided.
      </p>

    </div>
  );
}
