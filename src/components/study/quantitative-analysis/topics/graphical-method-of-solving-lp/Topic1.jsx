import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic1_files/topic1_questions';
import noteText from './topic1_files/topic1_note.txt?raw';

const Topic1 = () => {
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
      title: 'Example 1: Basic Intercepts',
      problem: 'Find the x and y intercepts of the equation: 2x + 3y = 12',
      solution: 'x-intercept: (6, 0)\ny-intercept: (0, 4)',
      detailedSolution: 'Step 1: Find x-intercept (set y = 0)\n2x + 3(0) = 12\n2x = 12\nx = 6\nx-intercept = (6, 0)\n\nStep 2: Find y-intercept (set x = 0)\n2(0) + 3y = 12\n3y = 12\ny = 4\ny-intercept = (0, 4)\n\nStep 3: Plot points and draw line\nPlot (6, 0) and (0, 4)\nDraw line through these points'
    },
    {
      id: 2,
      title: 'Example 2: Negative Coefficients',
      problem: 'Find the x and y intercepts of the equation: 3x - 2y = 6',
      solution: 'x-intercept: (2, 0)\ny-intercept: (0, -3)',
      detailedSolution: 'Step 1: Find x-intercept (set y = 0)\n3x - 2(0) = 6\n3x = 6\nx = 2\nx-intercept = (2, 0)\n\nStep 2: Find y-intercept (set x = 0)\n3(0) - 2y = 6\n-2y = 6\ny = -3\ny-intercept = (0, -3)\n\nStep 3: Plot points and draw line\nPlot (2, 0) and (0, -3)\nDraw line through these points'
    },
    {
      id: 3,
      title: 'Example 3: Vertical Line',
      problem: 'Find the x and y intercepts of the equation: x = 4',
      solution: 'x-intercept: (4, 0)\ny-intercept: None (vertical line)',
      detailedSolution: 'Step 1: Identify the equation type\nx = 4 is a vertical line\n\nStep 2: Find x-intercept\nAll points on x = 4 have x = 4\nWhen y = 0, x = 4\nx-intercept = (4, 0)\n\nStep 3: Find y-intercept\nVertical lines do not cross the y-axis\nUnless x = 0 (which it doesn\'t)\nNo y-intercept\n\nStep 4: Graph the line\nDraw vertical line at x = 4'
    },
    {
      id: 4,
      title: 'Example 4: Horizontal Line',
      problem: 'Find the x and y intercepts of the equation: y = 3',
      solution: 'x-intercept: None (horizontal line)\ny-intercept: (0, 3)',
      detailedSolution: 'Step 1: Identify the equation type\ny = 3 is a horizontal line\n\nStep 2: Find x-intercept\nHorizontal lines do not cross the x-axis\nUnless y = 0 (which it doesn\'t)\nNo x-intercept\n\nStep 3: Find y-intercept\nAll points on y = 3 have y = 3\nWhen x = 0, y = 3\ny-intercept = (0, 3)\n\nStep 4: Graph the line\nDraw horizontal line at y = 3'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Find Intercepts',
      problem: 'Find the x and y intercepts of: 4x + 2y = 8',
      hint: 'Set x=0 to find y-intercept, set y=0 to find x-intercept.',
      solution: 'x-intercept: (2, 0)\ny-intercept: (0, 4)'
    },
    {
      id: 2,
      title: 'Find Intercepts with Fractions',
      problem: 'Find the x and y intercepts of: 2x + 5y = 10',
      hint: 'Set x=0 and solve for y, set y=0 and solve for x.',
      solution: 'x-intercept: (5, 0)\ny-intercept: (0, 2)'
    },
    {
      id: 3,
      title: 'Find Intercepts from Word Problem',
      problem: 'A company produces two products. The labor constraint is: 3x + 4y ≤ 120. Find the intercepts to graph this constraint.',
      hint: 'Convert to equality first: 3x + 4y = 120. Then find intercepts.',
      solution: 'x-intercept: (40, 0)\ny-intercept: (0, 30)'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Interactive Intercept Calculator
  const InterceptCalculator = () => {
    const [a, setA] = useState(2);
    const [b, setB] = useState(3);
    const [c, setC] = useState(12);

    const xIntercept = c / a;
    const yIntercept = c / b;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Intercept Calculator
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
                />
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
                />
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
                />
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
                  />
                );
              })()}
              
              {/* Intercept points */}
              {xIntercept >= 0 && xIntercept <= 10 && (
                <g>
                  <circle cx={40 + xIntercept * 32} cy="360" r="6" fill="#4ECDC4" stroke="white" strokeWidth="2">
                    <animate attributeName="r" values="6;8;6" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <text x={40 + xIntercept * 32} y="380" textAnchor="middle" fontSize="9" fill="#4ECDC4">
                    ({xIntercept.toFixed(1)},0)
                  </text>
                </g>
              )}
              {yIntercept >= 0 && yIntercept <= 10 && (
                <g>
                  <circle cx="40" cy={360 - yIntercept * 32} r="6" fill="#FFE66D" stroke="white" strokeWidth="2">
                    <animate attributeName="r" values="6;8;6" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
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
                <rect x="0" y="0" width="90" height="70" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                <text x="10" y="18" fontSize="9" fontWeight="bold" fill="#333" className="dark:fill-gray-300">Legend</text>
                <circle cx="20" cy="35" r="5" fill="#4ECDC4"/>
                <text x="30" y="39" fontSize="8" fill="#555" className="dark:fill-gray-400">x-intercept</text>
                <circle cx="20" cy="55" r="5" fill="#FFE66D"/>
                <text x="30" y="59" fontSize="8" fill="#555" className="dark:fill-gray-400">y-intercept</text>
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
            Finding Intercepts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to find x and y intercepts of linear equations - a fundamental skill for 
            graphing constraints in linear programming.
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
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* What are Intercepts? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What are Intercepts?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  Intercepts are points where a line crosses the x-axis or y-axis. The x-intercept is 
                  where the line crosses the x-axis (y = 0), and the y-intercept is where the line 
                  crosses the y-axis (x = 0). Finding intercepts is the quickest way to graph a 
                  linear equation.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Concepts</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li><span className="font-medium">x-intercept:</span> Point where line crosses x-axis (y=0)</li>
                      <li><span className="font-medium">y-intercept:</span> Point where line crosses y-axis (x=0)</li>
                      <li>Intercepts give two points to draw a line</li>
                      <li>Essential for graphing constraints in LP</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why They Matter</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Quickest way to graph linear equations</li>
                      <li>Foundation for graphical LP</li>
                      <li>Helps visualize resource constraints</li>
                      <li>Essential for finding feasible regions</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Find Intercepts */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Find Intercepts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Finding x-intercept</h4>
                    <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Set y = 0 in the equation</li>
                      <li>Solve for x</li>
                      <li>The point is (x, 0)</li>
                    </ol>
                    <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs font-mono">
                      Example: 2x + 3y = 12<br/>
                      2x + 3(0) = 12 → 2x = 12 → x = 6<br/>
                      x-intercept: (6, 0)
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Finding y-intercept</h4>
                    <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li>Set x = 0 in the equation</li>
                      <li>Solve for y</li>
                      <li>The point is (0, y)</li>
                    </ol>
                    <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs font-mono">
                      Example: 2x + 3y = 12<br/>
                      2(0) + 3y = 12 → 3y = 12 → y = 4<br/>
                      y-intercept: (0, 4)
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Calculator */}
              <InterceptCalculator />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Finding Intercepts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Always set one variable to zero to find the other intercept</li>
                      <li>Check your work by substituting back into the equation</li>
                      <li>For inequalities, find intercepts of the corresponding equality</li>
                      <li>Label intercepts clearly on your graph</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Forgetting to set the other variable to zero</li>
                      <li>Confusing x and y intercepts</li>
                      <li>Incorrect signs when solving</li>
                      <li>Not checking if intercept is valid</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Equation identified as linear</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">x-intercept found by setting y=0</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">y-intercept found by setting x=0</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Intercepts checked by substitution</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Points plotted correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Line drawn through intercepts</span>
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
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
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
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">
                  💡 Tips for Finding Intercepts
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Set y=0 for x-intercept:</span> The line crosses x-axis where y=0</li>
                  <li><span className="font-medium">Set x=0 for y-intercept:</span> The line crosses y-axis where x=0</li>
                  <li><span className="font-medium">Check your work:</span> Substitute intercepts back into the equation</li>
                  <li><span className="font-medium">Label clearly:</span> Always label intercepts as (x,0) and (0,y)</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Finding Intercepts FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Finding Intercepts"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic1_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Finding intercepts is one of the most fundamental skills in graphical LP. I tell my students that intercepts are like 'anchors' that help you draw accurate constraint lines. The beauty of intercepts is their simplicity - set one variable to zero, solve for the other, and you have a point. With two intercepts, you can draw any line. I encourage students to practice finding intercepts until it becomes second nature - this speed and accuracy will serve them well in more complex LP problems." />
        </div>
      </div>
    </div>
  );
};

export default Topic1;