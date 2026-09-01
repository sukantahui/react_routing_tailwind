import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

/**
 * Topic3.jsx
 * ----------------------------------------------------
 * Topic 4: Function Definition – Structure and Components
 * React 19 - Class Based Component
 * Tailwind CSS (NO config, NO plugins)
 * ----------------------------------------------------
 */

export default class Topic3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    this.setState({ visible: true });
  }

  render() {
    const baseSection =
      "opacity-0 translate-y-6 motion-safe:animate-[fadeUp_0.8s_ease-out_forwards]";
    const cardBase =
      "rounded-xl border p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:ring-1";

    return (
      <div className="space-y-16 px-4 md:px-6 py-10 text-slate-800 dark:text-slate-200 leading-relaxed">

        {/* ================= HEADER ================= */}
        <header
          className={`${baseSection} animation-delay-[0ms] max-w-4xl mx-auto space-y-4`}
        >
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-indigo-600 dark:text-indigo-400">
            Function Definition – Structure and Components
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            A function definition is where the <strong>actual work</strong> happens.
            This topic breaks down every part of a function body clearly and safely.
          </p>
        </header>

        {/* ================= CORE CONCEPT ================= */}
        <section className={`${baseSection} animation-delay-[120ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-emerald-400/40`}
          >
            <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
              What is a Function Definition?
            </h2>

            <p className="mb-3">
              A <strong>function definition</strong> provides the complete
              implementation of a function — it contains the logic
              that executes when the function is called.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Unlike a prototype, the definition includes the function body.
            </p>
          </div>
        </section>

        {/* ================= STRUCTURE ================= */}
        <section className={`${baseSection} animation-delay-[240ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 hover:ring-indigo-400/40`}
          >
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
              Structure of a Function Definition
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Return type</strong> – value sent back to caller</li>
              <li><strong>Function name</strong> – identifier used to call it</li>
              <li><strong>Parameter list</strong> – inputs received</li>
              <li><strong>Function body</strong> – executable statements</li>
              <li><strong>Return statement</strong> – exits the function</li>
            </ul>
          </div>
        </section>

        {/* ================= SYNTAX ================= */}
        <section className={`${baseSection} animation-delay-[360ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-cyan-400/40`}
          >
            <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
              General Syntax
            </h3>

            <pre className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-sm overflow-x-auto">
{`returnType functionName(parameterType param1, parameterType param2) {
    // function body
    return value;
}`}
            </pre>
          </div>
        </section>

        {/* ================= CODE EXAMPLE ================= */}
        <section className={`${baseSection} animation-delay-[480ms] max-w-5xl mx-auto`}>
          <EditableCCodeBlock
            title="Function Definition Example"
            code={`#include <stdio.h>

int add(int a, int b) {   // function definition
    int sum = a + b;     // local variable
    return sum;          // return result
}

int main() {
    printf("%d", add(10, 20));
    return 0;
}`}
          />
        </section>

        {/* ================= EXECUTION FLOW ================= */}
        <section className={`${baseSection} animation-delay-[600ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 hover:ring-emerald-400/40`}
          >
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
              How Execution Works
            </h3>

            <ol className="list-decimal ml-5 space-y-2">
              <li>Function is called from <code>main()</code></li>
              <li>Control jumps to function body</li>
              <li>Statements execute line by line</li>
              <li><code>return</code> sends value back</li>
              <li>Control resumes after the call</li>
            </ol>
          </div>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className={`${baseSection} animation-delay-[720ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 hover:ring-rose-400/40`}
          >
            <h3 className="text-lg font-semibold text-rose-700 dark:text-rose-300 mb-3">
              Common Beginner Mistakes
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li>Mismatch between prototype and definition</li>
              <li>Missing return statement for non-void function</li>
              <li>Using global variables unnecessarily</li>
              <li>Writing very large function bodies</li>
            </ul>
          </div>
        </section>

        {/* ================= HINT ================= */}
        <section className={`${baseSection} animation-delay-[840ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 hover:ring-sky-400/40`}
          >
            <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-300 mb-2">
              💡 Hint
            </h3>

            <p>
              Try removing the <code>return</code> statement
              from a non-void function and observe the compiler warning.
            </p>
          </div>
        </section>

        {/* ================= MINI CHECKLIST ================= */}
        <section className={`${baseSection} animation-delay-[960ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:ring-slate-400/40`}
          >
            <h3 className="text-lg font-semibold mb-3">
              ✔ Key Takeaways
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li>Definition contains executable logic</li>
              <li>Must match prototype exactly</li>
              <li>Local variables live inside the function</li>
              <li>Return ends execution of the function</li>
            </ul>
          </div>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className={`${baseSection} animation-delay-[1080ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700 hover:ring-yellow-400/60`}
          >
            <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
              🧑‍🏫 Teacher’s Note
            </h3>

            <p className="mb-2">
              A clean function body is easier to debug than clever code.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              If your function cannot be explained in one sentence,
              it probably does too much.
            </p>
          </div>
        </section>

        {/* ================= KEYFRAMES ================= */}
        <style>{`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(24px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }
}
