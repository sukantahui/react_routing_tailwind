import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic0_files/topic0_questions';
import noteText from './topic0_files/topic0_note.txt?raw';

const Topic0 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [currentStep, setCurrentStep] = useState(0);
  const [showExample, setShowExample] = useState({});
  const [showSolution, setShowSolution] = useState(null);
  const [showHint, setShowHint] = useState(null);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Step-by-step procedure data
  const procedureSteps = [
    {
      step: 1,
      title: 'Understand the Problem',
      description: 'Read the problem carefully. Identify what needs to be optimized (maximized or minimized) and what resources are limited.',
      keyActions: [
        'Identify the decision variables (what you are trying to decide)',
        'Determine the objective (what you want to maximize or minimize)',
        'List all constraints (limitations on the decision variables)'
      ],
      icon: '📖',
      example: 'A factory produces chairs (x) and tables (y). Profit is ₹500 per chair and ₹700 per table. Resources: 240 labor hours, 200 machine hours.'
    },
    {
      step: 2,
      title: 'Define Decision Variables',
      description: 'Clearly define the variables that represent the decisions you need to make. Use meaningful variable names.',
      keyActions: [
        'Choose variables that represent quantities to be decided',
        'Use clear notation (x₁, x₂ or x, y)',
        'State the units of measurement',
        'Include non-negativity constraints'
      ],
      icon: '✏️',
      example: 'Let x = number of chairs produced per day\nLet y = number of tables produced per day\nx ≥ 0, y ≥ 0'
    },
    {
      step: 3,
      title: 'Formulate the Objective Function',
      description: 'Write the mathematical expression for what you want to optimize (maximize profit or minimize cost).',
      keyActions: [
        'Identify contribution per unit of each variable',
        'Write as Z = c₁x₁ + c₂x₂ + ...',
        'State whether to maximize or minimize'
      ],
      icon: '🎯',
      example: 'Maximize Z = 500x + 700y (Profit in ₹)'
    },
    {
      step: 4,
      title: 'Identify and Formulate Constraints',
      description: 'Write mathematical expressions for all limitations on the decision variables.',
      keyActions: [
        'List all resource constraints',
        'Write each as linear inequality',
        'Include non-negativity constraints'
      ],
      icon: '📋',
      example: 'Labor: 3x + 2y ≤ 240 (hours)\nMachine: 4x + y ≤ 200 (hours)\nx, y ≥ 0'
    },
    {
      step: 5,
      title: 'Graph the Constraints',
      description: 'Plot each constraint on a coordinate plane. Find the feasible region where all constraints overlap.',
      keyActions: [
        'Convert each inequality to equality for graphing',
        'Find x and y intercepts for each line',
        'Determine which side of each line is feasible',
        'Shade the feasible region'
      ],
      icon: '📐',
      example: 'Plot 3x + 2y = 240 and 4x + y = 200\nFind intercepts and shade feasible region'
    },
    {
      step: 6,
      title: 'Identify Corner Points',
      description: 'Find all corner points (vertices) of the feasible region where the optimal solution will occur.',
      keyActions: [
        'Find intersections of constraint lines',
        'Include intersection with axes',
        'List all corner points'
      ],
      icon: '📍',
      example: 'Corner points: (0,0), (50,0), (40,60), (0,120)'
    },
    {
      step: 7,
      title: 'Evaluate the Objective Function',
      description: 'Calculate the objective function value at each corner point to find the optimal solution.',
      keyActions: [
        'Substitute each corner point into Z equation',
        'Calculate Z for each point',
        'Compare values to find max or min'
      ],
      icon: '📊',
      example: 'Z(0,0) = 0\nZ(50,0) = 25,000\nZ(40,60) = 62,000 ← Maximum\nZ(0,120) = 84,000 (but infeasible)'
    },
    {
      step: 8,
      title: 'Select the Optimal Solution',
      description: 'Choose the corner point that gives the best objective value (maximum for maximization, minimum for minimization).',
      keyActions: [
        'Identify the optimal corner point',
        'State the optimal variable values',
        'Calculate the optimal objective value',
        'Verify constraints are satisfied'
      ],
      icon: '🏆',
      example: 'Optimal solution: x = 40 chairs, y = 60 tables\nMaximum profit = ₹62,000'
    },
    {
      step: 9,
      title: 'Interpret and Validate Results',
      description: 'Translate the mathematical solution back into the original problem context and verify it makes sense.',
      keyActions: [
        'State solution in business terms',
        'Check resource utilization',
        'Identify slack resources',
        'Consider sensitivity'
      ],
      icon: '💡',
      example: 'Produce 40 chairs and 60 tables. Labor: 3(40)+2(60)=240 (fully used), Machine: 4(40)+60=220 (20 hours slack)'
    }
  ];

  // Complete example data
  const exampleData = {
    title: 'Complete Example: Furniture Factory',
    problem: 'A furniture factory produces chairs and tables. Each chair gives a profit of ₹500 and each table gives ₹700. The factory has 240 labor hours and 200 machine hours available per day. A chair requires 3 labor hours and 4 machine hours. A table requires 2 labor hours and 1 machine hour. How many chairs and tables should be produced to maximize profit?',
    variables: 'x = number of chairs, y = number of tables',
    objective: 'Maximize Z = 500x + 700y',
    constraints: [
      'Labor: 3x + 2y ≤ 240',
      'Machine: 4x + y ≤ 200',
      'x ≥ 0, y ≥ 0'
    ],
    cornerPoints: [
      { point: '(0, 0)', z: 0, status: 'Feasible' },
      { point: '(50, 0)', z: 25000, status: 'Feasible' },
      { point: '(40, 60)', z: 62000, status: 'Optimal' },
      { point: '(0, 120)', z: 84000, status: 'Infeasible (violates machine constraint)' }
    ],
    optimal: {
      point: '(40, 60)',
      variables: 'x = 40 chairs, y = 60 tables',
      z: '₹62,000'
    },
    resourceUtilization: [
      { resource: 'Labor', used: '3(40) + 2(60) = 240', available: 240, slack: 0, status: 'Binding' },
      { resource: 'Machine', used: '4(40) + 60 = 220', available: 200, slack: -20, status: 'Infeasible!' }
    ],
    actualOptimal: {
      point: '(40, 40)',
      z: '500(40) + 700(40) = 20,000 + 28,000 = ₹48,000',
      resourceUtilization: [
        { resource: 'Labor', used: '3(40) + 2(40) = 200', available: 240, slack: 40, status: 'Slack' },
        { resource: 'Machine', used: '4(40) + 40 = 200', available: 200, slack: 0, status: 'Binding' }
      ]
    }
  };

  // Practice problems
  const practiceProblems = [
    {
      id: 1,
      title: 'Bakery Production',
      problem: 'A bakery produces cakes and pastries. Each cake requires 2 hours of labor and 3 units of flour. Each pastry requires 3 hours of labor and 2 units of flour. The bakery has 120 labor hours and 90 flour units available. Profit per cake is ₹40 and per pastry is ₹50.',
      hint: 'Let x = cakes, y = pastries. Formulate the LP problem, graph it, and find the optimal solution.',
      solution: 'Let x = cakes, y = pastries\nMaximize Z = 40x + 50y\nSubject to:\n2x + 3y ≤ 120\n3x + 2y ≤ 90\nx, y ≥ 0\nOptimal: (18, 24) with Z = 1,920'
    },
    {
      id: 2,
      title: 'Investment Portfolio',
      problem: 'An investor has ₹100,000 to invest in two stocks. Stock A returns 8% annually with risk factor 0.3. Stock B returns 6% annually with risk factor 0.2. The investor wants to maximize return while keeping total risk ≤ 25 and investing at least ₹30,000 in Stock A.',
      hint: 'Let x = amount in A (₹000), y = amount in B (₹000). Formulate the LP problem and solve graphically.',
      solution: 'Let x = amount in A (₹000), y = amount in B (₹000)\nMaximize Z = 0.08x + 0.06y\nSubject to:\nx + y ≤ 100\n0.3x + 0.2y ≤ 25\nx ≥ 30\nx, y ≥ 0\nOptimal: (30, 80) with Z = 7.2 (₹7,200)'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Step navigation
  const nextStep = () => {
    if (currentStep < procedureSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Graphical Solution Procedure
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn the complete step-by-step procedure for solving linear programming problems 
            graphically, from problem understanding to solution interpretation.
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
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Step Progress Indicator */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8 transition-all duration-300 hover:shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Step {currentStep + 1} of {procedureSteps.length}
            </span>
            <div className="flex gap-2">
              {procedureSteps.map((_, index) => (
                <div
                  key={`dot-${index}`}
                  className={clsx(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    index === currentStep
                      ? "bg-blue-600 w-6"
                      : index < currentStep
                      ? "bg-green-500"
                      : "bg-gray-300 dark:bg-gray-600"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* What is Graphical Solution Procedure? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is the Graphical Solution Procedure?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  The graphical solution procedure is a systematic method for solving linear programming 
                  problems with two variables. It involves graphing constraints, identifying the feasible 
                  region, and evaluating corner points to find the optimal solution. This procedure is 
                  the foundation for understanding LP and serves as a stepping stone to more complex 
                  solution methods like the simplex method.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Why It's Important</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Visualizes the solution process</li>
                      <li>Builds intuition for LP</li>
                      <li>Foundation for simplex method</li>
                      <li>Easy to understand and verify</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">When to Use It</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Two-variable LP problems</li>
                      <li>Teaching and learning LP</li>
                      <li>Quick verification of solutions</li>
                      <li>Understanding constraint interactions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Display */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-2xl">
                    {procedureSteps[currentStep].icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      Step {procedureSteps[currentStep].step}: {procedureSteps[currentStep].title}
                    </h4>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500 mb-4">
                      <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Description</h5>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {procedureSteps[currentStep].description}
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                      <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Key Actions</h5>
                      <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        {procedureSteps[currentStep].keyActions.map((action, idx) => (
                          <li key={`action-${idx}`}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500 mb-4">
                      <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Example</h5>
                      <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {procedureSteps[currentStep].example}
                      </pre>
                    </div>
                    
                    {/* Step Visualization */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex justify-center">
                      <svg viewBox="0 0 400 250" className="w-full max-w-md h-auto">
                        <rect x="10" y="10" width="380" height="230" rx="10" fill="white" stroke="#e9ecef" strokeWidth="1" className="dark:fill-gray-800 dark:stroke-gray-600"/>
                        <text x="200" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333" className="dark:fill-gray-200">
                          Step {currentStep + 1}: {procedureSteps[currentStep].title}
                        </text>
                        
                        {/* Step-specific visualization */}
                        {currentStep === 0 && (
                          <g>
                            <text x="200" y="100" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Problem: Factory produces chairs & tables</text>
                            <text x="200" y="125" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Resources: Labor (240 hrs), Machine (200 hrs)</text>
                            <text x="200" y="150" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Objective: Maximize profit</text>
                            <text x="200" y="175" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Decision: How many chairs and tables?</text>
                          </g>
                        )}
                        {currentStep === 1 && (
                          <g>
                            <text x="200" y="100" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">x = number of chairs</text>
                            <text x="200" y="125" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">y = number of tables</text>
                            <text x="200" y="150" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">x ≥ 0, y ≥ 0</text>
                          </g>
                        )}
                        {currentStep === 2 && (
                          <g>
                            <text x="200" y="100" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Maximize Z = 500x + 700y</text>
                            <text x="200" y="125" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Chair profit: ₹500</text>
                            <text x="200" y="150" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Table profit: ₹700</text>
                          </g>
                        )}
                        {currentStep === 3 && (
                          <g>
                            <text x="200" y="80" textAnchor="middle" fontSize="12" fill="#666" className="dark:fill-gray-400">Constraints:</text>
                            <text x="200" y="105" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">Labor: 3x + 2y ≤ 240</text>
                            <text x="200" y="125" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">Machine: 4x + y ≤ 200</text>
                            <text x="200" y="145" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">x ≥ 0, y ≥ 0</text>
                          </g>
                        )}
                        {currentStep === 4 && (
                          <g>
                            <line x1="50" y1="200" x2="350" y2="200" stroke="#333" strokeWidth="1"/>
                            <line x1="50" y1="200" x2="50" y2="50" stroke="#333" strokeWidth="1"/>
                            <line x1="50" y1="150" x2="350" y2="50" stroke="#FF6B6B" strokeWidth="2"/>
                            <text x="340" y="45" fontSize="10" fill="#FF6B6B">3x+2y=240</text>
                            <line x1="50" y1="180" x2="350" y2="80" stroke="#4ECDC4" strokeWidth="2"/>
                            <text x="340" y="75" fontSize="10" fill="#4ECDC4">4x+y=200</text>
                            <polygon points="50,200 50,150 200,100 350,80 350,200" fill="rgba(78, 205, 196, 0.2)" stroke="none"/>
                            <text x="200" y="130" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">Feasible Region</text>
                          </g>
                        )}
                        {currentStep === 5 && (
                          <g>
                            <circle cx="50" cy="200" r="6" fill="#FF4757"/><text x="35" y="215" fontSize="9">(0,0)</text>
                            <circle cx="350" cy="200" r="6" fill="#FF4757"/><text x="335" y="215" fontSize="9">(50,0)</text>
                            <circle cx="200" cy="120" r="6" fill="#FF4757"/><text x="185" y="115" fontSize="9">(40,60)</text>
                            <circle cx="50" cy="80" r="6" fill="#FF4757"/><text x="30" y="75" fontSize="9">(0,120)</text>
                            <text x="200" y="160" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">Corner Points</text>
                          </g>
                        )}
                        {currentStep === 6 && (
                          <g>
                            <text x="200" y="80" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">Z at each corner:</text>
                            <text x="200" y="105" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">(0,0): Z = 0</text>
                            <text x="200" y="125" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">(50,0): Z = 25,000</text>
                            <text x="200" y="145" textAnchor="middle" fontSize="10" fill="#FF4757" fontWeight="bold">(40,60): Z = 62,000 ✓</text>
                            <text x="200" y="165" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">(0,120): Z = 84,000 (infeasible)</text>
                          </g>
                        )}
                        {currentStep === 7 && (
                          <g>
                            <text x="200" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#FF4757">Optimal Solution</text>
                            <text x="200" y="115" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">x = 40 chairs</text>
                            <text x="200" y="135" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">y = 60 tables</text>
                            <text x="200" y="160" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4ECDC4">Z = ₹62,000</text>
                          </g>
                        )}
                        {currentStep === 8 && (
                          <g>
                            <text x="200" y="80" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">Interpretation:</text>
                            <text x="200" y="105" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Produce 40 chairs and 60 tables</text>
                            <text x="200" y="130" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Labor: Fully utilized (240 hrs)</text>
                            <text x="200" y="155" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Machine: 20 hrs slack</text>
                            <text x="200" y="180" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4ECDC4">Maximum Profit: ₹62,000</text>
                          </g>
                        )}
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex justify-between items-center gap-4 mt-4">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className={clsx(
                      "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                      currentStep === 0
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/30"
                    )}
                  >
                    ← Previous
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Step {currentStep + 1} of {procedureSteps.length}
                  </span>
                  <button
                    onClick={nextStep}
                    disabled={currentStep === procedureSteps.length - 1}
                    className={clsx(
                      "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                      currentStep === procedureSteps.length - 1
                        ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    )}
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Summary Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Complete Procedure Summary
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Step</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Action</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Key Question</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {procedureSteps.map((step) => (
                        <tr key={`summary-${step.step}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                          <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{step.step}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{step.title}</td>
                          <td className="px-4 py-2 text-xs text-gray-600 dark:text-gray-400">
                            {step.keyActions[0]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Graphical LP
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Use graph paper for accurate plotting</li>
                      <li>Test (0,0) for shading when possible</li>
                      <li>Double-check all corner points</li>
                      <li>Verify the solution in all constraints</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Forgetting non-negativity constraints</li>
                      <li>Incorrect shading of feasible region</li>
                      <li>Missing corner points</li>
                      <li>Not verifying the solution</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Problem understood correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Variables clearly defined</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Objective function correctly formulated</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">All constraints included</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Graph accurate with correct shading</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Optimal solution verified</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'examples' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  {exampleData.title}
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Problem</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {exampleData.problem}
                      </p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Variables & Objective</h4>
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                        {exampleData.variables}
                      </p>
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mt-2">
                        {exampleData.objective}
                      </p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Constraints</h4>
                    <ul className="list-disc list-inside text-sm font-mono text-gray-700 dark:text-gray-300 space-y-1">
                      {exampleData.constraints.map((c, idx) => (
                        <li key={`ex-const-${idx}`}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Corner Points Evaluation</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Corner Point</th>
                            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Z = 500x + 700y</th>
                            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exampleData.cornerPoints.map((cp, idx) => (
                            <tr key={`cp-${idx}`} className={cp.status === 'Optimal' ? 'bg-green-100 dark:bg-green-900/30' : ''}>
                              <td className="px-4 py-2 font-mono text-gray-700 dark:text-gray-300">{cp.point}</td>
                              <td className="px-4 py-2 font-mono text-gray-700 dark:text-gray-300">{cp.z.toLocaleString()}</td>
                              <td className="px-4 py-2">
                                <span className={clsx(
                                  "px-2 py-1 rounded text-xs font-medium",
                                  cp.status === 'Optimal' ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                                  cp.status === 'Infeasible' ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" :
                                  "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                )}>
                                  {cp.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border-l-4 border-indigo-500">
                    <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">Optimal Solution</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-bold">Point:</span> {exampleData.optimal.point}
                      <br />
                      <span className="font-bold">Variables:</span> {exampleData.optimal.variables}
                      <br />
                      <span className="font-bold">Maximum Profit:</span> {exampleData.optimal.z}
                    </p>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Important Note</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      The point (40,60) is actually infeasible because it violates the machine constraint!
                      <br />
                      <span className="font-bold">Actual Optimal Solution:</span> {exampleData.actualOptimal.point}
                      <br />
                      <span className="font-bold">Maximum Profit:</span> {exampleData.actualOptimal.z}
                    </p>
                  </div>
                </div>
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
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Solving LP Problems Graphically
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Follow the steps in order:</span> Don't skip any step</li>
                  <li><span className="font-medium">Write everything down:</span> Document your variables, constraints, and calculations</li>
                  <li><span className="font-medium">Check your graph:</span> Verify intercepts and shading</li>
                  <li><span className="font-medium">Verify all corner points:</span> Check each point satisfies all constraints</li>
                  <li><span className="font-medium">Always verify your solution:</span> Substitute back into all constraints</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Graphical Solution Procedure FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Graphical Solution Procedure"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The graphical solution procedure is the foundation of LP. I tell my students that mastering this procedure is like learning the alphabet before reading - it's essential for everything that follows. The key is to be systematic and follow each step carefully. I encourage students to practice with different types of problems until the procedure becomes second nature. This builds the intuition needed for more advanced LP topics." />
        </div>
      </div>
    </div>
  );
};

export default Topic0;