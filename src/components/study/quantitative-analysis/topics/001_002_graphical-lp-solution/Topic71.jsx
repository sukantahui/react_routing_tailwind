import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic71_files/topic71_questions';
import noteText from './topic71_files/topic71_note.txt?raw';

const Topic71 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Examples for redundant constraints
  const examples = [
    {
      title: 'Example 1: Simple Redundant Constraint',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\nx + y ≤ 10\nx ≤ 8\n2x + y ≤ 16\nx, y ≥ 0',
      redundantConstraints: ['x ≤ 8'],
      reason: 'The constraint x ≤ 8 is redundant because the feasible region is already bounded by x + y ≤ 10 and 2x + y ≤ 16. The maximum x value in the feasible region is less than 8.',
      visualization: 'The line x = 8 lies outside the feasible region and never forms part of its boundary.',
      solution: 'The constraint x ≤ 8 can be removed without changing the optimal solution.'
    },
    {
      title: 'Example 2: Redundant Resource Constraint',
      problem: 'A company has three resource constraints:\nMaximize Z = 4x + 5y\nSubject to:\n2x + y ≤ 20 (Resource A)\nx + 3y ≤ 24 (Resource B)\n3x + 2y ≤ 30 (Resource C)\nx, y ≥ 0',
      redundantConstraints: ['3x + 2y ≤ 30'],
      reason: 'Resource C is redundant because it is always less restrictive than the combination of Resources A and B. Any solution satisfying A and B will automatically satisfy C.',
      visualization: 'The constraint line for Resource C lies outside the feasible region formed by A and B.',
      solution: 'Resource C can be ignored in the analysis without affecting the optimal solution.'
    },
    {
      title: 'Example 3: Redundant in a Minimization Problem',
      problem: 'Minimize Z = 2x + 3y\nSubject to:\nx + y ≥ 6\n2x + y ≥ 8\nx + 2y ≥ 10\nx, y ≥ 0',
      redundantConstraints: ['x + y ≥ 6'],
      reason: 'The constraint x + y ≥ 6 is redundant because the other two constraints together imply it. Any point satisfying 2x + y ≥ 8 and x + 2y ≥ 10 will have x + y ≥ 6.',
      visualization: 'The feasible region for the stricter constraints lies entirely within the region for x + y ≥ 6.',
      solution: 'Remove the redundant constraint to simplify the problem.'
    },
    {
      title: 'Example 4: Multiple Redundant Constraints',
      problem: 'Maximize Z = 5x + 3y\nSubject to:\nx + y ≤ 12\n2x + y ≤ 18\nx + 2y ≤ 16\n3x + y ≤ 24\nx, y ≥ 0',
      redundantConstraints: ['x + y ≤ 12', '3x + y ≤ 24'],
      reason: 'Both constraints are redundant. x + y ≤ 12 is implied by the other constraints, and 3x + y ≤ 24 is always satisfied when the others are satisfied.',
      visualization: 'Two constraint lines lie outside the feasible region formed by the active constraints.',
      solution: 'Remove both redundant constraints to simplify the problem.'
    },
    {
      title: 'Example 5: Redundant Non-Negativity Constraint',
      problem: 'Maximize Z = 2x + y\nSubject to:\nx + y ≥ 5\n2x + 3y ≥ 12\nx, y ≥ 0',
      redundantConstraints: ['y ≥ 0'],
      reason: 'The constraint y ≥ 0 is redundant because the other constraints already force y to be positive. Any solution satisfying x + y ≥ 5 and 2x + 3y ≥ 12 will have y &gt; 0.',
      visualization: 'The feasible region is entirely in the positive y quadrant, making y ≥ 0 redundant.',
      solution: 'The non-negativity constraint y ≥ 0 can be removed, though it\'s usually kept for clarity.'
    }
  ];

  // Key concepts about redundant constraints
  const keyConcepts = [
    {
      title: 'Definition',
      description: 'A redundant constraint is a constraint that does not affect the feasible region or the optimal solution. Removing it does not change the problem\'s solution.'
    },
    {
      title: 'Graphical Identification',
      description: 'On a graph, redundant constraints appear as lines that lie outside the feasible region or do not form part of its boundary.'
    },
    {
      title: 'Algebraic Detection',
      description: 'A constraint is redundant if it is implied by the other constraints - any point satisfying the other constraints automatically satisfies this one.'
    },
    {
      title: 'Practical Significance',
      description: 'Identifying redundant constraints simplifies the problem, reduces computation time, and helps focus on the constraints that actually matter.'
    }
  ];

  // Types of redundant constraints
  const types = [
    {
      type: 'Completely Redundant',
      description: 'The constraint is always satisfied regardless of other constraints.',
      example: 'x + y ≤ 100 when the feasible region is x + y ≤ 10'
    },
    {
      type: 'Conditionally Redundant',
      description: 'The constraint is redundant under specific conditions or for certain objectives.',
      example: 'A constraint that is redundant for maximization but might be binding for minimization'
    },
    {
      type: 'Implicitly Redundant',
      description: 'The constraint is implied by a combination of other constraints.',
      example: 'x + y ≥ 6 implied by 2x + y ≥ 8 and x + 2y ≥ 10'
    }
  ];

  // Steps to identify redundant constraints
  const identificationSteps = [
    {
      title: 'Step 1: Graph All Constraints',
      description: 'Plot all constraint lines on a graph to visualize the feasible region.',
      icon: '📐'
    },
    {
      title: 'Step 2: Identify Active Constraints',
      description: 'Determine which constraints form the boundary of the feasible region.',
      icon: '🔍'
    },
    {
      title: 'Step 3: Check Each Constraint',
      description: 'For each constraint, check if removing it changes the feasible region.',
      icon: '✅'
    },
    {
      title: 'Step 4: Test Implication',
      description: 'Verify if the constraint is implied by the other constraints algebraically.',
      icon: '📊'
    },
    {
      title: 'Step 5: Remove Redundant Constraints',
      description: 'Simplify the problem by removing constraints that don\'t affect the solution.',
      icon: '🗑️'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Removing a Non-Redundant Constraint',
      explanation: 'Students sometimes remove constraints that appear redundant but actually affect the feasible region.'
    },
    {
      mistake: 'Not Verifying Redundancy Algebraically',
      explanation: 'Visual inspection alone is not enough - always verify algebraic implication.'
    },
    {
      mistake: 'Confusing Redundant with Non-Binding',
      explanation: 'A constraint can be non-binding at the optimum but still affect the feasible region elsewhere.'
    },
    {
      mistake: 'Removing Constraints in Sensitivity Analysis',
      explanation: 'Redundant constraints for one objective may become relevant for different objectives.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Verify Algebraically',
      description: 'Always verify redundancy algebraically, not just visually.'
    },
    {
      practice: 'Keep Redundant Constraints in Final Model',
      description: 'In real-world applications, keep redundant constraints for clarity and future modifications.'
    },
    {
      practice: 'Document Redundancy',
      description: 'When identifying redundant constraints, document why they are redundant.'
    },
    {
      practice: 'Recheck for Different Objectives',
      description: 'A constraint redundant for one objective may be important for another.'
    }
  ];

  // Visualization component for redundant constraints
  const RedundantVisualization = ({ exampleIndex }) => {
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
                
                {/* Active constraints (forming feasible region) */}
                <line x1="50" y1="380" x2="450" y2="80" stroke="#4ECDC4" strokeWidth="3"/>
                <text x="400" y="75" fontSize="11" fill="#4ECDC4" className="dark:fill-green-400">x + y ≤ 10</text>
                
                <line x1="150" y1="400" x2="450" y2="200" stroke="#4ECDC4" strokeWidth="3"/>
                <text x="400" y="195" fontSize="11" fill="#4ECDC4" className="dark:fill-green-400">2x + y ≤ 16</text>
                
                {/* Feasible region */}
                <polygon points="50,400 50,380 400,100 450,200 450,400" fill="rgba(78, 205, 196, 0.2)" stroke="none"/>
                
                {/* Redundant constraint */}
                <line x1="50" y1="350" x2="450" y2="50" stroke="#FF6B6B" strokeWidth="3" strokeDasharray="8,4"/>
                <text x="400" y="45" fontSize="11" fill="#FF6B6B" className="dark:fill-red-400">x ≤ 8 (Redundant)</text>
                
                {/* Cross through redundant line */}
                <text x="250" y="200" textAnchor="middle" fontSize="30" fill="#FF6B6B" opacity="0.5" className="dark:fill-red-400">✕</text>
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="220" height="90" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <line x1="10" y1="30" x2="30" y2="30" stroke="#4ECDC4" strokeWidth="3"/>
                  <text x="35" y="34" fontSize="10" fill="#555" className="dark:fill-gray-400">Active Constraints</text>
                  <line x1="10" y1="50" x2="30" y2="50" stroke="#FF6B6B" strokeWidth="3" strokeDasharray="8,4"/>
                  <text x="35" y="54" fontSize="10" fill="#555" className="dark:fill-gray-400">Redundant Constraint</text>
                  <rect x="10" y="65" width="20" height="15" fill="rgba(78, 205, 196, 0.2)" stroke="#4ECDC4" strokeWidth="1"/>
                  <text x="35" y="77" fontSize="10" fill="#555" className="dark:fill-gray-400">Feasible Region</text>
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
                <h5 className="font-semibold text-red-700 dark:text-red-400 mb-2">Redundant Constraints</h5>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                  {example.redundantConstraints.map((constraint, idx) => (
                    <li key={`redundant-${idx}`} className="font-mono">{constraint}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Reason for Redundancy</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {example.reason}
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Solution</h5>
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
            Redundant Constraints
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn about constraints that don't affect the feasible region or optimal solution, 
            and how to identify and handle them in linear programming.
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
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-200 dark:shadow-purple-900/30"
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
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-purple-500"
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

              {/* Types of Redundant Constraints */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Types of Redundant Constraints
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {types.map((type, index) => (
                    <div
                      key={`type-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
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

              {/* Identification Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  How to Identify Redundant Constraints
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {identificationSteps.map((step, index) => (
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

              {/* How to Identify Redundancy */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Identify Redundancy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Graphical Method</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>Plot all constraints on a graph</li>
                      <li>Identify the feasible region</li>
                      <li>Check which constraints form the boundary</li>
                      <li>Constraints not touching the boundary are redundant</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Algebraic Method</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <li>Check if constraint is implied by others</li>
                      <li>Use linear combinations of constraints</li>
                      <li>Test if removing constraint changes solution</li>
                      <li>Check for non-negativity implications</li>
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
                        ? "bg-purple-500 text-white shadow-lg shadow-purple-200 dark:shadow-purple-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  &gt;
                    Example {index + 1}
                  </button>
                ))}
              </div>

              {/* Example Visualization */}
              <RedundantVisualization exampleIndex={selectedExample} />

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
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded">
                          {example.redundantConstraints.length} redundant
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
                  Practice Problems - Redundant Constraints
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Identify the Redundant Constraint
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Which constraint is redundant in this problem?
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 2x + 3y
                      Subject to:
                      x + y ≤ 8
                      2x + y ≤ 12
                      3x + y ≤ 18
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Explain why the constraint is redundant.
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
                      <span className="font-semibold">Hint:</span> Graph the constraints and see which line lies outside the feasible region.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Verify Redundancy
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Determine if the constraint is redundant:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 5x + 2y
                      Subject to:
                      2x + y ≤ 10
                      x + 3y ≤ 12
                      3x + 2y ≤ 18
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Is 3x + 2y ≤ 18 redundant? Prove your answer.
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
                      <span className="font-semibold">Hint:</span> Check if the constraint is implied by the other constraints.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Real-World Redundancy
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company has the following resource constraints:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 4x + 3y (Profit in ₹)
                      Labor: 2x + y ≤ 40 hours
                      Material: x + 3y ≤ 45 units
                      Machine: 3x + 2y ≤ 60 hours
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      One of these constraints is redundant. Identify it and explain why management might still want to keep it.
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
                      <span className="font-semibold">Hint:</span> Consider both mathematical redundancy and practical importance.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
                  💡 Tips for Identifying Redundant Constraints
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Graph the problem:</span> Visually identify constraints that don't form the feasible region boundary</li>
                  <li><span className="font-medium">Check implication:</span> See if the constraint is implied by other constraints</li>
                  <li><span className="font-medium">Test removal:</span> Remove the constraint and check if the solution changes</li>
                  <li><span className="font-medium">Look for combination:</span> Check if constraint is a linear combination of others</li>
                  <li><span className="font-medium">Keep for context:</span> Even if redundant, keep constraints for real-world context</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Redundant Constraints FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Redundant Constraints in Linear Programming"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic71_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Redundant constraints are a fascinating aspect of LP because they reveal something about the problem formulation. In my consulting work, I often find redundant constraints that exist for historical reasons - someone added a constraint years ago and it's been kept 'just in case.' While they don't affect the mathematical solution, they can be important for communication and documentation. I tell my students that identifying redundant constraints is like finding 'dead code' in programming - it doesn't hurt to keep it, but removing it can make the problem cleaner and easier to understand. However, I always caution them: before removing a constraint, make sure you understand why it was added in the first place." />
        </div>
      </div>
    </div>
  );
};

export default Topic71;