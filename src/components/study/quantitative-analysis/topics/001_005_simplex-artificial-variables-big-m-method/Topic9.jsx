import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic9_files/topic9_questions';
import noteText from './topic9_files/topic9_note.txt?raw';

const Topic9 = () => {
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
      title: 'Example 1: Optimal Solution Found',
      problem: 'Check optimality of the tableau:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  x  │  1  │  0  │ 0.5 │ -0.5│  4  │\n│  y  │  0  │  1  │-0.5 │ 0.5 │  2  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  0  │  0  │  1  │  1  │ 16  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nIs this optimal?',
      solution: 'Yes, optimal. All Z coefficients are ≥ 0 (0, 0, 1, 1).',
      detailedSolution: 'Step 1: Check Z row coefficients\nZ row: [0, 0, 1, 1, 16]\n\nStep 2: Apply optimality condition\nFor maximization: All Z coefficients must be ≥ 0\nCoefficients: 0 ≥ 0 ✓, 0 ≥ 0 ✓, 1 ≥ 0 ✓, 1 ≥ 0 ✓\n\nStep 3: Conclusion\nAll coefficients are non-negative → OPTIMAL\n\nStep 4: Read solution\nBasic variables: x = 4, y = 2\nZ = 16'
    },
    {
      id: 2,
      title: 'Example 2: Not Yet Optimal',
      problem: 'Check optimality of the tableau:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  x  │  1  │ 0.5 │ 0.5 │  0  │  5  │\n│ s₂  │  0  │ 1.5 │-0.5 │  1  │  3  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  0  │-0.5 │ 1.5 │  0  │ 15  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nIs this optimal?',
      solution: 'Not optimal. Negative coefficient -0.5 in Z row (column y).',
      detailedSolution: 'Step 1: Check Z row coefficients\nZ row: [0, -0.5, 1.5, 0, 15]\n\nStep 2: Apply optimality condition\nFor maximization: All Z coefficients must be ≥ 0\nCoefficients: 0 ≥ 0 ✓, -0.5 ≥ 0 ✗, 1.5 ≥ 0 ✓, 0 ≥ 0 ✓\n\nStep 3: Conclusion\nNegative coefficient found (-0.5 at column y)\n→ NOT OPTIMAL\n\nStep 4: Next step\ny should enter the basis (most negative coefficient)'
    },
    {
      id: 3,
      title: 'Example 3: Minimization Optimality',
      problem: 'Check optimality of the tableau for minimization:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  x  │  1  │  0  │ 0.5 │ -0.5│  4  │\n│  y  │  0  │  1  │-0.5 │ 0.5 │  2  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  0  │  0  │  1  │  1  │ 16  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nThis is for minimization. Is it optimal?',
      solution: 'For minimization, check if all Z coefficients are ≤ 0. Here they are ≥ 0, so not optimal.',
      detailedSolution: 'Step 1: Identify problem type\nThis is a minimization problem.\n\nStep 2: Apply optimality condition\nFor minimization: All Z coefficients must be ≤ 0\nZ row: [0, 0, 1, 1, 16]\nCoefficients: 0 ≤ 0 ✓, 0 ≤ 0 ✓, 1 ≤ 0 ✗, 1 ≤ 0 ✗\n\nStep 3: Conclusion\nPositive coefficients found (1, 1)\n→ NOT OPTIMAL\n\nStep 4: Note\nFor minimization, the optimality condition is reversed:\n- Maximization: all Z ≥ 0\n- Minimization: all Z ≤ 0'
    },
    {
      id: 4,
      title: 'Example 4: Real-World Optimality Check',
      problem: 'A factory production problem tableau:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  y  │ 2/3 │  1  │ 1/3 │  0  │ 40  │\n│ s₂  │ 5/3 │  0  │-2/3 │  1  │ 10  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │-20/3│  0  │50/3 │  0  │2000 │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nIs this optimal? If not, what should be done?',
      solution: 'Not optimal. Z has -20/3 in x column. x should enter the basis.',
      detailedSolution: 'Step 1: Check Z row coefficients\nZ row: [-20/3, 0, 50/3, 0, 2000]\n\nStep 2: Apply optimality condition\nFor maximization: All Z coefficients must be ≥ 0\n-20/3 ≥ 0 ✗ (negative)\n\nStep 3: Conclusion\nNegative coefficient in x column\n→ NOT OPTIMAL\n\nStep 4: Next step\nx should enter the basis (most negative coefficient: -20/3)\nUse ratio test to find leaving variable\n\nStep 5: Interpretation\nProducing more chairs (x) would increase profit\nNeed to continue iterations'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Check Optimality',
      problem: 'Z row: [0, 2, 3, 0, 25]\nIs this optimal for maximization?',
      hint: 'Check if all coefficients in Z row are ≥ 0.',
      solution: 'Yes, optimal. All Z coefficients ≥ 0.'
    },
    {
      id: 2,
      title: 'Optimality for Minimization',
      problem: 'Z row: [0, -1, -2, 0, 12]\nIs this optimal for minimization?',
      hint: 'For minimization, check if all coefficients are ≤ 0.',
      solution: 'Yes, optimal for minimization. All Z coefficients ≤ 0.'
    },
    {
      id: 3,
      title: 'Identify Entering Variable',
      problem: 'Z row: [0, -3, 2, -1, 18]\nWhich variable should enter for maximization?',
      hint: 'Find the most negative coefficient in the Z row.',
      solution: 'y enters (coefficient -3 is most negative).'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Optimality Checker
  const OptimalityChecker = () => {
    const [problemType, setProblemType] = useState('max');
    const [zRow, setZRow] = useState([0, -3, -2, 0, 0, 0]);
    const variableNames = ['x', 'y', 's₁', 's₂', 'RHS'];

    const checkOptimality = () => {
      const coefficients = zRow.slice(0, -1);
      if (problemType === 'max') {
        return coefficients.every(c => c &ge; 0);
      } else {
        return coefficients.every(c => c &le; 0);
      }
    };

    const isOptimal = checkOptimality();

    const updateCoefficient = (index, value) => {
      const newZRow = [...zRow];
      newZRow[index] = Number(value);
      setZRow(newZRow);
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Optimality Checker
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
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
                &gt;
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
                &gt;
                  Minimization
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Z Row Coefficients:</p>
              {zRow.slice(0, -1).map((coef, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-sm font-mono text-gray-600 dark:text-gray-400 w-8">{variableNames[idx]}:</span>
                  <input
                    type="number"
                    value={coef}
                    onChange={(e) => updateCoefficient(idx, e.target.value)}
                    className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  /&gt;
                </div>
              ))}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm font-mono text-gray-600 dark:text-gray-400">RHS:</span>
                <span className="text-sm font-mono text-gray-800 dark:text-gray-200">{zRow[zRow.length - 1]}</span>
              </div>
            </div>
          </div>

          <div>
            <div className={clsx(
              "rounded-lg p-4 border-l-4",
              isOptimal
                ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                : "bg-red-50 dark:bg-red-900/20 border-red-500"
            )}>
              <h5 className={clsx(
                "font-semibold mb-2",
                isOptimal
                  ? "text-green-700 dark:text-green-400"
                  : "text-red-700 dark:text-red-400"
              )}>
                {isOptimal ? '✅ Optimal Solution' : '❌ Not Optimal'}
              </h5>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {problemType === 'max' 
                  ? 'Condition: All Z coefficients ≥ 0'
                  : 'Condition: All Z coefficients ≤ 0'
                }
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Z row: [{zRow.slice(0, -1).join(', ')}, {zRow[zRow.length - 1]}]
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Status: {isOptimal ? 'Optimal reached ✓' : 'Continue iterations →'}
              </p>
              {!isOptimal && problemType === 'max' && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  Negative coefficients found: {zRow.slice(0, -1).filter(c => c < 0).join(', ')}
                </p>
              )}
              {!isOptimal && problemType === 'min' && (
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                  Positive coefficients found: {zRow.slice(0, -1).filter(c => c > 0).join(', ')}
                </p>
              )}
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
            Optimality Condition
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to determine when the Simplex Method has reached the optimal solution 
            using the optimality condition.
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
                  ? "bg-green-600 text-white shadow-lg shadow-green-200 dark:shadow-green-900/30"
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
              {/* What is the Optimality Condition? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is the Optimality Condition?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  The optimality condition is the rule that tells us when to stop the Simplex Method. 
                  For maximization problems, the solution is optimal when all coefficients in the Z row 
                  are non-negative (≥ 0). For minimization problems, the solution is optimal when all 
                  coefficients in the Z row are non-positive (≤ 0). When this condition is met, no 
                  further improvement is possible.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Concepts</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Maximization: all Z coefficients ≥ 0</li>
                      <li>Minimization: all Z coefficients ≤ 0</li>
                      <li>Stops the algorithm</li>
                      <li>Confirms optimality</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why It Matters</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Prevents unnecessary iterations</li>
                      <li>Confirms optimal solution</li>
                      <li>Proves no better solution exists</li>
                      <li>Mathematical guarantee</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Optimality Conditions Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Optimality Conditions Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Maximization</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li><span className="font-bold">Condition:</span> All Z coefficients ≥ 0</li>
                      <li><span className="font-bold">Meaning:</span> No variable can improve Z</li>
                      <li><span className="font-bold">Action:</span> Stop - optimal found</li>
                    </ul>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Z row: [0, 2, 3, 0, 25] → Optimal ✓
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Minimization</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li><span className="font-bold">Condition:</span> All Z coefficients ≤ 0</li>
                      <li><span className="font-bold">Meaning:</span> No variable can improve Z</li>
                      <li><span className="font-bold">Action:</span> Stop - optimal found</li>
                    </ul>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Z row: [0, -2, -3, 0, 25] → Optimal ✓
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Optimality Checker */}
              <OptimalityChecker />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Checking Optimality
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Check Z row after every iteration</li>
                      <li>Remember the direction (max vs min)</li>
                      <li>Zero coefficients are allowed</li>
                      <li>If negative remains, continue</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Confusing max and min conditions</li>
                      <li>Missing negative coefficients</li>
                      <li>Stopping too early</li>
                      <li>Not checking all coefficients</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Z row coefficients checked</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">All coefficients satisfy condition</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Optimal solution confirmed</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Solution values read correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Optimal Z value correct</span>
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
                        <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.problem}
                        </pre>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Result</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.solution}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleExample(example.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
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
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  💡 Tips for Checking Optimality
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Maximization:</span> All Z coefficients ≥ 0</li>
                  <li><span className="font-medium">Minimization:</span> All Z coefficients ≤ 0</li>
                  <li><span className="font-medium">Zero coefficients:</span> Allowed, may indicate multiple optima</li>
                  <li><span className="font-medium">Negative coefficients:</span> Continue iterations</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Optimality Condition FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Optimality Condition"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic9_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The optimality condition is the 'stop sign' of the Simplex Method. I tell my students that checking optimality is like checking if you've reached the top of a hill - if you can still go up, you keep going. The condition is simple but powerful: for maximization, if any Z coefficient is negative, there's still room for improvement. I encourage students to always check optimality carefully - stopping too early or too late can both lead to incorrect results." />
        </div>
      </div>
    </div>
  );
};

export default Topic9;