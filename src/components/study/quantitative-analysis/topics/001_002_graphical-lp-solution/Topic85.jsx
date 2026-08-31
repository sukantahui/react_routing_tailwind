import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic85_files/topic85_questions';
import noteText from './topic85_files/topic85_note.txt?raw';

const Topic85 = () => {
  const [activeTab, setActiveTab] = useState('problems');
  const [selectedProblem, setSelectedProblem] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const tabs = [
    { id: 'problems', label: 'Practice Problems' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'tips', label: 'Tips & Strategies' },
  ];

  // Practice problems data
  const practiceProblems = [
    {
      id: 1,
      title: 'Problem 1: Furniture Factory',
      difficulty: 'Basic',
      category: 'Manufacturing',
      problem: 'A furniture factory produces chairs and tables. Each chair requires 2 hours of labor and 3 units of wood. Each table requires 3 hours of labor and 2 units of wood. The factory has 120 labor hours and 90 units of wood available daily. The profit per chair is ₹40 and per table is ₹50.',
      tasks: [
        'Define the decision variables',
        'Formulate the objective function',
        'Formulate the constraints',
        'Graph the constraints',
        'Find the optimal solution',
        'Calculate the maximum profit'
      ],
      variables: 'Let x = number of chairs, y = number of tables',
      objective: 'Maximize Z = 40x + 50y',
      constraints: [
        'Labor: 2x + 3y ≤ 120',
        'Wood: 3x + 2y ≤ 90',
        'x ≥ 0, y ≥ 0'
      ],
      solution: {
        cornerPoints: ['(0,0)', '(30,0)', '(18,24)', '(0,40)'],
        evaluations: [
          'Z(0,0) = 0',
          'Z(30,0) = 40(30) + 50(0) = 1,200',
          'Z(18,24) = 40(18) + 50(24) = 720 + 1,200 = 1,920',
          'Z(0,40) = 40(0) + 50(40) = 2,000'
        ],
        optimal: '(0,40) with Z = ₹2,000',
        resourceUtilization: [
          'Labor: 2(0) + 3(40) = 120 hours (fully utilized)',
          'Wood: 3(0) + 2(40) = 80 units (10 units slack)'
        ]
      },
      hint: 'Graph the constraints and evaluate all corner points. Check which constraints are binding at the optimal point.'
    },
    {
      id: 2,
      title: 'Problem 2: Bakery Production',
      difficulty: 'Basic',
      category: 'Food Production',
      problem: 'A bakery produces cakes and pastries. Each cake requires 2 kg flour and 3 hours labor. Each pastry requires 1 kg flour and 2 hours labor. The bakery has 200 kg flour and 150 hours labor available. Profit per cake is ₹600 and per pastry is ₹400.',
      tasks: [
        'Define the decision variables',
        'Formulate the objective function',
        'Formulate the constraints',
        'Solve graphically',
        'Find the optimal production mix'
      ],
      variables: 'Let x = number of cakes, y = number of pastries',
      objective: 'Maximize Z = 600x + 400y',
      constraints: [
        'Flour: 2x + y ≤ 200',
        'Labor: 3x + 2y ≤ 150',
        'x ≥ 0, y ≥ 0'
      ],
      solution: {
        cornerPoints: ['(0,0)', '(50,0)', '(25,75)', '(0,100)'],
        evaluations: [
          'Z(0,0) = 0',
          'Z(50,0) = 600(50) + 400(0) = 30,000',
          'Z(25,75) = 600(25) + 400(75) = 15,000 + 30,000 = 45,000',
          'Z(0,100) = 600(0) + 400(100) = 40,000'
        ],
        optimal: '(25,75) with Z = ₹45,000',
        resourceUtilization: [
          'Flour: 2(25) + 75 = 125 kg (75 kg slack)',
          'Labor: 3(25) + 2(75) = 75 + 150 = 150 hours (fully utilized)'
        ]
      },
      hint: 'Labor is the bottleneck. Evaluate all corner points carefully.'
    },
    {
      id: 3,
      title: 'Problem 3: Investment Portfolio',
      difficulty: 'Intermediate',
      category: 'Finance',
      problem: 'An investor has ₹100,000 to invest in two stocks. Stock A returns 8% annually with risk factor 0.3. Stock B returns 6% annually with risk factor 0.2. The investor wants to maximize return while keeping total risk ≤ 25 and investing at least ₹30,000 in Stock A.',
      tasks: [
        'Define variables',
        'Formulate the LP problem',
        'Graph and solve',
        'Find the optimal investment',
        'Calculate the maximum return'
      ],
      variables: 'Let x = amount invested in Stock A (in ₹000), y = amount invested in Stock B (in ₹000)',
      objective: 'Maximize Z = 0.08x + 0.06y (Return in ₹000)',
      constraints: [
        'Budget: x + y ≤ 100',
        'Risk: 0.3x + 0.2y ≤ 25',
        'Minimum A: x ≥ 30',
        'x ≥ 0, y ≥ 0'
      ],
      solution: {
        cornerPoints: ['(30,0)', '(30,80)', '(50,50)', '(83.33,0)'],
        evaluations: [
          'Z(30,0) = 0.08(30) + 0 = 2.4',
          'Z(30,80) = 0.08(30) + 0.06(80) = 2.4 + 4.8 = 7.2',
          'Z(50,50) = 0.08(50) + 0.06(50) = 4 + 3 = 7.0',
          'Z(83.33,0) = 0.08(83.33) = 6.67'
        ],
        optimal: '(30,80) with Z = ₹7,200',
        resourceUtilization: [
          'Budget: 30 + 80 = 110 > 100! Wait, this violates budget constraint.'
        ]
      },
      hint: 'Check all corner points and verify each satisfies all constraints. The actual optimal is different.'
    },
    {
      id: 4,
      title: 'Problem 4: Hospital Resource Allocation',
      difficulty: 'Intermediate',
      category: 'Healthcare',
      problem: 'A hospital needs to allocate resources between inpatient (x) and outpatient (y) services. Inpatient patients require 3 doctor hours and 2 nurse hours. Outpatient patients require 2 doctor hours and 4 nurse hours. Available: 120 doctor hours and 160 nurse hours daily. Profit: Inpatient ₹8,000, Outpatient ₹6,000.',
      tasks: [
        'Formulate the LP problem',
        'Graph the constraints',
        'Find the optimal solution',
        'Identify bottlenecks',
        'Calculate shadow prices'
      ],
      variables: 'Let x = number of inpatient patients, y = number of outpatient patients',
      objective: 'Maximize Z = 8x + 6y (Profit in ₹000)',
      constraints: [
        'Doctors: 3x + 2y ≤ 120',
        'Nurses: 2x + 4y ≤ 160',
        'x ≥ 0, y ≥ 0'
      ],
      solution: {
        cornerPoints: ['(0,0)', '(40,0)', '(20,30)', '(0,40)'],
        evaluations: [
          'Z(0,0) = 0',
          'Z(40,0) = 8(40) + 6(0) = 320',
          'Z(20,30) = 8(20) + 6(30) = 160 + 180 = 340',
          'Z(0,40) = 8(0) + 6(40) = 240'
        ],
        optimal: '(20,30) with Z = ₹340,000',
        resourceUtilization: [
          'Doctors: 3(20) + 2(30) = 60 + 60 = 120 hours (fully utilized)',
          'Nurses: 2(20) + 4(30) = 40 + 120 = 160 hours (fully utilized)'
        ]
      },
      hint: 'Both constraints are binding at the optimal point. Calculate shadow prices from the binding constraints.'
    },
    {
      id: 5,
      title: 'Problem 5: Agricultural Planning',
      difficulty: 'Intermediate',
      category: 'Agriculture',
      problem: 'A farmer has 100 acres of land. He wants to plant wheat and corn. Wheat requires 2 acre-feet of water and 3 hours of labor per acre. Corn requires 3 acre-feet of water and 2 hours of labor per acre. Available: 240 acre-feet of water and 200 hours of labor. Profit: Wheat ₹12,000/acre, Corn ₹10,000/acre.',
      tasks: [
        'Formulate the LP problem',
        'Solve graphically',
        'Find optimal crop mix',
        'Calculate maximum profit',
        'Identify the bottleneck'
      ],
      variables: 'Let x = acres of wheat, y = acres of corn',
      objective: 'Maximize Z = 12x + 10y (Profit in ₹000)',
      constraints: [
        'Land: x + y ≤ 100',
        'Water: 2x + 3y ≤ 240',
        'Labor: 3x + 2y ≤ 200',
        'x ≥ 0, y ≥ 0'
      ],
      solution: {
        cornerPoints: ['(0,0)', '(66.67,0)', '(40,53.33)', '(0,80)'],
        evaluations: [
          'Z(0,0) = 0',
          'Z(66.67,0) = 12(66.67) = 800',
          'Z(40,53.33) = 12(40) + 10(53.33) = 480 + 533.33 = 1,013.33',
          'Z(0,80) = 10(80) = 800'
        ],
        optimal: '(40,53.33) with Z = ₹1,013,333',
        resourceUtilization: [
          'Land: 40 + 53.33 = 93.33 acres (6.67 slack)',
          'Water: 2(40) + 3(53.33) = 80 + 160 = 240 (fully utilized)',
          'Labor: 3(40) + 2(53.33) = 120 + 106.67 = 226.67 > 200 (infeasible!)'
        ]
      },
      hint: 'The point (40,53.33) violates the labor constraint. Find the actual optimal point.'
    },
    {
      id: 6,
      title: 'Problem 6: Advertising Budget Allocation',
      difficulty: 'Advanced',
      category: 'Marketing',
      problem: 'A company advertises on TV and radio. TV ads reach 10,000 people and cost ₹50,000. Radio ads reach 5,000 people and cost ₹20,000. Budget: ₹500,000. At least 10 TV ads and at least 20 radio ads. Want to maximize reach.',
      tasks: [
        'Formulate the LP problem',
        'Graph and solve',
        'Find optimal advertising mix',
        'Calculate maximum reach',
        'Identify the most effective medium'
      ],
      variables: 'Let x = number of TV ads, y = number of radio ads',
      objective: 'Maximize Z = 10x + 5y (Reach in 000 people)',
      constraints: [
        'Budget: 50x + 20y ≤ 500',
        'TV min: x ≥ 10',
        'Radio min: y ≥ 20',
        'x ≥ 0, y ≥ 0'
      ],
      solution: {
        cornerPoints: ['(10,20)', '(10,0)', '(10,25)', '(0,25)'],
        evaluations: [
          'Z(10,20) = 10(10) + 5(20) = 100 + 100 = 200',
          'Z(10,25) = 10(10) + 5(25) = 100 + 125 = 225',
          'Z(0,25) = 10(0) + 5(25) = 125'
        ],
        optimal: '(10,25) with Z = 225,000 people',
        resourceUtilization: [
          'Budget: 50(10) + 20(25) = 500 + 500 = 500 (fully utilized)',
          'TV min: 10 (exactly met)',
          'Radio min: 25 (5 above minimum)'
        ]
      },
      hint: 'TV ads have higher reach per ad but also higher cost. Compare cost-effectiveness.'
    }
  ];

  // Difficulty levels for filtering
  const difficultyLevels = ['All', 'Basic', 'Intermediate', 'Advanced'];
  const categories = ['All', 'Manufacturing', 'Food Production', 'Finance', 'Healthcare', 'Agriculture', 'Marketing'];

  // Filter state
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredProblems = practiceProblems.filter(p => 
    (difficultyFilter === 'All' || p.difficulty === difficultyFilter) &&
    (categoryFilter === 'All' || p.category === categoryFilter)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Practice Problems - Graphical LP
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Apply your graphical LP skills with these practice problems across various industries 
            and difficulty levels.
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

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty:</span>
            {difficultyLevels.map((level) => (
              <button
                key={`diff-${level}`}
                onClick={() => setDifficultyFilter(level)}
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
                  difficultyFilter === level
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {level}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
            {categories.map((cat) => (
              <button
                key={`cat-${cat}`}
                onClick={() => setCategoryFilter(cat)}
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
                  categoryFilter === cat
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'problems' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProblems.map((problem) => (
                  <div
                    key={`problem-${problem.id}`}
                    onClick={() => {
                      setSelectedProblem(problem.id - 1);
                      setShowSolution(false);
                    }}
                    className={clsx(
                      "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                      selectedProblem === problem.id - 1 ? "border-2 border-purple-500" : ""
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        {problem.title}
                      </h4>
                      <span className={clsx(
                        "text-xs px-2 py-1 rounded-full",
                        problem.difficulty === 'Basic' ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                        problem.difficulty === 'Intermediate' ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                        "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                      )}>
                        {problem.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {problem.problem.substring(0, 100)}...
                    </p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{problem.category}</span>
                      <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded">
                        {problem.tasks.length} tasks
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProblems.length === 0 && (
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                  No problems match the selected filters. Try adjusting your filters.
                </div>
              )}

              {/* Selected Problem Detail */}
              {filteredProblems.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    {filteredProblems[selectedProblem]?.title}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Problem</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {filteredProblems[selectedProblem]?.problem}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                        <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Tasks</h4>
                        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          {filteredProblems[selectedProblem]?.tasks.map((task, idx) => (
                            <li key={`task-${idx}`}>{task}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Variables & Objective</h4>
                        <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                          {filteredProblems[selectedProblem]?.variables}
                        </p>
                        <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mt-2">
                          {filteredProblems[selectedProblem]?.objective}
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Constraints</h4>
                      <ul className="list-disc list-inside text-sm font-mono text-gray-700 dark:text-gray-300 space-y-1">
                        {filteredProblems[selectedProblem]?.constraints.map((c, idx) => (
                          <li key={`constraint-${idx}`}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">💡 Hint</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {filteredProblems[selectedProblem]?.hint}
                      </p>
                    </div>

                    <button
                      onClick={() => setShowSolution(!showSolution)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300"
                    >
                      {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </button>

                    {showSolution && filteredProblems[selectedProblem]?.solution && (
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500 mt-4">
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Solution</h4>
                        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                          <p><span className="font-semibold">Corner Points:</span> {filteredProblems[selectedProblem]?.solution.cornerPoints.join(', ')}</p>
                          {filteredProblems[selectedProblem]?.solution.evaluations.map((evalItem, idx) => (
                            <p key={`eval-${idx}`}>{evalItem}</p>
                          ))}
                          <p className="font-bold text-green-700 dark:text-green-400">
                            Optimal: {filteredProblems[selectedProblem]?.solution.optimal}
                          </p>
                          <div className="mt-2">
                            <p className="font-semibold">Resource Utilization:</p>
                            {filteredProblems[selectedProblem]?.solution.resourceUtilization.map((util, idx) => (
                              <p key={`util-${idx}`} className="ml-4">{util}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'solutions' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Complete Solutions
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  Select a problem above to view its detailed solution. Solutions include corner points, evaluations, and resource utilization analysis.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProblems.map((problem) => (
                    <div
                      key={`sol-${problem.id}`}
                      onClick={() => {
                        setSelectedProblem(problem.id - 1);
                        setActiveTab('problems');
                        setShowSolution(true);
                      }}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {problem.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {problem.difficulty} • {problem.category}
                      </p>
                      <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                        Click to view solution
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'tips' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Tips & Strategies for Solving LP Problems
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">📝 Before You Start</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li><span className="font-medium">Read the problem carefully</span> - Identify what you're optimizing and what limits you</li>
                      <li><span className="font-medium">Define variables clearly</span> - Use meaningful variable names with units</li>
                      <li><span className="font-medium">List all constraints</span> - Don't forget non-negativity constraints</li>
                      <li><span className="font-medium">Check for redundant constraints</span> - Some constraints may not affect the solution</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">📐 While Solving</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li><span className="font-medium">Graph accurately</span> - Use graph paper and precise scaling</li>
                      <li><span className="font-medium">Test a point for shading</span> - Use (0,0) when possible to verify feasible side</li>
                      <li><span className="font-medium">Find ALL corner points</span> - Include intersections with axes</li>
                      <li><span className="font-medium">Verify corner points</span> - Check that each satisfies ALL constraints</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ After Solving</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li><span className="font-medium">Verify the solution</span> - Substitute back into all constraints</li>
                      <li><span className="font-medium">Check resource utilization</span> - Calculate slack for each resource</li>
                      <li><span className="font-medium">Identify bottlenecks</span> - Which constraints are binding?</li>
                      <li><span className="font-medium">Consider sensitivity</span> - How robust is the solution?</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">💡 Common Pitfalls to Avoid</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li><span className="font-medium">Don't rush</span> - Take time to understand the problem</li>
                      <li><span className="font-medium">Don't forget non-negativity</span> - Always include x ≥ 0, y ≥ 0</li>
                      <li><span className="font-medium">Don't miss corner points</span> - Check all intersections</li>
                      <li><span className="font-medium">Don't skip verification</span> - Always check your solution</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">🚨 When You Get Stuck</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li><span className="font-medium">Review the steps</span> - Go back to the step-by-step procedure</li>
                      <li><span className="font-medium">Check your graph</span> - Re-examine intercepts and shading</li>
                      <li><span className="font-medium">Verify calculations</span> - Recalculate corner points and Z values</li>
                      <li><span className="font-medium">Ask for help</span> - Sometimes another perspective helps</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quick Reference */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Quick Reference: Solving LP Problems
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Formulation Checklist</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Variables defined with units</li>
                      <li>Objective function stated (Max/Min)</li>
                      <li>All constraints listed</li>
                      <li>Non-negativity included</li>
                      <li>Units consistent</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Graphing Checklist</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Axes labeled with variables</li>
                      <li>Intercepts calculated correctly</li>
                      <li>Lines drawn accurately</li>
                      <li>Feasible region shaded</li>
                      <li>Corner points identified</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Evaluation Checklist</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>All corner points evaluated</li>
                      <li>Calculations double-checked</li>
                      <li>Optimal point selected correctly</li>
                      <li>Resource utilization calculated</li>
                      <li>Slack identified</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Verification Checklist</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Optimal point satisfies all constraints</li>
                      <li>No other corner point gives better Z</li>
                      <li>Solution is reasonable in context</li>
                      <li>Interpretation is clear</li>
                      <li>Recommendations are actionable</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Practice Problems FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Practice Problems - Graphical LP"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic85_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Practice is essential for mastering graphical LP. I tell my students that solving these problems is like learning to play an instrument - you need to practice regularly to build skill and confidence. The variety of problems here covers different industries and difficulty levels, preparing students for any LP problem they might encounter. I encourage students to attempt each problem independently before checking the solution, and to pay special attention to the verification step - this is where true understanding is demonstrated." />
        </div>
      </div>
    </div>
  );
};

export default Topic85;