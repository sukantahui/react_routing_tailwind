import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic0_files/topic0_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";

import noteText from "./topic0_files/topic0_note.txt?raw";

/**
 * Topic0: Introduction to Linear Programming
 *
 * @component
 * @returns {JSX.Element} The rendered Topic0 component
 *
 * @purpose Provides a comprehensive introduction to Linear Programming,
 * covering the definition, history, key components, real-world applications,
 * and the problem-solving mindset required for LP.
 *
 * @when_used Used as the first topic in a Linear Programming course or module,
 * establishing foundational knowledge before diving into mathematical formulation
 * and solution methods.
 */
const Topic0 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 0
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Foundation
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Introduction to Linear Programming
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          The art and science of optimizing a linear objective subject to linear
          constraints — the cornerstone of operations research and decision
          science.
        </p>
      </header>

      {/* ===== SECTION 1: WHAT IS LP ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🧠</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            What is Linear Programming?
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            <strong className="text-gray-900 dark:text-white">
              Linear Programming (LP)
            </strong>{" "}
            is a mathematical method for determining the best possible outcome —
            such as maximum profit or minimum cost — in a model whose
            requirements are represented by <strong>linear relationships</strong>
            . It is one of the most widely used tools in operations research,
            management science, and industrial engineering.
          </p>
        </div>

        {/* Concept illustration SVG */}
        <div className="mt-6 bg-blue-50/40 dark:bg-blue-950/20 rounded-2xl p-4 md:p-6 border border-blue-100 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <svg
              viewBox="0 0 400 200"
              className="w-full max-w-md h-auto"
              aria-label="Linear Programming concept diagram showing optimization with constraints"
              role="img"
            >
              {/* Background grid */}
              <rect x="0" y="0" width="400" height="200" fill="none" />
              <g stroke="#94a3b8" strokeWidth="0.5" opacity="0.3">
                {Array.from({ length: 11 }, (_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 40}
                    y1="20"
                    x2={i * 40}
                    y2="180"
                  />
                ))}
                {Array.from({ length: 9 }, (_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={20 + i * 20}
                    x2="400"
                    y2={20 + i * 20}
                  />
                ))}
              </g>

              {/* Feasible region (polygon) */}
              <polygon
                points="80,160 240,160 320,80 240,40 80,40"
                fill="#3b82f6"
                fillOpacity="0.15"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="4,4"
              >
                <animate
                  attributeName="fillOpacity"
                  values="0.08;0.2;0.08"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </polygon>

              {/* Objective function line (moving) */}
              <line
                x1="60"
                y1="160"
                x2="340"
                y2="40"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeDasharray="6,4"
              >
                <animate
                  attributeName="y1"
                  values="160;140;160"
                  dur="5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y2"
                  values="40;20;40"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </line>

              {/* Labels */}
              <text x="10" y="20" fontSize="10" fill="#475569" dark="#94a3b8">
                Feasible
              </text>
              <text x="10" y="34" fontSize="10" fill="#475569" dark="#94a3b8">
                Region
              </text>
              <text
                x="280"
                y="28"
                fontSize="10"
                fill="#ef4444"
                fontWeight="bold"
              >
                Objective
              </text>
              <text
                x="280"
                y="42"
                fontSize="10"
                fill="#ef4444"
                fontWeight="bold"
              >
                Function
              </text>

              {/* Corner points */}
              {[
                [80, 160],
                [240, 160],
                [320, 80],
                [240, 40],
                [80, 40],
              ].map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#3b82f6"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                >
                  <animate
                    attributeName="r"
                    values="3;5;3"
                    dur="3s"
                    begin={`${i * 0.5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              {/* Arrow indicating optimization direction */}
              <g transform="translate(350, 100)">
                <line
                  x1="0"
                  y1="30"
                  x2="0"
                  y2="-10"
                  stroke="#22c55e"
                  strokeWidth="2"
                />
                <polygon
                  points="-6,-10 0,-20 6,-10"
                  fill="#22c55e"
                  stroke="#22c55e"
                  strokeWidth="1"
                >
                  <animate
                    attributeName="transform"
                    values="translate(0,0);translate(0,-6);translate(0,0)"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </polygon>
                <text
                  x="8"
                  y="-8"
                  fontSize="9"
                  fill="#22c55e"
                  fontWeight="bold"
                >
                  Optimize
                </text>
              </g>
            </svg>

            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500/70" />
                <span>Feasible region (all possible solutions)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span>Objective function (what we optimize)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span>Optimal solution (best corner point)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-gray-700 dark:text-gray-300 text-base md:text-lg">
          <p>
            Think of LP as a smart assistant that helps you make the{" "}
            <strong>best decision</strong> when you have limited resources — raw
            materials, time, money, labor — and you need to allocate them
            efficiently to achieve a specific goal.
          </p>
        </div>
      </section>

      {/* ===== SECTION 2: HISTORY ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📜</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            A Brief History
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🧑‍🔬</span>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                George Dantzig
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Developed the Simplex Method in <strong>1947</strong> while working
              for the U.S. Air Force. His work laid the foundation for modern
              optimization theory.
            </p>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="bg-blue-100 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                Key insight: "Optimal solution lies at a corner point"
              </span>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🏭</span>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Wartime & Industrial Use
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              LP was widely adopted during WWII for logistics, supply chain, and
              resource allocation. Today, it's used in{" "}
              <strong>every major industry</strong> worldwide.
            </p>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="bg-green-100 dark:bg-green-950/40 px-2 py-0.5 rounded">
                Over 75 years of real-world impact
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: KEY COMPONENTS (OVERVIEW) ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🧩</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            The Four Pillars of LP
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-5 text-base">
          Every Linear Programming model is built on these four essential
          components:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: "🎯",
              title: "Decision Variables",
              desc: "What you control — the quantities to decide (e.g., units to produce, hours to allocate).",
              color: "blue",
            },
            {
              icon: "📈",
              title: "Objective Function",
              desc: "What you want to optimize — maximize profit or minimize cost, expressed as a linear equation.",
              color: "green",
            },
            {
              icon: "🔒",
              title: "Constraints",
              desc: "Limitations you must respect — resource limits, demand requirements, time bounds.",
              color: "amber",
            },
            {
              icon: "✅",
              title: "Non-Negativity",
              desc: "Decision variables cannot be negative — you can't produce negative units.",
              color: "purple",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={clsx(
                "bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800",
                "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
                `hover:shadow-${item.color}-500/10`
              )}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-4 rounded-r-xl">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>💡 Think of it like baking a cake:</strong> You decide{" "}
            <em>how much flour and sugar to use</em> (decision variables),{" "}
            <em>you want the best taste</em> (objective),{" "}
            <em>you have only 2 cups of flour</em> (constraints), and{" "}
            <em>you can't use negative ingredients</em> (non-negativity).
          </p>
        </div>
      </section>

      {/* =========================================================
    SECTION 3A: UNDERSTANDING THE FOUR PILLARS WITH AN EXAMPLE
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-350">

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔍</span>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Let's Build an LP Model Step by Step
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-base mb-6">
          Knowing the four pillars is not enough. The real skill is learning how
          to convert a real-world problem into a Linear Programming model.
        </p>

        {/* BIG IDEA */}
        <div className="mb-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 p-5">

          <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-7">
            <strong>Remember the sequence:</strong>
            <span className="font-semibold">
              {" "}Decision Variables → Objective Function → Constraints → Non-Negativity
            </span>
          </p>

        </div>

        {/* EXAMPLE */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">

          {/* Example Header */}
          <div className="bg-gray-900 dark:bg-black px-5 py-4">

            <div className="flex items-center gap-2">
              <span className="text-xl">🍰</span>

              <h3 className="font-semibold text-white">
                Example: A Bakery
              </h3>
            </div>

            <p className="mt-2 text-sm text-gray-300 leading-6">
              A bakery produces cakes and cookies. Both products require limited
              resources, and the bakery wants to maximize its profit.
            </p>

          </div>

          <div className="p-5 md:p-6 space-y-6">

            {/* STEP 1 */}
            <div className="rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-5">

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
                  1
                </div>

                <div className="flex-1">

                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Identify the Decision Variables
                  </h4>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
                    First ask:
                    <strong className="text-gray-900 dark:text-white">
                      {" "}What do we need to decide?
                    </strong>
                  </p>

                  <div className="mt-4 grid sm:grid-cols-2 gap-3">

                    <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
                      <div className="font-mono font-bold text-blue-700 dark:text-blue-300">
                        x = number of cakes
                      </div>
                    </div>

                    <div className="rounded-lg bg-blue-50 dark:bg-blue-950/30 p-4">
                      <div className="font-mono font-bold text-blue-700 dark:text-blue-300">
                        y = number of cookies
                      </div>
                    </div>

                  </div>

                  <div className="mt-4 border-l-4 border-blue-500 pl-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-white">
                        Key idea:
                      </strong>{" "}
                      Decision variables are the quantities that we are free to
                      choose.
                    </p>
                  </div>

                </div>

              </div>

            </div>


            {/* STEP 2 */}
            <div className="rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-5">

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 flex-shrink-0 rounded-full bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 flex items-center justify-center font-bold">
                  2
                </div>

                <div className="flex-1">

                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Identify the Objective
                  </h4>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
                    Now ask:
                    <strong className="text-gray-900 dark:text-white">
                      {" "}What are we trying to achieve?
                    </strong>
                  </p>

                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    Suppose:
                  </p>

                  <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">

                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      Cake gives ₹100 profit.
                    </li>

                    <li className="flex gap-2">
                      <span className="text-green-500">✓</span>
                      Cookie gives ₹50 profit.
                    </li>

                  </ul>

                  <div className="mt-4 rounded-lg bg-green-50 dark:bg-green-950/30 p-4 text-center">

                    <div className="text-xs uppercase tracking-wider text-green-700 dark:text-green-400 mb-2">
                      Objective Function
                    </div>

                    <div className="font-mono text-lg font-bold text-green-800 dark:text-green-300">
                      Maximize Z = 100x + 50y
                    </div>

                  </div>

                  <div className="mt-4 border-l-4 border-green-500 pl-4">

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong className="text-gray-900 dark:text-white">
                        Why maximize?
                      </strong>{" "}
                      Because the bakery wants the highest possible profit.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* STEP 3 */}
            <div className="rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-5">

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 flex-shrink-0 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
                  3
                </div>

                <div className="flex-1">

                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Identify the Constraints
                  </h4>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
                    The bakery cannot produce unlimited cakes and cookies because
                    its resources are limited.
                  </p>

                  <div className="mt-4 grid sm:grid-cols-2 gap-3">

                    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4">

                      <div className="text-xs text-amber-700 dark:text-amber-400 mb-2">
                        Flour Constraint
                      </div>

                      <div className="font-mono font-bold text-amber-800 dark:text-amber-300">
                        2x + y ≤ 10
                      </div>

                    </div>

                    <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 p-4">

                      <div className="text-xs text-amber-700 dark:text-amber-400 mb-2">
                        Sugar Constraint
                      </div>

                      <div className="font-mono font-bold text-amber-800 dark:text-amber-300">
                        x + 2y ≤ 8
                      </div>

                    </div>

                  </div>

                  <div className="mt-4 border-l-4 border-amber-500 pl-4">

                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-6">

                      <strong className="text-gray-900 dark:text-white">
                        Why ≤?
                      </strong>{" "}
                      Because the bakery can use at most the available amount.
                      It cannot use more than its available resource.

                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* STEP 4 */}
            <div className="rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-5">

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 flex-shrink-0 rounded-full bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold">
                  4
                </div>

                <div className="flex-1">

                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Add Non-Negativity Restrictions
                  </h4>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">
                    We cannot produce a negative number of cakes or cookies.
                  </p>

                  <div className="mt-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 p-4 text-center">

                    <div className="font-mono text-lg font-bold text-purple-800 dark:text-purple-300">
                      x ≥ 0, y ≥ 0
                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* COMPLETE MODEL */}
            <div className="rounded-xl bg-gray-900 dark:bg-black p-6 text-white">

              <div className="flex items-center gap-2 mb-5">

                <span className="text-xl">🧩</span>

                <h4 className="font-semibold">
                  Complete Linear Programming Model
                </h4>

              </div>

              <div className="space-y-3 text-center font-mono text-sm md:text-base">

                <div className="text-green-300">
                  Maximize Z = 100x + 50y
                </div>

                <div className="h-px bg-gray-700 my-4" />

                <div className="text-gray-400">
                  Subject to:
                </div>

                <div>
                  2x + y ≤ 10
                </div>

                <div>
                  x + 2y ≤ 8
                </div>

                <div className="pt-2">
                  x ≥ 0, y ≥ 0
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
    SECTION 3B: UNDERSTANDING INEQUALITY LANGUAGE
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16">

        <div className="flex items-center gap-3 mb-4">

          <span className="text-2xl">🔢</span>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Understanding Constraint Language
          </h2>

        </div>

        <p className="text-gray-600 dark:text-gray-400 text-base mb-6">
          One of the most important skills in LP is converting ordinary language
          into mathematical inequalities.
        </p>

        <div className="grid gap-3">

          {[
            ["At most 100", "≤ 100", "You cannot exceed 100."],
            ["Maximum 100", "≤ 100", "The largest allowed value is 100."],
            ["Cannot exceed 100", "≤ 100", "The value must remain within 100."],
            ["At least 100", "≥ 100", "The value must be 100 or more."],
            ["Minimum 100", "≥ 100", "The smallest allowed value is 100."],
            ["Exactly 100", "= 100", "The value must be precisely 100."],
          ].map(([phrase, symbol, explanation], index) => (

            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1.5fr] gap-3 items-center bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-4"
            >

              <div className="font-medium text-gray-900 dark:text-white">
                {phrase}
              </div>

              <div className="font-mono font-bold text-lg text-blue-600 dark:text-blue-400">
                {symbol}
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                {explanation}
              </div>

            </div>

          ))}

        </div>

        <div className="mt-5 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 p-5">

          <p className="text-sm text-red-800 dark:text-red-300">

            <strong>⚠️ Be careful:</strong>{" "}
            "At least" means <strong>≥</strong>, while "at most" means{" "}
            <strong>≤</strong>.

          </p>

        </div>

      </section>


      {/* =========================================================
    SECTION 3C: THE FOUR QUESTIONS
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16">

        <div className="rounded-2xl bg-gray-900 dark:bg-black p-6 md:p-8">

          <div className="text-center mb-8">

            <div className="text-2xl mb-2">🧠</div>

            <h2 className="text-2xl md:text-3xl font-bold text-white">
              The Four Questions You Should Always Ask
            </h2>

            <p className="mt-2 text-gray-400 text-sm">
              Use these questions whenever you encounter an LP word problem.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {[
              {
                number: "01",
                question: "What do I need to decide?",
                answer: "Decision Variables",
              },
              {
                number: "02",
                question: "What am I trying to achieve?",
                answer: "Objective Function",
              },
              {
                number: "03",
                question: "What limits or requirements exist?",
                answer: "Constraints",
              },
              {
                number: "04",
                question: "Can the variables be negative?",
                answer: "Non-Negativity",
              },
            ].map((item) => (

              <div
                key={item.number}
                className="rounded-xl bg-white/5 border border-white/10 p-5"
              >

                <div className="text-blue-400 font-bold text-sm">
                  {item.number}
                </div>

                <h3 className="mt-2 text-white font-semibold">
                  {item.question}
                </h3>

                <div className="mt-4 inline-block rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2 text-sm text-blue-300">
                  → {item.answer}
                </div>

              </div>

            ))}

          </div>

          <div className="mt-8 text-center">

            <p className="text-lg md:text-xl font-bold text-white">
              Decision
              <span className="text-blue-400 mx-2">→</span>
              Objective
              <span className="text-blue-400 mx-2">→</span>
              Constraints
              <span className="text-blue-400 mx-2">→</span>
              Non-Negativity
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
    SECTION 3D: FROM FORMULATION TO GRAPH
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16">

        <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50 dark:bg-indigo-950/20 p-6 md:p-8">

          <div className="flex items-start gap-4">

            <div className="text-3xl">
              📈
            </div>

            <div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                What Happens Next?
              </h2>

              <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-7">

                We now know how to formulate an LP model. But writing the equations
                is only the beginning.

              </p>

              <p className="mt-3 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-7">

                In the next lessons, we will learn how constraints such as{" "}

                <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  2x + y ≤ 10
                </span>

                {" "}can be represented on a graph.

              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 text-sm font-semibold">

                {[
                  "LP Model",
                  "Constraint Lines",
                  "Feasible Region",
                  "Corner Points",
                  "Optimal Solution",
                ].map((item, index, arr) => (

                  <React.Fragment key={item}>

                    <span className="rounded-lg bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-900/50 px-3 py-2 text-indigo-700 dark:text-indigo-300">
                      {item}
                    </span>

                    {index < arr.length - 1 && (
                      <span className="text-indigo-400">
                        →
                      </span>
                    )}

                  </React.Fragment>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===== SECTION 4: REAL-WORLD APPLICATIONS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Where is LP Used?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              industry: "🏗️ Manufacturing",
              examples: [
                "Production planning",
                "Inventory management",
                "Quality control",
              ],
            },
            {
              industry: "🚚 Logistics",
              examples: ["Route optimization", "Fleet management", "Warehousing"],
            },
            {
              industry: "💰 Finance",
              examples: [
                "Portfolio optimization",
                "Risk management",
                "Budget allocation",
              ],
            },
            {
              industry: "🌾 Agriculture",
              examples: [
                "Crop planning",
                "Land allocation",
                "Irrigation scheduling",
              ],
            },
            {
              industry: "🏥 Healthcare",
              examples: [
                "Staff scheduling",
                "Resource allocation",
                "Patient flow",
              ],
            },
            {
              industry: "📢 Marketing",
              examples: [
                "Media mix optimization",
                "Budget allocation",
                "Targeting strategy",
              ],
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
            >
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {item.industry}
              </div>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {item.examples.map((ex, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 5: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Start with the objective",
              desc: "Always identify what you're optimizing first — profit, cost, time, or distance. The objective drives everything else.",
            },
            {
              title: "List all limitations",
              desc: "Write down every resource limit, demand, or policy restriction as a separate constraint. Overlooking one can break the model.",
            },
            {
              title: "Use clear variable names",
              desc: "Instead of x, y, z, use names like x_units_A, y_hours_B. It makes debugging and explaining much easier.",
            },
            {
              title: "Check linearity",
              desc: "Ensure all relationships are linear (no x², no x×y). If not, you might need a different optimization method.",
            },
            {
              title: "Validate with simple numbers",
              desc: "Test your model with small, easy numbers before solving. This catches formulation errors early.",
            },
            {
              title: "Think in 'corners'",
              desc: "The optimal solution in LP always occurs at a corner of the feasible region — this guides your intuition.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-0.5">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 6: COMMON MISTAKES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚠️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Common Pitfalls
          </h2>
        </div>
        <div className="bg-red-50/40 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900/30 p-5">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
            {[
              {
                mistake: "Forgetting non-negativity",
                fix: "Always include x ≥ 0, y ≥ 0 constraints. Negative production doesn't make sense in most problems.",
              },
              {
                mistake: "Mixing maximization and minimization",
                fix: "Be clear about your goal — profit is maximize, cost is minimize. Don't use 'max cost'.",
              },
              {
                mistake: "Using non-linear relationships",
                fix: "LP requires linearity. If you have x² or x×y, consider if you can transform the problem or use another method.",
              },
              {
                mistake: "Misinterpreting constraints",
                fix: "Read carefully: 'at least 5' means ≥ 5, 'no more than 10' means ≤ 10. Get the inequality direction right.",
              },
              {
                mistake: "Overlooking units",
                fix: "Ensure all variables and constraints use consistent units (hours vs minutes, kg vs g).",
              },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-red-500 dark:text-red-400 text-lg flex-shrink-0 mt-0.5">
                  ✗
                </span>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {item.mistake}
                  </span>
                  <br />
                  <span className="text-gray-600 dark:text-gray-400 text-xs">
                    ✓ {item.fix}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 7: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Always write down the problem statement clearly before modeling",
            "Define all variables with their units and meaning",
            "Separate objective function from constraints visually",
            "Test the model with extreme values to validate",
            "Document assumptions explicitly",
            "Review the model with someone else — fresh eyes catch errors",
            "Keep a checklist of LP components when formulating",
            "Practice with small examples before scaling up",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="text-green-500 dark:text-green-400 text-lg flex-shrink-0">
                ✓
              </span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 8: HINT SECTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💭</span>
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">
              Think About…
            </h3>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Observe carefully:</strong> In the cake-baking analogy,
                what would happen if you had "at least 2 cups of sugar" instead
                of "exactly 2 cups"? How would that change the problem?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> Imagine you're managing a
                small factory. List 3 decision variables, 2 constraints, and 1
                objective. What makes this an LP problem?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Susmita runs a bakery
                in Barrackpore. She wants to maximize profit making two types of
                cakes. What information would she need to formulate an LP model?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 9: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Mini Checklist
          </h2>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            By the end of this topic, you should be able to:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            {[
              "✅ Define Linear Programming in your own words",
              "✅ Identify the four key components of any LP model",
              "✅ Name at least 5 real-world applications of LP",
              "✅ Explain why LP is useful for decision-making",
              "✅ Recognize the historical significance of the Simplex Method",
              "✅ Avoid the most common beginner mistakes in LP formulation",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">
                  {item.split(" ")[0]}
                </span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 10: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
        <FAQTemplate
          title="Introduction to Linear Programming FAQs"
          questions={questions}
        />
      </div>
      {/* ===== SECTION 11: Print Note ===== */}
      <PlainTextPrint
        content={noteText}
        buttonText="Print Note"
        title="Introduction to Linear Programming – Printable Note"
        stampText="Coder & AccoTax - Verified"
        className="max-w-5xl mx-auto mb-8 ..."
      />

      {/* ===== SECTION 12: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <Teacher
          note={
            "Linear Programming is one of the most beautiful and practical branches of mathematics. As you begin this journey, remember: LP is not just about solving equations — it's about developing a structured way of thinking about resource allocation. The students who succeed in LP are those who train their mind to see the 'optimization' in everyday problems. Mahima from Jadavpur once told me that after learning LP, she started seeing her daily schedule as an optimization problem — and that's exactly the mindset we want to cultivate! Start with the fundamentals, practice the formulation steps, and soon you'll be solving real-world problems with confidence. The worked examples in the upcoming topics will help you build that muscle."
          }
        />
      </div>
    </div>
  );
};

export default Topic0;