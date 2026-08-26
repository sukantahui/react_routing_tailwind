// Topic6.jsx
// Topic 7: Role of JVM in Platform Independence
// React 19 – Class Based Component

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

export default class Topic6 extends Component {
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
            Role of JVM in Platform Independence
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Platform independence is Java’s most famous promise. This topic explains
            exactly how the JVM makes that promise possible.
          </p>
        </header>

        {/* ================= CORE IDEA ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            The Core Idea
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Java programs are <strong>not compiled directly into machine code</strong>.
            Instead, they are compiled into an intermediate form called
            <strong> bytecode</strong>. The <strong>Java Virtual Machine (JVM)</strong>
            then converts this bytecode into machine-specific instructions.
          </p>
          <p className="leading-relaxed max-w-4xl">
            This design allows the same Java program written in Barrackpore to run
            without modification on systems in Shyamnagar, Ichapur, or Naihati.
          </p>
        </section>

        {/* ================= STEP-BY-STEP SVG ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            How JVM Enables Platform Independence
          </h2>

          <svg
            viewBox="0 0 950 280"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="JVM platform independence flow"
          >
            {/* Source */}
            <rect x="40" y="110" width="200" height="60" rx="12" fill="#38bdf8" />
            <text x="140" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">
              Java Source Code
            </text>

            {/* Compiler */}
            <rect x="280" y="110" width="200" height="60" rx="12" fill="#a855f7" />
            <text x="380" y="145" textAnchor="middle" fontSize="14" fill="#0f172a">
              Bytecode (.class)
            </text>

            {/* JVM */}
            <rect x="520" y="80" width="200" height="120" rx="14" fill="#22c55e" />
            <text x="620" y="120" textAnchor="middle" fontSize="14" fill="#0f172a">
              JVM
            </text>
            <text x="620" y="145" textAnchor="middle" fontSize="12" fill="#0f172a">
              OS-Specific
            </text>
            <text x="620" y="165" textAnchor="middle" fontSize="12" fill="#0f172a">
              Translation
            </text>

            {/* Platforms */}
            <rect x="780" y="40" width="150" height="50" rx="10" fill="#eab308" />
            <text x="855" y="70" textAnchor="middle" fontSize="12" fill="#0f172a">Windows</text>

            <rect x="780" y="115" width="150" height="50" rx="10" fill="#f97316" />
            <text x="855" y="145" textAnchor="middle" fontSize="12" fill="#0f172a">Linux</text>

            <rect x="780" y="190" width="150" height="50" rx="10" fill="#06b6d4" />
            <text x="855" y="220" textAnchor="middle" fontSize="12" fill="#0f172a">macOS</text>

            {/* Arrows */}
            <line x1="240" y1="140" x2="280" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="480" y1="140" x2="520" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="720" y1="120" x2="780" y2="65" stroke="#475569" strokeWidth="2" />
            <line x1="720" y1="140" x2="780" y2="140" stroke="#475569" strokeWidth="2" />
            <line x1="720" y1="160" x2="780" y2="215" stroke="#475569" strokeWidth="2" />
          </svg>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            Different JVM implementations exist for different operating systems,
            but the bytecode remains the same.
          </p>
        </section>

        {/* ================= TECHNICAL DETAILS ================= */}
        <section className="space-y-5">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            What Exactly the JVM Does
          </h2>
          <ul className="list-disc list-inside space-y-2 max-w-4xl">
            <li>Loads bytecode into memory (Class Loader)</li>
            <li>Verifies bytecode for security and correctness</li>
            <li>Executes instructions using interpreter or JIT compiler</li>
            <li>Manages memory using garbage collection</li>
          </ul>
        </section>

        {/* ================= MINI CODE CONTEXT ================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Same Bytecode, Different Machines
          </h2>

          <JavaCodeBlock
            language="java"
            code={`class PlatformTest {
    public static void main(String[] args) {
        System.out.println("Runs everywhere using JVM");
    }
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            <strong>Method Signature:</strong> <code>public static void main(String[] args)</code><br />
            <strong>Return Type:</strong> void<br />
            <strong>Purpose:</strong> Entry point executed by JVM<br />
            <strong>When & Why:</strong> JVM always starts execution from this method
          </p>
        </section>

        {/* ================= COMMON MISTAKES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-rose-600 dark:text-rose-400">
            Common Beginner Mistakes
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Thinking Java programs run without JVM</li>
            <li>Believing bytecode is machine-specific</li>
            <li>Confusing JVM with JDK or JRE</li>
          </ul>
        </section>

        {/* ================= BEST PRACTICES ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">
            Best Practices
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Always associate platform independence with JVM</li>
            <li>Understand bytecode before JVM internals</li>
            <li>Remember: one bytecode, many JVMs</li>
          </ul>
        </section>

        {/* ================= CHECKLIST ================= */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-sky-600 dark:text-sky-400">
            Student Checklist
          </h2>
          <ul className="list-disc list-inside space-y-1 max-w-3xl">
            <li>Can I explain platform independence step by step?</li>
            <li>Do I know why bytecode is important?</li>
            <li>Can I clearly state the role of JVM?</li>
          </ul>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Students should repeatedly visualize this flow: source code → bytecode → JVM → OS.
            If this mental model is strong, advanced JVM internals and performance topics
            become much easier later.
          </p>
          <p className="leading-relaxed max-w-4xl">
            A practical classroom exercise is to ask learners to explain why Java needs
            different JVMs for Windows and Linux but still uses the same bytecode.
            Correct reasoning here confirms conceptual clarity.
          </p>
        </section>
      </div>
    );
  }
}
