import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic10_files/topic10_questions';
import noteText from './topic10_files/topic10_note.txt?raw';

const Topic10 = () => {
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
      title: 'Example 1: Big-M with ≥ Constraints',
      problem: 'Solve using Big-M Method:\nMinimize Z = 4x + 3y\nSubject to:\nx + y ≥ 6\n2x + y ≥ 8\nx, y ≥ 0',
      solution: 'Optimal solution: x = 4, y = 2, Z = 22',
      detailedSolution: 'Step 1: Convert to standard form\nMin Z = 4x + 3y → Max Z\' = -4x - 3y\n\nStep 2: Add variables\nx + y - s₁ + a₁ = 6\n2x + y - s₂ + a₂ = 8\n\nStep 3: Objective with Big-M\nMax Z\' = -4x - 3y - M a₁ - M a₂\n\nStep 4: Initial tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ a₁  │ a₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│ a₁  │  1  │  1  │ -1  │  0  │  1  │  0  │  6  │\n│ a₂  │  2  │  1  │  0  │ -1  │  0  │  1  │  8  │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -4  │ -3  │  0  │  0  │  M  │  M  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 5: Iteration 1\nEntering: x (-4)\nLeaving: a₂ (min ratio 8/2=4)\nPivot: 2\n\nAfter pivot:\n┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ a₁  │ a₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│ a₁  │  0  │ 0.5 │ -1  │ 0.5 │  1  │-0.5 │  2  │\n│  x  │  1  │ 0.5 │  0  │-0.5 │  0  │ 0.5 │  4  │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  0  │ -1  │  0  │ -2  │  M  │ M+2 │ 16  │\n└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 6: Iteration 2\nEntering: y (-1)\nLeaving: a₁ (min ratio 2/0.5=4)\nPivot: 0.5\n\nAfter pivot:\n┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ a₁  │ a₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  y  │  0  │  1  │ -2  │  1  │  2  │ -1  │  4  │\n│  x  │  1  │  0  │  1  │ -1  │ -1  │  1  │  2  │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  0  │  0  │ -2  │ -1  │ M+2 │ M+1 │ 20  │\n└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 7: Iteration 3\nEntering: s₁ (-2)\nLeaving: x (min ratio 2/1=2)\nPivot: 1\n\nAfter pivot:\n┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ a₁  │ a₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  y  │  2  │  1  │  0  │ -1  │  0  │  1  │  8  │\n│ s₁  │  1  │  0  │  1  │ -1  │ -1  │  1  │  2  │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  2  │  0  │  0  │ -3  │  M  │ M+3 │ 24  │\n└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 8: Continue until all artificial variables leave\nFinal optimal: x = 4, y = 2, Z = 22'
    },
    {
      id: 2,
      title: 'Example 2: Big-M with Equality Constraint',
      problem: 'Solve using Big-M Method:\nMinimize Z = 3x + 2y\nSubject to:\nx + y = 6\n2x + y ≥ 8\nx, y ≥ 0',
      solution: 'Optimal solution: x = 2, y = 4, Z = 14',
      detailedSolution: 'Step 1: Convert to standard form\nMin Z = 3x + 2y → Max Z\' = -3x - 2y\n\nStep 2: Add variables\nx + y + a₁ = 6 (equality → artificial)\n2x + y - s₂ + a₂ = 8 (≥ → surplus + artificial)\n\nStep 3: Objective with Big-M\nMax Z\' = -3x - 2y - M a₁ - M a₂\n\nStep 4: Initial tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₂  │ a₁  │ a₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│ a₁  │  1  │  1  │  0  │  1  │  0  │  6  │\n│ a₂  │  2  │  1  │ -1  │  0  │  1  │  8  │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -3  │ -2  │  0  │  M  │  M  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 5: Iteration 1\nEntering: x (-3)\nLeaving: a₂ (min ratio 8/2=4)\nPivot: 2\n\nAfter iterations:\nFinal optimal: x = 2, y = 4, Z = 14'
    },
    {
      id: 3,
      title: 'Example 3: Big-M Infeasibility Detection',
      problem: 'Solve using Big-M Method:\nMinimize Z = 2x + 3y\nSubject to:\nx + y ≥ 10\nx + y ≤ 6\nx, y ≥ 0',
      solution: 'The problem is infeasible. Artificial variable remains in basis.',
      detailedSolution: 'Step 1: Convert to standard form\nMin Z = 2x + 3y → Max Z\' = -2x - 3y\n\nStep 2: Add variables\nx + y - s₁ + a₁ = 10\nx + y + s₂ = 6\n\nStep 3: Objective with Big-M\nMax Z\' = -2x - 3y - M a₁\n\nStep 4: Initial tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ a₁  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│ a₁  │  1  │  1  │ -1  │  0  │  1  │ 10  │\n│ s₂  │  1  │  1  │  0  │  1  │  0  │  6  │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -2  │ -3  │  0  │  0  │  M  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 5: Observe\nConstraints x + y ≥ 10 and x + y ≤ 6 are contradictory\nNo feasible solution exists\nArtificial variable a₁ will remain in basis\n\nConclusion: INFEASIBLE'
    },
    {
      id: 4,
      title: 'Example 4: Real-World Big-M Application',
      problem: 'A company must meet minimum production targets:\nMinimize Z = 8x + 10y (Cost)\nSubject to:\n3x + 2y ≥ 30 (Production target)\n2x + 5y = 40 (Quality target)\nx, y ≥ 0\n\nSolve using Big-M Method.',
      solution: 'Optimal solution: x = 10, y = 4, Z = 120',
      detailedSolution: 'Step 1: Convert to standard form\nMin Z = 8x + 10y → Max Z\' = -8x - 10y\n\nStep 2: Add variables\n3x + 2y - s₁ + a₁ = 30\n2x + 5y + a₂ = 40\n\nStep 3: Objective with Big-M\nMax Z\' = -8x - 10y - M a₁ - M a₂\n\nStep 4: Initial tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ a₁  │ a₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│ a₁  │  3  │  2  │ -1  │  1  │  0  │ 30  │\n│ a₂  │  2  │  5  │  0  │  0  │  1  │ 40  │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -8  │ -10 │  0  │  M  │  M  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 5: Iteration 1\nEntering: y (-10)\nLeaving: a₂ (min ratio 40/5=8)\nPivot: 5\n\nAfter iterations:\nFinal optimal: x = 10, y = 4, Z = 120'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Big-M with ≥ Constraints',
      problem: 'Solve using Big-M Method:\nMinimize Z = 5x + 4y\nSubject to:\nx + 2y ≥ 10\n3x + y ≥ 12\nx, y ≥ 0',
      hint: 'Add surplus and artificial variables for each ≥ constraint.',
      solution: 'Optimal: x = 2, y = 4, Z = 26'
    },
    {
      id: 2,
      title: 'Big-M with Equality',
      problem: 'Solve using Big-M Method:\nMinimize Z = 2x + 3y\nSubject to:\n2x + y = 8\nx + 2y ≥ 6\nx, y ≥ 0',
      hint: 'Use artificial variable for equality, surplus+artificial for ≥.',
      solution: 'Optimal: x = 3, y = 2, Z = 12'
    },
    {
      id: 3,
      title: 'Detect Infeasibility',
      problem: 'Use Big-M Method to check feasibility:\nMinimize Z = x + y\nSubject to:\nx + y ≥ 8\nx + y ≤ 5\nx, y ≥ 0',
      hint: 'Check if artificial variable remains in basis after iterations.',
      solution: 'Infeasible - constraints are contradictory'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Big-M Simulator
  const BigMSimulator = () => {
    const [mValue, setMValue] = useState(1000);
    const [artificialCount, setArtificialCount] = useState(2);
    const [iteration, setIteration] = useState(0);
    const [isInfeasible, setIsInfeasible] = useState(false);

    const resetSimulator = () => {
      setIteration(0);
      setIsInfeasible(false);
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Big-M Method Simulator
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">M Value (Penalty)</label>
              <input
                type="range"
                min="10"
                max="10000"
                value={mValue}
                onChange={(e) => setMValue(Number(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">M = {mValue}</span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Artificial Variables</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setArtificialCount(1)}
                  className={clsx(
                    "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300",
                    artificialCount === 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                >
                  1
                </button>
                <button
                  onClick={() => setArtificialCount(2)}
                  className={clsx(
                    "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300",
                    artificialCount === 2
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                >
                  2
                </button>
                <button
                  onClick={() => setArtificialCount(3)}
                  className={clsx(
                    "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300",
                    artificialCount === 3
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                >
                  3
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIteration(iteration + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
              >
                Next Iteration
              </button>
              <button
                onClick={resetSimulator}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
              <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Big-M Method Status</h5>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Iteration:</span> {iteration}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Artificial Variables:</span> {artificialCount}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">M Value:</span> {mValue}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Status:</span> {isInfeasible ? '❌ Infeasible' : '🔄 In Progress'}
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
              <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Key Concepts</h5>
              <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300 space-y-1">
                <li>M is a very large penalty</li>
                <li>Artificial variables must go to 0</li>
                <li>If artificial remains → infeasible</li>
                <li>M must be larger than any coefficient</li>
              </ul>
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Big-M Method
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to handle ≥ and = constraints using artificial variables with a large 
            penalty M in the Big-M Method.
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
                  ? "bg-red-600 text-white shadow-lg shadow-red-200 dark:shadow-red-900/30"
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
              {/* What is the Big-M Method? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is the Big-M Method?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  The Big-M Method is a variant of the Simplex Method used to solve LP problems 
                  with ≥ and = constraints. It introduces artificial variables to create an initial 
                  basic feasible solution and penalizes them with a very large number M in the 
                  objective function. The artificial variables are driven to zero in the optimal 
                  solution if the problem is feasible.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Concepts</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Artificial variables for ≥ and = constraints</li>
                      <li>Large penalty M in objective</li>
                      <li>M must be very large</li>
                      <li>Artificials driven to zero</li>
                      <li>If artificial remains → infeasible</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why It Matters</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Handles any LP problem</li>
                      <li>Detects infeasibility</li>
                      <li>Foundation for other methods</li>
                      <li>Widely used in practice</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Big-M Rules */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Big-M Method Rules
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg">
                    <div className="text-4xl mb-2">📝</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Rule 1</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Add artificial variable to ≥ and = constraints</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg">
                    <div className="text-4xl mb-2">💰</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Rule 2</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Penalize with M in objective (add for min, subtract for max)</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg">
                    <div className="text-4xl mb-2">✅</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Rule 3</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Drive artificial variables to zero</p>
                  </div>
                </div>
              </div>

              {/* Interactive Big-M Simulator */}
              <BigMSimulator />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Big-M Method
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Choose M much larger than any coefficient</li>
                      <li>Watch for artificial variables leaving basis</li>
                      <li>If artificial remains &gt; 0 → infeasible</li>
                      <li>Use Big-M only when necessary</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Using too small M value</li>
                      <li>Forgetting to penalize artificials</li>
                      <li>Not checking if artificials remain</li>
                      <li>Confusing max and min penalties</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">≥ and = constraints identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Artificial variables added</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Big-M penalty in objective</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">M is sufficiently large</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Artificial variables driven to zero</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Feasibility confirmed</span>
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
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300"
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
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                  💡 Tips for Big-M Method
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">M must be large:</span> Choose M &gt; any coefficient</li>
                  <li><span className="font-medium">Artificials must go to zero:</span> If not, infeasible</li>
                  <li><span className="font-medium">Check signs:</span> Add M for min, subtract M for max</li>
                  <li><span className="font-medium">Watch for artificials:</span> They should leave the basis</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Big-M Method FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Big-M Method"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic10_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The Big-M Method is a powerful tool for handling any LP problem. I tell my students that M is like a 'bouncer' - it keeps artificial variables out of the optimal solution. The key is choosing M large enough that it dominates all other coefficients. If an artificial variable remains positive at the end, the problem is infeasible. This is an important diagnostic tool that students should always check." />
        </div>
      </div>
    </div>
  );
};

export default Topic10;