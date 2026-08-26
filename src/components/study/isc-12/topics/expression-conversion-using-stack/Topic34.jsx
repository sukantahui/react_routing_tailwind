import React, { useState } from "react";
import clsx from "clsx";

// Custom components
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import questions from "./topic34_files/topic34_questions";

// Inline keyframes
const styles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeUp { animation: fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  @media (prefers-reduced-motion: reduce) {
    .animate-fadeUp { animation: none !important; opacity: 1 !important; transform: none !important; }
  }
`;

// Problem Component – displays one practice problem with reveal
function ProblemItem({ problem, index }) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-bold text-sm flex-shrink-0">
          {index + 1}
        </span>
        <div className="flex-1">
          <div className="text-gray-800 dark:text-gray-200 font-medium">
            Convert to postfix:
          </div>
          <div className="mt-1 text-lg font-mono text-gray-900 dark:text-white">
            {problem.problem}
          </div>

          {/* Hint */}
          <div className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
            💡 <span className="font-medium">Hint:</span> {problem.hint}
          </div>

          {/* Show Solution Button */}
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200"
          >
            {showSolution ? "Hide Solution" : "Show Solution"}
          </button>

          {/* Solution (revealed) */}
          {showSolution && (
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                ✅ Solution:
              </div>
              <div className="mt-1 font-mono text-base text-gray-800 dark:text-gray-200">
                {problem.solution}
              </div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Explanation:</span> {problem.explanation}
              </div>
              {problem.commonMistake && (
                <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                  ⚠️ <span className="font-medium">Common Mistake:</span> {problem.commonMistake}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Topic34() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Practice Problems: Prefix to Postfix
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Sharpen your prefix‑to‑postfix conversion skills with these 30 problems.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              How to Approach These Problems
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                For each prefix expression, apply the conversion rules:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Scan the prefix expression from <strong>right to left</strong>.</li>
                <li>Push operands onto the stack.</li>
                <li>When an operator is encountered, pop the <strong>left</strong> operand, then the <strong>right</strong> operand.</li>
                <li>Combine them as <code>left + " " + right + " " + operator</code> and push the result.</li>
                <li>At the end, the stack contains the postfix expression.</li>
              </ul>
              <p>
                Try to solve each problem on your own before revealing the solution.
                Use the hints if you get stuck, and read the common mistakes to avoid pitfalls.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">💡 Tip:</span> Write down the stack evolution step by step – it helps visualise the process.
              </p>
            </div>
          </div>
        </section>

        {/* PROBLEMS LIST */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-emerald-500 rounded-full"></span>
              30 Practice Problems
            </h2>
            <div className="mt-6 space-y-4">
              {questions.map((q, idx) => (
                <ProblemItem key={idx} problem={q} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* QUICK REFERENCE */}
        <section className="animate-fadeUp delay-300">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-amber-500 rounded-full"></span>
              Quick Reference: Conversion Steps
            </h2>
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <ol className="list-decimal pl-5 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <li>Initialize an empty stack of strings.</li>
                <li>Split the prefix expression into tokens (space‑separated).</li>
                <li>Scan the tokens from <strong>right to left</strong>.</li>
                <li>If token is an operand, push it onto the stack.</li>
                <li>If token is an operator:
                  <ul className="list-disc pl-5 mt-1">
                    <li>Pop the <strong>left</strong> operand (first pop).</li>
                    <li>Pop the <strong>right</strong> operand (second pop).</li>
                    <li>Push <code>left + " " + right + " " + operator</code></li>
                  </ul>
                </li>
                <li>After processing all tokens, pop the result from the stack.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-400">
          <Teacher
            note={
              "These problems are designed to build fluency in prefix‑to‑postfix conversion. I encourage students in Shyamnagar to practice with a stack of strings on paper. The key is to remember: scan from right to left, and the first popped operand is the left operand. Use the hints to guide, but try to solve independently first."
            }
          />
        </div>

        {/* FAQ */}
        <div className="animate-fadeUp delay-500">
          <FAQTemplate
            title="Prefix to Postfix – Extra Q&A"
            questions={questions.map(q => ({
              question: q.problem,
              shortAnswer: q.solution,
              explanation: q.explanation,
              hint: q.hint,
              level: q.level || "intermediate",
              codeExample: q.solution
            }))}
          />
        </div>

        {/* FOOTER */}
        <footer className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2026 • Expression Conversion Course • Barrackpore, India</p>
        </footer>
      </div>
    </div>
  );
}