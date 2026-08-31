import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic3_files/topic3_questions';
import noteText from './topic3_files/topic3_note.txt?raw';

const Topic3 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [showExample, setShowExample] = useState({});
  const [showSolution, setShowSolution] = useState(null);
  const [showHint, setShowHint] = useState(null);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Example data with detailed solutions
  const examples = [
    {
      id: 1,
      title: 'Example 1: Two Constraints',
      problem: 'Determine the feasible region for:\n2x + y ≤ 10\nx + 2y ≤ 8\nx ≥ 0, y ≥ 0',
      solution: 'Feasible region is the shaded area bounded by:\n(0,0), (5,0), (4,2), (0,4)',
      detailedSolution: 'Step 1: Graph each constraint\n\nConstraint 1: 2x + y ≤ 10\n- Convert to equality: 2x + y = 10\n- Intercepts: (5,0) and (0,10)\n- Test (0,0): 0 ≤ 10 ✓ → shade below\n\nConstraint 2: x + 2y ≤ 8\n- Convert to equality: x + 2y = 8\n- Intercepts: (8,0) and (0,4)\n- Test (0,0): 0 ≤ 8 ✓ → shade below\n\nConstraint 3: x ≥ 0 (right of y-axis)\nConstraint 4: y ≥ 0 (above x-axis)\n\nStep 2: Find the feasible region\n- The feasible region is where all shaded areas overlap\n- Corner points: (0,0), (5,0), (4,2), (0,4)\n\nStep 3: Verify the region\n- All points in the region satisfy all constraints'
    },
    {
      id: 2,
      title: 'Example 2: Three Constraints',
      problem: 'Determine the feasible region for:\nx + y ≤ 6\n2x + y ≤ 10\nx + 2y ≤ 8\nx ≥ 0, y ≥ 0',
      solution: 'Feasible region is the shaded area bounded by:\n(0,0), (5,0), (4,2), (0,4)',
      detailedSolution: 'Step 1: Graph each constraint\n\nConstraint 1: x + y ≤ 6\n- Intercepts: (6,0) and (0,6)\n- Test (0,0): 0 ≤ 6 ✓ → shade below\n\nConstraint 2: 2x + y ≤ 10\n- Intercepts: (5,0) and (0,10)\n- Test (0,0): 0 ≤ 10 ✓ → shade below\n\nConstraint 3: x + 2y ≤ 8\n- Intercepts: (8,0) and (0,4)\n- Test (0,0): 0 ≤ 8 ✓ → shade below\n\nConstraint 4: x ≥ 0, y ≥ 0\n\nStep 2: Find the feasible region\n- The feasible region is where all shaded areas overlap\n- Corner points: (0,0), (5,0), (4,2), (0,4)\n\nStep 3: Identify redundant constraints\n- x + y ≤ 6 is redundant (never binds)\n- The feasible region is determined by constraints 2 and 3'
    },
    {
      id: 3,
      title: 'Example 3: Minimization with ≥ Constraints',
      problem: 'Determine the feasible region for:\nx + y ≥ 4\n2x + y ≥ 6\nx ≥ 0, y ≥ 0',
      solution: 'Feasible region is the unbounded region above both lines.',
      detailedSolution: 'Step 1: Graph each constraint\n\nConstraint 1: x + y ≥ 4\n- Intercepts: (4,0) and (0,4)\n- Test (0,0): 0 ≥ 4 ✗ → shade above\n\nConstraint 2: 2x + y ≥ 6\n- Intercepts: (3,0) and (0,6)\n- Test (0,0): 0 ≥ 6 ✗ → shade above\n\nConstraint 3: x ≥ 0, y ≥ 0\n\nStep 2: Find the feasible region\n- The feasible region is where all shaded areas overlap\n- The region is unbounded (extends to infinity)\n- Corner points: (3,0), (2,2), (0,4)'
    },
    {
      id: 4,
      title: 'Example 4: Mixed Constraints',
      problem: 'Determine the feasible region for:\nx + 2y ≤ 10\n3x + y ≥ 6\nx ≥ 1\ny ≥ 0',
      solution: 'Feasible region is the bounded region between the constraints.',
      detailedSolution: 'Step 1: Graph each constraint\n\nConstraint 1: x + 2y ≤ 10\n- Intercepts: (10,0) and (0,5)\n- Test (0,0): 0 ≤ 10 ✓ → shade below\n\nConstraint 2: 3x + y ≥ 6\n- Intercepts: (2,0) and (0,6)\n- Test (0,0): 0 ≥ 6 ✗ → shade above\n\nConstraint 3: x ≥ 1 → shade right of x=1\nConstraint 4: y ≥ 0 → shade above x-axis\n\nStep 2: Find the feasible region\n- The feasible region is where all shaded areas overlap\n- Corner points: (1,0), (2,0), (2,4), (1,4.5)'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Find the Feasible Region',
      problem: 'Find the feasible region for:\n3x + 2y ≤ 12\nx + y ≤ 5\nx ≥ 0, y ≥ 0\n\nList all corner points.',
      hint: 'Graph each constraint, shade the feasible region, and find the intersection points.',
      solution: 'Corner points: (0,0), (4,0), (2,3), (0,5)'
    },
    {
      id: 2,
      title: 'Feasible Region with ≥ Constraints',
      problem: 'Find the feasible region for:\n2x + y ≥ 4\nx + 3y ≥ 6\nx ≥ 0, y ≥ 0\n\nList all corner points.',
      hint: 'For ≥ constraints, shade above the line. The region is unbounded.',
      solution: 'Corner points: (2,0), (0,4), intersection at (1.2, 1.6)'
    },
    {
      id: 3,
      title: 'Feasible Region with Mixed Constraints',
      problem: 'Find the feasible region for:\nx + 2y ≤ 8\n3x + y ≥ 6\nx ≥ 1\ny ≥ 0\n\nList all corner points.',
      hint: 'Graph each constraint carefully. The feasible region is bounded by these constraints.',
      solution: 'Corner points: (1,0), (2,0), (2,3), (1,3.5)'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Feasible Region Visualizer
  const FeasibleRegionVisualizer = () => {
    // Pre-defined systems
    const systems = [
      {
        id: 'system1',
        label: 'System 1: Two Constraints',
        constraints: [
          { a: 2, b: 1, c: 10, symbol: '≤' },
          { a: 1, b: 2, c: 8, symbol: '≤' }
        ],
        region: 'bounded'
      },
      {
        id: 'system2',
        label: 'System 2: Three Constraints',
        constraints: [
          { a: 1, b: 1, c: 6, symbol: '≤' },
          { a: 2, b: 1, c: 10, symbol: '≤' },
          { a: 1, b: 2, c: 8, symbol: '≤' }
        ],
        region: 'bounded'
      },
      {
        id: 'system3',
        label: 'System 3: ≥ Constraints',
        constraints: [
          { a: 1, b: 1, c: 4, symbol: '≥' },
          { a: 2, b: 1, c: 6, symbol: '≥' }
        ],
        region: 'unbounded'
      }
    ];

    const [selectedSystem, setSelectedSystem] = useState(0);
    const system = systems[selectedSystem];

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Feasible Region Visualizer
        </h4>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select System:</p>
          <div className="flex flex-wrap gap-2">
            {systems.map((sys, index) => (
              <button
                key={sys.id}
                onClick={() => setSelectedSystem(index)}
                className={clsx(
                  "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300",
                  selectedSystem === index
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                )}
              >
                {sys.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Constraints:</p>
              {system.constraints.map((c, idx) => (
                <p key={`c-${idx}`} className="text-sm font-mono text-gray-700 dark:text-gray-300">
                  {c.a}x + {c.b}y {c.symbol} {c.c}
                </p>
              ))}
              <p className="text-sm font-mono text-gray-700 dark:text-gray-300">x ≥ 0, y ≥ 0</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                <span className="font-semibold">Region Type:</span> {system.region}
              </p>
            </div>
          </div>

          {/* SVG Graph */}
          <div className="flex justify-center items-center">
            <svg viewBox="0 0 400 400" className="w-full max-w-sm h-auto">
              {/* Background */}
              <rect x="0" y="0" width="400" height="400" fill="#f8f9fa" className="dark:fill-gray-700"/>
              
              {/* Grid */}
              {Array.from({ length: 10 }, (_, i) => (
                <g key={`grid-${i}`}>
                  <line x1={40 + i * 32} y1="40" x2={40 + i * 32} y2="360" stroke="#e9ecef" strokeWidth="0.5" className="dark:stroke-gray-600"/>
                  <line x1="40" y1={40 + i * 32} x2="360" y2={40 + i * 32} stroke="#e9ecef" strokeWidth="0.5" className="dark:stroke-gray-600"/>
                </g>
              ))}
              
              {/* Axes */}
              <line x1="40" y1="360" x2="360" y2="360" stroke="#333" strokeWidth="2" className="dark:stroke-gray-300"/>
              <line x1="40" y1="360" x2="40" y2="40" stroke="#333" strokeWidth="2" className="dark:stroke-gray-300"/>
              
              {/* Labels */}
              <text x="355" y="380" textAnchor="end" fontSize="12" fill="#333" className="dark:fill-gray-300">x</text>
              <text x="25" y="45" textAnchor="middle" fontSize="12" fill="#333" className="dark:fill-gray-300">y</text>
              <text x="40" y="380" textAnchor="start" fontSize="10" fill="#666" className="dark:fill-gray-400">0</text>
              
              {/* Scale marks */}
              {Array.from({ length: 10 }, (_, i) => {
                const val = i;
                const xPos = 40 + val * 32;
                const yPos = 360 - val * 32;
                return (
                  <g key={`scale-${i}`}>
                    <text x={xPos} y="375" textAnchor="middle" fontSize="8" fill="#666" className="dark:fill-gray-400">{val}</text>
                    <text x="30" y={yPos + 3} textAnchor="end" fontSize="8" fill="#666" className="dark:fill-gray-400">{val}</text>
                  </g>
                );
              })}
              
              {/* Constraint lines */}
              {system.constraints.map((c, idx) => {
                const xInt = c.c / c.a;
                const yInt = c.c / c.b;
                const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D'];
                const color = colors[idx % colors.length];
                const x1 = 40 + Math.min(Math.max(xInt, 0), 10) * 32;
                const y1 = 360;
                const x2 = 40;
                const y2 = 360 - Math.min(Math.max(yInt, 0), 10) * 32;
                const isLE = c.symbol === '≤';
                
                return (
                  <g key={`line-${idx}`}>
                    <line 
                      x1={Math.min(Math.max(x1, 40), 360)} 
                      y1={Math.min(Math.max(y1, 40), 360)} 
                      x2={Math.min(Math.max(x2, 40), 360)} 
                      y2={Math.min(Math.max(y2, 40), 360)} 
                      stroke={color} 
                      strokeWidth="2"
                      strokeDasharray={isLE ? "" : "8,4"}
                    />
                    <text x={340} y={50 + idx * 20} fontSize="9" fill={color}>
                      {c.a}x + {c.b}y {c.symbol} {c.c}
                    </text>
                  </g>
                );
              })}
              
              {/* Feasible region shading */}
              {selectedSystem === 0 && (
                <polygon points="40,360 40,360 200,360 280,200 40,280" fill="rgba(78, 205, 196, 0.15)" stroke="none"/>
              )}
              {selectedSystem === 1 && (
                <polygon points="40,360 40,360 200,360 280,200 40,280" fill="rgba(78, 205, 196, 0.15)" stroke="none"/>
              )}
              {selectedSystem === 2 && (
                <polygon points="40,40 40,360 200,360 240,280 40,200" fill="rgba(78, 205, 196, 0.15)" stroke="none"/>
              )}
              
              {/* Corner points markers */}
              {selectedSystem === 0 && (
                <>
                  <circle cx="40" cy="360" r="5" fill="#FF4757"/>
                  <text x="30" y="375" fontSize="8" fill="#FF4757">(0,0)</text>
                  <circle cx="200" cy="360" r="5" fill="#FF4757"/>
                  <text x="190" y="375" fontSize="8" fill="#FF4757">(5,0)</text>
                  <circle cx="240" cy="280" r="5" fill="#FF4757"/>
                  <text x="230" y="275" fontSize="8" fill="#FF4757">(4,2)</text>
                  <circle cx="40" cy="280" r="5" fill="#FF4757"/>
                  <text x="10" y="275" fontSize="8" fill="#FF4757">(0,4)</text>
                </>
              )}
              {selectedSystem === 1 && (
                <>
                  <circle cx="40" cy="360" r="5" fill="#FF4757"/>
                  <text x="30" y="375" fontSize="8" fill="#FF4757">(0,0)</text>
                  <circle cx="200" cy="360" r="5" fill="#FF4757"/>
                  <text x="190" y="375" fontSize="8" fill="#FF4757">(5,0)</text>
                  <circle cx="240" cy="280" r="5" fill="#FF4757"/>
                  <text x="230" y="275" fontSize="8" fill="#FF4757">(4,2)</text>
                  <circle cx="40" cy="280" r="5" fill="#FF4757"/>
                  <text x="10" y="275" fontSize="8" fill="#FF4757">(0,4)</text>
                </>
              )}
              {selectedSystem === 2 && (
                <>
                  <circle cx="120" cy="360" r="5" fill="#FF4757"/>
                  <text x="110" y="375" fontSize="8" fill="#FF4757">(3,0)</text>
                  <circle cx="240" cy="280" r="5" fill="#FF4757"/>
                  <text x="230" y="275" fontSize="8" fill="#FF4757">(2,2)</text>
                  <circle cx="40" cy="280" r="5" fill="#FF4757"/>
                  <text x="10" y="275" fontSize="8" fill="#FF4757">(0,4)</text>
                </>
              )}
              
              {/* Label */}
              <text x="200" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#666" className="dark:fill-gray-400">
                Feasible Region (Shaded)
              </text>
              
              {/* Legend */}
              <g transform="translate(270, 40)">
                <rect x="0" y="0" width="90" height="60" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                <rect x="10" y="28" width="20" height="10" fill="rgba(78, 205, 196, 0.3)" stroke="#4ECDC4" strokeWidth="1"/>
                <text x="35" y="37" fontSize="8" fill="#555" className="dark:fill-gray-400">Feasible</text>
                <circle cx="20" cy="50" r="4" fill="#FF4757"/>
                <text x="35" y="54" fontSize="8" fill="#555" className="dark:fill-gray-400">Corner</text>
              </g>
            </svg>
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
            Determining the Feasible Region
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to find the feasible region from a system of constraint lines - the intersection 
            of all constraints that contains all possible solutions to an LP problem.
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
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-200 dark:shadow-purple-900/30"
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
              {/* What is the Feasible Region? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is the Feasible Region?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  The feasible region is the set of all points that satisfy ALL constraints of a linear 
                  programming problem simultaneously. It represents all possible solutions to the problem. 
                  The feasible region is always a convex polygon (or unbounded region) formed by the 
                  intersection of all constraint half-planes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Properties</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Intersection of all constraint half-planes</li>
                      <li>Always convex (no indentations)</li>
                      <li>Can be bounded or unbounded</li>
                      <li>Optimal solution at a corner point</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why It Matters</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Contains all feasible solutions</li>
                      <li>Limits where optimal solution can be</li>
                      <li>Essential for graphical LP</li>
                      <li>Identifies constraints that matter</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Find the Feasible Region */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Find the Feasible Region
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 1: Graph Constraints</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Plot each constraint as a line</li>
                      <li>Use intercepts or slope-intercept</li>
                      <li>Draw solid lines for ≤ or ≥</li>
                      <li>Draw dashed lines for {'<'} or {'>'}</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 2: Shade Half-Planes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Test a point (usually origin)</li>
                      <li>Shade the feasible side</li>
                      <li>≤ → shade below/left</li>
                      <li>≥ → shade above/right</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step 3: Identify Overlap</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Find where all shaded regions overlap</li>
                      <li>This is the feasible region</li>
                      <li>Identify corner points</li>
                      <li>Check if region is bounded</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interactive Visualizer */}
              <FeasibleRegionVisualizer />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Finding the Feasible Region
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Always test a point to verify shading</li>
                      <li>Use (0,0) when possible</li>
                      <li>Check all constraints are satisfied</li>
                      <li>Look for redundant constraints</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Shading the wrong side</li>
                      <li>Missing a constraint</li>
                      <li>Not including non-negativity</li>
                      <li>Forgetting to test points</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Mini Checklist */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  ✅ Mini Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">All constraints graphed correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Half-planes shaded correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Feasible region identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Corner points found</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Region checked for bounded/unbounded</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">All constraints verified</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'examples' && (
            <>
              <div className="space-y-6">
                {examples.map((example) => (
                  <div
                    key={`example-${example.id}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
                  >
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
                      {example.title}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                        <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Problem</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.problem}
                        </pre>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Solution</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.solution}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleExample(example.id)}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300"
                      >
                        {showExample[example.id] ? 'Hide Detailed Steps' : 'Show Detailed Steps'}
                      </button>
                    </div>
                    {showExample[example.id] && (
                      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                        <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">📝 Detailed Steps</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.detailedSolution}
                        </pre>
                      </div>
                    )}
                  </div>
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
                  {practiceProblems.map((problem) => (
                    <div
                      key={problem.id}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        {problem.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {problem.problem}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setShowSolution(showSolution === problem.id ? null : problem.id)}
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300"
                        >
                          {showSolution === problem.id ? 'Hide Solution' : 'Check Solution'}
                        </button>
                        <button
                          onClick={() => setShowHint(showHint === problem.id ? null : problem.id)}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                        >
                          {showHint === problem.id ? 'Hide Hint' : 'Show Hint'}
                        </button>
                      </div>
                      
                      {showHint === problem.id && (
                        <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">💡 Hint:</span> {problem.hint}
                          </p>
                        </div>
                      )}
                      
                      {showSolution === problem.id && (
                        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {problem.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
                  💡 Tips for Finding the Feasible Region
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Graph carefully:</span> Use intercepts for accuracy</li>
                  <li><span className="font-medium">Test a point:</span> Always verify shading direction</li>
                  <li><span className="font-medium">Check all constraints:</span> Don't miss any</li>
                  <li><span className="font-medium">Identify redundant constraints:</span> Some may not affect the region</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Determining the Feasible Region FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Determining the Feasible Region"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic3_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The feasible region is the heart of graphical LP. I tell my students that finding the feasible region is like finding the 'playground' where all solutions live. The key insight is that the feasible region is always convex - there are no holes or indentations. This property is what makes LP problems solvable. I encourage students to think of the feasible region as the intersection of all constraints, and to always verify that a point in the feasible region satisfies every single constraint." />
        </div>
      </div>
    </div>
  );
};

export default Topic3;