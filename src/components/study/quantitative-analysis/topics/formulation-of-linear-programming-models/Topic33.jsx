import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic33_files/topic33_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic33_files/topic33_note.txt?raw";

/**
 * Topic33: Distinguishing objective functions from constraints
 *
 * @component
 * @returns {JSX.Element} The rendered Topic33 component
 *
 * @purpose Provides a comprehensive guide to distinguishing between objective
 * functions and constraints in LP models, with strategies, examples, and
 * practical tips.
 *
 * @when_used After translating verbal conditions (Topic32), this topic covers
 * the next essential skill: identifying which parts of a word problem belong
 * to the objective and which belong to the constraints.
 */
const Topic33 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 33
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Objective vs Constraints
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Distinguishing Objective Functions from Constraints
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Mastering the fundamental distinction between what you want to
          optimize and what limits your decisions — the cornerstone of LP
          formulation.
        </p>
      </header>

      {/* ===== SECTION 1: INTRODUCTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎯</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Why This Distinction Matters
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            One of the most fundamental skills in LP formulation is
            <strong> distinguishing between the objective function and constraints</strong>.
            This distinction is the difference between a correct model and a
            confused one.
          </p>
          <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg my-4 border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm text-blue-800 dark:text-blue-300 font-semibold">
              💡 Remember: The objective answers "What do we want?"
              Constraints answer "What limits us?" Keep these questions in mind
              as you read any LP problem.
            </p>
          </div>
        </div>

        {/* SVG: Objective vs Constraints */}
        <div className="mt-6 bg-amber-50/40 dark:bg-amber-950/20 rounded-2xl p-4 md:p-6 border border-amber-100 dark:border-amber-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
          <svg
            viewBox="0 0 650 200"
            className="w-full h-auto"
            aria-label="Objective vs constraints comparison"
            role="img"
          >
            {/* Objective box */}
            <rect x="60" y="30" width="240" height="140" rx="12" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="2.5" />
            <text x="180" y="65" fontSize="16" fill="#3b82f6" textAnchor="middle" fontWeight="bold">Objective Function</text>
            <text x="180" y="95" fontSize="12" fill="#475569" dark="#94a3b8" textAnchor="middle">What we want to optimize</text>
            <text x="180" y="115" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Maximize or Minimize</text>
            <text x="180" y="135" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Single expression</text>
            <text x="180" y="155" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">No inequality signs</text>

            {/* Arrow */}
            <line x1="300" y1="100" x2="350" y2="100" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-obj)" />

            {/* Constraints box */}
            <rect x="350" y="30" width="240" height="140" rx="12" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="2.5" />
            <text x="470" y="65" fontSize="16" fill="#22c55e" textAnchor="middle" fontWeight="bold">Constraints</text>
            <text x="470" y="95" fontSize="12" fill="#475569" dark="#94a3b8" textAnchor="middle">What limits our decisions</text>
            <text x="470" y="115" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Inequalities or Equalities</text>
            <text x="470" y="135" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Multiple expressions</text>
            <text x="470" y="155" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Have ≤, ≥, or = signs</text>

            <defs>
              <marker id="arrow-obj" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            The objective and constraints serve different purposes in an LP model.
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: KEY CHARACTERISTICS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔍</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Key Characteristics
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-4 border border-blue-200 dark:border-blue-900/30">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300">Objective Function</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Always has "Maximize" or "Minimize"</li>
              <li>Appears at the beginning of the model</li>
              <li>No inequality signs (≤, ≥, =)</li>
              <li>Single expression</li>
              <li>Variables have coefficients (profit, cost, etc.)</li>
              <li>Answers: "What are we trying to achieve?"</li>
            </ul>
          </div>
          <div className="bg-green-50/40 dark:bg-green-950/20 rounded-xl p-4 border border-green-200 dark:border-green-900/30">
            <h3 className="font-semibold text-green-700 dark:text-green-300">Constraints</h3>
            <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li>Always have inequality signs (≤, ≥, =)</li>
              <li>Appear after the objective</li>
              <li>Have a Right Hand Side (RHS) value</li>
              <li>Multiple expressions</li>
              <li>Variables have coefficients (resource usage)</li>
              <li>Answers: "What limits our decisions?"</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: HOW TO IDENTIFY ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔑</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            How to Identify the Objective and Constraints
          </h2>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <h3 className="font-semibold text-gray-900 dark:text-white">Identifying the Objective</h3>
            <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Keywords:</strong> Maximize, Minimize, Profit, Cost, Revenue, Best, Optimal</li>
              <li><strong>Question:</strong> "What is the decision-maker trying to achieve?"</li>
              <li><strong>Format:</strong> Maximize Z = 5x + 3y (no inequality signs)</li>
            </ul>
            <div className="mt-2 bg-blue-50 dark:bg-blue-950/30 p-2 rounded border border-blue-200 dark:border-blue-900/50">
              <p className="text-xs text-blue-800 dark:text-blue-300">
                💡 Example: "The company wants to maximize profit" → Profit is the objective.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5">
            <h3 className="font-semibold text-gray-900 dark:text-white">Identifying Constraints</h3>
            <ul className="list-disc pl-5 mt-1 text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><strong>Keywords:</strong> At most, At least, No more than, Available, Limited, Capacity</li>
              <li><strong>Question:</strong> "What limits the decision-maker's choices?"</li>
              <li><strong>Format:</strong> 2x + 3y ≤ 100 (with inequality signs)</li>
            </ul>
            <div className="mt-2 bg-green-50 dark:bg-green-950/30 p-2 rounded border border-green-200 dark:border-green-900/50">
              <p className="text-xs text-green-800 dark:text-green-300">
                💡 Example: "The company has 100 labor hours available" → This becomes a constraint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 4: WORKED EXAMPLE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out} animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📝</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Worked Example: Identifying Objective and Constraints
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-900 dark:text-white">Problem Statement:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              A bakery produces cakes and pastries. Each cake requires 2 hours
              of baking time and 3 kg of flour. Each pastry requires 1 hour of
              baking time and 2 kg of flour. The bakery has 40 hours of baking
              time and 60 kg of flour available. The profit per cake is ₹200
              and per pastry is ₹150. The bakery wants to maximize its profit.
              Additionally, the bakery must produce at least 10 pastries due to
              customer demand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-blue-200 dark:border-blue-900/50">
              <p className="font-semibold text-blue-600 dark:text-blue-400">Objective</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>What do we want?</strong> Maximize profit.
              </p>
              <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mt-1">
                Maximize Z = 200x₁ + 150x₂
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Key: "maximize profit" → objective
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">Constraints</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                <strong>What limits us?</strong> Baking time, flour, and demand.
              </p>
              <p className="text-sm font-mono text-green-600 dark:text-green-400 mt-1">
                Baking: 2x₁ + x₂ ≤ 40
                <br />
                Flour: 3x₁ + 2x₂ ≤ 60
                <br />
                Pastries: x₂ ≥ 10
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Key: "available", "at least" → constraints
              </p>
            </div>
          </div>
          <div className="mt-3 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>💡 Key Takeaway:</strong> The objective is what you want
              to achieve (profit). Constraints are what limit you (resources,
              demand). The phrase "maximize profit" is the objective; "available"
              and "at least" are constraints.
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
                mistake: "Confusing the objective with constraints",
                fix: "Ask: 'What do we want?' (objective) vs 'What limits us?' (constraints).",
              },
              {
                mistake: "Forgetting the objective entirely",
                fix: "Always include an objective; it's the core of LP.",
              },
              {
                mistake: "Using inequality signs in the objective",
                fix: "The objective has no ≤, ≥, or = signs.",
              },
              {
                mistake: "Not having a clear objective direction",
                fix: "Always state 'Maximize' or 'Minimize' clearly.",
              },
              {
                mistake: "Including constraints as part of the objective",
                fix: "Keep the objective and constraints separate.",
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
            "Write the objective first, then constraints.",
            "Clearly state 'Maximize' or 'Minimize' before the objective.",
            "Label constraints with descriptive names.",
            "Check that the objective has no inequality signs.",
            "Check that constraints have inequality or equality signs.",
            "Ask: 'What are we trying to achieve?' for the objective.",
            "Ask: 'What limits us?' for constraints.",
            "Test with a simple feasible solution.",
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
              title: "The objective is the goal",
              desc: "If it answers 'What do we want?' it's the objective.",
            },
            {
              title: "Constraints are the rules",
              desc: "If it answers 'What limits us?' it's a constraint.",
            },
            {
              title: "One objective, many constraints",
              desc: "LP has one objective but can have many constraints.",
            },
            {
              title: "Look for optimization words",
              desc: "'Maximize', 'Minimize', 'Profit', 'Cost' signal the objective.",
            },
            {
              title: "Look for limit words",
              desc: "'At most', 'At least', 'Available' signal constraints.",
            },
            {
              title: "Check the format",
              desc: "No inequality signs = objective. Inequality signs = constraints.",
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
                <strong>Observe carefully:</strong> In the bakery example, why
                is "must produce at least 10 pastries" a constraint and not part
                of the objective?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> If the problem said "The
                bakery wants to maximize profit and minimize cost" — is this
                possible in LP? Why or why not?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Debangshu is reading
                a problem that says "The company wants to maximize revenue
                while keeping costs below ₹50,000." Which part is the objective
                and which part is the constraint?
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
              "✅ Define constraints and their role in LP",
              "✅ Distinguish between the objective and constraints in word problems",
              "✅ Identify keywords that indicate the objective",
              "✅ Identify keywords that indicate constraints",
              "✅ Avoid common mistakes in distinguishing objective from constraints",
              "✅ Write the objective and constraints correctly in an LP model",
              "✅ Apply the 'What do we want?' vs 'What limits us?' framework",
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
          title="Objective vs Constraints FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 11: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1050">
        <PlainTextPrint
          content={noteText}
          title="Objective vs Constraints - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic33_note.txt"
        />
      </div>

      {/* ===== SECTION 12: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <Teacher
          note={
            "Distinguishing the objective from constraints is the most fundamental skill in LP formulation. I tell my students: 'If you can't tell the difference, you can't formulate a model.' The key is to ask two questions: 'What do we want?' (objective) and 'What limits us?' (constraints). I've seen students make the mistake of including the objective in the constraints section—this is a common error. Mamata from Barrackpore once told me that after she started using the two-question framework, she never confused them again. Remember: the objective is a single expression, has no inequality signs, and represents what we want to optimize. Constraints are multiple, have inequality or equality signs, and represent the limits we must respect. Practice with different problems until the distinction becomes automatic."
          }
        />
      </div>
    </div>
  );
};

export default Topic33;