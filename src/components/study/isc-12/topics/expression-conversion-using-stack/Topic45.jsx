import React, { useState } from "react";
import clsx from "clsx";

// Custom components
import FAQTemplate from "../../../../../common/FAQTemplate";
import Teacher from "../../../../../common/TeacherSukantaHui";

// Local files
import questions from "./topic45_files/topic45_questions";

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

// ---------- ISC Question Components ----------

// MCQ Component
function ISCMCQItem({ question, index }) {
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSelect = (optionIndex) => {
    setSelected(optionIndex);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 font-bold text-sm flex-shrink-0">
          {index + 1}
        </span>
        <div className="flex-1">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {question.year} • {question.marks} mark{question.marks > 1 ? 's' : ''}
          </div>
          <div className="text-gray-800 dark:text-gray-200 font-medium">
            {question.question}
          </div>
          <div className="mt-3 space-y-2">
            {question.options.map((opt, optIdx) => {
              const isSelected = selected === optIdx;
              const isCorrect = showAnswer && optIdx === question.correct;
              const isWrong = showAnswer && isSelected && !isCorrect;
              return (
                <div
                  key={optIdx}
                  onClick={() => !showAnswer && handleSelect(optIdx)}
                  className={clsx(
                    "px-3 py-2 rounded-lg border cursor-pointer transition-colors duration-200",
                    isSelected && !showAnswer && "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30",
                    isCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
                    isWrong && "border-red-500 bg-red-50 dark:bg-red-950/30",
                    !isSelected && !showAnswer && "border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600",
                    !isSelected && showAnswer && "border-gray-200 dark:border-gray-700 opacity-60"
                  )}
                >
                  <span className="font-medium">{String.fromCharCode(65 + optIdx)}. </span>
                  {opt}
                  {isCorrect && showAnswer && (
                    <span className="ml-2 text-emerald-600 dark:text-emerald-400">✓ Correct</span>
                  )}
                  {isWrong && showAnswer && (
                    <span className="ml-2 text-red-600 dark:text-red-400">✗</span>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
          {showAnswer && (
            <div className="mt-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">✅ Explanation</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{question.explanation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Long Answer Component
function ISCLongItem({ question, index }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 font-bold text-sm flex-shrink-0">
          {index + 1}
        </span>
        <div className="flex-1">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {question.year} • {question.marks} marks
          </div>
          <div className="text-gray-800 dark:text-gray-200 font-medium">
            {question.question}
          </div>
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="mt-3 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 transition-colors duration-200"
          >
            {showAnswer ? "Hide Solution" : "Show Solution"}
          </button>
          {showAnswer && (
            <div className="mt-2 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <div className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">✅ Solution</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{question.solution}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Main Component ----------
export default function Topic45() {
  const [activeTab, setActiveTab] = useState('mcq');

  const mcqQuestions = questions.filter(q => q.type === 'mcq');
  const longQuestions = questions.filter(q => q.type === 'long');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 leading-relaxed transition-colors duration-300">
      <style dangerouslySetInnerHTML={{ __html: styles }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

        {/* HEADER */}
        <header className="animate-fadeUp">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            ISC Board Previous Year Questions
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Practice with actual questions from past ISC Computer Science examinations on expression conversion and evaluation.
          </p>
        </header>

        {/* THEORY */}
        <section className="animate-fadeUp delay-100">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="inline-block w-1 h-6 bg-indigo-500 rounded-full"></span>
              About ISC Board Questions
            </h2>
            <div className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">
              <p>
                The ISC (Indian School Certificate) Computer Science examination often includes questions on:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Converting infix expressions to postfix and prefix.</li>
                <li>Evaluating postfix and prefix expressions using stacks.</li>
                <li>Stack applications in expression evaluation.</li>
                <li>Understanding precedence and associativity.</li>
              </ul>
              <p>
                These questions are typically worth 2–4 marks and test both conceptual understanding and practical application.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">💡 Tip:</span> Practice these questions to familiarise yourself with the exam pattern and improve your problem-solving speed.
              </p>
            </div>
          </div>
        </section>

        {/* TABS */}
        <section className="animate-fadeUp delay-200">
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 border border-gray-200 dark:border-gray-800">
            <div className="flex gap-2 flex-wrap border-b border-gray-200 dark:border-gray-700 pb-4">
              <button
                onClick={() => setActiveTab('mcq')}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-colors duration-200",
                  activeTab === 'mcq'
                    ? "bg-indigo-600 text-white dark:bg-indigo-500"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                MCQs ({mcqQuestions.length})
              </button>
              <button
                onClick={() => setActiveTab('long')}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium transition-colors duration-200",
                  activeTab === 'long'
                    ? "bg-amber-600 text-white dark:bg-amber-500"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                Long Answer ({longQuestions.length})
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {activeTab === 'mcq' && (
                mcqQuestions.map((q, idx) => (
                  <ISCMCQItem key={idx} question={q} index={idx} />
                ))
              )}
              {activeTab === 'long' && (
                longQuestions.map((q, idx) => (
                  <ISCLongItem key={idx} question={q} index={idx} />
                ))
              )}
            </div>
          </div>
        </section>

        {/* TEACHER’S NOTE */}
        <div className="animate-fadeUp delay-300">
          <Teacher
            note={
              "ISC board questions are a great benchmark for your understanding. I tell my students in Barrackpore: 'If you can solve these confidently, you're well-prepared for the exam.' Focus on understanding the concepts behind each conversion and evaluation, not just the answers. Practice tracing the stack for every expression."
            }
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