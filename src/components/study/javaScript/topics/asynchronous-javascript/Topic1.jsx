import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic1 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          JavaScript Runtime: Call Stack &amp; Task Queue (Conceptual)
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          JavaScript runs in an environment (browser or Node.js) which provides:
        </p>

        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li><strong>Call Stack</strong> – where your functions run.</li>
          <li><strong>Web APIs / Environment</strong> – timers, fetch, etc.</li>
          <li><strong>Task Queue / Callback Queue</strong> – waiting callbacks.</li>
          <li><strong>Event Loop</strong> – moves tasks from queue to stack.</li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-200">
          1. Call Stack Example
        </h3>

        <CodeBlock
          language="javascript"
          code={`function greetStudent(name) {
  console.log("Hello", name);
}

function startClass() {
  greetStudent("Kaustav");
}

console.log("Class starting...");
startClass();
console.log("Class ended.");

/*
Rough call stack order:
- global()
- startClass()
- greetStudent()
*/`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          2. Call Stack with setTimeout (Concept)
        </h3>

        <CodeBlock
          language="javascript"
          code={`console.log("1. Start");

setTimeout(() => {
  console.log("2. Async task: loading marks for Susmita");
}, 0);

console.log("3. End");

/*
Conceptual steps:
- console.log("1. Start") runs on stack.
- setTimeout(...) registers timer in Web APIs, callback goes to task queue.
- console.log("3. End") runs.
- Event loop moves callback from queue to stack when stack is empty.
*/`}
        />

        <p className="text-slate-400 text-sm">
          Even with <code>0</code> ms delay, the callback waits until the stack is free.
        </p>

        <section className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
          <h4 className="text-sm font-semibold text-slate-100">
            Simplified Mental Model
          </h4>
          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li><strong>Call Stack</strong>: What is executing right now.</li>
            <li><strong>Web APIs</strong>: Timers, fetch, DOM events, etc.</li>
            <li><strong>Task Queue</strong>: Callbacks waiting to run.</li>
            <li><strong>Event Loop</strong>: If stack is empty, move next task in.</li>
          </ul>
        </section>
      </div>
    );
  }
}
