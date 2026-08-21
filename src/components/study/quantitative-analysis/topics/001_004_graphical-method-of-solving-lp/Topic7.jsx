import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic7_files/topic7_questions';
import noteText from './topic7_files/topic7_note.txt?raw';

const Topic7 = () => {
  const [activeTab, setActiveTab] = useState('exercises');
  const [selectedExercise, setSelectedExercise] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const tabs = [
    { id: 'exercises', label: 'Exercises' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'formulas', label: 'Formula Reference' },
  ];

  // Numerical exercises data
  const numericalExercises = [
    {
      id: 1,
      title: 'Exercise 1: Maximization with Two Constraints',
      difficulty: 'Basic',
      problem: 'Maximize Z = 4x + 3y\nSubject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx, y ≥ 0',
      tasks: [
        'Graph the constraints',
        'Find all corner points',
        'Evaluate the objective function at each corner point',
        'Determine the optimal solution',
        'Calculate the maximum value of Z'
      ],
      hint: 'Find intercepts for each constraint, graph them, and identify the feasible region. Then evaluate Z at each corner point.',
      solution: {
        cornerPoints: ['(0, 0)', '(5, 0)', '(4, 2)', '(0, 4)'],
        evaluations: [
          'Z(0,0) = 4(0) + 3(0) = 0',
          'Z(5,0) = 4(5) + 3(0) = 20',
          'Z(4,2) = 4(4) + 3(2) = 16 + 6 = 22',
          'Z(0,4) = 4(0) + 3(4) = 12'
        ],
        optimal: '(4, 2)',
        maxZ: '22',
        steps: [
          'Step 1: Convert constraints to equations: 2x + y = 10, x + 2y = 8',
          'Step 2: Find intercepts: For 2x + y = 10: (5,0), (0,10); For x + 2y = 8: (8,0), (0,4)',
          'Step 3: Graph and shade feasible region',
          'Step 4: Identify corner points: (0,0), (5,0), (4,2), (0,4)',
          'Step 5: Evaluate Z at each corner point',
          'Step 6: Select max Z = 22 at (4,2)'
        ]
      }
    },
    {
      id: 2,
      title: 'Exercise 2: Minimization with Two Constraints',
      difficulty: 'Basic',
      problem: 'Minimize Z = 3x + 4y\nSubject to:\nx + 2y ≥ 8\n2x + y ≥ 10\nx, y ≥ 0',
      tasks: [
        'Graph the constraints',
        'Find all corner points',
        'Evaluate the objective function at each corner point',
        'Determine the optimal solution',
        'Calculate the minimum value of Z'
      ],
      hint: 'For ≥ constraints, shade above the lines. The feasible region is unbounded, but corner points still give the minimum.',
      solution: {
        cornerPoints: ['(0, 10)', '(4, 2)', '(8, 0)'],
        evaluations: [
          'Z(0,10) = 3(0) + 4(10) = 40',
          'Z(4,2) = 3(4) + 4(2) = 12 + 8 = 20',
          'Z(8,0) = 3(8) + 4(0) = 24'
        ],
        optimal: '(4, 2)',
        minZ: '20',
        steps: [
          'Step 1: Convert constraints to equations: x + 2y = 8, 2x + y = 10',
          'Step 2: Find intercepts: For x + 2y = 8: (8,0), (0,4); For 2x + y = 10: (5,0), (0,10)',
          'Step 3: Graph and shade feasible region (above both lines)',
          'Step 4: Identify corner points: (0,10), (4,2), (8,0)',
          'Step 5: Evaluate Z at each corner point',
          'Step 6: Select min Z = 20 at (4,2)'
        ]
      }
    },
    {
      id: 3,
      title: 'Exercise 3: Maximization with Three Constraints',
      difficulty: 'Intermediate',
      problem: 'Maximize Z = 5x + 7y\nSubject to:\n3x + 2y ≤ 18\n2x + 4y ≤ 20\nx + 3y ≤ 15\nx, y ≥ 0',
      tasks: [
        'Graph the constraints',
        'Find all corner points',
        'Evaluate the objective function at each corner point',
        'Determine the optimal solution',
        'Identify binding constraints'
      ],
      hint: 'Graph all three constraints carefully. Some constraints may be redundant. Find all intersection points.',
      solution: {
        cornerPoints: ['(0, 0)', '(6, 0)', '(4, 3)', '(0, 5)'],
        evaluations: [
          'Z(0,0) = 5(0) + 7(0) = 0',
          'Z(6,0) = 5(6) + 7(0) = 30',
          'Z(4,3) = 5(4) + 7(3) = 20 + 21 = 41',
          'Z(0,5) = 5(0) + 7(5) = 35'
        ],
        optimal: '(4, 3)',
        maxZ: '41',
        bindingConstraints: ['3x + 2y ≤ 18', '2x + 4y ≤ 20'],
        steps: [
          'Step 1: Convert constraints to equations',
          'Step 2: Find intercepts for each constraint',
          'Step 3: Graph and shade feasible region',
          'Step 4: Identify corner points',
          'Step 5: Evaluate Z at each corner point',
          'Step 6: Select max Z = 41 at (4,3)',
          'Step 7: Identify binding constraints: 3x+2y=18 and 2x+4y=20'
        ]
      }
    },
    {
      id: 4,
      title: 'Exercise 4: Minimization with Three Constraints',
      difficulty: 'Intermediate',
      problem: 'Minimize Z = 2x + 3y\nSubject to:\nx + 2y ≥ 6\n3x + y ≥ 9\n2x + 3y ≥ 12\nx, y ≥ 0',
      tasks: [
        'Graph the constraints',
        'Find all corner points',
        'Evaluate the objective function at each corner point',
        'Determine the optimal solution',
        'Calculate the minimum cost'
      ],
      hint: 'Graph all three constraints and find the feasible region. Look for multiple optimal solutions.',
      solution: {
        cornerPoints: ['(0, 6)', '(2, 3)', '(3, 2)', '(6, 0)'],
        evaluations: [
          'Z(0,6) = 2(0) + 3(6) = 18',
          'Z(2,3) = 2(2) + 3(3) = 4 + 9 = 13',
          'Z(3,2) = 2(3) + 3(2) = 6 + 6 = 12',
          'Z(6,0) = 2(6) + 3(0) = 12'
        ],
        optimal: '(3, 2) and (6, 0)',
        minZ: '12',
        note: 'Multiple optimal solutions exist! Both (3,2) and (6,0) give Z = 12.',
        steps: [
          'Step 1: Convert constraints to equations',
          'Step 2: Find intercepts for each constraint',
          'Step 3: Graph and shade feasible region (above all lines)',
          'Step 4: Identify corner points',
          'Step 5: Evaluate Z at each corner point',
          'Step 6: Select min Z = 12 at (3,2) and (6,0)',
          'Note: Multiple optimal solutions exist'
        ]
      }
    },
    {
      id: 5,
      title: 'Exercise 5: Real-World Production Problem',
      difficulty: 'Intermediate',
      problem: 'A company produces two products, A and B. Each unit of A requires 2 hours of labor and 3 units of material. Each unit of B requires 3 hours of labor and 2 units of material. The company has 120 labor hours and 90 material units available. Profit per unit of A is ₹40 and per unit of B is ₹50. How many units of each should be produced to maximize profit?',
      tasks: [
        'Define variables',
        'Formulate the LP problem',
        'Graph the constraints',
        'Find the optimal solution',
        'Calculate the maximum profit',
        'Identify the bottleneck resource'
      ],
      hint: 'Let x = units of Product A, y = units of Product B. Formulate the objective and constraints, then solve graphically.',
      solution: {
        variables: 'Let x = units of Product A, y = units of Product B',
        objective: 'Maximize Z = 40x + 50y',
        constraints: [
          'Labor: 2x + 3y ≤ 120',
          'Material: 3x + 2y ≤ 90',
          'x ≥ 0, y ≥ 0'
        ],
        cornerPoints: ['(0, 0)', '(30, 0)', '(18, 24)', '(0, 40)'],
        evaluations: [
          'Z(0,0) = 0',
          'Z(30,0) = 40(30) + 50(0) = 1,200',
          'Z(18,24) = 40(18) + 50(24) = 720 + 1,200 = 1,920',
          'Z(0,40) = 40(0) + 50(40) = 2,000'
        ],
        optimal: '(0, 40)',
        maxProfit: '₹2,000',
        bottleneck: 'Labor is the bottleneck (fully utilized at 120 hours)',
        materialSlack: 'Material: 3(0) + 2(40) = 80 units (10 units slack)',
        steps: [
          'Step 1: Define variables: x = Product A, y = Product B',
          'Step 2: Formulate objective: Max Z = 40x + 50y',
          'Step 3: Formulate constraints: 2x + 3y ≤ 120, 3x + 2y ≤ 90',
          'Step 4: Graph constraints and find feasible region',
          'Step 5: Identify corner points',
          'Step 6: Evaluate Z at each corner point',
          'Step 7: Select max Z = 2,000 at (0,40)',
          'Step 8: Interpret: Produce only Product B (40 units)'
        ]
      }
    },
    {
      id: 6,
      title: 'Exercise 6: Investment Portfolio',
      difficulty: 'Advanced',
      problem: 'An investor has ₹1,00,000 to invest in two stocks. Stock X returns 12% annually with a risk factor of 0.4. Stock Y returns 8% annually with a risk factor of 0.2. The investor wants to maximize return while keeping total risk ≤ 30 and investing at least ₹20,000 in each stock.',
      tasks: [
        'Define variables',
        'Formulate the LP problem',
        'Graph the constraints',
        'Find the optimal investment',
        'Calculate the maximum return',
        'Determine the shadow price of risk'
      ],
      hint: 'Use ₹000 for variables. Risk constraint: 0.4x + 0.2y ≤ 30. Budget constraint: x + y ≤ 100. Don\'t forget minimum investment constraints.',
      solution: {
        variables: 'Let x = amount in Stock X (₹000), y = amount in Stock Y (₹000)',
        objective: 'Maximize Z = 0.12x + 0.08y (Return in ₹000)',
        constraints: [
          'Budget: x + y ≤ 100',
          'Risk: 0.4x + 0.2y ≤ 30',
          'Min X: x ≥ 20',
          'Min Y: y ≥ 20',
          'x ≥ 0, y ≥ 0'
        ],
        cornerPoints: ['(20, 20)', '(50, 50)', '(20, 80)', '(75, 0)'],
        evaluations: [
          'Z(20,20) = 0.12(20) + 0.08(20) = 2.4 + 1.6 = 4.0',
          'Z(50,50) = 0.12(50) + 0.08(50) = 6 + 4 = 10.0',
          'Z(20,80) = 0.12(20) + 0.08(80) = 2.4 + 6.4 = 8.8',
          'Z(75,0) = 0.12(75) + 0 = 9.0'
        ],
        optimal: '(50, 50)',
        maxReturn: '₹10,000',
        riskUtilization: '0.4(50) + 0.2(50) = 30 (fully utilized)',
        budgetUtilization: '50 + 50 = 100 (fully utilized)',
        steps: [
          'Step 1: Define variables in ₹000',
          'Step 2: Formulate objective: Max Z = 0.12x + 0.08y',
          'Step 3: Formulate constraints: budget, risk, minimums',
          'Step 4: Graph constraints and find feasible region',
          'Step 5: Identify corner points',
          'Step 6: Evaluate Z at each corner point',
          'Step 7: Select max Z = 10 at (50,50)',
          'Step 8: Invest ₹50,000 in each stock',
          'Step 9: Shadow price of risk = 0.2 (additional return per risk unit)'
        ]
      }
    }
  ];

  // Formula reference data
  const formulaReference = {
    sections: [
      {
        title: 'Objective Function',
        formulas: [
          { name: 'General Form', formula: 'Z = c₁x + c₂y' },
          { name: 'Maximization', formula: 'Maximize Z = c₁x + c₂y' },
          { name: 'Minimization', formula: 'Minimize Z = c₁x + c₂y' }
        ]
      },
      {
        title: 'Constraints',
        formulas: [
          { name: 'Less Than or Equal', formula: 'a₁x + a₂y ≤ b' },
          { name: 'Greater Than or Equal', formula: 'a₁x + a₂y ≥ b' },
          { name: 'Equality', formula: 'a₁x + a₂y = b' },
          { name: 'Non-Negativity', formula: 'x ≥ 0, y ≥ 0' }
        ]
      },
      {
        title: 'Graphing',
        formulas: [
          { name: 'x-intercept', formula: 'x = b/a₁ (when y = 0)' },
          { name: 'y-intercept', formula: 'y = b/a₂ (when x = 0)' },
          { name: 'Slope of Objective', formula: 'm = -c₁/c₂' }
        ]
      },
      {
        title: 'Corner Points',
        formulas: [
          { name: 'Intersection', formula: 'Solve: a₁x + a₂y = b₁ and a₁\'x + a₂\'y = b₂' },
          { name: 'Objective Value', formula: 'Z = c₁x + c₂y' }
        ]
      },
      {
        title: 'Resource Analysis',
        formulas: [
          { name: 'Resource Usage', formula: 'Used = a₁x* + a₂y*' },
          { name: 'Slack', formula: 'Slack = b - (a₁x* + a₂y*)' },
          { name: 'Utilization', formula: 'Utilization = (Used/Available) × 100%' }
        ]
      },
      {
        title: 'Shadow Prices',
        formulas: [
          { name: 'Shadow Price', formula: 'SP = ΔZ/Δb' },
          { name: 'Optimal Basis Range', formula: 'b_min ≤ b ≤ b_max' }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Numerical Exercises
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Practice your graphical LP skills with these numerical exercises. Each exercise includes 
            detailed step-by-step solutions to help you learn and verify your work.
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
                  ? "bg-teal-600 text-white shadow-lg shadow-teal-200 dark:shadow-teal-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'exercises' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {numericalExercises.map((exercise) => (
                  <div
                    key={`ex-${exercise.id}`}
                    onClick={() => {
                      setSelectedExercise(exercise.id - 1);
                      setShowSolution(false);
                      setShowHint(false);
                    }}
                    className={clsx(
                      "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                      selectedExercise === exercise.id - 1 ? "border-2 border-teal-500" : ""
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        {exercise.title}
                      </h4>
                      <span className={clsx(
                        "text-xs px-2 py-1 rounded-full",
                        exercise.difficulty === 'Basic' ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                        exercise.difficulty === 'Intermediate' ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                        "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                      )}>
                        {exercise.difficulty}
                      </span>
                    </div>
                    <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap line-clamp-3">
                      {exercise.problem}
                    </pre>
                    <div className="mt-2">
                      <span className="text-xs px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded">
                        {exercise.tasks.length} tasks
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Exercise Detail */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  {numericalExercises[selectedExercise]?.title}
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Problem</h4>
                    <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {numericalExercises[selectedExercise]?.problem}
                    </pre>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Tasks</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      {numericalExercises[selectedExercise]?.tasks.map((task, idx) => (
                        <li key={`task-${idx}`}>{task}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowHint(!showHint);
                        if (showSolution) setShowSolution(false);
                      }}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300"
                    >
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </button>
                    <button
                      onClick={() => {
                        setShowSolution(!showSolution);
                        if (showHint) setShowHint(false);
                      }}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-300"
                    >
                      {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </button>
                  </div>

                  {showHint && numericalExercises[selectedExercise]?.hint && (
                    <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">💡 Hint:</span> {numericalExercises[selectedExercise].hint}
                      </p>
                    </div>
                  )}

                  {showSolution && numericalExercises[selectedExercise]?.solution && (
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Solution</h4>
                      
                      {numericalExercises[selectedExercise].solution.steps && (
                        <div className="mb-4">
                          <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step-by-Step Solution:</p>
                          <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            {numericalExercises[selectedExercise].solution.steps.map((step, idx) => (
                              <li key={`step-${idx}`}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {numericalExercises[selectedExercise].solution.variables && (
                        <div className="mt-2">
                          <p className="font-semibold text-gray-800 dark:text-gray-200">Variables:</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{numericalExercises[selectedExercise].solution.variables}</p>
                        </div>
                      )}

                      {numericalExercises[selectedExercise].solution.objective && (
                        <div className="mt-2">
                          <p className="font-semibold text-gray-800 dark:text-gray-200">Objective:</p>
                          <p className="text-sm font-mono text-gray-700 dark:text-gray-300">{numericalExercises[selectedExercise].solution.objective}</p>
                        </div>
                      )}

                      {numericalExercises[selectedExercise].solution.constraints && (
                        <div className="mt-2">
                          <p className="font-semibold text-gray-800 dark:text-gray-200">Constraints:</p>
                          <ul className="list-disc list-inside text-sm font-mono text-gray-700 dark:text-gray-300">
                            {numericalExercises[selectedExercise].solution.constraints.map((c, idx) => (
                              <li key={`c-${idx}`}>{c}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-2">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">Corner Points:</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {numericalExercises[selectedExercise].solution.cornerPoints.join(', ')}
                        </p>
                      </div>

                      <div className="mt-2">
                        <p className="font-semibold text-gray-800 dark:text-gray-200">Evaluations:</p>
                        <ul className="list-disc list-inside text-sm font-mono text-gray-700 dark:text-gray-300">
                          {numericalExercises[selectedExercise].solution.evaluations.map((evalItem, idx) => (
                            <li key={`eval-${idx}`}>{evalItem}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-2">
                        <p className="font-semibold text-teal-700 dark:text-teal-400">
                          Optimal Solution: {numericalExercises[selectedExercise].solution.optimal}
                        </p>
                        <p className="font-semibold text-teal-700 dark:text-teal-400">
                          Optimal Value: Z = {numericalExercises[selectedExercise].solution.maxZ || numericalExercises[selectedExercise].solution.minZ}
                        </p>
                      </div>

                      {numericalExercises[selectedExercise].solution.note && (
                        <div className="mt-2 p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                          <p className="text-sm text-yellow-800 dark:text-yellow-300">
                            ℹ️ {numericalExercises[selectedExercise].solution.note}
                          </p>
                        </div>
                      )}

                      {numericalExercises[selectedExercise].solution.bindingConstraints && (
                        <div className="mt-2">
                          <p className="font-semibold text-gray-800 dark:text-gray-200">Binding Constraints:</p>
                          <ul className="list-disc list-inside text-sm font-mono text-gray-700 dark:text-gray-300">
                            {numericalExercises[selectedExercise].solution.bindingConstraints.map((bc, idx) => (
                              <li key={`bc-${idx}`}>{bc}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {numericalExercises[selectedExercise].solution.bottleneck && (
                        <div className="mt-2">
                          <p className="font-semibold text-red-600 dark:text-red-400">Bottleneck:</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{numericalExercises[selectedExercise].solution.bottleneck}</p>
                        </div>
                      )}

                      {numericalExercises[selectedExercise].solution.materialSlack && (
                        <div className="mt-2">
                          <p className="font-semibold text-gray-800 dark:text-gray-200">Resource Slack:</p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{numericalExercises[selectedExercise].solution.materialSlack}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'solutions' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Complete Solutions
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  Select an exercise above to view its complete step-by-step solution.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {numericalExercises.map((exercise) => (
                    <div
                      key={`sol-${exercise.id}`}
                      onClick={() => {
                        setSelectedExercise(exercise.id - 1);
                        setActiveTab('exercises');
                        setShowSolution(true);
                        setShowHint(false);
                      }}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {exercise.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {exercise.difficulty} • {exercise.tasks.length} tasks
                      </p>
                      <div className="mt-2 text-xs text-teal-600 dark:text-teal-400">
                        Click to view solution
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'formulas' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Formula Reference
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  Quick reference for all formulas needed in graphical LP.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formulaReference.sections.map((section, idx) => (
                    <div key={`section-${idx}`} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                      <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-3">
                        {section.title}
                      </h4>
                      <div className="space-y-2">
                        {section.formulas.map((formula, fIdx) => (
                          <div key={`formula-${fIdx}`} className="border-b border-gray-200 dark:border-gray-600 last:border-0 pb-2 last:pb-0">
                            <p className="text-xs text-gray-500 dark:text-gray-400">{formula.name}</p>
                            <p className="text-sm font-mono text-gray-800 dark:text-gray-200">{formula.formula}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Reference Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Quick Problem-Solving Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Formulation</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Define variables (x, y)</li>
                      <li>State objective (Max/Min Z)</li>
                      <li>List all constraints</li>
                      <li>Include x ≥ 0, y ≥ 0</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Solution</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Graph constraints</li>
                      <li>Find corner points</li>
                      <li>Evaluate Z at each</li>
                      <li>Select optimal</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Verification</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Check all constraints</li>
                      <li>Calculate slack</li>
                      <li>Identify bottlenecks</li>
                      <li>Verify optimality</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interpretation</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>State optimal values</li>
                      <li>Calculate objective</li>
                      <li>Identify binding constraints</li>
                      <li>Make recommendations</li>
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
            title="Numerical Exercises FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Numerical Exercises - Graphical LP"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Numerical exercises are the bridge between theory and practice. I tell my students that solving these exercises is like building muscle memory - the more you practice, the more natural the process becomes. Each exercise here is designed to reinforce a specific concept, from basic graphing to advanced interpretation. I encourage students to attempt each exercise without looking at the solution first, then use the solution to check their work and learn from any mistakes. The formula reference is a valuable tool for quick review when you get stuck." />
        </div>
      </div>
    </div>
  );
};

export default Topic7;