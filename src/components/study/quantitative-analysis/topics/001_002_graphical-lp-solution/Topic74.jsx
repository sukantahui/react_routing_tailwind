import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic74_files/topic74_questions';
import noteText from './topic74_files/topic74_note.txt?raw';

const Topic74 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedCoefficient, setSelectedCoefficient] = useState('c1');

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Examples for objective coefficient changes
  const examples = [
    {
      title: 'Example 1: Changing c₁ (Coefficient of x)',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\nx + y ≤ 10\n2x + y ≤ 16\nx, y ≥ 0\nOriginal Optimal: (6, 4) with Z = 26',
      coefficientChanges: [
        {
          coefficient: 'c₁ (coefficient of x)',
          originalValue: 3,
          newValue: 5,
          newOptimal: '(6, 4) with Z = 38',
          slopeChange: 'Original slope: -3/2 = -1.5, New slope: -5/2 = -2.5',
          interpretation: 'Increasing c₁ makes x more profitable. The optimal solution remains at (6, 4) as long as the slope stays between the constraint slopes (-2 to -1).'
        },
        {
          coefficient: 'c₁ (coefficient of x)',
          originalValue: 3,
          newValue: 1,
          newOptimal: '(0, 10) with Z = 20',
          slopeChange: 'Original slope: -3/2 = -1.5, New slope: -1/2 = -0.5',
          interpretation: 'Decreasing c₁ makes x less profitable. The optimal solution shifts to (0, 10) when c₁ falls below the allowable range.'
        }
      ]
    },
    {
      title: 'Example 2: Changing c₂ (Coefficient of y)',
      problem: 'Maximize Z = 4x + 3y\nSubject to:\n2x + y ≤ 20\nx + 2y ≤ 18\nx, y ≥ 0\nOriginal Optimal: (7.33, 5.33) with Z = 45.33',
      coefficientChanges: [
        {
          coefficient: 'c₂ (coefficient of y)',
          originalValue: 3,
          newValue: 6,
          newOptimal: '(2, 8) with Z = 56',
          slopeChange: 'Original slope: -4/3 = -1.33, New slope: -4/6 = -0.67',
          interpretation: 'Increasing c₂ makes y more profitable. The optimal solution shifts to (2, 8) when c₂ exceeds the allowable range.'
        },
        {
          coefficient: 'c₂ (coefficient of y)',
          originalValue: 3,
          newValue: 1.5,
          newOptimal: '(10, 0) with Z = 40',
          slopeChange: 'Original slope: -4/3 = -1.33, New slope: -4/1.5 = -2.67',
          interpretation: 'Decreasing c₂ makes y less profitable. The optimal solution shifts to producing only x.'
        }
      ]
    },
    {
      title: 'Example 3: Both Coefficients Changing',
      problem: 'Maximize Z = 5x + 7y\nSubject to:\n3x + 2y ≤ 30\n2x + 4y ≤ 32\nx, y ≥ 0\nOriginal Optimal: (4, 6) with Z = 62',
      coefficientChanges: [
        {
          coefficient: 'Both c₁ and c₂',
          originalValue: 'c₁ = 5, c₂ = 7',
          newValue: 'c₁ = 6, c₂ = 7',
          newOptimal: '(4, 6) with Z = 66',
          slopeChange: 'Original slope: -5/7 = -0.714, New slope: -6/7 = -0.857',
          interpretation: 'Both changes keep the slope within the allowable range, so the optimal solution remains at (4, 6).'
        },
        {
          coefficient: 'Both c₁ and c₂',
          originalValue: 'c₁ = 5, c₂ = 7',
          newValue: 'c₁ = 10, c₂ = 7',
          newOptimal: '(8, 3) with Z = 101',
          slopeChange: 'Original slope: -5/7 = -0.714, New slope: -10/7 = -1.429',
          interpretation: 'When c₁ increases enough, the optimal solution shifts to a different corner point.'
        }
      ]
    },
    {
      title: 'Example 4: Real-World Price Changes',
      problem: 'A company sells two products:\nMaximize Z = 8x + 6y (Profit in ₹)\nSubject to:\n4x + 3y ≤ 48 (Labor)\n2x + 5y ≤ 40 (Machine)\n3x + 2y ≤ 36 (Material)\nx, y ≥ 0\nOriginal Optimal: (6, 4) with Z = 72',
      coefficientChanges: [
        {
          coefficient: 'c₁ (Product A price)',
          originalValue: 8,
          newValue: 12,
          newOptimal: '(6, 4) with Z = 96',
          slopeChange: 'Original slope: -8/6 = -1.33, New slope: -12/6 = -2',
          interpretation: 'Price increase of Product A by 50% increases profit. The optimal product mix remains the same.'
        },
        {
          coefficient: 'c₂ (Product B price)',
          originalValue: 6,
          newValue: 10,
          newOptimal: '(4, 6) with Z = 92',
          slopeChange: 'Original slope: -8/6 = -1.33, New slope: -8/10 = -0.8',
          interpretation: 'Price increase of Product B changes the optimal mix to produce more of Product B.'
        }
      ]
    },
    {
      title: 'Example 5: Profit Margin Changes',
      problem: 'A factory produces chairs and tables:\nMaximize Z = 5x + 8y (Profit in ₹)\nSubject to:\n3x + 2y ≤ 24\n2x + 4y ≤ 32\nx, y ≥ 0\nOriginal Optimal: (4, 6) with Z = 68',
      coefficientChanges: [
        {
          coefficient: 'c₁ (Chair profit)',
          originalValue: 5,
          newValue: 3,
          newOptimal: '(0, 8) with Z = 64',
          slopeChange: 'Original slope: -5/8 = -0.625, New slope: -3/8 = -0.375',
          interpretation: 'When chair profit decreases, it becomes optimal to produce only tables.'
        },
        {
          coefficient: 'c₂ (Table profit)',
          originalValue: 8,
          newValue: 4,
          newOptimal: '(8, 0) with Z = 40',
          slopeChange: 'Original slope: -5/8 = -0.625, New slope: -5/4 = -1.25',
          interpretation: 'When table profit decreases, it becomes optimal to produce only chairs.'
        }
      ]
    }
  ];

  // Key concepts about objective coefficient changes
  const keyConcepts = [
    {
      title: 'Definition',
      description: 'Changing objective-function coefficients means altering the values of c₁ and c₂ in Z = c₁x + c₂y. This changes the slope of the objective function line.'
    },
    {
      title: 'Slope Interpretation',
      description: 'The slope of the objective function is -c₁/c₂. Changes in coefficients rotate the objective function line around the origin.'
    },
    {
      title: 'Effect on Optimal Solution',
      description: 'As long as the slope remains between the slopes of the binding constraints, the optimal corner point stays the same. Beyond that, a different corner point becomes optimal.'
    },
    {
      title: 'Practical Significance',
      description: 'Objective coefficient changes represent price changes, cost changes, or changes in profit margins. Understanding these effects helps in pricing and product mix decisions.'
    }
  ];

  // Types of coefficient changes
  const types = [
    {
      type: 'Increasing c₁ (x coefficient)',
      description: 'Makes x more profitable. Objective line becomes steeper. May shift optimal point to produce more x.',
      icon: '📈'
    },
    {
      type: 'Decreasing c₁ (x coefficient)',
      description: 'Makes x less profitable. Objective line becomes flatter. May shift optimal point to produce less x.',
      icon: '📉'
    },
    {
      type: 'Increasing c₂ (y coefficient)',
      description: 'Makes y more profitable. Objective line becomes flatter. May shift optimal point to produce more y.',
      icon: '📈'
    },
    {
      type: 'Decreasing c₂ (y coefficient)',
      description: 'Makes y less profitable. Objective line becomes steeper. May shift optimal point to produce less y.',
      icon: '📉'
    }
  ];

  // Steps to analyze coefficient changes
  const analysisSteps = [
    {
      title: 'Step 1: Identify Current Slope',
      description: 'Calculate the current slope of the objective function: -c₁/c₂.',
      icon: '📐'
    },
    {
      title: 'Step 2: Find Constraint Slopes',
      description: 'Calculate the slopes of the binding constraints that form the optimal corner.',
      icon: '📏'
    },
    {
      title: 'Step 3: Determine Allowable Range',
      description: 'The objective slope must stay between the constraint slopes for the current optimal point to remain optimal.',
      icon: '📊'
    },
    {
      title: 'Step 4: Analyze the Change',
      description: 'If the new slope is within the allowable range, the optimal point stays the same. If not, find the new optimal corner.',
      icon: '🔍'
    },
    {
      title: 'Step 5: Interpret Results',
      description: 'Translate the effect of coefficient changes into business decisions.',
      icon: '💡'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Confusing Coefficient Changes with RHS Changes',
      explanation: 'Coefficient changes rotate the objective line; RHS changes shift constraint lines. They have different effects.'
    },
    {
      mistake: 'Ignoring the Slope Range',
      explanation: 'The optimal solution only changes when the objective slope goes outside the range of constraint slopes.'
    },
    {
      mistake: 'Misinterpreting the Direction',
      explanation: 'Increasing c₁ makes the line steeper (more negative slope). Decreasing c₁ makes it flatter.'
    },
    {
      mistake: 'Forgetting the Denominator',
      explanation: 'The slope is -c₁/c₂, not -c₁ or -c₂ alone. Both coefficients matter.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Calculate the Slope Range First',
      description: 'Always determine the allowable range for the objective slope before analyzing coefficient changes.'
    },
    {
      practice: 'Consider Both Coefficients',
      description: 'Changes in c₁ and c₂ both affect the slope. Consider the ratio c₁/c₂, not individual values.'
    },
    {
      practice: 'Use Graphical Visualization',
      description: 'Graph the objective function with different slopes to see how the optimal point changes.'
    },
    {
      practice: 'Check for Multiple Optima',
      description: 'If the objective slope equals a constraint slope, there may be multiple optimal solutions.'
    }
  ];

  // Visualization component for coefficient changes
  const CoefficientVisualization = ({ exampleIndex, coefficient }) => {
    const example = examples[exampleIndex];
    if (!example) return null;

    // Find the relevant coefficient change
    const changes = example.coefficientChanges.filter(c => 
      coefficient === 'c1' ? c.coefficient.includes('c₁') : 
      coefficient === 'c2' ? c.coefficient.includes('c₂') : 
      c.coefficient.includes('Both')
    );
    
    const change = changes[0] || example.coefficientChanges[0];

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
                <line x1="50" y1="400" x2="450" y2="100" stroke="#FF6B6B" strokeWidth="2"/>
                <text x="400" y="95" fontSize="10" fill="#FF6B6B" className="dark:fill-red-400">Constraint 1</text>
                
                <line x1="50" y1="350" x2="450" y2="50" stroke="#4ECDC4" strokeWidth="2"/>
                <text x="400" y="45" fontSize="10" fill="#4ECDC4" className="dark:fill-green-400">Constraint 2</text>
                
                {/* Feasible region */}
                <polygon points="50,400 50,350 350,150 450,100 450,400" fill="rgba(78, 205, 196, 0.1)" stroke="none"/>
                
                {/* Original objective line */}
                <line x1="80" y1="380" x2="400" y2="150" stroke="#FFE66D" strokeWidth="2" strokeDasharray="6,3">
                  <animate attributeName="stroke-dashoffset" values="0;50" dur="3s" repeatCount="indefinite" />
                </line>
                <text x="400" y="145" fontSize="10" fill="#FFE66D" className="dark:fill-yellow-400">Original Z</text>
                
                {/* New objective line (rotated) */}
                {coefficient === 'c1' && (
                  <line x1="80" y1="400" x2="400" y2="100" stroke="#FF8A5C" strokeWidth="2">
                    <animate attributeName="stroke-dashoffset" values="0;50" dur="2s" repeatCount="indefinite" />
                  </line>
                )}
                {coefficient === 'c2' && (
                  <line x1="100" y1="380" x2="420" y2="180" stroke="#FF8A5C" strokeWidth="2">
                    <animate attributeName="stroke-dashoffset" values="0;50" dur="2s" repeatCount="indefinite" />
                  </line>
                )}
                {coefficient === 'both' && (
                  <line x1="60" y1="390" x2="380" y2="120" stroke="#FF8A5C" strokeWidth="2">
                    <animate attributeName="stroke-dashoffset" values="0;50" dur="2s" repeatCount="indefinite" />
                  </line>
                )}
                <text x="400" y="95" fontSize="10" fill="#FF8A5C" className="dark:fill-orange-400">New Z</text>
                
                {/* Arrow showing rotation */}
                <path d="M 250 250 Q 260 230 270 210" stroke="#FF8A5C" strokeWidth="2" fill="none" markerEnd="url(#arrow)">
                  <animate attributeName="d" values="M 250 250 Q 260 230 270 210;M 250 250 Q 265 225 280 200;M 250 250 Q 260 230 270 210" dur="2s" repeatCount="indefinite" />
                </path>
                <text x="270" y="200" fontSize="10" fill="#FF8A5C" className="dark:fill-orange-300">Rotate</text>
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M 0 0 L 8 4 L 0 8 z" fill="#FF8A5C"/>
                  </marker>
                </defs>
                
                {/* Optimal point */}
                <circle cx="250" cy="250" r="8" fill="#FF4757" stroke="white" strokeWidth="2">
                  <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="250" y="240" textAnchor="middle" fontSize="10" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="220" height="90" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="2"/>
                  <text x="35" y="34" fontSize="10" fill="#555" className="dark:fill-gray-400">Constraints</text>
                  <line x1="10" y1="50" x2="30" y2="50" stroke="#FFE66D" strokeWidth="2" strokeDasharray="6,3"/>
                  <text x="35" y="54" fontSize="10" fill="#555" className="dark:fill-gray-400">Original Objective</text>
                  <line x1="10" y1="70" x2="30" y2="70" stroke="#FF8A5C" strokeWidth="2"/>
                  <text x="35" y="74" fontSize="10" fill="#555" className="dark:fill-gray-400">New Objective</text>
                </g>
              </svg>
            </div>
            
            {/* Details Panel */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Coefficient Change</h5>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {change.coefficient}
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <span className="text-gray-500 dark:text-gray-400">Original Value:</span>
                    <span className="font-bold text-gray-700 dark:text-gray-300 ml-1">{change.originalValue}</span>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-2 rounded">
                    <span className="text-gray-500 dark:text-gray-400">New Value:</span>
                    <span className="font-bold text-gray-700 dark:text-gray-300 ml-1">{change.newValue}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">New Optimal Solution</h5>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {change.newOptimal}
                </p>
                <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                  {change.slopeChange}
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
                  The objective function line rotates when coefficients change. 
                  The optimal solution changes when the rotation moves the line 
                  past a constraint intersection.
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
            Effect of Changing Objective-Function Coefficients
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how changes in objective function coefficients affect the optimal solution, 
            and how to use this understanding for pricing and product mix decisions.
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
                  ? "bg-amber-500 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Coefficient Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button
            onClick={() => setSelectedCoefficient('c1')}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
              selectedCoefficient === 'c1'
                ? "bg-amber-500 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/30"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            )}
          >
            Change c₁ (x coefficient)
          </button>
          <button
            onClick={() => setSelectedCoefficient('c2')}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
              selectedCoefficient === 'c2'
                ? "bg-amber-500 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/30"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            )}
          >
            Change c₂ (y coefficient)
          </button>
          <button
            onClick={() => setSelectedCoefficient('both')}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
              selectedCoefficient === 'both'
                ? "bg-amber-500 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/30"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            )}
          >
            Change Both
          </button>
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
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-amber-500"
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

              {/* Types of Coefficient Changes */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Types of Coefficient Changes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {types.map((type, index) => (
                    <div
                      key={`type-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="text-4xl mb-2">{type.icon}</div>
                      <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2 text-sm">
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
                  Steps to Analyze Coefficient Changes
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
                    <p className="font-bold text-amber-600 dark:text-amber-400">Objective Function:</p>
                    <p className="ml-4">Z = c₁x + c₂y</p>
                    <p className="ml-4">Slope = -c₁/c₂</p>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-green-600 dark:text-green-400">Binding Constraint Slopes:</p>
                      <p className="ml-4">Constraint 1: a₁x + a₂y ≤ b₁ → Slope = -a₁/a₂</p>
                      <p className="ml-4">Constraint 2: a₁'x + a₂'y ≤ b₂ → Slope = -a₁'/a₂'</p>
                    </div>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-blue-600 dark:text-blue-400">Allowable Range Condition:</p>
                      <p className="ml-4">Constraint₁_slope ≤ Objective_slope ≤ Constraint₂_slope</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">(For maximization with two binding constraints)</p>
                    </div>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-purple-600 dark:text-purple-400">Change in Optimal Solution:</p>
                      <p className="ml-4">If slope remains in range → Same corner point</p>
                      <p className="ml-4">If slope exits range → New corner point becomes optimal</p>
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
                        ? "bg-amber-500 text-white shadow-lg shadow-amber-200 dark:shadow-amber-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    Example {index + 1}
                  </button>
                ))}
              </div>

              {/* Example Visualization */}
              <CoefficientVisualization 
                exampleIndex={selectedExample} 
                coefficient={selectedCoefficient}
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
                        <span className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded">
                          Coefficient Changes
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
                  Practice Problems - Coefficient Changes
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Determine the Effect
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      For the optimal solution at (4, 6) with Z = 62:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 5x + 7y
                      Subject to:
                      3x + 2y ≤ 30
                      2x + 4y ≤ 32
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      If c₁ increases to 8, what happens to the optimal solution?
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
                      <span className="font-semibold">Hint:</span> Calculate the new slope and compare with constraint slopes.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Find the Allowable Range
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      For the optimal solution:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 4x + 5y
                      Subject to:
                      x + y ≤ 8
                      2x + y ≤ 12
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      What is the allowable range for c₁ (coefficient of x)?
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
                      <span className="font-semibold">Hint:</span> The objective slope must stay between the constraint slopes.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Real-World Pricing Decision
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company sells two products with profit margins:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 6x + 4y (Profit in ₹)
                      Labor: 2x + 3y ≤ 24 hours
                      Machine: 4x + y ≤ 20 hours
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The company is considering increasing the price of Product X. 
                      How much can they increase c₁ before the optimal product mix changes?
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
                      <span className="font-semibold">Hint:</span> Find the slope range and solve for the maximum c₁.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-6 border border-amber-200 dark:border-amber-800">
                <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">
                  💡 Tips for Analyzing Coefficient Changes
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Calculate the slope:</span> The objective slope is -c₁/c₂</li>
                  <li><span className="font-medium">Find constraint slopes:</span> Binding constraints determine the allowable range</li>
                  <li><span className="font-medium">Check the range:</span> If slope stays within range, optimal point stays the same</li>
                  <li><span className="font-medium">Visualize rotation:</span> Coefficient changes rotate the objective line</li>
                  <li><span className="font-medium">Consider business impact:</span> Price changes affect optimal product mix</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Objective Coefficient Changes FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Effect of Changing Objective-Function Coefficients"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic74_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Understanding objective coefficient changes is crucial for pricing decisions. In my consulting work, I've helped companies optimize their product mix based on changing profit margins. The key insight is that the optimal mix only changes when price changes are significant enough to rotate the objective line past a constraint intersection. I tell my students that this is why small price changes often don't change what you produce - the 'slope range' provides a buffer. This understanding helps managers make informed decisions about pricing and product mix without constantly re-solving the optimization problem." />
        </div>
      </div>
    </div>
  );
};

export default Topic74;