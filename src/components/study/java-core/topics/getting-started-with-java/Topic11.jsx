// Topic11.jsx
// Topic 12: Understanding public static void main(String[] args)
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic11 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    // Lifecycle hook reserved for subtle animations / analytics
    this.setState({ ready: true });
  }

  render() {
    return (
      <div className="space-y-14 px-4 md:px-10 py-8 text-slate-800 dark:text-slate-200">

        {/* ================= TITLE ================= */}
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-sky-600 dark:text-sky-400">
            Understanding public static void main(String[] args)
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            The <code>main</code> method is the most important method in a Java program.
            Every keyword in its signature has a specific meaning and purpose.
          </p>
        </header>

        {/* ================= BIG PICTURE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Why This Method Is Special
          </h2>
          <p className="leading-relaxed max-w-4xl">
            When a Java program starts, the <strong>JVM looks only for this exact method signature</strong>.
            If it is missing or altered, the program will not run, even if the rest
            of the code is perfectly written.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Think of this method as the main gate of a school in Barrackpore.
            No matter how many classrooms exist inside, entry always starts here.
          </p>
        </section>

        {/* ================= METHOD SIGNATURE ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Complete Method Signature
          </h2>

          <JavaCodeBlock
            language="java"
            code={`public static void main(String[] args) {
    // execution starts here
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Prototype / Signature:</strong>
            <code className="ml-1">public static void main(String[] args)</code><br />
            <strong>Return Type:</strong> void<br />
            <strong>Purpose:</strong> Entry point called by JVM<br />
            <strong>When & Why:</strong> Required to start execution of a Java application
          </p>
        </section>

        {/* ================= public ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            public
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The keyword <strong>public</strong> makes the method accessible from anywhere.
            The JVM must be able to access this method from outside the class.
          </p>
          <p className="leading-relaxed max-w-4xl">
            If the gate of a school in Naihati were locked, students could not enter.
            Similarly, without <code>public</code>, the JVM cannot start the program.
          </p>
        </section>

        {/* ================= static ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            static
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The keyword <strong>static</strong> allows the JVM to call the method
            without creating an object of the class.
          </p>
          <p className="leading-relaxed max-w-4xl">
            At program startup, no objects exist yet. Making <code>main</code> static
            ensures execution can begin immediately.
          </p>
        </section>

        {/* ================= void ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            void
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The keyword <strong>void</strong> means the method does not return any value
            to the JVM after execution.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Once the program finishes, control returns to the operating system,
            not to another Java method.
          </p>
        </section>

        {/* ================= main ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            main
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The name <strong>main</strong> is not arbitrary. It is a fixed identifier
            recognized by the JVM as the starting point.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Changing this name to <code>Main</code> or <code>start</code> will prevent
            the program from running.
          </p>
        </section>

        {/* ================= String[] args ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            String[] args
          </h2>
          <p className="leading-relaxed max-w-4xl">
            The parameter <strong>String[] args</strong> is an array of command-line
            arguments passed to the program at runtime.
          </p>

          <JavaCodeBlock
            language="java"
            code={`public class ArgsExample {
    public static void main(String[] args) {
        System.out.println(args.length);
    }
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl">
            <strong>Parameter Type:</strong> Array of String<br />
            <strong>Purpose:</strong> Accept runtime inputs<br />
            <strong>When & Why:</strong> Useful for configuration and testing
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Changing the order of keywords</li>
            <li>Misspelling <code>main</code></li>
            <li>Removing <code>static</code></li>
            <li>Using wrong parameter type</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Memorize the main method signature exactly</li>
            <li>Do not modify it in beginner programs</li>
            <li>Understand purpose of each keyword</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I explain each keyword?</li>
            <li>Do I know why main must be static?</li>
            <li>Can I write the signature without looking?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Students should not just memorize this signature; they must
            <strong>justify each keyword logically</strong>. This prevents confusion
            when encountering advanced topics like method overloading or static blocks.
          </p>
          <p className="leading-relaxed max-w-4xl">
            A recommended drill is to ask learners to explain the signature
            word by word using real-life analogies. If they hesitate, revisit this topic.
          </p>
        </section>
      </div>
    );
  }
}
