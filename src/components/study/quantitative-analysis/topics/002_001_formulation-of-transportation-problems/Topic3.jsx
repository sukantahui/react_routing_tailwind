// Topic3.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic3_files/topic3_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic3_files/topic3_note.txt?raw';

const Topic3 = () => {
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
    { id: 'introduction', title: 'Introduction to Supply and Demand' },
    { id: 'supply', title: 'Understanding Supply' },
    { id: 'demand', title: 'Understanding Demand' },
    { id: 'balance', title: 'Supply-Demand Balance' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/30 rounded-full">
            Topic 3
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Supply and Demand
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding the fundamental concepts of supply, demand, and their balance in transportation problems
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Introduction to Supply and Demand</h2>
              
              <div className="prose prose-blue dark:prose-invert max-w-none leading-relaxed">
                <p>
                  Supply and demand are the fundamental forces that drive transportation problems. Supply represents the availability of goods at sources, while demand represents the need for goods at destinations. Understanding these concepts is essential for solving transportation problems effectively.
                </p>

                <div className="my-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                  <p className="font-medium text-blue-800 dark:text-blue-300">
                    💡 Key Insight: The balance between supply and demand determines the feasibility of a transportation problem. When supply equals demand, the problem is balanced and can be solved directly.
                  </p>
                </div>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Supply</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Quantity of goods available at sources</li>
                      <li>Limited by production or storage capacity</li>
                      <li>Represented by Sᵢ for each source</li>
                      <li>Total supply = Σᵢ Sᵢ</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300">Demand</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Quantity of goods needed at destinations</li>
                      <li>Determined by consumption or requirements</li>
                      <li>Represented by Dⱼ for each destination</li>
                      <li>Total demand = Σⱼ Dⱼ</li>
                    </ul>
                  </div>
                </div>

                <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-800 dark:text-purple-300">
                    🎯 Think About: When Mamata in Kolkata manages her distribution network, she needs to know exactly how much supply she has at each warehouse and how much demand exists at each store. This is the foundation of her transportation planning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Supply Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Understanding Supply</h2>
              
              <div className="prose prose-blue dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Definition and Importance</h3>
                <p>
                  Supply refers to the quantity of goods available at each source in a transportation problem. It represents the maximum amount that can be shipped from a particular source, and is typically constrained by production capacity, storage capacity, or availability.
                </p>

                <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">Key Characteristics of Supply</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li><strong>Limited Quantity:</strong> Each source has a finite supply (Sᵢ)</li>
                    <li><strong>Source-Specific:</strong> Different sources have different supply capacities</li>
                    <li><strong>Deterministic:</strong> Supply is typically known and fixed in basic problems</li>
                    <li><strong>Allocation:</strong> Supply must be distributed among destinations</li>
                    <li><strong>Constraints:</strong> Supply cannot exceed capacity at any source</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Sources of Supply</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Production:</strong> Goods manufactured at factories</li>
                  <li><strong>Storage:</strong> Goods held in warehouses</li>
                  <li><strong>Collection:</strong> Goods gathered from multiple points</li>
                  <li><strong>Import:</strong> Goods brought from external sources</li>
                  <li><strong>Inventory:</strong> Goods held as stock</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Mathematical Representation</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-mono text-sm">
                    S = [S₁, S₂, ..., Sₘ]ᵀ<br/>
                    where Sᵢ is the supply at source i<br/>
                    Total Supply = Σᵢ Sᵢ
                  </p>
                </div>

                <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Observe Carefully:</strong> Supply values must be non-negative. Negative supply doesn't make sense in real-world transportation problems.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Demand Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Understanding Demand</h2>
              
              <div className="prose prose-blue dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Definition and Importance</h3>
                <p>
                  Demand refers to the quantity of goods required at each destination in a transportation problem. It represents the exact amount that must be received at each destination, and is typically determined by consumption requirements, orders, or needs.
                </p>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-300">Key Characteristics of Demand</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li><strong>Specific Quantity:</strong> Each destination has a fixed demand (Dⱼ)</li>
                    <li><strong>Destination-Specific:</strong> Different destinations have different demand requirements</li>
                    <li><strong>Must be Met:</strong> Demand must be fully satisfied in balanced problems</li>
                    <li><strong>Incoming Flow:</strong> Destinations receive from multiple sources</li>
                    <li><strong>Non-Negative:</strong> Demand values are always positive</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Types of Demand</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Consumer Demand:</strong> Direct consumption by end users</li>
                  <li><strong>Retail Demand:</strong> Needs of retail stores</li>
                  <li><strong>Production Demand:</strong> Raw materials for manufacturing</li>
                  <li><strong>Emergency Demand:</strong> Urgent needs in crisis situations</li>
                  <li><strong>Seasonal Demand:</strong> Varies with seasons</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Mathematical Representation</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-mono text-sm">
                    D = [D₁, D₂, ..., Dₙ]ᵀ<br/>
                    where Dⱼ is the demand at destination j<br/>
                    Total Demand = Σⱼ Dⱼ
                  </p>
                </div>

                <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <p className="font-medium text-red-800 dark:text-red-300">
                    💡 <strong>Observe Carefully:</strong> In transportation problems, demand must be satisfied exactly. If a destination receives less than its demand, the problem is infeasible (unbalanced with deficit).
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Supply-Demand Balance Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Supply-Demand Balance</h2>
              
              <div className="prose prose-blue dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">The Balance Condition</h3>
                <p>
                  The balance condition is the fundamental requirement that total supply must equal total demand for a transportation problem to be feasible and solvable using standard methods.
                </p>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    Σᵢ Sᵢ = Σⱼ Dⱼ (Balance Condition)
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Why Balance Matters</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Feasibility:</strong> Ensures a solution exists</li>
                  <li><strong>No Surplus:</strong> All supply is used, all demand is met</li>
                  <li><strong>Efficiency:</strong> Prevents waste or unmet needs</li>
                  <li><strong>Standard Methods:</strong> Allows use of standard algorithms</li>
                  <li><strong>Economic Sense:</strong> Matches supply with demand</li>
                </ul>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Balanced Case</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>ΣSᵢ = ΣDⱼ</li>
                      <li>All supply used</li>
                      <li>All demand met</li>
                      <li>Solvable directly</li>
                      <li>Efficient solution</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Unbalanced Case</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>ΣSᵢ ≠ ΣDⱼ</li>
                      <li>Surplus or deficit</li>
                      <li>Needs dummy adjustment</li>
                      <li>Requires modification</li>
                      <li>More complex solution</li>
                    </ul>
                  </div>
                </div>

                <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-800 dark:text-purple-300">
                    💡 <strong>Try Changing This:</strong> What happens if you increase supply at one source? How does the balance change? How would you handle the surplus?
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Examples Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Example 1: Manufacturing Supply and Demand</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A company in Kolkata has three factories and five distribution centers.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Supply</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Factory 1: 1000 units/month</li>
                        <li>Factory 2: 800 units/month</li>
                        <li>Factory 3: 1200 units/month</li>
                        <li>Total Supply: 3000 units</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-orange-600 dark:text-orange-400">Demand</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Center 1: 400 units</li>
                        <li>Center 2: 500 units</li>
                        <li>Center 3: 600 units</li>
                        <li>Center 4: 700 units</li>
                        <li>Center 5: 800 units</li>
                        <li>Total Demand: 3000 units</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded text-sm">
                    <p className="font-medium">✅ Balanced Problem:</p>
                    <p className="text-gray-700 dark:text-gray-300">Supply (3000) = Demand (3000) → Balanced problem ready for solution.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Example 2: Agricultural Supply and Demand</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A cooperative in Barrackpore manages produce distribution.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Supply</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Farm A: 150 tons</li>
                        <li>Farm B: 200 tons</li>
                        <li>Farm C: 180 tons</li>
                        <li>Total Supply: 530 tons</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-orange-600 dark:text-orange-400">Demand</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Market 1: 100 tons</li>
                        <li>Market 2: 120 tons</li>
                        <li>Market 3: 150 tons</li>
                        <li>Market 4: 100 tons</li>
                        <li>Market 5: 160 tons</li>
                        <li>Total Demand: 630 tons</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">⚠️ Unbalanced Problem:</p>
                    <p className="text-gray-700 dark:text-gray-300">Supply (530) ≠ Demand (630) → Deficit of 100 tons. Need dummy source.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Example 3: Healthcare Supply and Demand</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A healthcare network in Jadavpur manages medical supplies.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Supply</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Warehouse A: 500 units</li>
                        <li>Warehouse B: 700 units</li>
                        <li>Total Supply: 1200 units</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-orange-600 dark:text-orange-400">Demand</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>4 hospitals: 200, 250, 300, 350 units</li>
                        <li>Total Demand: 1100 units</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">⚠️ Unbalanced Problem:</p>
                    <p className="text-gray-700 dark:text-gray-300">Supply (1200) &gt; Demand (1100) → Surplus of 100 units. Need dummy destination.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">Example 4: Educational Supplies Distribution</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A school district in Ichapur distributes educational materials.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Supply</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Center 1: 1000 books</li>
                        <li>Center 2: 800 books</li>
                        <li>Center 3: 1200 books</li>
                        <li>Total Supply: 3000 books</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-orange-600 dark:text-orange-400">Demand</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>8 schools with demands totaling 3000 books</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded text-sm">
                    <p className="font-medium">✅ Balanced Problem:</p>
                    <p className="text-gray-700 dark:text-gray-300">Supply (3000) = Demand (3000) → Balanced problem ready for solution.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visualization Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 750" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="750" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Supply and Demand Balance</text>
                  
                  {/* Supply Side */}
                  <rect x="50" y="70" width="400" height="250" rx="15" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="250" y="105" textAnchor="middle" className="text-lg font-bold fill-green-600 dark:fill-green-400">Supply Side</text>
                  
                  <rect x="80" y="120" width="150" height="80" rx="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <text x="155" y="150" textAnchor="middle" className="text-sm font-semibold fill-green-700 dark:fill-green-300">Source S₁</text>
                  <text x="155" y="175" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Supply: 100</text>
                  
                  <rect x="270" y="120" width="150" height="80" rx="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.3s" />
                  </rect>
                  <text x="345" y="150" textAnchor="middle" className="text-sm font-semibold fill-green-700 dark:fill-green-300">Source S₂</text>
                  <text x="345" y="175" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Supply: 150</text>
                  
                  <rect x="175" y="220" width="150" height="80" rx="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.6s" />
                  </rect>
                  <text x="250" y="250" textAnchor="middle" className="text-sm font-semibold fill-green-700 dark:fill-green-300">Source S₃</text>
                  <text x="250" y="275" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Supply: 120</text>
                  
                  <text x="250" y="310" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Total Supply: ΣSᵢ = 370</text>
                  
                  {/* Balance Condition */}
                  <rect x="250" y="340" width="400" height="50" rx="10" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="450" y="370" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">Balance Condition</text>
                  
                  <path d="M 250 390 L 250 410" stroke="#F59E0B" strokeWidth="2" fill="none">
                    <animate attributeName="stroke-dasharray" values="0 20;20 0" dur="2s" repeatCount="indefinite" begin="1s" />
                  </path>
                  
                  {/* Demand Side */}
                  <rect x="500" y="70" width="400" height="250" rx="15" fill="#F97316" fillOpacity="0.1" stroke="#F97316" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="0.5s" />
                  </rect>
                  <text x="700" y="105" textAnchor="middle" className="text-lg font-bold fill-orange-600 dark:fill-orange-400">Demand Side</text>
                  
                  <rect x="530" y="120" width="150" height="80" rx="10" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.2s" />
                  </rect>
                  <text x="605" y="150" textAnchor="middle" className="text-sm font-semibold fill-orange-700 dark:fill-orange-300">Destination D₁</text>
                  <text x="605" y="175" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Demand: 80</text>
                  
                  <rect x="720" y="120" width="150" height="80" rx="10" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  </rect>
                  <text x="795" y="150" textAnchor="middle" className="text-sm font-semibold fill-orange-700 dark:fill-orange-300">Destination D₂</text>
                  <text x="795" y="175" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Demand: 90</text>
                  
                  <rect x="625" y="220" width="150" height="80" rx="10" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.8s" />
                  </rect>
                  <text x="700" y="250" textAnchor="middle" className="text-sm font-semibold fill-orange-700 dark:fill-orange-300">Destination D₃</text>
                  <text x="700" y="275" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Demand: 100</text>
                  
                  <text x="700" y="310" textAnchor="middle" className="text-sm font-bold fill-orange-600 dark:fill-orange-400">Total Demand: ΣDⱼ = 270</text>
                  
                  {/* Balance Result */}
                  <rect x="200" y="430" width="500" height="80" rx="15" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1.5s" />
                  </rect>
                  <text x="450" y="465" textAnchor="middle" className="text-base font-bold fill-purple-600 dark:fill-purple-400">Balance Check</text>
                  <text x="450" y="495" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">ΣSᵢ = 370 vs ΣDⱼ = 270 → Unbalanced! Deficit of 100 units</text>
                  
                  {/* Cases Box */}
                  <rect x="50" y="540" width="850" height="190" rx="15" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="475" y="575" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">Supply-Demand Scenarios</text>
                  
                  <rect x="80" y="595" width="250" height="115" rx="10" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1.5" />
                  <text x="205" y="620" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Balanced</text>
                  <text x="205" y="645" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">ΣSᵢ = ΣDⱼ</text>
                  <text x="205" y="665" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">All supply used</text>
                  <text x="205" y="685" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">All demand met</text>
                  <text x="205" y="705" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Directly solvable</text>
                  
                  <rect x="350" y="595" width="250" height="115" rx="10" fill="#F97316" fillOpacity="0.1" stroke="#F97316" strokeWidth="1.5" />
                  <text x="475" y="620" textAnchor="middle" className="text-sm font-bold fill-orange-600 dark:fill-orange-400">Surplus Supply</text>
                  <text x="475" y="645" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">ΣSᵢ &gt; ΣDⱼ</text>
                  <text x="475" y="665" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Need dummy destination</text>
                  <text x="475" y="685" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Unused supply</text>
                  <text x="475" y="705" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Zero cost dummy</text>
                  
                  <rect x="620" y="595" width="250" height="115" rx="10" fill="#EF4444" fillOpacity="0.1" stroke="#EF4444" strokeWidth="1.5" />
                  <text x="745" y="620" textAnchor="middle" className="text-sm font-bold fill-red-600 dark:fill-red-400">Excess Demand</text>
                  <text x="745" y="645" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">ΣDⱼ &gt; ΣSᵢ</text>
                  <text x="745" y="665" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Need dummy source</text>
                  <text x="745" y="685" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Unmet demand</text>
                  <text x="745" y="705" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Zero cost dummy</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram illustrates the relationship between supply and demand, showing balanced and unbalanced scenarios and how to handle each case.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🎯 Quick Balance Check</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always add up all supply values and all demand values before solving. If they're not equal, you need to handle the imbalance first.
                  </p>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">💡 Surplus Handling</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    If supply exceeds demand, add a dummy destination with zero costs. This represents unused supply that doesn't need to be shipped.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">🔧 Deficit Handling</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    If demand exceeds supply, add a dummy source with zero costs. This represents unmet demand that can't be fulfilled.
                  </p>
                </div>
                
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-pink-700 dark:text-pink-300">⚡ Data Verification</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Verify supply and demand data with stakeholders. Inaccurate data leads to incorrect solutions and poor decisions.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> In practice, supply and demand are rarely static. Seasonality, market conditions, and disruptions constantly change these values. Successful transportation planning requires dynamic monitoring and adjustment of supply and demand data.
                </p>
              </div>
            </div>
          </section>

          {/* Common Mistakes Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Common Mistakes</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Forgetting to Check Balance</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not verifying that total supply equals total demand before solving. This is the most common mistake in transportation problems.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect Data Entry</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Entering wrong supply or demand values. Always double-check data from multiple sources.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Wrong Dummy Treatment</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Adding dummy source when dummy destination is needed, or vice versa. Determine whether supply or demand is greater.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Supply Constraints</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Forgetting that sources have limited capacity. Supply cannot exceed the specified amount at any source.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> Many students assume that supply and demand values are always integers. While this is often true in textbook problems, real-world values may include decimals, fractions, or percentages.
                </p>
              </div>
            </div>
          </section>

          {/* Best Practices Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">📝 Data Collection</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Gather data from reliable sources</li>
                    <li>Cross-verify all values</li>
                    <li>Document data sources</li>
                    <li>Update data regularly</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🔍 Balance Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Always check ΣSᵢ = ΣDⱼ</li>
                    <li>Calculate the difference if not equal</li>
                    <li>Plan dummy handling</li>
                    <li>Document balance status</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">📚 Documentation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Document all supply values</li>
                    <li>Document all demand values</li>
                    <li>Note any assumptions</li>
                    <li>Record data changes</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🎯 Continuous Monitoring</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Monitor supply fluctuations</li>
                    <li>Track demand changes</li>
                    <li>Update model regularly</li>
                    <li>Adapt to changes</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border-l-4 border-indigo-500">
                <p className="font-medium text-indigo-800 dark:text-indigo-300">
                  <strong>📌 Professional Standard:</strong> In industry, supply and demand data is managed through integrated systems like ERP (Enterprise Resource Planning). Regular data validation and reconciliation with stakeholders ensures accuracy and reliability.
                </p>
              </div>
            </div>
          </section>

          {/* Mini Checklist Section */}
          <section
            ref={(el) => (sectionRefs.current[9] = el)}
            data-index="9"
            className={clsx(
              'transform transition-all duration-700 ease-out delay-900',
              'motion-safe:translate-y-0 motion-safe:opacity-100',
              activeSection >= 9 ? 'motion-safe:translate-y-0 motion-safe:opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
            )}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Supply Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand what supply is and its characteristics</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Demand Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand what demand is and its characteristics</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Balance Check</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can check if supply and demand are balanced</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Handling Imbalance</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know how to handle unbalanced supply and demand</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Real-World Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can apply supply and demand concepts to real-world scenarios</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "Supply and demand are the heart of every transportation problem. When I teach this to my students in Kolkata, I emphasize that understanding these concepts is crucial for solving real logistics challenges. Susmita from Barrackpore discovered that by accurately forecasting demand and managing supply, she reduced her inventory costs by 25%. Abhronila in Jadavpur learned that the balance between supply and demand is the key to efficient distribution. Remember: Garbage in, garbage out—accurate supply and demand data leads to optimal transportation solutions."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Supply and Demand FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Supply and Demand"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Notes"
            downloadFileName="topic3_note.txt"
          />
        </div>
      </div>
    </div>
  );
};

export default Topic3;