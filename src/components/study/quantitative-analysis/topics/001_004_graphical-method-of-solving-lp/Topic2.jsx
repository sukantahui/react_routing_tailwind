import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic2_files/topic2_questions';
import noteText from './topic2_files/topic2_note.txt?raw';

const Topic2 = () => {
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
      title: 'Example 1: Basic Constraint Line',
      problem: 'Plot the constraint line: 2x + 3y = 12',
      solution: 'Intercepts: (6, 0) and (0, 4)\nDraw line through these points.',
      detailedSolution: 'Step 1: Find x-intercept (set y = 0)\n2x + 3(0) = 12\n2x = 12\nx = 6\nx-intercept = (6, 0)\n\nStep 2: Find y-intercept (set x = 0)\n2(0) + 3y = 12\n3y = 12\ny = 4\ny-intercept = (0, 4)\n\nStep 3: Plot the points\nPlot (6, 0) and (0, 4) on the coordinate plane\n\nStep 4: Draw the line\nConnect the points with a straight line\n\nStep 5: Label the line\nLabel as 2x + 3y = 12'
    },
    {
      id: 2,
      title: 'Example 2: Constraint with Negative Slope',
      problem: 'Plot the constraint line: 3x - 2y = 6',
      solution: 'Intercepts: (2, 0) and (0, -3)\nDraw line through these points.',
      detailedSolution: 'Step 1: Find x-intercept (set y = 0)\n3x - 2(0) = 6\n3x = 6\nx = 2\nx-intercept = (2, 0)\n\nStep 2: Find y-intercept (set x = 0)\n3(0) - 2y = 6\n-2y = 6\ny = -3\ny-intercept = (0, -3)\n\nStep 3: Plot the points\nPlot (2, 0) and (0, -3) on the coordinate plane\n\nStep 4: Draw the line\nConnect the points with a straight line\n\nStep 5: Label the line\nLabel as 3x - 2y = 6'
    },
    {
      id: 3,
      title: 'Example 3: Vertical Constraint Line',
      problem: 'Plot the constraint line: x = 4',
      solution: 'Vertical line at x = 4\nx-intercept: (4, 0)\nNo y-intercept',
      detailedSolution: 'Step 1: Identify the type of line\nx = 4 is a vertical line\n\nStep 2: Find any points on the line\nAll points have x = 4\nPoints: (4, 0), (4, 3), (4, -2)\n\nStep 3: Plot the points\nPlot (4, 0), (4, 3), (4, -2)\n\nStep 4: Draw the line\nDraw a vertical line through x = 4\n\nStep 5: Label the line\nLabel as x = 4'
    },
    {
      id: 4,
      title: 'Example 4: Horizontal Constraint Line',
      problem: 'Plot the constraint line: y = 3',
      solution: 'Horizontal line at y = 3\ny-intercept: (0, 3)\nNo x-intercept',
      detailedSolution: 'Step 1: Identify the type of line\ny = 3 is a horizontal line\n\nStep 2: Find any points on the line\nAll points have y = 3\nPoints: (0, 3), (2, 3), (-1, 3)\n\nStep 3: Plot the points\nPlot (0, 3), (2, 3), (-1, 3)\n\nStep 4: Draw the line\nDraw a horizontal line through y = 3\n\nStep 5: Label the line\nLabel as y = 3'
    },
    {
      id: 5,
      title: 'Example 5: Constraint with Fractional Intercepts',
      problem: 'Plot the constraint line: 4x + 6y = 12',
      solution: 'Intercepts: (3, 0) and (0, 2)\nDraw line through these points.',
      detailedSolution: 'Step 1: Find x-intercept (set y = 0)\n4x + 6(0) = 12\n4x = 12\nx = 3\nx-intercept = (3, 0)\n\nStep 2: Find y-intercept (set x = 0)\n4(0) + 6y = 12\n6y = 12\ny = 2\ny-intercept = (0, 2)\n\nStep 3: Plot the points\nPlot (3, 0) and (0, 2) on the coordinate plane\n\nStep 4: Draw the line\nConnect the points with a straight line\n\nStep 5: Label the line\nLabel as 4x + 6y = 12'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Plot Constraint Line',
      problem: 'Plot the constraint line: 2x + 4y = 8\n\nFind:\n(a) x-intercept\n(b) y-intercept\n(c) Draw the line',
      hint: 'Find intercepts by setting y=0 and x=0, then plot and connect.',
      solution: 'x-intercept: (4, 0), y-intercept: (0, 2)\nLine through these points.'
    },
    {
      id: 2,
      title: 'Plot Constraint Line with Negative Intercept',
      problem: 'Plot the constraint line: 2x - y = 4\n\nFind intercepts and draw the line.',
      hint: 'Find intercepts: set y=0 for x-intercept, set x=0 for y-intercept.',
      solution: 'x-intercept: (2, 0), y-intercept: (0, -4)\nLine through these points.'
    },
    {
      id: 3,
      title: 'Plot Multiple Constraint Lines',
      problem: 'Plot these constraint lines on the same graph:\n3x + 2y = 12\nx + y = 5\n\nFind where they intersect.',
      hint: 'Plot each line separately using intercepts. Find intersection by solving the system.',
      solution: 'Line 1: (4,0) and (0,6)\nLine 2: (5,0) and (0,5)\nIntersection: (2, 3)'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Line Plotter
  const LinePlotter = () => {
    const [a, setA] = useState(2);
    const [b, setB] = useState(3);
    const [c, setC] = useState(12);

    const xIntercept = c / a;
    const yIntercept = c / b;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Line Plotter
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Equation: {a}x + {b}y = {c}
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Coefficient a (x)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={a}
                  onChange={(e) => setA(Number(e.target.value))}
                  className="w-full"
                /&gt;
                <span className="text-sm text-gray-600 dark:text-gray-400">{a}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Coefficient b (y)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={b}
                  onChange={(e) => setB(Number(e.target.value))}
                  className="w-full"
                /&gt;
                <span className="text-sm text-gray-600 dark:text-gray-400">{b}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Constant c</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={c}
                  onChange={(e) => setC(Number(e.target.value))}
                  className="w-full"
                /&gt;
                <span className="text-sm text-gray-600 dark:text-gray-400">{c}</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">x-intercept:</span> ({xIntercept.toFixed(1)}, 0)
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">y-intercept:</span> (0, {yIntercept.toFixed(1)})
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
              
              {/* Constraint line */}
              {(() => {
                const xInt = Math.min(xIntercept, 10);
                const yInt = Math.min(yIntercept, 10);
                const x1 = 40 + (xInt > 0 ? xInt * 32 : 40);
                const y1 = 360;
                const x2 = 40;
                const y2 = 360 - (yInt > 0 ? yInt * 32 : 0);
                
                return (
                  <line 
                    x1={Math.min(x1, 360)} 
                    y1={Math.min(y1, 360)} 
                    x2={Math.min(x2, 360)} 
                    y2={Math.max(y2, 40)} 
                    stroke="#FF6B6B" 
                    strokeWidth="3"
                  >
                    <animate attributeName="stroke-dashoffset" values="0;50" dur="3s" repeatCount="indefinite" />
                  </line>
                );
              })()}
              
              {/* Intercept points */}
              {xIntercept &ge; 0 && xIntercept &le; 10 && (
                <g>
                  <circle cx={40 + xIntercept * 32} cy="360" r="7" fill="#4ECDC4" stroke="white" strokeWidth="2">
                    <animate attributeName="r" values="7;9;7" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <text x={40 + xIntercept * 32} y="380" textAnchor="middle" fontSize="9" fill="#4ECDC4">
                    ({xIntercept.toFixed(1)},0)
                  </text>
                </g>
              )}
              {yIntercept &ge; 0 && yIntercept &le; 10 && (
                <g>
                  <circle cx="40" cy={360 - yIntercept * 32} r="7" fill="#FFE66D" stroke="white" strokeWidth="2">
                    <animate attributeName="r" values="7;9;7" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
                  </circle>
                  <text x="10" y={360 - yIntercept * 32 + 3} textAnchor="start" fontSize="9" fill="#FFE66D">
                    (0,{yIntercept.toFixed(1)})
                  </text>
                </g>
              )}
              
              {/* Equation label */}
              <text x="200" y="25" textAnchor="middle" fontSize="12" fill="#FF6B6B" className="dark:fill-red-400">
                {a}x + {b}y = {c}
              </text>
              
              {/* Legend */}
              <g transform="translate(270, 40)">
                <rect x="0" y="0" width="90" height="80" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                <line x1="10" y1="35" x2="30" y2="35" stroke="#FF6B6B" strokeWidth="3"/>
                <text x="35" y="39" fontSize="8" fill="#555" className="dark:fill-gray-400">Constraint</text>
                <circle cx="20" cy="55" r="5" fill="#4ECDC4"/>
                <text x="30" y="59" fontSize="8" fill="#555" className="dark:fill-gray-400">x-intercept</text>
                <circle cx="20" cy="70" r="5" fill="#FFE66D"/>
                <text x="30" y="74" fontSize="8" fill="#555" className="dark:fill-gray-400">y-intercept</text>
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
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Plotting Constraint Lines
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to plot constraint lines on a coordinate plane using intercepts and other 
            methods - a critical skill for solving LP problems graphically.
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
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30"
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
              {/* What are Constraint Lines? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What are Constraint Lines?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Constraint lines are the graphical representation of the boundaries of constraints 
                  in a linear programming problem. Each constraint is plotted as a line on a coordinate 
                  plane, and the feasible region is determined by the intersection of all constraint lines.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Concepts</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Each constraint becomes a line on the graph</li>
                      <li>Intercepts are the easiest way to plot lines</li>
                      <li>Lines divide the plane into feasible and infeasible regions</li>
                      <li>Multiple lines form the feasible region</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why They Matter</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Foundation for graphical LP</li>
                      <li>Visualize resource constraints</li>
                      <li>Identify feasible region</li>
                      <li>Find corner points for optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Plot Constraint Lines */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Plot Constraint Lines
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Method 1: Intercepts</h4>
                    <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Convert to equality</li>
                      <li>Find x-intercept (y=0)</li>
                      <li>Find y-intercept (x=0)</li>
                      <li>Plot both points</li>
                      <li>Draw line through them</li>
                    </ol>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Best for: Most linear equations
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Method 2: Slope-Intercept</h4>
                    <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Convert to y = mx + b</li>
                      <li>Plot y-intercept (0,b)</li>
                      <li>Use slope to find another point</li>
                      <li>Draw line through points</li>
                    </ol>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Best for: Equations with clear slope
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Method 3: Special Lines</h4>
                    <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Vertical: x = k</li>
                      <li>Horizontal: y = k</li>
                      <li>Draw line at constant value</li>
                    </ol>
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Best for: Vertical or horizontal constraints
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Line Plotter */}
              <LinePlotter />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Plotting Constraint Lines
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Always use intercepts when possible - it's the fastest method</li>
                      <li>Check your work by verifying points on the line</li>
                      <li>Use graph paper for accuracy</li>
                      <li>Label each constraint line clearly</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Forgetting to convert inequality to equality</li>
                      <li>Plotting intercepts incorrectly</li>
                      <li>Drawing line through wrong points</li>
                      <li>Not labeling constraint lines</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Constraint converted to equality</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">x-intercept found correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">y-intercept found correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Points plotted accurately</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Line drawn through points</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Constraint line labeled</span>
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
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                      &gt;
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
                        &gt;
                          {showSolution === problem.id ? 'Hide Solution' : 'Check Solution'}
                        </button>
                        <button
                          onClick={() => setShowHint(showHint === problem.id ? null : problem.id)}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                        &gt;
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
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Plotting Constraint Lines
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Use intercepts:</span> The quickest way to plot most lines</li>
                  <li><span className="font-medium">Check your points:</span> Verify they satisfy the equation</li>
                  <li><span className="font-medium">Use a ruler:</span> Draw straight lines for accuracy</li>
                  <li><span className="font-medium">Label clearly:</span> Always label your constraint lines</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Plotting Constraint Lines FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Plotting Constraint Lines"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic2_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Plotting constraint lines is the visual foundation of graphical LP. I tell my students that each constraint line is like a fence - it defines a boundary that limits where you can go. The skill of accurately plotting lines using intercepts is essential for finding the feasible region and solving LP problems. I encourage students to practice plotting lines until they can do it quickly and accurately - this speed will be invaluable when solving complex LP problems." />
        </div>
      </div>
    </div>
  );
};

export default Topic2;