// src/components/study/.../Topic0.jsx

import React, { Component } from "react";
import EditableCodeBlock from "../../../../../common/EditableCodeBlock";

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
          the older <strong>var</strong>. These new declarations give more predictable  
          behavior because they follow <strong>block scope</strong> and the <strong>Temporal Dead Zone (TDZ)</strong>.
        </p>

        {/* --------------------------------------------------------
            1. let — Block Scoped Variable
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200">
          1. let — Block Scoped
        </h3>

        <p className="text-slate-300 text-sm">
          A variable declared with <strong>let</strong> exists only inside the block <code>{`{ }`}</code>.
        </p>

        <EditableCodeBlock
          language="javascript"
          code={`let x = 10;

if (true) {
  let x = 20;
  console.log("Inside block:", x);  // 20
}

console.log("Outside block:", x);    // 10`}
        />

        <p className="text-slate-400 text-sm">
          Block scope makes code predictable and prevents accidental overwrites.
        </p>

        {/* --------------------------------------------------------
            2. const — Constant Variable
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          2. const — Value Cannot Be Reassigned
        </h3>

        <p className="text-slate-300 text-sm">
          <strong>const</strong> variables cannot be reassigned.
        </p>

        <EditableCodeBlock
          language="javascript"
          code={`const student = "Ritaja";
console.log(student);  // Ritaja

student = "Susmita";   // ❌ Error: Assignment to constant variable`}
        />

        <p className="text-slate-400 text-sm">
          But note: const does NOT freeze objects or arrays.
        </p>

        <EditableCodeBlock
          language="javascript"
          code={`const marks = [80, 90];

marks.push(95);      
console.log(marks);  // [80, 90, 95]`}
        />

        {/* --------------------------------------------------------
            3. var — Function Scoped
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          3. var — Function Scoped (Old & Error-Prone)
        </h3>

        <p className="text-slate-300 text-sm">
          <strong>var</strong> does NOT follow block scope and leaks outside.
        </p>

        <EditableCodeBlock
          language="javascript"
          code={`if (true) {
  var a = 100;
}

console.log(a);   // 100 (unsafe)`}
        />

        <p className="text-slate-400 text-sm">
          This is why developers avoid <strong>var</strong> in modern JavaScript.
        </p>

        {/* --------------------------------------------------------
            4. Temporal Dead Zone (TDZ)
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          4. Temporal Dead Zone (TDZ)
        </h3>

        <p className="text-slate-300 text-sm">
          TDZ means a variable exists but cannot be accessed before its declaration.
        </p>

        <EditableCodeBlock
          language="javascript"
          code={`console.log(score);
// ❌ Error: Cannot access 'score' before initialization

let score = 90;`}
        />

        <p className="text-slate-400 text-sm">
          This prevents bugs caused by using variables too early.
        </p>

        {/* --------------------------------------------------------
            5. Why let & const Are Safer
        --------------------------------------------------------- */}
        <h3 className="text-lg font-semibold text-slate-200 mt-8">
          5. Why let & const Are Better Choices
        </h3>

        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li>Block scope avoids leaking variables</li>
          <li>TDZ prevents early access errors</li>
          <li>const makes code intention clear</li>
          <li>let is safe for reassignable values</li>
        </ul>

        <p className="text-slate-300 text-sm leading-relaxed mt-2">
          These features form the foundation of modern ES6+ JavaScript  
          taught at <strong>Coder & AccoTax</strong>.
        </p>

        {/* --------------------------------------------------------
            SUMMARY BOX
        --------------------------------------------------------- */}
        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl mt-10">
          <h3 className="text-lg font-semibold text-slate-100">Summary</h3>

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
