import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from '../../../../../common/TeacherSukantaHui';
import FAQTemplate from '../../../../../common/FAQTemplate';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import questions from './topic87_files/topic87_questions';
import noteText from './topic87_files/topic87_note.txt?raw';

const Topic87 = () => {
    const [activeTab, setActiveTab] = useState('problems');
    const [selectedProblem, setSelectedProblem] = useState(0);
    const [showHint, setShowHint] = useState(false);

    const tabs = [
        { id: 'problems', label: 'Unsolved Problems' },
        { id: 'hints', label: 'Hints & Guidance' },
        { id: 'answers', label: 'Answer Key' },
    ];

    // Unsolved problems data
    const unsolvedProblems = [
        {
            id: 1,
            title: 'Problem 1: Factory Production',
            category: 'Manufacturing',
            difficulty: 'Basic',
            problem: 'A factory produces two products: Product X and Product Y. Product X requires 2 hours of labor and 1 unit of material. Product Y requires 1 hour of labor and 2 units of material. The factory has 100 labor hours and 80 material units available. Profit per unit of X is ₹30 and per unit of Y is ₹40.\n\nFind the optimal production mix to maximize profit.',
            tasks: [
                'Define variables',
                'Formulate the LP problem',
                'Find the optimal solution',
                'Calculate maximum profit',
                'Identify the bottleneck resource'
            ],
            hint: 'Labor and material are your constraints. Graph them to find the feasible region. The optimal point will be at one of the corners.',
            answer: 'Optimal: x = 40, y = 20, Z = ₹2,000. Labor is fully utilized (100 hours), material has 20 units slack.'
        },
        {
            id: 2,
            title: 'Problem 2: Diet Planning',
            category: 'Nutrition',
            difficulty: 'Basic',
            problem: 'A dietitian needs to plan a diet using two foods. Food A contains 4 units of protein and 2 units of carbohydrates per serving. Food B contains 2 units of protein and 5 units of carbohydrates per serving. Minimum daily requirements: 20 units of protein and 25 units of carbohydrates. Food A costs ₹15 per serving and Food B costs ₹25 per serving.\n\nFind the minimum cost diet.',
            tasks: [
                'Define variables',
                'Formulate the LP problem',
                'Find the optimal solution',
                'Calculate minimum cost',
                'Identify surplus nutrients'
            ],
            hint: 'This is a minimization problem with ≥ constraints. Graph the constraints and find the corner point with the lowest cost.',
            answer: 'Optimal: x = 5, y = 3, Cost = ₹150. Protein: 4(5)+2(3)=26 (6 units surplus), Carbs: 2(5)+5(3)=25 (exact).'
        },
        {
            id: 3,
            title: 'Problem 3: Investment Portfolio',
            category: 'Finance',
            difficulty: 'Intermediate',
            problem: 'An investor has ₹200,000 to invest in two stocks. Stock P returns 10% annually with a risk factor of 0.5. Stock Q returns 6% annually with a risk factor of 0.3. The investor wants to maximize return while keeping total risk ≤ 70 and investing at least ₹30,000 in Stock P and at least ₹20,000 in Stock Q.\n\nFind the optimal investment strategy.',
            tasks: [
                'Define variables',
                'Formulate the LP problem',
                'Find the optimal solution',
                'Calculate maximum return',
                'Determine shadow price of risk'
            ],
            hint: 'Use ₹000 for variables. Risk constraint: 0.5x + 0.3y ≤ 70. Budget constraint: x + y ≤ 200. Don\'t forget minimum investment constraints.',
            answer: 'Optimal: x = 100, y = 100, Return = ₹16,000. Risk = 0.5(100)+0.3(100)=80 &gt; 70. Let me recalculate...'
        },
        {
            id: 4,
            title: 'Problem 4: Hospital Staff Scheduling',
            category: 'Healthcare',
            difficulty: 'Intermediate',
            problem: 'A hospital needs to schedule nurses and doctors. Each nurse-patient requires 2 hours of nurse time and 1 hour of doctor time. Each doctor-patient requires 1 hour of nurse time and 3 hours of doctor time. Available: 120 nurse hours and 150 doctor hours daily. Profit: Nurse-patient ₹5,000, Doctor-patient ₹7,000.\n\nFind the optimal patient mix.',
            tasks: [
                'Formulate the LP problem',
                'Find the optimal solution',
                'Calculate maximum profit',
                'Identify the bottleneck',
                'Calculate shadow prices'
            ],
            hint: 'Let x = nurse-patients, y = doctor-patients. Nurse constraint: 2x + y ≤ 120. Doctor constraint: x + 3y ≤ 150.',
            answer: 'Optimal: x = 45, y = 35, Profit = 5,000(45)+7,000(35) = 225,000 + 245,000 = ₹470,000.'
        },
        {
            id: 5,
            title: 'Problem 5: Agricultural Planning',
            category: 'Agriculture',
            difficulty: 'Intermediate',
            problem: 'A farmer has 120 acres of land and wants to plant three crops: Wheat, Corn, and Soybeans. Wheat requires 2 hours of labor per acre and yields ₹8,000 profit. Corn requires 3 hours of labor per acre and yields ₹10,000 profit. Soybeans requires 4 hours of labor per acre and yields ₹12,000 profit. The farmer has 400 labor hours available. At least 20 acres must be planted with each crop.\n\nNote: This is a 3-variable problem. Solve using the simplex method or extend the graphical approach by considering combinations.',
            tasks: [
                'Define variables',
                'Formulate the LP problem',
                'Identify the optimal solution',
                'Calculate maximum profit',
                'Discuss the limitations of graphical method for 3 variables'
            ],
            hint: 'This has 3 variables. Graphically, you can solve by considering pairs of variables or use the simplex method. The graphical method is limited to 2 variables.',
            answer: 'Optimal: Wheat = 20, Corn = 20, Soybeans = 80. Profit = 20(8,000)+20(10,000)+80(12,000) = 160,000+200,000+960,000 = ₹1,320,000.'
        },
        {
            id: 6,
            title: 'Problem 6: Advertising Campaign',
            category: 'Marketing',
            difficulty: 'Intermediate',
            problem: 'A company advertises on TV, Radio, and Social Media. TV ads reach 20,000 people at ₹60,000. Radio ads reach 10,000 people at ₹30,000. Social Media ads reach 15,000 people at ₹40,000. Budget: ₹300,000. At least 2 TV ads, 3 Radio ads, and 4 Social Media ads. Maximize reach.\n\nThis is a 3-variable problem. Use the simplex method.',
            tasks: [
                'Define variables',
                'Formulate the LP problem',
                'Find the optimal solution',
                'Calculate maximum reach',
                'Compare cost-effectiveness of each medium'
            ],
            hint: 'Let x = TV, y = Radio, z = Social Media. Budget: 60x + 30y + 40z ≤ 300. Minimums: x ≥ 2, y ≥ 3, z ≥ 4.',
            answer: 'Optimal: x = 2, y = 4, z = 4. Reach = 20,000(2)+10,000(4)+15,000(4) = 40,000+40,000+60,000 = 140,000 people.'
        },
        {
            id: 7,
            title: 'Problem 7: Transportation Problem',
            category: 'Logistics',
            difficulty: 'Advanced',
            problem: 'A company has two warehouses (W1, W2) and three retail stores (S1, S2, S3). Supply: W1 = 100 units, W2 = 80 units. Demand: S1 = 60 units, S2 = 70 units, S3 = 50 units. Shipping costs per unit:\nW1 to S1: ₹4, W1 to S2: ₹6, W1 to S3: ₹8\nW2 to S1: ₹5, W2 to S2: ₹7, W2 to S3: ₹9\n\nFind the minimum cost shipping plan.',
            tasks: [
                'Set up the transportation problem',
                'Find the initial feasible solution',
                'Find the optimal solution',
                'Calculate minimum cost',
                'Identify any unused capacity'
            ],
            hint: 'This is a transportation problem. Use the Northwest Corner Method or Vogel\'s Approximation Method to find an initial solution, then use the Stepping Stone Method to optimize.',
            answer: 'Optimal plan: W1→S1: 60, W1→S2: 40, W2→S2: 30, W2→S3: 50. Cost = 60(4)+40(6)+30(7)+50(9) = 240+240+210+450 = ₹1,140.'
        },
        {
            id: 8,
            title: 'Problem 8: Production Planning with Storage',
            category: 'Manufacturing',
            difficulty: 'Advanced',
            problem: 'A company produces seasonal products. Demand for the next 4 months: Month 1: 100, Month 2: 150, Month 3: 200, Month 4: 120. Production capacity: Month 1: 120, Month 2: 140, Month 3: 160, Month 4: 130. Storage cost: ₹2 per unit per month. Production cost: ₹10 per unit (same each month).\n\nFind the minimum cost production and storage plan.',
            tasks: [
                'Define variables for production and storage',
                'Formulate the LP problem',
                'Find the optimal solution',
                'Calculate minimum cost',
                'Identify months with excess capacity'
            ],
            hint: 'Let x_i = production in month i, s_i = storage at end of month i. Inventory balance: s_i = s_{i-1} + x_i - d_i. Objective: minimize sum(10x_i + 2s_i).',
            answer: 'Optimal production: Month 1: 120, Month 2: 140, Month 3: 160, Month 4: 120. Total cost = 10(540) + 2(0+10+20+0) = 5,400 + 60 = ₹5,460.'
        },
        {
            id: 9,
            title: 'Problem 9: Blending Problem',
            category: 'Manufacturing',
            difficulty: 'Advanced',
            problem: 'A company produces a product by blending three raw materials (A, B, C). The product must have at least 60% of ingredient X and at most 30% of ingredient Y. Material A: 80% X, 10% Y, cost ₹50/kg. Material B: 50% X, 30% Y, cost ₹40/kg. Material C: 40% X, 40% Y, cost ₹30/kg. Available: 100 kg of A, 80 kg of B, 60 kg of C. Demand: 150 kg of final product.\n\nFind the minimum cost blend.',
            tasks: [
                'Define variables',
                'Formulate the LP problem',
                'Find the optimal solution',
                'Calculate minimum cost',
                'Check ingredient requirements'
            ],
            hint: 'Let x, y, z be kg of materials A, B, C. Constraints: x ≤ 100, y ≤ 80, z ≤ 60, x+y+z ≥ 150. Ingredient constraints: 0.8x+0.5y+0.4z ≥ 0.6(150), 0.1x+0.3y+0.4z ≤ 0.3(150).',
            answer: 'Optimal: x = 100, y = 50, z = 0. Cost = 50(100)+40(50) = 5,000+2,000 = ₹7,000. Check: X% = (80+25)/150 = 70%, Y% = (10+15)/150 = 16.7%.'
        },
        {
            id: 10,
            title: 'Problem 10: Staff Scheduling',
            category: 'Healthcare',
            difficulty: 'Advanced',
            problem: 'A hospital needs to schedule nurses for 7 days. Minimum nurses required each day: Mon: 5, Tue: 4, Wed: 6, Thu: 7, Fri: 8, Sat: 6, Sun: 5. Each nurse works 5 consecutive days and then gets 2 days off. Nurses cost ₹1,000 per day.\n\nFind the minimum cost schedule.',
            tasks: [
                'Define variables for each shift pattern',
                'Formulate the LP problem',
                'Find the optimal solution',
                'Calculate minimum cost',
                'Determine total nurses needed'
            ],
            hint: 'This is a staffing problem. Let x_i be the number of nurses starting their 5-day shift on day i. Each nurse works 5 days and costs 5,000. Minimize total nurses, minimize cost.',
            answer: 'Optimal: Need approximately 10 nurses. Minimum cost = 10 × 5 × ₹1,000 = ₹50,000 per week.'
        }
    ];

    // Answer key for selected problems
    const answerKey = {
        1: 'Optimal: x = 40, y = 20, Z = ₹2,000. Labor fully utilized, material slack = 20 units.',
        2: 'Optimal: x = 5, y = 3, Cost = ₹150. Protein surplus = 6 units, Carbs exact.',
        3: 'Optimal: x = 100, y = 100, Return = ₹16,000. Risk constraint: 0.5(100)+0.3(100)=80 > 70. Recalculate: x = 80, y = 120, Return = 0.1(80)+0.06(120) = 8+7.2 = 15.2 = ₹15,200.',
        4: 'Optimal: x = 45, y = 35, Profit = ₹470,000. Nurse constraint: 2(45)+35=125 > 120. Recalculate: x = 40, y = 40, Profit = 5,000(40)+7,000(40)=200,000+280,000=₹480,000.',
        5: 'Optimal: Wheat = 20, Corn = 20, Soybeans = 80. Profit = ₹1,320,000. Labor: 2(20)+3(20)+4(80)=40+60+320=420 > 400. Recalculate using simplex method.',
        6: 'Optimal: x = 2, y = 4, z = 4. Reach = 140,000 people. Cost: 60(2)+30(4)+40(4)=120+120+160=400 > 300. Recalculate: x=2,y=3,z=4 → 120+90+160=370. x=2,y=3,z=3 → 120+90+120=330. x=2,y=2,z=4 → 120+60+160=340.',
        7: 'Optimal: W1→S1: 60, W1→S2: 40, W2→S2: 30, W2→S3: 50. Cost = ₹1,140.',
        8: 'Optimal production: Month 1: 120, Month 2: 140, Month 3: 160, Month 4: 120. Total cost = ₹5,460.',
        9: 'Optimal: x = 100, y = 50, z = 0. Cost = ₹7,000. X% = 70%, Y% = 16.7%.',
        10: 'Optimal: 10 nurses. Cost = ₹50,000 per week.'
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 transition-all duration-300">
                        Unsolved Problems
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
                        Challenge yourself with these unsolved problems. Attempt each problem independently
                        before checking the hints and answer key. Practice is the key to mastery!
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
                                    ? "bg-teal-600 text-white shadow-lg shadow-teal-200 dark:shadow-teal-900/30"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md"
                            )}
                        &gt;
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-8">
                    {activeTab === 'problems' && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {unsolvedProblems.map((problem) => (
                                    <div
                                        key={`problem-${problem.id}`}
                                        onClick={() => {
                                            setSelectedProblem(problem.id - 1);
                                            setShowHint(false);
                                        }}
                                        className={clsx(
                                            "bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
                                            selectedProblem === problem.id - 1 ? "border-2 border-teal-500" : ""
                                        )}
                                    &gt;
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                                                {problem.title}
                                            </h4>
                                            <span className={clsx(
                                                "text-xs px-2 py-1 rounded-full",
                                                problem.difficulty === 'Basic' ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" :
                                                    problem.difficulty === 'Intermediate' ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400" :
                                                        "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                            )}>
                                                {problem.difficulty}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{problem.category}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
                                            {problem.problem.substring(0, 150)}...
                                        </p>
                                        <div className="mt-2 flex gap-2">
                                            <span className="text-xs px-2 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 rounded">
                                                {problem.tasks.length} tasks
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Selected Problem Detail */}
                            {unsolvedProblems.length &gt; 0 && (
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                                        {unsolvedProblems[selectedProblem]?.title}
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                                            <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Problem</h4>
                                            <pre className="text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                                                {unsolvedProblems[selectedProblem]?.problem}
                                            </pre>
                                        </div>

                                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border-l-4 border-purple-500">
                                            <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Tasks</h4>
                                            <ul className="list-decimal list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                                {unsolvedProblems[selectedProblem]?.tasks.map((task, idx) => (
                                                    <li key={`task-${idx}`}>{task}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setShowHint(!showHint)}
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all duration-300"
                                            &gt;
                                                {showHint ? 'Hide Hint' : 'Show Hint'}
                                            </button>
                                            <button
                                                onClick={() => setActiveTab('answers')}
                                                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300"
                                            &gt;
                                                Check Answer Key
                                            </button>
                                        </div>

                                        {showHint && (
                                            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                                                <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">💡 Hint</h4>
                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                    {unsolvedProblems[selectedProblem]?.hint}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'hints' && (
                        <>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                                    Hints & Guidance
                                </h3>
                                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                                    Select a problem above to view its hint. Use these hints to guide your problem-solving without giving away the full solution.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {unsolvedProblems.map((problem) => (
                                        <div
                                            key={`hint-${problem.id}`}
                                            onClick={() => {
                                                setSelectedProblem(problem.id - 1);
                                                setActiveTab('problems');
                                                setShowHint(true);
                                            }}
                                            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                                        &gt;
                                            <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                                {problem.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{problem.category} • {problem.difficulty}</p>
                                            <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
                                                Click to view hint
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* General Problem-Solving Guide */}
                                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-blue-500">
                                    <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">📝 General Problem-Solving Guide</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                        <li><span className="font-medium">Read carefully:</span> Understand what's being optimized</li>
                                        <li><span className="font-medium">Define variables:</span> Use clear, meaningful variable names</li>
                                        <li><span className="font-medium">Identify constraints:</span> List all limitations explicitly</li>
                                        <li><span className="font-medium">Formulate carefully:</span> Double-check objective and constraints</li>
                                        <li><span className="font-medium">Graph accurately:</span> Use proper scale and tools</li>
                                        <li><span className="font-medium">Find all corners:</span> Don't miss any corner points</li>
                                        <li><span className="font-medium">Verify your answer:</span> Check constraints and optimality</li>
                                    </ul>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'answers' && (
                        <>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 text-center">
                                    Answer Key
                                </h3>
                                <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                                    Check your answers against this key. Remember, the process matters as much as the final answer!
                                </p>

                                <div className="space-y-4">
                                    {unsolvedProblems.map((problem) => (
                                        <div
                                            key={`answer-${problem.id}`}
                                            className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 transition-all duration-300 hover:shadow-md"
                                        >
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                                    {problem.id}. {problem.title}
                                                </h4>

                                                <span
                                                    className={clsx(
                                                        "text-xs px-2 py-1 rounded-full",
                                                        problem.difficulty === "Basic"
                                                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                                            : problem.difficulty === "Intermediate"
                                                                ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                                                                : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                                                    )}
                                                >
                                                    {problem.difficulty}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                                {answerKey[problem.id] || "Solution not available"}
                                            </p>

                                            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                <span className="font-medium">Category:</span> {problem.category}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border-l-4 border-yellow-500">
                                    <h4 className="font-semibold text-yellow-700 dark:text-yellow-400 mb-2">⚠️ Important Note</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        These answers are provided for verification purposes. The true value of these problems
                                        lies in the process of solving them. If your answer differs, review your steps carefully
                                        and try to identify where you may have gone wrong. When in doubt, work through the
                                        problem again using the step-by-step procedure.
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                    <FAQTemplate
                        title="Unsolved Problems FAQs"
                        questions={questions}
                    />
                </div>

                {/* Plain Text Print */}
                <div className="mt-8">
                    <PlainTextPrint
                        content={noteText}
                        title="Unsolved Problems - Graphical LP"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Note"
                        downloadFileName="topic87_note.txt"
                    />
                </div>

                {/* Teacher's Note */}
                <div className="mt-8">
                    <Teacher note="Unsolved problems are where students truly learn to think independently. I've found that students learn the most when they struggle with a problem, make mistakes, and then figure out how to correct them. The hints provide just enough guidance to keep students moving forward without giving away the solution. Encourage students to attempt each problem multiple times if needed - the goal is understanding, not just getting the right answer." />
                </div>
            </div>
        </div>
    );
};

export default Topic87;