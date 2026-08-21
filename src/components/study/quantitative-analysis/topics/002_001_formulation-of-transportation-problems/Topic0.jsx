// Topic0.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic0_files/topic0_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic0_files/topic0_note.txt?raw';

const Topic0 = () => {
    const [activeSection, setActiveSection] = useState(0);
    const sectionRefs = useRef([]);

    // Intersection Observer for section-based reveal animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = parseInt(entry.target.dataset.index);
                        if (!isNaN(index)) {
                            setActiveSection(index);
                        }
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            sectionRefs.current.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);

    const sections = [
        { id: 'introduction', title: 'Introduction to Transportation Problems' },
        { id: 'concept', title: 'Understanding the Core Concept' },
        { id: 'components', title: 'Key Components of Transportation Problems' },
        { id: 'examples', title: 'Real-World Examples' },
        { id: 'visualization', title: 'Visual Understanding' },
        { id: 'tips', title: 'Tips & Tricks' },
        { id: 'mistakes', title: 'Common Mistakes' },
        { id: 'bestpractices', title: 'Best Practices' },
        { id: 'checklist', title: 'Mini Checklist' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
            <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/30 rounded-full">
                        Topic 0
                    </div>
                    <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                        Introduction to Transportation Problems
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Understanding the fundamentals of transportation problems and their importance in logistics and supply chain management
                    </p>
                </div>

                {/* Main Content */}
                <div className="space-y-16">
                    {/* Introduction Section */}
                    <section
                        ref={(el) => (sectionRefs.current[0] = el)}
                        data-index="0"
                        className={clsx(
                            'transform transition-all duration-700 ease-out',
                            'motion-safe:translate-y-0 motion-safe:opacity-100',
                            activeSection >= 0 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
                        )}
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Introduction to Transportation Problems</h2>

                            <div className="prose prose-teal dark:prose-invert max-w-none leading-relaxed">
                                <p>
                                    The transportation problem is a special type of linear programming problem that deals with the optimal distribution of goods from multiple supply points (sources) to multiple demand points (destinations). It is one of the most important and widely used optimization models in operations research and supply chain management.
                                </p>

                                <div className="my-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border-l-4 border-teal-500">
                                    <p className="font-medium text-teal-800 dark:text-teal-300">
                                        💡 Key Insight: Transportation problems help organizations determine the most cost-effective way to ship goods from warehouses to customers while satisfying supply and demand constraints.
                                    </p>
                                </div>

                                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">What is a Transportation Problem?</h3>
                                <p>
                                    A transportation problem involves finding the optimal shipping plan that minimizes total transportation cost (or maximizes total profit) when transporting a homogeneous product from several origins (supply points) to several destinations (demand points), subject to supply and demand constraints.
                                </p>

                                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <h4 className="font-semibold text-blue-700 dark:text-blue-300">Origins (Sources)</h4>
                                        <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                            <li>Supply points where goods originate</li>
                                            <li>Have limited supply capacity</li>
                                            <li>Examples: Factories, warehouses, farms</li>
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                        <h4 className="font-semibold text-green-700 dark:text-green-300">Destinations (Sinks)</h4>
                                        <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                            <li>Demand points where goods are needed</li>
                                            <li>Have specific demand requirements</li>
                                            <li>Examples: Stores, customers, distribution centers</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                                    <p className="font-medium text-orange-800 dark:text-orange-300">
                                        🎯 Think About: When Mamata in Kolkata manages a distribution network, she needs to decide how many units to ship from each warehouse to each store to minimize transportation costs while meeting all demands.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Concept Section */}
                    <section
                        ref={(el) => (sectionRefs.current[1] = el)}
                        data-index="1"
                        className={clsx(
                            'transform transition-all duration-700 ease-out delay-100',
                            'motion-safe:translate-y-0 motion-safe:opacity-100',
                            activeSection >= 1 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
                        )}
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Understanding the Core Concept</h2>

                            <div className="prose prose-teal dark:prose-invert max-w-none leading-relaxed">
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">The Transportation Problem Structure</h3>
                                <p>
                                    The transportation problem can be represented as a network with sources and destinations connected by transportation routes. The objective is to minimize the total cost of shipping goods while satisfying all supply and demand constraints.
                                </p>

                                <div className="my-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Mathematical Formulation</h4>
                                    <p className="text-sm font-mono bg-white dark:bg-gray-800 p-3 rounded border border-gray-300 dark:border-gray-600">
                                        Minimize Z = Σᵢ Σⱼ cᵢⱼ × xᵢⱼ<br /><br />
                                        Subject to:<br />
                                        Σⱼ xᵢⱼ = Sᵢ (Supply constraint for each source i)<br />
                                        Σᵢ xᵢⱼ = Dⱼ (Demand constraint for each destination j)<br />
                                        xᵢⱼ ≥ 0 (Non-negativity constraint)
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        Where: cᵢⱼ = cost per unit from source i to destination j<br />
                                        xᵢⱼ = quantity shipped from source i to destination j<br />
                                        Sᵢ = supply at source i<br />
                                        Dⱼ = demand at destination j
                                    </p>
                                </div>

                                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Key Characteristics</h3>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Linear Programming:</strong> Transportation problems are linear programming problems with a special structure</li>
                                    <li><strong>Network Structure:</strong> Can be represented as a bipartite graph with sources and destinations</li>
                                    <li><strong>Integrality Property:</strong> If supplies and demands are integers, the optimal solution is also integral</li>
                                    <li><strong>Balanced vs Unbalanced:</strong> Problems can be balanced (total supply = total demand) or unbalanced</li>
                                </ul>

                                <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                                    <p className="font-medium text-purple-800 dark:text-purple-300">
                                        💡 <strong>Observe Carefully:</strong> The transportation problem is a special case of the minimum cost flow problem. Its unique structure allows for efficient specialized algorithms.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Components Section */}
                    <section
                        ref={(el) => (sectionRefs.current[2] = el)}
                        data-index="2"
                        className={clsx(
                            'transform transition-all duration-700 ease-out delay-200',
                            'motion-safe:translate-y-0 motion-safe:opacity-100',
                            activeSection >= 2 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
                        )}
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Key Components of Transportation Problems</h2>

                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                                        <h4 className="font-semibold text-teal-700 dark:text-teal-300">1. Sources (Supply Points)</h4>
                                        <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                                            <li>Origins where goods are available</li>
                                            <li>Have limited supply capacities</li>
                                            <li>Represented by S₁, S₂, ..., Sₘ</li>
                                            <li>Examples: Factories, warehouses, farms</li>
                                        </ul>
                                    </div>

                                    <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                                        <h4 className="font-semibold text-teal-700 dark:text-teal-300">2. Destinations (Demand Points)</h4>
                                        <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                                            <li>Sinks where goods are needed</li>
                                            <li>Have specific demand requirements</li>
                                            <li>Represented by D₁, D₂, ..., Dₙ</li>
                                            <li>Examples: Stores, customers, markets</li>
                                        </ul>
                                    </div>

                                    <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                                        <h4 className="font-semibold text-teal-700 dark:text-teal-300">3. Transportation Costs</h4>
                                        <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                                            <li>Cost per unit shipped from source to destination</li>
                                            <li>Represented by cᵢⱼ in the cost matrix</li>
                                            <li>Can vary based on distance, mode, etc.</li>
                                            <li>Objective is to minimize total cost</li>
                                        </ul>
                                    </div>

                                    <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                                        <h4 className="font-semibold text-teal-700 dark:text-teal-300">4. Decision Variables</h4>
                                        <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                                            <li>Amount shipped from each source to each destination</li>
                                            <li>Represented by xᵢⱼ in the formulation</li>
                                            <li>Must be non-negative</li>
                                            <li>Integral in optimal solution</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                                    <p className="font-medium text-yellow-800 dark:text-yellow-300">
                                        💡 <strong>Try Changing This:</strong> What happens if you change the transportation costs? How does the optimal shipping plan change? This is the essence of sensitivity analysis in transportation problems.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Examples Section */}
                    <section
                        ref={(el) => (sectionRefs.current[3] = el)}
                        data-index="3"
                        className={clsx(
                            'transform transition-all duration-700 ease-out delay-300',
                            'motion-safe:translate-y-0 motion-safe:opacity-100',
                            activeSection >= 3 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
                        )}
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Real-World Examples</h2>

                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                                    <h4 className="font-semibold text-teal-700 dark:text-teal-300">Example 1: Distribution of Agricultural Products</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                        <strong>Scenario:</strong> A company in Barrackpore has three farms (sources) and four markets (destinations). They need to distribute potatoes from farms to markets at minimum cost.
                                    </p>
                                    <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                                        <p className="font-medium">Problem Setup:</p>
                                        <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                                            <li><strong>Sources:</strong> Farm 1 (Supply: 100 tons), Farm 2 (Supply: 150 tons), Farm 3 (Supply: 120 tons)</li>
                                            <li><strong>Destinations:</strong> Market 1 (Demand: 80 tons), Market 2 (Demand: 90 tons), Market 3 (Demand: 100 tons), Market 4 (Demand: 100 tons)</li>
                                            <li><strong>Objective:</strong> Minimize total transportation cost</li>
                                        </ul>
                                    </div>
                                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                                        <p className="font-medium">💡 Application:</p>
                                        <p className="text-gray-700 dark:text-gray-300">Mahima in Kolkata uses this model to plan weekly distribution from farms to markets, saving the company 15% in logistics costs.</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                                    <h4 className="font-semibold text-teal-700 dark:text-teal-300">Example 2: Manufacturing and Distribution</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                        <strong>Scenario:</strong> A furniture company has two factories in Kolkata and three retail stores in different cities.
                                    </p>
                                    <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                                        <p className="font-medium">Problem Setup:</p>
                                        <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                                            <li><strong>Sources:</strong> Factory A (Supply: 500 units), Factory B (Supply: 400 units)</li>
                                            <li><strong>Destinations:</strong> Store 1 (Demand: 300 units), Store 2 (Demand: 250 units), Store 3 (Demand: 350 units)</li>
                                            <li><strong>Cost Matrix:</strong> Different shipping costs per unit to each store</li>
                                        </ul>
                                    </div>
                                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                                        <p className="font-medium">💡 Application:</p>
                                        <p className="text-gray-700 dark:text-gray-300">Susmita uses this model to determine optimal shipping quantities, reducing transportation costs by 12%.</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                                    <h4 className="font-semibold text-teal-700 dark:text-teal-300">Example 3: Food Supply Chain</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                        <strong>Scenario:</strong> A restaurant chain in Jadavpur receives daily supplies from three distributors.
                                    </p>
                                    <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                                        <p className="font-medium">Problem Setup:</p>
                                        <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                                            <li><strong>Sources:</strong> Distributor 1 (Supply: 200 kg), Distributor 2 (Supply: 300 kg), Distributor 3 (Supply: 250 kg)</li>
                                            <li><strong>Destinations:</strong> Restaurant A (Demand: 180 kg), Restaurant B (Demand: 220 kg), Restaurant C (Demand: 200 kg), Restaurant D (Demand: 150 kg)</li>
                                            <li><strong>Objective:</strong> Minimize daily delivery costs</li>
                                        </ul>
                                    </div>
                                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                                        <p className="font-medium">💡 Application:</p>
                                        <p className="text-gray-700 dark:text-gray-300">Abhronila optimizes daily deliveries, ensuring fresh ingredients arrive on time while minimizing delivery costs.</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/30 dark:to-cyan-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                                    <h4 className="font-semibold text-teal-700 dark:text-teal-300">Example 4: Educational Supplies Distribution</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                        <strong>Scenario:</strong> A school district in Ichapur distributes textbooks from publishers to schools.
                                    </p>
                                    <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                                        <p className="font-medium">Problem Setup:</p>
                                        <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                                            <li><strong>Sources:</strong> Publisher 1 (Supply: 1000 books), Publisher 2 (Supply: 1200 books)</li>
                                            <li><strong>Destinations:</strong> School 1 (Demand: 500 books), School 2 (Demand: 450 books), School 3 (Demand: 600 books), School 4 (Demand: 650 books)</li>
                                            <li><strong>Cost:</strong> Different shipping costs to each school</li>
                                        </ul>
                                    </div>
                                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                                        <p className="font-medium">💡 Application:</p>
                                        <p className="text-gray-700 dark:text-gray-300">Debangshu uses this model to ensure all schools receive their textbooks on time while minimizing distribution costs.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ==================== EXAMPLES SECTION ==================== */}
                    <section className="mt-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <span className="text-xl">💡</span>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                                    Worked Examples
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Learn through step-by-step examples
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">

                            {/* Example 1 */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">

                                <div className="bg-blue-50 dark:bg-blue-900/20 px-5 py-4 border-b border-blue-100 dark:border-blue-900/30">
                                    <h3 className="font-bold text-lg text-blue-800 dark:text-blue-300">
                                        Example 1: Balanced Transportation Problem
                                    </h3>
                                </div>

                                <div className="p-5">
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        A company has two factories and three warehouses. The transportation
                                        costs, available supply and warehouse demand are given below.
                                    </p>

                                    <div className="overflow-x-auto mb-5">
                                        <table className="w-full text-sm border-collapse">
                                            <thead>
                                                <tr className="bg-gray-100 dark:bg-gray-700">
                                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                                                        Factory
                                                    </th>
                                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                                                        W1
                                                    </th>
                                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                                                        W2
                                                    </th>
                                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                                                        W3
                                                    </th>
                                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                                                        Supply
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">
                                                        F1
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                                                        4
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                                                        6
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                                                        8
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold">
                                                        50
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">
                                                        F2
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                                                        5
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                                                        3
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                                                        7
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold">
                                                        70
                                                    </td>
                                                </tr>

                                                <tr className="bg-gray-50 dark:bg-gray-700/50">
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">
                                                        Demand
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold">
                                                        30
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold">
                                                        40
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold">
                                                        50
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold">
                                                        120
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                                        <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                                            Solution
                                        </h4>

                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Total Supply = 50 + 70 = <strong>120</strong>
                                        </p>

                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Total Demand = 30 + 40 + 50 = <strong>120</strong>
                                        </p>

                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                            Since total supply equals total demand, this is a
                                            <strong> balanced transportation problem</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>


                            {/* Example 2 */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">

                                <div className="bg-purple-50 dark:bg-purple-900/20 px-5 py-4 border-b border-purple-100 dark:border-purple-900/30">
                                    <h3 className="font-bold text-lg text-purple-800 dark:text-purple-300">
                                        Example 2: Unbalanced Transportation Problem
                                    </h3>
                                </div>

                                <div className="p-5">

                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Three factories supply a product to two markets. Determine whether
                                        the transportation problem is balanced or unbalanced.
                                    </p>

                                    <div className="overflow-x-auto mb-5">
                                        <table className="w-full text-sm border-collapse">
                                            <thead>
                                                <tr className="bg-gray-100 dark:bg-gray-700">
                                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                                                        Factory
                                                    </th>
                                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                                                        M1
                                                    </th>
                                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                                                        M2
                                                    </th>
                                                    <th className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                                                        Supply
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">
                                                        F1
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                                                        6
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                                                        4
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold">
                                                        40
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">
                                                        F2
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                                                        5
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                                                        7
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold">
                                                        30
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-medium">
                                                        F3
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                                                        8
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center">
                                                        6
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold">
                                                        50
                                                    </td>
                                                </tr>

                                                <tr className="bg-gray-50 dark:bg-gray-700/50">
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 font-semibold">
                                                        Demand
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold">
                                                        60
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold">
                                                        40
                                                    </td>
                                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-bold">
                                                        100
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                                            Solution
                                        </h4>

                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Total Supply = 40 + 30 + 50 = <strong>120</strong>
                                        </p>

                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Total Demand = 60 + 40 = <strong>100</strong>
                                        </p>

                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                            Since supply exceeds demand by 20 units, the problem is
                                            <strong> unbalanced</strong>.
                                        </p>

                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                                            Therefore, a <strong>dummy destination</strong> with demand of
                                            <strong> 20 units</strong> is added.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                    {/* Visualization Section */}
                    <section
                        ref={(el) => (sectionRefs.current[4] = el)}
                        data-index="4"
                        className={clsx(
                            'transform transition-all duration-700 ease-out delay-400',
                            'motion-safe:translate-y-0 motion-safe:opacity-100',
                            activeSection >= 4 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
                        )}
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Visual Understanding</h2>

                            <div className="flex flex-col items-center justify-center space-y-6">
                                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
                                    {/* Background */}
                                    <rect width="900" height="600" fill="transparent" />

                                    {/* Title */}
                                    <text x="450" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Transportation Problem Structure</text>

                                    {/* Sources Box */}
                                    <rect x="80" y="80" width="200" height="250" rx="15" fill="#14B8A6" fillOpacity="0.15" stroke="#14B8A6" strokeWidth="2">
                                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                                    </rect>
                                    <text x="180" y="115" textAnchor="middle" className="text-lg font-bold fill-teal-600 dark:fill-teal-400">Sources</text>
                                    <text x="180" y="145" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">S₁ (Supply: 100)</text>
                                    <text x="180" y="175" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">S₂ (Supply: 150)</text>
                                    <text x="180" y="205" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">S₃ (Supply: 120)</text>
                                    <text x="180" y="235" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">S₄ (Supply: 130)</text>
                                    <text x="180" y="265" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">S₅ (Supply: 140)</text>

                                    {/* Arrow from Sources to Destinations */}
                                    <path d="M 280 180 L 320 180" stroke="#14B8A6" strokeWidth="3" fill="none">
                                        <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2s" fill="freeze" />
                                    </path>
                                    <polygon points="320,175 330,180 320,185" fill="#14B8A6" />
                                    <text x="305" y="165" textAnchor="middle" className="text-xs font-semibold fill-teal-600 dark:fill-teal-400">Shipments</text>

                                    {/* Destinations Box */}
                                    <rect x="620" y="80" width="200" height="250" rx="15" fill="#0EA5E9" fillOpacity="0.15" stroke="#0EA5E9" strokeWidth="2">
                                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="0.5s" />
                                    </rect>
                                    <text x="720" y="115" textAnchor="middle" className="text-lg font-bold fill-cyan-600 dark:fill-cyan-400">Destinations</text>
                                    <text x="720" y="145" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">D₁ (Demand: 80)</text>
                                    <text x="720" y="175" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">D₂ (Demand: 90)</text>
                                    <text x="720" y="205" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">D₃ (Demand: 100)</text>
                                    <text x="720" y="235" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">D₄ (Demand: 120)</text>
                                    <text x="720" y="265" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">D₅ (Demand: 110)</text>

                                    {/* Cost Labels */}
                                    <text x="370" y="140" className="text-xs fill-gray-600 dark:fill-gray-400">c₁₁</text>
                                    <text x="420" y="165" className="text-xs fill-gray-600 dark:fill-gray-400">c₂₃</text>
                                    <text x="380" y="195" className="text-xs fill-gray-600 dark:fill-gray-400">c₃₂</text>
                                    <text x="430" y="220" className="text-xs fill-gray-600 dark:fill-gray-400">c₄₁</text>
                                    <text x="390" y="245" className="text-xs fill-gray-600 dark:fill-gray-400">c₅₃</text>

                                    {/* Objective Box */}
                                    <rect x="80" y="370" width="740" height="100" rx="15" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="2">
                                        <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="1s" />
                                    </rect>
                                    <text x="450" y="405" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">Objective: Minimize Total Transportation Cost</text>

                                    <text x="120" y="435" className="text-sm fill-gray-700 dark:fill-gray-300">Minimize Z = Σᵢ Σⱼ cᵢⱼ × xᵢⱼ</text>
                                    <text x="120" y="455" className="text-sm fill-gray-700 dark:fill-gray-300">Subject to: Σⱼ xᵢⱼ = Sᵢ (Supply), Σᵢ xᵢⱼ = Dⱼ (Demand), xᵢⱼ ≥ 0</text>

                                    {/* Balance Condition */}
                                    <rect x="80" y="490" width="740" height="80" rx="15" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2">
                                        <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                                    </rect>
                                    <text x="450" y="525" textAnchor="middle" className="text-base font-bold fill-green-600 dark:fill-green-400">Balanced Problem Condition</text>
                                    <text x="450" y="550" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">Total Supply = Total Demand = Σᵢ Sᵢ = Σⱼ Dⱼ</text>
                                </svg>

                                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                                    <p className="leading-relaxed">This diagram illustrates the structure of a transportation problem with sources, destinations, and the objective to minimize total cost while satisfying supply and demand constraints.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Tips Section */}
                    <section
                        ref={(el) => (sectionRefs.current[5] = el)}
                        data-index="5"
                        className={clsx(
                            'transform transition-all duration-700 ease-out delay-500',
                            'motion-safe:translate-y-0 motion-safe:opacity-100',
                            activeSection >= 5 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
                        )}
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Tips & Tricks</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-all duration-300">
                                    <h4 className="font-semibold text-teal-700 dark:text-teal-300">🎯 Quick Problem Identification</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                        Look for keywords like "transportation," "shipping," "distribution," "supply," and "demand" to identify transportation problems.
                                    </p>
                                </div>

                                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-all duration-300">
                                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">💡 Balance Check First</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                        Always check if total supply equals total demand. If not, you have an unbalanced problem that needs dummy sources or destinations.
                                    </p>
                                </div>

                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">🔧 Cost Matrix Organization</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                        Organize transportation costs in a matrix with sources as rows and destinations as columns. This makes the problem easier to visualize and solve.
                                    </p>
                                </div>

                                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                                    <h4 className="font-semibold text-green-700 dark:text-green-300">⚡ Start with Cheapest Routes</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                        When finding an initial solution, start with the cheapest shipping routes to get a good starting point before optimizing.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                                    <strong>🚀 Professional Insight:</strong> In industry, transportation problems are often solved using specialized software that can handle thousands of sources and destinations. Understanding the fundamentals helps you interpret results and make better decisions.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Common Mistakes Section */}
                    <section
                        ref={(el) => (sectionRefs.current[6] = el)}
                        data-index="6"
                        className={clsx(
                            'transform transition-all duration-700 ease-out delay-600',
                            'motion-safe:translate-y-0 motion-safe:opacity-100',
                            activeSection >= 6 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
                        )}
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Common Mistakes</h2>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <span className="text-red-500 text-xl">❌</span>
                                    <div>
                                        <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Balance Condition</h4>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Forgetting to check if total supply equals total demand. This is the most common mistake that leads to incorrect solutions.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <span className="text-red-500 text-xl">❌</span>
                                    <div>
                                        <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect Cost Matrix</h4>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Using wrong cost values or swapping rows and columns. Always double-check the cost matrix alignment.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <span className="text-red-500 text-xl">❌</span>
                                    <div>
                                        <h4 className="font-semibold text-red-700 dark:text-red-300">Wrong Variable Interpretation</h4>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Misunderstanding that xᵢⱼ represents quantity shipped from source i to destination j, not total shipments.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                    <span className="text-red-500 text-xl">❌</span>
                                    <div>
                                        <h4 className="font-semibold text-red-700 dark:text-red-300">Forgetting Non-negativity</h4>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Shipment quantities must be non-negative. Negative shipments don't make sense in real-world applications.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                                <p className="font-medium text-red-800 dark:text-red-300">
                                    <strong>⚠️ Watch Out:</strong> Many students assume transportation problems are always balanced. Always verify the balance condition before solving. If unbalanced, you need to add dummy sources or destinations.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Best Practices Section */}
                    <section
                        ref={(el) => (sectionRefs.current[7] = el)}
                        data-index="7"
                        className={clsx(
                            'transform transition-all duration-700 ease-out delay-700',
                            'motion-safe:translate-y-0 motion-safe:opacity-100',
                            activeSection >= 7 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
                        )}
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Best Practices</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                                    <h4 className="font-semibold text-teal-700 dark:text-teal-300">📝 Systematic Problem Setup</h4>
                                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                        <li>Identify all sources and their supplies</li>
                                        <li>Identify all destinations and their demands</li>
                                        <li>Create the cost matrix carefully</li>
                                        <li>Check the balance condition</li>
                                    </ul>
                                </div>

                                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                                    <h4 className="font-semibold text-teal-700 dark:text-teal-300">🔍 Verification Steps</h4>
                                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                        <li>Verify all supplies are satisfied</li>
                                        <li>Verify all demands are met</li>
                                        <li>Check total cost calculation</li>
                                        <li>Validate solution feasibility</li>
                                    </ul>
                                </div>

                                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                                    <h4 className="font-semibold text-teal-700 dark:text-teal-300">📚 Documentation</h4>
                                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                        <li>Document the cost matrix clearly</li>
                                        <li>Show the optimal shipping plan</li>
                                        <li>Calculate total cost</li>
                                        <li>Note any constraints or assumptions</li>
                                    </ul>
                                </div>

                                <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                                    <h4 className="font-semibold text-teal-700 dark:text-teal-300">🎯 Real-World Application</h4>
                                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                        <li>Consider real cost factors (distance, fuel, labor)</li>
                                        <li>Account for capacity constraints</li>
                                        <li>Consider time constraints if applicable</li>
                                        <li>Think about practical implementation</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                                <p className="font-medium text-blue-800 dark:text-blue-300">
                                    <strong>📌 Professional Standard:</strong> In industry, transportation problems are solved using specialized algorithms and software. However, understanding the fundamentals helps you make better decisions and interpret results effectively.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Mini Checklist Section */}
                    <section
                        ref={(el) => (sectionRefs.current[8] = el)}
                        data-index="8"
                        className={clsx(
                            'transform transition-all duration-700 ease-out delay-800',
                            'motion-safe:translate-y-0 motion-safe:opacity-100',
                            activeSection >= 8 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
                        )}
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Mini Checklist</h2>

                            <div className="space-y-3">
                                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-green-500 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-medium">Problem Identification</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">I can identify transportation problems in real-world scenarios</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-green-500 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-medium">Components Understanding</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">I understand the key components: sources, destinations, costs, and decision variables</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-green-500 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-medium">Balance Condition</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">I can check if a transportation problem is balanced</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-green-500 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-medium">Mathematical Formulation</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">I can formulate transportation problems mathematically</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-green-500 text-xl">✅</span>
                                    <div>
                                        <h4 className="font-medium">Real-World Application</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">I can apply transportation problem concepts to real-world logistics scenarios</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Teacher's Note */}
                    <div className="mt-8">
                        <Teacher note={
                            "Transportation problems are the gateway to understanding network optimization. When I teach this to my students in Kolkata, I emphasize that these problems are everywhere—from daily delivery routes to global supply chains. Abhronila from Jadavpur discovered that mastering transportation problems helped her understand more complex logistics challenges. Remember: The key is to think in terms of sources, destinations, and the costs of moving between them. Once you understand this, you can solve any transportation problem."
                        } />
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-12">
                    <FAQTemplate
                        title="Introduction to Transportation Problems FAQs"
                        questions={questions}
                    />
                </div>

                {/* Printable Notes Section */}
                <div className="mt-12">
                    <PlainTextPrint
                        content={noteText}
                        title="Introduction to Transportation Problems"
                        stampEnabled={true}
                        showDownload={true}
                        downloadButtonText="Download Notes"
                        downloadFileName="topic0_note.txt"
                    />
                </div>
            </div>
        </div>
    );
};

export default Topic0;