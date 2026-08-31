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
      title: 'Example 1: Diet Planning',
      problem: 'A dietitian needs to plan a meal that provides at least 24 units of protein and 18 units of carbohydrates. Food A costs ₹20 per serving and provides 4 units of protein and 3 units of carbohydrates. Food B costs ₹30 per serving and provides 3 units of protein and 5 units of carbohydrates. What is the minimum cost diet?',
      solution: 'Let x = servings of Food A, y = servings of Food B\nMinimize Z = 20x + 30y\nSubject to:\n4x + 3y ≥ 24 (Protein)\n3x + 5y ≥ 18 (Carbs)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Define variables\nx = servings of Food A, y = servings of Food B\n\nStep 2: Formulate objective function\nCost of Food A = 20x, Cost of Food B = 30y\nMinimize Z = 20x + 30y\n\nStep 3: Formulate constraints\nProtein: 4x + 3y ≥ 24\nCarbohydrates: 3x + 5y ≥ 18\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Solve graphically\nCorner points: (0,8), (6,2), (6,0)\nZ(0,8) = 20(0) + 30(8) = 240\nZ(6,2) = 20(6) + 30(2) = 120 + 60 = 180\nZ(6,0) = 20(6) + 30(0) = 120\n\nStep 5: Optimal solution\nMinimum cost = ₹120 at (6,0)\nUse 6 servings of Food A and 0 servings of Food B.\n\nNutrient check:\nProtein: 4(6) + 3(0) = 24 (exactly met)\nCarbs: 3(6) + 5(0) = 18 (exactly met)'
    },
    {
      id: 2,
      title: 'Example 2: Blending Problem',
      problem: 'A company produces a product by blending two materials. Material X costs ₹50 per kg and contains 80% of ingredient A. Material Y costs ₹40 per kg and contains 50% of ingredient A. The product must contain at least 60 kg of ingredient A. Available: 100 kg of Material X and 80 kg of Material Y. What is the minimum cost blend?',
      solution: 'Let x = kg of Material X, y = kg of Material Y\nMinimize Z = 50x + 40y\nSubject to:\n0.8x + 0.5y ≥ 60 (Ingredient A)\nx ≤ 100 (Material X availability)\ny ≤ 80 (Material Y availability)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Define variables\nx = kg of Material X, y = kg of Material Y\n\nStep 2: Formulate objective function\nCost of Material X = 50x, Cost of Material Y = 40y\nMinimize Z = 50x + 40y\n\nStep 3: Formulate constraints\nIngredient A: 0.8x + 0.5y ≥ 60\nMaterial X availability: x ≤ 100\nMaterial Y availability: y ≤ 80\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Solve graphically\nCorner points: (75,0), (25,80), (100,0)\nZ(75,0) = 50(75) + 40(0) = 3,750\nZ(25,80) = 50(25) + 40(80) = 1,250 + 3,200 = 4,450\nZ(100,0) = 50(100) + 40(0) = 5,000\n\nStep 5: Optimal solution\nMinimum cost = ₹3,750 at (75,0)\nUse 75 kg of Material X and 0 kg of Material Y.\n\nCheck: 0.8(75) = 60 kg of ingredient A (exactly met)'
    },
    {
      id: 3,
      title: 'Example 3: Production Planning',
      problem: 'A factory must produce at least 100 units of product. Two machines are available. Machine A costs ₹200 per hour and produces 10 units per hour. Machine B costs ₹150 per hour and produces 8 units per hour. Machine A can run for at most 12 hours, Machine B for at most 10 hours. Find the minimum cost production plan.',
      solution: 'Let x = hours on Machine A, y = hours on Machine B\nMinimize Z = 200x + 150y\nSubject to:\n10x + 8y ≥ 100 (Production)\nx ≤ 12 (Machine A max)\ny ≤ 10 (Machine B max)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Define variables\nx = hours on Machine A, y = hours on Machine B\n\nStep 2: Formulate objective function\nCost of Machine A = 200x, Cost of Machine B = 150y\nMinimize Z = 200x + 150y\n\nStep 3: Formulate constraints\nProduction: 10x + 8y ≥ 100\nMachine A max: x ≤ 12\nMachine B max: y ≤ 10\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Solve graphically\nCorner points: (10,0), (12,0), (12,5), (10,0)\nZ(10,0) = 200(10) + 150(0) = 2,000\nZ(12,0) = 200(12) + 150(0) = 2,400\nZ(12,5) = 200(12) + 150(5) = 2,400 + 750 = 3,150\n\nStep 5: Optimal solution\nMinimum cost = ₹2,000 at (10,0)\nUse Machine A for 10 hours only.\n\nCheck: 10(10) = 100 units (exactly met)'
    },
    {
      id: 4,
      title: 'Example 4: Transportation Cost',
      problem: 'A company needs to ship 200 units of goods from two warehouses. Warehouse 1 has 120 units available and costs ₹5 per unit to ship. Warehouse 2 has 100 units available and costs ₹7 per unit to ship. Find the minimum cost shipping plan.',
      solution: 'Let x = units from Warehouse 1, y = units from Warehouse 2\nMinimize Z = 5x + 7y\nSubject to:\nx + y = 200 (Total demand)\nx ≤ 120 (Warehouse 1 supply)\ny ≤ 100 (Warehouse 2 supply)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Define variables\nx = units from Warehouse 1, y = units from Warehouse 2\n\nStep 2: Formulate objective function\nCost from Warehouse 1 = 5x, Cost from Warehouse 2 = 7y\nMinimize Z = 5x + 7y\n\nStep 3: Formulate constraints\nTotal demand: x + y = 200\nWarehouse 1 supply: x ≤ 120\nWarehouse 2 supply: y ≤ 100\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Solve graphically\nCorner points: (100,100), (120,80)\nZ(100,100) = 5(100) + 7(100) = 500 + 700 = 1,200\nZ(120,80) = 5(120) + 7(80) = 600 + 560 = 1,160\n\nStep 5: Optimal solution\nMinimum cost = ₹1,160 at (120,80)\nShip 120 units from Warehouse 1 and 80 units from Warehouse 2.'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Nutrition Planning',
      problem: 'A nutritionist needs to meet minimum requirements of 20 units of Vitamin A and 15 units of Vitamin B. Food P costs ₹25 per unit and provides 5 units of Vitamin A and 2 units of Vitamin B. Food Q costs ₹35 per unit and provides 3 units of Vitamin A and 5 units of Vitamin B. Find the minimum cost diet.',
      hint: 'Let x = Food P units, y = Food Q units. What are the vitamin constraints?',
      solution: 'Let x = Food P, y = Food Q\nMinimize Z = 25x + 35y\nSubject to:\n5x + 3y ≥ 20 (Vitamin A)\n2x + 5y ≥ 15 (Vitamin B)\nx, y ≥ 0'
    },
    {
      id: 2,
      title: 'Minimum Cost Production',
      problem: 'A factory must produce at least 150 units. Machine A costs ₹300 per hour and produces 15 units per hour. Machine B costs ₹250 per hour and produces 10 units per hour. Machine A max 8 hours, Machine B max 10 hours. Find minimum cost.',
      hint: 'Let x = hours on Machine A, y = hours on Machine B. What are the production and machine constraints?',
      solution: 'Let x = Machine A hours, y = Machine B hours\nMinimize Z = 300x + 250y\nSubject to:\n15x + 10y ≥ 150\nx ≤ 8\ny ≤ 10\nx, y ≥ 0'
    },
    {
      id: 3,
      title: 'Blending Optimization',
      problem: 'A chemical company needs to produce 100 kg of a mixture containing at least 40 kg of ingredient X. Material A costs ₹60/kg and contains 60% of ingredient X. Material B costs ₹50/kg and contains 40% of ingredient X. Available: 80 kg of Material A, 70 kg of Material B. Find minimum cost.',
      hint: 'Let x = kg of Material A, y = kg of Material B. What are the ingredient and availability constraints?',
      solution: 'Let x = Material A, y = Material B\nMinimize Z = 60x + 50y\nSubject to:\n0.6x + 0.4y ≥ 40\nx + y ≥ 100\nx ≤ 80\ny ≤ 70\nx, y ≥ 0'
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
            Cost Minimization Problems
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to formulate and solve cost minimization problems using linear programming 
            to find the optimal solution that meets requirements at the lowest cost.
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
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-200 dark:shadow-rose-900/30"
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
              {/* What is Cost Minimization? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is a Cost Minimization Problem?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  A cost minimization problem is a type of linear programming problem where the 
                  objective is to minimize total cost while meeting certain requirements or demands. 
                  These problems are common in diet planning, blending, purchasing, and production 
                  planning where costs must be minimized.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Characteristics</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Objective: Minimize total cost</li>
                      <li>Each option has a cost per unit</li>
                      <li>Requirements must be met (≥ constraints)</li>
                      <li>Goal: Meet requirements at lowest cost</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Real-World Applications</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Diet and nutrition planning</li>
                      <li>Raw material blending</li>
                      <li>Transportation and logistics</li>
                      <li>Production planning with cost constraints</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Steps to Formulate */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Steps to Formulate a Cost Minimization Problem
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📝</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 1</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Identify options and variables</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">💰</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 2</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Determine cost per unit</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📋</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 3</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Identify requirements (≥ constraints)</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">✅</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 4</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Solve and interpret results</p>
                  </div>
                </div>
              </div>

              {/* General Form */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  General Form of Cost Minimization Problem
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 font-mono text-sm">
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Objective:</p>
                    <p className="ml-4">Minimize Z = c₁x₁ + c₂x₂ + ... + cₙxₙ</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 ml-4">Where cᵢ = cost per unit of option i</p>
                    <p className="font-bold text-green-600 dark:text-green-400 mt-2">Subject to (Requirements):</p>
                    <p className="ml-4">a₁₁x₁ + a₁₂x₂ + ... + a₁ₙxₙ ≥ b₁ (Requirement 1)</p>
                    <p className="ml-4">a₂₁x₁ + a₂₂x₂ + ... + a₂ₙxₙ ≥ b₂ (Requirement 2)</p>
                    <p className="ml-4">...</p>
                    <p className="font-bold text-purple-600 dark:text-purple-400 mt-2">Availability Constraints:</p>
                    <p className="ml-4">x₁ ≤ max₁, x₂ ≤ max₂, ... (Maximum limits)</p>
                    <p className="ml-4">x₁, x₂, ..., xₙ ≥ 0</p>
                  </div>
                </div>
              </div>

              {/* Key Differences from Profit Maximization */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Key Differences from Profit Maximization
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-4 border-l-4 border-rose-500">
                    <h4 className="font-semibold text-rose-700 dark:text-rose-400 mb-2">Cost Minimization</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Objective: Min Z = c₁x₁ + c₂x₂</li>
                      <li>cᵢ = cost per unit</li>
                      <li>Uses ≥ constraints (requirements)</li>
                      <li>Focus: Minimize expenses</li>
                      <li>Used for diet, blending problems</li>
                    </ul>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border-l-4 border-indigo-500">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Profit Maximization</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Objective: Max Z = p₁x₁ + p₂x₂</li>
                      <li>pᵢ = profit per unit</li>
                      <li>Uses ≤ constraints (resources)</li>
                      <li>Focus: Maximize profit</li>
                      <li>Used for production planning</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Cost Minimization Problems
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Identify all requirements carefully</li>
                      <li>Check for minimum and maximum availability</li>
                      <li>Consider quality constraints</li>
                      <li>Look for surplus nutrients or resources</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Using ≤ instead of ≥ for requirements</li>
                      <li>Forgetting availability constraints</li>
                      <li>Ignoring surplus in requirements</li>
                      <li>Misinterpreting the feasible region</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Cost per unit correctly identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">All requirements included (≥ constraints)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Availability constraints included</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Non-negativity constraints included</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Surplus resources identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Solution verified and interpreted</span>
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
                        className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-all duration-300"
                      >
                        {showExample[example.id] ? 'Hide Detailed Solution' : 'Show Detailed Solution'}
                      </button>
                    </div>
                    {showExample[example.id] && (
                      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                        <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">📝 Detailed Solution</h5>
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
                        Problem {problem.id}: {problem.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {problem.problem}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        Formulate the LP problem to minimize cost.
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
              <div className="bg-rose-50 dark:bg-rose-900/20 rounded-lg p-6 border border-rose-200 dark:border-rose-800">
                <h4 className="font-semibold text-rose-700 dark:text-rose-400 mb-2">
                  💡 Tips for Solving Cost Minimization Problems
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Identify requirements:</span> What must be met? (≥ constraints)</li>
                  <li><span className="font-medium">Consider availability:</span> What limits your options? (≤ constraints)</li>
                  <li><span className="font-medium">Define variables clearly:</span> What does each variable represent?</li>
                  <li><span className="font-medium">Include non-negativity:</span> Quantities cannot be negative</li>
                  <li><span className="font-medium">Check for surplus:</span> Some requirements may be exceeded</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Cost Minimization Problems FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Cost Minimization Problems"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Cost minimization problems are the natural complement to profit maximization. In many real-world scenarios, the objective is to minimize costs while meeting specific requirements - from diet planning to manufacturing. I emphasize to students that the key difference is the direction of the constraints: profit maximization typically has ≤ (resource constraints), while cost minimization typically has ≥ (requirement constraints). This simple distinction helps students quickly identify which type of problem they're dealing with." />
        </div>
      </div>
    </div>
  );
};

export default Topic3;