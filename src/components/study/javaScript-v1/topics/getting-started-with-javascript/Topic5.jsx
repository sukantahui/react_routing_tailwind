import React from "react";

export default function Topic5() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        Using console.log & Basic Debugging
      </h2>

      <p className="text-slate-300 text-sm leading-relaxed">
        The console is the most important tool for beginners. It helps test logic, 
        view outputs, and debug mistakes.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">Common Debugging Commands</h3>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm whitespace-pre-wrap">
{`console.log("value:", x);
console.warn("Warning!");
console.error("Something went wrong!");`}
      </pre>

      <p className="text-slate-400 text-sm">
        Console messages help track the flow of your program.
      </p>

    </div>
  );
}
