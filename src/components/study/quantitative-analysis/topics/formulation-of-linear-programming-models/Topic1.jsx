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

      {/* =========================================================
    SECTION 2A: UNDERSTANDING LP THROUGH A REAL DECISION
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-250">

        <div className="flex items-center gap-3 mb-4">

          <span className="text-2xl">🧠</span>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Let's Understand LP Through a Real Decision
          </h2>

        </div>

        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-7 mb-6">

          The easiest way to understand Linear Programming is to stop thinking
          about equations for a moment and think about a real decision where
          resources are limited.

        </p>


        {/* BIG IDEA */}
        <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 p-5 md:p-6 mb-6">

          <div className="flex items-start gap-4">

            <div className="text-3xl">
              💡
            </div>

            <div>

              <h3 className="font-bold text-indigo-900 dark:text-indigo-300">
                The central idea of LP
              </h3>

              <p className="mt-2 text-sm md:text-base text-indigo-800 dark:text-indigo-300 leading-7">

                We have <strong>limited resources</strong>, several possible
                choices, and a <strong>goal</strong>. LP helps us determine the
                best combination of choices while respecting all limitations.

              </p>

            </div>

          </div>

        </div>


        {/* REAL LIFE EXAMPLE */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">

          <div className="bg-gray-900 dark:bg-black px-5 py-5">

            <div className="flex items-center gap-3">

              <span className="text-2xl">
                🍰
              </span>

              <div>

                <h3 className="font-semibold text-white">
                  Example: A Bakery Has a Decision to Make
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Suppose a bakery produces cakes and cookies.
                </p>

              </div>

            </div>

          </div>


          <div className="p-5 md:p-6">

            <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-7">

              The bakery has only a limited amount of flour, sugar and labour.
              It cannot produce unlimited quantities of both products.

              At the same time, the owner wants to earn as much profit as possible.

            </p>


            {/* FOUR QUESTIONS */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/30 p-5">

                <div className="text-2xl mb-2">
                  ❓
                </div>

                <h4 className="font-bold text-gray-900 dark:text-white">
                  What can the bakery control?
                </h4>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  The number of cakes and cookies it decides to produce.
                </p>

              </div>


              <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/30 p-5">

                <div className="text-2xl mb-2">
                  🎯
                </div>

                <h4 className="font-bold text-gray-900 dark:text-white">
                  What is the goal?
                </h4>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  To maximize total profit.
                </p>

              </div>


              <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 p-5">

                <div className="text-2xl mb-2">
                  🚧
                </div>

                <h4 className="font-bold text-gray-900 dark:text-white">
                  What limits the decision?
                </h4>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Flour, sugar, labour, time and production capacity.
                </p>

              </div>


              <div className="rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30 p-5">

                <div className="text-2xl mb-2">
                  🏆
                </div>

                <h4 className="font-bold text-gray-900 dark:text-white">
                  What does LP provide?
                </h4>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  The best possible production combination under those limitations.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
    SECTION 2B: SCARCITY, CHOICE, TRADE-OFF AND OPTIMIZATION
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16">

        <div className="flex items-center gap-3 mb-4">

          <span className="text-2xl">⚖️</span>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            The Four Ideas Behind Every LP Problem
          </h2>

        </div>

        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-7 mb-6">

          Almost every Linear Programming problem can be understood through four
          connected ideas.

        </p>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* SCARCITY */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

            <div className="text-3xl mb-3">
              📦
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              1. Scarcity
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">

              Resources are limited.

              There may be only a certain amount of money, time, labour,
              land, raw material or machine capacity available.

            </p>

            <div className="mt-4 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3">

              <p className="text-xs text-gray-500 dark:text-gray-500">
                Example
              </p>

              <p className="font-mono font-bold text-blue-600 dark:text-blue-400 mt-1">
                Available flour = 100 kg
              </p>

            </div>

          </div>


          {/* CHOICE */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

            <div className="text-3xl mb-3">
              🔀
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              2. Choice
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">

              When resources are limited, we cannot choose everything.
              We have to decide how much of each activity or product to select.

            </p>

            <div className="mt-4 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3">

              <p className="text-xs text-gray-500 dark:text-gray-500">
                Example
              </p>

              <p className="font-mono font-bold text-green-600 dark:text-green-400 mt-1">
                Cakes OR Cookies?
              </p>

            </div>

          </div>


          {/* TRADE-OFF */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

            <div className="text-3xl mb-3">
              ⚔️
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              3. Trade-off
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">

              Using more resources for one activity may leave fewer resources
              available for another activity.

            </p>

            <div className="mt-4 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3">

              <p className="text-xs text-gray-500 dark:text-gray-500">
                Think about it
              </p>

              <p className="font-semibold text-amber-600 dark:text-amber-400 mt-1">
                More cakes may mean fewer cookies.
              </p>

            </div>

          </div>


          {/* OPTIMIZATION */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

            <div className="text-3xl mb-3">
              🏆
            </div>

            <h3 className="font-bold text-gray-900 dark:text-white text-lg">
              4. Optimization
            </h3>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-6">

              After considering all possible choices and limitations,
              we want to find the best one.

            </p>

            <div className="mt-4 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3">

              <p className="text-xs text-gray-500 dark:text-gray-500">
                Goal
              </p>

              <p className="font-mono font-bold text-purple-600 dark:text-purple-400 mt-1">
                Maximum Profit
              </p>

            </div>

          </div>

        </div>


        {/* FLOW */}
        <div className="mt-6 rounded-2xl bg-gray-900 dark:bg-black p-6">

          <p className="text-center text-sm text-gray-400 mb-5">
            The basic logic of Linear Programming
          </p>

          <div className="flex flex-wrap justify-center items-center gap-2 text-sm font-semibold">

            {[
              "Scarcity",
              "Choice",
              "Trade-off",
              "Optimization",
            ].map((item, index, array) => (

              <React.Fragment key={item}>

                <span className="rounded-lg bg-white/10 px-4 py-2 text-white">
                  {item}
                </span>

                {index < array.length - 1 && (
                  <span className="text-blue-400 text-lg">
                    →
                  </span>
                )}

              </React.Fragment>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
    SECTION 2C: WHAT LP DOES AND DOES NOT DO
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16">

        <div className="flex items-center gap-3 mb-4">

          <span className="text-2xl">🔎</span>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            What Does LP Actually Do?
          </h2>

        </div>

        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-7 mb-6">

          LP does not magically make decisions for us. It converts a real-world
          decision into a mathematical model and then finds the best solution
          within the assumptions of that model.

        </p>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* DOES */}
          <div className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/40 p-6">

            <h3 className="text-lg font-bold text-green-800 dark:text-green-300 flex items-center gap-2">

              <span>✓</span>
              LP Does

            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">

              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                Find the best solution under given constraints.
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                Compare different possible resource allocations.
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                Help maximize profit or minimize cost.
              </li>

              <li className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                Make trade-offs explicit and measurable.
              </li>

            </ul>

          </div>


          {/* DOES NOT */}
          <div className="rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 p-6">

            <h3 className="text-lg font-bold text-red-800 dark:text-red-300 flex items-center gap-2">

              <span>✗</span>
              LP Does Not

            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-700 dark:text-gray-300">

              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400">✗</span>
                Automatically know what the real-world objective should be.
              </li>

              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400">✗</span>
                Remove real-world resource limitations.
              </li>

              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400">✗</span>
                Guarantee a useful answer if the model is badly formulated.
              </li>

              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400">✗</span>
                Handle every type of optimization problem.
              </li>

            </ul>

          </div>

        </div>


        {/* IMPORTANT */}
        <div className="mt-6 rounded-xl border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 p-5">

          <p className="text-sm md:text-base text-indigo-900 dark:text-indigo-300 leading-7">

            <strong>Important:</strong>{" "}
            A mathematical solver can find the optimum of the model you give it.
            Therefore, the quality of the final answer depends heavily on the
            quality of the model.

          </p>

        </div>

      </section>


      {/* =========================================================
    SECTION 2D: FROM REAL PROBLEM TO LP MODEL
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16">

        <div className="flex items-center gap-3 mb-4">

          <span className="text-2xl">🔄</span>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            From a Real Problem to a Mathematical Problem
          </h2>

        </div>

        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-7 mb-6">

          This is the most important conceptual transition in Linear Programming.
          A real-world situation must first be translated into a mathematical model.

        </p>


        <div className="space-y-3">

          {/* REAL WORLD */}
          <div className="rounded-xl border border-blue-200 dark:border-blue-900/40 bg-blue-50 dark:bg-blue-950/20 p-5">

            <div className="flex items-start gap-4">

              <div className="text-2xl">
                🌍
              </div>

              <div>

                <h3 className="font-bold text-blue-900 dark:text-blue-300">
                  Step 1 — Real-world problem
                </h3>

                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  A bakery wants to decide how many cakes and cookies to produce
                  using limited flour, sugar and labour.
                </p>

              </div>

            </div>

          </div>


          <div className="text-center text-blue-500 text-xl">
            ↓
          </div>


          {/* DECISION */}
          <div className="rounded-xl border border-green-200 dark:border-green-900/40 bg-green-50 dark:bg-green-950/20 p-5">

            <div className="flex items-start gap-4">

              <div className="text-2xl">
                🎯
              </div>

              <div>

                <h3 className="font-bold text-green-900 dark:text-green-300">
                  Step 2 — Identify the decision
                </h3>

                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  Decide the quantities that can be controlled.
                </p>

                <div className="mt-3 font-mono font-bold text-green-700 dark:text-green-400">
                  x = cakes, &nbsp; y = cookies
                </div>

              </div>

            </div>

          </div>


          <div className="text-center text-green-500 text-xl">
            ↓
          </div>


          {/* OBJECTIVE */}
          <div className="rounded-xl border border-purple-200 dark:border-purple-900/40 bg-purple-50 dark:bg-purple-950/20 p-5">

            <div className="flex items-start gap-4">

              <div className="text-2xl">
                🏆
              </div>

              <div>

                <h3 className="font-bold text-purple-900 dark:text-purple-300">
                  Step 3 — Define the objective
                </h3>

                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  Express the goal mathematically.
                </p>

                <div className="mt-3 font-mono font-bold text-purple-700 dark:text-purple-400">
                  Maximize Z = 100x + 50y
                </div>

              </div>

            </div>

          </div>


          <div className="text-center text-purple-500 text-xl">
            ↓
          </div>


          {/* CONSTRAINTS */}
          <div className="rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 p-5">

            <div className="flex items-start gap-4">

              <div className="text-2xl">
                🚧
              </div>

              <div>

                <h3 className="font-bold text-amber-900 dark:text-amber-300">
                  Step 4 — Express limitations
                </h3>

                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  Convert resource limitations into mathematical constraints.
                </p>

                <div className="mt-3 space-y-1 font-mono font-bold text-amber-700 dark:text-amber-400">
                  <div>2x + y ≤ 10</div>
                  <div>x + 2y ≤ 8</div>
                </div>

              </div>

            </div>

          </div>


          <div className="text-center text-amber-500 text-xl">
            ↓
          </div>


          {/* MODEL */}
          <div className="rounded-xl bg-gray-900 dark:bg-black p-6 text-white">

            <div className="text-center">

              <div className="text-2xl mb-2">
                🧩
              </div>

              <h3 className="font-bold text-lg">
                Step 5 — Complete LP Model
              </h3>

            </div>

            <div className="mt-5 space-y-2 text-center font-mono text-sm md:text-base">

              <div className="text-green-300">
                Maximize Z = 100x + 50y
              </div>

              <div className="text-gray-500">
                Subject to:
              </div>

              <div>
                2x + y ≤ 10
              </div>

              <div>
                x + 2y ≤ 8
              </div>

              <div>
                x ≥ 0, y ≥ 0
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
    SECTION 2E: THE BIG PICTURE
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16">

        <div className="rounded-2xl bg-indigo-600 dark:bg-indigo-700 p-6 md:p-8 text-white shadow-xl">

          <div className="text-center">

            <div className="text-3xl mb-3">
              🧭
            </div>

            <h2 className="text-2xl md:text-3xl font-bold">
              The Big Picture of Linear Programming
            </h2>

            <p className="mt-3 text-indigo-100 text-sm md:text-base max-w-3xl mx-auto leading-7">

              LP is not primarily about complicated mathematics.
              It is a structured way of thinking about decisions when resources
              are limited.

            </p>

          </div>


          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

            {[
              ["1", "Real Problem", "What is happening?"],
              ["2", "Decision", "What can I control?"],
              ["3", "Objective", "What do I want?"],
              ["4", "Constraints", "What limits me?"],
              ["5", "Optimization", "What is the best choice?"],
            ].map(([number, title, text]) => (

              <div
                key={number}
                className="rounded-xl bg-white/10 border border-white/10 p-4 text-center"
              >

                <div className="w-8 h-8 mx-auto rounded-full bg-white/20 flex items-center justify-center font-bold">
                  {number}
                </div>

                <h3 className="mt-3 font-bold">
                  {title}
                </h3>

                <p className="mt-1 text-xs text-indigo-100">
                  {text}
                </p>

              </div>

            ))}

          </div>


          <div className="mt-8 text-center">

            <p className="text-base md:text-lg font-bold">

              Real World
              <span className="mx-2 text-indigo-200">→</span>

              Mathematical Model
              <span className="mx-2 text-indigo-200">→</span>

              Solution
              <span className="mx-2 text-indigo-200">→</span>

              Decision

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