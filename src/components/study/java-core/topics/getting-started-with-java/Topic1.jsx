// Topic1.jsx
// Topic 2: History and Evolution of Java
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    // Lifecycle hook reserved for future analytics / subtle animations
    this.setState({ mounted: true });
  }

  render() {
    return (
      <div className="space-y-14 px-4 md:px-10 py-8 text-slate-800 dark:text-slate-200">

        {/* ================= TITLE ================= */}
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-sky-600 dark:text-sky-400">
            History and Evolution of Java
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Understanding how Java evolved helps students appreciate why the language
            is stable, secure, and trusted across decades.
          </p>
        </header>

        {/* ================= ORIGIN ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Origin of Java
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Java was created in the early 1990s at <strong>Sun Microsystems</strong>.
            The project was originally called <strong>Oak</strong>, named after an oak
            tree outside the developer’s office. The initial goal was not web
            applications, but <strong>software for consumer electronic devices</strong>.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Just like students in Barrackpore prepare differently for school exams
            and competitive exams, Java was redesigned when developers realized that
            the internet would become the primary platform for software.
          </p>
        </section>

        {/* ================= TIMELINE SVG ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Evolution Timeline (Conceptual)
          </h2>

          <svg
            viewBox="0 0 900 220"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="Java evolution timeline"
          >
            {/* Timeline line */}
            <line x1="60" y1="110" x2="840" y2="110" stroke="#475569" strokeWidth="2" />

            {/* Nodes */}
            <circle cx="140" cy="110" r="12" fill="#38bdf8" />
            <text x="140" y="150" textAnchor="middle" fontSize="12">1991<br/>Oak</text>

            <circle cx="300" cy="110" r="12" fill="#a855f7" />
            <text x="300" y="150" textAnchor="middle" fontSize="12">1995<br/>Java 1.0</text>

            <circle cx="460" cy="110" r="12" fill="#22c55e" />
            <text x="460" y="150" textAnchor="middle" fontSize="12">2004<br/>Java 5</text>

            <circle cx="620" cy="110" r="12" fill="#f97316" />
            <text x="620" y="150" textAnchor="middle" fontSize="12">2014<br/>Java 8</text>

            <circle cx="780" cy="110" r="12" fill="#eab308" />
            <text x="780" y="150" textAnchor="middle" fontSize="12">Modern Java</text>
          </svg>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            Java evolved gradually, focusing on backward compatibility and
            long-term reliability rather than sudden drastic changes.
          </p>
        </section>

        {/* ================= MAJOR MILESTONES ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Major Milestones
          </h2>
          <ul className="list-disc list-inside space-y-2 max-w-4xl">
            <li><strong>1995:</strong> Java officially released with "Write Once, Run Anywhere" promise</li>
            <li><strong>Java 5:</strong> Generics, enhanced for-loop, autoboxing</li>
            <li><strong>Java 8:</strong> Lambdas, Streams, modern functional features</li>
            <li><strong>Post-2010:</strong> Java maintained by Oracle with regular updates</li>
          </ul>
          <p className="leading-relaxed max-w-4xl">
            Just as Tuhina moves from basic concepts to advanced problem solving
            year by year, Java added features carefully without breaking old programs.
          </p>
        </section>

        {/* ================= WHY EVOLUTION MATTERS ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Why Java’s Evolution Matters
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Java’s evolution focused on <strong>stability, security, and scalability</strong>.
            This is why software written many years ago can still run today with little
            or no change — a critical requirement for banks, government systems,
            and enterprise software.
          </p>
        </section>

        {/* ================= SMALL CODE CONTEXT ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Backward Compatibility Example
          </h2>

          <JavaCodeBlock
            language="java"
            code={`class LegacyExample {
    public static void main(String[] args) {
        System.out.println("Old Java code still works!");
    }
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            <strong>Purpose:</strong> Demonstrates that simple Java programs written long ago
            still compile and run on modern Java versions.
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Thinking Java changes every year like scripting languages</li>
            <li>Ignoring older Java concepts assuming they are obsolete</li>
            <li>Believing newer versions break old Java programs</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Understand why features were introduced, not just how to use them</li>
            <li>Respect backward compatibility when learning Java</li>
            <li>Learn core Java before modern frameworks</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Do I know why Java was originally created?</li>
            <li>Can I explain why Java evolved slowly?</li>
            <li>Do I understand why old Java code still runs?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            While teaching Java history, the focus should be on <strong>why decisions were made</strong>,
            not memorizing years or version numbers. Students must remember that Java’s
            strength comes from careful evolution, not frequent breaking changes.
          </p>
          <p className="leading-relaxed max-w-4xl">
            A practical approach is to relate Java’s growth to a student’s academic journey
            in places like Barrackpore or Naihati — strong fundamentals first, then gradual
            enhancement. This mindset prepares learners for understanding JVM, editions,
            and long-term Java development practices.
          </p>
        </section>
      </div>
    );
  }
}
