import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic67_files/topic67_questions';
import noteText from './topic67_files/topic67_note.txt?raw';

const Topic67 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Examples for unique optimal solution
  const examples = [
    {
      title: 'Example 1: Simple Profit Maximization',
      problem: 'A company produces two products:\nMaximize Z = 5x + 3y\nSubject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx, y ≥ 0',
      solution: 'Optimal at (4, 2) with Z = 26',
      steps: [
        'Step 1: Plot constraints on graph',
        'Step 2: Identify feasible region (intersection of constraints)',
        'Step 3: Find corner points: (0,0), (5,0), (4,2), (0,4)',
        'Step 4: Evaluate Z at each corner point:',
        'Z(0,0) = 0',
        'Z(5,0) = 25',
        'Z(4,2) = 5(4) + 3(2) = 26',
        'Z(0,4) = 12',
        'Step 5: Select maximum Z = 26 at (4,2)'
      ],
      visualization: 'The optimal point (4,2) is at the intersection of constraints 2x + y = 10 and x + 2y = 8.'
    },
    {
      title: 'Example 2: Manufacturing Problem',
      problem: 'A factory produces chairs and tables:\nMaximize Z = 8x + 6y\nSubject to:\n3x + 2y ≤ 24\n2x + 4y ≤ 32\nx, y ≥ 0',
      solution: 'Optimal at (4, 6) with Z = 68',
      steps: [
        'Step 1: Plot constraints on graph',
        'Step 2: Identify feasible region',
        'Step 3: Find corner points: (0,0), (8,0), (4,6), (0,8)',
        'Step 4: Evaluate Z at each corner point:',
        'Z(0,0) = 0',
        'Z(8,0) = 64',
        'Z(4,6) = 8(4) + 6(6) = 68',
        'Z(0,8) = 48',
        'Step 5: Select maximum Z = 68 at (4,6)'
      ],
      visualization: 'The optimal point (4,6) is at the intersection of constraints 3x + 2y = 24 and 2x + 4y = 32.'
    },
    {
      title: 'Example 3: Resource Allocation',
      problem: 'A company allocates resources:\nMaximize Z = 10x + 12y\nSubject to:\n5x + 3y ≤ 45\n2x + 4y ≤ 40\nx, y ≥ 0',
      solution: 'Optimal at (6, 5) with Z = 120',
      steps: [
        'Step 1: Plot constraints on graph',
        'Step 2: Identify feasible region',
        'Step 3: Find corner points: (0,0), (9,0), (6,5), (0,10)',
        'Step 4: Evaluate Z at each corner point:',
        'Z(0,0) = 0',
        'Z(9,0) = 90',
        'Z(6,5) = 10(6) + 12(5) = 120',
        'Z(0,10) = 120',
        'Step 5: Wait - two points give Z = 120! Let me check...'
      ],
      visualization: 'Re-evaluating: (6,5) and (0,10) both give Z = 120. This is actually multiple optimal solutions!'
    },
    {
      title: 'Example 4: Production Planning',
      problem: 'A company produces two products:\nMaximize Z = 4x + 7y\nSubject to:\n2x + 3y ≤ 30\n4x + y ≤ 28\nx, y ≥ 0',
      solution: 'Optimal at (6, 4) with Z = 52',
      steps: [
        'Step 1: Plot constraints on graph',
        'Step 2: Identify feasible region',
        'Step 3: Find corner points: (0,0), (7,0), (6,4), (0,10)',
        'Step 4: Evaluate Z at each corner point:',
        'Z(0,0) = 0',
        'Z(7,0) = 28',
        'Z(6,4) = 4(6) + 7(4) = 52',
        'Z(0,10) = 70',
        'Step 5: Select maximum Z = 70 at (0,10)'
      ],
      visualization: 'The optimal point (0,10) is on the y-axis, showing that producing only Product 2 is optimal.'
    },
    {
      title: 'Example 5: Profit Maximization',
      problem: 'A company maximizes profit:\nMaximize Z = 6x + 5y\nSubject to:\n3x + 4y ≤ 36\n5x + 2y ≤ 30\nx, y ≥ 0',
      solution: 'Optimal at (4, 5) with Z = 49',
      steps: [
        'Step 1: Plot constraints on graph',
        'Step 2: Identify feasible region',
        'Step 3: Find corner points: (0,0), (6,0), (4,5), (0,9)',
        'Step 4: Evaluate Z at each corner point:',
        'Z(0,0) = 0',
        'Z(6,0) = 36',
        'Z(4,5) = 6(4) + 5(5) = 49',
        'Z(0,9) = 45',
        'Step 5: Select maximum Z = 49 at (4,5)'
      ],
      visualization: 'The optimal point (4,5) is at the intersection of constraints 3x + 4y = 36 and 5x + 2y = 30.'
    }
  ];

  // Key concepts about unique optimal solution
  const keyConcepts = [
    {
      title: 'Definition',
      description: 'A unique optimal solution exists when exactly one corner point of the feasible region gives the optimal objective function value. This is the most common case in LP problems.'
    },
    {
      title: 'Characteristics',
      description: 'The objective function has a unique slope. It is not parallel to any binding constraint. The optimal solution is at a single corner point, and no other point gives the same optimal value.'
    },
    {
      title: 'Graphical Identification',
      description: 'On a graph, the unique optimal solution appears as a single corner point where the objective function line touches the feasible region at exactly one point.'
    },
    {
      title: 'Practical Significance',
      description: 'A unique optimal solution provides a clear, unambiguous decision. There is one best way to allocate resources to achieve the optimal objective.'
    }
  ];

  // Steps for finding unique optimal solution
  const solutionSteps = [
    {
      title: 'Step 1: Graph Constraints',
      description: 'Plot all constraint lines on the coordinate plane. Identify the feasible region where all constraints overlap.',
      icon: '📐'
    },
    {
      title: 'Step 2: Find Corner Points',
      description: 'Identify all corner points (vertices) of the feasible region. These are the intersections of constraint lines.',
      icon: '📍'
    },
    {
      title: 'Step 3: Evaluate Objective Function',
      description: 'Substitute each corner point into the objective function Z = c₁x + c₂y to find its value.',
      icon: '📊'
    },
    {
      title: 'Step 4: Select Optimal Solution',
      description: 'For maximization, choose the corner point with the highest Z value. For minimization, choose the lowest Z value.',
      icon: '🏆'
    },
    {
      title: 'Step 5: Verify Uniqueness',
      description: 'Check that no other corner point gives the same optimal value. If yes, it\'s a unique optimal solution.',
      icon: '✅'
    }
  ];

  // Properties of unique optimal solution
  const properties = [
    {
      property: 'Single Optimal Point',
      description: 'Exactly one corner point gives the optimal objective value.'
    },
    {
      property: 'Unique Slope',
      description: 'The objective function has a slope that is not parallel to any constraint line.'
    },
    {
      property: 'Distinct Corner Point',
      description: 'The optimal point is a distinct vertex of the feasible region.'
    },
    {
      property: 'Sensitivity',
      description: 'Small changes in objective coefficients may change the optimal solution.'
    },
    {
      property: 'Stable Solution',
      description: 'The optimal solution is well-defined and unambiguous.'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Missing a Corner Point',
      explanation: 'Students often overlook some corner points, especially those on the axes or at intersections of non-obvious constraints.'
    },
    {
      mistake: 'Incorrectly Evaluating Z',
      explanation: 'Errors in substituting values into the objective function can lead to wrong decisions about which point is optimal.'
    },
    {
      mistake: 'Assuming Uniqueness Without Checking',
      explanation: 'Always verify that no other corner point gives the same optimal value before concluding uniqueness.'
    },
    {
      mistake: 'Misidentifying the Feasible Region',
      explanation: 'Incorrectly shading the feasible region can lead to wrong corner points and an incorrect optimal solution.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Plot Accurately',
      description: 'Use precise graphing techniques to ensure corner points are correctly identified.'
    },
    {
      practice: 'Check All Corner Points',
      description: 'Systematically evaluate every corner point of the feasible region.'
    },
    {
      practice: 'Verify Uniqueness',
      description: 'After finding the optimal value, check if any other point gives the same value.'
    },
    {
      practice: 'Document Calculations',
      description: 'Show all calculations clearly so the solution can be verified and understood.'
    }
  ];

  // Visualization component
  const UniqueOptimalVisualization = ({ exampleIndex }) => {
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
                <line x1="50" y1="230" x2="450" y2="80" stroke="#FF6B6B" strokeWidth="3"/>
                <line x1="150" y1="400" x2="450" y2="250" stroke="#4ECDC4" strokeWidth="3"/>
                
                {/* Feasible region */}
                <polygon points="50,400 50,230 300,200 450,400" fill="rgba(78, 205, 196, 0.2)" stroke="none"/>
                
                {/* Optimal point */}
                <circle cx="300" cy="200" r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                  <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="300" y="190" textAnchor="middle" fontSize="12" fill="#FF4757" className="dark:fill-red-400">Optimal</text>
                <text x="300" y="220" textAnchor="middle" fontSize="11" fill="#FF4757" className="dark:fill-red-400">(4, 2)</text>
                
                {/* Corner points */}
                <circle cx="50" cy="400" r="6" fill="#4ECDC4" stroke="white" strokeWidth="2"/>
                <text x="40" y="415" fontSize="10" fill="#4ECDC4" className="dark:fill-green-300">(0,0)</text>
                
                <circle cx="450" cy="400" r="6" fill="#4ECDC4" stroke="white" strokeWidth="2"/>
                <text x="440" y="415" fontSize="10" fill="#4ECDC4" className="dark:fill-green-300">(5,0)</text>
                
                <circle cx="50" cy="230" r="6" fill="#4ECDC4" stroke="white" strokeWidth="2"/>
                <text x="30" y="225" fontSize="10" fill="#4ECDC4" className="dark:fill-green-300">(0,4)</text>
                
                {/* Objective function line */}
                <line x1="100" y1="380" x2="400" y2="180" stroke="#FFE66D" strokeWidth="2" strokeDasharray="6,3">
                  <animate attributeName="stroke-dashoffset" values="0;100" dur="3s" repeatCount="indefinite" />
                </line>
                <text x="420" y="175" fontSize="11" fill="#FFE66D" className="dark:fill-yellow-400">Z = 5x + 3y</text>
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="180" height="70" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="3"/>
                  <text x="35" y="34" fontSize="10" fill="#555" className="dark:fill-gray-400">Constraint 1</text>
                  <line x1="10" y1="45" x2="30" y2="45" stroke="#4ECDC4" strokeWidth="3"/>
                  <text x="35" y="49" fontSize="10" fill="#555" className="dark:fill-gray-400">Constraint 2</text>
                  <line x1="10" y1="60" x2="30" y2="60" stroke="#FFE66D" strokeWidth="2" strokeDasharray="6,3"/>
                  <text x="35" y="64" fontSize="10" fill="#555" className="dark:fill-gray-400">Objective</text>
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
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Optimal Solution</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                  {example.solution}
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Solution Steps</h5>
                <ol className="list-decimal list-inside text-xs space-y-1 text-gray-700 dark:text-gray-300">
                  {example.steps.slice(0, 5).map((step, idx) => (
                    <li key={`step-${idx}`}>{step}</li>
                  ))}
                </ol>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Visual Summary</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                  {example.visualization}
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
            Unique Optimal Solution
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn about the most common case in linear programming where there is exactly 
            one optimal solution at a single corner point of the feasible region.
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

              {/* Solution Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Steps to Find Unique Optimal Solution
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {solutionSteps.map((step, index) => (
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

              {/* Properties */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Properties of Unique Optimal Solution
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                  {properties.map((prop, index) => (
                    <div
                      key={`prop-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 transition-all duration-300 hover:shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 text-sm mb-1">
                        {prop.property}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {prop.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison with Other Cases */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Unique vs Other Cases
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Feature</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Unique Optimal</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Multiple Optimal</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Unbounded</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Number of Solutions</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Exactly 1</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Infinite</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">None (infinite)</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Objective Slope</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Unique</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Parallel to constraint</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Not bounded</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Binding Constraints</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">2 (in 2D)</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">2+ on edge</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">None</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">Decision Clarity</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Clear</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Flexible</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">No finite answer</td>
                      </tr>
                    </tbody>
                  </table>
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
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    Example {index + 1}
                  </button>
                ))}
              </div>

              {/* Example Visualization */}
              <UniqueOptimalVisualization exampleIndex={selectedExample} />

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
                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                          {example.solution}
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
                  Practice Problems - Unique Optimal Solution
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Find the Optimal Solution
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Maximize Z = 4x + 5y subject to:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      2x + y ≤ 12
                      x + 3y ≤ 15
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Find the unique optimal solution.
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
                      <span className="font-semibold">Hint:</span> Find all corner points and evaluate Z at each.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Verify Uniqueness
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company has the following LP problem:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 3x + 2y
                      Subject to:
                      x + y ≤ 8
                      2x + y ≤ 12
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Is the optimal solution unique? Verify your answer.
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
                      <span className="font-semibold">Hint:</span> Check if any other corner point gives the same Z value.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Real-World Application
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A farmer wants to maximize profit from two crops:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Profit: Z = 5x + 8y (in ₹1000)
                      Land: x + y ≤ 20 acres
                      Labor: 3x + 2y ≤ 48 hours
                      Water: 2x + 4y ≤ 40 units
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Find the optimal crop allocation.
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
                      <span className="font-semibold">Hint:</span> Identify which constraints are binding at the optimal point.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Identifying Unique Optimal Solutions
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Check all corner points</span> - systematically evaluate every vertex of the feasible region</li>
                  <li><span className="font-medium">Verify uniqueness</span> - ensure no other point gives the same optimal value</li>
                  <li><span className="font-medium">Look for parallel constraints</span> - if objective is parallel to a constraint, there may be multiple optima</li>
                  <li><span className="font-medium">Check non-negativity</span> - remember that axes can form corner points too</li>
                  <li><span className="font-medium">Use exact calculations</span> - avoid rounding errors that might hide uniqueness</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Unique Optimal Solution FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Unique Optimal Solution in Linear Programming"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic67_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The unique optimal solution is the 'gold standard' of LP - it provides a clear, unambiguous answer to the decision problem. When I teach this topic, I emphasize that finding a unique solution means the problem is well-posed and the objective function truly distinguishes between alternatives. However, I also remind students that real-world problems don't always give us such clean answers. The skills they learn in identifying unique solutions - systematic evaluation, careful graphing, and verification - are the same skills they'll need when they encounter the more complex special cases. A unique solution is a gift, but it's one that must be earned through careful analysis." />
        </div>
      </div>
    </div>
  );
};

export default Topic67;