import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic2_files/topic2_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic2: Decision variables
 *
 * @component
 * @returns {JSX.Element} The rendered Topic2 component
 *
 * @purpose Explains the concept of decision variables in Linear Programming:
 * what they are, how to define them, their role, and common practices.
 *
 * @when_used After understanding the meaning and purpose of LP (Topic1),
 * this topic focuses on the core elements that form the building blocks of an LP model.
 */
const Topic2 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 2
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Decision Variables
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Decision Variables
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          The choices you control — the heart of every Linear Programming model.
        </p>
      </header>

      {/* ===== SECTION 1: WHAT ARE DECISION VARIABLES? ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎛️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            What Are Decision Variables?
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            <strong>Decision variables</strong> are the unknown quantities that
            represent the <strong>choices</strong> available to the
            decision‑maker. In an LP model, they are the variables you want to
            determine — the <strong>"what"</strong> of the problem.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300 text-base">
            <li>
              <strong>Example:</strong> In a factory, you decide how many units
              of Product A and Product B to produce. So{" "}
              <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                x₁
              </code>{" "}
              = units of A,{" "}
              <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded text-sm">
                x₂
              </code>{" "}
              = units of B.
            </li>
            <li>
              <strong>Key:</strong> Each variable must have a clear, measurable
              definition and should be controllable.
            </li>
          </ul>
        </div>

        {/* SVG: Variable definition illustration */}
        <div className="mt-6 bg-blue-50/40 dark:bg-blue-950/20 rounded-2xl p-4 md:p-6 border border-blue-100 dark:border-blue-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
          <svg
            viewBox="0 0 600 120"
            className="w-full h-auto"
            aria-label="Decision variables definition"
            role="img"
          >
            <g>
              <rect x="10" y="20" width="180" height="80" rx="10" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2" />
              <text x="25" y="50" fontSize="16" fill="#1e293b" dark="#e2e8f0" fontWeight="bold">Decision Variables</text>
              <text x="25" y="72" fontSize="13" fill="#475569" dark="#94a3b8">x₁, x₂, ..., xₙ</text>
              <text x="25" y="90" fontSize="12" fill="#64748b" dark="#94a3b8">(what we choose)</text>
            </g>
            <g>
              <line x1="190" y1="60" x2="230" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-var)" />
            </g>
            <g>
              <rect x="230" y="20" width="160" height="80" rx="10" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2" />
              <text x="245" y="50" fontSize="16" fill="#1e293b" dark="#e2e8f0" fontWeight="bold">Objective</text>
              <text x="245" y="72" fontSize="13" fill="#475569" dark="#94a3b8">Z = c₁x₁ + c₂x₂ + ...</text>
              <text x="245" y="90" fontSize="12" fill="#64748b" dark="#94a3b8">(optimize)</text>
            </g>
            <g>
              <line x1="390" y1="60" x2="430" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-var)" />
            </g>
            <g>
              <rect x="430" y="20" width="160" height="80" rx="10" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2" />
              <text x="445" y="50" fontSize="16" fill="#1e293b" dark="#e2e8f0" fontWeight="bold">Constraints</text>
              <text x="445" y="72" fontSize="13" fill="#475569" dark="#94a3b8">a₁x₁ + a₂x₂ + ... ≤ b</text>
              <text x="445" y="90" fontSize="12" fill="#64748b" dark="#94a3b8">(limits)</text>
            </g>
            <defs>
              <marker id="arrow-var" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            Decision variables connect the objective and constraints.
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: HOW TO DEFINE VARIABLES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✏️</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            How to Define Decision Variables
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Be Explicit",
              desc: "Write 'Let x = number of units of Product A' not just 'Let x'.",
            },
            {
              title: "Include Units",
              desc: "Specify units (e.g., hours, kilograms, dollars) to avoid confusion.",
            },
            {
              title: "Use Subscripts",
              desc: "For multiple similar items, use x₁, x₂ or x_A, x_B.",
            },
            {
              title: "Check Controllability",
              desc: "Ensure the variable is something you can actually decide.",
            },
            {
              title: "Avoid Redundancy",
              desc: "Don't use two variables for the same decision.",
            },
            {
              title: "Ensure Non‑Negativity",
              desc: "Most variables should be ≥ 0 unless specific reasons not.",
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

      {/* ===== SECTION 3: EXAMPLES FROM DIFFERENT DOMAINS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🏭</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Decision Variables in Action
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              domain: "Production",
              variables: "x₁ = units of Product A, x₂ = units of Product B",
              objective: "Maximize profit",
            },
            {
              domain: "Diet",
              variables: "x₁ = servings of food 1, x₂ = servings of food 2",
              objective: "Minimize cost",
            },
            {
              domain: "Investment",
              variables: "x₁ = dollars in stocks, x₂ = dollars in bonds",
              objective: "Maximize return",
            },
            {
              domain: "Transportation",
              variables: "x_{ij} = units shipped from i to j",
              objective: "Minimize shipping cost",
            },
            {
              domain: "Advertising",
              variables: "x₁ = TV spend, x₂ = digital spend",
              objective: "Maximize reach",
            },
            {
              domain: "Workforce",
              variables: "x₁ = number of full-time employees, x₂ = number of part-time",
              objective: "Minimize labor cost",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.domain}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                <span className="font-medium">Variables:</span> {item.variables}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                <span className="font-medium">Objective:</span> {item.objective}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 4: TIPS & TRICKS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💎</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Tips & Tricks (Professional Level)
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Start with a variable definition list",
              desc: "Write down all decision variables with clear descriptions before writing any equations.",
            },
            {
              title: "Use consistent notation",
              desc: "If you use x for one product, don't suddenly use y for another – stick to subscripts.",
            },
            {
              title: "Consider transformation",
              desc: "Sometimes it's easier to define variables as ratios or percentages.",
            },
            {
              title: "Think about units",
              desc: "All constraints and objective must have compatible units.",
            },
            {
              title: "Avoid multi-purpose variables",
              desc: "Each variable should have a single, clear meaning.",
            },
            {
              title: "Test with extreme values",
              desc: "Plug in 0 or large numbers to see if the model behaves logically.",
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
                mistake: "Vague definitions",
                fix: "Always specify what the variable represents, with units.",
              },
              {
                mistake: "Using too many variables",
                fix: "Combine logically if they represent the same thing.",
              },
              {
                mistake: "Forgetting non-negativity",
                fix: "Always add x ≥ 0 for each variable unless justified.",
              },
              {
                mistake: "Mixing variables and parameters",
                fix: "Variables are unknowns; parameters are fixed values.",
              },
              {
                mistake: "Not checking feasibility",
                fix: "Test if the variable values make sense in the real world.",
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

      {/* ===== SECTION 6: BEST PRACTICES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-600">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">✅</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Best Practices
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Define variables with descriptive names (e.g., x_units_A).",
            "List all variables at the start of the model.",
            "Include units in the definition.",
            "Ensure each variable is controllable.",
            "Avoid using the same symbol for different variables.",
            "Add non-negativity constraints explicitly.",
            "Check that variables appear linearly in all expressions.",
            "Review variable definitions with a colleague.",
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

      {/* ===== SECTION 7: HINT SECTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-700">
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
                what would happen if you define variables for each product but
                omit the units? How could that lead to errors?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> Suppose you have two
                resources (labor and materials). If you define variables only
                for one resource, what would you miss?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu is a
                financial planner in Kolkata. He wants to allocate funds among
                three mutual funds. Define his decision variables clearly.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* ===== SECTION 8: MINI CHECKLIST ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-800">
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
              "✅ Define decision variables in your own words",
              "✅ Correctly identify decision variables in a given problem statement",
              "✅ Write clear definitions for variables with units",
              "✅ Distinguish between variables and parameters",
              "✅ Avoid common mistakes when defining variables",
              "✅ Use subscripts for multiple similar variables",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400 flex-shrink-0">{item.split(" ")[0]}</span>
                <span>{item.replace(/^[^\s]+\s/, "")}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== SECTION 9: FAQ ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-900">
        <FAQTemplate
          title="Decision Variables FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 10: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1000">
        <Teacher
          note={
            "Decision variables are the heart of any LP model. I often tell my students: 'If you can't define your variables clearly, you can't solve the problem.' Take time to practice defining variables from different scenarios. Susmita from Barrackpore once struggled with this, but after we practiced with a variety of examples, she became an expert. Remember: a well-defined variable is half the solution. Always include units, and be specific. Avoid generic labels like 'x' without meaning. This discipline will save you countless hours of confusion later."
          }
        />
      </div>
    </div>
  );
};

export default Topic2;