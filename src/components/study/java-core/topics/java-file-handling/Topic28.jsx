// src/components/study/java-core/file-handling/Topic28.jsx
// Topic 29: Use Cases of Serialization
// React 19 – CLASS-BASED component
// Tailwind CSS only (NO config, NO plugins)

import React, { Component } from "react";

// ------------------------------------------------------------
// Inline scoped keyframes (ZERO CONFIG)
// ------------------------------------------------------------
const animationStyles = `
@keyframes fadeSlideUp {
  0% { opacity: 0; transform: translateY(14px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export default class Topic28 extends Component {
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
            Use Cases of Serialization
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Serialization is not a feature you use everywhere —
            it is a <strong>strategic tool</strong>.
            This topic explains when serialization is useful,
            when it is risky, and how professionals decide.
          </p>
        </header>

        {/* ======================================================
            CORE IDEA
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Core Idea
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Serialization is used when an object must
            <strong> survive beyond JVM memory</strong>.
          </p>

          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 dark:text-slate-300">
            <li>JVM restart</li>
            <li>Network transfer</li>
            <li>Long-term storage</li>
          </ul>
        </section>

        {/* ======================================================
            USE CASE 1 – SESSION MANAGEMENT
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. Web Session Management
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            In web applications, user sessions may be stored
            on disk or transferred between servers.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>User login state</li>
            <li>Shopping cart objects</li>
            <li>Temporary preferences</li>
          </ul>
        </section>

        {/* ======================================================
            USE CASE 2 – OBJECT CACHING
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. Object Caching
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Expensive objects can be serialized and cached
            instead of being recreated repeatedly.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Configuration objects</li>
            <li>Pre-processed datasets</li>
            <li>Lookup tables</li>
          </ul>
        </section>

        {/* ======================================================
            USE CASE 3 – DISTRIBUTED SYSTEMS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Distributed Systems & Messaging
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Objects are serialized before being sent
            between JVMs in distributed environments.
          </p>

          <ul className="list-disc pl-6 mt-2 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Remote Method Invocation (RMI)</li>
            <li>Message queues</li>
            <li>Microservices communication</li>
          </ul>
        </section>

        {/* ======================================================
            USE CASE 4 – DESKTOP APPLICATIONS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Desktop Application State
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Desktop applications often serialize objects
            to restore state after shutdown.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Example: window layout, last opened file, user preferences.
          </p>
        </section>

        {/* ======================================================
            WHEN NOT TO USE SERIALIZATION
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
            6. When NOT to Use Serialization
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Storing passwords or secrets</li>
            <li>Large, frequently changing data</li>
            <li>Cross-language data exchange</li>
            <li>Long-term persistent storage (without versioning)</li>
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
            A school management system in <strong>Naihati</strong>
            caches timetable objects daily.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            Serialization avoids recalculating schedules every startup.
          </p>
        </section>

        {/* ======================================================
            INTERVIEW ANGLE
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-cyan-600 dark:text-cyan-400 mb-3">
            8. Interview Perspective
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Serialization is about object state, not files</li>
            <li>Not a replacement for databases</li>
            <li>Must consider security and versioning</li>
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
            Serialization answers “How do I keep this object alive
            beyond this program run?”
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
            <li>Used for state persistence</li>
            <li>Common in sessions & caching</li>
            <li>Not always the right tool</li>
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
            Serialization is powerful but dangerous if misunderstood.
            Teach students *when not to use it* — that’s true maturity.
          </p>
        </section>
      </div>
    );
  }
}
