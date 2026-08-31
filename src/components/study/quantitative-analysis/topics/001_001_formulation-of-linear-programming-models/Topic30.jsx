import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic30_files/topic30_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic30_files/topic30_note.txt?raw";

/**
 * Topic30: Worked Example 24 – Public resource allocation problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic30 component
 *
 * @purpose Provides a complete, step-by-step worked example of a public
 * resource allocation problem, demonstrating how LP can be used to allocate
 * government resources across public services to maximize social impact.
 *
 * @when_used As the final worked example in the series, this topic brings
 * together all the concepts learned: resource constraints, minimums and
 * maximums, efficiency analysis, and multi-dimensional optimization in a
 * public sector context.
 */
const Topic30 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 30
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 24
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 24: Public Resource Allocation Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Allocating government resources across public services to maximize
          social impact — the culmination of our LP worked examples journey.
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
              A city government needs to allocate resources across{" "}
              <strong>three public services</strong>:
              Public Health, Public Safety, and Education.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Service</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Cost per Program</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Impact per Program</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Staff per Program</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Public Health</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹1,00,000</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">200</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Public Safety</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹1,50,000</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">300</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Education</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹80,000</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">250</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Available resources:</strong>
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Budget: <span className="font-mono text-blue-600 dark:text-blue-400">₹10,00,000</span>
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Staff: <span className="font-mono text-blue-600 dark:text-blue-400">20 people</span>
                </p>
              </div>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Minimum and maximum requirements:</strong>
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">Health: Min 2, Max 5</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">Safety: Min 2, Max 4</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">Education: Min 3, Max 6</p>
              </div>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                The government wants to <strong>maximize total public impact</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal number of
                programs in each service area to maximize public impact, subject
                to budget, staff, and policy constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: REAL-WORLD CONTEXT ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏛️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "🏛️ City Budgeting",
              description: "Allocating funds across departments like health, police, and schools.",
            },
            {
              domain: "📊 State Planning",
              description: "Distributing resources across districts and service areas.",
            },
            {
              domain: "🤝 Non-Profit Management",
              description: "Optimizing program portfolios to maximize social impact.",
            },
            {
              domain: "🌍 International Development",
              description: "Allocating aid across health, education, and infrastructure projects.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.domain}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> Public resource allocation is one of
            the most important applications of LP. Governments and non-profits
            use these methods to make informed decisions about how to serve
            their communities with limited resources.
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
                  <li><strong>Goal:</strong> Maximize public impact.</li>
                  <li><strong>Services:</strong> Health, Safety, Education (3 services).</li>
                  <li><strong>Resources:</strong> Budget (₹10,00,000), Staff (20 people).</li>
                  <li><strong>Minimums:</strong> Health ≥ 2, Safety ≥ 2, Education ≥ 3.</li>
                  <li><strong>Maximums:</strong> Health ≤ 5, Safety ≤ 4, Education ≤ 6.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 3 services, 2 resource constraints, 3 minimums, 3 maximums.
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
                  <p>x₁ = number of public health programs</p>
                  <p>x₂ = number of public safety programs</p>
                  <p>x₃ = number of education programs</p>
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
                  <p>Maximize Z = 200x₁ + 300x₂ + 250x₃</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Health impact = <span className="font-mono">200</span></li>
                  <li>Safety impact = <span className="font-mono">300</span></li>
                  <li>Education impact = <span className="font-mono">250</span></li>
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
                  <p>Budget: 100,000x₁ + 150,000x₂ + 80,000x₃ ≤ 1,000,000</p>
                  <p>Staff: 2x₁ + 3x₂ + 2x₃ ≤ 20</p>
                  <p>Min Health: x₁ ≥ 2</p>
                  <p>Max Health: x₁ ≤ 5</p>
                  <p>Min Safety: x₂ ≥ 2</p>
                  <p>Max Safety: x₂ ≤ 4</p>
                  <p>Min Education: x₃ ≥ 3</p>
                  <p>Max Education: x₃ ≤ 6</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Budget:</strong> Total cost ≤ ₹10,00,000.</li>
                  <li><strong>Staff:</strong> Total staff ≤ 20.</li>
                  <li><strong>Minimums:</strong> Policy requirements.</li>
                  <li><strong>Maximums:</strong> Capacity limits.</li>
                </ul>
                <div className="mt-2 bg-yellow-50/60 dark:bg-yellow-950/30 p-2 rounded border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    💡 This is the most complex problem in the series:{" "}
                    <strong>3 variables, 8 constraints!</strong>
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
                  <p>x₁ ≥ 0, x₂ ≥ 0, x₃ ≥ 0</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  (Already covered by minimum requirements.)
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 2, x₂ = 2, x₃ = 3</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Budget: 200,000+300,000+240,000 = 740,000 ≤ 1,000,000 ✓
                      <br />
                      Staff: 4+6+6 = 16 ≤ 20 ✓
                      <br />
                      Minimums: Health 2≥2, Safety 2≥2, Education 3≥3 ✓
                      <br />
                      Maximums: Health 2≤5, Safety 2≤4, Education 3≤6 ✓
                      <br />
                      Impact: 200(2)+300(2)+250(3) = 400+600+750 = 1,750
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
                  <p>Maximize Z = 200x₁ + 300x₂ + 250x₃</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Budget: 100,000x₁ + 150,000x₂ + 80,000x₃ ≤ 1,000,000</p>
                  <p className="pl-4">Staff: 2x₁ + 3x₂ + 2x₃ ≤ 20</p>
                  <p className="pl-4">Min Health: x₁ ≥ 2</p>
                  <p className="pl-4">Max Health: x₁ ≤ 5</p>
                  <p className="pl-4">Min Safety: x₂ ≥ 2</p>
                  <p className="pl-4">Max Safety: x₂ ≤ 4</p>
                  <p className="pl-4">Min Education: x₃ ≥ 3</p>
                  <p className="pl-4">Max Education: x₃ ≤ 6</p>
                  <p className="pl-4">x₁ ≥ 0, x₂ ≥ 0, x₃ ≥ 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: SOLUTION APPROACH ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🧮</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Solution Approach & Efficiency Analysis
          </h2>
        </div>

        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <h3 className="font-semibold text-gray-900 dark:text-white">Efficiency Analysis</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
            Let's calculate the impact per unit of resource to identify the most efficient services:
          </p>
          <div className="overflow-x-auto mt-3">
            <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Metric</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Health</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Safety</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Education</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Best</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Impact per ₹10,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">20</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">20</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">31.25</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Education</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Impact per Staff</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">100</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">100</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">125</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Education</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Key Insight:</strong> Education programs are the most
              efficient in <strong>both</strong> budget and staff! This explains
              why the optimal solution uses the maximum allowed Education programs (5).
            </p>
          </div>
        </div>

        <div className="mt-4 bg-green-50/40 dark:bg-green-950/20 rounded-xl p-5 border border-green-200 dark:border-green-900/30">
          <h3 className="font-semibold text-gray-900 dark:text-white">Optimal Solution</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            {[
              {
                service: "Health",
                value: "2 programs",
                impact: "200 × 2 = 400",
              },
              {
                service: "Safety",
                value: "2 programs",
                impact: "300 × 2 = 600",
              },
              {
                service: "Education",
                value: "5 programs",
                impact: "250 × 5 = 1,250",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
              >
                <p className="font-semibold text-gray-900 dark:text-white">{item.service}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Programs: {item.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Impact: {item.impact}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/50">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Total Impact:</strong>{" "}
              <span className="font-bold">2,250</span> (400 + 600 + 1,250)
            </p>
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Resources:</strong> Budget ={" "}
              <span className="font-bold">₹9,00,000</span> (slack: ₹1,00,000),{" "}
              Staff = <span className="font-bold">20 people</span> (fully used)
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: RESOURCE UTILIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚙️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Resource Utilization Analysis
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              resource: "Budget",
              used: "100,000(2)+150,000(2)+80,000(5) = 200,000+300,000+400,000 = 900,000",
              available: "1,000,000",
              status: "Slack (₹1,00,000)",
              percentage: "90%",
            },
            {
              resource: "Staff",
              used: "2(2)+3(2)+2(5) = 4+6+10 = 20 people",
              available: "20 people",
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
            <strong>💡 Key Observation:</strong> Staff is{" "}
            <strong>binding</strong> (fully used), while Budget has{" "}
            <strong>slack</strong> (₹1,00,000 unused). This means the city
            government has more budget than staff capacity to implement programs.
            Additional staff would allow more programs and higher impact.
          </p>
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
              constraint: "Budget",
              status: "Not Binding (slack: ₹1,00,000)",
              detail: "900,000 ≤ 1,000,000",
            },
            {
              constraint: "Staff",
              status: "Binding ✓",
              detail: "20 = 20 (fully used)",
            },
            {
              constraint: "Min Health",
              status: "Not Binding (excess: 0)",
              detail: "2 = 2 (exactly met)",
            },
            {
              constraint: "Max Health",
              status: "Not Binding (slack: 3)",
              detail: "2 ≤ 5 (slack of 3)",
            },
            {
              constraint: "Min Safety",
              status: "Not Binding (excess: 0)",
              detail: "2 = 2 (exactly met)",
            },
            {
              constraint: "Max Safety",
              status: "Not Binding (slack: 2)",
              detail: "2 ≤ 4 (slack of 2)",
            },
            {
              constraint: "Min Education",
              status: "Not Binding (excess: 2)",
              detail: "5 ≥ 3 (excess of 2)",
            },
            {
              constraint: "Max Education",
              status: "Binding ✓",
              detail: "5 = 5 (at maximum)",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{item.constraint}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{item.detail}</p>
              <div className="mt-1 flex items-center">
                <span className={clsx(
                  "text-xs font-medium",
                  item.status.includes("Binding") ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                )}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> Out of 8 constraints, only{" "}
            <strong>2 are binding</strong>: Staff and Max Education. This tells
            us the city should focus on increasing staff capacity if they want
            to expand services beyond the current optimal mix.
          </p>
        </div>
      </section>

      {/* ===== SECTION 7: SUMMARY OF JOURNEY ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎯</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Summary: The LP Journey from Topic 0 to 30
          </h2>
        </div>
        <div className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-5 border border-indigo-200 dark:border-indigo-900/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                phase: "Foundations",
                topics: "Topics 0-6",
                description: "Introduction, meaning, variables, objective, constraints, non-negativity, and formulation procedure.",
              },
              {
                phase: "Basic Problems",
                topics: "Topics 7-12",
                description: "Simple production, product-mix, profit maximization, resource allocation, labour/machine constraints, raw-material constraints.",
              },
              {
                phase: "Advanced Applications",
                topics: "Topics 13-20",
                description: "Cost minimization, diet problems, advertising, investment, transportation, workforce, land allocation, agricultural production.",
              },
              {
                phase: "Complex Problems",
                topics: "Topics 21-26",
                description: "Blending, capacity planning, multiple resources, minimum requirements, maximum limits, and both combined.",
              },
              {
                phase: "Social & Public Sector",
                topics: "Topics 27-30",
                description: "Social maximization, social minimization, legal services, and public resource allocation.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.phase}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.topics}</p>
                <p className="text-xs text-gray-700 dark:text-gray-300 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>🎓 Congratulations!</strong> You have completed all 30 topics
              in Linear Programming. From basic concepts to complex real-world
              applications, you now have the skills to formulate and solve LP
              problems across business, agriculture, healthcare, finance, and
              public policy.
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
              title: "Calculate efficiency metrics",
              desc: "Impact per rupee or per staff helps identify the most effective programs.",
            },
            {
              title: "Identify the binding constraints",
              desc: "These are the bottlenecks that limit your ability to achieve more.",
            },
            {
              title: "Consider both minimums and maximums",
              desc: "Policy requirements and capacity limits both matter.",
            },
            {
              title: "Use the 7-step procedure",
              desc: "It works for any LP problem, regardless of complexity.",
            },
            {
              title: "Validate with feasible solutions",
              desc: "Always test your model with a feasible point.",
            },
            {
              title: "Document assumptions",
              desc: "Clearly state the basis for impact metrics and costs.",
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
                mistake: "Forgetting minimum program requirements",
                fix: "Policy minimums must be included as constraints.",
              },
              {
                mistake: "Ignoring maximum program limits",
                fix: "Capacity limits constrain what can be implemented.",
              },
              {
                mistake: "Not calculating efficiency metrics",
                fix: "Impact per resource unit helps identify the best services.",
              },
              {
                mistake: "Assuming all resources should be binding",
                fix: "In this case, only Staff is binding; Budget has slack.",
              },
              {
                mistake: "Not validating with all constraints",
                fix: "Check all 8 constraints at the optimal solution.",
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
            "Identify all services, costs, and impacts.",
            "List all resource constraints (budget, staff, etc.).",
            "Include policy minimums and maximums.",
            "Calculate efficiency metrics (impact per unit of resource).",
            "Use the 7-step procedure consistently.",
            "Identify binding vs non-binding constraints.",
            "Validate the solution with all constraints.",
            "Document assumptions about costs and impacts.",
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
                <strong>Observe carefully:</strong> Education programs are most
                efficient in both budget and staff. How does this explain why
                the maximum allowed Education programs are implemented?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If the maximum Education
                programs increases to 7, what happens to the optimal solution?
                Which constraints become binding?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> A state government has
                ₹50 crore to allocate across five departments with different
                costs and impacts. How would they use LP to maximize social
                benefit?
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
              "✅ Formulate a public resource allocation LP model with 3+ services",
              "✅ Include budget, staff, and policy constraints",
              "✅ Calculate efficiency metrics (impact per rupee, per staff)",
              "✅ Identify binding vs non-binding constraints",
              "✅ Determine the optimal program mix",
              "✅ Analyze resource utilization at the optimum",
              "✅ Apply the 7-step procedure to public sector problems",
              "✅ Understand the trade-offs between different public services",
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
          title="Public Resource Allocation Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 14: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <PlainTextPrint
          content={noteText}
          title="Public Resource Allocation Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic30_note.txt"
        />
      </div>

      {/* ===== SECTION 15: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <Teacher
          note={
            "This final example represents the culmination of everything we've learned. I tell my students: 'LP is not just a mathematical tool—it's a way of thinking about resource allocation in any context.' In this public sector problem, we see how efficiency metrics guide decisions: Education programs are most efficient, so we maximize them. Staff is the binding constraint, so we know exactly where to invest. Mahima from Jadavpur once told me that after completing this course, she started seeing LP problems everywhere—in her daily life, in the news, in government decisions. And that's the goal: to develop a structured, analytical mindset for solving problems. Whether you're running a factory, planning a diet, or allocating city resources, the 7-step procedure works. Congratulations on completing all 30 topics—you are now equipped to apply LP to real-world problems!"
          }
        />
      </div>
    </div>
  );
};

export default Topic30;