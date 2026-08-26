import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic6_files/topic6_questions';
import noteText from './topic6_files/topic6_note.txt?raw';

const Topic6 = () => {
  const [activeTab, setActiveTab] = useState('problems');
  const [showSolution, setShowSolution] = useState(null);
  const [showHint, setShowHint] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const tabs = [
    { id: 'problems', label: 'Practice Problems' },
    { id: 'solutions', label: 'Solutions' },
    { id: 'tips', label: 'Formulation Tips' },
  ];

  // Categories
  const categories = ['All', 'Product Mix', 'Resource Allocation', 'Profit Maximization', 'Cost Minimization', 'Mixed Constraints'];

  // Practice problems data
  const practiceProblems = [
    {
      id: 1,
      title: 'Problem 1: Furniture Production',
      category: 'Product Mix',
      problem: 'A furniture company produces chairs and tables. Each chair requires 3 hours of carpentry and 1 hour of finishing. Each table requires 2 hours of carpentry and 2 hours of finishing. The company has 120 hours of carpentry and 80 hours of finishing available weekly. Profit per chair is ₹500 and per table is ₹700. Formulate the LP problem to maximize profit.',
      hint: 'Let x = chairs, y = tables. Identify carpentry and finishing constraints.',
      solution: 'Let x = number of chairs, y = number of tables\nMaximize Z = 500x + 700y\nSubject to:\n3x + 2y ≤ 120 (Carpentry)\nx + 2y ≤ 80 (Finishing)\nx, y ≥ 0'
    },
    {
      id: 2,
      title: 'Problem 2: Diet Planning',
      category: 'Cost Minimization',
      problem: 'A dietitian wants to plan a meal with at least 20 units of protein and 15 units of carbohydrates. Food A costs ₹25 per serving and provides 5 units of protein and 3 units of carbohydrates. Food B costs ₹35 per serving and provides 4 units of protein and 5 units of carbohydrates. Formulate the LP problem to minimize cost.',
      hint: 'Let x = servings of Food A, y = servings of Food B. What are the nutrient constraints?',
      solution: 'Let x = Food A servings, y = Food B servings\nMinimize Z = 25x + 35y\nSubject to:\n5x + 4y ≥ 20 (Protein)\n3x + 5y ≥ 15 (Carbs)\nx, y ≥ 0'
    },
    {
      id: 3,
      title: 'Problem 3: Budget Allocation',
      category: 'Resource Allocation',
      problem: 'A company has ₹200,000 to allocate between two departments. Department A generates 12 units of value per ₹1,000 and Department B generates 8 units per ₹1,000. At least ₹60,000 must go to Department A and at least ₹40,000 to Department B. Formulate the LP problem to maximize value.',
      hint: 'Let x = allocation to A (₹000), y = allocation to B (₹000). What are the constraints?',
      solution: 'Let x = allocation to A (₹000), y = allocation to B (₹000)\nMaximize Z = 12x + 8y\nSubject to:\nx + y ≤ 200 (Budget)\nx ≥ 60 (A minimum)\ny ≥ 40 (B minimum)\nx, y ≥ 0'
    },
    {
      id: 4,
      title: 'Problem 4: Production Planning',
      category: 'Profit Maximization',
      problem: 'A factory produces two products. Product A requires 2 hours of labor and 3 units of material. Product B requires 3 hours of labor and 2 units of material. Available: 150 labor hours and 120 material units. Profit: A = ₹40, B = ₹50. Formulate the LP problem.',
      hint: 'Let x = Product A, y = Product B. What are the labor and material constraints?',
      solution: 'Let x = Product A, y = Product B\nMaximize Z = 40x + 50y\nSubject to:\n2x + 3y ≤ 150 (Labor)\n3x + 2y ≤ 120 (Material)\nx, y ≥ 0'
    },
    {
      id: 5,
      title: 'Problem 5: Blending Problem',
      category: 'Cost Minimization',
      problem: 'A chemical company needs to produce 100 kg of a mixture containing at least 30 kg of ingredient X. Material A costs ₹60/kg and contains 50% X. Material B costs ₹50/kg and contains 30% X. Available: 80 kg of A and 70 kg of B. Formulate the LP problem to minimize cost.',
      hint: 'Let x = kg of Material A, y = kg of Material B. What are the ingredient and availability constraints?',
      solution: 'Let x = Material A (kg), y = Material B (kg)\nMinimize Z = 60x + 50y\nSubject to:\n0.5x + 0.3y ≥ 30 (Ingredient X)\nx + y ≥ 100 (Total mixture)\nx ≤ 80 (A availability)\ny ≤ 70 (B availability)\nx, y ≥ 0'
    },
    {
      id: 6,
      title: 'Problem 6: Mixed Constraints',
      category: 'Mixed Constraints',
      problem: 'A company produces two products. Total production must be at least 80 units. Product A must be at least 40% of total production. Product A uses 2 hours, Product B uses 3 hours. Available: 200 labor hours. Profit: A = ₹60, B = ₹80. Formulate the LP problem.',
      hint: 'Let x = Product A, y = Product B. Total production: x + y ≥ 80. 40% constraint: x ≥ 0.4(x + y).',
      solution: 'Let x = Product A, y = Product B\nMaximize Z = 60x + 80y\nSubject to:\n2x + 3y ≤ 200 (Labor)\nx + y ≥ 80 (Total production)\nx ≥ 0.4(x + y) → 0.6x ≥ 0.4y → 3x ≥ 2y\nx, y ≥ 0'
    },
    {
      id: 7,
      title: 'Problem 7: Transportation',
      category: 'Resource Allocation',
      problem: 'A company needs to ship 150 units of goods from two warehouses. Warehouse 1 has 100 units available and costs ₹6 per unit to ship. Warehouse 2 has 80 units available and costs ₹8 per unit to ship. Formulate the LP problem to minimize shipping cost.',
      hint: 'Let x = units from Warehouse 1, y = units from Warehouse 2. Total demand: x + y = 150.',
      solution: 'Let x = units from Warehouse 1, y = units from Warehouse 2\nMinimize Z = 6x + 8y\nSubject to:\nx + y = 150 (Total demand)\nx ≤ 100 (Warehouse 1 supply)\ny ≤ 80 (Warehouse 2 supply)\nx, y ≥ 0'
    },
    {
      id: 8,
      title: 'Problem 8: Advertising Mix',
      category: 'Profit Maximization',
      problem: 'A company advertises on TV and Radio. TV ads cost ₹40,000 each and reach 20,000 people. Radio ads cost ₹20,000 each and reach 10,000 people. Budget: ₹400,000. At least 3 TV ads and 5 Radio ads. Formulate the LP problem to maximize reach.',
      hint: 'Let x = TV ads, y = Radio ads. Budget: 40x + 20y ≤ 400 (₹000).',
      solution: 'Let x = TV ads, y = Radio ads\nMaximize Z = 20x + 10y (Reach in 000)\nSubject to:\n40x + 20y ≤ 400 (Budget)\nx ≥ 3 (TV minimum)\ny ≥ 5 (Radio minimum)\nx, y ≥ 0'
    },
    {
      id: 9,
      title: 'Problem 9: Staff Scheduling',
      category: 'Resource Allocation',
      problem: 'A call center has 240 hours available. Sales calls require 2 minutes each and generate ₹60 profit. Support calls require 3 minutes each and generate ₹40 profit. At least 3,000 Sales calls and 2,000 Support calls. Formulate the LP problem.',
      hint: 'Convert minutes to hours. Let x = Sales calls, y = Support calls.',
      solution: 'Let x = Sales calls, y = Support calls\nMaximize Z = 60x + 40y\nSubject to:\n(2/60)x + (3/60)y ≤ 240 (Hours)\nx ≥ 3000 (Sales minimum)\ny ≥ 2000 (Support minimum)\nx, y ≥ 0'
    },
    {
      id: 10,
      title: 'Problem 10: Investment Portfolio',
      category: 'Resource Allocation',
      problem: 'An investor has ₹300,000 to invest. Stock A returns 10% with risk 0.4. Stock B returns 6% with risk 0.2. Maximum risk allowed is 80. At least ₹50,000 in each stock. Formulate the LP problem to maximize return.',
      hint: 'Let x = amount in A (₹000), y = amount in B (₹000). Risk constraint: 0.4x + 0.2y ≤ 80.',
      solution: 'Let x = amount in A (₹000), y = amount in B (₹000)\nMaximize Z = 0.10x + 0.06y\nSubject to:\nx + y ≤ 300 (Budget)\n0.4x + 0.2y ≤ 80 (Risk)\nx ≥ 50 (A minimum)\ny ≥ 50 (B minimum)\nx, y ≥ 0'
    }
  ];

  const filteredProblems = practiceProblems.filter(p => 
    selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
            Practice Problems on LP Formulation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Apply your LP formulation skills with these practice problems covering various 
            scenarios and constraint types.
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
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/30"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={clsx(
                "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
                selectedCategory === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'problems' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProblems.map((problem) => (
                  <div
                    key={problem.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                        {problem.title}
                      </h4>
                      <span className="text-xs px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded">
                        {problem.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
                      {problem.problem}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setShowSolution(showSolution === problem.id ? null : problem.id);
                          setShowHint(null);
                        }}
                        className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-all duration-300"
                      >
                        {showSolution === problem.id ? 'Hide Solution' : 'Show Solution'}
                      </button>
                      <button
                        onClick={() => {
                          setShowHint(showHint === problem.id ? null : problem.id);
                          setShowSolution(null);
                        }}
                        className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300"
                      >
                        {showHint === problem.id ? 'Hide Hint' : 'Show Hint'}
                      </button>
                    </div>
                    {showHint === problem.id && (
                      <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs text-gray-700 dark:text-gray-300">
                        <span className="font-semibold">💡 Hint:</span> {problem.hint}
                      </div>
                    )}
                    {showSolution === problem.id && (
                      <div className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded text-xs font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {problem.solution}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredProblems.length === 0 && (
                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                  No problems found in this category.
                </div>
              )}
            </>
          )}

          {activeTab === 'solutions' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  Complete Solutions
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                  Click "Show Solution" on any problem above to see the complete LP formulation.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {practiceProblems.map((problem) => (
                    <div
                      key={`sol-${problem.id}`}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                        {problem.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{problem.category}</p>
                      <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                        <button
                          onClick={() => {
                            setActiveTab('problems');
                            setShowSolution(problem.id);
                            setShowHint(null);
                          }}
                          className="hover:underline"
                        >
                          Click to view solution →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'tips' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                  LP Formulation Tips & Strategies
                </h3>

                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">📝 Step-by-Step Formulation</h4>
                    <ol className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li><span className="font-medium">Read carefully:</span> Understand what the problem is asking</li>
                      <li><span className="font-medium">Identify variables:</span> What are you trying to decide?</li>
                      <li><span className="font-medium">Identify objective:</span> Are you maximizing or minimizing?</li>
                      <li><span className="font-medium">Find constraints:</span> What limits your decisions?</li>
                      <li><span className="font-medium">Write mathematically:</span> Convert to equations/inequalities</li>
                      <li><span className="font-medium">Add non-negativity:</span> All variables ≥ 0</li>
                    </ol>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">🔑 Key Words to Identify</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div>
                        <span className="font-medium">Objective:</span>
                        <ul className="list-disc list-inside ml-2">
                          <li>Maximize → "profit", "revenue"</li>
                          <li>Minimize → "cost", "expense"</li>
                        </ul>
                      </div>
                      <div>
                        <span className="font-medium">Constraints:</span>
                        <ul className="list-disc list-inside ml-2">
                          <li>≤ → "at most", "available"</li>
                          <li>≥ → "at least", "minimum"</li>
                          <li>= → "exactly", "must be"</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">⚠️ Common Mistakes to Avoid</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Forgetting non-negativity constraints</li>
                      <li>Mixing up ≤ and ≥ for constraints</li>
                      <li>Misidentifying the objective (max vs min)</li>
                      <li>Using wrong units (e.g., minutes vs hours)</li>
                      <li>Missing constraints from the problem statement</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">💡 Professional Tips</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Always write variables with units</li>
                      <li>Check if constraints are linear</li>
                      <li>Verify the formulation by "translating" it back</li>
                      <li>Test with a simple solution to check feasibility</li>
                      <li>Document your reasoning for each constraint</li>
                    </ul>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border-l-4 border-emerald-500">
                    <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">✅ Formulation Checklist</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600">✓</span> Variables defined
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600">✓</span> Objective stated (Max/Min)
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600">✓</span> All constraints listed
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600">✓</span> Constraint directions correct
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600">✓</span> Non-negativity included
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600">✓</span> Units consistent
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="LP Formulation Practice FAQs"
            questions={questions}
          />
        </div>

        {/* Plain Text Print */}
        <div className="mt-8">
          <PlainTextPrint
            content={noteText}
            title="Practice Problems on LP Formulation"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Note"
            downloadFileName="topic6_note.txt"
          />
        </div>

        {/* Teacher's Note */}
        <div className="mt-8">
          <Teacher note="Practice is essential for mastering LP formulation. I tell my students that formulation is like learning a new language - the more you practice, the more fluent you become. These problems cover a wide range of scenarios, from simple product mix to complex mixed constraints. I encourage students to attempt each problem independently before checking the solution. The key is not just getting the right answer, but understanding why each constraint is formulated the way it is." />
        </div>
      </div>
    </div>
  );
};

export default Topic6;