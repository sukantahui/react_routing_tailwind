// Topic4.jsx
// Topic 5: Java as a Platform vs Java as a Language
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    // Lifecycle hook kept for consistency and future enhancements
    this.setState({ ready: true });
  }

  render() {
    return (
      <div className="space-y-14 px-4 md:px-10 py-8 text-slate-800 dark:text-slate-200">

        {/* ================= TITLE ================= */}
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-sky-600 dark:text-sky-400">
            Java as a Platform vs Java as a Language
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Many beginners confuse Java as a language with Java as a platform.
            This topic clearly separates both concepts using simple logic and real-life analogies.
          </p>
        </header>

        {/* ================= CORE IDEA ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            The Core Difference
          </h2>
          <p className="leading-relaxed max-w-4xl">
            <strong>Java as a language</strong> refers to the syntax, keywords, rules,
            and structure used to write programs. On the other hand,
            <strong> Java as a platform</strong> refers to the complete environment
            required to develop and run Java applications.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Just like English is a language and a school is a platform for learning,
            Java provides both a way to write instructions and a system to execute them.
          </p>
        </section>

        {/* ================= COMPARISON SVG ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Visual Comparison
          </h2>

          <svg
            viewBox="0 0 900 260"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="Java language vs platform diagram"
          >
            {/* Language */}
            <rect x="60" y="60" width="320" height="140" rx="14" fill="#38bdf8" />
            <text x="220" y="95" textAnchor="middle" fontSize="16" fill="#0f172a">
              Java Language
            </text>
            <text x="220" y="125" textAnchor="middle" fontSize="13" fill="#0f172a">
              Syntax • Keywords • Rules
            </text>
            <text x="220" y="150" textAnchor="middle" fontSize="13" fill="#0f172a">
              class, if, for, methods
            </text>

            {/* Platform */}
            <rect x="520" y="40" width="320" height="180" rx="14" fill="#a855f7" />
            <text x="680" y="85" textAnchor="middle" fontSize="16" fill="#0f172a">
              Java Platform
            </text>
            <text x="680" y="115" textAnchor="middle" fontSize="13" fill="#0f172a">
              JVM + Libraries + Tools
            </text>
            <text x="680" y="140" textAnchor="middle" fontSize="13" fill="#0f172a">
              JDK • JRE • APIs
            </text>

            {/* Arrow */}
            <line x1="380" y1="130" x2="520" y2="130" stroke="#475569" strokeWidth="3" />
          </svg>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            The language defines <em>how to write</em> Java code, while the platform
            defines <em>how and where it runs</em>.
          </p>
        </section>

        {/* ================= JAVA AS LANGUAGE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Java as a Programming Language
          </h2>
          <p className="leading-relaxed max-w-4xl">
            As a language, Java provides keywords, data types, operators, and
            control structures. These elements allow programmers to express
            logic and solve problems.
          </p>

          <JavaCodeBlock
            language="java"
            code={`class LanguageExample {
    public static void main(String[] args) {
        int marks = 85;
        if (marks >= 40) {
            System.out.println("Pass");
        }
    }
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            <strong>Keyword:</strong> <code>if</code><br />
            <strong>Prototype:</strong> <code>if (condition)</code><br />
            <strong>Return Type:</strong> N/A<br />
            <strong>Purpose:</strong> Conditional decision-making<br />
            <strong>When & Why:</strong> Used to execute code based on conditions
          </p>
        </section>

        {/* ================= JAVA AS PLATFORM ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Java as a Platform
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Java as a platform includes the <strong>JVM</strong>, core libraries,
            and development tools. It ensures that Java programs run securely
            and consistently across different operating systems.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Tuhina writes a program in Barrackpore and Debangshu runs it later
            in Shyamnagar, the Java platform ensures identical behavior.
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Thinking Java language automatically includes JVM installation</li>
            <li>Confusing Java platform with operating systems</li>
            <li>Ignoring the role of libraries and APIs</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Always separate language concepts from runtime concepts</li>
            <li>Understand JVM before advanced Java topics</li>
            <li>Use the platform documentation regularly</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I clearly differentiate Java language and platform?</li>
            <li>Do I know what components form the Java platform?</li>
            <li>Can I explain this difference to another student?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            This topic must be mastered before moving to JDK, JRE, and JVM.
            Students should repeatedly remind themselves: language is about
            <strong>writing code</strong>, platform is about <strong>running code</strong>.
          </p>
          <p className="leading-relaxed max-w-4xl">
            A practical tip is to ask learners to explain this difference using
            their own classroom or locality examples. If they can do that clearly,
            they are ready for deeper JVM discussions.
          </p>
        </section>
      </div>
    );
  }
}
