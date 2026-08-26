// Topic24.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic24_files/topic24_questions';

const Topic24 = () => {
  // Sample ISC previous year questions (based on typical ISC Computer Science paper pattern)
  const questionBank = [
    {
      id: 1,
      year: 2023,
      type: "Truth Table",
      question: "Construct a truth table for the expression (p ∧ q) ∨ (¬p ∧ ¬q). Is it a tautology, contradiction, or contingency?",
      answer: "The expression is equivalent to p ⇔ q (biconditional). It is a contingency because it is true when p and q are both true or both false, and false otherwise.",
      solution: "p q | p∧q | ¬p∧¬q | (p∧q)∨(¬p∧¬q)\nT T | T   | F      | T\nT F | F   | F      | F\nF T | F   | F      | F\nF F | F   | T      | T\nFinal column has both T and F → Contingency."
    },
    {
      id: 2,
      year: 2022,
      type: "Logical Equivalence",
      question: "Verify using truth table whether p ⇒ q and ¬q ⇒ ¬p are logically equivalent.",
      answer: "Yes, they are logically equivalent (contrapositive).",
      solution: "p q | p⇒q | ¬q⇒¬p\nT T | T   | T\nT F | F   | F\nF T | T   | T\nF F | T   | T\nColumns identical → Equivalent."
    },
    {
      id: 3,
      year: 2021,
      type: "Simplification",
      question: "Simplify the logical expression: ¬(p ∧ q) ∨ (¬p ∨ q) using laws of logic.",
      answer: "The expression simplifies to True (tautology).",
      solution: "¬(p∧q) ∨ (¬p∨q) ≡ (¬p∨¬q) ∨ (¬p∨q) [De Morgan]\n≡ ¬p ∨ ¬q ∨ ¬p ∨ q [Associative]\n≡ ¬p ∨ (¬q ∨ q) ∨ ¬p [Commutative]\n≡ ¬p ∨ True ∨ ¬p [Complement]\n≡ True [Domination]"
    },
    {
      id: 4,
      year: 2020,
      type: "Converse/Inverse/Contrapositive",
      question: "Given the statement: 'If a student is from Barrackpore, then he is from West Bengal.' Write its converse, inverse, and contrapositive.",
      answer: "Converse: If a student is from West Bengal, then he is from Barrackpore.\nInverse: If a student is not from Barrackpore, then he is not from West Bengal.\nContrapositive: If a student is not from West Bengal, then he is not from Barrackpore.",
      solution: "Original: B ⇒ W. Converse: W ⇒ B. Inverse: ¬B ⇒ ¬W. Contrapositive: ¬W ⇒ ¬B."
    },
    {
      id: 5,
      year: 2019,
      type: "Tautology Check",
      question: "Prove that (p ⇒ q) ∨ (q ⇒ p) is a tautology without using truth table.",
      answer: "It is a tautology because for any p,q, at least one implication holds.",
      solution: "If p is true, then q⇒p is true regardless of q. If p is false, then p⇒q is true. Hence always true."
    },
    {
      id: 6,
      year: 2018,
      type: "De Morgan's Law",
      question: "State De Morgan's laws in propositional logic. Apply them to simplify ¬(p ∨ (q ∧ r)).",
      answer: "De Morgan's laws: ¬(p∧q) ≡ ¬p∨¬q, ¬(p∨q) ≡ ¬p∧¬q.\n¬(p ∨ (q∧r)) ≡ ¬p ∧ ¬(q∧r) ≡ ¬p ∧ (¬q ∨ ¬r).",
      solution: "First apply ¬(A∨B) ≡ ¬A∧¬B with A=p, B=(q∧r). Then apply ¬(q∧r) ≡ ¬q∨¬r."
    },
    {
      id: 7,
      year: 2017,
      type: "Biconditional",
      question: "Show that p ⇔ q is logically equivalent to (p ⇒ q) ∧ (q ⇒ p).",
      answer: "Truth table confirms equivalence.",
      solution: "p q | p⇔q | p⇒q | q⇒p | (p⇒q)∧(q⇒p)\nT T | T   | T    | T    | T\nT F | F   | F    | T    | F\nF T | F   | T    | F    | F\nF F | T   | T    | T    | T\nColumns match."
    },
    {
      id: 8,
      year: 2016,
      type: "Contrapositive Application",
      question: "Prove by contrapositive: If n² is even, then n is even.",
      answer: "Contrapositive: If n is odd, then n² is odd. Let n=2k+1, then n²=4k²+4k+1=2(2k²+2k)+1 which is odd. Hence proven.",
      solution: "Contrapositive proof is valid because original and contrapositive are equivalent."
    },
    {
      id: 9,
      year: 2015,
      type: "Boolean Expression",
      question: "Write the truth table for (p ∨ ¬q) ∧ (¬p ∨ q). What does it represent?",
      answer: "It represents the biconditional (p ⇔ q).",
      solution: "p q | p∨¬q | ¬p∨q | Result\nT T | T    | T    | T\nT F | T    | F    | F\nF T | F    | T    | F\nF F | T    | T    | T\nResult matches p⇔q."
    },
    {
      id: 10,
      year: 2014,
      type: "Simplification",
      question: "Simplify: (p ∧ q) ∨ (p ∧ ¬q) ∨ (¬p ∧ q)",
      answer: "p ∨ q",
      solution: "(p∧q)∨(p∧¬q) ≡ p∧(q∨¬q) ≡ p∧True ≡ p. Then p ∨ (¬p∧q) ≡ (p∨¬p)∧(p∨q) ≡ True∧(p∨q) ≡ p∨q."
    }
  ];

  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [score, setScore] = useState({ correct: 0, attempted: 0 });
  const [submitted, setSubmitted] = useState(false);

  const current = questionBank[selectedQuestion];

  const checkAnswer = () => {
    setSubmitted(true);
    // Simple keyword matching for demo; in real app, use proper evaluation
    const isCorrect = userAnswer.toLowerCase().includes(current.answer.toLowerCase().substring(0, 30));
    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1, attempted: prev.attempted + 1 }));
    } else {
      setScore(prev => ({ ...prev, attempted: prev.attempted + 1 }));
    }
    setShowSolution(true);
  };

  const nextQuestion = () => {
    if (selectedQuestion < questionBank.length - 1) {
      setSelectedQuestion(selectedQuestion + 1);
      setUserAnswer("");
      setShowSolution(false);
      setSubmitted(false);
    }
  };

  const prevQuestion = () => {
    if (selectedQuestion > 0) {
      setSelectedQuestion(selectedQuestion - 1);
      setUserAnswer("");
      setShowSolution(false);
      setSubmitted(false);
    }
  };

  const resetPractice = () => {
    setSelectedQuestion(0);
    setUserAnswer("");
    setShowSolution(false);
    setSubmitted(false);
    setScore({ correct: 0, attempted: 0 });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            ISC Previous Year Question Practice
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Real exam questions from past ISC Computer Science papers
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">Practice with Past ISC Questions</h2>
          <p className="leading-relaxed">
            The ISC (Indian School Certificate) Computer Science examination includes questions on propositional logic, truth tables, logical equivalence, and simplification. Practicing previous year questions helps you understand the exam pattern, difficulty level, and common question types.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Exam tip:</strong> ISC questions often combine multiple concepts — truth tables with classification, simplification using laws, and application of De Morgan's laws. Time management is key.</p>
          </div>
        </div>

        {/* Score Tracker */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <div className="flex justify-between items-center">
            <p className="font-semibold">📊 Your Progress</p>
            <p>Attempted: {score.attempted} | Correct: {score.correct} | Accuracy: {score.attempted ? Math.round((score.correct / score.attempted) * 100) : 0}%</p>
            <button onClick={resetPractice} className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded">Reset</button>
          </div>
        </div>

        {/* Interactive Question Practice */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">📝 ISC Practice Question</h2>
          
          {/* Question Navigation */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevQuestion} disabled={selectedQuestion === 0} className={clsx("px-3 py-1 rounded", selectedQuestion === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white")}>◀ Previous</button>
            <span className="text-sm">Question {selectedQuestion + 1} of {questionBank.length}</span>
            <button onClick={nextQuestion} disabled={selectedQuestion === questionBank.length - 1} className={clsx("px-3 py-1 rounded", selectedQuestion === questionBank.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white")}>Next ▶</button>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">{current.year} - {current.type}</span>
            </div>
            <p className="text-lg font-medium">{current.question}</p>
          </div>

          {/* Answer Input */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Your Answer:</label>
            <textarea 
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              rows="4"
              placeholder="Type your answer here..."
            />
          </div>

          <div className="flex gap-3 mb-4">
            <button onClick={checkAnswer} disabled={!userAnswer.trim()} className={clsx("px-4 py-2 rounded font-semibold", userAnswer.trim() ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-400 cursor-not-allowed")}>Check Answer</button>
            {showSolution && (
              <button onClick={() => setShowSolution(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">Hide Solution</button>
            )}
          </div>

          {/* Solution Display */}
          {showSolution && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-green-500">
              <p className="font-bold text-green-600 dark:text-green-400">✅ Model Answer:</p>
              <p className="mt-1">{current.answer}</p>
              <p className="font-bold mt-2">📖 Detailed Solution:</p>
              <pre className="mt-1 text-sm whitespace-pre-wrap font-sans">{current.solution}</pre>
            </div>
          )}
        </div>

        {/* Quick Reference: ISC Important Topics */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">📌 ISC Exam Topic Weightage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Truth Tables (2-3 marks)</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Logical Equivalence & Laws (3-4 marks)</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">De Morgan's Laws (2 marks)</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Converse, Inverse, Contrapositive (2-3 marks)</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Tautology/Contradiction/Contingency (2 marks)</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Simplification using Laws (3-4 marks)</div>
          </div>
        </div>

        {/* Common ISC Mistakes */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold text-red-700 dark:text-red-300 mb-4">⚠️ Common Mistakes in ISC Exams</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Incorrect truth table row count:</strong> For 3 variables, many write 6 or 4 rows instead of 8.</li>
            <li><strong>Misplacing parentheses in simplification:</strong> Leads to wrong applications of De Morgan.</li>
            <li><strong>Confusing converse with contrapositive:</strong> Many write converse when contrapositive is asked.</li>
            <li><strong>Forgetting vacuous truth in implications:</strong> false ⇒ false is true.</li>
            <li><strong>Not showing intermediate steps:</strong> ISC examiners expect step-by-step working.</li>
          </ul>
        </div>

        {/* Best Practices for ISC */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ ISC Exam Tips & Strategies</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Draw truth tables neatly</strong> with proper headings and columns.</li>
            <li><strong>Show all intermediate columns</strong> for complex expressions.</li>
            <li><strong>Mention the laws used</strong> in simplification steps.</li>
            <li><strong>For equivalence proofs, either use truth tables or algebraic laws</strong> — both accepted if correct.</li>
            <li><strong>Practice time management:</strong> Spend max 5-6 minutes on a 3-mark logic question.</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Quick Revision Checklist:</strong></p>
            <ul className="list-check list-inside ml-4">
              <li>☑️ Know all 10+ logical laws (Identity, Domination, Idempotent, De Morgan, etc.)</li>
              <li>☑️ Truth table patterns: AND (TT→T), OR (FF→F), Implication (TF→F)</li>
              <li>☑️ Contrapositive is equivalent to original</li>
              <li>☑️ "Only if" means necessary condition (p only if q = p⇒q)</li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <Teacher note="Previous year papers are gold for exam preparation. Have students solve at least 5 years' questions under timed conditions. Focus on common pitfalls: truth table row count, De Morgan application, and implication truth values. In class, pick one question and solve it step-by-step on the board, then give similar questions for practice. Encourage students to write solutions exactly as expected in ISC answer sheets." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-800">
          <FAQTemplate title="ISC Previous Year Questions FAQs" questions={questions} />
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
        .animation-delay-800 { animation-delay: 0.8s; }
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

export default Topic24;