import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic11_files/topic11_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11: Worked Example 5 – Labour and machine-hour constraints
 *
 * @component
 * @returns {JSX.Element} The rendered Topic11 component
 *
 * @purpose Provides a complete, step-by-step worked example focusing on two
 * critical production resources: labour hours and machine hours. This example
 * demonstrates how to handle multiple resource constraints with a demand
 * requirement.
 *
 * @when_used After resource allocation (Topic10), this topic focuses specifically
 * on the two most common manufacturing constraints: labour and machine time.
 */
const Topic11 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 11
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 5
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 5: Labour and Machine-Hour Constraints
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Optimizing production with two critical resources — labour hours and
          machine hours — and minimum demand requirements.
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
              A manufacturing company produces <strong>two products</strong>:
              <strong> Product A</strong> and <strong>Product B</strong>.
              The company has <strong>two key resources</strong> that constrain
              production:
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Resource</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product A</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product B</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Labour (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">4</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">100</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Machine (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">80</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Profit per unit:</strong> Product A ={" "}
                <span className="font-mono text-green-600 dark:text-green-400">₹50</span>,
                Product B = <span className="font-mono text-green-600 dark:text-green-400">₹60</span>
              </li>
              <li>
                <strong>Market demand:</strong> At least{" "}
                <span className="font-mono text-blue-600 dark:text-blue-400">10 units</span> of Product A must be produced.
              </li>
              <li>
                The company wants to <strong>maximize total profit</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal production mix
                of Product A and Product B to maximize profit, subject to labour,
                machine, and demand constraints.
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
                  <li><strong>Goal:</strong> Maximize profit.</li>
                  <li><strong>Products:</strong> A and B (2 products).</li>
                  <li><strong>Resources:</strong> Labour (100 hrs), Machine (80 hrs).</li>
                  <li><strong>Requirement:</strong> At least 10 units of Product A.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 products, 2 resource constraints, 1 demand constraint.
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
                  <p>x₁ = number of units of Product A produced</p>
                  <p>x₂ = number of units of Product B produced</p>
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
                  <p>Maximize Z = 50x₁ + 60x₂</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Profit per unit A = <span className="font-mono">₹50</span></li>
                  <li>Profit per unit B = <span className="font-mono">₹60</span></li>
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
                  <p>Labour: 2x₁ + 4x₂ ≤ 100</p>
                  <p>Machine: 3x₁ + 2x₂ ≤ 80</p>
                  <p>Demand: x₁ ≥ 10</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Labour:</strong> A uses 2 hrs, B uses 4 hrs, total ≤ 100.</li>
                  <li><strong>Machine:</strong> A uses 3 hrs, B uses 2 hrs, total ≤ 80.</li>
                  <li><strong>Demand:</strong> At least 10 units of A.</li>
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 10, x₂ = 0</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Labour: 2(10) + 4(0) = 20 ≤ 100 ✓
                      <br />
                      Machine: 3(10) + 2(0) = 30 ≤ 80 ✓
                      <br />
                      Demand: 10 ≥ 10 ✓
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✅ Feasible solution!</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 20, x₂ = 10</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Labour: 2(20) + 4(10) = 40 + 40 = 80 ≤ 100 ✓
                      <br />
                      Machine: 3(20) + 2(10) = 60 + 20 = 80 ≤ 80 ✓
                      <br />
                      Demand: 20 ≥ 10 ✓
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
                  <p>Maximize Z = 50x₁ + 60x₂</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Labour: 2x₁ + 4x₂ ≤ 100</p>
                  <p className="pl-4">Machine: 3x₁ + 2x₂ ≤ 80</p>
                  <p className="pl-4">Demand: x₁ ≥ 10</p>
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
            aria-label="Graphical solution for labour and machine-hour constraints"
            role="img"
          >
            <rect x="0" y="0" width="600" height="500" fill="none" />

            {/* Axes */}
            <line x1="60" y1="430" x2="560" y2="430" stroke="#94a3b8" strokeWidth="2" />
            <line x1="60" y1="430" x2="60" y2="30" stroke="#94a3b8" strokeWidth="2" />
            <text x="570" y="450" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Product A (x₁)</text>
            <text x="30" y="20" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Product B (x₂)</text>

            {/* Scale marks */}
            <text x="60" y="445" fontSize="10" fill="#94a3b8">0</text>
            <text x="110" y="445" fontSize="10" fill="#94a3b8">10</text>
            <text x="160" y="445" fontSize="10" fill="#94a3b8">20</text>
            <text x="210" y="445" fontSize="10" fill="#94a3b8">30</text>
            <text x="260" y="445" fontSize="10" fill="#94a3b8">40</text>
            <text x="360" y="445" fontSize="10" fill="#94a3b8">50</text>

            <text x="45" y="230" fontSize="10" fill="#94a3b8">10</text>
            <text x="45" y="130" fontSize="10" fill="#94a3b8">20</text>
            <text x="45" y="80" fontSize="10" fill="#94a3b8">25</text>

            {/* Labour constraint: 2x₁ + 4x₂ = 100 => x₂ = 25 - 0.5x₁ */}
            <line x1="60" y1="430" x2="460" y2="230" stroke="#ef4444" strokeWidth="2.5" />
            <text x="465" y="225" fontSize="11" fill="#ef4444" fontWeight="bold">Labour</text>

            {/* Machine constraint: 3x₁ + 2x₂ = 80 => x₂ = 40 - 1.5x₁ */}
            <line x1="60" y1="430" x2="260" y2="130" stroke="#22c55e" strokeWidth="2.5" />
            <text x="265" y="125" fontSize="11" fill="#22c55e" fontWeight="bold">Machine</text>

            {/* Demand constraint: x₁ ≥ 10 */}
            <line x1="160" y1="30" x2="160" y2="430" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="165" y="20" fontSize="11" fill="#a855f7" fontWeight="bold">Demand</text>

            {/* Feasible region */}
            <polygon
              points="160,430 160,230 260,130 310,130"
              fill="#3b82f6"
              fillOpacity="0.12"
              stroke="#3b82f6"
              strokeWidth="2.5"
            >
              <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="4s" repeatCount="indefinite" />
            </polygon>

            <text x="200" y="350" fontSize="14" fill="#3b82f6" fontWeight="bold">Feasible</text>
            <text x="200" y="370" fontSize="14" fill="#3b82f6" fontWeight="bold">Region</text>

            {/* Corner points */}
            {/* (10,0) */}
            <circle cx="160" cy="430" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="170" y="420" fontSize="9" fill="#475569" dark="#94a3b8">(10,0)</text>

            {/* (10,20) - Optimal! */}
            <circle cx="160" cy="230" r="9" fill="#22c55e" stroke="white" strokeWidth="3">
              <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="150" y="215" fontSize="11" fill="#22c55e" fontWeight="bold">★ (10,20)</text>
            <text x="150" y="260" fontSize="9" fill="#22c55e">Optimal</text>

            {/* (20,10) */}
            <circle cx="260" cy="230" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <text x="270" y="220" fontSize="9" fill="#475569" dark="#94a3b8">(20,10)</text>

            {/* (26.67,0) */}
            <circle cx="310" cy="430" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <text x="320" y="420" fontSize="9" fill="#475569" dark="#94a3b8">(26.67,0)</text>

            {/* Objective function line at optimum */}
            <line x1="140" y1="380" x2="280" y2="140" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4">
              <animate attributeName="y1" values="380;370;380" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="140;130;140" dur="3s" repeatCount="indefinite" />
            </line>
            <text x="290" y="135" fontSize="10" fill="#f59e0b" fontWeight="bold">Z = 50x₁ + 60x₂</text>

            {/* Arrow showing profit direction */}
            <polygon points="500,350 520,335 520,365" fill="#f59e0b">
              <animate attributeName="transform" values="translate(0,0);translate(-6,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="525" y="355" fontSize="11" fill="#f59e0b" fontWeight="bold">Max Profit</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The feasible region is bounded by Labour, Machine, and Demand constraints.
            The optimal solution is at (10, 20) with profit = ₹1,700.
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
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₁ (Product A)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₂ (Product B)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Profit (Z = 50x₁ + 60x₂)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">A</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹500</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/30">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">B</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">10</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">20</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">₹1,700</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">★ OPTIMAL</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">C</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">20</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹1,600</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">D</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">26.67</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹1,333</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/50">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Optimal Solution:</strong> Produce{" "}
              <span className="font-bold">10 units of Product A</span> and{" "}
              <span className="font-bold">20 units of Product B</span>.
              Total profit = <span className="font-bold">₹1,700</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: RESOURCE UTILIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚙️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Resource Utilization at Optimal Solution
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              resource: "Labour",
              used: "2(10) + 4(20) = 20 + 80 = 100 hrs",
              available: "100 hrs",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Machine",
              used: "3(10) + 2(20) = 30 + 40 = 70 hrs",
              available: "80 hrs",
              status: "Slack (10 hrs)",
              percentage: "87.5%",
            },
            {
              resource: "Demand (A)",
              used: "10 units",
              available: "≥ 10",
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
                <span className="font-medium">Used:</span> {item.used}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Available:</span> {item.available}
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
                  style={{ width: item.percentage }}
                >
                  <animate attributeName="width" values="0%;{item.percentage}" dur="1.5s" fill="freeze" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>💡 Key Observation:</strong> Labour is{" "}
            <strong>binding</strong> (fully used), Machine has{" "}
            <strong>slack</strong> (10 hours unused), and the Demand constraint
            is <strong>binding</strong> (producing exactly the minimum required).
            This means additional labour would increase profits, but more machine
            time would not.
          </p>
        </div>
      </section>

      {/* ===== SECTION 6: UNDERSTANDING LABOUR VS MACHINE-HOUR CONSTRAINTS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Understanding Labour vs Machine-Hour Constraints
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              type: "Labour Constraints",
              description: "Represent limits on available workforce hours.",
              examples: "Number of workers × hours per shift, overtime limits, skill availability.",
              impact: "Affects production capacity based on human resources.",
            },
            {
              type: "Machine-Hour Constraints",
              description: "Represent limits on available equipment operating time.",
              examples: "Machine capacity, maintenance schedules, shift operations.",
              impact: "Affects production capacity based on equipment availability.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.type}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{item.description}</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
                <span className="font-medium">Examples:</span> {item.examples}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                <span className="font-medium">Impact:</span> {item.impact}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> Labour and machine-hour constraints
            often compete. Increasing one may not help if the other is the
            bottleneck. Identifying which is binding is crucial for resource
            planning.
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
              title: "Identify the bottleneck",
              desc: "The binding resource (Labour) is the bottleneck. Focus on improving it first.",
            },
            {
              title: "Check for slack resources",
              desc: "Machine has slack—don't invest in more machine time until Labour is addressed.",
            },
            {
              title: "Consider minimum requirements",
              desc: "Demand constraints force production of less profitable products.",
            },
            {
              title: "Use shadow prices for decisions",
              desc: "Shadow prices tell you the value of additional resources.",
            },
            {
              title: "Calculate resource efficiency",
              desc: "Profit per resource unit helps identify the most efficient product.",
            },
            {
              title: "Validate with extreme points",
              desc: "Test producing only one product to check feasibility.",
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
                mistake: "Confusing labour and machine coefficients",
                fix: "A uses 2 labour/3 machine; B uses 4 labour/2 machine—don't swap these!",
              },
              {
                mistake: "Forgetting the demand constraint",
                fix: "x₁ ≥ 10 is a separate constraint, not part of non-negativity.",
              },
              {
                mistake: "Assuming all resources are binding",
                fix: "Machine has slack—it's normal for some resources to have excess capacity.",
              },
              {
                mistake: "Not checking the demand constraint at the optimum",
                fix: "The optimal x₁ = 10 exactly meets the minimum demand.",
              },
              {
                mistake: "Ignoring non-negativity",
                fix: "x₁ ≥ 0, x₂ ≥ 0 are mandatory.",
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
            "Create a resource-product table to avoid coefficient confusion.",
            "Clearly distinguish between labour and machine-hour constraints.",
            "Include demand constraints separately from resource constraints.",
            "Use the graphical method to visualize the feasible region.",
            "Check resource utilization at the optimum.",
            "Identify which resources are binding and which have slack.",
            "Validate the solution by checking all constraints.",
            "Document the optimal solution and its profit value.",
            "Analyze the economic implications of binding resources.",
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
                <strong>Observe carefully:</strong> Labour is binding at the
                optimum, but Machine has slack. If the company could add 10
                more labour hours, how would the optimal solution change?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If the demand for Product A
                increases to 15 units, what happens to the optimal solution?
                Which resource becomes more valuable?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu runs a
                workshop in Barrackpore with 5 workers (40 hours each) and 3
                machines (30 hours each). He produces two products. How would
                he identify his binding constraints?
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
              "✅ Formulate an LP model with labour and machine-hour constraints",
              "✅ Include demand constraints alongside resource constraints",
              "✅ Identify binding vs non-binding resources",
              "✅ Use the graphical method for 2-variable problems",
              "✅ Analyze resource utilization at the optimum",
              "✅ Recognize the difference between labour and machine constraints",
              "✅ Understand the economic implications of binding resources",
              "✅ Apply the 7-step procedure to production planning problems",
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
          title="Labour and Machine-Hour Constraints FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 13: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <PlainTextPrint
          content={noteText}
          title="Labour and Machine-Hour Constraints - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic11_note.txt"
        />
      </div>

      {/* ===== SECTION 14: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1250">
        <Teacher
          note={
            "Labour and machine-hour constraints are the most common resources in manufacturing. This example shows a crucial insight: just because a resource is available doesn't mean it's the bottleneck. Here, Labour is binding while Machine has slack. In my experience, students often assume all resources should be fully used, but in reality, slack is common and normal. The key is to identify which resource limits production and focus improvement efforts there. Mahima from Jadavpur once told me this example helped her understand why her factory had excess machine capacity—they were labour-constrained. Remember: the binding resource tells you where to invest for the greatest return. The shadow price of Labour is positive, while Machine's shadow price is zero—a powerful insight for capacity planning."
          }
        />
      </div>
    </div>
  );
};

export default Topic11;