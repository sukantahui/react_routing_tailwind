import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic64_files/topic64_questions';
import noteText from './topic64_files/topic64_note.txt?raw';

const Topic64 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Examples for slack calculation
  const examples = [
    {
      title: 'Example 1: Simple Slack Calculation',
      problem: 'Maximize Z = 5x + 3y subject to:\n2x + y ≤ 10\nx, y ≥ 0\nOptimal point: (3, 4)',
      calculations: [
        'Constraint: 2x + y ≤ 10',
        'At (3, 4): LHS = 2(3) + 4 = 10',
        'RHS = 10',
        'Slack = RHS - LHS = 10 - 10 = 0',
        'Result: Slack = 0 → Binding constraint'
      ],
      interpretation: 'All 10 units of the resource are fully utilized. There is no unused capacity.'
    },
    {
      title: 'Example 2: Multiple Resources with Slack',
      problem: 'Maximize Z = 4x + 6y subject to:\n3x + 2y ≤ 18\nx + 4y ≤ 16\nx, y ≥ 0\nOptimal point: (4, 3)',
      calculations: [
        'Constraint 1: 3x + 2y ≤ 18',
        'At (4, 3): LHS = 3(4) + 2(3) = 12 + 6 = 18',
        'RHS = 18',
        'Slack₁ = 18 - 18 = 0 → Binding',
        '',
        'Constraint 2: x + 4y ≤ 16',
        'At (4, 3): LHS = 4 + 4(3) = 4 + 12 = 16',
        'RHS = 16',
        'Slack₂ = 16 - 16 = 0 → Binding'
      ],
      interpretation: 'Both resources are fully utilized at the optimal solution. No slack in any constraint.'
    },
    {
      title: 'Example 3: Significant Slack',
      problem: 'Maximize Z = 2x + 3y subject to:\n4x + 2y ≤ 20\nx + 3y ≤ 15\nx, y ≥ 0\nOptimal point: (2, 4)',
      calculations: [
        'Constraint 1: 4x + 2y ≤ 20',
        'At (2, 4): LHS = 4(2) + 2(4) = 8 + 8 = 16',
        'RHS = 20',
        'Slack₁ = 20 - 16 = 4 units',
        'Result: 4 units of Resource 1 remain unused',
        '',
        'Constraint 2: x + 3y ≤ 15',
        'At (2, 4): LHS = 2 + 3(4) = 2 + 12 = 14',
        'RHS = 15',
        'Slack₂ = 15 - 14 = 1 unit',
        'Result: 1 unit of Resource 2 remains unused'
      ],
      interpretation: 'There is unused capacity in both resources. Resource 1 has 4 units slack, Resource 2 has 1 unit slack.'
    },
    {
      title: 'Example 4: Slack in Minimization Problem',
      problem: 'Minimize Z = 3x + 2y subject to:\n2x + y ≥ 8\nx + 2y ≥ 6\nx, y ≥ 0\nOptimal point: (3, 2)',
      calculations: [
        'Constraint 1: 2x + y ≥ 8 (≥ constraint)',
        'At (3, 2): LHS = 2(3) + 2 = 8',
        'RHS = 8',
        'Surplus = LHS - RHS = 8 - 8 = 0 → Binding',
        '(Note: For ≥ constraints, this is surplus, not slack)',
        '',
        'Constraint 2: x + 2y ≥ 6',
        'At (3, 2): LHS = 3 + 2(2) = 7',
        'RHS = 6',
        'Surplus = 7 - 6 = 1 unit',
        'Result: 1 unit excess beyond minimum requirement'
      ],
      interpretation: 'First constraint is binding. Second constraint has a surplus of 1 unit above the minimum requirement.'
    },
    {
      title: 'Example 5: Slack in Resource Allocation',
      problem: 'A factory produces two products using three resources:\nMaximize Z = 8x + 5y\nResource A: 2x + 3y ≤ 24\nResource B: 4x + y ≤ 20\nResource C: x + 2y ≤ 10\nOptimal point: (4, 3)',
      calculations: [
        'Resource A: 2x + 3y ≤ 24',
        'At (4, 3): LHS = 2(4) + 3(3) = 8 + 9 = 17',
        'RHS = 24',
        'Slack = 24 - 17 = 7 units → Significant slack',
        '',
        'Resource B: 4x + y ≤ 20',
        'At (4, 3): LHS = 4(4) + 3 = 19',
        'RHS = 20',
        'Slack = 20 - 19 = 1 unit → Almost binding',
        '',
        'Resource C: x + 2y ≤ 10',
        'At (4, 3): LHS = 4 + 2(3) = 10',
        'RHS = 10',
        'Slack = 10 - 10 = 0 → Binding'
      ],
      interpretation: 'Resource C is fully utilized (binding). Resource B has minimal slack (1 unit). Resource A has significant unused capacity (7 units).'
    }
  ];

  // Key concepts about slack
  const keyConcepts = [
    {
      title: 'What is Slack?',
      description: 'Slack is the difference between the right-hand side (RHS) and left-hand side (LHS) of a ≤ constraint at the optimal solution. It represents unused capacity or resources that are not fully utilized.'
    },
    {
      title: 'Mathematical Definition',
      description: 'For a constraint a₁x + a₂y ≤ b, slack = b - (a₁x* + a₂y*) where (x*, y*) is the optimal solution. Slack ≥ 0 always for feasible solutions.'
    },
    {
      title: 'Slack vs Surplus',
      description: 'Slack applies to ≤ constraints (resource constraints). Surplus applies to ≥ constraints (requirement constraints). Both represent the "gap" between actual and limit values.'
    },
    {
      title: 'Economic Interpretation',
      description: 'Slack represents unused resources that could be allocated elsewhere. Resources with zero slack are scarce and have economic value (positive shadow prices).'
    }
  ];

  // Steps for calculating slack
  const calculationSteps = [
    {
      title: 'Step 1: Find Optimal Solution',
      description: 'Solve the LP problem to find the optimal point (x*, y*) where the objective function is maximized or minimized.',
      icon: '🎯'
    },
    {
      title: 'Step 2: Evaluate LHS',
      description: 'For each ≤ constraint, substitute (x*, y*) into the left-hand side: LHS = a₁x* + a₂y*.',
      icon: '📝'
    },
    {
      title: 'Step 3: Calculate Slack',
      description: 'Slack = RHS - LHS. This gives the amount of unused resource for each constraint.',
      icon: '📊'
    },
    {
      title: 'Step 4: Interpret Results',
      description: 'If slack = 0, the constraint is binding. If slack > 0, there is unused capacity. Larger slack means more unused resources.',
      icon: '💡'
    }
  ];

  // Interactive Slack Calculator Component
  const SlackCalculator = () => {
    const [constraint, setConstraint] = useState('3x + 2y ≤ 18');
    const [xVal, setXVal] = useState(4);
    const [yVal, setYVal] = useState(3);

    // Parse constraint and calculate slack
    const calculateSlack = () => {
      // Simplified parsing for demonstration
      const match = constraint.match(/(\d*)x\s*\+\s*(\d*)y\s*≤\s*(\d+)/);
      if (!match) return null;
      
      const a = parseInt(match[1]) || 1;
      const b = parseInt(match[2]) || 1;
      const rhs = parseInt(match[3]);
      const lhs = a * xVal + b * yVal;
      const slack = rhs - lhs;
      
      return { a, b, rhs, lhs, slack, isBinding: slack === 0 };
    };

    const result = calculateSlack();

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Slack Calculator
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Enter a constraint and point to calculate slack:
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Constraint (format: ax + by ≤ c)
            </label>
            <input
              type="text"
              value={constraint}
              onChange={(e) => setConstraint(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="e.g., 3x + 2y ≤ 18"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                x value
              </label>
              <input
                type="number"
                value={xVal}
                onChange={(e) => setXVal(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                y value
              </label>
              <input
                type="number"
                value={yVal}
                onChange={(e) => setYVal(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
          
          {result && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Results:</h5>
              <div className="space-y-1 text-sm font-mono text-gray-700 dark:text-gray-300">
                <p>LHS = {result.a}x + {result.b}y = {result.a}({xVal}) + {result.b}({yVal}) = {result.lhs}</p>
                <p>RHS = {result.rhs}</p>
                <p className={clsx(
                  "font-bold",
                  result.slack === 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                )}>
                  Slack = {result.rhs} - {result.lhs} = {result.slack}
                </p>
                <p className={clsx(
                  "font-bold",
                  result.slack === 0 ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"
                )}>
                  Status: {result.slack === 0 ? "BINDING" : "NON-BINDING"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Using Slack for ≥ Constraints',
      explanation: 'Slack only applies to ≤ constraints. For ≥ constraints, we calculate surplus instead. Both represent the "gap" but in opposite directions.'
    },
    {
      mistake: 'Negative Slack Values',
      explanation: 'At feasible points, slack is always ≥ 0. Negative slack indicates the point is infeasible (does not satisfy the constraint).'
    },
    {
      mistake: 'Misinterpreting Slack Units',
      explanation: 'Slack is measured in the same units as the constraint\'s RHS. For example, if a constraint represents hours, slack is measured in hours.'
    },
    {
      mistake: 'Ignoring Non-Negativity Slack',
      explanation: 'Non-negativity constraints (x ≥ 0, y ≥ 0) also have slack/surplus. If x > 0, the constraint x ≥ 0 has slack.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Always Calculate Slack',
      description: 'After finding the optimal solution, calculate slack for every ≤ constraint. This helps identify unused resources and potential for improvement.'
    },
    {
      practice: 'Use Exact Values',
      description: 'When solving, use exact fractions rather than decimals to avoid rounding errors in slack calculations.'
    },
    {
      practice: 'Record Slack Values',
      description: 'Document slack values for each constraint. This information is valuable for sensitivity analysis and resource allocation decisions.'
    },
    {
      practice: 'Visualize Slack',
      description: 'On a graph, slack can be seen as the distance from the optimal point to the constraint line. This visual understanding helps in interpreting slack.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Slack in a Constraint
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to calculate and interpret slack - the unused capacity in resource constraints 
            that provides insight into optimal resource allocation.
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

              {/* Calculation Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Steps to Calculate Slack
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {calculationSteps.map((step, index) => (
                    <div
                      key={`step-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="text-4xl mb-3">{step.icon}</div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
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
                    <p className="font-bold text-blue-600 dark:text-blue-400">Slack Definition:</p>
                    <p>For a ≤ constraint: a₁x + a₂y ≤ b</p>
                    <p className="ml-4">At optimal point (x*, y*):</p>
                    <p className="ml-8">Slack = b - (a₁x* + a₂y*)</p>
                    <p className="ml-8 text-sm text-gray-500 dark:text-gray-400">Where Slack ≥ 0</p>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-green-600 dark:text-green-400">If Slack = 0:</p>
                      <p className="ml-4">The constraint is BINDING (fully utilized)</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">No unused resource</p>
                    </div>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-yellow-600 dark:text-yellow-400">If Slack {'>'} 0:</p>
                      <p className="ml-4">The constraint is NON-BINDING</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">There are Slack units of unused resource</p>
                    </div>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-purple-600 dark:text-purple-400">For ≥ Constraints (Surplus):</p>
                      <p className="ml-4">Surplus = (a₁x* + a₂y*) - b</p>
                      <p className="ml-4 text-sm text-gray-500 dark:text-gray-400">Surplus ≥ 0</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Calculator */}
              <SlackCalculator />

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

              {/* Example Display */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  {examples[selectedExample].title}
                </h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Problem Statement */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Problem</h5>
                    <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {examples[selectedExample].problem}
                    </pre>
                  </div>
                  
                  {/* Calculations */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Calculations</h5>
                    <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {examples[selectedExample].calculations.join('\n')}
                    </pre>
                  </div>
                </div>
                
                {/* Interpretation */}
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Interpretation</h5>
                  <p className="text-gray-700 dark:text-gray-300">
                    {examples[selectedExample].interpretation}
                  </p>
                </div>
              </div>

              {/* Quick Reference */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Slack Reference Table
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Constraint Type</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Slack/Surplus</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Interpretation</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">a₁x + a₂y ≤ b</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Slack = b - LHS</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Unused resource</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">≤</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">a₁x + a₂y ≥ b</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Surplus = LHS - b</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Excess requirement</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded">≥</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">a₁x + a₂y = b</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Slack/Surplus = 0</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-300">Binding constraint</td>
                        <td className="px-4 py-2">
                          <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded">Binding</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'practice' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Practice Problems
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Calculate Slack
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A company uses two resources. The LP problem is:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 5x + 7y
                      Subject to:
                      3x + 2y ≤ 24
                      x + 3y ≤ 18
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      At optimal point (6, 3), calculate slack for each constraint.
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
                      <span className="font-semibold">Hint:</span> For each constraint, substitute x=6 and y=3, then subtract from RHS.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Slack Interpretation
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A factory produces two products. The LP problem is:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 4x + 6y
                      Subject to:
                      2x + 4y ≤ 32
                      5x + 3y ≤ 30
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      At optimal point (4, 3), slack₁ = 12, slack₂ = 1.
                      Interpret these results.
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
                      <span className="font-semibold">Hint:</span> Think about what slack means for each resource.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Slack vs Surplus
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A diet planning problem:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Minimize Z = 2x + 3y
                      Subject to:
                      4x + y ≥ 12
                      2x + 5y ≥ 10
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      At optimal point (2, 2), calculate slack/surplus for each constraint.
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
                      <span className="font-semibold">Hint:</span> For ≥ constraints, calculate surplus = LHS - RHS.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Slack Calculations
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>Always substitute the optimal point <strong>exactly</strong> to calculate slack</li>
                  <li>For ≤ constraints: Slack = RHS - LHS</li>
                  <li>For ≥ constraints: Surplus = LHS - RHS</li>
                  <li>Slack = 0 means the constraint is <strong>binding</strong></li>
                  <li>Slack {'>'} 0 means there are <strong>unused resources</strong></li>
                  <li>Large slack values indicate significant unused capacity</li>
                  <li>Small slack values indicate the constraint is close to being binding</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Slack in Constraints FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Slack in Linear Programming Constraints"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic64_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Slack is one of the most practical concepts in linear programming. In the real world, managers rarely have perfectly balanced resource utilization. Slack tells them where they have excess capacity that could potentially be used for other purposes. It's important to emphasize to students that slack isn't 'waste' - it's just unused capacity that might be valuable for flexibility or future expansion. I always encourage students to think of slack as 'breathing room' in the system." />
        </div>
      </div>
    </div>
  );
};

export default Topic64;