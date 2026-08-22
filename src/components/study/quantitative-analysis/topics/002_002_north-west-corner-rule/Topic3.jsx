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
    { id: 'introduction', title: 'Introduction to Handling Exhausted Supply and Demand' },
    { id: 'exhaustedsupply', title: 'Understanding Exhausted Supply' },
    { id: 'exhausteddemand', title: 'Understanding Exhausted Demand' },
    { id: 'simultaneous', title: 'Simultaneous Exhaustion' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
            Topic 3
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            Handling Exhausted Supply and Demand
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Understanding how to manage when supplies and demands are fully utilized during the allocation process
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Introduction to Handling Exhausted Supply and Demand</h2>
              
              <div className="prose prose-indigo dark:prose-invert max-w-none leading-relaxed">
                <p>
                  During the allocation process, supplies and demands become exhausted as we assign shipments. Understanding how to identify and handle exhausted supply and demand is crucial for correctly completing the transportation table and finding a valid initial basic feasible solution.
                </p>

                <div className="my-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border-l-4 border-indigo-500">
                  <p className="font-medium text-indigo-800 dark:text-indigo-300">
                    💡 Key Insight: Exhausted supply and demand mark completion of rows and columns. Recognizing when they occur and handling them correctly ensures you don't over-allocate or miss allocations.
                  </p>
                </div>

                <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Exhausted Supply</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Row supply reaches zero</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Exhausted Demand</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Column demand reaches zero</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-purple-700 dark:text-purple-300">Simultaneous</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Both reach zero at the same time</p>
                  </div>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Mamata in Kolkata allocates products from warehouses, she needs to know exactly when a warehouse is empty (supply exhausted) and when a store has received enough (demand satisfied). This guides her next allocation step.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Exhausted Supply Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Understanding Exhausted Supply</h2>
              
              <div className="prose prose-indigo dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">What is Exhausted Supply?</h3>
                <p>
                  Exhausted supply occurs when the total allocated from a source equals its total supply capacity. When a row's supply reaches zero (Sᵢ = 0), that source has no more units to allocate, and the row is considered complete.
                </p>

                <div className="my-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    Sᵢ = 0 → Row i is exhausted<br/>
                    All supplies from source i have been allocated<br/>
                    Cross out row i
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">How Supply Gets Exhausted</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Single Allocation:</strong> One allocation uses up all remaining supply</li>
                  <li><strong>Multiple Allocations:</strong> Several allocations cumulatively use up the supply</li>
                  <li><strong>Remaining Supply:</strong> When the remaining supply equals the allocation amount</li>
                  <li><strong>Last Allocation:</strong> The final allocation from a source</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">What to Do When Supply is Exhausted</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Verify the row sum equals the original supply</li>
                    <li>Cross out the row (mark it as complete)</li>
                    <li>Do not make any more allocations in that row</li>
                    <li>Move to the next row (down) for further allocations</li>
                    <li>Note that the source is fully utilized</li>
                  </ol>
                </div>

                <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Observe Carefully:</strong> An exhausted supply means the source has no more goods to ship. This is a natural stopping point for that row. You should not try to allocate from an exhausted source.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Exhausted Demand Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Understanding Exhausted Demand</h2>
              
              <div className="prose prose-indigo dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">What is Exhausted Demand?</h3>
                <p>
                  Exhausted demand occurs when the total allocated to a destination equals its total demand requirement. When a column's demand reaches zero (Dⱼ = 0), that destination has received all its required units, and the column is considered complete.
                </p>

                <div className="my-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    Dⱼ = 0 → Column j is exhausted<br/>
                    All demand at destination j has been satisfied<br/>
                    Cross out column j
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">How Demand Gets Exhausted</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Single Allocation:</strong> One allocation satisfies all remaining demand</li>
                  <li><strong>Multiple Allocations:</strong> Several allocations cumulatively satisfy the demand</li>
                  <li><strong>Remaining Demand:</strong> When the remaining demand equals the allocation amount</li>
                  <li><strong>Last Allocation:</strong> The final allocation to a destination</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">What to Do When Demand is Exhausted</h3>
                <div className="my-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li>Verify the column sum equals the original demand</li>
                    <li>Cross out the column (mark it as complete)</li>
                    <li>Do not make any more allocations in that column</li>
                    <li>Move to the next column (right) for further allocations</li>
                    <li>Note that the destination is fully satisfied</li>
                  </ol>
                </div>

                <div className="my-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-500">
                  <p className="font-medium text-purple-800 dark:text-purple-300">
                    💡 <strong>Observe Carefully:</strong> An exhausted demand means the destination needs no more goods. This is a natural stopping point for that column. You should not try to send more to an exhausted destination.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Simultaneous Exhaustion Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Simultaneous Exhaustion</h2>
              
              <div className="prose prose-indigo dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">What is Simultaneous Exhaustion?</h3>
                <p>
                  Simultaneous exhaustion occurs when the allocation at a cell exactly equals both the remaining supply in its row and the remaining demand in its column. This causes both the row and the column to reach zero at the same time.
                </p>

                <div className="my-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="font-mono text-sm">
                    Sᵢ = Dⱼ and allocation = Sᵢ = Dⱼ<br/>
                    Both row i and column j become exhausted<br/>
                    Cross out both row and column
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Why Simultaneous Exhaustion Matters</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Degeneracy:</strong> Simultaneous exhaustion creates degeneracy</li>
                  <li><strong>Fewer Allocations:</strong> Results in fewer than m+n-1 allocations</li>
                  <li><strong>Special Handling:</strong> Requires adding epsilon</li>
                  <li><strong>Cycling Risk:</strong> Can cause cycling in the simplex method</li>
                  <li><strong>Careful Tracking:</strong> Must be handled carefully to maintain correctness</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">How to Handle Simultaneous Exhaustion</h3>
                <div className="my-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                  <ol className="list-decimal pl-6 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li><strong>Identify:</strong> Recognize when both supply and demand reach zero</li>
                    <li><strong>Cross Out:</strong> Cross out both the row and the column</li>
                    <li><strong>Add Epsilon:</strong> Add a very small number ε to a zero cell</li>
                    <li><strong>Maintain Basic:</strong> This keeps the number of basic variables correct</li>
                    <li><strong>Continue:</strong> Proceed with the allocation procedure</li>
                  </ol>
                </div>

                <div className="my-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                  <p className="font-medium text-red-800 dark:text-red-300">
                    💡 <strong>Try Changing This:</strong> What happens if you don't handle simultaneous exhaustion? You'll end up with a degenerate solution that can cause problems in the simplex method. Always add epsilon to fix degeneracy.
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Real-World Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Example 1: Supply Exhaustion</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A warehouse has 50 units of stock. After allocations, it reaches zero.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Allocation Sequence:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Cell (1,1): allocate 30 → Supply left: 20</li>
                      <li>Cell (1,2): allocate 20 → Supply left: 0</li>
                      <li><strong>Supply Exhausted!</strong> → Cross out row 1</li>
                      <li>Move to row 2 for remaining allocations</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Handling:</p>
                    <p className="text-gray-700 dark:text-gray-300">Susmita crosses out the warehouse row and continues allocating from other warehouses.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Example 2: Demand Exhaustion</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A store needs 40 units. After allocations, it receives exactly 40.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Allocation Sequence:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Cell (1,1): allocate 25 → Demand left: 15</li>
                      <li>Cell (2,1): allocate 15 → Demand left: 0</li>
                      <li><strong>Demand Exhausted!</strong> → Cross out column 1</li>
                      <li>Move to column 2 for remaining allocations</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Handling:</p>
                    <p className="text-gray-700 dark:text-gray-300">Abhronila crosses out the store column and continues fulfilling other stores.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Example 3: Simultaneous Exhaustion (Degeneracy)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A supply of 30 exactly meets a demand of 30.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Allocation:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Cell (2,2): allocate 30</li>
                      <li>Supply left: 0 and Demand left: 0</li>
                      <li><strong>Both Exhausted!</strong> → Cross out both row and column</li>
                      <li><strong>Degeneracy!</strong> → Need to add epsilon</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded text-sm">
                    <p className="font-medium text-red-700 dark:text-red-300">⚠️ Handling:</p>
                    <p className="text-gray-700 dark:text-gray-300">Add epsilon (ε) to a zero cell to maintain the correct number of basic variables.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">Example 4: Multiple Exhaustions</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A logistics network in Jadavpur with multiple warehouses and stores.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Handling Multiple Exhaustions:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Track each row and column carefully</li>
                      <li>Cross out rows as supplies exhaust</li>
                      <li>Cross out columns as demands exhaust</li>
                      <li>Handle simultaneous exhaustion with epsilon</li>
                      <li>Verify all supplies and demands are met</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Debangshu uses careful tracking to ensure all warehouses and stores are properly handled.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 800" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="800" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Handling Exhausted Supply and Demand</text>
                  
                  {/* Table with Crossed Out Row and Column */}
                  <rect x="100" y="70" width="750" height="220" rx="10" fill="white" dark:fill="#1F2937" stroke="#8B5CF6" strokeWidth="2" />
                  
                  {/* Column Headers */}
                  <text x="200" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₁</text>
                  <text x="320" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₂</text>
                  <text x="440" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₃</text>
                  <text x="560" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₄</text>
                  <text x="700" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">Supply</text>
                  
                  {/* Grid Lines */}
                  <line x1="160" y1="105" x2="160" y2="285" stroke="#8B5CF6" strokeWidth="1.5" />
                  <line x1="280" y1="105" x2="280" y2="285" stroke="#8B5CF6" strokeWidth="1.5" />
                  <line x1="400" y1="105" x2="400" y2="285" stroke="#8B5CF6" strokeWidth="1.5" />
                  <line x1="520" y1="105" x2="520" y2="285" stroke="#8B5CF6" strokeWidth="1.5" />
                  <line x1="640" y1="105" x2="640" y2="285" stroke="#8B5CF6" strokeWidth="1.5" />
                  
                  <line x1="100" y1="110" x2="850" y2="110" stroke="#8B5CF6" strokeWidth="1.5" />
                  <line x1="100" y1="155" x2="850" y2="155" stroke="#8B5CF6" strokeWidth="1.5" />
                  <line x1="100" y1="200" x2="850" y2="200" stroke="#8B5CF6" strokeWidth="1.5" />
                  <line x1="100" y1="245" x2="850" y2="245" stroke="#8B5CF6" strokeWidth="1.5" />
                  <line x1="100" y1="290" x2="850" y2="290" stroke="#8B5CF6" strokeWidth="1.5" />
                  
                  {/* Row Labels */}
                  <text x="130" y="140" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">S₁</text>
                  <text x="130" y="185" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">S₂</text>
                  <text x="130" y="230" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">S₃</text>
                  
                  {/* Crossed out row 1 */}
                  <line x1="100" y1="110" x2="850" y2="155" stroke="#EF4444" strokeWidth="3" strokeDasharray="8,4" />
                  <text x="400" y="135" textAnchor="middle" className="text-sm font-bold fill-red-600 dark:fill-red-400">✕ ROW 1 EXHAUSTED</text>
                  
                  {/* Crossed out column 4 */}
                  <line x1="520" y1="105" x2="640" y2="290" stroke="#EF4444" strokeWidth="3" strokeDasharray="8,4" />
                  <text x="580" y="200" textAnchor="middle" className="text-sm font-bold fill-red-600 dark:fill-red-400">✕ COLUMN 4 EXHAUSTED</text>
                  
                  {/* Cells with allocations */}
                  <rect x="160" y="110" width="120" height="45" fill="#10B981" fillOpacity="0.2" rx="4" />
                  <text x="220" y="140" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">30</text>
                  
                  <rect x="280" y="110" width="120" height="45" fill="#10B981" fillOpacity="0.2" rx="4" />
                  <text x="340" y="140" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">20</text>
                  
                  <rect x="160" y="155" width="120" height="45" fill="#10B981" fillOpacity="0.2" rx="4" />
                  <text x="220" y="185" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">40</text>
                  
                  <rect x="400" y="200" width="120" height="45" fill="#10B981" fillOpacity="0.2" rx="4" />
                  <text x="460" y="230" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">15</text>
                  
                  {/* Legend Box */}
                  <rect x="50" y="320" width="850" height="150" rx="15" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="355" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">Handling Exhausted Supply and Demand</text>
                  
                  <rect x="80" y="375" width="250" height="75" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#10B981" strokeWidth="1.5" />
                  <text x="205" y="400" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Supply Exhausted</text>
                  <text x="205" y="420" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Sᵢ = 0 → Cross out row</text>
                  <text x="205" y="438" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Move to next row</text>
                  
                  <rect x="350" y="375" width="250" height="75" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1.5" />
                  <text x="475" y="400" textAnchor="middle" className="text-sm font-bold fill-blue-600 dark:fill-blue-400">Demand Exhausted</text>
                  <text x="475" y="420" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Dⱼ = 0 → Cross out column</text>
                  <text x="475" y="438" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Move to next column</text>
                  
                  <rect x="620" y="375" width="250" height="75" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#8B5CF6" strokeWidth="1.5" />
                  <text x="745" y="400" textAnchor="middle" className="text-sm font-bold fill-purple-600 dark:fill-purple-400">Simultaneous</text>
                  <text x="745" y="420" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Both Sᵢ = 0 and Dⱼ = 0</text>
                  <text x="745" y="438" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Add epsilon (ε)</text>
                  
                  {/* Degeneracy Box */}
                  <rect x="50" y="500" width="850" height="280" rx="15" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="475" y="535" textAnchor="middle" className="text-base font-bold fill-purple-600 dark:fill-purple-400">Degeneracy from Simultaneous Exhaustion</text>
                  
                  <rect x="80" y="560" width="380" height="200" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#EF4444" strokeWidth="1.5" />
                  <text x="270" y="585" textAnchor="middle" className="text-sm font-bold fill-red-600 dark:fill-red-400">Causes of Degeneracy</text>
                  <text x="100" y="610" className="text-sm fill-gray-700 dark:fill-gray-300">• Single allocation exhausts both supply and demand</text>
                  <text x="100" y="635" className="text-sm fill-gray-700 dark:fill-gray-300">• Results in fewer than m+n-1 allocations</text>
                  <text x="100" y="660" className="text-sm fill-gray-700 dark:fill-gray-300">• Can cause cycling in simplex method</text>
                  <text x="100" y="685" className="text-sm fill-gray-700 dark:fill-gray-300">• Must be handled with epsilon</text>
                  <text x="100" y="710" className="text-sm fill-gray-700 dark:fill-gray-300">• Common in transportation problems</text>
                  
                  <rect x="490" y="560" width="380" height="200" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#10B981" strokeWidth="1.5" />
                  <text x="680" y="585" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Handling Degeneracy</text>
                  <text x="510" y="610" className="text-sm fill-gray-700 dark:fill-gray-300">1. Identify the degenerate solution</text>
                  <text x="510" y="635" className="text-sm fill-gray-700 dark:fill-gray-300">2. Choose a zero cell in the table</text>
                  <text x="510" y="660" className="text-sm fill-gray-700 dark:fill-gray-300">3. Add epsilon (ε) to that cell</text>
                  <text x="510" y="685" className="text-sm fill-gray-700 dark:fill-gray-300">4. This cell becomes a basic variable</text>
                  <text x="510" y="710" className="text-sm fill-gray-700 dark:fill-gray-300">5. Continue with the algorithm</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram shows how to handle exhausted supply, exhausted demand, and simultaneous exhaustion that leads to degeneracy.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">🎯 Track Remaining Values</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Always track remaining supplies and demands after each allocation. This helps you identify when exhaustion occurs.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">💡 Watch for Simultaneous</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Pay special attention when a row's remaining supply equals a column's remaining demand. This will cause simultaneous exhaustion.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🔧 Cross Out Immediately</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Cross out exhausted rows and columns immediately. This prevents errors in subsequent allocations.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">⚡ Handle Degeneracy Early</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    If you notice fewer than m+n-1 allocations, add epsilon immediately. Don't wait until later.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> Mahima from Kolkata uses color coding in her spreadsheets—red for exhausted rows, blue for exhausted columns, and yellow for simultaneous exhaustion. This visual system helps her track everything at a glance.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Not Crossing Out Exhausted Rows</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Continuing to allocate from a row whose supply is exhausted. This leads to over-allocation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Not Crossing Out Exhausted Columns</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Continuing to allocate to a column whose demand is satisfied. This leads to over-fulfillment.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Simultaneous Exhaustion</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not recognizing when both supply and demand exhaust simultaneously, leading to degenerate solutions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Not Adding Epsilon for Degeneracy</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Failing to add epsilon when degeneracy occurs, resulting in too few basic variables.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> The most common mistake is assuming that exhausted rows and columns will take care of themselves. You must actively cross them out and track them. A single missed exhaustion can invalidate your entire solution.
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">📝 Tracking</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Track remaining supplies after each allocation</li>
                    <li>Track remaining demands after each allocation</li>
                    <li>Use a running tally system</li>
                    <li>Cross out immediately when exhaustion occurs</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">🔍 Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Verify row sums equal original supplies</li>
                    <li>Verify column sums equal original demands</li>
                    <li>Count allocations (should be m+n-1)</li>
                    <li>Check for degeneracy</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">📚 Documentation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Document each exhaustion</li>
                    <li>Note simultaneous exhaustion</li>
                    <li>Record epsilon placement if needed</li>
                    <li>Keep for verification</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">🎯 Degeneracy Handling</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Add epsilon immediately when needed</li>
                    <li>Choose epsilon placement carefully</li>
                    <li>Document epsilon placement</li>
                    <li>Verify solution still works</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, tracking exhausted supply and demand is automated in software. However, understanding the process is crucial for debugging. Susmita from Barrackpore always reviews exhaustion points when her optimization software produces unexpected results.
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
              <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Supply Exhaustion</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand how supply gets exhausted and how to handle it</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Demand Exhaustion</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand how demand gets exhausted and how to handle it</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Simultaneous Exhaustion</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I recognize when both supply and demand exhaust simultaneously</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Degeneracy Handling</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know how to handle degeneracy with epsilon</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Verification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can verify all supplies and demands are properly exhausted</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "Handling exhausted supply and demand is like managing inventory in real-time—you need to know exactly when something runs out. When I teach this to my students in Kolkata, I emphasize that exhaustion is a natural part of the allocation process. Abhronila from Jadavpur learned that carefully tracking exhaustion points helped her avoid costly errors in her distribution planning. Susmita from Barrackpore uses color-coded systems to track exhaustion visually. Remember: Every allocation either exhausts a supply or a demand (or both). Master tracking exhaustion, and you'll master the allocation process."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Handling Exhausted Supply and Demand FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Handling Exhausted Supply and Demand"
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