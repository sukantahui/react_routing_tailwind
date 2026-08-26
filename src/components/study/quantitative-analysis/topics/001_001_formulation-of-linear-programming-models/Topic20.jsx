import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic20_files/topic20_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic20_files/topic20_note.txt?raw";

/**
 * Topic20: Worked Example 14 – Agricultural production problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic20 component
 *
 * @purpose Provides a complete, step-by-step worked example of an agricultural
 * production problem, demonstrating how LP can be used to allocate land, labor,
 * and fertilizer across crops to maximize profit while meeting minimum planting
 * requirements.
 *
 * @when_used After land and crop allocation (Topic19), this topic introduces
 * more complex resource constraints and minimum requirements in agricultural
 * planning.
 */
const Topic20 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 20
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 14
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 14: Agricultural Production Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Optimizing crop production with land, labor, and fertilizer constraints
          — a comprehensive agricultural planning problem.
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
              A farmer has <strong>80 hectares</strong> of land and can grow
              <strong> two crops</strong>: Crop A and Crop B.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Resource</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Crop A</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Crop B</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Land (ha)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">80</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Labor (days)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">4</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">240</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Fertilizer (units)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">200</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Profit per hectare:</strong> Crop A ={" "}
                <span className="font-mono text-green-600 dark:text-green-400">₹45,000</span>,
                Crop B = <span className="font-mono text-green-600 dark:text-green-400">₹55,000</span>
              </li>
              <li>
                <strong>Minimum requirement:</strong> At least{" "}
                <span className="font-mono text-blue-600 dark:text-blue-400">10 hectares</span> of Crop A due to a contract obligation.
              </li>
              <li>
                The farmer wants to <strong>maximize total profit</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal allocation of
                land to each crop to maximize profit, subject to land, labor,
                fertilizer, and minimum planting constraints.
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
              domain: "🌱 Farm Management",
              description: "Farmers optimizing crop selection and resource allocation.",
            },
            {
              domain: "🏛️ Agricultural Policy",
              description: "Government planning for food security and farmer support.",
            },
            {
              domain: "💧 Water Management",
              description: "Allocating irrigation water among different crops.",
            },
            {
              domain: "📈 Agricultural Economics",
              description: "Research and extension services for optimal farming practices.",
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
            <strong>Key Insight:</strong> Agricultural production problems help
            farmers make better decisions about what to plant and how to allocate
            resources, leading to higher profits and more sustainable farming.
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
                  <li><strong>Crops:</strong> Crop A and Crop B (2 crops).</li>
                  <li><strong>Resources:</strong> Land (80 ha), Labor (240 days), Fertilizer (200 units).</li>
                  <li><strong>Requirement:</strong> Crop A minimum 10 hectares.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 crops, 3 resource constraints, 1 minimum requirement.
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
                  <p>x₁ = hectares allocated to Crop A</p>
                  <p>x₂ = hectares allocated to Crop B</p>
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
                  <p>Maximize Z = 45,000x₁ + 55,000x₂</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Crop A profit per ha = <span className="font-mono">₹45,000</span></li>
                  <li>Crop B profit per ha = <span className="font-mono">₹55,000</span></li>
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
                  <p>Land: x₁ + x₂ ≤ 80</p>
                  <p>Labor: 2x₁ + 4x₂ ≤ 240</p>
                  <p>Fertilizer: 3x₁ + 2x₂ ≤ 200</p>
                  <p>Minimum A: x₁ ≥ 10</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Land:</strong> Total land ≤ 80 ha.</li>
                  <li><strong>Labor:</strong> Total labor days ≤ 240.</li>
                  <li><strong>Fertilizer:</strong> Total fertilizer units ≤ 200.</li>
                  <li><strong>Minimum A:</strong> At least 10 ha of Crop A.</li>
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 20, x₂ = 30</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Land: 20+30=50 ≤ 80 ✓
                      <br />
                      Labor: 2(20)+4(30) = 40+120 = 160 ≤ 240 ✓
                      <br />
                      Fertilizer: 3(20)+2(30) = 60+60 = 120 ≤ 200 ✓
                      <br />
                      Minimum A: 20 ≥ 10 ✓
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✅ Feasible solution!</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 40, x₂ = 30</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Land: 40+30=70 ≤ 80 ✓
                      <br />
                      Labor: 2(40)+4(30) = 80+120 = 200 ≤ 240 ✓
                      <br />
                      Fertilizer: 3(40)+2(30) = 120+60 = 180 ≤ 200 ✓
                      <br />
                      Minimum A: 40 ≥ 10 ✓
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
                  <p>Maximize Z = 45,000x₁ + 55,000x₂</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Land: x₁ + x₂ ≤ 80</p>
                  <p className="pl-4">Labor: 2x₁ + 4x₂ ≤ 240</p>
                  <p className="pl-4">Fertilizer: 3x₁ + 2x₂ ≤ 200</p>
                  <p className="pl-4">Minimum A: x₁ ≥ 10</p>
                  <p className="pl-4">x₁ ≥ 0, x₂ ≥ 0</p>
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
            Optimal Crop Allocation
          </h2>
        </div>

        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 600 450"
            className="w-full h-auto"
            aria-label="Agricultural production visualization"
            role="img"
          >
            <rect x="0" y="0" width="600" height="450" fill="none" />

            <text x="300" y="25" fontSize="16" fill="#475569" dark="#94a3b8" textAnchor="middle" fontWeight="bold">
              Optimal Land Allocation: 80 Hectares
            </text>

            {/* Crop A (40 ha) */}
            <rect x="100" y="80" width="150" height="200" rx="8" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="175" y="180" fontSize="16" fill="#3b82f6" textAnchor="middle" fontWeight="bold">Crop A</text>
            <text x="175" y="210" fontSize="14" fill="#3b82f6" textAnchor="middle">40 ha</text>
            <text x="175" y="235" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">₹45,000/ha</text>
            <text x="175" y="260" fontSize="10" fill="#94a3b8" textAnchor="middle">Labor: 2 days/ha</text>
            <text x="175" y="275" fontSize="10" fill="#94a3b8" textAnchor="middle">Fertilizer: 3 units/ha</text>

            {/* Crop B (40 ha) */}
            <rect x="280" y="80" width="150" height="200" rx="8" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2.5" />
            <text x="355" y="180" fontSize="16" fill="#22c55e" textAnchor="middle" fontWeight="bold">Crop B</text>
            <text x="355" y="210" fontSize="14" fill="#22c55e" textAnchor="middle">40 ha</text>
            <text x="355" y="235" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">₹55,000/ha</text>
            <text x="355" y="260" fontSize="10" fill="#94a3b8" textAnchor="middle">Labor: 4 days/ha</text>
            <text x="355" y="275" fontSize="10" fill="#94a3b8" textAnchor="middle">Fertilizer: 2 units/ha</text>

            {/* Profit summary */}
            <rect x="100" y="320" width="330" height="50" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
            <text x="265" y="345" fontSize="16" fill="#f59e0b" textAnchor="middle" fontWeight="bold">
              Total Profit = ₹4,000,000
            </text>
            <text x="265" y="365" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">
              (Crop A: ₹1,800,000 + Crop B: ₹2,200,000)
            </text>

            {/* Resource usage table */}
            <rect x="450" y="80" width="140" height="290" rx="8" fill="white" dark="#1e293b" stroke="#94a3b8" strokeWidth="1" />
            <text x="520" y="100" fontSize="12" fill="#475569" dark="#94a3b8" textAnchor="middle" fontWeight="bold">
              Resource Usage
            </text>
            <text x="520" y="125" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">
              Land: 80/80 (100%)
            </text>
            <text x="520" y="150" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">
              Labor: 240/240 (100%)
            </text>
            <text x="520" y="175" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">
              Fertilizer: 200/200 (100%)
            </text>
            <text x="520" y="200" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">
              Min A: 40 ≥ 10 ✓
            </text>
            <text x="520" y="230" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle" fontWeight="bold">
              All resources binding!
            </text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Optimal allocation: 40 ha Crop A, 40 ha Crop B. Total profit = ₹4,000,000.
            All resources are fully used.
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              resource: "Land",
              used: "40 + 40 = 80 ha",
              available: "80 ha",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Labor",
              used: "2(40)+4(40) = 80+160 = 240 days",
              available: "240 days",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Fertilizer",
              used: "3(40)+2(40) = 120+80 = 200 units",
              available: "200 units",
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
            <strong>💡 Key Observation:</strong> All three resources are{" "}
            <strong>binding</strong> (fully used). This is a perfectly balanced
            solution where every resource is fully utilized. The minimum requirement
            for Crop A is also satisfied (40 ≥ 10).
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
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Crop A</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Crop B</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Best</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Profit/Labor (₹/day)</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">22,500</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">13,750</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Crop A</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Profit/Fertilizer (₹/unit)</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">15,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">27,500</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Crop B</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Profit/Land (₹/ha)</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">45,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">55,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600">Crop B</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Key Insight:</strong> Crop A is more labor-efficient
              (₹22,500/day vs ₹13,750/day), while Crop B is more fertilizer-efficient
              (₹27,500/unit vs ₹15,000/unit) and land-efficient (₹55,000/ha vs
              ₹45,000/ha). The optimal mix of 40/40 balances these trade-offs
              perfectly.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: COMPARISON WITH TOPIC 19 ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Comparison with Topic 19
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              feature: "Number of Crops",
              topic19: "3 (Wheat, Rice, Sugarcane)",
              topic20: "2 (Crop A, Crop B)",
            },
            {
              feature: "Resources",
              topic19: "Land, Water, Labor, Fertilizer",
              topic20: "Land, Labor, Fertilizer",
            },
            {
              feature: "Minimum Requirement",
              topic19: "None",
              topic20: "Crop A ≥ 10 ha",
            },
            {
              feature: "Binding Constraints",
              topic19: "Land only",
              topic20: "All 3 resources",
            },
            {
              feature: "Profit per Hectare",
              topic19: "₹30,000-50,000",
              topic20: "₹45,000-55,000",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{item.feature}</h3>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">Topic 19: {item.topic19}</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Topic 20: {item.topic20}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> Topic 20 introduces a <strong>minimum
            planting requirement</strong> and has <strong>all resources binding</strong>,
            making it a more complex and realistic agricultural planning problem.
            The 2-crop model with 3 binding constraints demonstrates perfect
            resource balance.
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
              title: "Identify the binding resources",
              desc: "In this problem, all resources are binding—a sign of efficient resource use.",
            },
            {
              title: "Check minimum requirements",
              desc: "Minimum constraints may or may not be binding; here they are satisfied.",
            },
            {
              title: "Calculate resource efficiency",
              desc: "Profit per unit of labor and fertilizer helps identify trade-offs.",
            },
            {
              title: "Look for perfect balance",
              desc: "When all resources are binding, the solution is perfectly balanced.",
            },
            {
              title: "Consider contract obligations",
              desc: "Minimum planting requirements often come from contracts or regulations.",
            },
            {
              title: "Validate with real data",
              desc: "Use actual yields, costs, and resource availability for accurate results.",
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
                mistake: "Forgetting the minimum requirement",
                fix: "x₁ ≥ 10 is a separate constraint that must be included.",
              },
              {
                mistake: "Assuming all resources should be binding",
                fix: "In this problem they are, but that's not always the case.",
              },
              {
                mistake: "Using wrong units",
                fix: "Ensure all units are consistent (hectares, days, units).",
              },
              {
                mistake: "Not checking the minimum requirement at the optimum",
                fix: "Check that x₁ ≥ 10 is satisfied.",
              },
              {
                mistake: "Ignoring non-negativity",
                fix: "x₁ ≥ 0, x₂ ≥ 0.",
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
            "Create a resource-crop table to organize data.",
            "Include all resource constraints explicitly.",
            "Add minimum requirements as separate constraints.",
            "Calculate resource efficiency (profit per unit).",
            "Check which resources are binding.",
            "Validate the solution with a feasible point.",
            "Document assumptions about yields and costs.",
            "Consider contract obligations in the model.",
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
                <strong>Observe carefully:</strong> In this problem, all three
                resources are binding. What does this tell us about the resource
                availability and the crop requirements?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If the minimum requirement
                for Crop A increases to 30 hectares, what happens to the optimal
                solution? Would the minimum requirement become binding?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu is a farmer
                in Kolkata with 50 hectares. He has a contract to grow at least
                20 hectares of rice. He also has limited labor and fertilizer.
                How would he formulate his agricultural production problem?
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
              "✅ Formulate an agricultural production LP model with multiple resources",
              "✅ Include minimum planting requirements as constraints",
              "✅ Calculate resource efficiency (profit per unit of resource)",
              "✅ Identify binding vs non-binding constraints",
              "✅ Determine the optimal crop allocation",
              "✅ Understand the trade-offs between resource efficiency and profit",
              "✅ Apply the 7-step procedure to agricultural planning problems",
              "✅ Recognize when all resources are binding (perfect balance)",
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
          title="Agricultural Production Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 14: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <PlainTextPrint
          content={noteText}
          title="Agricultural Production Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic20_note.txt"
        />
      </div>

      {/* ===== SECTION 15: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <Teacher
          note={
            "This example shows a beautiful case of perfect resource balance—all three constraints are binding! I tell my students: 'This is the agricultural equivalent of a perfectly balanced budget.' The minimum requirement for Crop A is not binding (40 > 10), which means the farmer naturally wants to plant more Crop A than the contract requires. Why? Because Crop A is more labor-efficient, and the farmer has ample labor. The key insight here is resource efficiency: Crop A gives ₹22,500 per labor-day vs Crop B's ₹13,750. So even though Crop B has higher profit per hectare, Crop A is better for labor utilization. The optimal 40/40 mix balances labor, fertilizer, and land perfectly. Mamata from Barrackpore once used this approach to help her uncle optimize his farm, increasing profit by 15%. Remember: when all resources are binding, the solution is perfectly efficient—there's no wasted capacity in any resource."
          }
        /&gt;
      </div>
    </div>
  );
};

export default Topic20;