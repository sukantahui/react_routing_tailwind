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
      title: 'Example 1: Basic Simplex Tableau',
      problem: 'Construct the initial simplex tableau for:\nMaximize Z = 3x + 2y\nSubject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx, y ≥ 0',
      solution: 'Initial tableau:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │  s₁ │  s₂ │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  2  │  1  │  1  │  0  │ 10  │\n│ s₂  │  1  │  2  │  0  │  1  │  8  │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -3  │ -2  │  0  │  0  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┘',
      detailedSolution: 'Step 1: Convert to standard form\nMaximize Z = 3x + 2y + 0s₁ + 0s₂\nSubject to:\n2x + y + s₁ = 10\nx + 2y + s₂ = 8\nx, y, s₁, s₂ ≥ 0\n\nStep 2: Identify variables\nDecision variables: x, y\nSlack variables: s₁, s₂\n\nStep 3: Set up tableau columns\nColumns: Basic variables (B), x, y, s₁, s₂, RHS\n\nStep 4: Write constraint rows\nRow 1 (s₁): 2x + 1y + 1s₁ + 0s₂ = 10\nRow 2 (s₂): 1x + 2y + 0s₁ + 1s₂ = 8\n\nStep 5: Write Z row\nZ - 3x - 2y = 0\nZ row: [-3, -2, 0, 0, 0]\n\nStep 6: Identify basic variables\nBasic variables: s₁ = 10, s₂ = 8'
    },
    {
      id: 2,
      title: 'Example 2: Tableau with Minimization',
      problem: 'Construct the initial simplex tableau for:\nMinimize Z = 4x + 3y\nSubject to:\nx + y ≥ 6\n2x + y ≥ 8\nx, y ≥ 0\n\n(Use Big-M Method)',
      solution: 'Initial tableau with Big-M:\n┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ a₁  │ a₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│ a₁  │  1  │  1  │ -1  │  0  │  1  │  0  │  6  │\n│ a₂  │  2  │  1  │  0  │ -1  │  0  │  1  │  8  │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -4  │ -3  │  0  │  0  │  M  │  M  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘',
      detailedSolution: 'Step 1: Convert to standard form\nMin Z = 4x + 3y → Max Z\' = -4x - 3y\n\nStep 2: Add surplus and artificial variables\nx + y - s₁ + a₁ = 6\n2x + y - s₂ + a₂ = 8\n\nStep 3: Objective with Big-M\nMax Z\' = -4x - 3y - M a₁ - M a₂\n\nStep 4: Set up tableau\nColumns: B, x, y, s₁, s₂, a₁, a₂, RHS\n\nStep 5: Constraint rows\nRow 1 (a₁): x + y - s₁ + a₁ = 6\nRow 2 (a₂): 2x + y - s₂ + a₂ = 8\n\nStep 6: Z row\nZ\' + 4x + 3y + M a₁ + M a₂ = 0\nZ row: [-4, -3, 0, 0, M, M, 0]'
    },
    {
      id: 3,
      title: 'Example 3: Tableau with Mixed Constraints',
      problem: 'Construct the initial simplex tableau for:\nMaximize Z = 5x + 7y\nSubject to:\n3x + 2y ≤ 18\n2x + 4y ≥ 20\nx + 3y = 15\nx, y ≥ 0',
      solution: 'Initial tableau with Big-M:\n┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ a₁  │ a₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  3  │  2  │  1  │  0  │  0  │  0  │ 18  │\n│ a₁  │  2  │  4  │  0  │ -1  │  1  │  0  │ 20  │\n│ a₂  │  1  │  3  │  0  │  0  │  0  │  1  │ 15  │\n├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -5  │ -7  │  0  │  0  │  M  │  M  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘',
      detailedSolution: 'Step 1: Identify constraint types\n- 3x + 2y ≤ 18 → slack (s₁)\n- 2x + 4y ≥ 20 → surplus + artificial (s₂, a₁)\n- x + 3y = 15 → artificial (a₂)\n\nStep 2: Convert to standard form\n3x + 2y + s₁ = 18\n2x + 4y - s₂ + a₁ = 20\nx + 3y + a₂ = 15\n\nStep 3: Objective with Big-M\nMax Z = 5x + 7y - M a₁ - M a₂\n\nStep 4: Set up tableau\nBasic variables: s₁, a₁, a₂\n\nStep 5: Z row\nZ - 5x - 7y + M a₁ + M a₂ = 0\nZ row: [-5, -7, 0, 0, M, M, 0]'
    },
    {
      id: 4,
      title: 'Example 4: Real-World Tableau Construction',
      problem: 'A factory produces chairs (x) and tables (y).\nMaximize Z = 40x + 50y\nSubject to:\n2x + 3y ≤ 120 (Labor)\n3x + 2y ≤ 90 (Wood)\nx ≥ 0, y ≥ 0\n\nConstruct the initial simplex tableau.',
      solution: 'Initial tableau:\n┌─────┬─────┬─────┬─────┬─────┬─────┐\n│  B  │  x  │  y  │ s₁  │ s₂  │ RHS │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│ s₁  │  2  │  3  │  1  │  0  │ 120 │\n│ s₂  │  3  │  2  │  0  │  1  │  90 │\n├─────┼─────┼─────┼─────┼─────┼─────┤\n│  Z  │ -40 │ -50 │  0  │  0  │  0  │\n└─────┴─────┴─────┴─────┴─────┴─────┘',
      detailedSolution: 'Step 1: Convert to standard form\nMaximize Z = 40x + 50y + 0s₁ + 0s₂\nSubject to:\n2x + 3y + s₁ = 120\n3x + 2y + s₂ = 90\nx, y, s₁, s₂ ≥ 0\n\nStep 2: Identify variables\nDecision variables: x (chairs), y (tables)\nSlack variables: s₁ (labor slack), s₂ (wood slack)\n\nStep 3: Set up tableau\nColumns: B, x, y, s₁, s₂, RHS\n\nStep 4: Constraint rows\nRow 1 (s₁): 2x + 3y + 1s₁ + 0s₂ = 120\nRow 2 (s₂): 3x + 2y + 0s₁ + 1s₂ = 90\n\nStep 5: Z row\nZ - 40x - 50y = 0\nZ row: [-40, -50, 0, 0, 0]\n\nStep 6: Initial basic variables\ns₁ = 120, s₂ = 90\nZ = 0'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Construct Tableau',
      problem: 'Construct the initial simplex tableau for:\nMaximize Z = 2x + 3y\nSubject to:\n4x + y ≤ 12\nx + 3y ≤ 9\nx, y ≥ 0',
      hint: 'Add slack variables and set up the tableau with basic variables.',
      solution: 'Tableau:\nB | x | y | s₁ | s₂ | RHS\ns₁| 4 | 1 | 1 | 0 | 12\ns₂| 1 | 3 | 0 | 1 | 9\nZ |-2 |-3 | 0 | 0 | 0'
    },
    {
      id: 2,
      title: 'Tableau with Minimization',
      problem: 'Construct the initial simplex tableau (Big-M) for:\nMinimize Z = 5x + 4y\nSubject to:\nx + 2y ≥ 10\n3x + y ≥ 12\nx, y ≥ 0',
      hint: 'Convert to maximization, add surplus and artificial variables.',
      solution: 'Tableau with Big-M:\nB | x | y | s₁ | s₂ | a₁ | a₂ | RHS\na₁| 1 | 2 |-1 | 0 | 1 | 0 | 10\na₂| 3 | 1 | 0 |-1 | 0 | 1 | 12\nZ |-5 |-4 | 0 | 0 | M | M | 0'
    },
    {
      id: 3,
      title: 'Tableau with Mixed Constraints',
      problem: 'Construct the initial simplex tableau for:\nMaximize Z = 6x + 8y\nSubject to:\n2x + 3y ≤ 24\nx + 5y ≥ 15\nx + 2y = 10\nx, y ≥ 0',
      hint: 'Use slack for ≤, surplus+artificial for ≥, artificial for =.',
      solution: 'Tableau with Big-M:\nB | x | y | s₁ | s₂ | a₁ | a₂ | RHS\ns₁| 2 | 3 | 1 | 0 | 0 | 0 | 24\na₁| 1 | 5 | 0 |-1 | 1 | 0 | 15\na₂| 1 | 2 | 0 | 0 | 0 | 1 | 10\nZ |-6 |-8 | 0 | 0 | M | M | 0'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Tableau Builder
  const TableauBuilder = () => {
    const [a1, setA1] = useState(2);
    const [b1, setB1] = useState(1);
    const [c1, setC1] = useState(10);
    const [a2, setA2] = useState(1);
    const [b2, setB2] = useState(2);
    const [c2, setC2] = useState(8);
    const [objectiveC1, setObjectiveC1] = useState(3);
    const [objectiveC2, setObjectiveC2] = useState(2);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Tableau Builder
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Constraint 1: {a1}x + {b1}y ≤ {c1}</label>
              <input type="range" min="1" max="10" value={a1} onChange={(e) => setA1(Number(e.target.value))} className="w-full"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Constraint 2: {a2}x + {b2}y ≤ {c2}</label>
              <input type="range" min="1" max="10" value={a2} onChange={(e) => setA2(Number(e.target.value))} className="w-full"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Objective: Z = {objectiveC1}x + {objectiveC2}y</label>
              <input type="range" min="1" max="10" value={objectiveC1} onChange={(e) => setObjectiveC1(Number(e.target.value))} className="w-full"/>
              <input type="range" min="1" max="10" value={objectiveC2} onChange={(e) => setObjectiveC2(Number(e.target.value))} className="w-full"/>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 overflow-x-auto">
              <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Initial Simplex Tableau</h5>
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
                  <tr>
                    <td className="px-2 py-1 border dark:border-gray-600 font-medium">s₁</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">{a1}</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">{b1}</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">1</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">0</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">{c1}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 border dark:border-gray-600 font-medium">s₂</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">{a2}</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">{b2}</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">0</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">1</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">{c2}</td>
                  </tr>
                  <tr className="bg-yellow-50 dark:bg-yellow-900/20">
                    <td className="px-2 py-1 border dark:border-gray-600 font-medium">Z</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">-{objectiveC1}</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">-{objectiveC2}</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">0</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">0</td>
                    <td className="px-2 py-1 border dark:border-gray-600 text-center">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-gray-600 dark:text-gray-400">
              Basic variables: s₁ = {c1}, s₂ = {c2}, Z = 0
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
            Initial Simplex Tableau
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to construct the initial simplex tableau, the starting point for the 
            Simplex Method algorithm.
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
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-purple-900/30"
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
              {/* What is the Initial Tableau? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is the Initial Simplex Tableau?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  The initial simplex tableau is a structured table that represents the LP problem 
                  in standard form. It organizes all coefficients of the constraints and objective 
                  function into a matrix format that can be manipulated through row operations. 
                  The tableau is the starting point for the Simplex Method iterations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Tableau Structure</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Columns for each variable</li>
                      <li>Rows for each constraint</li>
                      <li>Basic variables column (B)</li>
                      <li>Right-hand side (RHS) column</li>
                      <li>Objective function row (Z)</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why It Matters</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Organizes the problem systematically</li>
                      <li>Enables row operations</li>
                      <li>Shows initial basic feasible solution</li>
                      <li>Foundation for all iterations</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Build the Tableau */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Build the Initial Tableau
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg">
                    <div className="text-4xl mb-2">📝</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 1</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Convert to standard form</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg">
                    <div className="text-4xl mb-2">📋</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 2</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Identify basic variables</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg">
                    <div className="text-4xl mb-2">📊</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 3</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Write constraint rows</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg">
                    <div className="text-4xl mb-2">💰</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 4</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Write Z row</p>
                  </div>
                </div>
              </div>

              {/* Interactive Tableau Builder */}
              <TableauBuilder />

              {/* Tableau Layout Guide */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Tableau Layout Guide
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="px-4 py-2 border dark:border-gray-600 text-left">Part</th>
                        <th className="px-4 py-2 border dark:border-gray-600 text-left">Description</th>
                        <th className="px-4 py-2 border dark:border-gray-600 text-left">Example</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-4 py-2 border dark:border-gray-600 font-medium">B Column</td>
                        <td className="px-4 py-2 border dark:border-gray-600">Basic variables (initial: slack/artificial)</td>
                        <td className="px-4 py-2 border dark:border-gray-600 font-mono">s₁, s₂</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-4 py-2 border dark:border-gray-600 font-medium">Variable Columns</td>
                        <td className="px-4 py-2 border dark:border-gray-600">Coefficients for each variable</td>
                        <td className="px-4 py-2 border dark:border-gray-600 font-mono">x, y, s₁, s₂</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-4 py-2 border dark:border-gray-600 font-medium">RHS Column</td>
                        <td className="px-4 py-2 border dark:border-gray-600">Right-hand side values</td>
                        <td className="px-4 py-2 border dark:border-gray-600 font-mono">10, 8</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-4 py-2 border dark:border-gray-600 font-medium">Z Row</td>
                        <td className="px-4 py-2 border dark:border-gray-600">Objective coefficients (negative for max)</td>
                        <td className="px-4 py-2 border dark:border-gray-600 font-mono">-3, -2, 0, 0, 0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Building Tableaus
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>List variables in consistent order</li>
                      <li>Use clear notation for basic variables</li>
                      <li>Double-check all coefficients</li>
                      <li>Verify Z row signs (negative for max)</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Wrong signs in Z row</li>
                      <li>Forgetting slack variables</li>
                      <li>Incorrect basic variable identification</li>
                      <li>Misplacing coefficients</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Problem in standard form</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">All variables identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Basic variables correct</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Constraint rows complete</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Z row correct signs</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Initial solution feasible</span>
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
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Initial Tableau</h5>
                        <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.solution}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleExample(example.id)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300"
                      >
                        {showExample[example.id] ? 'Hide Construction Steps' : 'Show Construction Steps'}
                      </button>
                    </div>
                    {showExample[example.id] && (
                      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                        <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">📝 Construction Steps</h5>
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
                          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                            {problem.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
                  💡 Tips for Building Tableaus
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Be systematic:</span> Follow the steps in order</li>
                  <li><span className="font-medium">Check signs:</span> Z row uses negative coefficients for maximization</li>
                  <li><span className="font-medium">Verify basic variables:</span> They should form an identity matrix</li>
                  <li><span className="font-medium">Double-check RHS:</span> All values should be non-negative</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Initial Simplex Tableau FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Initial Simplex Tableau"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The initial simplex tableau is where the Simplex Method truly begins. I tell my students that constructing the tableau is like setting up a chess board - you need to place every piece correctly before you can start playing. The key is to be meticulous: one wrong coefficient or sign can lead to incorrect results. I encourage students to practice building tableaus until they can do it quickly and accurately." />
        </div>
      </div>
    </div>
  );
};

export default Topic5;