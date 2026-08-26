import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic0_files/topic0_questions';
import noteText from './topic0_files/topic0_note.txt?raw';

const Topic0 = () => {
  const [activeTab, setActiveTab] = useState('concept');
  const [showExample, setShowExample] = useState(false);

  const tabs = [
    { id: 'concept', label: 'Concept' },
    { id: 'examples', label: 'Examples' },
    { id: 'practice', label: 'Practice' },
  ];

  // Example data
  const examples = [
    {
      title: 'Example 1: Furniture Factory',
      problem: 'A furniture factory produces chairs and tables. Each chair requires 2 hours of labor and 3 units of wood. Each table requires 3 hours of labor and 2 units of wood. The factory has 120 labor hours and 90 wood units available daily. Profit per chair is ₹40 and per table is ₹50.',
      solution: 'Let x = number of chairs, y = number of tables\nMaximize Z = 40x + 50y\nSubject to:\n2x + 3y ≤ 120 (Labor)\n3x + 2y ≤ 90 (Wood)\nx, y ≥ 0'
    },
    {
      title: 'Example 2: Bakery Products',
      problem: 'A bakery produces cakes and pastries. Each cake requires 2 kg flour and 3 hours labor. Each pastry requires 1 kg flour and 2 hours labor. The bakery has 200 kg flour and 150 hours labor available. Profit per cake is ₹600 and per pastry is ₹400.',
      solution: 'Let x = number of cakes, y = number of pastries\nMaximize Z = 600x + 400y\nSubject to:\n2x + y ≤ 200 (Flour)\n3x + 2y ≤ 150 (Labor)\nx, y ≥ 0'
    },
    {
      title: 'Example 3: Electronics Assembly',
      problem: 'A company assembles two types of electronic devices: Standard and Premium. Standard requires 2 hours of assembly and 1 hour of testing. Premium requires 3 hours of assembly and 2 hours of testing. Available: 180 assembly hours and 100 testing hours daily. Profit: Standard ₹500, Premium ₹800.',
      solution: 'Let x = Standard units, y = Premium units\nMaximize Z = 500x + 800y\nSubject to:\n2x + 3y ≤ 180 (Assembly)\nx + 2y ≤ 100 (Testing)\nx, y ≥ 0'
    },
    {
      title: 'Example 4: Agricultural Products',
      problem: 'A farmer grows wheat and corn. Wheat requires 2 acres and 3 hours of labor per unit. Corn requires 3 acres and 2 hours of labor per unit. Available: 100 acres and 120 labor hours. Profit: Wheat ₹8,000/unit, Corn ₹10,000/unit.',
      solution: 'Let x = units of wheat, y = units of corn\nMaximize Z = 8000x + 10000y\nSubject to:\n2x + 3y ≤ 100 (Land)\n3x + 2y ≤ 120 (Labor)\nx, y ≥ 0'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Product-Mix Problems
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Learn how to formulate and solve product-mix problems using linear programming 
            to maximize profit with limited resources.
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
              {/* What is Product-Mix? */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  What is a Product-Mix Problem?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  A product-mix problem is a type of linear programming problem where a company 
                  decides how much of each product to produce to maximize profit, given limited 
                  resources such as labor, materials, and machine time.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Key Components</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Decision variables (product quantities)</li>
                      <li>Objective function (profit maximization)</li>
                      <li>Resource constraints (limited resources)</li>
                      <li>Non-negativity constraints</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Real-World Applications</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Manufacturing production planning</li>
                      <li>Agricultural crop selection</li>
                      <li>Retail inventory management</li>
                      <li>Service industry resource allocation</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Steps to Formulate */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Steps to Formulate a Product-Mix Problem
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📝</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 1</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Define decision variables</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">🎯</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 2</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Formulate objective function</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">📋</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 3</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Identify resource constraints</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                    <div className="text-4xl mb-2">✅</div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Step 4</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Add non-negativity constraints</p>
                  </div>
                </div>
              </div>

              {/* General Form */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  General Form of Product-Mix Problem
                </h3>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 font-mono text-sm">
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p className="font-bold text-blue-600 dark:text-blue-400">Objective:</p>
                    <p className="ml-4">Maximize Z = c₁x₁ + c₂x₂ + ... + cₙxₙ</p>
                    <p className="font-bold text-green-600 dark:text-green-400 mt-2">Subject to:</p>
                    <p className="ml-4">a₁₁x₁ + a₁₂x₂ + ... + a₁ₙxₙ ≤ b₁ (Resource 1)</p>
                    <p className="ml-4">a₂₁x₁ + a₂₂x₂ + ... + a₂ₙxₙ ≤ b₂ (Resource 2)</p>
                    <p className="ml-4">...</p>
                    <p className="ml-4">aₘ₁x₁ + aₘ₂x₂ + ... + aₘₙxₙ ≤ bₘ (Resource m)</p>
                    <p className="ml-4 font-bold">x₁, x₂, ..., xₙ ≥ 0</p>
                  </div>
                </div>
              </div>

              {/* Tips & Tricks */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  💡 Tips & Tricks for Product-Mix Problems
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Always identify all resources first</li>
                      <li>Check units are consistent</li>
                      <li>Include all relevant constraints</li>
                      <li>Verify non-negativity is appropriate</li>
                    </ul>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Common Mistakes</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Forgetting to include all resources</li>
                      <li>Mixing up coefficients</li>
                      <li>Missing non-negativity constraints</li>
                      <li>Using wrong units of measurement</li>
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
                    <span className="text-sm text-gray-700 dark:text-gray-300">Variables clearly defined</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Objective function correctly formulated</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">All resource constraints included</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Non-negativity constraints included</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Units are consistent</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Problem makes practical sense</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'examples' && (
            <>
              <div className="space-y-6">
                {examples.map((example, index) => (
                  <div
                    key={`example-${index}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl"
                  >
                    <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
                      {example.title}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                        <h5 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Problem</h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {example.problem}
                        </p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                        <h5 className="font-semibold text-green-700 dark:text-green-400 mb-2">LP Formulation</h5>
                        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {example.solution}
                        </pre>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => setShowExample(!showExample)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                      &gt;
                        {showExample ? 'Hide Detailed Solution' : 'Show Detailed Solution'}
                      </button>
                    </div>
                    {showExample && (
                      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                        <h5 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">💡 Think About...</h5>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          How would the solution change if the profit per unit of one product increased? 
                          What if a new resource constraint was added?
                        </p>
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
                  {/* Problem 1 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 1: Toy Factory
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A toy factory produces cars and dolls. Each car requires 2 hours of assembly and 1 hour of painting. Each doll requires 1 hour of assembly and 2 hours of painting. The factory has 100 assembly hours and 80 painting hours available. Profit: Car ₹200, Doll ₹150.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Formulate the LP problem to maximize profit.
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
                      <span className="font-semibold">Think about...</span> Which resources are limited? How much of each resource does each product use?
                    </div>
                  </div>

                  {/* Problem 2 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 2: Juice Production
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A juice company produces orange and apple juice. Orange requires 2 kg of fruit and 1 hour of processing. Apple requires 1 kg of fruit and 3 hours of processing. Available: 120 kg fruit and 150 hours. Profit: Orange ₹40/bottle, Apple ₹50/bottle.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Formulate the LP problem.
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
                      <span className="font-semibold">Think about...</span> What are the decision variables? What is the objective?
                    </div>
                  </div>

                  {/* Problem 3 */}
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Problem 3: Furniture Workshop
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      A workshop produces chairs and stools. Chair: 3 hours carpentry, 1 hour finishing. Stool: 1 hour carpentry, 2 hours finishing. Available: 180 carpentry hours, 120 finishing hours. Profit: Chair ₹600, Stool ₹400.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Formulate the LP problem.
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
                      <span className="font-semibold">Think about...</span> How do you express the resource constraints mathematically?
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips for Practice */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                  💡 Tips for Solving Product-Mix Problems
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li><span className="font-medium">Identify all products:</span> What are you producing?</li>
                  <li><span className="font-medium">List all resources:</span> What limits your production?</li>
                  <li><span className="font-medium">Define variables clearly:</span> What does each variable represent?</li>
                  <li><span className="font-medium">Formulate carefully:</span> Double-check coefficients and constraints</li>
                  <li><span className="font-medium">Include non-negativity:</span> Production quantities cannot be negative</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Product-Mix Problems FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Product-Mix Problems"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic0_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Product-mix problems are the foundation of LP formulation. I always start with these because students can easily relate to manufacturing and production scenarios. The key is helping students identify the decision variables, objective, and constraints in a structured way. Once they master product-mix problems, they can apply the same logic to more complex LP problems. Encourage students to practice translating word problems into mathematical formulations - this is a skill that improves with practice." />
        </div>
      </div>
    </div>
  );
};

export default Topic0;