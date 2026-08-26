import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic88_files/topic88_questions';
import noteText from './topic88_files/topic88_note.txt?raw';

const Topic88 = () => {
  const [activeTab, setActiveTab] = useState('problems');
  const [selectedProblem, setSelectedProblem] = useState(0);
  const [showMarkingScheme, setShowMarkingScheme] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const tabs = [
    { id: 'problems', label: 'Exam Problems' },
    { id: 'solutions', label: 'Solutions & Marking' },
    { id: 'tips', label: 'Exam Tips' },
  ];

  // Exam-style problems data
  const examProblems = [
    {
      id: 1,
      title: 'Question 1: Production Optimization (10 marks)',
      duration: '15 minutes',
      difficulty: 'Basic',
      problem: 'A company manufactures two products, P and Q. Each unit of P requires 2 hours of labor and 3 units of raw material. Each unit of Q requires 3 hours of labor and 2 units of raw material. The company has 120 labor hours and 90 raw material units available per day. The profit per unit of P is ₹40 and per unit of Q is ₹50.\n\n(a) Formulate the LP problem. (3 marks)\n(b) Solve the problem graphically. (5 marks)\n(c) Interpret your solution. (2 marks)',
      markingScheme: {
        totalMarks: 10,
        parts: [
          { part: '(a)', marks: 3, description: 'Correct variables, objective, and constraints' },
          { part: '(b)', marks: 5, description: 'Correct graph, corner points, and optimal solution' },
          { part: '(c)', marks: 2, description: 'Clear interpretation of results' }
        ]
      },
      solution: {
        variables: 'Let x = units of P, y = units of Q',
        objective: 'Maximize Z = 40x + 50y',
        constraints: ['Labor: 2x + 3y ≤ 120', 'Material: 3x + 2y ≤ 90', 'x ≥ 0, y ≥ 0'],
        cornerPoints: ['(0,0)', '(45,0)', '(24,24)', '(0,40)'],
        evaluations: [
          'Z(0,0) = 0',
          'Z(45,0) = 40(45) + 50(0) = 1,800',
          'Z(24,24) = 40(24) + 50(24) = 960 + 1,200 = 2,160',
          'Z(0,40) = 40(0) + 50(40) = 2,000'
        ],
        optimal: '(24, 24) with Z = ₹2,160',
        interpretation: 'Produce 24 units of P and 24 units of Q. Labor and material are both fully utilized (binding constraints). Maximum daily profit is ₹2,160.'
      }
    },
    {
      id: 2,
      title: 'Question 2: Diet Planning (12 marks)',
      duration: '20 minutes',
      difficulty: 'Basic',
      problem: 'A dietitian is planning a meal that must provide at least 24 units of protein and 18 units of carbohydrates. Two foods are available: Food A costs ₹20 per serving and provides 4 units of protein and 3 units of carbohydrates. Food B costs ₹30 per serving and provides 3 units of protein and 5 units of carbohydrates.\n\n(a) Formulate the LP problem. (4 marks)\n(b) Solve graphically to find the minimum cost diet. (6 marks)\n(c) Identify any surplus nutrients. (2 marks)',
      markingScheme: {
        totalMarks: 12,
        parts: [
          { part: '(a)', marks: 4, description: 'Correct variables, objective, and constraints' },
          { part: '(b)', marks: 6, description: 'Correct graph, corner points, and optimal solution' },
          { part: '(c)', marks: 2, description: 'Correct identification of surplus nutrients' }
        ]
      },
      solution: {
        variables: 'Let x = servings of Food A, y = servings of Food B',
        objective: 'Minimize Z = 20x + 30y',
        constraints: ['Protein: 4x + 3y ≥ 24', 'Carbs: 3x + 5y ≥ 18', 'x ≥ 0, y ≥ 0'],
        cornerPoints: ['(0,8)', '(6,2)', '(6,0)'],
        evaluations: [
          'Z(0,8) = 20(0) + 30(8) = 240',
          'Z(6,2) = 20(6) + 30(2) = 120 + 60 = 180',
          'Z(6,0) = 20(6) + 30(0) = 120'
        ],
        optimal: '(6, 0) with Z = ₹120',
        surplus: 'Protein: 4(6) + 3(0) = 24 (exact), Carbs: 3(6) + 5(0) = 18 (exact)',
        interpretation: 'Use 6 servings of Food A and 0 servings of Food B. Cost = ₹120. Both nutrients are exactly met.'
      }
    },
    {
      id: 3,
      title: 'Question 3: Investment Allocation (15 marks)',
      duration: '25 minutes',
      difficulty: 'Intermediate',
      problem: 'An investor has ₹500,000 to invest in three assets: Stocks (x), Bonds (y), and Cash (z). Stocks return 12% with risk 0.6. Bonds return 8% with risk 0.3. Cash returns 4% with risk 0. The investor wants to maximize return while keeping risk ≤ 200 and investing at least ₹50,000 in each asset.\n\n(a) Formulate the LP problem. (5 marks)\n(b) Reduce to two variables and solve graphically. (7 marks)\n(c) Interpret the solution. (3 marks)',
      markingScheme: {
        totalMarks: 15,
        parts: [
          { part: '(a)', marks: 5, description: 'Correct variables, objective, and all constraints' },
          { part: '(b)', marks: 7, description: 'Correct reduction, graph, and optimal solution' },
          { part: '(c)', marks: 3, description: 'Clear interpretation and recommendations' }
        ]
      },
      solution: {
        variables: 'Let x = amount in Stocks (₹000), y = amount in Bonds (₹000), z = amount in Cash (₹000)',
        objective: 'Maximize Z = 0.12x + 0.08y + 0.04z',
        constraints: [
          'Budget: x + y + z ≤ 500',
          'Risk: 0.6x + 0.3y + 0z ≤ 200',
          'Min Stocks: x ≥ 50',
          'Min Bonds: y ≥ 50',
          'Min Cash: z ≥ 50',
          'x, y, z ≥ 0'
        ],
        reduced: 'Since Cash has lowest return and zero risk, use it to meet risk constraints. Set z = 50 (minimum). Then: x + y ≤ 450, 0.6x + 0.3y ≤ 200, x ≥ 50, y ≥ 50',
        cornerPoints: ['(50,50)', '(50,400)', '(333.33,66.67)', '(350,50)'],
        evaluations: [
          'Z = 0.12x + 0.08y + 0.04(50)',
          'Z(50,50) = 6 + 4 + 2 = 12',
          'Z(50,400) = 6 + 32 + 2 = 40',
          'Z(333.33,66.67) = 40 + 5.33 + 2 = 47.33',
          'Z(350,50) = 42 + 4 + 2 = 48'
        ],
        optimal: '(350, 50, 50) with Z = ₹48,000',
        interpretation: 'Invest ₹350,000 in Stocks, ₹50,000 in Bonds, and ₹50,000 in Cash. Maximum return = ₹48,000. Risk = 0.6(350) + 0.3(50) = 210 + 15 = 225 &gt; 200. Recalculate!'
      }
    },
    {
      id: 4,
      title: 'Question 4: Hospital Resource Allocation (12 marks)',
      duration: '20 minutes',
      difficulty: 'Intermediate',
      problem: 'A hospital has 160 nurse hours and 120 doctor hours available per day. Inpatient care requires 2 nurse hours and 3 doctor hours per patient. Outpatient care requires 3 nurse hours and 2 doctor hours per patient. Profit: Inpatient ₹8,000, Outpatient ₹6,000.\n\n(a) Formulate the LP problem. (3 marks)\n(b) Solve graphically. (6 marks)\n(c) Identify the bottleneck resource and calculate shadow prices. (3 marks)',
      markingScheme: {
        totalMarks: 12,
        parts: [
          { part: '(a)', marks: 3, description: 'Correct variables, objective, and constraints' },
          { part: '(b)', marks: 6, description: 'Correct graph, corner points, and optimal solution' },
          { part: '(c)', marks: 3, description: 'Correct bottleneck identification and shadow prices' }
        ]
      },
      solution: {
        variables: 'Let x = inpatient patients, y = outpatient patients',
        objective: 'Maximize Z = 8x + 6y (Profit in ₹000)',
        constraints: ['Nurses: 2x + 3y ≤ 160', 'Doctors: 3x + 2y ≤ 120', 'x ≥ 0, y ≥ 0'],
        cornerPoints: ['(0,0)', '(40,0)', '(24,24)', '(0,53.33)'],
        evaluations: [
          'Z(0,0) = 0',
          'Z(40,0) = 8(40) + 6(0) = 320',
          'Z(24,24) = 8(24) + 6(24) = 192 + 144 = 336',
          'Z(0,53.33) = 8(0) + 6(53.33) = 320'
        ],
        optimal: '(24, 24) with Z = ₹336,000',
        bottleneck: 'Both constraints are binding at (24,24): Nurses: 2(24)+3(24)=120 (not 160!), Doctors: 3(24)+2(24)=120',
        shadowPrices: 'Solve for shadow prices using binding constraints.'
      }
    },
    {
      id: 5,
      title: 'Question 5: Transportation Problem (15 marks)',
      duration: '25 minutes',
      difficulty: 'Advanced',
      problem: 'A company has two factories (F1, F2) and three warehouses (W1, W2, W3). Supply: F1 = 120 units, F2 = 80 units. Demand: W1 = 50 units, W2 = 70 units, W3 = 80 units. Shipping costs per unit:\nF1→W1: ₹4, F1→W2: ₹6, F1→W3: ₹8\nF2→W1: ₹5, F2→W2: ₹7, F2→W3: ₹9\n\n(a) Set up the transportation problem. (4 marks)\n(b) Find the optimal shipping plan. (8 marks)\n(c) Calculate the minimum cost. (3 marks)',
      markingScheme: {
        totalMarks: 15,
        parts: [
          { part: '(a)', marks: 4, description: 'Correct table and initial setup' },
          { part: '(b)', marks: 8, description: 'Correct optimal shipping plan' },
          { part: '(c)', marks: 3, description: 'Correct minimum cost calculation' }
        ]
      },
      solution: {
        setup: 'Supply = 200, Demand = 200 (balanced)',
        initialSolution: 'Northwest Corner Method: F1→W1: 50, F1→W2: 70, F1→W3: 0, F2→W1: 0, F2→W2: 0, F2→W3: 80',
        cost: '50(4) + 70(6) + 0(8) + 0(5) + 0(7) + 80(9) = 200 + 420 + 720 = ₹1,340',
        optimalPlan: 'F1→W1: 50, F1→W2: 50, F1→W3: 20, F2→W1: 0, F2→W2: 20, F2→W3: 60',
        optimalCost: '50(4) + 50(6) + 20(8) + 0(5) + 20(7) + 60(9) = 200 + 300 + 160 + 140 + 540 = ₹1,340',
        interpretation: 'Total cost = ₹1,340. The Northwest Corner solution is already optimal.'
      }
    },
    {
      id: 6,
      title: 'Question 6: Mixed Problem (20 marks)',
      duration: '35 minutes',
      difficulty: 'Advanced',
      problem: 'A company produces two products using three resources. The LP problem is:\nMaximize Z = 6x + 8y\nSubject to:\n2x + 3y ≤ 24 (Resource A)\n4x + 2y ≤ 28 (Resource B)\n3x + 4y ≤ 30 (Resource C)\nx, y ≥ 0\n\n(a) Solve the LP problem graphically. (8 marks)\n(b) Identify binding and non-binding constraints. (4 marks)\n(c) Calculate slack for each resource. (4 marks)\n(d) Interpret the shadow prices. (4 marks)',
      markingScheme: {
        totalMarks: 20,
        parts: [
          { part: '(a)', marks: 8, description: 'Correct graph, corner points, and optimal solution' },
          { part: '(b)', marks: 4, description: 'Correct identification of binding constraints' },
          { part: '(c)', marks: 4, description: 'Correct slack calculations' },
          { part: '(d)', marks: 4, description: 'Correct shadow price interpretation' }
        ]
      },
      solution: {
        variables: 'x, y as defined',
        objective: 'Maximize Z = 6x + 8y',
        constraints: ['2x + 3y ≤ 24', '4x + 2y ≤ 28', '3x + 4y ≤ 30', 'x ≥ 0, y ≥ 0'],
        cornerPoints: ['(0,0)', '(7,0)', '(6,4)', '(4,5)', '(0,8)'],
        evaluations: [
          'Z(0,0) = 0',
          'Z(7,0) = 42',
          'Z(6,4) = 36 + 32 = 68',
          'Z(4,5) = 24 + 40 = 64',
          'Z(0,8) = 64'
        ],
        optimal: '(6, 4) with Z = 68',
        binding: 'Resource A: 2(6)+3(4)=24 (binding), Resource B: 4(6)+2(4)=32 > 28 (infeasible!)',
        slack: 'Resource A: 0, Resource B: 28-32=-4 (infeasible), Resource C: 30-3(6)-4(4)=30-18-16=-4 (infeasible)'
      }
    }
  ];

  // Exam tips data
  const examTips = {
    before: [
      'Review all key concepts: objective functions, constraints, graphing, corner points',
      'Practice drawing graphs quickly and accurately',
      'Memorize the step-by-step procedure',
      'Prepare your calculator and graph paper',
      'Get a good night\'s sleep before the exam'
    ],
    during: [
      'Read each question carefully - identify what is being asked',
      'Allocate time based on marks (1 mark ≈ 1.5 minutes)',
      'Show all working - partial marks matter',
      'Draw clear, labeled graphs',
      'Check your answers if time permits'
    ],
    after: [
      'Review any mistakes to learn from them',
      'Note which topics need more practice',
      'Discuss challenging questions with classmates',
      'Use the experience to prepare for future exams'
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Exam-style Problems
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Practice with these exam-style problems designed to simulate real assessment conditions. 
            Each problem includes detailed solutions and marking schemes.
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
            &gt;
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'problems' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examProblems.map((problem) => (
                  <div
                    key={`exam-${problem.id}`}
                    onClick={() => {
                      setSelectedProblem(problem.id - 1);
                      setShowSolution(false);
                      setShowMarkingScheme(false);
                    }}
                    className={clsx(
                      "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                      selectedProblem === problem.id - 1 ? "border-2 border-red-500" : ""
                    )}
                  &gt;
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
                    <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span>⏱ {problem.duration}</span>
                      <span>📝 {problem.markingScheme.totalMarks} marks</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {problem.problem.substring(0, 120)}...
                    </p>
                  </div>
                ))}
              </div>

              {/* Selected Problem Detail */}
              {examProblems.length &gt; 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                      {examProblems[selectedProblem]?.title}
                    </h3>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                        ⏱ {examProblems[selectedProblem]?.duration}
                      </span>
                      <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">
                        {examProblems[selectedProblem]?.markingScheme.totalMarks} marks
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Question</h4>
                      <pre className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        {examProblems[selectedProblem]?.problem}
                      </pre>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                      <button
                        onClick={() => setShowSolution(!showSolution)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
                      &gt;
                        {showSolution ? 'Hide Solution' : 'Show Solution'}
                      </button>
                      <button
                        onClick={() => setShowMarkingScheme(!showMarkingScheme)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300"
                      &gt;
                        {showMarkingScheme ? 'Hide Marking Scheme' : 'Show Marking Scheme'}
                      </button>
                    </div>

                    {showMarkingScheme && examProblems[selectedProblem]?.markingScheme && (
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                        <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">📋 Marking Scheme</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Total: {examProblems[selectedProblem].markingScheme.totalMarks} marks
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                          {examProblems[selectedProblem].markingScheme.parts.map((part, idx) => (
                            <li key={`ms-${idx}`}>
                              <span className="font-medium">{part.part}</span> 
                              {' '}{part.marks} marks - {part.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {showSolution && examProblems[selectedProblem]?.solution && (
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">✅ Solution</h4>
                        
                        {examProblems[selectedProblem].solution.variables && (
                          <div className="mt-2">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Variables:</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{examProblems[selectedProblem].solution.variables}</p>
                          </div>
                        )}

                        {examProblems[selectedProblem].solution.objective && (
                          <div className="mt-2">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Objective:</p>
                            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">{examProblems[selectedProblem].solution.objective}</p>
                          </div>
                        )}

                        {examProblems[selectedProblem].solution.constraints && (
                          <div className="mt-2">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Constraints:</p>
                            <ul className="list-disc list-inside text-sm font-mono text-gray-700 dark:text-gray-300">
                              {examProblems[selectedProblem].solution.constraints.map((c, idx) => (
                                <li key={`c-${idx}`}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {examProblems[selectedProblem].solution.cornerPoints && (
                          <div className="mt-2">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Corner Points:</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{examProblems[selectedProblem].solution.cornerPoints.join(', ')}</p>
                          </div>
                        )}

                        {examProblems[selectedProblem].solution.evaluations && (
                          <div className="mt-2">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Evaluations:</p>
                            <ul className="list-disc list-inside text-sm font-mono text-gray-700 dark:text-gray-300">
                              {examProblems[selectedProblem].solution.evaluations.map((evalItem, idx) => (
                                <li key={`eval-${idx}`}>{evalItem}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {examProblems[selectedProblem].solution.optimal && (
                          <div className="mt-2">
                            <p className="font-semibold text-green-700 dark:text-green-400">
                              Optimal Solution: {examProblems[selectedProblem].solution.optimal}
                            </p>
                          </div>
                        )}

                        {examProblems[selectedProblem].solution.interpretation && (
                          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-semibold">Interpretation:</span> {examProblems[selectedProblem].solution.interpretation}
                            </p>
                          </div>
                        )}

                        {examProblems[selectedProblem].solution.surplus && (
                          <div className="mt-2">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Surplus:</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">{examProblems[selectedProblem].solution.surplus}</p>
                          </div>
                        )}
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
                  Solutions & Marking Schemes
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  Select an exam problem above to view its complete solution and marking scheme.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {examProblems.map((problem) => (
                    <div
                      key={`sol-${problem.id}`}
                      onClick={() => {
                        setSelectedProblem(problem.id - 1);
                        setActiveTab('problems');
                        setShowSolution(true);
                        setShowMarkingScheme(true);
                      }}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    &gt;
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {problem.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {problem.difficulty} • {problem.duration} • {problem.markingScheme.totalMarks} marks
                      </p>
                      <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">
                        Click to view solution & marking scheme
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
                  Exam Tips & Strategies
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">📚 Before the Exam</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      {examTips.before.map((tip, idx) => (
                        <li key={`before-${idx}`}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">✍️ During the Exam</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      {examTips.during.map((tip, idx) => (
                        <li key={`during-${idx}`}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-3">📈 After the Exam</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      {examTips.after.map((tip, idx) => (
                        <li key={`after-${idx}`}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Time Management Guide */}
                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">⏱ Time Management Guide</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                      <span className="font-bold text-green-600 dark:text-green-400">1 mark</span>
                      <p className="text-gray-600 dark:text-gray-400">≈ 1.5 minutes</p>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                      <span className="font-bold text-yellow-600 dark:text-yellow-400">3 marks</span>
                      <p className="text-gray-600 dark:text-gray-400">≈ 4.5 minutes</p>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                      <span className="font-bold text-orange-600 dark:text-orange-400">5 marks</span>
                      <p className="text-gray-600 dark:text-gray-400">≈ 7.5 minutes</p>
                    </div>
                    <div className="text-center p-2 bg-white dark:bg-gray-800 rounded">
                      <span className="font-bold text-red-600 dark:text-red-400">10 marks</span>
                      <p className="text-gray-600 dark:text-gray-400">≈ 15 minutes</p>
                    </div>
                  </div>
                </div>

                {/* Common Exam Mistakes */}
                <div className="mt-6 bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Exam Mistakes to Avoid</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li><span className="font-medium">Misreading the question</span> - Read carefully; identify what's being asked</li>
                    <li><span className="font-medium">Forgetting non-negativity</span> - Always include x ≥ 0, y ≥ 0</li>
                    <li><span className="font-medium">Poor graphing</span> - Use graph paper and clear labels</li>
                    <li><span className="font-medium">Skipping steps</span> - Show all working for partial marks</li>
                    <li><span className="font-medium">Not verifying</span> - Always check your solution</li>
                    <li><span className="font-medium">Poor time management</span> - Allocate time based on marks</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Exam-style Problems FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Exam-style Problems - Graphical LP"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic88_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Exam-style problems are the best preparation for actual assessments. I tell my students that practicing under exam conditions (timed, without looking at solutions) is the most effective way to prepare. The marking scheme helps students understand what examiners are looking for. I recommend students attempt these problems under timed conditions, then use the marking scheme to self-assess their work. This builds both confidence and exam technique." />
        </div>
      </div>
    </div>
  );
};

export default Topic88;