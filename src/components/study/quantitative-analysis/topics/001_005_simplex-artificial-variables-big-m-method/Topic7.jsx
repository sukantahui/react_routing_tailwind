import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic7_files/topic7_questions';
import noteText from './topic7_files/topic7_note.txt?raw';

const Topic7 = () => {
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
      title: 'Example 1: Basic Pivot Element',
      problem: 'Given the tableau:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  2  │  1  │  1  │  0  │ 10  │\n│ s₂  │  1  │  2  │  0  │  1  │  8  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -3  │ -2  │  0  │  0  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nIdentify the pivot element.',
      solution: 'Entering: x (most negative -3)\nLeaving: s₁ (min ratio 10/2=5)\nPivot: 2 (row s₁, column x)',
      detailedSolution: 'Step 1: Identify entering variable\nZ row: [-3, -2, 0, 0]\nMost negative: -3 → x enters\n\nStep 2: Identify leaving variable\nRatio test:\ns₁: 10/2 = 5\ns₂: 8/1 = 8\nMinimum: 5 → s₁ leaves\n\nStep 3: Find pivot element\nPivot is at intersection of leaving row and entering column\nRow: s₁, Column: x\nPivot element: 2\n\nStep 4: Verify\nPivot is positive (2 > 0)'
    },
    {
      id: 2,
      title: 'Example 2: Pivot with Different Values',
      problem: 'Given the tableau:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  3  │  1  │  1  │  0  │ 15  │\n│ s₂  │  2  │  4  │  0  │  1  │ 20  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -5  │ -6  │  0  │  0  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nFind the pivot element.',
      solution: 'Entering: y (most negative -6)\nLeaving: s₂ (min ratio 20/4=5)\nPivot: 4 (row s₂, column y)',
      detailedSolution: 'Step 1: Identify entering variable\nZ row: [-5, -6, 0, 0]\nMost negative: -6 → y enters\n\nStep 2: Identify leaving variable\nRatio test:\ns₁: 15/1 = 15\ns₂: 20/4 = 5\nMinimum: 5 → s₂ leaves\n\nStep 3: Find pivot element\nRow: s₂, Column: y\nPivot element: 4\n\nStep 4: Interpretation\nPivot = 4 means to make y basic, divide row s₂ by 4'
    },
    {
      id: 3,
      title: 'Example 3: Pivot Row Operations',
      problem: 'Using the pivot element from Example 1 (pivot = 2 at row s₁, column x),\nperform the pivot operation to transform the tableau.',
      solution: 'New tableau after pivot:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  x  │  1  │ 0.5 │ 0.5 │  0  │  5  │\n│ s₂  │  0  │ 1.5 │-0.5 │  1  │  3  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  0  │-0.5 │ 1.5 │  0  │ 15  │\n└─────┴─────┴─────┴─────┴─────┴─────┘',
      detailedSolution: 'Step 1: Identify pivot\nPivot = 2 at (s₁, x)\n\nStep 2: Make pivot 1 (divide pivot row by 2)\nRow 1: [2, 1, 1, 0, 10] ÷ 2\n→ [1, 0.5, 0.5, 0, 5]\n\nStep 3: Eliminate pivot column in other rows\nRow 2 (s₂): [1, 2, 0, 1, 8] - 1 × Row 1\n→ [0, 1.5, -0.5, 1, 3]\n\nStep 4: Update Z row\nZ row: [-3, -2, 0, 0, 0] + 3 × Row 1\n→ [0, -0.5, 1.5, 0, 15]\n\nStep 5: New basic variables\nx = 5, s₂ = 3, Z = 15'
    },
    {
      id: 4,
      title: 'Example 4: Real-World Pivot Operation',
      problem: 'A factory produces chairs (x) and tables (y). Current tableau:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  2  │  3  │  1  │  0  │ 120 │\n│ s₂  │  3  │  2  │  0  │  1  │ 90  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -40 │ -50 │  0  │  0  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nPerform the pivot operation.',
      solution: 'Pivot: y enters (most negative -50), s₁ leaves (min ratio 120/3=40)\nPivot element: 3',
      detailedSolution: 'Step 1: Identify entering variable\nZ row: [-40, -50, 0, 0]\nMost negative: -50 → y enters\n\nStep 2: Identify leaving variable\nRatio test:\ns₁: 120/3 = 40\ns₂: 90/2 = 45\nMinimum: 40 → s₁ leaves\n\nStep 3: Pivot element\nPivot = 3 at (s₁, y)\n\nStep 4: Make pivot 1\nRow 1: [2, 3, 1, 0, 120] ÷ 3\n→ [2/3, 1, 1/3, 0, 40]\n\nStep 5: Eliminate pivot column\nRow 2: [3, 2, 0, 1, 90] - 2 × Row 1\n→ [5/3, 0, -2/3, 1, 10]\n\nStep 6: Update Z row\nZ: [-40, -50, 0, 0, 0] + 50 × Row 1\n→ [-20/3, 0, 50/3, 0, 2000]\n\nStep 7: New tableau\nNew basic: y = 40, s₂ = 10, Z = 2000'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Find the Pivot Element',
      problem: 'Tableau:\nB | x | y | s₁ | s₂ | RHS\ns₁| 2 | 1 | 1 | 0 | 6\ns₂| 4 | 3 | 0 | 1 | 12\nZ |-3 |-5 | 0 | 0 | 0\n\nFind the pivot element.',
      hint: 'Find entering variable (most negative Z), then leaving variable (min ratio).',
      solution: 'Entering: y (-5), Leaving: s₁ (6/1=6, 12/3=4 → s₂ leaves)\nPivot: 3 (row s₂, column y)'
    },
    {
      id: 2,
      title: 'Perform Pivot Operation',
      problem: 'Using the pivot element from Problem 1 (pivot = 3 at row s₂, column y),\nperform the pivot operation to transform the tableau.',
      hint: 'Divide pivot row by 3, then eliminate other rows.',
      solution: 'After pivot:\nB | x | y | s₁ | s₂ | RHS\ns₁| 0.67 | 0 | 1 | -0.33 | 2\ny | 1.33 | 1 | 0 | 0.33 | 4\nZ | 3.67 | 0 | 0 | 1.67 | 20'
    },
    {
      id: 3,
      title: 'Complete Pivot Selection',
      problem: 'Tableau:\nB | x | y | s₁ | s₂ | RHS\ns₁| 3 | 2 | 1 | 0 | 18\ns₂| 1 | 4 | 0 | 1 | 16\nZ |-4 |-6 | 0 | 0 | 0\n\nFind pivot element and perform pivot operation.',
      hint: 'Entering variable: y (-6). Leaving variable: min ratio test.',
      solution: 'Pivot: 4 (row s₂, column y)\nAfter pivot: new basic variables: s₁ = 10, y = 4, Z = 24'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Pivot Element Visualizer
  const PivotVisualizer = () => {
    const [tableau, setTableau] = useState({
      rows: [
        { basic: 's₁', coefficients: [2, 1, 1, 0], rhs: 10 },
        { basic: 's₂', coefficients: [1, 2, 0, 1], rhs: 8 }
      ],
      zRow: [-3, -2, 0, 0, 0]
    });

    const [pivotRow, setPivotRow] = useState(null);
    const [pivotCol, setPivotCol] = useState(null);
    const [pivotValue, setPivotValue] = useState(null);

    const findPivot = () => {
      // Find entering variable (most negative in Z row)
      let min = 0;
      let col = -1;
      for (let i = 0; i < tableau.zRow.length - 1; i++) {
        if (tableau.zRow[i] < min) {
          min = tableau.zRow[i];
          col = i;
        }
      }
      
      if (col === -1) return; // Optimal

      // Find leaving variable (minimum ratio test)
      let minRatio = Infinity;
      let row = -1;
      for (let i = 0; i < tableau.rows.length; i++) {
        const coeff = tableau.rows[i].coefficients[col];
        if (coeff > 0) {
          const ratio = tableau.rows[i].rhs / coeff;
          if (ratio < minRatio) {
            minRatio = ratio;
            row = i;
          }
        }
      }

      if (row === -1) return; // Unbounded

      setPivotRow(row);
      setPivotCol(col);
      setPivotValue(tableau.rows[row].coefficients[col]);
    };

    const variableNames = ['x', 'y', 's₁', 's₂'];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Pivot Element Visualizer
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
                    <tr key={idx} className={pivotRow === idx ? 'bg-red-100 dark:bg-red-900/30' : ''}>
                      <td className="px-2 py-1 border dark:border-gray-600 font-medium">{row.basic}</td>
                      {row.coefficients.map((coef, cidx) => (
                        <td key={cidx} className={clsx(
                          "px-2 py-1 border dark:border-gray-600 text-center",
                          pivotRow === idx && pivotCol === cidx && 'bg-yellow-300 dark:bg-yellow-600 font-bold text-black'
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
                        pivotCol === idx && 'bg-green-100 dark:bg-green-900/30'
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
              onClick={findPivot}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 w-full"
            >
              Find Pivot Element
            </button>
          </div>

          <div>
            {pivotRow !== null && pivotCol !== null && pivotValue !== null && (
              <>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500 mb-3">
                  <h5 className="font-semibold text-green-700 dark:text-green-400">Entering Variable</h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {variableNames[pivotCol]} enters the basis
                  </p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500 mb-3">
                  <h5 className="font-semibold text-red-700 dark:text-red-400">Leaving Variable</h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {tableau.rows[pivotRow].basic} leaves the basis
                  </p>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                  <h5 className="font-semibold text-yellow-700 dark:text-yellow-400">Pivot Element</h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Value: <span className="font-bold text-lg">{pivotValue}</span>
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Location: Row {tableau.rows[pivotRow].basic}, Column {variableNames[pivotCol]}
                  </p>
                </div>
              </>
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
            Pivot Element
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn about the pivot element, its identification, and its crucial role in 
            transforming the simplex tableau during each iteration.
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
                  ? "bg-yellow-600 text-white shadow-lg shadow-yellow-200 dark:shadow-yellow-900/30"
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
              {/* What is a Pivot Element? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is a Pivot Element?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  The pivot element is the key number in the simplex tableau that determines how 
                  the entering and leaving variables are exchanged. It is located at the intersection 
                  of the entering variable's column and the leaving variable's row. The pivot element 
                  must be positive and is used in row operations to transform the tableau.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Properties</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Intersection of entering column and leaving row</li>
                      <li>Must be positive</li>
                      <li>Used in row operations</li>
                      <li>Determines the exchange of variables</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why It Matters</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Enables variable exchange</li>
                      <li>Transforms the tableau</li>
                      <li>Improves objective value</li>
                      <li>Maintains feasibility</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Find the Pivot Element */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Find the Pivot Element
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg">
                    <div className="text-4xl mb-2">📊</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 1</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Find entering variable (most negative Z coefficient)</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg">
                    <div className="text-4xl mb-2">📏</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 2</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Find leaving variable (minimum ratio test)</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg">
                    <div className="text-4xl mb-2">🎯</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 3</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Pivot = coefficient at intersection</p>
                  </div>
                </div>
              </div>

              {/* Interactive Pivot Visualizer */}
              <PivotVisualizer />

              {/* Pivot Operation Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Steps for Pivot Operation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 1: Normalize Pivot Row</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Divide entire pivot row by the pivot element to make it 1.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Row ÷ pivot → pivot becomes 1
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 2: Eliminate Pivot Column</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Make all other entries in the pivot column zero.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Row = Row - (coefficient) × Pivot Row
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 3: Update Z Row</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Apply the same operation to the Z row.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Z = Z - (Z coefficient) × Pivot Row
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 4: Update Basic Variables</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Replace leaving variable with entering variable in B column.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      B: s₁ → x
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Pivot Operations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Always check pivot is positive</li>
                      <li>Use exact fractions for accuracy</li>
                      <li>Verify row operations carefully</li>
                      <li>Check pivot column becomes identity</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Using non-positive pivot</li>
                      <li>Incorrect row operations</li>
                      <li>Forgetting to update Z row</li>
                      <li>Not updating basic variables</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Entering variable identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Leaving variable identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Pivot element is positive</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Pivot row normalized correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Pivot column eliminated</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Basic variables updated</span>
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
                        className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all duration-300"
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
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                  💡 Tips for Pivot Operations
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Find pivot:</span> Entering column + leaving row</li>
                  <li><span className="font-medium">Normalize:</span> Divide pivot row by pivot value</li>
                  <li><span className="font-medium">Eliminate:</span> Make pivot column identity</li>
                  <li><span className="font-medium">Update:</span> Replace basic variable in B column</li>
                  <li><span className="font-medium">Verify:</span> Check pivot column has 1 and 0s</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Pivot Element FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Pivot Element"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The pivot element is the engine of the Simplex Method. I tell my students that finding the pivot is like finding the 'center of gravity' for the next iteration. The pivot must be positive, and the row operations around it transform the tableau. The key is to be methodical: identify entering and leaving variables first, then perform the pivot operation carefully. One mistake in row operations can lead to incorrect results." />
        </div>
      </div>
    </div>
  );
};

export default Topic7;