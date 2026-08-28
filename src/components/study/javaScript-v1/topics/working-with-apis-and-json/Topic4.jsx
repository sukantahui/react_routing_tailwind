import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic4 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          Handling Responses, Errors &amp; Loading States
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          In a real front-end app, it&apos;s not enough to just call{" "}
          <code>fetch()</code>. You must also handle:
        </p>

        <ul className="list-disc ml-5 text-slate-300 text-sm space-y-1">
          <li><strong>Loading state</strong> – while waiting for response.</li>
          <li><strong>Success state</strong> – when data is loaded.</li>
          <li><strong>Error state</strong> – network or HTTP errors.</li>
        </ul>

        <h3 className="text-lg font-semibold text-slate-200">
          1. Conceptual Example (Pseudo React)
        </h3>

        <CodeBlock
          language="javascript"
          code={`async function loadStudent() {
  let loading = true;
  let error = null;
  let data = null;

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/3");

    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }

    data = await res.json();
  } catch (err) {
    error = err.message;
  } finally {
    loading = false;
  }

  console.log({ loading, error, data });
}

loadStudent();`}
        />

        <p className="text-slate-300 text-sm">
          In React, you would typically store <code>loading</code>,{" "}
          <code>error</code> and <code>data</code> in state and show different UI
          based on these.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          2. Differentiating Network vs HTTP Errors
        </h3>

        <CodeBlock
          language="javascript"
          code={`async function safeFetch(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      // HTTP error (like 404, 500)
      console.log("HTTP error:", res.status);
      return;
    }

    const data = await res.json();
    console.log("Data received:", data);
  } catch (error) {
    // Network error (no internet, DNS failure etc.)
    console.log("Network error:", error.message);
  }
}

safeFetch("https://jsonplaceholder.typicode.com/users/999999");`}
        />

        <section className="p-4 bg-slate-900/40 border border-slate-800 rounded-2xl">
          <h4 className="text-sm font-semibold text-slate-100">
            Good UI Practices (for your future projects)
          </h4>
          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li>Show a spinner or &quot;Loading student data...&quot; message.</li>
            <li>Show friendly error messages (not just raw status codes).</li>
            <li>Provide a retry button if loading fails.</li>
          </ul>
        </section>
      </div>
    );
  }
}
