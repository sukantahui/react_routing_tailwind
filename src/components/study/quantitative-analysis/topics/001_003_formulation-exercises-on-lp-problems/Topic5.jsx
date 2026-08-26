import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic5_files/topic5_questions';
import noteText from './topic5_files/topic5_note.txt?raw';

const Topic5 = () => {
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
      title: 'Example 1: Redundant Constraint',
      problem: 'Maximize Z = 3x + 2y\nSubject to:\nx + y ≤ 10\n2x + y ≤ 16\nx ≤ 8\nx, y ≥ 0\n\nWhich constraint is redundant?',
      solution: 'The constraint x ≤ 8 is redundant because the feasible region formed by the other constraints already ensures x ≤ 8.',
      detailedSolution: 'Step 1: Graph the constraints\n- Constraint 1: x + y ≤ 10\n- Constraint 2: 2x + y ≤ 16\n- Constraint 3: x ≤ 8\n\nStep 2: Find intersection points\n- Intersection of Constraint 1 and 2: x + y = 10, 2x + y = 16 → x = 6, y = 4\n- This point satisfies x ≤ 8\n\nStep 3: Check if Constraint 3 ever binds\n- At the optimal point (6,4), x = 6 ≤ 8\n- Constraint 3 never limits the feasible region\n\nConclusion: x ≤ 8 is redundant. Removing it doesn\'t change the optimal solution.'
    },
    {
      id: 2,
      title: 'Example 2: Essential Constraints',
      problem: 'Maximize Z = 4x + 5y\nSubject to:\nx + 2y ≤ 12\n3x + y ≤ 15\nx ≤ 4\nx, y ≥ 0\n\nWhich constraints are essential?',
      solution: 'All three constraints are essential. Each forms part of the feasible region boundary.',
      detailedSolution: 'Step 1: Graph the constraints\n- Constraint 1: x + 2y ≤ 12\n- Constraint 2: 3x + y ≤ 15\n- Constraint 3: x ≤ 4\n\nStep 2: Find corner points\n- Intersection of 1 and 2: x + 2y = 12, 3x + y = 15 → x = 3.6, y = 4.2\n- Intersection of 1 and 3: x + 2y = 12, x = 4 → y = 4\n- Intersection of 2 and 3: 3x + y = 15, x = 4 → y = 3\n\nStep 3: Check each constraint\n- Each constraint forms part of the feasible region boundary\n- Each constraint can be binding at some corner point\n\nConclusion: All constraints are essential. None can be removed.'
    },
    {
      id: 3,
      title: 'Example 3: Multiple Redundant Constraints',
      problem: 'Maximize Z = 2x + 3y\nSubject to:\nx + y ≤ 10\n2x + y ≤ 15\nx + 2y ≤ 16\nx ≤ 7\nx, y ≥ 0\n\nIdentify all redundant constraints.',
      solution: 'The constraints x ≤ 7 and x + 2y ≤ 16 are redundant.',
      detailedSolution: 'Step 1: Graph the constraints\n- Constraint 1: x + y ≤ 10\n- Constraint 2: 2x + y ≤ 15\n- Constraint 3: x + 2y ≤ 16\n- Constraint 4: x ≤ 7\n\nStep 2: Find the feasible region\n- The active constraints are 1 and 2\n- Constraint 1 and 2 intersect at (5,5)\n\nStep 3: Check redundant constraints\n- x ≤ 7: At (5,5), x = 5 ≤ 7 (never binding)\n- x + 2y ≤ 16: At (5,5), 5 + 2(5) = 15 ≤ 16 (never binding)\n\nConclusion: Both x ≤ 7 and x + 2y ≤ 16 are redundant.'
    },
    {
      id: 4,
      title: 'Example 4: Identifying by Comparison',
      problem: 'Maximize Z = 5x + 4y\nSubject to:\n3x + 2y ≤ 18\n2x + 4y ≤ 20\nx + y ≤ 8\nx, y ≥ 0\n\nDetermine which constraints are essential and which are redundant.',
      solution: 'The constraint x + y ≤ 8 is redundant. The other two are essential.',
      detailedSolution: 'Step 1: Graph the constraints\n- Constraint 1: 3x + 2y ≤ 18\n- Constraint 2: 2x + 4y ≤ 20\n- Constraint 3: x + y ≤ 8\n\nStep 2: Find intersections\n- Constraint 1 and 2: 3x + 2y = 18, 2x + 4y = 20 → x = 4, y = 3\n- At this point: x + y = 7 ≤ 8\n\nStep 3: Check each constraint\n- Constraint 3 is never binding at the optimal corner points\n- The feasible region is determined by Constraints 1 and 2\n\nConclusion: x + y ≤ 8 is redundant. Constraints 1 and 2 are essential.'
    }
  ];

  // Practice problems with solutions
  const practiceProblems = [
    {
      id: 1,
      title: 'Find the Redundant Constraint',
      problem: 'Maximize Z = 4x + 3y\nSubject to:\n2x + y ≤ 12\nx + 3y ≤ 15\nx ≤ 5\nx, y ≥ 0\n\nIdentify the redundant constraint.',
      hint: 'Graph the constraints. Which constraint line never touches the feasible region?',
      solution: 'x ≤ 5 is redundant because x is already bounded by the other constraints at the optimal corner points.'
    },
    {
      id: 2,
      title: 'Essential or Redundant?',
      problem: 'Maximize Z = 6x + 4y\nSubject to:\n3x + 2y ≤ 24\n2x + 5y ≤ 30\nx + y ≤ 10\nx, y ≥ 0\n\nWhich constraints are essential?',
      hint: 'Graph all constraints and find the feasible region. Which constraints form the boundary?',
      solution: 'Constraints 1 and 2 are essential. Constraint 3 (x + y ≤ 10) is redundant.'
    },
    {
      id: 3,
      title: 'Multiple Redundancy',
      problem: 'Maximize Z = 3x + 5y\nSubject to:\nx + y ≤ 12\n2x + 3y ≤ 30\nx ≤ 8\ny ≤ 10\nx, y ≥ 0\n\nIdentify all redundant constraints.',
      hint: 'Graph the constraints. Which constraints never bind at any corner point?',
      solution: 'x ≤ 8 and y ≤ 10 are redundant because the feasible region is already bounded by x + y ≤ 12 and 2x + 3y ≤ 30.'
    }
  ];

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
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Identifying Redundant and Essential Constraints
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to identify which constraints are essential to the feasible region and 
            which are redundant and can be removed without affecting the optimal solution.
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
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-200 dark:shadow-cyan-900/30"
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
              {/* What are Redundant Constraints? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What are Redundant Constraints?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  A redundant constraint is a constraint that does not affect the feasible region 
                  or the optimal solution. Removing a redundant constraint leaves the feasible 
                  region unchanged and does not change the optimal solution.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Characteristics</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Never forms part of feasible region boundary</li>
                      <li>Always has slack at optimal solution</li>
                      <li>Removing it doesn't change the solution</li>
                      <li>Often identified by graphing</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Why Identify Redundancy?</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Simplify the problem</li>
                      <li>Reduce computational effort</li>
                      <li>Focus on important constraints</li>
                      <li>Better understanding of the problem</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Types of Constraints */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Types of Constraints
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Essential</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Forms part of feasible region boundary. Cannot be removed.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">x + y ≤ 10</div>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Redundant</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Never affects feasible region. Can be removed.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">x ≤ 8</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500 transition-all duration-300 hover:shadow-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Conditionally Redundant</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Redundant for some objectives, essential for others.</p>
                    <div className="mt-2 text-xs font-mono bg-white dark:bg-gray-800 p-2 rounded">x + 2y ≤ 16</div>
                  </div>
                </div>
              </div>

              {/* How to Identify */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How to Identify Redundant Constraints
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Graphical Method</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Plot all constraints on a graph</li>
                      <li>Identify the feasible region</li>
                      <li>Check which constraints form the boundary</li>
                      <li>Constraints not touching the region are redundant</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Algebraic Method</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <li>Check if constraint is implied by others</li>
                      <li>Test corner points in the constraint</li>
                      <li>If never binding at any corner, it's redundant</li>
                      <li>Use linear combinations to prove redundancy</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Identifying Redundancy
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Start by graphing all constraints</li>
                      <li>Look for constraints far from the region</li>
                      <li>Check if constraint is implied by others</li>
                      <li>Remove and test if solution changes</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Removing constraints without verification</li>
                      <li>Assuming a constraint is redundant</li>
                      <li>Missing conditionally redundant constraints</li>
                      <li>Not checking all corner points</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">All constraints graphed</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Feasible region identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Boundary constraints identified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Corner points tested</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Redundant constraints removed and verified</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Solution unchanged after removal</span>
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
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {example.solution}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => toggleExample(example.id)}
                        className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all duration-300"
                      &gt;
                        {showExample[example.id] ? 'Hide Analysis' : 'Show Analysis'}
                      </button>
                    </div>
                    {showExample[example.id] && (
                      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                        <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">📝 Detailed Analysis</h5>
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
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {problem.hint}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setShowSolution(showSolution === problem.id ? null : problem.id)}
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300"
                        &gt;
                          {showSolution === problem.id ? 'Hide Answer' : 'Check Answer'}
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
              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6 border border-cyan-200 dark:border-cyan-800">
                <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-2">
                  💡 Tips for Identifying Redundancy
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Graph first:</span> Visual inspection is the easiest way to spot redundancy</li>
                  <li><span className="font-medium">Test corner points:</span> If a constraint never binds at any corner, it's redundant</li>
                  <li><span className="font-medium">Check implication:</span> See if the constraint is implied by others</li>
                  <li><span className="font-medium">Verify by removal:</span> Remove the constraint and check if the solution changes</li>
                  <li><span className="font-medium">Consider objectives:</span> A constraint may be redundant for one objective but essential for another</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Redundant and Essential Constraints FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Identifying Redundant and Essential Constraints"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic5_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Identifying redundant constraints is a valuable skill that simplifies LP problems. I tell my students to think of it like cleaning up a room - removing unnecessary items makes the space cleaner and easier to work with. The graphical method is the most intuitive way to spot redundancy, but algebraic verification is important too. I encourage students to always verify by removing the suspected redundant constraint and checking if the solution changes. This builds confidence and prevents mistakes." />
        </div>
      </div>
    </div>
  );
};

export default Topic5;