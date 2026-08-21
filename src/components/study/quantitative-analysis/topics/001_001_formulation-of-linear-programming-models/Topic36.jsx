import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic36_files/topic36_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic36_files/topic36_note.txt?raw";

/**
 * Topic36: Maximization and minimization problems
 *
 * @component
 * @returns {JSX.Element} The rendered Topic36 component
 *
 * @purpose Provides a comprehensive guide to understanding and formulating
 * maximization and minimization problems in LP, including their differences,
 * characteristics, and transformations.
 *
 * @when_used After interpreting variables and constraints (Topic35), this topic
 * covers the two fundamental directions of LP optimization.
 */
const Topic36 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 36
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Max vs Min Problems
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Maximization and Minimization Problems
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Understanding the two fundamental directions of LP optimization —
          and how to choose the right one for your problem.
        </p>
      </header>

      {/* ===== SECTION 1: INTRODUCTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎯</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            The Two Directions of Optimization
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            LP problems come in <strong>two flavors</strong>: Maximization and
            Minimization. Understanding the difference between these two types
            of problems is essential for correct formulation and solution
            interpretation.
          </p>
          <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg my-4 border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm text-blue-800 dark:text-blue-300 font-semibold">
              💡 Remember: The objective direction defines what "best" means.
              Maximization seeks the largest; minimization seeks the smallest.
            </p>
          </div>
        </div>

        {/* SVG: Max vs Min visualization */}
        <div className="mt-6 bg-gradient-to-r from-blue-50/40 to-green-50/40 dark:from-blue-950/20 dark:to-green-950/20 rounded-2xl p-4 md:p-6 border border-blue-200 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <svg
            viewBox="0 0 650 200"
            className="w-full h-auto"
            aria-label="Maximization vs minimization comparison"
            role="img"
          >
            {/* Maximization side */}
            <rect x="60" y="30" width="250" height="140" rx="12" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="185" y="65" fontSize="16" fill="#3b82f6" textAnchor="middle" fontWeight="bold">Maximization</text>
            <text x="185" y="95" fontSize="12" fill="#475569" dark="#94a3b8" textAnchor="middle">Maximize Profit</text>
            <text x="185" y="115" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Keywords: Profit, Revenue</text>
            <text x="185" y="135" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Constraints: ≤ (limits)</text>
            <text x="185" y="155" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Find the highest point</text>

            {/* Arrow between */}
            <line x1="310" y1="100" x2="340" y2="100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-maxmin)" />

            {/* Minimization side */}
            <rect x="340" y="30" width="250" height="140" rx="12" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2.5" />
            <text x="465" y="65" fontSize="16" fill="#22c55e" textAnchor="middle" fontWeight="bold">Minimization</text>
            <text x="465" y="95" fontSize="12" fill="#475569" dark="#94a3b8" textAnchor="middle">Minimize Cost</text>
            <text x="465" y="115" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Keywords: Cost, Expense</text>
            <text x="465" y="135" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Constraints: ≥ (requirements)</text>
            <text x="465" y="155" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Find the lowest point</text>

            <defs>
              <marker id="arrow-maxmin" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Maximization and minimization are two sides of the same coin.
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: KEY DIFFERENCES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📊</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Key Differences
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Feature</th>
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Maximization</th>
                <th className="px-4 py-2 text-left border border-gray-200 dark:border-gray-700">Minimization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Objective</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Maximize Z</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Minimize Z</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Keywords</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Profit, Revenue, Best</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Cost, Expense, Cheapest</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Constraints</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Usually ≤ (limits)</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Usually ≥ (requirements)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Graph</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Highest point</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Lowest point</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700 font-medium">Interpretation</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Best outcome</td>
                <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">Least expensive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ===== SECTION 3: CONVERTING MIN TO MAX ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔄</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Converting Minimization to Maximization
          </h2>
        </div>
        <div className="bg-amber-50/40 dark:bg-amber-950/20 rounded-xl p-5 border border-amber-200 dark:border-amber-900/30">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            A minimization problem can be <strong>converted</strong> to a
            maximization problem using a simple transformation:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">Original</p>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                Minimize Z = 5x₁ + 3x₂
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">Equivalent</p>
              <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                Maximize W = -5x₁ - 3x₂
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Then: Z_min = -W_max
              </p>
            </div>
          </div>
          <div className="mt-3 bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-lg border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>💡 Key Insight:</strong> Minimizing f(x) is equivalent to
              maximizing -f(x). This is useful if your solver only handles
              maximization.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: WORKED EXAMPLE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out} animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📝</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Worked Example: Identifying Max vs Min
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-blue-200 dark:border-blue-900/50">
              <p className="font-semibold text-blue-600 dark:text-blue-400">Example 1</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                "A company wants to <strong>maximize profit</strong> by producing
                two products with limited resources."
              </p>
              <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mt-1">
                Maximize Z = 10x₁ + 15x₂
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                ✓ Maximization — Profit is the objective.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">Example 2</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                "A hospital wants to <strong>minimize cost</strong> while
                meeting minimum nutritional requirements for patients."
              </p>
              <p className="text-sm font-mono text-green-600 dark:text-green-400 mt-1">
                Minimize Z = 50x₁ + 80x₂
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                ✓ Minimization — Cost is the objective.
              </p>
            </div>
          </div>
          <div className="mt-3 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>💡 Key Takeaway:</strong> The problem statement always
              indicates the objective direction. Look for keywords like
              "maximize" or "minimize" (or their variants).
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: COMMON MISTAKES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
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
                mistake: "Using the wrong direction (max vs min)",
                fix: "Check the problem statement carefully for keywords.",
              },
              {
                mistake: "Forgetting to convert minimization to maximization",
                fix: "Use Z_min = -W_max if using a maximization solver.",
              },
              {
                mistake: "Using ≤ when ≥ is needed",
                fix: "Maximization typically has ≤; minimization typically has ≥.",
              },
              {
                mistake: "Misinterpreting the optimal solution",
                fix: "The optimal solution is the largest or smallest value, depending on the direction.",
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

      {/* ===== SECTION 6: KEYWORD GUIDE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔑</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Keyword Guide
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-900/30">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Maximization Keywords</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Maximize</li>
              <li>Profit</li>
              <li>Revenue</li>
              <li>Increase</li>
              <li>Largest</li>
              <li>Highest</li>
              <li>Best</li>
              <li>Optimal</li>
            </ul>
          </div>
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Minimization Keywords</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Minimize</li>
              <li>Cost</li>
              <li>Expense</li>
              <li>Decrease</li>
              <li>Smallest</li>
              <li>Lowest</li>
              <li>Cheapest</li>
              <li>Reduce</li>
            </ul>
          </div>
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
            "Clearly state the objective direction (Max or Min).",
            "Check constraints match the objective direction.",
            "Use the conversion technique if needed.",
            "Test with simple values to verify direction.",
            "Document the objective direction.",
            "Look for keywords in the problem statement.",
            "Verify the solution makes sense.",
            "Use both max and min for sensitivity analysis.",
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

      {/* ===== SECTION 8: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Profit = Maximize",
              desc: "If you see 'profit,' it's almost always a maximization problem.",
            },
            {
              title: "Cost = Minimize",
              desc: "If you see 'cost,' it's almost always a minimization problem.",
            },
            {
              title: "Check constraints",
              desc: "Max problems usually have ≤; Min problems usually have ≥.",
            },
            {
              title: "Use the conversion",
              desc: "If your solver only handles maximization, convert minimization.",
            },
            {
              title: "Test with numbers",
              desc: "Plug in values to verify you're optimizing in the right direction.",
            },
            {
              title: "Read carefully",
              desc: "Sometimes problems use 'least cost' or 'best profit'.",
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
                <strong>Observe carefully:</strong> Why do maximization problems
                typically have ≤ constraints and minimization problems typically
                have ≥ constraints?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If you have a minimization
                problem but only have a maximization solver, how would you solve it?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Mahima is reading a
                problem that says "The company wants to maximize profit and
                minimize cost." Is this a valid LP problem? Why or why not?
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
            After this topic, you should be able to:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            {[
              "✅ Define maximization and minimization problems",
              "✅ Identify keywords for each type",
              "✅ Distinguish between max and min problems",
              "✅ Convert minimization to maximization",
              "✅ Use correct constraint types for each",
              "✅ Recognize real-world examples of each type",
              "✅ Avoid common mistakes in direction choice",
              "✅ Apply the 7-step procedure to both types",
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
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <FAQTemplate
          title="Maximization and Minimization FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 12: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <PlainTextPrint
          content={noteText}
          title="Maximization and Minimization - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic36_note.txt"
        />
      </div>

      {/* ===== SECTION 13: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out} animation-delay-1150">
        <Teacher
          note={
            "Maximization and minimization are the two fundamental directions of LP. I tell my students: 'Every LP problem is either trying to make something as big as possible or as small as possible.' The key is knowing which one you're dealing with. The problem statement always gives you the direction—you just need to look for the keywords. Susmita from Barrackpore once told me she used to confuse max and min until she started making a list of keywords. Now she never makes that mistake. Remember: profit, revenue, maximize → max; cost, expense, minimize → min. Also, the constraints give you a hint: max problems usually have ≤ (resource limits), and min problems usually have ≥ (requirements). Practice identifying the direction from problem statements until it becomes automatic."
          }
        />
      </div>
    </div>
  );
};

export default Topic36;