import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic25_files/topic25_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic25_files/topic25_note.txt?raw";

/**
 * Topic25: Worked Example 19 – Problem involving maximum production limits
 *
 * @component
 * @returns {JSX.Element} The rendered Topic25 component
 *
 * @purpose Provides a complete, step-by-step worked example of a production
 * problem with maximum production limits (upper bounds), demonstrating how to
 * handle constraints like market demand limits, storage capacity, or strategic
 * diversification requirements.
 *
 * @when_used After minimum production requirements (Topic24), this topic
 * introduces maximum production limits (upper bounds), the counterpart to
 * minimum requirements in production planning.
 */
const Topic25 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 25
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 19
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 19: Problem Involving Maximum Production Limits
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Maximizing profit while respecting maximum production limits —
          addressing market demand, storage, and strategic constraints.
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
              Product A and Product B. The company has{" "}
              <strong>three resources</strong> that constrain production:
              Labor, Machine, and Raw Material.
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
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Labor (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">180</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Machine (hrs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">120</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Material (units)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">4</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">150</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Profit per unit:</strong> Product A ={" "}
                <span className="font-mono text-green-600 dark:text-green-400">₹40</span>,
                Product B = <span className="font-mono text-green-600 dark:text-green-400">₹50</span>
              </li>
              <li>
                <strong>Maximum production limits (market demand):</strong>
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Product A: At most{" "}
                  <span className="font-mono text-blue-600 dark:text-blue-400">40 units</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">(Market demand limit)</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Product B: At most{" "}
                  <span className="font-mono text-blue-600 dark:text-blue-400">25 units</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">(Market demand limit)</p>
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
                of Product A and Product B to maximize profit, subject to
                resource constraints and maximum production limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: REAL-WORLD CONTEXT ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "📉 Market Demand",
              description: "Limiting production to match market demand and avoid overstock.",
            },
            {
              domain: "🏚️ Storage Capacity",
              description: "Restricting production due to limited warehouse or storage space.",
            },
            {
              domain: "📊 Strategic Diversification",
              description: "Limiting production to maintain market diversity or reduce risk.",
            },
            {
              domain: "⚖️ Regulatory Caps",
              description: "Meeting government-imposed production limits or quotas.",
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
            <strong>Key Insight:</strong> Maximum production limits are common
            in business. Companies often face constraints on how much they can
            sell, store, or produce due to market, space, or strategic factors.
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
                  <li><strong>Products:</strong> A and B (2 products).</li>
                  <li><strong>Resources:</strong> Labor (180), Machine (120), Material (150).</li>
                  <li><strong>Maximums:</strong> A ≤ 40, B ≤ 25.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 products, 3 resource constraints, 2 maximum limits.
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
                  <p>Maximize Z = 40x₁ + 50x₂</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Profit A = <span className="font-mono">₹40</span></li>
                  <li>Profit B = <span className="font-mono">₹50</span></li>
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
                  <p>Labor: 2x₁ + 3x₂ ≤ 180</p>
                  <p>Machine: 3x₁ + 2x₂ ≤ 120</p>
                  <p>Material: 2x₁ + 4x₂ ≤ 150</p>
                  <p>Maximum A: x₁ ≤ 40</p>
                  <p>Maximum B: x₂ ≤ 25</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Resources:</strong> Labor, Machine, Material limits.</li>
                  <li><strong>Maximums:</strong> A ≤ 40, B ≤ 25 (upper bounds).</li>
                </ul>
                <div className="mt-2 bg-yellow-50/60 dark:bg-yellow-950/30 p-2 rounded border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    💡 Note: Maximum limits are <strong>upper bounds</strong> (≤),
                    similar to resource constraints but product-specific.
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 20, x₂ = 15</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Labor: 2(20)+3(15) = 40+45 = 85 ≤ 180 ✓
                      <br />
                      Machine: 3(20)+2(15) = 60+30 = 90 ≤ 120 ✓
                      <br />
                      Material: 2(20)+4(15) = 40+60 = 100 ≤ 150 ✓
                      <br />
                      Max A: 20 ≤ 40 ✓
                      <br />
                      Max B: 15 ≤ 25 ✓
                      <br />
                      Profit: 40(20)+50(15) = 800+750 = ₹1,550
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
                  <p>Maximize Z = 40x₁ + 50x₂</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Labor: 2x₁ + 3x₂ ≤ 180</p>
                  <p className="pl-4">Machine: 3x₁ + 2x₂ ≤ 120</p>
                  <p className="pl-4">Material: 2x₁ + 4x₂ ≤ 150</p>
                  <p className="pl-4">Maximum A: x₁ ≤ 40</p>
                  <p className="pl-4">Maximum B: x₂ ≤ 25</p>
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
            aria-label="Graphical solution for maximum production limits problem"
            role="img"
          >
            <rect x="0" y="0" width="650" height="450" fill="none" />

            {/* Axes */}
            <line x1="80" y1="400" x2="600" y2="400" stroke="#94a3b8" strokeWidth="2" />
            <line x1="80" y1="400" x2="80" y2="40" stroke="#94a3b8" strokeWidth="2" />
            <text x="610" y="410" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Product A (x₁)</text>
            <text x="50" y="30" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Product B (x₂)</text>

            {/* Scale marks */}
            <text x="80" y="415" fontSize="10" fill="#94a3b8">0</text>
            <text x="130" y="415" fontSize="10" fill="#94a3b8">10</text>
            <text x="180" y="415" fontSize="10" fill="#94a3b8">20</text>
            <text x="230" y="415" fontSize="10" fill="#94a3b8">30</text>
            <text x="280" y="415" fontSize="10" fill="#94a3b8">40</text>
            <text x="330" y="415" fontSize="10" fill="#94a3b8">50</text>

            <text x="65" y="340" fontSize="10" fill="#94a3b8">10</text>
            <text x="65" y="280" fontSize="10" fill="#94a3b8">20</text>
            <text x="65" y="220" fontSize="10" fill="#94a3b8">30</text>
            <text x="65" y="160" fontSize="10" fill="#94a3b8">40</text>

            {/* Labor: 2x₁ + 3x₂ = 180 => x₂ = 60 - 0.667x₁ */}
            <line x1="80" y1="400" x2="350" y2="180" stroke="#ef4444" strokeWidth="2.5" />
            <text x="355" y="175" fontSize="11" fill="#ef4444" fontWeight="bold">Labor</text>

            {/* Machine: 3x₁ + 2x₂ = 120 => x₂ = 60 - 1.5x₁ */}
            <line x1="80" y1="400" x2="200" y2="160" stroke="#22c55e" strokeWidth="2.5" />
            <text x="205" y="155" fontSize="11" fill="#22c55e" fontWeight="bold">Machine</text>

            {/* Material: 2x₁ + 4x₂ = 150 => x₂ = 37.5 - 0.5x₁ */}
            <line x1="80" y1="400" x2="350" y2="240" stroke="#a855f7" strokeWidth="2.5" />
            <text x="355" y="235" fontSize="11" fill="#a855f7" fontWeight="bold">Material</text>

            {/* Maximum A: x₁ = 40 */}
            <line x1="280" y1="40" x2="280" y2="400" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="285" y="30" fontSize="11" fill="#f59e0b" fontWeight="bold">Max A</text>

            {/* Maximum B: x₂ = 25 */}
            <line x1="80" y1="250" x2="600" y2="250" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="610" y="245" fontSize="11" fill="#f59e0b" fontWeight="bold">Max B</text>

            {/* Feasible region */}
            <polygon
              points="80,400 280,400 280,250 180,250 170,170"
              fill="#3b82f6"
              fillOpacity="0.12"
              stroke="#3b82f6"
              strokeWidth="2.5"
            >
              <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="4s" repeatCount="indefinite" />
            </polygon>

            <text x="200" y="320" fontSize="14" fill="#3b82f6" fontWeight="bold">Feasible</text>
            <text x="200" y="340" fontSize="14" fill="#3b82f6" fontWeight="bold">Region</text>

            {/* Corner points */}
            {/* (0,0) */}
            <circle cx="80" cy="400" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="90" y="390" fontSize="9" fill="#475569" dark="#94a3b8">(0,0)</text>

            {/* (0,25) */}
            <circle cx="80" cy="250" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <text x="90" y="245" fontSize="9" fill="#475569" dark="#94a3b8">(0,25)</text>

            {/* (23.33,25) - Optimal! */}
            <circle cx="180" cy="250" r="9" fill="#22c55e" stroke="white" strokeWidth="3">
              <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="170" y="235" fontSize="11" fill="#22c55e" fontWeight="bold">★ (23.33,25)</text>
            <text x="170" y="280" fontSize="9" fill="#22c55e">Optimal</text>

            {/* (40,0) */}
            <circle cx="280" cy="400" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <text x="290" y="390" fontSize="9" fill="#475569" dark="#94a3b8">(40,0)</text>

            {/* Objective function line at optimum */}
            <line x1="140" y1="390" x2="260" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4">
              <animate attributeName="y1" values="390;380;390" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="200;190;200" dur="3s" repeatCount="indefinite" />
            </line>
            <text x="270" y="195" fontSize="10" fill="#f59e0b" fontWeight="bold">Z = 40x₁ + 50x₂</text>

            {/* Arrow showing profit direction */}
            <polygon points="520,320 540,305 540,335" fill="#f59e0b">
              <animate attributeName="transform" values="translate(0,0);translate(-6,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="545" y="325" fontSize="11" fill="#f59e0b" fontWeight="bold">Max Profit</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The feasible region is bounded by resource constraints and maximum limits.
            The optimal solution is at (23.33, 25) with profit = ₹2,183.33.
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
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₁ (Product A)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₂ (Product B)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Profit (Z = 40x₁ + 50x₂)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">A</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">B</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">25</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹1,250</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/30">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">C</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">23.33</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">25</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">₹2,183.33</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">★ OPTIMAL</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">D</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">40</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹1,600</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/50">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Optimal Solution:</strong> Produce{" "}
              <span className="font-bold">23.33 units of Product A</span> and{" "}
              <span className="font-bold">25 units of Product B</span>.
              Total profit = <span className="font-bold">₹2,183.33</span>.
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
              used: "2(23.33)+3(25) = 46.67+75 = 121.67 hrs",
              available: "180 hrs",
              status: "Slack (58.33 hrs)",
              percentage: "67.6%",
            },
            {
              resource: "Machine",
              used: "3(23.33)+2(25) = 70+50 = 120 hrs",
              available: "120 hrs",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Material",
              used: "2(23.33)+4(25) = 46.67+100 = 146.67 units",
              available: "150 units",
              status: "Slack (3.33 units)",
              percentage: "97.8%",
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
            <strong>💡 Key Observation:</strong> Machine is{" "}
            <strong>binding</strong> (fully used), while Labor and Material have{" "}
            <strong>slack</strong>. The Maximum B limit is also binding (x₂ = 25).
            This means the company is constrained by both Machine capacity and
            the market demand limit for Product B.
          </p>
        </div>
      </section>

      {/* ===== SECTION 7: MAXIMUM LIMITS ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Maximum Limits Analysis
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-amber-50/40 dark:bg-amber-950/20 rounded-xl p-4 border border-amber-200 dark:border-amber-900/30">
            <h3 className="font-semibold text-amber-700 dark:text-amber-300">Product A</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Maximum:</strong> ≤ 40 units</li>
              <li><strong>Optimal:</strong> 23.33 units</li>
              <li><strong>Status:</strong> Not binding (23.33 {`<`} 40)</li>
              <li><strong>Slack:</strong> 16.67 units</li>
            </ul>
          </div>
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Product B</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Maximum:</strong> ≤ 25 units</li>
              <li><strong>Optimal:</strong> 25 units</li>
              <li><strong>Status:</strong> Binding ✓ (25 = 25)</li>
              <li><strong>Slack:</strong> 0 units</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> The maximum limit for Product B is{" "}
            <strong>binding</strong>, while Product A's maximum is{" "}
            <strong>not binding</strong>. This means the company would like to
            produce more of Product B, but market demand limits prevent it.
            Product A is not produced at its maximum because Machine capacity
            is the limiting factor.
          </p>
        </div>
      </section>

      {/* ===== SECTION 8: COMPARING MINIMUM vs MAXIMUM ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔄</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Comparing Minimum vs Maximum Requirements
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30">
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">Minimum Requirements (Topic 24)</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Lower bounds: x ≥ minimum</li>
              <li>Use ≥ constraints</li>
              <li>May or may not be binding</li>
              <li>Force production of certain products</li>
            </ul>
          </div>
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Maximum Limits (Topic 25)</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Upper bounds: x ≤ maximum</li>
              <li>Use ≤ constraints</li>
              <li>May or may not be binding</li>
              <li>Limit production of certain products</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> Minimum and maximum requirements are{" "}
            <strong>opposite sides of the same coin</strong>. Minimums force
            production of at least a certain amount; maximums cap production at
            a certain amount. Both are common in business and must be handled
            correctly in LP models.
          </p>
        </div>
      </section>

      {/* ===== SECTION 9: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Always include maximum limits",
              desc: "They are separate constraints that must be added to the model.",
            },
            {
              title: "Check if maximums are binding",
              desc: "If the optimal solution hits the maximum, it's binding.",
            },
            {
              title: "Consider market demand",
              desc: "Maximums often come from market demand limits.",
            },
            {
              title: "Use resource efficiency",
              desc: "Efficiency metrics help identify the impact of maximums.",
            },
            {
              title: "Validate with corner points",
              desc: "Test solutions at the maximums to find the feasible region.",
            },
            {
              title: "Document demand constraints",
              desc: "Clearly state the source of maximum limits.",
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

      {/* ===== SECTION 10: COMMON MISTAKES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
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
                mistake: "Forgetting maximum limits",
                fix: "x₁ ≤ 40 and x₂ ≤ 25 must be included as separate constraints.",
              },
              {
                mistake: "Assuming maximums are always binding",
                fix: "In this case, Max A is not binding—only Max B is.",
              },
              {
                mistake: "Using ≥ instead of ≤ for maximums",
                fix: "Maximum limits are upper bounds, so use ≤.",
              },
              {
                mistake: "Not checking if maximums are feasible",
                fix: "Ensure maximums don't conflict with resource constraints.",
              },
              {
                mistake: "Ignoring the interaction with resource constraints",
                fix: "Maximums and resource constraints together define the feasible region.",
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

      {/* ===== SECTION 11: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Identify all maximum production limits.",
            "Add maximums as separate constraints (≤).",
            "Check if maximums are feasible with resources.",
            "Determine if maximums are binding at the optimum.",
            "Use the graphical method to visualize constraints.",
            "Evaluate objective at all feasible corner points.",
            "Document the source of maximum limits.",
            "Consider the profit impact of maximums.",
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

      {/* ===== SECTION 12: HINT SECTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💭</span>
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">Think About…</h3>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Observe carefully:</strong> The maximum limit for Product B
                is binding, but Product A's maximum is not. What would happen if
                the maximum for Product B increased to 35?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If Product A's maximum
                decreases to 20, what happens to the optimal solution? Which
                constraints become binding?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Abhronila's company has
                a market demand of at most 30 units of a product, but the factory
                could produce more. How would she formulate this as an LP constraint?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 13: MINI CHECKLIST ===== */}
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
              "✅ Formulate an LP model with maximum production limits",
              "✅ Add maximum limits as separate constraints",
              "✅ Identify binding vs non-binding maximums",
              "✅ Determine the optimal production mix with maximums",
              "✅ Analyze resource utilization with maximums",
              "✅ Understand the impact of maximums on profit",
              "✅ Apply the 7-step procedure to problems with maximums",
              "✅ Distinguish between minimum and maximum requirements",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">{item.split(" ")[0]}</span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 14: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <FAQTemplate
          title="Maximum Production Limits FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 15: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <PlainTextPrint
          content={noteText}
          title="Maximum Production Limits - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic25_note.txt"
        />
      </div>

      {/* ===== SECTION 16: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1250">
        <Teacher
          note={
            "Maximum production limits are the flip side of minimum requirements. I tell my students: 'Every product has a market limit—you can't sell more than customers want.' In this example, Product B's maximum is binding, meaning market demand is limiting production. Product A's maximum is not binding because Machine capacity is the real constraint. This distinction is crucial: it tells us whether to focus on increasing market demand (if the maximum is binding) or increasing production capacity (if the resource is binding). Susmita from Barrackpore once told me she used this framework to decide whether to invest in marketing or new machinery for her company. Remember: maximum limits often come from market demand, storage capacity, or strategic decisions. Understanding which constraints are binding helps you make better investment decisions."
          }
        />
      </div>
    </div>
  );
};

export default Topic25;