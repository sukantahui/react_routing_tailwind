import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic6_files/topic6_questions';
import noteText from './topic6_files/topic6_note.txt?raw';

const Topic6 = () => {
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
      title: 'Example 1: Basic Entering and Leaving Variables',
      problem: 'Given the tableau:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  2  │  1  │  1  │  0  │ 10  │\n│ s₂  │  1  │  2  │  0  │  1  │  8  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -3  │ -2  │  0  │  0  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nIdentify the entering and leaving variables.',
      solution: 'Entering variable: x (most negative Z row: -3)\nLeaving variable: s₂ (minimum ratio: 8/1 = 8)',
      detailedSolution: 'Step 1: Identify entering variable\nLook at the Z row for the most negative coefficient\nZ row: [-3, -2, 0, 0, 0]\nMost negative: -3 (column x)\nEntering variable: x\n\nStep 2: Identify leaving variable\nUse ratio test: RHS / coefficient in entering column\nFor s₁: 10/2 = 5\nFor s₂: 8/1 = 8\nMinimum ratio: 5 (row s₁)\nLeaving variable: s₁\n\nStep 3: Verify\nEntering: x (improves Z by 3 per unit)\nLeaving: s₁ (will become non-basic)\nPivot element: 2 (intersection of x column and s₁ row)'
    },
    {
      id: 2,
      title: 'Example 2: Multiple Entering Candidates',
      problem: 'Given the tableau with Z row: [-5, -3, 0, 0, 0]\nand constraints:\nRow 1: 3, 1, 1, 0, 12\nRow 2: 2, 4, 0, 1, 16\n\nIdentify the entering and leaving variables.',
      solution: 'Entering variable: x (most negative: -5)\nLeaving variable: s₁ (minimum ratio: 12/3 = 4)',
      detailedSolution: 'Step 1: Identify entering variable\nZ row coefficients: [-5, -3, 0, 0, 0]\nMost negative: -5 (column x)\nEntering variable: x\n\nStep 2: Identify leaving variable\nRatio test:\nRow 1 (s₁): 12/3 = 4\nRow 2 (s₂): 16/2 = 8\nMinimum ratio: 4 (row s₁)\nLeaving variable: s₁\n\nStep 3: Check\nIf x enters, Z increases by 5 per unit\ns₁ leaves (becomes 0) when x reaches 4'
    },
    {
      id: 3,
      title: 'Example 3: Tie in Ratio Test',
      problem: 'Given the tableau with constraints:\nRow 1: 2, 1, 1, 0, 10\nRow 2: 4, 2, 0, 1, 20\nZ row: [-6, -4, 0, 0, 0]\n\nIdentify the entering and leaving variables.',
      solution: 'Entering variable: x (most negative: -6)\nLeaving variable: s₁ (ratio test: 10/2 = 5, 20/4 = 5 → tie)',
      detailedSolution: 'Step 1: Identify entering variable\nZ row: [-6, -4, 0, 0, 0]\nMost negative: -6 (column x)\nEntering variable: x\n\nStep 2: Identify leaving variable\nRatio test:\nRow 1 (s₁): 10/2 = 5\nRow 2 (s₂): 20/4 = 5\nTie! Both give ratio 5\n\nStep 3: Handle tie\nEither row can leave (tie-breaking rule)\nChoose s₁ (first row) to leave\nLeaving variable: s₁\n\nStep 4: Note\nTies may lead to degeneracy\nPivot element: 2'
    },
    {
      id: 4,
      title: 'Example 4: Real-World Simplex Iteration',
      problem: 'A factory produces chairs (x) and tables (y). Current tableau:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  2  │  3  │  1  │  0  │ 120 │\n│ s₂  │  3  │  2  │  0  │  1  │ 90  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -40 │ -50 │  0  │  0  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nIdentify the entering and leaving variables.',
      solution: 'Entering variable: y (most negative: -50)\nLeaving variable: s₂ (minimum ratio: 90/2 = 45)',
      detailedSolution: 'Step 1: Entering variable\nZ row: [-40, -50, 0, 0, 0]\nMost negative: -50 (column y)\nEntering: y (tables)\n\nStep 2: Leaving variable\nRatio test:\nRow 1 (s₁): 120/3 = 40\nRow 2 (s₂): 90/2 = 45\nMinimum ratio: 40 (row s₁)\nLeaving: s₁\n\nStep 3: Interpret\nProducing tables increases profit by ₹50/unit\nLabor (s₁) is the limiting factor\nWill produce tables until labor is fully used'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Find Entering Variable',
      problem: 'Z row: [-4, -6, 0, 0, 0]\nWhich variable enters the basis?',
      hint: 'Look for the most negative coefficient in the Z row.',
      solution: 'y enters (coefficient -6 is most negative)'
    },
    {
      id: 2,
      title: 'Find Leaving Variable',
      problem: 'Constraints:\nRow 1: 2, 3, 1, 0, 18\nRow 2: 4, 1, 0, 1, 12\nEntering variable: x\nWhich variable leaves?',
      hint: 'Use the ratio test: RHS / coefficient of entering variable.',
      solution: 'Row 1: 18/2 = 9, Row 2: 12/4 = 3 → s₂ leaves'
    },
    {
      id: 3,
      title: 'Complete Selection',
      problem: 'Tableau:\nB | x | y | s₁ | s₂ | RHS\ns₁| 1 | 2 | 1 | 0 | 8\ns₂| 3 | 1 | 0 | 1 | 6\nZ |-2 |-5 | 0 | 0 | 0\n\nIdentify entering and leaving variables.',
      hint: 'Find most negative Z coefficient, then use ratio test.',
      solution: 'Entering: y (-5), Leaving: s₁ (8/2=4, 6/1=6 → min 4)'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Variable Selector
  const VariableSelector = () => {
    const [tableau, setTableau] = useState({
      rows: [
        { basic: 's₁', coefficients: [2, 1, 1, 0], rhs: 10 },
        { basic: 's₂', coefficients: [1, 2, 0, 1], rhs: 8 }
      ],
      zRow: [-3, -2, 0, 0, 0]
    });

    const [entering, setEntering] = useState(null);
    const [leaving, setLeaving] = useState(null);

    const findEntering = () => {
      const z = tableau.zRow;
      let min = 0;
      let col = -1;
      for (let i = 0; i < z.length - 1; i++) {
        if (z[i] < min) {
          min = z[i];
          col = i;
        }
      }
      return col;
    };

    const findLeaving = (enterCol) => {
      if (enterCol === -1) return -1;
      let minRatio = Infinity;
      let row = -1;
      for (let i = 0; i < tableau.rows.length; i++) {
        const coeff = tableau.rows[i].coefficients[enterCol];
        if (coeff > 0) {
          const ratio = tableau.rows[i].rhs / coeff;
          if (ratio < minRatio) {
            minRatio = ratio;
            row = i;
          }
        }
      }
      return row;
    };

    const handleFindVariables = () => {
      const enterCol = findEntering();
      const leaveRow = findLeaving(enterCol);
      setEntering(enterCol);
      setLeaving(leaveRow);
    };

    const variableNames = ['x', 'y', 's₁', 's₂'];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Variable Selector
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 overflow-x-auto">
              <table className="w-full text-xs font-mono">
                <thead>
                  <tr className="text-gray-600 dark:text-gray-400">
                    <th className="px-2 py-1 border dark:border-gray-600">B</th>
                    <th className="px-2 py-1 border dark:border-gray-600">x</th>
                    <th className="px-2 py-1 border dark:border-gray-600">y</th>
                    <th className="px-2 py-1 border dark:border-gray-600">s₁</th>
                    <th className="px-2 py-1 border dark:border-gray-600">s₂</th>
                    <th className="px-2 py-1 border dark:border-gray-600">RHS</th>
                  </tr>
                </thead>
                <tbody>
                  {tableau.rows.map((row, idx) => (
                    <tr key={idx} className={leaving === idx ? 'bg-red-100 dark:bg-red-900/30' : ''}>
                      <td className="px-2 py-1 border dark:border-gray-600 font-medium">{row.basic}</td>
                      {row.coefficients.map((coef, cidx) => (
                        <td key={cidx} className={clsx(
                          "px-2 py-1 border dark:border-gray-600 text-center",
                          entering === cidx && 'bg-green-100 dark:bg-green-900/30 font-bold'
                        )}>
                          {coef}
                        </td>
                      ))}
                      <td className="px-2 py-1 border dark:border-gray-600 text-center">{row.rhs}</td>
                    </tr>
                  ))}
                  <tr className="bg-yellow-50 dark:bg-yellow-900/20">
                    <td className="px-2 py-1 border dark:border-gray-600 font-medium">Z</td>
                    {tableau.zRow.map((coef, idx) => (
                      <td key={idx} className={clsx(
                        "px-2 py-1 border dark:border-gray-600 text-center",
                        entering === idx && 'bg-green-100 dark:bg-green-900/30 font-bold'
                      )}>
                        {coef}
                      </td>
                    ))}
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={handleFindVariables}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 w-full"
            >
              Find Entering & Leaving Variables
            </button>
          </div>

          <div>
            {entering !== null && entering !== -1 && (
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500 mb-3">
                <h5 className="font-semibold text-green-700 dark:text-green-400">Entering Variable</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">{variableNames[entering]}</span> 
                  {' '}will enter the basis (most negative Z coefficient)
                </p>
              </div>
            )}
            
            {leaving !== null && leaving !== -1 && (
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500 mb-3">
                <h5 className="font-semibold text-red-700 dark:text-red-400">Leaving Variable</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-bold">{tableau.rows[leaving].basic}</span> 
                  {' '}will leave the basis (minimum ratio test)
                </p>
              </div>
            )}

            {entering !== null && entering !== -1 && leaving !== null && leaving !== -1 && (
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400">Pivot Information</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Pivot Element: {tableau.rows[leaving].coefficients[entering]}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Pivot Row: {tableau.rows[leaving].basic}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Pivot Column: {variableNames[entering]}
                </p>
              </div>
            )}

            {entering === -1 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  No negative coefficients in Z row. Optimal solution reached!
                </p>
              </div>
            )}
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
            Entering and Leaving Variables
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to identify which variable enters the basis and which leaves during each 
            iteration of the Simplex Method.
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
          {activeTab === 'concept' && (
            <>
              {/* What are Entering and Leaving Variables? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What are Entering and Leaving Variables?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  In each iteration of the Simplex Method, one non-basic variable enters the basis 
                  (entering variable) and one basic variable leaves the basis (leaving variable). 
                  This exchange improves the objective function value while maintaining feasibility. 
                  The entering variable is chosen based on the most negative coefficient in the Z row, 
                  and the leaving variable is chosen using the minimum ratio test.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Concepts</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Entering variable: non-basic variable that enters the basis</li>
                      <li>Leaving variable: basic variable that leaves the basis</li>
                      <li>Pivot element: intersection of entering column and leaving row</li>
                      <li>Exchange improves Z while maintaining feasibility</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why It Matters</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Drives the Simplex iteration</li>
                      <li>Improves objective value</li>
                      <li>Maintains feasibility</li>
                      <li>Moves to adjacent corner point</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Select Variables */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Select Entering and Leaving Variables
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Entering Variable</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Look at the Z row coefficients</li>
                      <li>Find the <span className="font-bold">most negative</span> coefficient</li>
                      <li>Its column is the entering variable</li>
                      <li>For maximization: most negative</li>
                      <li>For minimization: most positive</li>
                    </ul>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Z row: [-3, -2, 0, 0, 0]<br/>
                      Most negative: -3 → x enters
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Leaving Variable</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Use the <span className="font-bold">minimum ratio test</span></li>
                      <li>For each row: RHS / coefficient in entering column</li>
                      <li>Choose the row with the <span className="font-bold">smallest positive ratio</span></li>
                      <li>Its basic variable leaves the basis</li>
                      <li>Ensure denominator &gt; 0</li>
                    </ul>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Row 1: 10/2 = 5<br/>
                      Row 2: 8/1 = 8<br/>
                      Min ratio: 5 → s₁ leaves
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Visualizer */}
              <VariableSelector />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Selecting Variables
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Always check Z row for negative coefficients</li>
                      <li>Use exact fractions for ratio test</li>
                      <li>Handle ties with a consistent rule</li>
                      <li>Verify pivot element is positive</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Choosing wrong sign for entering variable</li>
                      <li>Using negative denominators in ratio test</li>
                      <li>Ignoring ties in ratio test</li>
                      <li>Forgetting to check optimality first</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Z row checked for negative coefficients</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Most negative coefficient identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Ratio test performed correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Minimum positive ratio identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Pivot element is positive</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Feasibility maintained</span>
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
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Solution</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.solution}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleExample(example.id)}
                        className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all duration-300"
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
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6 border border-cyan-200 dark:border-cyan-800">
                <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-2">
                  💡 Tips for Selecting Variables
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Entering variable:</span> Most negative in Z row (maximization)</li>
                  <li><span className="font-medium">Leaving variable:</span> Minimum ratio test (RHS / entering column)</li>
                  <li><span className="font-medium">Check positivity:</span> Only use positive denominators in ratio test</li>
                  <li><span className="font-medium">Handle ties:</span> Use a consistent tie-breaking rule</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Entering and Leaving Variables FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Entering and Leaving Variables"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Selecting entering and leaving variables is the heart of each Simplex iteration. I tell my students that this is like choosing which player to bring onto the field (entering) and which to take off (leaving). The rules are clear: the most negative Z coefficient enters, and the minimum ratio test determines who leaves. The key is to be systematic and careful with the ratio test - one wrong calculation can derail the entire solution." />
        </div>
      </div>
    </div>
  );
};

export default Topic6;