import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          Callbacks &amp; the Problem of Callback Hell
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          A <strong>callback</strong> is a function passed as an argument to another
          function, to be executed later. This was the classic way to handle async
          tasks before Promises and async/await.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          1. Simple Callback Example
        </h3>

        <CodeBlock
          language="javascript"
          code={`function loadMarks(name, callback) {
  console.log("Loading marks for", name, "from server...");

  setTimeout(() => {
    const marks = 94;
    callback(marks);
  }, 1000);
}

loadMarks("Ritaja", function (marks) {
  console.log("Received marks:", marks);
});`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          2. Callback Hell (Pyramid of Doom)
        </h3>

        <p className="text-slate-300 text-sm">
          When we chain many async operations using callbacks, the code can become
          deeply nested and hard to read.
        </p>

        <CodeBlock
          language="javascript"
          code={`function loginStudent(name, cb) {
  setTimeout(() => {
    console.log("Logged in:", name);
    cb();
  }, 500);
}

function fetchProfile(name, cb) {
  setTimeout(() => {
    console.log("Fetched profile for:", name);
    cb();
  }, 500);
}

function fetchMarks(name, cb) {
  setTimeout(() => {
    console.log("Fetched marks for:", name);
    cb();
  }, 500);
}

// Callback Hell:
loginStudent("Devangshu", () => {
  fetchProfile("Devangshu", () => {
    fetchMarks("Devangshu", () => {
      console.log("Show dashboard for Devangshu");
    });
  });
});`}
        />

        <p className="text-slate-400 text-sm">
          This “pyramid” shape becomes very hard to maintain when real data,
          error handling and conditions are added.
        </p>

        <section className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
          <h4 className="text-sm font-semibold text-slate-100">
            Problems with Callback Hell
          </h4>
          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Hard to read and reason about.</li>
            <li>Difficult error handling.</li>
            <li>Nested logic is complicated to change.</li>
          </ul>
          <p className="text-slate-400 text-xs mt-2">
            Promises and async/await were introduced to solve these problems.
          </p>
        </section>
      </div>
    );
  }
}
