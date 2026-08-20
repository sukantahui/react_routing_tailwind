import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic89_files/topic89_questions';
import noteText from './topic89_files/topic89_note.txt?raw';

const Topic89 = () => {
    const [activeTab, setActiveTab] = useState('questions');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showAnswer, setShowAnswer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const tabs = [
        { id: 'questions', label: 'Short Questions' },
        { id: 'categories', label: 'Categories' },
        { id: 'quickref', label: 'Quick Reference' },
    ];

    // Short questions data
    const shortQuestions = [
        // Category: Definitions
        {
            id: 1,
            category: 'Definitions',
            question: 'What is linear programming?',
            answer: 'Linear programming is a mathematical optimization technique used to find the best outcome (maximum profit or minimum cost) in a mathematical model whose requirements are represented by linear relationships.',
            difficulty: 'Basic'
        },
        {
            id: 2,
            category: 'Definitions',
            question: 'What is the feasible region?',
            answer: 'The feasible region is the set of all points that satisfy all constraints of the LP problem simultaneously. It represents all possible solutions to the problem.',
            difficulty: 'Basic'
        },
        {
            id: 3,
            category: 'Definitions',
            question: 'What is a binding constraint?',
            answer: 'A binding constraint is a constraint that is satisfied as an equality at the optimal solution (slack = 0). It limits the optimal solution and represents a bottleneck resource.',
            difficulty: 'Intermediate'
        },
        {
            id: 4,
            category: 'Definitions',
            question: 'What is a corner point?',
            answer: 'A corner point (vertex) is an intersection point of constraint lines that forms a vertex of the feasible region. The optimal solution of an LP problem always occurs at a corner point.',
            difficulty: 'Basic'
        },
        {
            id: 5,
            category: 'Definitions',
            question: 'What is slack in LP?',
            answer: 'Slack is the difference between the RHS and LHS of a ≤ constraint at the optimal solution. It represents unused resources or capacity. Slack = RHS - LHS.',
            difficulty: 'Intermediate'
        },
        {
            id: 6,
            category: 'Definitions',
            question: 'What is a shadow price?',
            answer: 'A shadow price is the marginal value of one additional unit of a resource. It measures how much the objective function would improve if the RHS of a binding constraint is increased by one unit.',
            difficulty: 'Advanced'
        },

        // Category: Concepts
        {
            id: 7,
            category: 'Concepts',
            question: 'Why is the objective function linear in LP?',
            answer: 'The objective function is linear because each decision variable contributes proportionally to the objective, and there are no interaction terms between variables. This simplifies the optimization problem.',
            difficulty: 'Intermediate'
        },
        {
            id: 8,
            category: 'Concepts',
            question: 'What is the difference between maximization and minimization?',
            answer: 'Maximization finds the highest possible objective value (profit, revenue), while minimization finds the lowest possible objective value (cost, risk). The graphical method is the same, but you select the highest or lowest Z value.',
            difficulty: 'Basic'
        },
        {
            id: 9,
            category: 'Concepts',
            question: 'What does it mean if a constraint is redundant?',
            answer: 'A redundant constraint does not affect the feasible region or the optimal solution. It can be removed without changing the solution. It is always satisfied when other constraints are met.',
            difficulty: 'Intermediate'
        },
        {
            id: 10,
            category: 'Concepts',
            question: 'What is an unbounded solution?',
            answer: 'An unbounded solution occurs when the objective function can improve indefinitely without bound because the feasible region extends to infinity in the direction of optimization.',
            difficulty: 'Advanced'
        },
        {
            id: 11,
            category: 'Concepts',
            question: 'What is an infeasible solution?',
            answer: 'An infeasible solution occurs when no point satisfies all constraints simultaneously. The feasible region is empty, and there is no solution to the optimization problem.',
            difficulty: 'Intermediate'
        },
        {
            id: 12,
            category: 'Concepts',
            question: 'What are non-negativity constraints?',
            answer: 'Non-negativity constraints require that decision variables cannot be negative (x ≥ 0, y ≥ 0). They restrict solutions to the first quadrant and represent real-world quantities that cannot be negative.',
            difficulty: 'Basic'
        },

        // Category: Graphical Method
        {
            id: 13,
            category: 'Graphical Method',
            question: 'What are the steps to solve an LP problem graphically?',
            answer: '1) Define variables, 2) Formulate objective function, 3) Formulate constraints, 4) Graph constraints, 5) Find feasible region, 6) Identify corner points, 7) Evaluate objective at corners, 8) Select optimal solution, 9) Interpret results.',
            difficulty: 'Basic'
        },
        {
            id: 14,
            category: 'Graphical Method',
            question: 'How do you graph a constraint inequality?',
            answer: '1) Convert to equality, 2) Find x and y intercepts, 3) Draw the line, 4) Test a point to determine the feasible side, 5) Shade the feasible region.',
            difficulty: 'Intermediate'
        },
        {
            id: 15,
            category: 'Graphical Method',
            question: 'How do you find corner points of the feasible region?',
            answer: 'Find all intersections of constraint lines, including intersections with the axes. Solve pairs of equations to get the coordinates of each corner point. Verify each point is in the feasible region.',
            difficulty: 'Intermediate'
        },
        {
            id: 16,
            category: 'Graphical Method',
            question: 'What is the objective function line?',
            answer: 'The objective function line (Z = c₁x + c₂y) represents all points with the same objective value. Moving this line parallel to itself helps identify the optimal corner point.',
            difficulty: 'Intermediate'
        },
        {
            id: 17,
            category: 'Graphical Method',
            question: 'Why does the optimal solution occur at a corner point?',
            answer: 'The Fundamental Theorem of Linear Programming states that if an optimal solution exists, there is an optimal solution at a corner point of the feasible region. This makes corner points the only candidates for optimality.',
            difficulty: 'Advanced'
        },

        // Category: Sensitivity Analysis
        {
            id: 18,
            category: 'Sensitivity Analysis',
            question: 'What is sensitivity analysis in LP?',
            answer: 'Sensitivity analysis examines how changes in model parameters (objective coefficients, RHS values) affect the optimal solution. It determines allowable ranges and identifies which parameters are critical.',
            difficulty: 'Advanced'
        },
        {
            id: 19,
            category: 'Sensitivity Analysis',
            question: 'How do you interpret shadow prices?',
            answer: 'Shadow prices represent the marginal value of resources. A positive shadow price means the resource is scarce and valuable. The shadow price tells you the maximum amount you should pay for additional units of that resource.',
            difficulty: 'Advanced'
        },
        {
            id: 20,
            category: 'Sensitivity Analysis',
            question: 'What is the allowable range for objective coefficients?',
            answer: 'The allowable range is the range of values for an objective coefficient where the current optimal solution remains optimal. Within this range, the optimal basis does not change.',
            difficulty: 'Advanced'
        },
        {
            id: 21,
            category: 'Sensitivity Analysis',
            question: 'What is the allowable range for RHS values?',
            answer: 'The allowable range is the range of RHS values where the current optimal basis remains optimal. Within this range, the shadow price remains valid.',
            difficulty: 'Advanced'
        },

        // Category: Special Cases
        {
            id: 22,
            category: 'Special Cases',
            question: 'What causes multiple optimal solutions?',
            answer: 'Multiple optimal solutions occur when the objective function is parallel to a binding constraint. Any point on the constraint edge gives the same optimal objective value.',
            difficulty: 'Intermediate'
        },
        {
            id: 23,
            category: 'Special Cases',
            question: 'What is a degenerate solution?',
            answer: 'A degenerate solution occurs when more than the minimum number of constraints are binding at the optimal point. In 2D, this means 3 or more constraints intersect at the optimal corner point.',
            difficulty: 'Advanced'
        },
        {
            id: 24,
            category: 'Special Cases',
            question: 'How do you identify an unbounded problem graphically?',
            answer: 'An unbounded problem appears as a feasible region that extends to infinity in the direction where the objective function improves. The objective lines keep improving without reaching a corner point.',
            difficulty: 'Advanced'
        },
        {
            id: 25,
            category: 'Special Cases',
            question: 'How do you identify an infeasible problem graphically?',
            answer: 'An infeasible problem appears as no overlapping region where all constraints are satisfied. The constraint regions are completely separated with no common area.',
            difficulty: 'Intermediate'
        },

        // Category: Practical Applications
        {
            id: 26,
            category: 'Practical Applications',
            question: 'What industries use LP optimization?',
            answer: 'LP is used in manufacturing (production planning), agriculture (crop planning), finance (portfolio optimization), healthcare (resource allocation), transportation (routing), energy (power generation), and many other industries.',
            difficulty: 'Basic'
        },
        {
            id: 27,
            category: 'Practical Applications',
            question: 'What is a bottleneck in LP terms?',
            answer: 'A bottleneck is a binding constraint (slack = 0) that limits the optimal solution. It represents a scarce resource that is fully utilized and constrains performance.',
            difficulty: 'Intermediate'
        },
        {
            id: 28,
            category: 'Practical Applications',
            question: 'How do you use LP solutions for decision-making?',
            answer: 'LP solutions provide optimal values for decision variables, identify bottlenecks, reveal resource utilization, and guide investment decisions through shadow prices. They help managers make data-driven decisions.',
            difficulty: 'Intermediate'
        },
        {
            id: 29,
            category: 'Practical Applications',
            question: 'What is the economic meaning of slack?',
            answer: 'Slack represents unused capacity or surplus resources. Economically, it indicates that the resource is not a constraint and has no marginal value. These resources could be reduced or redirected.',
            difficulty: 'Intermediate'
        },
        {
            id: 30,
            category: 'Practical Applications',
            question: 'Why is LP important in business decision-making?',
            answer: 'LP helps businesses optimize resource allocation, maximize profits, minimize costs, identify bottlenecks, and make informed decisions under constraints. It provides a systematic approach to complex resource allocation problems.',
            difficulty: 'Basic'
        }
    ];

    // Categories
    const categories = ['All', 'Definitions', 'Concepts', 'Graphical Method', 'Sensitivity Analysis', 'Special Cases', 'Practical Applications'];

    const filteredQuestions = shortQuestions.filter(q =>
        (selectedCategory === 'All' || q.category === selectedCategory) &&
        (q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const toggleAnswer = (id) => {
        setShowAnswer(showAnswer === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
                        Short Questions
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
                        Test your knowledge with these short questions covering all key concepts of graphical LP.
                        Perfect for quick revision and self-assessment.
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
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-8">
                    {activeTab === 'questions' && (
                        <>
                            {/* Search and Filter */}
                            <div className="flex flex-wrap gap-4 items-center justify-between">
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={`cat-${cat}`}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={clsx(
                                                "px-3 py-1 rounded-full text-xs font-medium transition-all duration-300",
                                                selectedCategory === cat
                                                    ? "bg-cyan-600 text-white"
                                                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                                            )}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search questions..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 w-48 md:w-64"
                                    />
                                    <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
                                </div>
                            </div>

                            {/* Results Count */}
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Showing {filteredQuestions.length} of {shortQuestions.length} questions
                            </div>

                            {/* Questions List */}
                            <div className="space-y-3">
                                {filteredQuestions.map((q) => (
                                    <div
                                        key={q.id}
                                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div
                                            onClick={() => toggleAnswer(q.id)}
                                            className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-300"
                                        >
                                            <div className="flex justify-between items-start gap-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400">
                                                            {q.category}
                                                        </span>
                                                        <span className={clsx(
                                                            "text-xs px-2 py-0.5 rounded-full",
                                                            q.difficulty === 'Basic' ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                                                                q.difficulty === 'Intermediate' ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                                                                    "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                                        )}>
                                                            {q.difficulty}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                                        {q.id}. {q.question}
                                                    </h4>
                                                </div>
                                                <span className="text-cyan-500 text-sm font-medium flex-shrink-0">
                                                    {showAnswer === q.id ? '▼' : '▶'}
                                                </span>
                                            </div>
                                        </div>

                                        {showAnswer === q.id && (
                                            <div className="px-4 pb-4 pt-0 border-t border-gray-100 dark:border-gray-700">
                                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mt-3 border-l-4 border-green-500">
                                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                                        <span className="font-semibold text-green-700 dark:text-green-400">Answer:</span> {q.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {filteredQuestions.length === 0 && (
                                <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                                    No questions found matching your search. Try different keywords or categories.
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'categories' && (
                        <>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                                    Question Categories
                                </h3>
                                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                                    Browse questions by category. Each category focuses on a specific aspect of graphical LP.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categories.filter(c => c !== 'All').map((category) => {
                                        const count = shortQuestions.filter(q => q.category === category).length;
                                        return (
                                            <div
                                                key={`cat-card-${category}`}
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                    setActiveTab('questions');
                                                }}
                                                className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                                            >
                                                <h4 className="font-semibold text-cyan-700 dark:text-cyan-400">{category}</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{count} questions</p>
                                                <div className="mt-2 text-xs text-cyan-600 dark:text-cyan-400">
                                                    Click to view questions →
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Quick Stats */}
                                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{shortQuestions.length}</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Questions</div>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {shortQuestions.filter(q => q.difficulty === 'Basic').length}
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Basic Questions</div>
                                    </div>
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 text-center">
                                        <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                            {shortQuestions.filter(q => q.difficulty === 'Intermediate').length}
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Intermediate Questions</div>
                                    </div>
                                    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
                                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                            {shortQuestions.filter(q => q.difficulty === 'Advanced').length}
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">Advanced Questions</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'quickref' && (
                        <>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                                    Quick Reference: Key Concepts
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Definitions */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                                        <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-3">📖 Key Definitions</h4>
                                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                            <li><span className="font-medium">LP:</span> Optimization with linear relationships</li>
                                            <li><span className="font-medium">Feasible Region:</span> All points satisfying all constraints</li>
                                            <li><span className="font-medium">Binding Constraint:</span> Slack = 0, limits solution</li>
                                            <li><span className="font-medium">Corner Point:</span> Vertex of feasible region</li>
                                            <li><span className="font-medium">Slack:</span> Unused resources (RHS - LHS)</li>
                                            <li><span className="font-medium">Shadow Price:</span> Value of additional resources</li>
                                        </ul>
                                    </div>

                                    {/* Key Formulas */}
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-l-4 border-green-500">
                                        <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">📐 Key Formulas</h4>
                                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 font-mono">
                                            <li>Objective: Z = c₁x + c₂y</li>
                                            <li>Constraint: a₁x + a₂y ≤ b</li>
                                            <li>Slack: Slack = b - (a₁x* + a₂y*)</li>
                                            <li>Shadow Price: SP = ΔZ/Δb</li>
                                            <li>Utilization: (Used/Available) × 100%</li>
                                            <li>Objective Slope: m = -c₁/c₂</li>
                                        </ul>
                                    </div>

                                    {/* Key Concepts */}
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                                        <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-3">💡 Key Concepts</h4>
                                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                            <li><span className="font-medium">Optimal Solution:</span> At a corner point</li>
                                            <li><span className="font-medium">Multiple Optima:</span> Objective parallel to constraint</li>
                                            <li><span className="font-medium">Infeasible:</span> No overlapping constraints</li>
                                            <li><span className="font-medium">Unbounded:</span> Region extends to infinity</li>
                                            <li><span className="font-medium">Degenerate:</span> 3+ binding constraints</li>
                                            <li><span className="font-medium">Redundant:</span> Constraint doesn't affect region</li>
                                        </ul>
                                    </div>

                                    {/* Problem-Solving Steps */}
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                                        <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-3">📝 Problem-Solving Steps</h4>
                                        <ol className="space-y-1 text-sm text-gray-700 dark:text-gray-300 list-decimal list-inside">
                                            <li>Define variables</li>
                                            <li>Formulate objective</li>
                                            <li>Formulate constraints</li>
                                            <li>Graph constraints</li>
                                            <li>Find feasible region</li>
                                            <li>Identify corner points</li>
                                            <li>Evaluate objective</li>
                                            <li>Select optimal solution</li>
                                            <li>Interpret results</li>
                                        </ol>
                                    </div>
                                </div>

                                {/* Common Mistakes */}
                                <div className="mt-6 bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-l-4 border-red-500">
                                    <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">⚠️ Common Mistakes to Avoid</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <div>• Forgetting non-negativity constraints</div>
                                        <div>• Incorrect shading of feasible region</div>
                                        <div>• Missing corner points</div>
                                        <div>• Not verifying the solution</div>
                                        <div>• Confusing maximization with minimization</div>
                                        <div>• Misinterpreting shadow prices</div>
                                    </div>
                                </div>

                                {/* Quick Tips */}
                                <div className="mt-6 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 border-l-4 border-cyan-500">
                                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-2">💡 Quick Tips</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <div>• Test (0,0) for shading</div>
                                        <div>• Check all corner points</div>
                                        <div>• Verify with all constraints</div>
                                        <div>• Shadow price = ΔZ/Δb</div>
                                        <div>• Slack = 0 means binding</div>
                                        <div>• Optimal at corner point</div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                    <FAQTemplate
                        title="Short Questions FAQs"
                        questions={questions}
                    />
                </div>

                {/* Plain Text Print */}
                <div className="mt-8">
                    <PlainTextPrint
                        content={noteText}
                        title="Short Questions - Graphical LP"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Note"
                        downloadFileName="topic89_note.txt"
                    />
                </div>

                {/* Teacher's Note */}
                <div className="mt-8">
                    <Teacher note="Short questions are an excellent tool for quick revision and self-assessment. I encourage students to use these questions to test their understanding of key concepts. The act of recalling and articulating answers strengthens memory and reveals areas needing more study. I recommend going through these questions regularly - a few minutes each day can significantly improve retention and understanding of the material." />
                </div>
            </div>
        </div>
    );
};

export default Topic89;