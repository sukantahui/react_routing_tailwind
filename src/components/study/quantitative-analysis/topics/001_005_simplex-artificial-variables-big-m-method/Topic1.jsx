import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic1_files/topic1_questions';
import noteText from './topic1_files/topic1_note.txt?raw';

const Topic1 = () => {
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
      title: 'Example 1: Converting to Standard Form',
      problem: 'Convert the following LP problem to standard form:\nMaximize Z = 3x + 2y\nSubject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx ≥ 0, y ≥ 0',
      solution: 'Maximize Z = 3x + 2y + 0s₁ + 0s₂\nSubject to:\n2x + y + s₁ = 10\nx + 2y + s₂ = 8\nx, y, s₁, s₂ ≥ 0',
      detailedSolution: 'Step 1: Identify the type of problem\n- Maximization problem\n- All constraints are ≤\n- All variables ≥ 0\n\nStep 2: Convert inequalities to equalities\n- For each ≤ constraint, add a slack variable\n- 2x + y ≤ 10 → 2x + y + s₁ = 10\n- x + 2y ≤ 8 → x + 2y + s₂ = 8\n\nStep 3: Update the objective function\n- Add slack variables with coefficient 0\n- Z = 3x + 2y + 0s₁ + 0s₂\n\nStep 4: Write in standard form\nMaximize Z = 3x + 2y + 0s₁ + 0s₂\nSubject to:\n2x + y + s₁ = 10\nx + 2y + s₂ = 8\nx, y, s₁, s₂ ≥ 0'
    },
    {
      id: 2,
      title: 'Example 2: Minimization to Maximization',
      problem: 'Convert the following LP problem to standard form:\nMinimize Z = 4x + 3y\nSubject to:\nx + y ≥ 6\n2x + y ≥ 8\nx ≥ 0, y ≥ 0',
      solution: 'Maximize Z\' = -4x - 3y\nSubject to:\nx + y - s₁ = 6\n2x + y - s₂ = 8\nx, y, s₁, s₂ ≥ 0',
      detailedSolution: 'Step 1: Convert minimization to maximization\n- Minimize Z = 4x + 3y\n- Equivalent to: Maximize Z\' = -4x - 3y\n\nStep 2: Convert ≥ constraints to equalities\n- For each ≥ constraint, subtract a surplus variable\n- x + y ≥ 6 → x + y - s₁ = 6\n- 2x + y ≥ 8 → 2x + y - s₂ = 8\n\nStep 3: Update the objective function\n- Z\' = -4x - 3y + 0s₁ + 0s₂\n\nStep 4: Write in standard form\nMaximize Z\' = -4x - 3y + 0s₁ + 0s₂\nSubject to:\nx + y - s₁ = 6\n2x + y - s₂ = 8\nx, y, s₁, s₂ ≥ 0'
    },
    {
      id: 3,
      title: 'Example 3: Mixed Constraints',
      problem: 'Convert the following LP problem to standard form:\nMaximize Z = 5x + 7y\nSubject to:\n3x + 2y ≤ 18\n2x + 4y ≥ 20\nx + 3y = 15\nx ≥ 0, y ≥ 0',
      solution: 'Maximize Z = 5x + 7y + 0s₁ + 0s₂\nSubject to:\n3x + 2y + s₁ = 18\n2x + 4y - s₂ = 20\nx + 3y = 15\nx, y, s₁, s₂ ≥ 0',
      detailedSolution: 'Step 1: Identify constraint types\n- 3x + 2y ≤ 18 → ≤ constraint\n- 2x + 4y ≥ 20 → ≥ constraint\n- x + 3y = 15 → equality constraint\n\nStep 2: Convert each constraint\n- For ≤: add slack variable\n  3x + 2y + s₁ = 18\n- For ≥: subtract surplus variable\n  2x + 4y - s₂ = 20\n- For =: keep as is\n  x + 3y = 15\n\nStep 3: Update objective function\n- Z = 5x + 7y + 0s₁ + 0s₂\n\nStep 4: Write in standard form\nMaximize Z = 5x + 7y + 0s₁ + 0s₂\nSubject to:\n3x + 2y + s₁ = 18\n2x + 4y - s₂ = 20\nx + 3y = 15\nx, y, s₁, s₂ ≥ 0'
    },
    {
      id: 4,
      title: 'Example 4: Unrestricted Variables',
      problem: 'Convert the following LP problem to standard form with non-negative variables:\nMaximize Z = 3x + 4y\nSubject to:\nx + 2y ≤ 10\nx - y ≥ 4\nx unrestricted, y ≥ 0',
      solution: 'Let x = x₁ - x₂, where x₁, x₂ ≥ 0\nMaximize Z = 3(x₁ - x₂) + 4y\n= 3x₁ - 3x₂ + 4y\nSubject to:\n(x₁ - x₂) + 2y ≤ 10 → x₁ - x₂ + 2y + s₁ = 10\n(x₁ - x₂) - y ≥ 4 → x₁ - x₂ - y - s₂ = 4\nx₁, x₂, y, s₁, s₂ ≥ 0',
      detailedSolution: 'Step 1: Handle unrestricted variable\n- x is unrestricted (can be negative)\n- Replace x with x₁ - x₂ where x₁, x₂ ≥ 0\n\nStep 2: Rewrite the objective\n- Z = 3x + 4y = 3(x₁ - x₂) + 4y\n- Z = 3x₁ - 3x₂ + 4y\n\nStep 3: Rewrite the constraints\n- x + 2y ≤ 10 → (x₁ - x₂) + 2y ≤ 10\n- x - y ≥ 4 → (x₁ - x₂) - y ≥ 4\n\nStep 4: Convert to equalities\n- x₁ - x₂ + 2y + s₁ = 10\n- x₁ - x₂ - y - s₂ = 4\n\nStep 5: Write in standard form\nMaximize Z = 3x₁ - 3x₂ + 4y + 0s₁ + 0s₂\nSubject to:\nx₁ - x₂ + 2y + s₁ = 10\nx₁ - x₂ - y - s₂ = 4\nx₁, x₂, y, s₁, s₂ ≥ 0'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Convert to Standard Form',
      problem: 'Convert to standard form:\nMaximize Z = 2x + 3y\nSubject to:\n3x + 2y ≤ 12\nx + 4y ≤ 8\nx ≥ 0, y ≥ 0',
      hint: 'Add slack variables for each ≤ constraint.',
      solution: 'Maximize Z = 2x + 3y + 0s₁ + 0s₂\nSubject to:\n3x + 2y + s₁ = 12\nx + 4y + s₂ = 8\nx, y, s₁, s₂ ≥ 0'
    },
    {
      id: 2,
      title: 'Minimization to Standard Form',
      problem: 'Convert to standard form:\nMinimize Z = 5x + 4y\nSubject to:\nx + 2y ≥ 10\n3x + y ≥ 12\nx ≥ 0, y ≥ 0',
      hint: 'Convert minimization to maximization and subtract surplus variables.',
      solution: 'Maximize Z\' = -5x - 4y\nSubject to:\nx + 2y - s₁ = 10\n3x + y - s₂ = 12\nx, y, s₁, s₂ ≥ 0'
    },
    {
      id: 3,
      title: 'Mixed Constraints',
      problem: 'Convert to standard form:\nMaximize Z = 6x + 8y\nSubject to:\n2x + 3y ≤ 24\nx + 5y ≥ 15\nx + 2y = 10\nx ≥ 0, y ≥ 0',
      hint: 'Handle ≤, ≥, and = constraints appropriately.',
      solution: 'Maximize Z = 6x + 8y + 0s₁ + 0s₂\nSubject to:\n2x + 3y + s₁ = 24\nx + 5y - s₂ = 15\nx + 2y = 10\nx, y, s₁, s₂ ≥ 0'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Standard Form Converter
  const StandardFormConverter = () => {
    const [problemType, setProblemType] = useState('max');
    const [constraintType, setConstraintType] = useState('le');
    const [a, setA] = useState(2);
    const [b, setB] = useState(3);
    const [c, setC] = useState(12);

    const getStandardForm = () => {
      let result = '';
      if (problemType === 'max') {
        result += `Maximize Z = ${a}x + ${b}y`;
      } else {
        result += `Maximize Z' = -${a}x - ${b}y`;
      }
      
      if (constraintType === 'le') {
        result += `\nSubject to:\n${a}x + ${b}y + s₁ = ${c}`;
      } else if (constraintType === 'ge') {
        result += `\nSubject to:\n${a}x + ${b}y - s₁ = ${c}`;
      } else {
        result += `\nSubject to:\n${a}x + ${b}y = ${c}`;
      }
      result += '\nx, y, s₁ ≥ 0';
      return result;
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Standard Form Converter
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-3">
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
                  &gt;
                    Maximize
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
                    Minimize
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
                  &gt;
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
                  &gt;
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
                  &gt;
                    =
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Coefficient a (x)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={a}
                  onChange={(e) => setA(Number(e.target.value))}
                  className="w-full"
                /&gt;
                <span className="text-sm text-gray-600 dark:text-gray-400">{a}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Coefficient b (y)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={b}
                  onChange={(e) => setB(Number(e.target.value))}
                  className="w-full"
                /&gt;
                <span className="text-sm text-gray-600 dark:text-gray-400">{b}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Constant c</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={c}
                  onChange={(e) => setC(Number(e.target.value))}
                  className="w-full"
                /&gt;
                <span className="text-sm text-gray-600 dark:text-gray-400">{c}</span>
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
                <span className="font-semibold">Rules Applied:</span>
              </p>
              <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-400 mt-1">
                {problemType === 'min' && <li>Minimization converted to maximization with negative coefficients</li>}
                {constraintType === 'le' && <li>Added slack variable s₁ for ≤ constraint</li>}
                {constraintType === 'ge' && <li>Subtracted surplus variable s₁ for ≥ constraint</li>}
                {constraintType === 'eq' && <li>Kept equality constraint as is</li>}
                <li>All variables ≥ 0</li>
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
            Standard Form of an LP Problem
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to convert linear programming problems into standard form, a necessary step 
            for applying the Simplex Method.
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
            &gt;
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* What is Standard Form? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is Standard Form?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Standard form is a specific format for LP problems that is required for the Simplex Method. 
                  It converts all inequality constraints into equalities and ensures all variables are non-negative. 
                  This algebraic form allows the Simplex Method to work systematically with a system of linear equations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Standard Form Requirements</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Maximization objective</li>
                      <li>All constraints are equalities</li>
                      <li>All variables ≥ 0</li>
                      <li>Right-hand side (RHS) ≥ 0</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why Standard Form?</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Required for Simplex Method</li>
                      <li>Creates system of equations</li>
                      <li>Enables algebraic solution</li>
                      <li>Foundation for tableaus</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Convert to Standard Form */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Convert to Standard Form
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 1: Objective</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Convert minimization to maximization by multiplying by -1.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Min Z = c₁x₁ + c₂x₂<br/>
                      → Max Z' = -c₁x₁ - c₂x₂
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 2: Constraints</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Convert inequalities to equalities using slack/surplus variables.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      ≤ → add slack (+s)<br/>
                      ≥ → subtract surplus (-s)<br/>
                      = → keep as is
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 3: Variables</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ensure all variables ≥ 0. Handle unrestricted variables.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      x unrestricted → x = x₁ - x₂<br/>
                      where x₁, x₂ ≥ 0
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Converter */}
              <StandardFormConverter />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Converting to Standard Form
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Always check RHS is non-negative</li>
                      <li>Use different variable names for slack/surplus</li>
                      <li>Keep track of variable types (≤, ≥, =)</li>
                      <li>Verify all variables have non-negativity constraints</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Forgetting to convert minimization</li>
                      <li>Adding surplus instead of slack</li>
                      <li>Forgetting non-negativity for slack variables</li>
                      <li>Not handling unrestricted variables</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Objective is maximization</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">All constraints are equalities</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">All variables ≥ 0</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">RHS values non-negative</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Slack/surplus variables identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Unrestricted variables handled</span>
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
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Standard Form</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.solution}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleExample(example.id)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
                      &gt;
                        {showExample[example.id] ? 'Hide Conversion Steps' : 'Show Conversion Steps'}
                      </button>
                    </div>
                    {showExample[example.id] && (
                      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                        <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">📝 Conversion Steps</h5>
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
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
                  💡 Tips for Converting to Standard Form
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Identify constraint types:</span> ≤, ≥, or =</li>
                  <li><span className="font-medium">Add slack for ≤:</span> +s</li>
                  <li><span className="font-medium">Subtract surplus for ≥:</span> -s</li>
                  <li><span className="font-medium">Minimization becomes maximization:</span> multiply by -1</li>
                  <li><span className="font-medium">All variables must be ≥ 0:</span> handle unrestricted</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Standard Form of LP Problems FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Standard Form of an LP Problem"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Standard form is the language of the Simplex Method. I tell my students that learning to convert problems to standard form is like learning grammar before writing essays - it's essential for clear communication. The key is understanding the rules: maximization objective, equality constraints, and non-negative variables. Once students master this conversion, the Simplex Method becomes much more approachable." />
        </div>
      </div>
    </div>
  );
};

export default Topic1;