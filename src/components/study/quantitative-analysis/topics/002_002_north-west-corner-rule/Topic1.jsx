// Topic1.jsx
import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import FAQTemplate from '../../../../../common/FAQTemplate';
import questions from './topic1_files/topic1_questions';
import Teacher from '../../../../../common/TeacherSukantaHui';
import PlainTextPrint from '../../../../../common/PlainTextPrint';
import noteText from './topic1_files/topic1_note.txt?raw';

const Topic1 = () => {
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
    { id: 'introduction', title: 'Introduction to North-West Corner Rule' },
    { id: 'procedure', title: 'Step-by-Step Procedure' },
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
          <div className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/30 rounded-full">
            Topic 1
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-4 bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent">
            North-West Corner Rule
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Learning the simplest method for finding an initial basic feasible solution in transportation problems
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Introduction to North-West Corner Rule</h2>
              
              <div className="prose prose-emerald dark:prose-invert max-w-none leading-relaxed">
                <p>
                  The North-West Corner Rule is the simplest and most straightforward method for finding an initial basic feasible solution (IBFS) for transportation problems. It systematically allocates shipments starting from the top-left (north-west) corner of the transportation table, moving right or down as supplies and demands are exhausted.
                </p>

                <div className="my-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border-l-4 border-emerald-500">
                  <p className="font-medium text-emerald-800 dark:text-emerald-300">
                    💡 Key Insight: The North-West Corner Rule is like reading a book—you start at the top-left and work your way through systematically. It's simple, fast, and guarantees a feasible solution, though not necessarily a good one.
                  </p>
                </div>

                <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-700 dark:text-blue-300">Simple</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Easy to understand and implement</p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-green-700 dark:text-green-300">Fast</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Single pass through the table</p>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                    <h4 className="font-semibold text-orange-700 dark:text-orange-300">Poor Quality</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">Usually far from optimal</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">Why "North-West Corner"?</h3>
                <p>
                  The name comes from the way we navigate the transportation table. We start at the cell in the top-left corner (north-west) and move systematically. When a row's supply is exhausted, we move down (south). When a column's demand is satisfied, we move right (east). This gives the method its name.
                </p>

                <div className="my-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                  <p className="font-medium text-orange-800 dark:text-orange-300">
                    🎯 Think About: When Mamata in Kolkata allocates products from warehouses to stores, using the North-West Corner Rule is like filling orders from the first warehouse on her list, then moving to the next. It's simple but may not be the most cost-effective approach.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Procedure Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Step-by-Step Procedure</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-500 text-white rounded-full font-bold">1</span>
                    <div>
                      <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Start at the Top-Left Cell</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Begin at cell (1,1), which is the intersection of the first source (S₁) and the first destination (D₁).
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        Current cell = (S₁, D₁)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-500 text-white rounded-full font-bold">2</span>
                    <div>
                      <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Allocate Maximum Possible Amount</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Allocate xᵢⱼ = min(Sᵢ, Dⱼ) to the current cell. This is the maximum amount that can be shipped without exceeding supply or demand.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        x₁₁ = min(S₁, D₁)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-500 text-white rounded-full font-bold">3</span>
                    <div>
                      <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Update Supply and Demand</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Reduce the current row's supply and column's demand by the allocated amount. Cross out the row or column that becomes zero.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        S₁ = S₁ - x₁₁<br/>
                        D₁ = D₁ - x₁₁
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-500 text-white rounded-full font-bold">4</span>
                    <div>
                      <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Move to the Next Cell</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        If the row's supply is exhausted, move down to the next row (south). If the column's demand is satisfied, move right to the next column (east). If both, move diagonally to (i+1, j+1).
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        If S₁ = 0 → move to (2, j)<br/>
                        If D₁ = 0 → move to (i, 2)<br/>
                        If both = 0 → move to (2, 2)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-500 text-white rounded-full font-bold">5</span>
                    <div>
                      <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Repeat Until All Allocations Complete</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                        Continue the process until all supplies are exhausted and all demands are satisfied. The result is your IBFS.
                      </p>
                      <div className="mt-2 p-2 bg-white dark:bg-gray-700 rounded text-sm font-mono">
                        Continue until Σⱼ xᵢⱼ = Sᵢ for all i<br/>
                        and Σᵢ xᵢⱼ = Dⱼ for all j
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    💡 <strong>Try Changing This:</strong> What happens if you start from a different corner? The North-West Corner Rule only works from the top-left. Other corners have their own rules.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Examples Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Practical Examples</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Example 1: Simple 3×3 Problem</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Problem:</strong> A company has 3 warehouses and 3 stores with the following supplies and demands.
                  </p>
                  <div className="mt-3 overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                      <thead>
                        <tr className="bg-gray-100 dark:bg-gray-600">
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-left text-sm font-semibold">Warehouse \ Store</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">S₁</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">S₂</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">S₃</th>
                          <th className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center text-sm font-semibold">Supply</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">W₁</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">5</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">3</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">7</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">50</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">W₂</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">4</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">6</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center">2</td>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 text-center font-semibold">40</td>
                        </tr>
                        <tr>
                          <td className="px-3 py-2 border border-gray-300 dark:border-gray-600 font-semibold">W₃</td>
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
                    <p className="font-medium">NW Corner Solution:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Cell (1,1): allocate 40 → W₁ supply left: 10, S₁ demand: 0</li>
                      <li>Cell (1,2): allocate 10 → W₁ supply: 0, S₂ demand left: 40</li>
                      <li>Cell (2,2): allocate 40 → W₂ supply: 0, S₂ demand: 0</li>
                      <li>Cell (3,3): allocate 30 → W₃ supply: 0, S₃ demand: 0</li>
                      <li><strong>Total Cost = 40×5 + 10×3 + 40×6 + 30×4 = 200 + 30 + 240 + 120 = ₹590</strong></li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Example 2: 2×3 Problem</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> Two factories supply three retail stores in Barrackpore.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">Data:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Factory 1: Supply 80 units, costs: Store A: ₹10, Store B: ₹12, Store C: ₹8</li>
                      <li>Factory 2: Supply 70 units, costs: Store A: ₹14, Store B: ₹9, Store C: ₹11</li>
                      <li>Demands: Store A: 50, Store B: 60, Store C: 40</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">NW Corner Solution:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Cell (1,1): allocate 50 → F1 supply left: 30, A demand: 0</li>
                      <li>Cell (1,2): allocate 30 → F1 supply: 0, B demand left: 30</li>
                      <li>Cell (2,2): allocate 30 → F2 supply left: 40, B demand: 0</li>
                      <li>Cell (2,3): allocate 40 → F2 supply: 0, C demand: 0</li>
                      <li><strong>Total Cost = 50×10 + 30×12 + 30×9 + 40×11 = 500 + 360 + 270 + 440 = ₹1,570</strong></li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Analysis:</p>
                    <p className="text-gray-700 dark:text-gray-300">Susmita uses this quick allocation to get a baseline cost before optimizing her distribution.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Example 3: 3×4 Problem with Dummy</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A healthcare network has 3 warehouses and 4 hospitals with a supply surplus.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">NW Corner Solution with Dummy:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Add dummy destination for surplus supply</li>
                      <li>Apply NW Corner Rule to the balanced table</li>
                      <li>Dummy allocations represent unused supply</li>
                      <li><strong>Total Cost calculated only for real shipments</strong></li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Abhronila uses NW Corner with dummies to quickly identify which warehouses have surplus supplies.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 p-6 rounded-xl hover:scale-[1.02] transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">Example 4: Educational Resource Distribution</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                    <strong>Scenario:</strong> A school district in Ichapur distributes books from 3 centers to 4 schools.
                  </p>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-700 rounded text-sm">
                    <p className="font-medium">NW Corner Application:</p>
                    <ul className="list-disc pl-4 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Start at top-left (Center 1, School 1)</li>
                      <li>Allocate based on supplies and demands</li>
                      <li>Move right when demand is met</li>
                      <li>Move down when supply is exhausted</li>
                      <li><strong>Quickly get a feasible distribution plan</strong></li>
                    </ul>
                  </div>
                  <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded text-sm">
                    <p className="font-medium">💡 Application:</p>
                    <p className="text-gray-700 dark:text-gray-300">Debangshu uses NW Corner for quick planning when time is critical.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Visualization Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Visual Understanding</h2>
              
              <div className="flex flex-col items-center justify-center space-y-6">
                <svg className="w-full max-w-4xl h-auto" viewBox="0 0 950 750" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="950" height="750" fill="transparent" />
                  
                  {/* Title */}
                  <text x="475" y="40" textAnchor="middle" className="text-xl font-bold fill-gray-800 dark:fill-gray-200">North-West Corner Rule Visualization</text>
                  
                  {/* Table */}
                  <rect x="100" y="70" width="750" height="220" rx="10" fill="white" dark:fill="#1F2937" stroke="#10B981" strokeWidth="2" />
                  
                  {/* Column Headers */}
                  <text x="200" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₁</text>
                  <text x="320" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₂</text>
                  <text x="440" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₃</text>
                  <text x="560" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">D₄</text>
                  <text x="700" y="100" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">Supply</text>
                  
                  {/* Grid Lines */}
                  <line x1="160" y1="105" x2="160" y2="285" stroke="#10B981" strokeWidth="1.5" />
                  <line x1="280" y1="105" x2="280" y2="285" stroke="#10B981" strokeWidth="1.5" />
                  <line x1="400" y1="105" x2="400" y2="285" stroke="#10B981" strokeWidth="1.5" />
                  <line x1="520" y1="105" x2="520" y2="285" stroke="#10B981" strokeWidth="1.5" />
                  <line x1="640" y1="105" x2="640" y2="285" stroke="#10B981" strokeWidth="1.5" />
                  
                  <line x1="100" y1="110" x2="850" y2="110" stroke="#10B981" strokeWidth="1.5" />
                  <line x1="100" y1="155" x2="850" y2="155" stroke="#10B981" strokeWidth="1.5" />
                  <line x1="100" y1="200" x2="850" y2="200" stroke="#10B981" strokeWidth="1.5" />
                  <line x1="100" y1="245" x2="850" y2="245" stroke="#10B981" strokeWidth="1.5" />
                  <line x1="100" y1="290" x2="850" y2="290" stroke="#10B981" strokeWidth="1.5" />
                  
                  {/* Row Labels */}
                  <text x="130" y="140" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">S₁</text>
                  <text x="130" y="185" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">S₂</text>
                  <text x="130" y="230" textAnchor="middle" className="text-sm font-bold fill-gray-700 dark:fill-gray-300">S₃</text>
                  
                  {/* Cells */}
                  <text x="220" y="140" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">c₁₁</text>
                  <text x="340" y="140" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">c₁₂</text>
                  <text x="460" y="140" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">c₁₃</text>
                  <text x="580" y="140" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">c₁₄</text>
                  <text x="710" y="140" textAnchor="middle" className="text-sm font-bold fill-emerald-600 dark:fill-emerald-400">S₁</text>
                  
                  <text x="220" y="185" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">c₂₁</text>
                  <text x="340" y="185" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">c₂₂</text>
                  <text x="460" y="185" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">c₂₃</text>
                  <text x="580" y="185" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">c₂₄</text>
                  <text x="710" y="185" textAnchor="middle" className="text-sm font-bold fill-emerald-600 dark:fill-emerald-400">S₂</text>
                  
                  <text x="220" y="230" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">c₃₁</text>
                  <text x="340" y="230" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">c₃₂</text>
                  <text x="460" y="230" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">c₃₃</text>
                  <text x="580" y="230" textAnchor="middle" className="text-sm fill-gray-700 dark:fill-gray-300">c₃₄</text>
                  <text x="710" y="230" textAnchor="middle" className="text-sm font-bold fill-emerald-600 dark:fill-emerald-400">S₃</text>
                  
                  {/* Bottom Row */}
                  <text x="200" y="275" textAnchor="middle" className="text-sm font-bold fill-orange-600 dark:fill-orange-400">D₁</text>
                  <text x="320" y="275" textAnchor="middle" className="text-sm font-bold fill-orange-600 dark:fill-orange-400">D₂</text>
                  <text x="440" y="275" textAnchor="middle" className="text-sm font-bold fill-orange-600 dark:fill-orange-400">D₃</text>
                  <text x="560" y="275" textAnchor="middle" className="text-sm font-bold fill-orange-600 dark:fill-orange-400">D₄</text>
                  
                  {/* Movement Path */}
                  <path d="M 220 120 L 220 140 L 340 140 L 340 185 L 460 185 L 460 230" stroke="#10B981" strokeWidth="3" fill="none" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" values="0;20" dur="1s" repeatCount="indefinite" />
                  </path>
                  
                  {/* Arrows showing movement */}
                  <text x="270" y="130" textAnchor="middle" className="text-xs font-bold fill-emerald-600 dark:fill-emerald-400">→</text>
                  <text x="390" y="165" textAnchor="middle" className="text-xs font-bold fill-emerald-600 dark:fill-emerald-400">↓</text>
                  <text x="390" y="130" textAnchor="middle" className="text-xs font-bold fill-emerald-600 dark:fill-emerald-400">→</text>
                  <text x="510" y="210" textAnchor="middle" className="text-xs font-bold fill-emerald-600 dark:fill-emerald-400">↓</text>
                  <text x="510" y="165" textAnchor="middle" className="text-xs font-bold fill-emerald-600 dark:fill-emerald-400">→</text>
                  
                  {/* Process Steps Box */}
                  <rect x="50" y="320" width="850" height="150" rx="15" fill="#FEF3C7" dark:fill="#78350F" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="1s" />
                  </rect>
                  <text x="475" y="355" textAnchor="middle" className="text-base font-bold fill-amber-600 dark:fill-amber-400">North-West Corner Rule Steps</text>
                  
                  <rect x="80" y="375" width="250" height="75" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#10B981" strokeWidth="1.5" />
                  <text x="205" y="400" textAnchor="middle" className="text-sm font-bold fill-emerald-600 dark:fill-emerald-400">Step 1-2</text>
                  <text x="205" y="420" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Start at NW Corner</text>
                  <text x="205" y="438" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Allocate min(Sᵢ, Dⱼ)</text>
                  
                  <rect x="350" y="375" width="250" height="75" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#10B981" strokeWidth="1.5" />
                  <text x="475" y="400" textAnchor="middle" className="text-sm font-bold fill-emerald-600 dark:fill-emerald-400">Step 3</text>
                  <text x="475" y="420" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Update Supply & Demand</text>
                  <text x="475" y="438" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Cross out zero row/col</text>
                  
                  <rect x="620" y="375" width="250" height="75" rx="8" fill="white" dark:fill="#1F2937" fillOpacity="0.5" stroke="#10B981" strokeWidth="1.5" />
                  <text x="745" y="400" textAnchor="middle" className="text-sm font-bold fill-emerald-600 dark:fill-emerald-400">Step 4-5</text>
                  <text x="745" y="420" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Move Right or Down</text>
                  <text x="745" y="438" textAnchor="middle" className="text-xs fill-gray-700 dark:fill-gray-300">Repeat Until Done</text>
                  
                  {/* Key Points Box */}
                  <rect x="50" y="500" width="850" height="220" rx="15" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" begin="2s" />
                  </rect>
                  <text x="475" y="535" textAnchor="middle" className="text-base font-bold fill-emerald-600 dark:fill-emerald-400">Key Points About NW Corner Rule</text>
                  
                  <circle cx="90" cy="565" r="8" fill="#10B981" />
                  <text x="110" y="570" className="text-sm fill-gray-700 dark:fill-gray-300">Simple and fast — single pass through the table</text>
                  
                  <circle cx="90" cy="595" r="8" fill="#10B981" />
                  <text x="110" y="600" className="text-sm fill-gray-700 dark:fill-gray-300">Guarantees a feasible solution</text>
                  
                  <circle cx="90" cy="625" r="8" fill="#10B981" />
                  <text x="110" y="630" className="text-sm fill-gray-700 dark:fill-gray-300">Ignores costs — no consideration of transportation costs</text>
                  
                  <circle cx="90" cy="655" r="8" fill="#10B981" />
                  <text x="110" y="660" className="text-sm fill-gray-700 dark:fill-gray-300">Usually gives poor solutions (far from optimal)</text>
                  
                  <circle cx="520" cy="565" r="8" fill="#F59E0B" />
                  <text x="540" y="570" className="text-sm fill-gray-700 dark:fill-gray-300">Best for: Quick approximations, preliminary analysis</text>
                  
                  <circle cx="520" cy="595" r="8" fill="#F59E0B" />
                  <text x="540" y="600" className="text-sm fill-gray-700 dark:fill-gray-300">Worst for: Problems where cost optimization is critical</text>
                  
                  <circle cx="520" cy="625" r="8" fill="#F59E0B" />
                  <text x="540" y="630" className="text-sm fill-gray-700 dark:fill-gray-300">Always requires improvement using MODI method</text>
                  
                  <circle cx="520" cy="655" r="8" fill="#F59E0B" />
                  <text x="540" y="660" className="text-sm fill-gray-700 dark:fill-gray-300">Number of allocations = m + n - 1</text>
                </svg>
                
                <div className="text-sm text-gray-600 dark:text-gray-300 text-center">
                  <p className="leading-relaxed">This diagram shows the North-West Corner Rule in action, with the movement path and key steps illustrated.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Tips & Tricks</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">🎯 Quick Execution</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    The NW Corner Rule is fastest when you systematically cross out rows and columns. Keep track of remaining supplies and demands.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-green-700 dark:text-green-300">💡 Check Allocations Count</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Verify you have exactly m + n - 1 allocations. If you have fewer, degeneracy has occurred and needs special handling.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300">🔧 Use for Quick Estimates</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Use NW Corner when you need a quick feasibility check or a rough cost estimate. It's perfect for preliminary analysis.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-300">⚡ Documentation</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    Document each allocation clearly. This helps in verifying the solution and explaining it to others.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                <p className="font-medium text-yellow-800 dark:text-yellow-300">
                  <strong>🚀 Professional Insight:</strong> Mahima from Kolkata uses NW Corner only for quick feasibility checks. For actual cost optimization, she uses VAM or Least Cost method. The NW Corner solution is always just a starting point, never the final answer.
                </p>
              </div>
            </div>
          </section>

          {/* Common Mistakes Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">Common Mistakes</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Wrong Movement Direction</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Moving up or left when you should move down or right. Always move right when demand is satisfied and down when supply is exhausted.
                    </p>
                  </div>
                </div>
                
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
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Not Checking Balance</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Applying NW Corner without first ensuring the problem is balanced. Always add dummies first if needed.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <span className="text-red-500 text-xl">❌</span>
                  <div>
                    <h4 className="font-semibold text-red-700 dark:text-red-300">Ignoring Degeneracy</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Not handling cases where the number of allocations is less than m + n - 1. This requires adding epsilon.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-500">
                <p className="font-medium text-red-800 dark:text-red-300">
                  <strong>⚠️ Watch Out:</strong> The most common mistake is thinking NW Corner gives a good solution. It doesn't—it gives a feasible solution that is usually far from optimal. Always follow NW Corner with the MODI method for optimality.
                </p>
              </div>
            </div>
          </section>

          {/* Best Practices Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Best Practices</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">📝 Preparation</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Check balance condition first</li>
                    <li>Add dummies if needed</li>
                    <li>Set up the transportation table clearly</li>
                    <li>Label rows and columns correctly</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">🔍 Execution</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Start at NW corner systematically</li>
                    <li>Allocate min(Sᵢ, Dⱼ) each time</li>
                    <li>Track remaining supplies and demands</li>
                    <li>Cross out completed rows/columns</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">📚 Verification</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Count allocations (should be m+n-1)</li>
                    <li>Sum row allocations (should equal supplies)</li>
                    <li>Sum column allocations (should equal demands)</li>
                    <li>Calculate total cost for baseline</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">🎯 Next Steps</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                    <li>Use MODI method for optimality check</li>
                    <li>Apply transportation simplex for improvement</li>
                    <li>Compare with other IBFS methods</li>
                    <li>Document improvement iterations</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
                <p className="font-medium text-blue-800 dark:text-blue-300">
                  <strong>📌 Professional Standard:</strong> In industry, NW Corner is rarely used for final solutions. It's typically used for quick feasibility checks and as a teaching tool. Susmita from Barrackpore uses it only when she needs a rough estimate in under a minute.
                </p>
              </div>
            </div>
          </section>

          {/* Mini Checklist Section */}
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
              <h2 className="text-2xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">Mini Checklist</h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Concept Understanding</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I understand what the North-West Corner Rule is and how it works</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Procedure Knowledge</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know the step-by-step procedure for applying the NW Corner Rule</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Allocation Calculation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can correctly calculate allocations using min(Sᵢ, Dⱼ)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Movement Rules</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I know when to move right, down, or diagonally</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="text-green-500 text-xl">✅</span>
                  <div>
                    <h4 className="font-medium">Verification</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">I can verify the solution has m+n-1 allocations</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <div className="mt-8">
            <Teacher note={
              "The North-West Corner Rule is the gateway method for transportation problems. When I teach this to my students in Kolkata, I emphasize that while it's simple and fast, it's never the final answer. Abhronila from Jadavpur learned that using NW Corner without optimization led to shipping costs 30% higher than optimal. Susmita from Barrackpore uses it as a quick sanity check before applying more sophisticated methods. Remember: NW Corner gives you a starting point, not a destination. Always follow it with the MODI method to reach the optimal solution."
            } />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <FAQTemplate
            title="North-West Corner Rule FAQs"
            questions={questions}
          />
        </div>

        {/* Printable Notes Section */}
        <div className="mt-12">
          <PlainTextPrint
            content={noteText}
            title="North-West Corner Rule"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Notes"
            downloadFileName="topic1_note.txt"
          />
        </div>
      </div>
    </div>
  );
};

export default Topic1;