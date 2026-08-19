import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic31_files/topic31_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic31_files/topic31_note.txt?raw";

/**
 * Topic31: Identifying decision variables in complex word problems
 *
 * @component
 * @returns {JSX.Element} The rendered Topic31 component
 *
 * @purpose Provides a comprehensive guide to identifying decision variables
 * in complex LP word problems, with strategies, patterns, and practical examples.
 *
 * @when_used After completing the worked examples (Topics 7-30), this topic
 * reinforces the foundational skill of variable identification, which is crucial
 * for formulating LP models independently.
 */
const Topic31 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 31
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Identifying Variables
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Identifying Decision Variables in Complex Word Problems
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Mastering the art of translating word problems into clear, meaningful
          decision variables — the first and most crucial step in LP formulation.
        </p>
      </header>

      {/* ===== SECTION 1: INTRODUCTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎯</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Why Variable Identification Matters
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            Decision variables are the <strong>foundation</strong> of any LP model.
            They represent the quantities we control and want to determine. In
            simple problems, variables are obvious—"number of units of product A."
            But in <strong>complex word problems</strong>, identifying the right
            variables can be the difference between a correct model and a
            meaningless one.
          </p>
          <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg my-4 border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm text-blue-800 dark:text-blue-300 font-semibold">
              💡 Remember: If you can't clearly define your variables, you can't
              solve the problem. Variables are the "what" of LP.
            </p>
          </div>
        </div>

        {/* SVG: Variable identification flowchart */}
        <div className="mt-6 bg-cyan-50/40 dark:bg-cyan-950/20 rounded-2xl p-4 md:p-6 border border-cyan-100 dark:border-cyan-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
          <svg
            viewBox="0 0 650 180"
            className="w-full h-auto"
            aria-label="Variable identification process"
            role="img"
          >
            <g>
              <rect x="10" y="30" width="160" height="60" rx="10" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
              <text x="90" y="55" fontSize="14" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Read Problem</text>
              <text x="90" y="75" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Understand context</text>
            </g>
            <g>
              <line x1="170" y1="60" x2="200" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-var)" />
            </g>
            <g>
              <rect x="200" y="30" width="160" height="60" rx="10" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" />
              <text x="280" y="55" fontSize="14" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Ask: What to decide?</text>
              <text x="280" y="75" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Identify choices</text>
            </g>
            <g>
              <line x1="360" y1="60" x2="390" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-var)" />
            </g>
            <g>
              <rect x="390" y="30" width="160" height="60" rx="10" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2" />
              <text x="470" y="55" fontSize="14" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Define Variables</text>
              <text x="470" y="75" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">With units & meaning</text>
            </g>
            <g>
              <line x1="550" y1="60" x2="580" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-var)" />
            </g>
            <g>
              <rect x="580" y="30" width="60" height="60" rx="10" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
              <text x="610" y="60" fontSize="12" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">✓</text>
              <text x="610" y="78" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Ready</text>
            </g>
            <defs>
              <marker id="arrow-var" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            A systematic approach to identifying decision variables.
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: WHAT ARE DECISION VARIABLES? ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            What Are Decision Variables?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Controllable",
              desc: "The decision-maker can choose their values within limits.",
            },
            {
              title: "Measurable",
              desc: "They have clear units (units, hours, rupees, etc.).",
            },
            {
              title: "Relevant",
              desc: "They directly affect the objective function.",
            },
            {
              title: "Independent",
              desc: "Each variable represents a distinct, separate decision.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: STRATEGIES FOR IDENTIFYING VARIABLES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🧩</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Strategies for Identifying Variables
          </h2>
        </div>
        <div className="space-y-4">
          {[
            {
              strategy: "Look for 'How many' or 'How much'",
              description: "Questions like 'How many units?' 'How much should be allocated?' indicate variables.",
              example: "Number of units of Product A to produce.",
            },
            {
              strategy: "Identify the decision-maker's choices",
              description: "What can the decision-maker actually control?",
              example: "Amount to invest in each asset, number of employees to hire.",
            },
            {
              strategy: "Consider the objective",
              description: "What is being optimized? Variables contribute to the objective.",
              example: "If profit = price × quantity, quantity is a variable.",
            },
            {
              strategy: "Look at constraints",
              description: "What limits the decisions? Variables appear in constraints with coefficients.",
              example: "If a constraint is 'labor hours used ≤ available', labor hours per unit times variable is the usage.",
            },
            {
              strategy: "Think about time periods",
              description: "Multi-period problems may need time-indexed variables.",
              example: "x_t = production in period t.",
            },
            {
              strategy: "Consider categories",
              description: "Use subscripted variables for multiple categories.",
              example: "x₁, x₂, x₃ for different products, or x_{ij} for shipping from i to j.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400 flex-shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.strategy}</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mt-0.5">{item.description}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    <span className="font-medium">Example:</span> {item.example}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 4: COMMON PATTERNS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📐</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Common Patterns of Variables
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              pattern: "Production Quantities",
              example: "x₁ = units of Product A, x₂ = units of Product B",
            },
            {
              pattern: "Allocation Amounts",
              example: "x₁ = amount allocated to Activity A, x₂ = amount allocated to Activity B",
            },
            {
              pattern: "Investment Amounts",
              example: "x₁ = amount invested in Asset A, x₂ = amount invested in Asset B",
            },
            {
              pattern: "Staff Assignments",
              example: "x₁ = number of workers on Shift A, x₂ = number on Shift B",
            },
            {
              pattern: "Shipping Quantities",
              example: "x_{ij} = amount shipped from source i to destination j",
            },
            {
              pattern: "Time-Based Variables",
              example: "x_t = production in period t, or inventory at time t",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.pattern}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5 font-mono">{item.example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 5: REAL-WORLD EXAMPLE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📝</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Worked Example: Identifying Variables
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-900 dark:text-white">Problem Statement:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              A company produces three products in two factories. Each product
              requires labor, machine time, and raw materials. The company wants
              to maximize profit by deciding how many units of each product to
              produce in each factory. There are also minimum production
              requirements for each product.
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">Step 1: Identify the Decisions</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                What does the company decide? <strong>How many units of each product to produce in each factory.</strong>
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">Step 2: Define Variables</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                x_{`{ij}`} = number of units of Product i produced in Factory j
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Where i ∈ {1, 2, 3} for the three products, and j ∈ {1, 2} for the two factories.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">Step 3: Check Completeness</p>
              <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                <li>6 variables (3 products × 2 factories)</li>
                <li>Each variable appears in constraints (labor, machine, materials)</li>
                <li>Each variable contributes to the objective (profit)</li>
                <li>Non-negativity: all x_{`{ij}`} ≥ 0</li>
                <li>Minimum requirements: sum over factories for each product ≥ minimum</li>
              </ul>
            </div>
          </div>
          <div className="mt-3 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>💡 Key Takeaway:</strong> Complex problems often require
              <strong> subscripted variables</strong> to capture multiple
              categories (products, locations, time periods).
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
              title: "Start with a question",
              desc: "Ask: 'What decisions are being made?' The answers are your variables.",
            },
            {
              title: "Use meaningful names",
              desc: "x_prod_A is better than just x. It makes the model self-documenting.",
            },
            {
              title: "Include units in definitions",
              desc: "Always state units (e.g., 'units', 'hours', 'rupees').",
            },
            {
              title: "Draw a diagram",
              desc: "Visualizing the problem helps identify all variables.",
            },
            {
              title: "Check variable independence",
              desc: "Ensure no variable can be derived from others.",
            },
            {
              title: "Test with a simple solution",
              desc: "Plug in values to see if variables make sense.",
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
                mistake: "Vague definitions",
                fix: "Always specify what the variable represents, with units.",
              },
              {
                mistake: "Using too many variables",
                fix: "Combine logically if they represent the same thing.",
              },
              {
                mistake: "Using too few variables",
                fix: "Ensure every independent decision has a variable.",
              },
              {
                mistake: "Not checking independence",
                fix: "Variables should not be functions of each other.",
              },
              {
                mistake: "Forgetting units",
                fix: "All variables should have clear units.",
              },
              {
                mistake: "Not connecting to objective",
                fix: "Every variable should affect the objective or constraints.",
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
            "Always define variables before writing equations.",
            "Use descriptive names that include units (e.g., x_units_A).",
            "Use subscripts for multiple similar variables.",
            "Ensure each variable is independent and controllable.",
            "Check that each variable appears in the objective or constraints.",
            "Avoid variables that are combinations of other variables.",
            "Review variable definitions with a colleague.",
            "Document all variables in a clear list.",
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
                why might you need separate variables for each product instead
                of one combined variable?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If a problem has three
                factories and four products, how many variables would you need?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Susmita is planning a
                multi-month production schedule. How would she use time-indexed
                variables to capture monthly production decisions?
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
              "✅ Define decision variables clearly with units",
              "✅ Apply strategies to identify variables in complex word problems",
              "✅ Recognize common variable patterns (production, allocation, etc.)",
              "✅ Use subscripted variables for multiple categories",
              "✅ Avoid common mistakes in variable definition",
              "✅ Check that variables are independent and complete",
              "✅ Apply best practices for variable identification",
              "✅ Prepare a variable definition list before writing equations",
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
          title="Identifying Decision Variables FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 12: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <PlainTextPrint
          content={noteText}
          title="Identifying Decision Variables - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic31_note.txt"
        />
      </div>

      {/* ===== SECTION 13: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <Teacher
          note={
            "Identifying decision variables is the single most important skill in LP formulation. I tell my students: 'If you get the variables right, the rest of the model follows naturally.' The challenge is that word problems often hide the variables in plain sight. The key is to ask: 'What decisions are being made?' Every independent choice is a variable. Mamata from Barrackpore once told me that after learning this systematic approach, she stopped feeling overwhelmed by complex word problems—she just followed the steps. Remember: a well-defined variable is half the solution. Be explicit, include units, and use meaningful names. Practice with a variety of problems, and soon variable identification will become second nature."
          }
        />
      </div>
    </div>
  );
};

export default Topic31;