import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic6() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl md:text-2xl font-semibold text-sky-300">
        Type Conversion: Implicit vs Explicit in JavaScript
      </h2>

      {/* Intro */}
      <p className="text-slate-300 text-sm leading-relaxed">
        JavaScript automatically converts values from one type to another when needed.
        This is called <strong>type coercion</strong>.  
        You can also convert values manually.  
        Understanding both helps you avoid unexpected output and hidden bugs.
      </p>

      {/* Explicit Conversion */}
      <h3 className="text-lg text-slate-200 font-semibold">
        🟦 Explicit Conversion (Manual Conversion)
      </h3>

      <p className="text-slate-300 text-sm">
        Explicit conversion means you intentionally convert the type using built-in functions.
      </p>

      <CodeBlock
        language="javascript"
        code={`Number("20");     // 20        → string → number
String(100);       // "100"     → number → string
Boolean(1);        // true      → 1 is truthy
Boolean(0);        // false     → 0 is falsy
Boolean("hello");  // true      → non-empty string`}
      />

      <p className="text-slate-400 text-sm italic">
        You always know what type you will get. This is the safest method.
      </p>

      {/* Implicit Conversion */}
      <h3 className="text-lg text-slate-200 font-semibold">
        🟥 Implicit Conversion (Automatic Coercion)
      </h3>

      <p className="text-slate-300 text-sm">
        JavaScript sometimes converts types automatically during operations.
      </p>

      <CodeBlock
        language="javascript"
        code={`"20" * 2;     // 40      → string converted to number
"5" + 2;       // "52"    → + concatenates when one is a string
true + 1;      // 2       → true → 1
false + 1;     // 1       → false → 0
"3" - 1;       // 2       → string converted to number`}
      />

      {/* Why implicit coercion is confusing */}
      <p className="text-slate-400 text-sm">
        Implicit conversion is powerful but can cause unexpected results,
        especially with the <code>+</code> operator.
      </p>

      {/* Strange JS coercion examples */}
      <h3 className="text-lg text-slate-200 font-semibold">
        😵‍💫 Strange But Important Coercion Examples
      </h3>

      <CodeBlock
        language="javascript"
        code={`"10" + 5 + 5;   // "1055"   (string concatenation)
5 + 5 + "10";   // "1010"   (left side numeric → converts later)

true + "5";     // "true5"
null + 5;       // 5        (null → 0)
undefined + 5;  // NaN`}
      />

      <p className="text-slate-300 text-sm">
        Understanding these helps avoid common interview trick questions.
      </p>

      {/* Table Summary */}
      <h3 className="text-lg text-slate-200 font-semibold">
        📊 Summary Table: Explicit vs Implicit
      </h3>

      <div className="text-sm text-slate-300">
        <table className="w-full border border-slate-700 text-left text-xs md:text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-2 border border-slate-700 w-1/3">Type</th>
              <th className="p-2 border border-slate-700">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-slate-700">Explicit</td>
              <td className="p-2 border border-slate-700">
                You convert manually using <code>Number()</code>, <code>String()</code>, <code>Boolean()</code>.
              </td>
            </tr>
            <tr>
              <td className="p-2 border border-slate-700">Implicit</td>
              <td className="p-2 border border-slate-700">
                JavaScript auto-converts during operations like <code>+, -, *</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Best Practices */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ⭐ Best Practices
      </h3>

      <ul className="list-disc pl-6 text-slate-300 text-sm space-y-1">
        <li>Use explicit conversion whenever possible.</li>
        <li>Avoid mixing strings and numbers with <code>+</code>.</li>
        <li>Use <code>Number()</code> instead of <code>parseInt()</code> (unless needed).</li>
        <li>Check for <code>NaN</code> using <code>Number.isNaN()</code>.</li>
      </ul>

      {/* Mini Practice */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ✏ Mini Practice Task
      </h3>

      <p className="text-slate-300 text-sm">
        Predict the output of each:
      </p>

      <CodeBlock
        language="javascript"
        code={`console.log("7" - 2);
console.log("7" + 2);
console.log(true + "1");
console.log(false + 5);
console.log(Number("Hello"));
console.log(Boolean(""));`}
      />

      <p className="text-slate-400 text-xs italic">
        Try these in your JavaScript Playground to verify.
      </p>

    </div>
  );
}
