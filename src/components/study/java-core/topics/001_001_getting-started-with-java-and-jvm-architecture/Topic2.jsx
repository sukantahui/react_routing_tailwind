// Topic2.jsx
// Topic 3: Key Features of Java
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    // Reserved for subtle animations / analytics hooks
    this.setState({ mounted: true });
  }

  render() {
    return (
      <div className="space-y-14 px-4 md:px-10 py-8 text-slate-800 dark:text-slate-200">

        {/* ================= TITLE ================= */}
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-sky-600 dark:text-sky-400">
            Key Features of Java
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Java became popular not by chance, but because its core features solved
            real problems faced by developers and organizations.
          </p>
        </header>

        {/* ================= FEATURE OVERVIEW ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Why Java Is Powerful
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Java was designed with a clear focus on reliability, security, and
            portability. These features make Java suitable for everything from
            school projects to large-scale banking systems.
          </p>
        </section>

        {/* ================= PLATFORM INDEPENDENCE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            1. Platform Independent
          </h2>

          <p className="leading-relaxed max-w-4xl">
            Java programs do not run directly on the operating system. Instead,
            they run on the <strong>Java Virtual Machine (JVM)</strong>. This allows
            the same program to run on Windows, Linux, or macOS without changes.
          </p>

          <svg
            viewBox="0 0 900 240"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="Java platform independence"
          >
            <rect x="40" y="90" width="200" height="60" rx="10" fill="#38bdf8" />
            <text x="140" y="125" textAnchor="middle" fontSize="14" fill="#0f172a">Java Bytecode</text>

            <rect x="340" y="90" width="200" height="60" rx="10" fill="#a855f7" />
            <text x="440" y="125" textAnchor="middle" fontSize="14" fill="#0f172a">JVM</text>

            <rect x="640" y="40" width="200" height="50" rx="10" fill="#22c55e" />
            <text x="740" y="70" textAnchor="middle" fontSize="13" fill="#0f172a">Windows</text>

            <rect x="640" y="120" width="200" height="50" rx="10" fill="#f97316" />
            <text x="740" y="150" textAnchor="middle" fontSize="13" fill="#0f172a">Linux</text>

            <rect x="640" y="190" width="200" height="40" rx="10" fill="#eab308" />
            <text x="740" y="215" textAnchor="middle" fontSize="13" fill="#0f172a">macOS</text>

            <line x1="240" y1="120" x2="340" y2="120" stroke="#475569" strokeWidth="2" />
            <line x1="540" y1="120" x2="640" y2="65" stroke="#475569" strokeWidth="2" />
            <line x1="540" y1="120" x2="640" y2="145" stroke="#475569" strokeWidth="2" />
            <line x1="540" y1="120" x2="640" y2="210" stroke="#475569" strokeWidth="2" />
          </svg>

          <p className="leading-relaxed max-w-4xl">
            If Abhronila writes a Java program in a lab at Barrackpore, the same
            program can be executed later by Swadeep in Naihati without rewriting it.
          </p>
        </section>

        {/* ================= OBJECT ORIENTED ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            2. Object-Oriented
          </h2>

          <p className="leading-relaxed max-w-4xl">
            Java follows Object-Oriented Programming (OOP) principles such as
            <strong> class, object, encapsulation, inheritance, and polymorphism</strong>.
            This helps in organizing large programs into reusable and manageable parts.
          </p>

          <JavaCodeBlock
            language="java"
            code={`class Student {
    String name;

    void study() {
        System.out.println(name + " is studying Java");
    }
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            <strong>Method Signature:</strong> <code>void study()</code><br />
            <strong>Return Type:</strong> void<br />
            <strong>Purpose:</strong> Represents student behavior<br />
            <strong>Why used:</strong> Groups data and behavior together
          </p>
        </section>

        {/* ================= SECURE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            3. Secure
          </h2>

          <p className="leading-relaxed max-w-4xl">
            Java was designed with security in mind. It does not allow direct
            access to memory, which prevents many common security vulnerabilities.
            Features like bytecode verification and the security manager add
            additional protection.
          </p>

          <p className="leading-relaxed max-w-4xl">
            This is why Java is trusted in banking applications used in places like
            Shyamnagar and Ichapur.
          </p>
        </section>

        {/* ================= ROBUST ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            4. Robust
          </h2>

          <p className="leading-relaxed max-w-4xl">
            Java emphasizes strong memory management, automatic garbage collection,
            and compile-time as well as runtime error checking. These features
            make Java applications reliable and less prone to crashes.
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Thinking platform independence means no JVM is required</li>
            <li>Using OOP concepts without understanding their purpose</li>
            <li>Assuming Java security is automatic without good coding practices</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Understand why each feature exists</li>
            <li>Write object-oriented code with real-world mapping</li>
            <li>Do not ignore compiler warnings and runtime errors</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I explain platform independence clearly?</li>
            <li>Do I understand why Java is object-oriented?</li>
            <li>Can I state why Java is considered secure and robust?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            When teaching Java features, emphasize <strong>cause and effect</strong>.
            Platform independence exists because of JVM, security exists because of
            restricted memory access, and robustness exists because of strong error
            handling and garbage collection.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Encourage students to relate each feature to real systems they see around
            Barrackpore or Naihati. This ensures features are remembered as solutions
            to problems, not just definitions.
          </p>
        </section>
      </div>
    );
  }
}
