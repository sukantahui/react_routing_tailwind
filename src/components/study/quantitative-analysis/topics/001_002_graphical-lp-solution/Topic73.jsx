import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic73_files/topic73_questions';
import noteText from './topic73_files/topic73_note.txt?raw';

const Topic73 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedConstraint, setSelectedConstraint] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Examples for changing resource constraints
  const examples = [
    {
      title: 'Example 1: Increasing a Binding Constraint',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\nx + y ≤ 10 (Resource A)\n2x + y ≤ 16 (Resource B)\nx, y ≥ 0\nOriginal Optimal: (6, 4) with Z = 26',
      resourceChanges: [
        {
          constraint: 'Resource A: x + y ≤ 10',
          originalRHS: 10,
          newRHS: 12,
          newOptimal: '(8, 4) with Z = 32',
          shadowPrice: 3,
          interpretation: 'Increasing Resource A by 2 units increases Z by 6 units (2 × 3). The new optimal point moves along constraint B.'
        },
        {
          constraint: 'Resource B: 2x + y ≤ 16',
          originalRHS: 16,
          newRHS: 18,
          newOptimal: '(6, 6) with Z = 30',
          shadowPrice: 2,
          interpretation: 'Increasing Resource B by 2 units increases Z by 4 units (2 × 2). The new optimal point moves along constraint A.'
        }
      ]
    },
    {
      title: 'Example 2: Decreasing a Binding Constraint',
      problem: 'Maximize Z = 4x + 3y\nSubject to:\n2x + y ≤ 20 (Labor)\nx + 2y ≤ 18 (Machine)\nx, y ≥ 0\nOriginal Optimal: (7.33, 5.33) with Z = 45.33',
      resourceChanges: [
        {
          constraint: 'Labor: 2x + y ≤ 20',
          originalRHS: 20,
          newRHS: 16,
          newOptimal: '(6.67, 2.67) with Z = 34.67',
          shadowPrice: 1.33,
          interpretation: 'Decreasing Labor by 4 units decreases Z by 5.33 units (4 × 1.33). The new optimal point shifts significantly.'
        },
        {
          constraint: 'Machine: x + 2y ≤ 18',
          originalRHS: 18,
          newRHS: 14,
          newOptimal: '(6, 4) with Z = 36',
          shadowPrice: 2.67,
          interpretation: 'Decreasing Machine by 4 units decreases Z by 10.67 units (4 × 2.67). Machine is more valuable than labor.'
        }
      ]
    },
    {
      title: 'Example 3: Changing a Non-Binding Constraint',
      problem: 'Maximize Z = 5x + 7y\nSubject to:\n3x + 2y ≤ 30 (Resource A)\n2x + 4y ≤ 32 (Resource B)\nx + y ≤ 12 (Resource C)\nx, y ≥ 0\nOriginal Optimal: (4, 6) with Z = 62',
      resourceChanges: [
        {
          constraint: 'Resource C: x + y ≤ 12',
          originalRHS: 12,
          newRHS: 10,
          newOptimal: '(4, 6) with Z = 62',
          shadowPrice: 0,
          interpretation: 'Decreasing Resource C doesn\'t affect the optimal solution. Resource C was non-binding with slack.'
        },
        {
          constraint: 'Resource C: x + y ≤ 12',
          originalRHS: 12,
          newRHS: 8,
          newOptimal: '(4, 4) with Z = 48',
          shadowPrice: 0,
          interpretation: 'Even with significant decrease, the optimal solution remains determined by Resources A and B.'
        }
      ]
    },
    {
      title: 'Example 4: Multiple Resource Changes',
      problem: 'Maximize Z = 6x + 4y\nSubject to:\n2x + 3y ≤ 24 (Resource A)\n4x + y ≤ 20 (Resource B)\nx, y ≥ 0\nOriginal Optimal: (3, 4) with Z = 34',
      resourceChanges: [
        {
          constraint: 'Resource A: 2x + 3y ≤ 24',
          originalRHS: 24,
          newRHS: 28,
          newOptimal: '(3.5, 6) with Z = 45',
          shadowPrice: 0.8,
          interpretation: 'Increasing Resource A by 4 units increases Z by 3.2 units (4 × 0.8).'
        },
        {
          constraint: 'Resource B: 4x + y ≤ 20',
          originalRHS: 20,
          newRHS: 24,
          newOptimal: '(4.5, 5.33) with Z = 48.67',
          shadowPrice: 1.2,
          interpretation: 'Increasing Resource B by 4 units increases Z by 4.8 units (4 × 1.2). Resource B is more valuable.'
        }
      ]
    },
    {
      title: 'Example 5: Real-World Resource Change',
      problem: 'A factory produces two products:\nMaximize Z = 8x + 6y (Profit in ₹)\nSubject to:\n4x + 3y ≤ 48 (Labor hours)\n2x + 5y ≤ 40 (Machine hours)\n3x + 2y ≤ 36 (Material units)\nx, y ≥ 0\nOriginal Optimal: (6, 4) with Z = 72',
      resourceChanges: [
        {
          constraint: 'Labor: 4x + 3y ≤ 48',
          originalRHS: 48,
          newRHS: 52,
          newOptimal: '(6.67, 4.67) with Z = 81.33',
          shadowPrice: 2.25,
          interpretation: 'Adding 4 labor hours increases profit by ₹9 (4 × ₹2.25). Each additional labor hour adds ₹2.25 to profit.'
        },
        {
          constraint: 'Machine: 2x + 5y ≤ 40',
          originalRHS: 40,
          newRHS: 44,
          newOptimal: '(6.4, 5.2) with Z = 82.4',
          shadowPrice: 0.75,
          interpretation: 'Adding 4 machine hours increases profit by ₹3 (4 × ₹0.75). Machine hours are less valuable than labor.'
        },
        {
          constraint: 'Material: 3x + 2y ≤ 36',
          originalRHS: 36,
          newRHS: 40,
          newOptimal: '(6.67, 4.67) with Z = 81.33',
          shadowPrice: 0.67,
          interpretation: 'Adding 4 material units increases profit by ₹2.68 (4 × ₹0.67). Material has the lowest shadow price.'
        }
      ]
    }
  ];

  // Key concepts about changing resource constraints
  const keyConcepts = [
    {
      title: 'Definition',
      description: 'Changing a resource constraint means altering the right-hand side (RHS) of a constraint. This shifts the constraint line and changes the feasible region.'
    },
    {
      title: 'Effect on Binding Constraints',
      description: 'When a binding constraint changes, the optimal solution moves along the other binding constraint. The shadow price determines how much Z changes.'
    },
    {
      title: 'Effect on Non-Binding Constraints',
      description: 'Changes to non-binding constraints don\'t affect the optimal solution until the constraint becomes binding (within the allowable range).'
    },
    {
      title: 'Practical Implications',
      description: 'Understanding resource constraint changes helps managers make decisions about resource allocation, capacity expansion, and investment priorities.'
    }
  ];

  // Types of resource changes
  const types = [
    {
      type: 'Increasing a Binding Constraint',
      description: 'Moving the constraint line outward. Z increases at the rate of the shadow price. The optimal point moves along the other binding constraint.',
      icon: '📈'
    },
    {
      type: 'Decreasing a Binding Constraint',
      description: 'Moving the constraint line inward. Z decreases at the rate of the shadow price. The optimal point shifts along the other binding constraint.',
      icon: '📉'
    },
    {
      type: 'Changing a Non-Binding Constraint',
      description: 'No effect on the optimal solution until the constraint becomes binding. The resource has slack, so changes are absorbed.',
      icon: '➖'
    },
    {
      type: 'Beyond Allowable Range',
      description: 'When changes exceed the allowable range, the optimal basis changes. A different constraint becomes binding.',
      icon: '🔄'
    }
  ];

  // Steps to analyze resource changes
  const analysisSteps = [
    {
      title: 'Step 1: Identify Binding Constraints',
      description: 'Determine which constraints are binding at the optimal solution.',
      icon: '🔍'
    },
    {
      title: 'Step 2: Calculate Shadow Prices',
      description: 'Find the marginal value of each binding constraint.',
      icon: '💰'
    },
    {
      title: 'Step 3: Determine Allowable Range',
      description: 'Calculate how much the RHS can change before the basis changes.',
      icon: '📏'
    },
    {
      title: 'Step 4: Analyze the Effect',
      description: 'Calculate the new optimal solution and Z value after the change.',
      icon: '📊'
    },
    {
      title: 'Step 5: Interpret Results',
      description: 'Translate the mathematical results into business insights.',
      icon: '💡'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Ignoring Shadow Price Validity',
      explanation: 'Shadow prices are only valid within the allowable range. Beyond that, the analysis must be redone.'
    },
    {
      mistake: 'Applying Changes to Non-Binding Constraints',
      explanation: 'Changes to non-binding constraints don\'t affect the optimal solution until they become binding.'
    },
    {
      mistake: 'Misinterpreting the Direction of Change',
      explanation: 'Increasing a constraint moves it outward, decreasing it moves it inward. The direction affects whether Z increases or decreases.'
    },
    {
      mistake: 'Forgetting Multiple Binding Constraints',
      explanation: 'When multiple constraints are binding, changes to one affect the optimal point along the other binding constraint.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Check Binding Status First',
      description: 'Always determine which constraints are binding before analyzing resource changes.'
    },
    {
      practice: 'Calculate Shadow Prices Correctly',
      description: 'Use the correct method to calculate shadow prices for each binding constraint.'
    },
    {
      practice: 'Consider the Allowable Range',
      description: 'Ensure changes are within the allowable range for the shadow price to be valid.'
    },
    {
      practice: 'Use Graphical Visualization',
      description: 'Graph the changes to visualize how the feasible region and optimal solution shift.'
    }
  ];

  // Visualization component for resource changes
  const ResourceChangeVisualization = ({ exampleIndex, constraintIndex }) => {
    const example = examples[exampleIndex];
    if (!example) return null;

    const change = example.resourceChanges[constraintIndex] || example.resourceChanges[0];

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
                
                {/* Original constraints */}
                <line x1="50" y1="400" x2="450" y2="100" stroke="#FF6B6B" strokeWidth="2" strokeDasharray="4,4"/>
                <text x="400" y="95" fontSize="10" fill="#FF6B6B" className="dark:fill-red-400">Original</text>
                
                <line x1="50" y1="350" x2="450" y2="50" stroke="#4ECDC4" strokeWidth="2" strokeDasharray="4,4"/>
                <text x="400" y="45" fontSize="10" fill="#4ECDC4" className="dark:fill-green-400">Original</text>
                
                {/* New constraint (shifted) */}
                <line x1="50" y1="370" x2="450" y2="70" stroke="#FFE66D" strokeWidth="3">
                  <animate attributeName="stroke-dashoffset" values="0;50" dur="2s" repeatCount="indefinite" />
                </line>
                <text x="400" y="65" fontSize="10" fill="#FFE66D" className="dark:fill-yellow-400">New Constraint</text>
                
                {/* Feasible region (original) */}
                <polygon points="50,400 50,350 350,150 450,100 450,400" fill="rgba(78, 205, 196, 0.1)" stroke="none"/>
                
                {/* Feasible region (new) */}
                <polygon points="50,400 50,370 350,150 450,70 450,400" fill="rgba(255, 230, 109, 0.1)" stroke="none"/>
                
                {/* Original optimal point */}
                <circle cx="250" cy="250" r="8" fill="#FF4757" stroke="white" strokeWidth="2"/>
                <text x="250" y="240" textAnchor="middle" fontSize="10" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                
                {/* New optimal point */}
                <circle cx="280" cy="220" r="8" fill="#FFE66D" stroke="white" strokeWidth="2">
                  <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="280" y="210" textAnchor="middle" fontSize="10" fill="#FFE66D" className="dark:fill-yellow-400">New</text>
                
                {/* Arrow showing shift */}
                <path d="M 250 250 Q 265 235 280 220" stroke="#FF8A5C" strokeWidth="2" fill="none" markerEnd="url(#arrow)">
                  <animate attributeName="d" values="M 250 250 Q 265 235 280 220;M 250 250 Q 270 230 290 215;M 250 250 Q 265 235 280 220" dur="2s" repeatCount="indefinite" />
                </path>
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M 0 0 L 8 4 L 0 8 z" fill="#FF8A5C"/>
                  </marker>
                </defs>
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="220" height="90" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="2" strokeDasharray="4,4"/>
                  <text x="35" y="34" fontSize="10" fill="#555" className="dark:fill-gray-400">Original Constraint</text>
                  <line x1="10" y1="50" x2="30" y2="50" stroke="#FFE66D" strokeWidth="3"/>
                  <text x="35" y="54" fontSize="10" fill="#555" className="dark:fill-gray-400">New Constraint</text>
                  <circle cx="20" cy="70" r="6" fill="#FF4757"/>
                  <text x="35" y="74" fontSize="10" fill="#555" className="dark:fill-gray-400">Original Optimal</text>
                  <circle cx="20" cy="85" r="6" fill="#FFE66D"/>
                  <text x="35" y="89" fontSize="10" fill="#555" className="dark:fill-gray-400">New Optimal</text>
                </g>
              </svg>
            </div>
            
            {/* Details Panel */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Resource Change</h5>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {change.constraint}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <span className="text-gray-500 dark:text-gray-400">Original RHS:</span>
                    <span className="font-bold text-gray-700 dark:text-gray-300 ml-1">{change.originalRHS}</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <span className="text-gray-500 dark:text-gray-400">New RHS:</span>
                    <span className="font-bold text-gray-700 dark:text-gray-300 ml-1">{change.newRHS}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">New Optimal Solution</h5>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {change.newOptimal}
                </p>
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                  Shadow Price: {change.shadowPrice}
                </div>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Interpretation</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {change.interpretation}
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Key Insight</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  ΔZ = Shadow Price × ΔRHS
                  <br/>
                  ΔZ = {change.shadowPrice} × ({change.newRHS} - {change.originalRHS}) = {change.shadowPrice * (change.newRHS - change.originalRHS)}
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
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Effect of Changing a Resource Constraint
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how changes in resource availability affect the optimal solution, 
            and how to interpret these changes using shadow prices and sensitivity analysis.
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
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-200 dark:shadow-teal-900/30"
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
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-teal-500"
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

              {/* Types of Resource Changes */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Types of Resource Changes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {types.map((type, index) => (
                    <div
                      key={`type-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="text-4xl mb-2">{type.icon}</div>
                      <h4 className="font-semibold text-teal-600 dark:text-teal-400 mb-2 text-sm">
                        {type.type}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {type.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analysis Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Steps to Analyze Resource Changes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {analysisSteps.map((step, index) => (
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
                    <p className="font-bold text-teal-600 dark:text-teal-400">Effect of Changing RHS:</p>
                    <p className="ml-4">Original constraint: a₁x + a₂y ≤ b</p>
                    <p className="ml-4">New constraint: a₁x + a₂y ≤ b + Δb</p>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-green-600 dark:text-green-400">Change in Optimal Z:</p>
                      <p className="ml-4">ΔZ = Shadow Price × Δb</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">(Valid within allowable range)</p>
                    </div>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-blue-600 dark:text-blue-400">New Optimal Point:</p>
                      <p className="ml-4">Moves along the other binding constraint</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">Rate determined by constraint coefficients</p>
                    </div>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-purple-600 dark:text-purple-400">Allowable Range Condition:</p>
                      <p className="ml-4">b - allowable_decrease ≤ b_new ≤ b + allowable_increase</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">Basis remains optimal within this range</p>
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
                        ? "bg-teal-500 text-white shadow-lg shadow-teal-200 dark:shadow-teal-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    Example {index + 1}
                  </button>
                ))}
              </div>

              {/* Constraint Selector */}
              <div className="flex flex-wrap gap-3 justify-center">
                {examples[selectedExample]?.resourceChanges.map((change, index) => (
                  <button
                    key={`constraint-btn-${index}`}
                    onClick={() => setSelectedConstraint(index)}
                    className={clsx(
                      "px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300",
                      selectedConstraint === index
                        ? "bg-teal-400 text-white"
                        : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                    )}
                  >
                    {change.constraint.substring(0, 30)}...
                  </button>
                ))}
              </div>

              {/* Example Visualization */}
              <ResourceChangeVisualization 
                exampleIndex={selectedExample} 
                constraintIndex={selectedConstraint}
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
                        <span className="text-xs px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded">
                          Resource Changes
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
                  Practice Problems - Resource Constraint Changes
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Calculate the Effect
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company has the following LP problem:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 5x + 3y
                      Subject to:
                      2x + y ≤ 20 (Resource A, Shadow price = 1.5)
                      x + 3y ≤ 24 (Resource B, Shadow price = 0.5)
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      If Resource A increases by 4 units, what is the new Z value?
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
                      <span className="font-semibold">Hint:</span> ΔZ = Shadow Price × ΔRHS
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Resource Investment Decision
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A factory has these resources:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Labor: Shadow price = ₹2.50/hour
                      Machine: Shadow price = ₹1.25/hour
                      Material: Shadow price = ₹0.75/unit
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The company can invest ₹10,000 to increase one resource by 1,000 units. 
                      Which resource should they invest in?
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
                      <span className="font-semibold">Hint:</span> Compare shadow price × units to investment cost.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Analyze the Effect
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The optimal solution is at (3, 5) with Z = 45:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 4x + 6y
                      Subject to:
                      2x + 3y ≤ 21 (Resource A)
                      3x + 2y ≤ 19 (Resource B)
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      If Resource A increases to 24, what happens to the optimal solution and Z?
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
                      <span className="font-semibold">Hint:</span> The new optimal point moves along constraint B.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-6 border border-teal-200 dark:border-teal-800">
                <h4 className="font-semibold text-teal-700 dark:text-teal-400 mb-2">
                  💡 Tips for Analyzing Resource Changes
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Check binding status:</span> Only binding constraints have shadow prices</li>
                  <li><span className="font-medium">Use shadow prices:</span> ΔZ = Shadow Price × ΔRHS (within allowable range)</li>
                  <li><span className="font-medium">Track optimal point:</span> The new optimal point moves along the other binding constraint</li>
                  <li><span className="font-medium">Consider allowable range:</span> Shadow prices are only valid within certain limits</li>
                  <li><span className="font-medium">Visualize the change:</span> Graph how the constraint line shifts</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Changing Resource Constraints FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Effect of Changing a Resource Constraint"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic73_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Understanding how resource changes affect the optimal solution is one of the most practical skills in LP. In my consulting work, this is often the first question clients ask: 'What if we get more of Resource X?' The beauty of LP is that we can answer this question precisely using shadow prices. I emphasize to students that shadow prices are not just abstract numbers - they represent real economic value. When a manager asks about investing in new equipment or hiring more staff, the shadow price tells them exactly how much that investment would be worth. This transforms LP from a mathematical exercise into a powerful decision-making tool." />
        </div>
      </div>
    </div>
  );
};

export default Topic73;