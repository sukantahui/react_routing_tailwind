import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic12_files/topic12_questions';
import noteText from './topic12_files/topic12_note.txt?raw';

const Topic12 = () => {
  const [activeTab, setActiveTab] = useState('problems');
  const [selectedProblem, setSelectedProblem] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const tabs = [
    { id: 'problems', label: 'Problems' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'formulas', label: 'Formula Reference' },
  ];

  // Numerical problems data
  const numericalProblems = [
    {
      id: 1,
      title: 'Problem 1: Maximization with Simplex',
      difficulty: 'Basic',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx, y ≥ 0\n\nSolve using the Simplex Method.',
      hint: 'Add slack variables, form tableau, and perform iterations until optimality.',
      steps: [
        'Step 1: Convert to standard form with slack variables s₁ and s₂',
        'Step 2: Initial tableau: B | x | y | s₁ | s₂ | RHS',
        'Step 3: Entering variable: x (most negative: -3)',
        'Step 4: Leaving variable: s₁ (min ratio: 10/2=5)',
        'Step 5: Pivot element: 2 (row s₁, col x)',
        'Step 6: After pivot, new tableau with x basic',
        'Step 7: Next iteration: y enters, s₂ leaves',
        'Step 8: Optimal tableau: all Z ≥ 0'
      ],
      solution: 'Optimal solution: x = 4, y = 2, Z = 16'
    },
    {
      id: 2,
      title: 'Problem 2: Minimization with Big-M',
      difficulty: 'Intermediate',
      problem: 'Minimize Z = 4x + 3y\nSubject to:\nx + y ≥ 6\n2x + y ≥ 8\nx, y ≥ 0\n\nSolve using the Big-M Method.',
      hint: 'Convert to maximization, add surplus and artificial variables, use Big-M penalty.',
      steps: [
        'Step 1: Convert to maximization: Max Z\' = -4x - 3y',
        'Step 2: Add surplus and artificial variables',
        'Step 3: Objective: Max Z\' = -4x - 3y - M a₁ - M a₂',
        'Step 4: Initial tableau with artificial variables as basic',
        'Step 5: Perform iterations to drive artificials to zero',
        'Step 6: Check optimality when all Z ≥ 0'
      ],
      solution: 'Optimal solution: x = 2, y = 4, Z = 20'
    },
    {
      id: 3,
      title: 'Problem 3: Maximization with Mixed Constraints',
      difficulty: 'Advanced',
      problem: 'Maximize Z = 5x + 7y\nSubject to:\n3x + 2y ≤ 18\n2x + 4y ≥ 20\nx + 3y = 15\nx, y ≥ 0\n\nSolve using the Big-M Method.',
      hint: 'Use slack for ≤, surplus+artificial for ≥, artificial for =. Apply Big-M penalties.',
      steps: [
        'Step 1: Add slack s₁, surplus s₂, artificial a₁, a₂',
        'Step 2: Objective: Max Z = 5x + 7y + 0s₁ + 0s₂ - M a₁ - M a₂',
        'Step 3: Initial tableau with s₁, a₁, a₂ as basic',
        'Step 4: Perform iterations to eliminate artificial variables',
        'Step 5: Continue until optimality (all Z ≥ 0)'
      ],
      solution: 'Optimal solution: x = 3, y = 4, Z = 43'
    },
    {
      id: 4,
      title: 'Problem 4: Real-World Production Planning',
      difficulty: 'Intermediate',
      problem: 'A factory produces two products. Profit: Product A = ₹40, Product B = ₹50.\nResources:\nLabor: 2x + 3y ≤ 120 hours\nMaterial: 3x + 2y ≤ 90 units\nx, y ≥ 0\n\nFind the optimal production mix using Simplex Method.',
      hint: 'This is a maximization problem with all ≤ constraints. Use Simplex Method.',
      steps: [
        'Step 1: Add slack variables s₁ and s₂',
        'Step 2: Objective: Max Z = 40x + 50y + 0s₁ + 0s₂',
        'Step 3: Initial tableau',
        'Step 4: Perform Simplex iterations',
        'Step 5: Stop when all Z ≥ 0'
      ],
      solution: 'Optimal: x = 6, y = 36, Z = ₹2,160'
    },
    {
      id: 5,
      title: 'Problem 5: Diet Planning with Big-M',
      difficulty: 'Intermediate',
      problem: 'Minimize cost of a diet:\nMinimize Z = 20x + 30y\nSubject to:\n4x + 3y ≥ 24 (Protein)\n3x + 5y ≥ 18 (Carbs)\nx, y ≥ 0\n\nSolve using Big-M Method.',
      hint: 'Convert to maximization, add surplus and artificial variables.',
      steps: [
        'Step 1: Convert to maximization: Max Z\' = -20x - 30y',
        'Step 2: Add surplus and artificial variables',
        'Step 3: Objective: Max Z\' = -20x - 30y - M a₁ - M a₂',
        'Step 4: Initial tableau with artificial variables',
        'Step 5: Perform iterations to find optimal'
      ],
      solution: 'Optimal: x = 6, y = 0, Z = 120'
    },
    {
      id: 6,
      title: 'Problem 6: Transportation Problem',
      difficulty: 'Advanced',
      problem: 'Minimize cost:\nMinimize Z = 8x + 10y\nSubject to:\n3x + 2y ≥ 30\n2x + 5y = 40\nx, y ≥ 0\n\nSolve using Big-M Method.',
      hint: 'Use artificial variable for equality constraint and surplus+artificial for ≥.',
      steps: [
        'Step 1: Convert to maximization: Max Z\' = -8x - 10y',
        'Step 2: Add surplus s₁, artificial a₁, a₂',
        'Step 3: Objective: Max Z\' = -8x - 10y - M a₁ - M a₂',
        'Step 4: Initial tableau with artificial variables',
        'Step 5: Perform iterations until artificials leave'
      ],
      solution: 'Optimal: x = 10, y = 4, Z = 120'
    }
  ];

  // Formula reference data
  const formulaReference = {
    sections: [
      {
        title: 'Simplex Method',
        formulas: [
          { name: 'Standard Form', formula: 'Max Z = c₁x + c₂y + 0s₁ + 0s₂' },
          { name: 'Entering Variable', formula: 'Most negative Z coefficient (max)' },
          { name: 'Leaving Variable', formula: 'Min ratio: RHS / coefficient' },
          { name: 'Pivot Operation', formula: 'Row = Row ÷ pivot' },
          { name: 'Optimality Condition', formula: 'All Z coefficients ≥ 0 (max)' }
        ]
      },
      {
        title: 'Big-M Method',
        formulas: [
          { name: 'Surplus Variable', formula: 'a₁x + a₂y - s = b (s ≥ 0)' },
          { name: 'Artificial Variable', formula: 'a₁x + a₂y + a = b (a ≥ 0)' },
          { name: 'Big-M Penalty (Min)', formula: 'Min Z = c₁x + c₂y + M a' },
          { name: 'Big-M Penalty (Max)', formula: 'Max Z = c₁x + c₂y - M a' },
          { name: 'Feasibility Check', formula: 'If a &gt; 0 at optimal → infeasible' }
        ]
      },
      {
        title: 'Tableau Structure',
        formulas: [
          { name: 'Basic Variables', formula: 'B = [slack, artificial]' },
          { name: 'Z Row', formula: 'Z - c₁x - c₂y - ... = 0' },
          { name: 'RHS', formula: 'Right-hand side values' }
        ]
      },
      {
        title: 'Optimality Conditions',
        formulas: [
          { name: 'Maximization', formula: 'All Z coefficients ≥ 0' },
          { name: 'Minimization', formula: 'All Z coefficients ≤ 0' }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Numerical Problems
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Practice your Simplex and Big-M skills with these numerical problems. Each problem 
            includes detailed step-by-step solutions to help you learn and verify your work.
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
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            &gt;
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'problems' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {numericalProblems.map((problem) => (
                  <div
                    key={`prob-${problem.id}`}
                    onClick={() => {
                      setSelectedProblem(problem.id - 1);
                      setShowSolution(false);
                      setShowHint(false);
                      setCurrentStep(0);
                    }}
                    className={clsx(
                      "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                      selectedProblem === problem.id - 1 ? "border-2 border-indigo-500" : ""
                    )}
                  &gt;
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        {problem.title}
                      </h4>
                      <span className={clsx(
                        "text-xs px-2 py-1 rounded-full",
                        problem.difficulty === 'Basic' ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                        problem.difficulty === 'Intermediate' ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                        "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                      )}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap line-clamp-3">
                      {problem.problem}
                    </pre>
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded">
                        {problem.steps.length} steps
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Problem Detail */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  {numericalProblems[selectedProblem]?.title}
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Problem</h4>
                    <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {numericalProblems[selectedProblem]?.problem}
                    </pre>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Steps</h4>
                    <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {numericalProblems[selectedProblem]?.steps.map((step, idx) => (
                        <li key={`step-${idx}`}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowHint(!showHint);
                        if (showSolution) setShowSolution(false);
                      }}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300"
                    &gt;
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </button>
                    <button
                      onClick={() => {
                        setShowSolution(!showSolution);
                        if (showHint) setShowHint(false);
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
                    &gt;
                      {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </button>
                  </div>

                  {showHint && numericalProblems[selectedProblem]?.hint && (
                    <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">💡 Hint:</span> {numericalProblems[selectedProblem].hint}
                      </p>
                    </div>
                  )}

                  {showSolution && numericalProblems[selectedProblem]?.solution && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Solution</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                        {numericalProblems[selectedProblem].solution}
                      </p>
                      <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-semibold">💡 Key Insight:</span> 
                          {selectedProblem === 0 && ' The optimal solution balances the two constraints.'}
                          {selectedProblem === 1 && ' Big-M method successfully drove artificial variables to zero.'}
                          {selectedProblem === 2 && ' Mixed constraints require careful handling of different variable types.'}
                          {selectedProblem === 3 && ' Labor is the binding constraint in this production problem.'}
                          {selectedProblem === 4 && ' Protein requirement is exactly met at the optimal solution.'}
                          {selectedProblem === 5 && ' Equality constraints require artificial variables in Big-M.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'solutions' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Complete Solutions
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  Select a problem above to view its complete step-by-step solution.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {numericalProblems.map((problem) => (
                    <div
                      key={`sol-${problem.id}`}
                      onClick={() => {
                        setSelectedProblem(problem.id - 1);
                        setActiveTab('problems');
                        setShowSolution(true);
                        setShowHint(false);
                      }}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    &gt;
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {problem.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {problem.difficulty} • {problem.steps.length} steps
                      </p>
                      <div className="mt-2 text-xs text-indigo-600 dark:text-indigo-400">
                        Click to view solution
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'formulas' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Formula Reference
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  Quick reference for all formulas needed in Simplex and Big-M Methods.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formulaReference.sections.map((section, idx) => (
                    <div key={`section-${idx}`} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
                        {section.title}
                      </h4>
                      <div className="space-y-2">
                        {section.formulas.map((formula, fIdx) => (
                          <div key={`formula-${fIdx}`} className="border-b border-gray-200 dark:border-gray-600 last:border-0 pb-2 last:pb-0">
                            <p className="text-xs text-gray-500 dark:text-gray-400">{formula.name}</p>
                            <p className="text-sm font-mono text-gray-800 dark:text-gray-200">{formula.formula}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Reference Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Quick Problem-Solving Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Simplex Method</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Add slack variables for ≤</li>
                      <li>Form initial tableau</li>
                      <li>Find entering variable (most negative Z)</li>
                      <li>Find leaving variable (ratio test)</li>
                      <li>Perform pivot operation</li>
                      <li>Check optimality (all Z ≥ 0)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Big-M Method</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Add surplus for ≥</li>
                      <li>Add artificial for ≥ and =</li>
                      <li>Apply Big-M penalty</li>
                      <li>Form initial tableau</li>
                      <li>Perform iterations</li>
                      <li>Check artificials are zero</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Numerical Problems FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Numerical Problems - Simplex and Big-M"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic12_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Numerical problems are the best way to build proficiency in the Simplex and Big-M Methods. I tell my students that each problem is like a puzzle - you need to follow the steps carefully and check your work at each stage. The key is to be systematic: identify the problem type, choose the right method, add variables correctly, and perform the iterations with precision. Practice makes perfect, and with enough practice, these methods become second nature." />
        </div>
      </div>
    </div>
  );
};

export default Topic12;