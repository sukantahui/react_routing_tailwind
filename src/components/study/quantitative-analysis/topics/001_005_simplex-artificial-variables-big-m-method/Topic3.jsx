import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic3_files/topic3_questions';
import noteText from './topic3_files/topic3_note.txt?raw';

const Topic3 = () => {
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
      title: 'Example 1: Basic Surplus Variables',
      problem: 'Convert to standard form using surplus variables:\nMinimize Z = 4x + 3y\nSubject to:\nx + y ≥ 6\n2x + y ≥ 8\nx ≥ 0, y ≥ 0',
      solution: 'Maximize Z\' = -4x - 3y\nSubject to:\nx + y - s₁ = 6\n2x + y - s₂ = 8\nx, y, s₁, s₂ ≥ 0',
      detailedSolution: 'Step 1: Convert minimization to maximization\nMin Z = 4x + 3y → Max Z\' = -4x - 3y\n\nStep 2: Identify ≥ constraints\nConstraint 1: x + y ≥ 6\nConstraint 2: 2x + y ≥ 8\n\nStep 3: Add surplus variables\nFor each ≥ constraint, subtract a non-negative surplus variable:\nx + y - s₁ = 6 (s₁ ≥ 0)\n2x + y - s₂ = 8 (s₂ ≥ 0)\n\nStep 4: Update objective function\nZ\' = -4x - 3y + 0s₁ + 0s₂\n\nStep 5: Interpret surplus variables\ns₁ = (x + y) - 6 → excess over requirement 1\ns₂ = (2x + y) - 8 → excess over requirement 2'
    },
    {
      id: 2,
      title: 'Example 2: Surplus Variables in Diet Problem',
      problem: 'A dietitian plans a meal:\nMinimize Z = 20x + 30y\nSubject to:\n4x + 3y ≥ 24 (Protein)\n3x + 5y ≥ 18 (Carbs)\nx ≥ 0, y ≥ 0\n\nConvert to standard form and interpret surplus variables.',
      solution: 'Maximize Z\' = -20x - 30y\nSubject to:\n4x + 3y - s₁ = 24\n3x + 5y - s₂ = 18\nx, y, s₁, s₂ ≥ 0',
      detailedSolution: 'Step 1: Convert minimization to maximization\nMin Z = 20x + 30y → Max Z\' = -20x - 30y\n\nStep 2: Identify requirements\n- Protein: 4x + 3y ≥ 24\n- Carbohydrates: 3x + 5y ≥ 18\n\nStep 3: Add surplus variables\ns₁ = (4x + 3y) - 24 → surplus protein\ns₂ = (3x + 5y) - 18 → surplus carbs\n\nStep 4: Write in standard form\nMaximize Z\' = -20x - 30y + 0s₁ + 0s₂\nSubject to:\n4x + 3y - s₁ = 24\n3x + 5y - s₂ = 18\nx, y, s₁, s₂ ≥ 0\n\nStep 5: At optimal solution (6, 0):\ns₁ = 4(6) + 3(0) - 24 = 0 (protein exactly met)\ns₂ = 3(6) + 5(0) - 18 = 0 (carbs exactly met)'
    },
    {
      id: 3,
      title: 'Example 3: Mixed Constraints with Surplus',
      problem: 'Convert to standard form:\nMaximize Z = 5x + 7y\nSubject to:\n2x + 3y ≤ 18\nx + 4y ≥ 12\n3x + 2y ≥ 10\nx ≥ 0, y ≥ 0',
      solution: 'Maximize Z = 5x + 7y + 0s₁ + 0s₂ + 0s₃\nSubject to:\n2x + 3y + s₁ = 18\nx + 4y - s₂ = 12\n3x + 2y - s₃ = 10\nx, y, s₁, s₂, s₃ ≥ 0',
      detailedSolution: 'Step 1: Identify constraint types\n- 2x + 3y ≤ 18 → ≤ constraint (add slack)\n- x + 4y ≥ 12 → ≥ constraint (subtract surplus)\n- 3x + 2y ≥ 10 → ≥ constraint (subtract surplus)\n\nStep 2: Convert each constraint\n2x + 3y + s₁ = 18 (s₁ ≥ 0)\nx + 4y - s₂ = 12 (s₂ ≥ 0)\n3x + 2y - s₃ = 10 (s₃ ≥ 0)\n\nStep 3: Update objective function\nZ = 5x + 7y + 0s₁ + 0s₂ + 0s₃\n\nStep 4: Interpret\ns₁ = 18 - (2x + 3y) → unused resource\ns₂ = (x + 4y) - 12 → surplus requirement 2\ns₃ = (3x + 2y) - 10 → surplus requirement 3'
    },
    {
      id: 4,
      title: 'Example 4: Real-World Surplus Variables',
      problem: 'A company must meet minimum production targets:\nMinimize Z = 8x + 10y\nSubject to:\n3x + 2y ≥ 30 (Minimum production)\n2x + 5y ≥ 40 (Minimum quality)\nx ≥ 0, y ≥ 0\n\nConvert to standard form and explain surplus variables.',
      solution: 'Maximize Z\' = -8x - 10y\nSubject to:\n3x + 2y - s₁ = 30\n2x + 5y - s₂ = 40\nx, y, s₁, s₂ ≥ 0',
      detailedSolution: 'Step 1: Convert minimization to maximization\nMin Z = 8x + 10y → Max Z\' = -8x - 10y\n\nStep 2: Identify requirements\n- Production: 3x + 2y ≥ 30\n- Quality: 2x + 5y ≥ 40\n\nStep 3: Add surplus variables\ns₁ = (3x + 2y) - 30 → excess production\ns₂ = (2x + 5y) - 40 → excess quality units\n\nStep 4: Standard form\nMaximize Z\' = -8x - 10y + 0s₁ + 0s₂\nSubject to:\n3x + 2y - s₁ = 30\n2x + 5y - s₂ = 40\nx, y, s₁, s₂ ≥ 0\n\nStep 5: Business interpretation\n- s₁: Units produced above minimum\n- s₂: Quality units above minimum\n- Minimization → we want s₁, s₂ as small as possible'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Add Surplus Variables',
      problem: 'Convert to standard form using surplus variables:\nMinimize Z = 3x + 5y\nSubject to:\nx + 2y ≥ 10\n3x + y ≥ 12\nx ≥ 0, y ≥ 0',
      hint: 'Convert minimization to maximization and subtract surplus variables.',
      solution: 'Maximize Z\' = -3x - 5y\nSubject to:\nx + 2y - s₁ = 10\n3x + y - s₂ = 12\nx, y, s₁, s₂ ≥ 0'
    },
    {
      id: 2,
      title: 'Surplus Variables with Three Constraints',
      problem: 'Convert to standard form:\nMinimize Z = 2x + 4y\nSubject to:\nx + 3y ≥ 8\n2x + y ≥ 6\nx + 2y ≥ 5\nx ≥ 0, y ≥ 0',
      hint: 'Convert to maximization and subtract three surplus variables.',
      solution: 'Maximize Z\' = -2x - 4y\nSubject to:\nx + 3y - s₁ = 8\n2x + y - s₂ = 6\nx + 2y - s₃ = 5\nx, y, s₁, s₂, s₃ ≥ 0'
    },
    {
      id: 3,
      title: 'Mixed Constraints with Surplus',
      problem: 'Convert to standard form:\nMaximize Z = 6x + 8y\nSubject to:\n2x + 3y ≤ 24\nx + 4y ≥ 16\n3x + y ≥ 12\nx ≥ 0, y ≥ 0',
      hint: 'Use slack for ≤ and surplus for ≥ constraints.',
      solution: 'Maximize Z = 6x + 8y + 0s₁ + 0s₂ + 0s₃\nSubject to:\n2x + 3y + s₁ = 24\nx + 4y - s₂ = 16\n3x + y - s₃ = 12\nx, y, s₁, s₂, s₃ ≥ 0'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Surplus Variable Visualizer
  const SurplusVariableVisualizer = () => {
    const [a1, setA1] = useState(2);
    const [b1, setB1] = useState(3);
    const [c1, setC1] = useState(12);
    const [a2, setA2] = useState(3);
    const [b2, setB2] = useState(2);
    const [c2, setC2] = useState(18);

    const calculateSurplus = (x, y) => {
      const s1 = (a1 * x + b1 * y) - c1;
      const s2 = (a2 * x + b2 * y) - c2;
      return { s1, s2 };
    };

    const [xVal, setXVal] = useState(4);
    const [yVal, setYVal] = useState(3);
    const surplus = calculateSurplus(xVal, yVal);

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Surplus Variable Calculator
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Constraint 1: {a1}x + {b1}y ≥ {c1}</label>
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
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Constraint 2: {a2}x + {b2}y ≥ {c2}</label>
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
                <span className="font-semibold">Surplus Variables:</span>
              </p>
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                s₁ = ({a1}×{xVal} + {b1}×{yVal}) - {c1} = {surplus.s1.toFixed(1)}
              </p>
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                s₂ = ({a2}×{xVal} + {b2}×{yVal}) - {c2} = {surplus.s2.toFixed(1)}
              </p>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Standard Form</h5>
              <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                Maximize Z\' = -c₁x - c₂y + 0s₁ + 0s₂
                Subject to:
                {a1}x + {b1}y - s₁ = {c1}
                {a2}x + {b2}y - s₂ = {c2}
                x, y, s₁, s₂ ≥ 0
              </pre>
            </div>
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Interpretation:</span>
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                s₁ = {surplus.s1.toFixed(1)} → {surplus.s1 >= 0 ? 'Excess over requirement' : 'Infeasible (negative surplus)'}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                s₂ = {surplus.s2.toFixed(1)} → {surplus.s2 >= 0 ? 'Excess over requirement' : 'Infeasible (negative surplus)'}
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
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Surplus Variables
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn about surplus variables, their purpose in converting ≥ constraints to equalities, 
            and their role in the Simplex Method.
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
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* What are Surplus Variables? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What are Surplus Variables?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Surplus variables are non-negative variables subtracted from ≥ constraints to convert 
                  them into equalities. They represent the excess amount over the minimum requirement. 
                  Unlike slack variables (which are added), surplus variables are subtracted to account 
                  for the "extra" beyond what's required.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Concepts</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Convert ≥ to =</li>
                      <li>Represent excess over requirements</li>
                      <li>Non-negative by definition</li>
                      <li>Zero coefficient in objective</li>
                      <li>Used in minimization problems</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why They Matter</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Enable standard form for ≥ constraints</li>
                      <li>Create initial feasible solution</li>
                      <li>Identify excess over requirements</li>
                      <li>Essential for Big-M Method</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How Surplus Variables Work */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How Surplus Variables Work
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 1</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Identify ≥ constraints</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      x + y ≥ 6
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 2</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Subtract surplus variable</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      x + y - s₁ = 6
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 3</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Interpret as excess</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      s₁ = (x + y) - 6
                    </div>
                  </div>
                </div>
              </div>

              {/* Slack vs Surplus Comparison */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Slack vs Surplus Variables
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Slack Variables</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Used for ≤ constraints</li>
                      <li><span className="font-bold">Added</span> to convert to equality</li>
                      <li>s = RHS - LHS</li>
                      <li>Represents <span className="font-bold">unused</span> resources</li>
                      <li>Common in maximization</li>
                    </ul>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      2x + y ≤ 10 → 2x + y + s = 10
                    </div>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Surplus Variables</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Used for ≥ constraints</li>
                      <li><span className="font-bold">Subtracted</span> to convert to equality</li>
                      <li>s = LHS - RHS</li>
                      <li>Represents <span className="font-bold">excess</span> over requirements</li>
                      <li>Common in minimization</li>
                    </ul>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      x + y ≥ 6 → x + y - s = 6
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Visualizer */}
              <SurplusVariableVisualizer />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Surplus Variables
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Surplus variables are <span className="font-bold">subtracted</span> (not added)</li>
                      <li>Always non-negative</li>
                      <li>Zero coefficient in objective</li>
                      <li>Require artificial variables for initial solution</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Adding instead of subtracting surplus</li>
                      <li>Forgetting non-negativity</li>
                      <li>Confusing slack and surplus</li>
                      <li>Not converting minimization to maximization</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">≥ constraints identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Surplus variables subtracted correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Surplus variables ≥ 0</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Zero objective coefficients</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Minimization converted to maximization</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Interpretation of surplus understood</span>
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
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">With Surplus Variables</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.solution}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleExample(example.id)}
                        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-300"
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
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
                  💡 Tips for Working with Surplus Variables
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Identify ≥ constraints:</span> Each needs a surplus variable</li>
                  <li><span className="font-medium">Use different names:</span> s₁, s₂, s₃ for different constraints</li>
                  <li><span className="font-medium">Remember non-negativity:</span> All surplus variables ≥ 0</li>
                  <li><span className="font-medium">Zero objective coefficients:</span> Surplus variables don't affect Z</li>
                  <li><span className="font-medium">Interpret as excess:</span> Helps understand the solution</li>
                  <li><span className="font-medium">Require artificial variables:</span> For initial feasible solution</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Surplus Variables FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Surplus Variables"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Surplus variables are the mirror image of slack variables. I tell my students that if slack variables are about 'how much is left over' (unused resources), surplus variables are about 'how much extra' (excess over requirements). The key is remembering that slack is added (+) and surplus is subtracted (-). This distinction is crucial for the Simplex Method. I encourage students to think of surplus variables as measuring 'waste' or 'excess' that we'd like to minimize." />
        </div>
      </div>
    </div>
  );
};

export default Topic3;