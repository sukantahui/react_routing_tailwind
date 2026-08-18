// Topic1.jsx
import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic1_files/topic1_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1: Meaning and Purpose of Linear Programming
 *
 * @component
 * @returns {JSX.Element} The rendered component
 *
 * @purpose To help learners understand what Linear Programming is, why it exists,
 * and what problems it is designed to solve. This topic builds the motivation
 * behind the mathematical formulation and solution methods.
 *
 * @when_used Used immediately after the introduction to give context and
 * practical relevance before diving into the components and formulation.
 */
const Topic1 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 1
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Core Concepts
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Meaning &amp; Purpose of Linear Programming
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Why do we need LP? What makes it a powerful decision‑making tool?
        </p>
      </header>

      {/* ===== SECTION 1: THE MEANING ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📖</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            What Does "Linear Programming" Actually Mean?
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 text-base md:text-lg">
          <p>
            The term <strong>Linear Programming</strong> consists of two parts:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                Linear
              </span>{" "}
              — means that all mathematical relationships in the model are
              straight‑line (no squares, cubes, products of variables, or other
              nonlinearities). It guarantees that the contribution of each
              decision variable is proportional to its value.
            </li>
            <li>
              <span className="font-semibold text-gray-900 dark:text-white">
                Programming
              </span>{" "}
              — in this context does <em>not</em> mean computer programming; it
              refers to <strong>planning</strong> or{" "}
              <strong>scheduling</strong> of activities to achieve the best
              outcome. It comes from the military term "program" used during
              WWII for logistics plans.
            </li>
          </ul>
          <p className="mt-4">
            So, <strong>Linear Programming</strong> is a method for{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              optimal planning
            </span>{" "}
            when all relationships are linear. It is a systematic way of
            allocating scarce resources among competing activities.
          </p>
        </div>

        {/* SVG: Word breakdown */}
        <div className="mt-6 bg-blue-50/40 dark:bg-blue-950/20 rounded-2xl p-4 md:p-6 border border-blue-100 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <svg
            viewBox="0 0 600 140"
            className="w-full max-w-3xl mx-auto h-auto"
            aria-label="Word breakdown of Linear Programming"
            role="img"
          >
            <rect x="0" y="20" width="600" height="100" rx="12" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />

            {/* Linear box */}
            <rect x="40" y="30" width="200" height="80" rx="10" fill="#dbeafe" className="dark:fill-blue-950/40" stroke="#3b82f6" strokeWidth="2">
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
            </rect>
            <text x="140" y="60" textAnchor="middle" className="fill-blue-700 dark:fill-blue-300 text-xl font-bold">Linear</text>
            <text x="140" y="85" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400 text-sm">straight‑line relationships</text>

            {/* Plus sign */}
            <text x="280" y="80" textAnchor="middle" className="fill-gray-600 dark:fill-gray-400 text-3xl font-light">+</text>

            {/* Programming box */}
            <rect x="340" y="30" width="200" height="80" rx="10" fill="#d1fae5" className="dark:fill-emerald-950/40" stroke="#10b981" strokeWidth="2">
              <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </rect>
            <text x="440" y="60" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 text-xl font-bold">Programming</text>
            <text x="440" y="85" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 text-sm">planning / scheduling</text>

            {/* Arrow below indicating combination */}
            <path d="M140 115 L440 115" stroke="#6366f1" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#6366f1" />
              </marker>
            </defs>
            <text x="290" y="133" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-400 text-sm font-medium">= Optimal Planning with Linear Relationships</text>
          </svg>
        </div>
      </section>

      {/* ===== SECTION 2: THE PURPOSE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎯</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            The Core Purpose of LP
          </h2>
        </div>
        <div className="text-gray-700 dark:text-gray-300 text-base md:text-lg space-y-4">
          <p>
            The fundamental purpose of Linear Programming is to{" "}
            <strong className="text-indigo-600 dark:text-indigo-400">
              support decision‑making under scarcity
            </strong>
            . It provides a mathematical framework to answer questions like:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              How much of each product should we produce to maximise profit?
            </li>
            <li>
              What mix of investments gives the highest return with limited
              capital?
            </li>
            <li>
              How should we allocate staff to minimise total overtime cost?
            </li>
            <li>
              What is the least‑cost diet that meets nutritional requirements?
            </li>
          </ul>
          <p>
            LP turns these "what‑if" questions into a precise mathematical
            problem that can be solved systematically. It gives the{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              best possible answer
            </span>{" "}
            (the optimum) while respecting all real‑world limits (constraints).
          </p>
        </div>

        {/* 3‑pillar purpose graphic */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
            <div className="text-3xl mb-2">🧩</div>
            <h3 className="font-bold text-gray-900 dark:text-white">Clarity</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Forces you to define goals, resources, and relationships explicitly.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="font-bold text-gray-900 dark:text-white">Trade‑offs</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Quantifies the cost of using one resource over another.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="font-bold text-gray-900 dark:text-white">Optimality</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Guarantees the best possible solution within the given limits.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: WHY IS LP IMPORTANT? ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌟</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Why is LP So Widely Used?
          </h2>
        </div>
        <div className="bg-amber-50/40 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-900/30 p-5">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-amber-600 dark:text-amber-400 text-xl flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Proven effectiveness
                </span>
                <br />
                LP has been used for over 75 years in industry, military, and
                government – it's a mature, reliable tool.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 dark:text-amber-400 text-xl flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Solves real problems
                </span>
                <br />
                From manufacturing to healthcare to finance, LP delivers
                actionable solutions that save money and improve efficiency.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 dark:text-amber-400 text-xl flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Easy to implement
                </span>
                <br />
                With modern software (Excel Solver, Python libraries, etc.),
                LP models can be built and solved quickly.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-amber-600 dark:text-amber-400 text-xl flex-shrink-0">✓</span>
              <div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  Provides insights
                </span>
                <br />
                The solution tells you which resources are most critical and
                where to invest for the biggest impact.
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 4: REAL‑WORLD EXAMPLES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏭</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            LP in Action – Everyday Scenarios
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>🍰</span> Mamata's Bakery (Barrackpore)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Mamata makes two types of cakes. Each uses flour, sugar, and
              labour. She wants to know the number of each cake to bake daily to
              maximise profit. LP gives her the optimal production plan.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>📚</span> Mahima's Study Schedule (Jadavpur)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Mahima has 5 hours to study for three subjects. Each subject has
              a different weightage. She wants to allocate time to maximise her
              total marks. LP helps her decide the optimal time distribution.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>🚚</span> Logistics Company (Ichapur)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              A delivery company has trucks and drivers. Each delivery route
              takes time and fuel. They need to assign routes to trucks to
              minimise total cost while meeting all delivery deadlines.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span>🏥</span> Hospital Staffing (Kolkata)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              A hospital needs to schedule nurses over the week, ensuring
              minimum coverage each shift while minimising overtime costs.
              LP finds the best shift pattern.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: PROFESSIONAL TIPS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💡</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips &amp; Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">
              Start with the goal
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              Always ask: "What am I trying to achieve?" This defines the
              objective and sets the direction for the whole model.
            </p>
          </div>
          <div className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">
              Identify all constraints
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              List every resource limit, policy, and requirement. Missing one
              can make the solution infeasible in practice.
            </p>
          </div>
          <div className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">
              Think linearly
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              Ensure every relationship between variables is additive and
              proportional. If you spot x² or x·y, you need a different tool.
            </p>
          </div>
          <div className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">
              Use sensitivity analysis
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              After solving, check how the solution changes with different
              resource levels – this helps with real‑world uncertainty.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: COMMON PITFALLS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚠️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Common Pitfalls
          </h2>
        </div>
        <div className="bg-red-50/40 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900/30 p-5">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-red-500 dark:text-red-400 text-lg flex-shrink-0">✗</span>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  Confusing "programming" with coding
                </span>
                <br />
                <span className="text-gray-600 dark:text-gray-400 text-xs">
                  LP is a planning technique, not computer programming. The
                  term comes from the military.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 dark:text-red-400 text-lg flex-shrink-0">✗</span>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  Assuming LP can handle any optimisation problem
                </span>
                <br />
                <span className="text-gray-600 dark:text-gray-400 text-xs">
                  LP is restricted to linear problems. For nonlinear problems,
                  use nonlinear programming or other methods.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-500 dark:text-red-400 text-lg flex-shrink-0">✗</span>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  Ignoring the assumptions of certainty and divisibility
                </span>
                <br />
                <span className="text-gray-600 dark:text-gray-400 text-xs">
                  LP assumes all numbers are known exactly and variables can
                  be fractional – if not, you may need stochastic or integer
                  programming.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 7: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices for Understanding LP
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
            Always start by defining the decision variables and the objective.
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
            Write down all constraints before trying to solve.
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
            Test the model with simple numbers to catch errors.
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
            Use meaningful variable names (e.g., x_chairs, y_tables).
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
            Check that the objective is truly linear.
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <span className="text-green-500 dark:text-green-400 mr-2">✓</span>
            Always include non‑negativity constraints.
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: HINTS ===== */}
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
                <strong>Observe carefully:</strong> In Mamata's bakery example,
                what would happen if she could buy more flour? How would that
                change the optimal solution?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> Imagine Mahima's study
                schedule had a minimum of 1 hour per subject. How would you
                express that as a constraint?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> A company wants to
                maximise profit but also has to meet a legal requirement of
                zero waste. Is this still a linear programming problem? Why or
                why not?
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
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li>✅ I can explain the meaning of "linear" and "programming" in LP context.</li>
            <li>✅ I understand that LP helps make optimal decisions under scarcity.</li>
            <li>✅ I can list at least three real‑world applications of LP.</li>
            <li>✅ I know the key assumptions: linearity, proportionality, additivity, divisibility, certainty.</li>
            <li>✅ I can distinguish LP from other optimisation techniques (nonlinear, integer, etc.).</li>
            <li>✅ I am aware of common mistakes like forgetting non‑negativity or mixing up constraints.</li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 10: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
        <FAQTemplate
          title="Meaning and Purpose of LP – FAQs"
          questions={questions}
        />
      </div>

      {/* ===== PRINT BUTTON ===== */}
      <PlainTextPrint
        content={noteText}
        title="Introduction to Linear Programming"
        stampEnabled={true}
        showDownload={true}
        downloadButtonText="Download Note"
        downloadFileName="LP_Intro.txt"
      />
      {/* ===== TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <Teacher
          note={
            "This topic is the heart of the course – it gives students the 'why' behind LP. Emphasise that LP is not just math; it's a mindset for making smart decisions under constraints. Use the bakery and study schedule examples to anchor the concept. Encourage students to look for LP problems in their daily lives – they will be surprised how often they appear. Also, clarify early that 'programming' is about planning, not coding, to avoid confusion. A strong grasp of the purpose will make the formulation topics much easier to absorb."
          }
        />
      </div>
    </div>
  );
};

export default Topic1;