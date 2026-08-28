import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic1() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Assignment & Compound Assignment Operators
      </h2>

      <p className="text-slate-300 text-sm">
        Assignment operators store values in variables, while compound operators combine arithmetic with assignment.
      </p>

      <CodeBlock
        code={`let x = 10;   // assignment

x += 5;        // 15
x -= 2;        // 13
x *= 3;        // 39
x /= 3;        // 13
x %= 5;        // 3`}
        language="javascript"
      />

    </div>
  );
}
