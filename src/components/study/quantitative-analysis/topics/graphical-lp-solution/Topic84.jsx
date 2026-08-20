import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic84_files/topic84_questions';
import noteText from './topic84_files/topic84_note.txt?raw';

const Topic84 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedAspect, setSelectedAspect] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Interpretation aspects
  const interpretationAspects = [
    {
      id: 1,
      title: 'Optimal Solution Interpretation',
      icon: '🎯',
      description: 'Understanding what the optimal solution means in the context of the original problem.',
      keyPoints: [
        'What do the optimal variable values represent?',
        'How does the optimal objective value translate to business outcomes?',
        'What decisions are implied by the solution?',
        'What assumptions underlie the solution?'
      ],
      example: 'In a production problem, x*=40 chairs and y*=60 tables means the company should produce 40 chairs and 60 tables daily for maximum profit of ₹62,000.'
    },
    {
      id: 2,
      title: 'Resource Utilization Analysis',
      icon: '📊',
      description: 'Understanding which resources are fully utilized and which have excess capacity.',
      keyPoints: [
        'Which resources are binding (slack = 0)?',
        'Which resources have slack (unused capacity)?',
        'What is the utilization percentage for each resource?',
        'How can slack resources be used?'
      ],
      example: 'Labor is fully utilized (binding), while Machine has 20 hours slack (unused capacity).'
    },
    {
      id: 3,
      title: 'Bottleneck Identification',
      icon: '🔴',
      description: 'Identifying constraints that limit the optimal solution and represent bottlenecks.',
      keyPoints: [
        'Which constraints are binding at the optimal solution?',
        'What resources are bottlenecks?',
        'How do bottlenecks limit performance?',
        'Where should expansion efforts focus?'
      ],
      example: 'Labor is the bottleneck - increasing labor hours would increase profit. Machine has excess capacity.'
    },
    {
      id: 4,
      title: 'Shadow Price Interpretation',
      icon: '💰',
      description: 'Understanding the value of additional resources and making investment decisions.',
      keyPoints: [
        'What is the shadow price of each binding constraint?',
        'How much would Z increase with one more unit of each resource?',
        'What is the maximum you should pay for additional resources?',
        'Which resources are most valuable to expand?'
      ],
      example: 'Shadow price of labor = ₹2/hour. Each additional labor hour adds ₹2 to profit. Pay up to ₹2/hour for extra labor.'
    },
    {
      id: 5,
      title: 'Sensitivity Interpretation',
      icon: '📈',
      description: 'Understanding how changes in parameters would affect the solution.',
      keyPoints: [
        'How much can coefficients change before the solution changes?',
        'How robust is the optimal solution?',
        'What changes would make the solution invalid?',
        'What is the allowable range for each parameter?'
      ],
      example: 'c₁ can vary between ₹4 and ₹8 without changing the optimal mix. The solution is robust to moderate price changes.'
    },
    {
      id: 6,
      title: 'Trade-off Analysis',
      icon: '⚖️',
      description: 'Understanding the trade-offs between different objectives and resources.',
      keyPoints: [
        'What trade-offs exist between resources?',
        'How does increasing one variable affect others?',
        'What is the opportunity cost of decisions?',
        'How to balance competing objectives?'
      ],
      example: 'Increasing chairs by 1 unit requires 3 more labor hours and 4 more machine hours, reducing table production capacity.'
    },
    {
      id: 7,
      title: 'Practical Decision Making',
      icon: '📋',
      description: 'Translating the mathematical solution into practical business decisions.',
      keyPoints: [
        'What actions should be taken based on the solution?',
        'How to communicate the solution to stakeholders?',
        'What implementation challenges exist?',
        'How to monitor and adjust the solution?'
      ],
      example: 'Recommendation: Produce 40 chairs and 60 tables. Monitor labor hours as they are the bottleneck. Consider hiring more workers if demand increases.'
    },
    {
      id: 8,
      title: 'Limitations and Assumptions',
      icon: '⚠️',
      description: 'Understanding the limitations of the LP model and the assumptions made.',
      keyPoints: [
        'What assumptions does the model make?',
        'What limitations exist in the model?',
        'What factors are not captured in the model?',
        'How to interpret results with these limitations in mind?'
      ],
      example: 'Model assumes linear relationships, constant prices, and perfect divisibility. Reality may have economies of scale, price discounts, and integer constraints.'
    }
  ];

  // Key concepts about interpretation
  const keyConcepts = [
    {
      title: 'Beyond the Numbers',
      description: 'Interpreting LP solutions means translating mathematical results into actionable business insights and decisions.'
    },
    {
      title: 'Context is Everything',
      description: 'The same mathematical solution can have very different meanings depending on the problem context.'
    },
    {
      title: 'Decision Support',
      description: 'LP solutions provide decision support, not definitive answers. They must be combined with managerial judgment.'
    },
    {
      title: 'Communication Skills',
      description: 'Being able to explain LP results to non-technical stakeholders is a critical skill.'
    }
  ];

  // Steps for interpreting LP solutions
  const interpretationSteps = [
    {
      title: 'Step 1: Understand the Variables',
      description: 'What do x* and y* represent in the real world? What decisions do they correspond to?',
      icon: '📝'
    },
    {
      title: 'Step 2: Interpret the Objective',
      description: 'What does Z* mean? What is the maximum profit, minimum cost, or optimal benefit?',
      icon: '💰'
    },
    {
      title: 'Step 3: Analyze Resource Utilization',
      description: 'Which resources are fully used? Which have slack? What are the utilization rates?',
      icon: '📊'
    },
    {
      title: 'Step 4: Identify Bottlenecks',
      description: 'Which constraints limit performance? Where should investments be made?',
      icon: '🔴'
    },
    {
      title: 'Step 5: Consider Sensitivity',
      description: 'How robust is the solution? What changes would affect it?',
      icon: '📈'
    },
    {
      title: 'Step 6: Make Recommendations',
      description: 'What actions should be taken? How should the solution be implemented?',
      icon: '📋'
    }
  ];

  // Common mistakes in interpretation
  const commonMistakes = [
    {
      mistake: 'Taking the Solution as Absolute',
      explanation: 'LP solutions are based on assumptions. Real-world conditions may differ. Use judgment, not blind acceptance.'
    },
    {
      mistake: 'Ignoring Non-Binding Constraints',
      explanation: 'Non-binding constraints with slack represent opportunities for growth or resource reallocation.'
    },
    {
      mistake: 'Misinterpreting Shadow Prices',
      explanation: 'Shadow prices apply only within the allowable range. Beyond that, they change or become invalid.'
    },
    {
      mistake: 'Forgetting the Human Element',
      explanation: 'LP solutions must consider human factors like employee morale, customer satisfaction, and organizational culture.'
    }
  ];

  // Best practices for interpretation
  const bestPractices = [
    {
      practice: 'Use Plain Language',
      description: 'Explain results in simple, business-friendly language. Avoid technical jargon when communicating with stakeholders.'
    },
    {
      practice: 'Provide Context',
      description: 'Frame the solution in the context of the problem. Explain what the numbers mean for the business.'
    },
    {
      practice: 'Include Caveats',
      description: 'Always mention assumptions, limitations, and the conditions under which the solution is valid.'
    },
    {
      practice: 'Make Actionable Recommendations',
      description: 'Don\'t just present results - provide clear, practical recommendations for action.'
    }
  ];

  // Visualization component for interpretation
  const InterpretationVisualization = ({ aspectIndex }) => {
    const aspect = interpretationAspects[aspectIndex];
    if (!aspect) return null;

    return (
      <div className="w-full max-w-4xl mx-auto my-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{aspect.icon}</span>
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {aspect.title}
            </h4>
          </div>
          
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
                <line x1="50" y1="380" x2="450" y2="80" stroke="#FF6B6B" strokeWidth="2"/>
                <text x="400" y="75" fontSize="9" fill="#FF6B6B" className="dark:fill-red-400">Constraint 1</text>
                
                <line x1="50" y1="350" x2="450" y2="150" stroke="#4ECDC4" strokeWidth="2"/>
                <text x="400" y="145" fontSize="9" fill="#4ECDC4" className="dark:fill-green-400">Constraint 2</text>
                
                {/* Feasible region */}
                <polygon points="50,400 50,350 200,200 350,150 400,150 450,400" fill="rgba(78, 205, 196, 0.1)" stroke="none"/>
                
                {/* Optimal point */}
                <circle cx="250" cy="220" r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                  <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="250" y="210" textAnchor="middle" fontSize="10" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                <text x="250" y="235" textAnchor="middle" fontSize="9" fill="#FF4757" className="dark:fill-red-400">(x*, y*)</text>
                
                {/* Aspect-specific visualization */}
                {aspectIndex === 0 && (
                  <g>
                    <text x="250" y="300" textAnchor="middle" fontSize="11" fill="#4ECDC4">x* = Number of Product A</text>
                    <text x="250" y="320" textAnchor="middle" fontSize="11" fill="#4ECDC4">y* = Number of Product B</text>
                    <text x="250" y="340" textAnchor="middle" fontSize="11" fill="#FF4757">Z* = Maximum Profit</text>
                  </g>
                )}
                {aspectIndex === 1 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="11" fill="#FFE66D">Resource Utilization</text>
                    <rect x="100" y="120" width="300" height="20" rx="10" fill="#e9ecef"/>
                    <rect x="100" y="120" width="300" height="20" rx="10" fill="#FF6B6B">
                      <animate attributeName="width" values="250;300;250" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <text x="250" y="134" textAnchor="middle" fontSize="9" fill="white">Constraint 1: 100% (Binding)</text>
                    
                    <rect x="100" y="160" width="300" height="20" rx="10" fill="#e9ecef"/>
                    <rect x="100" y="160" width="200" height="20" rx="10" fill="#4ECDC4">
                      <animate attributeName="width" values="180;220;180" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <text x="250" y="174" textAnchor="middle" fontSize="9" fill="white">Constraint 2: 75% (Slack)</text>
                    
                    <text x="250" y="210" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Binding constraints: fully utilized</text>
                    <text x="250" y="230" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Non-binding: slack available</text>
                  </g>
                )}
                {aspectIndex === 2 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#FF4757">⚠️ Bottleneck Identified</text>
                    <text x="250" y="130" textAnchor="middle" fontSize="11" fill="#FF6B6B">Constraint 1 is the Bottleneck</text>
                    <text x="250" y="155" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Fully utilized → Limits production</text>
                    <text x="250" y="180" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Expanding this resource increases Z</text>
                    <rect x="150" y="210" width="200" height="30" rx="15" fill="#FF6B6B" opacity="0.2"/>
                    <text x="250" y="230" textAnchor="middle" fontSize="10" fill="#FF6B6B">Focus investment here</text>
                  </g>
                )}
                {aspectIndex === 3 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#FFD93D">💰 Shadow Prices</text>
                    <text x="250" y="130" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">Constraint 1: ₹2.50/unit</text>
                    <text x="250" y="155" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">Constraint 2: ₹0 (not binding)</text>
                    <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#4ECDC4">Each extra unit of Resource 1</text>
                    <text x="250" y="210" textAnchor="middle" fontSize="10" fill="#4ECDC4">increases profit by ₹2.50</text>
                    <text x="250" y="240" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Pay up to ₹2.50/unit for more</text>
                  </g>
                )}
                {aspectIndex === 4 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#FFE66D">Sensitivity Analysis</text>
                    <text x="250" y="130" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">c₁ allowable range: [4, 8]</text>
                    <text x="250" y="150" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">c₂ allowable range: [3, 6]</text>
                    <text x="250" y="180" textAnchor="middle" fontSize="10" fill="#4ECDC4">Current solution remains optimal</text>
                    <text x="250" y="200" textAnchor="middle" fontSize="10" fill="#4ECDC4">within these ranges</text>
                    <text x="250" y="230" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Solution is robust to moderate changes</text>
                  </g>
                )}
                {aspectIndex === 5 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#FFE66D">⚖️ Trade-off Analysis</text>
                    <text x="250" y="130" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Increasing x by 1 unit:</text>
                    <text x="250" y="155" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">• Uses 3 more labor hours</text>
                    <text x="250" y="175" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">• Uses 4 more machine hours</text>
                    <text x="250" y="200" textAnchor="middle" fontSize="10" fill="#FF6B6B">• Reduces y production capacity</text>
                    <text x="250" y="230" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Opportunity cost of choosing x over y</text>
                  </g>
                )}
                {aspectIndex === 6 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#4ECDC4">📋 Decision Recommendations</text>
                    <text x="250" y="130" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">1. Produce {Math.round(200 + Math.random() * 100)} units of x</text>
                    <text x="250" y="155" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">2. Produce {Math.round(200 + Math.random() * 100)} units of y</text>
                    <text x="250" y="180" textAnchor="middle" fontSize="10" fill="#FF6B6B">3. Monitor labor hours (bottleneck)</text>
                    <text x="250" y="205" textAnchor="middle" fontSize="10" fill="#4ECDC4">4. Consider hiring if demand grows</text>
                    <text x="250" y="230" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Actionable plan for implementation</text>
                  </g>
                )}
                {aspectIndex === 7 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#FFE66D">⚠️ Limitations & Assumptions</text>
                    <text x="250" y="130" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">• Linear relationships assumed</text>
                    <text x="250" y="150" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">• Constant prices and costs</text>
                    <text x="250" y="170" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">• Perfect divisibility</text>
                    <text x="250" y="195" textAnchor="middle" fontSize="10" fill="#FF6B6B">• Human factors not captured</text>
                    <text x="250" y="220" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Use with managerial judgment</text>
                  </g>
                )}
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="180" height="60" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <circle cx="20" cy="40" r="5" fill="#FF4757"/>
                  <text x="35" y="44" fontSize="10" fill="#555" className="dark:fill-gray-400">Optimal Point</text>
                </g>
              </svg>
            </div>
            
            {/* Details Panel */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Description</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {aspect.description}
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Key Points</h5>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {aspect.keyPoints.map((point, idx) => (
                    <li key={`point-${idx}`}>{point}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Example</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  {aspect.example}
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
            Interpreting Graphical LP Solutions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to extract meaningful insights from graphical LP solutions and 
            translate mathematical results into practical business decisions.
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

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
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

              {/* Interpretation Aspects Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Interpretation Aspects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {interpretationAspects.map((aspect) => (
                    <div
                      key={`aspect-${aspect.id}`}
                      onClick={() => setSelectedAspect(aspect.id - 1)}
                      className={clsx(
                        "bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] text-center",
                        selectedAspect === aspect.id - 1 ? "border-2 border-blue-500" : ""
                      )}
                    >
                      <div className="text-4xl mb-2">{aspect.icon}</div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        {aspect.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interpretation Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Steps to Interpret LP Solutions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {interpretationSteps.map((step, index) => (
                    <div
                      key={`step-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="text-4xl mb-2">{step.icon}</div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 text-sm">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Mistakes */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
                  Common Mistakes in Interpretation
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
                  Best Practices for Interpretation
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
              {/* Aspect Selector */}
              <div className="flex flex-wrap gap-3 justify-center">
                {interpretationAspects.map((aspect) => (
                  <button
                    key={`aspect-btn-${aspect.id}`}
                    onClick={() => setSelectedAspect(aspect.id - 1)}
                    className={clsx(
                      "px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1",
                      selectedAspect === aspect.id - 1
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    <span>{aspect.icon}</span>
                    {aspect.id}
                  </button>
                ))}
              </div>

              {/* Aspect Visualization */}
              <InterpretationVisualization aspectIndex={selectedAspect} />

              {/* Aspect Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interpretationAspects.map((aspect, index) => (
                  index !== selectedAspect && (
                    <div
                      key={`aspect-summary-${index}`}
                      onClick={() => setSelectedAspect(index)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{aspect.icon}</span>
                        <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                          {aspect.title}
                        </h5>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {aspect.description}
                      </p>
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
                  Practice Problems - Interpretation
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Interpret the Solution
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company solved this LP problem and found the optimal solution:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 8x + 6y (Profit in ₹000)
                      Labor: 4x + 3y ≤ 48 hours (Binding, Shadow price = ₹2.25/hour)
                      Machine: 2x + 5y ≤ 40 hours (Slack: 4 hours)
                      Material: 3x + 2y ≤ 36 units (Slack: 2 units)
                      Optimal: (6, 4) with Z = 72
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Interpret this solution. What recommendations would you make to management?
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
                      <span className="font-semibold">Hint:</span> Consider resource utilization, bottlenecks, and shadow prices.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Make a Recommendation
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A factory has the following LP solution for production:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Product A: 100 units, Product B: 80 units
                      Labor: 240/250 hours used (96%)
                      Machine: 180/200 hours used (90%)
                      Material: 150/180 units used (83.3%)
                      Profit: ₹50,000
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Interpret the resource utilization and make recommendations for improvement.
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
                      <span className="font-semibold">Hint:</span> Identify the bottleneck and consider what could be done with excess capacity.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Full Interpretation
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A hospital solved this resource allocation problem:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 10x + 8y (Patient Satisfaction Score)
                      Doctors: 2x + 3y ≤ 40 hours (Binding)
                      Nurses: 4x + y ≤ 32 hours (Slack: 4 hours)
                      Rooms: x + 2y ≤ 24 (Slack: 2 rooms)
                      Optimal: (8, 4) with Z = 112
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Provide a complete interpretation including:
                      - What x and y represent
                      - Resource utilization
                      - Bottlenecks
                      - Recommendations
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
                      <span className="font-semibold">Hint:</span> Use all 8 interpretation aspects to provide a comprehensive analysis.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Interpretation */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Interpreting LP Solutions
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Start with the basics:</span> What do the variables and objective represent?</li>
                  <li><span className="font-medium">Analyze resource utilization:</span> Which resources are fully used? Which have slack?</li>
                  <li><span className="font-medium">Identify bottlenecks:</span> Binding constraints limit performance</li>
                  <li><span className="font-medium">Consider shadow prices:</span> What is the value of additional resources?</li>
                  <li><span className="font-medium">Think about sensitivity:</span> How robust is the solution?</li>
                  <li><span className="font-medium">Make actionable recommendations:</span> What should be done?</li>
                  <li><span className="font-medium">Acknowledge limitations:</span> What assumptions were made?</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Interpreting Graphical LP Solutions FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Interpreting Graphical LP Solutions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic84_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Interpretation is where LP becomes truly valuable. I tell my students that finding the optimal solution is only half the job - the other half is understanding what it means for the business. In my consulting work, I've seen brilliant mathematical solutions fail because they weren't properly interpreted or communicated. The best analysts don't just solve problems - they tell stories with data. They explain what the numbers mean in plain language and provide actionable recommendations. This is the skill that separates technical experts from trusted advisors." />
        </div>
      </div>
    </div>
  );
};

export default Topic84;