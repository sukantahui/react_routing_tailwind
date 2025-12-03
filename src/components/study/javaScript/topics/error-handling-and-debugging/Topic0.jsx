import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Introduction to Error Handling, Debugging & Code Quality
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Before students like Ritaja, Mounita, Devangshu or Kaustav write
            professional-level JavaScript, they must understand how to identify,
            handle and fix errors. At <strong>Coder & AccoTax, Barrackpore</strong>,
            Sukanta Hui always emphasizes that <em>“Errors are not failures,
            they are guideposts.”</em>
          </p>

          <section className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-2">Why Error Handling Matters?</h2>

            <p className="text-slate-300 text-sm mb-3">
              Errors are inevitable in any program. A great developer doesn’t
              avoid errors—they learn to understand and control them.
            </p>

            <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
              <li>Prevents app crashes</li>
              <li>Makes debugging easier</li>
              <li>Improves user experience</li>
              <li>Helps write secure and reliable software</li>
              <li>Encourages clean and maintainable code</li>
            </ul>
          </section>

          <section className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-2">A Simple Error Example</h2>

            <CodeBlock
              language="javascript"
              code={`
// A mistake made by many beginners:
function greet(name) {
  console.log("Hello " + Name); // ❌ Name is not defined (capital N)
}

greet("Susmita");
              `}
            />

            <p className="text-slate-400 text-xs mt-2">
              This results in a <strong>ReferenceError</strong> because variable
              <code>Name</code> does not exist. Debugging teaches students to catch
              such mistakes quickly.
            </p>
          </section>

          <section className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-2">What You Will Learn in This Module</h2>

            <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
              <li>Types of JavaScript errors</li>
              <li>Using <code>try</code>, <code>catch</code>, and <code>finally</code></li>
              <li>Understanding browser error messages</li>
              <li>Using DevTools to debug code</li>
              <li>Improving code style and quality</li>
              <li>Concepts of linters and formatters (ESLint, Prettier)</li>
            </ul>
          </section>

          <section className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-2">Real-World Thought</h2>

            <p className="text-slate-300 text-sm">
              Debugging is not just fixing errors—it's a way of thinking.  
              Students of <strong>Coder & AccoTax</strong> learn to investigate issues
              step by step, just like professional developers working on live
              systems.
            </p>
          </section>

        </div>
      </div>
    );
  }
}
