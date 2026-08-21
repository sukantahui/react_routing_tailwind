import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic5_files/topic5_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5: Non-negativity restrictions
 *
 * @component
 * @returns {JSX.Element} The rendered Topic5 component
 *
 * @purpose Explains the importance and role of non-negativity restrictions in
 * Linear Programming, including why they are required, how to handle free
 * variables, and common pitfalls.
 *
 * @when_used After covering constraints (Topic4), this topic focuses on the
 * essential non-negativity constraints that every LP model must include.
 */
const Topic5 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 5
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Non‑negativity
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Non‑negativity Restrictions
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          The silent gatekeeper — ensuring every decision variable represents a
          realistic, non‑negative quantity.
        </p>
      </header>

      {/* ===== SECTION 1: DEFINITION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🚫</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            What Are Non‑negativity Restrictions?
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            <strong>Non‑negativity restrictions</strong> are constraints that
            require each decision variable to be <strong>greater than or equal
            to zero</strong>.
          </p>
          <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg my-4 border border-blue-200 dark:border-blue-900/50">
            <p className="font-mono text-lg text-blue-800 dark:text-blue-300">
              x₁ ≥ 0, x₂ ≥ 0, ..., xₙ ≥ 0
            </p>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            They are fundamental to most LP problems because decision variables
            represent quantities that <strong>cannot be negative</strong> in the
            real world — units produced, hours worked, money invested, etc.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-base mt-2">
            Think of non‑negativity as the <strong>baseline reality check</strong>.
            Before you even consider other constraints, you must ensure that
            your variables make physical sense. You can't produce -10 chairs,
            invest -$5,000, or hire -3 employees.
          </p>
        </div>

        {/* SVG: Non-negativity as first quadrant */}
        <div className="mt-6 bg-purple-50/40 dark:bg-purple-950/20 rounded-2xl p-4 md:p-6 border border-purple-100 dark:border-purple-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
          <svg
            viewBox="0 0 400 400"
            className="w-full max-w-sm mx-auto h-auto"
            aria-label="Non-negativity restricts to first quadrant"
            role="img"
          >
            <rect x="0" y="0" width="400" height="400" fill="none" />
            {/* Axes */}
            <line x1="50" y1="350" x2="370" y2="350" stroke="#94a3b8" strokeWidth="2" />
            <line x1="50" y1="350" x2="50" y2="30" stroke="#94a3b8" strokeWidth="2" />
            <text x="375" y="370" fontSize="14" fill="#475569" dark="#94a3b8">x₁</text>
            <text x="30" y="28" fontSize="14" fill="#475569" dark="#94a3b8">x₂</text>

            {/* Feasible region (first quadrant) */}
            <rect x="50" y="50" width="300" height="300" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8,4" />

            {/* Shading for non-negative region */}
            <text x="200" y="200" fontSize="16" fill="#3b82f6" fontWeight="bold" textAnchor="middle">
              Feasible Region
            </text>
            <text x="200" y="225" fontSize="12" fill="#64748b" dark="#94a3b8" textAnchor="middle">
              (x₁ ≥ 0, x₂ ≥ 0)
            </text>

            {/* Animated dot showing non-negative movement */}
            <circle cx="100" cy="250" r="8" fill="#22c55e">
              <animate attributeName="cx" values="100;300;100" dur="6s" repeatCount="indefinite" />
              <animate attributeName="cy" values="250;100;250" dur="6s" repeatCount="indefinite" />
              <animate attributeName="fill" values="#22c55e;#3b82f6;#22c55e" dur="6s" repeatCount="indefinite" />
            </circle>
            <text x="100" y="280" fontSize="10" fill="#22c55e">Allowed</text>

            {/* Cross marks on negative axes */}
            <text x="20" y="320" fontSize="20" fill="#ef4444" fontWeight="bold">✗</text>
            <text x="300" y="380" fontSize="20" fill="#ef4444" fontWeight="bold">✗</text>
            <text x="20" y="30" fontSize="20" fill="#ef4444" fontWeight="bold">✗</text>
            <text x="380" y="30" fontSize="20" fill="#ef4444" fontWeight="bold">✗</text>
            <text x="200" y="380" fontSize="14" fill="#ef4444" fontWeight="bold">Negative not allowed</text>

            {/* Axis labels */}
            <text x="280" y="365" fontSize="12" fill="#475569" dark="#94a3b8">Non‑negative values only</text>
            <text x="35" y="180" fontSize="12" fill="#475569" dark="#94a3b8" transform="rotate(-90, 35, 180)">Non‑negative values only</text>

            {/* Pulsing border effect */}
            <rect x="50" y="50" width="300" height="300" fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="8,4" opacity="0.5">
              <animate attributeName="strokeOpacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
            </rect>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Non‑negativity restricts the feasible region to the first quadrant (positive orthant).
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: PURPOSE AND IMPORTANCE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎯</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Purpose and Importance
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Realism",
              desc: "Most physical quantities cannot be negative – you can't produce negative units, spend negative money, or hire negative employees.",
            },
            {
              title: "Mathematical Necessity",
              desc: "LP algorithms like the Simplex method require non‑negative variables to start at the origin and move along edges of the feasible region.",
            },
            {
              title: "Prevents Absurd Solutions",
              desc: "Without non‑negativity, the optimal solution might involve negative values that make no practical sense, like producing -50 units.",
            },
            {
              title: "Defines the Feasible Region",
              desc: "Non‑negativity cuts the solution space to the positive orthant, bounding the feasible region and making it easier to solve.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: WHY ARE THEY REQUIRED? ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Why Are They Required?
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <ul className="list-disc pl-5 space-y-3 text-gray-700 dark:text-gray-300 text-sm">
            <li>
              <strong>LP algorithms assume non‑negativity:</strong> The Simplex
              method relies on the fact that variables are ≥ 0 to ensure the
              feasible region contains the origin and that basic feasible
              solutions exist. Without this, the algorithm cannot start.
            </li>
            <li>
              <strong>Without them, the problem may be unbounded:</strong> If
              variables can go infinitely negative, the objective might also be
              unbounded, making the problem unsolvable. For example, if x can
              be negative and the objective has a negative coefficient, you
              could make the objective infinitely large.
            </li>
            <li>
              <strong>Transformation to standard form:</strong> All LP solvers
              convert problems to standard form, which requires all variables
              to be non‑negative. This is a prerequisite for using computational
              tools.
            </li>
            <li>
              <strong>Economic interpretation:</strong> Non‑negativity reflects
              the economic reality that you cannot consume or produce negative
              amounts of goods or services.
            </li>
          </ul>
          <div className="mt-3 bg-white dark:bg-gray-800/50 rounded-lg p-3">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Example: Free Variable Transformation</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              If you have a variable x representing net profit that could be negative,
              replace x with x⁺ - x⁻, where x⁺ ≥ 0 and x⁻ ≥ 0.
            </p>
            <div className="mt-1 font-mono text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <p>Original: x (free)</p>
              <p>After transformation: x = x⁺ - x⁻, x⁺ ≥ 0, x⁻ ≥ 0</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: REAL-WORLD EXAMPLES (6+) ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real‑World Examples
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "🏭 Production",
              var: "x₁ = units of product A",
              reason: "Cannot produce negative units. Negative production has no physical meaning.",
            },
            {
              domain: "💰 Investment",
              var: "x₁ = dollars invested in stocks",
              reason: "Cannot invest negative money. A negative investment would mean receiving money.",
            },
            {
              domain: "🥗 Diet",
              var: "x₁ = servings of food 1",
              reason: "Cannot consume negative servings. You can't eat -2 apples.",
            },
            {
              domain: "👷 Workforce",
              var: "x₁ = number of employees",
              reason: "Cannot hire negative employees. You can't have -5 workers.",
            },
            {
              domain: "🚚 Transportation",
              var: "x_{ij} = units shipped from i to j",
              reason: "Cannot ship negative quantities. You can't send -10 units.",
            },
            {
              domain: "📢 Advertising",
              var: "x₁ = dollars spent on TV ads",
              reason: "Cannot spend negative money. Advertising spend is always ≥ 0.",
            },
            {
              domain: "⏰ Time Management",
              var: "x₁ = hours allocated to task A",
              reason: "Cannot allocate negative hours. Time is always non‑negative.",
            },
            {
              domain: "🌾 Agriculture",
              var: "x₁ = acres allocated to crop 1",
              reason: "Cannot allocate negative land. You can't farm -5 acres.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.domain}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                <span className="font-medium">Variable:</span> {item.var}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <span className="font-medium">Why ≥ 0:</span> {item.reason}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 5: HANDLING FREE VARIABLES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔄</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Handling Free Variables (Unrestricted in Sign)
          </h2>
        </div>
        <div className="bg-amber-50/40 dark:bg-amber-950/20 rounded-xl p-5 border border-amber-200 dark:border-amber-900/30">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            In some cases, a variable may represent a net quantity that can be
            negative (e.g., net profit = revenue - cost). Such variables are
            called <strong>"free variables"</strong> because they are unrestricted
            in sign.
          </p>

          <h4 className="font-semibold text-gray-900 dark:text-white mt-4">Transformation Method:</h4>
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 mt-2">
            <p className="font-mono text-sm">
              Let x = x⁺ - x⁻
            </p>
            <p className="font-mono text-sm">
              where x⁺ ≥ 0 and x⁻ ≥ 0
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            This substitution preserves linearity and allows the Simplex method
            to handle the variable while keeping all variables non‑negative.
          </p>

          <h4 className="font-semibold text-gray-900 dark:text-white mt-4">Example:</h4>
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 mt-2">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Original problem: Max Z = 5x₁ + 3x₂, where x₁ is free (can be negative).
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              Step 1: Replace x₁ with x₁⁺ - x₁⁻
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Step 2: New objective: Max Z = 5x₁⁺ - 5x₁⁻ + 3x₂
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Step 3: Constraints: x₁⁺ ≥ 0, x₁⁻ ≥ 0, x₂ ≥ 0
            </p>
          </div>
          <div className="mt-3 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
            <p className="text-xs text-blue-800 dark:text-blue-300">
              <strong>💡 Tip:</strong> In practice, free variables are rare in
              business problems. Most variables are naturally non‑negative.
              Only use this technique when you are certain a variable can be
              negative.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 6: TIPS & TRICKS ===== */}
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
              title: "Always include non-negativity",
              desc: "Even if it seems obvious, write x ≥ 0 for every variable. It's a professional habit.",
            },
            {
              title: "Check if a variable can be negative",
              desc: "Ask: 'Does this variable represent a net quantity?' If yes, consider transformation.",
            },
            {
              title: "Use software defaults wisely",
              desc: "Most LP solvers assume non-negativity by default. Only specify if a variable is free.",
            },
            {
              title: "Test with zero values",
              desc: "Zero is often optimal; check if your model allows zero production or allocation.",
            },
            {
              title: "Lower bounds vs non-negativity",
              desc: "If a variable must be > 0 (strictly positive), use a lower bound like x ≥ 0.1.",
            },
            {
              title: "Keep non-negativity separate",
              desc: "List it separately from other constraints for clarity and emphasis.",
            },
            {
              title: "Validate with physical meaning",
              desc: "After solving, check that all variables are non-negative. If any are negative, your model is wrong.",
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
                mistake: "Forgetting to include non-negativity",
                fix: "Always write x₁ ≥ 0, x₂ ≥ 0, ... at the end of your model.",
              },
              {
                mistake: "Assuming non-negativity is implied",
                fix: "It must be explicitly stated; don't rely on implicit assumptions.",
              },
              {
                mistake: "Confusing with lower bounds (x ≥ 5)",
                fix: "Non-negativity is x ≥ 0; lower bounds are additional constraints.",
              },
              {
                mistake: "Not transforming free variables",
                fix: "If a variable can be negative, replace it with x⁺ - x⁻.",
              },
              {
                mistake: "Using negative values in testing",
                fix: "Remember that negative values are infeasible and invalid.",
              },
              {
                mistake: "Overlooking zero as a solution",
                fix: "Zero is often optimal; don't assume positive values are always better.",
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
            "Always write x₁ ≥ 0, x₂ ≥ 0 explicitly at the end of the model.",
            "Use the same variable names in non-negativity as in the objective and constraints.",
            "If a variable is expected to be negative, transform it before solving.",
            "Keep non-negativity separate from other constraints for clarity.",
            "Check that all variables are non-negative in the final solution.",
            "If a variable has a lower bound > 0, write it as a separate constraint.",
            "In software, understand the default settings for non-negativity.",
            "Document any free variables and the transformation used.",
            "Test your model with zero values to ensure it behaves correctly.",
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
                <strong>Observe carefully:</strong> In a production problem,
                what would it mean if the optimal solution has x₁ = 0? Does
                that indicate the product should not be produced at all?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> Suppose you have a free
                variable x representing net profit. Transform it to x⁺ - x⁻.
                What happens to the objective function if x⁺ and x⁻ both
                appear with coefficients?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Mahima is a financial
                analyst in Kolkata. She wants to model the change in investment
                value, which can be positive or negative. How would she handle
                this variable in her LP model?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Reflect:</strong> Why do you think non-negativity is
                often taken for granted? How does this lead to errors?
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 10: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
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
              "✅ Define non-negativity restrictions and their purpose",
              "✅ Explain why non-negativity is required in LP",
              "✅ Write non-negativity constraints correctly for any LP model",
              "✅ Handle free variables using the x⁺ - x⁻ transformation",
              "✅ Avoid common mistakes like forgetting or misinterpreting non-negativity",
              "✅ Interpret zero values in the optimal solution",
              "✅ Apply best practices for non-negativity in model formulation",
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
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <FAQTemplate
          title="Non-negativity Restrictions FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 12: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <PlainTextPrint
          content={noteText}
          title="Non-negativity Restrictions - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic5_note.txt"
        />
      </div>

      {/* ===== SECTION 13: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1200">
        <Teacher
          note={
            "Non-negativity restrictions are often overlooked because they seem too obvious. But in my years of teaching, I've seen more errors from forgetting these simple constraints than from complex formulation mistakes. I tell my students: 'If you forget non-negativity, your model is incomplete—full stop.' The transformation for free variables is also a common stumbling block. Remember, x = x⁺ - x⁻ is a powerful technique that preserves linearity. Mahima from Jadavpur once spent three hours debugging a model only to realize she'd forgotten x ≥ 0. Don't make that mistake. Always, always write your non-negativity constraints explicitly, and check them first when something goes wrong."
          }
        />
      </div>
    </div>
  );
};

export default Topic5;