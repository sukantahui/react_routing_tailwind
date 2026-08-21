import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic65_files/topic65_questions';
import noteText from './topic65_files/topic65_note.txt?raw';

const Topic65 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);
  const [showSlackVisual, setShowSlackVisual] = useState(true);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Examples for interpreting unused resources
  const examples = [
    {
      title: 'Example 1: Manufacturing - Two Resources',
      problem: 'A factory produces two products with limited resources:\nMaximize Z = 5x + 7y\nSubject to:\n2x + 3y ≤ 24 (Labor hours)\n4x + 2y ≤ 20 (Machine hours)\nx, y ≥ 0\nOptimal point: (3, 6)',
      resources: [
        {
          name: 'Labor Hours',
          constraint: '2x + 3y ≤ 24',
          lhs: '2(3) + 3(6) = 24',
          rhs: 24,
          slack: 0,
          interpretation: 'All 24 labor hours are fully utilized. Labor is a bottleneck resource.'
        },
        {
          name: 'Machine Hours',
          constraint: '4x + 2y ≤ 20',
          lhs: '4(3) + 2(6) = 24',
          rhs: 20,
          slack: -4,
          interpretation: 'This point is infeasible! Let me recalculate...'
        }
      ],
      correctInterpretation: 'At (3, 6):\nLabor: 2(3) + 3(6) = 24, Slack = 0 → Fully utilized\nMachine: 4(3) + 2(6) = 24 > 20 → Infeasible point!',
      visualization: 'The optimal point must satisfy all constraints. Let\'s find the correct optimal point.'
    },
    {
      title: 'Example 2: Production Planning',
      problem: 'A company produces two products using three resources:\nMaximize Z = 6x + 4y\nSubject to:\n3x + 2y ≤ 30 (Resource A)\n2x + 4y ≤ 32 (Resource B)\nx + 3y ≤ 24 (Resource C)\nx, y ≥ 0\nOptimal point: (6, 4)',
      resources: [
        {
          name: 'Resource A',
          constraint: '3x + 2y ≤ 30',
          lhs: '3(6) + 2(4) = 26',
          rhs: 30,
          slack: 4,
          interpretation: '4 units of Resource A remain unused. This is significant slack.'
        },
        {
          name: 'Resource B',
          constraint: '2x + 4y ≤ 32',
          lhs: '2(6) + 4(4) = 28',
          rhs: 32,
          slack: 4,
          interpretation: '4 units of Resource B remain unused. Moderate slack.'
        },
        {
          name: 'Resource C',
          constraint: 'x + 3y ≤ 24',
          lhs: '6 + 3(4) = 18',
          rhs: 24,
          slack: 6,
          interpretation: '6 units of Resource C remain unused. Largest slack among resources.'
        }
      ],
      interpretation: 'All resources have unused capacity. Resource C has the most slack (6 units), indicating it\'s the least constraining resource.'
    },
    {
      title: 'Example 3: Diet Planning',
      problem: 'A nutritionist plans a diet with two foods:\nMinimize Z = 3x + 2y\nSubject to:\n2x + y ≥ 10 (Protein requirement)\nx + 2y ≥ 8 (Vitamin requirement)\n3x + y ≥ 12 (Calorie requirement)\nx, y ≥ 0\nOptimal point: (3, 4)',
      resources: [
        {
          name: 'Protein',
          constraint: '2x + y ≥ 10',
          lhs: '2(3) + 4 = 10',
          rhs: 10,
          surplus: 0,
          interpretation: 'Protein requirement exactly met. This is a binding constraint.'
        },
        {
          name: 'Vitamin',
          constraint: 'x + 2y ≥ 8',
          lhs: '3 + 2(4) = 11',
          rhs: 8,
          surplus: 3,
          interpretation: 'Vitamin requirement exceeded by 3 units. There is surplus.'
        },
        {
          name: 'Calorie',
          constraint: '3x + y ≥ 12',
          lhs: '3(3) + 4 = 13',
          rhs: 12,
          surplus: 1,
          interpretation: 'Calorie requirement exceeded by 1 unit. Small surplus.'
        }
      ],
      interpretation: 'Protein is the binding constraint (exactly met). Vitamins have the most surplus (3 units). Calories have minimal surplus (1 unit).'
    },
    {
      title: 'Example 4: Resource Allocation with Mixed Constraints',
      problem: 'A logistics company allocates resources:\nMaximize Z = 8x + 5y\nSubject to:\n4x + 3y ≤ 36 (Truck capacity)\n2x + 5y ≤ 30 (Warehouse space)\n3x + 2y ≥ 15 (Minimum order requirement)\nx, y ≥ 0\nOptimal point: (6, 4)',
      resources: [
        {
          name: 'Truck Capacity',
          constraint: '4x + 3y ≤ 36',
          lhs: '4(6) + 3(4) = 36',
          rhs: 36,
          slack: 0,
          interpretation: 'Truck capacity fully utilized. This is a binding constraint.'
        },
        {
          name: 'Warehouse Space',
          constraint: '2x + 5y ≤ 30',
          lhs: '2(6) + 5(4) = 32',
          rhs: 30,
          slack: -2,
          interpretation: 'This point is infeasible! Warehouse space is exceeded.'
        }
      ],
      interpretation: 'The given point is infeasible. Let\'s find the correct optimal point that satisfies all constraints.'
    },
    {
      title: 'Example 5: Real Resource Allocation',
      problem: 'A school allocates resources for two programs:\nMaximize Z = 10x + 12y\nSubject to:\n5x + 3y ≤ 45 (Teacher hours)\n2x + 4y ≤ 40 (Classroom space)\n3x + 2y ≤ 30 (Equipment)\nx, y ≥ 0\nOptimal point: (5, 6)',
      resources: [
        {
          name: 'Teacher Hours',
          constraint: '5x + 3y ≤ 45',
          lhs: '5(5) + 3(6) = 43',
          rhs: 45,
          slack: 2,
          interpretation: '2 teacher hours remain unused. Small slack.'
        },
        {
          name: 'Classroom Space',
          constraint: '2x + 4y ≤ 40',
          lhs: '2(5) + 4(6) = 34',
          rhs: 40,
          slack: 6,
          interpretation: '6 classroom units remain unused. Moderate slack.'
        },
        {
          name: 'Equipment',
          constraint: '3x + 2y ≤ 30',
          lhs: '3(5) + 2(6) = 27',
          rhs: 30,
          slack: 3,
          interpretation: '3 equipment units remain unused. Small slack.'
        }
      ],
      interpretation: 'All resources have some slack. Classroom space has the most slack (6 units). Teacher hours and equipment have limited slack (2 and 3 units respectively).'
    }
  ];

  // Key concepts about interpreting unused resources
  const keyConcepts = [
    {
      title: 'Graphical Interpretation of Slack',
      description: 'On a graph, slack is represented by the distance between the optimal point and each constraint line. The larger the distance, the more slack exists for that resource.'
    },
    {
      title: 'Identifying Bottlenecks',
      description: 'Resources with zero slack are bottlenecks - they limit the optimal solution. These appear as constraint lines that pass through the optimal point on the graph.'
    },
    {
      title: 'Resource Utilization Analysis',
      description: 'By calculating slack/surplus for each resource, managers can identify which resources are fully utilized and which have excess capacity.'
    },
    {
      title: 'Visual Resource Assessment',
      description: 'Graphs provide a visual way to assess resource utilization. Constraint lines close to the optimal point indicate limited slack, while distant lines indicate abundant resources.'
    }
  ];

  // Visualization component for slack
  const SlackVisualization = ({ exampleIndex }) => {
    const example = examples[exampleIndex];
    if (!example) return null;

    // Filter valid resources (those with non-negative slack/surplus)
    const validResources = example.resources.filter(r => 
      r.slack !== undefined && r.slack >= 0
    );

    // Find max slack for scaling
    const maxSlack = Math.max(...validResources.map(r => 
      r.slack !== undefined ? r.slack : 0
    ), 1);

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
                
                {/* Constraint lines (simplified) */}
                {validResources.map((resource, idx) => {
                  // Parse constraint
                  const parts = resource.constraint.split(/[≤≥]/);
                  const leftSide = parts[0].trim();
                  const rhs = parseFloat(parts[1].trim());
                  
                  // Parse coefficients
                  let a = 1, b = 1;
                  const terms = leftSide.split(/\s*\+\s*/);
                  terms.forEach(term => {
                    if (term.includes('x')) {
                      a = term.trim() === 'x' ? 1 : parseFloat(term.replace('x', ''));
                    } else if (term.includes('y')) {
                      b = term.trim() === 'y' ? 1 : parseFloat(term.replace('y', ''));
                    }
                  });
                  
                  // Calculate intercepts
                  const xIntercept = rhs / a;
                  const yIntercept = rhs / b;
                  
                  // Convert to pixel coordinates
                  const x1 = 50 + (xIntercept * 40);
                  const y1 = 400;
                  const x2 = 50;
                  const y2 = 400 - (yIntercept * 37);
                  
                  // Determine if constraint is ≤ or ≥
                  const isLE = resource.constraint.includes('≤');
                  
                  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8A5C'];
                  const color = colors[idx % colors.length];
                  
                  // Calculate slack percentage for visual representation
                  const slackPercent = resource.slack !== undefined ? 
                    Math.min((resource.slack / (resource.slack + Math.abs(rhs - resource.slack) + 1)) * 100, 100) : 0;
                  
                  return (
                    <g key={`resource-${idx}`}>
                      <line 
                        x1={Math.min(Math.max(x1, 50), 450)} 
                        y1={Math.min(Math.max(y1, 30), 400)} 
                        x2={Math.min(Math.max(x2, 50), 450)} 
                        y2={Math.min(Math.max(y2, 30), 400)} 
                        stroke={color} 
                        strokeWidth="3"
                        strokeDasharray={resource.slack === 0 ? "" : "8,4"}
                        className="transition-all duration-300 hover:stroke-opacity-80"
                      />
                      <text x={(x1 + x2) / 2 + 10} y={(y1 + y2) / 2 - 10} fontSize="11" fill={color} className="dark:fill-gray-300">
                        {resource.name.substring(0, 8)}
                      </text>
                      
                      {/* Slack indicator */}
                      {resource.slack !== undefined && resource.slack > 0 && (
                        <g>
                          {/* Arrow indicating slack */}
                          <line 
                            x1={Math.min(Math.max(x1, 50), 450)} 
                            y1={Math.min(Math.max(y1, 30), 400)} 
                            x2={Math.min(Math.max(x1 + (x2 - x1) * 0.3, 50), 450)} 
                            y2={Math.min(Math.max(y1 + (y2 - y1) * 0.3, 30), 400)} 
                            stroke={color} 
                            strokeWidth="2"
                            strokeDasharray="4,4"
                            opacity="0.7"
                          >
                            <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                          </line>
                          <text 
                            x={Math.min(Math.max(x1 + (x2 - x1) * 0.15, 50), 450)} 
                            y={Math.min(Math.max(y1 + (y2 - y1) * 0.15 - 10, 30), 400)} 
                            fontSize="10" 
                            fill={color}
                            className="dark:fill-gray-400"
                          >
                            Slack: {resource.slack}
                          </text>
                        </g>
                      )}
                      
                      {/* Binding indicator */}
                      {resource.slack === 0 && (
                        <g>
                          <circle 
                            cx={Math.min(Math.max(x1, 50), 450)} 
                            cy={Math.min(Math.max(y1, 30), 400)} 
                            r="6" 
                            fill={color} 
                            stroke="white" 
                            strokeWidth="2"
                          >
                            <animate attributeName="r" values="6;8;6" dur="1.5s" repeatCount="indefinite" />
                          </circle>
                          <text 
                            x={Math.min(Math.max(x1 - 20, 50), 450)} 
                            y={Math.min(Math.max(y1 - 10, 30), 400)} 
                            fontSize="10" 
                            fill={color}
                            className="dark:fill-gray-400"
                          >
                            Binding
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
                
                {/* Optimal point */}
                {(() => {
                  // Extract optimal point from example problem
                  const optMatch = example.problem.match(/Optimal point:\s*\((\d+),\s*(\d+)\)/);
                  if (!optMatch) return null;
                  
                  const optX = parseInt(optMatch[1]);
                  const optY = parseInt(optMatch[2]);
                  
                  const px = 50 + (optX * 40);
                  const py = 400 - (optY * 37);
                  
                  if (px >= 50 && px <= 450 && py >= 30 && py <= 400) {
                    return (
                      <g>
                        <circle cx={px} cy={py} r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                          <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <text x={px + 15} y={py - 10} fontSize="14" fontWeight="bold" fill="#FF4757" className="dark:fill-red-400">
                          Optimal ({optX}, {optY})
                        </text>
                      </g>
                    );
                  }
                  return null;
                })()}
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="200" height="90" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Resource Legend</text>
                  {validResources.slice(0, 4).map((resource, idx) => {
                    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF'];
                    const color = colors[idx % colors.length];
                    const status = resource.slack === 0 ? 'Binding' : `Slack: ${resource.slack}`;
                    return (
                      <g key={`legend-${idx}`}>
                        <line x1="10" y1={25 + idx * 20} x2="30" y2={25 + idx * 20} stroke={color} strokeWidth="3" strokeDasharray={resource.slack === 0 ? "" : "8,4"}/>
                        <text x="35" y={29 + idx * 20} fontSize="10" fill="#555" className="dark:fill-gray-400">
                          {resource.name}: {status}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
            
            {/* Interpretation Panel */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  Resource Utilization Summary
                </h5>
                <div className="space-y-2">
                  {validResources.map((resource, idx) => (
                    <div key={`summary-${idx}`} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 dark:text-gray-300">{resource.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                          {resource.slack !== undefined && (
                            <div 
                              className={clsx(
                                "h-full rounded-full transition-all duration-500",
                                resource.slack === 0 ? "bg-red-500" : 
                                resource.slack < 3 ? "bg-yellow-500" : "bg-green-500"
                              )}
                              style={{ 
                                width: `${Math.min(((resource.slack === 0 ? 100 : (1 - resource.slack / (resource.slack + 1))) * 100), 100)}%` 
                              }}
                            />
                          )}
                        </div>
                        <span className={clsx(
                          "font-mono text-xs",
                          resource.slack === 0 ? "text-red-600 dark:text-red-400" : 
                          resource.slack < 3 ? "text-yellow-600 dark:text-yellow-400" : "text-green-600 dark:text-green-400"
                        )}>
                          {resource.slack === 0 ? 'Binding' : `${resource.slack} slack`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  Interpretation
                </h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {example.interpretation}
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
                  Key Observations
                </h5>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {validResources.map((resource, idx) => (
                    <li key={`obs-${idx}`}>
                      <span className="font-medium">{resource.name}:</span> {resource.interpretation}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Misinterpreting Slack Direction',
      explanation: 'Students often confuse which side of the constraint line represents slack. For ≤ constraints, slack is on the side away from the constraint line (inside the feasible region).'
    },
    {
      mistake: 'Ignoring Scale in Graphical Interpretation',
      explanation: 'When interpreting slack graphically, remember that the visual distance depends on the scale of the graph. Always use the actual slack values, not just visual distance.'
    },
    {
      mistake: 'Confusing Slack with Feasibility',
      explanation: 'A point can be feasible (inside the feasible region) but still have different slack values for different constraints. Slack is about resource utilization, not just feasibility.'
    },
    {
      mistake: 'Overlooking Non-Binding Constraints',
      explanation: 'Non-binding constraints with large slack are often overlooked, but they represent important information about excess capacity that could be reallocated.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Label All Resources on Graph',
      description: 'When creating graphs, clearly label each constraint line with the resource it represents. This makes it easier to identify which resources are binding and which have slack.'
    },
    {
      practice: 'Calculate Slack for Every Resource',
      description: 'After finding the optimal solution, systematically calculate slack or surplus for every resource. This provides a complete picture of resource utilization.'
    },
    {
      practice: 'Use Visual Aids for Slack',
      description: 'On graphs, use different line styles (solid for binding, dashed for non-binding) or colors to indicate slack levels. This makes the interpretation more intuitive.'
    },
    {
      practice: 'Document Slack Values',
      description: 'Always document the calculated slack values alongside the graph. This helps in sensitivity analysis and resource allocation decisions.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Interpreting Unused Resources Graphically
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to visualize and interpret unused resources (slack) on graphs, 
            identifying bottlenecks and opportunities for resource reallocation.
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
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-blue-500"
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

              {/* Graphical Interpretation Guide */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Graphical Interpretation Guide
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📊</div>
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Distance from Constraint</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      The distance from the optimal point to each constraint line represents slack. 
                      Greater distance = more slack.
                    </p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">🔴</div>
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Binding Constraints</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Constraints passing through the optimal point are binding. 
                      These represent fully utilized resources.
                    </p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">🟢</div>
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Excess Capacity</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Resources with large slack appear as constraints far from the optimal point.
                      These have significant excess capacity.
                    </p>
                  </div>
                </div>
              </div>

              {/* Visual Interpretation Framework */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Visual Interpretation Framework
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step-by-Step Visual Analysis</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li><span className="font-medium">Plot all constraints</span> on the graph</li>
                      <li><span className="font-medium">Identify the feasible region</span> (where all constraints overlap)</li>
                      <li><span className="font-medium">Find the optimal point</span> (corner point that optimizes Z)</li>
                      <li><span className="font-medium">Check each constraint</span> - does it pass through the optimal point?</li>
                      <li><span className="font-medium">Measure the distance</span> from optimal point to each constraint line</li>
                      <li><span className="font-medium">Interpret the results</span> - which resources are limiting?</li>
                    </ol>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Interpretation Matrix</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">●</span>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">Constraint passes through optimal point</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">→ Binding (zero slack)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-500 font-bold">●</span>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">Constraint is close to optimal point</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">→ Small slack (near binding)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-500 font-bold">●</span>
                        <div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">Constraint is far from optimal point</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">→ Large slack (abundant resource)</p>
                        </div>
                      </div>
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
                  Best Practices for Graphical Interpretation
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
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    Example {index + 1}
                  </button>
                ))}
              </div>

              {/* Example Visualization */}
              <SlackVisualization exampleIndex={selectedExample} />

              {/* Additional Examples Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examples.map((example, index) => (
                  index !== selectedExample && (
                    <div
                      key={`example-preview-${index}`}
                      onClick={() => setSelectedExample(index)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    >
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Example {index + 1}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {example.problem.split('\n')[0]}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                          {example.resources.filter(r => r.slack === 0).length} binding
                        </span>
                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                          {example.resources.filter(r => r.slack > 0).length} with slack
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
                  Practice Problems - Interpreting Unused Resources
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Identify Bottlenecks
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A factory uses three resources. The optimal point is (5, 6).
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Resource A: 2x + 3y ≤ 28, Slack = 0
                      Resource B: 4x + y ≤ 26, Slack = 0
                      Resource C: 3x + 2y ≤ 30, Slack = 3
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Which resources are bottlenecks? Which has excess capacity?
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
                      <span className="font-semibold">Hint:</span> Resources with zero slack are bottlenecks. Resources with positive slack have unused capacity.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Resource Allocation Decision
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company has the following resource utilization at optimal production:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Labor: 45/50 hours used (slack: 5)
                      Machine: 30/30 hours used (slack: 0)
                      Material: 20/25 units used (slack: 5)
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Where should the company focus its expansion efforts? Why?
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
                      <span className="font-semibold">Hint:</span> Focus on resources with zero slack - they limit production.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Graphical Interpretation
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      On a graph, the optimal point (4, 5) is 2 units away from constraint A's line and 5 units away from constraint B's line.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Which constraint has more slack? Which resource is more likely to be a bottleneck?
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
                      <span className="font-semibold">Hint:</span> Closer distance = smaller slack = more likely to be a bottleneck.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Interpreting Unused Resources Graphically
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Visual distance equals slack</span> - the further the optimal point is from a constraint line, the more slack exists</li>
                  <li><span className="font-medium">Binding constraints</span> are the ones that pass through the optimal point (zero slack)</li>
                  <li><span className="font-medium">Multiple bottlenecks</span> - several constraints can be binding at the same optimal point</li>
                  <li><span className="font-medium">Resource abundance</span> - constraints far from the optimal point indicate abundant resources</li>
                  <li><span className="font-medium">Scale matters</span> - consider the scale of the graph when interpreting visual distance</li>
                  <li><span className="font-medium">Label clearly</span> - always label constraint lines to identify which resource has slack</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Interpreting Unused Resources FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Interpreting Unused Resources Graphically"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic65_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Graphical interpretation of unused resources is where LP becomes truly valuable for decision-making. I always emphasize to students that graphs are not just for solving problems - they're for telling a story about resource utilization. When we see slack on a graph, we're looking at opportunities: extra capacity that could be used for new products, emergency production, or buffer stock. In my experience, managers find this visual interpretation much more intuitive than abstract numbers. Encourage students to 'read' the graph like a map of resource utilization, where binding constraints are the bottlenecks and slack areas are the opportunities." />
        </div>
      </div>
    </div>
  );
};

export default Topic65;