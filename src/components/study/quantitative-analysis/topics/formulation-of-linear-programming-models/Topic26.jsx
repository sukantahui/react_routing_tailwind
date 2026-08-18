import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic26_files/topic26_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic26_files/topic26_note.txt?raw";

/**
 * Topic26: Worked Example 20 – Problem involving both minimum and maximum requirements
 *
 * @component
 * @returns {JSX.Element} The rendered Topic26 component
 *
 * @purpose Provides a complete, step-by-step worked example of a production
 * problem with both minimum production requirements (lower bounds) and maximum
 * production limits (upper bounds), demonstrating how to handle both types of
 * constraints simultaneously.
 *
 * @when_used After exploring minimum requirements (Topic24) and maximum limits
 * (Topic25), this topic combines both concepts to represent real-world production
 * scenarios with contractual obligations and market demand limits.
 */
const Topic26 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 26
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 20
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 20: Problem Involving Both Minimum and Maximum Requirements
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Balancing contractual obligations (minimums) and market demand limits
          (maximums) — the complete picture of production planning constraints.
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
                <strong>Profit per unit:</strong> Product A ={" "}
                <span className="font-mono text-green-600 dark:text-green-400">₹45</span>,
                Product B = <span className="font-mono text-green-600 dark:text-green-400">₹55</span>
              </li>
            </ul>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Minimum Requirements</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Product A: At least <span className="font-mono text-blue-600 dark:text-blue-400">15 units</span> (Contract)</li>
                  <li>Product B: At least <span className="font-mono text-blue-600 dark:text-blue-400">10 units</span> (Contract)</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Maximum Limits</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Product A: At most <span className="font-mono text-blue-600 dark:text-blue-400">35 units</span> (Market demand)</li>
                  <li>Product B: At most <span className="font-mono text-blue-600 dark:text-blue-400">30 units</span> (Market demand)</li>
                </ul>
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
                resource constraints, minimum requirements, and maximum limits.
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
              domain: "📄 Contract Manufacturing",
              description: "Meeting minimum order quantities while respecting production and market constraints.",
            },
            {
              domain: "📊 Production Planning",
              description: "Balancing contractual obligations with market demand limits.",
            },
            {
              domain: "🏭 Resource Allocation",
              description: "Allocating resources to meet both minimums and maximums.",
            },
            {
              domain: "⚖️ Policy Compliance",
              description: "Meeting regulatory requirements while respecting capacity limits.",
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
            <strong>Key Insight:</strong> Real-world production problems almost
            always involve <strong>both minimum and maximum constraints</strong>.
            Companies must fulfill contracts (minimums) while respecting market
            demand (maximums) and resource limits.
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
                  <li><strong>Resources:</strong> Labor (200), Machine (150), Material (180).</li>
                  <li><strong>Minimums:</strong> A ≥ 15, B ≥ 10.</li>
                  <li><strong>Maximums:</strong> A ≤ 35, B ≤ 30.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 products, 3 resource constraints, 2 minimums, 2 maximums.
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
                  <p>Maximize Z = 45x₁ + 55x₂</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Profit A = <span className="font-mono">₹45</span></li>
                  <li>Profit B = <span className="font-mono">₹55</span></li>
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
                  <p>Min A: x₁ ≥ 15</p>
                  <p>Max A: x₁ ≤ 35</p>
                  <p>Min B: x₂ ≥ 10</p>
                  <p>Max B: x₂ ≤ 30</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Resources:</strong> Labor, Machine, Material limits.</li>
                  <li><strong>Minimums:</strong> A ≥ 15, B ≥ 10 (lower bounds).</li>
                  <li><strong>Maximums:</strong> A ≤ 35, B ≤ 30 (upper bounds).</li>
                </ul>
                <div className="mt-2 bg-yellow-50/60 dark:bg-yellow-950/30 p-2 rounded border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    💡 This problem has <strong>7 constraints</strong> (3 resources,
                    2 minimums, 2 maximums) — the most complex LP formulation so far!
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
                      Min A: 20 ≥ 15 ✓, Max A: 20 ≤ 35 ✓
                      <br />
                      Min B: 15 ≥ 10 ✓, Max B: 15 ≤ 30 ✓
                      <br />
                      Profit: 45(20)+55(15) = 900+825 = ₹1,725
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
                  <p>Maximize Z = 45x₁ + 55x₂</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Labor: 3x₁ + 4x₂ ≤ 200</p>
                  <p className="pl-4">Machine: 2x₁ + 3x₂ ≤ 150</p>
                  <p className="pl-4">Material: 4x₁ + 2x₂ ≤ 180</p>
                  <p className="pl-4">Min A: x₁ ≥ 15</p>
                  <p className="pl-4">Max A: x₁ ≤ 35</p>
                  <p className="pl-4">Min B: x₂ ≥ 10</p>
                  <p className="pl-4">Max B: x₂ ≤ 30</p>
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
            aria-label="Graphical solution for both minimum and maximum requirements"
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
            <text x="65" y="100" fontSize="10" fill="#94a3b8">50</text>

            {/* Labor: 3x₁ + 4x₂ = 200 => x₂ = 50 - 0.75x₁ */}
            <line x1="80" y1="400" x2="280" y2="200" stroke="#ef4444" strokeWidth="2.5" />
            <text x="285" y="195" fontSize="11" fill="#ef4444" fontWeight="bold">Labor</text>

            {/* Machine: 2x₁ + 3x₂ = 150 => x₂ = 50 - 0.667x₁ */}
            <line x1="80" y1="400" x2="230" y2="200" stroke="#22c55e" strokeWidth="2.5" />
            <text x="235" y="195" fontSize="11" fill="#22c55e" fontWeight="bold">Machine</text>

            {/* Material: 4x₁ + 2x₂ = 180 => x₂ = 90 - 2x₁ */}
            <line x1="80" y1="400" x2="170" y2="250" stroke="#a855f7" strokeWidth="2.5" />
            <text x="175" y="245" fontSize="11" fill="#a855f7" fontWeight="bold">Material</text>

            {/* Min A: x₁ = 15 */}
            <line x1="180" y1="40" x2="180" y2="400" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            <text x="185" y="30" fontSize="11" fill="#f59e0b" fontWeight="bold">Min A</text>

            {/* Max A: x₁ = 35 */}
            <line x1="280" y1="40" x2="280" y2="400" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            <text x="285" y="30" fontSize="11" fill="#f59e0b" fontWeight="bold">Max A</text>

            {/* Min B: x₂ = 10 */}
            <line x1="80" y1="340" x2="600" y2="340" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            <text x="610" y="335" fontSize="11" fill="#f59e0b" fontWeight="bold">Min B</text>

            {/* Max B: x₂ = 30 */}
            <line x1="80" y1="220" x2="600" y2="220" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            <text x="610" y="215" fontSize="11" fill="#f59e0b" fontWeight="bold">Max B</text>

            {/* Feasible region */}
            <polygon
              points="180,340 180,220 230,220 280,200 280,340"
              fill="#3b82f6"
              fillOpacity="0.12"
              stroke="#3b82f6"
              strokeWidth="2.5"
            >
              <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="4s" repeatCount="indefinite" />
            </polygon>

            <text x="230" y="290" fontSize="14" fill="#3b82f6" fontWeight="bold">Feasible</text>
            <text x="230" y="310" fontSize="14" fill="#3b82f6" fontWeight="bold">Region</text>

            {/* Corner points */}
            {/* (15,10) */}
            <circle cx="180" cy="340" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="190" y="330" fontSize="9" fill="#475569" dark="#94a3b8">(15,10)</text>

            {/* (15,30) */}
            <circle cx="180" cy="220" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <text x="190" y="215" fontSize="9" fill="#475569" dark="#94a3b8">(15,30)</text>

            {/* (26.67,30) - Optimal! */}
            <circle cx="230" cy="220" r="9" fill="#22c55e" stroke="white" strokeWidth="3">
              <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="220" y="205" fontSize="11" fill="#22c55e" fontWeight="bold">★ (26.67,30)</text>
            <text x="220" y="250" fontSize="9" fill="#22c55e">Optimal</text>

            {/* (35,20) */}
            <circle cx="280" cy="240" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <text x="290" y="235" fontSize="9" fill="#475569" dark="#94a3b8">(35,20)</text>

            {/* (35,10) */}
            <circle cx="280" cy="340" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1.5s" repeatCount="indefinite" />
            </circle>
            <text x="290" y="330" fontSize="9" fill="#475569" dark="#94a3b8">(35,10)</text>

            {/* Objective function line at optimum */}
            <line x1="180" y1="370" x2="280" y2="200" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4">
              <animate attributeName="y1" values="370;360;370" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="200;190;200" dur="3s" repeatCount="indefinite" />
            </line>
            <text x="290" y="195" fontSize="10" fill="#f59e0b" fontWeight="bold">Z = 45x₁ + 55x₂</text>

            {/* Arrow showing profit direction */}
            <polygon points="520,320 540,305 540,335" fill="#f59e0b">
              <animate attributeName="transform" values="translate(0,0);translate(-6,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="545" y="325" fontSize="11" fill="#f59e0b" fontWeight="bold">Max Profit</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The feasible region is bounded by resource constraints, minimums, and maximums.
            The optimal solution is at (26.67, 30) with profit = ₹2,850.
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
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Profit (Z = 45x₁ + 55x₂)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">A</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">15</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹1,225</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">B</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">15</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">30</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹2,325</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/30">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">C</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">26.67</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">30</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">₹2,850</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">★ OPTIMAL</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">D</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">35</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">20</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹2,675</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">E</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">35</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹2,125</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/50">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Optimal Solution:</strong> Produce{" "}
              <span className="font-bold">26.67 units of Product A</span> and{" "}
              <span className="font-bold">30 units of Product B</span>.
              Total profit = <span className="font-bold">₹2,850</span>.
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
              used: "3(26.67)+4(30) = 80+120 = 200 hrs",
              available: "200 hrs",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Machine",
              used: "2(26.67)+3(30) = 53.33+90 = 143.33 hrs",
              available: "150 hrs",
              status: "Slack (6.67 hrs)",
              percentage: "95.6%",
            },
            {
              resource: "Material",
              used: "4(26.67)+2(30) = 106.67+60 = 166.67 units",
              available: "180 units",
              status: "Slack (13.33 units)",
              percentage: "92.6%",
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
            <strong>💡 Key Observation:</strong> Labor is <strong>binding</strong>
            (fully used), while Machine and Material have <strong>slack</strong>.
            The Maximum B limit is also binding (x₂ = 30). This means the company
            is constrained by both Labor capacity and the market demand limit for
            Product B.
          </p>
        </div>
      </section>

      {/* ===== SECTION 7: BOUND ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Minimum & Maximum Analysis
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-900/30">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Product A</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Minimum:</strong> ≥ 15 units</li>
              <li><strong>Maximum:</strong> ≤ 35 units</li>
              <li><strong>Optimal:</strong> 26.67 units</li>
              <li><strong>Min Status:</strong> Not binding (26.67 {`>`} 15)</li>
              <li><strong>Max Status:</strong> Not binding (26.67 {`<`} 35)</li>
            </ul>
          </div>
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Product B</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Minimum:</strong> ≥ 10 units</li>
              <li><strong>Maximum:</strong> ≤ 30 units</li>
              <li><strong>Optimal:</strong> 30 units</li>
              <li><strong>Min Status:</strong> Not binding (30 {`>`} 10)</li>
              <li><strong>Max Status:</strong> Binding ✓ (30 = 30)</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> The maximum limit for Product B is{" "}
            <strong>binding</strong>, while all other bounds (Min A, Max A, Min B)
            are <strong>not binding</strong>. This means the company would like
            to produce more of Product B, but market demand limits prevent it.
            Product A is not at either bound because Labor capacity is the
            limiting factor.
          </p>
        </div>
      </section>

      {/* ===== SECTION 8: SUMMARY OF BINDING CONSTRAINTS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Summary of Binding Constraints
          </h2>
        </div>
        <div className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-5 border border-indigo-200 dark:border-indigo-900/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-300">Binding Constraints</h4>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li><span className="font-mono text-red-500">Labor</span>: 200/200 hours used</li>
                <li><span className="font-mono text-red-500">Max B</span>: 30/30 units (market demand)</li>
              </ul>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-2">
                These constraints limit production. Expanding either would increase profit.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-300">Non-Binding Constraints</h4>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li><span className="font-mono text-green-500">Machine</span>: 143.33/150 (slack: 6.67)</li>
                <li><span className="font-mono text-green-500">Material</span>: 166.67/180 (slack: 13.33)</li>
                <li><span className="font-mono text-green-500">Min A</span>: 26.67 ≥ 15 (excess: 11.67)</li>
                <li><span className="font-mono text-green-500">Max A</span>: 26.67 ≤ 35 (slack: 8.33)</li>
                <li><span className="font-mono text-green-500">Min B</span>: 30 ≥ 10 (excess: 20)</li>
              </ul>
              <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                These constraints have slack. Expanding them would not increase profit.
              </p>
            </div>
          </div>
          <div className="mt-4 bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Key Takeaway:</strong> In this problem, <strong>2 out of 7 constraints</strong> are binding.
              The company should focus on expanding Labor capacity and/or increasing
              the maximum demand limit for Product B to improve profit.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 9: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out} animation-delay-800">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Include all bounds explicitly",
              desc: "Minimums (≥) and maximums (≤) are separate constraints.",
            },
            {
              title: "Check which bounds are binding",
              desc: "Understanding which constraints limit production guides investment.",
            },
            {
              title: "Use resource efficiency metrics",
              desc: "Profit per resource unit helps identify the most profitable products.",
            },
            {
              title: "Validate with all constraints",
              desc: "Ensure all minimums and maximums are satisfied.",
            },
            {
              title: "Consider the interaction of bounds",
              desc: "Minimums and maximums together define the feasible range.",
            },
            {
              title: "Document the source of each bound",
              desc: "Clearly state whether each bound comes from contracts or market limits.",
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
                mistake: "Forgetting a bound (minimum or maximum)",
                fix: "List all minimums and maximums before writing equations.",
              },
              {
                mistake: "Using wrong inequality direction",
                fix: "Minimums use ≥, maximums use ≤.",
              },
              {
                mistake: "Assuming all bounds are binding",
                fix: "Some bounds may have slack—check utilization.",
              },
              {
                mistake: "Not checking feasibility of bounds",
                fix: "Ensure minimums don't exceed maximums for the same product.",
              },
              {
                mistake: "Ignoring the interaction of bounds",
                fix: "The feasible region is defined by all constraints together.",
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
            "Identify all minimums and maximums for each product.",
            "Add minimums as ≥ constraints, maximums as ≤ constraints.",
            "Check that minimums do not exceed maximums.",
            "Use the graphical method to visualize the feasible region.",
            "Evaluate objective at all feasible corner points.",
            "Identify which bounds are binding at the optimum.",
            "Document the source of each bound (contract, market, etc.).",
            "Consider the profit impact of each bound.",
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
                is binding, but the minimum for Product A is not. What does this
                tell us about market demand and contracts?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If the minimum requirement
                for Product A increases to 25, what happens to the optimal solution?
                Which constraints become binding?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Mahima runs a factory
                where she has contracts to produce minimum quantities of two
                products, but market demand limits her sales. She has limited
                resources. How would she formulate this as an LP problem?
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
              "✅ Formulate an LP model with both minimum and maximum requirements",
              "✅ Add minimums as ≥ constraints and maximums as ≤ constraints",
              "✅ Identify binding vs non-binding bounds",
              "✅ Determine the optimal production mix with both bounds",
              "✅ Analyze resource utilization with both bounds",
              "✅ Understand which constraints limit profit",
              "✅ Apply the 7-step procedure to problems with multiple constraint types",
              "✅ Distinguish between contractual obligations and market limits",
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
          title="Both Minimum and Maximum Requirements FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 15: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <PlainTextPrint
          content={noteText}
          title="Both Minimum and Maximum Requirements - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic26_note.txt"
        />
      </div>

      {/* ===== SECTION 16: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1250">
        <Teacher
          note={
            "This example represents the most realistic production planning scenario—where both minimums (contracts) and maximums (market demand) coexist. I tell my students: 'Real-world production is never just about maximizing profit; you have obligations and limits.' The key insight here is that only two constraints are binding: Labor and Max B. Everything else has slack. This tells the company exactly where to focus: increase Labor capacity or increase the market demand limit for Product B. Abhronila from Ichapur once told me she used this exact framework to help her company negotiate better contracts—they identified that the maximum limit for their most profitable product was the bottleneck. Remember: in complex problems with many constraints, the binding constraints are your true bottlenecks. Identify them, and you know where to invest for maximum impact. This example combines everything we've learned so far—it's the most complete production planning problem."
          }
        />
      </div>
    </div>
  );
};

export default Topic26;