import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic81_files/topic81_questions';
import noteText from './topic81_files/topic81_note.txt?raw';

const Topic81 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [currentStep, setCurrentStep] = useState(0);
  const [showExample, setShowExample] = useState(false);

  const tabs = [
    { id: 'concept', label: 'Procedure' },
    { id: 'example', label: 'Step-by-Step Example' },
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

  // Interactive procedure visualization
  const ProcedureVisualization = () => {
    const step = procedureSteps[currentStep];
    if (!step) return null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-2xl">
            {step.icon}
          </div>
          <div>
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Step {step.step}: {step.title}
            </h4>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500 mb-4">
              <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Description</h5>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {step.description}
              </p>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
              <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Key Actions</h5>
              <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                {step.keyActions.map((action, idx) => (
                  <li key={`action-${idx}`}>{action}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500 mb-4">
              <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Example</h5>
              <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {step.example}
              </pre>
            </div>
            
            {/* SVG Visualization for the step */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 flex justify-center">
              <svg viewBox="0 0 400 250" className="w-full max-w-md h-auto">
                {/* Step-specific SVG content */}
                <rect x="10" y="10" width="380" height="230" rx="10" fill="white" stroke="#e9ecef" strokeWidth="1" className="dark:fill-gray-800 dark:stroke-gray-600"/>
                <text x="200" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#333" className="dark:fill-gray-200">
                  Step {step.step}: {step.title}
                </text>
                
                {/* Visual representation of the step */}
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
                
                {/* Progress indicator */}
                <rect x="50" y="220" width="300" height="6" rx="3" fill="#e9ecef"/>
                <rect x="50" y="220" width={300 * ((currentStep + 1) / procedureSteps.length)} height="6" rx="3" fill="#4ECDC4">
                  <animate attributeName="width" values={`${300 * (currentStep / procedureSteps.length)};${300 * ((currentStep + 1) / procedureSteps.length)}`} dur="0.5s" fill="freeze" />
                </rect>
                <text x="200" y="242" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">
                  Step {currentStep + 1} of {procedureSteps.length}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Navigation controls
  const StepNavigation = () => {
    return (
      <div className="flex justify-between items-center gap-4 mt-4">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className={clsx(
            "px-4 py-2 rounded-lg font-medium transition-all duration-300",
            currentStep === 0
              ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-800/30"
          )}
        >
          ← Previous
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Step {currentStep + 1} of {procedureSteps.length}
        </span>
        <button
          onClick={() => setCurrentStep(Math.min(procedureSteps.length - 1, currentStep + 1))}
          disabled={currentStep === procedureSteps.length - 1}
          className={clsx(
            "px-4 py-2 rounded-lg font-medium transition-all duration-300",
            currentStep === procedureSteps.length - 1
              ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          )}
        >
          Next →
        </button>
      </div>
    );
  };

  // Quick reference steps
  const quickSteps = [
    { num: 1, label: 'Understand Problem' },
    { num: 2, label: 'Define Variables' },
    { num: 3, label: 'Formulate Objective' },
    { num: 4, label: 'Formulate Constraints' },
    { num: 5, label: 'Graph Constraints' },
    { num: 6, label: 'Find Corner Points' },
    { num: 7, label: 'Evaluate Objective' },
    { num: 8, label: 'Select Optimal' },
    { num: 9, label: 'Interpret Results' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Step-by-Step Procedure for Solving LP Graphically
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn the complete step-by-step procedure for solving linear programming problems 
            graphically, from problem understanding to solution interpretation.
          </p>
        </div>

        {/* Quick Reference */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8 transition-all duration-300 hover:shadow-lg">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 text-center">Quick Reference: 9 Steps</h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickSteps.map((step) => (
              <button
                key={`quick-${step.num}`}
                onClick={() => setCurrentStep(step.num - 1)}
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
                  currentStep === step.num - 1
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                )}
              >
                {step.num}. {step.label}
              </button>
            ))}
          </div>
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
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
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
              {/* Procedure Steps */}
              <ProcedureVisualization />
              <StepNavigation />

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
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Key Questions to Ask</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {procedureSteps.map((step) => (
                        <tr key={`summary-${step.step}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                          <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{step.step}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{step.title}</td>
                          <td className="px-4 py-2 text-xs text-gray-600 dark:text-gray-400">
                            {step.keyActions.slice(0, 2).map((action, idx) => (
                              <div key={`q-${idx}`}>• {action}</div>
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tips for Success */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
                  💡 Tips for Success in Graphical LP
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Be systematic:</span> Follow the steps in order - don't skip ahead</li>
                  <li><span className="font-medium">Double-check constraints:</span> Make sure you haven't missed any constraints</li>
                  <li><span className="font-medium">Graph accurately:</span> Use graph paper or precise tools for plotting</li>
                  <li><span className="font-medium">Check all corner points:</span> Don't miss any corner points, including those on axes</li>
                  <li><span className="font-medium">Verify feasibility:</span> Always check that your solution satisfies all constraints</li>
                  <li><span className="font-medium">Interpret results:</span> Translate mathematical results back to the original problem</li>
                </ul>
              </div>
            </>
          )}

          {activeTab === 'example' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  {exampleData.title}
                </h3>
                
                <div className="space-y-6">
                  {/* Problem Statement */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Problem</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {exampleData.problem}
                    </p>
                  </div>

                  {/* Step-by-Step Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Variables & Objective</h4>
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                        {exampleData.variables}
                      </p>
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300 mt-2">
                        {exampleData.objective}
                      </p>
                    </div>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Constraints</h4>
                      <ul className="list-disc list-inside text-sm font-mono text-gray-700 dark:text-gray-300 space-y-1">
                        {exampleData.constraints.map((c, idx) => (
                          <li key={`ex-const-${idx}`}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Corner Points Evaluation */}
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

                  {/* Optimal Solution */}
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

                  {/* Resource Utilization */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Resource Utilization</h4>
                    <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Labor: 3(40) + 2(60) = 240 hours</span>
                        <span className="text-green-600 dark:text-green-400">Fully utilized ✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Machine: 4(40) + 60 = 220 hours</span>
                        <span className="text-red-600 dark:text-red-400">Exceeds 200 hours! ✗</span>
                      </div>
                      <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                        Note: The point (40,60) is actually infeasible because it violates the machine constraint!
                      </div>
                    </div>
                  </div>

                  {/* Actual Optimal Solution */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Actual Optimal Solution</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-bold">Point:</span> {exampleData.actualOptimal.point}
                      <br />
                      <span className="font-bold">Maximum Profit:</span> {exampleData.actualOptimal.z}
                      <br />
                      <span className="font-bold">Resource Utilization:</span>
                    </p>
                    <div className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex justify-between">
                        <span>Labor: 3(40) + 2(40) = 200 hours</span>
                        <span className="text-yellow-600 dark:text-yellow-400">40 hours slack</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Machine: 4(40) + 40 = 200 hours</span>
                        <span className="text-green-600 dark:text-green-400">Fully utilized ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'practice' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Practice Problems - Step-by-Step
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Bakery Production
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A bakery produces cakes and pastries. Each cake gives a profit of ₹600 and each pastry gives ₹400. The bakery has 200 kg of flour and 150 hours of labor available. A cake requires 2 kg flour and 3 hours labor. A pastry requires 1 kg flour and 2 hours labor.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Follow the step-by-step procedure to find the optimal production mix.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300">
                        Check Solution
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Hint:</span> Define x = cakes, y = pastries. Formulate objective and constraints, then graph.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Investment Portfolio
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      An investor wants to allocate ₹100,000 between two investments. Investment A returns 8% annually with a risk factor of 0.3. Investment B returns 6% annually with a risk factor of 0.2. The investor wants to maximize return while keeping total risk ≤ 25.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Use the step-by-step procedure to find the optimal allocation.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300">
                        Check Solution
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-semibold">Hint:</span> Define x = amount in A, y = amount in B. Risk constraint: 0.3x + 0.2y ≤ 25.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Complete Step-by-Step
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A small factory produces two products with the following data:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Product A: ₹50 profit, 2 hours labor, 3 units material
                      Product B: ₹40 profit, 3 hours labor, 2 units material
                      Available: 120 labor hours, 90 units material
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Follow all 9 steps to solve this LP problem graphically.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300">
                        Check Solution
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
                  💡 Step-by-Step Practice Tips
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Follow the sequence:</span> Don't skip steps - each step builds on the previous</li>
                  <li><span className="font-medium">Write everything down:</span> Document your variables, constraints, and calculations</li>
                  <li><span className="font-medium">Check your work:</span> Verify each step before moving to the next</li>
                  <li><span className="font-medium">Use graph paper:</span> Accurate graphing is essential for correct solutions</li>
                  <li><span className="font-medium">Practice with different problems:</span> Each problem helps reinforce the procedure</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Graphical LP Procedure FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Step-by-Step Procedure for Solving LP Graphically"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic81_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The step-by-step procedure is the backbone of solving LP problems graphically. I emphasize to students that following this procedure systematically is like following a recipe - each step is essential and the order matters. The most common mistake I see is students rushing to graph before properly formulating the problem. I always tell them: 'Take time to understand the problem first. The graph is just a tool - the real insight comes from understanding what you're optimizing and what constraints you're facing.'" />
        </div>
      </div>
    </div>
  );
};

export default Topic81;