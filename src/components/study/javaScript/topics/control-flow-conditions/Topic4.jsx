
import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic4() {
  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-sky-300">
        Real-World Examples of Decision Making
      </h2>

      <p className="text-slate-300 text-sm">
        Here are some practical examples of conditional logic.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">🔹 Login System</h3>

      <CodeBlock
        code={`let username = "admin";
let password = "1234";

if (username === "admin" && password === "1234") {
  console.log("Login successful!");
} else {
  console.log("Invalid credentials");
}`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">🔹 Grading System</h3>

      <CodeBlock
        code={`let marks = 78;

if (marks >= 90) console.log("A+");
else if (marks >= 80) console.log("A");
else if (marks >= 70) console.log("B");
else console.log("Needs improvement");`}
        language="javascript"
      />

      <h3 className="text-lg text-slate-200 font-semibold">🔹 Discount Calculator</h3>

      <CodeBlock
        code={`let price = 500;
let discount = (price > 400) ? 20 : 5;

console.log("Discount:", discount, "%");`}
        language="javascript"
      />

    </div>
  );
}
