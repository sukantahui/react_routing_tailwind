import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6">

        {/* Title */}
        <h2 className="text-xl font-semibold text-sky-300">
          let, const, Block Scope & Temporal Dead Zone (ES6)
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Modern JavaScript introduced <strong>let</strong> and <strong>const</strong> to replace  
          the older <strong>var</strong>. These new variable declarations give more predictable  
          behavior because they follow <strong>block scope</strong> and the <strong>Temporal Dead Zone (TDZ)</strong>.
        </p>

        {/* --------------------------------------------------------
            1. let — Block Scoped Variable
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. let — Block Scoped
        </h3>

        <p className="text-slate-300 text-sm">
          A variable declared with <strong>let</strong> lives only inside the block <code>{`{ }`}</code>.
        </p>

        <CodeBlock
          language="javascript"
          code={`let x = 10;

if (true) {
  let x = 20;
  console.log("Inside block:", x);  // 20
}

console.log("Outside block:", x);    // 10`}
        />

        <p className="text-slate-400 text-sm">
          Block scope makes code predictable and avoids accidental overwriting.
        </p>

        {/* --------------------------------------------------------
            2. const — Constant Variable
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. const — Value Cannot Be Reassigned
        </h3>

        <p className="text-slate-300 text-sm">
          <strong>const</strong> means you cannot reassign a new value to the variable.
        </p>

        <CodeBlock
          language="javascript"
          code={`const student = "Ritaja";
console.log(student);  // Ritaja

student = "Susmita";   // ❌ Error: Assignment to constant variable`}
        />

        <p className="text-slate-400 text-sm">
          But remember: const does NOT freeze objects or arrays.
        </p>

        <CodeBlock
          language="javascript"
          code={`const marks = [80, 90];

marks.push(95);      // Allowed
console.log(marks);  // [80, 90, 95]`}
        />

        {/* --------------------------------------------------------
            3. var — Function Scoped (Old Behavior)
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. var — Function Scoped (Old & Error-Prone)
        </h3>

        <p className="text-slate-300 text-sm">
          <strong>var</strong> ignores block scope and leaks values outside.
        </p>

        <CodeBlock
          language="javascript"
          code={`if (true) {
  var a = 100;
}

console.log(a);   // 100  (not safe)`}
        />

        <p className="text-slate-400 text-sm">
          This is why modern code avoids <strong>var</strong>.
        </p>

        {/* --------------------------------------------------------
            4. Temporal Dead Zone (TDZ)
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          4. Temporal Dead Zone (TDZ)
        </h3>

        <p className="text-slate-300 text-sm">
          TDZ means a variable exists but cannot be accessed until the line where it is declared.
        </p>

        <CodeBlock
          language="javascript"
          code={`console.log(score);  
// ❌ Error: Cannot access 'score' before initialization

let score = 90;`}
        />

        <p className="text-slate-400 text-sm">
          TDZ prevents accidental usage before actual declaration.
        </p>

        {/* --------------------------------------------------------
            5. Why let & const Are Safer
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          5. Why let & const Are Better Choices
        </h3>

        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li>Block scope avoids leaking values</li>
          <li>TDZ avoids accidental early usage</li>
          <li>const makes intention clear</li>
          <li>let replaces var for mutable values</li>
        </ul>

        <p className="text-slate-300 text-sm leading-relaxed mt-2">
          These modern features form the foundation of advanced ES6+ syntax  
          taught at <strong>Coder & AccoTax</strong> to help students write clean, predictable code.
        </p>

        {/* --------------------------------------------------------
            SUMMARY BOX
        --------------------------------------------------------- */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">
            Summary
          </h3>
          <ul className="list-disc ml-5 mt-3 text-slate-300 text-sm space-y-1">
            <li><strong>let</strong> → block scoped, mutable</li>
            <li><strong>const</strong> → block scoped, immutable reference</li>
            <li><strong>var</strong> → function scoped, avoid in modern code</li>
            <li><strong>TDZ</strong> → variable cannot be used before declaration</li>
          </ul>
        </section>

      </div>
    );
  }
}
