import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic6_files/topic6_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6: Step-by-step procedure for formulating an LP model
 *
 * @component
 * @returns {JSX.Element} The rendered Topic6 component
 *
 * @purpose Provides a systematic, step-by-step approach to formulating a
 * Linear Programming model from a real-world problem statement.
 *
 * @when_used After understanding individual components (variables, objective,
 * constraints, non-negativity), this topic integrates them into a cohesive
 * formulation process.
 */
const Topic6 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 6
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Formulation Process
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Step-by-Step Procedure for Formulating an LP Model
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          A systematic guide to translating real-world problems into mathematical
          models that can be solved.
        </p>
      </header>

      {/* ===== SECTION 1: INTRODUCTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🧩</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Introduction: The Art of Model Building
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            Formulating a Linear Programming model is the process of converting
            a real-world problem into a mathematical representation. It is a
            <strong> critical skill</strong> that requires practice, attention
            to detail, and a systematic approach.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-base">
            A well-formulated model is the foundation for finding the optimal
            solution. Errors in formulation can lead to incorrect answers,
            even if the solution algorithm is correct.
          </p>
          <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg my-4 border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
              💡 The 7-Step Formula:
            </p>
            <ol className="list-decimal pl-5 text-sm text-gray-700 dark:text-gray-300">
              <li>Read &amp; Understand the Problem</li>
              <li>Define Decision Variables</li>
              <li>Determine the Objective Function</li>
              <li>Identify All Constraints</li>
              <li>Add Non-Negativity Restrictions</li>
              <li>Review the Model</li>
              <li>Document &amp; Present</li>
            </ol>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: THE 7-STEP PROCEDURE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            The 7-Step Procedure
          </h2>
        </div>
        <div className="space-y-4">
          {[
            {
              step: 1,
              title: "Read and Understand the Problem",
              desc: "Read the problem multiple times. Identify the overall objective (max/min) and list all resources, constraints, and requirements. Underline key phrases like 'at most', 'at least', and 'exactly'.",
            },
            {
              step: 2,
              title: "Define Decision Variables",
              desc: "Give each variable a clear name and specify units. Use descriptive names like x₁, x₂ or x_A, x_B. State exactly what each variable represents.",
            },
            {
              step: 3,
              title: "Determine the Objective Function",
              desc: "Decide whether to maximize or minimize. Identify the contribution (coefficient) of each variable to the objective. Write the linear expression.",
            },
            {
              step: 4,
              title: "Identify All Constraints",
              desc: "List every limitation: resources, demand, policies. For each, determine which variables affect it and write the linear inequality (≤, ≥, =) with the correct RHS.",
            },
            {
              step: 5,
              title: "Add Non-Negativity Restrictions",
              desc: "For every variable, add x ≥ 0. If a variable can be negative (free), transform it as x = x⁺ - x⁻.",
            },
            {
              step: 6,
              title: "Review the Model",
              desc: "Check consistency: units, signs, and logic. Test with a feasible point. Ensure all constraints are included and the model makes sense.",
            },
            {
              step: 7,
              title: "Document and Present",
              desc: "Clearly label the objective and constraints. Write the model in a clean, readable format. Include any assumptions.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 hover:-translate-y-1 flex items-start gap-4"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold flex items-center justify-center text-sm">
                {item.step}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: WORKED EXAMPLE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📝</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Worked Example: Factory Production
          </h2>
        </div>
        <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-5 border border-green-200 dark:border-green-900/30">
          <div className="mb-4">
            <p className="font-semibold text-gray-900 dark:text-white">Problem Statement:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              A factory produces two products (A and B). Product A requires 2 hours of labor and 3 kg of material per unit. Product B requires 4 hours of labor and 1 kg of material per unit. Available: 120 labor hours and 80 kg of material. Demand: at least 10 units of A. Profit: $5 per unit of A, $3 per unit of B. Formulate an LP model to maximize profit.
            </p>
          </div>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold">Step 1:</span> Read and understand → Objective: maximize profit. Resources: labor, material. Requirement: demand for A ≥ 10.</p>
            <p><span className="font-semibold">Step 2:</span> Define variables → x₁ = units of A, x₂ = units of B.</p>
            <p><span className="font-semibold">Step 3:</span> Objective function → Max Z = 5x₁ + 3x₂.</p>
            <p><span className="font-semibold">Step 4:</span> Constraints → Labor: 2x₁ + 4x₂ ≤ 120; Material: 3x₁ + 1x₂ ≤ 80; Demand: x₁ ≥ 10.</p>
            <p><span className="font-semibold">Step 5:</span> Non-negativity → x₁ ≥ 0, x₂ ≥ 0.</p>
            <p><span className="font-semibold">Step 6:</span> Review → Units consistent. Check feasible point: x₁=10, x₂=20 gives labor=100≤120, material=50≤80, demand met. Good.</p>
            <p><span className="font-semibold">Step 7:</span> Present model clearly.</p>
          </div>
          <div className="mt-3 bg-white dark:bg-gray-800/50 rounded-lg p-3 font-mono text-sm">
            <p>Maximize Z = 5x₁ + 3x₂</p>
            <p>Subject to:</p>
            <p>  2x₁ + 4x₂ ≤ 120  (Labor)</p>
            <p>  3x₁ + 1x₂ ≤ 80   (Material)</p>
            <p>  x₁ ≥ 10          (Demand for A)</p>
            <p>  x₁, x₂ ≥ 0</p>
          </div>
        </div>
      </section>

      {/* =========================================================
    EXTRA SECTION: READ A CONSTRAINT LIKE A SENTENCE
========================================================= */}
      <section className="max-w-5xl mx-auto mb-16">

        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔎</span>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Learn to Read a Constraint Like a Sentence
          </h2>
        </div>

        <p className="text-gray-600 dark:text-gray-400 leading-7 mb-6">
          A mathematical constraint is simply a real-world statement written
          using mathematical symbols. Let's learn to translate it back into
          ordinary language.
        </p>


        <div className="grid gap-5">

          {/* Example 1 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800
                    bg-white dark:bg-gray-950 p-6">

            <div className="font-mono text-xl font-bold text-blue-600
                      dark:text-blue-400">
              2x + 4y ≤ 120
            </div>

            <div className="mt-4 border-l-4 border-blue-500 pl-4">

              <p className="text-sm text-gray-700 dark:text-gray-300 leading-7">

                The total labour used by Product A and Product B

                <strong> cannot exceed 120 hours.</strong>

              </p>

            </div>

            <div className="mt-4 grid sm:grid-cols-3 gap-3">

              <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">

                <div className="font-mono font-bold">
                  2x
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Labour for Product A
                </div>

              </div>

              <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">

                <div className="font-mono font-bold">
                  4y
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Labour for Product B
                </div>

              </div>

              <div className="rounded-lg bg-gray-50 dark:bg-gray-900 p-3">

                <div className="font-mono font-bold">
                  120
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Labour available
                </div>

              </div>

            </div>

          </div>


          {/* Example 2 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800
                    bg-white dark:bg-gray-950 p-6">

            <div className="font-mono text-xl font-bold text-green-600
                      dark:text-green-400">
              x + y ≥ 20
            </div>

            <div className="mt-4 border-l-4 border-green-500 pl-4">

              <p className="text-sm text-gray-700 dark:text-gray-300 leading-7">

                The total production must be

                <strong> at least 20 units.</strong>

              </p>

            </div>

          </div>


          {/* Example 3 */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800
                    bg-white dark:bg-gray-950 p-6">

            <div className="font-mono text-xl font-bold text-purple-600
                      dark:text-purple-400">
              x + y = 50
            </div>

            <div className="mt-4 border-l-4 border-purple-500 pl-4">

              <p className="text-sm text-gray-700 dark:text-gray-300 leading-7">

                The total production must be

                <strong> exactly 50 units.</strong>

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ===== SECTION 4: REAL-WORLD EXAMPLES ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🌍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Real-World Examples of Formulation
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Manufacturing",
              scenario: "A company produces two products with limited labor and machine hours. Formulate to maximize profit.",
            },
            {
              title: "Diet Planning",
              scenario: "A nutritionist wants to minimize cost while meeting daily nutritional requirements.",
            },
            {
              title: "Investment",
              scenario: "An investor allocates funds among assets to maximize return while keeping risk below a threshold.",
            },
            {
              title: "Transportation",
              scenario: "A logistics company ships goods from multiple warehouses to customers, minimizing total shipping cost.",
            },
            {
              title: "Advertising",
              scenario: "A marketing manager allocates budget across channels to maximize reach, subject to channel limits.",
            },
            {
              title: "Workforce Scheduling",
              scenario: "A hospital schedules nurses to meet patient care demands while minimizing overtime costs.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-indigo-800 dark:text-indigo-300">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">{item.scenario}</p>
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
              title: "Read the problem at least twice",
              desc: "First to get the gist, second to capture details. Underline keywords.",
            },
            {
              title: "Use a table to organize data",
              desc: "List variables, coefficients (profit/resource usage), and RHS values for each constraint.",
            },
            {
              title: "Start with the objective",
              desc: "Knowing the goal helps identify which variables and constraints are relevant.",
            },
            {
              title: "Check for hidden constraints",
              desc: "For example, production cannot exceed demand, or inventory cannot be negative.",
            },
            {
              title: "Test with a simple feasible point",
              desc: "Plug in numbers to see if all constraints are satisfied; it validates the model.",
            },
            {
              title: "Label everything",
              desc: "Give each constraint a descriptive label (e.g., 'Labor', 'Material') for clarity.",
            },
            {
              title: "Document assumptions",
              desc: "List any assumptions like linearity, certainty, and divisibility.",
            },
            {
              title: "Review with a colleague",
              desc: "Fresh eyes can catch mistakes you might have missed.",
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
                mistake: "Not reading the problem thoroughly",
                fix: "Read multiple times and underline key words.",
              },
              {
                mistake: "Vague variable definitions",
                fix: "Always state units and what the variable represents.",
              },
              {
                mistake: "Forgetting to include all constraints",
                fix: "List every resource, requirement, and policy.",
              },
              {
                mistake: "Using wrong inequality direction",
                fix: "Check if it's a cap (≤) or a floor (≥).",
              },
              {
                mistake: "Ignoring non-negativity",
                fix: "Always add x ≥ 0 for every variable.",
              },
              {
                mistake: "Inconsistent units",
                fix: "Convert all units to the same base (e.g., hours).",
              },
              {
                mistake: "Skipping the review step",
                fix: "Always test with a feasible point and check logic.",
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
            "Follow the 7-step procedure every time.",
            "Write the model in a standard format (Max/Min, subject to, non-negativity).",
            "Use descriptive variable names and labels.",
            "Check for consistency: units, signs, and logic.",
            "Test with a feasible point.",
            "Document assumptions.",
            "Review the model with others.",
            "Practice with a variety of problems to build intuition.",
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
                <strong>Observe carefully:</strong> In the factory example, what
                would happen if we forgot the demand constraint (x₁ ≥ 10)? How
                would the optimal solution change?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> Suppose labor hours increase
                to 130. How would that affect the constraints? Would the
                feasible region expand?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Susmita runs a bakery
                in Barrackpore. She wants to maximize profit from cakes and
                pastries, given limited oven time and flour. Write down the
                steps you would follow to formulate her LP model.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Reflect:</strong> Why is step 6 (review) considered the
                most important? What happens if you skip it?
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
              "✅ Describe the 7-step procedure for formulating an LP model",
              "✅ Apply the procedure to a variety of real-world problems",
              "✅ Define clear decision variables with units",
              "✅ Write the objective function correctly (max or min)",
              "✅ Identify and formulate all constraints (≤, ≥, =)",
              "✅ Add non-negativity restrictions",
              "✅ Review and validate the model for consistency",
              "✅ Document and present the model professionally",
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
          title="Step-by-Step Formulation FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 11: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <PlainTextPrint
          content={noteText}
          title="Step-by-Step Formulation - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic6_note.txt"
        />
      </div>

      {/* ===== SECTION 12: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <Teacher
          note={
            "Formulating an LP model is like assembling a jigsaw puzzle: you need to see the big picture, identify the pieces, and fit them together correctly. In my experience, students who master the formulation process find solving the model much easier. Remember, a good model is half the solution. I encourage my students to use the 7-step checklist every time they start a new problem. Debangshu from Kolkata once told me that after practicing formulation for a week, he started seeing optimization problems everywhere—in his study schedule, his budget, even his daily commute. That's the mark of a true operations researcher. So, practice, practice, practice!"
          }
        />
      </div>
    </div>
  );
};

export default Topic6;