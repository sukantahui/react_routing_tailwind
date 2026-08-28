import React from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default function Topic2() {
  return (
    <div className="space-y-6">

      {/* Title */}
      <h2 className="text-xl md:text-2xl text-sky-300 font-semibold">
        Variables in JavaScript — let, const, and var
      </h2>

      {/* Intro */}
      <p className="text-slate-300 text-sm leading-relaxed">
        Variables store data that your program can use later. JavaScript offers
        three keywords for declaring variables: <strong>let</strong>,
        <strong> const</strong>, and <strong>var</strong>.  
        Modern JS mostly uses <strong>let</strong> and <strong>const</strong>,
        because <strong>var</strong> has outdated behavior.
      </p>

      {/* Section: let */}
      <h3 className="text-lg text-slate-200 font-semibold">🟦 let – Block-scoped Variable</h3>

      <p className="text-slate-300 text-sm">
        Use <code>let</code> when a value needs to change later.
      </p>

      <CodeBlock
        language="javascript"
        code={`
let score = 10;
score = 15;   // Allowed
console.log(score);`}
      />

      <p className="text-slate-400 text-xs">
        <strong>Block-scoped:</strong> valid only inside the nearest {`{ }`} block.
      </p>

      {/* Section: const */}
      <h3 className="text-lg text-slate-200 font-semibold">🟩 const – Constant Value</h3>

      <p className="text-slate-300 text-sm">
        Use <code>const</code> when you never want the variable to change.
      </p>

      <CodeBlock
        language="javascript"
        code={`
const pi = 3.14159;
console.log(pi);

// pi = 10;  ❌ Error: Cannot reassign a constant`}
      />

      <p className="text-slate-400 text-xs">
        <strong>Note:</strong> const objects can still have their contents modified.
      </p>

      <CodeBlock
        language="javascript"
        code={`
const user = { name: "Swadeep", age: 15 };

user.age = 16;         // ✔ Allowed
user = {};             // ❌ Not allowed`}
      />

      {/* Section: var */}
      <h3 className="text-lg text-slate-200 font-semibold">🟥 var – Legacy Variable Keyword</h3>

      <p className="text-slate-300 text-sm">
        <code>var</code> is <strong>function-scoped</strong>, not block-scoped.
        It also hoists differently, which causes bugs.
        Use <code>let</code> or <code>const</code> instead.
      </p>

      <CodeBlock
        language="javascript"
        code={`
if (true) {
  var x = 10;
}

console.log(x); // ✔ 10 (var escapes block!)`}
      />

      <p className="text-red-300 text-xs italic">
        This behavior makes code harder to predict.
      </p>

      {/* Comparison Table */}
      <h3 className="text-lg text-slate-200 font-semibold">📊 let vs const vs var</h3>

      <div className="text-sm text-slate-300">
        <table className="w-full border border-slate-700 text-left text-xs md:text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-2 border border-slate-700">Feature</th>
              <th className="p-2 border border-slate-700">let</th>
              <th className="p-2 border border-slate-700">const</th>
              <th className="p-2 border border-slate-700">var</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-slate-700">Reassignable?</td>
              <td className="p-2 border border-slate-700">✔ Yes</td>
              <td className="p-2 border border-slate-700">❌ No</td>
              <td className="p-2 border border-slate-700">✔ Yes</td>
            </tr>
            <tr>
              <td className="p-2 border border-slate-700">Block Scoped?</td>
              <td className="p-2 border border-slate-700">✔ Yes</td>
              <td className="p-2 border border-slate-700">✔ Yes</td>
              <td className="p-2 border border-slate-700">❌ No</td>
            </tr>
            <tr>
              <td className="p-2 border border-slate-700">Hoisted?</td>
              <td className="p-2 border border-slate-700">✔ Yes (TDZ)</td>
              <td className="p-2 border border-slate-700">✔ Yes (TDZ)</td>
              <td className="p-2 border border-slate-700">✔ Yes (initialized as undefined)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Best Practices */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ⭐ Best Practices
      </h3>

      <ul className="text-slate-300 text-sm list-disc pl-6 space-y-1">
        <li>Use <strong>const</strong> by default.</li>
        <li>Use <strong>let</strong> only when the value needs to change.</li>
        <li>Avoid <strong>var</strong> completely.</li>
        <li>Use descriptive names: <code>totalPrice</code> instead of <code>x</code>.</li>
      </ul>

      {/* Common Mistakes */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ❗ Common Mistakes
      </h3>

      <ul className="text-red-300 text-sm list-disc pl-6 space-y-1">
        <li>Using <strong>var</strong> instead of <strong>let</strong></li>
        <li>Trying to reassign a <strong>const</strong></li>
        <li>Declaring variables without using them</li>
        <li>Using unclear names like <code>a</code>, <code>b</code>, <code>data1</code></li>
      </ul>

      {/* Mini Practice */}
      <h3 className="text-lg text-slate-200 font-semibold">
        ✏ Mini Practice Task
      </h3>

      <p className="text-slate-300 text-sm">
        Rewrite the following code using the best practices:
      </p>

      <CodeBlock
        language="javascript"
        code={`
var name = "Mounita";
var age = 16;
age = 17;

console.log(name, age);`}
      />

      <p className="text-slate-400 text-xs italic">
        Try improving the variable names too!
      </p>
    </div>
  );
}
