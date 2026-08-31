import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic2_files/topic2_questions';
import noteText from './topic2_files/topic2_note.txt?raw';

const Topic2 = () => {
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
      title: 'Example 1: Basic Slack Variables',
      problem: 'Convert to standard form using slack variables:\nMaximize Z = 3x + 2y\nSubject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx ≥ 0, y ≥ 0',
      solution: 'Slack variables s₁ and s₂ added:\nMaximize Z = 3x + 2y + 0s₁ + 0s₂\nSubject to:\n2x + y + s₁ = 10\nx + 2y + s₂ = 8\nx, y, s₁, s₂ ≥ 0',
      detailedSolution: 'Step 1: Identify constraints with ≤\nConstraint 1: 2x + y ≤ 10\nConstraint 2: x + 2y ≤ 8\n\nStep 2: Add slack variables\nFor each ≤ constraint, add a non-negative slack variable:\n2x + y + s₁ = 10 (s₁ ≥ 0)\nx + 2y + s₂ = 8 (s₂ ≥ 0)\n\nStep 3: Update objective function\nSlack variables have zero coefficients:\nZ = 3x + 2y + 0s₁ + 0s₂\n\nStep 4: Interpret slack variables\ns₁ = 10 - (2x + y) → unused labor\ns₂ = 8 - (x + 2y) → unused machine time'
    },
    {
      id: 2,
      title: 'Example 2: Slack Variables in Production',
      problem: 'A factory produces chairs (x) and tables (y).\nMaximize Z = 40x + 50y\nSubject to:\n2x + 3y ≤ 120 (Labor hours)\n3x + 2y ≤ 90 (Wood units)\nx ≥ 0, y ≥ 0\n\nConvert to standard form and interpret slack variables.',
      solution: 'Maximize Z = 40x + 50y + 0s₁ + 0s₂\nSubject to:\n2x + 3y + s₁ = 120\n3x + 2y + s₂ = 90\nx, y, s₁, s₂ ≥ 0',
      detailedSolution: 'Step 1: Identify resources\n- Labor: 2x + 3y ≤ 120\n- Wood: 3x + 2y ≤ 90\n\nStep 2: Add slack variables\ns₁ = 120 - (2x + 3y) → unused labor hours\ns₂ = 90 - (3x + 2y) → unused wood units\n\nStep 3: Write in standard form\nMaximize Z = 40x + 50y + 0s₁ + 0s₂\nSubject to:\n2x + 3y + s₁ = 120\n3x + 2y + s₂ = 90\nx, y, s₁, s₂ ≥ 0\n\nStep 4: At optimal solution (0, 40):\ns₁ = 120 - 0 - 120 = 0 (labor fully utilized)\ns₂ = 90 - 0 - 80 = 10 (10 wood units slack)'
    },
    {
      id: 3,
      title: 'Example 3: Slack Variables with Three Constraints',
      problem: 'Convert to standard form:\nMaximize Z = 5x + 4y\nSubject to:\n3x + 2y ≤ 18\nx + 4y ≤ 16\n2x + y ≤ 12\nx ≥ 0, y ≥ 0',
      solution: 'Maximize Z = 5x + 4y + 0s₁ + 0s₂ + 0s₃\nSubject to:\n3x + 2y + s₁ = 18\nx + 4y + s₂ = 16\n2x + y + s₃ = 12\nx, y, s₁, s₂, s₃ ≥ 0',
      detailedSolution: 'Step 1: Identify all ≤ constraints\nConstraint 1: 3x + 2y ≤ 18\nConstraint 2: x + 4y ≤ 16\nConstraint 3: 2x + y ≤ 12\n\nStep 2: Add slack variables\ns₁ = 18 - (3x + 2y)\ns₂ = 16 - (x + 4y)\ns₃ = 12 - (2x + y)\n\nStep 3: Write in standard form\nMaximize Z = 5x + 4y + 0s₁ + 0s₂ + 0s₃\nSubject to:\n3x + 2y + s₁ = 18\nx + 4y + s₂ = 16\n2x + y + s₃ = 12\nx, y, s₁, s₂, s₃ ≥ 0\n\nStep 4: Interpret\nEach slack variable represents unused capacity of a resource.'
    },
    {
      id: 4,
      title: 'Example 4: Slack Variables in Real-World Context',
      problem: 'A bakery produces cakes (x) and pastries (y).\nMaximize Z = 15x + 10y\nSubject to:\n2x + y ≤ 50 (Flour kg)\n3x + 2y ≤ 60 (Labor hours)\nx + 2y ≤ 40 (Sugar kg)\nx ≥ 0, y ≥ 0\n\nConvert to standard form and explain what each slack variable means.',
      solution: 'Maximize Z = 15x + 10y + 0s₁ + 0s₂ + 0s₃\nSubject to:\n2x + y + s₁ = 50\n3x + 2y + s₂ = 60\nx + 2y + s₃ = 40\nx, y, s₁, s₂, s₃ ≥ 0',
      detailedSolution: 'Step 1: Identify resources\n- Flour: 2x + y ≤ 50\n- Labor: 3x + 2y ≤ 60\n- Sugar: x + 2y ≤ 40\n\nStep 2: Add slack variables\ns₁ = 50 - (2x + y) → unused flour (kg)\ns₂ = 60 - (3x + 2y) → unused labor (hours)\ns₃ = 40 - (x + 2y) → unused sugar (kg)\n\nStep 3: Standard form\nMaximize Z = 15x + 10y + 0s₁ + 0s₂ + 0s₃\nSubject to:\n2x + y + s₁ = 50\n3x + 2y + s₂ = 60\nx + 2y + s₃ = 40\nx, y, s₁, s₂, s₃ ≥ 0\n\nStep 4: Business interpretation\n- s₁: Extra flour that could be used for more production\n- s₂: Idle labor hours\n- s₃: Unused sugar inventory'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Add Slack Variables',
      problem: 'Convert to standard form by adding slack variables:\nMaximize Z = 2x + 3y\nSubject to:\n4x + y ≤ 12\nx + 3y ≤ 9\nx ≥ 0, y ≥ 0',
      hint: 'Add one slack variable for each ≤ constraint.',
      solution: 'Maximize Z = 2x + 3y + 0s₁ + 0s₂\nSubject to:\n4x + y + s₁ = 12\nx + 3y + s₂ = 9\nx, y, s₁, s₂ ≥ 0'
    },
    {
      id: 2,
      title: 'Slack Variables with Three Constraints',
      problem: 'Convert to standard form:\nMaximize Z = 5x + 6y\nSubject to:\n2x + 3y ≤ 24\nx + y ≤ 10\n3x + 2y ≤ 18\nx ≥ 0, y ≥ 0',
      hint: 'Add three slack variables, one for each constraint.',
      solution: 'Maximize Z = 5x + 6y + 0s₁ + 0s₂ + 0s₃\nSubject to:\n2x + 3y + s₁ = 24\nx + y + s₂ = 10\n3x + 2y + s₃ = 18\nx, y, s₁, s₂, s₃ ≥ 0'
    },
    {
      id: 3,
      title: 'Interpret Slack Variables',
      problem: 'A factory produces two products. The LP problem is:\nMaximize Z = 4x + 5y\nSubject to:\n2x + 3y ≤ 100\n4x + y ≤ 80\nx ≥ 0, y ≥ 0\n\nConvert to standard form and explain what each slack variable represents.',
      hint: 'Identify what each resource represents and what the slack variable measures.',
      solution: 'Maximize Z = 4x + 5y + 0s₁ + 0s₂\nSubject to:\n2x + 3y + s₁ = 100\n4x + y + s₂ = 80\nx, y, s₁, s₂ ≥ 0\ns₁: unused resource 1, s₂: unused resource 2'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Slack Variable Visualizer
  const SlackVariableVisualizer = () => {
    const [a1, setA1] = useState(2);
    const [b1, setB1] = useState(3);
    const [c1, setC1] = useState(12);
    const [a2, setA2] = useState(3);
    const [b2, setB2] = useState(2);
    const [c2, setC2] = useState(18);

    const calculateSlack = (x, y) => {
      const s1 = c1 - (a1 * x + b1 * y);
      const s2 = c2 - (a2 * x + b2 * y);
      return { s1, s2 };
    };

    const [xVal, setXVal] = useState(2);
    const [yVal, setYVal] = useState(3);
    const slack = calculateSlack(xVal, yVal);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Slack Variable Calculator
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Constraint 1: {a1}x + {b1}y ≤ {c1}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={a1}
                  onChange={(e) => setA1(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Constraint 2: {a2}x + {b2}y ≤ {c2}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={a2}
                  onChange={(e) => setA2(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">x value: {xVal}</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={xVal}
                  onChange={(e) => setXVal(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">y value: {yVal}</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={yVal}
                  onChange={(e) => setYVal(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Slack Variables:</span>
              </p>
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                s₁ = {c1} - ({a1}×{xVal} + {b1}×{yVal}) = {slack.s1.toFixed(1)}
              </p>
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                s₂ = {c2} - ({a2}×{xVal} + {b2}×{yVal}) = {slack.s2.toFixed(1)}
              </p>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Standard Form</h5>
              <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                Maximize Z = c₁x + c₂y + 0s₁ + 0s₂
                Subject to:
                {a1}x + {b1}y + s₁ = {c1}
                {a2}x + {b2}y + s₂ = {c2}
                x, y, s₁, s₂ ≥ 0
              </pre>
            </div>
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Interpretation:</span>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                s₁ = {slack.s1.toFixed(1)} → {slack.s1 >= 0 ? 'Unused capacity' : 'Infeasible (negative slack)'}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                s₂ = {slack.s2.toFixed(1)} → {slack.s2 >= 0 ? 'Unused capacity' : 'Infeasible (negative slack)'}
              </p>
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
            Slack Variables
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn about slack variables, their purpose in converting ≤ constraints to equalities, 
            and their interpretation in the Simplex Method.
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
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* What are Slack Variables? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What are Slack Variables?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Slack variables are non-negative variables added to ≤ constraints to convert them 
                  into equalities. They represent the unused or "slack" capacity of resources. In the 
                  Simplex Method, slack variables are essential for creating the initial basic feasible 
                  solution.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Concepts</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Convert ≤ to =</li>
                      <li>Represent unused resources</li>
                      <li>Non-negative by definition</li>
                      <li>Zero coefficient in objective</li>
                      <li>Initial basic variables</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why They Matter</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Enable standard form</li>
                      <li>Create initial feasible solution</li>
                      <li>Identify unused capacity</li>
                      <li>Foundation for simplex tableau</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How Slack Variables Work */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How Slack Variables Work
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 1</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Identify ≤ constraints</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      2x + y ≤ 10
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 2</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Add slack variable</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      2x + y + s₁ = 10
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 3</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Interpret as unused capacity</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      s₁ = 10 - (2x + y)
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Visualizer */}
              <SlackVariableVisualizer />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Slack Variables
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Always use non-negative slack variables</li>
                      <li>Slack variables have zero objective coefficients</li>
                      <li>Each ≤ constraint gets one slack variable</li>
                      <li>Slack variables measure unused resources</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Forgetting non-negativity for slack variables</li>
                      <li>Adding slack to ≥ constraints</li>
                      <li>Giving slack variables objective coefficients</li>
                      <li>Confusing slack with surplus</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">≤ constraints identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Slack variables added correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Slack variables ≥ 0</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Zero objective coefficients</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Interpretation of slack understood</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Ready for simplex tableau</span>
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
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">With Slack Variables</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.solution}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleExample(example.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
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
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  💡 Tips for Working with Slack Variables
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Identify ≤ constraints:</span> Each needs a slack variable</li>
                  <li><span className="font-medium">Use different names:</span> s₁, s₂, s₃ for different constraints</li>
                  <li><span className="font-medium">Remember non-negativity:</span> All slack variables ≥ 0</li>
                  <li><span className="font-medium">Zero objective coefficients:</span> Slack variables don't affect Z</li>
                  <li><span className="font-medium">Interpret as unused capacity:</span> Helps understand the solution</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Slack Variables FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Slack Variables"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Slack variables are the bridge between inequalities and equalities. I tell my students that slack variables are like 'measuring sticks' for unused resources. The key insight is that slack variables are not just mathematical tools - they represent real unused capacity that managers can see and potentially use. When a slack variable is zero, the resource is fully utilized. When it's positive, there's room for growth. This interpretation makes slack variables meaningful beyond just the algebra." />
        </div>
      </div>
    </div>
  );
};

export default Topic2;