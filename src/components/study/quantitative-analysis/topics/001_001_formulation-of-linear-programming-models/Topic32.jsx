import React from "react";
import clsx from "clsx";
import FAQTemplate from "../../../../../common/FAQTemplate";
import questions from "./topic32_files/topic32_questions";
import Teacher from "../../../../../common/TeacherSukantaHui";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import noteText from "./topic32_files/topic32_note.txt?raw";

/**
 * Topic32: Translating verbal conditions into mathematical inequalities
 *
 * @component
 * @returns {JSX.Element} The rendered Topic32 component
 *
 * @purpose Provides a comprehensive guide to translating verbal conditions
 * into mathematical inequalities, with keyword mappings, step-by-step processes,
 * and practical examples.
 *
 * @when_used After identifying decision variables (Topic31), this topic
 * covers the next essential skill: converting verbal constraints into
 * mathematical inequalities for LP formulation.
 */
const Topic32 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans leading-relaxed px-4 py-8 md:px-8 lg:px-12 transition-colors duration-300">
      {/* ===== HEADER ===== */}
      <header className="max-w-5xl mx-auto mb-12 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out]">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            Topic 32
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Translating Verbal Conditions
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          Translating Verbal Conditions into Mathematical Inequalities
        </h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Mastering the art of converting word problems into mathematical
          constraints — the key to accurate LP formulation.
        </p>
      </header>

      {/* ===== SECTION 1: INTRODUCTION ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-100">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📝</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Why Translation Matters
          </h2>
        </div>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg">
            One of the most challenging aspects of LP formulation is
            <strong> translating verbal conditions </strong> into mathematical
            inequalities. This skill separates successful LP modelers from those
            who struggle with word problems.
          </p>
          <div className="bg-blue-50/50 dark:bg-blue-950/30 p-4 rounded-lg my-4 border border-blue-200 dark:border-blue-900/50">
            <p className="text-sm text-blue-800 dark:text-blue-300 font-semibold">
              💡 Remember: The correct inequality direction is crucial.
              Using ≤ instead of ≥ (or vice versa) can completely change
              the feasible region and the optimal solution.
            </p>
          </div>
        </div>

        {/* SVG: Translation process */}
        <div className="mt-6 bg-teal-50/40 dark:bg-teal-950/20 rounded-2xl p-4 md:p-6 border border-teal-100 dark:border-teal-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/10">
          <svg
            viewBox="0 0 650 180"
            className="w-full h-auto"
            aria-label="Translation process"
            role="img"
          >
            <g>
              <rect x="10" y="30" width="160" height="60" rx="10" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="2" />
              <text x="90" y="55" fontSize="14" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Read Phrase</text>
              <text x="90" y="75" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">Identify keywords</text>
            </g>
            <g>
              <line x1="170" y1="60" x2="200" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-trans)" />
            </g>
            <g>
              <rect x="200" y="30" width="160" height="60" rx="10" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="2" />
              <text x="280" y="55" fontSize="14" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Determine Direction</text>
              <text x="280" y="75" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">≤, ≥, or =</text>
            </g>
            <g>
              <line x1="360" y1="60" x2="390" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-trans)" />
            </g>
            <g>
              <rect x="390" y="30" width="160" height="60" rx="10" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2" />
              <text x="470" y="55" fontSize="14" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">Write Inequality</text>
              <text x="470" y="75" fontSize="11" fill="#475569" dark="#94a3b8" textAnchor="middle">With correct terms</text>
            </g>
            <g>
              <line x1="550" y1="60" x2="580" y2="60" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow-trans)" />
            </g>
            <g>
              <rect x="580" y="30" width="60" height="60" rx="10" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2" />
              <text x="610" y="60" fontSize="12" fill="#1e293b" dark="#e2e8f0" textAnchor="middle" fontWeight="bold">✓</text>
              <text x="610" y="78" fontSize="10" fill="#475569" dark="#94a3b8" textAnchor="middle">Check</text>
            </g>
            <defs>
              <marker id="arrow-trans" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
            A systematic approach to translating verbal conditions into inequalities.
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: KEYWORDS AND MEANINGS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-200">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔑</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Keywords and Their Meanings
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              direction: "≤ (Less than or equal to)",
              keywords: "at most, no more than, cannot exceed, maximum, limited to, not to exceed",
              example: "x ≤ 10",
            },
            {
              direction: "≥ (Greater than or equal to)",
              keywords: "at least, no less than, minimum, must be at least, should not be less",
              example: "x ≥ 10",
            },
            {
              direction: "= (Equality)",
              keywords: "exactly, equal to, is, must be, precisely",
              example: "x = 10",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{item.direction}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                <span className="font-medium">Keywords:</span> {item.keywords}
              </p>
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mt-2">
                Example: {item.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 3: STEP-BY-STEP PROCESS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-300">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Step-by-Step Translation Process
          </h2>
        </div>
        <div className="space-y-4">
          {[
            {
              step: 1,
              title: "Identify the Quantity",
              desc: "What variable or expression is being described?",
              example: "In 'The total cost is at most ₹10,000', the quantity is 'total cost'.",
            },
            {
              step: 2,
              title: "Identify the Keyword",
              desc: "What inequality keyword is used?",
              example: "'At most' indicates ≤.",
            },
            {
              step: 3,
              title: "Determine the Direction",
              desc: "Choose ≤, ≥, or = based on the keyword.",
              example: "'At most' → ≤",
            },
            {
              step: 4,
              title: "Write the Expression",
              desc: "Combine the quantity and the inequality direction.",
              example: "Total cost ≤ 10,000",
            },
            {
              step: 5,
              title: "Check the Direction",
              desc: "Test with a simple example to verify.",
              example: "If cost is 9,000, it should be allowed (9,000 ≤ 10,000). If cost is 11,000, it should not be allowed (11,000 > 10,000).",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">{item.desc}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                    <span className="font-medium">Example:</span> {item.example}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 4: COMMON PHRASE TRANSLATIONS ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-400">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📚</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Common Phrases and Their Translations
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { phrase: "x is at most 5", translation: "x ≤ 5" },
            { phrase: "x is no more than 5", translation: "x ≤ 5" },
            { phrase: "x cannot exceed 5", translation: "x ≤ 5" },
            { phrase: "x is at least 5", translation: "x ≥ 5" },
            { phrase: "x is no less than 5", translation: "x ≥ 5" },
            { phrase: "x must be at least 5", translation: "x ≥ 5" },
            { phrase: "x is exactly 5", translation: "x = 5" },
            { phrase: "x is equal to 5", translation: "x = 5" },
            { phrase: "The sum of x and y is at most 10", translation: "x + y ≤ 10" },
            { phrase: "The total of x and y is at least 20", translation: "x + y ≥ 20" },
            { phrase: "The difference of x and y is exactly 10", translation: "x - y = 10" },
            { phrase: "x is twice y", translation: "x = 2y" },
            { phrase: "x is 3 more than y", translation: "x = y + 3" },
            { phrase: "x is at least twice y", translation: "x ≥ 2y" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-3 border border-indigo-200 dark:border-indigo-900/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">"{item.phrase}"</span>
              </p>
              <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mt-1">
                → {item.translation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 5: COMPLEX EXAMPLE ===== */}
      <section className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-500">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📝</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
            Worked Example: Complex Translation
          </h2>
        </div>
        <div className="bg-blue-50/40 dark:bg-blue-950/20 rounded-xl p-5 border border-blue-200 dark:border-blue-900/30">
          <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4 mb-4">
            <p className="font-semibold text-gray-900 dark:text-white">Problem Statement:</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
              A company produces two products. The total production of both
              products must be at least 500 units. Product A cannot exceed
              400 units. Product B must be at least 2 times Product A.
              Write these as mathematical inequalities.
            </p>
          </div>

          <div className="space-y-3">
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">Translation 1</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                "Total production must be at least 500 units"
              </p>
              <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mt-1">
                x_A + x_B ≥ 500
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">Translation 2</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                "Product A cannot exceed 400 units"
              </p>
              <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mt-1">
                x_A ≤ 400
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-3 border border-green-200 dark:border-green-900/50">
              <p className="font-semibold text-green-600 dark:text-green-400">Translation 3</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                "Product B must be at least 2 times Product A"
              </p>
              <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mt-1">
                x_B ≥ 2x_A
              </p>
            </div>
          </div>
          <div className="mt-3 bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 dark:border-amber-400 p-3 rounded-r-lg">
            <p className="text-sm text-amber-800 dark:text-amber-300">
              <strong>💡 Key Takeaway:</strong> Complex problems often combine
              multiple conditions. Translate each condition separately, then
              combine them into a complete set of constraints.
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
              title: "Underline keywords",
              desc: "Physically underline 'at most', 'at least', and other keywords in the problem.",
            },
            {
              title: "Test with numbers",
              desc: "After translating, test with a number that should satisfy the condition.",
            },
            {
              title: "Draw a number line",
              desc: "Visualizing the inequality helps confirm the direction.",
            },
            {
              title: "Check units",
              desc: "Ensure all terms in the inequality have the same units.",
            },
            {
              title: "Simplify when possible",
              desc: "Combine like terms and simplify fractions.",
            },
            {
              title: "Practice with variations",
              desc: "Practice translating the same phrase in different ways.",
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
                mistake: "Using the wrong inequality direction",
                fix: "'At most' → ≤, 'at least' → ≥, 'exactly' → =",
              },
              {
                mistake: "Confusing 'at most' with 'less than'",
                fix: "'At most' includes the value (≤); 'less than' excludes it (<).",
              },
              {
                mistake: "Confusing 'at least' with 'greater than'",
                fix: "'At least' includes the value (≥); 'greater than' excludes it (>).",
              },
              {
                mistake: "Not including all terms",
                fix: "Ensure the inequality includes all relevant variables and constants.",
              },
              {
                mistake: "Inconsistent units",
                fix: "Convert all terms to the same units before writing the inequality.",
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
            "Underline inequality keywords in the problem.",
            "Write the direction clearly (≤, ≥, =).",
            "Test the inequality with a simple number.",
            "Convert all units to the same base.",
            "Combine like terms when possible.",
            "Write the inequality in standard form.",
            "Verify the inequality makes logical sense.",
            "Practice with a variety of word problems.",
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
                <strong>Observe carefully:</strong> What is the difference between
                "x is at most 5" and "x is less than 5"? Why does the distinction matter?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Try changing this:</strong> How would you translate
                "Production must be at least 50 units but no more than 100 units"?
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 dark:text-indigo-400">•</span>
              <span>
                <strong>Consider this scenario:</strong> Abhronila is reading a
                contract that says "The supplier must deliver between 100 and 200 units."
                How would she translate this into mathematical inequality?
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
              "✅ Identify inequality keywords in word problems",
              "✅ Translate 'at most' correctly as ≤",
              "✅ Translate 'at least' correctly as ≥",
              "✅ Translate 'exactly' correctly as =",
              "✅ Translate complex phrases involving sums and differences",
              "✅ Avoid common mistakes in inequality translation",
              "✅ Apply the step-by-step translation process",
              "✅ Verify translations with simple numerical examples",
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
          title="Translating Verbal Conditions FAQs"
          questions={questions}
        />
      </div>

      {/* ===== SECTION 12: PRINTABLE NOTES ===== */}
      <div className="max-w-5xl mx-auto mb-16 animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1100">
        <PlainTextPrint
          content={noteText}
          title="Translating Verbal Conditions - Printable Notes"
          stampEnabled={true}
          showDownload={true}
          downloadButtonText="Download Note"
          downloadFileName="topic32_note.txt"
        />
      </div>

      {/* ===== SECTION 13: TEACHER'S NOTE ===== */}
      <div className="max-w-5xl mx-auto animate-[fadeSlideUp_0.7s_ease-out] motion-safe:animate-[fadeSlideUp_0.7s_ease-out] animation-delay-1150">
        <Teacher
          note={
            "Translating verbal conditions into inequalities is where many students struggle. I tell my students: 'Don't rush—underline the keywords first.' The most common error is mixing up 'at most' and 'at least'. I always recommend testing with a number: if the phrase is 'at most 10', then 5 should be allowed and 15 should not. This simple test catches most mistakes. Mahima from Jadavpur once told me that after learning to underline keywords, her translation accuracy improved dramatically. Remember: practice with a variety of phrases until the translations become automatic. The key is to develop an intuition for which words correspond to which inequality direction."
          }
        />
      </div>
    </div>
  );
};

export default Topic32;