import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic8_files/topic8_questions';
import noteText from './topic8_files/topic8_note.txt?raw';

const Topic8 = () => {
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
      title: 'Example 1: Complete Iteration',
      problem: 'Perform one complete Simplex iteration on:\nMaximize Z = 3x + 2y\nSubject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx, y ≥ 0',
      solution: 'After iteration:\nx = 5, s₂ = 3, Z = 15\nNext entering variable: y (coefficient -0.5)',
      detailedSolution: 'Step 1: Initial tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  2  │  1  │  1  │  0  │ 10  │\n│ s₂  │  1  │  2  │  0  │  1  │  8  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -3  │ -2  │  0  │  0  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 2: Entering variable\nZ row: [-3, -2, 0, 0]\nMost negative: -3 → x enters\n\nStep 3: Leaving variable\nRatio test:\ns₁: 10/2 = 5\ns₂: 8/1 = 8\nMinimum: 5 → s₁ leaves\n\nStep 4: Pivot element\nPivot = 2 (s₁ row, x column)\n\nStep 5: Normalize pivot row\nRow 1: [2, 1, 1, 0, 10] ÷ 2\n→ [1, 0.5, 0.5, 0, 5]\n\nStep 6: Eliminate pivot column\nRow 2: [1, 2, 0, 1, 8] - 1 × Row 1\n→ [0, 1.5, -0.5, 1, 3]\n\nStep 7: Update Z row\nZ: [-3, -2, 0, 0, 0] + 3 × Row 1\n→ [0, -0.5, 1.5, 0, 15]\n\nStep 8: Update basic variables\nB: s₁ → x\n\nStep 9: New tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  x  │  1  │ 0.5 │ 0.5 │  0  │  5  │\n│ s₂  │  0  │ 1.5 │-0.5 │  1  │  3  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  0  │-0.5 │ 1.5 │  0  │ 15  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 10: Check optimality\nZ row has negative coefficient (-0.5) → not optimal'
    },
    {
      id: 2,
      title: 'Example 2: Multiple Iterations',
      problem: 'Starting from the tableau in Example 1, perform the second iteration.',
      solution: 'After second iteration:\nx = 4, y = 2, Z = 16 (optimal)',
      detailedSolution: 'Step 1: Current tableau from Example 1\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  x  │  1  │ 0.5 │ 0.5 │  0  │  5  │\n│ s₂  │  0  │ 1.5 │-0.5 │  1  │  3  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  0  │-0.5 │ 1.5 │  0  │ 15  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 2: Entering variable\nZ row: [0, -0.5, 1.5, 0]\nMost negative: -0.5 → y enters\n\nStep 3: Leaving variable\nRatio test:\nx row: 5/0.5 = 10\ns₂ row: 3/1.5 = 2\nMinimum: 2 → s₂ leaves\n\nStep 4: Pivot element\nPivot = 1.5 (s₂ row, y column)\n\nStep 5: Normalize pivot row\nRow 2: [0, 1.5, -0.5, 1, 3] ÷ 1.5\n→ [0, 1, -0.333, 0.667, 2]\n\nStep 6: Eliminate pivot column\nRow 1: [1, 0.5, 0.5, 0, 5] - 0.5 × Row 2\n→ [1, 0, 0.667, -0.333, 4]\n\nStep 7: Update Z row\nZ: [0, -0.5, 1.5, 0, 15] + 0.5 × Row 2\n→ [0, 0, 1.333, 0.333, 16]\n\nStep 8: Update basic variables\nB: s₂ → y\n\nStep 9: New tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  x  │  1  │  0  │0.667│-0.333│  4  │\n│  y  │  0  │  1  │-0.333│0.667│  2  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │  0  │  0  │1.333│0.333│ 16  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 10: Check optimality\nAll Z row coefficients ≥ 0 → Optimal!\nOptimal solution: x = 4, y = 2, Z = 16'
    },
    {
      id: 3,
      title: 'Example 3: Iteration with Big-M Method',
      problem: 'Perform one iteration of the Simplex Method with Big-M:\nMinimize Z = 4x + 3y\nSubject to:\nx + y ≥ 6\n2x + y ≥ 8\nx, y ≥ 0',
      solution: 'After iteration: a₁ = 2, a₂ = 0, Z\' = -6M - 8',
      detailedSolution: 'Step 1: Initial tableau with Big-M\n┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ a₁  │ a₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│ a₁  │  1  │  1  │ -1  │  0  │  1  │  0  │  6  │\n│ a₂  │  2  │  1  │  0  │ -1  │  0  │  1  │  8  │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -4  │ -3  │  0  │  0  │  M  │  M  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 2: Entering variable\nZ row: [-4, -3, 0, 0, M, M]\nMost negative: -4 → x enters\n\nStep 3: Leaving variable\nRatio test:\na₁: 6/1 = 6\na₂: 8/2 = 4\nMinimum: 4 → a₂ leaves\n\nStep 4: Pivot element\nPivot = 2 (a₂ row, x column)\n\nStep 5: Normalize pivot row\nRow 2: [2, 1, 0, -1, 0, 1, 8] ÷ 2\n→ [1, 0.5, 0, -0.5, 0, 0.5, 4]\n\nStep 6: Eliminate pivot column\nRow 1: [1, 1, -1, 0, 1, 0, 6] - 1 × Row 2\n→ [0, 0.5, -1, 0.5, 1, -0.5, 2]\n\nStep 7: Update Z row\nZ: [-4, -3, 0, 0, M, M, 0] + 4 × Row 2\n→ [0, -1, 0, -2, M, M+2, 16]\n\nStep 8: Update basic variables\nB: a₂ → x'
    },
    {
      id: 4,
      title: 'Example 4: Real-World Iteration',
      problem: 'A factory produces chairs (x) and tables (y).\nMaximize Z = 40x + 50y\nSubject to:\n2x + 3y ≤ 120\n3x + 2y ≤ 90\nx, y ≥ 0\n\nPerform the first iteration.',
      solution: 'After first iteration:\ny = 40, s₂ = 10, Z = 2000\nNext entering variable: x',
      detailedSolution: 'Step 1: Initial tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  2  │  3  │  1  │  0  │ 120 │\n│ s₂  │  3  │  2  │  0  │  1  │  90 │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -40 │ -50 │  0  │  0  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 2: Entering variable\nZ row: [-40, -50, 0, 0]\nMost negative: -50 → y enters\n\nStep 3: Leaving variable\nRatio test:\ns₁: 120/3 = 40\ns₂: 90/2 = 45\nMinimum: 40 → s₁ leaves\n\nStep 4: Pivot element\nPivot = 3 (s₁ row, y column)\n\nStep 5: Normalize pivot row\nRow 1: [2, 3, 1, 0, 120] ÷ 3\n→ [2/3, 1, 1/3, 0, 40]\n\nStep 6: Eliminate pivot column\nRow 2: [3, 2, 0, 1, 90] - 2 × Row 1\n→ [5/3, 0, -2/3, 1, 10]\n\nStep 7: Update Z row\nZ: [-40, -50, 0, 0, 0] + 50 × Row 1\n→ [-20/3, 0, 50/3, 0, 2000]\n\nStep 8: Update basic variables\nB: s₁ → y\n\nStep 9: New tableau\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  y  │ 2/3 │  1  │ 1/3 │  0  │ 40  │\n│ s₂  │ 5/3 │  0  │-2/3 │  1  │ 10  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │-20/3│  0  │50/3 │  0  │2000 │\n└─────┴─────┴─────┴─────┴─────┴─────┘\n\nStep 10: Continue iterations\nZ row has negative coefficient -20/3 → not optimal'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Complete One Iteration',
      problem: 'Perform one complete Simplex iteration:\nMaximize Z = 2x + 3y\nSubject to:\n4x + y ≤ 12\nx + 3y ≤ 9\nx, y ≥ 0',
      hint: 'Find entering variable (most negative Z), leaving variable (min ratio), then pivot.',
      solution: 'After iteration: y = 3, s₁ = 9, Z = 9\nNext entering variable: x'
    },
    {
      id: 2,
      title: 'Multiple Iterations',
      problem: 'Continue from Problem 1. Perform the second iteration.',
      hint: 'Use the tableau from Problem 1 and repeat the process.',
      solution: 'After second iteration: x = 2, y = 1, Z = 7 (optimal)'
    },
    {
      id: 3,
      title: 'Complete Iteration with Fractions',
      problem: 'Perform one complete iteration:\nMaximize Z = 5x + 4y\nSubject to:\n3x + 2y ≤ 18\nx + 4y ≤ 16\nx, y ≥ 0',
      hint: 'Entering variable: x (most negative -5). Leaving variable: min ratio test.',
      solution: 'After iteration: x = 6, s₂ = 10, Z = 30'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Iteration Simulator
  const IterationSimulator = () => {
    const [iteration, setIteration] = useState(0);
    const [currentTableau, setCurrentTableau] = useState({
      rows: [
        { basic: 's₁', coefficients: [2, 1, 1, 0], rhs: 10 },
        { basic: 's₂', coefficients: [1, 2, 0, 1], rhs: 8 }
      ],
      zRow: [-3, -2, 0, 0, 0],
      basicVars: ['s₁', 's₂']
    });
    const [isOptimal, setIsOptimal] = useState(false);

    const performIteration = () => {
      // Find entering variable
      let min = 0;
      let enterCol = -1;
      for (let i = 0; i < currentTableau.zRow.length - 1; i++) {
        if (currentTableau.zRow[i] < min) {
          min = currentTableau.zRow[i];
          enterCol = i;
        }
      }

      if (enterCol === -1) {
        setIsOptimal(true);
        return;
      }

      // Find leaving variable
      let minRatio = Infinity;
      let leaveRow = -1;
      for (let i = 0; i < currentTableau.rows.length; i++) {
        const coeff = currentTableau.rows[i].coefficients[enterCol];
        if (coeff > 0) {
          const ratio = currentTableau.rows[i].rhs / coeff;
          if (ratio < minRatio) {
            minRatio = ratio;
            leaveRow = i;
          }
        }
      }

      if (leaveRow === -1) {
        alert('Unbounded solution!');
        return;
      }

      const pivot = currentTableau.rows[leaveRow].coefficients[enterCol];
      const newRows = currentTableau.rows.map((row, idx) => {
        if (idx === leaveRow) {
          // Normalize pivot row
          return {
            basic: ['x', 'y', 's₁', 's₂'][enterCol],
            coefficients: row.coefficients.map(c => c / pivot),
            rhs: row.rhs / pivot
          };
        } else {
          // Eliminate pivot column
          const factor = row.coefficients[enterCol];
          return {
            basic: row.basic,
            coefficients: row.coefficients.map((c, j) => 
              c - factor * newRows[leaveRow].coefficients[j]
            ),
            rhs: row.rhs - factor * newRows[leaveRow].rhs
          };
        }
      });

      // Update Z row
      const factor = currentTableau.zRow[enterCol];
      const newZRow = currentTableau.zRow.map((c, j) => 
        c - factor * newRows[leaveRow].coefficients[j]
      );

      setCurrentTableau({
        rows: newRows,
        zRow: newZRow,
        basicVars: newRows.map(r => r.basic)
      });
      setIteration(iteration + 1);
      setIsOptimal(false);
    };

    const resetSimulator = () => {
      setCurrentTableau({
        rows: [
          { basic: 's₁', coefficients: [2, 1, 1, 0], rhs: 10 },
          { basic: 's₂', coefficients: [1, 2, 0, 1], rhs: 8 }
        ],
        zRow: [-3, -2, 0, 0, 0],
        basicVars: ['s₁', 's₂']
      });
      setIteration(0);
      setIsOptimal(false);
    };

    const variableNames = ['x', 'y', 's₁', 's₂'];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Iteration Simulator
        </h4>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Iteration: {iteration}
          </span>
          <div className="flex gap-2">
            <button
              onClick={performIteration}
              disabled={isOptimal}
              className={clsx(
                "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                isOptimal
                  ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
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

        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr className="text-gray-600 dark:text-gray-400">
                <th className="px-2 py-1 border dark:border-gray-600">B</th>
                {variableNames.map(name => (
                  <th key={name} className="px-2 py-1 border dark:border-gray-600">{name}</th>
                ))}
                <th className="px-2 py-1 border dark:border-gray-600">RHS</th>
              </tr>
            </thead>
            <tbody>
              {currentTableau.rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="px-2 py-1 border dark:border-gray-600 font-medium">{row.basic}</td>
                  {row.coefficients.map((coef, cidx) => (
                    <td key={cidx} className="px-2 py-1 border dark:border-gray-600 text-center">
                      {Number.isInteger(coef) ? coef : coef.toFixed(3)}
                    </td>
                  ))}
                  <td className="px-2 py-1 border dark:border-gray-600 text-center">
                    {Number.isInteger(row.rhs) ? row.rhs : row.rhs.toFixed(3)}
                  </td>
                </tr>
              ))}
              <tr className="bg-yellow-50 dark:bg-yellow-900/20">
                <td className="px-2 py-1 border dark:border-gray-600 font-medium">Z</td>
                {currentTableau.zRow.map((coef, idx) => (
                  <td key={idx} className="px-2 py-1 border dark:border-gray-600 text-center">
                    {Number.isInteger(coef) ? coef : coef.toFixed(3)}
                  </td>
                ))}
                <td className="px-2 py-1 border dark:border-gray-600 text-center">
                  {currentTableau.zRow[currentTableau.zRow.length - 1]}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {isOptimal && (
          <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-sm font-semibold text-green-700 dark:text-green-400">
              ✅ Optimal Solution Reached!
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Z = {currentTableau.zRow[currentTableau.zRow.length - 1]}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Iteration Procedure
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn the complete iterative process of the Simplex Method, from one tableau 
            to the next, until optimality is reached.
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
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
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
              {/* What is the Iteration Procedure? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is the Iteration Procedure?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  The iteration procedure is the step-by-step process of moving from one simplex 
                  tableau to the next. Each iteration improves the objective value and moves the 
                  solution closer to optimality. The procedure continues until no further improvement 
                  is possible (all Z row coefficients are non-negative for maximization).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Systematic and algorithmic</li>
                      <li>Improves Z each iteration</li>
                      <li>Moves to adjacent corner point</li>
                      <li>Stops at optimality</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why It Matters</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Drives the Simplex Method</li>
                      <li>Finds optimal solution</li>
                      <li>Handles any LP problem</li>
                      <li>Foundation for optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* The 8-Step Iteration Procedure */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  The 8-Step Iteration Procedure
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📊</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 1</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Find entering variable (most negative Z)</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📏</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 2</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Find leaving variable (minimum ratio test)</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">🎯</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 3</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Identify pivot element</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📋</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 4</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Normalize pivot row</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">✏️</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 5</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Eliminate pivot column</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">💰</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 6</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Update Z row</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">🔄</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 7</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Update basic variables</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">✅</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 8</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Check optimality (all Z ≥ 0)</p>
                  </div>
                </div>
              </div>

              {/* Interactive Iteration Simulator */}
              <IterationSimulator />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Iteration Procedure
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Be systematic - follow steps in order</li>
                      <li>Use exact fractions for accuracy</li>
                      <li>Check pivot column becomes identity</li>
                      <li>Verify Z improves each iteration</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Skipping steps in the procedure</li>
                      <li>Incorrect row operations</li>
                      <li>Forgetting to check optimality</li>
                      <li>Not updating basic variables correctly</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Entering variable found</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Leaving variable found</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Pivot element identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Pivot row normalized</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Pivot column eliminated</span>
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
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Result</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.solution}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleExample(example.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
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
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Iteration Procedure
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Follow the 8 steps:</span> Don't skip any step</li>
                  <li><span className="font-medium">Be precise:</span> Use fractions for accuracy</li>
                  <li><span className="font-medium">Check your work:</span> Verify pivot column is identity</li>
                  <li><span className="font-medium">Stop at optimality:</span> All Z coefficients ≥ 0</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Iteration Procedure FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Iteration Procedure"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic8_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The iteration procedure is the engine of the Simplex Method. I tell my students that each iteration is like a 'step' in a journey - you know you're making progress because Z keeps increasing. The key is to be methodical and check your work at each step. The most common mistake is rushing through row operations. Take your time and verify that the pivot column becomes an identity column after each iteration." />
        </div>
      </div>
    </div>
  );
};

export default Topic8;