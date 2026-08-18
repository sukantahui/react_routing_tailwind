import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2: Decision variables
 *
 * @component
 * @returns {JSX.Element} The rendered Topic2 component
 *
 * @purpose Explains the concept of decision variables in Linear Programming:
 * what they are, how to define them, their role, and common practices.
 *
 * @when_used After understanding the meaning and purpose of LP (Topic1),
 * this topic focuses on the core elements that form the building blocks of an LP model.
 */
const Topic2 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 2
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Decision Variables
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Decision Variables
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          The choices you control — the heart of every Linear Programming model.
        </p>
      </header>

      {/* ===== SECTION 1: WHAT ARE DECISION VARIABLES? ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎛️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            What Are Decision Variables?
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            <strong>Decision variables</strong> are the unknown quantities that
            represent the <strong>choices</strong> available to the
            decision‑maker. In an LP model, they are the variables you want to
            determine — the <strong>"what"</strong> of the problem.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300 text-base">
            <li>
              <strong>Example:</strong> In a factory, you decide how many units
              of Product A and Product B to produce. So{" "}
              <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                x₁
              </code>{" "}
              = units of A,{" "}
              <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                x₂
              </code>{" "}
              = units of B.
            </li>
            <li>
              <strong>Key:</strong> Each variable must have a clear, measurable
              definition and should be controllable.
            </li>
          </ul>
        </div>

        {/* SVG: Variable definition illustration */}
        <div className="mt-6 bg-blue-50/40 dark:bg-blue-950/20 rounded-2xl p-4 md:p-6 border border-blue-100 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <svg
            viewBox="0 0 600 120"
            className="w-full h-auto"
            aria-label="Decision variables definition"
            role="img"
          >
            <g>
              <rect x="10" y="20" width="180" height="80" rx="10" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
              <text x="25" y="50" fontSize="16" fill="#1e293b" dark="#e2e8f0" fontWeight="bold">Decision Variables</text>
              <text x="25" y="72" fontSize="13" fill="#475569" dark="#94a3b8">x₁, x₂, ..., xₙ</text>
              <text x="25" y="90" fontSize="12" fill="#64748b" dark="#94a3b8">(what we choose)</text>
            </g>
            <g>
              <line x1="190" y1="60" x2="230" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-var)" />
            </g>
            <g>
              <rect x="230" y="20" width="160" height="80" rx="10" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2" />
              <text x="245" y="50" fontSize="16" fill="#1e293b" dark="#e2e8f0" fontWeight="bold">Objective</text>
              <text x="245" y="72" fontSize="13" fill="#475569" dark="#94a3b8">Z = c₁x₁ + c₂x₂ + ...</text>
              <text x="245" y="90" fontSize="12" fill="#64748b" dark="#94a3b8">(optimize)</text>
            </g>
            <g>
              <line x1="390" y1="60" x2="430" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-var)" />
            </g>
            <g>
              <rect x="430" y="20" width="160" height="80" rx="10" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2" />
              <text x="445" y="50" fontSize="16" fill="#1e293b" dark="#e2e8f0" fontWeight="bold">Constraints</text>
              <text x="445" y="72" fontSize="13" fill="#475569" dark="#94a3b8">a₁x₁ + a₂x₂ + ... ≤ b</text>
              <text x="445" y="90" fontSize="12" fill="#64748b" dark="#94a3b8">(limits)</text>
            </g>
            <defs>
              <marker id="arrow-var" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Decision variables connect the objective and constraints.
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: HOW TO DEFINE VARIABLES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✏️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            How to Define Decision Variables
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Be Explicit",
              desc: "Write 'Let x = number of units of Product A' not just 'Let x'.",
            },
            {
              title: "Include Units",
              desc: "Specify units (e.g., hours, kilograms, dollars) to avoid confusion.",
            },
            {
              title: "Use Subscripts",
              desc: "For multiple similar items, use x₁, x₂ or x_A, x_B.",
            },
            {
              title: "Check Controllability",
              desc: "Ensure the variable is something you can actually decide.",
            },
            {
              title: "Avoid Redundancy",
              desc: "Don't use two variables for the same decision.",
            },
            {
              title: "Ensure Non‑Negativity",
              desc: "Most variables should be ≥ 0 unless specific reasons not.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
    SECTION 2A: COMPLETE LP EXAMPLE — FROM DATA TO MODEL
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16">

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🧩</span>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Let's Build a Linear Programming Model
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-7 mb-6">
          Let's take a complete real-world example and see exactly where every
          number in the mathematical model comes from.
        </p>


        {/* =====================================================
      EXAMPLE DATA
  ===================================================== */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800
                  bg-gray-50 dark:bg-gray-900/50 overflow-hidden">

          {/* Header */}
          <div className="bg-gray-900 dark:bg-black px-5 py-5">

            <div className="flex items-center gap-3">

              <span className="text-3xl">
                🍰
              </span>

              <div>
                <h3 className="font-semibold text-white text-lg">
                  Example: A Bakery Production Problem
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  A bakery produces cakes and cookies.
                </p>
              </div>

            </div>

          </div>


          <div className="p-5 md:p-6">

            <p className="text-gray-700 dark:text-gray-300 leading-7">
              A bakery produces two products: <strong>cakes</strong> and
              <strong> cookies</strong>. The bakery has limited flour and sugar,
              so it must decide how many of each product to make.
            </p>


            {/* =================================================
          GIVEN DATA
      ================================================= */}
            <div className="mt-6">

              <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3">
                📋 Given Information
              </h4>

              <div className="overflow-x-auto">

                <table className="w-full text-sm border-collapse">

                  <thead>

                    <tr className="bg-gray-100 dark:bg-gray-800">

                      <th className="text-left p-3 border border-gray-200 dark:border-gray-700">
                        Resource / Information
                      </th>

                      <th className="text-center p-3 border border-gray-200 dark:border-gray-700">
                        Cake
                      </th>

                      <th className="text-center p-3 border border-gray-200 dark:border-gray-700">
                        Cookie
                      </th>

                      <th className="text-center p-3 border border-gray-200 dark:border-gray-700">
                        Available
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    <tr className="bg-white dark:bg-gray-950">

                      <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">
                        Profit
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono font-bold text-green-600 dark:text-green-400">
                        ₹100
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono font-bold text-green-600 dark:text-green-400">
                        ₹50
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center text-gray-400">
                        —
                      </td>

                    </tr>


                    <tr className="bg-gray-50 dark:bg-gray-900">

                      <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">
                        Flour
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono">
                        2 kg
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono">
                        1 kg
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono font-bold">
                        10 kg
                      </td>

                    </tr>


                    <tr className="bg-white dark:bg-gray-950">

                      <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">
                        Sugar
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono">
                        1 kg
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono">
                        2 kg
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono font-bold">
                        8 kg
                      </td>

                    </tr>

                  </tbody>

                </table>

              </div>

            </div>


            {/* IMPORTANT DATA NOTE */}
            <div className="mt-5 rounded-xl bg-blue-50 dark:bg-blue-950/20
                      border border-blue-200 dark:border-blue-900/40 p-5">

              <p className="text-sm text-blue-900 dark:text-blue-300 leading-7">

                <strong>💡 Where did these numbers come from?</strong>

                <br />

                The numbers are the <strong>given data of the problem</strong>.
                They are not calculated by the LP method.

                <br /><br />

                For example:

                <span className="font-mono font-bold">
                  {" "}₹100
                </span>

                {" "}means the profit from one cake, while

                <span className="font-mono font-bold">
                  {" "}₹50
                </span>

                {" "}means the profit from one cookie.

              </p>

            </div>


            {/* =================================================
          STEP 1
      ================================================= */}
            <div className="mt-8 rounded-xl border border-blue-200 dark:border-blue-900/40
                      bg-blue-50 dark:bg-blue-950/20 p-5">

              <div className="flex items-start gap-4">

                <div className="w-9 h-9 flex-shrink-0 rounded-full
                          bg-blue-600 text-white
                          flex items-center justify-center font-bold">
                  1
                </div>

                <div className="flex-1">

                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                    Identify the Decision Variables
                  </h4>

                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-7">

                    Ask:

                    <strong>
                      {" "}What quantities do we need to decide?
                    </strong>

                  </p>

                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                    We need to decide how many cakes and cookies to produce.
                  </p>


                  <div className="mt-4 grid sm:grid-cols-2 gap-3">

                    <div className="rounded-lg bg-white dark:bg-gray-950
                              border border-blue-200 dark:border-blue-900/40 p-4">

                      <div className="text-xs text-gray-500 mb-1">
                        Decision Variable 1
                      </div>

                      <div className="font-mono font-bold text-blue-700 dark:text-blue-400">
                        x = number of cakes
                      </div>

                    </div>


                    <div className="rounded-lg bg-white dark:bg-gray-950
                              border border-blue-200 dark:border-blue-900/40 p-4">

                      <div className="text-xs text-gray-500 mb-1">
                        Decision Variable 2
                      </div>

                      <div className="font-mono font-bold text-blue-700 dark:text-blue-400">
                        y = number of cookies
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* ARROW */}
            <div className="text-center text-blue-500 text-xl py-2">
              ↓
            </div>


            {/* =================================================
          STEP 2 OBJECTIVE
      ================================================= */}
            <div className="rounded-xl border border-green-200 dark:border-green-900/40
                      bg-green-50 dark:bg-green-950/20 p-5">

              <div className="flex items-start gap-4">

                <div className="w-9 h-9 flex-shrink-0 rounded-full
                          bg-green-600 text-white
                          flex items-center justify-center font-bold">
                  2
                </div>

                <div className="flex-1">

                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                    Define the Objective
                  </h4>

                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-7">

                    Ask:

                    <strong>
                      {" "}What are we trying to achieve?
                    </strong>

                  </p>

                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-7">

                    The bakery wants to earn as much profit as possible.
                    Therefore, our objective is to <strong>maximize profit</strong>.

                  </p>


                  {/* Derivation */}
                  <div className="mt-5 rounded-xl bg-white dark:bg-gray-950
                            border border-green-200 dark:border-green-900/40 p-5">

                    <p className="text-xs uppercase tracking-wider
                            text-gray-500 mb-4">
                      Where does each number come from?
                    </p>

                    <div className="space-y-3 text-sm">

                      <div className="flex items-center gap-3">

                        <span className="font-mono font-bold text-green-600">
                          100x
                        </span>

                        <span className="text-gray-600 dark:text-gray-400">
                          = ₹100 profit per cake × x cakes
                        </span>

                      </div>


                      <div className="flex items-center gap-3">

                        <span className="font-mono font-bold text-green-600">
                          50y
                        </span>

                        <span className="text-gray-600 dark:text-gray-400">
                          = ₹50 profit per cookie × y cookies
                        </span>

                      </div>

                    </div>


                    <div className="mt-5 border-t border-gray-200 dark:border-gray-800 pt-5">

                      <p className="text-center font-mono text-lg font-bold
                              text-green-700 dark:text-green-400">

                        Maximize Z = 100x + 50y

                      </p>

                    </div>

                  </div>


                  <div className="mt-4 border-l-4 border-green-500 pl-4">

                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-6">

                      <strong>Important:</strong>{" "}
                      The coefficients <strong>100</strong> and <strong>50</strong>
                      come directly from the stated profit per unit.

                      They are <strong>not calculated by the LP method</strong>.

                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* ARROW */}
            <div className="text-center text-green-500 text-xl py-2">
              ↓
            </div>


            {/* =================================================
          STEP 3 FLOUR
      ================================================= */}
            <div className="rounded-xl border border-amber-200 dark:border-amber-900/40
                      bg-amber-50 dark:bg-amber-950/20 p-5">

              <div className="flex items-start gap-4">

                <div className="w-9 h-9 flex-shrink-0 rounded-full
                          bg-amber-500 text-white
                          flex items-center justify-center font-bold">
                  3
                </div>

                <div className="flex-1">

                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                    Create the Flour Constraint
                  </h4>

                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-7">

                    From the given data:

                  </p>

                  <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">

                    <li>
                      • One cake requires <strong>2 kg flour</strong>.
                    </li>

                    <li>
                      • One cookie requires <strong>1 kg flour</strong>.
                    </li>

                    <li>
                      • The bakery has only <strong>10 kg flour</strong>.
                    </li>

                  </ul>


                  <div className="mt-5 rounded-xl bg-white dark:bg-gray-950
                            border border-amber-200 dark:border-amber-900/40 p-5">

                    <div className="space-y-3 text-center font-mono">

                      <div className="text-gray-600 dark:text-gray-400">
                        Flour used by cakes = 2x
                      </div>

                      <div className="text-gray-600 dark:text-gray-400">
                        Flour used by cookies = y
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-800 pt-4">

                        <div className="font-bold text-amber-700 dark:text-amber-400 text-lg">
                          2x + y ≤ 10
                        </div>

                      </div>

                    </div>

                  </div>


                  <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 leading-6">

                    We use <strong>≤</strong> because the bakery can use
                    <strong> at most 10 kg</strong> of flour. It cannot use more
                    than the amount available.

                  </p>

                </div>

              </div>

            </div>


            {/* ARROW */}
            <div className="text-center text-amber-500 text-xl py-2">
              ↓
            </div>


            {/* =================================================
          STEP 4 SUGAR
      ================================================= */}
            <div className="rounded-xl border border-orange-200 dark:border-orange-900/40
                      bg-orange-50 dark:bg-orange-950/20 p-5">

              <div className="flex items-start gap-4">

                <div className="w-9 h-9 flex-shrink-0 rounded-full
                          bg-orange-500 text-white
                          flex items-center justify-center font-bold">
                  4
                </div>

                <div className="flex-1">

                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                    Create the Sugar Constraint
                  </h4>

                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-7">

                    Again, look at the given data:

                  </p>

                  <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">

                    <li>
                      • One cake requires <strong>1 kg sugar</strong>.
                    </li>

                    <li>
                      • One cookie requires <strong>2 kg sugar</strong>.
                    </li>

                    <li>
                      • The bakery has only <strong>8 kg sugar</strong>.
                    </li>

                  </ul>


                  <div className="mt-5 rounded-xl bg-white dark:bg-gray-950
                            border border-orange-200 dark:border-orange-900/40 p-5">

                    <div className="space-y-3 text-center font-mono">

                      <div className="text-gray-600 dark:text-gray-400">
                        Sugar used by cakes = x
                      </div>

                      <div className="text-gray-600 dark:text-gray-400">
                        Sugar used by cookies = 2y
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-800 pt-4">

                        <div className="font-bold text-orange-700 dark:text-orange-400 text-lg">
                          x + 2y ≤ 8
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* ARROW */}
            <div className="text-center text-orange-500 text-xl py-2">
              ↓
            </div>


            {/* =================================================
          STEP 5 NON NEGATIVITY
      ================================================= */}
            <div className="rounded-xl border border-purple-200 dark:border-purple-900/40
                      bg-purple-50 dark:bg-purple-950/20 p-5">

              <div className="flex items-start gap-4">

                <div className="w-9 h-9 flex-shrink-0 rounded-full
                          bg-purple-600 text-white
                          flex items-center justify-center font-bold">
                  5
                </div>

                <div className="flex-1">

                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                    Add Non-Negativity Restrictions
                  </h4>

                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 leading-7">

                    Can the bakery produce −5 cakes?

                    <strong> No.</strong>

                    <br />

                    Can it produce −3 cookies?

                    <strong> No.</strong>

                  </p>


                  <div className="mt-4 rounded-xl bg-white dark:bg-gray-950
                            border border-purple-200 dark:border-purple-900/40
                            p-5 text-center">

                    <div className="font-mono font-bold text-purple-700
                              dark:text-purple-400 text-lg">

                      x ≥ 0, &nbsp;&nbsp; y ≥ 0

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
          COMPLETE MODEL
      ================================================= */}
            <div className="mt-8 rounded-2xl bg-gray-900 dark:bg-black
                      p-6 md:p-8 text-white">

              <div className="text-center">

                <div className="text-3xl mb-2">
                  🧩
                </div>

                <h3 className="font-bold text-xl">
                  Complete Linear Programming Model
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Every coefficient and number can now be traced back to the given data.
                </p>

              </div>


              <div className="mt-7 space-y-3 text-center font-mono
                        text-sm md:text-base">

                <div className="text-green-300 font-bold">
                  Maximize Z = 100x + 50y
                </div>

                <div className="text-gray-500 pt-2">
                  Subject to:
                </div>

                <div>
                  2x + y ≤ 10
                </div>

                <div>
                  x + 2y ≤ 8
                </div>

                <div className="pt-2">
                  x ≥ 0, &nbsp; y ≥ 0
                </div>

              </div>

            </div>


            {/* =================================================
          NUMBER TRACE
      ================================================= */}
            <div className="mt-8">

              <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-4">
                🔍 Where Did Every Number Come From?
              </h4>


              <div className="grid gap-3">

                {[
                  ["100", "Profit per cake", "Given data"],
                  ["50", "Profit per cookie", "Given data"],
                  ["2", "Flour required by one cake", "Given data"],
                  ["1", "Flour required by one cookie", "Given data"],
                  ["10", "Total flour available", "Given data"],
                  ["1", "Sugar required by one cake", "Given data"],
                  ["2", "Sugar required by one cookie", "Given data"],
                  ["8", "Total sugar available", "Given data"],
                ].map(([number, meaning, source]) => (

                  <div
                    key={`${number}-${meaning}`}
                    className="grid grid-cols-[70px_1fr_auto] gap-3 items-center
                         rounded-lg bg-gray-50 dark:bg-gray-900
                         border border-gray-200 dark:border-gray-800
                         p-3"
                  >

                    <div className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      {number}
                    </div>

                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {meaning}
                    </div>

                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {source}
                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* KEY LESSON */}
            <div className="mt-8 rounded-xl border-l-4 border-indigo-500
                      bg-indigo-50 dark:bg-indigo-950/20 p-5">

              <p className="text-sm md:text-base text-indigo-900
                      dark:text-indigo-300 leading-7">

                <strong>🎯 Key Lesson:</strong>{" "}

                In an LP problem, the numbers in the objective function and
                constraints normally come from the <strong>given data</strong>.
                Our job is to correctly translate that information into
                mathematical expressions.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ===== SECTION 3: EXAMPLES FROM DIFFERENT DOMAINS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏭</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Decision Variables in Action
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "Production",
              variables: "x₁ = units of Product A, x₂ = units of Product B",
              objective: "Maximize profit",
            },
            {
              domain: "Diet",
              variables: "x₁ = servings of food 1, x₂ = servings of food 2",
              objective: "Minimize cost",
            },
            {
              domain: "Investment",
              variables: "x₁ = dollars in stocks, x₂ = dollars in bonds",
              objective: "Maximize return",
            },
            {
              domain: "Transportation",
              variables: "x_{ij} = units shipped from i to j",
              objective: "Minimize shipping cost",
            },
            {
              domain: "Advertising",
              variables: "x₁ = TV spend, x₂ = digital spend",
              objective: "Maximize reach",
            },
            {
              domain: "Workforce",
              variables: "x₁ = number of full-time employees, x₂ = number of part-time",
              objective: "Minimize labor cost",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.domain}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                <span className="font-medium">Variables:</span> {item.variables}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <span className="font-medium">Objective:</span> {item.objective}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 4: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Start with a variable definition list",
              desc: "Write down all decision variables with clear descriptions before writing any equations.",
            },
            {
              title: "Use consistent notation",
              desc: "If you use x for one product, don't suddenly use y for another – stick to subscripts.",
            },
            {
              title: "Consider transformation",
              desc: "Sometimes it's easier to define variables as ratios or percentages.",
            },
            {
              title: "Think about units",
              desc: "All constraints and objective must have compatible units.",
            },
            {
              title: "Avoid multi-purpose variables",
              desc: "Each variable should have a single, clear meaning.",
            },
            {
              title: "Test with extreme values",
              desc: "Plug in 0 or large numbers to see if the model behaves logically.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 text-sm">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 5: COMMON MISTAKES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
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
                mistake: "Vague definitions",
                fix: "Always specify what the variable represents, with units.",
              },
              {
                mistake: "Using too many variables",
                fix: "Combine logically if they represent the same thing.",
              },
              {
                mistake: "Forgetting non-negativity",
                fix: "Always add x ≥ 0 for each variable unless justified.",
              },
              {
                mistake: "Mixing variables and parameters",
                fix: "Variables are unknowns; parameters are fixed values.",
              },
              {
                mistake: "Not checking feasibility",
                fix: "Test if the variable values make sense in the real world.",
              },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-red-500 dark:text-red-400 text-lg flex-shrink-0 mt-0.5">✗</span>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{item.mistake}</span>
                  <br />
                  <span className="text-gray-600 dark:text-gray-400 text-xs">✓ {item.fix}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 6: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Define variables with descriptive names (e.g., x_units_A).",
            "List all variables at the start of the model.",
            "Include units in the definition.",
            "Ensure each variable is controllable.",
            "Avoid using the same symbol for different variables.",
            "Add non-negativity constraints explicitly.",
            "Check that variables appear linearly in all expressions.",
            "Review variable definitions with a colleague.",
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="text-green-500 dark:text-green-400 text-lg flex-shrink-0">✓</span>
              <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 7: HINT SECTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💭</span>
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">Think About…</h3>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Observe carefully:</strong> In a production problem,
                what would happen if you define variables for each product but
                omit the units? How could that lead to errors?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> Suppose you have two
                resources (labor and materials). If you define variables only
                for one resource, what would you miss?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu is a
                financial planner in Kolkata. He wants to allocate funds among
                three mutual funds. Define his decision variables clearly.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 8: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
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
              "✅ Define decision variables in your own words",
              "✅ Correctly identify decision variables in a given problem statement",
              "✅ Write clear definitions for variables with units",
              "✅ Distinguish between variables and parameters",
              "✅ Avoid common mistakes when defining variables",
              "✅ Use subscripts for multiple similar variables",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">{item.split(" ")[0]}</span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 9: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
        <FAQTemplate
          title="Decision Variables FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 10: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-950">
        <PlainTextPrint
          content={noteText}
          title="Decision Variables - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic2_note.txt"
        />
      </div>

      {/* ===== SECTION 11: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
        <Teacher
          note={
            "Decision variables are the heart of any LP model. I often tell my students: 'If you can't define your variables clearly, you can't solve the problem.' Take time to practice defining variables from different scenarios. Susmita from Barrackpore once struggled with this, but after we practiced with a variety of examples, she became an expert. Remember: a well-defined variable is half the solution. Always include units, and be specific. Avoid generic labels like 'x' without meaning. This discipline will save you countless hours of confusion later."
          }
        />
      </div>
    </div>
  );
};

export default Topic2;