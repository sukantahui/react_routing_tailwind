import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic79_files/topic79_questions';
import noteText from './topic79_files/topic79_note.txt?raw';

const Topic79 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [showSolution, setShowSolution] = useState(false);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'solution', label: 'Solution' },
    { id: 'practice', label: 'Practice' },
  ];

  // Social-resource optimization problem data
  const problemData = {
    title: 'Social-Resource Optimization Problem',
    scenario: 'The Kolkata Social Welfare Department has ₹60 crores to allocate across three social programs: Education (x), Healthcare (y), and Housing (z). Each program has different social impact scores and resource requirements. The goal is to maximize total social impact while meeting various constraints.',
    objective: 'Maximize Z = 15x + 12y + 10z (Social Impact Points)',
    constraints: [
      'Budget: 3x + 4y + 2z ≤ 60 (crores)',
      'Education Minimum: x ≥ 4 (crores)',
      'Healthcare Minimum: y ≥ 3 (crores)',
      'Housing Minimum: z ≥ 2 (crores)',
      'Education Maximum: x ≤ 12 (crores)',
      'Healthcare Maximum: y ≤ 15 (crores)',
      'Housing Maximum: z ≤ 10 (crores)',
      'Program Balance: x + y + z ≥ 10 (crores)',
      'Education + Healthcare ≥ 8 (crores)',
      'x, y, z ≥ 0'
    ],
    variables: [
      'x = Allocation to Education (in crores)',
      'y = Allocation to Healthcare (in crores)',
      'z = Allocation to Housing (in crores)'
    ],
    optimalSolution: {
      point: '(8, 6, 4)',
      impact: 'Z = 15(8) + 12(6) + 10(4) = 120 + 72 + 40 = 232 Social Impact Points'
    },
    resourceUtilization: [
      { resource: 'Budget', used: '3(8) + 4(6) + 2(4) = 24 + 24 + 8 = 56', available: 60, slack: 4, utilization: '93.3%' },
      { resource: 'Education Min', used: '8 ≥ 4', status: 'Satisfied', slack: 4 },
      { resource: 'Healthcare Min', used: '6 ≥ 3', status: 'Satisfied', slack: 3 },
      { resource: 'Housing Min', used: '4 ≥ 2', status: 'Satisfied', slack: 2 },
      { resource: 'Education Max', used: '8 ≤ 12', status: 'Satisfied', slack: 4 },
      { resource: 'Healthcare Max', used: '6 ≤ 15', status: 'Satisfied', slack: 9 },
      { resource: 'Housing Max', used: '4 ≤ 10', status: 'Satisfied', slack: 6 },
      { resource: 'Program Balance', used: '8 + 6 + 4 = 18 ≥ 10', status: 'Satisfied', slack: 8 },
      { resource: 'Education + Healthcare', used: '8 + 6 = 14 ≥ 8', status: 'Satisfied', slack: 6 }
    ],
    shadowPrices: {
      'Budget': '2.5 impact points per crore',
      'Education Min': '0 (not binding)',
      'Healthcare Min': '0 (not binding)',
      'Housing Min': '0 (not binding)',
      'Other Constraints': '0'
    }
  };

  // Key concepts about social-resource optimization
  const keyConcepts = [
    {
      title: 'Social Impact Measurement',
      description: 'Social impact is measured using impact points that quantify the social value of each program. Different programs have different impact scores based on their effectiveness.'
    },
    {
      title: 'Multiple Program Allocation',
      description: 'Social resources must be allocated across multiple programs (education, healthcare, housing) to maximize overall social impact.'
    },
    {
      title: 'Equity and Fairness',
      description: 'Social-resource optimization must consider equity - ensuring that all programs receive adequate funding and that vulnerable populations are served.'
    },
    {
      title: 'Capacity Constraints',
      description: 'Each social program has capacity constraints - the ability to effectively use additional funding without diminishing returns.'
    }
  ];

  // Types of social programs
  const programTypes = [
    {
      type: 'Education',
      description: 'Funding for schools, scholarships, teacher training, educational infrastructure, and literacy programs.',
      impact: 'High (15 points/crore)',
      example: 'School construction, teacher salaries, educational materials'
    },
    {
      type: 'Healthcare',
      description: 'Funding for hospitals, clinics, health worker training, disease prevention, and health awareness.',
      impact: 'Medium-High (12 points/crore)',
      example: 'Hospital equipment, vaccination programs, health camps'
    },
    {
      type: 'Housing',
      description: 'Funding for affordable housing, slum rehabilitation, homelessness prevention, and housing infrastructure.',
      impact: 'Medium (10 points/crore)',
      example: 'Affordable housing projects, rent subsidies, slum improvement'
    },
    {
      type: 'Nutrition',
      description: 'Funding for food programs, malnutrition prevention, and nutritional awareness.',
      impact: 'High (14 points/crore)',
      example: 'Mid-day meal programs, nutrition supplements, food banks'
    }
  ];

  // Steps for solving social-resource optimization problems
  const solutionSteps = [
    {
      title: 'Step 1: Define Programs',
      description: 'Identify all social programs and their impact scores.',
      icon: '📝'
    },
    {
      title: 'Step 2: Formulate Constraints',
      description: 'Include budget, minimums, maximums, and program balance constraints.',
      icon: '📋'
    },
    {
      title: 'Step 3: Define Objective',
      description: 'Maximize total social impact points.',
      icon: '🎯'
    },
    {
      title: 'Step 4: Solve the LP',
      description: 'Use graphical or simplex method to find optimal allocation.',
      icon: '📐'
    },
    {
      title: 'Step 5: Interpret Results',
      description: 'Analyze allocation, identify bottlenecks, and recommend adjustments.',
      icon: '💡'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Ignoring Equity Considerations',
      explanation: 'Social-resource optimization must consider equity, not just efficiency. Vulnerable populations may need additional support.'
    },
    {
      mistake: 'Overlooking Capacity Constraints',
      explanation: 'Programs may have limited capacity to absorb additional funding without diminishing returns.'
    },
    {
      mistake: 'Using Only Financial Metrics',
      explanation: 'Social impact cannot be measured by financial metrics alone. Social and qualitative factors must be included.'
    },
    {
      mistake: 'Neglecting Program Synergies',
      explanation: 'Programs often have synergies - education and health programs complement each other.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Measure Social Impact',
      description: 'Use evidence-based impact scores for each program. Involve stakeholders in determining impact metrics.'
    },
    {
      practice: 'Consider Equity',
      description: 'Ensure that allocations reach vulnerable populations and reduce inequality.'
    },
    {
      practice: 'Build Flexibility',
      description: 'Include flexibility in allocations to respond to changing social needs.'
    },
    {
      practice: 'Monitor and Evaluate',
      description: 'Regularly monitor outcomes and adjust allocations based on program effectiveness.'
    }
  ];

  // Additional considerations
  const considerations = [
    {
      title: 'Vulnerable Populations',
      description: 'Children, elderly, disabled, and low-income groups often need targeted social programs.'
    },
    {
      title: 'Program Synergies',
      description: 'Education and healthcare programs can reinforce each other. Holistic approaches often yield better outcomes.'
    },
    {
      title: 'Community Participation',
      description: 'Involving communities in planning improves program relevance and effectiveness.'
    },
    {
      title: 'Sustainability',
      description: 'Programs should be designed for long-term sustainability, not just short-term impact.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Social-Resource Optimization Problem
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how linear programming can optimize the allocation of social resources 
            across multiple programs to maximize social impact and address community needs.
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
                        Social Impact Points measure program effectiveness
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
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-teal-600"
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

              {/* Program Types */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Types of Social Programs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {programTypes.map((program, index) => (
                    <div
                      key={`program-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">
                        {program.type}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                        {program.description}
                      </p>
                      <div className="text-xs font-bold text-green-600 dark:text-green-400">
                        {program.impact}
                      </div>
                      <code className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300 mt-1 block">
                        {program.example}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Steps to Solve Social-Resource Optimization
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
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border-l-4 border-teal-600 transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">
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
                  Best Practices for Social-Resource Optimization
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

                  {/* Graph Visualization - 3D problem represented in 2D */}
                  <div className="flex justify-center items-center">
                    <div className="text-center">
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
                        
                        {/* Constraint lines (simplified for 3-variable problem) */}
                        <line x1="50" y1="380" x2="450" y2="50" stroke="#FF6B6B" strokeWidth="2"/>
                        <text x="400" y="45" fontSize="9" fill="#FF6B6B" className="dark:fill-red-400">Budget</text>
                        
                        {/* Feasible region */}
                        <polygon points="50,400 50,350 200,200 350,100 400,150 350,400" fill="rgba(78, 205, 196, 0.1)" stroke="none"/>
                        
                        {/* Optimal point */}
                        <circle cx="250" cy="220" r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                          <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <text x="250" y="210" textAnchor="middle" fontSize="10" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                        <text x="250" y="235" textAnchor="middle" fontSize="9" fill="#FF4757" className="dark:fill-red-400">(8, 6, 4)</text>
                        
                        {/* Objective function */}
                        <line x1="80" y1="380" x2="400" y2="100" stroke="#FF8A5C" strokeWidth="1.5" strokeDasharray="6,3">
                          <animate attributeName="stroke-dashoffset" values="0;50" dur="3s" repeatCount="indefinite" />
                        </line>
                        <text x="400" y="95" fontSize="9" fill="#FF8A5C" className="dark:fill-orange-300">Z=15x+12y+10z</text>
                        
                        {/* Legend */}
                        <g transform="translate(50, 10)">
                          <rect x="0" y="0" width="180" height="80" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                          <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                          <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="2"/>
                          <text x="35" y="34" fontSize="8" fill="#555" className="dark:fill-gray-400">Constraints</text>
                          <line x1="10" y1="50" x2="30" y2="50" stroke="#FF8A5C" strokeWidth="2" strokeDasharray="6,3"/>
                          <text x="35" y="54" fontSize="8" fill="#555" className="dark:fill-gray-400">Objective</text>
                          <circle cx="20" cy="68" r="5" fill="#FF4757"/>
                          <text x="35" y="72" fontSize="8" fill="#555" className="dark:fill-gray-400">Optimal</text>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Optimal Solution */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4 text-center">
                  Optimal Allocation
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Optimal Point</h4>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {problemData.optimalSolution.point}
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Allocation Details</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Education: ₹8 crores
                      <br />
                      Healthcare: ₹6 crores
                      <br />
                      Housing: ₹4 crores
                    </p>
                  </div>
                  
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Maximum Social Impact</h4>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {problemData.optimalSolution.impact}
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
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Slack</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {problemData.resourceUtilization.map((item, idx) => (
                        <tr key={`util-${idx}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                          <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{item.resource}</td>
                          <td className="px-4 py-2">
                            <span className={clsx(
                              "px-2 py-1 rounded text-xs font-medium",
                              item.utilization && item.utilization.includes('100%') ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400" :
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
                  <span className="font-semibold">Interpretation:</span> No constraints are binding at the optimal solution. 
                  The budget has a slack of ₹4 crores, meaning there is some flexibility in allocation.
                </div>
              </div>

              {/* Shadow Prices */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Shadow Prices (Marginal Values)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(problemData.shadowPrices).map(([key, value]) => (
                    <div
                      key={`shadow-${key}`}
                      className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500 transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">{key}</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold">Note:</span> Since the budget is not binding, its shadow price is 0. 
                  Additional budget would not increase social impact under the current allocation.
                </div>
              </div>
            </>
          )}

          {activeTab === 'practice' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Practice Problems - Social-Resource Optimization
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Three-Program Social Allocation
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The Jadavpur Social Welfare Board has ₹50 crores to allocate across three programs:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 10x + 8y + 6z (Social Impact Points)
                      Subject to:
                      2x + 3y + z ≤ 50 (Budget)
                      x ≥ 3 (Education minimum)
                      y ≥ 2 (Healthcare minimum)
                      z ≥ 1 (Housing minimum)
                      x + y + z ≥ 8 (Program balance)
                      x, y, z ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Find the optimal allocation of the budget.
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
                          <span className="font-semibold">Solution:</span> Optimal at (5, 4, 3) with Z = 10(5) + 8(4) + 6(3) = 50 + 32 + 18 = 100 Social Impact Points.
                          <br />
                          Education: ₹5 crores, Healthcare: ₹4 crores, Housing: ₹3 crores.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Nutrition Program Inclusion
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The Kolkata Social Services Department adds a Nutrition program (w) to the allocation:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 15x + 12y + 10z + 14w (Social Impact Points)
                      Subject to:
                      3x + 4y + 2z + 3w ≤ 70 (Budget)
                      x ≥ 5, y ≥ 3, z ≥ 2, w ≥ 2 (Minimums)
                      x + y + z + w ≥ 15 (Program balance)
                      x, y, z, w ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Determine the optimal allocation and identify which program has the highest priority.
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
                      <span className="font-semibold">Hint:</span> Compare the benefit per crore for each program.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Real-World Application
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The Barrackpore Social Welfare Department must allocate ₹80 crores across four programs:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 mb-3 ml-4">
                      <li>Education (x): 16 impact points/crore</li>
                      <li>Healthcare (y): 14 impact points/crore</li>
                      <li>Housing (z): 11 impact points/crore</li>
                      <li>Skill Development (w): 13 impact points/crore</li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Constraints: Budget, minimums, and program balance.
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 16x + 14y + 11z + 13w
                      3x + 4y + 2z + 5w ≤ 80
                      x ≥ 6, y ≥ 5, z ≥ 3, w ≥ 4
                      x + y + z + w ≥ 20
                      x, y, z, w ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Find the optimal allocation and explain the strategic priorities.
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
                      <span className="font-semibold">Hint:</span> Calculate the benefit per crore for each program and check which constraints are binding.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6 border border-teal-200 dark:border-teal-800">
                <h4 className="font-semibold text-teal-700 dark:text-teal-400 mb-2">
                  💡 Tips for Social-Resource Optimization Problems
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Measure social impact:</span> Use evidence-based impact scores for each program</li>
                  <li><span className="font-medium">Consider equity:</span> Ensure allocations reach vulnerable populations</li>
                  <li><span className="font-medium">Include all constraints:</span> Budget, minimums, maximums, and program balance</li>
                  <li><span className="font-medium">Identify synergies:</span> Some programs reinforce each other</li>
                  <li><span className="font-medium">Monitor outcomes:</span> Evaluate program effectiveness and adjust allocations</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Social-Resource Optimization FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Social-Resource Optimization Problem"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic79_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Social-resource optimization is a powerful application that shows students how LP can address real social challenges. I emphasize that this isn't just about numbers - it's about improving lives. Students should understand that social impact measurement is both an art and a science. The LP model provides a framework, but it must be informed by community needs, stakeholder input, and ethical considerations. In my experience, involving communities in the planning process leads to more effective and sustainable social programs." />
        </div>
      </div>
    </div>
  );
};

export default Topic79;