import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic21_files/topic21_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic21_files/topic21_note.txt?raw";

/**
 * Topic21: Worked Example 15 – Blending problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic21 component
 *
 * @purpose Provides a complete, step-by-step worked example of a blending
 * problem, demonstrating how LP can be used to mix raw materials to meet
 * quality specifications at minimum cost.
 *
 * @when_used After agricultural production (Topic20), this topic introduces
 * blending problems, a major application area in manufacturing, food processing,
 * and chemical industries.
 */
const Topic21 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 21
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 15
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 15: Blending Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Mixing raw materials to meet quality specifications at minimum cost
          — a fundamental problem in manufacturing, food processing, and
          chemical industries.
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
              A company produces a blended product by mixing{" "}
              <strong>two raw materials</strong>: Material X and Material Y.
              The blend must meet specific <strong>quality requirements</strong>:
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Quality</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Protein</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">At least 20%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Fat</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">At most 15%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Moisture</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">At most 10%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Material</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Protein (%)</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Fat (%)</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Moisture (%)</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Cost (₹/kg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Material X</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">30</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">5</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">8</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">25</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Material Y</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">20</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">12</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">20</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                The company wants to produce <span className="font-mono text-blue-600 dark:text-blue-400">1,000 kg</span> of the blend.
              </li>
              <li>
                The company wants to <strong>minimize total cost</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine how many kg of each material
                to use to produce 1,000 kg of blend at minimum cost while meeting
                all quality requirements.
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
              domain: "🛢️ Petroleum Refining",
              description: "Blending gasoline, diesel, and other fuels to meet octane and emission standards.",
            },
            {
              domain: "🌾 Animal Feed",
              description: "Mixing grains, proteins, and supplements to meet nutritional requirements at minimum cost.",
            },
            {
              domain: "🍞 Food Processing",
              description: "Blending flours, juices, oils, and other ingredients to meet quality specifications.",
            },
            {
              domain: "🧪 Chemical Manufacturing",
              description: "Mixing chemicals to achieve desired properties like viscosity, purity, and stability.",
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
            <strong>Key Insight:</strong> Blending problems are ubiquitous in
            process industries. Companies save millions by optimizing their
            blending operations using LP.
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
                  <li><strong>Goal:</strong> Minimize cost for 1,000 kg blend.</li>
                  <li><strong>Materials:</strong> X and Y (2 materials).</li>
                  <li><strong>Requirements:</strong> Protein ≥ 20%, Fat ≤ 15%, Moisture ≤ 10%.</li>
                  <li><strong>Production:</strong> Exactly 1,000 kg of blend.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 2 materials, 3 quality constraints, fixed blend amount.
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
                  <p>x₁ = kg of Material X used</p>
                  <p>x₂ = kg of Material Y used</p>
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
                  <p>Minimize Z = 25x₁ + 20x₂</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Material X cost = <span className="font-mono">₹25/kg</span></li>
                  <li>Material Y cost = <span className="font-mono">₹20/kg</span></li>
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
                  <p>Blend: x₁ + x₂ = 1,000</p>
                  <p>Protein: 3x₁ + x₂ ≥ 2,000</p>
                  <p>Fat: x₁ + 4x₂ ≤ 3,000</p>
                  <p>Moisture: 2x₁ + 3x₂ ≤ 2,500</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Blend:</strong> Total must be exactly 1,000 kg.</li>
                  <li><strong>Protein:</strong> ≥ 20% (200 kg).</li>
                  <li><strong>Fat:</strong> ≤ 15% (150 kg).</li>
                  <li><strong>Moisture:</strong> ≤ 10% (100 kg).</li>
                </ul>
                <div className="mt-2 bg-yellow-50/60 dark:bg-yellow-950/30 p-2 rounded border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    💡 Percentages are converted to kg by multiplying by 10
                    (since total is 1,000 kg). For example, 20% of 1,000 = 200 kg.
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 500, x₂ = 500</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Total: 500+500=1,000 ✓
                      <br />
                      Protein: 0.30(500)+0.10(500) = 150+50 = 200 ≥ 200 ✓
                      <br />
                      Fat: 0.05(500)+0.20(500) = 25+100 = 125 ≤ 150 ✓
                      <br />
                      Moisture: 0.08(500)+0.12(500) = 40+60 = 100 ≤ 100 ✓
                      <br />
                      Cost: 25(500)+20(500) = 12,500+10,000 = 22,500
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
                  <p>Minimize Z = 25x₁ + 20x₂</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Blend: x₁ + x₂ = 1,000</p>
                  <p className="pl-4">Protein: 3x₁ + x₂ ≥ 2,000</p>
                  <p className="pl-4">Fat: x₁ + 4x₂ ≤ 3,000</p>
                  <p className="pl-4">Moisture: 2x₁ + 3x₂ ≤ 2,500</p>
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
            Optimal Blend Composition
          </h2>
        </div>

        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 650 420"
            className="w-full h-auto"
            aria-label="Blend composition visualization"
            role="img"
          >
            <rect x="0" y="0" width="650" height="420" fill="none" />

            <text x="325" y="25" fontSize="16" fill="#475569" dark="#94a3b8" textAnchor="middle" fontWeight="bold">
              Optimal Blend: 1,000 kg
            </text>

            {/* Material X (500 kg) */}
            <rect x="100" y="80" width="200" height="180" rx="8" fill="#3b82f6" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="200" y="170" fontSize="16" fill="#3b82f6" textAnchor="middle" fontWeight="bold">Material X</text>
            <text x="200" y="200" fontSize="14" fill="#3b82f6" textAnchor="middle">500 kg (50%)</text>
            <text x="200" y="225" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">₹25/kg</text>

            {/* Material Y (500 kg) */}
            <rect x="330" y="80" width="200" height="180" rx="8" fill="#22c55e" fillOpacity="0.3" stroke="#22c55e" strokeWidth="2.5" />
            <text x="430" y="170" fontSize="16" fill="#22c55e" textAnchor="middle" fontWeight="bold">Material Y</text>
            <text x="430" y="200" fontSize="14" fill="#22c55e" textAnchor="middle">500 kg (50%)</text>
            <text x="430" y="225" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">₹20/kg</text>

            {/* Cost summary */}
            <rect x="100" y="300" width="430" height="50" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
            <text x="315" y="325" fontSize="16" fill="#f59e0b" textAnchor="middle" fontWeight="bold">
              Total Cost = ₹22,500
            </text>
            <text x="315" y="345" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">
              (Material X: ₹12,500 + Material Y: ₹10,000)
            </text>

            {/* Quality check table */}
            <rect x="100" y="360" width="430" height="50" rx="8" fill="white" dark="#1e293b" stroke="#94a3b8" strokeWidth="1" />
            <text x="315" y="375" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle" fontWeight="bold">
              Quality Check:
            </text>
            <text x="180" y="395" fontSize="10" fill="#3b82f6" textAnchor="middle">Protein: 20% ✓</text>
            <text x="315" y="395" fontSize="10" fill="#22c55e" textAnchor="middle">Fat: 12.5% ✓</text>
            <text x="450" y="395" fontSize="10" fill="#a855f7" textAnchor="middle">Moisture: 10% ✓</text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Optimal blend: 500 kg of Material X and 500 kg of Material Y.
            Total cost = ₹22,500. All quality requirements met.
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: QUALITY COMPOSITION ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔬</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Quality Composition Analysis
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              quality: "Protein",
              requirement: "≥ 20% (200 kg)",
              actual: "0.30(500)+0.10(500) = 200 kg",
              status: "Binding ✓",
              percentage: "100%",
            },
            {
              quality: "Fat",
              requirement: "≤ 15% (150 kg)",
              actual: "0.05(500)+0.20(500) = 125 kg",
              status: "Slack (25 kg)",
              percentage: "83.3%",
            },
            {
              quality: "Moisture",
              requirement: "≤ 10% (100 kg)",
              actual: "0.08(500)+0.12(500) = 100 kg",
              status: "Binding ✓",
              percentage: "100%",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.quality}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span className="font-medium">Requirement:</span> {item.requirement}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Actual:</span> {item.actual}
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
            <strong>💡 Key Observation:</strong> Protein and Moisture are{" "}
            <strong>binding</strong> (exactly meeting requirements), while Fat
            has <strong>slack</strong> (below the maximum). This means the
            company could increase fat content without violating the constraint.
          </p>
        </div>
      </section>

      {/* ===== SECTION 6: MATERIAL COMPOSITION COMPARISON ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Material Composition Comparison
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white">Material X</h4>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Protein: <span className="font-mono text-blue-600 dark:text-blue-400">30%</span></li>
                <li>Fat: <span className="font-mono text-blue-600 dark:text-blue-400">5%</span></li>
                <li>Moisture: <span className="font-mono text-blue-600 dark:text-blue-400">8%</span></li>
                <li>Cost: <span className="font-mono text-red-600 dark:text-red-400">₹25/kg</span></li>
              </ul>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Pros:</span> High protein, low fat
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Cons:</span> More expensive
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white">Material Y</h4>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Protein: <span className="font-mono text-blue-600 dark:text-blue-400">10%</span></li>
                <li>Fat: <span className="font-mono text-blue-600 dark:text-blue-400">20%</span></li>
                <li>Moisture: <span className="font-mono text-blue-600 dark:text-blue-400">12%</span></li>
                <li>Cost: <span className="font-mono text-red-600 dark:text-red-400">₹20/kg</span></li>
              </ul>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Pros:</span> Cheaper
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Cons:</span> Low protein, high fat and moisture
              </div>
            </div>
          </div>
          <div className="mt-3 bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Key Insight:</strong> Material X is higher quality (more protein,
              less fat) but more expensive. Material Y is cheaper but has lower
              protein and higher fat/moisture. The optimal blend balances these
              trade-offs to meet quality requirements at minimum cost.
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
              title: "Convert percentages to quantities",
              desc: "Multiply percentages by the total blend amount to get absolute quantities.",
            },
            {
              title: "Use equality for fixed blend",
              desc: "The total blend amount is often fixed (exactly 1,000 kg).",
            },
            {
              title: "Identify binding constraints",
              desc: "Check which quality requirements are tight at the optimum.",
            },
            {
              title: "Calculate material efficiency",
              desc: "Profit per unit of quality helps identify the best materials.",
            },
            {
              title: "Consider multiple quality specs",
              desc: "Blending problems often have many quality requirements.",
            },
            {
              title: "Validate with real data",
              desc: "Use actual quality measurements for accurate results.",
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
                mistake: "Forgetting to convert percentages",
                fix: "Percentages must be multiplied by the total blend amount.",
              },
              {
                mistake: "Using ≤ instead of ≥ for minimum requirements",
                fix: "Minimum requirements need ≥ constraints.",
              },
              {
                mistake: "Forgetting the blend equality constraint",
                fix: "Total blend amount is fixed in many blending problems.",
              },
              {
                mistake: "Using wrong coefficients",
                fix: "Ensure the material composition percentages are correct.",
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
            "Create a material-composition table with percentages.",
            "Convert all percentages to absolute quantities.",
            "Use equality for the total blend amount.",
            "Include all quality requirements as constraints.",
            "Check which quality constraints are binding.",
            "Validate the solution with real quality data.",
            "Consider cost and quality trade-offs.",
            "Document assumptions about material quality.",
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
                <strong>Observe carefully:</strong> Protein and Moisture are
                binding at the optimum, but Fat has slack. What would happen
                if the fat limit was reduced to 12%?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If Material Y's cost
                decreases to ₹15/kg, what happens to the optimal blend? Would
                the company use more or less Material Y?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Abhronila works in a
                food processing plant in Ichapur. She needs to blend two types
                of flour to meet protein and moisture specifications. How would
                she use LP to minimize cost?
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
              "✅ Formulate a blending LP model with quality constraints",
              "✅ Convert percentages to absolute quantities",
              "✅ Include fixed blend amount as an equality constraint",
              "✅ Identify binding vs non-binding quality constraints",
              "✅ Determine the optimal blend composition",
              "✅ Understand the trade-offs between cost and quality",
              "✅ Apply the 7-step procedure to blending problems",
              "✅ Recognize slack in quality constraints",
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
          title="Blending Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 13: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <PlainTextPrint
          content={noteText}
          title="Blending Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic21_note.txt"
        />
      </div>

      {/* ===== SECTION 14: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <Teacher
          note={
            "Blending problems are everywhere—from gasoline to baby formula! I tell my students: 'If you understand blending, you can optimize almost any mixing process.' The key insight here is that quality constraints often have slack or are binding. Protein and Moisture are binding, but Fat has slack—meaning the company could increase fat content without violating the constraint. This is important because it tells us which quality specifications are driving the cost. Mamata from Barrackpore once told me she used this exact approach to optimize her family's flour blending business, saving them ₹5,000 per batch! Remember: always convert percentages to absolute quantities when formulating blending problems. The equality constraint (x₁ + x₂ = 1,000) is crucial—it fixes the total production amount and simplifies the solution."
          }
        />
      </div>
    </div>
  );
};

export default Topic21;