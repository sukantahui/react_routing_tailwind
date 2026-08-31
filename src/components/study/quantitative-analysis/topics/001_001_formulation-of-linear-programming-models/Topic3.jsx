import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3: Objective function
 *
 * @component
 * @returns {JSX.Element} The rendered Topic3 component
 *
 * @purpose Explains the objective function in Linear Programming: its definition,
 * purpose, formulation, and role in optimization, with detailed real-world examples.
 *
 * @when_used After understanding decision variables (Topic2), this topic introduces
 * the goal of the LP model—what we are trying to achieve.
 */
const Topic3 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 3
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Objective Function
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Objective Function
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          The compass of your LP model — it defines the goal and gives direction
          to your optimization.
        </p>
      </header>

      {/* ===== SECTION 1: DEFINITION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎯</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            What is the Objective Function?
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            The <strong>objective function</strong> is a linear expression that
            represents the goal of the LP problem. It is the function we want to
            <strong> maximize</strong> or <strong>minimize</strong>.
          </p>
          <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg my-4 border border-blue-200 dark:border-blue-900/50">
            <p className="font-mono text-lg text-blue-800 dark:text-blue-300">
              Z = c₁x₁ + c₂x₂ + ... + cₙxₙ
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Where <strong>Z</strong> is the objective value,{" "}
              <strong>cᵢ</strong> are the coefficients (profit, cost, etc.), and{" "}
              <strong>xᵢ</strong> are the decision variables.
            </p>
          </div>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300 text-base">
            <li>
              <strong>Maximization:</strong> Maximize profit, revenue, reach,
              efficiency, etc.
            </li>
            <li>
              <strong>Minimization:</strong> Minimize cost, time, risk, waste,
              etc.
            </li>
          </ul>
        </div>

        {/* SVG: Objective function as moving line */}
        <div className="mt-6 bg-green-50/40 dark:bg-green-950/20 rounded-2xl p-4 md:p-6 border border-green-100 dark:border-green-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
          <svg
            viewBox="0 0 600 160"
            className="w-full h-auto"
            aria-label="Objective function as a line on a graph"
            role="img"
          >
            {/* Axes */}
            <line x1="50" y1="130" x2="550" y2="130" stroke="#94a3b8" strokeWidth="2" />
            <line x1="50" y1="130" x2="50" y2="20" stroke="#94a3b8" strokeWidth="2" />
            <text x="560" y="135" fontSize="12" fill="#475569" dark="#94a3b8">x₁</text>
            <text x="35" y="18" fontSize="12" fill="#475569" dark="#94a3b8">x₂</text>

            {/* Feasible region */}
            <polygon points="80,120 200,120 400,40 200,40" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4,4" />

            {/* Objective lines (parallel) */}
            <line x1="70" y1="115" x2="350" y2="35" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="6,4">
              <animate attributeName="y1" values="115;90;115" dur="5s" repeatCount="indefinite" />
              <animate attributeName="y2" values="35;15;35" dur="5s" repeatCount="indefinite" />
            </line>
            <line x1="120" y1="115" x2="400" y2="35" stroke="#ef4444" strokeWidth="2" opacity="0.5">
              <animate attributeName="y1" values="115;90;115" dur="5s" begin="1.5s" repeatCount="indefinite" />
              <animate attributeName="y2" values="35;15;35" dur="5s" begin="1.5s" repeatCount="indefinite" />
            </line>

            {/* Labels */}
            <text x="360" y="28" fontSize="12" fill="#ef4444" fontWeight="bold">Z = c₁x₁ + c₂x₂</text>
            <text x="360" y="44" fontSize="10" fill="#94a3b8">(moving toward optimum)</text>

            {/* Arrow direction */}
            <polygon points="520,60 540,45 540,75" fill="#22c55e">
              <animate attributeName="transform" values="translate(0,0);translate(0,-6);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="545" y="48" fontSize="10" fill="#22c55e" fontWeight="bold">Optimize</text>

            {/* Corner points */}
            <circle cx="80" cy="120" r="5" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="4;6;4" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="120" r="5" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="4;6;4" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="400" cy="40" r="5" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="4;6;4" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The objective function is a line that moves across the feasible region until it reaches the optimal vertex.
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: PURPOSE AND ROLE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🧭</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Purpose and Role
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Provides Direction",
              desc: "It tells the algorithm which direction to move (maximize or minimize).",
            },
            {
              title: "Quantifies the Goal",
              desc: "It converts qualitative goals into a measurable numerical target.",
            },
            {
              title: "Enables Comparison",
              desc: "It gives a single value to compare different feasible solutions.",
            },
            {
              title: "Determines Optimality",
              desc: "The solution that gives the best objective value is the optimal solution.",
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
    SECTION 2F: HOW TO READ AN LP MODEL
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16">

        <div className="flex items-center gap-3 mb-4">

          <span className="text-2xl">📖</span>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            How to Read a Linear Programming Model
          </h2>

        </div>

        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-7 mb-6">

          Once an LP model is written, you should be able to look at each
          equation and explain what it means in the real world.

          Let's use our bakery model to practise this.

        </p>


        {/* MODEL */}
        <div className="rounded-2xl bg-gray-900 dark:bg-black p-6 md:p-8 text-white mb-8">

          <p className="text-center text-sm text-gray-400 mb-5">
            Our Bakery LP Model
          </p>

          <div className="space-y-3 text-center font-mono text-sm md:text-lg">

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


        {/* =====================================================
      OBJECTIVE
  ===================================================== */}
        <div className="rounded-2xl border border-green-200 dark:border-green-900/40
                  bg-green-50 dark:bg-green-950/20 p-6 mb-5">

          <div className="flex items-start gap-4">

            <div className="text-3xl">
              🎯
            </div>

            <div className="flex-1">

              <h3 className="font-bold text-green-900 dark:text-green-300 text-lg">
                1. Maximize Z = 100x + 50y
              </h3>

              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-7">

                This is the <strong>objective function</strong>.

                It tells us what we want to optimize.

              </p>

              <div className="mt-4 space-y-2 text-sm">

                <div className="flex items-start gap-3">

                  <span className="font-mono font-bold text-green-600 dark:text-green-400">
                    Z
                  </span>

                  <span className="text-gray-600 dark:text-gray-400">
                    represents the total profit.
                  </span>

                </div>


                <div className="flex items-start gap-3">

                  <span className="font-mono font-bold text-green-600 dark:text-green-400">
                    100x
                  </span>

                  <span className="text-gray-600 dark:text-gray-400">
                    represents profit from cakes.
                  </span>

                </div>


                <div className="flex items-start gap-3">

                  <span className="font-mono font-bold text-green-600 dark:text-green-400">
                    50y
                  </span>

                  <span className="text-gray-600 dark:text-gray-400">
                    represents profit from cookies.
                  </span>

                </div>

              </div>

              <div className="mt-4 rounded-lg bg-white dark:bg-gray-950 p-4
                        border border-green-200 dark:border-green-900/40">

                <p className="text-sm font-semibold text-green-800 dark:text-green-300">

                  We are saying:

                </p>

                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">

                  "Choose the values of x and y that give us the
                  <strong> highest possible profit</strong>."

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
      CONSTRAINT 1
  ===================================================== */}
        <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40
                  bg-amber-50 dark:bg-amber-950/20 p-6 mb-5">

          <div className="flex items-start gap-4">

            <div className="text-3xl">
              🌾
            </div>

            <div className="flex-1">

              <h3 className="font-bold text-amber-900 dark:text-amber-300 text-lg">
                2. 2x + y ≤ 10
              </h3>

              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-7">

                This is the <strong>flour constraint</strong>.

              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">

                <div className="rounded-lg bg-white dark:bg-gray-950 p-4
                          border border-amber-200 dark:border-amber-900/40">

                  <div className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    2x
                  </div>

                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Flour used by cakes
                  </p>

                </div>


                <div className="rounded-lg bg-white dark:bg-gray-950 p-4
                          border border-amber-200 dark:border-amber-900/40">

                  <div className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    y
                  </div>

                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Flour used by cookies
                  </p>

                </div>


                <div className="rounded-lg bg-white dark:bg-gray-950 p-4
                          border border-amber-200 dark:border-amber-900/40">

                  <div className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    10
                  </div>

                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Total flour available
                  </p>

                </div>

              </div>

              <div className="mt-4 rounded-lg bg-white dark:bg-gray-950 p-4">

                <p className="text-sm text-gray-700 dark:text-gray-300">

                  The symbol <strong>≤</strong> means:

                  <span className="font-semibold">
                    {" "}we cannot use more than 10 kg of flour.
                  </span>

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
      CONSTRAINT 2
  ===================================================== */}
        <div className="rounded-2xl border border-orange-200 dark:border-orange-900/40
                  bg-orange-50 dark:bg-orange-950/20 p-6 mb-5">

          <div className="flex items-start gap-4">

            <div className="text-3xl">
              🧂
            </div>

            <div className="flex-1">

              <h3 className="font-bold text-orange-900 dark:text-orange-300 text-lg">
                3. x + 2y ≤ 8
              </h3>

              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-7">

                This is the <strong>sugar constraint</strong>.

              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">

                <div className="rounded-lg bg-white dark:bg-gray-950 p-4
                          border border-orange-200 dark:border-orange-900/40">

                  <div className="font-mono font-bold text-orange-600 dark:text-orange-400">
                    x
                  </div>

                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Sugar used by cakes
                  </p>

                </div>


                <div className="rounded-lg bg-white dark:bg-gray-950 p-4
                          border border-orange-200 dark:border-orange-900/40">

                  <div className="font-mono font-bold text-orange-600 dark:text-orange-400">
                    2y
                  </div>

                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Sugar used by cookies
                  </p>

                </div>


                <div className="rounded-lg bg-white dark:bg-gray-950 p-4
                          border border-orange-200 dark:border-orange-900/40">

                  <div className="font-mono font-bold text-orange-600 dark:text-orange-400">
                    8
                  </div>

                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Total sugar available
                  </p>

                </div>

              </div>

              <div className="mt-4 rounded-lg bg-white dark:bg-gray-950 p-4">

                <p className="text-sm text-gray-700 dark:text-gray-300">

                  Again, <strong>≤</strong> means the total sugar used cannot
                  exceed the available 8 kg.

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
      NON NEGATIVITY
  ===================================================== */}
        <div className="rounded-2xl border border-purple-200 dark:border-purple-900/40
                  bg-purple-50 dark:bg-purple-950/20 p-6 mb-8">

          <div className="flex items-start gap-4">

            <div className="text-3xl">
              🚫
            </div>

            <div className="flex-1">

              <h3 className="font-bold text-purple-900 dark:text-purple-300 text-lg">
                4. x ≥ 0, y ≥ 0
              </h3>

              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-7">

                These are the <strong>non-negativity constraints</strong>.

              </p>

              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-7">

                Since x and y represent the number of products produced,
                negative quantities have no practical meaning.

              </p>

              <div className="mt-4 rounded-lg bg-white dark:bg-gray-950 p-4
                        border border-purple-200 dark:border-purple-900/40">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center">

                  <div className="font-mono font-bold text-purple-600 dark:text-purple-400">
                    x ≥ 0
                    <div className="text-xs font-sans font-normal text-gray-500 mt-1">
                      Cannot produce negative cakes
                    </div>
                  </div>

                  <div className="font-mono font-bold text-purple-600 dark:text-purple-400">
                    y ≥ 0
                    <div className="text-xs font-sans font-normal text-gray-500 mt-1">
                      Cannot produce negative cookies
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
      HOW TO READ
  ===================================================== */}
        <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/20
                  border border-indigo-200 dark:border-indigo-900/40 p-6">

          <h3 className="font-bold text-indigo-900 dark:text-indigo-300 text-lg">
            🧠 A Simple Way to Read Any LP Model
          </h3>

          <div className="mt-5 space-y-4">

            <div className="flex items-start gap-3">

              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white
                         flex items-center justify-center text-xs font-bold">
                1
              </span>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Objective function:</strong> What do I want to maximize
                or minimize?
              </p>

            </div>


            <div className="flex items-start gap-3">

              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white
                         flex items-center justify-center text-xs font-bold">
                2
              </span>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Constraints:</strong> What limitations must I obey?
              </p>

            </div>


            <div className="flex items-start gap-3">

              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white
                         flex items-center justify-center text-xs font-bold">
                3
              </span>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Variables:</strong> What quantities am I deciding?
              </p>

            </div>


            <div className="flex items-start gap-3">

              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white
                         flex items-center justify-center text-xs font-bold">
                4
              </span>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Non-negativity:</strong> Can the variables logically be negative?
                Usually, no.
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
      QUICK CHECK
  ===================================================== */}
        <div className="mt-6 rounded-2xl bg-gray-900 dark:bg-black p-6 text-white">

          <h3 className="font-bold text-lg">
            📝 Quick Check
          </h3>

          <p className="mt-3 text-gray-300 text-sm leading-6">

            Look at the equation:

          </p>

          <div className="my-5 text-center font-mono text-xl font-bold text-green-300">
            3x + 2y ≤ 60
          </div>

          <p className="text-gray-300 text-sm leading-7">

            Can you identify:

          </p>

          <ul className="mt-3 space-y-2 text-sm text-gray-300">

            <li>
              • What might <strong>x</strong> represent?
            </li>

            <li>
              • What might <strong>y</strong> represent?
            </li>

            <li>
              • What might <strong>3</strong> represent?
            </li>
            <li>
              • What might <strong>2</strong> represent?
            </li>
            <li>
              • What does <strong>60</strong> represent?
            </li>
            <li>
              • Why is the symbol <strong>≤</strong> used?
            </li>
          </ul>

          <div className="mt-5 rounded-lg bg-white/10 p-4">

            <p className="text-xs text-gray-400">
              Think before looking for the answer.
            </p>

            <p className="mt-2 text-sm text-gray-200">
              This is exactly the type of thinking you will need when
              formulating LP problems yourself.
            </p>

          </div>

        </div>

      </section>

      {/* ===== SECTION 3: FORMULATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✍️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            How to Formulate the Objective Function
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <ol className="list-decimal pl-5 space-y-3 text-gray-700 dark:text-gray-300 text-sm">
            <li>
              <strong>Identify the goal:</strong> Are you maximizing profit, minimizing cost, or something else?
            </li>
            <li>
              <strong>Determine contributions:</strong> For each decision variable, identify its per‑unit contribution to the goal.
            </li>
            <li>
              <strong>Write the expression:</strong> Sum the contributions multiplied by the respective variables.
            </li>
            <li>
              <strong>Specify direction:</strong> Write "Maximize" or "Minimize" in front of the expression.
            </li>
          </ol>
          <div className="mt-4 bg-white dark:bg-gray-800/50 rounded-lg p-3 font-mono text-sm">
            <p className="text-blue-700 dark:text-blue-300">Example: Production problem</p>
            <p>Maximize Z = 10x₁ + 15x₂</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">where x₁, x₂ are units of products A and B, and 10, 15 are profits per unit.</p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: REAL-WORLD EXAMPLES (4+) ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏭</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real‑World Examples
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "Manufacturing – Profit Max",
              objective: "Max Z = 5x₁ + 3x₂ (profit per unit)",
              goal: "Produce the mix that yields highest total profit.",
            },
            {
              domain: "Diet Planning – Cost Min",
              objective: "Min Z = 2x₁ + 3x₂ (cost per serving)",
              goal: "Meet nutritional needs at lowest cost.",
            },
            {
              domain: "Investment – Return Max",
              objective: "Max Z = 0.08x₁ + 0.06x₂ (return rates)",
              goal: "Allocate funds to maximize expected return.",
            },
            {
              domain: "Transportation – Shipping Cost Min",
              objective: "Min Z = 5x₁₁ + 7x₁₂ + 4x₂₁ + ... (unit shipping costs)",
              goal: "Ship goods with minimum total cost.",
            },
            {
              domain: "Advertising – Reach Max",
              objective: "Max Z = 1.2x₁ + 0.8x₂ (reach per dollar)",
              goal: "Allocate budget to maximize audience reach.",
            },
            {
              domain: "Workforce – Labor Cost Min",
              objective: "Min Z = 15x₁ + 20x₂ (hourly wages)",
              goal: "Minimize labor cost while meeting staffing needs.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.domain}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                <span className="font-medium">Objective:</span> {item.objective}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <span className="font-medium">Goal:</span> {item.goal}
              </p>
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
              title: "Define the objective first",
              desc: "Before writing constraints, know what you are optimizing.",
            },
            {
              title: "Use meaningful variable names",
              desc: "This makes the objective self‑explanatory (e.g., profit_A, cost_B).",
            },
            {
              title: "Check coefficients carefully",
              desc: "Ensure they reflect true values—profit, cost, etc.—not estimates.",
            },
            {
              title: "Convert min to max if needed",
              desc: "Some algorithms prefer maximization; multiply by -1.",
            },
            {
              title: "Watch out for units",
              desc: "All terms in the objective must be in the same unit (e.g., dollars).",
            },
            {
              title: "Validate with simple numbers",
              desc: "Test the objective by plugging in feasible values to see if it makes sense.",
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
                mistake: "Forgetting the objective entirely",
                fix: "Always include an objective function; it's the core of LP.",
              },
              {
                mistake: "Using non‑linear terms",
                fix: "Keep it linear: no squares, products, or divisions by variables.",
              },
              {
                mistake: "Wrong direction (max vs min)",
                fix: "Clearly state whether you are maximizing or minimizing.",
              },
              {
                mistake: "Including constants that should be in constraints",
                fix: "The objective should only depend on decision variables.",
              },
              {
                mistake: "Mixing units",
                fix: "All coefficients and variables must be in the same unit.",
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
            "Write the objective function at the top of the model.",
            "Clearly label it as 'Maximize' or 'Minimize'.",
            "Use descriptive variable names to make the objective readable.",
            "Check that the objective is linear.",
            "Ensure all coefficients are constants, not variables.",
            "Validate the objective with extreme values.",
            "Document any assumptions about coefficients.",
            "Review the objective with stakeholders to confirm it matches their goal.",
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
                <strong>Observe carefully:</strong> If you have a maximization
                problem and you accidentally write minimization, how will the
                solution differ? What happens to the objective value?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> In a production problem,
                suppose the profit per unit of product A increases. How would
                that affect the optimal production mix?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Mahima runs a catering
                business in Jadavpur. She wants to minimize cost while meeting
                nutritional requirements. What should be her objective function?
                What would the coefficients represent?
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
              "✅ Define the objective function and its purpose in LP",
              "✅ Distinguish between maximization and minimization objectives",
              "✅ Formulate an objective function from a problem description",
              "✅ Identify the coefficients and what they represent",
              "✅ Avoid common mistakes like non‑linearity or wrong direction",
              "✅ Explain how the objective function guides the optimization process",
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
          title="Objective Function FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 11: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <PlainTextPrint
          content={noteText}
          title="Objective Function - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic3_note.txt"
        />
      </div>

      {/* ===== SECTION 12: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <Teacher
          note={
            "The objective function is the driving force behind every LP model. I always tell my students: 'Start with the objective; the constraints are secondary.' When you understand what you want to achieve, everything else falls into place. Abhronila from Ichapur once said that after learning about objective functions, she started seeing her daily choices in terms of optimization—should I study or rest? That's the power of this concept. Remember, the objective function must be linear, single, and clear. Practice writing objectives for different scenarios; it will sharpen your modeling skills. Also, always double‑check the units and the direction – a single sign error can ruin the entire model."
          }
        />
      </div>
    </div>
  );
};

export default Topic3;