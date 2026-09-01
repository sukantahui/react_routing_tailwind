import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

/**
 * Topic1.jsx
 * ----------------------------------------------------
 * Topic 2: Advantages of Modular Programming
 * React 19 - Class Based Component
 * Tailwind CSS (NO config, NO plugins)
 * Professional classroom-ready animations
 * ----------------------------------------------------
 */

export default class Topic1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    // Trigger reveal animation after mount
    this.setState({ visible: true });
  }

  render() {
    const baseSection =
      "opacity-0 translate-y-6 motion-safe:animate-[fadeUp_0.8s_ease-out_forwards]";
    const cardBase =
      "rounded-xl border p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:ring-1";

    return (
      <div className="space-y-16 px-4 md:px-6 py-10 text-slate-800 dark:text-slate-200 leading-relaxed">

        {/* ======================================================
            HEADER
        ====================================================== */}
        <header
          className={`${baseSection} animation-delay-[0ms] max-w-4xl mx-auto space-y-4`}
        >
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-indigo-600 dark:text-indigo-400">
            Advantages of Modular Programming
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            Modular programming is the practice of breaking a program into
            <strong> small, independent, reusable units</strong>.
            This section explains why professionals never write monolithic code.
          </p>
        </header>

        {/* ======================================================
            CORE CONCEPT
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[120ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-indigo-400/40`}
          >
            <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
              What is Modular Programming?
            </h2>

            <p className="mb-3">
              <strong>Modular programming</strong> means dividing a large problem
              into <strong>smaller, manageable modules</strong>,
              where each module performs a <em>single well-defined task</em>.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              In C, modules are usually implemented using
              <strong> functions</strong> and
              <strong> separate source/header files</strong>.
            </p>
          </div>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[240ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 hover:ring-indigo-400/40`}
          >
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
              Real-World Scenario
            </h3>

            <p className="mb-2">
              Imagine building a billing system in a shop at <strong>Naihati</strong>.
              One student (Swadeep) writes everything in one file.
            </p>

            <p className="mb-2">
              Another student (Abhronila) separates:
            </p>

            <ul className="list-disc ml-5 space-y-1">
              <li>Input handling</li>
              <li>Calculation logic</li>
              <li>Printing bills</li>
            </ul>

            <p className="mt-2">
              When a bug appears in calculation, only one module is touched.
              That is the power of modular programming.
            </p>
          </div>
        </section>

        {/* ======================================================
            ADVANTAGES LIST
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[360ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 hover:ring-emerald-400/40`}
          >
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
              Key Advantages
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Readability:</strong> Code is easier to understand</li>
              <li><strong>Reusability:</strong> Same module used in many programs</li>
              <li><strong>Maintainability:</strong> Changes affect fewer places</li>
              <li><strong>Debugging:</strong> Errors are isolated quickly</li>
              <li><strong>Teamwork:</strong> Multiple people work independently</li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            TECHNICAL EXPLANATION
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[480ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-cyan-400/40`}
          >
            <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
              Technical View (C Perspective)
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li>
                <strong>Module:</strong> A logical unit (function / file)
              </li>
              <li>
                <strong>Interface:</strong> Function prototype (.h file)
              </li>
              <li>
                <strong>Implementation:</strong> Function definition (.c file)
              </li>
              <li>
                <strong>Usage:</strong> Included and called where required
              </li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            CODE EXAMPLE
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[600ms] max-w-5xl mx-auto`}>
          <EditableCCodeBlock
            title="Modular vs Non-Modular Code"
            code={`// ❌ Non-modular approach
#include <stdio.h>
int main() {
    int a = 10, b = 20;
    int sum = a + b;
    printf("Sum = %d", sum);
    return 0;
}

// ✅ Modular approach
#include <stdio.h>

int add(int a, int b);  // interface

int add(int a, int b) { // module
    return a + b;
}

int main() {
    printf("Sum = %d", add(10, 20));
    return 0;
}`}
          />
        </section>

        {/* ======================================================
            COMMON PITFALLS
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[720ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 hover:ring-rose-400/40`}
          >
            <h3 className="text-lg font-semibold text-rose-700 dark:text-rose-300 mb-3">
              Common Beginner Mistakes
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li>Creating modules that do too many things</li>
              <li>Using global variables instead of parameters</li>
              <li>Poor or unclear function names</li>
              <li>Ignoring code reuse opportunities</li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            HINT SECTION (MANDATORY)
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[840ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 hover:ring-sky-400/40`}
          >
            <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-300 mb-2">
              💡 Hint
            </h3>

            <p>
              Think about your last long program.  
              Which part would you like to change without touching the rest?
              That part should be a separate module.
            </p>
          </div>
        </section>

        {/* ======================================================
            MINI CHECKLIST
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[960ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:ring-slate-400/40`}
          >
            <h3 className="text-lg font-semibold mb-3">
              ✔ What You Should Remember
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li>Small modules are easier to manage</li>
              <li>One module = one responsibility</li>
              <li>Good modularity reduces bugs</li>
              <li>Professional code is always modular</li>
            </ul>
          </div>
        </section>

        {/* ======================================================
            TEACHER'S NOTE (MANDATORY)
        ====================================================== */}
        <section className={`${baseSection} animation-delay-[1080ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700 hover:ring-yellow-400/60`}
          >
            <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-2 flex items-center gap-2">
              🧑‍🏫 Teacher’s Note
            </h3>

            <p className="mb-2">
              Beginners try to finish programs quickly.
              Professionals try to finish them <strong>cleanly</strong>.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              If you ever feel scared to change code, your program is not modular enough.
            </p>
          </div>
        </section>

        {/* ======================================================
            KEYFRAMES (SCOPED)
        ====================================================== */}
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
