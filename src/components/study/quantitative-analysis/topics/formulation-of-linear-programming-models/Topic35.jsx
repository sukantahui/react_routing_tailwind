import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic35_files/topic35_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic35_files/topic35_note.txt?raw";

/**
 * Topic35: Interpreting the meaning of variables and constraints
 *
 * @component
 * @returns {JSX.Element} The rendered Topic35 component
 *
 * @purpose Provides a comprehensive guide to interpreting LP solutions,
 * including shadow prices, slack/surplus, binding constraints, and real-world
 * decision-making from LP results.
 *
 * @when_used After checking LP models (Topic34), this topic covers the
 * essential skill of translating mathematical results into business insights.
 */
const Topic35 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 35
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Interpreting Variables & Constraints
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Interpreting the Meaning of Variables and Constraints
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Translating mathematical results into real-world insights — the
          final step in turning LP into actionable decisions.
        </p>
      </header>

      {/* ===== SECTION 1: INTRODUCTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Why Interpretation Matters
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            Solving an LP model gives you <strong>numbers</strong>, but those
            numbers mean nothing without <strong>interpretation</strong>. This
            topic teaches you how to translate mathematical results into
            meaningful business, social, or operational insights.
          </p>
          <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg my-4 border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm text-blue-800 dark:text-blue-300 font-semibold">
              💡 Remember: The goal of LP is not just to get numbers — it's to
              make better decisions. Interpretation is the bridge between math
              and action.
            </p>
          </div>
        </div>

        {/* SVG: Interpretation process */}
        <div className="mt-6 bg-teal-50/40 dark:bg-teal-950/20 rounded-2xl p-4 md:p-6 border border-teal-100 dark:border-teal-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
          <svg
            viewBox="0 0 650 180"
            className="w-full h-auto"
            aria-label="Interpretation process"
            role="img"
          >
            <g>
              <rect x="10" y="30" width="140" height="60" rx="10" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
              <text x="80" y="55" fontSize="13" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Variables</text>
              <text x="80" y="75" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">What to produce?</text>
            </g>
            <g>
              <line x1="150" y1="60" x2="180" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-int)" />
            </g>
            <g>
              <rect x="180" y="30" width="140" height="60" rx="10" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" />
              <text x="250" y="55" fontSize="13" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Constraints</text>
              <text x="250" y="75" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">What limits us?</text>
            </g>
            <g>
              <line x1="320" y1="60" x2="350" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-int)" />
            </g>
            <g>
              <rect x="350" y="30" width="140" height="60" rx="10" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2" />
              <text x="420" y="55" fontSize="13" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Shadow Prices</text>
              <text x="420" y="75" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">What is valuable?</text>
            </g>
            <g>
              <line x1="490" y1="60" x2="520" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-int)" />
            </g>
            <g>
              <rect x="520" y="30" width="120" height="60" rx="10" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
              <text x="580" y="55" fontSize="13" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Action</text>
              <text x="580" y="75" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Make decisions</text>
            </g>
            <defs>
              <marker id="arrow-int" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            From numbers to actionable insights.
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: INTERPRETING VARIABLES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Interpreting Decision Variables
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Each decision variable has a specific meaning. The optimal value
            tells you the best decision.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">Example</p>
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                x₁ = units of Product A produced
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Optimal: <strong>x₁ = 100</strong>
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Interpretation: Produce 100 units of Product A.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">Another Example</p>
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                x₂ = amount invested in Bonds
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Optimal: <strong>x₂ = 0</strong>
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                Interpretation: Don't invest in Bonds — they're not profitable enough.
              </p>
            </div>
          </div>
          <div className="mt-3 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>💡 Key Insight:</strong> A variable value of zero is
              meaningful — it tells you that activity should not be pursued.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: BINDING CONSTRAINTS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔗</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Binding vs Non-Binding Constraints
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Binding Constraints</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Satisfied with equality at optimal solution</li>
              <li>Resource is fully used</li>
              <li>Shadow price &gt; 0 (positive)</li>
              <li>Increasing RHS improves objective</li>
              <li>These are the <strong>bottlenecks</strong></li>
            </ul>
            <div className="mt-2 bg-white dark:bg-gray-800/50 p-2 rounded border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Example: Labor: 100/100 hours used → <span className="font-bold text-green-600">Binding</span>
              </p>
            </div>
          </div>
          <div className="bg-amber-50/40 dark:bg-amber-950/20 rounded-xl p-4 border border-amber-200 dark:border-amber-900/30">
            <h3 className="font-semibold text-amber-700 dark:text-amber-300">Non-Binding Constraints</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Has slack (excess capacity)</li>
              <li>Resource is not fully used</li>
              <li>Shadow price = 0</li>
              <li>Increasing RHS does not improve objective</li>
              <li>These are <strong>not bottlenecks</strong></li>
            </ul>
            <div className="mt-2 bg-white dark:bg-gray-800/50 p-2 rounded border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Example: Machine: 80/100 hours used → <span className="font-bold text-amber-600">Slack = 20</span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Key Insight:</strong> Binding constraints identify <strong>where to invest</strong>.
            Only binding constraints have positive shadow prices.
          </p>
        </div>
      </section>

      {/* ===== SECTION 4: SHADOW PRICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out} animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💲</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Shadow Prices (Dual Variables)
          </h2>
        </div>
        <div className="bg-purple-50/40 dark:bg-purple-950/20 rounded-xl p-5 border border-purple-200 dark:border-purple-900/30">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            A <strong>shadow price</strong> is the change in the objective value
            per unit increase in the RHS of a constraint.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">Positive Shadow Price</p>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Resource is scarce</li>
                <li>Has value</li>
                <li>Invest in this resource</li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Example: Labor shadow price = ₹50
                <br />→ 1 more hour = ₹50 more profit
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-600 dark:text-gray-400">Zero Shadow Price</p>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Resource is abundant</li>
                <li>No value</li>
                <li>Don't invest in this resource</li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Example: Machine shadow price = ₹0
                <br />→ More machine time doesn't increase profit
              </p>
            </div>
          </div>
          <div className="mt-3 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>💡 Key Insight:</strong> Shadow prices tell you
              <strong> exactly where to invest </strong> for maximum impact.
              Invest in resources with high shadow prices.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: SLACK AND SURPLUS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📏</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Slack and Surplus Variables
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-900/30">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Slack (≤ constraints)</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Amount of unused resource</li>
              <li>Slack = RHS - LHS</li>
              <li>Zero slack = binding constraint</li>
              <li>Positive slack = excess capacity</li>
            </ul>
            <div className="mt-2 bg-white dark:bg-gray-800/50 p-2 rounded border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Example: Labor: 100-80 = <span className="font-bold text-blue-600">20 hours slack</span>
              </p>
            </div>
          </div>
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Surplus (≥ constraints)</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Amount by which requirement is exceeded</li>
              <li>Surplus = LHS - RHS</li>
              <li>Zero surplus = binding constraint</li>
              <li>Positive surplus = over-fulfillment</li>
            </ul>
            <div className="mt-2 bg-white dark:bg-gray-800/50 p-2 rounded border border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-700 dark:text-gray-300">
                Example: Demand: 110-100 = <span className="font-bold text-green-600">10 units surplus</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: WORKED EXAMPLE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out} animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📝</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Worked Example: Interpreting Results
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-900 dark:text-white">LP Results:</p>
            <div className="font-mono text-sm text-gray-700 dark:text-gray-300 mt-1">
              <p>Optimal Solution: x₁ = 50, x₂ = 30</p>
              <p>Objective: Z = 1,500</p>
              <p>Constraints:</p>
              <p className="pl-4">Labor: 100/100 hours used (binding) → Shadow price = ₹25</p>
              <p className="pl-4">Machine: 80/120 hours used (slack: 40) → Shadow price = ₹0</p>
              <p className="pl-4">Demand: 50/50 units met (binding) → Shadow price = ₹10</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">Interpretation</p>
              <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li><strong>Production:</strong> Produce 50 units of Product A and 30 units of Product B.</li>
                <li><strong>Profit:</strong> Total profit = ₹1,500.</li>
                <li><strong>Labor:</strong> Fully used. Value of additional labor = ₹25/hour.</li>
                <li><strong>Machine:</strong> 40 hours unused. No value in adding machine capacity.</li>
                <li><strong>Demand:</strong> Exactly met. Value of additional demand = ₹10/unit.</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-amber-200 dark:border-amber-900/50">
              <p className="font-semibold text-amber-700 dark:text-amber-300">Recommendations</p>
              <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <li><strong>Invest in:</strong> Labor (highest shadow price: ₹25) and Demand (₹10).</li>
                <li><strong>Don't invest in:</strong> Machine time (shadow price: ₹0).</li>
                <li><strong>Action:</strong> Hire more workers or increase marketing to boost demand.</li>
              </ul>
            </div>
          </div>
          <div className="mt-3 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>💡 Key Takeaway:</strong> Shadow prices guide investment
              decisions. Focus on resources with the highest positive shadow prices.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 7: COMMON MISTAKES ===== */}
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
                mistake: "Misinterpreting shadow prices",
                fix: "Shadow prices are marginal values, not total values.",
              },
              {
                mistake: "Ignoring slack variables",
                fix: "Slack tells you about excess capacity — valuable information.",
              },
              {
                mistake: "Assuming all resources are binding",
                fix: "Only some resources are fully used; others have slack.",
              },
              {
                mistake: "Not linking results to decisions",
                fix: "Always translate numbers into actionable recommendations.",
              },
              {
                mistake: "Forgetting sensitivity analysis",
                fix: "Shadow prices have valid ranges; check them.",
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
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Check which constraints are binding.",
            "Calculate and interpret shadow prices.",
            "Identify slack and surplus values.",
            "Link results to real-world decisions.",
            "Use sensitivity analysis to test robustness.",
            "Present results in business language.",
            "Focus on resources with positive shadow prices.",
            "Document assumptions and limitations.",
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

      {/* ===== SECTION 9: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Shadow prices = value",
              desc: "They tell you exactly how much additional resources are worth.",
            },
            {
              title: "Binding constraints = bottlenecks",
              desc: "Focus improvement efforts here.",
            },
            {
              title: "Slack = excess capacity",
              desc: "Don't invest in resources with slack.",
            },
            {
              title: "Zero variables = not worth it",
              desc: "If a variable is zero, that activity isn't profitable.",
            },
            {
              title: "Think in business terms",
              desc: "Translate math to 'produce more,' 'hire workers,' etc.",
            },
            {
              title: "Use sensitivity analysis",
              desc: "Check how changes affect the solution.",
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

      {/* ===== SECTION 10: HINT SECTION ===== */}
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
                <strong>Observe carefully:</strong> Why does a resource with
                slack have a shadow price of zero? What does this tell you
                about that resource?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If labor's shadow price is
                ₹25, what would you recommend to management? How much would you
                be willing to pay for one more hour of labor?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu sees that a
                constraint has slack of 50 hours. What should he conclude about
                that resource's value?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 11: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Mini Checklist
          </h2>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            After this topic, you should be able to:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            {[
              "✅ Interpret optimal values of decision variables",
              "✅ Identify binding vs non-binding constraints",
              "✅ Calculate and interpret shadow prices",
              "✅ Explain slack and surplus variables",
              "✅ Translate LP results into business recommendations",
              "✅ Use shadow prices to guide investment decisions",
              "✅ Recognize common interpretation mistakes",
              "✅ Present results in actionable terms",
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
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <FAQTemplate
          title="Interpreting Variables and Constraints FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 13: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <PlainTextPrint
          content={noteText}
          title="Interpreting Variables and Constraints - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic35_note.txt"
        />
      </div>

      {/* ===== SECTION 14: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <Teacher
          note={
            "Interpreting LP results is what makes LP useful in practice. I tell my students: 'The numbers don't mean anything until you translate them into decisions.' The most valuable insight from an LP solution is often the shadow prices — they tell you exactly where to invest. If labor has a shadow price of ₹50, that means each additional labor hour is worth ₹50. This is powerful information for making investment decisions. Susmita from Barrackpore once told me she used shadow prices to convince her company to invest in more labor capacity, which increased profits by 15%. Remember: binding constraints are bottlenecks; they tell you where to focus your improvement efforts. Non-binding constraints have slack — they're not limiting you. Master interpretation, and you'll turn LP from a mathematical exercise into a powerful decision-making tool."
          }
        />
      </div>
    </div>
  );
};

export default Topic35;