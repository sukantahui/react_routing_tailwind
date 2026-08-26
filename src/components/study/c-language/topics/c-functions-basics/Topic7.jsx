import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

/**
 * Topic7.jsx
 * ----------------------------------------------------
 * Topic 8: Return Statement – Rules and Limitations
 * ----------------------------------------------------
 * This topic explains:
 * - What return really does
 * - How execution control flows back
 * - Stack frame destruction
 * - What can and cannot be returned
 * - Common real-world bugs
 * ----------------------------------------------------
 */

export default class Topic7 extends Component {
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
            Return Statement – Rules and Limitations
          </h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            The <code>return</code> statement is far more than “sending a value back”.
            It controls <strong>function termination</strong>,
            <strong>execution flow</strong>, and
            <strong>stack memory cleanup</strong>.
          </p>
        </header>

        {/* ======================================================
            CONCEPTUAL FOUNDATION
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[120ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-emerald-400/40`}>
            <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
              What the return Statement Actually Does
            </h2>

            <p className="mb-3">
              When a <code>return</code> statement is executed inside a function,
              C performs <strong>three critical operations</strong> immediately:
            </p>

            <ol className="list-decimal ml-6 space-y-3">
              <li>The function stops executing instantly</li>
              <li>The control is transferred back to the caller</li>
              <li>The function’s stack frame is destroyed</li>
            </ol>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Any statement written after <code>return</code> is unreachable and ignored.
            </p>
          </div>
        </section>

        {/* ======================================================
            SVG: STACK UNWIND EXPLANATION
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[240ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-indigo-400/40`}>
            <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              Stack Behavior When return Executes
            </h2>

            <svg
              viewBox="0 0 1000 360"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
              aria-label="Return statement stack unwinding"
            >
              {/* CALLEE STACK */}
              <rect x="280" y="60" width="440" height="120" rx="16"
                className="fill-emerald-100 dark:fill-emerald-900 stroke-emerald-400 dark:stroke-emerald-600" />
              <text x="500" y="95" textAnchor="middle"
                className="fill-emerald-700 dark:fill-emerald-300 font-semibold">
                Called Function Stack Frame
              </text>
              <text x="500" y="130" textAnchor="middle"
                className="fill-slate-600 dark:fill-slate-400 text-sm">
                return expression executed
              </text>

              {/* ARROW */}
              <line x1="500" y1="180" x2="500" y2="230"
                strokeWidth="2"
                className="stroke-slate-500 dark:stroke-slate-400" />
              <polygon points="500,230 492,214 508,214"
                className="fill-slate-500 dark:fill-slate-400">
                <animate
                  attributeName="opacity"
                  from="0.4"
                  to="1"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </polygon>

              {/* CALLER STACK */}
              <rect x="280" y="230" width="440" height="100" rx="16"
                className="fill-sky-100 dark:fill-sky-900 stroke-sky-400 dark:stroke-sky-600" />
              <text x="500" y="265" textAnchor="middle"
                className="fill-sky-700 dark:fill-sky-300 font-semibold">
                Caller Stack Frame (main)
              </text>
              <text x="500" y="295" textAnchor="middle"
                className="fill-slate-600 dark:fill-slate-400 text-sm">
                execution resumes here
              </text>
            </svg>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              ✔ Callee stack frame is destroyed  
              ✔ Control jumps back to the caller  
              ✔ Program continues after the function call
            </p>
          </div>
        </section>

        {/* ======================================================
            SYNTAX & FORMS (JSX SAFE)
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[360ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 hover:ring-indigo-400/40`}>
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
              Valid Forms of return Statement
            </h3>

            <ul className="list-disc ml-6 space-y-4">
              <li>
                <strong>Returning a value (non-void function):</strong>
                <pre className="mt-2 bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm">
{`return expression;`}
                </pre>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  The expression must match the function’s declared return type.
                </p>
              </li>

              <li>
                <strong>Returning nothing (void function):</strong>
                <pre className="mt-2 bg-slate-100 dark:bg-slate-800 p-3 rounded text-sm">
{`return;`}
                </pre>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Used only when the function return type is <code>void</code>.
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            CODE EXAMPLE
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[480ms] max-w-5xl mx-auto`}>
          <EditableCCodeBlock
            title="Basic return Statement Example"
            code={`#include <stdio.h>

int square(int x) {
    return x * x;
}

int main() {
    int result = square(6);
    printf("%d", result);
    return 0;
}`}
          />
        </section>

        {/* ======================================================
            RULES & LIMITATIONS (DETAILED)
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[600ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 hover:ring-rose-400/40`}>
            <h3 className="text-lg font-semibold text-rose-700 dark:text-rose-300 mb-4">
              Rules and Limitations You Must Follow
            </h3>

            <ul className="list-disc ml-6 space-y-3">
              <li>Only one value can be returned directly</li>
              <li>Return type must match function declaration</li>
              <li>Returning address of local variable is unsafe</li>
              <li>Code after return is unreachable</li>
              <li>Non-void functions must return a value</li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            COMMON BEGINNER BUGS
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[720ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 hover:ring-rose-400/40`}>
            <h3 className="text-lg font-semibold text-rose-700 dark:text-rose-300 mb-4">
              Common Beginner Mistakes
            </h3>

            <ul className="list-disc ml-6 space-y-3">
              <li>Forgetting to return a value in non-void functions</li>
              <li>Expecting multiple values from return</li>
              <li>Returning garbage or uninitialized values</li>
              <li>Using return instead of break in loops</li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            HINT SECTION
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[840ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800`}>
            <h3 className="font-semibold text-sky-700 dark:text-sky-300 mb-2">
              💡 Hint
            </h3>
            <p>
              Add a <code>printf()</code> after a return statement and observe
              whether it ever executes.
            </p>
          </div>
        </section>

        {/* ======================================================
            TEACHER'S NOTE
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[960ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700 hover:ring-yellow-400/60`}>
            <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">
              🧑‍🏫 Teacher’s Note
            </h3>

            <p className="text-sm mb-2">
              Most runtime errors beginners face are indirectly caused by
              incorrect return usage.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Always think: <em>What returns? Where does it go? What disappears?</em>
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
