// src/components/study/java-core/file-handling/Topic27.jsx
// Topic 28: ObjectInputStream & ObjectOutputStream (Concept + Usage)
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

export default class Topic27 extends Component {
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
            ObjectInputStream &amp; ObjectOutputStream
          </h1>

          <p className="max-w-3xl leading-relaxed text-slate-600 dark:text-slate-300">
            Serialization becomes practical with
            <code> ObjectOutputStream</code> and
            <code> ObjectInputStream</code>.
            These classes handle converting objects to bytes and
            restoring them back safely.
          </p>
        </header>

        {/* ======================================================
            BIG PICTURE FLOW
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400 mb-3">
            1. Big Picture Flow
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Object → ObjectOutputStream → File (bytes)</li>
            <li>File (bytes) → ObjectInputStream → Object</li>
            <li>Class must implement <code>Serializable</code></li>
          </ul>
        </section>

        {/* ======================================================
            OBJECTOUTPUTSTREAM
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            2. ObjectOutputStream
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Constructor signature:</strong>
            <br />
            <code>ObjectOutputStream(OutputStream out)</code>
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method:</strong>
            <br />
            <code>void writeObject(Object obj)</code>
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            This method converts the object into a byte stream
            and writes it to the destination.
          </p>

          <JavaCodeBlock
            code={`try (ObjectOutputStream oos =
     new ObjectOutputStream(
         new FileOutputStream("student.ser"))) {

    oos.writeObject(student);

} catch (IOException e) {
    e.printStackTrace();
}`}
          />
        </section>

        {/* ======================================================
            OBJECTINPUTSTREAM
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
            3. ObjectInputStream
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Constructor signature:</strong>
            <br />
            <code>ObjectInputStream(InputStream in)</code>
          </p>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            <strong>Key method:</strong>
            <br />
            <code>Object readObject()</code>
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            This method reconstructs the object from the byte stream.
          </p>

          <JavaCodeBlock
            code={`try (ObjectInputStream ois =
     new ObjectInputStream(
         new FileInputStream("student.ser"))) {

    Student s = (Student) ois.readObject();
    System.out.println(s.name);

} catch (IOException | ClassNotFoundException e) {
    e.printStackTrace();
}`}
          />
        </section>

        {/* ======================================================
            IMPORTANT RULES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-amber-600 dark:text-amber-400 mb-3">
            4. Important Rules
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Class must implement <code>Serializable</code></li>
            <li>All referenced objects must be serializable</li>
            <li>Static and transient fields are ignored</li>
            <li>Order of read/write must match</li>
          </ul>
        </section>

        {/* ======================================================
            REAL-WORLD SCENARIO
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-3">
            5. Real-World Scenario
          </h2>

          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            A desktop application in <strong>Ichapur</strong>
            saves user preferences as objects.
          </p>

          <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-300">
            On restart, preferences are restored instantly
            using ObjectInputStream.
          </p>
        </section>

        {/* ======================================================
            COMMON PITFALLS
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
            Common Pitfalls
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Forgetting Serializable interface</li>
            <li>Not casting returned object</li>
            <li>Changing class structure after serialization</li>
            <li>Serializing sensitive data</li>
          </ul>
        </section>

        {/* ======================================================
            BEST PRACTICES
        ====================================================== */}
        <section className={`${reveal} ${card}`}>
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-3">
            Best Practices
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Use try-with-resources</li>
            <li>Serialize only what you need</li>
            <li>Consider versioning (concept)</li>
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
            If an object contains another object,
            ask: “Is that object also serializable?”
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
            <li>ObjectOutputStream → writeObject()</li>
            <li>ObjectInputStream → readObject()</li>
            <li>Serializable is mandatory</li>
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
            This topic connects concepts to reality.
            Students finally see how objects “travel” beyond memory.
            Emphasize safety and responsibility.
          </p>
        </section>
      </div>
    );
  }
}
