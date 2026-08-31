import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic15_files/topic15_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic15_files/topic15_note.txt?raw";

/**
 * Topic15: Worked Example 9 – Advertising budget allocation problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic15 component
 *
 * @purpose Provides a complete, step-by-step worked example of an advertising
 * budget allocation problem, demonstrating how LP can be used to allocate a
 * fixed budget across multiple channels to maximize audience reach.
 *
 * @when_used After diet problems (Topic14), this topic introduces a new
 * application domain: marketing and advertising, with budget constraints
 * and lower/upper bounds.
 */
const Topic15 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 15
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 9
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 9: Advertising Budget Allocation Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Allocating a fixed marketing budget across multiple channels to
          maximize audience reach — a classic LP application in advertising
          and media planning.
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
              A marketing manager is planning an advertising campaign using{" "}
              <strong>three media channels</strong>:
              Television, Radio, and Social Media.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Channel</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Cost per ad (₹)</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Reach per ad (thousands)</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Minimum ads</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Maximum ads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Television</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">12,000</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">80</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">3</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">8</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Radio</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">8,000</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">50</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">6</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Social Media</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">6,000</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">40</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">2</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                The company has a total advertising budget of{" "}
                <span className="font-mono text-blue-600 dark:text-blue-400">₹100,000</span>.
              </li>
              <li>
                The manager wants to <strong>maximize total audience reach</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal number of ads
                on each channel to maximize total reach while staying within
                budget and respecting channel limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: REAL-WORLD CONTEXT ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📢</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "📺 Media Planning",
              description: "Allocating budgets across TV, radio, print, digital, and social media.",
            },
            {
              domain: "📈 Campaign Optimization",
              description: "Maximizing impressions, clicks, or conversions with a fixed budget.",
            },
            {
              domain: "🏢 Corporate Marketing",
              description: "Distributing marketing spend across product lines or regions.",
            },
            {
              domain: "🌐 Digital Advertising",
              description: "Optimizing ad spend across Google Ads, Facebook, Instagram, and TikTok.",
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
            <strong>Key Insight:</strong> Advertising budget allocation is a
            billion-dollar decision-making problem. LP helps marketers get the
            maximum return on their advertising spend.
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
                  <li><strong>Goal:</strong> Maximize total reach.</li>
                  <li><strong>Channels:</strong> TV, Radio, Social Media (3 channels).</li>
                  <li><strong>Budget:</strong> ₹100,000.</li>
                  <li><strong>Limits:</strong> Minimum and maximum ads per channel.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 3 channels, budget constraint, lower/upper bounds.
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
                  <p>x₁ = number of Television advertisements</p>
                  <p>x₂ = number of Radio advertisements</p>
                  <p>x₃ = number of Social Media advertisements</p>
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
                  <p>Maximize Z = 80x₁ + 50x₂ + 40x₃</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>TV reach per ad = <span className="font-mono">80,000</span></li>
                  <li>Radio reach per ad = <span className="font-mono">50,000</span></li>
                  <li>Social Media reach per ad = <span className="font-mono">40,000</span></li>
                  <li>We want to <strong>maximize</strong> total reach.</li>
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
                  <p>Budget: 12,000x₁ + 8,000x₂ + 6,000x₃ ≤ 100,000</p>
                  <p>TV: 3 ≤ x₁ ≤ 8</p>
                  <p>Radio: 2 ≤ x₂ ≤ 6</p>
                  <p>Social: 2 ≤ x₃ ≤ 10</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Budget:</strong> Total ad cost ≤ ₹100,000.</li>
                  <li><strong>TV:</strong> At least 3, at most 8 ads.</li>
                  <li><strong>Radio:</strong> At least 2, at most 6 ads.</li>
                  <li><strong>Social:</strong> At least 2, at most 10 ads.</li>
                </ul>
                <div className="mt-2 bg-yellow-50/60 dark:bg-yellow-950/30 p-2 rounded border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    💡 Note: This is a <strong>3-variable</strong> problem with
                    <strong> lower and upper bounds</strong> on each variable.
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
                  <p>x₁ ≥ 0, x₂ ≥ 0, x₃ ≥ 0</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  (Already covered by lower bounds.)
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 3, x₂ = 2, x₃ = 2</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Cost: 36,000 + 16,000 + 12,000 = 64,000 ≤ 100,000 ✓
                      <br />
                      Reach: 240,000 + 100,000 + 80,000 = 420,000
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">✅ Feasible solution!</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/30 p-2 rounded border border-red-200 dark:border-red-900/50">
                    <p className="text-sm font-mono text-red-800 dark:text-red-300">Test: x₁ = 8, x₂ = 2, x₃ = 2</p>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Cost: 96,000 + 16,000 + 12,000 = 124,000 ≤ 100,000 ✗
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">❌ Infeasible! Budget exceeded.</p>
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
                  <p>Maximize Z = 80x₁ + 50x₂ + 40x₃</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Budget: 12,000x₁ + 8,000x₂ + 6,000x₃ ≤ 100,000</p>
                  <p className="pl-4">TV: 3 ≤ x₁ ≤ 8</p>
                  <p className="pl-4">Radio: 2 ≤ x₂ ≤ 6</p>
                  <p className="pl-4">Social: 2 ≤ x₃ ≤ 10</p>
                  <p className="pl-4">x₁ ≥ 0, x₂ ≥ 0, x₃ ≥ 0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: SOLUTION APPROACH ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🧮</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Solution Approach & Analysis
          </h2>
        </div>

        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <h3 className="font-semibold text-gray-900 dark:text-white">Reach per Rupee Calculation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            {[
              {
                channel: "Television",
                reach: "80,000",
                cost: "12,000",
                ratio: "6.67",
              },
              {
                channel: "Radio",
                reach: "50,000",
                cost: "8,000",
                ratio: "6.25",
              },
              {
                channel: "Social Media",
                reach: "40,000",
                cost: "6,000",
                ratio: "6.67",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
              >
                <p className="font-semibold text-gray-900 dark:text-white">{item.channel}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.reach} reach ÷ ₹{item.cost}
                </p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {item.ratio} reach/₹
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>💡 Key Insight:</strong> Television and Social Media have
              the <strong>same reach per rupee</strong> (6.67), while Radio is
              slightly lower (6.25). This means TV and Social Media are equally
              efficient.
            </p>
          </div>
        </div>

        <div className="mt-4 bg-green-50/40 dark:bg-green-950/20 rounded-xl p-5 border border-green-200 dark:border-green-900/30">
          <h3 className="font-semibold text-gray-900 dark:text-white">Optimal Solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">Solution 1</p>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">x₁ = 6, x₂ = 2, x₃ = 2</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cost = ₹100,000</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reach = 660,000</p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">Solution 2</p>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">x₁ = 3, x₂ = 2, x₃ = 8</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cost = ₹100,000</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reach = 660,000</p>
            </div>
          </div>
          <div className="mt-3 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Multiple Optimal Solutions!</strong> Any combination of
              TV and Social Media ads that uses the remaining ₹36,000 gives
              the same maximum reach of 660,000.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: EFFICIENCY ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Channel Efficiency Analysis
          </h2>
        </div>
        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30">
          <svg
            viewBox="0 0 600 400"
            className="w-full h-auto"
            aria-label="Channel efficiency comparison"
            role="img"
          >
            <rect x="0" y="0" width="600" height="400" fill="none" />

            {/* Title */}
            <text x="300" y="30" fontSize="16" fill="#475569" dark="#94a3b8" textAnchor="middle" fontWeight="bold">
              Reach per Rupee by Channel
            </text>

            {/* Bars */}
            {/* TV: 6.67 */}
            <rect x="80" y="80" width="120" height="200" rx="8" fill="#3b82f6">
              <animate attributeName="height" values="0;200" dur="1.5s" fill="freeze" />
              <animate attributeName="y" values="280;80" dur="1.5s" fill="freeze" />
            </rect>
            <text x="140" y="70" fontSize="14" fill="#3b82f6" textAnchor="middle" fontWeight="bold">6.67</text>
            <text x="140" y="310" fontSize="12" fill="#475569" dark="#94a3b8" textAnchor="middle">TV</text>
            <text x="140" y="325" fontSize="10" fill="#94a3b8" textAnchor="middle">(80,000 ÷ 12,000)</text>

            {/* Radio: 6.25 */}
            <rect x="240" y="90" width="120" height="190" rx="8" fill="#22c55e">
              <animate attributeName="height" values="0;190" dur="1.5s" begin="0.3s" fill="freeze" />
              <animate attributeName="y" values="280;90" dur="1.5s" begin="0.3s" fill="freeze" />
            </rect>
            <text x="300" y="80" fontSize="14" fill="#22c55e" textAnchor="middle" fontWeight="bold">6.25</text>
            <text x="300" y="310" fontSize="12" fill="#475569" dark="#94a3b8" textAnchor="middle">Radio</text>
            <text x="300" y="325" fontSize="10" fill="#94a3b8" textAnchor="middle">(50,000 ÷ 8,000)</text>

            {/* Social: 6.67 */}
            <rect x="400" y="80" width="120" height="200" rx="8" fill="#a855f7">
              <animate attributeName="height" values="0;200" dur="1.5s" begin="0.6s" fill="freeze" />
              <animate attributeName="y" values="280;80" dur="1.5s" begin="0.6s" fill="freeze" />
            </rect>
            <text x="460" y="70" fontSize="14" fill="#a855f7" textAnchor="middle" fontWeight="bold">6.67</text>
            <text x="460" y="310" fontSize="12" fill="#475569" dark="#94a3b8" textAnchor="middle">Social</text>
            <text x="460" y="325" fontSize="10" fill="#94a3b8" textAnchor="middle">(40,000 ÷ 6,000)</text>

            {/* Horizontal line at 6.67 */}
            <line x1="60" y1="80" x2="560" y2="80" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4,4" />

            {/* Labels */}
            <text x="60" y="85" fontSize="10" fill="#94a3b8">6.67</text>
            <text x="60" y="185" fontSize="10" fill="#94a3b8">3.33</text>
            <text x="60" y="285" fontSize="10" fill="#94a3b8">0</text>

            {/* Note about equal efficiency */}
            <text x="300" y="370" fontSize="12" fill="#3b82f6" textAnchor="middle">
              TV and Social Media have equal efficiency (6.67 reach per rupee)
            </text>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Television and Social Media have the highest reach per rupee (6.67),
            Radio is slightly lower (6.25).
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
              title: "Calculate reach per rupee first",
              desc: "This helps identify the most efficient channels.",
            },
            {
              title: "Check for multiple optimal solutions",
              desc: "When channels have equal efficiency, multiple solutions exist.",
            },
            {
              title: "Don't forget the minimums",
              desc: "Lower bounds may force less efficient channels.",
            },
            {
              title: "Consider upper bounds",
              desc: "Maximum limits prevent oversaturation.",
            },
            {
              title: "Use the full budget",
              desc: "The optimal solution usually uses the entire budget.",
            },
            {
              title: "Validate with extreme solutions",
              desc: "Test allocating all budget to one channel.",
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
                mistake: "Forgetting lower bound constraints",
                fix: "Always include minimum ad requirements.",
              },
              {
                mistake: "Ignoring upper bound constraints",
                fix: "Maximum limits are important for channel diversity.",
              },
              {
                mistake: "Not using the full budget",
                fix: "The optimal solution should use all available budget.",
              },
              {
                mistake: "Assuming only one optimal solution",
                fix: "Check for multiple optima when channels have equal efficiency.",
              },
              {
                mistake: "Not calculating reach per rupee",
                fix: "This metric is essential for decision-making.",
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
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Create a channel-data table with costs, reach, and limits.",
            "Calculate reach per rupee for each channel.",
            "Include all lower and upper bounds explicitly.",
            "Check for multiple optimal solutions.",
            "Use the full budget whenever possible.",
            "Validate the solution by checking all constraints.",
            "Document the optimal allocation and reach.",
            "Consider seasonal or audience-specific factors.",
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
                <strong>Observe carefully:</strong> TV and Social Media have the
                same reach per rupee. What does this mean for the optimal solution?
                Why might a manager prefer one over the other?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If Radio's reach increases
                to 60,000 per ad, what happens to the optimal solution? Which
                channel becomes more attractive?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu is a marketing
                manager in Kolkata with a ₹50,000 budget for a local campaign.
                He has four channels: TV, Radio, Print, and Digital. How would
                he use LP to allocate his budget?
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
              "✅ Formulate an advertising budget allocation LP model",
              "✅ Include budget constraints and lower/upper bounds",
              "✅ Calculate reach per rupee for efficiency analysis",
              "✅ Identify multiple optimal solutions",
              "✅ Recognize the importance of minimum ad requirements",
              "✅ Determine the optimal budget allocation across channels",
              "✅ Apply the 7-step procedure to marketing problems",
              "✅ Validate solutions by checking all constraints",
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
          title="Advertising Budget Allocation Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 12: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <PlainTextPrint
          content={noteText}
          title="Advertising Budget Allocation Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic15_note.txt"
        />
      </div>

      {/* ===== SECTION 13: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <Teacher
          note={
            "The advertising budget allocation problem is one of the most practical LP applications. I tell my students: 'If you understand this example, you can help companies make multi-million rupee marketing decisions.' The key insight is reach per rupee—a metric that marketing professionals use daily. When TV and Social Media have equal efficiency, the manager has flexibility in choosing the mix. This is important in practice because other factors (brand fit, audience demographics, timing) can influence the final decision. Susmita from Barrackpore once told me this example helped her understand why her company's marketing team used LP to allocate their budget—they were maximizing reach with limited funds. Remember: the optimal solution uses the full budget, and minimum requirements ensure all channels are used. This is a perfect example of how LP helps make better business decisions."
          }
        />
      </div>
    </div>
  );
};

export default Topic15;