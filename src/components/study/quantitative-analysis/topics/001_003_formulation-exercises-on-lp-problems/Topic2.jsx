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
      title: 'Example 1: Furniture Manufacturing',
      problem: 'A furniture company produces chairs and tables. Each chair requires 2 hours of labor and 3 units of wood. Each table requires 3 hours of labor and 2 units of wood. The company has 120 labor hours and 90 wood units available daily. Profit per chair is ₹40 and per table is ₹50. How many chairs and tables should be produced to maximize profit?',
      solution: 'Let x = number of chairs, y = number of tables\nMaximize Z = 40x + 50y\nSubject to:\n2x + 3y ≤ 120 (Labor)\n3x + 2y ≤ 90 (Wood)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Define variables\nx = number of chairs, y = number of tables\n\nStep 2: Formulate objective function\nProfit from chairs = 40x, Profit from tables = 50y\nMaximize Z = 40x + 50y\n\nStep 3: Formulate constraints\nLabor: 2x + 3y ≤ 120\nWood: 3x + 2y ≤ 90\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Solve graphically\nCorner points: (0,0), (30,0), (18,24), (0,40)\nZ(0,0) = 0\nZ(30,0) = 40(30) + 50(0) = 1200\nZ(18,24) = 40(18) + 50(24) = 720 + 1200 = 1920\nZ(0,40) = 40(0) + 50(40) = 2000\n\nStep 5: Optimal solution\nMaximum profit = ₹2000 at (0,40)\nProduce 0 chairs and 40 tables.\n\nResource utilization:\nLabor: 2(0) + 3(40) = 120 hours (fully utilized)\nWood: 3(0) + 2(40) = 80 units (10 units slack)'
    },
    {
      id: 2,
      title: 'Example 2: Bakery Profit Maximization',
      problem: 'A bakery produces cakes and pastries. Each cake requires 2 kg flour and 3 hours labor. Each pastry requires 1 kg flour and 2 hours labor. The bakery has 200 kg flour and 150 hours labor available. Profit per cake is ₹600 and per pastry is ₹400. What is the optimal production mix?',
      solution: 'Let x = number of cakes, y = number of pastries\nMaximize Z = 600x + 400y\nSubject to:\n2x + y ≤ 200 (Flour)\n3x + 2y ≤ 150 (Labor)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Define variables\nx = number of cakes, y = number of pastries\n\nStep 2: Formulate objective function\nProfit from cakes = 600x, Profit from pastries = 400y\nMaximize Z = 600x + 400y\n\nStep 3: Formulate constraints\nFlour: 2x + y ≤ 200\nLabor: 3x + 2y ≤ 150\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Solve graphically\nCorner points: (0,0), (50,0), (25,75), (0,100)\nZ(0,0) = 0\nZ(50,0) = 600(50) + 400(0) = 30000\nZ(25,75) = 600(25) + 400(75) = 15000 + 30000 = 45000\nZ(0,100) = 600(0) + 400(100) = 40000\n\nStep 5: Optimal solution\nMaximum profit = ₹45,000 at (25,75)\nProduce 25 cakes and 75 pastries.\n\nResource utilization:\nFlour: 2(25) + 75 = 125 kg (75 kg slack)\nLabor: 3(25) + 2(75) = 75 + 150 = 150 hours (fully utilized)'
    },
    {
      id: 3,
      title: 'Example 3: Electronics Profit Maximization',
      problem: 'An electronics company produces Standard and Premium devices. Standard requires 2 hours assembly and 1 hour testing. Premium requires 3 hours assembly and 2 hours testing. Available: 180 assembly hours and 100 testing hours daily. Profit: Standard ₹500, Premium ₹800. Find the profit-maximizing production plan.',
      solution: 'Let x = Standard units, y = Premium units\nMaximize Z = 500x + 800y\nSubject to:\n2x + 3y ≤ 180 (Assembly)\nx + 2y ≤ 100 (Testing)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Define variables\nx = number of Standard units, y = number of Premium units\n\nStep 2: Formulate objective function\nProfit from Standard = 500x, Profit from Premium = 800y\nMaximize Z = 500x + 800y\n\nStep 3: Formulate constraints\nAssembly: 2x + 3y ≤ 180\nTesting: x + 2y ≤ 100\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Solve graphically\nCorner points: (0,0), (90,0), (60,20), (0,50)\nZ(0,0) = 0\nZ(90,0) = 500(90) + 800(0) = 45000\nZ(60,20) = 500(60) + 800(20) = 30000 + 16000 = 46000\nZ(0,50) = 500(0) + 800(50) = 40000\n\nStep 5: Optimal solution\nMaximum profit = ₹46,000 at (60,20)\nProduce 60 Standard units and 20 Premium units.\n\nResource utilization:\nAssembly: 2(60) + 3(20) = 120 + 60 = 180 hours (fully utilized)\nTesting: 60 + 2(20) = 60 + 40 = 100 hours (fully utilized)'
    },
    {
      id: 4,
      title: 'Example 4: Agricultural Profit Maximization',
      problem: 'A farmer grows wheat and corn. Wheat requires 2 acres and 3 hours of labor per unit. Corn requires 3 acres and 2 hours of labor per unit. Available: 100 acres and 120 labor hours. Profit: Wheat ₹8,000/unit, Corn ₹10,000/unit. What crop mix maximizes profit?',
      solution: 'Let x = units of wheat, y = units of corn\nMaximize Z = 8000x + 10000y\nSubject to:\n2x + 3y ≤ 100 (Land)\n3x + 2y ≤ 120 (Labor)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Define variables\nx = units of wheat, y = units of corn\n\nStep 2: Formulate objective function\nProfit from wheat = 8000x, Profit from corn = 10000y\nMaximize Z = 8000x + 10000y\n\nStep 3: Formulate constraints\nLand: 2x + 3y ≤ 100\nLabor: 3x + 2y ≤ 120\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Solve graphically\nCorner points: (0,0), (50,0), (28,16), (0,40)\nZ(0,0) = 0\nZ(50,0) = 8000(50) + 10000(0) = 400000\nZ(28,16) = 8000(28) + 10000(16) = 224000 + 160000 = 384000\nZ(0,40) = 8000(0) + 10000(40) = 400000\n\nStep 5: Optimal solution\nMaximum profit = ₹400,000 at (50,0) OR (0,40)\nMultiple optimal solutions exist!\n\nInterpretation:\nBoth wheat-only (50 units) and corn-only (40 units) give the same profit.\nThe farmer can choose based on other factors (market demand, risk, etc.)'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Garment Factory',
      problem: 'A garment factory produces shirts and pants. Each shirt requires 2 hours of cutting and 1 hour of sewing. Each pant requires 1 hour of cutting and 2 hours of sewing. Available: 80 cutting hours and 100 sewing hours. Profit: Shirt ₹300, Pant ₹400. Find the optimal production mix.',
      hint: 'Let x = shirts, y = pants. What are the cutting and sewing constraints?',
      solution: 'Let x = shirts, y = pants\nMaximize Z = 300x + 400y\nSubject to:\n2x + y ≤ 80 (Cutting)\nx + 2y ≤ 100 (Sewing)\nx, y ≥ 0'
    },
    {
      id: 2,
      title: 'Pharmaceutical Production',
      problem: 'A pharmaceutical company produces two drugs. Drug A requires 3 hours of mixing and 2 hours of packaging. Drug B requires 2 hours of mixing and 4 hours of packaging. Available: 120 mixing hours and 160 packaging hours. Profit: Drug A ₹500, Drug B ₹700. Maximize profit.',
      hint: 'Let x = Drug A units, y = Drug B units. What are the mixing and packaging constraints?',
      solution: 'Let x = Drug A, y = Drug B\nMaximize Z = 500x + 700y\nSubject to:\n3x + 2y ≤ 120 (Mixing)\n2x + 4y ≤ 160 (Packaging)\nx, y ≥ 0'
    },
    {
      id: 3,
      title: 'Furniture Workshop',
      problem: 'A workshop produces desks and cabinets. Desk: 4 hours carpentry, 2 hours finishing. Cabinet: 2 hours carpentry, 4 hours finishing. Available: 160 carpentry hours, 120 finishing hours. Profit: Desk ₹1,000, Cabinet ₹1,200. Maximize profit.',
      hint: 'Let x = desks, y = cabinets. What are the carpentry and finishing constraints?',
      solution: 'Let x = desks, y = cabinets\nMaximize Z = 1000x + 1200y\nSubject to:\n4x + 2y ≤ 160 (Carpentry)\n2x + 4y ≤ 120 (Finishing)\nx, y ≥ 0'
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
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Profit Maximization Problems
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to formulate and solve profit maximization problems using linear programming 
            to find the optimal product mix that generates maximum profit.
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
              {/* What is Profit Maximization? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is a Profit Maximization Problem?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  A profit maximization problem is a type of linear programming problem where the 
                  objective is to maximize total profit by determining the optimal quantities of 
                  products to produce, subject to resource constraints. This is the most common 
                  type of LP problem in business.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Characteristics</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Objective: Maximize total profit</li>
                      <li>Each product has a profit per unit</li>
                      <li>Resources limit production</li>
                      <li>Goal: Best use of limited resources</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Real-World Applications</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Manufacturing production planning</li>
                      <li>Product portfolio optimization</li>
                      <li>Resource allocation for maximum return</li>
                      <li>Pricing and product mix decisions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Steps to Formulate */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Steps to Formulate a Profit Maximization Problem
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📝</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 1</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Identify products and variables</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">💰</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 2</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Determine profit per unit</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📋</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 3</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Identify resource constraints</p>
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
                  General Form of Profit Maximization Problem
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 font-mono text-sm">
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Objective:</p>
                    <p className="ml-4">Maximize Z = p₁x₁ + p₂x₂ + ... + pₙxₙ</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 ml-4">Where pᵢ = profit per unit of product i</p>
                    <p className="font-bold text-green-600 dark:text-green-400 mt-2">Subject to:</p>
                    <p className="ml-4">a₁₁x₁ + a₁₂x₂ + ... + a₁ₙxₙ ≤ b₁ (Resource 1)</p>
                    <p className="ml-4">a₂₁x₁ + a₂₂x₂ + ... + a₂ₙxₙ ≤ b₂ (Resource 2)</p>
                    <p className="ml-4">...</p>
                    <p className="ml-4">x₁, x₂, ..., xₙ ≥ 0</p>
                  </div>
                </div>
              </div>

              {/* Key Differences from Other Problems */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Key Differences from Cost Minimization
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border-l-4 border-indigo-500">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Profit Maximization</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Objective: Max Z = p₁x₁ + p₂x₂</li>
                      <li>pᵢ = profit per unit</li>
                      <li>Typically uses ≤ constraints</li>
                      <li>Focus on revenue minus costs</li>
                      <li>Used for production planning</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Cost Minimization</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Objective: Min Z = c₁x₁ + c₂x₂</li>
                      <li>cᵢ = cost per unit</li>
                      <li>Typically uses ≥ constraints</li>
                      <li>Focus on minimizing expenses</li>
                      <li>Used for diet, blending problems</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Profit Maximization Problems
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Calculate profit per unit carefully</li>
                      <li>Consider fixed vs variable costs</li>
                      <li>Check for minimum production requirements</li>
                      <li>Include all relevant costs in profit calculation</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Confusing revenue with profit</li>
                      <li>Forgetting variable costs</li>
                      <li>Ignoring fixed costs in profit calculation</li>
                      <li>Missing minimum production constraints</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Profit per unit correctly calculated</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">All resources constraints included</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Objective function correctly formulated</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Non-negativity constraints included</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Minimum production requirements checked</span>
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
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
                      &gt;
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
                        Formulate the LP problem to maximize profit.
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
                  💡 Tips for Solving Profit Maximization Problems
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Calculate profit correctly:</span> Profit = Revenue - Variable Costs</li>
                  <li><span className="font-medium">Identify all products:</span> What are you producing?</li>
                  <li><span className="font-medium">List all resources:</span> What limits production?</li>
                  <li><span className="font-medium">Check for minimum requirements:</span> Some products may have minimum production</li>
                  <li><span className="font-medium">Include non-negativity:</span> Production quantities cannot be negative</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Profit Maximization Problems FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Profit Maximization Problems"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Profit maximization is the most common and intuitive application of LP. Students naturally understand the goal of making more profit. I emphasize the distinction between revenue and profit - students often confuse the two. The key insight is that profit maximization requires understanding both revenue (price × quantity) and costs (variable costs × quantity + fixed costs). I encourage students to think about real businesses they know and how they might use LP to make better decisions." />
        </div>
      </div>
    </div>
  );
};

export default Topic2;