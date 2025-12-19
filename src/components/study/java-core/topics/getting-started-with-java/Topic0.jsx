// Topic0.jsx
// Topic 1: What is Java and where it is used
// React 19 – Class Based Component (Zero-config animations)

import React, { Component } from "react";
import JavaCodeBlock from "../../../../../common/JavaCodeBlock";

// Zero-config animation helpers
const fadeIn =
  "motion-safe:animate-[fade_0.6s_ease-out_forwards] opacity-0";
const slideUp =
  "motion-safe:animate-[slideUp_0.6s_ease-out_forwards] opacity-0 translate-y-4";
const delay100 = "animation-delay-[100ms]";
const delay200 = "animation-delay-[200ms]";
const delay300 = "animation-delay-[300ms]";

export default class Topic0 extends Component {
  constructor(props) {
    super(props);
    this.state = { initialized: false };
  }

  componentDidMount() {
    this.setState({ initialized: true });
  }

  render() {
    return (
      <div className="space-y-14 px-4 md:px-10 py-8 text-slate-800 dark:text-slate-200">

        {/* ================= INLINE KEYFRAMES (NO CONFIG) ================= */}
        <style>
          {`
            @keyframes fade {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(16px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>

        {/* ================= TITLE ================= */}
        <header className={`space-y-3 ${fadeIn}`}>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-sky-600 dark:text-sky-400">
            What is Java and Where It Is Used
          </h1>
          <p className="max-w-3xl text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-400">
            This topic builds your very first mental model of Java — what it is,
            what it is NOT, and where it is actually used in the real world.
          </p>
        </header>

        {/* ================= CONCEPT ================= */}
        <section className={`space-y-5 ${slideUp} ${delay100}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Core Definition
          </h2>
          <p className="leading-relaxed max-w-4xl">
            <strong>Java</strong> is a <strong>high-level, object-oriented programming language</strong>
            and also a <strong>software platform</strong>. It is designed so that a program written
            once can run on many different machines without modification.
          </p>
          <p className="leading-relaxed max-w-4xl">
            When Swadeep writes a Java program in a computer lab at Barrackpore and
            Abhronila runs the same program later in Naihati, the behavior remains
            identical. This property is known as <strong>platform independence</strong>.
          </p>
        </section>

        {/* ================= SEMANTIC SVG ================= */}
        <section className={`space-y-4 ${slideUp} ${delay200}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            How Java Works Everywhere
          </h2>

          <svg
            viewBox="0 0 900 260"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
            aria-label="Java platform independence diagram"
          >
            {/* Java Source */}
            <rect
              x="40"
              y="90"
              width="200"
              height="70"
              rx="12"
              fill="#38bdf8"
              className="transition-transform duration-300 hover:scale-105"
            />
            <text x="140" y="130" textAnchor="middle" fontSize="14" fill="#0f172a">
              Java Source Code
            </text>

            {/* JVM */}
            <rect
              x="340"
              y="90"
              width="200"
              height="70"
              rx="12"
              fill="#a855f7"
              className="transition-transform duration-300 hover:scale-105"
            />
            <text x="440" y="130" textAnchor="middle" fontSize="14" fill="#0f172a">
              JVM (Java Virtual Machine)
            </text>

            {/* Platforms */}
            {[
              { y: 30, label: "Windows", color: "#22c55e" },
              { y: 110, label: "Linux", color: "#f97316" },
              { y: 190, label: "macOS", color: "#eab308" },
            ].map((p, i) => (
              <g key={i}>
                <rect
                  x="640"
                  y={p.y}
                  width="200"
                  height="60"
                  rx="12"
                  fill={p.color}
                  className="transition-transform duration-300 hover:scale-105"
                />
                <text
                  x="740"
                  y={p.y + 35}
                  textAnchor="middle"
                  fontSize="13"
                  fill="#0f172a"
                >
                  {p.label}
                </text>
              </g>
            ))}

            {/* Animated arrows */}
            {[
              { x1: 240, y1: 125, x2: 340, y2: 125 },
              { x1: 540, y1: 125, x2: 640, y2: 60 },
              { x1: 540, y1: 125, x2: 640, y2: 140 },
              { x1: 540, y1: 125, x2: 640, y2: 220 },
            ].map((l, i) => (
              <line
                key={i}
                {...l}
                stroke="#475569"
                strokeWidth="2"
                strokeDasharray="120"
                strokeDashoffset="120"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="120"
                  to="0"
                  dur="0.8s"
                  fill="freeze"
                />
              </line>
            ))}
          </svg>

          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl">
            The JVM acts as a bridge between Java programs and different operating systems.
          </p>
        </section>

        {/* ================= WHERE JAVA IS USED ================= */}
        <section className={`space-y-4 ${slideUp} ${delay300}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Where Java Is Used in Real Life
          </h2>
          <ul className="list-disc list-inside space-y-2 max-w-3xl">
            <li>Banking systems and ATM software</li>
            <li>Android mobile applications</li>
            <li>Large web applications (server-side)</li>
            <li>School and college management systems</li>
            <li>Enterprise software used by governments and companies</li>
          </ul>
        </section>

        {/* ================= CODE DEMO ================= */}
        <section className={`space-y-4 ${slideUp} ${delay300}`}>
          <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">
            Small Java Program
          </h2>

          <JavaCodeBlock
            language="java"
            code={`class HelloJava {
    public static void main(String[] args) {
        System.out.println("Java is everywhere!");
    }
}`}
          />

          <p className="text-sm text-slate-600 dark:text-slate-400">
            <strong>Method:</strong> public static void main(String[] args)<br />
            <strong>Return Type:</strong> void<br />
            <strong>Purpose:</strong> Entry point of every Java program<br />
            <strong>Why used:</strong> JVM starts execution from this method
          </p>
        </section>

        {/* ================= TEACHER NOTE ================= */}
        <section className={`space-y-4 border-t pt-6 ${fadeIn}`}>
          <h2 className="text-xl font-semibold text-purple-600 dark:text-purple-400">
            Teacher’s Note
          </h2>
          <p className="leading-relaxed max-w-4xl">
            Focus on concept clarity over speed. Students must remember that Java
            works everywhere because of the JVM—not because of the operating system.
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm max-w-4xl">
            <li>Never confuse Java with JavaScript</li>
            <li>Always associate Java execution with JVM</li>
            <li>Think of Java as long-term industry software</li>
          </ul>
        </section>
      </div>
    );
  }
}
