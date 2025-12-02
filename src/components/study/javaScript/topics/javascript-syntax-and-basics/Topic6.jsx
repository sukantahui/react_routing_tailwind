import React from "react";

export default function Topic6() {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold text-sky-300">
        Type Conversion: Implicit vs Explicit
      </h2>

      <h3 className="text-lg text-slate-200 font-semibold">Explicit Conversion</h3>
      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`Number("20");    // 20
String(100);      // "100"
Boolean(1);       // true`}
      </pre>

      <h3 className="text-lg text-slate-200 font-semibold">Implicit Conversion</h3>
      <pre className="bg-slate-800 p-3 rounded-xl text-sky-300 text-sm">
{`"20" * 2;   // 40
"5" + 2;     // "52" (string concatenation)
true + 1;    // 2`}
      </pre>

      <p className="text-slate-400 text-sm">
        Implicit conversion can be confusing — avoid it unless necessary.
      </p>

    </div>
  );
}
