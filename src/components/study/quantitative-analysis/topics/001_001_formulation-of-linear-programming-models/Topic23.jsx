import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic23_files/topic23_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic23_files/topic23_note.txt?raw";

/**
 * Topic23: Worked Example 17 – Problem involving multiple resource constraints
 *
 * @component
 * @returns {JSX.Element} The rendered Topic23 component
 *
 * @purpose Provides a complete, step-by-step worked example of a production
 * problem with multiple resource constraints (4 resources, 3 products),
 * demonstrating how LP handles complex resource allocation with multiple
 * binding and non-binding constraints.
 *
 * @when_used After capacity planning (Topic22), this topic introduces a more
 * complex resource allocation problem with multiple resources, showing how
 * to identify binding vs non-binding constraints.
 */
const Topic23 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 23
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 17
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 17: Problem Involving Multiple Resource Constraints
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Optimizing production with four resource constraints — a complex
          resource allocation problem demonstrating how to identify binding
          and non-binding constraints.
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
              A manufacturing company produces <strong>three products</strong>:
              Product A, Product B, and Product C. The company has{" "}
              <strong>four resources</strong> that constrain production:
              Labor, Machine A, Machine B, and Raw Material.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Resource</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product A</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product B</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product C</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Labor (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">4</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">240</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Machine A (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">180</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Machine B (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">150</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Material (units)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">200</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Profit per unit:</strong> Product A ={" "}
                <span className="font-mono text-green-600 dark:text-green-400">₹60</span>,
                Product B = <span className="font-mono text-green-600 dark:text-green-400">₹50</span>,
                Product C = <span className="font-mono text-green-600 dark:text-green-400">₹70</span>
              </li>
              <li>
                The company wants to <strong>maximize total profit</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal production mix
                of the three products to maximize profit, subject to labor,
                Machine A, Machine B, and material constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: REAL-WORLD CONTEXT ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏭</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "🏗️ Manufacturing Planning",
              description: "Allocating multiple resources across products in a factory.",
            },
            {
              domain: "📦 Supply Chain Management",
              description: "Optimizing production and distribution with multiple constraints.",
            },
            {
              domain: "🏥 Healthcare Operations",
              description: "Managing staff, equipment, and beds across departments.",
            },
            {
              domain: "🚚 Logistics Optimization",
              description: "Allocating vehicles, drivers, and routes with multiple constraints.",
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
            <strong>Key Insight:</strong> Real-world production problems typically
            involve multiple resources. LP helps managers identify which resources
            are binding (limiting) and which have excess capacity.
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
                  <li><strong>Goal:</strong> Maximize total profit.</li>
                  <li><strong>Products:</strong> A, B, C (3 products).</li>
                  <li><strong>Resources:</strong> Labor, Machine A, Machine B, Material (4 resources).</li>
                  <li>All constraints are ≤ (maximum limits).</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 3 products, 4 resource constraints, profit maximization.
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
                  <p>x₁ = units of Product A produced</p>
                  <p>x₂ = units of Product B produced</p>
                  <p>x₃ = units of Product C produced</p>
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
                  <p>Maximize Z = 60x₁ + 50x₂ + 70x₃</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Profit A = <span className="font-mono">₹60</span></li>
                  <li>Profit B = <span className="font-mono">₹50</span></li>
                  <li>Profit C = <span className="font-mono">₹70</span></li>
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
                  <p>Labor: 2x₁ + 3x₂ + 4x₃ ≤ 240</p>
                  <p>Machine A: 3x₁ + 2x₂ + x₃ ≤ 180</p>
                  <p>Machine B: x₁ + 3x₂ + 2x₃ ≤ 150</p>
                  <p>Material: 2x₁ + 2x₂ + 3x₃ ≤ 200</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Labor:</strong> Total labor hours ≤ 240.</li>
                  <li><strong>Machine A:</strong> Total Machine A hours ≤ 180.</li>
                  <li><strong>Machine B:</strong> Total Machine B hours ≤ 150.</li>
                  <li><strong>Material:</strong> Total material units ≤ 200.</li>
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
                  <p>x₁ ≥ 0, x₂ ≥ 0, x₃ ≥ 0</p>
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 20, x₂ = 30, x₃ = 20</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Labor: 2(20)+3(30)+4(20) = 40+90+80 = 210 ≤ 240 ✓
                      <br />
                      Machine A: 3(20)+2(30)+1(20) = 60+60+20 = 140 ≤ 180 ✓
                      <br />
                      Machine B: 1(20)+3(30)+2(20) = 20+90+40 = 150 ≤ 150 ✓
                      <br />
                      Material: 2(20)+2(30)+3(20) = 40+60+60 = 160 ≤ 200 ✓
                      <br />
                      Profit: 60(20)+50(30)+70(20) = 1,200+1,500+1,400 = ₹4,100
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
                  <p>Maximize Z = 60x₁ + 50x₂ + 70x₃</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Labor: 2x₁ + 3x₂ + 4x₃ ≤ 240</p>
                  <p className="pl-4">Machine A: 3x₁ + 2x₂ + x₃ ≤ 180</p>
                  <p className="pl-4">Machine B: x₁ + 3x₂ + 2x₃ ≤ 150</p>
                  <p className="pl-4">Material: 2x₁ + 2x₂ + 3x₃ ≤ 200</p>
                  <p className="pl-4">x₁ ≥ 0, x₂ ≥ 0, x₃ ≥ 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: SOLUTION VISUALIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Optimal Production Mix
          </h2>
        </div>

        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 650 420"
            className="w-full h-auto"
            aria-label="Optimal production mix visualization"
            role="img"
          >
            <rect x="0" y="0" width="650" height="420" fill="none" />

            <text x="325" y="25" fontSize="16" fill="#475569" dark="#94a3b8" textAnchor="middle" fontWeight="bold">
              Optimal Production Mix: 80 Units
            </text>

            {/* Product A (30 units) */}
            <rect x="80" y="80" width="150" height="200" rx="8" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="155" y="180" fontSize="16" fill="#3b82f6" textAnchor="middle" fontWeight="bold">Product A</text>
            <text x="155" y="210" fontSize="14" fill="#3b82f6" textAnchor="middle">30 units</text>
            <text x="155" y="235" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">₹60 profit</text>
            <text x="155" y="260" fontSize="10" fill="#94a3b8" textAnchor="middle">Profit: ₹1,800</text>

            {/* Product B (20 units) */}
            <rect x="250" y="80" width="150" height="200" rx="8" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2.5" />
            <text x="325" y="180" fontSize="16" fill="#22c55e" textAnchor="middle" fontWeight="bold">Product B</text>
            <text x="325" y="210" fontSize="14" fill="#22c55e" textAnchor="middle">20 units</text>
            <text x="325" y="235" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">₹50 profit</text>
            <text x="325" y="260" fontSize="10" fill="#94a3b8" textAnchor="middle">Profit: ₹1,000</text>

            {/* Product C (30 units) */}
            <rect x="420" y="80" width="150" height="200" rx="8" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="2.5" />
            <text x="495" y="180" fontSize="16" fill="#a855f7" textAnchor="middle" fontWeight="bold">Product C</text>
            <text x="495" y="210" fontSize="14" fill="#a855f7" textAnchor="middle">30 units</text>
            <text x="495" y="235" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">₹70 profit</text>
            <text x="495" y="260" fontSize="10" fill="#94a3b8" textAnchor="middle">Profit: ₹2,100</text>

            {/* Profit summary */}
            <rect x="80" y="320" width="490" height="50" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
            <text x="325" y="345" fontSize="16" fill="#f59e0b" textAnchor="middle" fontWeight="bold">
              Total Profit = ₹4,900
            </text>
            <text x="325" y="365" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">
              (A: ₹1,800 + B: ₹1,000 + C: ₹2,100)
            </text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Optimal production: 30 units of A, 20 units of B, 30 units of C.
            Total profit = ₹4,900.
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
              resource: "Labor",
              used: "2(30)+3(20)+4(30) = 60+60+120 = 240 hrs",
              available: "240 hrs",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Machine A",
              used: "3(30)+2(20)+1(30) = 90+40+30 = 160 hrs",
              available: "180 hrs",
              status: "Slack (20 hrs)",
              percentage: "88.9%",
            },
            {
              resource: "Machine B",
              used: "1(30)+3(20)+2(30) = 30+60+60 = 150 hrs",
              available: "150 hrs",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Material",
              used: "2(30)+2(20)+3(30) = 60+40+90 = 190 units",
              available: "200 units",
              status: "Slack (10 units)",
              percentage: "95%",
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
            <strong>💡 Key Observation:</strong> Labor and Machine B are{" "}
            <strong>binding</strong> (fully used), while Machine A and Material
            have <strong>slack</strong>. This means the company should consider
            expanding Labor or Machine B capacity if production needs to increase.
          </p>
        </div>
      </section>

      {/* ===== SECTION 6: RESOURCE EFFICIENCY ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Resource Efficiency Analysis
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Profit per unit of resource helps identify which product is most efficient for each resource:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Metric</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product A</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product B</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product C</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Best</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Profit/Labor (₹/hr)</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">30</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">16.67</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">17.50</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Product A</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Profit/Machine A (₹/hr)</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">20</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">25</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">70</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Product C</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Profit/Machine B (₹/hr)</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">60</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">16.67</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">35</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Product A</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Profit/Material (₹/unit)</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">30</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">25</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">23.33</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Product A</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Key Insight:</strong> Product A is most efficient for
              Labor, Machine B, and Material. Product C is most efficient for
              Machine A. The optimal mix (30, 20, 30) balances these trade-offs
              to maximize total profit.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: COMPARING BINDING VS NON-BINDING ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Understanding Binding vs Non-Binding Constraints
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Binding Constraints</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Labor:</strong> 240/240 hours used</li>
              <li><strong>Machine B:</strong> 150/150 hours used</li>
            </ul>
            <p className="text-xs text-green-600 dark:text-green-400 mt-2">
              These resources are fully utilized. Additional capacity would increase profit.
            </p>
          </div>
          <div className="bg-amber-50/40 dark:bg-amber-950/20 rounded-xl p-4 border border-amber-200 dark:border-amber-900/30">
            <h3 className="font-semibold text-amber-700 dark:text-amber-300">Non-Binding Constraints</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Machine A:</strong> 160/180 hours used (slack: 20)</li>
              <li><strong>Material:</strong> 190/200 units used (slack: 10)</li>
            </ul>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
              These resources have excess capacity. Additional capacity would not increase profit.
            </p>
          </div>
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> Binding constraints are the{" "}
            <strong>bottlenecks</strong> in the production system. To increase
            profit, the company should invest in expanding Labor or Machine B
            capacity. Machine A and Material have slack, so investing in them
            would not improve profit.
          </p>
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
              title: "Identify all resource constraints",
              desc: "List every resource that limits production.",
            },
            {
              title: "Calculate resource efficiency",
              desc: "Profit per resource unit identifies the most efficient products.",
            },
            {
              title: "Find binding constraints",
              desc: "Binding constraints are the bottlenecks that limit profit.",
            },
            {
              title: "Check for slack resources",
              desc: "Slack resources indicate excess capacity.",
            },
            {
              title: "Focus investment on binding resources",
              desc: "Increasing binding capacity improves profit.",
            },
            {
              title: "Use resource efficiency for decisions",
              desc: "Efficiency metrics guide product mix decisions.",
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
                mistake: "Forgetting a resource constraint",
                fix: "List all resources before writing constraints.",
              },
              {
                mistake: "Assuming all resources are binding",
                fix: "Some resources may have slack—check utilization.",
              },
              {
                mistake: "Using wrong coefficients",
                fix: "Ensure resource usage per product is correct.",
              },
              {
                mistake: "Not checking resource utilization",
                fix: "Calculate usage at the optimum to identify binding constraints.",
              },
              {
                mistake: "Ignoring non-negativity",
                fix: "x₁ ≥ 0, x₂ ≥ 0, x₃ ≥ 0.",
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
            "Create a resource-product table with all constraints.",
            "List all resources with their availability limits.",
            "Calculate resource efficiency for each product.",
            "Identify binding vs non-binding constraints.",
            "Check resource utilization at the optimum.",
            "Focus investment on binding resources.",
            "Validate the solution with a feasible point.",
            "Document assumptions about resource usage.",
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
                <strong>Observe carefully:</strong> Labor and Machine B are
                binding, but Machine A and Material have slack. If the company
                wants to increase production, which resource should they expand first?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If Product C's profit
                increases to ₹80, what happens to the optimal production mix?
                Which resources become more valuable?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Susmita manages a
                factory with 5 products and 6 resources. She wants to maximize
                profit. How would she identify which resources are the bottlenecks
                using LP?
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
              "✅ Formulate an LP model with multiple resource constraints (4+ resources)",
              "✅ Identify binding vs non-binding constraints",
              "✅ Calculate resource efficiency (profit per unit of resource)",
              "✅ Determine the optimal production mix",
              "✅ Analyze resource utilization at the optimum",
              "✅ Understand the economic implications of binding constraints",
              "✅ Apply the 7-step procedure to complex resource allocation problems",
              "✅ Recommend capacity investments based on binding constraints",
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
          title="Multiple Resource Constraints FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 14: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <PlainTextPrint
          content={noteText}
          title="Multiple Resource Constraints - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic23_note.txt"
        />
      </div>

      {/* ===== SECTION 15: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <Teacher
          note={
            "This example demonstrates the power of LP in handling complex, real-world resource allocation problems. I tell my students: 'The key insight is not just finding the optimal solution, but understanding WHY it's optimal.' Here, Labor and Machine B are the bottlenecks—they limit production. Machine A and Material have slack, meaning they're not restricting profit. This tells us exactly where to invest: expand Labor or Machine B capacity. Mamata from Barrackpore once used this framework to identify that her factory's bottleneck was Machine B, not Labor as she had assumed. She invested in a new Machine B and increased profit by 20%! Remember: in multiple resource problems, the binding constraints are your bottlenecks. Focus your improvement efforts there for maximum impact."
          }
        />
      </div>
    </div>
  );
};

export default Topic23;