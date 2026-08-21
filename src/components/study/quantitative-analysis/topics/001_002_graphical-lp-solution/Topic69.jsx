import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic69_files/topic69_questions';
import noteText from './topic69_files/topic69_note.txt?raw';

const Topic69 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Examples for infeasible solutions
  const examples = [
    {
      title: 'Example 1: Contradictory Constraints',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\nx + y ≤ 5\nx + y ≥ 8\nx, y ≥ 0',
      infeasibilityReason: 'The constraints x + y ≤ 5 and x + y ≥ 8 are contradictory. No point can satisfy both simultaneously.',
      visualization: 'The feasible regions for each constraint don\'t overlap - they are completely separated.',
      solution: 'This problem has no feasible solution. The constraints must be relaxed.'
    },
    {
      title: 'Example 2: Resource vs Requirement Conflict',
      problem: 'A factory must meet demand but has limited capacity:\nMaximize Z = 5x + 3y\nSubject to:\n2x + y ≤ 10 (Capacity)\n3x + 2y ≥ 20 (Demand)\nx, y ≥ 0',
      infeasibilityReason: 'The capacity constraint is too tight to meet the demand requirement. The factory cannot produce enough to meet demand.',
      visualization: 'The production capacity is insufficient to meet the minimum demand requirement.',
      solution: 'Either increase capacity or reduce demand requirements.'
    },
    {
      title: 'Example 3: Budget vs Minimum Requirements',
      problem: 'A company must meet minimum standards with limited budget:\nMinimize Z = 4x + 3y\nSubject to:\n2x + y ≥ 12 (Quality standard)\nx + 2y ≥ 10 (Safety standard)\nx + y ≤ 8 (Budget constraint)\nx, y ≥ 0',
      infeasibilityReason: 'The budget constraint (x + y ≤ 8) is too restrictive to meet both quality and safety requirements.',
      visualization: 'The minimum requirements require more resources than the budget allows.',
      solution: 'Either increase the budget or reduce the quality/safety requirements.'
    },
    {
      title: 'Example 4: Multiple Contradictory Constraints',
      problem: 'A project has conflicting resource constraints:\nMaximize Z = 2x + 3y\nSubject to:\nx + 2y ≤ 6\n3x + y ≤ 9\nx + y ≥ 10\nx, y ≥ 0',
      infeasibilityReason: 'The requirement x + y ≥ 10 conflicts with both resource constraints, which limit the sum to much lower values.',
      visualization: 'The resource constraints form a small region, while the requirement is far outside this region.',
      solution: 'The project needs either more resources or reduced requirements.'
    },
    {
      title: 'Example 5: Real-World Infeasibility',
      problem: 'A transportation company:\nMinimize Z = 10x + 8y\nSubject to:\n2x + 3y ≥ 30 (Minimum delivery)\n4x + 2y ≤ 20 (Vehicle capacity)\n3x + y ≥ 25 (Time constraint)\nx, y ≥ 0',
      infeasibilityReason: 'The vehicle capacity constraint (4x + 2y ≤ 20) conflicts with both the minimum delivery and time constraints.',
      visualization: 'The company cannot deliver the minimum required goods within the available vehicle capacity.',
      solution: 'Need additional vehicles or reduce delivery requirements.'
    }
  ];

  // Key concepts about infeasible solutions
  const keyConcepts = [
    {
      title: 'Definition',
      description: 'An infeasible LP problem has no point that satisfies all constraints simultaneously. The feasible region is empty, and there is no solution to the optimization problem.'
    },
    {
      title: 'Causes of Infeasibility',
      description: 'Infeasibility occurs when constraints are contradictory, requirements exceed available resources, or there are conflicting upper and lower bounds on variables.'
    },
    {
      title: 'Graphical Identification',
      description: 'On a graph, infeasibility appears as no overlapping region where all constraints are satisfied. The constraint regions are completely separated.'
    },
    {
      title: 'Practical Significance',
      description: 'Infeasibility in real-world problems indicates that the problem is over-constrained. It means the requirements or expectations are not achievable with the given resources.'
    }
  ];

  // Causes of infeasibility
  const causes = [
    {
      cause: 'Contradictory Constraints',
      description: 'Constraints that directly conflict, such as x ≤ 5 and x ≥ 8.',
      example: 'x + y ≤ 5 and x + y ≥ 8'
    },
    {
      cause: 'Resource vs Requirement Conflict',
      description: 'When required output exceeds available resources.',
      example: 'Production capacity < minimum demand'
    },
    {
      cause: 'Conflicting Upper and Lower Bounds',
      description: 'When lower bounds exceed upper bounds on variables.',
      example: 'x ≥ 10 and x ≤ 5'
    },
    {
      cause: 'Tight Resource Constraints',
      description: 'When multiple resource constraints together are too restrictive.',
      example: 'x + y ≤ 3 and x + 2y ≤ 2 together limit x and y too much'
    }
  ];

  // Steps to handle infeasibility
  const handlingSteps = [
    {
      title: 'Step 1: Identify Conflicting Constraints',
      description: 'Find which constraints are causing the infeasibility by examining them systematically.',
      icon: '🔍'
    },
    {
      title: 'Step 2: Relax Constraints',
      description: 'Loosen one or more constraints to create a feasible region.',
      icon: '🔓'
    },
    {
      title: 'Step 3: Check for Errors',
      description: 'Verify that constraints were correctly formulated and no errors exist.',
      icon: '✅'
    },
    {
      title: 'Step 4: Use Artificial Variables',
      description: 'In the simplex method, artificial variables can identify infeasibility.',
      icon: '📊'
    },
    {
      title: 'Step 5: Reformulate the Problem',
      description: 'If necessary, reconsider the problem formulation and objectives.',
      icon: '🔄'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Not Recognizing Infeasibility',
      explanation: 'Students sometimes continue trying to solve an infeasible problem without realizing no solution exists.'
    },
    {
      mistake: 'Confusing Infeasible with Unbounded',
      explanation: 'Infeasible means no solution, unbounded means infinite solution. They are completely different cases.'
    },
    {
      mistake: 'Misidentifying the Conflicting Constraints',
      explanation: 'Students may not correctly identify which constraints are causing the infeasibility.'
    },
    {
      mistake: 'Incorrectly Relaxing Constraints',
      explanation: 'Relaxing the wrong constraints can change the nature of the problem.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Check Constraints Systematically',
      description: 'Before solving, check if constraints are consistent and feasible.'
    },
    {
      practice: 'Use Graphical Method First',
      description: 'For 2D problems, graph the constraints to visualize infeasibility.'
    },
    {
      practice: 'Identify the Minimum Change',
      description: 'If relaxing constraints, identify which constraint needs the smallest relaxation to achieve feasibility.'
    },
    {
      practice: 'Document Infeasibility',
      description: 'When a problem is infeasible, document which constraints conflict and why.'
    }
  ];

  // Visualization component for infeasible solutions
  const InfeasibleVisualization = ({ exampleIndex }) => {
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
                
                {/* Constraint 1 region (shaded) */}
                <line x1="50" y1="380" x2="450" y2="130" stroke="#FF6B6B" strokeWidth="3"/>
                <polygon points="50,400 50,380 450,130 450,400" fill="rgba(255, 107, 107, 0.15)" stroke="none"/>
                <text x="430" y="125" fontSize="11" fill="#FF6B6B" className="dark:fill-red-400">x + y ≤ 5</text>
                
                {/* Constraint 2 region (shaded) */}
                <line x1="50" y1="300" x2="450" y2="80" stroke="#4ECDC4" strokeWidth="3" strokeDasharray="8,4"/>
                <polygon points="50,400 450,400 450,80 50,300" fill="rgba(78, 205, 196, 0.15)" stroke="none"/>
                <text x="430" y="75" fontSize="11" fill="#4ECDC4" className="dark:fill-green-400">x + y ≥ 8</text>
                
                {/* No overlap indicator */}
                <text x="250" y="220" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#FF4757" className="dark:fill-red-400">
                  NO FEASIBLE
                </text>
                <text x="250" y="245" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#FF4757" className="dark:fill-red-400">
                  REGION
                </text>
                
                {/* Cross marks */}
                <text x="200" y="270" textAnchor="middle" fontSize="30" fill="#FF4757" className="dark:fill-red-400">✕</text>
                <text x="300" y="270" textAnchor="middle" fontSize="30" fill="#FF4757" className="dark:fill-red-400">✕</text>
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="200" height="80" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <line x1="10" y1="30" x2="30" y2="30" stroke="#FF6B6B" strokeWidth="3"/>
                  <text x="35" y="34" fontSize="10" fill="#555" className="dark:fill-gray-400">Constraint 1 (≤)</text>
                  <line x1="10" y1="50" x2="30" y2="50" stroke="#4ECDC4" strokeWidth="3" strokeDasharray="8,4"/>
                  <text x="35" y="54" fontSize="10" fill="#555" className="dark:fill-gray-400">Constraint 2 (≥)</text>
                  <text x="10" y="72" fontSize="10" fill="#FF4757" className="dark:fill-red-400">No overlap → Infeasible</text>
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
              
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                <h5 className="font-semibold text-red-700 dark:text-red-400 mb-2">Infeasibility Reason</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {example.infeasibilityReason}
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
            Infeasible Solution
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn about cases where linear programming problems have no solution because 
            constraints are contradictory or requirements exceed available resources.
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
                  ? "bg-red-500 text-white shadow-lg shadow-red-200 dark:shadow-red-900/30"
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
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-red-500"
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

              {/* Causes of Infeasibility */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Causes of Infeasibility
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {causes.map((cause, index) => (
                    <div
                      key={`cause-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                        {cause.cause}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {cause.description}
                      </p>
                      <code className="text-xs bg-white dark:bg-gray-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300">
                        {cause.example}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Handling Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  How to Handle Infeasibility
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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

              {/* How to Identify Infeasibility */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Identify Infeasibility
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Graphical Method</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>Plot all constraints on a graph</li>
                      <li>Look for overlapping feasible regions</li>
                      <li>If no overlap exists → Infeasible</li>
                      <li>Check if constraints are contradictory</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Algebraic Method</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>Check for contradictory inequalities</li>
                      <li>Test if a point satisfies all constraints</li>
                      <li>Use the simplex method with artificial variables</li>
                      <li>Look for zero feasible solutions</li>
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
                        ? "bg-red-500 text-white shadow-lg shadow-red-200 dark:shadow-red-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    Example {index + 1}
                  </button>
                ))}
              </div>

              {/* Example Visualization */}
              <InfeasibleVisualization exampleIndex={selectedExample} />

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
                        <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">
                          Infeasible
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
                  Practice Problems - Infeasible Solutions
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Identify Infeasibility
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Determine if this problem is infeasible:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 4x + 3y
                      Subject to:
                      2x + y ≤ 6
                      x + 2y ≤ 5
                      x + y ≥ 10
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Is there any feasible point? Why or why not?
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
                      <span className="font-semibold">Hint:</span> Check if the sum x + y can satisfy both x + y ≤ 6 and x + y ≥ 10.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Real-World Infeasibility
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A bakery has the following constraints:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 5x + 7y (Profit)
                      Flour: 2x + 3y ≤ 50 kg
                      Labor: 3x + 2y ≤ 40 hours
                      Demand: x + y ≥ 30 units
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Is the bakery's problem feasible? If not, what changes would you recommend?
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
                      <span className="font-semibold">Hint:</span> Check if resources are sufficient to meet minimum demand.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Fixing Infeasibility
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The following problem is infeasible:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Minimize Z = 2x + 3y
                      Subject to:
                      x + y ≥ 8
                      2x + y ≤ 10
                      x + 2y ≤ 6
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Which constraint(s) should be relaxed to make the problem feasible?
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
                      <span className="font-semibold">Hint:</span> Find the minimum relaxation needed to create a feasible region.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-200 dark:border-red-800">
                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                  💡 Tips for Identifying Infeasible Solutions
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Check for contradictions:</span> Look for constraints that directly conflict</li>
                  <li><span className="font-medium">Verify resource sufficiency:</span> Ensure resources can meet requirements</li>
                  <li><span className="font-medium">Graph the constraints:</span> No overlap means infeasible</li>
                  <li><span className="font-medium">Test a point:</span> Try to find any point satisfying all constraints</li>
                  <li><span className="font-medium">Identify the minimum change:</span> Find which constraint needs the smallest relaxation</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Infeasible Solutions FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Infeasible Solutions in Linear Programming"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic69_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Infeasibility is one of the most common and important issues in real-world optimization. I've seen many cases where managers set ambitious targets without checking if they're achievable. When I consult with companies, I always start by checking feasibility - it's amazing how often we find that the 'optimal' solution doesn't exist because the targets are unrealistic. I tell my students that recognizing infeasibility is a valuable skill - it saves time and prevents frustration. The key is to help decision-makers understand that infeasibility isn't a failure, it's a signal that the problem needs to be reconsidered. Sometimes the solution is to increase resources, sometimes to reduce requirements, and sometimes to completely rethink the approach." />
        </div>
      </div>
    </div>
  );
};

export default Topic69;