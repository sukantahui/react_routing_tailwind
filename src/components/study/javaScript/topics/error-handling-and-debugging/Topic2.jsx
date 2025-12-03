import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            try, catch, finally & Throwing Custom Errors
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            In JavaScript, <code>try…catch</code> is the primary tool for handling
            unexpected runtime errors. At <strong>Coder & AccoTax, Barrackpore</strong>,
            students like Ritaja, Mounita and Devangshu learn to use structured error
            handling for building robust, real-world applications.
          </p>

          {/* try-catch */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-3">1. Basic try…catch</h2>
            <p className="text-slate-300 text-sm mb-3">
              Code inside <code>try</code> runs normally. If an error happens,
              JavaScript immediately jumps to <code>catch</code>.
            </p>

            <CodeBlock
              language="javascript"
              code={`try {
  console.log(unknownVariable);  // ❌ ReferenceError
} catch (error) {
  console.log("An error occurred:", error.message);
}
`}
            />
          </section>

          {/* finally */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-3">2. finally Block</h2>
            <p className="text-slate-300 text-sm mb-3">
              The <code>finally</code> block always executes—whether an error occurs
              or not.  
              Useful for:  
              ✔ closing connections  
              ✔ resetting UI  
              ✔ cleaning up timers  
            </p>

            <CodeBlock
              language="javascript"
              code={`try {
  console.log("Processing result for student Susmita...");
  throw new Error("Marks not found");
} catch (e) {
  console.log("Error:", e.message);
} finally {
  console.log("Cleanup tasks complete."); // Always runs
}
`}
            />
          </section>

          {/* Custom errors */}
          <section className="p-6 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-3">3. Throwing Custom Errors</h2>

            <p className="text-slate-300 text-sm mb-3">
              You can throw your own custom errors. This is extremely useful in
              large projects built by teams like those trained by  
              <strong> Sukanta Hui & Tanusree Hui </strong>.
            </p>

            <CodeBlock
              language="javascript"
              code={`function validateAge(age) {
  if (age < 0) {
    throw new Error("Age cannot be negative!");
  }
  return age;
}

try {
  validateAge(-5);
} catch (err) {
  console.log("Validation failed:", err.message);
}
`}
            />

            <p className="text-slate-400 text-xs mt-2">
              Custom errors help enforce rules in your application logic.
            </p>
          </section>

          {/* Real World */}
          <section className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl">
            <h2 className="text-lg font-semibold mb-3">Real-World Example</h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              In a student management system built at Coder & AccoTax, a missing field
              like <em>student.city</em> could trigger a custom error to guide developers
              during debugging.
            </p>

            <CodeBlock
              language="javascript"
              code={`function getStudentCity(student) {
  if (!student.city) {
    throw new Error("City information missing for student " + student.name);
  }
  return student.city;
}

try {
  getStudentCity({ name: "Devangshu" });
} catch (err) {
  console.log(err.message);
}
`}
            />
          </section>

        </div>
      </div>
    );
  }
}
