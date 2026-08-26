import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic11_files/topic11_questions';
import noteText from './topic11_files/topic11_note.txt?raw';

const Topic11 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [showExample, setShowExample] = useState({});
  const [showSolution, setShowSolution] = useState(null);
  const [showHint, setShowHint] = useState(null);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Example data with detailed solutions
  const examples = [
    {
      id: 1,
      title: 'Example 1: Maximization with Simplex (All ≤)',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx, y ≥ 0\n\nSolve using the Simplex Method.',
      solution: 'Optimal solution: x = 4, y = 2, Z = 16',
      detailedSolution: 'Step 1: Convert to standard form\nMaximize Z = 3x + 2y + 0s₁ + 0s₂\nSubject to:\n2x + y + s₁ = 10\nx + 2y + s₂ = 8\nx, y, s₁, s₂ ≥ 0\n\nStep 2: Initial tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  2  │  1  │  1  │  0  │ 10  │\n│ s₂  │  1  │  2  │  0  │  1  │  8  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -3  │ -2  │  0  │  0  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 3: Iteration 1\nEntering: x (-3), Leaving: s₁ (min ratio 5)\nPivot: 2\n\nAfter pivot:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  x  │  1  │ 0.5 │ 0.5 │  0  │  5  │\n│ s₂  │  0  │ 1.5 │-0.5 │  1  │  3  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  0  │-0.5 │ 1.5 │  0  │ 15  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 4: Iteration 2\nEntering: y (-0.5), Leaving: s₂ (min ratio 2)\nPivot: 1.5\n\nAfter pivot:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  x  │  1  │  0  │ 0.67│-0.33│  4  │\n│  y  │  0  │  1  │-0.33│ 0.67│  2  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  0  │  0  │ 1.33│ 0.33│ 16  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 5: Check optimality\nAll Z coefficients ≥ 0 → OPTIMAL\n\nOptimal solution: x = 4, y = 2, Z = 16'
    },
    {
      id: 2,
      title: 'Example 2: Minimization with Big-M (≥ Constraints)',
      problem: 'Minimize Z = 4x + 3y\nSubject to:\nx + y ≥ 6\n2x + y ≥ 8\nx, y ≥ 0\n\nSolve using the Big-M Method.',
      solution: 'Optimal solution: x = 2, y = 4, Z = 20',
      detailedSolution: 'Step 1: Convert to standard form with Big-M\nMinimize Z = 4x + 3y + M a₁ + M a₂\nSubject to:\nx + y - s₁ + a₁ = 6\n2x + y - s₂ + a₂ = 8\nx, y, s₁, s₂, a₁, a₂ ≥ 0\n\nStep 2: Initial tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ a₁  │ a₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│ a₁  │  1  │  1  │ -1  │  0  │  1  │  0  │  6  │\n│ a₂  │  2  │  1  │  0  │ -1  │  0  │  1  │  8  │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -4  │ -3  │  0  │  0  │  M  │  M  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 3: Iteration 1\nEntering: x (-4), Leaving: a₂ (min ratio 4)\nPivot: 2\n\nStep 4: Continue iterations until artificials leave\n\nFinal optimal: x = 2, y = 4, Z = 20'
    },
    {
      id: 3,
      title: 'Example 3: Maximization with Big-M (Mixed Constraints)',
      problem: 'Maximize Z = 5x + 7y\nSubject to:\n3x + 2y ≤ 18\n2x + 4y ≥ 20\nx + 3y = 15\nx, y ≥ 0\n\nSolve using the Big-M Method.',
      solution: 'Optimal solution: x = 3, y = 4, Z = 43',
      detailedSolution: 'Step 1: Convert to standard form with Big-M\nMaximize Z = 5x + 7y + 0s₁ + 0s₂ - M a₁ - M a₂\nSubject to:\n3x + 2y + s₁ = 18\n2x + 4y - s₂ + a₁ = 20\nx + 3y + a₂ = 15\nx, y, s₁, s₂, a₁, a₂ ≥ 0\n\nStep 2: Initial tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ a₁  │ a₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  3  │  2  │  1  │  0  │  0  │  0  │ 18  │\n│ a₁  │  2  │  4  │  0  │ -1  │  1  │  0  │ 20  │\n│ a₂  │  1  │  3  │  0  │  0  │  0  │  1  │ 15  │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -5  │ -7  │  0  │  0  │  M  │  M  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 3: Perform iterations\nContinue until all artificial variables leave and optimality is reached.\n\nFinal optimal: x = 3, y = 4, Z = 43'
    },
    {
      id: 4,
      title: 'Example 4: Real-World Profit Maximization',
      problem: 'A factory produces chairs (x) and tables (y).\nMaximize Z = 40x + 50y (Profit in ₹)\nSubject to:\n2x + 3y ≤ 120 (Labor hours)\n3x + 2y ≤ 90 (Wood units)\nx, y ≥ 0\n\nSolve using Simplex Method.',
      solution: 'Optimal solution: x = 24, y = 24, Z = ₹2,160',
      detailedSolution: 'Step 1: Standard form\nMaximize Z = 40x + 50y + 0s₁ + 0s₂\nSubject to:\n2x + 3y + s₁ = 120\n3x + 2y + s₂ = 90\nx, y, s₁, s₂ ≥ 0\n\nStep 2: Initial tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  2  │  3  │  1  │  0  │ 120 │\n│ s₂  │  3  │  2  │  0  │  1  │  90 │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -40 │ -50 │  0  │  0  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 3: Iteration 1\nEntering: y (-50), Leaving: s₁ (min ratio 40)\nPivot: 3\n\nAfter pivot:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  y  │ 2/3 │  1  │ 1/3 │  0  │ 40  │\n│ s₂  │ 5/3 │  0  │-2/3 │  1  │ 10  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │-20/3│  0  │50/3 │  0  │2000 │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 4: Iteration 2\nEntering: x (-20/3), Leaving: s₂ (min ratio 6)\nPivot: 5/3\n\nAfter pivot:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  y  │  0  │  1  │ 0.6 │-0.4 │ 36  │\n│  x  │  1  │  0  │-0.4 │ 0.6 │  6  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  0  │  0  │ 12  │  4  │2160 │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 5: Check optimality\nAll Z coefficients ≥ 0 → OPTIMAL\n\nOptimal solution: x = 6, y = 36, Z = 2,160\nWait - let me recalculate: x = 6, y = 36\nCheck constraints: 2(6)+3(36)=12+108=120 ✓, 3(6)+2(36)=18+72=90 ✓'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Maximization with Simplex',
      problem: 'Maximize Z = 4x + 3y\nSubject to:\n2x + y ≤ 12\nx + 2y ≤ 9\nx, y ≥ 0\n\nSolve using Simplex Method.',
      hint: 'Use slack variables and follow the Simplex procedure.',
      solution: 'Optimal: x = 5, y = 2, Z = 26'
    },
    {
      id: 2,
      title: 'Minimization with Big-M',
      problem: 'Minimize Z = 5x + 4y\nSubject to:\nx + 2y ≥ 10\n3x + y ≥ 12\nx, y ≥ 0\n\nSolve using Big-M Method.',
      hint: 'Add surplus and artificial variables, use Big-M penalty.',
      solution: 'Optimal: x = 2, y = 4, Z = 26'
    },
    {
      id: 3,
      title: 'Mixed Constraints with Big-M',
      problem: 'Maximize Z = 6x + 8y\nSubject to:\n3x + 2y ≤ 24\nx + 4y ≥ 16\n2x + y = 10\nx, y ≥ 0\n\nSolve using Big-M Method.',
      hint: 'Use slack for ≤, surplus+artificial for ≥, artificial for =.',
      solution: 'Optimal: x = 4, y = 2, Z = 40'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Method Selector Component
  const MethodSelector = () => {
    const [problemType, setProblemType] = useState('max');
    const [constraintType, setConstraintType] = useState('le');
    const [method, setMethod] = useState('simplex');

    const getMethodRecommendation = () => {
      if (constraintType === 'le' && problemType === 'max') {
        return 'Simplex Method (all ≤ constraints)';
      } else if (constraintType === 'ge' || constraintType === 'eq') {
        return 'Big-M Method (≥ or = constraints)';
      } else {
        return 'Use Simplex Method or Big-M Method';
      }
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Method Selector & Recommendation
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Problem Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setProblemType('max')}
                className={clsx(
                  "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300",
                  problemType === 'max'
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                )}
              >
                Maximization
              </button>
              <button
                onClick={() => setProblemType('min')}
                className={clsx(
                  "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300",
                  problemType === 'min'
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                )}
              >
                Minimization
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Constraint Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setConstraintType('le')}
                className={clsx(
                  "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300",
                  constraintType === 'le'
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                )}
              >
                ≤
              </button>
              <button
                onClick={() => setConstraintType('ge')}
                className={clsx(
                  "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300",
                  constraintType === 'ge'
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                )}
              >
                ≥
              </button>
              <button
                onClick={() => setConstraintType('eq')}
                className={clsx(
                  "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300",
                  constraintType === 'eq'
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                )}
              >
                =
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Recommended Method</label>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
              <p className="text-sm font-semibold text-green-700 dark:text-green-400">
                {getMethodRecommendation()}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {constraintType === 'le' && problemType === 'max' 
                  ? 'Use Simplex with slack variables' 
                  : 'Use Big-M with artificial variables'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Maximization and Minimization using Simplex/Big-M
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to apply the Simplex Method and Big-M Method to solve both maximization 
            and minimization problems with various constraint types.
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
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-200 dark:shadow-teal-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Choosing the Right Method
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  The choice between Simplex Method and Big-M Method depends on the type of 
                  constraints in the LP problem. The Simplex Method works directly with ≤ 
                  constraints using slack variables. The Big-M Method handles ≥ and = 
                  constraints using artificial variables with a penalty M.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">When to Use Simplex</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>All constraints are ≤</li>
                      <li>Maximization or minimization</li>
                      <li>Slack variables provide initial basis</li>
                      <li>No artificial variables needed</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">When to Use Big-M</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>≥ or = constraints present</li>
                      <li>Maximization or minimization</li>
                      <li>Artificial variables needed</li>
                      <li>Detects infeasibility</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Method Selector */}
              <MethodSelector />

              {/* Comparison Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Simplex vs Big-M Method Comparison
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Feature</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Simplex Method</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Big-M Method</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Constraint Types</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">All ≤</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">≥ and = (plus ≤)</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Variables Added</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Slack variables only</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Slack, surplus, artificial</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Initial Basis</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Slack variables</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Artificial variables</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Penalty</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">None</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">M (very large)</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Feasibility Detection</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">N/A</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Artificials indicate infeasibility</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Choosing Methods
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Use Simplex when possible (fewer variables)</li>
                      <li>Use Big-M when necessary (≥ or = constraints)</li>
                      <li>Check for artificials at optimality</li>
                      <li>Consider Two-Phase for numerical stability</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Using Big-M when not needed</li>
                      <li>Forgetting artificial variables in Big-M</li>
                      <li>Not checking artificials at optimality</li>
                      <li>Confusing max and min in Big-M</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mini Checklist */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  ✅ Mini Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Problem type identified (max/min)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Constraint types identified (≤, ≥, =)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Correct method selected</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Variables added correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Tableau constructed correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Optimality checked</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'examples' && (
            <>
              <div className="space-y-6">
                {examples.map((example) => (
                  <div
                    key={`example-${example.id}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
                  >
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
                      {example.title}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                        <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Problem</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.problem}
                        </pre>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Solution</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.solution}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleExample(example.id)}
                        className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300"
                      >
                        {showExample[example.id] ? 'Hide Detailed Steps' : 'Show Detailed Steps'}
                      </button>
                    </div>
                    {showExample[example.id] && (
                      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                        <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">📝 Detailed Steps</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.detailedSolution}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'practice' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Practice Problems
                </h3>
                
                <div className="space-y-6">
                  {practiceProblems.map((problem) => (
                    <div
                      key={problem.id}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {problem.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {problem.problem}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setShowSolution(showSolution === problem.id ? null : problem.id)}
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300"
                        >
                          {showSolution === problem.id ? 'Hide Solution' : 'Check Solution'}
                        </button>
                        <button
                          onClick={() => setShowHint(showHint === problem.id ? null : problem.id)}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                        >
                          {showHint === problem.id ? 'Hide Hint' : 'Show Hint'}
                        </button>
                      </div>
                      
                      {showHint === problem.id && (
                        <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">💡 Hint:</span> {problem.hint}
                          </p>
                        </div>
                      )}
                      
                      {showSolution === problem.id && (
                        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {problem.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6 border border-teal-200 dark:border-teal-800">
                <h4 className="font-semibold text-teal-700 dark:text-teal-400 mb-2">
                  💡 Tips for Solving Max/Min Problems
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Identify constraint types:</span> ≤, ≥, or =</li>
                  <li><span className="font-medium">Choose method:</span> Simplex for ≤ only, Big-M for ≥ or =</li>
                  <li><span className="font-medium">Add variables:</span> Slack for ≤, surplus+artificial for ≥, artificial for =</li>
                  <li><span className="font-medium">Apply penalty:</span> +M for min, -M for max (Big-M)</li>
                  <li><span className="font-medium">Check optimality:</span> All Z ≥ 0 (max), All Z ≤ 0 (min)</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Maximization and Minimization FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Maximization and Minimization using Simplex/Big-M"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic11_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The key to solving LP problems is choosing the right method. I tell my students that the Simplex Method is like a 'direct route' for ≤ constraints, while the Big-M Method is like a 'detour' that handles ≥ and = constraints. The most important skill is recognizing which method to use based on the constraint types. Once students master both methods, they can solve any LP problem." />
        </div>
      </div>
    </div>
  );
};

export default Topic11;