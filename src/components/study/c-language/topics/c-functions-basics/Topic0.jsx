import React, { Component } from "react";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";

/**
 * Topic0.jsx
 * Topic 1: Concept of Functions and Why They Are Needed
 * React 19 – Class Component
 * Zero-config Tailwind animations
 */

export default class Topic0 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    this.setState({ show: true });
  }

  render() {
    const { show } = this.state;

    const sectionBase =
      "opacity-0 translate-y-6 motion-safe:animate-[fadeUp_0.8s_ease-out_forwards]";
    const cardBase =
      "rounded-xl border p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:ring-1";

    return (
      <div className="space-y-16 px-4 md:px-6 py-10 text-slate-800 dark:text-slate-200 leading-relaxed">

        {/* ================= HEADER ================= */}
        <header
          className={`${sectionBase} animation-delay-[0ms] max-w-4xl mx-auto space-y-4`}
        >
          <h1 className="text-2xl md:text-3xl font-semibold tracking-wide text-indigo-600 dark:text-indigo-400">
            Concept of Functions and Why They Are Needed
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            Functions are the foundation of modular, readable, and maintainable
            C programs. This lesson explains why professionals rely on them.
          </p>
        </header>

        {/* ================= CORE CONCEPT ================= */}
        <section className={`${sectionBase} animation-delay-[120ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-emerald-300/40 dark:hover:ring-emerald-500/30`}
          >
            <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
              What is a Function in C?
            </h2>

            <p className="mb-3">
              A <strong>function</strong> is a named block of code that performs
              a specific task. It allows reuse and separation of concerns.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Think of it as a machine: input → process → output.
            </p>
          </div>
        </section>

        {/* ================= REAL WORLD ANALOGY ================= */}
        <section className={`${sectionBase} animation-delay-[240ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 hover:ring-indigo-400/40`}
          >
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 mb-3">
              Real-World Analogy
            </h3>

            <p className="mb-2">
              In a Barrackpore school, teacher Sukanta explains the checking
              process once. Students like Swadeep and Tuhina reuse it.
            </p>

            <p>
              That instruction sheet is exactly what a function is — defined
              once, reused many times.
            </p>
          </div>
        </section>

        {/* ================= TECHNICAL VIEW ================= */}
        <section className={`${sectionBase} animation-delay-[360ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:ring-cyan-400/40`}
          >
            <h3 className="text-lg font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
              Technical Breakdown
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li><strong>Prototype:</strong> Tells compiler how to call</li>
              <li><strong>Return type:</strong> What comes back</li>
              <li><strong>Purpose:</strong> One clear responsibility</li>
              <li><strong>Usage:</strong> Called when needed</li>
            </ul>
          </div>
        </section>

        {/* ================= CODE ================= */}
        <section className={`${sectionBase} animation-delay-[480ms] max-w-5xl mx-auto`}>
          <EditableCCodeBlock
            title="Simple Function Example"
            code={`#include <stdio.h>

int add(int a, int b);   // prototype

int add(int a, int b) { // definition
    return a + b;
}

int main() {
    printf("%d", add(10, 20));
    return 0;
}`}
          />
        </section>

        {/* ================= WHY FUNCTIONS ================= */}
        <section className={`${sectionBase} animation-delay-[600ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 hover:ring-emerald-400/40`}
          >
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
              Why Functions Matter
            </h3>

            <ul className="list-disc ml-5 space-y-2">
              <li>Removes repetition</li>
              <li>Improves readability</li>
              <li>Simplifies debugging</li>
              <li>Enables teamwork</li>
            </ul>
          </div>
        </section>

        {/* ================= HINT ================= */}
        <section className={`${sectionBase} animation-delay-[720ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 hover:ring-sky-400/40`}
          >
            <h3 className="text-lg font-semibold text-sky-700 dark:text-sky-300 mb-2">
              💡 Hint
            </h3>
            <p>
              Observe your old programs.  
              Where do you repeat logic?  
              That’s your next function.
            </p>
          </div>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className={`${sectionBase} animation-delay-[840ms] max-w-5xl mx-auto`}>
          <div
            className={`${cardBase} bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-700 hover:ring-yellow-400/60`}
          >
            <h3 className="text-lg font-semibold text-yellow-700 dark:text-yellow-300 mb-2 flex items-center gap-2">
              🧑‍🏫 Teacher’s Note
            </h3>

            <p className="mb-2">
              Beginners focus on syntax. Professionals focus on structure.
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              If a function feels hard to name, it’s doing too much.
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
