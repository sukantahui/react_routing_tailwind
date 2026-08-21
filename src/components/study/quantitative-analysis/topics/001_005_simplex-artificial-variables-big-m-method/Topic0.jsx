import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic0_files/topic0_questions';
import noteText from './topic0_files/topic0_note.txt?raw';

const Topic0 = () => {
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
      title: 'Example 1: When Graphical Method Works',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\n2x + y ≤ 10\nx + 2y ≤ 8\nx, y ≥ 0\n\nThis is a 2-variable problem that can be solved graphically.',
      solution: 'Graphical method works well here. Optimal solution: (4, 2) with Z = 16',
      detailedSolution: 'Step 1: Graph the constraints\n2x + y = 10 → (5,0), (0,10)\nx + 2y = 8 → (8,0), (0,4)\n\nStep 2: Identify feasible region\nShade the intersection of all constraints\n\nStep 3: Find corner points\n(0,0), (5,0), (4,2), (0,4)\n\nStep 4: Evaluate Z at each corner\nZ(0,0) = 0\nZ(5,0) = 15\nZ(4,2) = 16 ← Maximum\nZ(0,4) = 8\n\nWhy graphical works: Only 2 variables, easy to visualize.'
    },
    {
      id: 2,
      title: 'Example 2: When Graphical Method Fails',
      problem: 'Maximize Z = 4x + 5y + 3z\nSubject to:\n2x + y + z ≤ 10\nx + 3y + 2z ≤ 15\n2x + 2y + z ≤ 12\nx, y, z ≥ 0\n\nThis is a 3-variable problem that cannot be solved graphically.',
      solution: 'Graphical method cannot handle 3 variables. Need the Simplex Method.',
      detailedSolution: 'Why graphical fails:\n\n1. 3 variables require 3D visualization\n- Graphs are 2D (x and y axes)\n- Adding z requires 3D plotting\n- 3D graphs are difficult to read\n\n2. Feasible region becomes a polyhedron\n- In 2D: polygon (shaded area)\n- In 3D: polyhedron (3D shape)\n- Hard to visualize and find corners\n\n3. More corner points to check\n- 2 variables: 4-6 corner points\n- 3 variables: 8-12 corner points\n- Hard to find all corners manually\n\nNeed for Simplex Method:\n- Systematic algebraic approach\n- Handles any number of variables\n- Efficient and reliable'
    },
    {
      id: 3,
      title: 'Example 3: Large-Scale Problem',
      problem: 'A factory produces 5 products using 4 resources. The LP problem has 5 variables and 4 constraints. How would you solve this?',
      solution: 'This problem has too many variables for graphical method. The Simplex Method is required.',
      detailedSolution: 'Problem characteristics:\n- 5 variables (x₁, x₂, x₃, x₄, x₅)\n- 4 constraints\n- 1 objective function\n- 5 non-negativity constraints\n\nWhy graphical fails:\n1. Cannot plot in 5 dimensions\n2. Too many variables to visualize\n3. Too many corner points to check manually\n\nSimplex Method advantages:\n1. Algebraic (not geometric)\n2. Systematic and algorithmic\n3. Handles any number of variables\n4. Efficient for large problems\n5. Can be computerized'
    },
    {
      id: 4,
      title: 'Example 4: Real-World Application',
      problem: 'A company wants to maximize profit from 50 products using 30 resources. Each product has different profit margins and resource requirements. How should this be solved?',
      solution: 'This is a large-scale LP problem requiring the Simplex Method.',
      detailedSolution: 'Real-world characteristics:\n- 50 products → 50 variables\n- 30 resources → 30 constraints\n- Complex profit and cost structures\n- Multiple constraints and variables\n\nWhy graphical fails:\n1. Cannot graph 50 variables\n2. Too many corner points (combinatorial explosion)\n3. Manual solution impossible\n4. Need computational approach\n\nSimplex Method in practice:\n- Used in business, industry, government\n- Handles problems with thousands of variables\n- Efficient and reliable\n- Can be implemented in software\n- Foundation for more advanced methods'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Identify the Limitation',
      problem: 'Consider the LP problem: Maximize Z = 2x₁ + 3x₂ + 4x₃ subject to constraints. Why can\'t this be solved graphically?',
      hint: 'Think about the number of variables and the dimensions needed for visualization.',
      solution: 'This problem has 3 variables (x₁, x₂, x₃). Graphical method is limited to 2 variables because we can only plot in 2D. Need the Simplex Method.'
    },
    {
      id: 2,
      title: 'When to Use Simplex Method',
      problem: 'A factory produces 10 products using 5 resources. Should you use graphical method or Simplex Method?',
      hint: 'Consider the number of variables and constraints in the problem.',
      solution: 'Use the Simplex Method. With 10 variables, graphical method is impossible. The Simplex Method handles any number of variables and constraints.'
    },
    {
      id: 3,
      title: 'Comparing Methods',
      problem: 'Compare graphical method and Simplex Method. What are the advantages and limitations of each?',
      hint: 'Think about visualization, number of variables, and practical application.',
      solution: 'Graphical Method: Good for 2 variables, visual, intuitive, limited to small problems. Simplex Method: Handles any variables, algebraic, systematic, can be computerized, scalable.'
    }
  ];

  const toggleExample = (id) => {
    setShowExample(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Comparison data
  const comparisonData = [
    { feature: 'Number of variables', graphical: '2 variables max', simplex: 'Any number' },
    { feature: 'Visualization', graphical: '2D graphs', simplex: 'Algebraic (no graphs)' },
    { feature: 'Ease of use', graphical: 'Intuitive, visual', simplex: 'Requires practice' },
    { feature: 'Computational efficiency', graphical: 'Manual (small problems)', simplex: 'Efficient for large problems' },
    { feature: 'Corner points', graphical: 'Easy to find', simplex: 'Systematic search' },
    { feature: 'Real-world applicability', graphical: 'Limited', simplex: 'Widely used' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Need for the Simplex Method
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn why the Simplex Method is essential for solving linear programming problems 
            with more than two variables and how it overcomes the limitations of graphical methods.
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
              {/* What is the Simplex Method? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is the Simplex Method?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  The Simplex Method is an algebraic algorithm for solving linear programming problems. 
                  It was developed by George Dantzig in 1947 and is the foundation of modern LP solving. 
                  Unlike the graphical method, which is limited to two variables, the Simplex Method can 
                  handle problems with any number of variables and constraints.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Features</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Algebraic (not geometric)</li>
                      <li>Handles any number of variables</li>
                      <li>Systematic and iterative</li>
                      <li>Can be computerized</li>
                      <li>Proven optimality</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why It's Needed</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Graphical method limited to 2 variables</li>
                      <li>Real-world problems have many variables</li>
                      <li>Need efficient computational approach</li>
                      <li>Foundation for advanced optimization</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Limitations of Graphical Method */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Limitations of the Graphical Method
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">1. Limited to 2 Variables</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Can only solve problems with two decision variables (x and y).</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">x, y only</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">2. Hard to Scale</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Manual graphing becomes complex with many constraints.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">Many lines = messy</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">3. Not Computational</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Cannot be easily automated for large problems.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">Manual only</div>
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Graphical vs Simplex Method
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Feature</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Graphical Method</th>
                        <th className="px-4 py-2 text-left text-gray-800 dark:text-gray-200">Simplex Method</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {comparisonData.map((row, index) => (
                        <tr key={`compare-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-300">
                          <td className="px-4 py-2 font-medium text-gray-800 dark:text-gray-200">{row.feature}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.graphical}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{row.simplex}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Why Simplex Method is Better */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Why the Simplex Method is Better
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Advantages</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Handles any number of variables</li>
                      <li>Systematic and algorithmic</li>
                      <li>Can be computerized</li>
                      <li>Efficient for large problems</li>
                      <li>Provides sensitivity analysis</li>
                      <li>Proven optimality conditions</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Real-World Applications</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Manufacturing planning</li>
                      <li>Supply chain optimization</li>
                      <li>Financial portfolio management</li>
                      <li>Resource allocation</li>
                      <li>Transportation and logistics</li>
                      <li>Energy production planning</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Understanding the Simplex Method
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Think of Simplex as an algebraic search algorithm</li>
                      <li>It moves from one corner point to another</li>
                      <li>It improves the objective at each step</li>
                      <li>It stops when no improvement is possible</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Thinking Simplex is harder than it is</li>
                      <li>Not understanding why graphical fails</li>
                      <li>Forgetting that Simplex is systematic</li>
                      <li>Overlooking the importance of standard form</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Understand graphical method limitations</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Recognize when Simplex is needed</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Understand Simplex advantages</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Know real-world applications</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Prepare for algebraic approach</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Ready to learn Simplex procedure</span>
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
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Understanding the Need for Simplex
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Recognize limitations:</span> Graphical method only works for 2 variables</li>
                  <li><span className="font-medium">Think about scale:</span> Real-world problems have many variables</li>
                  <li><span className="font-medium">Consider computation:</span> Simplex can be automated</li>
                  <li><span className="font-medium">Visualize the transition:</span> From geometric to algebraic approach</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Need for the Simplex Method FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Need for the Simplex Method"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="The Simplex Method is a natural progression from graphical LP. I tell my students that while the graphical method is great for building intuition, the Simplex Method is the workhorse of optimization. It's like learning to drive a car vs. riding a bicycle - the bicycle (graphical method) is great for learning the basics, but you need a car (Simplex) for serious travel. Understanding why Simplex is needed helps students appreciate its power and prepares them for the algebraic journey ahead." />
        </div>
      </div>
    </div>
  );
};

export default Topic0;