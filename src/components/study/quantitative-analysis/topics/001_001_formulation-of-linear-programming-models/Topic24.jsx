import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic24_files/topic24_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic24_files/topic24_note.txt?raw";

/**
 * Topic24: Worked Example 18 – Problem involving minimum production requirements
 *
 * @component
 * @returns {JSX.Element} The rendered Topic24 component
 *
 * @purpose Provides a complete, step-by-step worked example of a production
 * problem with minimum production requirements, demonstrating how to handle
 * lower-bound constraints (x ≥ minimum) alongside resource constraints.
 *
 * @when_used After multiple resource constraints (Topic23), this topic
 * introduces minimum production requirements, which are common in real-world
 * production problems due to contracts, regulations, or market demands.
 */
const Topic24 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 24
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 18
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 18: Problem Involving Minimum Production Requirements
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Maximizing profit while meeting minimum production obligations —
          a common challenge in manufacturing with contracts and market demands.
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
              Product X and Product Y. The company has{" "}
              <strong>three resources</strong> that constrain production:
              Labor, Machine, and Raw Material.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Resource</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product X</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Product Y</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Labor (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">4</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">200</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Machine (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">150</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Material (units)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">4</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">180</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Profit per unit:</strong> Product X ={" "}
                <span className="font-mono text-green-600 dark:text-green-400">₹50</span>,
                Product Y = <span className="font-mono text-green-600 dark:text-green-400">₹60</span>
              </li>
              <li>
                <strong>Minimum production requirements:</strong>
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Product X: At least{" "}
                  <span className="font-mono text-blue-600 dark:text-blue-400">20 units</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">(Contractual obligation)</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Product Y: At least{" "}
                  <span className="font-mono text-blue-600 dark:text-blue-400">15 units</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">(Market demand)</p>
              </div>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                The company wants to <strong>maximize total profit</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal production mix
                of Product X and Product Y to maximize profit, subject to
                resource constraints and minimum production requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: REAL-WORLD CONTEXT ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "📄 Contract Manufacturing",
              description: "Meeting minimum order quantities from customers or contracts.",
            },
            {
              domain: "📊 Market Share Maintenance",
              description: "Producing minimum quantities to maintain market presence.",
            },
            {
              domain: "⚖️ Regulatory Compliance",
              description: "Meeting government-mandated production minimums.",
            },
            {
              domain: "🏭 Production Planning",
              description: "Balancing minimum production with resource constraints.",
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
            <strong>Key Insight:</strong> Minimum production requirements are
            common in business. Contracts, regulations, and strategic decisions
            often force companies to produce certain quantities regardless of
            profitability.
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
                  <li><strong>Products:</strong> X and Y (2 products).</li>
                  <li><strong>Resources:</strong> Labor (200), Machine (150), Material (180).</li>
                  <li><strong>Minimums:</strong> X ≥ 20, Y ≥ 15.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 products, 3 resource constraints, 2 minimum requirements.
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
                  <p>x₁ = units of Product X produced</p>
                  <p>x₂ = units of Product Y produced</p>
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
                  <li>Profit X = <span className="font-mono">₹50</span></li>
                  <li>Profit Y = <span className="font-mono">₹60</span></li>
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
                  <p>Labor: 3x₁ + 4x₂ ≤ 200</p>
                  <p>Machine: 2x₁ + 3x₂ ≤ 150</p>
                  <p>Material: 4x₁ + 2x₂ ≤ 180</p>
                  <p>Minimum X: x₁ ≥ 20</p>
                  <p>Minimum Y: x₂ ≥ 15</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Resources:</strong> Labor, Machine, Material limits.</li>
                  <li><strong>Minimums:</strong> At least 20 of X, 15 of Y.</li>
                </ul>
                <div className="mt-2 bg-yellow-50/60 dark:bg-yellow-950/30 p-2 rounded border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    💡 Note: Minimum requirements are <strong>lower bounds</strong> (≥),
                    different from resource constraints which are upper bounds (≤).
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 20, x₂ = 15</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Labor: 3(20)+4(15) = 60+60 = 120 ≤ 200 ✓
                      <br />
                      Machine: 2(20)+3(15) = 40+45 = 85 ≤ 150 ✓
                      <br />
                      Material: 4(20)+2(15) = 80+30 = 110 ≤ 180 ✓
                      <br />
                      Minimum X: 20 ≥ 20 ✓
                      <br />
                      Minimum Y: 15 ≥ 15 ✓
                      <br />
                      Profit: 50(20)+60(15) = 1,000+900 = ₹1,900
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
                  <p className="pl-4">Labor: 3x₁ + 4x₂ ≤ 200</p>
                  <p className="pl-4">Machine: 2x₁ + 3x₂ ≤ 150</p>
                  <p className="pl-4">Material: 4x₁ + 2x₂ ≤ 180</p>
                  <p className="pl-4">Minimum X: x₁ ≥ 20</p>
                  <p className="pl-4">Minimum Y: x₂ ≥ 15</p>
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
            aria-label="Graphical solution for minimum production problem"
            role="img"
          >
            <rect x="0" y="0" width="650" height="450" fill="none" />

            {/* Axes */}
            <line x1="80" y1="400" x2="600" y2="400" stroke="#94a3b8" strokeWidth="2" />
            <line x1="80" y1="400" x2="80" y2="40" stroke="#94a3b8" strokeWidth="2" />
            <text x="610" y="410" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Product X (x₁)</text>
            <text x="50" y="30" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Product Y (x₂)</text>

            {/* Scale marks */}
            <text x="80" y="415" fontSize="10" fill="#94a3b8">0</text>
            <text x="130" y="415" fontSize="10" fill="#94a3b8">10</text>
            <text x="180" y="415" fontSize="10" fill="#94a3b8">20</text>
            <text x="230" y="415" fontSize="10" fill="#94a3b8">30</text>
            <text x="280" y="415" fontSize="10" fill="#94a3b8">40</text>
            <text x="380" y="415" fontSize="10" fill="#94a3b8">60</text>

            <text x="65" y="340" fontSize="10" fill="#94a3b8">10</text>
            <text x="65" y="280" fontSize="10" fill="#94a3b8">20</text>
            <text x="65" y="220" fontSize="10" fill="#94a3b8">30</text>
            <text x="65" y="160" fontSize="10" fill="#94a3b8">40</text>

            {/* Labor: 3x₁ + 4x₂ = 200 => x₂ = 50 - 0.75x₁ */}
            <line x1="80" y1="400" x2="280" y2="200" stroke="#ef4444" strokeWidth="2.5" />
            <text x="285" y="195" fontSize="11" fill="#ef4444" fontWeight="bold">Labor</text>

            {/* Machine: 2x₁ + 3x₂ = 150 => x₂ = 50 - 0.667x₁ */}
            <line x1="80" y1="400" x2="230" y2="200" stroke="#22c55e" strokeWidth="2.5" />
            <text x="235" y="195" fontSize="11" fill="#22c55e" fontWeight="bold">Machine</text>

            {/* Material: 4x₁ + 2x₂ = 180 => x₂ = 90 - 2x₁ */}
            <line x1="80" y1="400" x2="160" y2="240" stroke="#a855f7" strokeWidth="2.5" />
            <text x="165" y="235" fontSize="11" fill="#a855f7" fontWeight="bold">Material</text>

            {/* Minimum X: x₁ = 20 */}
            <line x1="180" y1="40" x2="180" y2="400" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="185" y="30" fontSize="11" fill="#f59e0b" fontWeight="bold">Min X</text>

            {/* Minimum Y: x₂ = 15 */}
            <line x1="80" y1="340" x2="600" y2="340" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="610" y="335" fontSize="11" fill="#f59e0b" fontWeight="bold">Min Y</text>

            {/* Feasible region */}
            <polygon
              points="180,340 180,200 230,200 230,170 170,170"
              fill="#3b82f6"
              fillOpacity="0.12"
              stroke="#3b82f6"
              strokeWidth="2.5"
            >
              <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="4s" repeatCount="indefinite" />
            </polygon>

            <text x="200" y="280" fontSize="14" fill="#3b82f6" fontWeight="bold">Feasible</text>
            <text x="200" y="300" fontSize="14" fill="#3b82f6" fontWeight="bold">Region</text>

            {/* Corner points */}
            {/* (20,15) */}
            <circle cx="180" cy="340" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="190" y="330" fontSize="9" fill="#475569" dark="#94a3b8">(20,15)</text>

            {/* (20,35) */}
            <circle cx="180" cy="200" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <text x="190" y="195" fontSize="9" fill="#475569" dark="#94a3b8">(20,35)</text>

            {/* (32,26) - Optimal! */}
            <circle cx="230" cy="200" r="9" fill="#22c55e" stroke="white" strokeWidth="3">
              <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="220" y="185" fontSize="11" fill="#22c55e" fontWeight="bold">★ (32,26)</text>
            <text x="220" y="230" fontSize="9" fill="#22c55e">Optimal</text>

            {/* (37.5,15) */}
            <circle cx="260" cy="340" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <text x="270" y="330" fontSize="9" fill="#475569" dark="#94a3b8">(37.5,15)</text>

            {/* Objective function line at optimum */}
            <line x1="160" y1="360" x2="280" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4">
              <animate attributeName="y1" values="360;350;360" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="200;190;200" dur="3s" repeatCount="indefinite" />
            </line>
            <text x="290" y="195" fontSize="10" fill="#f59e0b" fontWeight="bold">Z = 50x₁ + 60x₂</text>

            {/* Arrow showing profit direction */}
            <polygon points="520,320 540,305 540,335" fill="#f59e0b">
              <animate attributeName="transform" values="translate(0,0);translate(-6,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="545" y="325" fontSize="11" fill="#f59e0b" fontWeight="bold">Max Profit</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The feasible region is bounded by resource constraints and minimum requirements.
            The optimal solution is at (32, 26) with profit = ₹3,160.
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
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Profit (Z = 50x₁ + 60x₂)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">A</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">20</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">15</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹1,900</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">B</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">20</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">35</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹3,100</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/30">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">C</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">32</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">26</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">₹3,160</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">★ OPTIMAL</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">D</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">37.5</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">15</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹2,775</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/50">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Optimal Solution:</strong> Produce{" "}
              <span className="font-bold">32 units of Product X</span> and{" "}
              <span className="font-bold">26 units of Product Y</span>.
              Total profit = <span className="font-bold">₹3,160</span>.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: RESOURCE UTILIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
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
              used: "3(32)+4(26) = 96+104 = 200 hrs",
              available: "200 hrs",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Machine",
              used: "2(32)+3(26) = 64+78 = 142 hrs",
              available: "150 hrs",
              status: "Slack (8 hrs)",
              percentage: "94.7%",
            },
            {
              resource: "Material",
              used: "4(32)+2(26) = 128+52 = 180 units",
              available: "180 units",
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
            <strong>💡 Key Observation:</strong> Labor and Material are{" "}
            <strong>binding</strong> (fully used), while Machine has{" "}
            <strong>slack</strong> (8 hours unused). The minimum requirements
            are satisfied but <strong>not binding</strong> (32 {`&gt;`} 20, 26 {`>`} 15).
          </p>
        </div>
      </section>

      {/* ===== SECTION 7: MINIMUM REQUIREMENTS ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Minimum Requirements Analysis
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Product X</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Required:</strong> ≥ 20 units</li>
              <li><strong>Optimal:</strong> 32 units</li>
              <li><strong>Status:</strong> Satisfied (32 {`&gt;`} 20)</li>
              <li><strong>Binding?</strong> No (excess: 12 units)</li>
            </ul>
          </div>
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Product Y</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Required:</strong> ≥ 15 units</li>
              <li><strong>Optimal:</strong> 26 units</li>
              <li><strong>Status:</strong> Satisfied (26 {`&gt;`} 15)</li>
              <li><strong>Binding?</strong> No (excess: 11 units)</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> The minimum requirements are{" "}
            <strong>not binding</strong> at the optimal solution. This means
            the company naturally wants to produce more than the minimum because
            it's profitable to do so. The resource constraints (Labor and Material)
            are what limit production, not the minimum requirements.
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
              title: "Always include minimum requirements",
              desc: "They are separate constraints that must be added to the model.",
            },
            {
              title: "Check if minimums are binding",
              desc: "If the optimal solution exceeds minimums, they're not binding.",
            },
            {
              title: "Consider the cost of minimums",
              desc: "Minimums may force production of less profitable products.",
            },
            {
              title: "Use resource efficiency",
              desc: "Efficiency metrics help identify the impact of minimums.",
            },
            {
              title: "Validate with extreme points",
              desc: "Test solutions at the minimums to find the feasible region.",
            },
            {
              title: "Document contract obligations",
              desc: "Clearly state the source of minimum requirements.",
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
                mistake: "Forgetting minimum requirements",
                fix: "x₁ ≥ 20 and x₂ ≥ 15 must be included as separate constraints.",
              },
              {
                mistake: "Assuming minimums are always binding",
                fix: "In this case, minimums are not binding—they're exceeded.",
              },
              {
                mistake: "Using ≤ instead of ≥ for minimums",
                fix: "Minimum requirements are lower bounds, so use ≥.",
              },
              {
                mistake: "Not checking if minimums are feasible",
                fix: "Ensure minimums don't conflict with resource constraints.",
              },
              {
                mistake: "Ignoring non-negativity",
                fix: "x₁ ≥ 0, x₂ ≥ 0 (though minimums cover this).",
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
            "Identify all minimum production requirements.",
            "Add minimums as separate constraints (≥).",
            "Check if minimums are feasible with resources.",
            "Determine if minimums are binding at the optimum.",
            "Use the graphical method to visualize constraints.",
            "Evaluate objective at all feasible corner points.",
            "Document the source of minimum requirements.",
            "Consider the profit impact of minimums.",
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
                <strong>Observe carefully:</strong> The minimum requirements are
                not binding at the optimum. What would happen if the minimum
                requirement for Product X increased to 40?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If Product Y's profit
                increases to ₹80, what happens to the optimal solution? Would
                the minimum Y still be non-binding?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu has a
                contract to produce at least 50 units of a product each month,
                but his factory has limited resources. How would he formulate
                this as an LP problem?
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
              "✅ Formulate an LP model with minimum production requirements",
              "✅ Add minimum requirements as separate constraints",
              "✅ Identify binding vs non-binding minimums",
              "✅ Determine the optimal production mix with minimums",
              "✅ Analyze resource utilization with minimums",
              "✅ Understand the impact of minimums on profit",
              "✅ Apply the 7-step procedure to problems with minimums",
              "✅ Distinguish between resource constraints and minimum requirements",
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
          title="Minimum Production Requirements FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 14: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <PlainTextPrint
          content={noteText}
          title="Minimum Production Requirements - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic24_note.txt"
        />
      </div>

      {/* ===== SECTION 15: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <Teacher
          note={
            "Minimum production requirements are a reality in business. Contracts, regulations, and strategic decisions often force companies to produce certain quantities. I tell my students: 'The key insight is that these minimums may or may not be binding.' In this example, the minimums are not binding because the company naturally wants to produce more of both products—they're profitable. But in other cases, minimums can force production of unprofitable products, which is a critical business decision. Abhronila from Ichapur once told me she used this framework to analyze whether a contract with minimum order quantities was profitable for her company. Remember: always check if minimum requirements are feasible with your resource constraints, and determine if they're binding at the optimum. This analysis helps you understand the true cost of contractual obligations."
          }
        />
      </div>
    </div>
  );
};

export default Topic24;