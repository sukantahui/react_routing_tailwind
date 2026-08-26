import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic83_files/topic83_questions';
import noteText from './topic83_files/topic83_note.txt?raw';

const Topic83 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedCheck, setSelectedCheck] = useState(0);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Verification checks data
  const verificationChecks = [
    {
      id: 1,
      title: 'Check 1: Verify All Constraints',
      icon: '✅',
      description: 'Substitute the optimal solution into every constraint to ensure it satisfies all limitations.',
      steps: [
        'Take your optimal solution (x*, y*)',
        'Substitute into each constraint equation',
        'Check that each inequality holds',
        'If any constraint is violated, the solution is infeasible'
      ],
      example: 'For constraints: 2x + y ≤ 10, x + 2y ≤ 8\nAt (4,2): 2(4)+2=10 ≤ 10 ✓, 4+2(2)=8 ≤ 8 ✓',
      tip: 'Pay special attention to constraints that were not binding - they should have slack.'
    },
    {
      id: 2,
      title: 'Check 2: Verify Corner Points',
      icon: '📍',
      description: 'Confirm that all corner points of the feasible region were correctly identified.',
      steps: [
        'List all corner points you found',
        'Check each is formed by the intersection of two constraints',
        'Verify each corner point is feasible',
        'Check if any corner points were missed'
      ],
      example: 'Corner points should include: (0,0), (5,0), (4,2), (0,4)\nVerify each satisfies all constraints.',
      tip: 'Don\'t forget intersections with axes and intersections of constraint lines.'
    },
    {
      id: 3,
      title: 'Check 3: Verify Objective Function Evaluation',
      icon: '📊',
      description: 'Double-check that the objective function was evaluated correctly at all corner points.',
      steps: [
        'Re-evaluate Z at each corner point',
        'Check arithmetic calculations',
        'Verify you selected the correct optimal point (max or min)',
        'Confirm no other corner point gives a better value'
      ],
      example: 'Z(4,2) = 5(4) + 3(2) = 20 + 6 = 26\nVerify all calculations are correct.',
      tip: 'Use a calculator or re-calculate manually to catch arithmetic errors.'
    },
    {
      id: 4,
      title: 'Check 4: Verify the Graph',
      icon: '📐',
      description: 'Re-examine your graph to ensure it was drawn accurately.',
      steps: [
        'Check intercepts are correctly plotted',
        'Verify lines are drawn straight',
        'Confirm shading is on the correct side',
        'Check that the feasible region is correctly identified'
      ],
      example: 'Line 2x + y = 10 should pass through (5,0) and (0,10).\nCheck that your line matches these intercepts.',
      tip: 'Use graph paper and a ruler for accuracy.'
    },
    {
      id: 5,
      title: 'Check 5: Verify Slack/Surplus',
      icon: '📏',
      description: 'Calculate slack for each constraint to verify resource utilization.',
      steps: [
        'Calculate LHS for each constraint at optimal point',
        'Compute slack = RHS - LHS (for ≤ constraints)',
        'Verify slack ≥ 0 for all constraints',
        'Check that slack = 0 for binding constraints'
      ],
      example: 'Constraint: 2x + y ≤ 10\nAt (4,2): LHS = 10, Slack = 0 → Binding constraint.',
      tip: 'Binding constraints should have zero slack; non-binding constraints should have positive slack.'
    },
    {
      id: 6,
      title: 'Check 6: Verify the Reasonableness',
      icon: '🤔',
      description: 'Check if the solution makes practical sense in the context of the problem.',
      steps: [
        'Are the values realistic?',
        'Do they make sense in the context?',
        'Could there be any practical issues?',
        'Does the solution align with intuition?'
      ],
      example: 'If producing negative chairs or tables, something is wrong.\nIf production seems too high or too low, check your work.',
      tip: 'A good solution should "feel right" for the problem context.'
    },
    {
      id: 7,
      title: 'Check 7: Verify the Shading',
      icon: '🎨',
      description: 'Confirm that the feasible region is shaded correctly.',
      steps: [
        'Test a point in the shaded region',
        'Verify it satisfies ALL constraints',
        'Test a point outside the shaded region',
        'Verify it violates at least one constraint'
      ],
      example: 'Shade the region that satisfies all constraints.\nTest (2,2) - should be in feasible region.\nTest (6,6) - should be outside feasible region.',
      tip: 'The origin (0,0) is usually the easiest test point if it satisfies all constraints.'
    },
    {
      id: 8,
      title: 'Check 8: Verify the Optimality',
      icon: '🏆',
      description: 'Confirm that the chosen point is indeed optimal.',
      steps: [
        'Check all corner points',
        'For maximization: verify no corner point has higher Z',
        'For minimization: verify no corner point has lower Z',
        'Check if objective line slope indicates optimality'
      ],
      example: 'If Z(4,2) = 26 is the maximum, all other corner points should have Z ≤ 26.',
      tip: 'The objective function line should touch the feasible region at the optimal corner point.'
    }
  ];

  // Key concepts about checking solutions
  const keyConcepts = [
    {
      title: 'Why Check?',
      description: 'Checking your solution catches errors, builds confidence, and ensures the answer is correct and meaningful.'
    },
    {
      title: 'What to Check',
      description: 'Verify constraints, corner points, objective evaluation, graphing accuracy, slack, reasonableness, shading, and optimality.'
    },
    {
      title: 'When to Check',
      description: 'Check your work at each step, not just at the end. This catches errors early when they\'re easier to fix.'
    },
    {
      title: 'How to Check',
      description: 'Use a systematic verification process. Go through each check one by one. Document your verification.'
    }
  ];

  // Complete verification example
  const verificationExample = {
    problem: 'Maximize Z = 5x + 3y\nSubject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx, y ≥ 0',
    solution: '(4, 2) with Z = 26',
    checks: [
      {
        check: 'Constraints',
        details: '2(4)+2=10 ≤ 10 ✓\n4+2(2)=8 ≤ 8 ✓\n4 ≥ 0 ✓, 2 ≥ 0 ✓'
      },
      {
        check: 'Corner Points',
        details: '(0,0), (5,0), (4,2), (0,4) - all found and feasible'
      },
      {
        check: 'Objective Evaluation',
        details: 'Z(0,0)=0, Z(5,0)=25, Z(4,2)=26, Z(0,4)=12\n26 is the maximum ✓'
      },
      {
        check: 'Graph',
        details: 'Lines through correct intercepts, shading correct ✓'
      },
      {
        check: 'Slack',
        details: 'Constraint 1: 10-10=0 (binding), Constraint 2: 8-8=0 (binding)'
      },
      {
        check: 'Reasonableness',
        details: 'Production values are positive and make sense for the problem ✓'
      },
      {
        check: 'Shading',
        details: 'Feasible region correctly identified ✓'
      },
      {
        check: 'Optimality',
        details: 'No other corner point gives Z &gt; 26 ✓'
      }
    ]
  };

  // Visualization component for verification checks
  const VerificationVisualization = ({ checkIndex }) => {
    const check = verificationChecks[checkIndex];
    if (!check) return null;

    return (
      <div className="w-full max-w-4xl mx-auto my-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{check.icon}</span>
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {check.title}
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
                
                {/* Axis labels */}
                <text x="440" y="420" textAnchor="end" fontSize="14" fill="#333" className="dark:fill-gray-300">x</text>
                <text x="30" y="35" textAnchor="middle" fontSize="14" fill="#333" className="dark:fill-gray-300">y</text>
                <text x="50" y="420" textAnchor="start" fontSize="12" fill="#666" className="dark:fill-gray-400">0</text>
                
                {/* Constraint lines */}
                <line x1="50" y1="400" x2="250" y2="400" stroke="#FF6B6B" strokeWidth="2" strokeDasharray="4,4"/>
                <line x1="50" y1="400" x2="50" y2="200" stroke="#4ECDC4" strokeWidth="2" strokeDasharray="4,4"/>
                <line x1="50" y1="380" x2="450" y2="80" stroke="#FF6B6B" strokeWidth="2"/>
                <line x1="50" y1="350" x2="450" y2="150" stroke="#4ECDC4" strokeWidth="2"/>
                
                {/* Feasible region */}
                <polygon points="50,400 50,350 300,200 450,80 450,400" fill="rgba(78, 205, 196, 0.1)" stroke="none"/>
                
                {/* Optimal point */}
                <circle cx="250" cy="250" r="10" fill="#FF4757" stroke="white" strokeWidth="3">
                  <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="250" y="240" textAnchor="middle" fontSize="10" fill="#FF4757" className="dark:fill-red-400">(x*, y*)</text>
                
                {/* Check-specific visualization */}
                {checkIndex === 0 && (
                  <g>
                    <text x="250" y="300" textAnchor="middle" fontSize="12" fill="#4ECDC4">✓ All constraints satisfied</text>
                    <text x="250" y="320" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Substitute (x*, y*) into each constraint</text>
                  </g>
                )}
                {checkIndex === 1 && (
                  <g>
                    <circle cx="50" cy="400" r="6" fill="#FFE66D"/>
                    <text x="35" y="415" fontSize="9" fill="#FFE66D">(0,0)</text>
                    <circle cx="450" cy="400" r="6" fill="#FFE66D"/>
                    <text x="440" y="415" fontSize="9" fill="#FFE66D">(5,0)</text>
                    <circle cx="250" cy="250" r="6" fill="#FFE66D"/>
                    <text x="235" y="245" fontSize="9" fill="#FFE66D">(4,2)</text>
                    <circle cx="50" cy="200" r="6" fill="#FFE66D"/>
                    <text x="30" y="195" fontSize="9" fill="#FFE66D">(0,4)</text>
                    <text x="250" y="300" textAnchor="middle" fontSize="12" fill="#4ECDC4">All corner points found ✓</text>
                  </g>
                )}
                {checkIndex === 2 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#FFE66D">Z = 5x + 3y</text>
                    <text x="250" y="130" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">(0,0): Z = 0</text>
                    <text x="250" y="150" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">(5,0): Z = 25</text>
                    <text x="250" y="170" textAnchor="middle" fontSize="11" fill="#FF4757" fontWeight="bold">(4,2): Z = 26 ← Max</text>
                    <text x="250" y="190" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">(0,4): Z = 12</text>
                    <text x="250" y="300" textAnchor="middle" fontSize="12" fill="#4ECDC4">Calculations verified ✓</text>
                  </g>
                )}
                {checkIndex === 3 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#FFE66D">Graph Check</text>
                    <text x="250" y="130" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">• Intercepts: (5,0), (0,10) ✓</text>
                    <text x="250" y="150" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">• Lines: Straight ✓</text>
                    <text x="250" y="170" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">• Shading: Correct ✓</text>
                    <text x="250" y="190" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">• Feasible region: Identified ✓</text>
                    <text x="250" y="300" textAnchor="middle" fontSize="12" fill="#4ECDC4">Graph accurate ✓</text>
                  </g>
                )}
                {checkIndex === 4 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#FFE66D">Slack Analysis</text>
                    <text x="250" y="130" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Constraint 1: 2x + y ≤ 10</text>
                    <text x="250" y="150" textAnchor="middle" fontSize="10" fill="#FF4757">LHS = 10, Slack = 0 (Binding)</text>
                    <text x="250" y="180" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Constraint 2: x + 2y ≤ 8</text>
                    <text x="250" y="200" textAnchor="middle" fontSize="10" fill="#FF4757">LHS = 8, Slack = 0 (Binding)</text>
                    <text x="250" y="300" textAnchor="middle" fontSize="12" fill="#4ECDC4">Slack correct ✓</text>
                  </g>
                )}
                {checkIndex === 5 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#FFE66D">Reasonableness Check</text>
                    <text x="250" y="140" textAnchor="middle" fontSize="11" fill="#4ECDC4">✓ Values are positive</text>
                    <text x="250" y="165" textAnchor="middle" fontSize="11" fill="#4ECDC4">✓ Production quantities make sense</text>
                    <text x="250" y="190" textAnchor="middle" fontSize="11" fill="#4ECDC4">✓ Resource usage is plausible</text>
                    <text x="250" y="215" textAnchor="middle" fontSize="11" fill="#4ECDC4">✓ Solution aligns with problem context</text>
                    <text x="250" y="300" textAnchor="middle" fontSize="12" fill="#4ECDC4">Solution is reasonable ✓</text>
                  </g>
                )}
                {checkIndex === 6 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#FFE66D">Shading Verification</text>
                    <circle cx="200" cy="300" r="8" fill="#4ECDC4"/>
                    <text x="180" y="320" fontSize="9" fill="#4ECDC4">Test (2,2) ✓</text>
                    <circle cx="350" cy="200" r="8" fill="#FF6B6B"/>
                    <text x="335" y="190" fontSize="9" fill="#FF6B6B">Test (6,6) ✗</text>
                    <text x="250" y="380" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Points in shaded region satisfy all constraints</text>
                    <text x="250" y="300" textAnchor="middle" fontSize="12" fill="#4ECDC4">Shading correct ✓</text>
                  </g>
                )}
                {checkIndex === 7 && (
                  <g>
                    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#FFE66D">Optimality Check</text>
                    <text x="250" y="140" textAnchor="middle" fontSize="11" fill="#666" className="dark:fill-gray-400">All corner points checked:</text>
                    <text x="250" y="165" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Z(0,0) = 0</text>
                    <text x="250" y="185" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Z(5,0) = 25</text>
                    <text x="250" y="205" textAnchor="middle" fontSize="10" fill="#FF4757" fontWeight="bold">Z(4,2) = 26 ← Maximum</text>
                    <text x="250" y="225" textAnchor="middle" fontSize="10" fill="#666" className="dark:fill-gray-400">Z(0,4) = 12</text>
                    <text x="250" y="300" textAnchor="middle" fontSize="12" fill="#4ECDC4">Optimality confirmed ✓</text>
                  </g>
                )}
                
                {/* Legend */}
                <g transform="translate(50, 10)">
                  <rect x="0" y="0" width="180" height="60" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  <circle cx="20" cy="40" r="5" fill="#FF4757"/>
                  <text x="35" y="44" fontSize="10" fill="#555" className="dark:fill-gray-400">Optimal Point</text>
                </g>
              </svg>
            </div>
            
            {/* Details Panel */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Description</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {check.description}
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Steps</h5>
                <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {check.steps.map((step, idx) => (
                    <li key={`step-${idx}`}>{step}</li>
                  ))}
                </ol>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Example</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                  {check.example}
                </p>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Pro Tip</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {check.tip}
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
            Checking a Graphical Solution
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to verify and validate your graphical LP solutions to ensure accuracy, 
            catch errors, and build confidence in your answers.
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
                  ? "bg-green-600 text-white shadow-lg shadow-green-200 dark:shadow-green-900/30"
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
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-l-4 border-green-600"
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

              {/* Verification Checklist */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Complete Verification Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {verificationChecks.map((check) => (
                    <div
                      key={`check-${check.id}`}
                      onClick={() => setSelectedCheck(check.id - 1)}
                      className={clsx(
                        "bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
                        selectedCheck === check.id - 1 ? "border-2 border-green-500" : ""
                      )}
                    &gt;
                      <div className="text-center">
                        <div className="text-4xl mb-2">{check.icon}</div>
                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                          {check.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification Process */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  The Verification Process
                </h3>
                <div className="relative">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {['Verify', 'Validate', 'Confirm', 'Finalize'].map((step, index) => (
                      <div key={`process-${index}`} className="flex-1 text-center">
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-2 text-2xl">
                          {['🔍', '📊', '✅', '🏆'][index]}
                        </div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{step}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {['Check all constraints', 'Verify calculations', 'Confirm optimality', 'Final answer ready'][index]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Complete Example */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Complete Verification Example
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Problem</h4>
                    <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {verificationExample.problem}
                    </pre>
                    <p className="mt-2 text-sm font-semibold text-green-600 dark:text-green-400">
                      Solution: {verificationExample.solution}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Verification Results</h4>
                    <ul className="list-disc list-inside text-xs text-gray-700 dark:text-gray-300 space-y-1">
                      {verificationExample.checks.map((check, idx) => (
                        <li key={`verify-${idx}`}>
                          <span className="font-semibold">{check.check}:</span> {check.details}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'examples' && (
            <>
              {/* Check Selector */}
              <div className="flex flex-wrap gap-3 justify-center">
                {verificationChecks.map((check) => (
                  <button
                    key={`check-btn-${check.id}`}
                    onClick={() => setSelectedCheck(check.id - 1)}
                    className={clsx(
                      "px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 flex items-center gap-1",
                      selectedCheck === check.id - 1
                        ? "bg-green-600 text-white shadow-lg shadow-green-200 dark:shadow-green-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  &gt;
                    {check.icon}
                    {check.id}
                  </button>
                ))}
              </div>

              {/* Check Visualization */}
              <VerificationVisualization checkIndex={selectedCheck} />

              {/* Check Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {verificationChecks.map((check, index) => (
                  index !== selectedCheck && (
                    <div
                      key={`check-summary-${index}`}
                      onClick={() => setSelectedCheck(index)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    &gt;
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{check.icon}</span>
                        <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                          {check.title}
                        </h5>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {check.description}
                      </p>
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
                  Practice Problems - Checking Solutions
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Verify the Solution
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A student found the optimal solution for this problem:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 4x + 5y
                      2x + y ≤ 12
                      x + 3y ≤ 15
                      x, y ≥ 0
                      
                      Solution: (3, 4) with Z = 32
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Is this solution correct? Verify using the checking procedure.
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
                      <span className="font-semibold">Hint:</span> Check if (3,4) satisfies all constraints and if any other corner point gives a higher Z.
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Find the Error
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      This solution was submitted but has an error:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 3x + 2y
                      2x + y ≤ 10
                      x + 2y ≤ 8
                      x, y ≥ 0
                      
                      Student solution: (4, 2) with Z = 16
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      What is the error? Verify the solution step by step.
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
                      <span className="font-semibold">Hint:</span> Check the objective function calculation and compare with other corner points.
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Complete Verification
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Perform a complete verification of this solution:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Max Z = 5x + 7y
                      3x + 2y ≤ 18
                      x + 4y ≤ 16
                      x, y ≥ 0
                      
                      Candidate solution: (4, 3) with Z = 41
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Verify constraints, corner points, objective evaluation, slack, and optimality.
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
                      <span className="font-semibold">Hint:</span> Use the complete verification checklist - constraints, corner points, objective evaluation, graph, slack, reasonableness, shading, and optimality.
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Checking */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  💡 Tips for Checking Your Solutions
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Be systematic:</span> Follow the verification checklist in order</li>
                  <li><span className="font-medium">Don't assume:</span> Verify everything - even if it "looks right"</li>
                  <li><span className="font-medium">Check early and often:</span> Verify as you go, not just at the end</li>
                  <li><span className="font-medium">Use multiple methods:</span> If possible, verify using different approaches</li>
                  <li><span className="font-medium">Document your verification:</span> Write down what you checked and the results</li>
                  <li><span className="font-medium">Learn from verification:</span> If you find an error, understand why it happened</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Checking Graphical Solutions FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Checking a Graphical Solution"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic83_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Teaching students to check their work is one of the most important skills I can impart. I've seen too many students lose marks on otherwise correct solutions because of small errors that could have been caught with a simple check. I tell my students: 'The best solvers aren't those who never make mistakes - they're those who catch and correct them before submitting.' I require students to show their verification work alongside their solution. This practice has dramatically improved accuracy in my classes." />
        </div>
      </div>
    </div>
  );
};

export default Topic83;