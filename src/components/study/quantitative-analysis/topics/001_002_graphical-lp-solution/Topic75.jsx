import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic75_files/topic75_questions';
import noteText from './topic75_files/topic75_note.txt?raw';

const Topic75 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);
  const [shiftDirection, setShiftDirection] = useState('outward');

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Examples for shifting constraint lines
  const examples = [
    {
      title: 'Example 1: Shifting a Binding Constraint Outward',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\nx + y ≤ 10 (Constraint A)\n2x + y ≤ 16 (Constraint B)\nx, y ≥ 0\nOriginal Optimal: (6, 4) with Z = 26',
      shifts: [
        {
          direction: 'Outward',
          constraint: 'Constraint A: x + y ≤ 10 → x + y ≤ 14',
          newOptimal: '(8, 6) with Z = 36',
          effect: 'Feasible region expands. New optimal point moves along Constraint B. Z increases.',
          shadowPrice: 2
        },
        {
          direction: 'Outward',
          constraint: 'Constraint B: 2x + y ≤ 16 → 2x + y ≤ 20',
          newOptimal: '(6, 8) with Z = 34',
          effect: 'Feasible region expands. New optimal point moves along Constraint A. Z increases.',
          shadowPrice: 1
        }
      ]
    },
    {
      title: 'Example 2: Shifting a Binding Constraint Inward',
      problem: 'Maximize Z = 4x + 3y\nSubject to:\n2x + y ≤ 20 (Constraint A)\nx + 2y ≤ 18 (Constraint B)\nx, y ≥ 0\nOriginal Optimal: (7.33, 5.33) with Z = 45.33',
      shifts: [
        {
          direction: 'Inward',
          constraint: 'Constraint A: 2x + y ≤ 20 → 2x + y ≤ 16',
          newOptimal: '(6.67, 2.67) with Z = 34.67',
          effect: 'Feasible region shrinks. New optimal point moves along Constraint B. Z decreases.',
          shadowPrice: 1.33
        },
        {
          direction: 'Inward',
          constraint: 'Constraint B: x + 2y ≤ 18 → x + 2y ≤ 14',
          newOptimal: '(6, 4) with Z = 36',
          effect: 'Feasible region shrinks. New optimal point moves along Constraint A. Z decreases.',
          shadowPrice: 2.67
        }
      ]
    },
    {
      title: 'Example 3: Shifting a Non-Binding Constraint',
      problem: 'Maximize Z = 5x + 7y\nSubject to:\n3x + 2y ≤ 30 (Constraint A)\n2x + 4y ≤ 32 (Constraint B)\nx + y ≤ 12 (Constraint C)\nx, y ≥ 0\nOriginal Optimal: (4, 6) with Z = 62',
      shifts: [
        {
          direction: 'Inward',
          constraint: 'Constraint C: x + y ≤ 12 → x + y ≤ 10',
          newOptimal: '(4, 6) with Z = 62',
          effect: 'No effect on optimal solution. Constraint C remains non-binding with slack.',
          shadowPrice: 0
        },
        {
          direction: 'Inward',
          constraint: 'Constraint C: x + y ≤ 12 → x + y ≤ 8',
          newOptimal: '(4, 4) with Z = 48',
          effect: 'Constraint C becomes binding. Optimal solution changes to intersection of Constraint A and C.',
          shadowPrice: 0
        }
      ]
    },
    {
      title: 'Example 4: Multiple Constraint Shifts',
      problem: 'Maximize Z = 6x + 4y\nSubject to:\n2x + 3y ≤ 24 (Resource A)\n4x + y ≤ 20 (Resource B)\nx, y ≥ 0\nOriginal Optimal: (3, 4) with Z = 34',
      shifts: [
        {
          direction: 'Outward',
          constraint: 'Resource A: 2x + 3y ≤ 24 → 2x + 3y ≤ 30',
          newOptimal: '(4.5, 5) with Z = 47',
          effect: 'Expanding Resource A allows more production of both products. Z increases significantly.',
          shadowPrice: 0.8
        },
        {
          direction: 'Outward',
          constraint: 'Resource B: 4x + y ≤ 20 → 4x + y ≤ 26',
          newOptimal: '(4.5, 5.33) with Z = 48.67',
          effect: 'Expanding Resource B is more valuable. Z increases more than with Resource A expansion.',
          shadowPrice: 1.2
        }
      ]
    },
    {
      title: 'Example 5: Real-World Constraint Shifts',
      problem: 'A factory produces chairs and tables:\nMaximize Z = 8x + 6y (Profit in ₹)\nSubject to:\n4x + 3y ≤ 48 (Labor hours)\n2x + 5y ≤ 40 (Machine hours)\n3x + 2y ≤ 36 (Material units)\nx, y ≥ 0\nOriginal Optimal: (6, 4) with Z = 72',
      shifts: [
        {
          direction: 'Outward',
          constraint: 'Labor: 4x + 3y ≤ 48 → 4x + 3y ≤ 52',
          newOptimal: '(6.67, 4.67) with Z = 81.33',
          effect: 'Adding 4 labor hours increases profit by ₹9.33. Labor is the most valuable resource.',
          shadowPrice: 2.25
        },
        {
          direction: 'Outward',
          constraint: 'Machine: 2x + 5y ≤ 40 → 2x + 5y ≤ 44',
          newOptimal: '(6.4, 5.2) with Z = 82.4',
          effect: 'Adding 4 machine hours increases profit by ₹10.4. Machine hours are also valuable.',
          shadowPrice: 0.75
        },
        {
          direction: 'Outward',
          constraint: 'Material: 3x + 2y ≤ 36 → 3x + 2y ≤ 40',
          newOptimal: '(6.67, 4.67) with Z = 81.33',
          effect: 'Adding 4 material units increases profit by ₹9.33. Material has the same effect as labor.',
          shadowPrice: 0.67
        }
      ]
    }
  ];

  // Key concepts about shifting constraint lines
  const keyConcepts = [
    {
      title: 'Definition',
      description: 'Shifting a constraint line means changing its RHS value, moving the line parallel to itself. This expands or shrinks the feasible region.'
    },
    {
      title: 'Outward Shift (Relaxation)',
      description: 'Increasing RHS for ≤ constraints moves the line outward, expanding the feasible region. This can increase the optimal objective value.'
    },
    {
      title: 'Inward Shift (Tightening)',
      description: 'Decreasing RHS for ≤ constraints moves the line inward, shrinking the feasible region. This can decrease the optimal objective value.'
    },
    {
      title: 'Effect on Optimal Solution',
      description: 'The optimal solution moves along the other binding constraints when a constraint shifts. The shadow price determines the rate of change in Z.'
    }
  ];

  // Types of constraint shifts
  const types = [
    {
      type: 'Outward Shift (Relax)',
      description: 'Increase RHS, move line outward, expand feasible region, Z increases (for maximization)',
      icon: '📈'
    },
    {
      type: 'Inward Shift (Tighten)',
      description: 'Decrease RHS, move line inward, shrink feasible region, Z decreases (for maximization)',
      icon: '📉'
    },
    {
      type: 'Binding Constraint Shift',
      description: 'Optimal point moves along other binding constraints. Shadow price determines effect.',
      icon: '🔗'
    },
    {
      type: 'Non-Binding Constraint Shift',
      description: 'No effect on optimal solution until constraint becomes binding. Slack absorbs the change.',
      icon: '➖'
    }
  ];

  // Steps to analyze constraint shifts
  const analysisSteps = [
    {
      title: 'Step 1: Identify Binding Status',
      description: 'Determine if the constraint is binding or non-binding at the optimal solution.',
      icon: '🔍'
    },
    {
      title: 'Step 2: Determine Shift Direction',
      description: 'Is the constraint moving outward (relax) or inward (tighten)?',
      icon: '↕️'
    },
    {
      title: 'Step 3: Calculate Shadow Price',
      description: 'For binding constraints, find the shadow price to determine Z change.',
      icon: '💰'
    },
    {
      title: 'Step 4: Find New Optimal Point',
      description: 'Solve the new system of equations with the shifted constraint.',
      icon: '📐'
    },
    {
      title: 'Step 5: Interpret Results',
      description: 'Translate the effect of the shift into business insights.',
      icon: '💡'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Confusing Outward and Inward Shifts',
      explanation: 'Outward shift (increase RHS) expands the region; inward shift (decrease RHS) shrinks it. For ≤ constraints, increasing RHS moves the line outward.'
    },
    {
      mistake: 'Applying Shadow Prices to Non-Binding Constraints',
      explanation: 'Non-binding constraints have zero shadow price. Shifting them doesn\'t affect Z until they become binding.'
    },
    {
      mistake: 'Misidentifying the New Optimal Point',
      explanation: 'The new optimal point moves along the other binding constraints, not independently.'
    },
    {
      mistake: 'Ignoring the Allowable Range',
      explanation: 'Shadow prices are only valid within the allowable range. Beyond that, the basis changes.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Check Binding Status First',
      description: 'Always determine if the constraint is binding before analyzing the shift.'
    },
    {
      practice: 'Calculate Shadow Prices',
      description: 'For binding constraints, shadow prices tell you the value of shifting the constraint.'
    },
    {
      practice: 'Consider the Allowable Range',
      description: 'Ensure the shift is within the allowable range for the shadow price to be valid.'
    },
    {
      practice: 'Use Graphical Visualization',
      description: 'Graph the constraint shift to visualize how the feasible region and optimal solution change.'
    }
  ];

  // Visualization component for constraint shifts
  const ShiftVisualization = ({ exampleIndex, direction }) => {
    const example = examples[exampleIndex];
    if (!example) return null;

    // Find shifts in the given direction
    const shifts = example.shifts.filter(s => 
      direction === 'outward' ? s.direction === 'Outward' : 
      direction === 'inward' ? s.direction === 'Inward' : true
    );
    
    const shift = shifts[0] || example.shifts[0];

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
                
                {/* Shifted constraint */}
                {direction === 'outward' ? (
                  <line x1="50" y1="370" x2="450" y2="70" stroke="#FFE66D" strokeWidth="3">
                    <animate attributeName="stroke-dashoffset" values="0;50" dur="2s" repeatCount="indefinite" />
                  </line>
                ) : (
                  <line x1="50" y1="420" x2="450" y2="130" stroke="#FFE66D" strokeWidth="3">
                    <animate attributeName="stroke-dashoffset" values="0;50" dur="2s" repeatCount="indefinite" />
                  </line>
                )}
                <text x="400" y={direction === 'outward' ? 65 : 125} fontSize="10" fill="#FFE66D" className="dark:fill-yellow-400">Shifted</text>
                
                {/* Feasible region (original) */}
                <polygon points="50,400 50,350 350,150 450,100 450,400" fill="rgba(78, 205, 196, 0.1)" stroke="none"/>
                
                {/* Feasible region (new) */}
                {direction === 'outward' ? (
                  <polygon points="50,400 50,370 350,150 450,70 450,400" fill="rgba(255, 230, 109, 0.1)" stroke="none"/>
                ) : (
                  <polygon points="50,400 50,420 350,150 450,130 450,400" fill="rgba(255, 230, 109, 0.1)" stroke="none"/>
                )}
                
                {/* Arrow showing shift direction */}
                {direction === 'outward' ? (
                  <path d="M 250 250 L 270 230" stroke="#FF8A5C" strokeWidth="2" fill="none" markerEnd="url(#arrow)">
                    <animate attributeName="d" values="M 250 250 L 270 230;M 250 250 L 280 220;M 250 250 L 270 230" dur="2s" repeatCount="indefinite" />
                  </path>
                ) : (
                  <path d="M 250 250 L 230 270" stroke="#FF8A5C" strokeWidth="2" fill="none" markerEnd="url(#arrow)">
                    <animate attributeName="d" values="M 250 250 L 230 270;M 250 250 L 220 280;M 250 250 L 230 270" dur="2s" repeatCount="indefinite" />
                  </path>
                )}
                <text x="275" y="220" fontSize="10" fill="#FF8A5C" className="dark:fill-orange-300">
                  {direction === 'outward' ? '→ Expand' : '← Shrink'}
                </text>
                <defs>
                  <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                    <path d="M 0 0 L 8 4 L 0 8 z" fill="#FF8A5C"/>
                  </marker>
                </defs>
                
                {/* Original optimal point */}
                <circle cx="250" cy="250" r="8" fill="#FF4757" stroke="white" strokeWidth="2"/>
                <text x="250" y="240" textAnchor="middle" fontSize="10" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                
                {/* New optimal point */}
                {direction === 'outward' ? (
                  <circle cx="280" cy="220" r="8" fill="#FFE66D" stroke="white" strokeWidth="2">
                    <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                  </circle>
                ) : (
                  <circle cx="220" cy="280" r="8" fill="#FFE66D" stroke="white" strokeWidth="2">
                    <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <text x={direction === 'outward' ? 280 : 220} y={direction === 'outward' ? 210 : 290} textAnchor="middle" fontSize="10" fill="#FFE66D" className="dark:fill-yellow-400">New</text>
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="220" height="90" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="2" strokeDasharray="4,4"/>
                  <text x="35" y="34" fontSize="10" fill="#555" className="dark:fill-gray-400">Original Constraints</text>
                  <line x1="10" y1="50" x2="30" y2="50" stroke="#FFE66D" strokeWidth="3"/>
                  <text x="35" y="54" fontSize="10" fill="#555" className="dark:fill-gray-400">Shifted Constraint</text>
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
                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Constraint Shift</h5>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {shift.constraint}
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">New Optimal Solution</h5>
                <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {shift.newOptimal}
                </p>
                {shift.shadowPrice !== undefined && (
                  <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Shadow Price: {shift.shadowPrice}
                  </div>
                )}
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Effect</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {shift.effect}
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Key Insight</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  {direction === 'outward' 
                    ? 'Outward shifts expand the feasible region and increase Z (for maximization).' 
                    : 'Inward shifts shrink the feasible region and decrease Z (for maximization).'}
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
            Effect of Shifting a Constraint Line
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how moving constraint lines (changing RHS values) affects the feasible region 
            and optimal solution in linear programming problems.
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
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-200 dark:shadow-cyan-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Shift Direction Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button
            onClick={() => setShiftDirection('outward')}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
              shiftDirection === 'outward'
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-200 dark:shadow-cyan-900/30"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            )}
          >
            Outward Shift (Relax)
          </button>
          <button
            onClick={() => setShiftDirection('inward')}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
              shiftDirection === 'inward'
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-200 dark:shadow-cyan-900/30"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            )}
          >
            Inward Shift (Tighten)
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
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-cyan-500"
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

              {/* Types of Constraint Shifts */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Types of Constraint Shifts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {types.map((type, index) => (
                    <div
                      key={`type-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="text-4xl mb-2">{type.icon}</div>
                      <h4 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-2 text-sm">
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
                  Steps to Analyze Constraint Shifts
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
                    <p className="font-bold text-cyan-600 dark:text-cyan-400">Constraint Line Equation:</p>
                    <p className="ml-4">a₁x + a₂y = b</p>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-green-600 dark:text-green-400">Outward Shift (Relax):</p>
                      <p className="ml-4">b → b + Δb (Δb &gt; 0)</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">Feasible region expands</p>
                    </div>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-red-600 dark:text-red-400">Inward Shift (Tighten):</p>
                      <p className="ml-4">b → b - Δb (Δb &gt; 0)</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">Feasible region shrinks</p>
                    </div>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-blue-600 dark:text-blue-400">Effect on Optimal Z:</p>
                      <p className="ml-4">ΔZ = Shadow Price × Δb</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">(Valid within allowable range)</p>
                    </div>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-purple-600 dark:text-purple-400">New Optimal Point:</p>
                      <p className="ml-4">Moves along the other binding constraint(s)</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">Found by solving new system of equations</p>
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
                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-200 dark:shadow-cyan-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    Example {index + 1}
                  </button>
                ))}
              </div>

              {/* Example Visualization */}
              <ShiftVisualization 
                exampleIndex={selectedExample} 
                direction={shiftDirection}
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
                        <span className="text-xs px-2 py-1 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400 rounded">
                          Constraint Shifts
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
                  Practice Problems - Constraint Line Shifts
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Predict the Effect
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Consider the optimal solution at (6, 4) with Z = 26:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 3x + 2y
                      Subject to:
                      x + y ≤ 10 (Constraint A, shadow price = 2)
                      2x + y ≤ 16 (Constraint B, shadow price = 1)
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      If Constraint A shifts outward to x + y ≤ 12, what is the new Z value?
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
                      Problem 2: Determine the New Optimal Point
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The optimal solution is at (4, 6) with Z = 62:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 5x + 7y
                      Subject to:
                      3x + 2y ≤ 30 (Constraint A)
                      2x + 4y ≤ 32 (Constraint B)
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      If Constraint B shifts inward to 2x + 4y ≤ 28, what is the new optimal point?
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
                      <span className="font-semibold">Hint:</span> The new optimal point moves along Constraint A.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Real-World Resource Decision
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company has these resources:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 8x + 6y (Profit in ₹)
                      Labor: 4x + 3y ≤ 48 (Shadow price: ₹2.25/hour)
                      Machine: 2x + 5y ≤ 40 (Shadow price: ₹0.75/hour)
                      Material: 3x + 2y ≤ 36 (Shadow price: ₹0.67/unit)
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The company can increase one resource by 4 units. Which resource should they expand, and what will be the profit increase?
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
                      <span className="font-semibold">Hint:</span> Compare shadow prices to determine which resource is most valuable.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6 border border-cyan-200 dark:border-cyan-800">
                <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-2">
                  💡 Tips for Analyzing Constraint Shifts
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Identify binding status:</span> Only binding constraints affect the optimal solution</li>
                  <li><span className="font-medium">Use shadow prices:</span> ΔZ = Shadow Price × ΔRHS (within allowable range)</li>
                  <li><span className="font-medium">Track the optimal point:</span> The new optimal point moves along the other binding constraints</li>
                  <li><span className="font-medium">Check the allowable range:</span> Shadow prices are only valid within certain limits</li>
                  <li><span className="font-medium">Visualize the shift:</span> Graph how the constraint line moves and how the region changes</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Constraint Line Shifts FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Effect of Shifting a Constraint Line"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic75_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Shifting constraint lines is the graphical equivalent of changing resource availability. I tell my students that this is like moving the walls of a room - outward shifts give you more space (more resources), inward shifts give you less. The key insight is that the optimal solution moves along the other walls (constraints) and the rate of change is given by the shadow price. In my consulting experience, this is one of the most intuitive ways to explain sensitivity analysis to managers. When they see a constraint line moving on a graph, they immediately understand what it means for their business." />
        </div>
      </div>
    </div>
  );
};

export default Topic75;