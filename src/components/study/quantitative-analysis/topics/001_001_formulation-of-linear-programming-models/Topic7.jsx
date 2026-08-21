import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic7_files/topic7_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7: Worked Example 1 – Simple production problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic7 component
 *
 * @purpose Provides a complete, step-by-step worked example of formulating a
 * Linear Programming model for a simple production problem, demonstrating the
 * 7-step procedure in action.
 *
 * @when_used After learning the 7-step formulation procedure (Topic6), this
 * topic applies it to a concrete example, showing how theory is put into practice.
 */
const Topic7 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 7
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 1
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 1: Simple Production Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Applying the 7-step formulation procedure to a real production scenario
          — tables and chairs, limited resources, maximum profit.
        </p>
      </header>

      {/* ===== SECTION 1: PROBLEM STATEMENT ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Problem Statement
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
              A small furniture workshop produces <strong>two products</strong>:
              <strong> Tables</strong> and <strong>Chairs</strong>.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Each table</strong> requires <span className="font-mono text-blue-600 dark:text-blue-400">3 hours</span> of carpentry work and{" "}
                <span className="font-mono text-blue-600 dark:text-blue-400">2 hours</span> of finishing work.
              </li>
              <li>
                <strong>Each chair</strong> requires <span className="font-mono text-blue-600 dark:text-blue-400">2 hours</span> of carpentry work and{" "}
                <span className="font-mono text-blue-600 dark:text-blue-400">1 hour</span> of finishing work.
              </li>
              <li>
                The workshop has <span className="font-mono text-blue-600 dark:text-blue-400">120 hours</span> of carpentry and{" "}
                <span className="font-mono text-blue-600 dark:text-blue-400">60 hours</span> of finishing available <strong>per week</strong>.
              </li>
              <li>
                The <strong>profit</strong> per table is <span className="font-mono text-green-600 dark:text-green-400">$40</span>, and per chair is{" "}
                <span className="font-mono text-green-600 dark:text-green-400">$25</span>.
              </li>
              <li>
                Market <strong>demand</strong> requires <span className="font-mono text-blue-600 dark:text-blue-400">at least 10 chairs</span> to be produced per week.
              </li>
              <li>
                The workshop wants to <strong>maximize weekly profit</strong>.
              </li>
            </ul>
            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Maximize profit by deciding how many
                tables and chairs to produce each week, subject to available
                resources and demand requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: STEP-BY-STEP SOLUTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔢</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Step-by-Step Formulation
          </h2>
        </div>

        <div className="space-y-4">
          {/* Step 1 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Read and Understand</h3>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Goal:</strong> Maximize profit.</li>
                  <li><strong>Resources:</strong> Carpentry (120 hours), Finishing (60 hours).</li>
                  <li><strong>Products:</strong> Tables and Chairs.</li>
                  <li><strong>Requirement:</strong> At least 10 chairs.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ We've identified the goal, resources, products, and requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Identify Decision Variables</h3>
                <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <p>x₁ = number of tables produced per week</p>
                  <p>x₂ = number of chairs produced per week</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-medium">Why?</span> These are the quantities
                  the workshop can control and decide.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">3</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Identify the Objective</h3>
                <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <p>Maximize Z = 40x₁ + 25x₂</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Profit per table = <span className="font-mono">$40</span></li>
                  <li>Profit per chair = <span className="font-mono">$25</span></li>
                  <li>We want to <strong>maximize</strong> total profit.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">4</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Identify Constraints</h3>
                <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded space-y-1">
                  <p>Carpentry: 3x₁ + 2x₂ ≤ 120</p>
                  <p>Finishing: 2x₁ + 1x₂ ≤ 60</p>
                  <p>Demand: x₂ ≥ 10</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Carpentry:</strong> Tables use 3 hrs, chairs use 2 hrs, total ≤ 120.</li>
                  <li><strong>Finishing:</strong> Tables use 2 hrs, chairs use 1 hr, total ≤ 60.</li>
                  <li><strong>Demand:</strong> At least 10 chairs must be produced.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">5</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Add Non-Negativity</h3>
                <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
                  <p>x₁ ≥ 0, x₂ ≥ 0</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Cannot produce negative tables or chairs — these are physical quantities.
                </p>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">6</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Review and Validate</h3>
                <div className="mt-1 space-y-2">
                  <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">
                      Test: x₁ = 0, x₂ = 10 (produce 0 tables, 10 chairs)
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Carpentry: 3(0) + 2(10) = 20 ≤ 120 ✅
                      <br />
                      Finishing: 2(0) + 1(10) = 10 ≤ 60 ✅
                      <br />
                      Demand: 10 ≥ 10 ✅
                      <br />
                      Both variables ≥ 0 ✅
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      ✅ Feasible solution found! The model is consistent.
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">
                      Test: x₁ = 20, x₂ = 0 (produce 20 tables, 0 chairs)
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Carpentry: 3(20) + 2(0) = 60 ≤ 120 ✅
                      <br />
                      Finishing: 2(20) + 1(0) = 40 ≤ 60 ✅
                      <br />
                      Demand: 0 ≥ 10 ❌
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      ❌ Infeasible! This tells us we must produce at least 10 chairs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 7 */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <div className="flex items-start gap-4">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">7</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Document and Label</h3>
                <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded space-y-1">
                  <p className="font-semibold text-gray-900 dark:text-white">Final LP Model:</p>
                  <p>Maximize Z = 40x₁ + 25x₂</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Carpentry: 3x₁ + 2x₂ ≤ 120</p>
                  <p className="pl-4">Finishing: 2x₁ + x₂ ≤ 60</p>
                  <p className="pl-4">Demand: x₂ ≥ 10</p>
                  <p className="pl-4">x₁ ≥ 0, x₂ ≥ 0</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    where x₁ = tables produced, x₂ = chairs produced
                  </p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span className="font-medium">Assumptions:</span> Linear
                  relationships, all resources available, profit per unit constant.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: VISUALIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Visualizing the Production Problem
          </h2>
        </div>
        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 500 380"
            className="w-full h-auto"
            aria-label="Feasible region for the production problem"
            role="img"
          >
            <rect x="0" y="0" width="500" height="380" fill="none" />

            {/* Axes */}
            <line x1="50" y1="330" x2="470" y2="330" stroke="#94a3b8" strokeWidth="2" />
            <line x1="50" y1="330" x2="50" y2="30" stroke="#94a3b8" strokeWidth="2" />
            <text x="475" y="350" fontSize="13" fill="#475569" dark="#94a3b8" fontWeight="bold">Tables (x₁)</text>
            <text x="25" y="25" fontSize="13" fill="#475569" dark="#94a3b8" fontWeight="bold">Chairs (x₂)</text>

            {/* Feasible region */}
            <polygon
              points="50,230 50,130 130,130 200,90 200,50 170,50"
              fill="#3b82f6"
              fillOpacity="0.12"
              stroke="#3b82f6"
              strokeWidth="2.5"
            >
              <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="4s" repeatCount="indefinite" />
            </polygon>

            {/* Carpentry constraint: 3x₁ + 2x₂ ≤ 120 => x₂ = (120 - 3x₁)/2 */}
            <line x1="50" y1="230" x2="250" y2="50" stroke="#ef4444" strokeWidth="2.5" />
            <text x="255" y="55" fontSize="11" fill="#ef4444" fontWeight="bold">Carpentry</text>

            {/* Finishing constraint: 2x₁ + x₂ ≤ 60 => x₂ = 60 - 2x₁ */}
            <line x1="50" y1="330" x2="170" y2="50" stroke="#22c55e" strokeWidth="2.5" />
            <text x="175" y="55" fontSize="11" fill="#22c55e" fontWeight="bold">Finishing</text>

            {/* Demand constraint: x₂ ≥ 10 */}
            <line x1="50" y1="230" x2="470" y2="230" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="475" y="225" fontSize="11" fill="#a855f7" fontWeight="bold">Demand (x₂ ≥ 10)</text>

            {/* Non-negativity: x₁ ≥ 0, x₂ ≥ 0 (axes) */}

            {/* Labels for constraints */}
            <text x="80" y="280" fontSize="12" fill="#3b82f6" fontWeight="bold">Feasible</text>
            <text x="80" y="295" fontSize="12" fill="#3b82f6" fontWeight="bold">Region</text>

            {/* Corner points */}
            <circle cx="50" cy="230" r="6" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="130" r="6" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="130" cy="130" r="6" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="90" r="6" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1.5s" repeatCount="indefinite" />
            </circle>

            {/* Arrow showing objective direction */}
            <polygon points="430,250 450,235 450,265" fill="#f59e0b">
              <animate attributeName="transform" values="translate(0,0);translate(-5,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="455" y="255" fontSize="10" fill="#f59e0b" fontWeight="bold">Maximize</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The feasible region shows all production combinations that meet the constraints.
            The optimal solution lies at one of the corner points.
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: KEY INSIGHTS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💡</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Key Insights from This Example
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "🎯",
              title: "Goal Clarity",
              desc: "The objective is clearly defined: maximize profit. This drives the entire model.",
            },
            {
              icon: "📋",
              title: "Resource Awareness",
              desc: "Every resource limit becomes a constraint. Missing one can invalidate the solution.",
            },
            {
              icon: "📏",
              title: "Demand Matters",
              desc: "Minimum requirements (x₂ ≥ 10) are as important as resource limits.",
            },
            {
              icon: "✅",
              title: "Validation is Essential",
              desc: "Testing with simple values catches formulation errors before solving.",
            },
            {
              icon: "🔢",
              title: "Linear Relationships",
              desc: "All relationships are linear—no squares, products, or non-linear terms.",
            },
            {
              icon: "🏷️",
              title: "Clear Labels",
              desc: "Labeling constraints (Carpentry, Finishing, Demand) improves readability.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-0.5">{item.desc}</p>
                </div>
              </div>
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
              desc: "In this example, profit maximization tells us what variables matter.",
            },
            {
              title: "List all resources first",
              desc: "Carpentry and finishing hours were the first constraints we wrote.",
            },
            {
              title: "Look for 'at least' signals",
              desc: "The demand constraint (x₂ ≥ 10) came from 'at least 10 chairs'.",
            },
            {
              title: "Validate with extreme values",
              desc: "Testing x₁ = 0, x₂ = 10 caught the demand constraint correctly.",
            },
            {
              title: "Keep it organized",
              desc: "Using labels like 'Carpentry' and 'Finishing' makes the model clear.",
            },
            {
              title: "Check for missing constraints",
              desc: "What about material limits? What about machine capacity? Always check.",
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
            Common Pitfalls in This Example
          </h2>
        </div>
        <div className="bg-red-50/40 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900/30 p-5">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
            {[
              {
                mistake: "Forgetting the demand constraint (x₂ ≥ 10)",
                fix: "Always read for minimum requirements; 'at least' means ≥.",
              },
              {
                mistake: "Swapping coefficients (e.g., 2x₁ + 3x₂ instead of 3x₁ + 2x₂)",
                fix: "Double-check which product uses which resource.",
              },
              {
                mistake: "Using ≥ for resources instead of ≤",
                fix: "Resources are limits — you cannot exceed them, so use ≤.",
              },
              {
                mistake: "Forgetting non-negativity",
                fix: "Always write x₁ ≥ 0, x₂ ≥ 0 explicitly.",
              },
              {
                mistake: "Not validating the model",
                fix: "Test with simple values to catch errors early.",
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
            "Read the problem multiple times and highlight key information.",
            "Define variables clearly with units (e.g., tables per week).",
            "Write the objective function before constraints.",
            "List resources and requirements separately before writing equations.",
            "Use descriptive labels for each constraint.",
            "Test the model with simple feasible solutions.",
            "Check for consistency of units (all hours, all dollars).",
            "Document assumptions made (e.g., linearity, constant profit).",
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
                <strong>Observe carefully:</strong> In the validation step, why
                did x₁ = 20, x₂ = 0 fail? What does this tell us about the
                demand constraint?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If the profit per table
                increases to $50, how would that affect the objective function?
                Would the optimal solution change?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu runs a small
                bakery in Kolkata producing cakes and pastries. He has limited
                oven time and flour. He wants to maximize profit. Using the
                7-step procedure, how would you formulate his LP model?
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
            After working through this example, you should be able to:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            {[
              "✅ Formulate a simple production LP model from a word problem",
              "✅ Identify decision variables with clear definitions",
              "✅ Write the objective function (maximize profit)",
              "✅ Formulate resource constraints (≤) and demand constraints (≥)",
              "✅ Add non-negativity restrictions",
              "✅ Validate the model with simple feasible solutions",
              "✅ Document and label the final LP model",
              "✅ Identify common mistakes and how to avoid them",
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
          title="Simple Production Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 11: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <PlainTextPrint
          content={noteText}
          title="Simple Production Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic7_note.txt"
        />
      </div>

      {/* ===== SECTION 12: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <Teacher
          note={
            "This is the first worked example, and it's one of the most important topics in the course. Students often understand the theory but struggle to apply it. The key is to go through each step slowly and methodically. I always tell my students: 'Don't rush to write equations—spend time understanding the problem first.' In my experience, the demand constraint (x₂ ≥ 10) is the most commonly missed part of this problem. Susmita from Barrackpore once forgot it and got an optimal solution with 0 chairs—which made no business sense. That's why validation is so important. I encourage you to practice this example until the steps become automatic. Then try creating your own similar problems with different numbers and see if the procedure still works."
          }
        />
      </div>
    </div>
  );
};

export default Topic7;