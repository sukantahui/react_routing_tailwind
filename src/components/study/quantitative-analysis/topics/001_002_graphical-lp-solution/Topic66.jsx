import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic66_files/topic66_questions';
import noteText from './topic66_files/topic66_note.txt?raw';

const Topic66 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedCase, setSelectedCase] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Special cases data
  const specialCases = [
    {
      title: 'Case 1: Unique Optimal Solution',
      icon: '⭐',
      description: 'The most common case where there is exactly one optimal solution at a single corner point.',
      characteristics: [
        'Objective function has a unique slope',
        'Optimal at a single corner point',
        'No other corner points give the same Z value',
        'Standard case in most LP problems'
      ],
      example: 'Maximize Z = 3x + 2y\nSubject to:\nx + y ≤ 6\n2x + y ≤ 10\nx, y ≥ 0\nOptimal at (4, 2) with Z = 16',
      visualization: 'A single corner point provides the optimal solution.'
    },
    {
      title: 'Case 2: Multiple Optimal Solutions',
      icon: '🔄',
      description: 'Occurs when the objective function is parallel to a binding constraint, resulting in multiple optimal points.',
      characteristics: [
        'Objective function parallel to a constraint line',
        'Infinite number of optimal solutions along an edge',
        'Same Z value for all optimal points',
        'Identified by equal slopes'
      ],
      example: 'Maximize Z = x + y\nSubject to:\nx + y ≤ 10\n2x + y ≤ 15\nx, y ≥ 0\nAny point on x + y = 10 gives Z = 10',
      visualization: 'The entire edge between two corner points is optimal.'
    },
    {
      title: 'Case 3: Infeasible Solution',
      icon: '🚫',
      description: 'Occurs when there is no point that satisfies all constraints simultaneously.',
      characteristics: [
        'Constraints are contradictory',
        'Feasible region is empty',
        'No solution exists',
        'Problem needs reformulation'
      ],
      example: 'Maximize Z = x + y\nSubject to:\nx + y ≤ 5\nx + y ≥ 8\nx, y ≥ 0\nNo feasible point exists',
      visualization: 'The feasible region is empty - constraints don\'t overlap.'
    },
    {
      title: 'Case 4: Unbounded Solution',
      icon: '♾️',
      description: 'Occurs when the objective function can improve indefinitely without bound.',
      characteristics: [
        'Feasible region is unbounded',
        'Objective function can increase/decrease without limit',
        'No finite optimal solution',
        'Problem needs additional constraints'
      ],
      example: 'Maximize Z = x + y\nSubject to:\nx - y ≤ 2\nx, y ≥ 0\nZ can increase indefinitely',
      visualization: 'The feasible region extends to infinity in the direction of improvement.'
    },
    {
      title: 'Case 5: Redundant Constraints',
      icon: '🗑️',
      description: 'Constraints that do not affect the feasible region and can be removed without changing the solution.',
      characteristics: [
        'Constraint does not form part of feasible region boundary',
        'Removing it doesn\'t change optimal solution',
        'Always has slack',
        'Identified by checking if it\'s never binding'
      ],
      example: 'Maximize Z = 2x + 3y\nSubject to:\nx + y ≤ 10\nx ≤ 8\n2x + y ≤ 15\nx, y ≥ 0\nConstraint x ≤ 8 is redundant',
      visualization: 'The constraint line lies outside the feasible region.'
    },
    {
      title: 'Case 6: Degenerate Solution',
      icon: '🔀',
      description: 'Occurs when more than the minimum number of constraints are binding at the optimal point.',
      characteristics: [
        'More than 2 binding constraints in 2D',
        'More than n binding constraints in n dimensions',
        'Can cause cycling in simplex method',
        'Multiple constraint lines intersect at same point'
      ],
      example: 'Maximize Z = 3x + 2y\nSubject to:\nx + y ≤ 5\n2x + y ≤ 7\nx + 2y ≤ 8\nx, y ≥ 0\nAt (2, 3), three constraints are binding',
      visualization: 'Three or more constraint lines intersect at the optimal corner.'
    }
  ];

  // Comparison table data
  const comparisonData = [
    { case: 'Unique Optimal', feasible: 'Bounded', optimal: 'Single point', objective: 'Unique slope', constraints: '2 binding' },
    { case: 'Multiple Optimal', feasible: 'Bounded', optimal: 'Edge/Line', objective: 'Parallel to constraint', constraints: '2+ binding' },
    { case: 'Infeasible', feasible: 'Empty', optimal: 'None', objective: 'N/A', constraints: 'Contradictory' },
    { case: 'Unbounded', feasible: 'Unbounded', optimal: 'None (infinite)', objective: 'Can improve indefinitely', constraints: 'No upper bound' },
    { case: 'Redundant', feasible: 'Bounded', optimal: 'Unchanged', objective: 'Unaffected', constraints: 'Non-binding always' },
    { case: 'Degenerate', feasible: 'Bounded', optimal: 'Single point', objective: 'Unique', constraints: '3+ binding' }
  ];

  // Case visualization component
  const CaseVisualization = ({ caseIndex }) => {
    const currentCase = specialCases[caseIndex];
    if (!currentCase) return null;

    return (
      <div className="w-full max-w-4xl mx-auto my-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{currentCase.icon}</span>
            <h4 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {currentCase.title}
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
                
                {/* Different visualizations based on case */}
                {caseIndex === 0 && (
                  // Unique Optimal
                  <>
                    <line x1="50" y1="230" x2="450" y2="80" stroke="#FF6B6B" strokeWidth="3"/>
                    <line x1="150" y1="400" x2="450" y2="250" stroke="#4ECDC4" strokeWidth="3"/>
                    <circle cx="300" cy="200" r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                      <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="300" y="190" textAnchor="middle" fontSize="12" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                    <polygon points="50,400 50,200 300,200 450,400" fill="rgba(78, 205, 196, 0.2)" stroke="none"/>
                  </>
                )}
                
                {caseIndex === 1 && (
                  // Multiple Optimal
                  <>
                    <line x1="50" y1="380" x2="450" y2="80" stroke="#FF6B6B" strokeWidth="3"/>
                    <line x1="150" y1="400" x2="450" y2="250" stroke="#4ECDC4" strokeWidth="3"/>
                    <line x1="100" y1="380" x2="400" y2="80" stroke="#FFE66D" strokeWidth="3" strokeDasharray="8,4"/>
                    <circle cx="200" cy="300" r="8" fill="#FF4757" stroke="white" strokeWidth="2">
                      <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="350" cy="180" r="8" fill="#FF4757" stroke="white" strokeWidth="2">
                      <animate attributeName="r" values="8;10;8" dur="2s" begin="0.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="275" y="230" textAnchor="middle" fontSize="12" fill="#FFE66D" className="dark:fill-yellow-400">Multiple Optima</text>
                    <polygon points="50,400 50,200 350,180 450,400" fill="rgba(78, 205, 196, 0.2)" stroke="none"/>
                  </>
                )}
                
                {caseIndex === 2 && (
                  // Infeasible
                  <>
                    <line x1="50" y1="380" x2="450" y2="130" stroke="#FF6B6B" strokeWidth="3"/>
                    <line x1="150" y1="400" x2="450" y2="280" stroke="#4ECDC4" strokeWidth="3"/>
                    <text x="250" y="220" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#FF4757" className="dark:fill-red-400">
                      No Feasible Region
                    </text>
                    <text x="250" y="240" textAnchor="middle" fontSize="12" fill="#FF6B6B" className="dark:fill-red-300">
                      Constraints Don't Overlap
                    </text>
                    <text x="250" y="260" textAnchor="middle" fontSize="12" fill="#FF6B6B" className="dark:fill-red-300">
                      Infeasible Solution
                    </text>
                  </>
                )}
                
                {caseIndex === 3 && (
                  // Unbounded
                  <>
                    <line x1="50" y1="380" x2="300" y2="130" stroke="#FF6B6B" strokeWidth="3"/>
                    <line x1="50" y1="400" x2="450" y2="300" stroke="#4ECDC4" strokeWidth="3"/>
                    <polygon points="50,400 300,130 450,400" fill="rgba(78, 205, 196, 0.2)" stroke="none"/>
                    <text x="250" y="220" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#FF8A5C" className="dark:fill-orange-400">
                      Unbounded Region →
                    </text>
                    <text x="250" y="240" textAnchor="middle" fontSize="12" fill="#FF8A5C" className="dark:fill-orange-300">
                      Objective Can Increase Indefinitely
                    </text>
                    <path d="M 400 300 Q 420 280 440 260" stroke="#FF8A5C" strokeWidth="2" fill="none" markerEnd="url(#arrow)">
                      <animate attributeName="d" values="M 400 300 Q 420 280 440 260;M 400 300 Q 430 270 460 240;M 400 300 Q 420 280 440 260" dur="2s" repeatCount="indefinite" />
                    </path>
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#FF8A5C"/>
                      </marker>
                    </defs>
                  </>
                )}
                
                {caseIndex === 4 && (
                  // Redundant
                  <>
                    <line x1="50" y1="380" x2="450" y2="80" stroke="#FF6B6B" strokeWidth="3"/>
                    <line x1="150" y1="400" x2="450" y2="250" stroke="#4ECDC4" strokeWidth="3"/>
                    <line x1="50" y1="300" x2="400" y2="50" stroke="#A8E6CF" strokeWidth="3" strokeDasharray="8,4"/>
                    <circle cx="300" cy="200" r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                      <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="300" y="190" textAnchor="middle" fontSize="12" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                    <text x="200" y="100" fontSize="11" fill="#A8E6CF" className="dark:fill-green-300">Redundant</text>
                    <polygon points="50,400 50,200 300,200 450,400" fill="rgba(78, 205, 196, 0.2)" stroke="none"/>
                  </>
                )}
                
                {caseIndex === 5 && (
                  // Degenerate
                  <>
                    <line x1="50" y1="380" x2="450" y2="130" stroke="#FF6B6B" strokeWidth="3"/>
                    <line x1="150" y1="400" x2="450" y2="280" stroke="#4ECDC4" strokeWidth="3"/>
                    <line x1="100" y1="400" x2="400" y2="130" stroke="#FFE66D" strokeWidth="3"/>
                    <circle cx="250" cy="250" r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                      <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="250" y="240" textAnchor="middle" fontSize="12" fill="#FF4757" className="dark:fill-red-400">3 Constraints</text>
                    <text x="250" y="260" textAnchor="middle" fontSize="12" fill="#FF4757" className="dark:fill-red-400">Intersect Here</text>
                    <polygon points="50,400 50,250 250,250 450,400" fill="rgba(78, 205, 196, 0.2)" stroke="none"/>
                  </>
                )}
              </svg>
            </div>
            
            {/* Details Panel */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Description</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {currentCase.description}
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Key Characteristics</h5>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  {currentCase.characteristics.map((char, idx) => (
                    <li key={`char-${idx}`}>{char}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Example</h5>
                <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {currentCase.example}
                </pre>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Visual Summary</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  {currentCase.visualization}
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
            Special Cases in Graphical LP
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Understand the various special cases that can occur in linear programming problems, 
            including unique solutions, multiple optima, infeasibility, unboundedness, 
            redundancy, and degeneracy.
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
              {/* Special Cases Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {specialCases.map((caseItem, index) => (
                  <div
                    key={`case-${index}`}
                    onClick={() => setSelectedCase(index)}
                    className={clsx(
                      "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4",
                      selectedCase === index ? "border-blue-500" : "border-gray-300 dark:border-gray-600"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{caseItem.icon}</span>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {caseItem.title}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {caseItem.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Selected Case Visualization */}
              <CaseVisualization caseIndex={selectedCase} />

              {/* Comparison Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Special Cases Comparison
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Case</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Feasible Region</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Optimal Solution</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Objective Function</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Binding Constraints</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {comparisonData.map((row, index) => (
                        <tr key={`row-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                          <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{row.case}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.feasible}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.optimal}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.objective}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.constraints}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* How to Identify Special Cases */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  How to Identify Special Cases
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Unique Optimal</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Single corner point gives best Z</li>
                      <li>Objective function not parallel to any constraint</li>
                      <li>Most common case</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Multiple Optimal</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Objective function parallel to a binding constraint</li>
                      <li>Same Z value on an entire edge</li>
                      <li>Look for equal slopes</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Infeasible</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>No intersection of all constraints</li>
                      <li>Contradictory constraints</li>
                      <li>Empty feasible region</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Unbounded</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Feasible region extends to infinity</li>
                      <li>Objective can improve indefinitely</li>
                      <li>Missing upper bound constraints</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Redundant</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Constraint never part of feasible region</li>
                      <li>Always has slack</li>
                      <li>Can be removed safely</li>
                    </ul>
                  </div>
                  <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 border-l-4 border-pink-500">
                    <h4 className="font-semibold text-pink-700 dark:text-pink-400 mb-2">Degenerate</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>More than 2 binding constraints in 2D</li>
                      <li>Multiple lines intersect at same point</li>
                      <li>Can cause simplex cycling</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'examples' && (
            <>
              {/* Case Selector */}
              <div className="flex flex-wrap gap-3 justify-center">
                {specialCases.map((caseItem, index) => (
                  <button
                    key={`case-btn-${index}`}
                    onClick={() => setSelectedCase(index)}
                    className={clsx(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                      selectedCase === index
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    {caseItem.icon} {caseItem.title}
                  </button>
                ))}
              </div>

              {/* Case Visualization */}
              <CaseVisualization caseIndex={selectedCase} />

              {/* Additional Details */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Detailed Analysis: {specialCases[selectedCase].title}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">When It Occurs</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedCase === 0 && 'When the objective function has a unique slope and the optimal solution is at a single corner point.'}
                      {selectedCase === 1 && 'When the objective function is parallel to a binding constraint line.'}
                      {selectedCase === 2 && 'When constraints are contradictory and cannot be satisfied simultaneously.'}
                      {selectedCase === 3 && 'When the feasible region is unbounded in the direction of optimization.'}
                      {selectedCase === 4 && 'When a constraint does not affect the feasible region or optimal solution.'}
                      {selectedCase === 5 && 'When more than the minimum number of constraints are binding at the optimal point.'}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">How to Handle</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedCase === 0 && 'Proceed with the solution - this is the standard case.'}
                      {selectedCase === 1 && 'Any point on the optimal edge gives the same Z value. Choose based on other criteria.'}
                      {selectedCase === 2 && 'Reformulate the problem or relax some constraints.'}
                      {selectedCase === 3 && 'Add additional constraints to bound the problem.'}
                      {selectedCase === 4 && 'Remove the redundant constraint to simplify the problem.'}
                      {selectedCase === 5 && 'Be careful with sensitivity analysis - may need special handling.'}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Takeaway</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedCase === 0 && 'Most LP problems have a unique optimal solution.'}
                      {selectedCase === 1 && 'Multiple solutions give decision-makers flexibility.'}
                      {selectedCase === 2 && 'Check problem formulation for contradictions.'}
                      {selectedCase === 3 && 'Real problems need bounded constraints.'}
                      {selectedCase === 4 && 'Simplify problems by removing redundant constraints.'}
                      {selectedCase === 5 && 'Degeneracy can affect computational methods.'}
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
                  Practice Problems - Special Cases
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Identify the Special Case
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Consider the following LP problem:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 2x + 3y
                      Subject to:
                      x + y ≤ 8
                      2x + y ≤ 12
                      x + 2y ≤ 10
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The optimal solution is at (4, 3) with Z = 17. What special case is this?
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
                      <span className="font-semibold">Hint:</span> Check if the objective function is parallel to any constraint.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Infeasible or Unbounded?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Analyze this LP problem:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = x + y
                      Subject to:
                      x - y ≤ 2
                      x + y ≥ 8
                      x ≤ 3
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Is this problem feasible? If not, what special case is it?
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
                      <span className="font-semibold">Hint:</span> Check if there's any point that satisfies all constraints.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Identify and Classify
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A farmer has the following LP problem:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 3x + 2y (Profit from crops)
                      Subject to:
                      x + y ≤ 10 (Land)
                      2x + y ≤ 15 (Labor)
                      x + 2y ≤ 12 (Water)
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      At optimal point (6, 3), all three constraints are binding. What special case is this?
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
                      <span className="font-semibold">Hint:</span> Count how many constraints are binding at the optimal point.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Identifying Special Cases
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Unique Optimal:</span> Single corner point gives best Z, objective not parallel to constraints</li>
                  <li><span className="font-medium">Multiple Optimal:</span> Objective parallel to a binding constraint, entire edge is optimal</li>
                  <li><span className="font-medium">Infeasible:</span> No point satisfies all constraints - look for contradictions</li>
                  <li><span className="font-medium">Unbounded:</span> Feasible region extends to infinity - missing upper bounds</li>
                  <li><span className="font-medium">Redundant:</span> Constraint never affects feasible region - always has slack</li>
                  <li><span className="font-medium">Degenerate:</span> More than 2 binding constraints at optimal point</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Special Cases in Graphical LP FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Special Cases in Graphical Linear Programming"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic66_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Special cases in LP are not just theoretical curiosities - they appear frequently in real-world problems. I've seen multiple optimal solutions in production planning where different product mixes give the same profit, infeasibility in budget allocation when demands exceed resources, and unboundedness in investment problems when constraints are missing. The key is teaching students to recognize these cases and know what to do about them. In practice, infeasibility often means the problem needs to be reconsidered or constraints relaxed. Unboundedness usually indicates missing constraints that reflect real-world limitations. And multiple optima? That's often a blessing - it gives decision-makers flexibility to choose solutions based on other criteria like sustainability or risk." />
        </div>
      </div>
    </div>
  );
};

export default Topic66;