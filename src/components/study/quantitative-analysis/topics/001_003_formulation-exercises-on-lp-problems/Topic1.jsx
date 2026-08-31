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
      title: 'Example 1: Budget Allocation',
      problem: 'A company has ₹500,000 to allocate between two departments: Production (x) and Marketing (y). Production generates 8 units of profit per ₹1,000, while Marketing generates 6 units per ₹1,000. At least ₹200,000 must go to Production and at least ₹100,000 to Marketing.',
      solution: 'Let x = amount allocated to Production (₹000), y = amount allocated to Marketing (₹000)\nMaximize Z = 8x + 6y\nSubject to:\nx + y ≤ 500 (Budget)\nx ≥ 200 (Production minimum)\ny ≥ 100 (Marketing minimum)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Define variables\nx = Production allocation (₹000), y = Marketing allocation (₹000)\n\nStep 2: Formulate objective function\nProduction generates 8 units per ₹1,000: 8x\nMarketing generates 6 units per ₹1,000: 6y\nMaximize Z = 8x + 6y\n\nStep 3: Formulate constraints\nBudget: x + y ≤ 500\nProduction minimum: x ≥ 200\nMarketing minimum: y ≥ 100\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Solve graphically\nCorner points: (200,100), (400,100), (200,300)\nZ(200,100) = 8(200) + 6(100) = 1600 + 600 = 2200\nZ(400,100) = 8(400) + 6(100) = 3200 + 600 = 3800\nZ(200,300) = 8(200) + 6(300) = 1600 + 1800 = 3400\n\nStep 5: Optimal solution\nMaximum value = 3800 at (400,100)\nAllocate ₹400,000 to Production and ₹100,000 to Marketing.'
    },
    {
      id: 2,
      title: 'Example 2: Staff Assignment',
      problem: 'A consulting firm has 240 hours available to assign between two clients. Client A requires 4 hours per unit and generates ₹5,000 profit. Client B requires 6 hours per unit and generates ₹7,000 profit. At least 20 units of Client A and 15 units of Client B must be served.',
      solution: 'Let x = units of Client A, y = units of Client B\nMaximize Z = 5000x + 7000y\nSubject to:\n4x + 6y ≤ 240 (Total hours)\nx ≥ 20 (Client A minimum)\ny ≥ 15 (Client B minimum)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Define variables\nx = units of Client A, y = units of Client B\n\nStep 2: Formulate objective function\nProfit from Client A = 5000x, Profit from Client B = 7000y\nMaximize Z = 5000x + 7000y\n\nStep 3: Formulate constraints\nTotal hours: 4x + 6y ≤ 240\nClient A minimum: x ≥ 20\nClient B minimum: y ≥ 15\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Solve graphically\nCorner points: (20,15), (37.5,15), (20,26.67)\nZ(20,15) = 5000(20) + 7000(15) = 100000 + 105000 = 205000\nZ(37.5,15) = 5000(37.5) + 7000(15) = 187500 + 105000 = 292500\nZ(20,26.67) = 5000(20) + 7000(26.67) = 100000 + 186690 = 286690\n\nStep 5: Optimal solution\nMaximum profit = ₹292,500 at (37.5, 15)\nServe 37.5 units of Client A and 15 units of Client B.'
    },
    {
      id: 3,
      title: 'Example 3: Advertising Budget',
      problem: 'A company has ₹100,000 for advertising on TV and Radio. TV ads cost ₹5,000 each and reach 10,000 people. Radio ads cost ₹2,000 each and reach 5,000 people. At least 5 TV ads and 10 Radio ads must be placed.',
      solution: 'Let x = number of TV ads, y = number of Radio ads\nMaximize Z = 10x + 5y (Reach in 000)\nSubject to:\n5x + 2y ≤ 100 (Budget)\nx ≥ 5 (TV minimum)\ny ≥ 10 (Radio minimum)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Define variables\nx = number of TV ads, y = number of Radio ads\n\nStep 2: Formulate objective function\nTV reach = 10,000 per ad = 10x\nRadio reach = 5,000 per ad = 5y\nMaximize Z = 10x + 5y (Reach in 000)\n\nStep 3: Formulate constraints\nBudget: 5x + 2y ≤ 100 (₹000)\nTV minimum: x ≥ 5\nRadio minimum: y ≥ 10\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Solve graphically\nCorner points: (5,10), (16,10), (5,37.5)\nZ(5,10) = 10(5) + 5(10) = 50 + 50 = 100\nZ(16,10) = 10(16) + 5(10) = 160 + 50 = 210\nZ(5,37.5) = 10(5) + 5(37.5) = 50 + 187.5 = 237.5\n\nStep 5: Optimal solution\nMaximum reach = 237,500 people at (5, 37.5)\nPlace 5 TV ads and 37.5 Radio ads (round to 38).'
    },
    {
      id: 4,
      title: 'Example 4: Resource Distribution',
      problem: 'A school district has ₹200,000 to allocate between two schools. School A requires ₹8,000 per student and has capacity for 100 students. School B requires ₹6,000 per student and has capacity for 120 students. At least 60 students must be served at each school.',
      solution: 'Let x = students at School A, y = students at School B\nMaximize Z = x + y (Total students)\nSubject to:\n8x + 6y ≤ 200 (Budget)\nx ≤ 100 (School A capacity)\ny ≤ 120 (School B capacity)\nx ≥ 60 (School A minimum)\ny ≥ 60 (School B minimum)\nx, y ≥ 0',
      detailedSolution: 'Step 1: Define variables\nx = students at School A, y = students at School B\n\nStep 2: Formulate objective function\nMaximize total students: Z = x + y\n\nStep 3: Formulate constraints\nBudget: 8x + 6y ≤ 200 (₹000)\nSchool A capacity: x ≤ 100\nSchool B capacity: y ≤ 120\nSchool A minimum: x ≥ 60\nSchool B minimum: y ≥ 60\nNon-negativity: x ≥ 0, y ≥ 0\n\nStep 4: Solve graphically\nCorner points: (60,60), (100,60), (60,120)\nZ(60,60) = 60 + 60 = 120\nZ(100,60) = 100 + 60 = 160\nZ(60,120) = 60 + 120 = 180\n\nStep 5: Optimal solution\nMaximum students = 180 at (60,120)\nServe 60 students at School A and 120 students at School B.\n\nCheck budget: 8(60) + 6(120) = 480 + 720 = 1200 (₹120,000) within budget.'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Budget Allocation',
      problem: 'A company has ₹800,000 to allocate between Research (x) and Development (y). Research yields 10 units of value per ₹1,000, Development yields 8 units per ₹1,000. At least ₹300,000 must go to Research and at least ₹200,000 to Development.',
      hint: 'Let x = Research allocation (₹000), y = Development allocation (₹000). What is the objective? What are the constraints?',
      solution: 'Let x = Research (₹000), y = Development (₹000)\nMaximize Z = 10x + 8y\nSubject to:\nx + y ≤ 800 (Budget)\nx ≥ 300 (Research minimum)\ny ≥ 200 (Development minimum)\nx, y ≥ 0'
    },
    {
      id: 2,
      title: 'Staff Scheduling',
      problem: 'A call center has 300 hours of staff time available. Two types of calls need handling: Sales calls (x) require 2 minutes each and generate ₹50 profit. Support calls (y) require 3 minutes each and generate ₹40 profit. At least 2,000 Sales calls and 1,500 Support calls must be handled.',
      hint: 'Convert minutes to hours. Let x = Sales calls, y = Support calls. What is the time constraint?',
      solution: 'Let x = Sales calls, y = Support calls\nMaximize Z = 50x + 40y\nSubject to:\n(2/60)x + (3/60)y ≤ 300 (Hours)\nx ≥ 2000 (Sales minimum)\ny ≥ 1500 (Support minimum)\nx, y ≥ 0'
    },
    {
      id: 3,
      title: 'Equipment Allocation',
      problem: 'A construction company has 200 machine-hours available. Two types of jobs need equipment: Excavation (x) requires 4 hours and generates ₹8,000 profit. Lifting (y) requires 2 hours and generates ₹5,000 profit. At least 20 Excavation jobs and 30 Lifting jobs must be completed.',
      hint: 'Let x = Excavation jobs, y = Lifting jobs. What is the machine-hour constraint?',
      solution: 'Let x = Excavation jobs, y = Lifting jobs\nMaximize Z = 8000x + 5000y\nSubject to:\n4x + 2y ≤ 200 (Machine hours)\nx ≥ 20 (Excavation minimum)\ny ≥ 30 (Lifting minimum)\nx, y ≥ 0'
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
            Resource Allocation Problems
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to formulate and solve resource allocation problems using linear programming 
            to optimally distribute limited resources among competing activities.
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
              {/* What is Resource Allocation? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is a Resource Allocation Problem?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  A resource allocation problem involves distributing limited resources (money, time, 
                  personnel, materials) among competing activities or departments to achieve the best 
                  overall outcome. Unlike product-mix problems that focus on production quantities, 
                  resource allocation problems focus on how to best use available resources.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Characteristics</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Limited resources to distribute</li>
                      <li>Multiple activities/departments</li>
                      <li>Different resource consumption rates</li>
                      <li>Different returns from each activity</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Real-World Applications</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Budget allocation across departments</li>
                      <li>Staff scheduling and assignment</li>
                      <li>Investment portfolio management</li>
                      <li>Public resource distribution</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Steps to Formulate */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Steps to Formulate a Resource Allocation Problem
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📝</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 1</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Identify resources to allocate</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">🎯</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 2</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Define allocation variables</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📋</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 3</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Formulate resource constraints</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">✅</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 4</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Add minimum/maximum requirements</p>
                  </div>
                </div>
              </div>

              {/* General Form */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  General Form of Resource Allocation Problem
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 font-mono text-sm">
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Objective:</p>
                    <p className="ml-4">Maximize (or Minimize) Z = c₁x₁ + c₂x₂ + ... + cₙxₙ</p>
                    <p className="font-bold text-green-600 dark:text-green-400 mt-2">Resource Constraints:</p>
                    <p className="ml-4">a₁₁x₁ + a₁₂x₂ + ... + a₁ₙxₙ ≤ b₁ (Resource 1)</p>
                    <p className="ml-4">a₂₁x₁ + a₂₂x₂ + ... + a₂ₙxₙ ≤ b₂ (Resource 2)</p>
                    <p className="ml-4">...</p>
                    <p className="font-bold text-purple-600 dark:text-purple-400 mt-2">Additional Requirements:</p>
                    <p className="ml-4">x₁ ≥ min₁, x₂ ≥ min₂, ... (Minimum allocations)</p>
                    <p className="ml-4">x₁ ≤ max₁, x₂ ≤ max₂, ... (Maximum allocations)</p>
                    <p className="ml-4 font-bold">x₁, x₂, ..., xₙ ≥ 0</p>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Resource Allocation Problems
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Identify all resources that constrain allocation</li>
                      <li>Include minimum and maximum allocation requirements</li>
                      <li>Consider both quantitative and qualitative factors</li>
                      <li>Use sensitivity analysis for robust decisions</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Forgetting minimum allocation requirements</li>
                      <li>Ignoring capacity constraints</li>
                      <li>Confusing resource consumption rates</li>
                      <li>Overlooking non-negativity</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">All resources identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Allocation variables defined</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Resource constraints formulated</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Minimum/maximum requirements included</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Non-negativity constraints added</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Units are consistent</span>
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
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
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
                        Formulate the LP problem to maximize value.
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
                  💡 Tips for Solving Resource Allocation Problems
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Identify all resources:</span> What limits the allocation?</li>
                  <li><span className="font-medium">Consider requirements:</span> Are there minimum or maximum allocations?</li>
                  <li><span className="font-medium">Define variables clearly:</span> What does each variable represent?</li>
                  <li><span className="font-medium">Include non-negativity:</span> Allocations cannot be negative</li>
                  <li><span className="font-medium">Use correct units:</span> Ensure consistency across all constraints</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Resource Allocation Problems FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Resource Allocation Problems"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Resource allocation problems are a natural progression from product-mix problems. While product-mix focuses on production quantities, resource allocation focuses on distributing limited resources. Both are essential LP skills. I've found that students often find resource allocation problems more intuitive because they can relate to budget allocation, time management, and resource distribution in their own lives. Encourage students to think about how they allocate their own time and money - this makes the concepts more relatable." />
        </div>
      </div>
    </div>
  );
};

export default Topic1;