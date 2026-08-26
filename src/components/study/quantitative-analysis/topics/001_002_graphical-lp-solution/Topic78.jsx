import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic78_files/topic78_questions';
import noteText from './topic78_files/topic78_note.txt?raw';

const Topic78 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [showSolution, setShowSolution] = useState(false);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'solution', label: 'Solution' },
    { id: 'practice', label: 'Practice' },
  ];

  // Public resource allocation problem data
  const problemData = {
    title: 'Public Resource Allocation Problem',
    scenario: 'The Barrackpore Municipal Corporation needs to allocate its annual budget of ₹100 crores across two public service categories: Infrastructure Development (x) and Social Welfare Programs (y). The goal is to maximize public benefit while meeting various constraints.',
    objective: 'Maximize Z = 12x + 10y (Benefit units in lakhs)',
    constraints: [
      'Budget: 5x + 4y ≤ 100 (crores)',
      'Infrastructure Minimum: x ≥ 6 (crores)',
      'Social Welfare Minimum: y ≥ 4 (crores)',
      'Infrastructure Maximum: x ≤ 14 (crores)',
      'Social Welfare Maximum: y ≤ 16 (crores)',
      'Political Balance: x + y ≥ 12 (crores)',
      'x, y ≥ 0'
    ],
    variables: [
      'x = Amount allocated to Infrastructure Development (in crores)',
      'y = Amount allocated to Social Welfare Programs (in crores)'
    ],
    optimalSolution: {
      point: '(12, 10)',
      benefit: 'Z = 12(12) + 10(10) = 144 + 100 = 244 benefit units'
    },
    resourceUtilization: [
      { resource: 'Budget', used: '5(12) + 4(10) = 100', available: 100, slack: 0, utilization: '100%' },
      { resource: 'Infrastructure Min', used: '12 ≥ 6', available: 6, status: 'Satisfied', slack: 6 },
      { resource: 'Social Welfare Min', used: '10 ≥ 4', available: 4, status: 'Satisfied', slack: 6 },
      { resource: 'Infrastructure Max', used: '12 ≤ 14', available: 14, status: 'Satisfied', slack: 2 },
      { resource: 'Social Welfare Max', used: '10 ≤ 16', available: 16, status: 'Satisfied', slack: 6 },
      { resource: 'Political Balance', used: '12 + 10 = 22 ≥ 12', available: 12, status: 'Satisfied', slack: 10 }
    ]
  };

  // Key concepts about public resource allocation
  const keyConcepts = [
    {
      title: 'Problem Context',
      description: 'Governments and municipalities must allocate limited public resources across competing needs: infrastructure, healthcare, education, social welfare, etc.'
    },
    {
      title: 'Multiple Stakeholders',
      description: 'Public resource allocation involves balancing the needs of different stakeholders: citizens, businesses, political groups, and various government departments.'
    },
    {
      title: 'Equity and Fairness',
      description: 'Public resource allocation often requires ensuring equitable distribution across regions and demographic groups.'
    },
    {
      title: 'Political Constraints',
      description: 'Public resource allocation is influenced by political considerations, minimum requirements, and maximum limits on spending categories.'
    }
  ];

  // Types of constraints in public resource allocation
  const constraintTypes = [
    {
      type: 'Budgetary Constraints',
      description: 'Total spending cannot exceed available budget. This is the primary constraint in public resource allocation.',
      example: '5x + 4y ≤ 100'
    },
    {
      type: 'Minimum Requirements',
      description: 'Certain sectors must receive at least a minimum allocation (political or legal requirements).',
      example: 'x ≥ 6, y ≥ 4'
    },
    {
      type: 'Maximum Limits',
      description: 'Some sectors cannot receive more than a certain amount (due to capacity or political reasons).',
      example: 'x ≤ 14, y ≤ 16'
    },
    {
      type: 'Political Balance',
      description: 'Requirements to ensure balanced allocation across sectors or regions.',
      example: 'x + y ≥ 12'
    }
  ];

  // Steps for solving public resource allocation problems
  const solutionSteps = [
    {
      title: 'Step 1: Define Variables',
      description: 'Define x and y as budget allocations to different public services.',
      icon: '📝'
    },
    {
      title: 'Step 2: Formulate Constraints',
      description: 'Include budget, minimum requirements, maximum limits, and political constraints.',
      icon: '📋'
    },
    {
      title: 'Step 3: Define Objective',
      description: 'Maximize public benefit or welfare, not just financial efficiency.',
      icon: '🎯'
    },
    {
      title: 'Step 4: Graph the Problem',
      description: 'Plot constraints to visualize the feasible region of allocation options.',
      icon: '📐'
    },
    {
      title: 'Step 5: Find Optimal Solution',
      description: 'Evaluate corner points to find allocation that maximizes public benefit.',
      icon: '💰'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Focusing Only on Financial Efficiency',
      explanation: 'Public resource allocation must consider social welfare, equity, and political feasibility, not just financial metrics.'
    },
    {
      mistake: 'Ignoring Minimum Requirements',
      explanation: 'Legal or political mandates require minimum spending in certain sectors.'
    },
    {
      mistake: 'Overlooking Capacity Constraints',
      explanation: 'Sectors may not be able to efficiently absorb unlimited funding.'
    },
    {
      mistake: 'Neglecting Stakeholder Needs',
      explanation: 'Public resource allocation must consider the needs of all stakeholders.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Include All Stakeholders',
      description: 'Consider the needs of citizens, businesses, and government departments in the allocation.'
    },
    {
      practice: 'Use Multiple Criteria',
      description: 'Consider economic efficiency, social equity, and political feasibility.'
    },
    {
      practice: 'Ensure Transparency',
      description: 'Make the allocation process transparent and based on clear criteria.'
    },
    {
      practice: 'Allow for Flexibility',
      description: 'Include provisions for adjusting allocations based on changing needs.'
    }
  ];

  // Additional considerations
  const considerations = [
    {
      title: 'Regional Balance',
      description: 'Public resources should be allocated equitably across different regions to avoid disparities.'
    },
    {
      title: 'Population Needs',
      description: 'Allocations should consider population density, demographic composition, and specific needs of different communities.'
    },
    {
      title: 'Project Capacity',
      description: 'Sectors must have the capacity to effectively utilize allocated funds within the budget period.'
    },
    {
      title: 'Monitoring and Evaluation',
      description: 'Mechanisms must be in place to monitor resource utilization and evaluate outcomes.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Public Resource Allocation Problem
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how linear programming can help governments and municipalities allocate 
            limited public resources across competing needs to maximize public benefit.
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
            &gt;
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* Problem Statement */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  {problemData.title}
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500 mb-4">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Scenario</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {problemData.scenario}
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Variables</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        {problemData.variables.map((varItem, idx) => (
                          <li key={`var-${idx}`}>{varItem}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500 mb-4">
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Objective</h4>
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                        {problemData.objective}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Benefit units measure public welfare impact
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Constraints</h4>
                      <ul className="list-disc list-inside text-sm font-mono text-gray-700 dark:text-gray-300 space-y-1">
                        {problemData.constraints.map((constraint, idx) => (
                          <li key={`constraint-${idx}`}>{constraint}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Concepts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {keyConcepts.map((concept, index) => (
                  <div
                    key={`concept-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-blue-600"
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

              {/* Constraint Types */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Types of Constraints in Public Resource Allocation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {constraintTypes.map((type, index) => (
                    <div
                      key={`type-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        {type.type}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {type.description}
                      </p>
                      <code className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                        {type.example}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Steps to Solve Public Resource Allocation Problems
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {solutionSteps.map((step, index) => (
                    <div
                      key={`step-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="text-4xl mb-2">{step.icon}</div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 text-xs">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Considerations */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Real-World Considerations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {considerations.map((item, index) => (
                    <div
                      key={`consideration-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border-l-4 border-blue-600 transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
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
                  Best Practices for Public Resource Allocation
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

          {activeTab === 'solution' && (
            <>
              {/* Problem Statement */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  {problemData.title} - Solution
                </h3>
                <div className="text-center mb-6">
                  <p className="text-gray-600 dark:text-gray-400">{problemData.scenario}</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Problem Formulation */}
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Problem Formulation</h4>
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                        {problemData.objective}
                      </p>
                      <ul className="list-disc list-inside text-sm font-mono text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                        {problemData.constraints.map((constraint, idx) => (
                          <li key={`sol-constraint-${idx}`}>{constraint}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                      <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Variables</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        {problemData.variables.map((varItem, idx) => (
                          <li key={`sol-var-${idx}`}>{varItem}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Graph Visualization */}
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
                      <line x1="50" y1="380" x2="450" y2="100" stroke="#FF6B6B" strokeWidth="2"/>
                      <text x="400" y="95" fontSize="9" fill="#FF6B6B" className="dark:fill-red-400">5x+4y=100</text>
                      
                      <line x1="50" y1="400" x2="450" y2="400" stroke="#4ECDC4" strokeWidth="2" strokeDasharray="4,4"/>
                      <text x="200" y="415" fontSize="9" fill="#4ECDC4" className="dark:fill-green-400">x=6</text>
                      
                      <line x1="50" y1="50" x2="50" y2="400" stroke="#FFE66D" strokeWidth="2" strokeDasharray="4,4"/>
                      <text x="30" y="220" fontSize="9" fill="#FFE66D" className="dark:fill-yellow-400">y=4</text>
                      
                      <line x1="50" y1="400" x2="450" y2="400" stroke="#A8E6CF" strokeWidth="2" strokeDasharray="4,4"/>
                      <text x="370" y="415" fontSize="9" fill="#A8E6CF" className="dark:fill-green-300">x=14</text>
                      
                      <line x1="50" y1="50" x2="50" y2="400" stroke="#FF8A5C" strokeWidth="2" strokeDasharray="4,4"/>
                      <text x="55" y="55" fontSize="9" fill="#FF8A5C" className="dark:fill-orange-300">y=16</text>
                      
                      <line x1="50" y1="400" x2="450" y2="100" stroke="#FF6B6B" strokeWidth="2" strokeDasharray="4,4"/>
                      <text x="400" y="95" fontSize="9" fill="#FF6B6B" className="dark:fill-red-400">x+y=12</text>
                      
                      {/* Feasible region */}
                      <polygon points="50,400 50,350 300,150 350,100 350,400" fill="rgba(78, 205, 196, 0.1)" stroke="none"/>
                      
                      {/* Optimal point */}
                      <circle cx="250" cy="200" r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                        <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                      <text x="250" y="215" textAnchor="middle" fontSize="9" fill="#FF4757" className="dark:fill-red-400">(12, 10)</text>
                      
                      {/* Objective function */}
                      <line x1="80" y1="380" x2="400" y2="100" stroke="#FF8A5C" strokeWidth="1.5" strokeDasharray="6,3">
                        <animate attributeName="stroke-dashoffset" values="0;50" dur="3s" repeatCount="indefinite" />
                      </line>
                      <text x="400" y="95" fontSize="9" fill="#FF8A5C" className="dark:fill-orange-300">Z=12x+10y</text>
                      
                      {/* Legend */}
                      <g transform="translate(50, 10)">
                        <rect x="0" y="0" width="180" height="80" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                        <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                        <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="2"/>
                        <text x="35" y="34" fontSize="8" fill="#555" className="dark:fill-gray-400">Budget</text>
                        <line x1="10" y1="45" x2="30" y2="45" stroke="#4ECDC4" strokeWidth="2" strokeDasharray="4,4"/>
                        <text x="35" y="49" fontSize="8" fill="#555" className="dark:fill-gray-400">Minimum/Maximum</text>
                        <line x1="10" y1="60" x2="30" y2="60" stroke="#FF8A5C" strokeWidth="2" strokeDasharray="6,3"/>
                        <text x="35" y="64" fontSize="8" fill="#555" className="dark:fill-gray-400">Objective</text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Optimal Solution */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4 text-center">
                  Optimal Allocation
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Optimal Allocation</h4>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {problemData.optimalSolution.point}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Infrastructure Development: ₹12 crores
                      <br />
                      Social Welfare Programs: ₹10 crores
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Maximum Public Benefit</h4>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {problemData.optimalSolution.benefit}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Infrastructure: 12 × 12 = 144 benefit units
                      <br />
                      Social Welfare: 10 × 10 = 100 benefit units
                      <br />
                      Total: 244 benefit units
                    </p>
                  </div>
                </div>
              </div>

              {/* Resource Utilization */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Constraint Analysis at Optimal Solution
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Constraint</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Status</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Value</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Slack/Surplus</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {problemData.resourceUtilization.map((item, idx) => (
                        <tr key={`util-${idx}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                          <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{item.resource}</td>
                          <td className="px-4 py-2">
                            <span className={clsx(
                              "px-2 py-1 rounded text-xs font-medium",
                              item.utilization === '100%' ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" :
                              item.status === 'Satisfied' ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                              "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                            )}>
                              {item.utilization || item.status}
                            </span>
                          </td>
                          <td className="px-4 py-2 font-mono text-gray-700 dark:text-gray-300">{item.used}</td>
                          <td className="px-4 py-2 font-mono text-gray-700 dark:text-gray-300">{item.slack}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Interpretation:</span> The budget is the binding constraint (100% utilization). 
                  All minimum requirements are met, and no maximum limits are exceeded. There is significant slack in the 
                  political balance constraint, indicating room for adjustment if needed.
                </div>
              </div>

              {/* Shadow Prices */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Shadow Prices (Marginal Values)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Budget</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Shadow Price: 2.4 benefit units per crore
                      <br />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Each additional crore of budget increases public benefit by 2.4 units</span>
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Other Constraints</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Shadow Price: 0 (not binding)
                      <br />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Minimum/maximum constraints are not binding at optimal</span>
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
                  Practice Problems - Public Resource Allocation
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Municipal Budget Allocation
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The Ichapur Municipal Corporation has a budget of ₹80 crores to allocate between Education (x) and Healthcare (y).
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 10x + 8y (Benefit units)
                      Subject to:
                      4x + 3y ≤ 80 (Budget)
                      x ≥ 5 (Minimum education)
                      y ≥ 4 (Minimum healthcare)
                      x + y ≥ 15 (Political balance)
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Find the optimal allocation of the budget.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => setShowSolution(!showSolution)}
                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300"
                      &gt;
                        {showSolution ? 'Hide Solution' : 'Check Solution'}
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                    {showSolution && (
                      <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-semibold">Solution:</span> Optimal at (11, 12) with Z = 10(11) + 8(12) = 110 + 96 = 206 benefit units.
                          <br />
                          Education: ₹11 crores, Healthcare: ₹12 crores.
                          <br />
                          Budget: 4(11) + 3(12) = 44 + 36 = 80 (fully utilized).
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Regional Development Fund
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The Jadavpur Development Authority must allocate ₹50 crores between Urban Development (x) and Rural Development (y).
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 15x + 12y (Benefit units)
                      Subject to:
                      5x + 4y ≤ 50 (Budget)
                      x ≥ 3 (Urban minimum)
                      y ≥ 5 (Rural minimum)
                      x ≤ 8 (Urban maximum)
                      y ≤ 10 (Rural maximum)
                      x + y ≥ 12 (Regional balance)
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Determine the optimal allocation and identify the bottleneck.
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
                      <span className="font-semibold">Hint:</span> Graph the constraints and evaluate corner points. The budget constraint is likely binding.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Real-World Application
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The Kolkata Municipal Corporation must allocate ₹120 crores across four sectors. However, for this problem, we'll focus on two primary sectors:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 ml-4">
                      <li>Public Transportation (x): Benefit 18 units/crore</li>
                      <li>Sanitation (y): Benefit 14 units/crore</li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Constraints: Budget, minimum requirements, and political balance.
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 18x + 14y
                      6x + 5y ≤ 120 (Budget)
                      x ≥ 8 (Transportation minimum)
                      y ≥ 6 (Sanitation minimum)
                      x ≤ 15 (Transportation maximum)
                      y ≤ 18 (Sanitation maximum)
                      x + y ≥ 20 (Political balance)
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Find the optimal allocation and explain why public transportation has a higher shadow price.
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
                      <span className="font-semibold">Hint:</span> Compare the benefit per crore for each sector and check which constraints are binding.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Public Resource Allocation Problems
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Consider multiple objectives:</span> Public benefit often includes economic, social, and political factors</li>
                  <li><span className="font-medium">Include all constraints:</span> Budget, minimums, maximums, and political requirements</li>
                  <li><span className="font-medium">Identify bottlenecks:</span> Binding constraints indicate resource limitations</li>
                  <li><span className="font-medium">Evaluate equity:</span> Ensure fair distribution across regions and population groups</li>
                  <li><span className="font-medium">Plan for flexibility:</span> Public needs change; build flexibility into allocations</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Public Resource Allocation FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Public Resource Allocation Problem"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic78_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Public resource allocation is one of the most impactful applications of LP. I've used these models in municipal planning, where the challenge is balancing competing demands with limited resources. The key insight is that public resource allocation isn't just about financial efficiency - it's about maximizing social welfare. Students often find this application meaningful because it shows how mathematics can help address real societal challenges. I encourage them to think about the ethical dimensions: how do we ensure equity? How do we balance urban and rural needs? These are questions that go beyond the mathematical model but are essential for responsible public administration." />
        </div>
      </div>
    </div>
  );
};

export default Topic78;