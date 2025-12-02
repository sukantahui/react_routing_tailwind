import React from "react";

export default function Topic2() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        Comparison Operators (==, ===, !=, !==, &gt;, &lt;, ≥, ≤)
      </h2>

      <p className="text-slate-300 text-sm">
        Comparison operators return a boolean result: <strong>true</strong> or <strong>false</strong>.
      </p>

      <h3 className="text-lg text-slate-200 font-semibold">== vs ===</h3>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`console.log(5 == "5");   // true (value only)
console.log(5 === "5");  // false (value + type check)`}
      </pre>

      <h3 className="text-lg text-slate-200 font-semibold">Other comparisons</h3>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`console.log(10 > 5);    // true
console.log(10 < 5);    // false
console.log(10 >= 10);  // true
console.log(4 <= 8);    // true`}
      </pre>

      <p className="text-slate-400 text-sm">
        Always prefer <strong>===</strong> to avoid type coercion issues.
      </p>
    </div>
  );
}
