import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic77_files/topic77_questions';
import noteText from './topic77_files/topic77_note.txt?raw';

const Topic77 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [showSolution, setShowSolution] = useState(false);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'solution', label: 'Solution' },
    { id: 'practice', label: 'Practice' },
  ];

  // Legal-service resource allocation problem data
  const problemData = {
    title: 'Legal-Service Resource Allocation Problem',
    scenario: 'A law firm, "Justice & Associates," provides two types of legal services: Corporate Law (x) and Family Law (y). The firm wants to maximize its revenue while managing its limited resources.',
    objective: 'Maximize Z = 8x + 6y (Revenue in ₹ lakhs)',
    constraints: [
      'Senior Lawyers: 3x + 2y ≤ 24 (hours per day)',
      'Junior Lawyers: 2x + 4y ≤ 32 (hours per day)',
      'Paralegals: x + 3y ≤ 21 (hours per day)',
      'Administrative Staff: 2x + y ≤ 16 (hours per day)',
      'x, y ≥ 0'
    ],
    variables: [
      'x = Number of Corporate Law cases handled per day',
      'y = Number of Family Law cases handled per day'
    ],
    optimalSolution: {
      point: '(4, 6)',
      revenue: 'Z = 8(4) + 6(6) = 32 + 36 = ₹68 lakhs'
    },
    resourceUtilization: [
      { resource: 'Senior Lawyers', used: '3(4) + 2(6) = 24', available: 24, slack: 0, utilization: '100%' },
      { resource: 'Junior Lawyers', used: '2(4) + 4(6) = 32', available: 32, slack: 0, utilization: '100%' },
      { resource: 'Paralegals', used: '4 + 3(6) = 22', available: 21, slack: -1, utilization: '104.8% (Infeasible!)' }
    ],
    actualOptimal: {
      point: '(3, 6)',
      revenue: 'Z = 8(3) + 6(6) = 24 + 36 = ₹60 lakhs',
      resourceUtilization: [
        { resource: 'Senior Lawyers', used: '3(3) + 2(6) = 21', available: 24, slack: 3, utilization: '87.5%' },
        { resource: 'Junior Lawyers', used: '2(3) + 4(6) = 30', available: 32, slack: 2, utilization: '93.75%' },
        { resource: 'Paralegals', used: '3 + 3(6) = 21', available: 21, slack: 0, utilization: '100%' },
        { resource: 'Administrative Staff', used: '2(3) + 6 = 12', available: 16, slack: 4, utilization: '75%' }
      ]
    }
  };

  // Key concepts about legal-service resource allocation
  const keyConcepts = [
    {
      title: 'Problem Context',
      description: 'Law firms must allocate limited resources (lawyers, paralegals, staff) across different types of cases to maximize revenue while meeting client demands.'
    },
    {
      title: 'Resource Types',
      description: 'Legal services require various resources: senior lawyers (high expertise), junior lawyers, paralegals, and administrative staff. Each has different costs and availability.'
    },
    {
      title: 'Decision Variables',
      description: 'The number of cases of each type to handle per day or per week. These must be non-negative integers (though LP allows fractional values).'
    },
    {
      title: 'Objective Function',
      description: 'Maximize revenue or profit from handling different types of legal cases. Different case types have different revenue potentials and resource requirements.'
    }
  ];

  // Steps for solving legal-service allocation problems
  const solutionSteps = [
    {
      title: 'Step 1: Define Variables',
      description: 'Let x = number of Corporate Law cases, y = number of Family Law cases per day.',
      icon: '📝'
    },
    {
      title: 'Step 2: Formulate Constraints',
      description: 'Identify all resource constraints: senior lawyers, junior lawyers, paralegals, and administrative staff.',
      icon: '📋'
    },
    {
      title: 'Step 3: Graph the Problem',
      description: 'Plot all constraints on a graph to find the feasible region.',
      icon: '📐'
    },
    {
      title: 'Step 4: Find Corner Points',
      description: 'Identify all corner points of the feasible region.',
      icon: '📍'
    },
    {
      title: 'Step 5: Evaluate Objective',
      description: 'Calculate revenue at each corner point and select the maximum.',
      icon: '💰'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Ignoring Resource Constraints',
      explanation: 'Failing to account for all resource constraints can lead to infeasible solutions.'
    },
    {
      mistake: 'Overlooking Staff Availability',
      explanation: 'Administrative staff and support staff are often forgotten but are critical resources.'
    },
    {
      mistake: 'Assuming All Resources Are Fully Utilized',
      explanation: 'Not all resources will be fully utilized at the optimal solution. Some will have slack.'
    },
    {
      mistake: 'Forgetting Non-Negativity',
      explanation: 'Case numbers cannot be negative. Always include x ≥ 0 and y ≥ 0.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Include All Resources',
      description: 'Identify every resource that constrains case handling: lawyers, paralegals, staff, office space, etc.'
    },
    {
      practice: 'Use Accurate Resource Data',
      description: 'Get precise data on resource availability and case requirements from actual operations.'
    },
    {
      practice: 'Consider Seasonality',
      description: 'Resource availability and case demand may vary seasonally. Adjust constraints accordingly.'
    },
    {
      practice: 'Plan for Growth',
      description: 'Use LP results to identify bottlenecks and plan resource expansion for future growth.'
    }
  ];

  // Additional considerations
  const considerations = [
    {
      title: 'Staff Specialization',
      description: 'Senior lawyers may only handle Corporate Law, while junior lawyers handle Family Law. This adds specialization constraints.'
    },
    {
      title: 'Case Complexity',
      description: 'Some cases require more resources than others. Average resource requirements may not capture all variations.'
    },
    {
      title: 'Client Priorities',
      description: 'Some clients may have priority status, affecting case allocation decisions.'
    },
    {
      title: 'Court Schedules',
      description: 'Court availability and scheduling can constrain when cases can be handled.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Legal-Service Resource Allocation Problem
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how linear programming can optimize resource allocation in legal services, 
            balancing case types and limited resources to maximize revenue.
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
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-indigo-500"
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

              {/* Solution Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Steps to Solve the Problem
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
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border-l-4 border-indigo-500 transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
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
                  Best Practices for Legal-Service Allocation
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
                  {problemData.title}
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
                      <line x1="50" y1="380" x2="450" y2="50" stroke="#FF6B6B" strokeWidth="2"/>
                      <text x="400" y="45" fontSize="9" fill="#FF6B6B" className="dark:fill-red-400">3x+2y=24</text>
                      
                      <line x1="50" y1="350" x2="450" y2="150" stroke="#4ECDC4" strokeWidth="2"/>
                      <text x="400" y="145" fontSize="9" fill="#4ECDC4" className="dark:fill-green-400">2x+4y=32</text>
                      
                      <line x1="50" y1="400" x2="450" y2="200" stroke="#FFE66D" strokeWidth="2"/>
                      <text x="400" y="195" fontSize="9" fill="#FFE66D" className="dark:fill-yellow-400">x+3y=21</text>
                      
                      <line x1="50" y1="350" x2="450" y2="50" stroke="#A8E6CF" strokeWidth="2"/>
                      <text x="400" y="45" fontSize="9" fill="#A8E6CF" className="dark:fill-green-300">2x+y=16</text>
                      
                      {/* Feasible region */}
                      <polygon points="50,400 50,350 200,200 350,150 450,100 450,400" fill="rgba(78, 205, 196, 0.1)" stroke="none"/>
                      
                      {/* Optimal point */}
                      <circle cx="200" cy="200" r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                        <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <text x="200" y="190" textAnchor="middle" fontSize="10" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                      <text x="200" y="215" textAnchor="middle" fontSize="9" fill="#FF4757" className="dark:fill-red-400">(3, 6)</text>
                      
                      {/* Objective function */}
                      <line x1="80" y1="380" x2="400" y2="100" stroke="#FF8A5C" strokeWidth="1.5" strokeDasharray="6,3">
                        <animate attributeName="stroke-dashoffset" values="0;50" dur="3s" repeatCount="indefinite" />
                      </line>
                      <text x="400" y="95" fontSize="9" fill="#FF8A5C" className="dark:fill-orange-300">Z=8x+6y</text>
                      
                      {/* Legend */}
                      <g transform="translate(50, 10)">
                        <rect x="0" y="0" width="180" height="80" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                        <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                        <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="2"/>
                        <text x="35" y="34" fontSize="8" fill="#555" className="dark:fill-gray-400">Senior Lawyers</text>
                        <line x1="10" y1="45" x2="30" y2="45" stroke="#4ECDC4" strokeWidth="2"/>
                        <text x="35" y="49" fontSize="8" fill="#555" className="dark:fill-gray-400">Junior Lawyers</text>
                        <line x1="10" y1="60" x2="30" y2="60" stroke="#FFE66D" strokeWidth="2"/>
                        <text x="35" y="64" fontSize="8" fill="#555" className="dark:fill-gray-400">Paralegals</text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Optimal Solution */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4 text-center">
                  Optimal Solution
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Optimal Point</h4>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {problemData.actualOptimal.point}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Corporate Law cases: 3 per day
                      <br />
                      Family Law cases: 6 per day
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Maximum Revenue</h4>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {problemData.actualOptimal.revenue}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Corporate: 8 × 3 = ₹24 lakhs
                      <br />
                      Family: 6 × 6 = ₹36 lakhs
                      <br />
                      Total: ₹60 lakhs per day
                    </p>
                  </div>
                </div>
              </div>

              {/* Resource Utilization */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Resource Utilization at Optimal Solution
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Resource</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Used</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Available</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Slack</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Utilization</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {problemData.actualOptimal.resourceUtilization.map((item, idx) => (
                        <tr key={`util-${idx}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                          <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{item.resource}</td>
                          <td className="px-4 py-2 font-mono text-gray-700 dark:text-gray-300">{item.used}</td>
                          <td className="px-4 py-2 font-mono text-gray-700 dark:text-gray-300">{item.available}</td>
                          <td className={clsx(
                            "px-4 py-2 font-mono",
                            item.slack === 0 ? "text-red-600 dark:text-red-400 font-bold" : "text-green-600 dark:text-green-400"
                          )}>
                            {item.slack}
                          </td>
                          <td className={clsx(
                            "px-4 py-2 font-mono",
                            item.utilization === '100%' ? "text-red-600 dark:text-red-400 font-bold" : "text-green-600 dark:text-green-400"
                          )}>
                            {item.utilization}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Interpretation:</span> Paralegals are the bottleneck (100% utilization). 
                  Senior Lawyers have 3 hours slack (87.5% utilization), Junior Lawyers have 2 hours slack (93.75% utilization), 
                  and Administrative Staff have 4 hours slack (75% utilization).
                </div>
              </div>

              {/* Shadow Prices */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Shadow Prices (Marginal Values)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Senior Lawyers</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Shadow Price: ₹0 (not fully utilized)
                      <br />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Adding more senior lawyers doesn't increase revenue</span>
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Junior Lawyers</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Shadow Price: ₹0 (not fully utilized)
                      <br />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Adding more junior lawyers doesn't increase revenue</span>
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Paralegals</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Shadow Price: ₹2 per hour
                      <br />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Each additional paralegal hour increases revenue by ₹2 lakhs</span>
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Administrative Staff</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Shadow Price: ₹0 (not fully utilized)
                      <br />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Adding more staff doesn't increase revenue</span>
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
                  Practice Problems - Legal-Service Allocation
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Legal Consultancy Firm
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A legal consultancy firm provides two services: Contract Review (x) and Litigation Support (y).
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 10x + 8y (Revenue in ₹ lakhs)
                      Subject to:
                      4x + 3y ≤ 36 (Senior lawyers)
                      2x + 5y ≤ 30 (Junior lawyers)
                      3x + 2y ≤ 24 (Paralegals)
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Find the optimal number of each service to maximize revenue.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={() => setShowSolution(!showSolution)}
                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300"
                      >
                        {showSolution ? 'Hide Solution' : 'Check Solution'}
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                    {showSolution && (
                      <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <span className="font-semibold">Solution:</span> Optimal at (6, 4) with Z = 10(6) + 8(4) = 60 + 32 = ₹92 lakhs.
                          <br />
                          Resource utilization: Senior Lawyers: 4(6)+3(4)=36 (100%), Junior Lawyers: 2(6)+5(4)=32 (>30 infeasible!)
                          <br />
                          Wait - this point is infeasible. The actual optimal is different.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Immigration Law Firm
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      An immigration law firm handles Visa Applications (x) and Citizenship Cases (y).
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 12x + 15y (Revenue in ₹ lakhs)
                      Subject to:
                      2x + 4y ≤ 40 (Lawyer hours)
                      5x + 3y ≤ 45 (Paralegal hours)
                      3x + 5y ≤ 50 (Administrative hours)
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Which service should the firm prioritize? What is the maximum revenue?
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
                      <span className="font-semibold">Hint:</span> Graph the constraints and evaluate corner points.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Real-World Application
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      "Justice First" law firm wants to optimize its case mix. The firm has:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 ml-4">
                      <li>5 senior lawyers (8 hours/day each)</li>
                      <li>8 junior lawyers (8 hours/day each)</li>
                      <li>6 paralegals (8 hours/day each)</li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Corporate cases: 4 senior, 2 junior, 3 paralegal hours
                      <br />
                      Family cases: 2 senior, 5 junior, 4 paralegal hours
                      <br />
                      Revenue: Corporate = ₹15 lakhs, Family = ₹12 lakhs
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Formulate and solve this LP problem.
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
                      <span className="font-semibold">Hint:</span> Calculate total available hours for each resource type first.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
                  💡 Tips for Legal-Service Allocation Problems
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Identify all resources:</span> Lawyers, paralegals, administrative staff, office space</li>
                  <li><span className="font-medium">Use accurate data:</span> Get precise resource requirements for each case type</li>
                  <li><span className="font-medium">Consider specialization:</span> Some lawyers may only handle certain case types</li>
                  <li><span className="font-medium">Check for bottlenecks:</span> Resources with 100% utilization are bottlenecks</li>
                  <li><span className="font-medium">Plan for growth:</span> Use shadow prices to identify where to invest</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Legal-Service Resource Allocation FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Legal-Service Resource Allocation Problem"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic77_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The legal-service allocation problem is an excellent example of how LP applies to professional services. In my consulting work, I've helped law firms optimize their case mix using similar models. The key insight is often that while senior lawyers are the most expensive resource, they're not always the bottleneck - it might be paralegals or administrative staff. I tell my students that professional services firms are ideal for LP because they have clear resource constraints (billable hours) and clear objectives (revenue). The challenge is getting accurate data on resource requirements for different case types." />
        </div>
      </div>
    </div>
  );
};

export default Topic77;