import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

/**
 * Topic8.jsx
 * ----------------------------------------------------
 * Topic 9: Functions with No Arguments and No Return Value
 * ----------------------------------------------------
 * Focus:
 * - Command-style functions
 * - One-way execution
 * - Different categories of side effects
 * - When to use and when to avoid
 * ----------------------------------------------------
 */

export default class Topic8 extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
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
            Functions with No Arguments and No Return Value
          </h1>

          <p className="mt-3 text-slate-600 dark:text-slate-400">
            This topic explains <strong>command-style functions</strong> —
            functions that exist purely to <em>perform an action</em>.
            They do not accept input and do not return output.
          </p>
        </header>

        {/* ======================================================
            CORE CONCEPT (DEEP)
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[120ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-emerald-400/40`}>
            <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-4">
              Conceptual Meaning (Very Important)
            </h2>

            <p className="mb-3">
              A function with <strong>no arguments</strong> and
              <strong> no return value</strong>:
            </p>

            <ul className="list-disc ml-6 space-y-3">
              <li>Does not depend on external input</li>
              <li>Does not produce a value for further computation</li>
              <li>Exists to <strong>trigger behavior</strong></li>
            </ul>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Such functions are always declared using the <code>void</code> return type.
            </p>
          </div>
        </section>

        {/* ======================================================
            SVG: ONE-WAY EXECUTION
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[240ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-indigo-400/40`}>
            <h2 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
              One-Way Execution Model
            </h2>

            <svg
              viewBox="0 0 1000 300"
              className="w-full h-auto"
              preserveAspectRatio="xMidYMid meet"
              aria-label="One way execution for void functions"
            >
              {/* CALLER */}
              <rect x="80" y="90" width="280" height="120" rx="16"
                className="fill-sky-100 dark:fill-sky-900 stroke-sky-400 dark:stroke-sky-600" />
              <text x="220" y="130" textAnchor="middle"
                className="fill-sky-700 dark:fill-sky-300 font-semibold">
                Caller (main)
              </text>

              {/* ARROW */}
              <line x1="360" y1="150" x2="520" y2="150"
                strokeWidth="2"
                className="stroke-slate-500 dark:stroke-slate-400" />
              <polygon points="520,150 504,142 504,158"
                className="fill-slate-500 dark:fill-slate-400">
                <animate attributeName="opacity" from="0.4" to="1" dur="1.2s" repeatCount="indefinite" />
              </polygon>

              {/* FUNCTION */}
              <rect x="520" y="90" width="320" height="120" rx="16"
                className="fill-emerald-100 dark:fill-emerald-900 stroke-emerald-400 dark:stroke-emerald-600" />
              <text x="680" y="125" textAnchor="middle"
                className="fill-emerald-700 dark:fill-emerald-300 font-semibold">
                void function()
              </text>
              <text x="680" y="160" textAnchor="middle"
                className="fill-slate-600 dark:fill-slate-400 text-sm">
                action happens here
              </text>
            </svg>

            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              ✔ Control goes in  
              ✔ Task executes  
              ✔ Control returns silently
            </p>
          </div>
        </section>

        {/* ======================================================
            TECHNICAL RULES
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[360ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800 hover:ring-indigo-400/40`}>
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-4">
              Technical Rules (C Language)
            </h3>

            <ul className="list-disc ml-6 space-y-3">
              <li>Return type must be <code>void</code></li>
              <li>No parameters are listed in the prototype</li>
              <li>Execution relies on side effects</li>
              <li><code>return;</code> is optional</li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            EXAMPLE 1: PRESENTATION
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[480ms] max-w-5xl mx-auto`}>
          <EditableCCodeBlock
            title="Example 1: Presentation / UI Responsibility"
            code={`#include <stdio.h>

void showHeader() {
    printf("==============================\\n");
    printf("   Student Management System  \\n");
    printf("==============================\\n");
}

int main() {
    showHeader();
    return 0;
}`}
          />
        </section>

        {/* ======================================================
            EXAMPLE 2: STATE CHANGE
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[520ms] max-w-5xl mx-auto`}>
          <EditableCCodeBlock
            title="Example 2: Changing Program State (Global Side Effect)"
            code={`#include <stdio.h>

int systemReady = 0;

void initializeSystem() {
    systemReady = 1;
}

int main() {
    initializeSystem();
    if(systemReady)
        printf("System is ready.\\n");
    return 0;
}`}
          />
        </section>

        {/* ======================================================
            EXAMPLE 3: CONTROL ACTION
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[560ms] max-w-5xl mx-auto`}>
          <EditableCCodeBlock
            title="Example 3: Control-Oriented Function"
            code={`#include <stdio.h>
#include <stdlib.h>

void terminateProgram() {
    printf("Exiting program...\\n");
    exit(0);
}

int main() {
    terminateProgram();
    printf("This line never executes.\\n");
    return 0;
}`}
          />
        </section>

        {/* ======================================================
            EXAMPLE 4: BEHAVIOR ENCAPSULATION
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[600ms] max-w-5xl mx-auto`}>
          <EditableCCodeBlock
            title="Example 4: Encapsulating Reusable Behavior"
            code={`#include <stdio.h>

void drawLine() {
    for(int i = 0; i < 40; i++)
        printf("-");
    printf("\\n");
}

int main() {
    drawLine();
    printf("Report Content\\n");
    drawLine();
    return 0;
}`}
          />
        </section>

        {/* ======================================================
            WHEN TO USE / AVOID
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[640ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 hover:ring-emerald-400/40`}>
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
              When to Use (and When NOT to Use)
            </h3>

            <ul className="list-disc ml-6 space-y-2">
              <li>Use for actions, setup, UI, logging, control</li>
              <li>Avoid when computation or decision is required</li>
              <li>Avoid hiding important data changes</li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            COMMON MISTAKES
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[720ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 hover:ring-rose-400/40`}>
            <h3 className="text-lg font-semibold text-rose-700 dark:text-rose-300 mb-4">
              Common Beginner Mistakes
            </h3>

            <ul className="list-disc ml-6 space-y-3">
              <li>Expecting return values</li>
              <li>Overusing global variables</li>
              <li>Putting calculations inside void functions</li>
              <li>Hiding logic that should be explicit</li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            HINT
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[840ms] max-w-5xl mx-auto`}>
          <div className={`${cardBase} bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800`}>
            <h3 className="font-semibold text-sky-700 dark:text-sky-300 mb-2">
              💡 Hint
            </h3>
            <p>
              Ask yourself: “Is this function computing a value, or commanding behavior?”
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
              Students often underestimate these functions because they “don’t return anything”.
              In reality, they teach <strong>design discipline</strong>.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Mastering this distinction makes later topics like callbacks and event handlers easier.
            </p>
          </div>
        </section>

        {/* ======================================================
            KEYFRAMES
        ====================================================== */}
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(28px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }
}
