// src/components/study/java-core/file-handling/Topic26.jsx
// Topic 27: Serialization – Concept Introduction
// React 19 – CLASS-BASED component
// Tailwind CSS only (NO config, NO plugins)

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

// ------------------------------------------------------------
// Inline scoped keyframes (ZERO CONFIG)
// ------------------------------------------------------------
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(14px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic26 extends Component {
  constructor(props) {
    super(props);
    this.state = { mounted: false };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  render() {
    const reveal = this.state.mounted
      ? "motion-safe:animate-[fadeSlideUp_0.6s_ease-out_forwards]"
      : "opacity-0";

    const card =
      "rounded-xl border border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

    return (
      <div className="space-y-16 px-4 sm:px-6 lg:px-10 py-10 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
        <style>{animationStyles}</style>

        {/* ======================================================
            HEADER
        ====================================================== */}
        <header className={`${reveal} space-y-4`}>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            Serialization – Concept Introduction
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Serialization is the process of converting a Java object into
            a format that can be <strong>stored</strong> or
            <strong>transmitted</strong> and later reconstructed.
            This topic builds the conceptual foundation.
          </p>
        </header>

        {/* ======================================================
            WHAT IS SERIALIZATION
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. What is Serialization?
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Serialization converts an <strong>object’s state</strong>
            into a <strong>byte stream</strong>.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            That byte stream can be:
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Saved to a file</li>
            <li>Sent over a network</li>
            <li>Stored in memory or cache</li>
          </ul>
        </section>

        {/* ======================================================
            WHY SERIALIZATION IS NEEDED
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Why Serialization Is Needed
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Persist object state</li>
            <li>Share objects between JVMs</li>
            <li>Support distributed systems</li>
            <li>Session storage (web applications)</li>
          </ul>
        </section>

        {/* ======================================================
            SERIALIZATION VS FILE I/O
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Serialization vs Normal File I/O
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>File I/O → reads & writes data</li>
            <li>Serialization → saves object structure + data</li>
            <li>No manual field handling needed</li>
          </ul>
        </section>

        {/* ======================================================
            SERIALIZABLE INTERFACE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Serializable Interface
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            To allow serialization, a class must implement
            <code> java.io.Serializable</code>.
          </p>

          <p className="mt-2 text-slate-600 dark:text-slate-300">
            It is a <strong>marker interface</strong> — it has no methods.
          </p>

          <JavaCodeBlock
            code={`class Student implements Serializable {
    int id;
    String name;
}`}
          />
        </section>

        {/* ======================================================
            WHAT GETS SERIALIZED
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. What Gets Serialized
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Non-static instance variables</li>
            <li>Object graph (nested objects)</li>
            <li>Primitive and reference fields</li>
          </ul>
        </section>

        {/* ======================================================
            WHAT DOES NOT GET SERIALIZED
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400 mb-3">
            6. What Does NOT Get Serialized
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>static variables</li>
            <li>transient variables</li>
            <li>Methods</li>
            <li>Constructors</li>
          </ul>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-fuchsia-600 dark:text-fuchsia-400 mb-3">
            7. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A student portal in <strong>Barrackpore</strong>
            stores login session objects.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Serialization allows session recovery after server restart.
          </p>
        </section>

        {/* ======================================================
            COMMON MISCONCEPTIONS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
            Common Misconceptions
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Serialization is not encryption</li>
            <li>Serializable does not save methods</li>
            <li>GC does not serialize objects</li>
            <li>Files alone don’t preserve objects</li>
          </ul>
        </section>

        {/* ======================================================
            BEST PRACTICES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
            Best Practices (Conceptual)
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Serialize only when needed</li>
            <li>Avoid sensitive data</li>
            <li>Understand versioning risks</li>
          </ul>
        </section>

        {/* ======================================================
            HINT
        ====================================================== */}
        <section className={`${reveal} ${card} border-dashed border-teal-400/50`}>
          <h2 className="text-lg font-semibold text-teal-600 dark:text-teal-400">
            💡 Hint
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Ask: “Do I need the object later exactly as it is now?”
            If yes — serialization is relevant.
          </p>
        </section>

        {/* ======================================================
            MINI CHECKLIST
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            Mini Checklist
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Object → byte stream</li>
            <li>Requires Serializable</li>
            <li>State, not behavior</li>
          </ul>
        </section>

        {/* ======================================================
            TEACHER'S NOTE
        ====================================================== */}
        <section
          className={`${reveal} rounded-xl border border-slate-300 dark:border-slate-700 p-6 bg-slate-100 dark:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
        >
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🎓 Teacher’s Note
          </h2>

          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            Serialization should be taught as *state preservation*,
            not file writing.
            This mindset prevents deep misunderstandings later.
          </p>
        </section>
      </div>
    );
  }
}

