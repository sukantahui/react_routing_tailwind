import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Components ──────────────────────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import JavaFileLoader from "../../../../../common/JavaFileLoader";

// ─── Java Files ─────────────────────────────────────────────────────────────────
import conversionExamplesJava from "./topic5_files/ConversionExamples.java?raw";
import logToExpJava from "./topic5_files/LogToExp.java?raw";
import expToLogJava from "./topic5_files/ExpToLog.java?raw";

// ─── FAQ Data ──────────────────────────────────────────────────────────────────
import questions from "./topic5_files/topic5_questions";

// ─── Main Component ─────────────────────────────────────────────────────────────
const Topic5 = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // ─── Animation helpers ──────────────────────────────────────────────────────
  const sectionClass = "animate-[fadeSlideUp_0.6s_ease-out_forwards] opacity-100";
  const staggerClass = (index) =>
    `animate-[fadeSlideUp_0.5s_ease-out_${index * 0.08}s_forwards] opacity-100`;

  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 font-sans leading-relaxed antialiased transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">

        {/* ─── Header ────────────────────────────────────────────────────────── */}
        <header className={clsx(sectionClass, "space-y-4")}>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold tracking-wider uppercase bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
              Topic 5
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Math Foundations
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Converting Between Exponential and Logarithmic Forms
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Mastering the <span className="text-indigo-600 dark:text-indigo-400 font-semibold">conversion</span>{" "}
            between exponential and logarithmic forms — the key to solving exponential equations and understanding
            algorithm complexity.
          </p>
        </header>

        {/* ─── Tab Navigation ────────────────────────────────────────────────── */}
        <nav className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
          {["overview", "code", "faq"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 dark:shadow-indigo-500/20"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            &gt;
              {tab === "overview" && "📖 Overview"}
              {tab === "code" && "☕ Code Examples"}
              {tab === "faq" && "❓ FAQ"}
            </button>
          ))}
        </nav>

        {/* ─── Tab Content ────────────────────────────────────────────────────── */}
        <div className="space-y-12">

          {/* ═══ OVERVIEW TAB ═══ */}
          {activeTab === "overview" && (
            <div className="space-y-12">

              {/* ── Introduction ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> What Are Exponential and Logarithmic Forms?
                </h2>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    Exponential and logarithmic forms are two sides of the same coin — they are <strong>inverses</strong>.
                    The relationship is:
                  </p>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 text-center font-mono text-lg">
                    <span className="text-indigo-600 dark:text-indigo-400">b<sup>y</sup> = x</span> &nbsp;⇔&nbsp;{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">log<sub>b</sub>(x) = y</span>
                  </div>
                  <p>
                    Here, <strong>b</strong> is the base, <strong>y</strong> is the exponent (or logarithm), and{" "}
                    <strong>x</strong> is the result. Converting between the two forms allows you to solve for any of
                    these three variables when the other two are known.
                  </p>
                  <p>
                    Think of it like a translation: "The power <strong>y</strong> that raises <strong>b</strong> to get{" "}
                    <strong>x</strong>" is the same as saying "log base <strong>b</strong> of <strong>x</strong> is{" "}
                    <strong>y</strong>". This is fundamental in many fields — from computing the number of steps in
                    binary search (log₂) to solving exponential growth problems.
                  </p>
                </div>
              </section>

              {/* ── Conversion Rules ── */}
              <section className={clsx(sectionClass, "space-y-6")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> How to Convert
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Exponential → Logarithmic",
                      desc: "If b^y = x, then log_b(x) = y.",
                      example: "2^3 = 8 → log₂(8) = 3",
                    },
                    {
                      title: "Logarithmic → Exponential",
                      desc: "If log_b(x) = y, then b^y = x.",
                      example: "log₂(8) = 3 → 2^3 = 8",
                    },
                    {
                      title: "Solving for exponent",
                      desc: "If b^y = x, then y = log_b(x).",
                      example: "2^y = 16 → y = log₂(16) = 4",
                    },
                    {
                      title: "Solving for base",
                      desc: "If b^y = x, then b = x^(1/y).",
                      example: "b^3 = 8 → b = 8^(1/3) = 2",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10",
                        "hover:scale-[1.01] hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{item.desc}</p>
                      <p className="font-mono text-sm text-indigo-600 dark:text-indigo-400 mt-2">{item.example}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Visual Intuition ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Visual Intuition: The Relationship
                </h2>
                <div className="w-full rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
                  <svg
                    viewBox="0 0 800 400"
                    className="w-full h-auto max-h-80"
                    role="img"
                    aria-label="Exponential vs logarithmic function"
                  >
                    <defs>
                      <marker id="arrowhead5" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#6b7280" className="dark:fill-gray-400" />
                      </marker>
                    </defs>

                    {/* Grid */}
                    <g stroke="#d1d5db" strokeWidth="0.5" opacity="0.3" className="dark:stroke-gray-700">
                      <line x1="60" y1="50" x2="760" y2="50" />
                      <line x1="60" y1="137" x2="760" y2="137" />
                      <line x1="60" y1="224" x2="760" y2="224" />
                      <line x1="60" y1="311" x2="760" y2="311" />
                      <line x1="60" y1="50" x2="60" y2="350" />
                      <line x1="207" y1="50" x2="207" y2="350" />
                      <line x1="354" y1="50" x2="354" y2="350" />
                      <line x1="501" y1="50" x2="501" y2="350" />
                      <line x1="648" y1="50" x2="648" y2="350" />
                    </g>

                    {/* Axes */}
                    <line x1="60" y1="350" x2="760" y2="350" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />
                    <line x1="60" y1="50" x2="60" y2="350" stroke="#374151" strokeWidth="2" className="dark:stroke-gray-400" />

                    <text x="400" y="380" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400">
                      x
                    </text>
                    <text x="20" y="200" textAnchor="middle" fontSize="13" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(-90,20,200)">
                      y
                    </text>

                    {/* Exponential curve 2^x */}
                    <path
                      d="M60 340 L120 325 L180 300 L240 260 L300 200 L360 130 L420 80 L480 60 L540 52 L600 50 L660 50 L720 50 L760 50"
                      fill="none"
                      stroke="#f472b6"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <text x="580" y="80" fontSize="12" fill="#f472b6">y = 2ˣ</text>

                    {/* Logarithmic curve log2(x) */}
                    <path
                      d="M60 340 L80 300 L120 240 L180 180 L240 140 L300 110 L380 85 L460 70 L540 58 L620 52 L700 50 L760 50"
                      fill="none"
                      stroke="#34d399"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <text x="580" y="180" fontSize="12" fill="#34d399">y = log₂(x)</text>

                    {/* Line y=x (dashed) */}
                    <line x1="60" y1="340" x2="760" y2="60" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="6,4" />

                    {/* Symmetry annotation */}
                    <text x="420" y="185" fontSize="11" fill="#6b7280" className="dark:fill-gray-400" transform="rotate(45,420,185)">
                      symmetry
                    </text>

                    {/* Animated dot on exponential curve */}
                    <circle cx="300" cy="200" r="6" fill="#f472b6">
                      <animate attributeName="cx" values="120;500;120" dur="6s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="325;85;325" dur="6s" repeatCount="indefinite" />
                    </circle>

                    {/* Corresponding dot on logarithmic curve (reflection) */}
                    <circle cx="200" cy="300" r="6" fill="#34d399">
                      <animate attributeName="cx" values="325;85;325" dur="6s" repeatCount="indefinite" />
                      <animate attributeName="cy" values="120;500;120" dur="6s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    The exponential function y = bˣ and its inverse y = log_b(x) are reflections across the line y = x.
                    Converting between forms is like moving from one side of this symmetry to the other.
                  </p>
                </div>
              </section>

              {/* ── Real-World Usage ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Real-World Usage
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "📈",
                      title: "Compound Interest",
                      desc: "If A = P(1+r)^t, solve for t using logarithms: t = log_{1+r}(A/P).",
                    },
                    {
                      icon: "🔊",
                      title: "Sound Intensity (Decibels)",
                      desc: "dB = 10·log₁₀(I/I₀) — converting between intensity ratio and decibels.",
                    },
                    {
                      icon: "⚗️",
                      title: "pH Chemistry",
                      desc: "pH = -log₁₀[H⁺] — converting hydrogen ion concentration to pH scale.",
                    },
                    {
                      icon: "💻",
                      title: "Algorithm Steps",
                      desc: "If operations = f(n) and we know f(n) = 2^n, find n = log₂(operations).",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 4),
                        "p-5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10",
                        "hover:scale-[1.01] hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{item.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Professional Tips ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Professional Tips
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      tip: "Identify the base, exponent, and result",
                      desc: "In any exponential/log equation, label the three parts clearly before converting.",
                    },
                    {
                      tip: "Use the change of base formula for computation",
                      desc: "When solving log_b(x) in code, use ln(x)/ln(b).",
                    },
                    {
                      tip: "Check your conversion by plugging back",
                      desc: "After converting, substitute numbers to verify the equivalence.",
                    },
                    {
                      tip: "Remember the domain",
                      desc: "In log form, x must be positive; in exponential form, b&gt;0 and b≠1.",
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 8),
                        "p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800",
                        "transition-all duration-300 hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700"
                      )}
                    >
                      <p className="font-semibold text-indigo-600 dark:text-indigo-400">✦ {item.tip}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Common Mistakes ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Common Mistakes
                </h2>
                <ul className="space-y-3 list-disc pl-6 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>Misplacing the base:</strong> In b^y = x, the base b stays the same in log form: log_b(x)=y.
                    Do not swap base and argument.
                  </li>
                  <li>
                    <strong>Forgetting that log_b(x) is the exponent:</strong> log₂(8)=3, not 2³.
                  </li>
                  <li>
                    <strong>Confusing log_b(x) with b^(log_b(x)):</strong> They are equal to x (identity).
                  </li>
                  <li>
                    <strong>Assuming all logs are base 10:</strong> Always check the base; many scientific contexts use base e.
                  </li>
                  <li>
                    <strong>Ignoring domain restrictions:</strong> log_b(x) is only defined for x &gt; 0.
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
                      — <strong>Susmita</strong> once tried to compute log₂(-8) and got an error in her program,
                      because she didn't check the input validity.
                    </span>
                  </li>
                </ul>
              </section>

              {/* ── Best Practices ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Best Practices
                </h2>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Always state the base clearly</strong> when writing logarithmic expressions.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Use the inverse relationship to solve equations</strong> — if you have an exponential,
                      take logs; if you have a log, exponentiate.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>Test conversions with simple numbers</strong> (like 2³=8) to verify understanding.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40">
                    <p className="text-gray-700 dark:text-gray-200">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">✓</span>{" "}
                      <strong>In code, validate inputs</strong> before computing logarithms to avoid NaN or exceptions.
                    </p>
                  </div>
                </div>
              </section>

              {/* ── Mini Checklist ── */}
              <section className={clsx(sectionClass, "space-y-4")}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-indigo-500">●</span> Mini Checklist
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "✅ Can you identify the base, exponent, and result in an exponential equation?",
                    "✅ Can you convert from exponential to logarithmic form correctly?",
                    "✅ Can you convert from logarithmic to exponential form correctly?",
                    "✅ Do you know the domain restrictions for logarithms?",
                    "✅ Can you solve for the exponent using logarithms?",
                    "✅ Can you solve for the base using exponentiation?",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={clsx(
                        staggerClass(i + 12),
                        "p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 text-sm text-gray-700 dark:text-gray-300",
                        "transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800/50"
                      )}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Hint Section ── */}
              <section className={clsx(sectionClass, "space-y-3 p-5 rounded-xl bg-amber-50/70 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40")}>
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
                  💡 Think About…
                </h3>
                <ul className="space-y-2 text-amber-700 dark:text-amber-200/80 text-sm list-disc pl-5">
                  <li>
                    <strong>Observe carefully:</strong> In the equation 2^3 = 8, where does each number appear in the
                    logarithmic form log₂(8) = 3? Identify the base, argument, and value.
                  </li>
                  <li>
                    <strong>Try changing this:</strong> Write the equation 5^2 = 25 in logarithmic form. Then write
                    log₃(27) = 3 in exponential form.
                  </li>
                  <li>
                    <strong>Think about:</strong> A school in <strong>Naihati</strong> has 1024 students and they
                    keep splitting into two equal groups. How many splits until each group has 1 student? That's
                    solving 2^y = 1024 → y = log₂(1024) = 10.
                  </li>
                </ul>
              </section>

            </div>
          )}

          {/* ═══ CODE TAB ═══ */}
          {activeTab === "code" && (
            <div className="space-y-8">

              {/* ── Java: Conversion Examples ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Conversion Examples — Exponential ↔ Logarithmic
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Demonstrates how to convert between forms using Java's Math functions and custom methods.
                </p>
                <JavaFileLoader
                  fileModule={conversionExamplesJava}
                  title="ConversionExamples.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Log to Exponential ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Logarithmic to Exponential — Solving for x
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  If log_b(x) = y, then x = b^y. This example computes x given b and y.
                </p>
                <JavaFileLoader
                  fileModule={logToExpJava}
                  title="LogToExp.java"
                  highlightLines={[]}
                />
              </section>

              {/* ── Java: Exp to Log ── */}
              <section className={clsx(sectionClass, "space-y-3")}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  ☕ Exponential to Logarithmic — Solving for y
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  If b^y = x, then y = log_b(x). This example computes y given b and x.
                </p>
                <JavaFileLoader
                  fileModule={expToLogJava}
                  title="ExpToLog.java"
                  highlightLines={[]}
                />
              </section>

            </div>
          )}

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div className={clsx(sectionClass, "space-y-4")}>
              <FAQTemplate
                title="Converting Between Exponential and Logarithmic Forms — FAQs"
                questions={questions}
              />
            </div>
          )}

        </div>

        {/* ─── Teacher's Note ────────────────────────────────────────────────── */}
        <div className={clsx(sectionClass, "pt-4 border-t border-gray-200 dark:border-gray-800")}>
          <Teacher
            note={
              "Converting between exponential and logarithmic forms is a skill that students must practice until " +
              "it becomes second nature. I've found that the 'base stays, swap the other two' mnemonic helps: " +
              "in b^y = x, the base b stays in log_b(x) = y, and the exponent y and result x swap positions. " +
              "Encourage students to always test their conversions with simple known facts, e.g., 2^3=8 ↔ log₂(8)=3. " +
              "This topic is the bridge between the mathematical foundation and its application in complexity analysis — " +
              "once they can move fluently between forms, they'll be ready to understand why logarithms appear in algorithms."
            }
          />
        </div>

        {/* ─── Footer ────────────────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-gray-400 dark:text-gray-600 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p>Topic 5 · Converting Between Exponential and Logarithmic Forms · Built with ❤️ for the classroom</p>
        </footer>

      </div>

      {/* ─── Global Keyframes ────────────────────────────────────────────────── */}
      <style>{`
        @keyframes fadeSlideUp {
          0%   { opacity: 0; transform: translateY(18px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeSlideUp_.*\\] {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic5;