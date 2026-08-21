import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic4_files/topic4_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4: Constraints
 *
 * @component
 * @returns {JSX.Element} The rendered Topic4 component
 *
 * @purpose Provides a comprehensive understanding of constraints in Linear Programming:
 * definition, types, formulation, interpretation, and common pitfalls.
 *
 * @when_used After covering decision variables (Topic2) and objective function (Topic3),
 * this topic introduces the limitations that define the feasible region.
 */
const Topic4 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 4
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Constraints
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Constraints
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          The rules of the game — they define what is possible and shape the
          solution space.
        </p>
      </header>

      {/* ===== SECTION 1: DEFINITION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔗</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            What Are Constraints?
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            <strong>Constraints</strong> are linear inequalities or equalities
            that limit the values of decision variables. They represent the
            <strong> restrictions, limitations, or requirements</strong> of the
            problem — what you <strong>can</strong> or <strong>cannot</strong> do.
          </p>
          <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg my-4 border border-blue-200 dark:border-blue-900/50">
            <p className="font-mono text-lg text-blue-800 dark:text-blue-300">
              a₁x₁ + a₂x₂ + ... + aₙxₙ ≤ b  (or ≥, =)
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Where <strong>aᵢ</strong> are the coefficients (resource usage per unit),
              <strong> xᵢ</strong> are decision variables, and <strong>b</strong> is the limit.
            </p>
          </div>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300 text-base">
            <li>
              <strong>Resource capacity:</strong> labor hours, raw materials, budget, machine time.
            </li>
            <li>
              <strong>Minimum requirements:</strong> demand, nutritional needs, service levels.
            </li>
            <li>
              <strong>Policy constraints:</strong> legal limits, safety regulations, contractual obligations.
            </li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 text-base mt-4">
            Think of constraints as the <strong>rules of a game</strong>. The rules
            tell you what moves are allowed. Without rules, the game has no structure
            and no meaningful outcome.
          </p>
        </div>

        {/* SVG: Feasible region with constraints */}
        <div className="mt-6 bg-amber-50/40 dark:bg-amber-950/20 rounded-2xl p-4 md:p-6 border border-amber-100 dark:border-amber-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
          <svg
            viewBox="0 0 500 300"
            className="w-full h-auto"
            aria-label="Feasible region defined by constraints"
            role="img"
          >
            {/* Axes */}
            <line x1="50" y1="250" x2="470" y2="250" stroke="#94a3b8" strokeWidth="2" />
            <line x1="50" y1="250" x2="50" y2="30" stroke="#94a3b8" strokeWidth="2" />
            <text x="475" y="270" fontSize="12" fill="#475569" dark="#94a3b8">x₁</text>
            <text x="30" y="28" fontSize="12" fill="#475569" dark="#94a3b8">x₂</text>

            {/* Constraint 1: x₁ + 2x₂ ≤ 200 */}
            <line x1="50" y1="250" x2="250" y2="50" stroke="#ef4444" strokeWidth="2.5" />
            <text x="255" y="55" fontSize="11" fill="#ef4444">x₁ + 2x₂ ≤ 200</text>

            {/* Constraint 2: 2x₁ + x₂ ≤ 200 */}
            <line x1="50" y1="150" x2="250" y2="250" stroke="#22c55e" strokeWidth="2.5" />
            <text x="255" y="245" fontSize="11" fill="#22c55e">2x₁ + x₂ ≤ 200</text>

            {/* Constraint 3: x₁ ≤ 150 */}
            <line x1="200" y1="30" x2="200" y2="250" stroke="#a855f7" strokeWidth="2" strokeDasharray="6,4" />
            <text x="180" y="20" fontSize="11" fill="#a855f7">x₁ ≤ 150</text>

            {/* Constraint 4: x₂ ≤ 100 */}
            <line x1="50" y1="100" x2="470" y2="100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,4" />
            <text x="475" y="95" fontSize="11" fill="#f59e0b">x₂ ≤ 100</text>

            {/* Non-negativity: x₁ ≥ 0, x₂ ≥ 0 (already axes) */}

            {/* Feasible region (polygon) */}
            <polygon
              points="50,150 50,250 150,250 200,100 200,50 150,50"
              fill="#3b82f6"
              fillOpacity="0.15"
              stroke="#3b82f6"
              strokeWidth="2"
            >
              <animate attributeName="fillOpacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite" />
            </polygon>

            {/* Labels */}
            <text x="80" y="210" fontSize="12" fill="#3b82f6" fontWeight="bold">Feasible</text>
            <text x="80" y="225" fontSize="12" fill="#3b82f6" fontWeight="bold">Region</text>

            {/* Corner points */}
            <circle cx="50" cy="250" r="5" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="4;6;4" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="150" cy="250" r="5" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="4;6;4" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="100" r="5" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="4;6;4" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="50" r="5" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="4;6;4" dur="3s" begin="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Each constraint defines a boundary; the feasible region is the intersection of all half-planes.
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: TYPES OF CONSTRAINTS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📐</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Types of Constraints
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              symbol: "≤",
              name: "Less than or equal",
              meaning: "Capacity, maximum limit, resource constraints",
              example: "2x₁ + 3x₂ ≤ 120 (labor hours available)",
              keywords: "at most, no more than, maximum, cannot exceed",
            },
            {
              symbol: "≥",
              name: "Greater than or equal",
              meaning: "Minimum requirement, demand, service level",
              example: "x₁ + x₂ ≥ 50 (minimum demand)",
              keywords: "at least, no less than, minimum, must exceed",
            },
            {
              symbol: "=",
              name: "Equality",
              meaning: "Exact requirement, conservation, balance",
              example: "x₁ + x₂ = 100 (total weight exactly 100 kg)",
              keywords: "exactly, equal to, must be, precisely",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
            >
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{item.symbol}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mt-1">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.meaning}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 font-mono">{item.example}</p>
              <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
                <span className="font-medium">Keywords:</span> {item.keywords}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: STEP-BY-STEP FORMULATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✍️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            How to Formulate Constraints – Step-by-Step
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                <li>
                  <strong>Identify all limiting factors:</strong> Read the problem and list every resource, requirement, or rule.
                </li>
                <li>
                  <strong>Map variables to factors:</strong> Determine which decision variables affect each factor.
                </li>
                <li>
                  <strong>Write the usage per unit:</strong> How much of the resource does one unit of each variable consume?
                </li>
                <li>
                  <strong>Determine the limit (RHS):</strong> What is the total available (for ≤) or required (for ≥)?
                </li>
                <li>
                  <strong>Choose the inequality direction:</strong> ≤ for "at most", ≥ for "at least", = for "exactly".
                </li>
                <li>
                  <strong>Combine:</strong> Sum(usage × variable) ≤ limit.
                </li>
              </ol>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3">
              <p className="font-semibold text-gray-900 dark:text-white">Example: Production Problem</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                A factory produces two products (A and B). Product A requires 2 hours of labor and 3 kg of material per unit. Product B requires 4 hours and 1 kg. Available: 120 labor hours, 80 kg material. Demand for A is at least 10 units.
              </p>
              <div className="mt-2 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <p>Labor: 2x₁ + 4x₂ ≤ 120</p>
                <p>Material: 3x₁ + 1x₂ ≤ 80</p>
                <p>Demand: x₁ ≥ 10</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">where x₁ = units of A, x₂ = units of B</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
    SECTION 3A: COMPLETE CONSTRAINT EXAMPLE
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out]">

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🧩</span>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Let's Build Constraints From Real Data
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-7 mb-6">
          Instead of memorizing formulas, let's understand where every number
          in a constraint comes from.
        </p>


        {/* =====================================================
      PROBLEM
  ===================================================== */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800
                  bg-gray-50 dark:bg-gray-900/50 overflow-hidden">

          <div className="bg-gray-900 dark:bg-black px-5 py-5">

            <div className="flex items-center gap-3">

              <span className="text-3xl">🏭</span>

              <div>

                <h3 className="font-semibold text-white text-lg">
                  Example: A Small Factory
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Converting a real-world situation into constraints
                </p>

              </div>

            </div>

          </div>


          <div className="p-5 md:p-6">

            <p className="text-gray-700 dark:text-gray-300 leading-7">

              A factory produces two products:
              <strong> Product A</strong> and <strong>Product B</strong>.

              The factory has limited labour and raw material.

              Each product requires a different amount of these resources.

            </p>


            {/* =================================================
          GIVEN DATA
      ================================================= */}
            <div className="mt-6">

              <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-3">
                📋 Given Data
              </h4>

              <div className="overflow-x-auto">

                <table className="w-full text-sm border-collapse">

                  <thead>

                    <tr className="bg-gray-100 dark:bg-gray-800">

                      <th className="text-left p-3 border border-gray-200 dark:border-gray-700">
                        Resource
                      </th>

                      <th className="text-center p-3 border border-gray-200 dark:border-gray-700">
                        Product A
                      </th>

                      <th className="text-center p-3 border border-gray-200 dark:border-gray-700">
                        Product B
                      </th>

                      <th className="text-center p-3 border border-gray-200 dark:border-gray-700">
                        Available
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    <tr className="bg-white dark:bg-gray-950">

                      <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">
                        Labour
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono">
                        2 hours
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono">
                        4 hours
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono font-bold">
                        120 hours
                      </td>

                    </tr>


                    <tr className="bg-gray-50 dark:bg-gray-900">

                      <td className="p-3 border border-gray-200 dark:border-gray-700 font-medium">
                        Raw Material
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono">
                        3 kg
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono">
                        1 kg
                      </td>

                      <td className="p-3 border border-gray-200 dark:border-gray-700 text-center font-mono font-bold">
                        80 kg
                      </td>

                    </tr>

                  </tbody>

                </table>

              </div>

            </div>


            {/* =================================================
          IMPORTANT NOTE
      ================================================= */}
            <div className="mt-5 rounded-xl bg-blue-50 dark:bg-blue-950/20
                      border border-blue-200 dark:border-blue-900/40 p-5">

              <p className="text-sm text-blue-900 dark:text-blue-300 leading-7">

                <strong>💡 Important:</strong>

                Every number that appears in our constraint will come from
                this table.

                <br /><br />

                We are not inventing coefficients while writing the equation.

                The table tells us how much resource one unit of each product
                consumes and how much resource is available in total.

              </p>

            </div>


            {/* =================================================
          STEP 1 VARIABLES
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
                    Define the Decision Variables
                  </h4>

                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    We first need to decide how many units of each product to make.
                  </p>

                  <div className="mt-4 grid sm:grid-cols-2 gap-3">

                    <div className="rounded-lg bg-white dark:bg-gray-950
                              border border-blue-200 dark:border-blue-900/40 p-4">

                      <div className="font-mono font-bold text-blue-700 dark:text-blue-400">
                        x = units of Product A
                      </div>

                    </div>

                    <div className="rounded-lg bg-white dark:bg-gray-950
                              border border-blue-200 dark:border-blue-900/40 p-4">

                      <div className="font-mono font-bold text-blue-700 dark:text-blue-400">
                        y = units of Product B
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
          STEP 2 LABOUR
      ================================================= */}
            <div className="mt-5 rounded-xl border border-amber-200 dark:border-amber-900/40
                      bg-amber-50 dark:bg-amber-950/20 p-5">

              <div className="flex items-start gap-4">

                <div className="w-9 h-9 flex-shrink-0 rounded-full
                          bg-amber-500 text-white
                          flex items-center justify-center font-bold">
                  2
                </div>

                <div className="flex-1">

                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                    Build the Labour Constraint
                  </h4>

                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">

                    Look only at the <strong>Labour</strong> row.

                  </p>

                  <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">

                    <p>
                      • Product A requires <strong>2 hours</strong> per unit.
                    </p>

                    <p>
                      • Product B requires <strong>4 hours</strong> per unit.
                    </p>

                    <p>
                      • The factory has only <strong>120 hours</strong>.
                    </p>

                  </div>


                  {/* TRACE NUMBERS */}
                  <div className="mt-5 rounded-xl bg-white dark:bg-gray-950
                            border border-amber-200 dark:border-amber-900/40 p-5">

                    <div className="space-y-3 font-mono text-sm">

                      <div>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          2x
                        </span>

                        <span className="text-gray-600 dark:text-gray-400">
                          {" "}→ 2 hours × x units of Product A
                        </span>
                      </div>


                      <div>
                        <span className="font-bold text-amber-600 dark:text-amber-400">
                          4y
                        </span>

                        <span className="text-gray-600 dark:text-gray-400">
                          {" "}→ 4 hours × y units of Product B
                        </span>
                      </div>


                      <div className="border-t border-gray-200 dark:border-gray-800 pt-4">

                        <div className="text-center font-bold text-lg
                                  text-amber-700 dark:text-amber-400">

                          2x + 4y ≤ 120

                        </div>

                      </div>

                    </div>

                  </div>


                  <div className="mt-4 rounded-lg bg-white dark:bg-gray-950 p-4">

                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-6">

                      <strong>Why ≤?</strong>

                      <br />

                      The factory has <strong>at most 120 hours</strong>.
                      Therefore, labour used cannot be greater than 120.

                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
          STEP 3 MATERIAL
      ================================================= */}
            <div className="mt-5 rounded-xl border border-orange-200 dark:border-orange-900/40
                      bg-orange-50 dark:bg-orange-950/20 p-5">

              <div className="flex items-start gap-4">

                <div className="w-9 h-9 flex-shrink-0 rounded-full
                          bg-orange-500 text-white
                          flex items-center justify-center font-bold">
                  3
                </div>

                <div className="flex-1">

                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                    Build the Raw Material Constraint
                  </h4>

                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">

                    Now look at the <strong>Raw Material</strong> row.

                  </p>

                  <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">

                    <p>
                      • Product A requires <strong>3 kg</strong> per unit.
                    </p>

                    <p>
                      • Product B requires <strong>1 kg</strong> per unit.
                    </p>

                    <p>
                      • The factory has only <strong>80 kg</strong>.
                    </p>

                  </div>


                  <div className="mt-5 rounded-xl bg-white dark:bg-gray-950
                            border border-orange-200 dark:border-orange-900/40 p-5">

                    <div className="space-y-3 font-mono text-sm">

                      <div>

                        <span className="font-bold text-orange-600 dark:text-orange-400">
                          3x
                        </span>

                        <span className="text-gray-600 dark:text-gray-400">
                          {" "}→ 3 kg × x units of Product A
                        </span>

                      </div>


                      <div>

                        <span className="font-bold text-orange-600 dark:text-orange-400">
                          y
                        </span>

                        <span className="text-gray-600 dark:text-gray-400">
                          {" "}→ 1 kg × y units of Product B
                        </span>

                      </div>


                      <div className="border-t border-gray-200 dark:border-gray-800 pt-4">

                        <div className="text-center font-bold text-lg
                                  text-orange-700 dark:text-orange-400">

                          3x + y ≤ 80

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
          STEP 4 NON NEGATIVITY
      ================================================= */}
            <div className="mt-5 rounded-xl border border-purple-200 dark:border-purple-900/40
                      bg-purple-50 dark:bg-purple-950/20 p-5">

              <div className="flex items-start gap-4">

                <div className="w-9 h-9 flex-shrink-0 rounded-full
                          bg-purple-600 text-white
                          flex items-center justify-center font-bold">
                  4
                </div>

                <div className="flex-1">

                  <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                    Add Non-Negativity
                  </h4>

                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">

                    Since x and y represent production quantities,
                    negative production is impossible.

                  </p>

                  <div className="mt-4 rounded-lg bg-white dark:bg-gray-950
                            border border-purple-200 dark:border-purple-900/40
                            p-5 text-center font-mono font-bold
                            text-purple-700 dark:text-purple-400">

                    x ≥ 0, &nbsp;&nbsp; y ≥ 0

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
                  Complete Constraint Model
                </h3>

              </div>


              <div className="mt-6 space-y-3 text-center font-mono
                        text-sm md:text-lg">

                <div>
                  Labour:
                  <span className="text-amber-300 ml-2">
                    2x + 4y ≤ 120
                  </span>
                </div>

                <div>
                  Material:
                  <span className="text-orange-300 ml-2">
                    3x + y ≤ 80
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-purple-300">
                    x ≥ 0, &nbsp; y ≥ 0
                  </span>
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
                  ["2", "Labour required by one unit of Product A"],
                  ["4", "Labour required by one unit of Product B"],
                  ["120", "Total labour available"],
                  ["3", "Material required by one unit of Product A"],
                  ["1", "Material required by one unit of Product B"],
                  ["80", "Total material available"],
                ].map(([number, meaning]) => (

                  <div
                    key={`${number}-${meaning}`}
                    className="grid grid-cols-[70px_1fr] gap-3 items-center
                         rounded-lg bg-gray-50 dark:bg-gray-900
                         border border-gray-200 dark:border-gray-800 p-3"
                  >

                    <div className="font-mono font-bold text-blue-600 dark:text-blue-400">
                      {number}
                    </div>

                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {meaning}
                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* =================================================
          UNDERSTANDING THE INEQUALITY
      ================================================= */}
            <div className="mt-8 rounded-2xl border border-indigo-200
                      dark:border-indigo-900/40
                      bg-indigo-50 dark:bg-indigo-950/20 p-6">

              <h3 className="font-bold text-indigo-900 dark:text-indigo-300 text-lg">
                🧠 Why Do We Use "≤"?
              </h3>

              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-7">

                The phrase in the problem is:

                <strong> "The factory has only 120 labour hours."</strong>

              </p>

              <div className="mt-4 grid sm:grid-cols-3 gap-3">

                <div className="rounded-lg bg-white dark:bg-gray-950 p-4">

                  <div className="font-bold text-gray-900 dark:text-white">
                    100 hours
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Allowed ✓
                  </p>

                </div>


                <div className="rounded-lg bg-white dark:bg-gray-950 p-4">

                  <div className="font-bold text-gray-900 dark:text-white">
                    120 hours
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    Allowed ✓
                  </p>

                </div>


                <div className="rounded-lg bg-red-50 dark:bg-red-950/30 p-4">

                  <div className="font-bold text-red-600 dark:text-red-400">
                    130 hours
                  </div>

                  <p className="text-xs text-red-500 mt-1">
                    Not allowed ✗
                  </p>

                </div>

              </div>

              <div className="mt-5 text-center font-mono font-bold
                        text-indigo-700 dark:text-indigo-300 text-lg">

                Resource Used ≤ Resource Available

              </div>

            </div>


            {/* =================================================
          QUICK CHECK
      ================================================= */}
            <div className="mt-8 rounded-2xl bg-gray-900 dark:bg-black
                      p-6 md:p-7 text-white">

              <h3 className="font-bold text-lg">
                📝 Quick Check
              </h3>

              <p className="mt-3 text-gray-300 text-sm leading-7">

                Suppose Product A requires <strong>5 hours</strong> of labour
                and Product B requires <strong>3 hours</strong>.

                The factory has <strong>90 hours</strong> available.

              </p>

              <div className="my-5 text-center font-mono text-xl font-bold
                        text-green-300">

                Can you write the labour constraint?

              </div>

              <div className="mt-4 rounded-lg bg-white/10 p-4">

                <p className="text-xs text-gray-400">
                  Think first:
                </p>

                <ul className="mt-2 space-y-1 text-sm text-gray-300">

                  <li>• What is the coefficient of x?</li>

                  <li>• What is the coefficient of y?</li>

                  <li>• What is the RHS?</li>

                  <li>• Should we use ≤ or ≥?</li>

                </ul>

              </div>

              <details className="mt-5">

                <summary className="cursor-pointer text-sm font-semibold
                              text-blue-300 hover:text-blue-200">

                  Show Answer

                </summary>

                <div className="mt-3 rounded-lg bg-white/10 p-4">

                  <p className="font-mono text-center text-lg font-bold text-green-300">
                    5x + 3y ≤ 90
                  </p>

                  <p className="mt-3 text-xs text-gray-400 text-center">

                    Because 5 hours × x units + 3 hours × y units
                    cannot exceed the available 90 hours.

                  </p>

                </div>

              </details>

            </div>


            {/* =================================================
          KEY LESSON
      ================================================= */}
            <div className="mt-6 rounded-xl border-l-4 border-blue-500
                      bg-blue-50 dark:bg-blue-950/20 p-5">

              <p className="text-sm md:text-base text-blue-900 dark:text-blue-300 leading-7">

                <strong>🎯 Key Lesson:</strong>

                A constraint is not a random mathematical equation.

                Every coefficient comes from the
                <strong> resource required per unit</strong>,

                the right-hand side comes from the
                <strong> total available or required amount</strong>,

                and the inequality symbol comes from the
                <strong> wording of the problem</strong>.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ===== SECTION 4: REAL-WORLD EXAMPLES (5+) ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Constraints in Action
          </h2>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <h4 className="font-semibold text-gray-900 dark:text-white">🏭 Manufacturing</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 mt-1 space-y-1">
              <li><strong>Labor:</strong> 2x₁ + 3x₂ ≤ 40 hours (maximum labor available)</li>
              <li><strong>Raw material:</strong> 4x₁ + 2x₂ ≤ 60 kg (material supply)</li>
              <li><strong>Minimum production:</strong> x₁ ≥ 5 (contractual obligation)</li>
              <li><strong>Machine capacity:</strong> x₁ + x₂ ≤ 15 (machine hours)</li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span className="font-medium">Interpretation:</span> The factory must produce at least 5 units of product A, but cannot exceed labor, material, and machine limits.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <h4 className="font-semibold text-gray-900 dark:text-white">🥗 Diet Planning</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 mt-1 space-y-1">
              <li><strong>Calories:</strong> 100x₁ + 150x₂ ≥ 2000 (minimum daily calories)</li>
              <li><strong>Protein:</strong> 10x₁ + 20x₂ ≥ 50 (minimum protein)</li>
              <li><strong>Carbohydrates:</strong> 30x₁ + 40x₂ ≥ 200 (minimum carbs)</li>
              <li><strong>Servings limit:</strong> x₁ + x₂ ≤ 5 (max servings for variety)</li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span className="font-medium">Interpretation:</span> The diet must meet minimum nutritional requirements while staying within a reasonable number of servings.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <h4 className="font-semibold text-gray-900 dark:text-white">💰 Investment Portfolio</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 mt-1 space-y-1">
              <li><strong>Budget:</strong> x₁ + x₂ + x₃ ≤ 100,000 (total investment limit)</li>
              <li><strong>Risk:</strong> 0.2x₁ + 0.3x₂ + 0.1x₃ ≤ 20,000 (risk limit)</li>
              <li><strong>Minimum return:</strong> 0.05x₁ + 0.07x₂ + 0.04x₃ ≥ 6,000 (target return)</li>
              <li><strong>Diversification:</strong> x₁ ≤ 50,000 (max in one asset class)</li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span className="font-medium">Interpretation:</span> The portfolio must stay within budget and risk limits while achieving a minimum return and diversifying investments.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <h4 className="font-semibold text-gray-900 dark:text-white">🚚 Transportation</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 mt-1 space-y-1">
              <li><strong>Supply:</strong> x₁₁ + x₁₂ ≤ 100 (units from source 1)</li>
              <li><strong>Supply:</strong> x₂₁ + x₂₂ ≤ 80 (units from source 2)</li>
              <li><strong>Demand:</strong> x₁₁ + x₂₁ ≥ 70 (units to destination 1)</li>
              <li><strong>Demand:</strong> x₁₂ + x₂₂ ≥ 60 (units to destination 2)</li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span className="font-medium">Interpretation:</span> Shipments from each source cannot exceed supply, and each destination must receive at least its demand.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <h4 className="font-semibold text-gray-900 dark:text-white">📢 Advertising</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 mt-1 space-y-1">
              <li><strong>Budget:</strong> x₁ + x₂ + x₃ ≤ 50,000 (total ad spend)</li>
              <li><strong>TV minimum:</strong> x₁ ≥ 10,000 (minimum TV spend)</li>
              <li><strong>Digital maximum:</strong> x₂ ≤ 20,000 (max digital spend)</li>
              <li><strong>Reach target:</strong> 100x₁ + 80x₂ + 60x₃ ≥ 2,000,000 (minimum impressions)</li>
            </ul>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span className="font-medium">Interpretation:</span> The advertising budget must be allocated across channels to achieve a minimum reach while respecting channel limits.
            </p>
          </div>
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
              title: "Start with resource constraints",
              desc: "These are the most common; list all resources with their capacities.",
            },
            {
              title: "Look for implicit constraints",
              desc: "Sometimes constraints are implied (e.g., production cannot exceed demand).",
            },
            {
              title: "Use descriptive labels",
              desc: "Name each constraint (e.g., 'Labor', 'Material') for clarity.",
            },
            {
              title: "Check for redundancy",
              desc: "Some constraints may be redundant; verify if they are necessary.",
            },
            {
              title: "Ensure consistent units",
              desc: "All terms in a constraint must have the same unit.",
            },
            {
              title: "Test feasibility",
              desc: "Try a simple solution to see if all constraints can be satisfied.",
            },
            {
              title: "Watch for conflicting constraints",
              desc: "Constraints like x ≥ 10 and x ≤ 5 make the problem infeasible.",
            },
            {
              title: "Use slack variables for ≤ constraints",
              desc: "They convert inequalities to equalities and measure unused resources.",
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
                mistake: "Using wrong inequality direction",
                fix: "Check wording: 'at most' → ≤, 'at least' → ≥.",
              },
              {
                mistake: "Forgetting a constraint",
                fix: "List all limiting factors; don't overlook implicit ones.",
              },
              {
                mistake: "Inconsistent units",
                fix: "Convert all units to the same base (e.g., hours, not minutes).",
              },
              {
                mistake: "Misplacing coefficients",
                fix: "Ensure the coefficient matches the variable's resource usage.",
              },
              {
                mistake: "Creating conflicting constraints",
                fix: "Check that constraints like x ≥ 10 and x ≤ 5 don't coexist.",
              },
              {
                mistake: "Ignoring non-negativity",
                fix: "Non-negativity constraints (x ≥ 0) must be added explicitly.",
              },
              {
                mistake: "Using non-linear terms",
                fix: "LP requires linear constraints; no squares, products, or divisions.",
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
            "List constraints in a logical order (e.g., resources, demands, policies).",
            "Write each constraint on a separate line with a descriptive label.",
            "Ensure the RHS is non-negative; if not, multiply by -1 and flip inequality.",
            "Check that all variables appear in at least one constraint (except non-negativity).",
            "Validate constraints by testing with a feasible point.",
            "Avoid using equality constraints when inequalities suffice.",
            "Use the same variable names consistently across all constraints.",
            "Review constraints with stakeholders to confirm they match reality.",
            "Use slack variables to convert ≤ constraints to equalities for algorithms.",
            "Document any assumptions behind each constraint.",
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

      {/* ===== SECTION 8: HINT SECTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💭</span>
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">Think About…</h3>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Observe carefully:</strong> In a production problem, if
                you add a new machine, that gives you more labor hours. How
                would that change the constraint? How would it affect the
                feasible region?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> Suppose you have a constraint
                x₁ + x₂ ≥ 10. If you change it to x₁ + x₂ ≥ 15, what happens
                to the feasible region? Does the optimal solution always get
                worse or better?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Susmita runs a bakery
                in Barrackpore. She has limited oven capacity (hours) and flour
                (kg). She also has a contract to supply at least 50 cakes per
                week. Write down her constraints.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Reflect:</strong> Why is it important to label constraints?
                How does labeling help in reviewing the model with others?
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
              "✅ Define constraints and their role in LP",
              "✅ Distinguish between ≤, ≥, and = constraints",
              "✅ Formulate constraints from a problem description",
              "✅ Identify and avoid common mistakes in constraint formulation",
              "✅ Recognize binding and redundant constraints",
              "✅ Apply best practices to write clear, consistent constraints",
              "✅ Use slack and surplus variables to convert inequalities to equalities",
              "✅ Interpret the meaning of constraints in real-world contexts",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">{item.split(" ")[0]}</span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 10: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
        <FAQTemplate
          title="Constraints FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 11: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <PlainTextPrint
          content={noteText}
          title="Constraints - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic4_note.txt"
        />
      </div>

      {/* ===== SECTION 12: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <Teacher
          note={
            "Constraints are the unsung heroes of Linear Programming. Many students focus on the objective and forget that constraints define what is realistically achievable. I often tell my students: 'The objective tells you where you want to go, but constraints tell you how to get there.' In my experience, the most common errors come from misinterpreting the wording—'at least' vs 'at most'. Take extra care to read each sentence carefully. Mamata from Barrackpore once told me that after we practiced constraint formulation, she started seeing every limit in her daily life as a constraint—and that helped her make better decisions. Remember, a well-defined set of constraints is the foundation of a correct LP model. Also, always label your constraints; it makes reviewing and debugging much easier."
          }
        />
      </div>
    </div>
  );
};

export default Topic4;