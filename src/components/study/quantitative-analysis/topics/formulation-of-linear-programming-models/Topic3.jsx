import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic3_files/topic3_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic3: Objective function
 *
 * @component
 * @returns {JSX.Element} The rendered Topic3 component
 *
 * @purpose Explains the objective function in Linear Programming: its definition,
 * types, formulation, interpretation, and role in optimization.
 *
 * @when_used After covering decision variables (Topic2), this topic introduces
 * the second pillar of LP – what we want to optimize.
 */
const Topic3 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 3
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Objective Function
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Objective Function
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          The goal you want to achieve — the "why" of every Linear Programming
          model.
        </p>
      </header>

      {/* ===== SECTION 1: WHAT IS THE OBJECTIVE FUNCTION? ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎯</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            What Is the Objective Function?
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            The <strong>objective function</strong> is a linear expression that
            defines the <strong>goal</strong> of the LP problem. It tells us
            what we are trying to achieve — whether it's{" "}
            <strong>maximizing</strong> something desirable (like profit) or{" "}
            <strong>minimizing</strong> something undesirable (like cost).
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mt-2">
            Mathematically, it is written as:
          </p>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-center text-lg font-mono">
            Z = c₁x₁ + c₂x₂ + ... + cₙxₙ
          </div>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300 text-base">
            <li>
              <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                Z
              </code>{" "}
              = objective value (profit, cost, etc.)
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                cᵢ
              </code>{" "}
              = coefficient (contribution per unit of variable xᵢ)
            </li>
            <li>
              <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                xᵢ
              </code>{" "}
              = decision variables
            </li>
          </ul>
        </div>

        {/* SVG: Objective function illustration */}
        <div className="mt-6 bg-blue-50/40 dark:bg-blue-950/20 rounded-2xl p-4 md:p-6 border border-blue-100 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <svg
            viewBox="0 0 600 200"
            className="w-full h-auto"
            aria-label="Objective function illustration"
            role="img"
          >
            <g>
              <text x="10" y="30" fontSize="16" fill="#1e293b" dark="#e2e8f0" fontWeight="bold">Objective Function</text>
              <text x="10" y="55" fontSize="14" fill="#475569" dark="#94a3b8">Z = 3x₁ + 2x₂</text>
              <text x="10" y="75" fontSize="12" fill="#64748b" dark="#94a3b8">(Maximize or Minimize)</text>
            </g>
            <g>
              {/* Axes */}
              <line x1="50" y1="170" x2="550" y2="170" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="50" y1="20" x2="50" y2="170" stroke="#94a3b8" strokeWidth="1.5" />
              <text x="540" y="165" fontSize="12" fill="#64748b" dark="#94a3b8">x₁</text>
              <text x="30" y="25" fontSize="12" fill="#64748b" dark="#94a3b8">x₂</text>

              {/* Feasible region */}
              <polygon points="50,170 200,170 450,80 300,30 50,30" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4,4" />

              {/* Objective lines (parallel) */}
              <line x1="80" y1="160" x2="520" y2="20" stroke="#ef4444" strokeWidth="2" strokeDasharray="6,4">
                <animate attributeName="y1" values="160;120;160" dur="6s" repeatCount="indefinite" />
                <animate attributeName="y2" values="20;-20;20" dur="6s" repeatCount="indefinite" />
              </line>
              <line x1="60" y1="170" x2="540" y2="40" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />
              <line x1="100" y1="150" x2="500" y2="0" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />

              {/* Arrow showing direction of improvement */}
              <g transform="translate(520, 120)">
                <line x1="0" y1="20" x2="0" y2="-10" stroke="#22c55e" strokeWidth="2" />
                <polygon points="-5,-10 0,-20 5,-10" fill="#22c55e" stroke="#22c55e" strokeWidth="1">
                  <animate attributeName="transform" values="translate(0,0);translate(0,-5);translate(0,0)" dur="2s" repeatCount="indefinite" />
                </polygon>
                <text x="8" y="-6" fontSize="12" fill="#22c55e" fontWeight="bold">Better</text>
              </g>

              {/* Labels */}
              <text x="200" y="160" fontSize="12" fill="#64748b" dark="#94a3b8">Feasible Region</text>
              <text x="400" y="110" fontSize="12" fill="#ef4444" fontWeight="bold">Z = constant</text>
            </g>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The objective function lines (red) represent different levels of Z; the arrow shows the direction of improvement.
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: TYPES OF OBJECTIVES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Types of Objective Functions
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-5 border border-green-200 dark:border-green-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📈</span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Maximization</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Goal:</strong> Make Z as large as possible.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
              <strong>Examples:</strong>
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 text-sm">
              <li>Maximize profit</li>
              <li>Maximize revenue</li>
              <li>Maximize production output</li>
              <li>Maximize return on investment</li>
            </ul>
            <div className="mt-3 bg-green-100 dark:bg-green-950/50 p-2 rounded text-xs text-green-800 dark:text-green-300">
              Typical form: <span className="font-mono">Maximize Z = 5x₁ + 3x₂</span>
            </div>
          </div>

          <div className="bg-red-50/40 dark:bg-red-950/20 rounded-xl p-5 border border-red-200 dark:border-red-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📉</span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Minimization</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <strong>Goal:</strong> Make Z as small as possible.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">
              <strong>Examples:</strong>
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 text-sm">
              <li>Minimize cost</li>
              <li>Minimize time</li>
              <li>Minimize waste</li>
              <li>Minimize distance</li>
            </ul>
            <div className="mt-3 bg-red-100 dark:bg-red-950/50 p-2 rounded text-xs text-red-800 dark:text-red-300">
              Typical form: <span className="font-mono">Minimize Z = 2x₁ + 4x₂</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: COEFFICIENTS AND THEIR MEANING ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔢</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Understanding Coefficients
          </h2>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <p className="text-gray-700 dark:text-gray-300 text-base mb-4">
            In the objective function <span className="font-mono">Z = c₁x₁ + c₂x₂ + ... + cₙxₙ</span>, each coefficient <span className="font-mono">cᵢ</span> has a specific meaning:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                type: "Profit",
                meaning: "Profit per unit of product",
                example: "c₁ = ₹100 profit per unit of Product A",
              },
              {
                type: "Cost",
                meaning: "Cost per unit of resource",
                example: "c₁ = ₹5 cost per kg of ingredient",
              },
              {
                type: "Time",
                meaning: "Time per unit of activity",
                example: "c₁ = 2 hours per unit of task",
              },
              {
                type: "Distance",
                meaning: "Distance per unit shipped",
                example: "c₁ = 10 km per unit transported",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-md">
                <h4 className="font-semibold text-gray-900 dark:text-white">{item.type}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.meaning}</p>
                <p className="text-gray-500 dark:text-gray-500 text-xs mt-1 italic">"{item.example}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: REAL-WORLD EXAMPLES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Objective Functions
          </h2>
        </div>
        <div className="space-y-4">
          {[
            {
              scenario: "🏭 Manufacturing",
              objective: "Maximize profit",
              function: "Z = 100x₁ + 80x₂ + 120x₃",
              meaning: "x₁, x₂, x₃ are quantities of three products; profit margins are ₹100, ₹80, ₹120 per unit.",
            },
            {
              scenario: "🚚 Logistics",
              objective: "Minimize shipping cost",
              function: "Z = 2x₁₁ + 3x₁₂ + 4x₂₁ + ...",
              meaning: "x_{ij} are units shipped from i to j; costs are given in ₹ per unit.",
            },
            {
              scenario: "🥗 Diet",
              objective: "Minimize cost",
              function: "Z = 15x₁ + 20x₂ + 10x₃",
              meaning: "x₁, x₂, x₃ are quantities of foods; costs are ₹15, ₹20, ₹10 per serving.",
            },
            {
              scenario: "💰 Investment",
              objective: "Maximize return",
              function: "Z = 0.12x₁ + 0.10x₂ + 0.08x₃",
              meaning: "x₁, x₂, x₃ are amounts invested; returns are 12%, 10%, 8% per year.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.scenario}</h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <span className="font-medium">Objective:</span> {item.objective}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm font-mono">
                {item.function}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">{item.meaning}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 5: TIPS & TRICKS ===== */}
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
              title: "Identify the goal first",
              desc: "Before writing the objective, clearly state: 'What am I optimizing?'",
            },
            {
              title: "Check the sign of coefficients",
              desc: "For maximization, positive coefficients are good; for minimization, positive coefficients are costs.",
            },
            {
              title: "Scale if necessary",
              desc: "If coefficients have very different magnitudes, consider scaling variables for numerical stability.",
            },
            {
              title: "Test with a feasible point",
              desc: "Plug in a feasible solution to see if the objective value makes sense.",
            },
            {
              title: "Watch for hidden objectives",
              desc: "Sometimes the problem statement implies multiple goals; choose the primary one.",
            },
            {
              title: "Use the dual for insight",
              desc: "The dual LP gives shadow prices, which reveal the marginal value of resources.",
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

      {/* ===== SECTION 6: COMMON MISTAKES ===== */}
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
                mistake: "Forgetting to include all variables",
                fix: "Every decision variable should appear in the objective function, even if its coefficient is zero (indicate explicitly).",
              },
              {
                mistake: "Using non-linear terms",
                fix: "LP requires linearity. If you have x² or xy, you cannot use LP.",
              },
              {
                mistake: "Confusing maximization with minimization",
                fix: "Be clear: profit = maximize, cost = minimize. Don't mix them.",
              },
              {
                mistake: "Ignoring units",
                fix: "Ensure coefficients and variables are in compatible units.",
              },
              {
                mistake: "Forgetting constants",
                fix: "Constants don't affect the optimal solution; they can be dropped unless they are essential.",
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

      {/* ===== SECTION 7: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Write the objective function clearly: Z = ... with all variables.",
            "Specify whether it's maximization or minimization.",
            "Define all coefficients and their units.",
            "Include all variables that affect the goal.",
            "Verify linearity – no powers or products.",
            "Check that the objective aligns with the problem statement.",
            "Test the objective with a feasible solution to ensure it's meaningful.",
            "Perform sensitivity analysis to understand how changes affect Z.",
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

      {/* ===== SECTION 8: HINT SECTION ===== */}
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
                <strong>Observe carefully:</strong> In a production problem, if
                the profit margin of product A increases, how would the optimal
                solution change? What if it decreases?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> Suppose you have a
                minimization problem. If you multiply the objective by -1, what
                becomes of the optimal solution?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Mahima runs a bakery
                in Barrackpore. She sells two types of cakes: chocolate and
                vanilla. Write an objective function to maximize her daily
                revenue.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 9: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Mini Checklist
          </h2>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            By the end of this topic, you should be able to:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            {[
              "✅ Define the objective function and its role in LP",
              "✅ Distinguish between maximization and minimization objectives",
              "✅ Write the objective function mathematically",
              "✅ Interpret coefficients in the objective function",
              "✅ Identify common mistakes and avoid them",
              "✅ Apply best practices when formulating objective functions",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">{item.split(" ")[0]}</span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 10: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
        <FAQTemplate
          title="Objective Function FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 11: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <Teacher
          note={
            "The objective function is the compass of your LP model. It gives direction to the solution. I always tell my students: 'Before you even write a constraint, know what you want to achieve.' Debangshu from Jadavpur once told me he used to confuse profit maximization with cost minimization; after we practiced with real examples, he mastered it. Remember: clear objectives lead to clear solutions. Also, don't forget that the objective function must be linear. If you find yourself writing x² or x*y, you're not in LP territory anymore. Practice writing objective functions for different scenarios – it's the best way to internalize this concept."
          }
        />
      </div>
    </div>
  );
};

export default Topic3;