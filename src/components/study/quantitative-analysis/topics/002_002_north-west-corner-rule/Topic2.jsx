// Topic2.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic2_files/topic2_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic2_files/topic2_note.txt?raw';

const Topic2 = () => {
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
    { id: 'introduction', title: 'Introduction to Step-by-Step Allocation' },
    { id: 'overview', title: 'Allocation Process Overview' },
    { id: 'steps', title: 'Detailed Step-by-Step Procedure' },
    { id: 'examples', title: 'Practical Examples' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/30 rounded-full">
            Topic 2
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
            Step-by-Step Allocation Procedure
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Mastering the systematic allocation process for finding an initial basic feasible solution
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Introduction to Step-by-Step Allocation</h2>
              
              <div className="prose prose-cyan dark:prose-invert max-w-none leading-relaxed">
                <p>
                  The step-by-step allocation procedure is the systematic process of assigning shipments from sources to destinations to create an initial basic feasible solution. This procedure forms the foundation of all transportation problem solution methods, whether using the Northwest Corner Rule, Least Cost Method, or Vogel's Approximation Method.
                </p>

                <div className="my-6 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg border-l-4 border-cyan-500">
                  <p className="font-medium text-cyan-800 dark:text-cyan-300">
                    💡 Key Insight: The allocation procedure is like filling a matrix systematically. Each allocation reduces either a supply or a demand (or both) until all are satisfied. The order of allocation depends on which method you're using.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">What is the Allocation Procedure?</h3>
                <p>
                  The allocation procedure is the methodical process of assigning quantities to cells in the transportation table. At each step, you choose a cell, allocate the maximum possible amount, update the remaining supplies and demands, and continue until all allocations are complete. The specific rules for choosing cells vary by method, but the underlying allocation mechanics are the same.
                </p>

                <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Choose Cell</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Select based on method rules</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Allocate</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Assign min(Supply, Demand)</p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300">Update</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Reduce supplies and demands</p>
                  </div>
                </div>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Mamata in Kolkata allocates products from warehouses to stores, she's following an allocation procedure. Whether she starts with the cheapest route or the first warehouse in her list, she's systematically assigning quantities until all orders are filled.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Overview Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Allocation Process Overview</h2>
              
              <div className="prose prose-cyan dark:prose-invert max-w-none leading-relaxed">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">The Big Picture</h3>
                <p>
                  The allocation process follows a consistent pattern regardless of which method you're using. The key steps are:
                </p>

                <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                    <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Core Mechanics</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Always allocate min(remaining supply, remaining demand)</li>
                      <li>Update the row supply and column demand</li>
                      <li>Cross out rows/columns when they reach zero</li>
                      <li>Continue until all allocations complete</li>
                      <li>Result is always m+n-1 allocations</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Method Differences</h4>
                    <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li><strong>NW Corner:</strong> Start at top-left, move systematically</li>
                      <li><strong>Least Cost:</strong> Start with cheapest cell</li>
                      <li><strong>VAM:</strong> Start with highest penalty</li>
                      <li>All methods produce different quality solutions</li>
                      <li>All methods follow same allocation mechanics</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Why Step-by-Step Matters</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Systematic Approach:</strong> Prevents errors and omissions</li>
                  <li><strong>Traceability:</strong> Easy to verify each step</li>
                  <li><strong>Learning:</strong> Helps understand the underlying mechanics</li>
                  <li><strong>Consistency:</strong> Produces reliable results</li>
                  <li><strong>Documentation:</strong> Easy to document and explain</li>
                </ul>

                <div className="my-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Observe Carefully:</strong> The allocation procedure is the same regardless of the method you use. The only difference is how you choose which cell to allocate next. Once you master the allocation mechanics, you can apply any method.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Detailed Steps Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Detailed Step-by-Step Procedure</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded-full font-bold">1</span>
                    <div>
                      <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Setup the Transportation Table</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Create a table with sources as rows and destinations as columns. Fill in all costs, supplies, and demands. Add dummy rows/columns if the problem is unbalanced.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        Table: m rows × n columns<br/>
                        Supplies: S₁, S₂, ..., Sₘ<br/>
                        Demands: D₁, D₂, ..., Dₙ
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded-full font-bold">2</span>
                    <div>
                      <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Select the Next Cell</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Choose a cell based on your method:
                      </p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 mt-1">
                        <li><strong>NW Corner:</strong> Current position, starting at (1,1)</li>
                        <li><strong>Least Cost:</strong> The cheapest available cell</li>
                        <li><strong>VAM:</strong> The cell with the highest penalty</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded-full font-bold">3</span>
                    <div>
                      <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Allocate the Maximum Possible Amount</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        At the selected cell (i,j), allocate:
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        xᵢⱼ = min(Sᵢ, Dⱼ)
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        This is the maximum amount that can be shipped without exceeding supply or demand.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded-full font-bold">4</span>
                    <div>
                      <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Update Supplies and Demands</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Reduce the row supply and column demand by the allocated amount:
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        Sᵢ = Sᵢ - xᵢⱼ<br/>
                        Dⱼ = Dⱼ - xᵢⱼ
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded-full font-bold">5</span>
                    <div>
                      <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Cross Out Exhausted Rows/Columns</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        If the row supply reaches zero, cross out that row. If the column demand reaches zero, cross out that column. If both reach zero, cross out both.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        If Sᵢ = 0 → row i is complete<br/>
                        If Dⱼ = 0 → column j is complete
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded-full font-bold">6</span>
                    <div>
                      <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Move to the Next Cell</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Based on your method's rules, select the next cell to allocate:
                      </p>
                      <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 mt-1">
                        <li><strong>NW Corner:</strong> Move right (if column exhausted) or down (if row exhausted)</li>
                        <li><strong>Least Cost:</strong> Find the next cheapest available cell</li>
                        <li><strong>VAM:</strong> Recalculate penalties and choose highest</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded-full font-bold">7</span>
                    <div>
                      <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Repeat Until Complete</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Continue the allocation process until all supplies are exhausted and all demands are satisfied. The result is your IBFS.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        Stop when: Σⱼ xᵢⱼ = Sᵢ for all i<br/>
                        and Σᵢ xᵢⱼ = Dⱼ for all j
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Try Changing This:</strong> What happens if you change the rule for selecting the next cell? The allocation mechanics stay the same, but the resulting solution changes. This is why different methods give different solutions.
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Practical Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Example 1: Complete Allocation with NW Corner</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Problem:</strong> 3 sources, 3 destinations with the following data.
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-semibold">Source \ Destination</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₁</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₂</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">D₃</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">Supply</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₁</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">5</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">3</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">7</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">50</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₂</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">4</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">6</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">2</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">40</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">S₃</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">8</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">5</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">4</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">30</td>
                        </tr>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">Demand</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">40</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">50</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">30</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">120</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Step-by-Step Allocation:</p>
                    <ol className="list-decimal pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li><strong>Cell (1,1):</strong> min(50,40) = 40 → S₁ left: 10, D₁: 0</li>
                      <li><strong>Cell (1,2):</strong> min(10,50) = 10 → S₁: 0, D₂ left: 40</li>
                      <li><strong>Cell (2,2):</strong> min(40,40) = 40 → S₂: 0, D₂: 0</li>
                      <li><strong>Cell (3,3):</strong> min(30,30) = 30 → S₃: 0, D₃: 0</li>
                    </ol>
                    <p className="font-medium mt-2">Final Allocations: x₁₁=40, x₁₂=10, x₂₂=40, x₃₃=30</p>
                    <p className="font-medium">Total Cost: 40×5 + 10×3 + 40×6 + 30×4 = 200 + 30 + 240 + 120 = ₹590</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Example 2: Allocation with Degeneracy</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A problem where supply exactly equals demand at a cell, causing degeneracy.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Degeneracy Case:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>At cell (2,2): min(20,20) = 20</li>
                      <li>Both supply and demand reach zero simultaneously</li>
                      <li>This creates degeneracy (fewer than m+n-1 allocations)</li>
                      <li>Need to add epsilon to handle this</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Handling:</p>
                    <p className="text-gray-700 dark:text-gray-300">Add epsilon (ε) to a zero cell to create a basic variable and continue.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Example 3: Allocation with Dummy</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A supply surplus problem requiring a dummy destination.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Dummy Allocation:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Total Supply = 500, Total Demand = 400</li>
                      <li>Add dummy destination with demand = 100</li>
                      <li>Apply allocation procedure with dummy column</li>
                      <li>Dummy allocations represent unused supply</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Susmita uses this to identify which sources have surplus capacity.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Example 4: Large Scale Allocation</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A school district in Ichapur distributing supplies to 8 schools from 4 centers.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Allocation Process:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Follow step-by-step procedure for 4×8 problem</li>
                      <li>Make 11 allocations (m+n-1 = 4+8-1 = 11)</li>
                      <li>Track supplies and demands carefully</li>
                      <li>Verify all constraints satisfied</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Debangshu uses systematic allocation to ensure all schools receive their supplies.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 800" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="800" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">Step-by-Step Allocation Procedure</text>
                  
                  {/* Flow Chart */}
                  <rect x="50" y="70" width="850" height="90" rx="15" fill="#06B6D4" fillOpacity="0.1" stroke="#06B6D4" strokeWidth="2">
                    <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                  </rect>
                  <text x="475" y="105" textAnchor="middle" className="text-base font-bold fill-cyan-600 dark:fill-cyan-400">The Allocation Cycle</text>
                  
                  <rect x="100" y="130" width="180" height="60" rx="8" fill="#06B6D4" fillOpacity="0.15" stroke="#06B6D4" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <text x="190" y="155" textAnchor="middle" className="text-sm font-semibold fill-cyan-700 dark:fill-cyan-300">Select Cell</text>
                  <text x="190" y="175" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Method-specific</text>
                  
                  <path d="M 280 160 L 320 160" stroke="#06B6D4" strokeWidth="2">
                    <animate attributeName="stroke-dasharray" values="0 40;40 0" dur="1s" repeatCount="indefinite" />
                  </path>
                  
                  <rect x="320" y="130" width="180" height="60" rx="8" fill="#06B6D4" fillOpacity="0.15" stroke="#06B6D4" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.3s" />
                  </rect>
                  <text x="410" y="155" textAnchor="middle" className="text-sm font-semibold fill-cyan-700 dark:fill-cyan-300">Allocate</text>
                  <text x="410" y="175" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">min(Sᵢ, Dⱼ)</text>
                  
                  <path d="M 500 160 L 540 160" stroke="#06B6D4" strokeWidth="2">
                    <animate attributeName="stroke-dasharray" values="0 40;40 0" dur="1s" repeatCount="indefinite" begin="0.5s" />
                  </path>
                  
                  <rect x="540" y="130" width="180" height="60" rx="8" fill="#06B6D4" fillOpacity="0.15" stroke="#06B6D4" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.6s" />
                  </rect>
                  <text x="630" y="155" textAnchor="middle" className="text-sm font-semibold fill-cyan-700 dark:fill-cyan-300">Update</text>
                  <text x="630" y="175" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Sᵢ, Dⱼ</text>
                  
                  <path d="M 720 160 L 760 160" stroke="#06B6D4" strokeWidth="2">
                    <animate attributeName="stroke-dasharray" values="0 40;40 0" dur="1s" repeatCount="indefinite" begin="0.7s" />
                  </path>
                  
                  <rect x="760" y="130" width="120" height="60" rx="8" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="1.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" begin="0.8s" />
                  </rect>
                  <text x="820" y="155" textAnchor="middle" className="text-sm font-semibold fill-amber-600 dark:fill-amber-400">Repeat</text>
                  <text x="820" y="175" textAnchor="middle" className="text-xs fill-gray-600 dark:fill-gray-400">Until done</text>
                  
                  {/* Arrow from Repeat back to Select */}
                  <path d="M 820 190 L 820 210 L 190 210 L 190 190" stroke="#F59E0B" strokeWidth="2" fill="none">
                    <animate attributeName="stroke-dasharray" values="0 100;100 0" dur="2s" repeatCount="indefinite" begin="1s" />
                  </path>
                  
                  {/* Detailed Steps Box */}
                  <rect x="50" y="240" width="850" height="200" rx="15" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="275" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">Detailed Steps</text>
                  
                  <rect x="80" y="295" width="250" height="125" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#06B6D4" strokeWidth="1.5" />
                  <text x="205" y="320" textAnchor="middle" className="text-sm font-bold fill-cyan-600 dark:fill-cyan-400">Step 1-2</text>
                  <text x="205" y="340" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Setup table</text>
                  <text x="205" y="360" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Select next cell</text>
                  <text x="205" y="380" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Based on method</text>
                  
                  <rect x="350" y="295" width="250" height="125" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#06B6D4" strokeWidth="1.5" />
                  <text x="475" y="320" textAnchor="middle" className="text-sm font-bold fill-cyan-600 dark:fill-cyan-400">Step 3-4</text>
                  <text x="475" y="340" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Allocate min(Sᵢ, Dⱼ)</text>
                  <text x="475" y="360" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Update supplies</text>
                  <text x="475" y="380" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Update demands</text>
                  
                  <rect x="620" y="295" width="250" height="125" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#06B6D4" strokeWidth="1.5" />
                  <text x="745" y="320" textAnchor="middle" className="text-sm font-bold fill-cyan-600 dark:fill-cyan-400">Step 5-7</text>
                  <text x="745" y="340" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Cross out zeros</text>
                  <text x="745" y="360" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Move to next cell</text>
                  <text x="745" y="380" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Repeat until done</text>
                  
                  {/* Key Points Box */}
                  <rect x="50" y="470" width="850" height="300" rx="15" fill="#8B5CF6" fillOpacity="0.1" stroke="#8B5CF6" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="475" y="505" textAnchor="middle" className="text-base font-bold fill-purple-600 dark:fill-purple-400">Key Rules of Allocation</text>
                  
                  <rect x="80" y="525" width="380" height="225" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#10B981" strokeWidth="1.5" />
                  <text x="270" y="550" textAnchor="middle" className="text-sm font-bold fill-green-600 dark:fill-green-400">Always Remember</text>
                  <text x="100" y="575" className="text-sm fill-gray-700 dark:fill-gray-300">• Allocate min(Sᵢ, Dⱼ) at each cell</text>
                  <text x="100" y="600" className="text-sm fill-gray-700 dark:fill-gray-300">• Update supplies and demands after each allocation</text>
                  <text x="100" y="625" className="text-sm fill-gray-700 dark:fill-gray-300">• Cross out exhausted rows/columns</text>
                  <text x="100" y="650" className="text-sm fill-gray-700 dark:fill-gray-300">• Continue until all allocations complete</text>
                  <text x="100" y="675" className="text-sm fill-gray-700 dark:fill-gray-300">• Result has m+n-1 allocations</text>
                  <text x="100" y="700" className="text-sm fill-gray-700 dark:fill-gray-300">• Handle degeneracy with epsilon</text>
                  
                  <rect x="490" y="525" width="380" height="225" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#F59E0B" strokeWidth="1.5" />
                  <text x="680" y="550" textAnchor="middle" className="text-sm font-bold fill-amber-600 dark:fill-amber-400">Method Differences</text>
                  <text x="510" y="575" className="text-sm fill-gray-700 dark:fill-gray-300">• NW Corner: Systematic, top-left to bottom-right</text>
                  <text x="510" y="600" className="text-sm fill-gray-700 dark:fill-gray-300">• Least Cost: Cheapest cell first</text>
                  <text x="510" y="625" className="text-sm fill-gray-700 dark:fill-gray-300">• VAM: Highest penalty first</text>
                  <text x="510" y="650" className="text-sm fill-gray-700 dark:fill-gray-300">• All use same allocation mechanics</text>
                  <text x="510" y="675" className="text-sm fill-gray-700 dark:fill-gray-300">• Different methods = different quality</text>
                  <text x="510" y="700" className="text-sm fill-gray-700 dark:fill-gray-300">• Better method = fewer iterations</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram shows the complete step-by-step allocation procedure, from selecting cells to completing all allocations.</p>
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">🎯 Systematic Tracking</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Keep a running tally of remaining supplies and demands. Cross out completed rows and columns immediately to avoid errors.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">💡 Check After Each Step</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    After each allocation, verify that row sums and column sums are correct. This catches errors early.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">🔧 Use a Checklist</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Create a checklist of steps to follow. This ensures you don't miss any allocations or updates.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">⚡ Calculate Total Cost</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    After completing allocations, calculate the total cost immediately. This gives you a baseline for measuring improvement.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> Mahima from Kolkata uses a spreadsheet to track allocations step by step. She colors completed rows and columns to visualize progress. This systematic approach helps her avoid errors in large problems.
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Incorrect Allocation Amount</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Allocating more than min(Sᵢ, Dⱼ). This would exceed supply or demand, making the solution infeasible.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Skipping Row/Column Updates</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Forgetting to update supplies and demands after allocation. This leads to incorrect remaining values.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Not Crossing Out Exhausted Rows/Columns</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Forgetting to cross out rows or columns that reach zero. This can lead to double allocation.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Degeneracy</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not handling cases where allocations are less than m + n - 1. This requires adding epsilon.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> The most common mistake is rushing through the allocation procedure and missing updates. Take time to track each step carefully. A single missed update can make the entire solution invalid.
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">📝 Preparation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Set up the transportation table clearly</li>
                    <li>Label all rows and columns properly</li>
                    <li>Check balance condition first</li>
                    <li>Add dummies if needed</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">🔍 Execution</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Follow steps in exact order</li>
                    <li>Allocate min(Sᵢ, Dⱼ) every time</li>
                    <li>Update immediately after each allocation</li>
                    <li>Cross out completed rows/columns</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">📚 Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Count allocations (should be m+n-1)</li>
                    <li>Sum row allocations (should equal supplies)</li>
                    <li>Sum column allocations (should equal demands)</li>
                    <li>Calculate total cost</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">🎯 Documentation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Document each allocation step</li>
                    <li>Record all updates</li>
                    <li>Note any degeneracy</li>
                    <li>Keep for future reference</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, allocation procedures are often automated in optimization software. However, understanding the step-by-step process is crucial for debugging and interpreting results. Susmita from Barrackpore always reviews the allocation steps to ensure her software is working correctly.
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
              <h2 className="text-2xl font-bold mb-4 text-cyan-600 dark:text-cyan-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Setup Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know how to set up the transportation table for allocation</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Allocation Rules</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know to allocate min(Sᵢ, Dⱼ) at each step</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Update Procedure</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can update supplies and demands correctly</p>
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
                    <h4 className="font-medium">Solution Verification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can verify the allocation solution is correct</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "The step-by-step allocation procedure is the heart of solving transportation problems. When I teach this to my students in Kolkata, I emphasize that mastering this procedure makes all other methods easy to learn. Abhronila from Jadavpur spent a week practicing the allocation procedure until it became second nature—now she can solve any transportation problem with confidence. Susmita from Barrackpore uses the same procedure whether she's using NW Corner, Least Cost, or VAM. Remember: The allocation mechanics are the same for all methods. Master the procedure, and you've mastered the foundation of transportation problem solving."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="Step-by-Step Allocation Procedure FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="Step-by-Step Allocation Procedure"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Notes"
            downloadFileName="topic2_note.txt"
          />
        </div>
      </div>
    </div>
  );
};

export default Topic2;