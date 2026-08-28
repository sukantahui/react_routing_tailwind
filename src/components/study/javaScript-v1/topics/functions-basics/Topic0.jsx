import React from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl font-semibold text-sky-300">
        Function Declarations vs Function Expressions
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        JavaScript provides two main ways to define functions:
        <strong> function declarations </strong> and 
        <strong> function expressions</strong>. 
        Understanding the difference is essential for mastering hoisting and advanced JS concepts.
      </p>

      {/* Function Declaration */}
      <h3 className="text-lg text-slate-200 font-semibold">Function Declaration</h3>

      <EditableCodeBlock
        defaultTab="javascript"
        initialCode={`function greet() {
  console.log("Hello from Coder & AccoTax!");
}

greet();`}
      />

      {/* Function Expression */}
      <h3 className="text-lg text-slate-200 font-semibold">Function Expression</h3>

      <EditableCodeBlock
        defaultTab="javascript"
        initialCode={`const greet = function() {
  console.log("Hello from Barrackpore!");
};

greet();`}
      />

      <p className="text-slate-400 text-sm leading-relaxed">
        <strong>Function declarations</strong> are hoisted, which means you can call them
        before their actual definition in the code.  
        <strong>Function expressions</strong> are <em>not hoisted</em> and behave like normal variables.
      </p>

    </div>
  );
}
