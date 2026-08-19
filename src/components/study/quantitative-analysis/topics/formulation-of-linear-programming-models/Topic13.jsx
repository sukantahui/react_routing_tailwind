import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic13_files/topic13_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13: Worked Example 7 – Cost minimization problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic13 component
 *
 * @purpose Provides a complete, step-by-step worked example of a cost
 * minimization problem, demonstrating how to minimize costs while meeting
 * minimum requirements (≥ constraints).
 *
 * @when_used After covering profit maximization problems (Topics 7-12),
 * this topic introduces the dual concept of cost minimization, showing how
 * LP can be used to find the least expensive way to meet requirements.
 */
const Topic13 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 13
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 7
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 7: Cost Minimization Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Finding the least expensive way to meet minimum requirements —
          the dual of profit maximization and a fundamental LP application.
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
              A company needs to produce <strong>two products</strong>:
              <strong> Product X</strong> and <strong>Product Y</strong>.
              The company must meet <strong>minimum requirements</strong> for
              <strong> two resources</strong>: Resource A and Resource B.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Resource</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product X</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product Y</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Minimum Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Resource A</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">24</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Resource B</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">4</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">20</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Cost per unit:</strong> Product X ={" "}
                <span className="font-mono text-red-600 dark:text-red-400">₹40</span>,
                Product Y = <span className="font-mono text-red-600 dark:text-red-400">₹60</span>
              </li>
              <li>
                The company wants to <strong>minimize total cost</strong> while
                meeting the minimum requirements.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal production mix
                of Product X and Product Y that minimizes total cost while
                meeting minimum requirements for both resources.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: COST MINIMIZATION VS PROFIT MAXIMIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚖️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Cost Minimization vs Profit Maximization
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              type: "Cost Minimization",
              objective: "Minimize cost",
              constraints: "≥ (minimum requirements)",
              feasibleRegion: "Above the constraints",
              interpretation: "Meet requirements at lowest cost",
            },
            {
              type: "Profit Maximization",
              objective: "Maximize profit",
              constraints: "≤ (maximum capacities)",
              feasibleRegion: "Below the constraints",
              interpretation: "Use resources efficiently for highest profit",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.type}</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p><span className="font-medium">Objective:</span> {item.objective}</p>
                <p><span className="font-medium">Constraints:</span> {item.constraints}</p>
                <p><span className="font-medium">Feasible Region:</span> {item.feasibleRegion}</p>
                <p><span className="font-medium">Interpretation:</span> {item.interpretation}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> Cost minimization and profit maximization
            are <strong>dual problems</strong>. The same LP techniques apply to
            both, but the direction of optimization and constraint types differ.
          </p>
        </div>
      </section>

      {/* ===== SECTION 3: STEP-BY-STEP FORMULATION ===== */}
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
                  <li><strong>Goal:</strong> Minimize total cost.</li>
                  <li><strong>Products:</strong> X and Y (2 products).</li>
                  <li><strong>Requirements:</strong> Resource A (≥ 24), Resource B (≥ 20).</li>
                  <li>This is a <strong>minimization</strong> problem with <strong>≥</strong> constraints.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 products, 2 minimum requirements, cost minimization goal.
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
                  <p>x₁ = number of units of Product X produced</p>
                  <p>x₂ = number of units of Product Y produced</p>
                </div>
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
                  <p>Minimize Z = 40x₁ + 60x₂</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Cost per unit X = <span className="font-mono">₹40</span></li>
                  <li>Cost per unit Y = <span className="font-mono">₹60</span></li>
                  <li>We want to <strong>minimize</strong> total cost.</li>
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
                  <p>Resource A: 2x₁ + 3x₂ ≥ 24</p>
                  <p>Resource B: 4x₁ + 2x₂ ≥ 20</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Resource A:</strong> X provides 2 units, Y provides 3 units, need ≥ 24.</li>
                  <li><strong>Resource B:</strong> X provides 4 units, Y provides 2 units, need ≥ 20.</li>
                </ul>
                <div className="mt-2 bg-red-50/60 dark:bg-red-950/30 p-2 rounded border border-red-200 dark:border-red-900/50">
                  <p className="text-xs text-red-800 dark:text-red-300">
                    ⚠️ Note: These are <strong>≥</strong> constraints (minimum requirements),
                    not ≤ constraints like in previous examples.
                  </p>
                </div>
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 0, x₂ = 10</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Resource A: 3(10) = 30 ≥ 24 ✓
                      <br />
                      Resource B: 2(10) = 20 ≥ 20 ✓
                      <br />
                      Cost: 60(10) = ₹600
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✅ Feasible solution!</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 6, x₂ = 4</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Resource A: 2(6) + 3(4) = 12 + 12 = 24 ≥ 24 ✓
                      <br />
                      Resource B: 4(6) + 2(4) = 24 + 8 = 32 ≥ 20 ✓
                      <br />
                      Cost: 40(6) + 60(4) = 240 + 240 = ₹480
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✅ Feasible solution! Lower cost!</p>
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
                  <p>Minimize Z = 40x₁ + 60x₂</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Resource A: 2x₁ + 3x₂ ≥ 24</p>
                  <p className="pl-4">Resource B: 4x₁ + 2x₂ ≥ 20</p>
                  <p className="pl-4">x₁ ≥ 0, x₂ ≥ 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: GRAPHICAL SOLUTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Graphical Solution & Corner Point Analysis
          </h2>
        </div>

        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 600 500"
            className="w-full h-auto"
            aria-label="Graphical solution for cost minimization problem"
            role="img"
          >
            <rect x="0" y="0" width="600" height="500" fill="none" />

            {/* Axes */}
            <line x1="60" y1="430" x2="560" y2="430" stroke="#94a3b8" strokeWidth="2" />
            <line x1="60" y1="430" x2="60" y2="30" stroke="#94a3b8" strokeWidth="2" />
            <text x="570" y="450" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Product X (x₁)</text>
            <text x="30" y="20" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Product Y (x₂)</text>

            {/* Scale marks */}
            <text x="60" y="445" fontSize="10" fill="#94a3b8">0</text>
            <text x="110" y="445" fontSize="10" fill="#94a3b8">2</text>
            <text x="160" y="445" fontSize="10" fill="#94a3b8">6</text>
            <text x="210" y="445" fontSize="10" fill="#94a3b8">10</text>
            <text x="310" y="445" fontSize="10" fill="#94a3b8">15</text>
            <text x="410" y="445" fontSize="10" fill="#94a3b8">20</text>

            <text x="45" y="230" fontSize="10" fill="#94a3b8">5</text>
            <text x="45" y="130" fontSize="10" fill="#94a3b8">10</text>
            <text x="45" y="80" fontSize="10" fill="#94a3b8">15</text>

            {/* Resource A: 2x₁ + 3x₂ = 24 => x₂ = 8 - (2/3)x₁ */}
            <line x1="60" y1="430" x2="260" y2="160" stroke="#ef4444" strokeWidth="2.5" />
            <text x="265" y="155" fontSize="11" fill="#ef4444" fontWeight="bold">Resource A</text>

            {/* Resource B: 4x₁ + 2x₂ = 20 => x₂ = 10 - 2x₁ */}
            <line x1="60" y1="430" x2="160" y2="230" stroke="#22c55e" strokeWidth="2.5" />
            <text x="165" y="225" fontSize="11" fill="#22c55e" fontWeight="bold">Resource B</text>

            {/* Feasible region (above both constraints) */}
            <polygon
              points="60,430 60,160 160,230 260,160 560,30 560,430"
              fill="#3b82f6"
              fillOpacity="0.12"
              stroke="#3b82f6"
              strokeWidth="2.5"
            >
              <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="4s" repeatCount="indefinite" />
            </polygon>

            <text x="300" y="350" fontSize="14" fill="#3b82f6" fontWeight="bold">Feasible</text>
            <text x="300" y="370" fontSize="14" fill="#3b82f6" fontWeight="bold">Region</text>

            {/* Corner points */}
            {/* (0, 10) */}
            <circle cx="60" cy="230" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="70" y="225" fontSize="9" fill="#475569" dark="#94a3b8">(0,10)</text>

            {/* (1.5, 7) - Optimal! */}
            <circle cx="84" cy="290" r="9" fill="#22c55e" stroke="white" strokeWidth="3">
              <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="75" y="275" fontSize="11" fill="#22c55e" fontWeight="bold">★ (1.5, 7)</text>
            <text x="75" y="320" fontSize="9" fill="#22c55e">Optimal</text>

            {/* (12, 0) - Alternative Optimum! */}
            <circle cx="260" cy="430" r="9" fill="#22c55e" stroke="white" strokeWidth="3">
              <animate attributeName="r" values="7;10;7" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <text x="270" y="420" fontSize="11" fill="#22c55e" fontWeight="bold">★ (12, 0)</text>
            <text x="270" y="445" fontSize="9" fill="#22c55e">Alternative Optimal</text>

            {/* Objective function line at optimum */}
            <line x1="100" y1="410" x2="260" y2="160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4">
              <animate attributeName="y1" values="410;400;410" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="160;150;160" dur="3s" repeatCount="indefinite" />
            </line>
            <text x="270" y="155" fontSize="10" fill="#f59e0b" fontWeight="bold">Z = 40x₁ + 60x₂</text>

            {/* Arrow showing cost direction */}
            <polygon points="480,350 500,335 500,365" fill="#f59e0b">
              <animate attributeName="transform" values="translate(0,0);translate(-6,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="505" y="355" fontSize="11" fill="#f59e0b" fontWeight="bold">Minimize Cost</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The feasible region is above both constraint lines. The optimal solution is at (1.5, 7)
            with cost = ₹480. There is also an alternative optimum at (12, 0).
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: CORNER POINT ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📐</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Corner Point Analysis
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Corner Point</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₁ (Product X)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₂ (Product Y)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Cost (Z = 40x₁ + 60x₂)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">A</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹600</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/30">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">B</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">1.5</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">7</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">₹480</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">★ OPTIMAL</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/30">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">C</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">12</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">₹480</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">★ ALTERNATIVE</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/50">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Optimal Solutions:</strong> Produce{" "}
              <span className="font-bold">1.5 units of Product X and 7 units of Product Y</span>
              (or <span className="font-bold">12 units of Product X and 0 units of Product Y</span>).
              Both give minimum cost = <span className="font-bold">₹480</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: RESOURCE UTILIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚙️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Resource Utilization at Optimal Solution
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              resource: "Resource A",
              used: "2(1.5) + 3(7) = 3 + 21 = 24",
              required: "24",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Resource B",
              used: "4(1.5) + 2(7) = 6 + 14 = 20",
              required: "20",
              status: "Binding ✓",
              percentage: "100%",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.resource}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span className="font-medium">Provided:</span> {item.used}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Required:</span> {item.required}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  {item.status}
                </span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
                  {item.percentage}
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: item.percentage }}>
                  <animate attributeName="width" values="0%;{item.percentage}" dur="1.5s" fill="freeze" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>💡 Key Observation:</strong> Both resources are{" "}
            <strong>binding</strong> (fully used) at the optimal solution.
            This means the minimum requirements are met exactly — no excess
            resource production.
          </p>
        </div>
      </section>

      {/* ===== SECTION 7: ALTERNATIVE OPTIMAL SOLUTIONS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔄</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Understanding Alternative Optimal Solutions
          </h2>
        </div>
        <div className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-5 border border-indigo-200 dark:border-indigo-900/30">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            In this problem, there are <strong>two optimal solutions</strong>:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">Solution 1</p>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">x₁ = 1.5, x₂ = 7</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cost = ₹480</p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">Solution 2</p>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">x₁ = 12, x₂ = 0</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cost = ₹480</p>
            </div>
          </div>
          <div className="mt-3 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Why multiple optima?</strong> The objective function
              40x₁ + 60x₂ = 480 is <strong>parallel</strong> to the Resource A
              constraint 2x₁ + 3x₂ = 24. Both have slope -2/3. This means
              any point along the line segment between the two corner points
              is also optimal!
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 8: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Identify the objective direction",
              desc: "In minimization, the optimal solution is at the lowest possible corner.",
            },
            {
              title: "Check constraint direction",
              desc: "≥ constraints mean the feasible region is above the constraint lines.",
            },
            {
              title: "Look for multiple optima",
              desc: "If the objective is parallel to a constraint, there are infinite optimal solutions.",
            },
            {
              title: "Calculate resource efficiency",
              desc: "Cost per unit of requirement helps identify the cheaper product.",
            },
            {
              title: "Validate with extreme points",
              desc: "Test producing only one product to check feasibility and cost.",
            },
            {
              title: "Consider integer requirements",
              desc: "If products must be whole units, use Integer Programming.",
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

      {/* ===== SECTION 9: COMMON MISTAKES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
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
                mistake: "Using ≤ instead of ≥ for minimum requirements",
                fix: "Minimum requirements need ≥ constraints.",
              },
              {
                mistake: "Shading the wrong side of the constraint",
                fix: "For ≥ constraints, shade above the line.",
              },
              {
                mistake: "Assuming only one optimal solution",
                fix: "Check if the objective is parallel to any constraint.",
              },
              {
                mistake: "Forgetting non-negativity",
                fix: "x₁ ≥ 0, x₂ ≥ 0 are mandatory.",
              },
              {
                mistake: "Not validating the solution",
                fix: "Check all constraints at the optimal solution.",
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

      {/* ===== SECTION 10: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Clearly identify if the problem is minimization or maximization.",
            "Use ≥ for minimum requirements and ≤ for maximum limits.",
            "Plot constraints correctly, shading the feasible region.",
            "Check all corner points of the feasible region.",
            "Look for alternative optimal solutions.",
            "Validate the solution by checking all constraints.",
            "Document the optimal solution and its cost.",
            "Consider integer constraints if relevant.",
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

      {/* ===== SECTION 11: HINT SECTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💭</span>
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">Think About…</h3>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Observe carefully:</strong> At the optimal solution,
                both resources are fully used. Why is it optimal to have no
                excess resources when minimizing cost?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If Product X's cost
                decreases to ₹30 per unit, what happens to the optimal solution?
                Would there still be multiple optima?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Susmita is a nutritionist
                in Kolkata planning a diet with two foods that must meet minimum
                protein and vitamin requirements. How would she use cost
                minimization to design the cheapest diet?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 12: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
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
              "✅ Formulate a cost minimization LP model with ≥ constraints",
              "✅ Distinguish between minimization and maximization problems",
              "✅ Identify the feasible region for ≥ constraints",
              "✅ Find corner points of the feasible region",
              "✅ Recognize alternative optimal solutions",
              "✅ Explain why multiple optima occur",
              "✅ Apply the 7-step procedure to cost minimization problems",
              "✅ Validate the solution by checking all constraints",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">{item.split(" ")[0]}</span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 13: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <FAQTemplate
          title="Cost Minimization Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 14: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <PlainTextPrint
          content={noteText}
          title="Cost Minimization Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic13_note.txt"
        />
      </div>

      {/* ===== SECTION 15: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1250">
        <Teacher
          note={
            "Cost minimization is the perfect complement to profit maximization. This example shows a crucial insight: sometimes there are multiple ways to achieve the same minimum cost. The multiple optimal solutions occur because the objective function is parallel to the Resource A constraint—a concept students often find fascinating. I tell my students: 'If you have two equally good solutions, you have flexibility in decision-making.' Mahima from Jadavpur once told me this example helped her understand why a company might choose different product mixes for operational reasons, even when the cost is the same. Remember: in minimization problems, the feasible region extends upward—opposite to maximization. This is a key distinction that takes practice to master."
          }
        />
      </div>
    </div>
  );
};

export default Topic13;