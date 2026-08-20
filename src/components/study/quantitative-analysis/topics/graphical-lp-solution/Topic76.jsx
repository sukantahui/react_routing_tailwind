import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic76_files/topic76_questions';
import noteText from './topic76_files/topic76_note.txt?raw';

const Topic76 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedResource, setSelectedResource] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Examples for resource availability interpretation
  const examples = [
    {
      title: 'Example 1: Manufacturing Resources',
      problem: 'A factory produces two products:\nMaximize Z = 5x + 3y\nSubject to:\n2x + y ≤ 10 (Labor hours)\nx + 2y ≤ 8 (Machine hours)\nx, y ≥ 0\nOptimal: (4, 2) with Z = 26',
      resources: [
        {
          name: 'Labor Hours',
          constraint: '2x + y ≤ 10',
          totalAvailable: 10,
          used: 10,
          slack: 0,
          utilization: '100%',
          interpretation: 'All labor hours are fully utilized. Labor is a bottleneck resource.'
        },
        {
          name: 'Machine Hours',
          constraint: 'x + 2y ≤ 8',
          totalAvailable: 8,
          used: 8,
          slack: 0,
          utilization: '100%',
          interpretation: 'All machine hours are fully utilized. Machine is also a bottleneck resource.'
        }
      ],
      summary: 'Both resources are fully utilized at the optimal solution. The company is operating at full capacity.'
    },
    {
      title: 'Example 2: Resources with Slack',
      problem: 'A company produces two products:\nMaximize Z = 4x + 6y\nSubject to:\n3x + 2y ≤ 18 (Resource A)\nx + 4y ≤ 16 (Resource B)\nx, y ≥ 0\nOptimal: (4, 3) with Z = 34',
      resources: [
        {
          name: 'Resource A',
          constraint: '3x + 2y ≤ 18',
          totalAvailable: 18,
          used: 18,
          slack: 0,
          utilization: '100%',
          interpretation: 'Resource A is fully utilized. It is a bottleneck.'
        },
        {
          name: 'Resource B',
          constraint: 'x + 4y ≤ 16',
          totalAvailable: 16,
          used: 16,
          slack: 0,
          utilization: '100%',
          interpretation: 'Resource B is also fully utilized. Both resources are bottlenecks.'
        }
      ],
      summary: 'Both resources are fully utilized. The optimal solution is at the intersection of both constraints.'
    },
    {
      title: 'Example 3: Significant Slack Resources',
      problem: 'A manufacturing plant:\nMaximize Z = 8x + 5y\nSubject to:\n4x + 2y ≤ 20 (Resource A)\n2x + 3y ≤ 15 (Resource B)\nx + 2y ≤ 10 (Resource C)\nx, y ≥ 0\nOptimal: (3, 3) with Z = 39',
      resources: [
        {
          name: 'Resource A',
          constraint: '4x + 2y ≤ 20',
          totalAvailable: 20,
          used: 18,
          slack: 2,
          utilization: '90%',
          interpretation: '2 units of Resource A remain unused. 90% utilization.'
        },
        {
          name: 'Resource B',
          constraint: '2x + 3y ≤ 15',
          totalAvailable: 15,
          used: 15,
          slack: 0,
          utilization: '100%',
          interpretation: 'Resource B is fully utilized. This is a bottleneck.'
        },
        {
          name: 'Resource C',
          constraint: 'x + 2y ≤ 10',
          totalAvailable: 10,
          used: 9,
          slack: 1,
          utilization: '90%',
          interpretation: '1 unit of Resource C remains unused. 90% utilization.'
        }
      ],
      summary: 'Resource B is the bottleneck. Resources A and C have slack and could be used for additional production.'
    },
    {
      title: 'Example 4: Real-World Resource Utilization',
      problem: 'A bakery produces bread and cakes:\nMaximize Z = 12x + 10y (Profit in ₹)\nSubject to:\n3x + 2y ≤ 36 (Flour kg)\n2x + 4y ≤ 40 (Sugar kg)\nx + 3y ≤ 30 (Eggs units)\nx, y ≥ 0\nOptimal: (8, 6) with Z = 156',
      resources: [
        {
          name: 'Flour',
          constraint: '3x + 2y ≤ 36',
          totalAvailable: 36,
          used: 36,
          slack: 0,
          utilization: '100%',
          interpretation: 'All flour is used. Flour is a bottleneck resource.'
        },
        {
          name: 'Sugar',
          constraint: '2x + 4y ≤ 40',
          totalAvailable: 40,
          used: 40,
          slack: 0,
          utilization: '100%',
          interpretation: 'All sugar is used. Sugar is also a bottleneck.'
        },
        {
          name: 'Eggs',
          constraint: 'x + 3y ≤ 30',
          totalAvailable: 30,
          used: 26,
          slack: 4,
          utilization: '86.7%',
          interpretation: '4 egg units remain unused. Not a bottleneck.'
        }
      ],
      summary: 'Flour and Sugar are bottlenecks. Eggs have slack and are not limiting production.'
    },
    {
      title: 'Example 5: Service Industry Resources',
      problem: 'A consulting firm allocates staff:\nMaximize Z = 15x + 12y (Revenue in ₹000)\nSubject to:\n5x + 3y ≤ 45 (Senior consultants)\n3x + 5y ≤ 40 (Junior consultants)\n2x + 4y ≤ 32 (Support staff)\nx, y ≥ 0\nOptimal: (6, 5) with Z = 150',
      resources: [
        {
          name: 'Senior Consultants',
          constraint: '5x + 3y ≤ 45',
          totalAvailable: 45,
          used: 45,
          slack: 0,
          utilization: '100%',
          interpretation: 'All senior consultants are fully utilized. This is a critical bottleneck.'
        },
        {
          name: 'Junior Consultants',
          constraint: '3x + 5y ≤ 40',
          totalAvailable: 40,
          used: 43,
          slack: -3,
          utilization: '107.5%',
          interpretation: 'This would exceed capacity! Let me recalculate...'
        }
      ],
      summary: 'At (6,5): Senior consultants: 5(6)+3(5)=45 (fully utilized). Junior consultants: 3(6)+5(5)=43 > 40 (infeasible!). The actual optimal is different.'
    }
  ];

  // Key concepts about resource availability
  const keyConcepts = [
    {
      title: 'Resource Availability',
      description: 'Resource availability refers to the maximum amount of a resource that can be used. In LP, this is represented by the RHS of constraints.'
    },
    {
      title: 'Resource Utilization',
      description: 'How much of the available resource is actually used at the optimal solution. This is calculated as LHS of the constraint at the optimal point.'
    },
    {
      title: 'Slack Resources',
      description: 'The difference between available and used resources. Slack = Available - Used. Positive slack means unused capacity.'
    },
    {
      title: 'Bottleneck Resources',
      description: 'Resources with zero slack that limit the optimal solution. These are binding constraints and have positive shadow prices.'
    }
  ];

  // Types of resource utilization
  const types = [
    {
      type: 'Fully Utilized',
      description: 'All available resource is used. Slack = 0. Resource is a bottleneck.',
      icon: '🔴'
    },
    {
      type: 'Partially Utilized',
      description: 'Some resource remains unused. Slack > 0. Resource has excess capacity.',
      icon: '🟡'
    },
    {
      type: 'Under-Utilized',
      description: 'Significant resource remains unused. Large slack. Resource is abundant.',
      icon: '🟢'
    },
    {
      type: 'Over-Utilized',
      description: 'Resource use exceeds availability. Not feasible in the original problem.',
      icon: '🚫'
    }
  ];

  // Steps to interpret resource availability
  const interpretationSteps = [
    {
      title: 'Step 1: Identify Resources',
      description: 'List all resources from the constraints.',
      icon: '📋'
    },
    {
      title: 'Step 2: Find Optimal Solution',
      description: 'Determine the optimal values of decision variables.',
      icon: '🎯'
    },
    {
      title: 'Step 3: Calculate Usage',
      description: 'Substitute optimal values into each constraint to find resource usage.',
      icon: '📊'
    },
    {
      title: 'Step 4: Calculate Slack',
      description: 'Slack = Available - Used for ≤ constraints.',
      icon: '📏'
    },
    {
      title: 'Step 5: Interpret Results',
      description: 'Identify bottlenecks, unused capacity, and resource utilization patterns.',
      icon: '💡'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Confusing Available with Used Resources',
      explanation: 'Available is the RHS; used is the LHS at the optimal point. They are different values unless the constraint is binding.'
    },
    {
      mistake: 'Ignoring Slack in Decision-Making',
      explanation: 'Slack represents unused capacity that could be utilized. Ignoring it misses opportunities.'
    },
    {
      mistake: 'Assuming All Constraints Are Binding',
      explanation: 'Not all constraints are binding. Many have slack and don\'t limit the solution.'
    },
    {
      mistake: 'Misinterpreting Utilization Percentage',
      explanation: 'Utilization = Used/Available × 100%. A resource with 80% utilization has 20% slack.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Calculate Usage at Optimal Point',
      description: 'Always substitute optimal values into all constraints to find actual resource usage.'
    },
    {
      practice: 'Identify Bottlenecks',
      description: 'Resources with zero slack are bottlenecks that limit production.'
    },
    {
      practice: 'Look for Unused Capacity',
      description: 'Resources with positive slack represent opportunities for additional production.'
    },
    {
      practice: 'Consider Shadow Prices',
      description: 'Resources with positive shadow prices are valuable and should be expanded first.'
    }
  ];

  // Visualization component for resource availability
  const ResourceAvailabilityVisualization = ({ exampleIndex, resourceIndex }) => {
    const example = examples[exampleIndex];
    if (!example) return null;

    const resource = example.resources[resourceIndex] || example.resources[0];

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
                {example.resources.map((res, idx) => {
                  const parts = res.constraint.split(/[≤≥]/);
                  const leftSide = parts[0].trim();
                  const rhs = parseFloat(parts[1].trim());
                  
                  let a = 1, b = 1;
                  const terms = leftSide.split(/\s*\+\s*/);
                  terms.forEach(term => {
                    if (term.includes('x')) {
                      a = term.trim() === 'x' ? 1 : parseFloat(term.replace('x', ''));
                    } else if (term.includes('y')) {
                      b = term.trim() === 'y' ? 1 : parseFloat(term.replace('y', ''));
                    }
                  });
                  
                  const xIntercept = rhs / a;
                  const yIntercept = rhs / b;
                  const x1 = 50 + (xIntercept * 40);
                  const y1 = 400;
                  const x2 = 50;
                  const y2 = 400 - (yIntercept * 37);
                  
                  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8A5C'];
                  const color = colors[idx % colors.length];
                  
                  return (
                    <g key={`constraint-${idx}`}>
                      <line 
                        x1={Math.min(Math.max(x1, 50), 450)} 
                        y1={Math.min(Math.max(y1, 30), 400)} 
                        x2={Math.min(Math.max(x2, 50), 450)} 
                        y2={Math.min(Math.max(y2, 30), 400)} 
                        stroke={color} 
                        strokeWidth={idx === resourceIndex ? 4 : 2}
                        strokeDasharray={res.slack === 0 ? "" : "6,3"}
                      >
                        {idx === resourceIndex && (
                          <animate attributeName="stroke-width" values="4;6;4" dur="1.5s" repeatCount="indefinite" />
                        )}
                      </line>
                      <text x={(x1 + x2) / 2 + 10} y={(y1 + y2) / 2 - 10} fontSize="9" fill={color} className="dark:fill-gray-300">
                        {res.name.substring(0, 10)}
                      </text>
                    </g>
                  );
                })}
                
                {/* Feasible region */}
                <polygon points="50,400 50,350 350,150 450,100 450,400" fill="rgba(78, 205, 196, 0.1)" stroke="none"/>
                
                {/* Optimal point */}
                <circle cx="250" cy="250" r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                  <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="250" y="240" textAnchor="middle" fontSize="10" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                
                {/* Utilization indicator for selected resource */}
                {resource && (
                  <g>
                    {/* Slack visualization */}
                    {resource.slack > 0 && (
                      <g>
                        <text x="250" y="280" textAnchor="middle" fontSize="11" fill="#4ECDC4" className="dark:fill-green-400">
                          Slack: {resource.slack} units
                        </text>
                        <rect x="150" y="290" width="200" height="15" rx="7" fill="#e9ecef" stroke="#4ECDC4" strokeWidth="1" className="dark:fill-gray-600"/>
                        <rect x="150" y="290" width={200 * (1 - resource.slack / resource.totalAvailable)} height="15" rx="7" fill="#4ECDC4">
                          <animate attributeName="width" values={`${200 * (1 - resource.slack / resource.totalAvailable)};${200 * (1 - resource.slack / resource.totalAvailable) + 5};${200 * (1 - resource.slack / resource.totalAvailable)}`} dur="2s" repeatCount="indefinite" />
                        </rect>
                        <text x="250" y="301" textAnchor="middle" fontSize="9" fill="white">
                          Used: {resource.utilization}
                        </text>
                      </g>
                    )}
                    {resource.slack === 0 && (
                      <g>
                        <text x="250" y="280" textAnchor="middle" fontSize="11" fill="#FF6B6B" className="dark:fill-red-400">
                          Fully Utilized - Bottleneck!
                        </text>
                        <rect x="150" y="290" width="200" height="15" rx="7" fill="#e9ecef" stroke="#FF6B6B" strokeWidth="1" className="dark:fill-gray-600"/>
                        <rect x="150" y="290" width="200" height="15" rx="7" fill="#FF6B6B">
                          <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
                        </rect>
                        <text x="250" y="301" textAnchor="middle" fontSize="9" fill="white">
                          Utilization: 100%
                        </text>
                      </g>
                    )}
                  </g>
                )}
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="220" height="80" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="2"/>
                  <text x="35" y="34" fontSize="10" fill="#555" className="dark:fill-gray-400">Selected Resource</text>
                  <line x1="10" y1="50" x2="30" y2="50" stroke="#4ECDC4" strokeWidth="2" strokeDasharray="6,3"/>
                  <text x="35" y="54" fontSize="10" fill="#555" className="dark:fill-gray-400">Other Resources</text>
                  <circle cx="20" cy="70" r="5" fill="#FF4757"/>
                  <text x="35" y="74" fontSize="10" fill="#555" className="dark:fill-gray-400">Optimal Point</text>
                </g>
              </svg>
            </div>
            
            {/* Details Panel */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Resource Analysis</h5>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Resource:</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{resource.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Constraint:</span>
                    <span className="font-mono text-gray-800 dark:text-gray-200">{resource.constraint}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Total Available:</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{resource.totalAvailable}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Used:</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{resource.used}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Slack:</span>
                    <span className={clsx(
                      "font-bold",
                      resource.slack === 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                    )}>
                      {resource.slack}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Utilization:</span>
                    <span className={clsx(
                      "font-bold",
                      resource.slack === 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                    )}>
                      {resource.utilization}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Interpretation</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {resource.interpretation}
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Summary</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {example.summary}
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
            Graphical Interpretation of Resource Availability
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to visualize and interpret resource availability, utilization, 
            and slack from graphical LP solutions.
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
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Resource Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {examples[selectedExample]?.resources.map((resource, index) => (
            <button
              key={`resource-btn-${index}`}
              onClick={() => setSelectedResource(index)}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                selectedResource === index
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              )}
            >
              {resource.name}
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
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-emerald-500"
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

              {/* Types of Resource Utilization */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Types of Resource Utilization
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {types.map((type, index) => (
                    <div
                      key={`type-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="text-4xl mb-2">{type.icon}</div>
                      <h4 className="font-semibold text-emerald-600 dark:text-emerald-400 mb-2 text-sm">
                        {type.type}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {type.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interpretation Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Steps to Interpret Resource Availability
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {interpretationSteps.map((step, index) => (
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

              {/* Mathematical Framework */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Mathematical Framework
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">Resource Availability:</p>
                    <p className="ml-4">Constraint: a₁x + a₂y ≤ b (Available)</p>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-blue-600 dark:text-blue-400">Resource Usage at Optimal (x*, y*):</p>
                      <p className="ml-4">Used = a₁x* + a₂y*</p>
                    </div>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-green-600 dark:text-green-400">Slack Calculation:</p>
                      <p className="ml-4">Slack = b - (a₁x* + a₂y*)</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">Slack ≥ 0 for feasible solutions</p>
                    </div>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-purple-600 dark:text-purple-400">Utilization Percentage:</p>
                      <p className="ml-4">Utilization = (Used / Available) × 100%</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">100% = Fully utilized (bottleneck)</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">{'<'} 100% = Some slack (unused capacity)</p>
                    </div>
                  </div>
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
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    Example {index + 1}
                  </button>
                ))}
              </div>

              {/* Example Visualization */}
              <ResourceAvailabilityVisualization 
                exampleIndex={selectedExample} 
                resourceIndex={selectedResource}
              />

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
                        <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded">
                          Resource Analysis
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
                  Practice Problems - Resource Availability
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Calculate Resource Utilization
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company has the following optimal solution at (3, 4):
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 5x + 7y
                      Subject to:
                      2x + 3y ≤ 18 (Resource A)
                      4x + y ≤ 16 (Resource B)
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Calculate the utilization and slack for each resource.
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
                      <span className="font-semibold">Hint:</span> Substitute (3,4) into each constraint to find usage.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Identify the Bottleneck
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A factory has these resources at optimal production:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Labor: 45/50 hours used
                      Machine: 30/30 hours used
                      Material: 20/25 units used
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Which resource is the bottleneck? Which has the most slack?
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
                      <span className="font-semibold">Hint:</span> The bottleneck has 100% utilization. Slack = Available - Used.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Resource Expansion Decision
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company has these resources at optimal production:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Resource A: 100% utilized, Shadow price = ₹2.50
                      Resource B: 80% utilized, Shadow price = ₹0
                      Resource C: 95% utilized, Shadow price = ₹1.20
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Which resource should the company expand first? Why?
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
                      <span className="font-semibold">Hint:</span> Resources with positive shadow prices are valuable to expand.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-6 border border-emerald-200 dark:border-emerald-800">
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                  💡 Tips for Interpreting Resource Availability
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Calculate usage:</span> Substitute optimal values into each constraint</li>
                  <li><span className="font-medium">Compute slack:</span> Available - Used = Slack</li>
                  <li><span className="font-medium">Identify bottlenecks:</span> Resources with zero slack are bottlenecks</li>
                  <li><span className="font-medium">Look for opportunities:</span> Resources with slack can be used more</li>
                  <li><span className="font-medium">Consider shadow prices:</span> High shadow prices indicate valuable resources</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Resource Availability FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Graphical Interpretation of Resource Availability"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic76_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Resource availability interpretation is where LP becomes a practical management tool. I tell my students that this is like looking at a dashboard of factory operations - you see exactly which resources are fully utilized (bottlenecks) and which have spare capacity. In my consulting work, I've used these insights to help companies identify where to invest and where they have room to grow. The visual nature of graphical LP makes resource utilization intuitive - when a constraint line passes through the optimal point, that resource is a bottleneck. When there's distance, there's slack. This simple visual insight is powerful in communicating with non-technical stakeholders." />
        </div>
      </div>
    </div>
  );
};

export default Topic76;