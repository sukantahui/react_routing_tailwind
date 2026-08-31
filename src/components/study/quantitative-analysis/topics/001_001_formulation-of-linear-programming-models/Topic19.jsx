import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic19_files/topic19_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic19_files/topic19_note.txt?raw";

/**
 * Topic19: Worked Example 13 – Land and crop allocation problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic19 component
 *
 * @purpose Provides a complete, step-by-step worked example of a land and crop
 * allocation problem, demonstrating how LP can be used to allocate limited
 * land and resources among different crops to maximize profit.
 *
 * @when_used After workforce allocation (Topic18), this topic introduces
 * agricultural planning, a major application area for LP with land, water,
 * labor, and fertilizer constraints.
 */
const Topic19 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 19
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 13
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 13: Land and Crop Allocation Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Optimizing agricultural planning — allocating limited land, water,
          labor, and fertilizer across crops to maximize profit.
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
              A farmer has <strong>100 hectares</strong> of land to allocate
              among <strong>three crops</strong>: Wheat, Rice, and Sugarcane.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Resource</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Wheat</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Rice</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Sugarcane</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Land (ha)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">100</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Water (L)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1,000</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1,500</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2,000</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">180,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Labor (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">50</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">70</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">80</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">7,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Fertilizer (kg)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">40</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">60</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">70</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">5,800</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Profit per hectare:</strong> Wheat ={" "}
                <span className="font-mono text-green-600 dark:text-green-400">₹30,000</span>,
                Rice = <span className="font-mono text-green-600 dark:text-green-400">₹40,000</span>,
                Sugarcane = <span className="font-mono text-green-600 dark:text-green-400">₹50,000</span>
              </li>
              <li>
                The farmer wants to <strong>maximize total profit</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal allocation of
                land to each crop to maximize profit, subject to land, water,
                labor, and fertilizer constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: REAL-WORLD CONTEXT ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌾</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "🌱 Agricultural Planning",
              description: "Farmers and agribusinesses optimizing crop selection and land use.",
            },
            {
              domain: "💧 Irrigation Management",
              description: "Allocating water resources among different crops and fields.",
            },
            {
              domain: "🏛️ Government Policy",
              description: "Subsidy allocation and agricultural extension planning.",
            },
            {
              domain: "🌍 Sustainable Farming",
              description: "Balancing profit with environmental and resource constraints.",
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
            <strong>Key Insight:</strong> Agriculture is one of the oldest and
            most important applications of LP. Farmers use LP to make decisions
            about crop selection, resource allocation, and profit maximization.
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
                  <li><strong>Crops:</strong> Wheat, Rice, Sugarcane (3 crops).</li>
                  <li><strong>Resources:</strong> Land (100 ha), Water (180,000 L), Labor (7,000 hrs), Fertilizer (5,800 kg).</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 3 crops, 4 resource constraints, profit maximization.
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
                  <p>x₁ = hectares allocated to Wheat</p>
                  <p>x₂ = hectares allocated to Rice</p>
                  <p>x₃ = hectares allocated to Sugarcane</p>
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
                  <p>Maximize Z = 30,000x₁ + 40,000x₂ + 50,000x₃</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Wheat profit per ha = <span className="font-mono">₹30,000</span></li>
                  <li>Rice profit per ha = <span className="font-mono">₹40,000</span></li>
                  <li>Sugarcane profit per ha = <span className="font-mono">₹50,000</span></li>
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
                  <p>Land: x₁ + x₂ + x₃ ≤ 100</p>
                  <p>Water: 1000x₁ + 1500x₂ + 2000x₃ ≤ 180,000</p>
                  <p>Labor: 50x₁ + 70x₂ + 80x₃ ≤ 7,000</p>
                  <p>Fertilizer: 40x₁ + 60x₂ + 70x₃ ≤ 5,800</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Land:</strong> Total land ≤ 100 ha.</li>
                  <li><strong>Water:</strong> Total water usage ≤ 180,000 L.</li>
                  <li><strong>Labor:</strong> Total labor hours ≤ 7,000.</li>
                  <li><strong>Fertilizer:</strong> Total fertilizer ≤ 5,800 kg.</li>
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 40, x₂ = 30, x₃ = 30</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Land: 40+30+30 = 100 ≤ 100 ✓
                      <br />
                      Water: 1000(40)+1500(30)+2000(30) = 145,000 ≤ 180,000 ✓
                      <br />
                      Labor: 50(40)+70(30)+80(30) = 6,500 ≤ 7,000 ✓
                      <br />
                      Fertilizer: 40(40)+60(30)+70(30) = 5,500 ≤ 5,800 ✓
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
                  <p>Maximize Z = 30,000x₁ + 40,000x₂ + 50,000x₃</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Land: x₁ + x₂ + x₃ ≤ 100</p>
                  <p className="pl-4">Water: 1000x₁ + 1500x₂ + 2000x₃ ≤ 180,000</p>
                  <p className="pl-4">Labor: 50x₁ + 70x₂ + 80x₃ ≤ 7,000</p>
                  <p className="pl-4">Fertilizer: 40x₁ + 60x₂ + 70x₃ ≤ 5,800</p>
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
            Optimal Land Allocation
          </h2>
        </div>

        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 600 400"
            className="w-full h-auto"
            aria-label="Land allocation visualization"
            role="img"
          >
            <rect x="0" y="0" width="600" height="400" fill="none" />

            <text x="300" y="25" fontSize="16" fill="#475569" dark="#94a3b8" textAnchor="middle" fontWeight="bold">
              Optimal Land Allocation: 100 Hectares
            </text>

            {/* Wheat (40 ha) */}
            <rect x="100" y="80" width="120" height="200" rx="8" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="160" y="180" fontSize="16" fill="#3b82f6" textAnchor="middle" fontWeight="bold">Wheat</text>
            <text x="160" y="210" fontSize="14" fill="#3b82f6" textAnchor="middle">40 ha</text>
            <text x="160" y="235" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">₹30,000/ha</text>

            {/* Rice (30 ha) */}
            <rect x="240" y="80" width="120" height="150" rx="8" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2.5" />
            <text x="300" y="155" fontSize="16" fill="#22c55e" textAnchor="middle" fontWeight="bold">Rice</text>
            <text x="300" y="185" fontSize="14" fill="#22c55e" textAnchor="middle">30 ha</text>
            <text x="300" y="210" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">₹40,000/ha</text>

            {/* Sugarcane (30 ha) */}
            <rect x="380" y="80" width="120" height="150" rx="8" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="2.5" />
            <text x="440" y="155" fontSize="16" fill="#a855f7" textAnchor="middle" fontWeight="bold">Sugarcane</text>
            <text x="440" y="185" fontSize="14" fill="#a855f7" textAnchor="middle">30 ha</text>
            <text x="440" y="210" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">₹50,000/ha</text>

            {/* Profit summary */}
            <rect x="100" y="310" width="400" height="50" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
            <text x="300" y="335" fontSize="16" fill="#f59e0b" textAnchor="middle" fontWeight="bold">
              Total Profit = ₹3,900,000
            </text>
            <text x="300" y="355" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">
              (Wheat: ₹1,200,000 + Rice: ₹1,200,000 + Sugarcane: ₹1,500,000)
            </text>

            {/* Resource usage indicators */}
            <text x="85" y="400" fontSize="10" fill="#94a3b8">Land: 100%</text>
            <text x="200" y="400" fontSize="10" fill="#94a3b8">Water: 80.6%</text>
            <text x="330" y="400" fontSize="10" fill="#94a3b8">Labor: 92.9%</text>
            <text x="450" y="400" fontSize="10" fill="#94a3b8">Fertilizer: 94.8%</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Optimal allocation: 40 ha Wheat, 30 ha Rice, 30 ha Sugarcane.
            Total profit = ₹3,900,000.
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
              resource: "Land",
              used: "40 + 30 + 30 = 100 ha",
              available: "100 ha",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Water",
              used: "1000(40)+1500(30)+2000(30) = 145,000 L",
              available: "180,000 L",
              status: "Slack (35,000 L)",
              percentage: "80.6%",
            },
            {
              resource: "Labor",
              used: "50(40)+70(30)+80(30) = 6,500 hrs",
              available: "7,000 hrs",
              status: "Slack (500 hrs)",
              percentage: "92.9%",
            },
            {
              resource: "Fertilizer",
              used: "40(40)+60(30)+70(30) = 5,500 kg",
              available: "5,800 kg",
              status: "Slack (300 kg)",
              percentage: "94.8%",
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
            <strong>💡 Key Observation:</strong> Land is the only{" "}
            <strong>binding</strong> constraint (fully used). Water, Labor, and
            Fertilizer have <strong>slack</strong>, meaning the farmer has
            excess capacity in these resources. Additional land would be most
            valuable.
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
            Profit per unit of resource helps identify which crop is most efficient for each resource:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Metric</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Wheat</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Rice</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Sugarcane</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Best</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Profit/Water (₹/L)</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">30</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">26.67</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">25</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Wheat</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Profit/Labor (₹/hr)</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">600</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">571.43</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">625</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Sugarcane</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Profit/Fertilizer (₹/kg)</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">750</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">666.67</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">714.29</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Wheat</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Key Insight:</strong> No single crop is best for all
              resources. Wheat is most efficient for Water and Fertilizer,
              while Sugarcane is most efficient for Labor. The optimal mix
              balances these trade-offs.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Calculate resource efficiency",
              desc: "Profit per unit of each resource helps identify the best crop for each constraint.",
            },
            {
              title: "Land is usually the most binding",
              desc: "Land is often the most limiting resource in agriculture.",
            },
            {
              title: "Consider crop rotation",
              desc: "Add constraints for crop rotation if required.",
            },
            {
              title: "Use seasonal constraints",
              desc: "Water availability may vary by season—add time-based constraints.",
            },
            {
              title: "Check for slack resources",
              desc: "Resources with slack may be available for other uses.",
            },
            {
              title: "Validate with real farm data",
              desc: "Use actual yields and costs for accurate results.",
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
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
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
                mistake: "Assuming the highest profit crop is always best",
                fix: "Consider resource usage too; high profit may mean high resource consumption.",
              },
              {
                mistake: "Forgetting a resource constraint",
                fix: "List all resources before writing constraints.",
              },
              {
                mistake: "Using wrong units",
                fix: "Ensure all units are consistent (e.g., hectares, liters, hours).",
              },
              {
                mistake: "Not checking slack resources",
                fix: "Slack resources indicate excess capacity.",
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

      {/* ===== SECTION 9: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Create a resource-crop table to organize data.",
            "List all resources with their availability.",
            "Calculate resource efficiency (profit per unit).",
            "Use the 7-step procedure consistently.",
            "Check which resources are binding.",
            "Validate the solution with a feasible point.",
            "Document assumptions about yields and costs.",
            "Consider seasonal and rotational constraints.",
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
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💭</span>
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">Think About…</h3>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Observe carefully:</strong> Land is the only binding
                constraint. If the farmer could acquire more land, which resource
                would become the next binding constraint?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If water availability
                decreases to 150,000 liters, what happens to the optimal
                allocation? Which crop would be affected most?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Susmita is a farmer
                in Barrackpore with 50 hectares of land. She can grow rice,
                wheat, or vegetables. She has limited water and labor. How
                would she use LP to decide her crop mix?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 11: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
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
              "✅ Formulate a land and crop allocation LP model",
              "✅ Include multiple resource constraints (land, water, labor, fertilizer)",
              "✅ Calculate resource efficiency (profit per unit of resource)",
              "✅ Identify binding vs non-binding resources",
              "✅ Determine the optimal crop allocation",
              "✅ Understand trade-offs between profit and resource usage",
              "✅ Apply the 7-step procedure to agricultural planning problems",
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
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <FAQTemplate
          title="Land and Crop Allocation Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 13: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <PlainTextPrint
          content={noteText}
          title="Land and Crop Allocation Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic19_note.txt"
        />
      </div>

      {/* ===== SECTION 14: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <Teacher
          note={
            "Land and crop allocation is one of the most practical LP applications, especially in agricultural economies like India. I tell my students: 'Farmers make these decisions every season—LP helps them make better ones.' The key insight here is that the crop with the highest profit per hectare isn't always the best choice. Sugarcane has the highest profit (₹50,000/ha) but uses the most water and fertilizer. The optimal mix balances resource usage with profitability. Susmita from Barrackpore once told me she used this exact approach to help her uncle decide which crops to plant on his farm, increasing his profit by 12%. Remember: resource efficiency (profit per unit of water, labor, or fertilizer) is often more important than profit per hectare alone. This example also shows that land is often the most binding constraint in agriculture—something farmers understand intuitively."
          }
        />
      </div>
    </div>
  );
};

export default Topic19;