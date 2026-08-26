import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic4_files/topic4_questions';
import noteText from './topic4_files/topic4_note.txt?raw';

const Topic4 = () => {
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
      title: 'Example 1: Maximization with Two Corner Points',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx ≥ 0, y ≥ 0\n\nCorner points: (0,0), (5,0), (4,2), (0,4)',
      solution: 'Optimal at (4,2) with Z = 16',
      detailedSolution: 'Step 1: Identify corner points\n(0,0), (5,0), (4,2), (0,4)\n\nStep 2: Evaluate Z at each corner point\n\nZ(0,0) = 3(0) + 2(0) = 0\n\nZ(5,0) = 3(5) + 2(0) = 15\n\nZ(4,2) = 3(4) + 2(2) = 12 + 4 = 16\n\nZ(0,4) = 3(0) + 2(4) = 8\n\nStep 3: Compare values\nValues: 0, 15, 16, 8\nMaximum is 16 at (4,2)\n\nStep 4: State optimal solution\nOptimal solution: x = 4, y = 2\nMaximum Z = 16'
    },
    {
      id: 2,
      title: 'Example 2: Minimization with Three Constraints',
      problem: 'Minimize Z = 4x + 3y\nSubject to:\nx + y ≥ 6\n2x + y ≥ 8\nx + 2y ≥ 10\nx ≥ 0, y ≥ 0\n\nCorner points: (0,8), (2,4), (4,3), (10,0)',
      solution: 'Optimal at (4,3) with Z = 25',
      detailedSolution: 'Step 1: Identify corner points\n(0,8), (2,4), (4,3), (10,0)\n\nStep 2: Evaluate Z at each corner point\n\nZ(0,8) = 4(0) + 3(8) = 24\n\nZ(2,4) = 4(2) + 3(4) = 8 + 12 = 20\n\nZ(4,3) = 4(4) + 3(3) = 16 + 9 = 25\n\nZ(10,0) = 4(10) + 3(0) = 40\n\nStep 3: Compare values\nValues: 24, 20, 25, 40\nMinimum is 20 at (2,4)\n\nStep 4: State optimal solution\nOptimal solution: x = 2, y = 4\nMinimum Z = 20'
    },
    {
      id: 3,
      title: 'Example 3: Multiple Optimal Solutions',
      problem: 'Maximize Z = x + y\nSubject to:\nx + y ≤ 8\n2x + y ≤ 12\nx ≥ 0, y ≥ 0\n\nCorner points: (0,0), (6,0), (4,4), (0,8)',
      solution: 'Multiple optimal solutions: (4,4) and (0,8) both give Z = 8',
      detailedSolution: 'Step 1: Identify corner points\n(0,0), (6,0), (4,4), (0,8)\n\nStep 2: Evaluate Z at each corner point\n\nZ(0,0) = 0 + 0 = 0\n\nZ(6,0) = 6 + 0 = 6\n\nZ(4,4) = 4 + 4 = 8\n\nZ(0,8) = 0 + 8 = 8\n\nStep 3: Compare values\nValues: 0, 6, 8, 8\nMaximum is 8 at (4,4) and (0,8)\n\nStep 4: State optimal solution\nMultiple optimal solutions:\n(4,4) and (0,8) both give Z = 8\nAny point on the line between them is also optimal'
    },
    {
      id: 4,
      title: 'Example 4: Real-World Profit Maximization',
      problem: 'A company produces chairs (x) and tables (y). Profit: Chair ₹40, Table ₹50.\nConstraints:\n2x + 3y ≤ 120 (Labor)\n3x + 2y ≤ 90 (Wood)\nx ≥ 0, y ≥ 0\n\nCorner points: (0,0), (30,0), (18,24), (0,40)\nMaximize Z = 40x + 50y',
      solution: 'Optimal at (0,40) with Z = 2000',
      detailedSolution: 'Step 1: Identify corner points\n(0,0), (30,0), (18,24), (0,40)\n\nStep 2: Evaluate profit at each corner point\n\nZ(0,0) = 40(0) + 50(0) = 0\n\nZ(30,0) = 40(30) + 50(0) = 1200\n\nZ(18,24) = 40(18) + 50(24) = 720 + 1200 = 1920\n\nZ(0,40) = 40(0) + 50(40) = 2000\n\nStep 3: Compare values\nValues: 0, 1200, 1920, 2000\nMaximum is 2000 at (0,40)\n\nStep 4: State optimal solution\nOptimal solution: x = 0 chairs, y = 40 tables\nMaximum profit = ₹2000'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Maximize Profit',
      problem: 'Maximize Z = 5x + 3y\nCorner points: (0,0), (4,0), (2,3), (0,5)\n\nFind the optimal solution.',
      hint: 'Evaluate Z at each corner point and choose the maximum.',
      solution: 'Optimal at (2,3) with Z = 19'
    },
    {
      id: 2,
      title: 'Minimize Cost',
      problem: 'Minimize Z = 2x + 4y\nCorner points: (0,6), (3,3), (6,0)\n\nFind the optimal solution.',
      hint: 'Evaluate Z at each corner point and choose the minimum.',
      solution: 'Optimal at (6,0) with Z = 12'
    },
    {
      id: 3,
      title: 'Maximize with Multiple Optima',
      problem: 'Maximize Z = 2x + 3y\nCorner points: (0,0), (5,0), (3,4), (0,6)\n\nFind all optimal solutions.',
      hint: 'Evaluate Z at each corner. If two give the same value, both are optimal.',
      solution: 'Optimal at (3,4) and (0,6) both give Z = 18'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Objective Evaluator
  const ObjectiveEvaluator = () => {
    const [c1, setC1] = useState(3);
    const [c2, setC2] = useState(2);
    const [corners, setCorners] = useState([
      { x: 0, y: 0 },
      { x: 5, y: 0 },
      { x: 4, y: 2 },
      { x: 0, y: 4 }
    ]);

    const evaluateZ = (x, y) => {
      return c1 * x + c2 * y;
    };

    const results = corners.map((corner, index) => ({
      ...corner,
      z: evaluateZ(corner.x, corner.y),
      label: `(${corner.x}, ${corner.y})`
    }));

    const maxZ = Math.max(...results.map(r => r.z));
    const minZ = Math.min(...results.map(r => r.z));

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Objective Function Evaluator
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Z = {c1}x + {c2}y
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
                /&gt;
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
                /&gt;
                <span className="text-sm text-gray-600 dark:text-gray-400">{c2}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Maximum Z:</span> {maxZ}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Minimum Z:</span> {minZ}
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
                    <th className="text-left py-1">Z = {c1}x + {c2}y</th>
                    <th className="text-left py-1">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result, idx) => (
                    <tr key={idx} className={clsx(
                      result.z === maxZ ? "bg-green-100 dark:bg-green-900/30" : "",
                      result.z === minZ && result.z !== maxZ ? "bg-red-100 dark:bg-red-900/30" : ""
                    )}>
                      <td className="py-1 font-mono text-gray-700 dark:text-gray-300">{result.label}</td>
                      <td className="py-1 font-mono text-gray-700 dark:text-gray-300">{result.z}</td>
                      <td className="py-1">
                        {result.z === maxZ && <span className="text-green-600 dark:text-green-400">✓ Max</span>}
                        {result.z === minZ && result.z !== maxZ && <span className="text-red-600 dark:text-red-400">Min</span>}
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
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Evaluating the Objective Function at Corner Points
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to find the optimal solution by evaluating the objective function at each 
            corner point of the feasible region.
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
                  ? "bg-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-orange-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            &gt;
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* What is Objective Function Evaluation? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is Objective Function Evaluation?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Objective function evaluation is the process of calculating the value of the objective 
                  function Z = c₁x + c₂y at each corner point of the feasible region. By comparing these 
                  values, we can identify which corner point gives the maximum (for maximization) or 
                  minimum (for minimization) objective value.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Concepts</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Optimal solution at a corner point</li>
                      <li>Evaluate Z at each corner point</li>
                      <li>Compare values to find max/min</li>
                      <li>Multiple optimal solutions possible</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why It Matters</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Finds the optimal solution</li>
                      <li>Identifies best decision</li>
                      <li>Reveals multiple optima</li>
                      <li>Essential for LP solving</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Evaluate */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Evaluate the Objective Function
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 1: List Corners</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Identify all corner points</li>
                      <li>List coordinates (x, y)</li>
                      <li>Include origin if applicable</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 2: Calculate Z</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Substitute each point into Z</li>
                      <li>Z = c₁x + c₂y</li>
                      <li>Show all calculations</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 3: Compare & Select</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Compare all Z values</li>
                      <li>Select max or min</li>
                      <li>Identify optimal point</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interactive Evaluator */}
              <ObjectiveEvaluator />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Evaluating Objective Functions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Be systematic - evaluate all corners</li>
                      <li>Check arithmetic carefully</li>
                      <li>Look for multiple optima</li>
                      <li>Verify optimal point is feasible</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Missing a corner point</li>
                      <li>Arithmetic errors in calculations</li>
                      <li>Not checking if point is feasible</li>
                      <li>Confusing max with min</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">All corner points listed</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Each point evaluated in Z</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">All calculations checked</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Values compared correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Max or min correctly identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Optimal solution verified</span>
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
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300"
                      &gt;
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
                        &gt;
                          {showSolution === problem.id ? 'Hide Solution' : 'Check Solution'}
                        </button>
                        <button
                          onClick={() => setShowHint(showHint === problem.id ? null : problem.id)}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                        &gt;
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
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
                  💡 Tips for Evaluating Objective Functions
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Be systematic:</span> List all corner points clearly</li>
                  <li><span className="font-medium">Check arithmetic:</span> Recalculate to avoid errors</li>
                  <li><span className="font-medium">Look for patterns:</span> Multiple optima when values tie</li>
                  <li><span className="font-medium">Verify feasibility:</span> Ensure each point satisfies all constraints</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Evaluating Objective Function FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Evaluating the Objective Function at Corner Points"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Evaluating the objective function at corner points is where LP becomes decision-making. I tell my students that this step is like 'shopping' - you check the price (Z value) at each store (corner point) and choose the best deal. The key is to be systematic and check every corner point, because the optimal solution is always hiding at one of them. I encourage students to create a table showing each corner point and its Z value - this visual comparison makes it easy to identify the optimal solution." />
        </div>
      </div>
    </div>
  );
};

export default Topic4;