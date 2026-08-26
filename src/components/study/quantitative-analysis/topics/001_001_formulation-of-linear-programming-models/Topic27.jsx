import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic27_files/topic27_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic27_files/topic27_note.txt?raw";

/**
 * Topic27: Worked Example 21 – Maximization problem from a social context
 *
 * @component
 * @returns {JSX.Element} The rendered Topic27 component
 *
 * @purpose Provides a complete, step-by-step worked example of a maximization
 * problem from a social sector context, demonstrating how LP can be used to
 * maximize social impact (QALYs) rather than profit, with equity and capacity
 * constraints.
 *
 * @when_used After both minimum and maximum requirements (Topic26), this topic
 * introduces a new application domain: social sector problems like public health,
 * education, and community development.
 */
const Topic27 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 27
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 21
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 21: Maximization Problem from a Social Context
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Optimizing social impact — applying LP to public health, education,
          and community development challenges.
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
              A public health organization operates{" "}
              <strong>two types of health programs</strong> in a rural district:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300 text-base">
              <li><strong>Program X:</strong> Preventive care (vaccination drives, health education)</li>
              <li><strong>Program Y:</strong> Curative care (clinic operations, treatment)</li>
            </ul>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Resource</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Program X</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Program Y</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Available</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Healthcare Workers</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">120 person-months</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Budget (₹ lakhs)</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1.5</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">80</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Medical Supplies</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">1</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-medium">180 units</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Social Impact per unit:</strong> Program X ={" "}
                <span className="font-mono text-green-600 dark:text-green-400">500 QALYs</span>,
                Program Y = <span className="font-mono text-green-600 dark:text-green-400">700 QALYs</span>
              </li>
            </ul>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Equity Constraints</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Program X: At least <span className="font-mono text-blue-600 dark:text-blue-400">10 units</span></li>
                  <li>Program Y: At least <span className="font-mono text-blue-600 dark:text-blue-400">8 units</span></li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <h4 className="font-semibold text-gray-900 dark:text-white">Capacity Constraints</h4>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Program X: At most <span className="font-mono text-blue-600 dark:text-blue-400">25 units</span></li>
                  <li>Program Y: At most <span className="font-mono text-blue-600 dark:text-blue-400">30 units</span></li>
                </ul>
              </div>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                The organization wants to <strong>maximize total social impact</strong> (QALYs).
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal number of units
                of each program to implement to maximize total QALYs, subject to
                resource constraints, equity minimums, and capacity maximums.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: SOCIAL CONTEXT VS BUSINESS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🤝</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Social Sector vs Business Sector
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              type: "Business Sector",
              objective: "Maximize profit (₹)",
              constraints: "Resource limits, demand, capacity",
              goal: "Financial return for shareholders",
              example: "Manufacturing, retail, finance",
            },
            {
              type: "Social Sector",
              objective: "Maximize social welfare (QALYs, lives saved)",
              constraints: "Resources, equity, access",
              goal: "Social good for communities",
              example: "Public health, education, development",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.type}</h3>
              <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p><span className="font-medium">Objective:</span> {item.objective}</p>
                <p><span className="font-medium">Constraints:</span> {item.constraints}</p>
                <p><span className="font-medium">Goal:</span> {item.goal}</p>
                <p><span className="font-medium">Example:</span> {item.example}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> The same LP framework applies to both
            sectors, but the <strong>objective function</strong> changes from
            profit to social impact. The mathematical structure is identical.
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
                  <li><strong>Goal:</strong> Maximize total social impact (QALYs).</li>
                  <li><strong>Programs:</strong> X and Y (2 programs).</li>
                  <li><strong>Resources:</strong> Healthcare workers (120), Budget (80 lakhs), Medical Supplies (180).</li>
                  <li><strong>Minimums:</strong> X ≥ 10, Y ≥ 8 (equity).</li>
                  <li><strong>Maximums:</strong> X ≤ 25, Y ≤ 30 (capacity).</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 programs, 3 resources, 2 minimums, 2 maximums, social impact objective.
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
                  <p>x₁ = number of units of Program X implemented</p>
                  <p>x₂ = number of units of Program Y implemented</p>
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
                  <p>Maximize Z = 500x₁ + 700x₂</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Program X impact = <span className="font-mono">500 QALYs</span></li>
                  <li>Program Y impact = <span className="font-mono">700 QALYs</span></li>
                </ul>
                <div className="mt-2 bg-green-50/40 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    🌍 QALY = Quality-Adjusted Life Year, a measure of health impact.
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
                  <p>Healthcare: 2x₁ + 3x₂ ≤ 120</p>
                  <p>Budget: 100,000x₁ + 150,000x₂ ≤ 8,000,000</p>
                  <p>Medical: 2x₁ + x₂ ≤ 180</p>
                  <p>Min X: x₁ ≥ 10</p>
                  <p>Max X: x₁ ≤ 25</p>
                  <p>Min Y: x₂ ≥ 8</p>
                  <p>Max Y: x₂ ≤ 30</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Resources:</strong> Healthcare workers, Budget, Medical Supplies.</li>
                  <li><strong>Equity:</strong> Minimums for both programs.</li>
                  <li><strong>Capacity:</strong> Maximums for both programs.</li>
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 15, x₂ = 20</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Healthcare: 2(15)+3(20) = 30+60 = 90 ≤ 120 ✓
                      <br />
                      Budget: 100,000(15)+150,000(20) = 1,500,000+3,000,000 = 4,500,000 ≤ 8,000,000 ✓
                      <br />
                      Medical: 2(15)+1(20) = 30+20 = 50 ≤ 180 ✓
                      <br />
                      Min X: 15 ≥ 10 ✓, Max X: 15 ≤ 25 ✓
                      <br />
                      Min Y: 20 ≥ 8 ✓, Max Y: 20 ≤ 30 ✓
                      <br />
                      Impact: 500(15)+700(20) = 7,500+14,000 = 21,500 QALYs
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
                  <p>Maximize Z = 500x₁ + 700x₂</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Healthcare: 2x₁ + 3x₂ ≤ 120</p>
                  <p className="pl-4">Budget: 100,000x₁ + 150,000x₂ ≤ 8,000,000</p>
                  <p className="pl-4">Medical Supplies: 2x₁ + x₂ ≤ 180</p>
                  <p className="pl-4">Min X: x₁ ≥ 10</p>
                  <p className="pl-4">Max X: x₁ ≤ 25</p>
                  <p className="pl-4">Min Y: x₂ ≥ 8</p>
                  <p className="pl-4">Max Y: x₂ ≤ 30</p>
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
            aria-label="Graphical solution for social context problem"
            role="img"
          >
            <rect x="0" y="0" width="650" height="450" fill="none" />

            {/* Axes */}
            <line x1="80" y1="400" x2="600" y2="400" stroke="#94a3b8" strokeWidth="2" />
            <line x1="80" y1="400" x2="80" y2="40" stroke="#94a3b8" strokeWidth="2" />
            <text x="610" y="410" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Program X (x₁)</text>
            <text x="50" y="30" fontSize="14" fill="#475569" dark="#94a3b8" fontWeight="bold">Program Y (x₂)</text>

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

            {/* Healthcare: 2x₁ + 3x₂ = 120 => x₂ = 40 - 0.667x₁ */}
            <line x1="80" y1="400" x2="280" y2="240" stroke="#ef4444" strokeWidth="2.5" />
            <text x="285" y="235" fontSize="11" fill="#ef4444" fontWeight="bold">Healthcare</text>

            {/* Budget: 2x₁ + 3x₂ = 160 (simplified) => x₂ = 53.33 - 0.667x₁ */}
            <line x1="80" y1="400" x2="400" y2="200" stroke="#22c55e" strokeWidth="2.5" />
            <text x="405" y="195" fontSize="11" fill="#22c55e" fontWeight="bold">Budget</text>

            {/* Medical: 2x₁ + x₂ = 180 => x₂ = 180 - 2x₁ */}
            <line x1="80" y1="400" x2="400" y2="400" stroke="#a855f7" strokeWidth="2.5" strokeDasharray="6,4" />
            <text x="410" y="395" fontSize="11" fill="#a855f7" fontWeight="bold">Medical</text>

            {/* Min X: x₁ = 10 */}
            <line x1="160" y1="40" x2="160" y2="400" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            <text x="165" y="30" fontSize="11" fill="#f59e0b" fontWeight="bold">Min X</text>

            {/* Max X: x₁ = 25 */}
            <line x1="240" y1="40" x2="240" y2="400" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            <text x="245" y="30" fontSize="11" fill="#f59e0b" fontWeight="bold">Max X</text>

            {/* Min Y: x₂ = 8 */}
            <line x1="80" y1="360" x2="600" y2="360" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            <text x="610" y="355" fontSize="11" fill="#f59e0b" fontWeight="bold">Min Y</text>

            {/* Max Y: x₂ = 30 */}
            <line x1="80" y1="280" x2="600" y2="280" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            <text x="610" y="275" fontSize="11" fill="#f59e0b" fontWeight="bold">Max Y</text>

            {/* Feasible region */}
            <polygon
              points="160,360 160,280 200,280 240,240 240,360"
              fill="#3b82f6"
              fillOpacity="0.12"
              stroke="#3b82f6"
              strokeWidth="2.5"
            >
              <animate attributeName="fillOpacity" values="0.08;0.16;0.08" dur="4s" repeatCount="indefinite" />
            </polygon>

            <text x="200" y="310" fontSize="14" fill="#3b82f6" fontWeight="bold">Feasible</text>
            <text x="200" y="330" fontSize="14" fill="#3b82f6" fontWeight="bold">Region</text>

            {/* Corner points */}
            {/* (10,8) */}
            <circle cx="160" cy="360" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="170" y="350" fontSize="9" fill="#475569" dark="#94a3b8">(10,8)</text>

            {/* (10,30) */}
            <circle cx="160" cy="280" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <text x="170" y="275" fontSize="9" fill="#475569" dark="#94a3b8">(10,30)</text>

            {/* (15,30) */}
            <circle cx="200" cy="280" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1s" repeatCount="indefinite" />
            </circle>
            <text x="210" y="275" fontSize="9" fill="#475569" dark="#94a3b8">(15,30)</text>

            {/* (25,23.33) - Optimal! */}
            <circle cx="240" cy="240" r="9" fill="#22c55e" stroke="white" strokeWidth="3">
              <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="230" y="225" fontSize="11" fill="#22c55e" fontWeight="bold">★ (25,23.33)</text>
            <text x="230" y="270" fontSize="9" fill="#22c55e">Optimal</text>

            {/* (25,8) */}
            <circle cx="240" cy="360" r="7" fill="#3b82f6" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="5;7;5" dur="3s" begin="1.5s" repeatCount="indefinite" />
            </circle>
            <text x="250" y="350" fontSize="9" fill="#475569" dark="#94a3b8">(25,8)</text>

            {/* Objective function line at optimum */}
            <line x1="160" y1="390" x2="280" y2="240" stroke="#f59e0b" strokeWidth="2" strokeDasharray="8,4">
              <animate attributeName="y1" values="390;380;390" dur="3s" repeatCount="indefinite" />
              <animate attributeName="y2" values="240;230;240" dur="3s" repeatCount="indefinite" />
            </line>
            <text x="290" y="235" fontSize="10" fill="#f59e0b" fontWeight="bold">Z = 500x₁ + 700x₂</text>

            {/* Arrow showing profit direction */}
            <polygon points="520,320 540,305 540,335" fill="#f59e0b">
              <animate attributeName="transform" values="translate(0,0);translate(-6,0);translate(0,0)" dur="2s" repeatCount="indefinite" />
            </polygon>
            <text x="545" y="325" fontSize="11" fill="#f59e0b" fontWeight="bold">Max Social Impact</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The feasible region is bounded by resource constraints, equity minimums,
            and capacity maximums. The optimal solution is at (25, 23.33) with
            impact = 28,833.33 QALYs.
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
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₁ (Program X)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">x₂ (Program Y)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Impact (Z = 500x₁ + 700x₂)</th>
                  <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">A</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">8</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10,600 QALYs</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">B</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">30</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">26,000 QALYs</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">C</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">15</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">30</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">28,500 QALYs</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
                <tr className="bg-green-50 dark:bg-green-950/30">
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-bold text-green-600 dark:text-green-400">D</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">25</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">23.33</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">28,833.33 QALYs</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center font-bold text-green-600 dark:text-green-400">★ OPTIMAL</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">E</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">25</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">8</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">18,100 QALYs</td>
                  <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center text-gray-500">Not optimal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/50">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Optimal Solution:</strong> Implement{" "}
              <span className="font-bold">25 units of Program X</span> and{" "}
              <span className="font-bold">23.33 units of Program Y</span>.
              Total social impact = <span className="font-bold">28,833.33 QALYs</span>.
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
              resource: "Healthcare Workers",
              used: "2(25)+3(23.33) = 50+70 = 120 person-months",
              available: "120 person-months",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              resource: "Budget (₹ lakhs)",
              used: "1(25)+1.5(23.33) = 25+35 = 60 lakhs",
              available: "80 lakhs",
              status: "Slack (20 lakhs)",
              percentage: "75%",
            },
            {
              resource: "Medical Supplies",
              used: "2(25)+1(23.33) = 50+23.33 = 73.33 units",
              available: "180 units",
              status: "Slack (106.67 units)",
              percentage: "40.7%",
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
            <strong>💡 Key Observation:</strong> Healthcare workers are the{" "}
            <strong>binding constraint</strong> (fully used). Budget and Medical
            Supplies have <strong>slack</strong>. The Maximum X limit is also
            binding (x₁ = 25). This means the organization is constrained by both
            healthcare worker availability and the capacity limit for Program X.
          </p>
        </div>
      </section>

      {/* ===== SECTION 7: BOUND ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Equity & Capacity Analysis
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-900/30">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Program X</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Minimum (Equity):</strong> ≥ 10 units</li>
              <li><strong>Maximum (Capacity):</strong> ≤ 25 units</li>
              <li><strong>Optimal:</strong> 25 units</li>
              <li><strong>Min Status:</strong> Not binding (25 {`&gt;`} 10)</li>
              <li><strong>Max Status:</strong> Binding ✓ (25 = 25)</li>
            </ul>
          </div>
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Program Y</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Minimum (Equity):</strong> ≥ 8 units</li>
              <li><strong>Maximum (Capacity):</strong> ≤ 30 units</li>
              <li><strong>Optimal:</strong> 23.33 units</li>
              <li><strong>Min Status:</strong> Not binding (23.33 {`&gt;`} 8)</li>
              <li><strong>Max Status:</strong> Not binding (23.33 {`<`} 30)</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> The maximum limit for Program X is{" "}
            <strong>binding</strong>, while all equity minimums and the maximum
            for Program Y are <strong>not binding</strong>. This means the
            organization would like to implement more of Program X, but capacity
            limits prevent it. Program Y is limited by healthcare worker
            availability, not by its capacity maximum.
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
              title: "Use social impact metrics",
              desc: "QALYs, DALYs, lives saved, or other welfare measures are common objectives.",
            },
            {
              title: "Include equity constraints",
              desc: "Minimums ensure underserved populations are reached.",
            },
            {
              title: "Consider capacity limits",
              desc: "Maximums reflect real-world implementation capacity.",
            },
            {
              title: "Calculate efficiency metrics",
              desc: "Impact per rupee or per worker identifies the most efficient programs.",
            },
            {
              title: "Involve stakeholders",
              desc: "Social sector problems require input from communities and experts.",
            },
            {
              title: "Document assumptions",
              desc: "Clearly state how social impact is measured.",
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
                mistake: "Using profit instead of social impact",
                fix: "Social sector problems maximize QALYs, lives saved, or other welfare measures.",
              },
              {
                mistake: "Forgetting equity constraints",
                fix: "Minimums ensure underserved populations are reached.",
              },
              {
                mistake: "Assuming all programs are equally valuable",
                fix: "Different programs have different impact per unit.",
              },
              {
                mistake: "Not validating with stakeholders",
                fix: "Social sector problems need community and expert input.",
              },
              {
                mistake: "Ignoring capacity constraints",
                fix: "Maximums reflect real-world limits on implementation.",
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
            "Define social impact metrics clearly (QALYs, DALYs, etc.).",
            "Include equity constraints as minimums.",
            "Add capacity constraints as maximums.",
            "Calculate impact efficiency (impact per resource unit).",
            "Identify binding vs non-binding constraints.",
            "Validate assumptions with stakeholders.",
            "Document the source of social impact data.",
            "Consider the social context in implementation.",
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
                <strong>Observe carefully:</strong> The maximum limit for Program X
                is binding, but Program Y's maximum is not. What does this tell us
                about the organization's capacity constraints?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If Program Y's impact increases
                to 800 QALYs, what happens to the optimal solution? Would the
                organization implement more of Program Y?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu works for a
                non-profit organization that needs to allocate resources across
                three education programs in Kolkata. Each program has different
                social impact and resource requirements. How would he use LP to
                maximize social impact?
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
              "✅ Formulate a social sector LP model with social impact objectives",
              "✅ Use QALYs or similar metrics as the objective function",
              "✅ Include equity constraints (minimums) for social justice",
              "✅ Include capacity constraints (maximums) for implementation",
              "✅ Identify binding vs non-binding constraints",
              "✅ Calculate social impact efficiency (impact per resource unit)",
              "✅ Apply the 7-step procedure to social context problems",
              "✅ Understand the difference between social and business LP problems",
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
          title="Social Context Maximization FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 14: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <PlainTextPrint
          content={noteText}
          title="Social Context Maximization - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic27_note.txt"
        />
      </div>

      {/* ===== SECTION 15: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out} animation-delay-1200">
        <Teacher
          note={
            "This example shows that LP is not just for business—it's for social good too. I tell my students: 'The same mathematics that maximizes profit can also maximize lives saved.' The key insight here is that social sector problems have different objectives (QALYs instead of rupees) but the same optimization framework. Mamata from Barrackpore once told me she used this approach to help her community health center allocate resources across vaccination and treatment programs, increasing their health impact by 25%. Remember: in social sector problems, equity constraints (minimums) are crucial—they ensure we don't leave behind vulnerable populations. The binding constraints tell us where to focus our limited resources for maximum social impact. This is the power of LP—it helps us do more good with limited resources."
          }
        />
      </div>
    </div>
  );
};

export default Topic27;