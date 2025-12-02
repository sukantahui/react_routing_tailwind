import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          Creating &amp; Consuming Promises
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          In real-world applications (like Coder &amp; AccoTax dashboards),
          you will often <strong>create</strong> your own Promises and{" "}
          <strong>consume</strong> them with <code>.then()</code> and{" "}
          <code>.catch()</code>.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          1. Wrapping setTimeout in a Promise
        </h3>

        <CodeBlock
          language="javascript"
          code={`function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

delay(1000).then(() => {
  console.log("1 second over, continuing...");
});`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          2. Simulate Fetching Student Details
        </h3>

        <CodeBlock
          language="javascript"
          code={`function getStudent(name) {
  return new Promise((resolve, reject) => {
    console.log("Fetching data for", name);

    setTimeout(() => {
      const found = true;
      if (found) {
        resolve({
          name,
          centre: "Coder & AccoTax",
          city: "Barrackpore"
        });
      } else {
        reject("Student not found");
      }
    }, 1000);
  });
}

getStudent("Swadeep")
  .then((student) => {
    console.log("Student info:", student);
  })
  .catch((error) => {
    console.log("Error:", error);
  });`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          3. Chaining Promises
        </h3>

        <CodeBlock
          language="javascript"
          code={`function getMarks(name) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name, js: 92, es6: 95 }), 800);
  });
}

getStudent("Pranjali")
  .then((student) => {
    console.log("Profile loaded:", student);
    return getMarks(student.name);
  })
  .then((marks) => {
    console.log("Marks loaded:", marks);
  })
  .catch((error) => {
    console.log("Error:", error);
  });`}
        />

        <section className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
          <h4 className="text-sm font-semibold text-slate-100">
            Good Practices
          </h4>
          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Always handle <code>.catch()</code> for errors.</li>
            <li>Keep promise functions small and focused.</li>
            <li>Return promises from within <code>.then()</code> to chain them.</li>
          </ul>
        </section>
      </div>
    );
  }
}
