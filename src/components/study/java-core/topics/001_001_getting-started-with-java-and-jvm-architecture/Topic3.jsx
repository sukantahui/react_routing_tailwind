// Topic3.jsx
// Topic 4: Java Editions — Java SE, Java EE, Java ME (Overview)
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
    };
  }

  componentDidMount() {
    // Lifecycle hook kept for future enhancements (animations / analytics)
    this.setState({ mounted: true });
  }

  render() {
    return (
      <div className="space-y-14 px-4 md:px-10 py-8 text-slate-800 dark:text-slate-200">

        {/* ================= TITLE ================= */}
        <header className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-sky-600 dark:text-sky-400">
            Java Editions: Java SE, Java EE, Java ME
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Java is not a single package. It is released in different editions,
            each designed for specific types of applications.
          </p>
        </header>

        {/* ================= WHY EDITIONS ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Why Java Has Different Editions
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Just like students choose different streams after school,
            Java provides different editions to match different development needs.
            A small desktop program and a large banking server cannot use
            the same set of tools efficiently.
          </p>
        </section>

        {/* ================= EDITIONS SVG ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Java Editions at a Glance
          </h2>

          <svg
            viewBox="0 0 900 260"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="Java editions overview diagram"
          >
            {/* SE */}
            <rect x="60" y="90" width="220" height="80" rx="14" fill="#38bdf8" />
            <text x="170" y="120" textAnchor="middle" fontSize="14" fill="#0f172a">Java SE</text>
            <text x="170" y="145" textAnchor="middle" fontSize="12" fill="#0f172a">Core Java</text>

            {/* EE */}
            <rect x="340" y="60" width="220" height="100" rx="14" fill="#a855f7" />
            <text x="450" y="100" textAnchor="middle" fontSize="14" fill="#0f172a">Java EE</text>
            <text x="450" y="125" textAnchor="middle" fontSize="12" fill="#0f172a">Enterprise Apps</text>

            {/* ME */}
            <rect x="620" y="100" width="220" height="70" rx="14" fill="#22c55e" />
            <text x="730" y="130" textAnchor="middle" fontSize="14" fill="#0f172a">Java ME</text>
            <text x="730" y="150" textAnchor="middle" fontSize="12" fill="#0f172a">Embedded / Mobile</text>
          </svg>
        </section>

        {/* ================= JAVA SE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Java SE (Standard Edition)
          </h2>
          <p className="leading-relaxed max-w-4xl">
            <strong>Java SE</strong> is the foundation of all Java programming.
            It contains core libraries and APIs required to build desktop
            applications and basic server-side programs.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Swadeep learns loops, classes, and objects in Barrackpore,
            he is working entirely with Java SE.
          </p>

          <JavaCodeBlock
            language="java"
            code={`class HelloSE {
    public static void main(String[] args) {
        System.out.println("Java SE program");
    }
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400">
            <strong>API Used:</strong> <code>System.out.println()</code><br />
            <strong>Return Type:</strong> void<br />
            <strong>Purpose:</strong> Output text to console<br />
            <strong>When & Why:</strong> Used in almost every Java SE program
          </p>
        </section>

        {/* ================= JAVA EE ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Java EE (Enterprise Edition)
          </h2>
          <p className="leading-relaxed max-w-4xl">
            <strong>Java EE</strong> is built on top of Java SE and is used to
            develop large-scale, distributed, and web-based applications.
            It includes technologies like Servlets, JSP, and enterprise APIs.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Banking systems or government portals used in Naihati often rely
            on Java EE technologies for reliability and scalability.
          </p>
        </section>

        {/* ================= JAVA ME ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Java ME (Micro Edition)
          </h2>
          <p className="leading-relaxed max-w-4xl">
            <strong>Java ME</strong> is designed for devices with limited resources
            such as embedded systems, sensors, and older mobile devices.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Simple control systems or devices used in factories around
            Ichapur may still use Java ME-based solutions.
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Thinking Java SE, EE, and ME are different languages</li>
            <li>Starting enterprise learning without mastering Java SE</li>
            <li>Assuming Java ME is obsolete everywhere</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Always master Java SE before moving ahead</li>
            <li>Choose the edition based on application requirements</li>
            <li>Understand that editions share the same Java language</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I differentiate Java SE, EE, and ME?</li>
            <li>Do I know which edition to start with?</li>
            <li>Do I understand why Java has multiple editions?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            While teaching Java editions, ensure students remember one key idea:
            <strong>the Java language remains the same</strong>; only the libraries
            and application targets change. Confusion at this stage often leads
            to unnecessary fear of enterprise Java.
          </p>
          <p className="leading-relaxed max-w-4xl">
            Encourage learners to clearly associate Java SE with learning and
            foundations, Java EE with large systems, and Java ME with constrained
            environments. This mental mapping prevents long-term confusion.
          </p>
        </section>
      </div>
    );
  }
}
