// Topic5.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic5_files/topic5_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic5_files/topic5_note.txt?raw';

const Topic5 = () => {
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
    { id: 'introduction', title: 'Introduction to Balanced Transportation Problems' },
    { id: 'definition', title: 'Definition and Characteristics' },
    { id: 'condition', title: 'The Balance Condition' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
            Topic 5
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
            Balanced Transportation Problem
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding balanced transportation problems where total supply equals total demand
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Introduction to Balanced Transportation Problems</h2>
              
              <div className="prose prose-emerald dark:prose-invert max-w-none leading-relaxed">
                <p>
                  A balanced transportation problem is one where the total supply available at all sources exactly equals the total demand required at all destinations. This perfect balance is the ideal scenario for transportation problems, allowing for direct solution without any dummy adjustments.
                </p>

                <div className="my-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
                  <p className="font-medium text-emerald-800 dark:text-emerald-300">
                    💡 Key Insight: In a balanced transportation problem, every unit of supply is shipped to some destination, and every unit of demand is met from some source. There is no surplus supply or unmet demand.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">What is a Balanced Transportation Problem?</h3>
                <p>
                  A balanced transportation problem is a transportation problem where the total supply from all sources equals the total demand at all destinations. Mathematically, this is expressed as Σᵢ Sᵢ = Σⱼ Dⱼ. When this condition holds, the problem is said to be balanced and can be solved using standard transportation algorithms without any modifications.
                </p>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Balanced</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>ΣSᵢ = ΣDⱼ</li>
                      <li>No dummy needed</li>
                      <li>Directly solvable</li>
                      <li>All supply used</li>
                      <li>All demand met</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Unbalanced</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>ΣSᵢ ≠ ΣDⱼ</li>
                      <li>Dummy needed</li>
                      <li>Requires modification</li>
                      <li>Surplus or deficit</li>
                      <li>More complex</li>
                    </ul>
                  </div>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Susmita in Kolkata plans her distribution, a balanced problem means she has exactly the right amount of stock to meet all store demands. This is the most efficient scenario for her logistics planning.
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Definition and Characteristics</h2>
              
              <div className="prose prose-emerald dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Formal Definition</h3>
                <p>
                  A transportation problem is called balanced if and only if the sum of supplies across all sources equals the sum of demands across all destinations.
                </p>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    Σᵢ Sᵢ = Σⱼ Dⱼ (Balanced Condition)
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Key Characteristics</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Exact Equality:</strong> Total supply equals total demand exactly</li>
                  <li><strong>No Waste:</strong> All supply is fully utilized</li>
                  <li><strong>No Shortage:</strong> All demand is completely satisfied</li>
                  <li><strong>Direct Solution:</strong> Can be solved without dummy variables</li>
                  <li><strong>Feasibility:</strong> Guaranteed to have a feasible solution</li>
                  <li><strong>Efficiency:</strong> Solution methods work directly on the original problem</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Why Balance Matters</h3>
                <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Feasibility</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Guarantees a solution exists</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Simplicity</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">No dummy variables needed</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">Optimality</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Standard algorithms apply</p>
                  </div>
                </div>

                <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Observe Carefully:</strong> In a balanced problem, the sum of all supplies equals the sum of all demands. This means every unit produced or stored must be shipped, and every unit demanded must be received.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Balance Condition Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">The Balance Condition</h2>
              
              <div className="prose prose-emerald dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Mathematical Expression</h3>
                <div className="my-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <p className="font-mono text-sm text-center">
                    Σᵢ Sᵢ = Σⱼ Dⱼ
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Checking for Balance</h3>
                <p>
                  To determine if a transportation problem is balanced, follow these steps:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>List all sources and their supply values (Sᵢ)</li>
                  <li>List all destinations and their demand values (Dⱼ)</li>
                  <li>Calculate total supply: Σᵢ Sᵢ</li>
                  <li>Calculate total demand: Σⱼ Dⱼ</li>
                  <li>Compare the two sums</li>
                </ol>

                <div className="my-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Example Balance Check</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="font-medium text-green-600 dark:text-green-400">Supplies:</p>
                      <p className="text-sm font-mono">S₁ = 100, S₂ = 150, S₃ = 120</p>
                      <p className="text-sm font-mono mt-1">ΣSᵢ = 100 + 150 + 120 = 370</p>
                    </div>
                    <div>
                      <p className="font-medium text-orange-600 dark:text-orange-400">Demands:</p>
                      <p className="text-sm font-mono">D₁ = 80, D₂ = 90, D₃ = 100, D₄ = 100</p>
                      <p className="text-sm font-mono mt-1">ΣDⱼ = 80 + 90 + 100 + 100 = 370</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-2">✓ Balanced! ΣSᵢ = ΣDⱼ = 370</p>
                </div>

                <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <p className="font-medium text-red-800 dark:text-red-300">
                    💡 <strong>Try Changing This:</strong> What if you change one supply value from 100 to 90? Then ΣSᵢ = 360 and ΣDⱼ = 370, making the problem unbalanced. How would you handle this?
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Example 1: Manufacturing Distribution</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A company in Kolkata has 3 factories and 4 distribution centers. Monthly production exactly matches demand.
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
                        <li>Center 1: 700 units</li>
                        <li>Center 2: 800 units</li>
                        <li>Center 3: 600 units</li>
                        <li>Center 4: 900 units</li>
                        <li><strong>Total: 3000 units</strong></li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded text-sm">
                    <p className="font-medium text-emerald-700 dark:text-emerald-300">✅ Balanced Problem</p>
                    <p className="text-gray-700 dark:text-gray-300">Supply (3000) = Demand (3000) → Perfectly balanced!</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Example 2: Agricultural Produce Distribution</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A cooperative in Barrackpore collects and distributes seasonal vegetables.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Supply</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Farm 1: 150 tons</li>
                        <li>Farm 2: 200 tons</li>
                        <li>Farm 3: 180 tons</li>
                        <li>Farm 4: 220 tons</li>
                        <li><strong>Total: 750 tons</strong></li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-orange-600 dark:text-orange-400">Demand</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Market 1: 150 tons</li>
                        <li>Market 2: 180 tons</li>
                        <li>Market 3: 200 tons</li>
                        <li>Market 4: 120 tons</li>
                        <li>Market 5: 100 tons</li>
                        <li><strong>Total: 750 tons</strong></li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded text-sm">
                    <p className="font-medium text-emerald-700 dark:text-emerald-300">✅ Balanced Problem</p>
                    <p className="text-gray-700 dark:text-gray-300">Mahima uses this balanced plan to distribute produce efficiently each season.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Example 3: Healthcare Supply Chain</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A healthcare network in Jadavpur manages medical supply distribution.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Supply</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Warehouse A: 500 units</li>
                        <li>Warehouse B: 700 units</li>
                        <li><strong>Total: 1200 units</strong></li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-orange-600 dark:text-orange-400">Demand</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>Hospital 1: 250 units</li>
                        <li>Hospital 2: 300 units</li>
                        <li>Hospital 3: 350 units</li>
                        <li>Hospital 4: 300 units</li>
                        <li><strong>Total: 1200 units</strong></li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded text-sm">
                    <p className="font-medium text-emerald-700 dark:text-emerald-300">✅ Balanced Problem</p>
                    <p className="text-gray-700 dark:text-gray-300">Abhronila ensures all hospitals receive their required supplies with no surplus or deficit.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Example 4: Educational Resources</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A school district in Ichapur distributes textbooks to schools.
                  </p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-green-600 dark:text-green-400">Supply</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>DC₁: 1000 books</li>
                        <li>DC₂: 800 books</li>
                        <li>DC₃: 1200 books</li>
                        <li><strong>Total: 3000 books</strong></li>
                      </ul>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-700 rounded">
                      <p className="font-medium text-orange-600 dark:text-orange-400">Demand</p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300">
                        <li>8 schools with demands totaling 3000 books</li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded text-sm">
                    <p className="font-medium text-emerald-700 dark:text-emerald-300">✅ Balanced Problem</p>
                    <p className="text-gray-700 dark:text-gray-300">Debangshu ensures every school receives exactly the books they need.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 750" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="750" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Balanced Transportation Problem</text>
                  
                  {/* Balanced Condition Box */}
                  <rect x="50" y="70" width="850" height="80" rx="15" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="475" y="105" textAnchor="middle" className="text-lg font-bold fill-emerald-600 dark:fill-emerald-400">Balanced Condition</text>
                  <text x="475" y="135" textAnchor="middle" className="text-base font-mono fill-gray-700 dark:fill-gray-300">Σᵢ Sᵢ = Σⱼ Dⱼ</text>
                  
                  {/* Supply Side */}
                  <rect x="50" y="180" width="350" height="200" rx="15" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="0.5s" />
                  </rect>
                  <text x="225" y="215" textAnchor="middle" className="text-lg font-bold fill-green-600 dark:fill-green-400">Sources (Supply)</text>
                  
                  <rect x="80" y="235" width="130" height="50" rx="8" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <text x="145" y="260" textAnchor="middle" className="text-sm font-semibold fill-green-700 dark:fill-green-300">S₁ = 100</text>
                  
                  <rect x="240" y="235" width="130" height="50" rx="8" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.3s" />
                  </rect>
                  <text x="305" y="260" textAnchor="middle" className="text-sm font-semibold fill-green-700 dark:fill-green-300">S₂ = 150</text>
                  
                  <rect x="160" y="300" width="130" height="50" rx="8" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.6s" />
                  </rect>
                  <text x="225" y="325" textAnchor="middle" className="text-sm font-semibold fill-green-700 dark:fill-green-300">S₃ = 120</text>
                  
                  <text x="225" y="370" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">ΣSᵢ = 370</text>
                  
                  {/* Balance Arrow */}
                  <line x1="400" y1="280" x2="500" y2="280" stroke="#F59E0B" strokeWidth="3">
                    <animate attributeName="stroke-dasharray" values="0 100;100 0" dur="2s" fill="freeze" />
                  </line>
                  <polygon points="500,275 510,280 500,285" fill="#F59E0B" />
                  <text x="455" y="265" textAnchor="middle" className="text-xs font-semibold fill-amber-600 dark:fill-amber-400">Balance</text>
                  
                  {/* Demand Side */}
                  <rect x="550" y="180" width="350" height="200" rx="15" fill="#F97316" fillOpacity="0.1" stroke="#F97316" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="0.8s" />
                  </rect>
                  <text x="725" y="215" textAnchor="middle" className="text-lg font-bold fill-orange-600 dark:fill-orange-400">Destinations (Demand)</text>
                  
                  <rect x="580" y="235" width="130" height="50" rx="8" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.2s" />
                  </rect>
                  <text x="645" y="260" textAnchor="middle" className="text-sm font-semibold fill-orange-700 dark:fill-orange-300">D₁ = 80</text>
                  
                  <rect x="740" y="235" width="130" height="50" rx="8" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.5s" />
                  </rect>
                  <text x="805" y="260" textAnchor="middle" className="text-sm font-semibold fill-orange-700 dark:fill-orange-300">D₂ = 90</text>
                  
                  <rect x="660" y="300" width="130" height="50" rx="8" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.7s" />
                  </rect>
                  <text x="725" y="325" textAnchor="middle" className="text-sm font-semibold fill-orange-700 dark:fill-orange-300">D₃ = 100</text>
                  
                  <rect x="740" y="300" width="130" height="50" rx="8" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.9s" />
                  </rect>
                  <text x="805" y="325" textAnchor="middle" className="text-sm font-semibold fill-orange-700 dark:fill-orange-300">D₄ = 100</text>
                  
                  <text x="725" y="370" textAnchor="middle" className="text-sm font-bold fill-orange-600 dark:fill-orange-400">ΣDⱼ = 370</text>
                  
                  {/* Balance Result */}
                  <rect x="150" y="420" width="650" height="60" rx="15" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="450" textAnchor="middle" className="text-base font-bold fill-emerald-600 dark:fill-emerald-400">✓ Balanced!</text>
                  <text x="475" y="470" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">ΣSᵢ = ΣDⱼ = 370 → Perfectly Balanced Transportation Problem</text>
                  
                  {/* Characteristics Box */}
                  <rect x="50" y="510" width="850" height="220" rx="15" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="1.5s" />
                  </rect>
                  <text x="475" y="545" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">Characteristics of Balanced Transportation Problems</text>
                  
                  <rect x="80" y="565" width="380" height="145" rx="10" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#10B981" strokeWidth="1.5" />
                  <text x="270" y="590" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Advantages</text>
                  <text x="100" y="615" className="text-sm fill-gray-700 dark:fill-gray-300">• No dummy variables needed</text>
                  <text x="100" y="635" className="text-sm fill-gray-700 dark:fill-gray-300">• Directly solvable using standard algorithms</text>
                  <text x="100" y="655" className="text-sm fill-gray-700 dark:fill-gray-300">• All supply is fully utilized</text>
                  <text x="100" y="675" className="text-sm fill-gray-700 dark:fill-gray-300">• All demand is completely satisfied</text>
                  <text x="100" y="695" className="text-sm fill-gray-700 dark:fill-gray-300">• Feasible solution guaranteed</text>
                  
                  <rect x="490" y="565" width="380" height="145" rx="10" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#F59E0B" strokeWidth="1.5" />
                  <text x="680" y="590" textAnchor="middle" className="text-sm font-bold fill-amber-600 dark:fill-amber-400">Requirements</text>
                  <text x="510" y="615" className="text-sm fill-gray-700 dark:fill-gray-300">• Accurate supply data needed</text>
                  <text x="510" y="635" className="text-sm fill-gray-700 dark:fill-gray-300">• Accurate demand data needed</text>
                  <text x="510" y="655" className="text-sm fill-gray-700 dark:fill-gray-300">• Balance must be verified</text>
                  <text x="510" y="675" className="text-sm fill-gray-700 dark:fill-gray-300">• No surplus or deficit allowed</text>
                  <text x="510" y="695" className="text-sm fill-gray-700 dark:fill-gray-300">• Regular updates required</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram illustrates a balanced transportation problem where total supply equals total demand, with all characteristics and requirements shown.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">🎯 Quick Balance Check</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always add up all supplies and all demands first. If they're equal, you have a balanced problem. If not, you need to handle the imbalance.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">💡 Data Verification</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Verify supply and demand data with multiple sources before assuming balance. A single incorrect value can make a balanced problem appear unbalanced.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🔧 Regular Updates</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Supply and demand change over time. Regularly update your data to ensure your problem remains balanced in practice.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">⚡ Standard Solution</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    For balanced problems, you can directly apply standard transportation algorithms like the Northwest Corner method, Least Cost method, or VAM, followed by the MODI method.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> In practice, perfectly balanced problems are rare. Companies often maintain safety stock or allow for some flexibility, making the problem slightly unbalanced. Mamata from Kolkata always builds in a small buffer in her supply planning to handle unexpected demand spikes.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Assuming Balance Without Checking</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Never assume a problem is balanced. Always calculate and verify ΣSᵢ = ΣDⱼ before solving.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect Data Entry</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Entering wrong supply or demand values can make a balanced problem appear unbalanced. Double-check all data.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Forgetting to Check Units</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Supplies and demands must be in the same units. Comparing tons with kilograms or rupees with dollars leads to incorrect balance checks.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Overlooking Rounding Errors</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      When working with decimals, rounding errors can make a balanced problem appear unbalanced. Use sufficient precision.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> Many students think that if a problem is balanced, it's automatically optimal. Balance only ensures feasibility, not optimality. You still need to find the optimal shipping plan using appropriate algorithms.
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">📝 Data Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Verify supply data from multiple sources</li>
                    <li>Verify demand data from multiple sources</li>
                    <li>Check units consistency</li>
                    <li>Document data sources</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">🔍 Balance Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Always calculate ΣSᵢ and ΣDⱼ</li>
                    <li>Compare the two sums exactly</li>
                    <li>Use sufficient precision</li>
                    <li>Document balance status</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">📚 Regular Updates</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Update supply data regularly</li>
                    <li>Update demand data regularly</li>
                    <li>Monitor for changes</li>
                    <li>Re-balance as needed</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">🎯 Solution Approach</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use standard algorithms for balanced problems</li>
                    <li>Start with initial feasible solution</li>
                    <li>Check optimality using MODI</li>
                    <li>Verify solution meets all constraints</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, balanced transportation problems are the ideal scenario. Companies strive to balance supply and demand through production planning, inventory management, and demand forecasting to achieve efficient distribution.
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Balance Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand what a balanced transportation problem is</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Balance Verification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can check if a transportation problem is balanced</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Characteristics</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand the characteristics of balanced problems</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Solution Methods</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know which solution methods apply to balanced problems</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Real-World Application</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can identify balanced transportation problems in real-world scenarios</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "Balanced transportation problems are the ideal scenario in logistics planning. When I teach this to my students in Kolkata, I emphasize that achieving balance is the goal of good supply chain management. Abhronila from Jadavpur learned that by maintaining accurate demand forecasts and flexible supply, she could keep her transportation problems balanced, reducing the need for costly adjustments. Remember: Balance is not just a mathematical condition—it's a business goal. Strive for balance in your supply chain, and your transportation problems will be easier to solve."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Balanced Transportation Problem FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Balanced Transportation Problem"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Notes"
            downloadFileName="topic5_note.txt"
          />
        </div>
      </div>
    </div>
  );
};

export default Topic5;