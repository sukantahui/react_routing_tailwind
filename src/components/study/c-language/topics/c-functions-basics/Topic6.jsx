import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

/**
 * Topic6.jsx
 * ----------------------------------------------------
 * Topic 7: Actual Parameters and Formal Parameters
 * ----------------------------------------------------
 * This topic builds a STRONG mental model of:
 * - where values originate
 * - how they travel during a function call
 * - where memory is created
 * - why changes may or may not reflect back
 * ----------------------------------------------------
 */

export default class Topic6 extends Component {
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
      "opacity-0 translate-y-6 motion-safe:animate-[fadeUp_0.9s_ease-out_forwards]";
    const cardBase =
      "rounded-xl border p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:ring-1";

    return (
      <div className="space-y-20 px-4 md:px-6 py-10 text-slate-800 dark:text-slate-200 leading-relaxed">

        {/* ======================================================
            HEADER
        ====================================================== */}
        <header className={`${baseSection} animation-delay-[0ms] max-w-4xl mx-auto`}>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-indigo-600 dark:text-indigo-400">
            Actual Parameters and Formal Parameters
          </h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            This topic explains one of the <strong>most misunderstood concepts</strong>
            in C programming: how data moves between the calling function and the
            called function, and why values often <em>do not change</em> as beginners expect.
          </p>
        </header>

        {/* ======================================================
            CORE DEFINITIONS (EXPANDED)
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[120ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-emerald-400/40`}>
            <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
              Fundamental Definitions (Read Carefully)
            </h2>

            <p className="mb-3">
              In C, when a function is called, values are exchanged between two
              different contexts. These values are categorized as:
            </p>

            <ul className="list-disc ml-6 space-y-3">
              <li>
                <strong>Actual Parameters:</strong>  
                The variables or values written inside the function call.
                They belong to the <strong>calling function</strong>.
              </li>
              <li>
                <strong>Formal Parameters:</strong>  
                The variables declared in the function definition.
                They belong to the <strong>called function</strong>.
              </li>
            </ul>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Important: These two never share the same memory location by default.
            </p>
          </div>
        </section>

        {/* ======================================================
            SVG: MEMORY & STACK VIEW
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[240ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-indigo-400/40`}>
            <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              Memory View: How Actual Parameters Become Formal Parameters
            </h2>

            <svg
              viewBox="0 0 1000 320"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
              aria-label="Actual and Formal Parameter Memory Diagram"
            >
              {/* CALLER STACK */}
              <rect x="60" y="70" width="340" height="180" rx="16"
                className="fill-sky-100 dark:fill-sky-900 stroke-sky-400 dark:stroke-sky-600" />
              <text x="230" y="105" textAnchor="middle"
                className="fill-sky-700 dark:fill-sky-300 font-semibold">
                Caller Stack Frame (main)
              </text>
              <text x="230" y="145" textAnchor="middle"
                className="fill-slate-600 dark:fill-slate-400 text-sm">
                a = 5   (Actual Parameter)
              </text>
              <text x="230" y="175" textAnchor="middle"
                className="fill-slate-600 dark:fill-slate-400 text-sm">
                b = 10  (Actual Parameter)
              </text>

              {/* ARROW */}
              <line x1="400" y1="160" x2="520" y2="160"
                strokeWidth="2"
                className="stroke-slate-500 dark:stroke-slate-400" />
              <polygon points="520,160 506,152 506,168"
                className="fill-slate-500 dark:fill-slate-400">
                <animate
                  attributeName="opacity"
                  from="0.4"
                  to="1"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </polygon>

              {/* CALLEE STACK */}
              <rect x="520" y="70" width="340" height="180" rx="16"
                className="fill-emerald-100 dark:fill-emerald-900 stroke-emerald-400 dark:stroke-emerald-600" />
              <text x="690" y="105" textAnchor="middle"
                className="fill-emerald-700 dark:fill-emerald-300 font-semibold">
                Callee Stack Frame (Function)
              </text>
              <text x="690" y="145" textAnchor="middle"
                className="fill-slate-600 dark:fill-slate-400 text-sm">
                x = 5   (Formal Parameter)
              </text>
              <text x="690" y="175" textAnchor="middle"
                className="fill-slate-600 dark:fill-slate-400 text-sm">
                y = 10  (Formal Parameter)
              </text>
            </svg>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              ✔ Values are <strong>copied</strong>, not shared.  
              ✔ Two separate stack frames exist at runtime.
            </p>
          </div>
        </section>

        {/* ======================================================
            STEP-BY-STEP EXECUTION (DETAILED)
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[360ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 hover:ring-indigo-400/40`}>
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
              Step-by-Step: What Happens During the Function Call
            </h3>

            <ol className="list-decimal ml-6 space-y-3">
              <li>The calling function (<code>main()</code>) already has its own variables.</li>
              <li>The function call is encountered.</li>
              <li>A new stack frame is created for the called function.</li>
              <li>Formal parameters are created inside that new stack frame.</li>
              <li>Values of actual parameters are copied into formal parameters.</li>
              <li>The function executes using its own local copies.</li>
              <li>The function ends, and its stack frame is destroyed.</li>
              <li>Control returns to the caller with original values unchanged.</li>
            </ol>
          </div>
        </section>

        {/* ======================================================
            CODE EXAMPLE (ANNOTATED)
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[480ms] max-w-5xl mx-auto`}>
          <EditableCCodeBlock
            title="Actual vs Formal Parameters (Annotated Example)"
            code={`#include <stdio.h>

void modify(int x) {   // formal parameter
    x = 100;           // modifies local copy only
}

int main() {
    int a = 10;        // actual parameter
    modify(a);
    printf("%d", a);   // still prints 10
    return 0;
}`}
          />
        </section>

        {/* ======================================================
            COMMON MISCONCEPTIONS (EXPANDED)
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[600ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 hover:ring-rose-400/40`}>
            <h3 className="text-lg font-semibold text-rose-700 dark:text-rose-300 mb-4">
              Common Misconceptions That Cause Bugs
            </h3>

            <ul className="list-disc ml-6 space-y-3">
              <li>Formal parameters are aliases of actual parameters ❌</li>
              <li>Changing a formal parameter changes the caller’s variable ❌</li>
              <li>Parameter names must match argument names ❌</li>
              <li>Memory is shared automatically ❌</li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            PROFESSIONAL TIPS
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[720ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 hover:ring-emerald-400/40`}>
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 mb-4">
              Tips & Tricks Used by Professionals
            </h3>

            <ul className="list-disc ml-6 space-y-3">
              <li>Always assume parameters are independent unless pointers are used.</li>
              <li>Draw stack frames on paper while debugging.</li>
              <li>If a value must change, rethink your parameter strategy.</li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            HINT SECTION
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[840ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800`}>
            <h3 className="font-semibold text-sky-700 dark:text-sky-300 mb-2">
              💡 Hint (Think Carefully)
            </h3>
            <p>
              Try printing addresses of variables using <code>&</code>.
              Observe whether addresses are the same or different.
            </p>
          </div>
        </section>

        {/* ======================================================
            TEACHER'S NOTE (EXPANDED)
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[960ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700 hover:ring-yellow-400/60`}>
            <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">
              🧑‍🏫 Teacher’s Note
            </h3>

            <p className="text-sm mb-2">
              Most pointer-related confusion starts here.
              If students skip understanding this topic deeply,
              everything later feels magical and unsafe.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Once stack-frame separation is clear,
              advanced topics become logical instead of scary.
            </p>
          </div>
        </section>

        {/* ======================================================
            KEYFRAMES
        ====================================================== */}
        <style>{`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(28px);
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
