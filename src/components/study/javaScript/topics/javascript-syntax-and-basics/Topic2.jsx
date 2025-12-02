import React from "react";

export default function Topic2() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl text-sky-300 font-semibold">
        Variables: var, let, const (Differences & Best Practices)
      </h2>

      <p className="text-slate-300 text-sm">JavaScript offers three ways to declare variables.</p>

      <h3 className="text-lg text-slate-200 font-semibold">var</h3>
      <p className="text-slate-300 text-sm">Function-scoped & outdated. Avoid in modern JS.</p>

      <h3 className="text-lg text-slate-200 font-semibold">let</h3>
      <p className="text-slate-300 text-sm">Block-scoped and preferred for reassignable values.</p>

      <h3 className="text-lg text-slate-200 font-semibold">const</h3>
      <p className="text-slate-300 text-sm">Block-scoped, cannot be reassigned.</p>

      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`let age = 25;
const pi = 3.14;`}
      </pre>

    </div>
  );
}
