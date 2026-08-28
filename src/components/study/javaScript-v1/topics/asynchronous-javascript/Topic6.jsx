import React, { Component } from "react";
import CodeBlock from "../../../../../common/CodeBlock";

export default class Topic6 extends Component {
  render() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-sky-300">
          Common Patterns with Async Functions
        </h2>

        <p className="text-slate-300 text-sm leading-relaxed">
          Once you understand Promises and async/await, you can combine them in
          powerful ways. Here are some patterns that are very useful in real apps
          and in Coder &amp; AccoTax projects.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          1. Parallel Requests with Promise.all
        </h3>

        <CodeBlock
          language="javascript"
          code={`function getMarks(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name, js: 90 + Math.floor(Math.random() * 10) });
    }, 800);
  });
}

async function loadAllMarks() {
  console.log("Loading marks for multiple students...");

  const [r1, r2, r3] = await Promise.all([
    getMarks("Ritaja"),
    getMarks("Mounita"),
    getMarks("Devangshu")
  ]);

  console.log("Results:", r1, r2, r3);
}

loadAllMarks();`}
        />

        <p className="text-slate-400 text-sm">
          All three requests run in parallel, and we wait for all of them together.
        </p>

        <h3 className="text-lg font-semibold text-slate-200">
          2. Sequential Async Steps (One after Another)
        </h3>

        <CodeBlock
          language="javascript"
          code={`function step(msg, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(msg);
      resolve();
    }, ms);
  });
}

async function runSteps() {
  await step("Step 1: Login as Susmita", 500);
  await step("Step 2: Load profile", 600);
  await step("Step 3: Load marks", 700);
  console.log("All steps finished.");
}

runSteps();`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          3. Retrying on Failure (Simple Pattern)
        </h3>

        <CodeBlock
          language="javascript"
          code={`function fetchReportOnce() {
  return new Promise((resolve, reject) => {
    const ok = Math.random() > 0.6;
    setTimeout(() => {
      if (ok) resolve("Report data for Swadeep");
      else reject("Temporary server error");
    }, 500);
  });
}

async function fetchWithRetry(retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log("Attempt", attempt);
      const data = await fetchReportOnce();
      console.log("Success:", data);
      return;
    } catch (err) {
      console.log("Failed:", err);
      if (attempt === retries) {
        console.log("All attempts failed.");
      }
    }
  }
}

fetchWithRetry();`}
        />

        <h3 className="text-lg font-semibold text-slate-200">
          4. Async Utility Wrapper
        </h3>

        <CodeBlock
          language="javascript"
          code={`async function safeAsync(fn) {
  try {
    const result = await fn();
    return { ok: true, result };
  } catch (error) {
    return { ok: false, error };
  }
}

// Usage:
safeAsync(() => getMarks("Kaustav"))
  .then((res) => {
    if (res.ok) {
      console.log("Marks:", res.result);
    } else {
      console.log("Error:", res.error);
    }
  });`}
        />

        <section className="p-4 bg-slate-900/40 rounded-2xl border border-slate-800">
          <h4 className="text-sm font-semibold text-slate-100">
            Async Patterns Summary
          </h4>
          <ul className="list-disc ml-5 mt-2 text-slate-300 text-sm space-y-1">
            <li><code>Promise.all</code> for parallel work.</li>
            <li>Plain <code>await</code> in sequence for ordered steps.</li>
            <li>Retry loops for unstable networks.</li>
            <li>Wrapper functions (like safeAsync) to unify error handling.</li>
          </ul>
        </section>
      </div>
    );
  }
}
