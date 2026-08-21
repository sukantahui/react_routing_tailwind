import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic28_files/topic28_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic28_files/topic28_note.txt?raw";

/**
 * Topic28: Worked Example 22 – Minimization problem from a social context
 *
 * @component
 * @returns {JSX.Element} The rendered Topic28 component
 *
 * @purpose Provides a complete, step-by-step worked example of a social
 * context minimization problem, demonstrating how LP can be used to minimize
 * costs while meeting social service requirements like food aid programs.
 *
 * @when_used After maximization from a social context (Topic27), this topic
 * introduces the minimization counterpart, showing how to minimize costs
 * while meeting social service requirements.
 */
const Topic28 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 28
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 22
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 22: Minimization Problem from a Social Context
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Minimizing the cost of providing social services while meeting
          minimum requirements — the dual of social impact maximization.
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
              A government agency runs <strong>two meal programs</strong> to
              provide food to communities:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Standard Meal</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Cost: <span className="font-mono text-red-600 dark:text-red-400">₹50</span> per person</li>
                  <li>Calories: <span className="font-mono text-blue-600 dark:text-blue-400">600</span> calories</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Premium Meal</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Cost: <span className="font-mono text-red-600 dark:text-red-400">₹80</span> per person</li>
                  <li>Calories: <span className="font-mono text-blue-600 dark:text-blue-400">1000</span> calories</li>
                </ul>
              </div>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Requirements:</strong>
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Serve at least <span className="font-mono text-blue-600 dark:text-blue-400">500 people</span> total</li>
                  <li>Provide at least <span className="font-mono text-blue-600 dark:text-blue-400">400,000</span> total calories</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>At least <span className="font-mono text-blue-600 dark:text-blue-400">200</span> people must get Premium Meals</li>
                  <li>At most <span className="font-mono text-blue-600 dark:text-blue-400">400</span> people can get Standard Meals</li>
                </ul>
              </div>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                The agency wants to <strong>minimize total cost</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal number of
                Standard and Premium Meals to minimize total cost while meeting
                all requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: COMPARISON WITH TOPIC 27 ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔄</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Comparison: Maximization vs Minimization in Social Context
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-900/30">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Topic 27: Maximization</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Objective:</strong> Maximize social impact</li>
              <li><strong>Example:</strong> Max patients + students</li>
              <li><strong>Constraints:</strong> Budget, land, min/max limits</li>
              <li><strong>Goal:</strong> Best use of resources for social good</li>
            </ul>
          </div>
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Topic 28: Minimization</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Objective:</strong> Minimize cost</li>
              <li><strong>Example:</strong> Min cost for meals</li>
              <li><strong>Constraints:</strong> Requirements (≥), capacity (≤)</li>
              <li><strong>Goal:</strong> Cheapest way to meet requirements</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> Social context problems can be
            formulated as either <strong>maximization</strong> (maximize impact)
            or <strong>minimization</strong> (minimize cost). The choice depends
            on whether you have a fixed budget or fixed requirements.
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
                  <li><strong>Meal types:</strong> Standard, Premium.</li>
                  <li><strong>Requirements:</strong> Total ≥ 500, Calories ≥ 400,000, Premium ≥ 200, Standard ≤ 400.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 meal types, 4 constraints (2 minimums, 1 maximum, 1 calorie requirement).
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
                  <p>x₁ = number of people receiving Standard Meals</p>
                  <p>x₂ = number of people receiving Premium Meals</p>
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
                  <p>Minimize Z = 50x₁ + 80x₂</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Standard cost = <span className="font-mono">₹50</span></li>
                  <li>Premium cost = <span className="font-mono">₹80</span></li>
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
                  <p>Total People: x₁ + x₂ ≥ 500</p>
                  <p>Calories: 600x₁ + 1000x₂ ≥ 400,000</p>
                  <p>Premium: x₂ ≥ 200</p>
                  <p>Standard Max: x₁ ≤ 400</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Total People:</strong> Serve at least 500 people.</li>
                  <li><strong>Calories:</strong> Provide at least 400,000 calories.</li>
                  <li><strong>Premium:</strong> At least 200 Premium Meals.</li>
                  <li><strong>Standard Max:</strong> At most 400 Standard Meals.</li>
                </ul>
                <div className="mt-2 bg-yellow-50/60 dark:bg-yellow-950/30 p-2 rounded border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    💡 This is a <strong>minimization</strong> problem with
                    <strong> minimum requirements</strong> (≥) and one
                    <strong> maximum limit</strong> (≤).
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
                  <div className="bg-red-50 dark:bg-red-950/30 p-2 rounded border border-red-200 dark:border-red-900/50">
                    <p className="text-sm font-mono text-red-800 dark:text-red-300">Test: x₁ = 300, x₂ = 200</p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Total: 500 ≥ 500 ✓
                      <br />
                      Calories: 600(300)+1000(200) = 180,000+200,000 = 380,000 ≥ 400,000 ✗
                      <br />
                      Premium: 200 ≥ 200 ✓, Standard: 300 ≤ 400 ✓
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">❌ Insufficient calories!</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 300, x₂ = 220</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Total: 520 ≥ 500 ✓
                      <br />
                      Calories: 600(300)+1000(220) = 180,000+220,000 = 400,000 ≥ 400,000 ✓
                      <br />
                      Premium: 220 ≥ 200 ✓, Standard: 300 ≤ 400 ✓
                      <br />
                      Cost: 50(300)+80(220) = 15,000+17,600 = ₹32,600
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
                  <p>Minimize Z = 50x₁ + 80x₂</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Total People: x₁ + x₂ ≥ 500</p>
                  <p className="pl-4">Calories: 600x₁ + 1000x₂ ≥ 400,000</p>
                  <p className="pl-4">Premium: x₂ ≥ 200</p>
                  <p className="pl-4">Standard Max: x₁ ≤ 400</p>
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
            viewBox="0 0 650 450"
            className="w-full h-auto"
            aria-label="Graphical solution for social minimization problem"
            role="img"
          >
            <rect x="0" y="0" width="650" height="450" fill="none" />

            {/* Axes */}
            <line x1="80" y1="400" x2="600" y2="400" stroke="#94a3b8" strokeWidth="2" />
            <line x1="80" y1="400" x2="80" y2="40" stroke="#94a3b8" strokeWidth="2" />
            <text x="610" y="410" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Standard (x₁)</text>
            <text x="50" y="30" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Premium (x₂)</text>

            {/* Scale marks */}
            <text x="80" y="415" fontSize="10" fill="#94a3b8">0</text>
            <text x="130" y="415" fontSize="10" fill="#94a3b8">100</text>
            <text x="180" y="415" fontSize="10" fill="#94a3b8">200</text>
            <text x="230" y="415" fontSize="10" fill="#94a3b8">300</text>
            <text x="280" y="415" fontSize="10" fill="#94a3b8">400</text>
            <text x="330" y="415" fontSize="10" fill="#94a3b8">500</text>

            <text x="65" y="340" fontSize="10" fill="#94a3b8">50</text>
            <text x="65" y="280" fontSize="10" fill="#94a3b8">100</text>
            <text x="65" y="220" fontSize="10" fill="#94a3b8">150</text>
            <text x="65" y="160" fontSize="10" fill="#94a3b8">200</text>
            <text x="65" y="100" fontSize="10" fill="#94a3b8">250</text>

            {/* Total People: x₁ + x₂ = 500 => x₂ = 500 - x₁ */}
            <line x1="80" y1="400" x2="330" y2="180" stroke="#ef4444" strokeWidth="2.5" />
            <text x="335" y="175" fontSize="11" fill="#ef4444" fontWeight="bold">Total People</text>

            {/* Calories: 600x₁ + 1000x₂ = 400,000 => 3x₁ + 5x₂ = 2,000 => x₂ = 400 - 0.6x₁ */}
            <line x1="80" y1="400" x2="330" y2="200" stroke="#22c55e" strokeWidth="2.5" />
            <text x="335" y="195" fontSize="11" fill="#22c55e" fontWeight="bold">Calories</text>

            {/* Premium: x₂ = 200 */}
            <line x1="80" y1="200" x2="600" y2="200" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="610" y="195" fontSize="11" fill="#a855f7" fontWeight="bold">Min Premium</text>

            {/* Standard Max: x₁ = 400 */}
            <line x1="280" y1="40" x2="280" y2="400" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="285" y="30" fontSize="11" fill="#f59e0b" fontWeight="bold">Max Standard</text>

            {/* Feasible region */}
            <polygon
              points="230,200 180,200 180,400 280,400 280,200"
              fill="#3b82f6"
              fillOpacity="0.12"
              stroke="#3b82f6"
              strokeWidth="2.5"
            >
              <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="4s" repeatCount="indefinite" />
            </polygon>

            <text x="230" y="320" fontSize="14" fill="#3b82f6" fontWeight="bold">Feasible</text>
            <text x="230" y="340" fontSize="14" fill="#3b82f6" fontWeight="bold">Region</text>

            {/* Corner points */}
            {/* (250,250) - Optimal! */}
            <circle cx="230" cy="250" r="9" fill="#22c55e" stroke="white" strokeWidth="3">
              <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="220" y="235" fontSize="11" fill="#22c55e" fontWeight="bold">★ (250,250)</text>
            <text x="220" y="280" fontSize="9" fill="#22c55e">Optimal</text>

            {/* (333.33,200) */}
            <circle cx="260" cy="200" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <text x="270" y="195" fontSize="9" fill="#475569" dark="#94a3b8">(333.33,200)</text>

            {/* (400,200) */}
            <circle cx="280" cy="200" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <text x="290" y="195" fontSize="9" fill="#475569" dark="#94a3b8">(400,200)</text>

            {/* Objective function line at optimum */}
            <line x1="180" y1="360" x2="280" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4">
              <animate attributeName="y1" values="360;350;360" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="200;190;200" dur="3s" repeatCount="indefinite" />
            </line>
            <text x="290" y="195" fontSize="10" fill="#f59e0b" fontWeight="bold">Z = 50x₁ + 80x₂</text>

            {/* Arrow showing cost direction */}
            <polygon points="520,320 540,305 540,335" fill="#f59e0b">
              <animate attributeName="transform" values="translate(0,0);translate(-6,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="545" y="325" fontSize="11" fill="#f59e0b" fontWeight="bold">Min Cost</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The feasible region shows all possible meal combinations. The optimal
            solution is at (250, 250) with cost = ₹32,500.
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
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₁ (Standard)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₂ (Premium)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Cost (Z = 50x₁ + 80x₂)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr className="bg-green-50 dark:bg-green-950/30">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">C</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">250</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">250</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">₹32,500</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">★ OPTIMAL</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">B</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">333.33</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">200</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹32,666.67</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">D</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">400</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">200</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹36,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/50">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Optimal Solution:</strong> Provide{" "}
              <span className="font-bold">250 Standard Meals</span> and{" "}
              <span className="font-bold">250 Premium Meals</span>.
              Total cost = <span className="font-bold">₹32,500</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: CONSTRAINT ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔗</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Constraint Analysis
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              constraint: "Total People",
              status: "Binding ✓",
              detail: "250 + 250 = 500 (exactly met)",
            },
            {
              constraint: "Calories",
              status: "Binding ✓",
              detail: "600(250)+1000(250) = 400,000 (exactly met)",
            },
            {
              constraint: "Premium Minimum",
              status: "Not Binding (slack: 50)",
              detail: "250 ≥ 200 (excess of 50)",
            },
            {
              constraint: "Standard Maximum",
              status: "Not Binding (slack: 150)",
              detail: "250 ≤ 400 (slack of 150)",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.constraint}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.detail}</p>
              <div className="mt-2 flex items-center">
                <span className={clsx(
                  "text-sm font-medium",
                  item.status.includes("Binding") ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                )}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>💡 Key Observation:</strong> The two minimum requirements
            (Total People and Calories) are <strong>binding</strong>, while the
            Premium minimum and Standard maximum have <strong>slack</strong>.
            This means the agency is serving exactly 500 people with exactly
            400,000 calories at the minimum cost.
          </p>
        </div>
      </section>

      {/* ===== SECTION 7: EFFICIENCY ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Efficiency Analysis
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Cost efficiency per calorie helps identify which meal type is more efficient:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white">Standard Meal</h4>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Cost: ₹50</li>
                <li>Calories: 600</li>
                <li>Cost per calorie: <span className="font-mono text-blue-600 dark:text-blue-400">₹0.083</span></li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white">Premium Meal</h4>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Cost: ₹80</li>
                <li>Calories: 1000</li>
                <li>Cost per calorie: <span className="font-mono text-blue-600 dark:text-blue-400">₹0.08</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-3 bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Key Insight:</strong> Premium Meals are more cost-efficient
              per calorie (₹0.08) than Standard Meals (₹0.083). However, the
              minimum requirement of 200 Premium Meals forces some use of Premium
              Meals. The optimal solution uses 250 of each, balancing cost with
              requirements.
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
              desc: "Minimization problems aim to reduce cost while meeting requirements.",
            },
            {
              title: "Use efficiency metrics",
              desc: "Cost per unit of output (calories) helps identify the most efficient option.",
            },
            {
              title: "Check all constraints",
              desc: "Minimums (≥) and maximums (≤) both matter.",
            },
            {
              title: "Find the feasible region",
              desc: "The feasible region is where all constraints are satisfied.",
            },
            {
              title: "Evaluate all corner points",
              desc: "The optimal solution is at one of the corner points.",
            },
            {
              title: "Validate with a feasible solution",
              desc: "Always test a solution to ensure all constraints are met.",
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
                mistake: "Using ≥ instead of ≤ for maximum limits",
                fix: "Standard Max is ≤ 400, not ≥ 400.",
              },
              {
                mistake: "Forgetting that the objective is minimization",
                fix: "Minimize cost, don't maximize it.",
              },
              {
                mistake: "Not checking all constraints",
                fix: "All four constraints must be satisfied.",
              },
              {
                mistake: "Assuming the cheapest option is always best",
                fix: "Minimum requirements may force using more expensive options.",
              },
              {
                mistake: "Ignoring the feasible region",
                fix: "The feasible region is the intersection of all constraints.",
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
            "Clearly identify the objective as minimization.",
            "List all minimum requirements (≥) and maximum limits (≤).",
            "Calculate efficiency metrics (cost per unit).",
            "Use the graphical method to visualize constraints.",
            "Evaluate objective at all feasible corner points.",
            "Identify which constraints are binding.",
            "Validate the solution with all constraints.",
            "Document assumptions about costs and requirements.",
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
                <strong>Observe carefully:</strong> Premium Meals are more
                cost-efficient per calorie, but why is the optimal solution
                using Standard Meals at all?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If the Standard Meal cost
                increases to ₹60, what happens to the optimal solution? Would
                more Premium Meals be used?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Abhronila is a social
                worker designing a food aid program with two meal options. She
                must meet minimum nutritional requirements and serve a minimum
                number of people. How would she use LP to minimize costs?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 12: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
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
              "✅ Formulate a social context minimization LP model",
              "✅ Include minimum requirements (≥) and maximum limits (≤)",
              "✅ Calculate cost efficiency (cost per unit of output)",
              "✅ Identify binding vs non-binding constraints",
              "✅ Determine the optimal solution that minimizes cost",
              "✅ Analyze constraint slack and utilization",
              "✅ Apply the 7-step procedure to social minimization problems",
              "✅ Distinguish between minimization and maximization in social contexts",
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
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <FAQTemplate
          title="Social Minimization Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 14: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <PlainTextPrint
          content={noteText}
          title="Social Minimization Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic28_note.txt"
        />
      </div>

      {/* ===== SECTION 15: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <Teacher
          note={
            "This example completes the pair of social context problems—maximization and minimization. I tell my students: 'The same social problem can be viewed from two perspectives: maximizing impact with a fixed budget, or minimizing cost with fixed requirements.' The choice depends on the decision-maker's constraints. Here, the agency must meet fixed requirements (500 people, 400,000 calories), so they minimize cost. The key insight is that minimum requirements force a mix of options—even when one option is more efficient per calorie. Susmita from Barrackpore once told me she used this framework to optimize her community kitchen's menu, reducing costs by 15% while maintaining nutritional standards. Remember: in social minimization, the objective is to do the most good with the least money. The binding constraints tell you exactly what requirements are driving the cost."
          }
        />
      </div>
    </div>
  );
};

export default Topic28;