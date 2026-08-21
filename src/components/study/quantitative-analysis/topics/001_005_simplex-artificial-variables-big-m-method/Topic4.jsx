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
      title: 'Example 1: Artificial Variable for ≥ Constraint',
      problem: 'Convert to standard form using artificial variables:\nMinimize Z = 4x + 3y\nSubject to:\nx + y ≥ 6\n2x + y ≥ 8\nx ≥ 0, y ≥ 0',
      solution: 'Minimize Z = 4x + 3y + M a₁ + M a₂\nSubject to:\nx + y - s₁ + a₁ = 6\n2x + y - s₂ + a₂ = 8\nx, y, s₁, s₂, a₁, a₂ ≥ 0',
      detailedSolution: 'Step 1: Convert minimization to maximization\nMin Z = 4x + 3y → Max Z\' = -4x - 3y\n\nStep 2: Identify ≥ constraints\nx + y ≥ 6\n2x + y ≥ 8\n\nStep 3: Add surplus variables (subtract)\nx + y - s₁ = 6\n2x + y - s₂ = 8\n\nStep 4: Add artificial variables (add)\nx + y - s₁ + a₁ = 6\n2x + y - s₂ + a₂ = 8\n\nStep 5: Objective with Big-M penalty\nMax Z\' = -4x - 3y + 0s₁ + 0s₂ - M a₁ - M a₂\n(or Min Z = 4x + 3y + M a₁ + M a₂)\n\nStep 6: Interpret artificial variables\na₁ and a₂ are temporary variables that must be driven to zero'
    },
    {
      id: 2,
      title: 'Example 2: Artificial Variable for Equality Constraint',
      problem: 'Convert to standard form using artificial variables:\nMinimize Z = 5x + 7y\nSubject to:\n3x + 2y = 18\n2x + 4y ≥ 16\nx ≥ 0, y ≥ 0',
      solution: 'Minimize Z = 5x + 7y + M a₁ + M a₂\nSubject to:\n3x + 2y + a₁ = 18\n2x + 4y - s₁ + a₂ = 16\nx, y, s₁, a₁, a₂ ≥ 0',
      detailedSolution: 'Step 1: Identify constraint types\n- 3x + 2y = 18 → equality constraint\n- 2x + 4y ≥ 16 → ≥ constraint\n\nStep 2: Handle equality constraint\n3x + 2y = 18 → add artificial variable a₁\n3x + 2y + a₁ = 18\n\nStep 3: Handle ≥ constraint\n2x + 4y ≥ 16 → subtract surplus, add artificial\n2x + 4y - s₁ + a₂ = 16\n\nStep 4: Objective with Big-M penalty\nMinimize Z = 5x + 7y + 0s₁ + M a₁ + M a₂\n\nStep 5: Interpret\na₁ and a₂ are artificial variables that must be driven to zero'
    },
    {
      id: 3,
      title: 'Example 3: Two-Phase Method with Artificial Variables',
      problem: 'Convert to standard form for Two-Phase Method:\nMinimize Z = 3x + 4y\nSubject to:\n2x + y ≥ 10\nx + 3y ≥ 12\nx ≥ 0, y ≥ 0',
      solution: 'Phase 1: Minimize W = a₁ + a₂\nSubject to:\n2x + y - s₁ + a₁ = 10\nx + 3y - s₂ + a₂ = 12\nx, y, s₁, s₂, a₁, a₂ ≥ 0\n\nPhase 2: Use feasible solution from Phase 1',
      detailedSolution: 'Step 1: Phase 1 objective\nMinimize sum of artificial variables\nMinimize W = a₁ + a₂\n\nStep 2: Phase 1 constraints\n2x + y - s₁ + a₁ = 10\nx + 3y - s₂ + a₂ = 12\n\nStep 3: Solve Phase 1\nDrive a₁ and a₂ to zero\n\nStep 4: Phase 2 objective\nUse original objective without artificial variables\nMinimize Z = 3x + 4y\n\nStep 5: Phase 2 constraints\nUse constraints without artificial variables\n2x + y - s₁ = 10\nx + 3y - s₂ = 12'
    },
    {
      id: 4,
      title: 'Example 4: Real-World Artificial Variables',
      problem: 'A company must meet minimum production targets:\nMinimize Z = 8x + 10y\nSubject to:\n3x + 2y ≥ 30 (Production)\n2x + 5y = 40 (Quality target)\nx ≥ 0, y ≥ 0\n\nConvert to standard form using artificial variables.',
      solution: 'Minimize Z = 8x + 10y + M a₁ + M a₂\nSubject to:\n3x + 2y - s₁ + a₁ = 30\n2x + 5y + a₂ = 40\nx, y, s₁, a₁, a₂ ≥ 0',
      detailedSolution: 'Step 1: Identify constraint types\n- 3x + 2y ≥ 30 → ≥ constraint\n- 2x + 5y = 40 → equality constraint\n\nStep 2: Handle ≥ constraint\n3x + 2y ≥ 30 → subtract surplus, add artificial\n3x + 2y - s₁ + a₁ = 30\n\nStep 3: Handle equality constraint\n2x + 5y = 40 → add artificial variable a₂\n2x + 5y + a₂ = 40\n\nStep 4: Objective with Big-M penalty\nMinimize Z = 8x + 10y + 0s₁ + M a₁ + M a₂\n\nStep 5: Business interpretation\na₁: artificial for production requirement\na₂: artificial for quality target\nBoth must be driven to zero for feasible solution'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Add Artificial Variables',
      problem: 'Convert to standard form using artificial variables:\nMinimize Z = 3x + 5y\nSubject to:\nx + 2y ≥ 10\n3x + y ≥ 12\nx ≥ 0, y ≥ 0',
      hint: 'Add surplus and artificial variables for each ≥ constraint.',
      solution: 'Minimize Z = 3x + 5y + M a₁ + M a₂\nSubject to:\nx + 2y - s₁ + a₁ = 10\n3x + y - s₂ + a₂ = 12\nx, y, s₁, s₂, a₁, a₂ ≥ 0'
    },
    {
      id: 2,
      title: 'Artificial Variables for Equality',
      problem: 'Convert to standard form using artificial variables:\nMinimize Z = 4x + 6y\nSubject to:\n2x + 3y = 12\nx + 4y ≥ 8\nx ≥ 0, y ≥ 0',
      hint: 'Use artificial variables for equality and ≥ constraints.',
      solution: 'Minimize Z = 4x + 6y + M a₁ + M a₂\nSubject to:\n2x + 3y + a₁ = 12\nx + 4y - s₁ + a₂ = 8\nx, y, s₁, a₁, a₂ ≥ 0'
    },
    {
      id: 3,
      title: 'Mixed Constraints with Artificials',
      problem: 'Convert to standard form:\nMaximize Z = 5x + 7y\nSubject to:\n3x + 2y ≤ 18\nx + 4y ≥ 12\n2x + 3y = 15\nx ≥ 0, y ≥ 0',
      hint: 'Use slack for ≤, surplus+artificial for ≥, artificial for =.',
      solution: 'Maximize Z = 5x + 7y + 0s₁ + 0s₂ - M a₁ - M a₂\nSubject to:\n3x + 2y + s₁ = 18\nx + 4y - s₂ + a₁ = 12\n2x + 3y + a₂ = 15\nx, y, s₁, s₂, a₁, a₂ ≥ 0'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Artificial Variable Visualizer
  const ArtificialVariableVisualizer = () => {
    const [constraintType, setConstraintType] = useState('ge');
    const [a1, setA1] = useState(2);
    const [b1, setB1] = useState(3);
    const [c1, setC1] = useState(12);

    const getStandardForm = () => {
      let result = 'Minimize Z = c₁x + c₂y';
      if (constraintType === 'ge') {
        result += `\nSubject to:\n${a1}x + ${b1}y - s₁ + a₁ = ${c1}\n`;
        result += 'x, y, s₁, a₁ ≥ 0';
        result += '\n\nArtificial variable a₁ (penalty M)';
      } else if (constraintType === 'eq') {
        result += `\nSubject to:\n${a1}x + ${b1}y + a₁ = ${c1}\n`;
        result += 'x, y, a₁ ≥ 0';
        result += '\n\nArtificial variable a₁ (penalty M)';
      } else {
        result += `\nSubject to:\n${a1}x + ${b1}y + s₁ = ${c1}\n`;
        result += 'x, y, s₁ ≥ 0';
        result += '\n\nNo artificial variable needed (≤ constraint)';
      }
      return result;
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Artificial Variable Visualizer
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Constraint Type</label>
                <div className="flex gap-2">
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
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Coefficient a (x)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={a1}
                  onChange={(e) => setA1(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{a1}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Coefficient b (y)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={b1}
                  onChange={(e) => setB1(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{b1}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Constant c</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={c1}
                  onChange={(e) => setC1(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">{c1}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Standard Form</h5>
              <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {getStandardForm()}
              </pre>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Why Artificial Variables?</span>
              </p>
              <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 mt-1">
                {constraintType === 'ge' && (
                  <>
                    <li>≥ constraint requires surplus variable (-s)</li>
                    <li>Surplus variable creates infeasible initial solution</li>
                    <li>Artificial variable (a₁) provides feasible starting point</li>
                    <li>Penalty M drives a₁ to zero in optimal solution</li>
                  </>
                )}
                {constraintType === 'eq' && (
                  <>
                    <li>Equality constraint has no slack/surplus</li>
                    <li>Need artificial variable for initial basis</li>
                    <li>Penalty M drives a₁ to zero</li>
                  </>
                )}
                {constraintType === 'le' && (
                  <>
                    <li>≤ constraint uses slack variable (+s)</li>
                    <li>Slack variable provides feasible initial solution</li>
                    <li>No artificial variable needed</li>
                  </>
                )}
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
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Artificial Variables
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn about artificial variables, their purpose in handling ≥ and = constraints, 
            and their role in the Big-M Method and Two-Phase Method.
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
              {/* What are Artificial Variables? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What are Artificial Variables?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Artificial variables are temporary variables added to ≥ and = constraints to create 
                  an initial basic feasible solution for the Simplex Method. They are not part of the 
                  original problem and must be driven to zero in the optimal solution. Artificial 
                  variables are penalized in the objective function using a large number M (Big-M Method).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Concepts</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Temporary variables for feasibility</li>
                      <li>Added to ≥ and = constraints</li>
                      <li>Penalized in objective (Big-M)</li>
                      <li>Must be driven to zero</li>
                      <li>Used in Big-M and Two-Phase methods</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why They Matter</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Enable Simplex for ≥ and = constraints</li>
                      <li>Create initial feasible solution</li>
                      <li>Foundation for Big-M Method</li>
                      <li>Essential for Two-Phase Method</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* When to Use Artificial Variables */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  When to Use Artificial Variables
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">≥ Constraints</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Subtract surplus variable, add artificial variable.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      x + y ≥ 6<br/>
                      → x + y - s + a = 6
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">= Constraints</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add artificial variable directly.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      2x + y = 10<br/>
                      → 2x + y + a = 10
                    </div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">≤ Constraints</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add slack variable only.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      3x + 2y ≤ 12<br/>
                      → 3x + 2y + s = 12
                    </div>
                  </div>
                </div>
              </div>

              {/* Big-M Method vs Two-Phase Method */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Big-M Method vs Two-Phase Method
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Big-M Method</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>One phase only</li>
                      <li>Penalty M in objective</li>
                      <li>M is a very large number</li>
                      <li>Artificial variables penalized</li>
                      <li>Can cause numerical issues</li>
                    </ul>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Min Z = c₁x + c₂y + M a₁ + M a₂
                    </div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Two-Phase Method</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Two phases</li>
                      <li>Phase 1: Minimize sum of artificials</li>
                      <li>Phase 2: Use original objective</li>
                      <li>No numerical issues with M</li>
                      <li>More robust computationally</li>
                    </ul>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Phase 1: Min W = a₁ + a₂<br/>
                      Phase 2: Min Z = c₁x + c₂y
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Visualizer */}
              <ArtificialVariableVisualizer />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Artificial Variables
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Artificial variables must be driven to zero</li>
                      <li>Use M much larger than any coefficient</li>
                      <li>In Two-Phase, Phase 1 W must reach 0</li>
                      <li>If artificial remains > 0 → infeasible</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Forgetting to add artificial variables</li>
                      <li>Not penalizing artificials in objective</li>
                      <li>Using too small M value</li>
                      <li>Not checking if artificials remain</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">≥ constraints identified for artificials</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">= constraints identified for artificials</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Artificial variables added correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Big-M penalty in objective</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Artificial variables ≥ 0</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Plan to drive artificials to zero</span>
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
                        <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Original Problem</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.problem}
                        </pre>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">With Artificial Variables</h5>
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
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                  💡 Tips for Working with Artificial Variables
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Identify constraint types:</span> ≥ and = need artificials</li>
                  <li><span className="font-medium">Use Big-M penalty:</span> Add M × artificial to objective</li>
                  <li><span className="font-medium">Choose M large:</span> M must be bigger than any other coefficient</li>
                  <li><span className="font-medium">Drive to zero:</span> Optimal solution must have artificials = 0</li>
                  <li><span className="font-medium">Check feasibility:</span> If artificial remains > 0 → infeasible</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Artificial Variables FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Artificial Variables"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Artificial variables are like 'training wheels' for the Simplex Method. I tell my students that they're temporary helpers that get us started when the problem doesn't have a natural feasible solution. The key is remembering that artificial variables are NOT part of the original problem - they must be driven to zero. If an artificial variable remains positive at the end, the problem is infeasible. This is an important diagnostic tool." />
        </div>
      </div>
    </div>
  );
};

export default Topic4;