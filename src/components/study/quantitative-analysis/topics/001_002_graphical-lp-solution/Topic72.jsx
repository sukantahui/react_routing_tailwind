import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic72_files/topic72_questions';
import noteText from './topic72_files/topic72_note.txt?raw';

const Topic72 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);
  const [selectedAspect, setSelectedAspect] = useState('slope');

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  const sensitivityAspects = [
    { id: 'slope', label: 'Objective Slope Changes' },
    { id: 'rhs', label: 'RHS Changes' },
    { id: 'shadow', label: 'Shadow Prices' },
    { id: 'range', label: 'Allowable Ranges' },
  ];

  // Examples for sensitivity interpretation
  const examples = [
    {
      title: 'Example 1: Objective Coefficient Sensitivity',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\nx + y ≤ 10\n2x + y ≤ 16\nx, y ≥ 0\nOptimal: (6, 4) with Z = 26',
      sensitivityAnalysis: [
        'Current objective: Z = 3x + 2y',
        'Slope of objective: -3/2 = -1.5',
        'Constraint 1 slope: -1',
        'Constraint 2 slope: -2',
        'Allowable range for c₁ (coefficient of x): 1 ≤ c₁ ≤ 4',
        'Allowable range for c₂ (coefficient of y): 1.5 ≤ c₂ ≤ 6',
        'Current c₁ = 3, c₂ = 2'
      ],
      interpretation: 'The optimal solution (6, 4) remains optimal as long as the objective slope stays between -2 and -1. Small changes in coefficients won\'t change the optimal point.'
    },
    {
      title: 'Example 2: RHS Sensitivity',
      problem: 'Maximize Z = 4x + 3y\nSubject to:\n2x + y ≤ 20\nx + 2y ≤ 18\nx, y ≥ 0\nOptimal: (7.33, 5.33) with Z = 45.33',
      sensitivityAnalysis: [
        'Current RHS for constraint 1: 20',
        'Allowable increase: +2.67 (to 22.67)',
        'Allowable decrease: -8 (to 12)',
        'Current RHS for constraint 2: 18',
        'Allowable increase: +4 (to 22)',
        'Allowable decrease: -5.33 (to 12.67)'
      ],
      interpretation: 'The optimal solution changes but the basis remains optimal within these ranges. Beyond these ranges, a different constraint becomes binding.'
    },
    {
      title: 'Example 3: Shadow Price Interpretation',
      problem: 'Maximize Z = 5x + 7y\nSubject to:\n3x + 2y ≤ 30\n2x + 4y ≤ 32\nx, y ≥ 0\nOptimal: (4, 6) with Z = 62',
      sensitivityAnalysis: [
        'Shadow price for constraint 1: 1.5',
        'Interpretation: Increasing RHS of constraint 1 by 1 unit increases Z by 1.5',
        'Shadow price for constraint 2: 0.25',
        'Interpretation: Increasing RHS of constraint 2 by 1 unit increases Z by 0.25',
        'Both constraints are binding at optimal'
      ],
      interpretation: 'Resource 1 is more valuable (shadow price 1.5) than Resource 2 (shadow price 0.25). Focus expansion on Resource 1.'
    },
    {
      title: 'Example 4: Multiple Shadow Prices',
      problem: 'Maximize Z = 6x + 4y\nSubject to:\n2x + 3y ≤ 24\n4x + y ≤ 20\nx + 2y ≤ 12\nx, y ≥ 0\nOptimal: (3, 4) with Z = 34',
      sensitivityAnalysis: [
        'Shadow price for constraint 1: 0.8',
        'Shadow price for constraint 2: 1.2',
        'Shadow price for constraint 3: 0 (non-binding)',
        'Constraint 3 has slack = 1 unit',
        'Only constraints 1 and 2 are binding'
      ],
      interpretation: 'Resources 1 and 2 are scarce (positive shadow prices). Resource 3 has excess capacity (zero shadow price).'
    },
    {
      title: 'Example 5: Real-World Sensitivity Analysis',
      problem: 'A factory maximizes profit:\nMaximize Z = 8x + 6y (Profit in ₹)\nSubject to:\n4x + 3y ≤ 48 (Labor hours)\n2x + 5y ≤ 40 (Machine hours)\n3x + 2y ≤ 36 (Material)\nx, y ≥ 0\nOptimal: (6, 4) with Z = 72',
      sensitivityAnalysis: [
        'Labor shadow price: ₹2.25 per hour',
        'Machine shadow price: ₹0.75 per hour',
        'Material shadow price: ₹0.67 per unit',
        'Labor allowable increase: +4 hours',
        'Machine allowable increase: +6 hours',
        'Material allowable increase: +3 units'
      ],
      interpretation: 'Labor is the most valuable resource (₹2.25/hour). The company should focus on increasing labor hours first.'
    }
  ];

  // Key concepts about sensitivity interpretation
  const keyConcepts = [
    {
      title: 'Definition',
      description: 'Sensitivity analysis examines how changes in model parameters affect the optimal solution. Graphical interpretation helps visualize these effects.'
    },
    {
      title: 'Objective Coefficient Sensitivity',
      description: 'Shows how much objective coefficients can change before the optimal solution changes. This is determined by the slope of the objective function relative to constraints.'
    },
    {
      title: 'RHS Sensitivity',
      description: 'Shows how much the right-hand side of constraints can change before the optimal basis changes. This determines the allowable range for resource availability.'
    },
    {
      title: 'Shadow Prices',
      description: 'The marginal value of increasing a constraint\'s RHS by one unit. Only binding constraints have positive shadow prices.'
    }
  ];

  // Steps for sensitivity interpretation
  const interpretationSteps = [
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
      title: 'Step 3: Determine Allowable Ranges',
      description: 'Calculate how much parameters can change without changing the optimal basis.',
      icon: '📏'
    },
    {
      title: 'Step 4: Interpret Results',
      description: 'Translate mathematical results into practical business insights.',
      icon: '📊'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Misinterpreting Shadow Prices',
      explanation: 'Shadow prices apply only within the allowable range. Beyond that, the shadow price changes or becomes invalid.'
    },
    {
      mistake: 'Ignoring Allowable Ranges',
      explanation: 'Sensitivity results are only valid within the specified ranges. Outside these ranges, the analysis must be redone.'
    },
    {
      mistake: 'Confusing Shadow Price with Market Price',
      explanation: 'Shadow price is the marginal value to the objective, not the actual market price of the resource.'
    },
    {
      mistake: 'Applying to Non-Binding Constraints',
      explanation: 'Non-binding constraints have zero shadow price. Only binding constraints have positive shadow prices.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Always Check Binding Constraints',
      description: 'Sensitivity analysis only applies to binding constraints. Non-binding constraints have zero shadow prices.'
    },
    {
      practice: 'Document Allowable Ranges',
      description: 'Always report the allowable ranges along with shadow prices for complete understanding.'
    },
    {
      practice: 'Use Graphical Interpretation',
      description: 'Graphs help visualize sensitivity analysis results and make them more intuitive.'
    },
    {
      practice: 'Focus on Scarce Resources',
      description: 'Resources with high shadow prices are the most valuable and should be prioritized for expansion.'
    }
  ];

  // Visualization component for sensitivity interpretation
  const SensitivityVisualization = ({ exampleIndex, aspect }) => {
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
                <line x1="50" y1="400" x2="450" y2="100" stroke="#FF6B6B" strokeWidth="3"/>
                <text x="400" y="95" fontSize="11" fill="#FF6B6B" className="dark:fill-red-400">Constraint 1</text>
                
                <line x1="50" y1="350" x2="450" y2="50" stroke="#4ECDC4" strokeWidth="3"/>
                <text x="400" y="45" fontSize="11" fill="#4ECDC4" className="dark:fill-green-400">Constraint 2</text>
                
                {/* Feasible region */}
                <polygon points="50,400 50,350 300,150 450,100 450,400" fill="rgba(78, 205, 196, 0.15)" stroke="none"/>
                
                {/* Optimal point */}
                <circle cx="250" cy="250" r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                  <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="250" y="240" textAnchor="middle" fontSize="12" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                <text x="250" y="270" textAnchor="middle" fontSize="11" fill="#FF4757" className="dark:fill-red-400">(6, 4)</text>
                
                {/* Objective function line (current) */}
                <line x1="80" y1="380" x2="400" y2="150" stroke="#FFE66D" strokeWidth="2">
                  <animate attributeName="stroke-dashoffset" values="0;100" dur="3s" repeatCount="indefinite" />
                </line>
                <text x="400" y="145" fontSize="11" fill="#FFE66D" className="dark:fill-yellow-400">Z = 3x + 2y</text>
                
                {/* Sensitivity indicators */}
                {aspect === 'slope' && (
                  <>
                    {/* Allowable slope range indicators */}
                    <line x1="100" y1="400" x2="400" y2="150" stroke="#A8E6CF" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5">
                      <animate attributeName="stroke-dashoffset" values="0;50" dur="2s" repeatCount="indefinite" />
                    </line>
                    <line x1="80" y1="380" x2="450" y2="100" stroke="#A8E6CF" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5">
                      <animate attributeName="stroke-dashoffset" values="0;50" dur="2s" begin="0.5s" repeatCount="indefinite" />
                    </line>
                    <text x="250" y="310" textAnchor="middle" fontSize="11" fill="#A8E6CF" className="dark:fill-green-300">Slope Range</text>
                  </>
                )}
                
                {aspect === 'rhs' && (
                  <>
                    {/* RHS change indicators */}
                    <line x1="50" y1="370" x2="470" y2="80" stroke="#FFD93D" strokeWidth="2" strokeDasharray="6,3" opacity="0.6">
                      <animate attributeName="stroke-dashoffset" values="0;50" dur="2s" repeatCount="indefinite" />
                    </line>
                    <line x1="50" y1="330" x2="430" y2="20" stroke="#FFD93D" strokeWidth="2" strokeDasharray="6,3" opacity="0.6">
                      <animate attributeName="stroke-dashoffset" values="0;50" dur="2s" begin="0.5s" repeatCount="indefinite" />
                    </line>
                    <text x="250" y="310" textAnchor="middle" fontSize="11" fill="#FFD93D" className="dark:fill-yellow-300">RHS Range</text>
                  </>
                )}
                
                {aspect === 'shadow' && (
                  <>
                    {/* Shadow price indicators */}
                    <text x="250" y="200" textAnchor="middle" fontSize="12" fill="#FF8A5C" className="dark:fill-orange-300">Shadow Price: 1.5</text>
                    <text x="250" y="220" textAnchor="middle" fontSize="11" fill="#FF8A5C" className="dark:fill-orange-300">ΔZ = 1.5 × ΔRHS</text>
                    <path d="M 250 230 Q 280 240 300 250" stroke="#FF8A5C" strokeWidth="2" fill="none">
                      <animate attributeName="d" values="M 250 230 Q 280 240 300 250;M 250 230 Q 290 245 320 255;M 250 230 Q 280 240 300 250" dur="2s" repeatCount="indefinite" />
                    </path>
                  </>
                )}
                
                {aspect === 'range' && (
                  <>
                    {/* Allowable range indicators */}
                    <text x="250" y="200" textAnchor="middle" fontSize="11" fill="#6C5CE7" className="dark:fill-purple-300">c₁ ∈ [1, 4]</text>
                    <text x="250" y="220" textAnchor="middle" fontSize="11" fill="#6C5CE7" className="dark:fill-purple-300">c₂ ∈ [1.5, 6]</text>
                    <rect x="150" y="230" width="200" height="20" rx="10" fill="#6C5CE7" opacity="0.2" stroke="#6C5CE7" strokeWidth="1">
                      <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
                    </rect>
                    <text x="250" y="244" textAnchor="middle" fontSize="10" fill="#6C5CE7" className="dark:fill-purple-300">Allowable Range</text>
                  </>
                )}
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="200" height="70" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="3"/>
                  <text x="35" y="34" fontSize="10" fill="#555" className="dark:fill-gray-400">Constraints</text>
                  <line x1="10" y1="50" x2="30" y2="50" stroke="#FFE66D" strokeWidth="2"/>
                  <text x="35" y="54" fontSize="10" fill="#555" className="dark:fill-gray-400">Objective</text>
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
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
                  {aspect === 'slope' && 'Objective Coefficient Sensitivity'}
                  {aspect === 'rhs' && 'RHS Sensitivity'}
                  {aspect === 'shadow' && 'Shadow Prices'}
                  {aspect === 'range' && 'Allowable Ranges'}
                </h5>
                <ul className="list-disc list-inside text-xs space-y-1 text-gray-700 dark:text-gray-300">
                  {example.sensitivityAnalysis.map((item, idx) => (
                    <li key={`sens-${idx}`} className="font-mono">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Interpretation</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {example.interpretation}
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
            Sensitivity Interpretation from Graphical Solutions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to interpret sensitivity analysis results visually from graphical LP solutions, 
            including shadow prices, allowable ranges, and parameter sensitivity.
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
            &gt;
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sensitivity Aspect Selector */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {sensitivityAspects.map((aspect) => (
            <button
              key={aspect.id}
              onClick={() => setSelectedAspect(aspect.id)}
              className={clsx(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                selectedAspect === aspect.id
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              )}
            &gt;
              {aspect.label}
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

              {/* Sensitivity Aspects */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Sensitivity Analysis Aspects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      Objective Coefficient Changes
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      How changes in objective coefficients affect the optimal solution. Determined by slope ranges.
                    </p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Slope of objective: -c₁/c₂<br/>
                      Must stay between constraint slopes
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      RHS Changes
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      How changes in constraint RHS values affect the optimal solution. Determines allowable ranges.
                    </p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Allowable increase/decrease<br/>
                      Before basis changes
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      Shadow Prices
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Marginal value of increasing constraint RHS. Only for binding constraints.
                    </p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Shadow price = ΔZ/ΔRHS<br/>
                      Positive for scarce resources
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                      Allowable Ranges
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Range of parameter values where the optimal basis remains unchanged.
                    </p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">
                      Lower bound ≤ parameter ≤ Upper bound<br/>
                      Basis remains optimal
                    </div>
                  </div>
                </div>
              </div>

              {/* Interpretation Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Steps for Sensitivity Interpretation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {interpretationSteps.map((step, index) => (
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
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  &gt;
                    Example {index + 1}
                  </button>
                ))}
              </div>

              {/* Example Visualization */}
              <SensitivityVisualization 
                exampleIndex={selectedExample} 
                aspect={selectedAspect}
              />

              {/* Example Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examples.map((example, index) => (
                  index !== selectedExample && (
                    <div
                      key={`example-summary-${index}`}
                      onClick={() => setSelectedExample(index)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    &gt;
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {example.title}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {example.problem.split('\n')[0]}
                      </p>
                      <div className="mt-2">
                        <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded">
                          Sensitivity Analysis
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
                  Practice Problems - Sensitivity Interpretation
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Interpret Shadow Prices
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company has the following LP problem and solution:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 6x + 4y
                      Subject to:
                      2x + 3y ≤ 24 (Resource A)
                      4x + y ≤ 20 (Resource B)
                      x, y ≥ 0
                      Optimal: (3, 4) with Z = 34
                      Shadow prices: A = 0.8, B = 1.2
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Which resource is more valuable? How much would Z increase if Resource B increased by 2 units?
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
                      <span className="font-semibold">Hint:</span> Shadow price × change in RHS = change in Z.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Determine Sensitivity
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      For the optimal solution (4, 3) with Z = 26:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 3x + 2y
                      Subject to:
                      x + y ≤ 7
                      2x + y ≤ 11
                      x, y ≥ 0
                      Allowable range for c₁: [1.5, 4]
                      Allowable range for c₂: [1.5, 6]
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      If c₁ changes to 4.5, what happens? What if it changes to 2?
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
                      <span className="font-semibold">Hint:</span> Check if the change is within the allowable range.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Real-World Sensitivity
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A factory produces two products:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 8x + 6y (Profit in ₹)
                      Labor: 4x + 3y ≤ 48 hours (Shadow price: ₹2.25/hour)
                      Machine: 2x + 5y ≤ 40 hours (Shadow price: ₹0.75/hour)
                      Material: 3x + 2y ≤ 36 units (Shadow price: ₹0.67/unit)
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The company can invest ₹10 to increase one resource by 1 unit. Which resource should they invest in?
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
                      <span className="font-semibold">Hint:</span> Compare shadow prices to investment cost.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
                <h4 className="font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
                  💡 Tips for Sensitivity Interpretation
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Shadow prices:</span> Only binding constraints have positive shadow prices</li>
                  <li><span className="font-medium">Allowable ranges:</span> Results valid only within specified ranges</li>
                  <li><span className="font-medium">Slope interpretation:</span> Objective slope must stay between constraint slopes</li>
                  <li><span className="font-medium">Resource value:</span> Higher shadow price = more valuable resource</li>
                  <li><span className="font-medium">Graphical insight:</span> Visualize sensitivity by seeing how far constraints can move</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Sensitivity Interpretation FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Sensitivity Interpretation from Graphical Solutions"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic72_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Sensitivity analysis is where LP becomes truly valuable for decision-making. I always tell my students that solving the LP problem is just the beginning - understanding what happens if things change is where the real insight lies. In my consulting work, clients are rarely interested in the optimal solution itself; they want to know 'what if' scenarios. What if labor costs increase? What if we get more materials? What if demand changes? Graphical sensitivity interpretation helps answer these questions in an intuitive way. I encourage students to think of sensitivity analysis as the 'stress test' for their optimal solution - it tells them how robust their decisions are to changes in the real world." />
        </div>
      </div>
    </div>
  );
};

export default Topic72;