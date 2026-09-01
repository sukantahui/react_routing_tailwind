import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

/**
 * Topic2.jsx
 * ----------------------------------------------------
 * Topic 3: Function Declaration (Prototype) – Syntax and Purpose
 * React 19 - Class Based Component
 * Tailwind CSS (NO config, NO plugins)
 * ----------------------------------------------------
 */

export default class Topic2 extends Component {
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
            Function Declaration (Prototype) – Syntax and Purpose
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            A function prototype is a <strong>promise</strong> you make to the compiler.
            This promise prevents silent bugs and undefined behavior.
          </p>
        </header>

        {/* ================= CORE CONCEPT ================= */}
        <section className={`${baseSection} animation-delay-[120ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-emerald-400/40`}
          >
            <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
              What is a Function Declaration?
            </h2>

            <p className="mb-3">
              A <strong>function declaration</strong> (prototype) informs the compiler
              about a function <strong>before it is used</strong>.
            </p>

            <ul className="list-disc ml-5 space-y-2">
              <li>Function name</li>
              <li>Return type</li>
              <li>Parameter types</li>
            </ul>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              It contains <strong>no function body</strong>.
            </p>
          </div>
        </section>

        {/* ================= WHY IT IS NEEDED ================= */}
        <section className={`${baseSection} animation-delay-[240ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 hover:ring-indigo-400/40`}
          >
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
              Why C Requires Prototypes
            </h3>

            <p className="mb-3">
              C is compiled <strong>top to bottom</strong>.
              If a function is called before it is defined,
              the compiler must already know its signature.
            </p>

            <p>
              The prototype acts as a forward declaration.
            </p>
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

            <p>
              In a coaching center at <strong>Shyamnagar</strong>,
              students receive the syllabus first — lessons come later.
              That syllabus is the prototype.
            </p>
          </div>
        </section>

        {/* ================= SYNTAX ================= */}
        <section className={`${baseSection} animation-delay-[480ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-cyan-400/40`}
          >
            <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
              Syntax of a Function Prototype
            </h3>

            <pre className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-sm overflow-x-auto">
{`returnType functionName(parameterType1, parameterType2);`}
            </pre>

            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              The semicolon (<code>;</code>) is mandatory.
            </p>
          </div>
        </section>

        {/* ================= CODE EXAMPLE ================= */}
        <section className={`${baseSection} animation-delay-[600ms] max-w-5xl mx-auto`}>
          <EditableCCodeBlock
            title="Function Prototype Example"
            code={`#include <stdio.h>

int multiply(int a, int b);  // prototype

int main() {
    printf("%d", multiply(4, 5));
    return 0;
}

int multiply(int a, int b) { // definition
    return a * b;
}`}
          />
        </section>

        {/* ================= COMMON ERRORS ================= */}
        <section className={`${baseSection} animation-delay-[720ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 hover:ring-rose-400/40`}
          >
            <h3 className="text-lg font-semibold text-rose-700 dark:text-rose-300 mb-3">
              Common Compiler Errors
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li>Implicit declaration of function</li>
              <li>Mismatched parameter types</li>
              <li>Wrong return type</li>
              <li>Missing prototype before use</li>
            </ul>
          </div>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className={`${baseSection} animation-delay-[840ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700 hover:ring-yellow-400/60`}
          >
            <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-2">
              🧑‍🏫 Teacher’s Note
            </h3>

            <p className="mb-2">
              If a compiler warns about a prototype mismatch,
              it is saving you from a runtime disaster.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Never ignore prototype warnings — professionals never do.
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
