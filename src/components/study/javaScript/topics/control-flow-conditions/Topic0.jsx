import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic0() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">if / else Basics</h2>

      <p className="text-slate-300 text-sm">
        <code>if</code> statements allow your program to make decisions based on conditions.
      </p>

      <CodeBlock
        code={`let age = 18;

if (age >= 18) {
  console.log("You are an adult");
} else {
  console.log("You are a minor");
}`}
        language="javascript"
      />

      <p className="text-slate-400 text-sm">
        The block inside <code>{`{ }`}</code> executes only if the condition is <strong>true</strong>.
      </p>

    </div>
  );
}
