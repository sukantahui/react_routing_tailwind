import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic34_files/topic34_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic34_files/topic34_note.txt?raw";

/**
 * Topic34: Checking a formulated LP model
 *
 * @component
 * @returns {JSX.Element} The rendered Topic34 component
 *
 * @purpose Provides a comprehensive guide to verifying and validating
 * formulated LP models, with checklists, techniques, and practical examples.
 *
 * @when_used After distinguishing objective from constraints (Topic33),
 * this topic covers the essential skill of model checking before solving.
 */
const Topic34 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 34
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Checking LP Models
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Checking a Formulated LP Model
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          A systematic approach to verifying and validating your LP models
          before solving — catching errors early and building confidence.
        </p>
      </header>

      {/* ===== SECTION 1: INTRODUCTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Why Checking Your Model Matters
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            Formulating an LP model is only <strong>half the battle</strong>.
            Before solving, you must check that your model is correct. A small
            error in formulation can lead to completely wrong solutions.
          </p>
          <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg my-4 border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm text-blue-800 dark:text-blue-300 font-semibold">
              💡 Remember: A well-checked model is the foundation for a correct
              solution. Take the time to verify before solving.
            </p>
          </div>
        </div>

        {/* SVG: Model checking process */}
        <div className="mt-6 bg-cyan-50/40 dark:bg-cyan-950/20 rounded-2xl p-4 md:p-6 border border-cyan-100 dark:border-cyan-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
          <svg
            viewBox="0 0 650 200"
            className="w-full h-auto"
            aria-label="Model checking process"
            role="img"
          >
            <g>
              <rect x="10" y="30" width="140" height="60" rx="10" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
              <text x="80" y="55" fontSize="13" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Variables</text>
              <text x="80" y="75" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Definitions & units</text>
            </g>
            <g>
              <line x1="150" y1="60" x2="180" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-check)" />
            </g>
            <g>
              <rect x="180" y="30" width="140" height="60" rx="10" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" />
              <text x="250" y="55" fontSize="13" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Objective</text>
              <text x="250" y="75" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Max/Min & coefficients</text>
            </g>
            <g>
              <line x1="320" y1="60" x2="350" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-check)" />
            </g>
            <g>
              <rect x="350" y="30" width="140" height="60" rx="10" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2" />
              <text x="420" y="55" fontSize="13" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Constraints</text>
              <text x="420" y="75" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Inequalities & RHS</text>
            </g>
            <g>
              <line x1="490" y1="60" x2="520" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-check)" />
            </g>
            <g>
              <rect x="520" y="30" width="120" height="60" rx="10" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
              <text x="580" y="55" fontSize="13" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Feasibility</text>
              <text x="580" y="75" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Test solutions</text>
            </g>
            <defs>
              <marker id="arrow-check" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            A systematic approach to checking your LP model.
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: THE CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            The Model Checking Checklist
          </h2>
        </div>
        <div className="space-y-4">
          {[
            {
              title: "Variables",
              items: [
                "Are all variables defined clearly with units?",
                "Are there variables for every decision?",
                "Are variables independent (not functions of each other)?",
                "Is non-negativity included?",
              ],
            },
            {
              title: "Objective Function",
              items: [
                "Is the objective clearly stated (Max or Min)?",
                "Are all variables included in the objective?",
                "Are the coefficients correct (profit, cost, etc.)?",
                "Is the objective linear (no squares, products)?",
              ],
            },
            {
              title: "Constraints",
              items: [
                "Are all constraints included?",
                "Are coefficients correct (resource usage)?",
                "Is the inequality direction correct (≤, ≥, =)?",
                "Are units consistent?",
                "Is the RHS correct (available resources, requirements)?",
              ],
            },
            {
              title: "Consistency & Feasibility",
              items: [
                "Are variable names used consistently?",
                "Are units consistent across all equations?",
                "Does the model make logical sense?",
                "Is there at least one feasible solution?",
              ],
            },
          ].map((section, idx) => (
            <div
              key={idx}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{section.title}</h3>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-0.5">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: DIMENSIONAL ANALYSIS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📏</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Dimensional Analysis
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Check that all terms in each equation have the same units:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">Constraint Example</p>
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mt-1">
                (labor hours/unit) × (units) = labor hours
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Both sides have units of <strong>hours</strong> ✓
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">Objective Example</p>
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mt-1">
                (profit/unit) × (units) = total profit
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Both sides have units of <strong>rupees</strong> ✓
              </p>
            </div>
          </div>
          <div className="mt-3 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>💡 Warning:</strong> If units don't match, you're
              adding apples and oranges. This is a sign of a formulation error.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: WORKED EXAMPLE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out} animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📝</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Worked Example: Checking a Model
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-900 dark:text-white">Model to Check:</p>
            <div className="font-mono text-sm text-gray-700 dark:text-gray-300 mt-1">
              <p>Maximize Z = 10x + 15y</p>
              <p>Subject to:</p>
              <p className="pl-4">2x + 3y ≤ 100</p>
              <p className="pl-4">4x + 2y ≤ 80</p>
              <p className="pl-4">x ≤ 30</p>
              <p className="pl-4">y ≥ 5</p>
              <p className="pl-4">x ≥ 0, y ≥ 0</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">✓ Variables</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                x and y are defined with units. Non-negativity included.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">✓ Objective</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Maximize Z = 10x + 15y (Maximization stated, coefficients look correct).
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">✓ Constraints</p>
              <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                <li>2x + 3y ≤ 100 (resource constraint)</li>
                <li>4x + 2y ≤ 80 (resource constraint)</li>
                <li>x ≤ 30 (upper bound)</li>
                <li>y ≥ 5 (lower bound)</li>
                <li>x ≥ 0, y ≥ 0 (non-negativity)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">✓ Feasibility Test</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Test x = 10, y = 5: 2(10)+3(5)=35 ≤ 100 ✓, 4(10)+2(5)=50 ≤ 80 ✓, x=10≤30 ✓, y=5≥5 ✓
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">Feasible solution found!</p>
            </div>
          </div>
          <div className="mt-3 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>💡 Key Takeaway:</strong> Systematic checking catches errors.
              This model passes all checks and is ready for solving.
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 5: COMMON ERRORS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">⚠️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Common Errors to Check
          </h2>
        </div>
        <div className="bg-red-50/40 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-900/30 p-5">
          <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-sm">
            {[
              {
                error: "Missing a constraint",
                fix: "Re-read the problem and list all limitations.",
              },
              {
                error: "Wrong inequality direction",
                fix: "Check: 'at most' → ≤, 'at least' → ≥.",
              },
              {
                error: "Wrong coefficient",
                fix: "Verify resource usage data carefully.",
              },
              {
                error: "Inconsistent units",
                fix: "Convert all terms to the same units.",
              },
              {
                error: "Non-linear terms",
                fix: "LP requires linearity; check for squares or products.",
              },
              {
                error: "Missing non-negativity",
                fix: "Always add x ≥ 0 for all variables.",
              },
              {
                error: "Empty feasible region",
                fix: "Test with a simple solution; check for contradictions.",
              },
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-red-500 dark:text-red-400 text-lg flex-shrink-0 mt-0.5">✗</span>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">{item.error}</span>
                  <br />
                  <span className="text-gray-600 dark:text-gray-400 text-xs">✓ {item.fix}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 6: VALIDATION TECHNIQUES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔬</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Validation Techniques
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              technique: "Test with a simple feasible solution",
              description: "Plug in simple values and check all constraints.",
              example: "x = 0, y = 0 (if allowed) or minimum values.",
            },
            {
              technique: "Check extreme solutions",
              description: "Test variables at their bounds (0, maximum).",
              example: "x = 0, y = max; or x = max, y = 0.",
            },
            {
              technique: "Dimensional analysis",
              description: "Verify all units are consistent.",
              example: "Labor hours on both sides of labor constraint.",
            },
            {
              technique: "Peer review",
              description: "Ask someone else to review the model.",
              example: "Fresh eyes catch errors you might miss.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.technique}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{item.description}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                <span className="font-medium">Example:</span> {item.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 7: TIPS & TRICKS ===== */}
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
              title: "Read the problem again",
              desc: "After formulating, re-read the original problem to check alignment.",
            },
            {
              title: "Check all numbers",
              desc: "Verify that every number in the model matches the problem data.",
            },
            {
              title: "Test with a simple solution",
              desc: "If you can't find a feasible solution, something is wrong.",
            },
            {
              title: "Check the objective direction",
              desc: "Maximize vs Minimize must match the problem.",
            },
            {
              title: "Verify units",
              desc: "Dimensional analysis catches many errors.",
            },
            {
              title: "Use a checklist",
              desc: "A systematic checklist prevents missed items.",
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
            "Write the model neatly with descriptive labels.",
            "Check each constraint individually against the problem.",
            "Use a checklist systematically.",
            "Test with a simple feasible solution.",
            "Verify units using dimensional analysis.",
            "Document assumptions made.",
            "Review the model with a colleague.",
            "Read the original problem again after formulating.",
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
                <strong>Observe carefully:</strong> What would happen if you
                forgot a constraint in an LP model? How would the solution change?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> Take a model you've formulated
                and intentionally add an error. Can you spot it using the checklist?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Susmita is checking a
                model and finds that a constraint has inconsistent units. What
                should she do?
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
            After this topic, you should be able to check LP models for:
          </p>
          <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
            {[
              "✅ Correct variable definitions with units",
              "✅ Proper objective function (Max/Min, coefficients, linearity)",
              "✅ Complete and correct constraints (inequalities, coefficients, RHS)",
              "✅ Consistent units (dimensional analysis)",
              "✅ Feasibility (at least one feasible solution)",
              "✅ Common errors (missing constraints, wrong direction, non-linearity)",
              "✅ Validation techniques (simple solutions, extreme points, peer review)",
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
          title="Checking LP Models FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 12: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <PlainTextPrint
          content={noteText}
          title="Checking LP Models - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic34_note.txt"
        />
      </div>

      {/* ===== SECTION 13: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <Teacher
          note={
            "Checking your LP model is a skill that separates good analysts from great ones. I tell my students: 'Never trust your first formulation—always check it.' The most common errors are the simplest ones: forgetting a constraint, using the wrong inequality direction, or inconsistent units. I've seen students spend hours solving a model that had a simple error in formulation. Mahima from Jadavpur once told me she saved three hours of debugging by using the checklist before solving. Remember: a systematic check takes only a few minutes but can save hours of work. Use the checklist every time, and you'll catch errors before they cause problems."
          }
        />
      </div>
    </div>
  );
};

export default Topic34;