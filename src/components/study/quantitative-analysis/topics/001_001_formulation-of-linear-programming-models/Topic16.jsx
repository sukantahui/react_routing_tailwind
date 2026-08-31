import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic16_files/topic16_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic16_files/topic16_note.txt?raw";

/**
 * Topic16: Worked Example 10 – Investment allocation problem
 *
 * @component
 * @returns {JSX.Element} The rendered Topic16 component
 *
 * @purpose Provides a complete, step-by-step worked example of an investment
 * allocation problem, demonstrating how LP can be used to optimize a portfolio
 * by balancing risk and return.
 *
 * @when_used After advertising budget allocation (Topic15), this topic applies
 * LP to financial planning, introducing risk constraints and minimum/maximum
 * investment limits.
 */
const Topic16 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 16
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Worked Example 10
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Worked Example 10: Investment Allocation Problem
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Balancing risk and return to build an optimal investment portfolio —
          a powerful LP application in finance and personal wealth management.
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
              An investor has <strong>₹200,000</strong> to invest in{" "}
              <strong>three investment options</strong>:
              Stocks, Bonds, and Mutual Funds.
            </p>

            <div className="overflow-x-auto mt-4">
              <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Asset</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Expected Return</th>
                    <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Risk Factor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Stocks</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">12%</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0.6</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Bonds</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">8%</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0.3</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Mutual Funds</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">10%</td>
                    <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-center">0.4</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>
                <strong>Overall portfolio risk</strong> (weighted average) must
                not exceed <span className="font-mono text-blue-600 dark:text-blue-400">0.45</span>.
              </li>
              <li>
                At least <span className="font-mono text-blue-600 dark:text-blue-400">₹20,000</span> must be invested in Mutual Funds.
              </li>
              <li>
                No more than <span className="font-mono text-blue-600 dark:text-blue-400">₹100,000</span> can be invested in Stocks.
              </li>
              <li>
                The investor wants to <strong>maximize total expected return</strong>.
              </li>
            </ul>

            <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
              <p className="text-sm text-amber-800 dark:text-amber-300">
                <strong>💡 Goal:</strong> Determine the optimal allocation of
                the ₹200,000 across the three assets to maximize expected return
                while staying within risk limits and investment constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: REAL-WORLD CONTEXT ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-150">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏦</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Applications
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "👤 Personal Finance",
              description: "Individuals optimizing their retirement or savings portfolios.",
            },
            {
              domain: "🏢 Institutional Investing",
              description: "Pension funds and endowments allocating assets to meet return targets.",
            },
            {
              domain: "📊 Mutual Fund Management",
              description: "Fund managers constructing portfolios for specific risk-return profiles.",
            },
            {
              domain: "💼 Wealth Management",
              description: "Advisors recommending asset allocation for high-net-worth clients.",
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
            <strong>Key Insight:</strong> Modern Portfolio Theory, developed by
            Harry Markowitz, uses LP-like optimization to build efficient
            portfolios that maximize return for a given level of risk.
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
                  <li><strong>Goal:</strong> Maximize expected return.</li>
                  <li><strong>Assets:</strong> Stocks, Bonds, Mutual Funds.</li>
                  <li><strong>Budget:</strong> ₹200,000.</li>
                  <li><strong>Risk limit:</strong> ≤ 0.45 (weighted average).</li>
                  <li><strong>Minimum Mutual Funds:</strong> ₹20,000.</li>
                  <li><strong>Maximum Stocks:</strong> ₹100,000.</li>
                </ul>
                <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-800 dark:text-green-300">
                    ✅ Identified: 3 assets, budget, risk constraint, min/max limits.
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
                  <p>x₁ = amount invested in Stocks (₹)</p>
                  <p>x₂ = amount invested in Bonds (₹)</p>
                  <p>x₃ = amount invested in Mutual Funds (₹)</p>
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
                  <p>Maximize Z = 0.12x₁ + 0.08x₂ + 0.10x₃</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li>Stocks return = <span className="font-mono">12%</span></li>
                  <li>Bonds return = <span className="font-mono">8%</span></li>
                  <li>Mutual Funds return = <span className="font-mono">10%</span></li>
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
                  <p>Budget: x₁ + x₂ + x₃ ≤ 200,000</p>
                  <p>Risk: 0.6x₁ + 0.3x₂ + 0.4x₃ ≤ 0.45(x₁ + x₂ + x₃)</p>
                  <p>Mutual Funds: x₃ ≥ 20,000</p>
                  <p>Stocks: x₁ ≤ 100,000</p>
                </div>
                <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <li><strong>Budget:</strong> Total investment ≤ ₹200,000.</li>
                  <li><strong>Risk:</strong> Weighted average risk ≤ 0.45.</li>
                  <li><strong>Mutual Funds:</strong> Minimum ₹20,000.</li>
                  <li><strong>Stocks:</strong> Maximum ₹100,000.</li>
                </ul>
                <div className="mt-2 bg-yellow-50/60 dark:bg-yellow-950/30 p-2 rounded border border-yellow-200 dark:border-yellow-900/50">
                  <p className="text-xs text-yellow-800 dark:text-yellow-300">
                    💡 Risk constraint simplifies to: <strong>3x₁ - 3x₂ - x₃ ≤ 0</strong>
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
                    <p className="text-sm font-mono text-green-800 dark:text-green-300">Test: x₁ = 50,000, x₂ = 80,000, x₃ = 70,000</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Budget: 200,000 ≤ 200,000 ✓
                      <br />
                      Risk: 0.6(50)+0.3(80)+0.4(70)=30+24+28=82 ≤ 0.45(200)=90 ✓
                      <br />
                      x₃ ≥ 20 ✓, x₁ ≤ 100 ✓
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
                  <p>Maximize Z = 0.12x₁ + 0.08x₂ + 0.10x₃</p>
                  <p>Subject to:</p>
                  <p className="pl-4">Budget: x₁ + x₂ + x₃ ≤ 200,000</p>
                  <p className="pl-4">Risk: 3x₁ - 3x₂ - x₃ ≤ 0</p>
                  <p className="pl-4">Mutual Funds: x₃ ≥ 20,000</p>
                  <p className="pl-4">Stocks: x₁ ≤ 100,000</p>
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
          <h3 className="font-semibold text-gray-900 dark:text-white">Optimal Allocation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
            {[
              {
                asset: "Stocks",
                amount: "₹93,333.33",
                return: "₹11,200 (12%)",
                risk: "0.6",
              },
              {
                asset: "Bonds",
                amount: "₹86,666.67",
                return: "₹6,933.33 (8%)",
                risk: "0.3",
              },
              {
                asset: "Mutual Funds",
                amount: "₹20,000",
                return: "₹2,000 (10%)",
                risk: "0.4",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700"
              >
                <p className="font-semibold text-gray-900 dark:text-white">{item.asset}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Amount: {item.amount}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Return: {item.return}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Risk: {item.risk}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-green-50/60 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-900/50">
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>✓ Optimal Portfolio:</strong> Total expected return ={" "}
              <span className="font-bold">₹20,133.33</span> (10.07% of portfolio).
              All constraints are binding.
            </p>
          </div>
        </div>

        <div className="mt-4 bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 border border-purple-100 dark:border-purple-900/30">
          <h3 className="font-semibold text-gray-900 dark:text-white">Risk-Return Trade-off</h3>
          <svg
            viewBox="0 0 600 300"
            className="w-full h-auto"
            aria-label="Risk-return trade-off visualization"
            role="img"
          >
            <rect x="0" y="0" width="600" height="300" fill="none" />

            {/* Axes */}
            <line x1="60" y1="260" x2="560" y2="260" stroke="#94a3b8" strokeWidth="2" />
            <line x1="60" y1="260" x2="60" y2="40" stroke="#94a3b8" strokeWidth="2" />
            <text x="570" y="270" fontSize="12" fill="#475569" dark="#94a3b8">Risk</text>
            <text x="30" y="40" fontSize="12" fill="#475569" dark="#94a3b8">Return</text>

            {/* Efficient frontier curve */}
            <path d="M60,240 Q150,150 300,100 Q450,60 560,60" fill="none" stroke="#3b82f6" strokeWidth="3">
              <animate attributeName="stroke-dashoffset" values="1000;0" dur="2s" fill="freeze" />
            </path>
            <text x="300" y="50" fontSize="11" fill="#3b82f6" textAnchor="middle">Efficient Frontier</text>

            {/* Optimal point */}
            <circle cx="300" cy="100" r="8" fill="#22c55e" stroke="white" strokeWidth="2">
              <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />
            </circle>
            <text x="310" y="95" fontSize="10" fill="#22c55e" fontWeight="bold">Optimal</text>
            <text x="310" y="110" fontSize="9" fill="#94a3b8">(Risk=0.45)</text>

            {/* Risk limit line */}
            <line x1="300" y1="260" x2="300" y2="100" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" />
            <text x="300" y="275" fontSize="10" fill="#ef4444" textAnchor="middle">Risk Limit = 0.45</text>

            {/* Points for each asset */}
            <circle cx="200" cy="180" r="5" fill="#3b82f6" />
            <text x="210" y="175" fontSize="9" fill="#3b82f6">Bonds</text>
            <circle cx="280" cy="120" r="5" fill="#3b82f6" />
            <text x="290" y="115" fontSize="9" fill="#3b82f6">Mutual Funds</text>
            <circle cx="400" cy="70" r="5" fill="#3b82f6" />
            <text x="410" y="65" fontSize="9" fill="#3b82f6">Stocks</text>

            {/* Arrow showing increasing risk */}
            <polygon points="300,200 310,180 310,220" fill="#94a3b8" />
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The optimal portfolio balances risk (0.45) and return (10.07%), lying on the efficient frontier.
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: CONSTRAINT ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔗</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Constraint Analysis
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              constraint: "Budget",
              status: "Binding ✓",
              detail: "x₁ + x₂ + x₃ = 200,000 (full used)",
            },
            {
              constraint: "Risk",
              status: "Binding ✓",
              detail: "Weighted risk = 0.45 exactly",
            },
            {
              constraint: "Mutual Funds Minimum",
              status: "Binding ✓",
              detail: "x₃ = 20,000 (minimum)",
            },
            {
              constraint: "Stocks Maximum",
              status: "Binding ✓",
              detail: "x₁ = 93,333.33 (below max 100,000)",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.constraint}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.detail}</p>
              <div className="mt-2 flex items-center">
                <span className={clsx(
                  "text-sm font-medium",
                  item.status.includes("Binding") ? "text-green-600 dark:text-green-400" : "text-amber-600 dark:text-amber-400"
                )}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
          <p className="text-sm text-amber-800 dark:text-amber-300">
            <strong>💡 Key Observation:</strong> Three constraints are binding
            (Budget, Risk, Mutual Funds minimum). The Stocks maximum is not
            binding at the optimum (x₁ = 93,333.33 &lt 100,000), meaning the
            investor could invest more in Stocks, but risk constraint prevents it.
          </p>
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
              title: "Understand risk-return trade-off",
              desc: "Higher return usually means higher risk; LP helps find the optimal balance.",
            },
            {
              title: "Use risk factors correctly",
              desc: "Risk factors are often given; ensure they are applied as weighted averages.",
            },
            {
              title: "Check all constraints",
              desc: "Don't forget minimum/maximum investment limits.",
            },
            {
              title: "Consider diversification",
              desc: "Minimum allocation constraints enforce diversification.",
            },
            {
              title: "Simplify risk constraints",
              desc: "Often can be simplified algebraically.",
            },
            {
              title: "Validate with extreme allocations",
              desc: "Test all-in-one asset to check feasibility.",
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
                mistake: "Forgetting the risk constraint",
                fix: "Risk is as important as return in investment problems.",
              },
              {
                mistake: "Misinterpreting risk factors",
                fix: "Risk factors are not percentages; they are relative weights.",
              },
              {
                mistake: "Not using the full budget",
                fix: "Optimal solution usually uses the entire budget.",
              },
              {
                mistake: "Ignoring minimum/maximum limits",
                fix: "These are real-world constraints that affect the solution.",
              },
              {
                mistake: "Assuming risk constraint is linear",
                fix: "It is linear when expressed as weighted average.",
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
            "Create an asset table with return and risk data.",
            "Define variables clearly as rupee amounts.",
            "Write constraints in proper units (rupees).",
            "Simplify risk constraints algebraically.",
            "Check all constraints at the optimum.",
            "Use the full budget for maximum return.",
            "Validate with a feasible solution.",
            "Document assumptions about risk and return.",
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
                <strong>Observe carefully:</strong> The Stocks maximum constraint
                is not binding (x₁ = 93,333.33 &lt 100,000). Why is the investor
                not investing the maximum allowed in Stocks despite their high
                return?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If the risk tolerance
                increases to 0.50, what happens to the optimal allocation?
                Which constraints become binding?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Mahima is a financial
                planner in Jadavpur with a client who wants to invest ₹500,000
                across four asset classes with different risk-return profiles.
                How would she use LP to recommend a portfolio?
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
              "✅ Formulate an investment allocation LP model with risk constraints",
              "✅ Simplify risk constraints algebraically",
              "✅ Include minimum and maximum investment limits",
              "✅ Identify which constraints are binding at the optimum",
              "✅ Understand the risk-return trade-off",
              "✅ Calculate portfolio risk and expected return",
              "✅ Apply the 7-step procedure to investment problems",
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
          title="Investment Allocation Problem FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 12: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <PlainTextPrint
          content={noteText}
          title="Investment Allocation Problem - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic16_note.txt"
        />
      </div>

      {/* ===== SECTION 13: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <Teacher
          note={
            "Investment allocation is one of the most rewarding LP applications because it directly impacts people's financial well-being. I tell my students: 'Understanding this example gives you the foundation to build real-world portfolios.' The key insight is that risk constraints often limit how much you can invest in high-return assets. Here, the Stocks maximum is not binding—the risk constraint prevents investing more in Stocks, even though the investor would like to. This is a subtle but important point. Mamata from Jadavpur once used this example to explain to her parents why their financial advisor recommended a balanced portfolio—it maximized return while keeping risk within acceptable limits. Remember: in investment problems, risk and return are two sides of the same coin. LP helps you find the optimal balance."
          }
        />
      </div>
    </div>
  );
};

export default Topic16;