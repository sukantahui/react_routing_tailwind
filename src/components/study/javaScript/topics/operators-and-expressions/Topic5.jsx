import React from "react";

export default function Topic5() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        Operator Precedence & Parentheses
      </h2>

      <p className="text-slate-300 text-sm">
        Some operators run before others. Parentheses let you override the order.
      </p>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`console.log(2 + 3 * 4);    // 14 (multiplication first)
console.log((2 + 3) * 4);   // 20 (parentheses first)`}
      </pre>

      <p className="text-slate-400 text-sm">
        When in doubt, use parentheses for clarity.
      </p>

    </div>
  );
}
