// Topic6.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic6_files/topic6_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic6_files/topic6_note.txt?raw';

const Topic6 = () => {
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
    { id: 'introduction', title: 'Introduction to Unbalanced Transportation Problems' },
    { id: 'definition', title: 'Definition and Characteristics' },
    { id: 'types', title: 'Types of Unbalanced Problems' },
    { id: 'handling', title: 'Handling Unbalanced Problems' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/30 rounded-full">
            Topic 6
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-rose-600 to-pink-600 dark:from-rose-400 dark:to-pink-400 bg-clip-text text-transparent">
            Unbalanced Transportation Problem
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding unbalanced transportation problems where total supply does not equal total demand
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Introduction to Unbalanced Transportation Problems</h2>
              
              <div className="prose prose-rose dark:prose-invert max-w-none leading-relaxed">
                <p>
                  An unbalanced transportation problem occurs when the total supply available from all sources does not equal the total demand required at all destinations. This is a common real-world scenario that requires special handling to make the problem solvable using standard transportation algorithms.
                </p>

                <div className="my-6 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg border-l-4 border-rose-500">
                  <p className="font-medium text-rose-800 dark:text-rose-300">
                    💡 Key Insight: Unbalanced problems are more common in real-world logistics than balanced ones. Understanding how to handle them is essential for practical transportation planning.
                  </p>
                </div>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Balanced</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>ΣSᵢ = ΣDⱼ</li>
                      <li>No dummy needed</li>
                      <li>Directly solvable</li>
                      <li>Ideal scenario</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                    <h4 className="font-semibold text-rose-700 dark:text-rose-300">Unbalanced</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>ΣSᵢ ≠ ΣDⱼ</li>
                      <li>Dummy needed</li>
                      <li>Requires modification</li>
                      <li>Common in practice</li>
                    </ul>
                  </div>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Mamata in Kolkata manages her distribution network, she often faces situations where warehouse supply doesn't perfectly match store demand. This is an unbalanced problem that needs proper handling.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Definition Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Definition and Characteristics</h2>
              
              <div className="prose prose-rose dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Formal Definition</h3>
                <p>
                  A transportation problem is called unbalanced if the sum of supplies across all sources does not equal the sum of demands across all destinations.
                </p>

                <div className="my-4 p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    Σᵢ Sᵢ ≠ Σⱼ Dⱼ (Unbalanced Condition)
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Key Characteristics</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Inequality:</strong> Total supply is either greater or less than total demand</li>
                  <li><strong>Surplus or Deficit:</strong> Either excess supply or unmet demand exists</li>
                  <li><strong>Dummy Required:</strong> Needs dummy sources or destinations to balance</li>
                  <li><strong>Modified Solution:</strong> Requires special handling before solving</li>
                  <li><strong>Realistic:</strong> More common in real-world scenarios</li>
                  <li><strong>Extra Step:</strong> Additional step needed to convert to balanced form</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Why Unbalanced Problems Occur</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Production Variations:</strong> Supply may not match demand exactly</li>
                  <li><strong>Demand Fluctuations:</strong> Customer demand changes unexpectedly</li>
                  <li><strong>Seasonal Factors:</strong> Peak seasons create imbalances</li>
                  <li><strong>Supply Chain Disruptions:</strong> Delays or shortages cause imbalances</li>
                  <li><strong>Planning Errors:</strong> Forecasting inaccuracies</li>
                  <li><strong>Business Decisions:</strong> Strategic stock building or demand management</li>
                </ul>

                <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Observe Carefully:</strong> In practice, perfectly balanced problems are rare. Most real-world transportation problems are unbalanced, making this topic crucial for practical applications.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Types Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Types of Unbalanced Problems</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-rose-700 dark:text-rose-300">1. Surplus Supply</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                      <li>ΣSᵢ &gt; ΣDⱼ</li>
                      <li>More supply than demand</li>
                      <li>Need dummy destination</li>
                      <li>Unused supply exists</li>
                      <li>Example: Overproduction</li>
                    </ul>
                    <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                      Supply = 500, Demand = 400<br/>
                      Surplus = 100 units
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                    <h4 className="font-semibold text-rose-700 dark:text-rose-300">2. Excess Demand</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1 mt-2">
                      <li>ΣDⱼ &gt; ΣSᵢ</li>
                      <li>More demand than supply</li>
                      <li>Need dummy source</li>
                      <li>Unmet demand exists</li>
                      <li>Example: High demand</li>
                    </ul>
                    <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                      Supply = 400, Demand = 500<br/>
                      Deficit = 100 units
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Try Changing This:</strong> What happens if you have both surplus supply and excess demand in different regions? This is a more complex unbalanced problem that may require both dummy sources and destinations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Handling Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Handling Unbalanced Problems</h2>
              
              <div className="prose prose-rose dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">General Approach</h3>
                <p>
                  The key to handling unbalanced problems is to convert them into balanced problems by adding dummy sources or destinations with zero costs. This allows the use of standard transportation algorithms.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Case 1: Surplus Supply (ΣSᵢ &gt; ΣDⱼ)</h3>
                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Calculate surplus: Surplus = ΣSᵢ - ΣDⱼ</li>
                    <li>Add a dummy destination with demand equal to the surplus</li>
                    <li>Set transportation costs from all sources to dummy destination as zero</li>
                    <li>This creates a balanced problem that can be solved directly</li>
                    <li>The dummy destination represents unused supply</li>
                  </ol>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Case 2: Excess Demand (ΣDⱼ &gt; ΣSᵢ)</h3>
                <div className="my-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Calculate deficit: Deficit = ΣDⱼ - ΣSᵢ</li>
                    <li>Add a dummy source with supply equal to the deficit</li>
                    <li>Set transportation costs from dummy source to all destinations as zero</li>
                    <li>This creates a balanced problem that can be solved directly</li>
                    <li>The dummy source represents unmet demand</li>
                  </ol>
                </div>

                <div className="my-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                  <p className="font-medium text-green-800 dark:text-green-300">
                    💡 <strong>Key Insight:</strong> Adding dummy sources or destinations with zero costs preserves the objective function while balancing the problem. The dummy values don't affect the actual shipping costs.
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Example 1: Manufacturing - Surplus Supply</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A company in Kolkata has overproduced and has more inventory than customer orders.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Supply</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Factory A: 1000 units</li>
                        <li>Factory B: 800 units</li>
                        <li>Factory C: 1200 units</li>
                        <li><strong>Total: 3000 units</strong></li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-orange-600 dark:text-orange-400">Demand</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Customer 1: 500 units</li>
                        <li>Customer 2: 600 units</li>
                        <li>Customer 3: 700 units</li>
                        <li>Customer 4: 400 units</li>
                        <li><strong>Total: 2200 units</strong></li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-rose-50 dark:bg-rose-900/20 rounded text-sm">
                    <p className="font-medium text-rose-700 dark:text-rose-300">⚠️ Unbalanced: Surplus Supply</p>
                    <p className="text-gray-700 dark:text-gray-300">Supply (3000) &gt; Demand (2200) → Surplus of 800 units. Add dummy destination with demand 800 and zero costs.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Example 2: Retail - Excess Demand</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A retail chain in Barrackpore faces higher customer demand than available stock.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Supply</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Warehouse 1: 400 units</li>
                        <li>Warehouse 2: 300 units</li>
                        <li><strong>Total: 700 units</strong></li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-orange-600 dark:text-orange-400">Demand</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Store 1: 200 units</li>
                        <li>Store 2: 250 units</li>
                        <li>Store 3: 300 units</li>
                        <li>Store 4: 150 units</li>
                        <li><strong>Total: 900 units</strong></li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-rose-50 dark:bg-rose-900/20 rounded text-sm">
                    <p className="font-medium text-rose-700 dark:text-rose-300">⚠️ Unbalanced: Excess Demand</p>
                    <p className="text-gray-700 dark:text-gray-300">Supply (700) {`<`} {`Demand (900)`} → Deficit of 200 units. Add dummy source with supply 200 and zero costs.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Example 3: Healthcare - Supply Chain Disruption</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A healthcare network in Jadavpur faces supply shortages due to supplier issues.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Supply</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Warehouse A: 300 units</li>
                        <li>Warehouse B: 200 units</li>
                        <li>Warehouse C: 150 units</li>
                        <li><strong>Total: 650 units</strong></li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-orange-600 dark:text-orange-400">Demand</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>4 hospitals with demands totaling 800 units</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-rose-50 dark:bg-rose-900/20 rounded text-sm">
                    <p className="font-medium text-rose-700 dark:text-rose-300">⚠️ Unbalanced: Excess Demand</p>
                    <p className="text-gray-700 dark:text-gray-300">{`Supply (650) < Demand (800)`} → Deficit of 150 units. Dummy source needed to represent unmet demand.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">Example 4: Educational Supplies - Seasonal Imbalance</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A school district in Ichapur has surplus supplies after peak season.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Supply</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>DC 1: 500 books</li>
                        <li>DC 2: 400 books</li>
                        <li>DC 3: 600 books</li>
                        <li><strong>Total: 1500 books</strong></li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-orange-600 dark:text-orange-400">Demand</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>6 schools with demands totaling 1000 books</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-rose-50 dark:bg-rose-900/20 rounded text-sm">
                    <p className="font-medium text-rose-700 dark:text-rose-300">⚠️ Unbalanced: Surplus Supply</p>
                    <p className="text-gray-700 dark:text-gray-300">Supply (1500) &gt; Demand (1000) → Surplus of 500 books. Add dummy destination for unused supplies.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 800" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="800" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Unbalanced Transportation Problem</text>
                  
                  {/* Surplus Supply Case */}
                  <rect x="50" y="70" width="850" height="260" rx="15" fill="#F43F5E" fillOpacity="0.1" stroke="#F43F5E" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="475" y="105" textAnchor="middle" className="text-lg font-bold fill-rose-600 dark:fill-rose-400">Case 1: Surplus Supply (ΣSᵢ &gt; ΣDⱼ)</text>
                  
                  <rect x="80" y="125" width="250" height="80" rx="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5" />
                  <text x="205" y="155" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Total Supply</text>
                  <text x="205" y="180" textAnchor="middle" className="text-base font-mono fill-gray-700 dark:fill-gray-300">ΣSᵢ = 500</text>
                  
                  <rect x="350" y="125" width="250" height="80" rx="10" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="1.5" />
                  <text x="475" y="155" textAnchor="middle" className="text-sm font-bold fill-orange-600 dark:fill-orange-400">Total Demand</text>
                  <text x="475" y="180" textAnchor="middle" className="text-base font-mono fill-gray-700 dark:fill-gray-300">ΣDⱼ = 400</text>
                  
                  <path d="M 450 165 L 480 165" stroke="#F43F5E" strokeWidth="3" />
                  <text x="465" y="155" textAnchor="middle" className="text-xs font-bold fill-rose-600 dark:fill-rose-400">&gt;</text>
                  
                  <rect x="80" y="230" width="790" height="80" rx="10" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="1.5" />
                  <text x="475" y="260" textAnchor="middle" className="text-sm font-bold fill-amber-600 dark:fill-amber-400">Solution: Add Dummy Destination</text>
                  <text x="475" y="285" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">Add dummy destination with demand = ΣSᵢ - ΣDⱼ = 100, zero costs</text>
                  <text x="475" y="305" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Dummy destination represents unused supply</text>
                  
                  {/* Excess Demand Case */}
                  <rect x="50" y="360" width="850" height="260" rx="15" fill="#F43F5E" fillOpacity="0.1" stroke="#F43F5E" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="395" textAnchor="middle" className="text-lg font-bold fill-rose-600 dark:fill-rose-400">Case 2: Excess Demand (ΣDⱼ &gt; ΣSᵢ)</text>
                  
                  <rect x="80" y="415" width="250" height="80" rx="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5" />
                  <text x="205" y="445" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Total Supply</text>
                  <text x="205" y="470" textAnchor="middle" className="text-base font-mono fill-gray-700 dark:fill-gray-300">ΣSᵢ = 400</text>
                  
                  <rect x="350" y="415" width="250" height="80" rx="10" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="1.5" />
                  <text x="475" y="445" textAnchor="middle" className="text-sm font-bold fill-orange-600 dark:fill-orange-400">Total Demand</text>
                  <text x="475" y="470" textAnchor="middle" className="text-base font-mono fill-gray-700 dark:fill-gray-300">ΣDⱼ = 500</text>
                  
                  <path d="M 450 455 L 480 455" stroke="#F43F5E" strokeWidth="3" />
                  <text x="465" y="445" textAnchor="middle" className="text-xs font-bold fill-rose-600 dark:fill-rose-400">{`<`}</text>
                  
                  <rect x="80" y="520" width="790" height="80" rx="10" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="1.5" />
                  <text x="475" y="550" textAnchor="middle" className="text-sm font-bold fill-amber-600 dark:fill-amber-400">Solution: Add Dummy Source</text>
                  <text x="475" y="575" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">Add dummy source with supply = ΣDⱼ - ΣSᵢ = 100, zero costs</text>
                  <text x="475" y="595" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Dummy source represents unmet demand</text>
                  
                  {/* Summary Box */}
                  <rect x="50" y="650" width="850" height="130" rx="15" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="475" y="685" textAnchor="middle" className="text-base font-bold fill-purple-600 dark:fill-purple-400">Key Takeaways</text>
                  
                  <circle cx="100" cy="715" r="8" fill="#10B981" />
                  <text x="120" y="720" className="text-sm fill-gray-700 dark:fill-gray-300">Surplus Supply → Add dummy destination with zero costs</text>
                  
                  <circle cx="100" cy="745" r="8" fill="#F97316" />
                  <text x="120" y="750" className="text-sm fill-gray-700 dark:fill-gray-300">Excess Demand → Add dummy source with zero costs</text>
                  
                  <circle cx="520" cy="715" r="8" fill="#F43F5E" />
                  <text x="540" y="720" className="text-sm fill-gray-700 dark:fill-gray-300">Dummy values don't affect actual costs</text>
                  
                  <circle cx="520" cy="745" r="8" fill="#8B5CF6" />
                  <text x="540" y="750" className="text-sm fill-gray-700 dark:fill-gray-300">Convert unbalanced to balanced before solving</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram illustrates the two types of unbalanced problems and how to handle each case by adding dummy sources or destinations.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">🎯 Quick Identification</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always calculate ΣSᵢ and ΣDⱼ first. If they're not equal, you have an unbalanced problem that needs dummy handling.
                  </p>
                </div>
                
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-pink-700 dark:text-pink-300">💡 Dummy Direction</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Remember: Supply &gt; Demand → Add dummy destination. Demand &gt; Supply → Add dummy source. The dummy goes where there's a shortage.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">🔧 Zero Costs</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always set dummy transportation costs to zero. This ensures the dummy doesn't affect the actual cost calculation.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">⚡ Practical Note</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    In real-world logistics, unbalanced problems are more common. Always plan for imbalances by building flexibility into your supply chain.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> In practice, smart companies build flexibility into their supply chains to handle imbalances. Susmita from Barrackpore maintains relationships with multiple suppliers to handle excess demand scenarios, and has contingency plans for surplus supply situations.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Wrong Dummy Direction</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Adding dummy source when you need a dummy destination (or vice versa). Remember: Surplus supply → dummy destination, excess demand → dummy source.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Non-Zero Dummy Costs</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Setting dummy costs to non-zero values. Dummy costs should always be zero to accurately represent unused supply or unmet demand.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring the Imbalance</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Trying to solve an unbalanced problem directly without adding dummies. This leads to infeasible or incorrect solutions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Forgetting Dummy Interpretation</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not understanding what the dummy represents. Dummy destination = unused supply, dummy source = unmet demand.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> Many students think unbalanced problems are errors. They're not—they're realistic scenarios that require proper handling. Always check for balance first, then handle appropriately.
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">📝 Identify Imbalance</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Always calculate ΣSᵢ and ΣDⱼ first</li>
                    <li>Determine if surplus or deficit exists</li>
                    <li>Calculate the exact difference</li>
                    <li>Document the imbalance</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">🔧 Add Dummies Correctly</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Supply &gt; Demand → Add dummy destination</li>
                    <li>Demand &gt; Supply → Add dummy source</li>
                    <li>Set dummy costs to zero</li>
                    <li>Verify the problem is now balanced</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">📚 Document Everything</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Document the imbalance amount</li>
                    <li>Explain what dummies represent</li>
                    <li>Note any assumptions</li>
                    <li>Keep records for future reference</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-300">🎯 Plan for Balance</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use forecasting to predict demand</li>
                    <li>Maintain flexible supply sources</li>
                    <li>Build in safety stock</li>
                    <li>Regularly review and adjust</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, unbalanced problems are the norm, not the exception. Best practice involves maintaining contingency plans for both surplus and deficit scenarios, and using forecasting to minimize imbalances proactively.
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
              <h2 className="text-2xl font-bold mb-4 text-rose-600 dark:text-rose-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Imbalance Identification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can identify when a transportation problem is unbalanced</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Type Determination</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can determine if it's surplus supply or excess demand</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Dummy Handling</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know how to add dummy sources or destinations correctly</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Zero Costs</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand that dummy costs should be set to zero</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Real-World Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can handle unbalanced problems in real-world scenarios</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "Unbalanced transportation problems are the reality of logistics. When I teach this to my students in Kolkata, I emphasize that almost every real-world problem is unbalanced. Abhronila from Jadavpur discovered that her distribution network was always unbalanced—she had to learn to handle both surplus and deficit situations effectively. Susmita from Barrackpore found that understanding how to add dummies correctly saved her company from making costly shipping errors. Remember: Unbalanced isn't wrong—it's just different. Learn to handle it, and you'll be prepared for real logistics challenges."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Unbalanced Transportation Problem FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Unbalanced Transportation Problem"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Notes"
            downloadFileName="topic6_note.txt"
          />
        </div>
      </div>
    </div>
  );
};

export default Topic6;