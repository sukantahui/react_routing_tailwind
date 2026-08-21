import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic17_files/topic17_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic17_files/topic17_note.txt?raw";

/**
 * Topic17: Worked Example 11 – Transportation-related production problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic17 component
 *
 * @purpose Provides a complete, step-by-step worked example of a transportation
 * problem combined with production decisions, demonstrating how LP can optimize
 * both production and distribution costs.
 *
 * @when_used After investment allocation (Topic16), this topic introduces a
 * new application domain: supply chain and logistics, with production costs
 * added to the classic transportation model.
 */
const Topic17 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 17
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 11
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 11: Transportation-Related Production Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Optimizing production and shipping decisions across factories and
          warehouses — a classic supply chain LP application.
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
              A company manufactures a product at <strong>two factories</strong>{" "}
              (Plant A and Plant B) and ships it to{" "}
              <strong>three warehouses</strong> (W1, W2, W3) to meet demand.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Factory Capacities</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Plant A: <span className="font-mono text-blue-600 dark:text-blue-400">150 units</span> per week</li>
                  <li>Plant B: <span className="font-mono text-blue-600 dark:text-blue-400">200 units</span> per week</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Warehouse Demands</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>W1: <span className="font-mono text-blue-600 dark:text-blue-400">100 units</span> per week</li>
                  <li>W2: <span className="font-mono text-blue-600 dark:text-blue-400">120 units</span> per week</li>
                  <li>W3: <span className="font-mono text-blue-600 dark:text-blue-400">130 units</span> per week</li>
                </ul>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white">Production Costs per Unit</h4>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Plant A: <span className="font-mono text-red-600 dark:text-red-400">₹50</span></li>
                <li>Plant B: <span className="font-mono text-red-600 dark:text-red-400">₹60</span></li>
              </ul>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Shipping Cost (₹/unit)</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">W1</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">W2</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">W3</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Plant A</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹8</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹10</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹12</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Plant B</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹12</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹9</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹7</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                The company wants to <strong>minimize total cost</strong>{" "}
                (production + shipping).
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine how many units to produce
                at each plant and how many to ship to each warehouse to minimize
                total cost while meeting all demands and respecting capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: REAL-WORLD CONTEXT ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🚚</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "🏭 Supply Chain Optimization",
              description: "Manufacturers optimizing production and distribution networks globally.",
            },
            {
              domain: "📦 Logistics Planning",
              description: "Determining optimal shipping routes and quantities between facilities.",
            },
            {
              domain: "🌐 Global Sourcing",
              description: "Deciding where to produce and how to distribute to meet worldwide demand.",
            },
            {
              domain: "🏢 Warehouse Management",
              description: "Planning inventory allocation across multiple distribution centers.",
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
            <strong>Key Insight:</strong> Transportation problems are one of the
            most widely used LP applications in business. Companies save millions
            by optimizing their supply chain networks.
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
                  <li><strong>Goal:</strong> Minimize total cost (production + shipping).</li>
                  <li><strong>Plants:</strong> A and B (2 factories).</li>
                  <li><strong>Warehouses:</strong> W1, W2, W3 (3 destinations).</li>
                  <li><strong>Capacities:</strong> A=150, B=200.</li>
                  <li><strong>Demands:</strong> W1=100, W2=120, W3=130.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 plants, 3 warehouses, capacities, demands, production and shipping costs.
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
                  <p>x₁₁ = units from Plant A to Warehouse 1</p>
                  <p>x₁₂ = units from Plant A to Warehouse 2</p>
                  <p>x₁₃ = units from Plant A to Warehouse 3</p>
                  <p>x₂₁ = units from Plant B to Warehouse 1</p>
                  <p>x₂₂ = units from Plant B to Warehouse 2</p>
                  <p>x₂₃ = units from Plant B to Warehouse 3</p>
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
                  <p>Minimize Z = 58x₁₁ + 60x₁₂ + 62x₁₃ + 72x₂₁ + 69x₂₂ + 67x₂₃</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  (Production + Shipping costs per unit for each route)
                </p>
                <div className="mt-2 bg-yellow-50/60 dark:bg-yellow-950/30 p-2 rounded border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    💡 Example: Plant A to W1 = Production ₹50 + Shipping ₹8 = ₹58
                  </p>
                </div>
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
                  <p>Plant A: x₁₁ + x₁₂ + x₁₃ ≤ 150</p>
                  <p>Plant B: x₂₁ + x₂₂ + x₂₃ ≤ 200</p>
                  <p>W1: x₁₁ + x₂₁ ≥ 100</p>
                  <p>W2: x₁₂ + x₂₂ ≥ 120</p>
                  <p>W3: x₁₃ + x₂₃ ≥ 130</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Plant capacities:</strong> Each plant's total production ≤ capacity.</li>
                  <li><strong>Warehouse demands:</strong> Each warehouse's total received ≥ demand.</li>
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
                  <p>x₁₁ ≥ 0, x₁₂ ≥ 0, x₁₃ ≥ 0, x₂₁ ≥ 0, x₂₂ ≥ 0, x₂₃ ≥ 0</p>
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test a feasible solution</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Plant A to W1: 80, W2: 70, W3: 0 (total 150)
                      <br />
                      Plant B to W1: 20, W2: 50, W3: 130 (total 200)
                      <br />
                      Demands: W1=100 ✓, W2=120 ✓, W3=130 ✓
                      <br />
                      Capacities: A=150 ✓, B=200 ✓
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✅ Feasible solution found!</p>
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
                  <p>Minimize Z = 58x₁₁ + 60x₁₂ + 62x₁₃ + 72x₂₁ + 69x₂₂ + 67x₂₃</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Plant A: x₁₁ + x₁₂ + x₁₃ ≤ 150</p>
                  <p className="pl-4">Plant B: x₂₁ + x₂₂ + x₂₃ ≤ 200</p>
                  <p className="pl-4">W1: x₁₁ + x₂₁ ≥ 100</p>
                  <p className="pl-4">W2: x₁₂ + x₂₂ ≥ 120</p>
                  <p className="pl-4">W3: x₁₃ + x₂₃ ≥ 130</p>
                  <p className="pl-4">All xᵢⱼ ≥ 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: SOLUTION VISUALIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🚚</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Optimal Solution & Transportation Network
          </h2>
        </div>

        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 650 350"
            className="w-full h-auto"
            aria-label="Transportation network with optimal flows"
            role="img"
          >
            <rect x="0" y="0" width="650" height="350" fill="none" />

            {/* Title */}
            <text x="325" y="25" fontSize="14" fill="#475569" dark="#94a3b8" textAnchor="middle" fontWeight="bold">
              Optimal Transportation Network
            </text>

            {/* Plants (sources) */}
            <rect x="80" y="100" width="100" height="50" rx="8" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
            <text x="130" y="125" fontSize="14" fill="#3b82f6" textAnchor="middle" fontWeight="bold">Plant A</text>
            <text x="130" y="143" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Capacity: 150</text>

            <rect x="80" y="220" width="100" height="50" rx="8" fill="#22c55e" fillOpacity="0.2" stroke="#22c55e" strokeWidth="2" />
            <text x="130" y="245" fontSize="14" fill="#22c55e" textAnchor="middle" fontWeight="bold">Plant B</text>
            <text x="130" y="263" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Capacity: 200</text>

            {/* Warehouses (destinations) */}
            <rect x="450" y="80" width="100" height="50" rx="8" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" />
            <text x="500" y="105" fontSize="14" fill="#a855f7" textAnchor="middle" fontWeight="bold">W1</text>
            <text x="500" y="123" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Demand: 100</text>

            <rect x="450" y="150" width="100" height="50" rx="8" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" />
            <text x="500" y="175" fontSize="14" fill="#a855f7" textAnchor="middle" fontWeight="bold">W2</text>
            <text x="500" y="193" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Demand: 120</text>

            <rect x="450" y="220" width="100" height="50" rx="8" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" />
            <text x="500" y="245" fontSize="14" fill="#a855f7" textAnchor="middle" fontWeight="bold">W3</text>
            <text x="500" y="263" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Demand: 130</text>

            {/* Flows from A */}
            {/* A→W1: 100 */}
            <line x1="180" y1="115" x2="450" y2="105" stroke="#ef4444" strokeWidth="4" />
            <text x="315" y="108" fontSize="11" fill="#ef4444" textAnchor="middle" fontWeight="bold">100</text>
            <text x="315" y="95" fontSize="9" fill="#ef4444" textAnchor="middle">₹58/unit</text>

            {/* A→W2: 50 */}
            <line x1="180" y1="130" x2="450" y2="165" stroke="#ef4444" strokeWidth="3" />
            <text x="315" y="150" fontSize="11" fill="#ef4444" textAnchor="middle" fontWeight="bold">50</text>

            {/* A→W3: 0 (no line) */}
            <text x="300" y="260" fontSize="10" fill="#94a3b8" textAnchor="middle">A→W3: 0 (not used)</text>

            {/* Flows from B */}
            {/* B→W1: 0 (no line) */}
            <text x="300" y="280" fontSize="10" fill="#94a3b8" textAnchor="middle">B→W1: 0 (not used)</text>

            {/* B→W2: 70 */}
            <line x1="180" y1="245" x2="450" y2="175" stroke="#f59e0b" strokeWidth="3" />
            <text x="315" y="210" fontSize="11" fill="#f59e0b" textAnchor="middle" fontWeight="bold">70</text>

            {/* B→W3: 130 */}
            <line x1="180" y1="245" x2="450" y2="245" stroke="#f59e0b" strokeWidth="4" />
            <text x="315" y="238" fontSize="11" fill="#f59e0b" textAnchor="middle" fontWeight="bold">130</text>
            <text x="315" y="255" fontSize="9" fill="#f59e0b" textAnchor="middle">₹67/unit</text>

            {/* Legend */}
            <rect x="560" y="290" width="80" height="50" rx="4" fill="white" dark="#1e293b" stroke="#94a3b8" strokeWidth="1" />
            <text x="600" y="305" fontSize="9" fill="#475569" dark="#94a3b8" textAnchor="middle">Legend</text>
            <line x1="570" y1="315" x2="590" y2="315" stroke="#ef4444" strokeWidth="2" />
            <text x="595" y="318" fontSize="8" fill="#475569" dark="#94a3b8">From A</text>
            <line x1="570" y1="328" x2="590" y2="328" stroke="#f59e0b" strokeWidth="2" />
            <text x="595" y="331" fontSize="8" fill="#475569" dark="#94a3b8">From B</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Optimal flows: Plant A ships 100 to W1 and 50 to W2. Plant B ships 70 to W2 and 130 to W3.
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: COST BREAKDOWN ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💰</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Cost Breakdown Analysis
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "Production Cost",
              details: "Plant A: 150 × ₹50 = ₹7,500",
              details2: "Plant B: 200 × ₹60 = ₹12,000",
              total: "₹19,500",
            },
            {
              title: "Shipping Cost",
              details: "A→W1: 100 × ₹8 = ₹800",
              details2: "A→W2: 50 × ₹10 = ₹500",
              details3: "B→W2: 70 × ₹9 = ₹630",
              details4: "B→W3: 130 × ₹7 = ₹910",
              total: "₹2,840",
            },
            {
              title: "Total Cost",
              details: "Production + Shipping",
              details2: "₹19,500 + ₹2,840",
              total: "₹22,340",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {item.details && <li>{item.details}</li>}
                {item.details2 && <li>{item.details2}</li>}
                {item.details3 && <li>{item.details3}</li>}
                {item.details4 && <li>{item.details4}</li>}
              </ul>
              <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <p className="text-lg font-bold text-green-600 dark:text-green-400">{item.total}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>💡 Key Observation:</strong> Total cost = ₹22,340.
            Both plants operate at full capacity, and all demands are met exactly.
          </p>
        </div>
      </section>

      {/* ===== SECTION 6: ROUTE EFFICIENCY ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Route Efficiency Analysis
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Route</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Production Cost</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Shipping Cost</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Total Cost</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Used</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                  { route: "A→W1", prod: "₹50", ship: "₹8", total: "₹58", used: "100 ✓" },
                  { route: "A→W2", prod: "₹50", ship: "₹10", total: "₹60", used: "50 ✓" },
                  { route: "A→W3", prod: "₹50", ship: "₹12", total: "₹62", used: "0 ✗" },
                  { route: "B→W1", prod: "₹60", ship: "₹12", total: "₹72", used: "0 ✗" },
                  { route: "B→W2", prod: "₹60", ship: "₹9", total: "₹69", used: "70 ✓" },
                  { route: "B→W3", prod: "₹60", ship: "₹7", total: "₹67", used: "130 ✓" },
                ].map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">{item.route}</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">{item.prod}</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">{item.ship}</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">{item.total}</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">
                      {item.used.includes("✓") ? (
                        <span className="text-green-600 dark:text-green-400 font-bold">{item.used}</span>
                      ) : (
                        <span className="text-red-500 dark:text-red-400">{item.used}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Key Insight:</strong> The optimal solution uses routes with
              lower total costs. Route A→W1 (₹58) and B→W3 (₹67) are the cheapest
              routes and are heavily used. Route A→W3 (₹62) and B→W1 (₹72) are
              more expensive and are not used.
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
              title: "Combine production and shipping costs",
              desc: "Always add production costs to shipping costs for each route to get the total cost coefficient.",
            },
            {
              title: "Check if the problem is balanced",
              desc: "Total supply should equal total demand; if not, add dummy suppliers or customers.",
            },
            {
              title: "Use the transportation simplex method",
              desc: "This specialized algorithm is efficient for transportation problems.",
            },
            {
              title: "Identify the cheapest routes",
              desc: "The optimal solution will use the most cost-effective routes.",
            },
            {
              title: "Consider lower/upper bounds",
              desc: "Some routes may have minimum or maximum shipping requirements.",
            },
            {
              title: "Validate with a feasible solution",
              desc: "Always check that all demands are met and capacities respected.",
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
                mistake: "Forgetting production costs",
                fix: "Production costs must be added to shipping costs in the objective.",
              },
              {
                mistake: "Not balancing supply and demand",
                fix: "Check if total capacity equals total demand; add dummy if needed.",
              },
              {
                mistake: "Using ≤ for demand constraints",
                fix: "Demands are minimum requirements, so use ≥ constraints.",
              },
              {
                mistake: "Using ≥ for capacity constraints",
                fix: "Capacities are maximum limits, so use ≤ constraints.",
              },
              {
                mistake: "Assuming all routes should be used",
                fix: "Some routes may be too expensive and won't be used in the optimal solution.",
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
            "Create a cost matrix combining production and shipping costs.",
            "Check if supply equals demand (balanced problem).",
            "Use clear notation: xᵢⱼ for flow from i to j.",
            "Add production costs to each route's cost coefficient.",
            "Verify all constraints are in the correct direction (≤ for supply, ≥ for demand).",
            "Check that all demands are met and capacities respected.",
            "Document the optimal shipping plan and total cost.",
            "Consider route restrictions (lower/upper bounds).",
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
                <strong>Observe carefully:</strong> Plant A has higher shipping
                cost to W3 (₹12) than Plant B (₹7). How does this affect the
                optimal allocation to W3?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If Plant A's production cost
                decreases to ₹40, what happens to the optimal solution? Which
                routes become more attractive?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu manages a
                supply chain network with 3 factories and 5 warehouses across
                India. How would he use LP to minimize total cost while meeting
                all demands?
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
              "✅ Formulate a transportation problem with production costs",
              "✅ Create a cost matrix combining production and shipping costs",
              "✅ Balance supply and demand in the model",
              "✅ Use correct constraint directions (≤ for supply, ≥ for demand)",
              "✅ Identify the optimal shipping plan",
              "✅ Calculate total cost breakdown (production + shipping)",
              "✅ Recognize unused routes in the optimal solution",
              "✅ Apply the 7-step procedure to transportation problems",
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
          title="Transportation-Related Production Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 13: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <PlainTextPrint
          content={noteText}
          title="Transportation-Related Production Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic17_note.txt"
        />
      </div>

      {/* ===== SECTION 14: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <Teacher
          note={
            "Transportation problems are the workhorses of supply chain optimization. I tell my students: 'If you understand this example, you can help companies save millions in logistics costs.' The key insight is combining production and shipping costs into a single coefficient for each route. This simplifies the model and makes it easier to see which routes are most cost-effective. Mamata from Barrackpore once used this framework to help her family's manufacturing business optimize their distribution network, saving them over ₹50,000 per month! Remember: the optimal solution may not use all available routes—some are simply too expensive. Also, always check if total supply equals total demand; if not, you need to add dummy variables. This example is the foundation for more complex supply chain models."
          }
        />
      </div>
    </div>
  );
};

export default Topic17;