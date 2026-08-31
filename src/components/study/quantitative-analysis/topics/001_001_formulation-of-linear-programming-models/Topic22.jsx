import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic22_files/topic22_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic22_files/topic22_note.txt?raw";

/**
 * Topic22: Worked Example 16 – Capacity planning problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic22 component
 *
 * @purpose Provides a complete, step-by-step worked example of a capacity
 * planning problem, demonstrating how LP can be used to allocate production
 * across different capacity options (regular time, overtime, subcontracting)
 * to meet demand at minimum cost.
 *
 * @when_used After blending problems (Topic21), this topic introduces capacity
 * planning, a major application area in operations management and manufacturing.
 */
const Topic22 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 22
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 16
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 16: Capacity Planning Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Allocating production across capacity options to meet demand at minimum
          cost — a critical decision in operations management and manufacturing.
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
              A factory produces a single product. The factory can operate with
              <strong> three capacity levels</strong>:
              Regular time, Overtime, and Subcontracting.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Capacity & Cost Data</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Demand:</strong> <span className="font-mono text-blue-600 dark:text-blue-400">800 units</span></li>
                  <li><strong>Regular time:</strong> Capacity 500 units, Cost <span className="font-mono text-red-600 dark:text-red-400">₹200/unit</span></li>
                  <li><strong>Overtime:</strong> Capacity 200 units, Cost <span className="font-mono text-red-600 dark:text-red-400">₹250/unit</span></li>
                  <li><strong>Subcontracting:</strong> Capacity 300 units, Cost <span className="font-mono text-red-600 dark:text-red-400">₹300/unit</span></li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Policy Requirement</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  At least <span className="font-mono text-blue-600 dark:text-blue-400">50%</span> of production must be from Regular time.
                </p>
              </div>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                The company wants to <strong>minimize total production cost</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine how many units to produce
                using each capacity option to meet demand at minimum cost while
                respecting capacity limits and policy requirements.
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
              domain: "🏗️ Manufacturing",
              description: "Deciding between regular production, overtime, and outsourcing to meet orders.",
            },
            {
              domain: "👔 Workforce Planning",
              description: "Allocating staff across shifts, departments, or locations.",
            },
            {
              domain: "🚚 Logistics",
              description: "Choosing between internal fleet, leasing, and third-party carriers.",
            },
            {
              domain: "🏥 Healthcare",
              description: "Planning bed capacity, staff, and equipment in hospitals.",
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
            <strong>Key Insight:</strong> Capacity planning is a daily challenge
            for operations managers. LP helps them decide the most cost-effective
            way to meet demand while respecting capacity constraints and policies.
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
                  <li><strong>Goal:</strong> Minimize total production cost.</li>
                  <li><strong>Capacity options:</strong> Regular time, Overtime, Subcontracting.</li>
                  <li><strong>Demand:</strong> 800 units.</li>
                  <li><strong>Capacities:</strong> Regular 500, Overtime 200, Subcontracting 300.</li>
                  <li><strong>Policy:</strong> At least 50% Regular time.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 3 capacity options, demand, capacities, costs, policy requirement.
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
                  <p>x₁ = units produced in Regular time</p>
                  <p>x₂ = units produced in Overtime</p>
                  <p>x₃ = units produced by Subcontracting</p>
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
                  <p>Minimize Z = 200x₁ + 250x₂ + 300x₃</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Regular time cost = <span className="font-mono">₹200/unit</span></li>
                  <li>Overtime cost = <span className="font-mono">₹250/unit</span></li>
                  <li>Subcontracting cost = <span className="font-mono">₹300/unit</span></li>
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
                  <p>Demand: x₁ + x₂ + x₃ = 800</p>
                  <p>Regular: x₁ ≤ 500</p>
                  <p>Overtime: x₂ ≤ 200</p>
                  <p>Subcontracting: x₃ ≤ 300</p>
                  <p>Minimum Regular: x₁ ≥ 400</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Demand:</strong> Total production must meet 800 units.</li>
                  <li><strong>Regular:</strong> At most 500 units.</li>
                  <li><strong>Overtime:</strong> At most 200 units.</li>
                  <li><strong>Subcontracting:</strong> At most 300 units.</li>
                  <li><strong>Minimum Regular:</strong> At least 400 units (50% of 800).</li>
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 400, x₂ = 200, x₃ = 200</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Demand: 400+200+200 = 800 ✓
                      <br />
                      Regular: 400 ≤ 500 ✓, Minimum: 400 ≥ 400 ✓
                      <br />
                      Overtime: 200 ≤ 200 ✓
                      <br />
                      Subcontracting: 200 ≤ 300 ✓
                      <br />
                      Cost: 200(400)+250(200)+300(200) = 80,000+50,000+60,000 = 190,000
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
                  <p>Minimize Z = 200x₁ + 250x₂ + 300x₃</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Demand: x₁ + x₂ + x₃ = 800</p>
                  <p className="pl-4">Regular: x₁ ≤ 500</p>
                  <p className="pl-4">Overtime: x₂ ≤ 200</p>
                  <p className="pl-4">Subcontracting: x₃ ≤ 300</p>
                  <p className="pl-4">Minimum Regular: x₁ ≥ 400</p>
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
            Optimal Capacity Allocation
          </h2>
        </div>

        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 650 420"
            className="w-full h-auto"
            aria-label="Capacity allocation visualization"
            role="img"
          >
            <rect x="0" y="0" width="650" height="420" fill="none" />

            <text x="325" y="25" fontSize="16" fill="#475569" dark="#94a3b8" textAnchor="middle" fontWeight="bold">
              Optimal Capacity Allocation: 800 Units
            </text>

            {/* Regular time (500 units) */}
            <rect x="80" y="80" width="200" height="200" rx="8" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="180" y="180" fontSize="16" fill="#3b82f6" textAnchor="middle" fontWeight="bold">Regular Time</text>
            <text x="180" y="210" fontSize="14" fill="#3b82f6" textAnchor="middle">500 units (62.5%)</text>
            <text x="180" y="235" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">₹200/unit</text>
            <text x="180" y="260" fontSize="10" fill="#94a3b8" textAnchor="middle">Capacity: 500/500 (100%)</text>

            {/* Overtime (200 units) */}
            <rect x="300" y="80" width="200" height="200" rx="8" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2.5" />
            <text x="400" y="180" fontSize="16" fill="#22c55e" textAnchor="middle" fontWeight="bold">Overtime</text>
            <text x="400" y="210" fontSize="14" fill="#22c55e" textAnchor="middle">200 units (25%)</text>
            <text x="400" y="235" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">₹250/unit</text>
            <text x="400" y="260" fontSize="10" fill="#94a3b8" textAnchor="middle">Capacity: 200/200 (100%)</text>

            {/* Subcontracting (100 units) */}
            <rect x="520" y="80" width="100" height="200" rx="8" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="2.5" />
            <text x="570" y="170" fontSize="14" fill="#a855f7" textAnchor="middle" fontWeight="bold">Subcontract</text>
            <text x="570" y="195" fontSize="12" fill="#a855f7" textAnchor="middle">100 units (12.5%)</text>
            <text x="570" y="220" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">₹300/unit</text>
            <text x="570" y="245" fontSize="9" fill="#94a3b8" textAnchor="middle">Cap: 100/300 (33%)</text>

            {/* Cost summary */}
            <rect x="80" y="320" width="540" height="50" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
            <text x="350" y="345" fontSize="16" fill="#f59e0b" textAnchor="middle" fontWeight="bold">
              Total Cost = ₹180,000
            </text>
            <text x="350" y="365" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">
              (Regular: ₹100,000 + Overtime: ₹50,000 + Subcontracting: ₹30,000)
            </text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Optimal allocation: 500 units Regular time, 200 units Overtime, 100 units Subcontracting.
            Total cost = ₹180,000.
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: CAPACITY UTILIZATION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚙️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Capacity Utilization Analysis
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              option: "Regular Time",
              used: "500 units",
              available: "500 units",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              option: "Overtime",
              used: "200 units",
              available: "200 units",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              option: "Subcontracting",
              used: "100 units",
              available: "300 units",
              status: "Slack (200 units)",
              percentage: "33.3%",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.option}</h3>
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
            <strong>💡 Key Observation:</strong> Regular time and Overtime are{" "}
            <strong>binding</strong> (fully used), while Subcontracting has{" "}
            <strong>slack</strong> (200 units unused). This indicates that the
            company should consider expanding Regular or Overtime capacity if
            demand increases.
          </p>
        </div>
      </section>

      {/* ===== SECTION 6: COST COMPARISON ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💰</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Cost Comparison Analysis
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Capacity Option</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Cost per Unit</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Units Used</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Total Cost</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Average Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Regular Time</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹200</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">500</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹100,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹200</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Overtime</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹250</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">200</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹50,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹250</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Subcontracting</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹300</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">100</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹30,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">₹300</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/30">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">Total</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">—</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold">800</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">₹180,000</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold">₹225</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Key Insight:</strong> The average cost per unit is ₹225.
              Regular time is the cheapest (₹200), followed by Overtime (₹250),
              and Subcontracting is the most expensive (₹300). The optimal
              solution uses the cheapest options first.
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
              title: "Use cheapest capacity first",
              desc: "Regular time is cheapest, so use it first before Overtime or Subcontracting.",
            },
            {
              title: "Check all capacity limits",
              desc: "Each capacity option has a maximum limit that must be respected.",
            },
            {
              title: "Consider policy requirements",
              desc: "Minimum usage requirements may force using a particular option.",
            },
            {
              title: "Identify binding constraints",
              desc: "Binding constraints show which capacities are limiting.",
            },
            {
              title: "Calculate average cost",
              desc: "Average cost per unit helps evaluate the overall cost structure.",
            },
            {
              title: "Plan for demand changes",
              desc: "Capacity planning should consider demand variability.",
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
                mistake: "Not using cheapest capacity first",
                fix: "Always use Regular time before Overtime, and Overtime before Subcontracting.",
              },
              {
                mistake: "Forgetting the minimum Regular time requirement",
                fix: "x₁ ≥ 400 is a separate constraint that must be included.",
              },
              {
                mistake: "Using ≤ instead of = for demand",
                fix: "Demand must be exactly met, so use equality constraint.",
              },
              {
                mistake: "Not checking all capacity limits",
                fix: "Each capacity option has a maximum limit.",
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
            "List all capacity options with their costs and limits.",
            "Use equality for demand to ensure exact production.",
            "Include all capacity constraints.",
            "Add policy requirements as separate constraints.",
            "Use the cheapest capacity option first.",
            "Check which capacities are binding.",
            "Validate the solution with a feasible point.",
            "Consider demand variability in planning.",
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
                <strong>Observe carefully:</strong> Both Regular time and Overtime
                are fully used, but Subcontracting has slack. If demand increases
                to 900 units, how would the optimal solution change?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If the minimum Regular time
                requirement increases to 450 units, what happens to the optimal
                solution and cost?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu manages a
                factory in Barrackpore with regular production capacity of 600
                units, overtime capacity of 150 units, and subcontracting
                capacity of 200 units. Demand is 800 units. How would he
                formulate his capacity planning problem?
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
              "✅ Formulate a capacity planning LP model with multiple options",
              "✅ Include equality constraint for demand",
              "✅ Add capacity limits for each option",
              "✅ Include policy requirements as constraints",
              "✅ Identify binding vs non-binding capacity options",
              "✅ Determine the optimal capacity allocation",
              "✅ Calculate total cost and average cost per unit",
              "✅ Apply the 7-step procedure to capacity planning problems",
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
          title="Capacity Planning Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 13: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <PlainTextPrint
          content={noteText}
          title="Capacity Planning Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic22_note.txt"
        />
      </div>

      {/* ===== SECTION 14: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <Teacher
          note={
            "Capacity planning is a fundamental operations management problem. I tell my students: 'Every business faces this decision—how much capacity to build and how to use it.' The key insight here is the principle of using the cheapest capacity first (Regular time before Overtime before Subcontracting). This is intuitive but often forgotten in practice. The minimum Regular time requirement (50%) adds a policy constraint that forces a certain level of internal production—common in real businesses for quality, employment, or strategic reasons. Mahima from Jadavpur once told me she used this framework to help her family's manufacturing business optimize their production plan, reducing costs by 15%. Remember: when all resources are binding, the solution is perfectly efficient. Here, Regular time and Overtime are fully used—only Subcontracting has slack. This tells us that the company should consider expanding Regular or Overtime capacity if demand grows."
          }
        />
      </div>
    </div>
  );
};

export default Topic22;