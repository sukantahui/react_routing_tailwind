import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic3 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          Promises: States &amp; then / catch / finally
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          A <strong>Promise</strong> represents a value that may be available
          now, later, or never. It has 3 main states:
        </p>

        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li><strong>pending</strong> – still working</li>
          <li><strong>fulfilled</strong> – completed successfully</li>
          <li><strong>rejected</strong> – failed with an error</li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-200">
          1. Creating a Simple Promise
        </h3>

        <CodeBlock
          language="javascript"
          code={`const loadMarks = new Promise((resolve, reject) => {
  console.log("Fetching marks for Mounita from server...");

  setTimeout(() => {
    const success = true;
    if (success) {
      resolve(96);  // fulfilled
    } else {
      reject("Unable to load marks");
    }
  }, 1000);
});`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          2. then() and catch()
        </h3>

        <CodeBlock
          language="javascript"
          code={`loadMarks
  .then((marks) => {
    console.log("Marks received:", marks);
  })
  .catch((error) => {
    console.log("Error:", error);
  });`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          3. finally()
        </h3>

        <CodeBlock
          language="javascript"
          code={`loadMarks
  .then((marks) => {
    console.log("Success:", marks);
  })
  .catch((error) => {
    console.log("Failed:", error);
  })
  .finally(() => {
    console.log("Operation finished for student marks (Coder & AccoTax).");
  });`}
        />

        <section className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
          <h4 className="text-sm font-semibold text-slate-100">
            Why Promises are Better than Plain Callbacks
          </h4>
          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Flat chaining instead of deep nesting.</li>
            <li>Unified error handling with <code>.catch()</code>.</li>
            <li>Clean final step with <code>.finally()</code>.</li>
          </ul>
        </section>
      </div>
    );
  }
}
