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
      title: 'Example 1: Basic Translation',
      problem: 'A company produces two products. Product A requires 3 hours of labor and 2 units of material. Product B requires 2 hours of labor and 4 units of material. The company has 120 labor hours and 100 material units available. Profit per unit of A is ₹50 and per unit of B is ₹60. Translate this into a mathematical LP problem.',
      solution: 'Let x = units of Product A, y = units of Product B\nMaximize Z = 50x + 60y\nSubject to:\n3x + 2y ≤ 120 (Labor)\n2x + 4y ≤ 100 (Material)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Identify decision variables\nx = number of Product A units, y = number of Product B units\n\nStep 2: Identify the objective\nMaximize profit = 50x + 60y\n\nStep 3: Identify constraints\nLabor: 3x + 2y ≤ 120\nMaterial: 2x + 4y ≤ 100\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Check understanding\n- Each unit of A uses 3 labor hours → 3x\n- Each unit of B uses 2 labor hours → 2y\n- Total labor ≤ 120 hours\n- Each unit of A uses 2 material units → 2x\n- Each unit of B uses 4 material units → 4y\n- Total material ≤ 100 units'
    },
    {
      id: 2,
      title: 'Example 2: Minimum Requirements',
      problem: 'A diet requires at least 24 units of protein and 18 units of carbohydrates. Food X provides 4 protein and 2 carbs per serving at ₹15 per serving. Food Y provides 3 protein and 5 carbs per serving at ₹25 per serving. What is the minimum cost diet?',
      solution: 'Let x = servings of Food X, y = servings of Food Y\nMinimize Z = 15x + 25y\nSubject to:\n4x + 3y ≥ 24 (Protein)\n2x + 5y ≥ 18 (Carbs)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Identify decision variables\nx = servings of Food X, y = servings of Food Y\n\nStep 2: Identify the objective\nMinimize cost = 15x + 25y\n\nStep 3: Identify constraints\nProtein: 4x + 3y ≥ 24 (minimum requirement)\nCarbs: 2x + 5y ≥ 18 (minimum requirement)\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Key translation points\n- "At least" means ≥\n- "Minimum requirement" means ≥\n- "Cost per serving" becomes coefficient in objective'
    },
    {
      id: 3,
      title: 'Example 3: Mixed Constraints',
      problem: 'A factory produces chairs and tables. Each chair requires 2 hours of labor and 3 units of wood. Each table requires 3 hours of labor and 2 units of wood. Available: 120 labor hours and 90 wood units. Profit: Chair ₹40, Table ₹50. At least 10 chairs and 5 tables must be produced each day.',
      solution: 'Let x = chairs, y = tables\nMaximize Z = 40x + 50y\nSubject to:\n2x + 3y ≤ 120 (Labor)\n3x + 2y ≤ 90 (Wood)\nx ≥ 10 (Minimum chairs)\ny ≥ 5 (Minimum tables)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Identify decision variables\nx = number of chairs, y = number of tables\n\nStep 2: Identify the objective\nMaximize profit = 40x + 50y\n\nStep 3: Identify constraints\nLabor: 2x + 3y ≤ 120 (resource constraint)\nWood: 3x + 2y ≤ 90 (resource constraint)\nx ≥ 10 (minimum production requirement)\ny ≥ 5 (minimum production requirement)\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Key translation points\n- "Available" → ≤\n- "At least" → ≥\n- "Minimum" → ≥'
    },
    {
      id: 4,
      title: 'Example 4: Ratio and Percentage Constraints',
      problem: 'A company produces two products. Product A and Product B. The company wants at least 40% of total production to be Product A. Total production must be at least 100 units. Product A uses 2 hours of labor per unit, Product B uses 3 hours. Available labor is 300 hours. Profit: A = ₹30, B = ₹40.',
      solution: 'Let x = units of Product A, y = units of Product B\nMaximize Z = 30x + 40y\nSubject to:\n2x + 3y ≤ 300 (Labor)\nx + y ≥ 100 (Total production)\nx ≥ 0.4(x + y) (At least 40% A)\n→ 0.6x ≥ 0.4y\n→ 3x ≥ 2y\nx, y ≥ 0',
      detailedSolution: 'Step 1: Identify decision variables\nx = units of Product A, y = units of Product B\n\nStep 2: Identify the objective\nMaximize profit = 30x + 40y\n\nStep 3: Identify constraints\nLabor: 2x + 3y ≤ 300\nTotal production: x + y ≥ 100\nAt least 40% A: x ≥ 0.4(x + y)\nSimplify: x ≥ 0.4x + 0.4y → 0.6x ≥ 0.4y → 3x ≥ 2y\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Key translation points\n- "At least 40%" means ≥ 0.4 × total\n- Percentage constraints need careful algebra\n- Simplify to linear form'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Translation Practice 1',
      problem: 'A bakery produces cakes and pastries. Each cake uses 2 kg of flour and 3 eggs. Each pastry uses 1 kg of flour and 2 eggs. Available: 50 kg flour and 80 eggs. Profit: Cake ₹200, Pastry ₹150. Translate into LP formulation.',
      hint: 'Let x = cakes, y = pastries. What are the flour and egg constraints? What is the objective?',
      solution: 'Let x = cakes, y = pastries\nMaximize Z = 200x + 150y\nSubject to:\n2x + y ≤ 50 (Flour)\n3x + 2y ≤ 80 (Eggs)\nx, y ≥ 0'
    },
    {
      id: 2,
      title: 'Translation Practice 2',
      problem: 'A diet must have at least 30 units of Vitamin A and 20 units of Vitamin B. Food P has 5 units of A and 2 units of B per serving, costing ₹30. Food Q has 3 units of A and 4 units of B per serving, costing ₹20. Translate into LP formulation.',
      hint: 'Let x = servings of Food P, y = servings of Food Q. What are the vitamin constraints? What is the objective?',
      solution: 'Let x = Food P, y = Food Q\nMinimize Z = 30x + 20y\nSubject to:\n5x + 3y ≥ 30 (Vitamin A)\n2x + 4y ≥ 20 (Vitamin B)\nx, y ≥ 0'
    },
    {
      id: 3,
      title: 'Translation Practice 3',
      problem: 'A factory produces two products with these conditions: Total production must be at least 50 units. Product A must be at least 30% of total production. Product A uses 2 hours, Product B uses 3 hours. Available: 150 labor hours. Profit: A = ₹100, B = ₹120. Translate into LP formulation.',
      hint: 'Let x = Product A, y = Product B. Total production: x + y ≥ 50. 30% constraint: x ≥ 0.3(x + y).',
      solution: 'Let x = Product A, y = Product B\nMaximize Z = 100x + 120y\nSubject to:\n2x + 3y ≤ 150\nx + y ≥ 50\nx ≥ 0.3(x + y) → 0.7x ≥ 0.3y → 7x ≥ 3y\nx, y ≥ 0'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Translating Verbal Conditions into Mathematical Constraints
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to convert word problems into mathematical LP formulations by translating 
            verbal conditions into variables, objective functions, and constraints.
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
                  ? "bg-amber-600 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/30"
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
              {/* What is Translation? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is Translation in LP?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Translation in LP is the process of converting a word problem into a mathematical 
                  formulation. This involves identifying variables, the objective function, and all 
                  constraints from the verbal description. This is the most critical skill in 
                  applying LP to real-world problems.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Translation Skills</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Identifying decision variables</li>
                      <li>Recognizing objective (max/min)</li>
                      <li>Converting verbal constraints</li>
                      <li>Setting up non-negativity</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Common Verbal Clues</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>"Maximize" / "Minimize" → Objective</li>
                      <li>"At most" / "No more than" → ≤</li>
                      <li>"At least" / "Minimum" → ≥</li>
                      <li>"Available" → Resource constraint</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Translation Guide */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Translation Guide: Verbal to Mathematical
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Verbal Phrase</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Mathematical Meaning</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Example</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">"At most", "No more than"</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">≤</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">x + y ≤ 10</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">"At least", "Minimum"</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">≥</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">x + y ≥ 8</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">"Exactly", "Equal to"</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">=</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">x + y = 12</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">"Available", "Limited to"</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">≤ (Resource)</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">2x + 3y ≤ 120</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">"Requirement", "Must have"</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">≥ (Requirement)</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">4x + 2y ≥ 24</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">"Profit per unit"</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Coefficient in objective</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Z = 40x + 50y</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">"Cost per unit"</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Coefficient in objective</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Z = 20x + 30y</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">"Percentage", "Ratio"</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Linear combination</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">x ≥ 0.4(x + y)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Steps to Translate */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Steps to Translate Verbal Problems
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📖</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 1</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Read carefully and identify variables</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">🎯</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 2</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Identify objective (max/min)</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📋</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 3</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Identify all constraints</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">✅</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 4</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Add non-negativity and verify</p>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Translation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Underline key phrases (maximize, at least, etc.)</li>
                      <li>Write variables with units clearly</li>
                      <li>Check units are consistent</li>
                      <li>Simplify percentage constraints carefully</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Mixing up ≤ and ≥</li>
                      <li>Forgetting non-negativity</li>
                      <li>Misidentifying the objective</li>
                      <li>Incorrectly translating percentages</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mini Checklist */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  ✅ Translation Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Variables identified with units</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Objective correctly identified (max/min)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">All constraints identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Inequality direction correct (≤ or ≥)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Percentage constraints simplified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Non-negativity included</span>
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
                        <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Verbal Problem</h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {example.problem}
                        </p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">LP Formulation</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.solution}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleExample(example.id)}
                        className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-300"
                      >
                        {showExample[example.id] ? 'Hide Translation Steps' : 'Show Translation Steps'}
                      </button>
                    </div>
                    {showExample[example.id] && (
                      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                        <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">📝 Translation Steps</h5>
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
                  Practice Problems - Translation
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
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Translate this problem into an LP formulation.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setShowSolution(showSolution === problem.id ? null : problem.id)}
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300"
                        >
                          {showSolution === problem.id ? 'Hide Formulation' : 'Show Formulation'}
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
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
                  💡 Tips for Translation Practice
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Look for key words:</span> "at most" → ≤, "at least" → ≥</li>
                  <li><span className="font-medium">Identify the objective:</span> Look for "maximize" or "minimize"</li>
                  <li><span className="font-medium">Check units:</span> Make sure all units are consistent</li>
                  <li><span className="font-medium">Verify each constraint:</span> Does it match the verbal condition?</li>
                  <li><span className="font-medium">Simplify percentages:</span> Convert percentage constraints to linear form</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Translating Verbal Conditions FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Translating Verbal Conditions into Mathematical Constraints"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic4_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Translation is the most critical skill in LP. I've seen students who understand the math perfectly but struggle to formulate the problem from a word description. I tell my students that translation is like learning a new language - you need to practice regularly to become fluent. The key is to look for the 'clue words' that tell you what type of constraint or objective you're dealing with. I encourage students to underline these clue words as they read and to always verify their formulation by 'translating' it back into words." />
        </div>
      </div>
    </div>
  );
};

export default Topic4;