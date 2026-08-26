import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

/**
 * Topic4.jsx
 * ----------------------------------------------------
 * Topic 5: Function Call and Flow of Execution
 * React 19 - Class Based Component
 * Tailwind CSS (NO config, NO plugins)
 * ----------------------------------------------------
 */

export default class Topic4 extends Component {
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
            Function Call and Flow of Execution
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            Understanding how control moves during a function call is critical.
            This topic explains <strong>who calls whom</strong>, 
            <strong> where execution pauses</strong>, and 
            <strong> how control returns</strong>.
          </p>
        </header>

        {/* ================= CORE CONCEPT ================= */}
        <section className={`${baseSection} animation-delay-[120ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-emerald-400/40`}
          >
            <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
              What is a Function Call?
            </h2>

            <p className="mb-3">
              A <strong>function call</strong> is the moment when one part of the program
              requests another function to execute its logic.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              At this point, control temporarily leaves the calling function.
            </p>
          </div>
        </section>

        {/* ================= FLOW OVERVIEW ================= */}
        <section className={`${baseSection} animation-delay-[240ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 hover:ring-indigo-400/40`}
          >
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
              Overall Flow of Execution
            </h3>

            <ol className="list-decimal ml-5 space-y-2">
              <li>Program starts from <code>main()</code></li>
              <li>A function call is encountered</li>
              <li>Arguments are passed to the function</li>
              <li>Control jumps to the function definition</li>
              <li>Function executes its statements</li>
              <li>Return value is sent back</li>
              <li>Execution resumes after the call</li>
            </ol>
          </div>
        </section>

        {/* ================= REAL WORLD ANALOGY ================= */}
        <section className={`${baseSection} animation-delay-[360ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 hover:ring-sky-400/40`}
          >
            <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-300 mb-3">
              Real-World Analogy
            </h3>

            <p className="mb-2">
              In a school at <strong>Ichapur</strong>, a student (Swadeep)
              asks the clerk for a certificate.
            </p>

            <p className="mb-2">
              The clerk pauses current work, processes the request,
              hands over the certificate, and resumes previous work.
            </p>

            <p>
              That pause-process-resume cycle is exactly how a function call works.
            </p>
          </div>
        </section>

        {/* ================= TECHNICAL DETAILS ================= */}
        <section className={`${baseSection} animation-delay-[480ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-cyan-400/40`}
          >
            <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
              Technical Explanation
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Caller:</strong> Function that makes the call</li>
              <li><strong>Callee:</strong> Function being called</li>
              <li><strong>Arguments:</strong> Values passed during call</li>
              <li><strong>Return value:</strong> Result sent back</li>
              <li><strong>Call stack:</strong> Keeps track of execution state</li>
            </ul>
          </div>
        </section>

        {/* ================= CODE EXAMPLE ================= */}
        <section className={`${baseSection} animation-delay-[600ms] max-w-5xl mx-auto`}>
          <EditableCCodeBlock
            title="Function Call Flow Example"
            code={`#include <stdio.h>

void greet() {
    printf("Inside greet()\\n");
}

int main() {
    printf("Start main()\\n");
    greet();                 // function call
    printf("Back to main()\\n");
    return 0;
}`}
          />
        </section>

        {/* ================= STEP-BY-STEP ================= */}
        <section className={`${baseSection} animation-delay-[720ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 hover:ring-emerald-400/40`}
          >
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
              Step-by-Step Execution
            </h3>

            <ol className="list-decimal ml-5 space-y-2">
              <li><code>main()</code> starts execution</li>
              <li><code>greet()</code> is called</li>
              <li>Control jumps to <code>greet()</code></li>
              <li><code>printf</code> executes</li>
              <li><code>greet()</code> ends</li>
              <li>Control returns to <code>main()</code></li>
            </ol>
          </div>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className={`${baseSection} animation-delay-[840ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 hover:ring-rose-400/40`}
          >
            <h3 className="text-lg font-semibold text-rose-700 dark:text-rose-300 mb-3">
              Common Beginner Mistakes
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li>Assuming execution continues inside both functions together</li>
              <li>Forgetting that caller pauses during execution</li>
              <li>Misunderstanding return flow</li>
              <li>Ignoring function call order</li>
            </ul>
          </div>
        </section>

        {/* ================= HINT ================= */}
        <section className={`${baseSection} animation-delay-[960ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 hover:ring-sky-400/40`}
          >
            <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-300 mb-2">
              💡 Hint
            </h3>

            <p>
              Add multiple function calls and print messages before and after each call.
              Observe the exact output order carefully.
            </p>
          </div>
        </section>

        {/* ================= MINI CHECKLIST ================= */}
        <section className={`${baseSection} animation-delay-[1080ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:ring-slate-400/40`}
          >
            <h3 className="text-lg font-semibold mb-3">
              ✔ What You Must Remember
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li>Execution always pauses at a function call</li>
              <li>Only one function executes at a time</li>
              <li>Control always returns to the caller</li>
              <li>Order of calls defines program flow</li>
            </ul>
          </div>
        </section>

        {/* ================= TEACHER'S NOTE ================= */}
        <section className={`${baseSection} animation-delay-[1200ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700 hover:ring-yellow-400/60`}
          >
            <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
              🧑‍🏫 Teacher’s Note
            </h3>

            <p className="mb-2">
              Many execution-order bugs come from misunderstanding function flow.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Always trace calls on paper — professionals still do.
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
