import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic70_files/topic70_questions';
import noteText from './topic70_files/topic70_note.txt?raw';

const Topic70 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Examples for unbounded solutions
  const examples = [
    {
      title: 'Example 1: Simple Unbounded Maximization',
      problem: 'Maximize Z = 2x + y\nSubject to:\nx - y ≤ 2\nx, y ≥ 0',
      unboundedReason: 'The feasible region extends to infinity in the direction of increasing x and y. The objective function can increase without bound.',
      visualization: 'The region is unbounded to the right and upward. Z can go to infinity.',
      solution: 'No finite optimal solution exists. The problem needs additional constraints.'
    },
    {
      title: 'Example 2: Unbounded with Multiple Variables',
      problem: 'Maximize Z = x + y\nSubject to:\nx - y ≤ 5\n2x + y ≥ 10\nx, y ≥ 0',
      unboundedReason: 'The feasible region is unbounded in the direction that increases Z. There is no upper bound on x and y.',
      visualization: 'The region extends to infinity, and Z increases as x and y increase.',
      solution: 'The problem is unbounded. Need constraints to bound the solution.'
    },
    {
      title: 'Example 3: Unbounded Minimization',
      problem: 'Minimize Z = -x - y\nSubject to:\nx + y ≤ 10\nx, y ≥ 0',
      unboundedReason: 'For minimization, Z = -x - y can go to -∞ as x and y increase. The feasible region is bounded above but unbounded below in the objective.',
      visualization: 'The objective can decrease without bound.',
      solution: 'No finite minimum exists. The problem needs constraints.'
    },
    {
      title: 'Example 4: Unbounded Feasible Region',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\ny ≤ x + 2\n2y ≥ x\nx, y ≥ 0',
      unboundedReason: 'The feasible region is unbounded to the right. Both x and y can increase indefinitely.',
      visualization: 'The region extends infinitely to the right.',
      solution: 'Add constraints to bound the region, such as x ≤ M or y ≤ N.'
    },
    {
      title: 'Example 5: Real-World Unbounded Problem',
      problem: 'A company maximizes profit with:\nMaximize Z = 10x + 8y\nSubject to:\nx - y ≤ 3\n2y - x ≤ 4\nx, y ≥ 0',
      unboundedReason: 'The constraints don\'t provide an upper bound on x and y. The company could produce unlimited quantities.',
      visualization: 'The feasible region extends to infinity.',
      solution: 'The real-world problem needs additional constraints like market demand or resource limits.'
    }
  ];

  // Key concepts about unbounded solutions
  const keyConcepts = [
    {
      title: 'Definition',
      description: 'An unbounded LP problem has a non-empty feasible region but the objective function can improve indefinitely without bound. No finite optimal solution exists.'
    },
    {
      title: 'Causes of Unboundedness',
      description: 'Unboundedness occurs when the feasible region extends to infinity in the direction of optimization, and there are no constraints limiting the objective function.'
    },
    {
      title: 'Graphical Identification',
      description: 'On a graph, unboundedness appears as a feasible region that extends to infinity in the direction where the objective function improves.'
    },
    {
      title: 'Practical Significance',
      description: 'In real-world problems, unboundedness indicates missing constraints. There are always limits in the real world - market demand, resources, capacity, etc.'
    }
  ];

  // Types of unbounded problems
  const types = [
    {
      type: 'Unbounded Maximization',
      description: 'The objective function can increase without bound as variables increase.',
      example: 'Max Z = x + y, with x, y ≥ 0'
    },
    {
      type: 'Unbounded Minimization',
      description: 'The objective function can decrease without bound as variables increase.',
      example: 'Min Z = -x - y, with x, y ≥ 0'
    },
    {
      type: 'Unbounded Feasible Region',
      description: 'The feasible region itself extends to infinity, making the problem unbounded if the objective improves in that direction.',
      example: 'Region: x ≥ 0, y ≥ 0 (unbounded)'
    }
  ];

  // Steps to handle unboundedness
  const handlingSteps = [
    {
      title: 'Step 1: Identify Unboundedness',
      description: 'Check if the feasible region extends to infinity in the direction of optimization.',
      icon: '🔍'
    },
    {
      title: 'Step 2: Add Bounding Constraints',
      description: 'Add realistic upper bounds on variables based on real-world limits.',
      icon: '📐'
    },
    {
      title: 'Step 3: Check for Missing Constraints',
      description: 'Review the problem formulation for missing resource or capacity constraints.',
      icon: '📋'
    },
    {
      title: 'Step 4: Use the Simplex Method',
      description: 'In simplex method, unboundedness is detected by a variable entering the basis with no upper bound.',
      icon: '📊'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Confusing Unbounded with Infeasible',
      explanation: 'Unbounded means a solution exists but no finite optimum. Infeasible means no solution exists.'
    },
    {
      mistake: 'Missing Unboundedness',
      explanation: 'Students sometimes don\'t recognize when a problem is unbounded and try to find a finite optimum.'
    },
    {
      mistake: 'Not Adding Bounds',
      explanation: 'In real-world problems, students forget to add realistic upper bounds on variables.'
    },
    {
      mistake: 'Misidentifying the Direction of Unboundedness',
      explanation: 'Students may not correctly identify in which direction the objective can improve without bound.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Check Bounds on Variables',
      description: 'Always ensure variables have appropriate upper bounds in real-world problems.'
    },
    {
      practice: 'Use Graphical Method First',
      description: 'For 2D problems, graph the feasible region to visually check for unboundedness.'
    },
    {
      practice: 'Add Realistic Constraints',
      description: 'Consider market demand, resource limits, capacity constraints, and other real-world limits.'
    },
    {
      practice: 'Document Unboundedness',
      description: 'When a problem is unbounded, document why and suggest additional constraints.'
    }
  ];

  // Visualization component for unbounded solutions
  const UnboundedVisualization = ({ exampleIndex }) => {
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
                
                {/* Constraint line */}
                <line x1="50" y1="380" x2="450" y2="180" stroke="#FF6B6B" strokeWidth="3"/>
                <polygon points="50,400 50,380 450,180 450,400" fill="rgba(255, 107, 107, 0.15)" stroke="none"/>
                <text x="400" y="175" fontSize="11" fill="#FF6B6B" className="dark:fill-red-400">x - y ≤ 2</text>
                
                {/* Arrow showing unbounded direction */}
                <path d="M 350 250 Q 400 220 450 180" stroke="#FF8A5C" strokeWidth="3" fill="none">
                  <animate attributeName="d" values="M 350 250 Q 400 220 450 180;M 350 250 Q 420 200 470 160;M 350 250 Q 400 220 450 180" dur="2s" repeatCount="indefinite" />
                </path>
                <path d="M 450 180 Q 460 175 470 170" stroke="#FF8A5C" strokeWidth="3" fill="none">
                  <animate attributeName="d" values="M 450 180 Q 460 175 470 170;M 470 160 Q 480 155 490 150;M 450 180 Q 460 175 470 170" dur="2s" repeatCount="indefinite" />
                </path>
                
                {/* Objective function lines (parallel, increasing) */}
                <line x1="80" y1="390" x2="400" y2="250" stroke="#FFE66D" strokeWidth="2" strokeDasharray="6,3" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" values="0;100" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="120" y1="370" x2="430" y2="200" stroke="#FFE66D" strokeWidth="2" strokeDasharray="6,3" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" values="0;100" dur="3s" begin="0.5s" repeatCount="indefinite" />
                </line>
                <line x1="160" y1="350" x2="460" y2="150" stroke="#FFE66D" strokeWidth="2" strokeDasharray="6,3" opacity="0.5">
                  <animate attributeName="stroke-dashoffset" values="0;100" dur="3s" begin="1s" repeatCount="indefinite" />
                </line>
                
                <text x="250" y="300" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#FF8A5C" className="dark:fill-orange-400">
                  Unbounded →
                </text>
                <text x="250" y="320" textAnchor="middle" fontSize="12" fill="#FF8A5C" className="dark:fill-orange-300">
                  Z = 2x + y can go to ∞
                </text>
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="200" height="70" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="3"/>
                  <text x="35" y="34" fontSize="10" fill="#555" className="dark:fill-gray-400">Constraint</text>
                  <line x1="10" y1="50" x2="30" y2="50" stroke="#FFE66D" strokeWidth="2" strokeDasharray="6,3"/>
                  <text x="35" y="54" fontSize="10" fill="#555" className="dark:fill-gray-400">Objective (increasing)</text>
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
              
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-l-4 border-orange-500">
                <h5 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Unbounded Reason</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {example.unboundedReason}
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Visual Analysis</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {example.visualization}
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Solution Approach</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {example.solution}
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
            Unbounded Solution
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn about cases where linear programming problems have no finite optimal solution 
            because the objective function can improve indefinitely without bound.
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
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200 dark:shadow-orange-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            &gt;
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
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-orange-500"
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

              {/* Types of Unbounded Problems */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Types of Unbounded Problems
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {types.map((type, index) => (
                    <div
                      key={`type-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">
                        {type.type}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {type.description}
                      </p>
                      <code className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                        {type.example}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Handling Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  How to Handle Unboundedness
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {handlingSteps.map((step, index) => (
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

              {/* How to Identify Unboundedness */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Identify Unboundedness
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Graphical Method</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>Plot all constraints on a graph</li>
                      <li>Check if feasible region extends to infinity</li>
                      <li>Check if objective improves in unbounded direction</li>
                      <li>Look for missing upper bounds</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Simplex Method</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>Check for entering variable with no ratio</li>
                      <li>Look for unbounded ray in the feasible region</li>
                      <li>If ratio test fails → Unbounded</li>
                      <li>Variable can increase indefinitely</li>
                    </ul>
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
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-200 dark:shadow-orange-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  &gt;
                    Example {index + 1}
                  </button>
                ))}
              </div>

              {/* Example Visualization */}
              <UnboundedVisualization exampleIndex={selectedExample} />

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
                        <span className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded">
                          Unbounded
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
                  Practice Problems - Unbounded Solutions
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Identify Unboundedness
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Determine if this problem is unbounded:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 2x + 3y
                      Subject to:
                      x - 2y ≤ 4
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Is there a finite optimal solution? Why or why not?
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
                      <span className="font-semibold">Hint:</span> Check if the feasible region is bounded and if Z can increase indefinitely.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Fixing Unboundedness
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The following problem is unbounded:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 4x + 2y
                      Subject to:
                      2x - y ≤ 5
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Add constraints to make the problem bounded while maintaining the objective.
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
                      <span className="font-semibold">Hint:</span> Add upper bounds on x and y that make sense in a real-world context.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Real-World Unboundedness
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company's profit maximization problem:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 10x + 8y (Profit in ₹)
                      Subject to:
                      x + y ≥ 5 (Minimum production)
                      2x - y ≤ 10
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Why is this problem unbounded? What real-world constraints are missing?
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
                      <span className="font-semibold">Hint:</span> Consider market demand, production capacity, or resource limits.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6 border border-orange-200 dark:border-orange-800">
                <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
                  💡 Tips for Identifying Unbounded Solutions
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Check for missing upper bounds:</span> Real problems always have limits</li>
                  <li><span className="font-medium">Graph the problem:</span> See if the feasible region extends to infinity</li>
                  <li><span className="font-medium">Check the objective direction:</span> Does it improve in the unbounded direction?</li>
                  <li><span className="font-medium">Add realistic constraints:</span> Market demand, resources, capacity, etc.</li>
                  <li><span className="font-medium">Use the simplex method:</span> Check if the ratio test fails</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Unbounded Solutions FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Unbounded Solutions in Linear Programming"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic70_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Unboundedness is one of those cases where the mathematics reveals a problem with the real-world formulation. In my years of consulting, I've never seen a truly unbounded real-world problem - there are always limits. The key insight I share with students is that unboundedness isn't a mathematical error; it's a sign that we've forgotten to include some important constraints. Market demand, production capacity, resource availability, or legal limits are always there. When I encounter unboundedness in a model, I tell the client that we've found a problem: either the model is incomplete, or they've discovered an opportunity for unlimited growth (which is rarely true!)." />
        </div>
      </div>
    </div>
  );
};

export default Topic70;