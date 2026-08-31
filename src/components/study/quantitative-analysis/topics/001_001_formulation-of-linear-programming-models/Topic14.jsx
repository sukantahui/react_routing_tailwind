import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic14_files/topic14_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic14_files/topic14_note.txt?raw";

/**
 * Topic14: Worked Example 8 – Diet and nutrition problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic14 component
 *
 * @purpose Provides a complete, step-by-step worked example of the classic
 * diet problem, demonstrating how LP can find the minimum cost diet that meets
 * nutritional requirements.
 *
 * @when_used After cost minimization (Topic13), this topic introduces a practical
 * application of cost minimization in healthcare and nutrition planning.
 */
const Topic14 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 14
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 8
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 8: Diet and Nutrition Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Finding the minimum cost diet that meets all nutritional requirements
          — a classic LP application in healthcare and nutrition planning.
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
              A nutritionist is planning a diet using <strong>two foods</strong>:
              <strong> Food A</strong> and <strong>Food B</strong>.
              The diet must meet <strong>minimum daily requirements</strong> for
              <strong> three nutrients</strong>: Carbohydrates, Protein, and Fat.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Nutrient</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Food A</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Food B</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Minimum Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Carbohydrates</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">4</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">16</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Protein</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">12</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Fat</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">10</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Cost per unit:</strong> Food A ={" "}
                <span className="font-mono text-red-600 dark:text-red-400">₹20</span>,
                Food B = <span className="font-mono text-red-600 dark:text-red-400">₹30</span>
              </li>
              <li>
                The nutritionist wants to <strong>minimize total cost</strong>
                while meeting all nutritional requirements.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal combination of
                Food A and Food B that minimizes cost while meeting minimum
                requirements for carbohydrates, protein, and fat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: STEP-BY-STEP FORMULATION ===== */}
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
                  <li><strong>Foods:</strong> A and B (2 foods).</li>
                  <li><strong>Nutrients:</strong> Carbohydrates (≥ 16), Protein (≥ 12), Fat (≥ 10).</li>
                  <li>This is a <strong>cost minimization</strong> problem with <strong>≥</strong> constraints.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 foods, 3 nutrient requirements, cost minimization goal.
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
                  <p>x₁ = number of units of Food A in the diet</p>
                  <p>x₂ = number of units of Food B in the diet</p>
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
                  <p>Minimize Z = 20x₁ + 30x₂</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Cost per unit A = <span className="font-mono">₹20</span></li>
                  <li>Cost per unit B = <span className="font-mono">₹30</span></li>
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
                  <p>Carbohydrates: 2x₁ + 4x₂ ≥ 16</p>
                  <p>Protein: 3x₁ + 1x₂ ≥ 12</p>
                  <p>Fat: x₁ + 3x₂ ≥ 10</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Carbohydrates:</strong> A provides 2, B provides 4, need ≥ 16.</li>
                  <li><strong>Protein:</strong> A provides 3, B provides 1, need ≥ 12.</li>
                  <li><strong>Fat:</strong> A provides 1, B provides 3, need ≥ 10.</li>
                </ul>
                <div className="mt-2 bg-red-50/60 dark:bg-red-950/30 p-2 rounded border border-red-200 dark:border-red-900/50">
                  <p className="text-xs text-red-800 dark:text-red-300">
                    ⚠️ All constraints are <strong>≥</strong> because they are minimum requirements.
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 4, x₂ = 2</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Carbohydrates: 2(4) + 4(2) = 8 + 8 = 16 ≥ 16 ✓
                      <br />
                      Protein: 3(4) + 1(2) = 12 + 2 = 14 ≥ 12 ✓
                      <br />
                      Fat: 1(4) + 3(2) = 4 + 6 = 10 ≥ 10 ✓
                      <br />
                      Cost: 20(4) + 30(2) = 80 + 60 = ₹140
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✅ Feasible solution!</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 3, x₂ = 3</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Carbohydrates: 2(3) + 4(3) = 6 + 12 = 18 ≥ 16 ✓
                      <br />
                      Protein: 3(3) + 1(3) = 9 + 3 = 12 ≥ 12 ✓
                      <br />
                      Fat: 1(3) + 3(3) = 3 + 9 = 12 ≥ 10 ✓
                      <br />
                      Cost: 20(3) + 30(3) = 60 + 90 = ₹150
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✅ Feasible solution!</p>
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
                  <p>Minimize Z = 20x₁ + 30x₂</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Carbohydrates: 2x₁ + 4x₂ ≥ 16</p>
                  <p className="pl-4">Protein: 3x₁ + x₂ ≥ 12</p>
                  <p className="pl-4">Fat: x₁ + 3x₂ ≥ 10</p>
                  <p className="pl-4">x₁ ≥ 0, x₂ ≥ 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: GRAPHICAL SOLUTION ===== */}
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
            aria-label="Graphical solution for diet problem"
            role="img"
          >
            <rect x="0" y="0" width="600" height="500" fill="none" />

            {/* Axes */}
            <line x1="60" y1="430" x2="560" y2="430" stroke="#94a3b8" strokeWidth="2" />
            <line x1="60" y1="430" x2="60" y2="30" stroke="#94a3b8" strokeWidth="2" />
            <text x="570" y="450" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Food A (x₁)</text>
            <text x="30" y="20" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Food B (x₂)</text>

            {/* Scale marks */}
            <text x="60" y="445" fontSize="10" fill="#94a3b8">0</text>
            <text x="110" y="445" fontSize="10" fill="#94a3b8">2</text>
            <text x="160" y="445" fontSize="10" fill="#94a3b8">4</text>
            <text x="210" y="445" fontSize="10" fill="#94a3b8">6</text>
            <text x="260" y="445" fontSize="10" fill="#94a3b8">8</text>
            <text x="360" y="445" fontSize="10" fill="#94a3b8">12</text>

            <text x="45" y="230" fontSize="10" fill="#94a3b8">4</text>
            <text x="45" y="130" fontSize="10" fill="#94a3b8">8</text>
            <text x="45" y="80" fontSize="10" fill="#94a3b8">12</text>

            {/* Carbohydrates: 2x₁ + 4x₂ = 16 => x₂ = 4 - 0.5x₁ */}
            <line x1="60" y1="430" x2="260" y2="230" stroke="#ef4444" strokeWidth="2.5" />
            <text x="265" y="225" fontSize="11" fill="#ef4444" fontWeight="bold">Carbohydrates</text>

            {/* Protein: 3x₁ + x₂ = 12 => x₂ = 12 - 3x₁ */}
            <line x1="60" y1="430" x2="160" y2="130" stroke="#22c55e" strokeWidth="2.5" />
            <text x="165" y="125" fontSize="11" fill="#22c55e" fontWeight="bold">Protein</text>

            {/* Fat: x₁ + 3x₂ = 10 => x₂ = (10 - x₁)/3 */}
            <line x1="60" y1="430" x2="310" y2="130" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="315" y="125" fontSize="11" fill="#a855f7" fontWeight="bold">Fat</text>

            {/* Feasible region (above all three constraints) */}
            <polygon
              points="60,430 60,230 160,130 210,130 560,30 560,430"
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
            {/* (3.2, 2.4) - Optimal! */}
            <circle cx="176" cy="294" r="9" fill="#22c55e" stroke="white" strokeWidth="3">
              <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="165" y="280" fontSize="11" fill="#22c55e" fontWeight="bold">★ (3.2, 2.4)</text>
            <text x="165" y="320" fontSize="9" fill="#22c55e">Optimal</text>

            {/* (4, 2) */}
            <circle cx="200" cy="270" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <text x="210" y="265" fontSize="9" fill="#475569" dark="#94a3b8">(4, 2)</text>

            {/* (0, 12) */}
            <circle cx="60" cy="70" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <text x="70" y="65" fontSize="9" fill="#475569" dark="#94a3b8">(0, 12)</text>

            {/* Objective function line at optimum */}
            <line x1="100" y1="400" x2="260" y2="160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4">
              <animate attributeName="y1" values="400;390;400" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="160;150;160" dur="3s" repeatCount="indefinite" />
            </line>
            <text x="270" y="155" fontSize="10" fill="#f59e0b" fontWeight="bold">Z = 20x₁ + 30x₂</text>

            {/* Arrow showing cost direction */}
            <polygon points="480,350 500,335 500,365" fill="#f59e0b">
              <animate attributeName="transform" values="translate(0,0);translate(-6,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="505" y="355" fontSize="11" fill="#f59e0b" fontWeight="bold">Minimize Cost</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The feasible region is above all three nutrient constraints. The optimal solution is at (3.2, 2.4)
            with cost = ₹136.
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: CORNER POINT ANALYSIS ===== */}
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
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₁ (Food A)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₂ (Food B)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Cost (Z = 20x₁ + 30x₂)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">A</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">12</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹360</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/30">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">B</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">3.2</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">2.4</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">₹136</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">★ OPTIMAL</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">C</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">4</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹140</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/50">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Optimal Solution:</strong> Include{" "}
              <span className="font-bold">3.2 units of Food A</span> and{" "}
              <span className="font-bold">2.4 units of Food B</span>.
              Total cost = <span className="font-bold">₹136</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: NUTRIENT UTILIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚙️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Nutrient Utilization at Optimal Solution
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              nutrient: "Carbohydrates",
              provided: "2(3.2) + 4(2.4) = 6.4 + 9.6 = 16",
              required: "16",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              nutrient: "Protein",
              provided: "3(3.2) + 1(2.4) = 9.6 + 2.4 = 12",
              required: "12",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              nutrient: "Fat",
              provided: "1(3.2) + 3(2.4) = 3.2 + 7.2 = 10.4",
              required: "10",
              status: "Slack (0.4)",
              percentage: "104%",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.nutrient}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span className="font-medium">Provided:</span> {item.provided}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Required:</span> {item.required}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className={clsx(
                  "text-sm font-medium",
                  item.status.includes("Binding") ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                )}>
                  {item.status}
                </span>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
                  {item.percentage}
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={clsx(
                    "h-2 rounded-full",
                    item.status.includes("Binding") ? "bg-green-500" : "bg-amber-500"
                  )}
                  style={{ width: item.percentage === "104%" ? "100%" : item.percentage }}
                >
                  <animate attributeName="width" values="0%;{item.percentage === '104%' ? '100%' : item.percentage}" dur="1.5s" fill="freeze" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>💡 Key Observation:</strong> Carbohydrates and Protein are{" "}
            <strong>binding</strong> (exactly met), while Fat has{" "}
            <strong>slack</strong> (0.4 units excess). This means the diet
            provides more fat than required, but this is the minimum cost way
            to meet all requirements.
          </p>
        </div>
      </section>

      {/* ===== SECTION 6: DIET PROBLEM INSIGHTS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🍎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Diet Problem Insights & Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              icon: "🏥",
              title: "Hospital Nutrition",
              desc: "Hospital dietitians use LP to plan cost-effective meals that meet patient nutritional needs.",
            },
            {
              icon: "🍽️",
              title: "Meal Planning",
              desc: "Schools and institutions use LP to plan menus that are nutritious and budget-friendly.",
            },
            {
              icon: "📊",
              title: "Nutritional Research",
              desc: "Researchers use LP to study the relationship between diet cost and nutritional adequacy.",
            },
            {
              icon: "💊",
              title: "Supplement Planning",
              desc: "LP helps determine the optimal combination of supplements to meet nutritional gaps.",
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
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> The diet problem is one of the most
            practical LP applications. It shows how mathematics can help solve
            real-world problems in healthcare and nutrition.
          </p>
        </div>
      </section>

      {/* ===== SECTION 7: TIPS & TRICKS ===== */}
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
              title: "Identify all nutrients",
              desc: "List all nutritional requirements before writing constraints.",
            },
            {
              title: "Check for slack nutrients",
              desc: "Some nutrients may be exceeded—this is normal and expected.",
            },
            {
              title: "Consider food combinations",
              desc: "The optimal diet often combines foods to balance nutrients.",
            },
            {
              title: "Validate with real foods",
              desc: "Check if the optimal solution corresponds to realistic portions.",
            },
            {
              title: "Use ≥ constraints",
              desc: "Nutritional requirements are minimums—use ≥.",
            },
            {
              title: "Check for integer constraints",
              desc: "If foods must be whole units, use Integer Programming.",
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

      {/* ===== SECTION 8: COMMON MISTAKES ===== */}
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
                mistake: "Using ≤ instead of ≥ for nutrients",
                fix: "Nutrients are minimum requirements—use ≥.",
              },
              {
                mistake: "Forgetting a nutrient constraint",
                fix: "List all nutrients before writing equations.",
              },
              {
                mistake: "Shading the wrong side of constraints",
                fix: "For ≥ constraints, shade above the line.",
              },
              {
                mistake: "Ignoring non-negativity",
                fix: "x₁ ≥ 0, x₂ ≥ 0 are mandatory.",
              },
              {
                mistake: "Not checking feasibility",
                fix: "Test the solution against all nutrient constraints.",
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

      {/* ===== SECTION 9: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "List all nutrients and their minimum requirements.",
            "Create a nutrient-food table to organize data.",
            "Use ≥ constraints for all nutritional requirements.",
            "Plot constraints accurately for graphical solution.",
            "Check all corner points of the feasible region.",
            "Validate the solution against all nutrient constraints.",
            "Document the optimal diet and its cost.",
            "Consider practical constraints (e.g., food availability).",
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

      {/* ===== SECTION 10: HINT SECTION ===== */}
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
                Carbohydrates and Protein are binding, but Fat has slack.
                Why might a dietitian prefer a solution with some nutrient slack?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If Food A becomes cheaper
                (₹15 per unit), what happens to the optimal diet? Which nutrients
                would you expect to remain binding?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Abhronila is a hospital
                dietitian in Kolkata planning a meal for patients with specific
                carbohydrate, protein, and fat requirements. How would she use
                LP to design the cheapest meal plan?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 11: MINI CHECKLIST ===== */}
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
              "✅ Formulate a diet problem LP model with multiple nutrient constraints",
              "✅ Identify nutrient requirements as ≥ constraints",
              "✅ Find the optimal diet using graphical method",
              "✅ Analyze nutrient utilization at the optimum",
              "✅ Recognize when nutrients have slack",
              "✅ Apply the 7-step procedure to diet problems",
              "✅ Validate the solution against all nutrient constraints",
              "✅ Understand real-world applications of the diet problem",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">{item.split(" ")[0]}</span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 12: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <FAQTemplate
          title="Diet and Nutrition Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 13: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <PlainTextPrint
          content={noteText}
          title="Diet and Nutrition Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic14_note.txt"
        />
      </div>

      {/* ===== SECTION 14: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1250">
        <Teacher
          note={
            "The diet problem is one of the oldest and most practical LP applications. It was one of the first problems solved using LP and remains relevant in healthcare, nutrition, and food planning. I tell my students: 'If you can understand the diet problem, you can understand most LP applications.' The key insight is that meeting minimum requirements (≥ constraints) often results in some nutrients being in excess—and that's okay. Mahima from Jadavpur once used LP to plan a budget-friendly diet for her family, and she was amazed at how much she could save while still meeting nutritional needs. Remember: the diet problem shows how LP can improve health outcomes while controlling costs—a perfect blend of mathematics and real-world impact."
          }
        />
      </div>
    </div>
  );
};

export default Topic14;