import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Using Browser DevTools: Breakpoints, Stepping, Watch & Call Stack
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Every professional JavaScript developer must know how to debug using
            browser DevTools. At <strong>Coder & AccoTax, Barrackpore</strong>,
            students like Mounita, Devangshu and Kaustav use Chrome DevTools
            daily as guided by <strong>Sukanta Hui</strong>.
          </p>

          {/* SECTION 1 — INTRO */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-2">1. Opening DevTools</h2>

            <p className="text-slate-300 text-sm">You can open DevTools using:</p>

            <ul className="list-disc ml-5 text-slate-300 text-sm mt-2 space-y-1">
              <li><strong>F12</strong></li>
              <li><strong>Ctrl + Shift + I</strong></li>
              <li>Right-click → Inspect</li>
            </ul>

            <p className="text-slate-400 text-xs mt-2">
              DevTools helps you pause code, inspect variables and track the execution path.
            </p>
          </section>

          {/* SECTION 2 — EXAMPLE CODE */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">2. Sample Code to Debug</h2>

            <CodeBlock
              language="javascript"
              code={`function calculateTotal(marks) {
  let total = 0;

  for (let m of marks) {
    total += m;
  }

  return total;
}

const student = {
  name: "Ritaja",
  marks: [78, 85, 92]
};

console.log(calculateTotal(student.marks));
`}
            />

            <p className="text-slate-300 text-sm mt-2">
              We will use this code to learn breakpoints and stepping.
            </p>
          </section>

          {/* SECTION 3 — BREAKPOINTS */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">
              3. Setting Breakpoints
            </h2>

            <p className="text-slate-300 text-sm mb-3">
              A breakpoint pauses the execution at a specific line so you can
              inspect data.
            </p>

            <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
              <li>Open the **Sources** panel.</li>
              <li>Click the line number to add a **blue marker**.</li>
              <li>Reload the page to pause execution.</li>
            </ul>

            <p className="text-slate-400 text-xs mt-2">
              Students often pause inside loops to see how variables like
              <code>total</code> are changing step-by-step.
            </p>
          </section>

          {/* SECTION 4 — STEPPING */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">
              4. Stepping Through Code
            </h2>

            <p className="text-slate-300 text-sm">
              DevTools provides several stepping options:
            </p>

            <ul className="list-disc ml-5 text-slate-300 text-sm mt-2 space-y-1">
              <li><strong>Step Over</strong> → execute next line</li>
              <li><strong>Step Into</strong> → dive into function calls</li>
              <li><strong>Step Out</strong> → exit current function</li>
              <li><strong>Resume</strong> → continue until next breakpoint</li>
            </ul>

            <p className="text-slate-400 text-xs mt-2">
              For example, Step Into helps track how <code>calculateTotal()</code> executes.
            </p>
          </section>

          {/* SECTION 5 — WATCH */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">
              5. Watch Expressions
            </h2>

            <p className="text-slate-300 text-sm mb-3">
              The **Watch** panel lets you monitor values continuously.
            </p>

            <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
              <li>Add <code>total</code> to watch its change inside loop.</li>
              <li>Add <code>student.name</code> to track object updates.</li>
              <li>Add <code>marks</code> to verify array values.</li>
            </ul>

            <p className="text-slate-400 text-xs mt-2">
              This is extremely useful during debugging lessons with students like
              Swadeep or Susmita.
            </p>
          </section>

          {/* SECTION 6 — CALL STACK */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold">
              6. Understanding the Call Stack
            </h2>

            <p className="text-slate-300 text-sm mb-3">
              The **Call Stack** shows the execution order of functions.
            </p>

            <CodeBlock
              language="javascript"
              code={`function step1() { step2(); }
function step2() { step3(); }
function step3() { console.log("Done"); }

step1();
`}
            />

            <p className="text-slate-400 text-xs mt-2">
              DevTools will show:
              <br />
              step3 → step2 → step1  
              (reverse order because the latest call is on top).
            </p>
          </section>

          {/* SECTION 7 — CONCLUSION */}
          <section className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-2">Conclusion</h2>
            <p className="text-slate-300 text-sm">
              DevTools is your best friend.  
              With practice, students of Coder & AccoTax can debug any issue by
              checking:
            </p>

            <ul className="list-disc ml-5 text-slate-300 text-sm mt-2 space-y-1">
              <li>Breakpoints</li>
              <li>Step controls</li>
              <li>Watch values</li>
              <li>Call stack</li>
              <li>Console logs</li>
            </ul>
          </section>

        </div>
      </div>
    );
  }
}
