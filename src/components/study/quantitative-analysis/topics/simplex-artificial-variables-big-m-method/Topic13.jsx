import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic13_files/topic13_questions';
import noteText from './topic13_files/topic13_note.txt?raw';

const Topic13 = () => {
  const [activeTab, setActiveTab] = useState('questions');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAnswer, setShowAnswer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'questions', label: 'Short Questions' },
    { id: 'categories', label: 'Categories' },
    { id: 'quickref', label: 'Quick Reference' },
  ];

  // Short questions data
  const shortQuestions = [
    // Category: Simplex Method Basics
    {
      id: 1,
      category: 'Simplex Method',
      question: 'What is the Simplex Method?',
      answer: 'The Simplex Method is an algebraic algorithm for solving linear programming problems by moving from one corner point to another, improving the objective value at each step until optimality is reached.',
      difficulty: 'Basic'
    },
    {
      id: 2,
      category: 'Simplex Method',
      question: 'What are the steps of the Simplex Method?',
      answer: '1) Convert to standard form, 2) Form initial tableau, 3) Find entering variable (most negative Z coefficient), 4) Find leaving variable (ratio test), 5) Pivot, 6) Check optimality, 7) Repeat until optimal.',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      category: 'Simplex Method',
      question: 'What is a basic feasible solution?',
      answer: 'A basic feasible solution is a solution where the number of non-zero variables equals the number of constraints, and all variables satisfy the non-negativity constraints.',
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      category: 'Simplex Method',
      question: 'What is a basic variable?',
      answer: 'A basic variable is a variable that has a value in the current basic feasible solution. In the simplex tableau, basic variables form an identity matrix.',
      difficulty: 'Intermediate'
    },
    {
      id: 5,
      category: 'Simplex Method',
      question: 'What is a non-basic variable?',
      answer: 'A non-basic variable is a variable that is set to zero in the current basic feasible solution. It can enter the basis to improve the objective value.',
      difficulty: 'Intermediate'
    },

    // Category: Standard Form
    {
      id: 6,
      category: 'Standard Form',
      question: 'What are the requirements for standard form?',
      answer: '1) Maximization objective, 2) All constraints as equalities, 3) All variables ≥ 0, 4) Right-hand side ≥ 0.',
      difficulty: 'Basic'
    },
    {
      id: 7,
      category: 'Standard Form',
      question: 'What is a slack variable?',
      answer: 'A slack variable is a non-negative variable added to a ≤ constraint to convert it to an equality. It represents unused resources.',
      difficulty: 'Basic'
    },
    {
      id: 8,
      category: 'Standard Form',
      question: 'What is a surplus variable?',
      answer: 'A surplus variable is a non-negative variable subtracted from a ≥ constraint to convert it to an equality. It represents excess over requirements.',
      difficulty: 'Basic'
    },
    {
      id: 9,
      category: 'Standard Form',
      question: 'What is an artificial variable?',
      answer: 'An artificial variable is a temporary variable added to ≥ and = constraints to create an initial basic feasible solution. It must be driven to zero.',
      difficulty: 'Intermediate'
    },

    // Category: Big-M Method
    {
      id: 10,
      category: 'Big-M Method',
      question: 'What is the Big-M Method?',
      answer: 'The Big-M Method is a variant of the Simplex Method that handles ≥ and = constraints by adding artificial variables with a large penalty M in the objective function.',
      difficulty: 'Intermediate'
    },
    {
      id: 11,
      category: 'Big-M Method',
      question: 'What is the role of M in the Big-M Method?',
      answer: 'M is a very large penalty that forces artificial variables to zero in the optimal solution. It must be larger than any other coefficient in the problem.',
      difficulty: 'Advanced'
    },
    {
      id: 12,
      category: 'Big-M Method',
      question: 'What happens if an artificial variable remains in the optimal solution?',
      answer: 'If any artificial variable has a positive value at optimality, the original problem is infeasible (no feasible solution exists).',
      difficulty: 'Advanced'
    },
    {
      id: 13,
      category: 'Big-M Method',
      question: 'How do you penalize artificial variables in minimization?',
      answer: 'Add M × artificial variable to the objective function (Min Z = c₁x + c₂y + M a₁ + M a₂).',
      difficulty: 'Intermediate'
    },
    {
      id: 14,
      category: 'Big-M Method',
      question: 'How do you penalize artificial variables in maximization?',
      answer: 'Subtract M × artificial variable from the objective function (Max Z = c₁x + c₂y - M a₁ - M a₂).',
      difficulty: 'Intermediate'
    },

    // Category: Tableau Operations
    {
      id: 15,
      category: 'Tableau Operations',
      question: 'What is the pivot element?',
      answer: 'The pivot element is the element at the intersection of the entering column and leaving row. It must be positive and is used to transform the tableau.',
      difficulty: 'Intermediate'
    },
    {
      id: 16,
      category: 'Tableau Operations',
      question: 'How do you find the entering variable?',
      answer: 'For maximization, find the most negative coefficient in the Z row. For minimization, find the most positive coefficient in the Z row.',
      difficulty: 'Intermediate'
    },
    {
      id: 17,
      category: 'Tableau Operations',
      question: 'How do you find the leaving variable?',
      answer: 'Use the minimum ratio test: divide RHS by the coefficient in the entering column for each row, and choose the row with the smallest positive ratio.',
      difficulty: 'Intermediate'
    },
    {
      id: 18,
      category: 'Tableau Operations',
      question: 'What is the ratio test?',
      answer: 'The ratio test determines which variable leaves the basis. For each row, compute RHS/coefficient in the entering column, and choose the smallest positive ratio.',
      difficulty: 'Intermediate'
    },
    {
      id: 19,
      category: 'Tableau Operations',
      question: 'What happens if all coefficients in the entering column are negative?',
      answer: 'The problem is unbounded (no finite optimal solution exists).',
      difficulty: 'Advanced'
    },

    // Category: Optimality
    {
      id: 20,
      category: 'Optimality',
      question: 'What is the optimality condition for maximization?',
      answer: 'All coefficients in the Z row must be ≥ 0. If any coefficient is negative, the solution can still be improved.',
      difficulty: 'Basic'
    },
    {
      id: 21,
      category: 'Optimality',
      question: 'What is the optimality condition for minimization?',
      answer: 'All coefficients in the Z row must be ≤ 0. If any coefficient is positive, the solution can still be improved.',
      difficulty: 'Basic'
    },
    {
      id: 22,
      category: 'Optimality',
      question: 'What does a zero coefficient in the Z row indicate?',
      answer: 'A zero coefficient indicates that the corresponding variable does not affect the objective value. This can indicate multiple optimal solutions.',
      difficulty: 'Advanced'
    },

    // Category: Special Cases
    {
      id: 23,
      category: 'Special Cases',
      question: 'What is an unbounded solution?',
      answer: 'An unbounded solution occurs when the objective function can improve indefinitely without bound because the feasible region extends to infinity in the direction of optimization.',
      difficulty: 'Advanced'
    },
    {
      id: 24,
      category: 'Special Cases',
      question: 'What is an infeasible solution?',
      answer: 'An infeasible solution occurs when no point satisfies all constraints simultaneously. The feasible region is empty.',
      difficulty: 'Advanced'
    },
    {
      id: 25,
      category: 'Special Cases',
      question: 'What is a degenerate solution?',
      answer: 'A degenerate solution occurs when a basic variable has value zero at the optimal solution. This can cause cycling in the Simplex Method.',
      difficulty: 'Advanced'
    },
    {
      id: 26,
      category: 'Special Cases',
      question: 'What causes cycling in the Simplex Method?',
      answer: 'Cycling can occur in degenerate problems when the Simplex Method revisits the same basis without improving the objective value. Bland\'s rule prevents cycling.',
      difficulty: 'Advanced'
    },

    // Category: Practical Applications
    {
      id: 27,
      category: 'Practical Applications',
      question: 'What industries use the Simplex Method?',
      answer: 'The Simplex Method is used in manufacturing, logistics, finance, energy, healthcare, transportation, and many other industries for optimization.',
      difficulty: 'Basic'
    },
    {
      id: 28,
      category: 'Practical Applications',
      question: 'How does the Simplex Method help in decision-making?',
      answer: 'The Simplex Method provides optimal solutions for resource allocation, production planning, investment decisions, and helps managers make data-driven decisions.',
      difficulty: 'Intermediate'
    },
    {
      id: 29,
      category: 'Practical Applications',
      question: 'What is the difference between Simplex and Big-M in practice?',
      answer: 'Simplex is used when all constraints are ≤; Big-M is used when there are ≥ or = constraints. Simplex is simpler and faster when applicable.',
      difficulty: 'Intermediate'
    },
    {
      id: 30,
      category: 'Practical Applications',
      question: 'Why is the Simplex Method important in optimization?',
      answer: 'The Simplex Method is the foundation of linear programming optimization. It efficiently solves large-scale problems and is widely used in industry and government.',
      difficulty: 'Basic'
    }
  ];

  // Categories
  const categories = ['All', 'Simplex Method', 'Standard Form', 'Big-M Method', 'Tableau Operations', 'Optimality', 'Special Cases', 'Practical Applications'];

  const filteredQuestions = shortQuestions.filter(q => 
    (selectedCategory === 'All' || q.category === selectedCategory) &&
    (q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleAnswer = (id) => {
    setShowAnswer(showAnswer === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Short Questions - Simplex & Big-M Method
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Test your knowledge with these short questions covering all key concepts of the 
            Simplex Method and Big-M Method. Perfect for quick revision and self-assessment.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center border-b border-gray-200 dark:border-gray-700 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                "px-6 py-2 rounded-lg font-medium transition-all duration-300",
                activeTab === tab.id
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-200 dark:shadow-cyan-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'questions' && (
            <>
              {/* Search and Filter */}
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={`cat-${cat}`}
                      onClick={() => setSelectedCategory(cat)}
                      className={clsx(
                        "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
                        selectedCategory === cat
                          ? "bg-cyan-600 text-white"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 w-48 md:w-64"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredQuestions.length} of {shortQuestions.length} questions
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {filteredQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <div
                      onClick={() => toggleAnswer(q.id)}
                      className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-300"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400">
                              {q.category}
                            </span>
                            <span className={clsx(
                              "text-xs px-2 py-0.5 rounded-full",
                              q.difficulty === 'Basic' ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                              q.difficulty === 'Intermediate' ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                              "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                            )}>
                              {q.difficulty}
                            </span>
                          </div>
                          <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            {q.id}. {q.question}
                          </h4>
                        </div>
                        <span className="text-cyan-500 text-sm font-medium flex-shrink-0">
                          {showAnswer === q.id ? '▼' : '▶'}
                        </span>
                      </div>
                    </div>
                    
                    {showAnswer === q.id && (
                      <div className="px-4 pb-4 pt-0 border-t border-gray-100 dark:border-gray-700">
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mt-3 border-l-4 border-green-500">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold text-green-700 dark:text-green-400">Answer:</span> {q.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredQuestions.length === 0 && (
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                  No questions found matching your search. Try different keywords or categories.
                </div>
              )}
            </>
          )}

          {activeTab === 'categories' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Question Categories
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  Browse questions by category. Each category focuses on a specific aspect of the Simplex and Big-M Methods.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.filter(c => c !== 'All').map((category) => {
                    const count = shortQuestions.filter(q => q.category === category).length;
                    return (
                      <div
                        key={`cat-card-${category}`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setActiveTab('questions');
                        }}
                        className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                      >
                        <h4 className="font-semibold text-cyan-700 dark:text-cyan-400">{category}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{count} questions</p>
                        <div className="mt-2 text-xs text-cyan-600 dark:text-cyan-400">
                          Click to view questions →
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick Stats */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{shortQuestions.length}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Total Questions</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {shortQuestions.filter(q => q.difficulty === 'Basic').length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Basic Questions</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {shortQuestions.filter(q => q.difficulty === 'Intermediate').length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Intermediate Questions</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                      {shortQuestions.filter(q => q.difficulty === 'Advanced').length}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Advanced Questions</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'quickref' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Quick Reference: Simplex & Big-M Method
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Simplex Method */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">📊 Simplex Method</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li><span className="font-medium">Used for:</span> All ≤ constraints</li>
                      <li><span className="font-medium">Variables:</span> Slack variables only</li>
                      <li><span className="font-medium">Entering:</span> Most negative Z (max)</li>
                      <li><span className="font-medium">Leaving:</span> Minimum ratio test</li>
                      <li><span className="font-medium">Optimality:</span> All Z ≥ 0 (max)</li>
                    </ul>
                  </div>

                  {/* Big-M Method */}
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3">🔴 Big-M Method</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li><span className="font-medium">Used for:</span> ≥ or = constraints</li>
                      <li><span className="font-medium">Variables:</span> Slack, surplus, artificial</li>
                      <li><span className="font-medium">Penalty:</span> +M (min), -M (max)</li>
                      <li><span className="font-medium">Feasibility:</span> Artificials must be 0</li>
                      <li><span className="font-medium">If artificial > 0:</span> Infeasible</li>
                    </ul>
                  </div>

                  {/* Key Formulas */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">📐 Key Formulas</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 font-mono">
                      <li>Standard Form: Max Z = c₁x + c₂y + 0s</li>
                      <li>Slack: 2x + y ≤ 10 → 2x + y + s = 10</li>
                      <li>Surplus: x + y ≥ 6 → x + y - s = 6</li>
                      <li>Artificial: x + y ≥ 6 → x + y - s + a = 6</li>
                      <li>Big-M Min: Min Z = c₁x + c₂y + M a</li>
                      <li>Big-M Max: Max Z = c₁x + c₂y - M a</li>
                    </ul>
                  </div>

                  {/* Optimality Conditions */}
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-3">✅ Optimality Conditions</h4>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li><span className="font-medium">Maximization:</span> All Z ≥ 0</li>
                      <li><span className="font-medium">Minimization:</span> All Z ≤ 0</li>
                      <li><span className="font-medium">Zero coefficients:</span> Multiple optima</li>
                      <li><span className="font-medium">Negative coefficients:</span> Continue iterations</li>
                      <li><span className="font-medium">Artificial > 0:</span> Infeasible</li>
                    </ul>
                  </div>
                </div>

                {/* Common Mistakes */}
                <div className="mt-6 bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Mistakes to Avoid</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <div>• Using wrong method for constraint types</div>
                    <div>• Forgetting artificial variables in Big-M</div>
                    <div>• Incorrect Big-M penalties</div>
                    <div>• Not checking artificials at optimality</div>
                    <div>• Arithmetic errors in row operations</div>
                    <div>• Confusing max and min optimality conditions</div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="mt-6 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 border-l-4 border-cyan-500">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-2">💡 Quick Tips</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <div>• ≤ constraints → Simplex</div>
                    <div>• ≥ or = → Big-M</div>
                    <div>• Check optimality after each iteration</div>
                    <div>• Artificials must go to zero</div>
                    <div>• Use exact fractions for accuracy</div>
                    <div>• Verify pivot column is identity</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Simplex & Big-M Short Questions FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Short Questions - Simplex & Big-M Method"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic13_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Short questions are an excellent tool for quick revision and self-assessment. I encourage students to use these questions to test their understanding of key concepts in the Simplex and Big-M Methods. The act of recalling and articulating answers strengthens memory and reveals areas needing more study. I recommend going through these questions regularly - a few minutes each day can significantly improve retention and understanding of the material." />
        </div>
      </div>
    </div>
  );
};

export default Topic13;