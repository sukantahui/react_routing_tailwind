// Topic26.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic26_files/topic26_questions';

const Topic26 = () => {
  // Assertion-Reason examples bank
  const examples = [
    {
      id: 1,
      assertion: "The statement (p ∧ q) ⇒ p is a tautology.",
      reason: "If a conjunction is true, then each of its conjuncts is true.",
      correctOption: "A",
      explanation: "Both A and R are true, and R correctly explains A. The implication (p∧q)⇒p is always true because if the conjunction is true, p must be true."
    },
    {
      id: 2,
      assertion: "p ∨ q is true.",
      reason: "p is true.",
      correctOption: "C",
      explanation: "A can be true even when p is false (q true). So R is not necessarily true when A is true."
    },
    {
      id: 3,
      assertion: "¬(p ∧ q) is logically equivalent to ¬p ∨ ¬q.",
      reason: "De Morgan's law states that the negation of a conjunction is the disjunction of the negations.",
      correctOption: "A",
      explanation: "Both true and R correctly states De Morgan's law which explains A."
    },
    {
      id: 4,
      assertion: "The contrapositive of p ⇒ q is q ⇒ p.",
      reason: "Contrapositive is formed by swapping and negating both sides.",
      correctOption: "D",
      explanation: "R is true (definition of contrapositive), but A is false (contrapositive is ¬q ⇒ ¬p, not q⇒p)."
    },
    {
      id: 5,
      assertion: "If Swadeep is from Barrackpore, then he is from West Bengal.",
      reason: "Barrackpore is a city in West Bengal.",
      correctOption: "A",
      explanation: "Both true, and R provides the geographical fact that explains the implication."
    },
    {
      id: 6,
      assertion: "p ∧ ¬p is a contradiction.",
      reason: "A proposition cannot be both true and false simultaneously.",
      correctOption: "A",
      explanation: "Both true, and R (law of non-contradiction) correctly explains why p∧¬p is always false."
    },
    {
      id: 7,
      assertion: "(p ⇒ q) ∧ (q ⇒ p) is equivalent to p ⇔ q.",
      reason: "The biconditional is defined as the conjunction of the two implications.",
      correctOption: "A",
      explanation: "R is the definition, correctly explaining A."
    },
    {
      id: 8,
      assertion: "The converse of p ⇒ q is logically equivalent to the original.",
      reason: "Implication is a symmetric relation.",
      correctOption: "E",
      explanation: "Both false. Converse is not equivalent to original, and implication is not symmetric."
    },
    {
      id: 9,
      assertion: "¬(p ∨ q) ≡ ¬p ∧ ¬q is an example of De Morgan's law.",
      reason: "De Morgan's laws apply only to conjunctions, not disjunctions.",
      correctOption: "C",
      explanation: "A is true (it is De Morgan's law), but R is false (De Morgan applies to both ∧ and ∨)."
    },
    {
      id: 10,
      assertion: "If a number is divisible by 6, then it is divisible by 3.",
      reason: "6 is a multiple of 3, so any multiple of 6 is also a multiple of 3.",
      correctOption: "A",
      explanation: "Both true, and R correctly explains the divisibility implication."
    },
    {
      id: 11,
      assertion: "p ∨ ¬p is a tautology.",
      reason: "The law of excluded middle states that every proposition is either true or false.",
      correctOption: "A",
      explanation: "Both true, and R explains why p∨¬p is always true."
    },
    {
      id: 12,
      assertion: "The inverse of p ⇒ q is ¬q ⇒ ¬p.",
      reason: "The inverse negates both antecedent and consequent.",
      correctOption: "D",
      explanation: "R is true (definition of inverse), but A is false (inverse is ¬p ⇒ ¬q, not ¬q⇒¬p)."
    },
    {
      id: 13,
      assertion: "The statement 'If it is raining, then the ground is wet' is true even on a sunny day.",
      reason: "An implication is true whenever the antecedent is false.",
      correctOption: "A",
      explanation: "Both true, and R explains the vacuous truth of implication when antecedent false."
    },
    {
      id: 14,
      assertion: "p ⇒ q is equivalent to its contrapositive.",
      reason: "Contrapositive preserves truth value in all cases.",
      correctOption: "A",
      explanation: "Both true, and R correctly states the equivalence."
    },
    {
      id: 15,
      assertion: "The absorption law states: p ∨ (p ∧ q) ≡ p.",
      reason: "If p is true, the OR is true; if p is false, the AND is false, so OR equals p.",
      correctOption: "A",
      explanation: "Both true, and R provides the reasoning behind absorption."
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState({ correct: 0, attempted: 0 });

  const current = examples[selectedIndex];

  const options = [
    { code: "A", text: "Both A and R are true and R is the correct explanation of A." },
    { code: "B", text: "Both A and R are true but R is NOT the correct explanation of A." },
    { code: "C", text: "A is true but R is false." },
    { code: "D", text: "A is false but R is true." },
    { code: "E", text: "Both A and R are false." }
  ];

  const checkAnswer = () => {
    if (!selectedOption) return;
    const isCorrect = selectedOption === current.correctOption;
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      attempted: prev.attempted + 1
    }));
    setShowResult(true);
  };

  const nextExample = () => {
    if (selectedIndex < examples.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const prevExample = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setSelectedOption(null);
      setShowResult(false);
    }
  };

  const resetPractice = () => {
    setSelectedIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore({ correct: 0, attempted: 0 });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Assertion–Reason Examples
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Practice with real-world and logical assertion-reason questions
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">What are Assertion–Reason Questions?</h2>
          <p className="leading-relaxed">
            In assertion–reason questions, you are given two statements: <strong>Assertion (A)</strong> and <strong>Reason (R)</strong>. You must evaluate:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Whether A is true or false</li>
            <li>Whether R is true or false</li>
            <li>If both are true, whether R correctly explains A</li>
          </ul>
          <p className="mt-3">This format tests your understanding of logical relationships, cause-effect, and conceptual clarity.</p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Tip:</strong> Always evaluate truth values independently before checking the explanation link.</p>
          </div>
        </div>

        {/* Score and Navigation */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <div className="flex flex-wrap justify-between items-center">
            <p className="font-semibold">📊 Score: {score.correct}/{score.attempted} ({score.attempted ? Math.round((score.correct/score.attempted)*100) : 0}%)</p>
            <button onClick={resetPractice} className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Reset</button>
          </div>
          <div className="flex justify-between items-center mt-3">
            <button onClick={prevExample} disabled={selectedIndex === 0} className={clsx("px-3 py-1 rounded", selectedIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white")}>◀ Previous</button>
            <span className="text-sm">Example {selectedIndex + 1} of {examples.length}</span>
            <button onClick={nextExample} disabled={selectedIndex === examples.length - 1} className={clsx("px-3 py-1 rounded", selectedIndex === examples.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white")}>Next ▶</button>
          </div>
        </div>

        {/* Current Assertion-Reason Pair */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold mb-4">📋 Example {selectedIndex + 1}</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 space-y-3">
            <p><strong className="text-blue-600">Assertion (A):</strong> {current.assertion}</p>
            <p><strong className="text-green-600">Reason (R):</strong> {current.reason}</p>
          </div>

          {/* Options */}
          <div className="space-y-2 mb-4">
            {options.map(opt => (
              <label key={opt.code} className="flex items-start gap-2 p-2 bg-white dark:bg-gray-800 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <input type="radio" name="option" value={opt.code} checked={selectedOption === opt.code} onChange={() => setSelectedOption(opt.code)} className="mt-1" />
                <span><strong>{opt.code}:</strong> {opt.text}</span>
              </label>
            ))}
          </div>

          <div className="flex gap-3">
            <button onClick={checkAnswer} disabled={!selectedOption} className={clsx("px-4 py-2 rounded font-semibold", selectedOption ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-400 cursor-not-allowed")}>Check Answer</button>
            {showResult && <button onClick={() => setShowResult(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">Hide Explanation</button>}
          </div>

          {showResult && (
            <div className={clsx("mt-4 p-4 rounded-lg", selectedOption === current.correctOption ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200" : "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200")}>
              <p className="font-bold">{selectedOption === current.correctOption ? "✅ Correct!" : "❌ Incorrect"}</p>
              <p className="text-sm mt-1">Your choice: {selectedOption} | Correct: {current.correctOption}</p>
              <p className="mt-2 text-sm"><strong>Explanation:</strong> {current.explanation}</p>
            </div>
          )}
        </div>

        {/* Tips for Solving A-R Questions */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold border-l-4 border-yellow-500 pl-3 mb-4">🎯 Tips for Solving Assertion–Reason Questions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Read both statements carefully.</strong> Identify the logical structure and keywords.</li>
            <li><strong>Determine truth of Assertion first.</strong> Use your knowledge of logic, mathematics, or facts.</li>
            <li><strong>Determine truth of Reason independently.</strong> Don't let the Assertion influence your judgment.</li>
            <li><strong>If both are true, check if R explains A.</strong> Ask: Does R provide the underlying cause or logical justification for A?</li>
            <li><strong>Select the correct option (A to E).</strong></li>
          </ol>
          <div className="mt-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p className="font-mono">⚠️ <strong>Common trap:</strong> Assuming both true means R explains A. Sometimes they are true but unrelated (Option B).</p>
          </div>
        </div>

        {/* Common Patterns in A-R Questions */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">📌 Common Assertion–Reason Patterns in Logic</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Pattern 1:</strong> A: Logical law (e.g., De Morgan), R: Statement of the law → <span className="text-green-600">Option A</span></div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Pattern 2:</strong> A: True statement, R: False statement → <span className="text-red-600">Option C</span></div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Pattern 3:</strong> A: False statement, R: True definition → <span className="text-red-600">Option D</span></div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Pattern 4:</strong> Both true but R is a consequence, not cause → <span className="text-yellow-600">Option B</span></div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded"><strong>Pattern 5:</strong> Both false (misconceptions) → <span className="text-red-600">Option E</span></div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <Teacher note="Assertion-reason questions are excellent for testing conceptual understanding. Encourage students to explain why they chose a particular option, not just guess. Use real-life examples (like the Barrackpore-West Bengal example) to make it relatable. In class, ask students to create their own assertion-reason pairs based on logical laws — this deepens understanding." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <FAQTemplate title="Assertion–Reason Examples FAQs" questions={questions} />
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); }
          to { transform: translateY(0); }
        }
        .animate-\\[slideUp_0\\.5s_ease-out\\] {
          animation: slideUp 0.5s ease-out forwards;
        }
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-700 { animation-delay: 0.7s; }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[slideUp_0\\.5s_ease-out\\] {
            animation: none;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic26;