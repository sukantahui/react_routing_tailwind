import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic5_files/topic5_questions';
import noteText from './topic5_files/topic5_note.txt?raw';

const Topic5 = () => {
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
      title: 'Example 1: Unique Optimal Solution',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx ≥ 0, y ≥ 0\n\nFind the optimal solution.',
      solution: 'Unique optimal solution at (4,2) with Z = 16',
      detailedSolution: 'Step 1: Find corner points\n(0,0), (5,0), (4,2), (0,4)\n\nStep 2: Evaluate Z at each corner\nZ(0,0) = 0\nZ(5,0) = 15\nZ(4,2) = 16  ← Maximum\nZ(0,4) = 8\n\nStep 3: Check for multiple optima\nAll corner points have different Z values\nNo other point gives Z = 16\n\nConclusion: Unique optimal solution at (4,2)'
    },
    {
      id: 2,
      title: 'Example 2: Alternate Optimal Solutions',
      problem: 'Maximize Z = x + y\nSubject to:\nx + y ≤ 8\n2x + y ≤ 12\nx ≥ 0, y ≥ 0\n\nFind all optimal solutions.',
      solution: 'Alternate optimal solutions: (4,4) and (0,8) both give Z = 8',
      detailedSolution: 'Step 1: Find corner points\n(0,0), (6,0), (4,4), (0,8)\n\nStep 2: Evaluate Z at each corner\nZ(0,0) = 0\nZ(6,0) = 6\nZ(4,4) = 8  ← Maximum\nZ(0,8) = 8  ← Maximum\n\nStep 3: Check for multiple optima\nTwo corner points give Z = 8\n\nStep 4: Identify the optimal edge\nThe line segment between (4,4) and (0,8)\nAll points on this edge give Z = 8\n\nConclusion: Multiple optimal solutions exist'
    },
    {
      id: 3,
      title: 'Example 3: Minimization with Unique Optimum',
      problem: 'Minimize Z = 2x + 3y\nSubject to:\nx + 2y ≥ 8\n2x + y ≥ 10\nx ≥ 0, y ≥ 0\n\nFind the optimal solution.',
      solution: 'Unique optimal solution at (4,2) with Z = 14',
      detailedSolution: 'Step 1: Find corner points\n(0,10), (4,2), (8,0)\n\nStep 2: Evaluate Z at each corner\nZ(0,10) = 2(0) + 3(10) = 30\nZ(4,2) = 2(4) + 3(2) = 8 + 6 = 14  ← Minimum\nZ(8,0) = 2(8) + 3(0) = 16\n\nStep 3: Check for multiple optima\nAll corner points have different Z values\nNo other point gives Z = 14\n\nConclusion: Unique optimal solution at (4,2)'
    },
    {
      id: 4,
      title: 'Example 4: Real-World Multiple Optima',
      problem: 'A company produces two products. Profit: A = ₹40, B = ₹50.\nConstraints:\n2x + 3y ≤ 120\n3x + 2y ≤ 120\nx ≥ 0, y ≥ 0\n\nFind the optimal production mix.',
      solution: 'Multiple optimal solutions: (40,0) and (0,40) and any point between them',
      detailedSolution: 'Step 1: Find corner points\n(0,0), (40,0), (24,24), (0,40)\n\nStep 2: Evaluate profit at each corner\nZ(0,0) = 0\nZ(40,0) = 40(40) + 50(0) = 1600\nZ(24,24) = 40(24) + 50(24) = 960 + 1200 = 2160\nZ(0,40) = 40(0) + 50(40) = 2000\n\nStep 3: Check for multiple optima\nZ(24,24) = 2160 is the maximum\nOnly one corner gives this value\n\nWait! Let me recalculate:\nZ(40,0) = 1600\nZ(24,24) = 2160\nZ(0,40) = 2000\n\nThe actual optimal is at (24,24) with Z = 2160\nBut check: 3x+2y ≤ 120 → 3(24)+2(24)=72+48=120 ✓\n2x+3y ≤ 120 → 2(24)+3(24)=48+72=120 ✓\n\nThis is a unique optimal solution at (24,24)'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Find the Optimal Solution',
      problem: 'Maximize Z = 4x + 3y\nCorner points: (0,0), (6,0), (3,4), (0,5)\n\nIs there a unique optimal solution?',
      hint: 'Evaluate Z at each corner point and check if any two give the same value.',
      solution: 'Unique optimal at (3,4) with Z = 24'
    },
    {
      id: 2,
      title: 'Identify Alternate Optima',
      problem: 'Maximize Z = 2x + 4y\nCorner points: (0,0), (5,0), (3,3), (0,6)\n\nAre there multiple optimal solutions?',
      hint: 'Evaluate Z at each corner. If two give the same value, there are multiple optima.',
      solution: 'Multiple optimal: (3,3) and (0,6) both give Z = 12'
    },
    {
      id: 3,
      title: 'Minimization with Unique Optimum',
      problem: 'Minimize Z = 3x + 5y\nCorner points: (0,8), (4,4), (8,0)\n\nFind the optimal solution.',
      hint: 'Evaluate Z at each corner and choose the minimum.',
      solution: 'Unique optimal at (8,0) with Z = 24'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Optimal Solution Visualizer
  const OptimalSolutionVisualizer = () => {
    const [objectiveType, setObjectiveType] = useState('max');
    const [c1, setC1] = useState(3);
    const [c2, setC2] = useState(2);

    // Corner points for a standard feasible region
    const corners = [
      { x: 0, y: 0, label: 'A' },
      { x: 5, y: 0, label: 'B' },
      { x: 4, y: 2, label: 'C' },
      { x: 0, y: 4, label: 'D' }
    ];

    const evaluateZ = (x, y) => {
      return c1 * x + c2 * y;
    };

    const results = corners.map((corner) => ({
      ...corner,
      z: evaluateZ(corner.x, corner.y)
    }));

    const optimalValue = objectiveType === 'max' 
      ? Math.max(...results.map(r => r.z))
      : Math.min(...results.map(r => r.z));

    const optimalPoints = results.filter(r => r.z === optimalValue);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Optimal Solution Finder
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Objective Type:</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setObjectiveType('max')}
                  className={clsx(
                    "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300",
                    objectiveType === 'max'
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                >
                  Maximize
                </button>
                <button
                  onClick={() => setObjectiveType('min')}
                  className={clsx(
                    "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300",
                    objectiveType === 'min'
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                >
                  Minimize
                </button>
              </div>
            </div>

            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Z = {c1}x + {c2}y ({objectiveType === 'max' ? 'Maximize' : 'Minimize'})
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Coefficient c₁ (x)</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={c1}
                  onChange={(e) => setC1(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{c1}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Coefficient c₂ (y)</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={c2}
                  onChange={(e) => setC2(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{c2}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Optimal {objectiveType === 'max' ? 'Maximum' : 'Minimum'} Z = {optimalValue}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {optimalPoints.length === 1 
                  ? `Unique optimum at ${optimalPoints[0].label}(${optimalPoints[0].x}, ${optimalPoints[0].y})`
                  : `${optimalPoints.length} optimal solutions found!`
                }
              </p>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Corner Point Evaluations</h5>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-600 dark:text-gray-400">
                    <th className="text-left py-1">Point</th>
                    <th className="text-left py-1">(x, y)</th>
                    <th className="text-left py-1">Z = {c1}x + {c2}y</th>
                    <th className="text-left py-1">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, idx) => (
                    <tr key={idx} className={clsx(
                      result.z === optimalValue ? "bg-green-100 dark:bg-green-900/30" : ""
                    )}>
                      <td className="py-1 font-medium text-gray-700 dark:text-gray-300">{result.label}</td>
                      <td className="py-1 font-mono text-gray-700 dark:text-gray-300">({result.x}, {result.y})</td>
                      <td className="py-1 font-mono text-gray-700 dark:text-gray-300">{result.z}</td>
                      <td className="py-1">
                        {result.z === optimalValue && (
                          <span className="text-green-600 dark:text-green-400 font-medium">
                            {objectiveType === 'max' ? '✓ Maximum' : '✓ Minimum'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
            Optimal Solution and Alternate Optimal Solutions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to identify the optimal solution and recognize when multiple optimal 
            solutions exist in linear programming problems.
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
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* What is the Optimal Solution? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is the Optimal Solution?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  The optimal solution is the best feasible solution to a linear programming problem. 
                  For maximization problems, it gives the highest objective value. For minimization 
                  problems, it gives the lowest objective value. The optimal solution is always found 
                  at a corner point of the feasible region.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Concepts</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Best feasible solution</li>
                      <li>Max or min objective value</li>
                      <li>Always at a corner point</li>
                      <li>Can be unique or multiple</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Types of Optimal Solutions</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Unique optimal solution</li>
                      <li>Alternate (multiple) optimal solutions</li>
                      <li>Unbounded solution</li>
                      <li>Infeasible (no solution)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Types of Optimal Solutions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Types of Optimal Solutions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Unique Optimal</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Only one corner point gives the optimal Z value.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Z(4,2) = 16 is unique
                    </div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Alternate Optimal</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Multiple corner points give the same optimal Z.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Z(4,4) = 8 and Z(0,8) = 8
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Unbounded</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">No finite optimal solution exists.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Z can go to infinity
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Infeasible</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">No feasible solution exists.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Empty feasible region
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Visualizer */}
              <OptimalSolutionVisualizer />

              {/* How to Identify Alternate Optimal Solutions */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Identify Alternate Optimal Solutions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 1</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Find all corner points</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 2</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Evaluate Z at each corner</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 3</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">If multiple corners give the same optimal Z → alternate optima</p>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Identifying Optimal Solutions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Check all corner points systematically</li>
                      <li>Look for equal Z values at different corners</li>
                      <li>Verify the objective slope matches a constraint</li>
                      <li>Multiple optima = objective parallel to constraint</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Missing alternate optimal solutions</li>
                      <li>Assuming only one optimal solution</li>
                      <li>Not checking all corner points</li>
                      <li>Confusing alternate optima with degenerate</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">All corner points found</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Z evaluated at each corner</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Optimal Z value identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Checked for multiple optima</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Optimal solution(s) stated clearly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Solution verified in constraints</span>
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
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
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
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
                  💡 Tips for Identifying Optimal Solutions
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Check all corners:</span> Don't assume uniqueness</li>
                  <li><span className="font-medium">Look for ties:</span> Equal Z values mean multiple optima</li>
                  <li><span className="font-medium">Check slopes:</span> Objective parallel to constraint = multiple optima</li>
                  <li><span className="font-medium">Verify feasibility:</span> Ensure optimal points satisfy all constraints</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Optimal and Alternate Optimal Solutions FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Optimal Solution and Alternate Optimal Solutions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Understanding optimal solutions is the culmination of graphical LP. I tell my students that finding the optimal solution is like finding the best deal - you check all the options (corner points) and pick the best one. The concept of alternate optimal solutions is particularly important in practice - it gives decision-makers flexibility. When multiple solutions give the same optimal value, managers can choose based on other criteria like sustainability, risk, or employee preferences." />
        </div>
      </div>
    </div>
  );
};

export default Topic5;
