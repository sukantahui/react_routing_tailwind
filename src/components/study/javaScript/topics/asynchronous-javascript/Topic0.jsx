import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic0 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          Synchronous vs Asynchronous Code
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          JavaScript is <strong>single-threaded</strong> and usually runs in a{" "}
          <strong>synchronous</strong> way – one line after another. But with
          timers, network requests and file operations, we often need{" "}
          <strong>asynchronous</strong> behaviour so that the program does not
          block. In Coder &amp; AccoTax projects, this is critical when fetching
          student data, marks, or reports from a server.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          1. Synchronous Code (Blocking)
        </h3>

        <CodeBlock
          language="javascript"
          code={`console.log("1. Start");

for (let i = 1; i <= 3; i++) {
  console.log("Loop count:", i);
}

console.log("2. End");

/*
Output:
1. Start
Loop count: 1
Loop count: 2
Loop count: 3
2. End
*/`}
        />

        <p className="text-slate-400 text-sm">
          Every line waits for the previous line to finish. If a task is slow,
          everything after it waits.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          2. Asynchronous Code (Non-Blocking)
        </h3>

        <p className="text-slate-300 text-sm">
          Asynchronous code allows long-running work to happen in the background
          (like a timer or API call) while the main thread continues.
        </p>

        <CodeBlock
          language="javascript"
          code={`console.log("1. Start");

setTimeout(() => {
  console.log("2. Loading marks for Ritaja...");
}, 1000);

console.log("3. End");

/*
Possible output:
1. Start
3. End
2. Loading marks for Ritaja...
*/`}
        />

        <p className="text-slate-400 text-sm">
          Notice how the <code>setTimeout</code> callback runs <em>later</em>,
          after the main code continues.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          3. Real-Life Analogy (Coder &amp; AccoTax)
        </h3>

        <p className="text-slate-300 text-sm">
          Imagine <strong>Ritaja</strong> submits an online test. The frontend:
        </p>
        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li>Shows “Saving your answers…”</li>
          <li>Sends data to the server in background (async)</li>
          <li>Meanwhile UI is still responsive; she can navigate</li>
        </ul>

        <section className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
          <h4 className="text-sm font-semibold text-slate-100">Key Points</h4>
          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Synchronous = one after another, blocking.</li>
            <li>Asynchronous = tasks scheduled for later, non-blocking.</li>
            <li>Async is essential for timers, network, file I/O, etc.</li>
          </ul>
        </section>
      </div>
    );
  }
}
