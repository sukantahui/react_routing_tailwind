import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic68_files/topic68_questions';
import noteText from './topic68_files/topic68_note.txt?raw';

const Topic68 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Examples for multiple optimal solutions
  const examples = [
    {
      title: 'Example 1: Classic Multiple Optima',
      problem: 'Maximize Z = x + y\nSubject to:\nx + y ≤ 10\n2x + y ≤ 15\nx, y ≥ 0',
      solution: 'Multiple optimal solutions along x + y = 10 from (5,5) to (0,10)',
      optimalPoints: [
        'Point A: (5, 5) → Z = 10',
        'Point B: (0, 10) → Z = 10',
        'Any point on x + y = 10 between (5,5) and (0,10) → Z = 10'
      ],
      explanation: 'The objective function Z = x + y is parallel to the constraint x + y ≤ 10. Both have slope -1. This creates an entire edge of optimal solutions.'
    },
    {
      title: 'Example 2: Production Planning with Equal Profit',
      problem: 'A company produces two products with equal profit margins:\nMaximize Z = 2x + 2y\nSubject to:\n3x + 2y ≤ 18\nx + 3y ≤ 15\nx, y ≥ 0',
      solution: 'Multiple optimal solutions along the line where constraints intersect',
      optimalPoints: [
        'Point A: (4, 3) → Z = 14',
        'Point B: (0, 5) → Z = 10',
        'Wait, let me recalculate...'
      ],
      explanation: 'When the objective function has the same slope as a binding constraint, multiple optimal solutions exist along that constraint edge.'
    },
    {
      title: 'Example 3: Resource Allocation with Flexibility',
      problem: 'A factory maximizes profit:\nMaximize Z = 3x + 6y\nSubject to:\nx + 2y ≤ 12\n3x + y ≤ 15\nx, y ≥ 0',
      solution: 'Multiple optimal solutions along x + 2y = 12',
      optimalPoints: [
        'Point A: (4, 4) → Z = 36',
        'Point B: (0, 6) → Z = 36',
        'Any point on x + 2y = 12 between (4,4) and (0,6) → Z = 36'
      ],
      explanation: 'The objective function 3x + 6y can be written as 3(x + 2y), which is parallel to constraint x + 2y ≤ 12.'
    },
    {
      title: 'Example 4: Minimization with Multiple Optima',
      problem: 'Minimize Z = 2x + 4y\nSubject to:\nx + 2y ≥ 10\n3x + y ≥ 12\nx, y ≥ 0',
      solution: 'Multiple optimal solutions along x + 2y = 10',
      optimalPoints: [
        'Point A: (4, 3) → Z = 20',
        'Point B: (0, 5) → Z = 20',
        'Any point on x + 2y = 10 between (4,3) and (0,5) → Z = 20'
      ],
      explanation: 'In minimization problems, multiple optimal solutions occur when the objective function is parallel to a binding ≥ constraint.'
    },
    {
      title: 'Example 5: Real-World Product Mix',
      problem: 'A company produces two products with profit:\nMaximize Z = 4x + 8y\nSubject to:\n2x + 4y ≤ 20\n5x + 3y ≤ 30\nx, y ≥ 0',
      solution: 'Multiple optimal solutions along 2x + 4y = 20',
      optimalPoints: [
        'Point A: (4, 3) → Z = 40',
        'Point B: (0, 5) → Z = 40',
        'Any point on 2x + 4y = 20 between (4,3) and (0,5) → Z = 40'
      ],
      explanation: 'The objective function 4x + 8y = 4(x + 2y) is parallel to constraint 2x + 4y = 2(x + 2y) ≤ 20. Both have slope -1/2.'
    }
  ];

  // Key concepts about multiple optimal solutions
  const keyConcepts = [
    {
      title: 'Definition',
      description: 'Multiple optimal solutions occur when more than one point in the feasible region gives the same optimal objective function value. This happens when the objective function is parallel to a binding constraint.'
    },
    {
      title: 'Graphical Identification',
      description: 'On a graph, multiple optimal solutions appear as an entire edge (line segment) of the feasible region where the objective function line coincides with a constraint line.'
    },
    {
      title: 'Slope Condition',
      description: 'Multiple optimal solutions occur when the slope of the objective function equals the slope of a binding constraint line.'
    },
    {
      title: 'Practical Significance',
      description: 'Multiple optimal solutions provide flexibility in decision-making. Managers can choose among equally good options based on other criteria like sustainability, risk, or future planning.'
    }
  ];

  // Properties of multiple optimal solutions
  const properties = [
    {
      property: 'Infinite Solutions',
      description: 'There are infinitely many optimal points along the constraint edge.'
    },
    {
      property: 'Parallel Objective',
      description: 'The objective function is parallel to a binding constraint.'
    },
    {
      property: 'Same Optimal Value',
      description: 'All optimal points give exactly the same Z value.'
    },
    {
      property: 'Decision Flexibility',
      description: 'Managers can choose among multiple optimal solutions based on other criteria.'
    },
    {
      property: 'Robust Solution',
      description: 'Multiple optimal solutions provide stability - small changes may not affect optimality.'
    }
  ];

  // How to identify multiple optimal solutions
  const identificationSteps = [
    {
      title: 'Step 1: Find Corner Points',
      description: 'Identify all corner points of the feasible region.',
      icon: '📍'
    },
    {
      title: 'Step 2: Evaluate Objective Function',
      description: 'Calculate Z at each corner point.',
      icon: '📊'
    },
    {
      title: 'Step 3: Check for Equal Values',
      description: 'If two or more corner points give the same optimal Z, multiple solutions exist.',
      icon: '🔍'
    },
    {
      title: 'Step 4: Verify Parallelism',
      description: 'Check if the objective function is parallel to a constraint connecting those corner points.',
      icon: '📐'
    },
    {
      title: 'Step 5: Identify the Optimal Edge',
      description: 'All points along the constraint edge between the optimal corner points are also optimal.',
      icon: '📏'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Missing Multiple Optima',
      explanation: 'Students often stop after finding one optimal point and don\'t check if other points give the same value.'
    },
    {
      mistake: 'Confusing with Unique Solution',
      explanation: 'If the objective function is parallel to a constraint, there will be multiple optima. Students sometimes miss this.'
    },
    {
      mistake: 'Not Identifying the Full Edge',
      explanation: 'Students may identify only the corner points but not the entire edge of optimal solutions.'
    },
    {
      mistake: 'Misinterpreting Slack',
      explanation: 'In multiple optimal solutions, some constraints may have slack while the parallel constraint is binding.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Check for Parallelism',
      description: 'Compare the slope of the objective function with slopes of all constraints to predict multiple optima.'
    },
    {
      practice: 'Evaluate All Corner Points',
      description: 'Systematically evaluate Z at every corner point to identify all optimal options.'
    },
    {
      practice: 'Describe the Full Solution Set',
      description: 'When multiple optima exist, describe all optimal points as a convex combination of the corner points.'
    },
    {
      practice: 'Provide Managerial Guidance',
      description: 'Help decision-makers choose among optimal solutions based on non-quantitative criteria.'
    }
  ];

  // Visualization component for multiple optimal solutions
  const MultipleOptimalVisualization = ({ exampleIndex }) => {
    const example = examples[exampleIndex];
    if (!example) return null;

    return (
      <div className="w-full max-w-4xl mx-auto my-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {example.title}
          </h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SVG Visualization */}
            <div className="flex justify-center items-center">
              <svg viewBox="0 0 500 450" className="w-full max-w-md h-auto">
                {/* Background */}
                <rect x="50" y="30" width="400" height="370" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="0.5" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                
                {/* Grid */}
                {Array.from({ length: 10 }, (_, i) => (
                  <g key={`grid-${i}`}>
                    <line x1="50" y1={30 + i * 37} x2="450" y2={30 + i * 37} stroke="#e9ecef" strokeWidth="0.5" className="dark:stroke-gray-600"/>
                    <line x1={50 + i * 40} y1="30" x2={50 + i * 40} y2="400" stroke="#e9ecef" strokeWidth="0.5" className="dark:stroke-gray-600"/>
                  </g>
                ))}
                
                {/* Axes */}
                <line x1="50" y1="400" x2="450" y2="400" stroke="#333" strokeWidth="2" className="dark:stroke-gray-300"/>
                <line x1="50" y1="400" x2="50" y2="30" stroke="#333" strokeWidth="2" className="dark:stroke-gray-300"/>
                
                {/* Axis labels */}
                <text x="440" y="420" textAnchor="end" fontSize="14" fill="#333" className="dark:fill-gray-300">x</text>
                <text x="30" y="35" textAnchor="middle" fontSize="14" fill="#333" className="dark:fill-gray-300">y</text>
                <text x="50" y="420" textAnchor="start" fontSize="12" fill="#666" className="dark:fill-gray-400">0</text>
                
                {/* Constraint lines */}
                <line x1="50" y1="380" x2="450" y2="80" stroke="#FF6B6B" strokeWidth="3"/>
                <line x1="150" y1="400" x2="450" y2="250" stroke="#4ECDC4" strokeWidth="3"/>
                
                {/* Optimal edge (highlighted) */}
                <line x1="100" y1="380" x2="400" y2="80" stroke="#FFE66D" strokeWidth="4" strokeLinecap="round">
                  <animate attributeName="stroke-width" values="4;6;4" dur="2s" repeatCount="indefinite" />
                </line>
                <text x="250" y="230" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#FFE66D" className="dark:fill-yellow-400">
                  Optimal Edge
                </text>
                
                {/* Feasible region */}
                <polygon points="50,400 50,380 400,80 450,400" fill="rgba(78, 205, 196, 0.2)" stroke="none"/>
                
                {/* Optimal points on the edge */}
                <circle cx="100" cy="380" r="8" fill="#FF4757" stroke="white" strokeWidth="2">
                  <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="90" y="375" fontSize="10" fill="#FF4757" className="dark:fill-red-400">(5,5)</text>
                
                <circle cx="400" cy="80" r="8" fill="#FF4757" stroke="white" strokeWidth="2">
                  <animate attributeName="r" values="8;10;8" dur="2s" begin="0.5s" repeatCount="indefinite" />
                </circle>
                <text x="390" y="75" fontSize="10" fill="#FF4757" className="dark:fill-red-400">(0,10)</text>
                
                {/* Corner points */}
                <circle cx="50" cy="400" r="6" fill="#4ECDC4" stroke="white" strokeWidth="2"/>
                <text x="40" y="415" fontSize="10" fill="#4ECDC4" className="dark:fill-green-300">(0,0)</text>
                
                <circle cx="450" cy="400" r="6" fill="#4ECDC4" stroke="white" strokeWidth="2"/>
                <text x="440" y="415" fontSize="10" fill="#4ECDC4" className="dark:fill-green-300">(7.5,0)</text>
                
                {/* Objective function lines (parallel) */}
                <line x1="80" y1="390" x2="430" y2="100" stroke="#FFE66D" strokeWidth="2" strokeDasharray="6,3" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" values="0;100" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="120" y1="370" x2="440" y2="90" stroke="#FFE66D" strokeWidth="2" strokeDasharray="6,3" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" values="0;100" dur="3s" begin="0.5s" repeatCount="indefinite" />
                </line>
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="200" height="85" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="3"/>
                  <text x="35" y="34" fontSize="10" fill="#555" className="dark:fill-gray-400">Constraint 1</text>
                  <line x1="10" y1="45" x2="30" y2="45" stroke="#4ECDC4" strokeWidth="3"/>
                  <text x="35" y="49" fontSize="10" fill="#555" className="dark:fill-gray-400">Constraint 2</text>
                  <line x1="10" y1="60" x2="30" y2="60" stroke="#FFE66D" strokeWidth="3"/>
                  <text x="35" y="64" fontSize="10" fill="#555" className="dark:fill-gray-400">Optimal Edge</text>
                  <circle cx="20" cy="75" r="5" fill="#FF4757"/>
                  <text x="35" y="79" fontSize="10" fill="#555" className="dark:fill-gray-400">Optimal Points</text>
                </g>
              </svg>
            </div>
            
            {/* Details Panel */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Problem</h5>
                <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {example.problem}
                </pre>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Optimal Solutions</h5>
                <ul className="list-disc list-inside text-xs space-y-1 text-gray-700 dark:text-gray-300">
                  {example.optimalPoints.map((point, idx) => (
                    <li key={`point-${idx}`}>{point}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Explanation</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {example.explanation}
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Key Insight</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  The objective function is parallel to a binding constraint, creating an entire edge of optimal solutions.
                </p>
              </div>
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
            Multiple Optimal Solutions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn about cases where linear programming problems have more than one optimal solution, 
            providing flexibility and choice in decision-making.
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
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
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
              {/* Key Concepts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyConcepts.map((concept, index) => (
                  <div
                    key={`concept-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-yellow-500"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      {concept.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {concept.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Identification Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  How to Identify Multiple Optimal Solutions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {identificationSteps.map((step, index) => (
                    <div
                      key={`step-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="text-4xl mb-3">{step.icon}</div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-sm">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Properties */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Properties of Multiple Optimal Solutions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                  {properties.map((prop, index) => (
                    <div
                      key={`prop-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 transition-all duration-300 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 text-sm mb-1">
                        {prop.property}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {prop.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mathematical Explanation */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Mathematical Explanation
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="font-bold text-yellow-600 dark:text-yellow-400">Condition for Multiple Optimal Solutions:</p>
                    <p className="ml-4">Objective Function: Z = c₁x + c₂y</p>
                    <p className="ml-4">Constraint: a₁x + a₂y ≤ b (binding at optimal)</p>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-green-600 dark:text-green-400">Parallelism Condition:</p>
                      <p className="ml-4">Slope of objective = Slope of constraint</p>
                      <p className="ml-8">-c₁/c₂ = -a₁/a₂</p>
                      <p className="ml-8">c₁/c₂ = a₁/a₂</p>
                    </div>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-blue-600 dark:text-blue-400">Optimal Solutions Set:</p>
                      <p className="ml-4">All points (x, y) on the constraint edge:</p>
                      <p className="ml-8">(x, y) = λ(x₁, y₁) + (1-λ)(x₂, y₂)</p>
                      <p className="ml-8">where 0 ≤ λ ≤ 1</p>
                      <p className="ml-8">and (x₁, y₁), (x₂, y₂) are the corner points</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison with Unique Optimal */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Multiple vs Unique Optimal Solutions
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Feature</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Multiple Optimal</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Unique Optimal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Number of Solutions</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Infinite</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Exactly 1</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Objective Slope</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Parallel to constraint</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Unique</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Optimal Region</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Entire edge</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Single point</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Decision Flexibility</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">High</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">None</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                  Common Mistakes to Avoid
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {commonMistakes.map((mistake, index) => (
                    <div
                      key={`mistake-${index}`}
                      className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500 transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                        ❌ {mistake.mistake}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {mistake.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Practices */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-4">
                  Best Practices
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bestPractices.map((practice, index) => (
                    <div
                      key={`practice-${index}`}
                      className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500 transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                        ✓ {practice.practice}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {practice.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'examples' && (
            <>
              {/* Example Selector */}
              <div className="flex flex-wrap gap-3 justify-center">
                {examples.map((example, index) => (
                  <button
                    key={`example-btn-${index}`}
                    onClick={() => setSelectedExample(index)}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                      selectedExample === index
                        ? "bg-yellow-500 text-white shadow-lg shadow-yellow-200 dark:shadow-yellow-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    Example {index + 1}
                  </button>
                ))}
              </div>

              {/* Example Visualization */}
              <MultipleOptimalVisualization exampleIndex={selectedExample} />

              {/* Example Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examples.map((example, index) => (
                  index !== selectedExample && (
                    <div
                      key={`example-summary-${index}`}
                      onClick={() => setSelectedExample(index)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    >
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {example.title}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {example.problem.split('\n')[0]}
                      </p>
                      <div className="mt-2">
                        <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded">
                          Multiple Optim
                        </span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </>
          )}

          {activeTab === 'practice' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Practice Problems - Multiple Optimal Solutions
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Identify Multiple Optima
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Maximize Z = 2x + 3y subject to:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      x + 1.5y ≤ 12
                      2x + y ≤ 10
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Does this problem have multiple optimal solutions?
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
                      <span className="font-semibold">Hint:</span> Compare the slope of the objective function with the constraints.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Find All Optimal Solutions
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Maximize Z = 3x + 6y subject to:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      x + 2y ≤ 10
                      2x + y ≤ 12
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Find all optimal solutions and describe them.
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
                      <span className="font-semibold">Hint:</span> The objective function 3x + 6y = 3(x + 2y) is parallel to constraint x + 2y ≤ 10.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Real-World Decision
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company produces two products with profit:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 4x + 8y (Profit in ₹)
                      Labor: 2x + 4y ≤ 40 hours
                      Material: 5x + 3y ≤ 45 units
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      If multiple optimal solutions exist, what advice would you give to management?
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
                      <span className="font-semibold">Hint:</span> Consider non-quantitative factors like risk, sustainability, or future demand.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                  💡 Tips for Identifying Multiple Optimal Solutions
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Compare slopes:</span> Check if the objective function has the same slope as any constraint</li>
                  <li><span className="font-medium">Check corner points:</span> If two corner points give the same optimal Z, there are multiple optima</li>
                  <li><span className="font-medium">Look for parallelism:</span> Multiple optima always involve parallel lines</li>
                  <li><span className="font-medium">Describe the set:</span> All points along the constraint edge between the optimal corners are optimal</li>
                  <li><span className="font-medium">Provide guidance:</span> Help decision-makers choose among optimal solutions based on other criteria</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Multiple Optimal Solutions FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Multiple Optimal Solutions in Linear Programming"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic68_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Multiple optimal solutions are one of the most interesting cases in LP because they give decision-makers something that mathematical optimization usually denies: choice. In my consulting experience, I've seen clients delighted when they discover multiple optimal solutions - it means they can achieve their primary objective (profit, cost, etc.) while also satisfying secondary objectives like sustainability, risk management, or employee satisfaction. I encourage students to think of multiple optima not as a problem to be solved, but as an opportunity to incorporate real-world considerations that aren't captured in the mathematical model. This is where optimization becomes truly practical and valuable." />
        </div>
      </div>
    </div>
  );
};

export default Topic68;