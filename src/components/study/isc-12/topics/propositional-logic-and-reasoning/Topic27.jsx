// Topic27.jsx
import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic27_files/topic27_questions';

const Topic27 = () => {
  // Collection of diverse examples covering all topics
  const examples = [
    {
      id: 1,
      category: "Truth Table",
      question: "Construct the truth table for (p ∧ q) ∨ (¬p ∧ ¬q). What does it represent?",
      answer: "It represents the biconditional p ⇔ q (true when p and q have same truth value).",
      solution: "p q | p∧q | ¬p∧¬q | Result\nT T | T   | F     | T\nT F | F   | F     | F\nF T | F   | F     | F\nF F | F   | T     | T"
    },
    {
      id: 2,
      category: "Logical Equivalence",
      question: "Show that p ⇒ (q ∨ r) is logically equivalent to (p ∧ ¬q) ⇒ r.",
      answer: "They are equivalent.",
      solution: "p ⇒ (q∨r) ≡ ¬p ∨ (q∨r) ≡ ¬p ∨ q ∨ r.\n(p ∧ ¬q) ⇒ r ≡ ¬(p ∧ ¬q) ∨ r ≡ (¬p ∨ q) ∨ r ≡ ¬p ∨ q ∨ r.\nBoth reduce to ¬p ∨ q ∨ r."
    },
    {
      id: 3,
      category: "Simplification",
      question: "Simplify using laws: (p ∧ q) ∨ (p ∧ ¬q) ∨ (¬p ∧ q)",
      answer: "p ∨ q",
      solution: "(p∧q) ∨ (p∧¬q) = p ∧ (q∨¬q) = p ∧ True = p.\nThen p ∨ (¬p∧q) = (p∨¬p) ∧ (p∨q) = True ∧ (p∨q) = p∨q."
    },
    {
      id: 4,
      category: "Converse/Inverse/Contrapositive",
      question: "Given: 'If Abhronila is in Ichapur, then she is in West Bengal.' Write converse, inverse, contrapositive.",
      answer: "Converse: If she is in West Bengal, then she is in Ichapur.\nInverse: If she is not in Ichapur, then she is not in West Bengal.\nContrapositive: If she is not in West Bengal, then she is not in Ichapur.",
      solution: "Original: I ⇒ W. Converse: W ⇒ I. Inverse: ¬I ⇒ ¬W. Contrapositive: ¬W ⇒ ¬I."
    },
    {
      id: 5,
      category: "Tautology/Contradiction",
      question: "Check if (p ⇒ q) ∧ (q ⇒ r) ⇒ (p ⇒ r) is a tautology.",
      answer: "Yes, it is a tautology (hypothetical syllogism).",
      solution: "If p⇒q and q⇒r are true, then whenever p is true, q is true, so r is true. Hence p⇒r holds. The implication is always true."
    },
    {
      id: 6,
      category: "English to Logic",
      question: "Translate: 'Swadeep will go to the park unless it rains.'",
      answer: "G ∨ R  or  ¬R ⇒ G",
      solution: "Let G: 'Swadeep goes to the park', R: 'It rains'. 'Unless' means: if not rain then go, so ¬R ⇒ G, which is equivalent to G ∨ R."
    },
    {
      id: 7,
      category: "Programming Logic",
      question: "Simplify the Java condition: if (!(isWeekend && !isHoliday))",
      answer: "if (!isWeekend || isHoliday)",
      solution: "De Morgan: ¬(A ∧ B) ≡ ¬A ∨ ¬B. Here A = isWeekend, B = !isHoliday. So ¬(!isHoliday) = isHoliday. Result: !isWeekend || isHoliday."
    },
    {
      id: 8,
      category: "De Morgan's Law",
      question: "Apply De Morgan to ¬(p ∨ (q ∧ r)).",
      answer: "¬p ∧ (¬q ∨ ¬r)",
      solution: "¬(p ∨ (q∧r)) ≡ ¬p ∧ ¬(q∧r) ≡ ¬p ∧ (¬q ∨ ¬r)."
    },
    {
      id: 9,
      category: "Implication Laws",
      question: "Simplify: (p ⇒ q) ∨ (p ⇒ ¬q)",
      answer: "¬p ∨ (q ∨ ¬q) ≡ ¬p ∨ True ≡ True (tautology)",
      solution: "(¬p∨q) ∨ (¬p∨¬q) ≡ ¬p ∨ (q∨¬q) ≡ ¬p ∨ True ≡ True."
    },
    {
      id: 10,
      category: "Biconditional",
      question: "Prove that p ⇔ q is equivalent to (p ∧ q) ∨ (¬p ∧ ¬q).",
      answer: "Yes, they are equivalent.",
      solution: "p⇔q is true when p and q same: both true gives p∧q true; both false gives ¬p∧¬q true. So disjunction captures exactly those cases."
    },
    {
      id: 11,
      category: "Distributive Law",
      question: "Simplify: (p ∨ q) ∧ (p ∨ r) ∧ (q ∨ r)",
      answer: "(p ∧ q) ∨ (p ∧ r) ∨ (q ∧ r) (majority function)",
      solution: "This is the majority function. It cannot be simplified further in CNF form. The expression is equivalent to (p∧q) ∨ (p∧r) ∨ (q∧r)."
    },
    {
      id: 12,
      category: "Truth Table Classification",
      question: "Classify: (p ∨ ¬p) ∧ (q ∨ ¬q)",
      answer: "Tautology",
      solution: "p∨¬p is True, q∨¬q is True, so True ∧ True = True always."
    },
    {
      id: 13,
      category: "Logical Equivalence Proof",
      question: "Prove using laws: (p ∧ q) ⇒ r ≡ p ⇒ (q ⇒ r)",
      answer: "They are equivalent (exportation).",
      solution: "(p∧q)⇒r ≡ ¬(p∧q) ∨ r ≡ (¬p ∨ ¬q) ∨ r ≡ ¬p ∨ (¬q ∨ r) ≡ p ⇒ (q⇒r)."
    },
    {
      id: 14,
      category: "Real-World Logic",
      question: "If Susmita is a doctor, then she went to medical school. Susmita did not go to medical school. What can you conclude?",
      answer: "Susmita is not a doctor.",
      solution: "Modus tollens: From p⇒q and ¬q, conclude ¬p."
    },
    {
      id: 15,
      category: "Mixed Example",
      question: "Evaluate when p=true, q=false, r=true: (p ∨ ¬q) ∧ (¬r ⇒ p)",
      answer: "true",
      solution: "p∨¬q = true ∨ true = true. ¬r = false, false⇒p = false⇒true = true. true ∧ true = true."
    }
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const categories = ["All", ...new Set(examples.map(e => e.category))];
  const filteredExamples = categoryFilter === "All" ? examples : examples.filter(e => e.category === categoryFilter);
  const current = filteredExamples[selectedIndex];

  const checkAnswer = () => {
    setSubmitted(true);
    setShowSolution(true);
  };

  const nextExample = () => {
    if (selectedIndex < filteredExamples.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setUserAnswer("");
      setShowSolution(false);
      setSubmitted(false);
    }
  };

  const prevExample = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setUserAnswer("");
      setShowSolution(false);
      setSubmitted(false);
    }
  };

  const resetExample = () => {
    setUserAnswer("");
    setShowSolution(false);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Title Section */}
        <div className="animate-[slideUp_0.5s_ease-out]">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Different Examples
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            Diverse practice problems covering all concepts in propositional logic
          </p>
        </div>

        {/* Introduction Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-100">
          <h2 className="text-2xl font-semibold border-l-4 border-blue-500 pl-3 mb-4">Variety is Key to Mastery</h2>
          <p className="leading-relaxed">
            This section brings together <strong>15 different types of problems</strong> from all the topics covered:
            truth tables, logical equivalence, simplification, converse/inverse/contrapositive, tautology/contradiction, 
            English to logic translation, programming logic, De Morgan's laws, implication laws, biconditional, distributive law, 
            and real-world applications.
          </p>
          <p className="leading-relaxed mt-2">
            Use the <strong>category filter</strong> to focus on specific topics or try random problems to test your overall understanding.
          </p>
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm italic">💡 <strong>Goal:</strong> By working through these varied examples, you'll develop the flexibility to recognize and solve any logical problem that appears in exams or real life.</p>
          </div>
        </div>

        {/* Filter and Navigation */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-200">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold">Filter by category:</span>
              {categories.map(cat => (
                <button key={cat} onClick={() => { setCategoryFilter(cat); setSelectedIndex(0); setShowSolution(false); setSubmitted(false); setUserAnswer(""); }} className={clsx("px-2 py-1 text-xs rounded", categoryFilter === cat ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300")}>{cat}</button>
              ))}
            </div>
            <button onClick={resetExample} className="text-sm bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Reset Current</button>
          </div>
          <div className="flex justify-between items-center mt-3">
            <button onClick={prevExample} disabled={selectedIndex === 0} className={clsx("px-3 py-1 rounded", selectedIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white")}>◀ Previous</button>
            <span className="text-sm">Example {selectedIndex + 1} of {filteredExamples.length} ({current.category})</span>
            <button onClick={nextExample} disabled={selectedIndex === filteredExamples.length - 1} className={clsx("px-3 py-1 rounded", selectedIndex === filteredExamples.length - 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white")}>Next ▶</button>
          </div>
        </div>

        {/* Example Display */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-300">
          <h2 className="text-2xl font-semibold mb-4">📌 Example {selectedIndex + 1}</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
            <p className="font-medium">{current.question}</p>
          </div>

          {/* Answer Input */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Your Answer (attempt before viewing solution):</label>
            <textarea 
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              rows="3"
              placeholder="Type your reasoning or final answer here..."
            />
          </div>

          <div className="flex gap-3 mb-4">
            <button onClick={checkAnswer} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold">Show Solution</button>
            {showSolution && <button onClick={() => setShowSolution(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded">Hide Solution</button>}
          </div>

          {/* Solution Display */}
          {showSolution && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-green-500">
              <p className="font-bold text-green-600 dark:text-green-400">✅ Solution:</p>
              <p className="mt-1 font-semibold">Answer: {current.answer}</p>
              <p className="mt-2 text-sm">{current.solution}</p>
              <p className="mt-2 text-xs text-gray-500">💡 Think about how you arrived at your answer. Compare with the solution to identify gaps.</p>
            </div>
          )}
        </div>

        {/* Quick Reference by Category */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 animate-[slideUp_0.5s_ease-out] animation-delay-400">
          <h2 className="text-2xl font-semibold border-l-4 border-red-500 pl-3 mb-4">📚 Example Categories Covered</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Truth Table</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Logical Equivalence</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Simplification</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Converse/Inverse/Contrapositive</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Tautology/Contradiction</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">English to Logic</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Programming Logic</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">De Morgan's Law</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Implication Laws</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Biconditional</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Distributive Law</div>
            <div className="p-2 bg-white dark:bg-gray-700 rounded">Real-World Logic</div>
          </div>
        </div>

        {/* Learning Tips */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 shadow-md animate-[slideUp_0.5s_ease-out] animation-delay-500">
          <h2 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-4">✅ How to Use These Examples</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Attempt before checking solution:</strong> Write your answer in the text area first.</li>
            <li><strong>Use the category filter</strong> to focus on topics where you need more practice.</li>
            <li><strong>Time yourself</strong> — aim to solve each example in 2-3 minutes.</li>
            <li><strong>Review the solution carefully</strong> even if you got it right — there may be alternative methods.</li>
            <li><strong>Create similar examples</strong> for yourself to deepen understanding.</li>
          </ul>
          <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm">
            <p>📌 <strong>Final Challenge:</strong> After completing all examples, try to explain each concept in your own words without looking at notes.</p>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-600">
          <Teacher note="This final practice set consolidates everything. Encourage students to attempt problems without external help first. Use the category filter to identify weak areas. In class, assign 3-4 examples as a quick test, then discuss alternative solution methods. The variety ensures students don't rely on rote memorization but develop genuine understanding." />
        </div>

        {/* FAQ Section */}
        <div className="animate-[slideUp_0.5s_ease-out] animation-delay-700">
          <FAQTemplate title="Different Examples FAQs" questions={questions} />
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

export default Topic27;