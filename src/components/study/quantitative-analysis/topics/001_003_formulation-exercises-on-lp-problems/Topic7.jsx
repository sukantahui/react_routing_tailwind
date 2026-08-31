import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic7_files/topic7_questions';
import noteText from './topic7_files/topic7_note.txt?raw';

const Topic7 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [showExample, setShowExample] = useState({});
  const [selectedInequality, setSelectedInequality] = useState('linear');
  const [xValue, setXValue] = useState(2);
  const [yValue, setYValue] = useState(3);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Inequality types for demonstration
  const inequalityTypes = [
    { id: 'linear', label: '2x + y ≤ 6', a: 2, b: 1, c: 6, symbol: '≤' },
    { id: 'linear2', label: 'x - y ≥ 2', a: 1, b: -1, c: 2, symbol: '≥' },
    { id: 'linear3', label: 'x + 2y ≤ 8', a: 1, b: 2, c: 8, symbol: '≤' },
  ];

  // Example data with detailed solutions
  const examples = [
    {
      id: 1,
      title: 'Example 1: Basic Linear Inequality',
      problem: 'Graph the inequality: 2x + y ≤ 6\n\nStep-by-step solution:',
      solution: 'Step 1: Convert to equality: 2x + y = 6\nStep 2: Find intercepts: (3,0) and (0,6)\nStep 3: Plot the line\nStep 4: Test point (0,0): 2(0) + 0 ≤ 6 → 0 ≤ 6 ✓\nStep 5: Shade the side containing (0,0)',
      detailedSolution: 'Step 1: Replace inequality with equality\n2x + y = 6\n\nStep 2: Find x-intercept (y = 0)\n2x + 0 = 6 → x = 3 → (3,0)\n\nStep 3: Find y-intercept (x = 0)\n0 + y = 6 → y = 6 → (0,6)\n\nStep 4: Draw the line through (3,0) and (0,6)\n\nStep 5: Test a point not on the line\nTest (0,0): 2(0) + 0 ≤ 6 → 0 ≤ 6 ✓\n\nStep 6: Shade the side containing (0,0)\n\nThe shaded region represents all solutions to 2x + y ≤ 6.'
    },
    {
      id: 2,
      title: 'Example 2: Greater Than Inequality',
      problem: 'Graph the inequality: x - y ≥ 2\n\nStep-by-step solution:',
      solution: 'Step 1: Convert to equality: x - y = 2\nStep 2: Find intercepts: (2,0) and (0,-2)\nStep 3: Plot the line\nStep 4: Test point (0,0): 0 - 0 ≥ 2 → 0 ≥ 2 ✗\nStep 5: Shade the side NOT containing (0,0)',
      detailedSolution: 'Step 1: Replace inequality with equality\nx - y = 2\n\nStep 2: Find x-intercept (y = 0)\nx - 0 = 2 → x = 2 → (2,0)\n\nStep 3: Find y-intercept (x = 0)\n0 - y = 2 → y = -2 → (0,-2)\n\nStep 4: Draw the line through (2,0) and (0,-2)\n\nStep 5: Test a point not on the line\nTest (0,0): 0 - 0 ≥ 2 → 0 ≥ 2 ✗\n\nStep 6: Shade the side NOT containing (0,0)\n\nThe shaded region represents all solutions to x - y ≥ 2.'
    },
    {
      id: 3,
      title: 'Example 3: Graphing a System of Inequalities',
      problem: 'Graph the system of inequalities:\n2x + y ≤ 6\nx + 2y ≤ 8\nx ≥ 0, y ≥ 0\n\nFind the feasible region.',
      solution: 'Step 1: Graph each inequality\nStep 2: Find the intersection of all shaded regions\nStep 3: The feasible region is the overlapping area\nStep 4: Identify corner points: (0,0), (3,0), (2,2), (0,4)',
      detailedSolution: 'Step 1: Graph 2x + y ≤ 6\nLine through (3,0) and (0,6)\nShade below the line\n\nStep 2: Graph x + 2y ≤ 8\nLine through (8,0) and (0,4)\nShade below the line\n\nStep 3: Apply x ≥ 0 and y ≥ 0\nRestrict to first quadrant\n\nStep 4: Find intersection points\nIntersection of 2x + y = 6 and x + 2y = 8:\n2x + y = 6 → y = 6 - 2x\nx + 2(6 - 2x) = 8 → x + 12 - 4x = 8 → -3x = -4 → x = 4/3 → y = 6 - 8/3 = 10/3\n\nStep 5: Identify corner points\n(0,0), (3,0), (4/3, 10/3), (0,4)'
    }
  ];

  // Practice problems
  const practiceProblems = [
    {
      id: 1,
      title: 'Graph the Inequality',
      problem: 'Graph the inequality: 3x + 2y ≤ 12\n\nFind:\n(a) x-intercept\n(b) y-intercept\n(c) Shade the correct region',
      hint: 'Convert to equality first. Test a point to determine shading.',
      solution: 'x-intercept: (4,0), y-intercept: (0,6). Test (0,0): 0 ≤ 12 ✓, shade below the line.'
    },
    {
      id: 2,
      title: 'Graph the System',
      problem: 'Graph the system of inequalities:\nx + y ≤ 6\n2x + y ≤ 8\nx ≥ 0, y ≥ 0\n\nFind the feasible region.',
      hint: 'Graph each inequality separately, then find the overlapping region.',
      solution: 'Corner points: (0,0), (4,0), (2,4), (0,6). Feasible region is the quadrilateral with these corners.'
    },
    {
      id: 3,
      title: 'Determine the Inequality',
      problem: 'A line passes through (0,4) and (2,0). The shaded region is below the line. Write the inequality.',
      hint: 'Find the equation of the line first, then determine the inequality direction.',
      solution: 'Slope = (0-4)/(2-0) = -2. Equation: y = -2x + 4 → 2x + y = 4. Since shaded below: 2x + y ≤ 4.'
    }
  ];

  // Interactive inequality grapher
  const InequalityGrapher = () => {
    const currentIneq = inequalityTypes.find(i => i.id === selectedInequality) || inequalityTypes[0];
    const { a, b, c, symbol } = currentIneq;

    // Calculate intercepts
    const xIntercept = c / a;
    const yIntercept = c / b;

    // Test point
    const testX = 1;
    const testY = 1;
    const lhs = a * testX + b * testY;
    const isTrue = symbol === '≤' ? lhs <= c : lhs >= c;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Interactive Inequality Grapher
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Select Inequality:</p>
              <div className="flex flex-wrap gap-2">
                {inequalityTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedInequality(type.id)}
                    className={clsx(
                      "px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300",
                      selectedInequality === type.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Inequality:</span> {a}x + {b}y {symbol} {c}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">x-intercept:</span> ({xIntercept.toFixed(1)}, 0)
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">y-intercept:</span> (0, {yIntercept.toFixed(1)})
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Test point (1,1):</span> {a}(1) + {b}(1) = {lhs} {symbol} {c} → {isTrue ? '✓ True' : '✗ False'}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                <span className="font-semibold">Shading:</span> {isTrue ? 'Shade side containing (1,1)' : 'Shade side NOT containing (1,1)'}
              </p>
            </div>
          </div>

          {/* SVG Graph */}
          <div className="flex justify-center items-center">
            <svg viewBox="0 0 400 400" className="w-full max-w-sm h-auto">
              {/* Background */}
              <rect x="0" y="0" width="400" height="400" fill="#f8f9fa" className="dark:fill-gray-700"/>
              
              {/* Grid lines */}
              {Array.from({ length: 10 }, (_, i) => (
                <g key={`grid-${i}`}>
                  <line x1={40 + i * 36} y1="40" x2={40 + i * 36} y2="360" stroke="#e9ecef" strokeWidth="0.5" className="dark:stroke-gray-600"/>
                  <line x1="40" y1={40 + i * 36} x2="360" y2={40 + i * 36} stroke="#e9ecef" strokeWidth="0.5" className="dark:stroke-gray-600"/>
                </g>
              ))}
              
              {/* Axes */}
              <line x1="40" y1="360" x2="360" y2="360" stroke="#333" strokeWidth="2" className="dark:stroke-gray-300"/>
              <line x1="40" y1="360" x2="40" y2="40" stroke="#333" strokeWidth="2" className="dark:stroke-gray-300"/>
              
              {/* Axis labels */}
              <text x="355" y="380" textAnchor="end" fontSize="12" fill="#333" className="dark:fill-gray-300">x</text>
              <text x="25" y="45" textAnchor="middle" fontSize="12" fill="#333" className="dark:fill-gray-300">y</text>
              <text x="40" y="380" textAnchor="start" fontSize="10" fill="#666" className="dark:fill-gray-400">0</text>
              
              {/* Scale marks */}
              {Array.from({ length: 9 }, (_, i) => {
                const val = i + 1;
                const xPos = 40 + val * 36;
                const yPos = 360 - val * 36;
                return (
                  <g key={`scale-${i}`}>
                    <text x={xPos} y="375" textAnchor="middle" fontSize="8" fill="#666" className="dark:fill-gray-400">{val}</text>
                    <text x="30" y={yPos + 3} textAnchor="end" fontSize="8" fill="#666" className="dark:fill-gray-400">{val}</text>
                  </g>
                );
              })}
              
              {/* Constraint line */}
              {(() => {
                const x1 = 40 + Math.min(xIntercept, 9) * 36;
                const y1 = 360;
                const x2 = 40;
                const y2 = 360 - Math.min(yIntercept, 9) * 36;
                
                return (
                  <line 
                    x1={Math.min(x1, 360)} 
                    y1={Math.min(y1, 360)} 
                    x2={Math.min(x2, 360)} 
                    y2={Math.max(y2, 40)} 
                    stroke="#FF6B6B" 
                    strokeWidth="3"
                    strokeDasharray={symbol === '≤' ? "" : "8,4"}
                  />
                );
              })()}
              
              {/* Shaded region */}
              {symbol === '≤' && (
                <polygon points="40,360 40,360 360,360 360,40" fill="rgba(78, 205, 196, 0.15)" stroke="none"/>
              )}
              {symbol === '≥' && (
                <polygon points="40,40 40,360 360,360 360,40" fill="rgba(78, 205, 196, 0.15)" stroke="none"/>
              )}
              
              {/* Label */}
              <text x="200" y="25" textAnchor="middle" fontSize="12" fill="#FF6B6B" className="dark:fill-red-400">
                {a}x + {b}y {symbol} {c}
              </text>
              
              {/* Legend */}
              <g transform="translate(270, 40)">
                <rect x="0" y="0" width="90" height="50" rx="5" fill="white" stroke="#ddd" strokeWidth="1" className="dark:fill-gray-700 dark:stroke-gray-600"/>
                <line x1="10" y1="20" x2="30" y2="20" stroke="#FF6B6B" strokeWidth="3"/>
                <text x="35" y="24" fontSize="8" fill="#555" className="dark:fill-gray-400">Constraint</text>
                <rect x="10" y="35" width="20" height="10" fill="rgba(78, 205, 196, 0.3)" stroke="#4ECDC4" strokeWidth="1"/>
                <text x="35" y="44" fontSize="8" fill="#555" className="dark:fill-gray-400">Shaded</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    );
  };

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Graphical Representation of Linear Inequalities
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to graph linear inequalities and systems of inequalities to visualize 
            feasible regions for linear programming problems.
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
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'concept' && (
            <>
              {/* What is a Linear Inequality? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is a Linear Inequality?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  A linear inequality is a mathematical statement that relates two linear expressions 
                  using inequality symbols: &lt;, &gt;, ≤, or ≥. The solution to a linear inequality is 
                  a region on a graph, not just a single point.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Concepts</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Boundary line (from equality)</li>
                      <li>Feasible region (shaded area)</li>
                      <li>Test point method for shading</li>
                      <li>Systems of inequalities</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why It Matters</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Foundation for graphical LP</li>
                      <li>Visualizes feasible solutions</li>
                      <li>Identifies constraint boundaries</li>
                      <li>Essential for LP solving</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How to Graph Linear Inequalities */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Graph Linear Inequalities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Step-by-Step Method</h4>
                    <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li><span className="font-medium">Convert to equality:</span> Replace inequality with =</li>
                      <li><span className="font-medium">Find intercepts:</span> Set x=0 and y=0</li>
                      <li><span className="font-medium">Draw the line:</span> Connect intercepts</li>
                      <li><span className="font-medium">Test a point:</span> Use (0,0) if possible</li>
                      <li><span className="font-medium">Shade the region:</span> Based on test result</li>
                    </ol>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Inequality Directions</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <li><span className="font-medium">≤ (less than or equal):</span> Shade below the line</li>
                      <li><span className="font-medium">≥ (greater than or equal):</span> Shade above the line</li>
                      <li><span className="font-medium">&lt; (less than):</span> Dashed line, shade below</li>
                      <li><span className="font-medium">&gt; (greater than):</span> Dashed line, shade above</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Interactive Grapher */}
              <InequalityGrapher />

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Graphing Inequalities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Always test a point to verify shading</li>
                      <li>Use (0,0) when it's not on the line</li>
                      <li>Draw lines accurately with intercepts</li>
                      <li>Use dashed lines for strict inequalities</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Shading the wrong side</li>
                      <li>Using solid line for strict inequalities</li>
                      <li>Forgetting to test a point</li>
                      <li>Misidentifying intercepts</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Inequality converted to equality</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">x-intercept calculated correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">y-intercept calculated correctly</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Line drawn accurately</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Test point used to check shading</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Correct region shaded</span>
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
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">Solution Overview</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.solution}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleExample(example.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
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
                      <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-2">
                        {problem.problem}
                      </pre>
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
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Graphing Inequalities
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Always find intercepts first:</span> They give you two points to draw the line</li>
                  <li><span className="font-medium">Test a point:</span> Use (0,0) when possible to determine shading</li>
                  <li><span className="font-medium">Check your work:</span> Pick a point in the shaded region to verify</li>
                  <li><span className="font-medium">Practice regularly:</span> Graphing gets easier with practice</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Graphical Representation of Linear Inequalities FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Graphical Representation of Linear Inequalities"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic7_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Graphing linear inequalities is the foundation of graphical LP. I tell my students that mastering this skill is like learning to read a map - once you can read the map, you can navigate anywhere. The key is understanding the relationship between the inequality symbol and the shading direction. I encourage students to always test a point, even when they're confident about the shading. This habit prevents errors and builds confidence." />
        </div>
      </div>
    </div>
  );
};

export default Topic7;