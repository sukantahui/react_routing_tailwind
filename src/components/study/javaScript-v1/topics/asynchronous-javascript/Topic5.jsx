import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic5 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          async / await &amp; Error Handling with try / catch
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          <strong>async/await</strong> is a cleaner way to work with Promises.
          It lets you write asynchronous code that <em>looks</em> like synchronous
          code, which is easier for students to read and understand.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          1. Converting a Promise Chain to async/await
        </h3>

        <CodeBlock
          language="javascript"
          code={`function getStudent(name) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name, centre: "Coder & AccoTax" }), 700);
  });
}

function getMarks(name) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name, js: 93 }), 700);
  });
}

// Using async/await
async function showStudentReport() {
  console.log("Loading report for Susmita...");

  const student = await getStudent("Susmita");
  console.log("Student:", student);

  const marks = await getMarks(student.name);
  console.log("Marks:", marks);

  console.log("Report loaded for", student.name);
}

showStudentReport();`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          2. Error Handling with try / catch
        </h3>

        <CodeBlock
          language="javascript"
          code={`function getResult(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.3; // 70% success
      if (success) {
        resolve({ name, total: 280 });
      } else {
        reject("Network error while fetching result");
      }
    }, 800);
  });
}

async function showResult() {
  try {
    console.log("Fetching result for Kaustav...");
    const result = await getResult("Kaustav");
    console.log("Result:", result);
  } catch (error) {
    console.log("Error:", error);
  } finally {
    console.log("Result request finished (Coder & AccoTax).");
  }
}

showResult();`}
        />

        <section className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
          <h4 className="text-sm font-semibold text-slate-100">
            Rules for async / await
          </h4>
          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Use <code>async</code> before function to enable <code>await</code>.</li>
            <li><code>await</code> can only be used inside async functions.</li>
            <li>Wrap your awaits in <code>try / catch</code> for proper error handling.</li>
          </ul>
        </section>
      </div>
    );
  }
}
