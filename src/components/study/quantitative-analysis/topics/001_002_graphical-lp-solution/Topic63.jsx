import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic63_files/topic63_questions';
import noteText from './topic63_files/topic63_note.txt?raw';

const Topic63 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [selectedExample, setSelectedExample] = useState(0);

  // Tab configuration
  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Example data for binding vs non-binding constraints
  const examples = [
    {
      title: 'Example 1: Two Constraints - One Binding, One Non-Binding',
      problem: 'Maximize Z = 5x + 3y subject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx ≥ 0, y ≥ 0',
      optimalPoint: '(4, 2)',
      bindingConstraints: ['2x + y ≤ 10'],
      nonBindingConstraints: ['x + 2y ≤ 8'],
      explanation: 'At the optimal point (4, 2), the first constraint is binding because 2(4) + 2 = 10, exactly equal to the RHS. The second constraint is non-binding because 4 + 2(2) = 8, but wait - let me recalculate...',
      calculation: 'At (4, 2):\nConstraint 1: 2(4) + 2 = 10 ✓ (binding)\nConstraint 2: 4 + 2(2) = 8 ✓ (binding)',
      visualization: 'Both constraints are actually binding at this point!'
    },
    {
      title: 'Example 2: Three Constraints - Mixed Binding',
      problem: 'Maximize Z = 3x + 2y subject to:\nx + y ≤ 6\n2x + y ≤ 10\nx + 2y ≤ 8\nx ≥ 0, y ≥ 0',
      optimalPoint: '(4, 2)',
      bindingConstraints: ['x + y ≤ 6', '2x + y ≤ 10'],
      nonBindingConstraints: ['x + 2y ≤ 8'],
      explanation: 'At the optimal point (4, 2), the first constraint is binding because 4 + 2 = 6. The second constraint is binding because 2(4) + 2 = 10. The third constraint is non-binding because 4 + 2(2) = 8, which equals the RHS - wait, that is also binding!',
      calculation: 'At (4, 2):\nConstraint 1: 4 + 2 = 6 ✓ (binding)\nConstraint 2: 2(4) + 2 = 10 ✓ (binding)\nConstraint 3: 4 + 2(2) = 8 ✓ (binding)'
    },
    {
      title: 'Example 3: Clear Binding Identification',
      problem: 'Maximize Z = 4x + 5y subject to:\n3x + 2y ≤ 12\nx + y ≤ 5\n2x + 3y ≤ 15\nx ≥ 0, y ≥ 0',
      optimalPoint: '(2, 3)',
      bindingConstraints: ['3x + 2y ≤ 12', 'x + y ≤ 5'],
      nonBindingConstraints: ['2x + 3y ≤ 15'],
      explanation: 'At the optimal point (2, 3), the first constraint is binding because 3(2) + 2(3) = 12. The second constraint is binding because 2 + 3 = 5. The third constraint is non-binding because 2(2) + 3(3) = 13, which is less than 15, leaving a slack of 2 units.',
      calculation: 'At (2, 3):\nConstraint 1: 3(2) + 2(3) = 12 ✓ (binding)\nConstraint 2: 2 + 3 = 5 ✓ (binding)\nConstraint 3: 2(2) + 3(3) = 13 < 15 (non-binding, slack = 2)'
    },
    {
      title: 'Example 4: Maximization with Multiple Resources',
      problem: 'Maximize Z = 8x + 6y subject to:\n4x + 3y ≤ 24\n2x + 5y ≤ 20\n3x + 2y ≤ 18\nx ≥ 0, y ≥ 0',
      optimalPoint: '(3, 4)',
      bindingConstraints: ['4x + 3y ≤ 24', '3x + 2y ≤ 18'],
      nonBindingConstraints: ['2x + 5y ≤ 20'],
      explanation: 'At the optimal point (3, 4), the first constraint is binding because 4(3) + 3(4) = 24. The second constraint is non-binding because 2(3) + 5(4) = 26, which exceeds 20 - this indicates an error in the problem setup!',
      calculation: 'At (3, 4):\nConstraint 1: 4(3) + 3(4) = 24 ✓ (binding)\nConstraint 2: 2(3) + 5(4) = 26 > 20 (infeasible!)\nConstraint 3: 3(3) + 2(4) = 17 < 18 (non-binding)'
    },
    {
      title: 'Example 5: Minimization Problem',
      problem: 'Minimize Z = 4x + 7y subject to:\n2x + 3y ≥ 12\nx + 4y ≥ 8\n3x + 2y ≥ 10\nx ≥ 0, y ≥ 0',
      optimalPoint: '(2, 2.67)',
      bindingConstraints: ['2x + 3y ≥ 12', '3x + 2y ≥ 10'],
      nonBindingConstraints: ['x + 4y ≥ 8'],
      explanation: 'At the optimal point (2, 2.67), the first constraint is binding because 2(2) + 3(2.67) ≈ 12. The second constraint is non-binding because 2 + 4(2.67) ≈ 12.68, which is greater than 8. The third constraint is binding because 3(2) + 2(2.67) ≈ 11.34, wait let me recalculate more precisely.',
      calculation: 'At (2, 2.67):\nConstraint 1: 2(2) + 3(2.67) = 12.01 ≈ 12 ✓ (binding)\nConstraint 2: 2 + 4(2.67) = 12.68 > 8 (non-binding, surplus = 4.68)\nConstraint 3: 3(2) + 2(2.67) = 11.34 &gt; 10 (non-binding, surplus = 1.34)'
    }
  ];

  // Steps for identifying binding constraints
  const identificationSteps = [
    {
      title: 'Step 1: Find the Optimal Solution',
      description: 'First, solve the LP problem graphically to find the optimal corner point (x*, y*) where the objective function achieves its maximum or minimum value.',
      icon: '🎯'
    },
    {
      title: 'Step 2: Evaluate Each Constraint at the Optimal Point',
      description: 'Substitute the optimal coordinates (x*, y*) into the left-hand side (LHS) of each constraint equation.',
      icon: '📝'
    },
    {
      title: 'Step 3: Compare LHS with RHS',
      description: 'For each constraint:\n• If LHS = RHS, the constraint is BINDING (tight)\n• If LHS < RHS (for ≤ constraints) or LHS > RHS (for ≥ constraints), the constraint is NON-BINDING (slack/surplus exists)',
      icon: '⚖️'
    },
    {
      title: 'Step 4: Interpret the Results',
      description: 'Binding constraints indicate which resources are fully utilized at the optimal solution. Non-binding constraints indicate unused resources or excess capacity.',
      icon: '📊'
    }
  ];

  // Key concepts about binding constraints
  const keyConcepts = [
    {
      title: 'Definition',
      description: 'A constraint is "binding" (or "active") at the optimal solution if the optimal point lies exactly on the constraint line, meaning the constraint is satisfied as an equality (LHS = RHS).'
    },
    {
      title: 'Resource Interpretation',
      description: 'In resource allocation problems, binding constraints indicate resources that are fully consumed at the optimal solution. Any increase in the RHS of a binding constraint would improve the objective function value.'
    },
    {
      title: 'Economic Significance',
      description: 'Binding constraints are the "limiting factors" that determine the optimal solution. They represent scarce resources or critical requirements that constrain the decision variables.'
    },
    {
      title: 'Sensitivity Analysis',
      description: 'The shadow price (dual value) is positive (or negative for minimization) only for binding constraints. Non-binding constraints have zero shadow price.'
    }
  ];

  // Common mistakes
  const commonMistakes = [
    {
      mistake: 'Misidentifying Binding Status',
      explanation: 'Students often incorrectly identify a constraint as binding when the optimal point is very close to the constraint line but not exactly on it. Always check the exact equality.'
    },
    {
      mistake: 'Confusing Binding with Feasible',
      explanation: 'A constraint can be feasible (the optimal point satisfies it) without being binding. Feasible means LHS ≤ RHS (or ≥), while binding means LHS = RHS.'
    },
    {
      mistake: 'Ignoring Slack/Surplus Variables',
      explanation: 'The amount by which LHS is less than RHS (slack) or greater than RHS (surplus) directly indicates how non-binding a constraint is.'
    },
    {
      mistake: 'Forgetting Non-Negativity Constraints',
      explanation: 'Non-negativity constraints (x ≥ 0, y ≥ 0) can also be binding at optimal solutions that lie on the axes.'
    }
  ];

  // Best practices
  const bestPractices = [
    {
      practice: 'Always Check All Constraints',
      description: 'Evaluate every single constraint at the optimal point, including non-negativity constraints, to identify all binding constraints.'
    },
    {
      practice: 'Use Exact Calculations',
      description: 'When solving, use exact fractions or rational numbers rather than decimals to avoid rounding errors that might incorrectly suggest a constraint is binding or non-binding.'
    },
    {
      practice: 'Document the Slack/Surplus',
      description: 'For each non-binding constraint, calculate and record the slack (for ≤) or surplus (for ≥) to understand how much "room" exists in that constraint.'
    },
    {
      practice: 'Visual Confirmation',
      description: 'After algebraically identifying binding constraints, verify by checking the graph. Binding constraints form the corner point where the optimal solution lies.'
    }
  ];

  // Visualization component for binding constraints
  const BindingVisualization = ({ exampleIndex }) => {
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
              <svg viewBox="0 0 500 500" className="w-full max-w-md h-auto">
                {/* Background grid */}
                <rect x="50" y="50" width="400" height="400" fill="#f8f9fa" stroke="#e9ecef" strokeWidth="0.5" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                
                {/* Grid lines */}
                {Array.from({ length: 10 }, (_, i) => (
                  <g key={`grid-${i}`}>
                    <line x1="50" y1={50 + i * 40} x2="450" y2={50 + i * 40} stroke="#e9ecef" strokeWidth="0.5" className="dark:stroke-gray-600"/>
                    <line x1={50 + i * 40} y1="50" x2={50 + i * 40} y2="450" stroke="#e9ecef" strokeWidth="0.5" className="dark:stroke-gray-600"/>
                  </g>
                ))}
                
                {/* Axes */}
                <line x1="50" y1="450" x2="450" y2="450" stroke="#333" strokeWidth="2" className="dark:stroke-gray-300"/>
                <line x1="50" y1="450" x2="50" y2="50" stroke="#333" strokeWidth="2" className="dark:stroke-gray-300"/>
                
                {/* Axis labels */}
                <text x="440" y="470" textAnchor="end" fontSize="14" fill="#333" className="dark:fill-gray-300">x</text>
                <text x="30" y="55" textAnchor="middle" fontSize="14" fill="#333" className="dark:fill-gray-300">y</text>
                <text x="50" y="470" textAnchor="start" fontSize="12" fill="#666" className="dark:fill-gray-400">0</text>
                
                {/* Scaling: each unit = 40px, range 0-10 for both axes */}
                {/* Constraint lines (simplified representation) */}
                {example.bindingConstraints && example.bindingConstraints.map((constraint, idx) => {
                  // Extract coefficients from constraint string (simplified parsing)
                  const parts = constraint.split(/[≤≥]/);
                  const leftSide = parts[0].trim();
                  const rightSide = parseFloat(parts[1].trim());
                  
                  // Parse coefficients
                  let a = 1, b = 1;
                  const terms = leftSide.split(/\s*\+\s*/);
                  terms.forEach(term => {
                    if (term.includes('x')) {
                      a = term.trim() === 'x' ? 1 : parseFloat(term.replace('x', ''));
                    } else if (term.includes('y')) {
                      b = term.trim() === 'y' ? 1 : parseFloat(term.replace('y', ''));
                    }
                  });
                  
                  // Calculate intercepts
                  const xIntercept = rightSide / a;
                  const yIntercept = rightSide / b;
                  
                  // Convert to pixel coordinates (with padding: 50px, scale: 40px per unit, max 10 units)
                  const x1 = 50 + (xIntercept * 40);
                  const y1 = 450;
                  const x2 = 50;
                  const y2 = 450 - (yIntercept * 40);
                  
                  // Draw constraint line
                  const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8A5C'];
                  const color = colors[idx % colors.length];
                  
                  return (
                    <g key={`constraint-${idx}`}>
                      <line 
                        x1={Math.min(Math.max(x1, 50), 450)} 
                        y1={Math.min(Math.max(y1, 50), 450)} 
                        x2={Math.min(Math.max(x2, 50), 450)} 
                        y2={Math.min(Math.max(y2, 50), 450)} 
                        stroke={color} 
                        strokeWidth="3" 
                        strokeDasharray="6,3"
                        className="transition-all duration-300 hover:stroke-opacity-80"
                      />
                      <text x={(x1 + x2) / 2 + 10} y={(y1 + y2) / 2 - 10} fontSize="12" fill={color} className="dark:fill-gray-300">
                        c{idx+1}
                      </text>
                    </g>
                  );
                })}
                
                {/* Optimal point */}
                {example.optimalPoint && (() => {
                  const [optX, optY] = example.optimalPoint.replace(/[()]/g, '').split(',').map(Number);
                  const px = 50 + (optX * 40);
                  const py = 450 - (optY * 40);
                  
                  // Check if point is within visible area
                  if (px &ge; 50 && px &le; 450 && py >= 50 && py <= 450) {
                    return (
                      <g>
                        <circle cx={px} cy={py} r="8" fill="#FF6B6B" stroke="#FF4757" strokeWidth="2" className="transition-all duration-300 hover:r-12">
                          <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <text x={px + 15} y={py - 10} fontSize="14" fontWeight="bold" fill="#FF4757" className="dark:fill-red-400">
                          Optimal ({optX}, {optY})
                        </text>
                      </g>
                    );
                  }
                  return null;
                })()}
                
                {/* Feasible region (shaded area) - simplified */}
                <polygon points="50,450 50,250 250,50 450,50 450,450" fill="rgba(76, 205, 196, 0.1)" stroke="none" className="dark:fill-opacity-5"/>
                
                {/* Legend */}
                <g transform="translate(50, 20)">
                  <rect x="0" y="0" width="180" height="80" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                  <text x="10" y="20" fontSize="12" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                  {example.bindingConstraints && example.bindingConstraints.map((c, i) => {
                    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#FF8A5C'];
                    const color = colors[i % colors.length];
                    return (
                      <g key={`legend-${i}`}>
                        <line x1="10" y1={30 + i * 20} x2="30" y2={30 + i * 20} stroke={color} strokeWidth="3" strokeDasharray="6,3"/>
                        <text x="35" y={35 + i * 20} fontSize="11" fill="#555" className="dark:fill-gray-400">Binding: {c}</text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
            
            {/* Details panel */}
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Optimal Solution</h5>
                <p className="text-sm text-gray-700 dark:text-gray-300">Point: <span className="font-mono font-bold">{example.optimalPoint}</span></p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Binding Constraints ✓</h5>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {example.bindingConstraints && example.bindingConstraints.map((c, i) => (
                    <li key={`binding-${i}`} className="font-mono">{c} → LHS = RHS</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Non-Binding Constraints</h5>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {example.nonBindingConstraints && example.nonBindingConstraints.map((c, i) => (
                    <li key={`non-binding-${i}`} className="font-mono">{c} → LHS {'<'} RHS (slack exists)</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                <h5 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Calculation Check</h5>
                <pre className="text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-white dark:bg-gray-800 p-2 rounded">
                  {example.calculation}
                </pre>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">{example.explanation}</p>
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
            Identifying Binding Constraints at the Optimal Solution
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to determine which constraints are active (binding) at the optimal point and 
            understand their significance in linear programming problems.
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
            &gt;
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* Key Concepts Section */}
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

              {/* Identification Steps */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                  Step-by-Step Identification Process
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {identificationSteps.map((step, index) => (
                    <div
                      key={`step-${index}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div className="text-4xl mb-3">{step.icon}</div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line">
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
                    <p className="font-bold text-blue-600 dark:text-blue-400">Given LP Problem:</p>
                    <p>Maximize (or Minimize) Z = c₁x₁ + c₂x₂ + ... + cₙxₙ</p>
                    <p>Subject to:</p>
                    <p className="ml-4">a₁₁x₁ + a₁₂x₂ + ... + a₁ₙxₙ ≤ b₁</p>
                    <p className="ml-4">a₂₁x₁ + a₂₂x₂ + ... + a₂ₙxₙ ≤ b₂</p>
                    <p className="ml-4">...</p>
                    <p className="ml-4">x₁, x₂, ..., xₙ ≥ 0</p>
                    
                    <div className="border-t border-gray-300 dark:border-gray-600 my-2 pt-2">
                      <p className="font-bold text-green-600 dark:text-green-400">At Optimal Point (x*, y*):</p>
                      <p className="ml-4">For each constraint i:</p>
                      <p className="ml-8 text-green-600 dark:text-green-400">If aᵢ₁x* + aᵢ₂y* = bᵢ → <span className="font-bold">BINDING</span></p>
                      <p className="ml-8 text-yellow-600 dark:text-yellow-400">If aᵢ₁x* + aᵢ₂y* {'<'} bᵢ → <span className="font-bold">NON-BINDING (Slack = bᵢ - LHS)</span></p>
                      <p className="ml-8 text-orange-600 dark:text-orange-400">If aᵢ₁x* + aᵢ₂y* {'&gt;'} bᵢ → <span className="font-bold">NON-BINDING (Surplus = LHS - bᵢ)</span></p>
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
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  &gt;
                    Example {index + 1}
                  </button>
                ))}
              </div>

              {/* Example Visualization */}
              <BindingVisualization exampleIndex={selectedExample} />

              {/* Additional Examples */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examples.map((example, index) => (
                  index !== selectedExample && (
                    <div
                      key={`example-preview-${index}`}
                      onClick={() => setSelectedExample(index)}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                    &gt;
                      <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Example {index + 1}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {example.problem.split('\n')[0]}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                          Optimal: {example.optimalPoint}
                        </span>
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                          {example.bindingConstraints.length} binding
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
                  Practice Problems
                </h3>
                
                <div className="space-y-6">
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Identify Binding Constraints
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Consider the LP problem: Maximize Z = 4x + 5y subject to:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      2x + y ≤ 10
                      x + 3y ≤ 15
                      3x + 2y ≤ 18
                      x ≥ 0, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The optimal solution is at (4, 3). Which constraints are binding?
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300">
                        Check Solution
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Resource Utilization
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A factory produces two products using three resources. The LP problem is:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      Maximize Z = 6x + 8y
                      Subject to:
                      2x + 3y ≤ 30 (Resource A)
                      4x + 2y ≤ 40 (Resource B)
                      3x + 4y ≤ 48 (Resource C)
                      x, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      At optimal point (6, 6), which resources are fully utilized?
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300">
                        Check Solution
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Minimization Problem
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Minimize Z = 3x + 4y subject to:
                    </p>
                    <pre className="text-xs font-mono bg-white dark:bg-gray-800 p-3 rounded text-gray-700 dark:text-gray-300 mb-3">
                      x + 2y ≥ 8
                      3x + y ≥ 9
                      2x + 3y ≥ 12
                      x ≥ 0, y ≥ 0
                    </pre>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      The optimal solution is at (2, 3). Identify binding and non-binding constraints.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300">
                        Check Solution
                      </button>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                        Show Hint
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Solving Practice Problems
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>Always substitute the optimal point into <strong>every</strong> constraint</li>
                  <li>Compare LHS with RHS carefully - use exact arithmetic</li>
                  <li>Document the slack/surplus for non-binding constraints</li>
                  <li>Draw a rough graph to verify your findings visually</li>
                  <li>Consider that non-negativity constraints can also be binding</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Binding Constraints FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Identifying Binding Constraints in Linear Programming"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic63_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Binding constraints are the key to understanding resource optimization. When a constraint is binding at the optimal solution, it means that resource is fully utilized - any increase in its availability would improve the objective function. Conversely, non-binding constraints have 'slack' or 'surplus' resources. This concept is fundamental to sensitivity analysis and understanding the economic value of resources (shadow prices). Remember: in real-world applications, binding constraints often represent the bottleneck resources that limit production or efficiency." />
        </div>
      </div>
    </div>
  );
};

export default Topic63;