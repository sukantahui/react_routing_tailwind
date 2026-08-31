import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic18_files/topic18_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic18_files/topic18_note.txt?raw";

/**
 * Topic18: Worked Example 12 – Workforce allocation problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic18 component
 *
 * @purpose Provides a complete, step-by-step worked example of a workforce
 * allocation problem, demonstrating how LP can be used to assign workers to
 * shifts to minimize cost while meeting staffing requirements.
 *
 * @when_used After transportation problems (Topic17), this topic introduces
 * a new application domain: human resource planning and shift scheduling.
 */
const Topic18 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 18
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 12
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 12: Workforce Allocation Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Assigning workers to shifts to minimize labor cost while meeting
          staffing requirements — a key LP application in human resource management.
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
              A company needs to assign workers to <strong>three shifts</strong>:
              Morning, Evening, and Night, to meet minimum staffing requirements.
            </p>

            <p className="text-gray-700 dark:text-gray-300 text-base mt-4">
              The company has <strong>two types of workers</strong>:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Full-time workers:</strong> Can work any shift, cost{" "}
                <span className="font-mono text-red-600 dark:text-red-400">₹1,200</span> per shift.
              </li>
              <li>
                <strong>Part-time workers:</strong> Can only work Morning and Evening shifts, cost{" "}
                <span className="font-mono text-red-600 dark:text-red-400">₹800</span> per shift.
              </li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Minimum Staff Requirements</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Morning: <span className="font-mono text-blue-600 dark:text-blue-400">8</span> workers</li>
                  <li>Evening: <span className="font-mono text-blue-600 dark:text-blue-400">6</span> workers</li>
                  <li>Night: <span className="font-mono text-blue-600 dark:text-blue-400">4</span> workers</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Worker Availability</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Full-time: <span className="font-mono text-blue-600 dark:text-blue-400">10</span> workers</li>
                  <li>Part-time: <span className="font-mono text-blue-600 dark:text-blue-400">8</span> workers</li>
                </ul>
              </div>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                The company wants to <strong>minimize total labor cost</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine how many full-time and part-time
                workers to assign to each shift to minimize total cost while meeting
                all staffing requirements and respecting worker availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: REAL-WORLD CONTEXT ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">👔</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "🏥 Hospital Staffing",
              description: "Assigning nurses and doctors to shifts to meet patient care requirements.",
            },
            {
              domain: "📞 Call Centers",
              description: "Scheduling agents to shifts to meet call volume and service level targets.",
            },
            {
              domain: "🏭 Manufacturing",
              description: "Allocating workers to production lines or shifts to meet output targets.",
            },
            {
              domain: "🛒 Retail",
              description: "Staffing stores with cashiers and floor associates during peak hours.",
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
            <strong>Key Insight:</strong> Workforce allocation is a daily challenge
            for managers across industries. LP provides an optimal way to balance
            cost, availability, and service levels.
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
                  <li><strong>Goal:</strong> Minimize total labor cost.</li>
                  <li><strong>Worker types:</strong> Full-time, Part-time.</li>
                  <li><strong>Shifts:</strong> Morning, Evening, Night.</li>
                  <li><strong>Requirements:</strong> Minimum staffing per shift.</li>
                  <li><strong>Availability:</strong> Max workers of each type.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 worker types, 3 shifts, staffing requirements, availability.
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
                  <p>x₁ = full-time workers assigned to Morning</p>
                  <p>x₂ = full-time workers assigned to Evening</p>
                  <p>x₃ = full-time workers assigned to Night</p>
                  <p>x₄ = part-time workers assigned to Morning</p>
                  <p>x₅ = part-time workers assigned to Evening</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  (Part-time cannot work Night)
                </p>
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
                  <p>Minimize Z = 1200(x₁ + x₂ + x₃) + 800(x₄ + x₅)</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Full-time cost per shift = <span className="font-mono">₹1,200</span></li>
                  <li>Part-time cost per shift = <span className="font-mono">₹800</span></li>
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
                  <p>Morning: x₁ + x₄ ≥ 8</p>
                  <p>Evening: x₂ + x₅ ≥ 6</p>
                  <p>Night: x₃ ≥ 4</p>
                  <p>Full-time availability: x₁ + x₂ + x₃ ≤ 10</p>
                  <p>Part-time availability: x₄ + x₅ ≤ 8</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Staffing:</strong> Minimum workers per shift.</li>
                  <li><strong>Availability:</strong> Maximum workers of each type.</li>
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
                  <p>x₁ ≥ 0, x₂ ≥ 0, x₃ ≥ 0, x₄ ≥ 0, x₅ ≥ 0</p>
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
                      Full-time: Morning=4, Evening=2, Night=4 (total 10)
                      <br />
                      Part-time: Morning=4, Evening=4 (total 8)
                      <br />
                      Morning: 4+4=8 ✓, Evening: 2+4=6 ✓, Night: 4 ✓
                      <br />
                      Cost = 1200(10) + 800(8) = 12,000 + 6,400 = 18,400
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
                  <p>Minimize Z = 1200(x₁ + x₂ + x₃) + 800(x₄ + x₅)</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Morning: x₁ + x₄ ≥ 8</p>
                  <p className="pl-4">Evening: x₂ + x₅ ≥ 6</p>
                  <p className="pl-4">Night: x₃ ≥ 4</p>
                  <p className="pl-4">Full-time: x₁ + x₂ + x₃ ≤ 10</p>
                  <p className="pl-4">Part-time: x₄ + x₅ ≤ 8</p>
                  <p className="pl-4">All variables ≥ 0</p>
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
            Optimal Allocation & Multiple Solutions
          </h2>
        </div>

        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 650 350"
            className="w-full h-auto"
            aria-label="Workforce allocation chart"
            role="img"
          >
            <rect x="0" y="0" width="650" height="350" fill="none" />

            <text x="325" y="25" fontSize="14" fill="#475569" dark="#94a3b8" textAnchor="middle" fontWeight="bold">
              Optimal Workforce Allocation (One Solution)
            </text>

            {/* Morning shift */}
            <rect x="80" y="80" width="120" height="40" rx="4" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
            <text x="140" y="95" fontSize="12" fill="#3b82f6" textAnchor="middle" fontWeight="bold">Morning (8)</text>
            <text x="140" y="112" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">FT: 0, PT: 8</text>

            {/* Evening shift */}
            <rect x="80" y="140" width="120" height="40" rx="4" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2" />
            <text x="140" y="155" fontSize="12" fill="#22c55e" textAnchor="middle" fontWeight="bold">Evening (6)</text>
            <text x="140" y="172" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">FT: 6, PT: 0</text>

            {/* Night shift */}
            <rect x="80" y="200" width="120" height="40" rx="4" fill="#a855f7" fillOpacity="0.3" stroke="#a855f7" strokeWidth="2" />
            <text x="140" y="215" fontSize="12" fill="#a855f7" textAnchor="middle" fontWeight="bold">Night (4)</text>
            <text x="140" y="232" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">FT: 4, PT: 0</text>

            {/* Worker type summaries */}
            <rect x="250" y="80" width="160" height="50" rx="4" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="1.5" />
            <text x="330" y="100" fontSize="12" fill="#ef4444" textAnchor="middle" fontWeight="bold">Full-time Used: 10</text>
            <text x="330" y="118" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Cost: 10 × 1,200 = ₹12,000</text>

            <rect x="250" y="145" width="160" height="50" rx="4" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="330" y="165" fontSize="12" fill="#f59e0b" textAnchor="middle" fontWeight="bold">Part-time Used: 8</text>
            <text x="330" y="183" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Cost: 8 × 800 = ₹6,400</text>

            {/* Total cost */}
            <rect x="250" y="210" width="160" height="40" rx="4" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
            <text x="330" y="235" fontSize="14" fill="#3b82f6" textAnchor="middle" fontWeight="bold">Total Cost = ₹18,400</text>

            {/* Multiple solutions note */}
            <text x="460" y="100" fontSize="11" fill="#475569" dark="#94a3b8">
              Multiple optimal solutions:
            </text>
            <text x="460" y="120" fontSize="10" fill="#475569" dark="#94a3b8">
              • FT: 0M, 6E, 4N; PT: 8M, 0E
            </text>
            <text x="460" y="140" fontSize="10" fill="#475569" dark="#94a3b8">
              • FT: 2M, 4E, 4N; PT: 6M, 2E
            </text>
            <text x="460" y="160" fontSize="10" fill="#475569" dark="#94a3b8">
              • FT: 4M, 2E, 4N; PT: 4M, 4E
            </text>
            <text x="460" y="180" fontSize="10" fill="#475569" dark="#94a3b8">
              Any combination with FT total=10,
            </text>
            <text x="460" y="200" fontSize="10" fill="#475569" dark="#94a3b8">
              PT total=8, and shift mins met.
            </text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            One optimal solution: Full-time: 0 Morning, 6 Evening, 4 Night; Part-time: 8 Morning, 0 Evening.
            Multiple alternative optima exist.
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: MULTIPLE OPTIMAL SOLUTIONS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔄</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Understanding Multiple Optimal Solutions
          </h2>
        </div>
        <div className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-5 border border-indigo-200 dark:border-indigo-900/30">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            This problem has <strong>multiple optimal solutions</strong> because
            there is flexibility in how Morning and Evening shifts are covered
            by full-time and part-time workers. As long as:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <li>Total full-time workers used = 10</li>
            <li>Total part-time workers used = 8</li>
            <li>Morning staffing ≥ 8 (x₁ + x₄ ≥ 8)</li>
            <li>Evening staffing ≥ 6 (x₂ + x₅ ≥ 6)</li>
            <li>Night staffing = 4 (x₃ = 4)</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
            The cost remains constant at ₹18,400 because all 18 workers are used
            and the cost per worker type is fixed.
          </p>
          <div className="mt-3 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>💡 Insight:</strong> Multiple optimal solutions provide
              <strong> flexibility</strong> in scheduling, allowing managers to
              consider other factors like worker preferences, skills, or training
              requirements.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Identify worker types and shift constraints",
              desc: "List which worker types can work which shifts.",
            },
            {
              title: "Use total worker usage",
              desc: "Often all workers are used in the optimal solution.",
            },
            {
              title: "Consider preference constraints",
              desc: "Workers may have shift preferences that can be modeled as constraints.",
            },
            {
              title: "Check for multiple optima",
              desc: "Flexibility in assignment often leads to multiple optimal solutions.",
            },
            {
              title: "Validate staffing requirements",
              desc: "Ensure all shifts have enough workers.",
            },
            {
              title: "Think about overtime",
              desc: "If workers can work extra hours, model can be extended.",
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

      {/* ===== SECTION 7: COMMON MISTAKES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
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
                mistake: "Forgetting that part-time cannot work Night",
                fix: "Ensure variables reflect shift constraints.",
              },
              {
                mistake: "Using ≤ instead of ≥ for staffing requirements",
                fix: "Staffing needs are minimums, so use ≥.",
              },
              {
                mistake: "Not checking total workers used",
                fix: "The optimal solution often uses all available workers.",
              },
              {
                mistake: "Assuming only one optimal solution",
                fix: "Look for multiple optimal solutions.",
              },
              {
                mistake: "Forgetting non-negativity",
                fix: "All variables ≥ 0.",
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

      {/* ===== SECTION 8: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out} animation-delay-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Clearly define worker types and shift eligibility.",
            "Use ≥ for minimum staffing requirements.",
            "Include availability constraints for each worker type.",
            "Check for multiple optimal solutions.",
            "Validate the solution by checking all constraints.",
            "Document the optimal allocation and cost.",
            "Consider worker preferences as additional constraints.",
            "Use the 7-step procedure consistently.",
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

      {/* ===== SECTION 9: HINT SECTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900/30 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💭</span>
            <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">Think About…</h3>
          </div>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Observe carefully:</strong> In the optimal solution,
                all 10 full-time and all 8 part-time workers are used. Why is
                it optimal to use all workers?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If part-time workers cost
                ₹900 instead of ₹800, what happens to the optimal allocation?
                Would the company still use all part-time workers?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Abhronila manages a
                call center in Ichapur with 15 full-time and 10 part-time agents.
                She has three shifts with varying call volumes. How would she
                use LP to schedule her agents?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 10: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
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
              "✅ Formulate a workforce allocation LP model with multiple worker types and shifts",
              "✅ Include shift eligibility constraints (part-time limitations)",
              "✅ Use ≥ constraints for minimum staffing requirements",
              "✅ Identify multiple optimal solutions",
              "✅ Calculate total labor cost",
              "✅ Apply the 7-step procedure to workforce allocation problems",
              "✅ Understand the flexibility provided by multiple optimal solutions",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">{item.split(" ")[0]}</span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 11: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
        <FAQTemplate
          title="Workforce Allocation Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 12: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <PlainTextPrint
          content={noteText}
          title="Workforce Allocation Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic18_note.txt"
        />
      </div>

      {/* ===== SECTION 13: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <Teacher
          note={
            "Workforce allocation is a daily reality for managers. I tell my students: 'This example shows how LP can save thousands of rupees in labor costs.' The key insight here is the multiple optimal solutions—a common feature in workforce scheduling that provides flexibility. In practice, managers can use this flexibility to accommodate worker preferences, training needs, or special requests. Mamata from Barrackpore once told me she used a similar model to schedule her restaurant staff, reducing labor costs by 15% while maintaining service levels. Remember: the optimal solution uses all available workers because the total demand matches supply. If there were excess workers, the model would leave some idle. Always check the feasibility of your solution and look for alternative optima—they often provide valuable flexibility."
          }
        />
      </div>
    </div>
  );
};

export default Topic18;